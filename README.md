# Infomedics Patient Portal

A modern patient management system built with Next.js, React, TypeScript, and Tailwind CSS.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rickygorlivecoms-projects/v0-patient-management-system)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/na6Ya8lenb4)

---

## 🚀 Project Overview

This project is a patient management portal designed for modern healthcare workflows. It leverages the latest web technologies for a fast, accessible, and responsive user experience.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (preferred, as a lockfile is provided)

Install pnpm globally if you don't have it:

\`\`\`bash
npm install -g pnpm
\`\`\`

## 📦 Installation

Clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/ygorhenriquee/infomedics-patient-portal.git
cd infomedics-patient-portal
pnpm install
\`\`\`

## 🧑‍💻 Running the Development Server

Start the app in development mode:

\`\`\`bash
pnpm dev
\`\`\`

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Building for Production

To create an optimized production build:

\`\`\`bash
pnpm build
\`\`\`

## 🚦 Running the Production Server

After building, you can start the production server:

\`\`\`bash
pnpm start
\`\`\`

## 🧹 Linting

To check for linting issues:

\`\`\`bash
pnpm lint
\`\`\`

## 🧰 Tech Stack & Configuration

- **Framework:** [Next.js](https://nextjs.org/) 15+
- **Language:** TypeScript
- **Styling:** Tailwind CSS (see `tailwind.config.ts` for customizations)
- **State & Forms:** React, React Hook Form, Zod
- **UI Components:** Radix UI, Lucide React
- **Build Tools:** pnpm, PostCSS
- **Deployment:** Vercel ([Live App](https://vercel.com/rickygorlivecoms-projects/v0-patient-management-system))

### Notes
- The project is configured to ignore TypeScript and ESLint errors during production builds (see `next.config.mjs`).
- Tailwind CSS and PostCSS are pre-configured; no extra setup is needed.
- Uses path aliases (see `tsconfig.json`).

## 🌐 Deployment

This project is automatically deployed to Vercel:

**[Live App on Vercel](https://vercel.com/rickygorlivecoms-projects/v0-patient-management-system)**

---

For more information or to contribute, please open an issue or pull request.
