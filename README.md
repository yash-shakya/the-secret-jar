# The Secret Jar 🏺

**Spill the Tea, Not your Identity!**

The Secret Jar is an anonymous messaging platform built with Next.js that allows users to send and receive anonymous messages. Users can create accounts, share their unique profile links, and receive anonymous messages from anyone without revealing the sender's identity.

## 🌟 Features

- **Anonymous Messaging**: Send messages without revealing your identity
- **User Authentication**: Secure signup/login with email verification
- **Message Management**: Accept or decline incoming messages
- **Dashboard**: View and manage all received messages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **3D Interactive Elements**: Beautiful Spline 3D components for enhanced UX
- **Email Notifications**: OTP-based email verification system

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components, Shadcn UI Library
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Email Service**: Nodemailer
- **3D Graphics**: Spline
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API

## 📋 Prerequisites

Before running this project locally, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)
- SMTP email service credentials

## 🛠️ Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/the-secret-jar.git
   cd the-secret-jar
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Variables**
   
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Email Service (Nodemailer)
   GOOGLE_CLIENT_ID = your google account client ID
   GOOGLE_CLIENT_SECRET = your google account client secret
   GOOGLE_REFRESH_TOKEN = your google account refresh token
   GOOGLE_EMAIL = your google email to send mails
   
   

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
the-secret-jar/
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Authentication routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── verify/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth configuration
│   │   │   ├── changeaccepting/
│   │   │   ├── changeopen/
│   │   │   ├── checkusername/
│   │   │   ├── getmessages/
│   │   │   ├── isaccepting/
│   │   │   ├── sendmessage/
│   │   │   ├── signup/
│   │   │   └── verifyotp/
│   │   ├── dashboard/        # User dashboard
│   │   ├── u/               # User profile pages
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI components (shadcn/ui)
│   │   ├── emailTemplate.tsx
│   │   ├── login-form.tsx
│   │   ├── message.tsx
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── signup-form.tsx
│   ├── context/             # React Context providers
│   │   ├── authprovider.tsx
│   │   └── themeprovider.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── use-mobile.tsx
│   ├── lib/                 # Utility libraries
│   │   └── utils.ts
│   ├── model/               # Database models
│   │   └── user.model.ts
│   ├── schema/              # Zod validation schemas
│   │   ├── acceptMessageSchema.ts
│   │   ├── changeopenScehma.ts
│   │   ├── loginSchema.ts
│   │   ├── messagesSchema.ts
│   │   └── signupSchema.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── ApiResponse.ts
│   │   └── next-auth.d.ts
│   ├── util/                # Utility functions
│   │   ├── dbConnect.ts
│   │   └── sendotp.ts
│   └── middleware.ts        # Next.js middleware
├── components.json          # shadcn/ui configuration
├── eslint.config.mjs        # ESLint configuration
├── next-env.d.ts           # Next.js TypeScript declarations
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🔧 Configuration

### Database Setup
Make sure your MongoDB database is running and accessible. Update the `MONGODB_URI` in your `.env.local` file with your connection string.

### Email Service Setup
Configure your email service for OTP verification:
- **Nodemailer**: Set up SMTP credentials
- **Resend**: Get API key from Resend dashboard

### Authentication
The app uses NextAuth.js for authentication. Make sure to set a secure `NEXTAUTH_SECRET` in your environment variables.

## 🚀 Deployment

This Next.js application can be deployed on various platforms:

### Vercel (Recommended)
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Connect your repository and add environment variables
- **AWS/DigitalOcean**: Use Docker or traditional deployment methods

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🛟 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce the problem

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Spline](https://spline.design/) for 3D graphics
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
