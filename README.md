# 📅 Booking App

A modern, full-featured appointment booking system built with Next.js 15, TypeScript, and a beautiful dark/light theme inspired by Linear and Vercel.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Design & UX
- **Modern UI/UX** - Clean, minimalist interface inspired by Linear and Vercel
- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Fully Responsive** - Mobile-first design that works beautifully on all devices
- **Smooth Animations** - Polished transitions and micro-interactions
- **Bottom Navigation** - Mobile-optimized navigation bar

### 📊 Core Features
- **Dashboard Analytics** - Real-time statistics and insights
- **Appointment Management** - Full CRUD operations with status tracking
- **Calendar View** - Monthly calendar with appointment overview
- **Client Management** - Automatic client aggregation from bookings
- **Status Tracking** - Scheduled, Completed, Cancelled states
- **Comments & Notes** - Add notes to appointments with edit modal
- **Search & Filter** - Find appointments by name, email, or service

### 🌐 Public Features
- **Landing Page** - Professional homepage
- **Public Booking Form** - User-friendly appointment booking (`/book`)
- **Email Confirmations** - Automated email notifications via Resend API
- **Test Mode** - Works without API key for development

### 🔐 Authentication
- **Login/Logout** - Secure authentication system
- **Protected Routes** - Route-level access control
- **Demo Credentials** - Quick testing with pre-configured account

### 🎯 Technical Features
- **TypeScript** - Full type safety
- **Server Components** - Next.js App Router
- **API Routes** - Built-in backend endpoints
- **Local Storage** - Client-side data persistence (ready for backend migration)
- **Email Integration** - Resend API support
- **Mobile Optimized** - Touch-friendly interactions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd booking-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
booking-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (protected)/          # Protected routes (require login)
│   │   │   ├── dashboard/        # Dashboard page
│   │   │   ├── appointments/     # Appointment list & new booking
│   │   │   ├── calendar/         # Calendar view
│   │   │   ├── clients/          # Client management
│   │   │   └── settings/         # Email settings
│   │   ├── api/                  # API routes
│   │   │   ├── send-email/       # Email sending endpoint
│   │   │   ├── email-status/     # Check email config
│   │   │   └── test/             # Health check
│   │   ├── login/                # Login page
│   │   ├── book/                 # Public booking form
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components (Header, Sidebar)
│   │   ├── appointments/         # Appointment-related components
│   │   └── calendar/             # Calendar component
│   │
│   ├── services/                 # API services
│   │   ├── appointmentApi.ts    # Appointment CRUD
│   │   ├── clientService.ts     # Client aggregation
│   │   ├── emailService.ts      # Email integration
│   │   └── auth.ts              # Authentication
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useAppointments.ts   # Appointment state management
│   │
│   ├── context/                  # React Context
│   │   └── ThemeContext.tsx     # Theme provider
│   │
│   ├── types/                    # TypeScript types
│   │   └── appointment.ts       # Core types
│   │
│   ├── data/                     # Mock data
│   │   └── appointments.ts      # Sample appointments
│   │
│   └── styles/
│       └── globals.css           # Global styles & CSS variables
│
├── .env.local                    # Environment variables (create from .env.example)
├── .env.example                  # Environment template
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Resend API (for email notifications)
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=onboarding@resend.dev
```

### Email Setup (Optional)

The app works in **test mode** without an API key. To enable real emails:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add it to `.env.local`
4. Verify your domain (or use `onboarding@resend.dev` for testing)

**Free tier limitation:** Only sends to your registered email address unless you verify a domain.

---

## 👤 Demo Login

```
Email: admin@test.com
Password: 123456
```

---

## 🎨 Theme System

The app supports dark and light themes with CSS variables:

```css
/* Dark theme (default) */
--bg-primary: #0a0a0a;
--bg-secondary: #111111;
--text-primary: #ededed;
--accent: #5b7cf6;

/* Light theme */
--bg-primary: #f5f5f5;
--text-primary: #111111;
--accent: #4f6ef0;
```

Toggle theme via the button in the header (☀️/🌙).

---

## 📱 Responsive Design

### Breakpoints
- **Desktop:** 768px+
- **Mobile:** < 768px

### Mobile Features
- Bottom navigation bar
- Touch-optimized interactions
- Stack layouts for forms
- Smaller calendar cells
- No horizontal scroll

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Icons:** Lucide React
- **Email:** Resend API
- **Storage:** LocalStorage (API-ready architecture)
- **Authentication:** Custom JWT-like token system

---

## 🔄 Migration to Backend API

The app is designed for easy migration from localStorage to a real backend:

### Current Architecture
```typescript
// src/services/appointmentApi.ts
const USE_API = process.env.NEXT_PUBLIC_USE_API === 'true';

if (USE_API) {
  // Make API call
  const response = await fetch('/api/appointments');
} else {
  // Use localStorage
  const data = localStorage.getItem('appointments');
}
```

### To Enable API Mode
1. Build your backend API
2. Set `NEXT_PUBLIC_USE_API=true` in `.env.local`
3. All CRUD operations automatically switch to API calls

**No component changes needed!** 🎉

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy! ✅

### Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

---

## 📄 Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/book` - Public booking form

### Protected Routes (require login)
- `/dashboard` - Analytics dashboard
- `/appointments` - Appointment list
- `/appointments/new` - Create new appointment
- `/calendar` - Calendar view
- `/clients` - Client management
- `/settings/email` - Email notification settings

### API Routes
- `POST /api/send-email` - Send email via Resend
- `GET /api/email-status` - Check email configuration
- `GET /api/test` - Health check endpoint

---

## 🎯 Features in Detail

### Dashboard
- Total bookings count
- Today's appointments
- This week's statistics
- Unique client count
- Service breakdown chart
- Top service indicator

### Appointments
- List view with search
- Filter by status (All, Scheduled, Completed, Cancelled)
- Edit modal with notes
- Delete functionality
- Status updates

### Calendar
- Monthly grid view
- Appointment dots on days
- Click to view day's appointments
- Navigate between months
- "Today" quick navigation

### Clients
- Auto-aggregated from appointments
- Total bookings per client
- Last visit date
- Appointment history
- Search by name

### Email Settings
- Toggle confirmation emails
- Toggle reminder emails
- Set reminder timing (1-48 hours)
- Toggle cancellation emails
- Visual connection status

---

## 🎨 Design Philosophy

The app follows modern design principles:

1. **Minimalism** - Clean, uncluttered interface
2. **Consistency** - Uniform spacing and typography
3. **Accessibility** - Clear contrast and readable fonts
4. **Performance** - Fast loads and smooth interactions
5. **Mobile-First** - Optimized for touch devices

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Design inspiration: [Linear](https://linear.app), [Vercel](https://vercel.com)
- Icons: [Lucide Icons](https://lucide.dev)
- Email: [Resend](https://resend.com)
- Framework: [Next.js](https://nextjs.org)

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: your-email@example.com

---

**Made with ❤️ using Next.js and TypeScript**
