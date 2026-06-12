
# CPRA Insight - Centre for Peace Research and Advocacy

This is a production-ready web application built for CPRA to manage research, advocacy, and community engagement.

## 🚀 Getting Started

### 1. Research Synthesis (AI)
Navigate to the **Research** page. Paste technical papers or fragility assessments into the input field. The built-in GenAI tool will generate a stakeholder-ready advocacy brief aligned with CPRA's mission.

### 2. Admin Dashboard
The dashboard is located at `/admin`.
- **Authentication**: You must sign in with an authorized Google account to view community data.
- **Real-time Monitoring**: View newsletter subscribers and contact form inquiries as they arrive.

### 3. Managing Images
All images are centralized in `src/lib/placeholder-images.json`. To update any photo on the website:
1. Open `src/lib/placeholder-images.json`.
2. Find the relevant `id`.
3. Update the `imageUrl` field.

### 4. Color Branding
To change the website's color scheme, modify the CSS variables in `src/app/globals.css` under the `:root` section (specifically `--primary` and `--accent`).

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Engine**: Genkit with Gemini 1.5 Flash
- **Styling**: Tailwind CSS & Shadcn UI
