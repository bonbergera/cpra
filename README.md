
# CPRA Insight - Centre for Peace Research and Advocacy

This is a production-ready web application built for CPRA to manage research, advocacy, and community engagement.

## 🚀 Access Control & Security

The application is split into two access tiers:

### 1. Public Access (Visitors)
- **Routes**: All pages EXCEPT `/admin`.
- **Functionality**: Visitors can read content, use the AI Research tool, join the newsletter, and send contact messages.
- **Privacy**: No sign-in is required for general browsing.

### 2. Admin Access (CPRA Staff)
- **Route**: `/admin`.
- **Functionality**: Viewing newsletter subscribers and contact form inquiries.
- **Authentication**: Secured via Firebase Authentication (Google Sign-In).
- **Setup**: To access the dashboard, you must sign in with a Google account.

## 📂 Managing Images
All images are centralized in `src/lib/placeholder-images.json`. 
1. Find the relevant `id`.
2. Update the `imageUrl` field with your new photo URL.
3. **Using images from your laptop**:
   - Download the code to your computer.
   - Place your images in the `public/` folder.
   - In the JSON file, set the `imageUrl` to the path starting with a slash (e.g., `"/my-image.jpg"`).

## 💻 Local Development Setup

To run this project on your local computer:

1. **Download**: Click the "Download" icon in the Firebase Studio header to get the source code.
2. **Install Dependencies**: Open your terminal in the project folder and run:
   ```bash
   npm install
   ```
3. **Environment Variables**: Create a `.env.local` file in the root directory and add your Firebase and Gemini API keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   GEMINI_API_KEY=your_google_ai_key
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Open Browser**: Navigate to `http://localhost:3000`.

## 🛠 Content Management
All text content is centralized in `src/lib/site-content.json`. Simply edit this file to update the site.

## 🎨 Color Branding
Modify CSS variables in `src/app/globals.css` under the `:root` section (specifically `--primary` and `--accent`).

## 💻 Tech Stack
- **Language**: TypeScript (TSX)
- **Framework**: Next.js 15 (App Router)
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Auth (Google)
- **AI Engine**: Genkit with Gemini 1.5 Flash
- **Styling**: Tailwind CSS & Shadcn UI
