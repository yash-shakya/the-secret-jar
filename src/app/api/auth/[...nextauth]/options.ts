import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/util/dbConnect';
import UserModel from '@/model/user.model';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                console.log(credentials.identifier)
                console.log(credentials)
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.username },
                        ],
                    });
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await dbConnect();

            if (account?.provider === "google") {
                const existingUser = await UserModel.findOne({ email: user.email });

                console.log(user)

                if (!existingUser) {
                    try {
                        const newUser = new UserModel({
                            username: user.email!.split("@")[0], // or generate unique username
                            email: user.email,
                            password: "google_oauth", // placeholder (won't be used)
                            isVerified: true,
                            verifyCode: "",
                            codeExpiry: new Date(),
                            isAcceptingMessage: true,
                            messages: [],
                        });

                        await newUser.save();

                        user.username=newUser.username
                    } catch (error) {
                        console.log(error)
                    }

                }else{
                    user.username=existingUser.username
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString(); // Convert ObjectId to string
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
};