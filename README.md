# CPRA Insight - Centre for Peace Research and Advocacy

This is a production-ready web application built for CPRA to manage research, advocacy, and community engagement.

## 🗄️ Database Management
Your data is stored in **Firebase Firestore**, a real-time cloud database.

### Option 1: Internal Admin Dashboard (Recommended)
1. Navigate to your website URL followed by `/admin` (e.g., `http://localhost:3000/admin`).
2. Sign in with an authorized Google account.
3. Use the tabs to view **Newsletter Subscribers** and **Contact Messages**.

### Option 2: Firebase Console (Full Control)
1. Log in to the [Firebase Console](https://console.firebase.google.com/).
2. Select your CPRA project.
3. Click on **Firestore Database** in the left-hand menu.
4. Here you can manually create, edit, or delete any record in your collections.

---

## 📂 Managing Images (Local vs Production)
All images are centralized in `src/lib/placeholder-images.json`. 

### Using your own images from your laptop:
1. **The Public Folder**: Look for the folder named `public` at the root of your project (where `package.json` is). Put your image files (e.g., `my-photo.jpg`) inside it.
2. **Update JSON**: Open `src/lib/placeholder-images.json`. Find the relevant `id` and change the `imageUrl`.
3. **⚠️ CRITICAL - DO NOT USE WINDOWS PATHS**: 
   - ❌ **WRONG**: `"imageUrl": "C:\Users\GIGABYTE\Desktop\image.jpg"`
   - ✅ **RIGHT**: `"imageUrl": "/my-photo.jpg"`
   - Always start with a forward slash `/` followed by the filename.
4. **Restart**: After saving the JSON, the app will update.

## 🚀 Access Control & Security

The application is split into two access tiers:

### 1. Public Access (Visitors)
- **Routes**: All pages EXCEPT `/admin`.
- **Functionality**: Visitors can read content, use the AI Research tool, join the newsletter, and send contact messages.

### 2. Admin Access (CPRA Staff)
- **Route**: `/admin`.
- **Functionality**: Viewing newsletter subscribers and contact form inquiries.
- **Authentication**: Secured via Firebase Authentication (Google Sign-In).

## 💻 Local Development Setup

To run this project on your local computer:

1. **Download**: Click the "Download" icon in the header (looks like a tray with a down arrow) to get the source code.
2. **Install Dependencies**: Open your terminal in the project folder and run:
   ```bash
   npm install
   ```
3. **Environment Variables**: Create a `.env.local` file in the root directory and add your Firebase and Gemini API keys.
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Open Browser**: Navigate to `http://localhost:3000`.

## 🛠 Content Management
All text content (News, Bills, Map Points) is centralized in `src/lib/site-content.json`. Simply edit this file to update the site.

## 🎨 Color Branding
Modify CSS variables in `src/app/globals.css` under the `:root` section (specifically `--primary` and `--accent`).