# 💰 Expense Tracker

<div align="center">

![Expense Tracker](https://img.shields.io/badge/Expense-Tracker-blue?style=for-the-badge&logo=wallet)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

*A modern, intuitive web application for tracking your expenses with beautiful charts and insights*

[🚀 Live Demo](https://expense-tracker-bijay0817.vercel.app/)  • [🐛 Report Bug](https://github.com/bijay-shre-stha/expense-tracker/issues) • [✨ Request Feature](https://github.com/bijay-shre-stha/expense-tracker/issues)

</div>

---

## ✨ Features

<div align="center">

| 🎯 **Core Features** | 📊 **Analytics** | 🔧 **Technical** |
|:---:|:---:|:---:|
| Add, edit & delete expenses | Interactive charts & graphs | Responsive design |
| Smart categorization | Monthly/yearly summaries | SEO optimized |
| Quick expense entry | Spending insights | Fast performance |

</div>

### 🌟 Key Highlights

- **🎨 Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **📈 Visual Analytics** - Beautiful charts and graphs to visualize spending patterns
- **🏷️ Smart Categories** - Organize expenses with customizable categories
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Fast Performance** - Optimized with Next.js for lightning-fast loading
- **💾 Persistent Storage** - Reliable data storage with Drizzle ORM
- **🔍 SEO Friendly** - Optimized for search engines

## 🛠️ Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Backend & Database

![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)

### Deployment & Tools

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
</div>

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+ recommended) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bijay-shre-stha/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your configuration:

   ```env
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npm run db:push
   npm run db:seed  # Optional: Add sample data
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

### Adding Expenses

1. Click the **"Add Expense"** button
2. Fill in the expense details:
   - Amount
   - Description
   - Category
   - Date
3. Click **"Save"** to add the expense

### Viewing Analytics

- Navigate to the **Dashboard** to see:
  - Monthly spending overview
  - Category-wise breakdown
  - Spending trends over time
  - Budget vs actual spending

### Managing Categories

- Add, edit, or delete expense categories
- Assign colors and icons to categories

## 🛣️ Roadmap

- [ ] **Mobile App** - React Native version
- [ ] **Receipt Scanning** - AI-powered expense entry
- [ ] **Multi-currency Support** - Support for different currencies
- [ ] **Budget Alerts** - Notifications for budget limits
- [ ] **Export Features** - PDF and CSV export
- [ ] **Team Collaboration** - Shared expense tracking
- [ ] **Bank Integration** - Automatic expense import

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run JavaScript checks |
| `npm run db:push` | Push database schema |
| `npm run db:studio` | Open Drizzle Studio |

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [existing issues](https://github.com/bijay-shre-stha/expense-tracker/issues)
2. Create a [new issue](https://github.com/bijay-shre-stha/expense-tracker/issues/new) if needed
3. Provide detailed information about the problem

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Drizzle ORM](https://orm.drizzle.team/) - JavaScript ORM for SQL databases
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**Made with ❤️ by [Bijay Shrestha](https://github.com/bijay-shre-stha)**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
