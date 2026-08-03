# 🚀 Kyzen

> **Build together. Ship faster.**

Kyzen is an AI-powered developer collaboration platform designed to help teams plan, build, review, and ship software efficiently. It combines modern project management, real-time collaboration, and AI-assisted development into a single, intuitive workspace.

---

## ✨ Features

### 👥 Team Collaboration

* Organizations and workspaces
* Member invitations
* Role-based access control (RBAC)
* Team management

### 📂 Project Management

* Create and manage projects
* Kanban boards
* Tasks and issues
* Labels, priorities, and milestones
* Sprint planning

### 🤖 AI-Powered Development

* AI code review
* AI bug detection
* AI documentation generation
* AI task breakdown
* AI-powered developer assistant

### 📚 Knowledge Management

* Wiki and documentation
* Markdown editor
* Version history

### 📊 Analytics

* Team productivity insights
* Sprint analytics
* Issue trends
* Performance dashboard

### 🔔 Notifications

* Real-time notifications
* Mentions
* Activity feed
* Email notifications

### 🔒 Security

* Secure authentication
* Protected routes
* Session management
* Organization-based permissions

---

# ⚙️ Getting Started

## Prerequisites

* Node.js 22+
* npm, pnpm, or yarn
* PostgreSQL
* Git

## Installation

```bash
git clone https://github.com/mdkamranalam/kyzen.git

cd kyzen

npm install
```

Create a `.env.local` file:

```env
DATABASE_URL=

AUTH_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

OPENAI_API_KEY=

UPLOADTHING_TOKEN=

RESEND_API_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧪 Development

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

---

# 🎯 Project Goals

Kyzen aims to:

* Improve developer productivity
* Simplify project management
* Enhance team collaboration
* Reduce repetitive engineering work with AI
* Provide a modern developer experience

---

# 🤝 Contributing

Contributions, feature requests, and bug reports are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Md. Kamran Alam**

* Software Engineer
* AI Enthusiast
* Entrepreneur

---

## ⭐ Support

If you find this project useful, consider giving it a **⭐** on GitHub.
