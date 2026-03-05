# 🎬 Quick Movie Insight

> Instant access to ratings, cast, and hidden gems from the world's largest movie database.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://quickmovieinsight.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-blue)](https://vercel.com)

---

## 📖 About

**Quick Movie Insight** is a Next.js web application that allows users to search for any movie and instantly get detailed information including ratings, cast, genres, and AI-powered insights — all in one place.

---

## ✨ Features

- 🔍 **Movie Search** — Search any movie by title in real time
- 🎭 **Cast & Crew Details** — View actors, directors, and production info
- ⭐ **Ratings** — Aggregated ratings from top sources
- 🤖 **AI Insights** — Powered by Gemini AI for smart movie summaries
- 📱 **Responsive UI** — Works seamlessly on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 15** | Enables SSR/SSG for fast page loads and SEO; file-based routing reduces boilerplate |
| Styling | **Tailwind CSS** | Utility-first approach for rapid, consistent UI development |
| Movie Data | **RapidAPI** | Provides access to a rich, well-maintained movie database with minimal setup |
| AI Layer | **Google Gemini API** | Best-in-class free-tier AI for generating natural language movie insights |
| Deployment | **Vercel** | Zero-config deployment optimized for Next.js with automatic CI/CD |

---

## 📁 Project Structure

```
quickmovieinsight/
├── app/                  # Next.js App Router pages
│   ├── page.jsx          # Home / Search page
│   └── layout.jsx        # Root layout
├── components/           # Reusable UI components
├── lib/                  # API utility functions
├── public/               # Static assets
├── .env.local            # Environment variables (not committed)
└── next.config.js        # Next.js configuration
```

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- A [RapidAPI](https://rapidapi.com) account and key
- A [Google Gemini API](https://aistudio.google.com) key

---

### 1. Clone the Repository

```bash
git clone https://github.com/rishavchandr/quickmovieinsight.git
cd quickmovieinsight
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
RAPID_API_KEY=your_rapidapi_key_here
GEMINI_API_KEY=your_gemini_api_key_here
BASE_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env.local` to GitHub.** It is already included in `.gitignore`.

| Variable | Where to get it |
|----------|----------------|
| `RAPID_API_KEY` | [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard) |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `BASE_URL` | `http://localhost:3000` for local, your Vercel URL for production |

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add the following environment variables in Vercel Dashboard → Settings → Environment Variables:

```
RAPID_API_KEY=your_rapidapi_key
GEMINI_API_KEY=your_gemini_api_key
BASE_URL=https://quickmovieinsight.vercel.app
```

4. Click **Deploy** — Vercel auto-detects Next.js and handles the rest.

> Every push to the `main` branch triggers an automatic redeployment.

---

## 📝 Assumptions

- The app assumes a **stable internet connection** for fetching movie data from RapidAPI and AI responses from Gemini.
- **RapidAPI** is used under the free tier, which has rate limits. Heavy usage may require a paid plan.
- **Gemini API** responses are assumed to be in English; multi-language support is not implemented.
- The `BASE_URL` must be updated manually when switching between local development and production environments.
- Movie data accuracy depends entirely on the RapidAPI data source; the app does not verify or supplement it independently.
- Users are assumed to search by **movie title** only — searching by actor or genre is not currently supported.

---

## 🔑 API Keys — Quick Reference

| API | Free Tier | Docs |
|-----|-----------|------|
| RapidAPI | Yes (rate limited) | [docs.rapidapi.com](https://docs.rapidapi.com) |
| Google Gemini | Yes (generous free tier) | [ai.google.dev](https://ai.google.dev) |

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Rishavchandr** — [GitHub Profile](https://github.com/rishavchandr)

---

*Built with ❤️ using Next.js and deployed on Vercel*