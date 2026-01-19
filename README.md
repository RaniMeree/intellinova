# Intellinova Solutions Website

A modern, elegant, and responsive website for Intellinova Solutions - an AI company offering cutting-edge AI solutions.

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Loading**: Optimized static files for quick page loads
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Contact Form**: Integrated contact form that opens the user's email client
- **Smooth Navigation**: Sticky navbar with smooth scrolling

## 📄 Pages

1. **Home** (`index.html`)
   - Hero section with call-to-action buttons
   - Vision & Mission overview
   - Featured projects showcase
   - Why choose Intellinova section
   
2. **Projects** (`projects.html`)
   - Overview of all three projects with links to dedicated pages
   
3. **CalorAI** (`calorai.html`) - Dedicated Project Page
   - AI-powered nutrition and calorie tracking app
   - 50K+ downloads, 500K+ meals logged
   - Comprehensive feature showcase
   - Download links to Google Play Store
   
4. **Juridik AI** (`juridikai.html`) - Dedicated Project Page
   - AI-powered legal assistant for Swedish law
   - Document analysis and legal research
   - Detailed features and use cases
   
5. **Realify** (`realify.html`) - Dedicated Project Page
   - AI-powered real estate platform
   - Property valuation and market insights
   - Coming soon status
   
6. **About Us** (`about.html`)
   - Company story
   - Detailed vision & mission
   - Core values
   - Services overview
   
7. **Contact** (`contact.html`)
   - Contact information
   - Email: info@intellinovasolutions.com
   - Phone: +46 700 456 718
   - Contact form with email integration

## 🚀 Getting Started

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser:
- Double-click on `index.html` file
- Or right-click and select "Open with" your preferred browser

### Option 2: Use VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Use Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Option 4: Use Node.js HTTP Server
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Run server
http-server -p 8000

# Then open http://localhost:8000 in your browser
```

## 📁 File Structure

```
Web/
├── index.html          # Home page
├── projects.html       # Projects overview page
├── calorai.html        # CalorAI dedicated page
├── juridikai.html      # Juridik AI dedicated page
├── realify.html        # Realify dedicated page
├── about.html          # About us page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet (with product page styles)
├── script.js           # JavaScript functionality
├── assets/
│   └── calorai-logo.png # CalorAI logo
└── README.md           # This file
```

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: Indigo (#6366f1)
  - Secondary: Teal (#14b8a6)
  - Accent: Amber (#f59e0b)
  
- **Typography**: Inter font family for clean, modern text
- **Animations**: Smooth fade-in effects and hover transitions
- **Layout**: CSS Grid and Flexbox for responsive layouts

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

## ✉️ Contact Form

The contact form uses the `mailto:` protocol to open the user's default email client with pre-filled information. For production use, you may want to integrate with:
- **Email Services**: SendGrid, Mailgun, AWS SES
- **Backend API**: Node.js, Python Flask/Django, PHP
- **Form Services**: Formspree, Netlify Forms, Google Forms API

### Integration Example (Future Enhancement)

```javascript
// Replace the mailto approach with an API call:
const response = await fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});
```

## 🔧 Future Enhancements

When you're ready to make the site dynamic, consider:

1. **Backend Integration**
   - Node.js/Express or Python/Flask backend
   - Database for storing contact submissions
   - Admin dashboard for managing content

2. **CMS Integration**
   - Strapi, Contentful, or WordPress headless CMS
   - Easy content updates without code changes

3. **Additional Features**
   - Blog section for company updates
   - Case studies and testimonials
   - Newsletter subscription
   - Chat widget integration
   - Analytics (Google Analytics, Plausible)

4. **Deployment Options**
   - Netlify (recommended for static sites)
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront
   - Traditional web hosting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

© 2026 Intellinova Solutions. All rights reserved.

## 📞 Contact

For questions or support:
- Email: info@intellinovasolutions.com
- Phone: +46 700 456 718

---

Built with ❤️ by Intellinova Solutions
