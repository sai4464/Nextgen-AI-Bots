# NextGen AI BOTS Inc - Official Website

A modern, responsive website for NextGen AI BOTS Inc, a nonprofit organization dedicated to youth education in robotics and artificial intelligence, with a strong emphasis on VEX Robotics.

## 🚀 Features

- **Modern Design**: Clean, youth-friendly interface with electric blue and cyan color palette
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Dark/Light Mode**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **SEO Optimized**: Complete metadata, Open Graph, and JSON-LD structured data
- **Contact Form**: Working contact form with API handler and toast notifications
- **VEX Robotics Focus**: Dedicated section with interactive FAQ accordion

## 🛠 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Fonts**: Inter (body) + Space Grotesk (headings)
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Theme**: next-themes for dark/light mode

## 📦 Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## 🏗 Build & Deploy

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/contact/        # Contact form API handler
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Client providers wrapper
├── components/             # Reusable components
│   ├── ui/                 # shadcn/ui components
│   ├── about.tsx           # About section
│   ├── contact.tsx         # Contact form section
│   ├── footer.tsx          # Site footer
│   ├── get-involved.tsx    # Get involved section
│   ├── hero.tsx            # Hero section
│   ├── mission.tsx         # Mission & vision section
│   ├── navbar.tsx          # Navigation bar
│   ├── programs.tsx        # Programs section
│   ├── theme-provider.tsx  # Theme context provider
│   └── vex-robotics.tsx    # VEX robotics section
├── lib/                    # Utility functions
└── public/                 # Static assets
    ├── logo.png            # Organization logo (to be added)
    ├── hero.jpg            # Hero background (placeholder)
    └── og.jpg              # Open Graph image (placeholder)
```

## 🎨 Brand Guidelines

### Colors
- **Electric Blue**: #2563EB (Primary brand color)
- **Cyan**: #06B6D4 (Secondary accent)
- **Graphite**: #111827 (Dark backgrounds)
- **Slate**: #1F2937 (Medium backgrounds)
- **Silver**: #9CA3AF (Text/borders)
- **White**: #FFFFFF (Light backgrounds)

### Typography
- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Hierarchy**: Clear visual hierarchy with consistent spacing

### Design Principles
- Clean, modern aesthetic
- Youth-friendly and approachable
- Technology-focused visual elements
- Accessible color contrasts
- Smooth micro-interactions

## 📋 Page Sections

1. **Header/Navigation**: Sticky nav with smooth scroll anchors
2. **Hero**: Gradient background with call-to-action buttons
3. **About**: Nonprofit purpose and public benefit statement
4. **Mission & Vision**: Organizational goals and aspirations
5. **Programs**: Educational offerings and activities
6. **VEX Robotics**: Dedicated program showcase with FAQ
7. **Get Involved**: Student, mentor, and donor engagement
8. **Contact**: Working contact form with validation
9. **Footer**: Links, legal notices, and branding

## ⚡ Performance & SEO

- Lighthouse optimized for performance, accessibility, and SEO
- Semantic HTML with proper heading hierarchy
- Alt text for all images
- Focus states for keyboard navigation
- Open Graph meta tags for social sharing
- JSON-LD structured data for search engines

## 🤝 Contact Form Integration

The contact form (`/api/contact`) currently logs submissions to the console. For production deployment, integrate with:

- Email services (SendGrid, Mailgun, etc.)
- CRM systems (HubSpot, Salesforce, etc.)  
- Database storage (Supabase, PostgreSQL, etc.)
- Notification systems (Slack, Discord, etc.)

## 📸 Assets Needed

Place these files in the `/public` directory:
- `logo.png`: Organization logo (40x40px recommended)
- `hero.jpg`: Hero section background image
- `og.jpg`: Open Graph image (1200x630px)

## 🧪 Testing

The website includes:
- Form validation and error handling
- Responsive design testing across breakpoints
- Accessibility testing with screen readers
- Cross-browser compatibility
- Performance optimization

## 📄 License

This project is created for NextGen AI BOTS Inc. All rights reserved.

---

**VEX® Trademark Notice**: VEX® is a trademark of its respective owner. All program references are for educational purposes only.