
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
- **Setup**: To access the dashboard, you must sign in with a Google account. In production, security rules can be configured to only allow specific email domains.

## 🛠 Content Management

All text content is centralized for easy updates without deep coding knowledge.
- **File**: `src/lib/site-content.json`.
- **Editing**: Locate the item (news article, bill, fellowship) and change the text.
- **Adding**: Add a new object to the relevant array in the JSON file.
- **Removing**: Delete the object from the JSON file.

## 🧠 Research Synthesis (AI)
Navigate to the **Research** page. Paste technical papers or fragility assessments. The GenAI tool (powered by Gemini 1.5 Flash) generates a stakeholder-ready advocacy brief aligned with CPRA's mission.

## 📂 Managing Images
All images are centralized in `src/lib/placeholder-images.json`. 
1. Find the relevant `id`.
2. Update the `imageUrl` field with your new photo URL.

## 🎨 Color Branding
Modify CSS variables in `src/app/globals.css` under the `:root` section (specifically `--primary` and `--accent`).

## 💻 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Auth (Google)
- **AI Engine**: Genkit with Gemini 1.5 Flash
- **Styling**: Tailwind CSS & Shadcn UI
