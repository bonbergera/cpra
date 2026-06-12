
# CPRA Insight - Centre for Peace Research and Advocacy

This is a production-ready web application built for CPRA to manage research, advocacy, and community engagement.

## 🚀 Getting Started

### 1. Content Management (Editing News, Map, etc.)
All the text content of the website is centralized for your convenience.
- Open `src/lib/site-content.json`.
- To **Edit**: Locate the item (news article, bill, fellowship) and change the text.
- To **Add**: Add a new object to the relevant array in the JSON file.
- To **Remove**: Delete the object from the JSON file.

### 2. Research Synthesis (AI)
Navigate to the **Research** page. Paste technical papers or fragility assessments into the input field. The built-in GenAI tool will generate a stakeholder-ready advocacy brief aligned with CPRA's mission.

### 3. Admin Dashboard
The dashboard is located at `/admin`.
- **Authentication**: Sign in with an authorized Google account.
- **Real-time Monitoring**: View newsletter subscribers and contact form inquiries as they arrive directly from Firestore.

### 4. Managing Images
All images are centralized in `src/lib/placeholder-images.json`. To update any photo:
1. Open `src/lib/placeholder-images.json`.
2. Find the relevant `id`.
3. Update the `imageUrl` field.

### 5. Color Branding
To change the website's color scheme, modify the CSS variables in `src/app/globals.css` under the `:root` section (specifically `--primary` and `--accent`).

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Engine**: Genkit with Gemini 1.5 Flash
- **Styling**: Tailwind CSS & Shadcn UI
