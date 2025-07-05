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
            async authorize(credentials: Record<string, string> | undefined) {
                await dbConnect();
                if (!credentials) {
                    throw new Error('No credentials provided');
                }
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
                        return {
                            id: user._id?.toString() || '',
                            _id: user._id?.toString(),
                            email: user.email,
                            username: user.username,
                            isVerified: user.isVerified,
                            isAcceptingMessages: user.isAcceptingMessage,
                        };
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (err: unknown) {
                    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                    throw new Error(errorMessage);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            await dbConnect();

            if (account?.provider === "google") {
                const existingUser = await UserModel.findOne({ email: user.email });

                console.log("Google user:", user)

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

                        user._id = newUser._id?.toString();
                        user.username = newUser.username;
                    } catch (error) {
                        console.log("Error creating Google user:", error)
                    }

                } else {
                    user._id = existingUser._id?.toString();
                    user.username = existingUser.username;
                }
            }

            return true;
        },
        async jwt({ token,trigger, user, session }) {
            if(trigger === "update" && session?.user) {
                // If the session is updated, we can update the token with the new user data
                token._id = session.user._id;
                token.isVerified = session.user.isVerified;
                token.isAcceptingMessages = session.user.isAcceptingMessages;
                token.username = session.user.username;

            }
            else if (user) {
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