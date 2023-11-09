# Mingle Dating Website

Welcome to Mingle, your go-to dating platform for connecting with new and exciting people! This README.md file will guide you through the setup and key features of your dating website.

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Environment Variables](#environment-variables)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction
Mingle is a modern dating website built using Next.js, Tailwind CSS, Redux, and Firebase. It provides a seamless and enjoyable experience for users to connect, chat, and find potential matches.

## Technologies Used
- **Next.js:** The framework for building React applications with server-side rendering and other advanced features.
- **Tailwind CSS:** A utility-first CSS framework for building stylish and responsive user interfaces.
- **Redux:** A predictable state container for JavaScript apps, helping manage the application state efficiently.
- **Firebase:** A comprehensive platform for building web and mobile applications with real-time database and authentication features.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/freddymuleya16/mingle.git
   cd mingle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain the Firebase configuration and update it in your project.

4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables and replace the values with your Firebase configuration:
     ```dotenv
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

5. Run the application:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see Mingle in action!

## Project Structure
- **`pages/`:** Next.js pages for routing.
- **`components/`:** Reusable React components.
- **`styles/`:** Stylesheets, including Tailwind CSS.
- **`redux/`:** Redux store configuration and actions.
- **`firebase/`:** Firebase configuration and utility functions.

## Key Features
- User authentication and authorization.
- Profile creation and editing.
- Matching algorithm for potential matches.
- Real-time chat functionality.
- Responsive design for a seamless experience on various devices.

## Environment Variables

Make sure to set up the following environment variables in your `.env.local` file for proper configuration of Mingle:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-firebase-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-firebase-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-firebase-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-firebase-app-id"
```

Ensure that these variables are securely stored and never exposed in public repositories.

## Contributing
We welcome contributions! Feel free to open issues or submit pull requests to improve Mingle.

## Hosting
The project is hosted on Vercel. Visit [Mingle on Vercel](https://mingle-sa.vercel.app/) to explore the live application.

## Test User
Feel free to use the following test user credentials to explore the live version of Mingle:

- **Email:** meg@vomoto.com
- **Password:** Test@123

Please note that this is a test account, and its data is for demonstration purposes only.

## License
This project is licensed under the [MIT License](LICENSE).

Happy Mingling! 🎉