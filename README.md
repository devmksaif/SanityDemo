# Shubz Entertainment - Modern Creative Agency Website

![Shubz Entertainment Banner](https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop)

## 🌟 Overview

Shubz Entertainment is a cutting-edge creative agency website built with Next.js and Sanity CMS. This platform showcases a stunning, modern design with advanced animations, 3D elements, and a premium user experience focused on highlighting creative divisions, portfolio projects, and industry news.

## ✨ Key Features

### 🎨 Design & User Experience
- **Modern Glassmorphism Design**: Stunning header with backdrop blur effects and animated elements
- **Advanced Animations**: Framer Motion powered transitions, hover effects, and micro-interactions
- **Premium Component Library**: Custom animated components (TextPressure, RotatingText, GradientText, PixelTransition)
- **3D Interactive Elements**: Three.js integration for immersive experiences
- **Dark/Light Mode**: Seamless theme switching with consistent styling
- **Responsive Excellence**: Perfect experience across all devices and screen sizes

### 📱 Page Architecture
- **Dynamic Homepage**: Hero section with animated components and featured content
- **Portfolio Showcase**: Advanced filtering, multiple view modes, and stunning case study presentations
- **Creative Divisions**: Enhanced division cards with 3D animations and professional layouts
- **Modern Newsroom**: Magazine-style layout with category filtering and article cards
- **Interactive Navigation**: 3D menu elements and smooth page transitions

### 🏢 Content Management
- **Sanity CMS Integration**: Powerful headless CMS for content management
- **Rich Content Types**: Portfolio projects, news articles, team members, divisions, and pages
- **Cloudinary Integration**: Advanced image optimization and delivery
- **Real-time Preview**: Instant content updates with live preview
- **SEO Optimization**: Built-in SEO features and metadata management

### 🚀 Performance & Technical
- **Next.js 15 App Router**: Latest Next.js features with server components
- **TypeScript Excellence**: Full type safety throughout the application
- **Advanced State Management**: React hooks and context for smooth interactions
- **Code Splitting**: Automatic optimization for faster load times
- **Image Optimization**: Next.js Image and Cloudinary for perfect performance

### 🎬 Animated Components
- **TextPressure**: Interactive text with pressure-sensitive effects
- **RotatingText**: Smooth text rotation with spring animations
- **GradientText**: Animated gradient text effects
- **PixelTransition**: Creative pixel-based transitions
- **AnimatedList**: Staggered list animations
- **CircularGallery**: 3D circular image galleries
- **RollingGallery**: Dynamic rolling image displays

## 🏗️ Architecture

```
shubz-entertainment/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [slug]/            # Dynamic page routing
│   │   ├── about/             # About page with team showcase
│   │   ├── contact/           # Contact page with forms
│   │   ├── divisions/         # Creative divisions showcase
│   │   ├── newsroom/          # News and article management
│   │   ├── portfolio/         # Portfolio projects display
│   │   ├── studio/            # Sanity Studio integration
│   │   ├── layout.tsx         # Root layout with navigation
│   │   └── page.tsx           # Homepage with hero
│   ├── components/            # Reusable React components
│   │   ├── ui/               # Shadcn/UI base components
│   │   ├── 3d/               # Three.js 3D components
│   │   ├── blocks/           # Content block components
│   │   ├── animated/         # Custom animated components
│   │   ├── header.tsx        # Modern navigation header
│   │   ├── footer.tsx        # Feature-rich footer
│   │   └── theme-provider.tsx # Theme management
│   ├── lib/                   # Utility functions and configurations
│   │   ├── utils.ts          # Helper functions
│   │   ├── sanity.ts         # Sanity client configuration
│   │   └── three-setup.ts    # Three.js utilities
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript type definitions
├── sanity/                    # Sanity CMS configuration
│   ├── schema/               # Content type definitions
│   │   ├── blocks/           # Content block schemas
│   │   ├── author.ts         # Author content type
│   │   ├── division.ts       # Division content type
│   │   ├── newsArticle.ts    # News article schema
│   │   ├── portfolioProject.ts # Portfolio project schema
│   │   └── teamMember.ts     # Team member schema
│   ├── components/           # Custom studio components
│   ├── sanity.config.ts      # Studio configuration
│   └── sanity.cli.ts         # CLI configuration
├── public/                    # Static assets and images
├── design-system/            # Design system documentation
└── scripts/                  # Utility scripts and tools
```

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and server components
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with strict mode
- **[Sanity CMS](https://www.sanity.io/)** - Headless content management system

### Animation & 3D
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Three.js](https://threejs.org/)** - 3D graphics and interactive elements
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **Custom Animation Components** - TextPressure, RotatingText, GradientText, PixelTransition

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching system

### Media & Assets
- **[Cloudinary](https://cloudinary.com/)** - Advanced image and video management
- **[Next.js Image](https://nextjs.org/docs/api-reference/next/image)** - Optimized image component
- **[next-cloudinary](https://next-cloudinary.spacejelly.dev/)** - Cloudinary integration for Next.js

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting with custom rules
- **[Prettier](https://prettier.io/)** - Code formatting
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - recommended package manager
- **Git** (for version control)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/devmksaif/SanityDemo.git
   cd SanityDemo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create environment file
   cp .env.local.example .env.local
   
   # Add your configuration
   nano .env.local
   ```

4. **Configure Sanity CMS**
   - Visit [Sanity.io](https://www.sanity.io/) and create a new project
   - Get your project ID and dataset name from the Sanity dashboard
   - Configure Cloudinary for image management
   - Update your `.env.local` file:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
     NEXT_PUBLIC_SANITY_DATASET="your-dataset-name" 
     NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
     ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

7. **Access Sanity Studio**
   Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) for content management.

## 📖 Content Management

Sanity Studio is your powerful content management interface, fully integrated into the Next.js application.

### Accessing the Studio
- Navigate to `http://localhost:3000/studio`
- Modern, intuitive interface for all content types

### Content Types Available

#### 📰 News Articles
- **Title**: Article headline
- **Slug**: URL-friendly identifier
- **Cover Image**: Featured image with Cloudinary optimization
- **Excerpt**: Article summary for previews
- **Published At**: Publication date and time
- **Body**: Rich content with embedded media

#### 🎨 Portfolio Projects
- **Project Title**: Creative project name
- **Slug**: URL path for project pages
- **Category**: Project classification (branding, web, mobile, etc.)
- **Featured Image**: Main project showcase image
- **Description**: Project overview and details
- **Client Information**: Client name and industry
- **Technologies Used**: Tech stack and tools
- **Project Gallery**: Multiple project images
- **Case Study**: Detailed project breakdown

#### 🏢 Creative Divisions
- **Division Name**: Department or creative unit
- **Description**: Division overview and capabilities
- **Services**: List of services offered
- **Team Members**: Associated team members
- **Featured Projects**: Showcase projects
- **Division Logo**: Visual identifier

#### 👥 Team Members
- **Name**: Team member full name
- **Position**: Job title and role
- **Bio**: Professional background
- **Profile Image**: Professional headshot
- **Social Links**: Professional social media profiles
- **Division**: Associated creative division

#### 📄 Pages
- **Page Title**: Dynamic page title
- **Slug**: URL path
- **SEO Metadata**: Title, description, keywords
- **Content Blocks**: Flexible content sections
- **Hero Section**: Featured content area

### Rich Content Editing
- **Block Editor**: Rich text with custom styling
- **Image Blocks**: Cloudinary-powered image management
- **Text Blocks**: Formatted text content
- **Embedded Media**: Videos, galleries, and interactive content
- **Custom Components**: Specialized content blocks

## 🎨 Customization Guide

### Visual Design
- **Theme System**: Dark/light mode with CSS variables
- **Color Palette**: Modify `tailwind.config.ts` for brand colors
- **Typography**: Update font configuration in `src/app/layout.tsx`
- **Animations**: Customize Framer Motion settings throughout components
- **3D Elements**: Adjust Three.js scenes in `src/components/3d/`

### Component Customization
- **Animated Components**: Modify `TextPressure`, `RotatingText`, `GradientText`
- **Navigation**: Update `src/components/header.tsx` and `nav-3d-link.tsx`
- **Hero Sections**: Customize hero components for each page
- **Card Designs**: Enhance portfolio, division, and news card layouts
- **Footer**: Update `src/components/footer.tsx` for branding

### Content Schema Extensions
- **New Fields**: Add custom fields to existing content types
- **New Content Types**: Create additional schemas in `sanity/schema/`
- **Custom Blocks**: Build specialized content blocks
- **Validation Rules**: Add content validation and requirements

### Animation Customization
- **Framer Motion**: Adjust animation timings and easing
- **3D Scenes**: Modify Three.js components for unique effects
- **Micro-interactions**: Enhance hover states and transitions
- **Page Transitions**: Customize route change animations

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Deploy Shubz Entertainment website"
   git push origin main
   ```

2. **Vercel Deployment**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy with zero configuration

3. **Environment Variables**
   Add these to your Vercel project settings:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=your-dataset-name
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```

### Alternative Deployment Options

#### Netlify
- Connect GitHub repository
- Configure build settings: `pnpm build`
- Set publish directory: `.next`

#### Railway
- Connect GitHub repository
- Add environment variables
- Automatic deployments on push

### Production Optimization

#### Performance Checklist
- [ ] Enable Vercel Analytics
- [ ] Configure Cloudinary auto-optimization
- [ ] Set up proper caching headers
- [ ] Enable compression and minification
- [ ] Test Core Web Vitals scores

#### SEO Configuration
- [ ] Submit sitemap to search engines
- [ ] Configure robots.txt
- [ ] Set up Google Analytics
- [ ] Implement structured data
- [ ] Test social media previews

## 🤝 Contributing

We welcome contributions to make Shubz Entertainment even better!

### Development Workflow
1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add TypeScript types
   - Update documentation
   - Test thoroughly
4. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push and create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Contribution Guidelines
- **Code Style**: Follow existing patterns and use Prettier
- **TypeScript**: Maintain strict type safety
- **Components**: Create reusable, documented components
- **Testing**: Test animations and responsive behavior
- **Documentation**: Update README for new features

### Areas for Contribution
- **New Animated Components**: Creative animation effects
- **3D Elements**: Enhanced Three.js integrations
- **Performance**: Optimization improvements
- **Accessibility**: WCAG compliance enhancements
- **Content Types**: New Sanity schema types

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Core Technologies
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Sanity](https://www.sanity.io/)** - The composable content cloud
- **[Framer Motion](https://www.framer.com/motion/)** - A production-ready motion library
- **[Three.js](https://threejs.org/)** - JavaScript 3D library
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework

### UI & Design
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful and accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[Cloudinary](https://cloudinary.com/)** - Media management and optimization
- **[Vercel](https://vercel.com/)** - The platform for frontend developers

### Special Thanks
- The open-source community for incredible tools and libraries
- Design inspiration from modern creative agencies
- Contributors and testers who helped improve the platform

---

## 🌟 Features Showcase

### ✨ **Recent Updates**
- ✅ **Enhanced Portfolio**: Advanced filtering, multiple view modes, stunning case studies
- ✅ **Modern Newsroom**: Magazine-style layout with category filtering
- ✅ **Creative Divisions**: 3D animations and professional presentations  
- ✅ **Animated Components**: TextPressure, RotatingText, GradientText, PixelTransition
- ✅ **Consistent Design**: Unified color scheme and visual hierarchy
- ✅ **Performance Optimized**: Fast loading with smooth animations

### 🎯 **Coming Soon**
- Advanced contact forms with validation
- Team member detail pages
- Project case study templates
- Enhanced 3D interactions
- Blog comment system
- Multi-language support

---

**Built with ❤️ by the Shubz Entertainment team**

*Creating exceptional digital experiences through cutting-edge technology and stunning design.*

For support, please open an issue on GitHub or contact our development team.

---

*Documentation updated by Dyad AI Assistant - Your intelligent development companion.*

## 🔧 Development Guide

### Project Structure Deep Dive
```
src/
├── app/                      # Next.js App Router
│   ├── [slug]/              # Dynamic pages with full-featured routing
│   ├── about/               # About page with team showcase
│   ├── contact/             # Contact forms and information
│   ├── divisions/           # Creative divisions with 3D animations
│   ├── newsroom/            # Magazine-style news layout
│   ├── portfolio/           # Advanced portfolio with filtering
│   ├── studio/              # Embedded Sanity Studio
│   ├── layout.tsx           # Root layout with navigation
│   └── page.tsx             # Homepage with animated hero
├── components/              # Reusable React components
│   ├── ui/                  # Shadcn/UI base components
│   ├── 3d/                  # Three.js 3D components
│   ├── blocks/              # Content block renderers
│   ├── animated/            # Custom animation components
│   │   ├── TextPressure.tsx # Pressure-sensitive text
│   │   ├── RotatingText.tsx # Smooth text rotation
│   │   ├── GradientText.tsx # Animated gradients
│   │   └── PixelTransition.tsx # Pixel effects
│   ├── navigation/          # Header and menu components
│   └── layout/              # Layout components
├── lib/                     # Core utilities
│   ├── utils.ts             # Helper functions
│   ├── sanity.ts            # Sanity client setup
│   ├── sanity-helpers.ts    # Content fetching utilities
│   └── three-setup.ts       # Three.js configuration
├── hooks/                   # Custom React hooks
│   ├── use-mobile.tsx       # Mobile detection
│   └── use-scrolled.ts      # Scroll state management
└── types/                   # TypeScript definitions
    └── sanity.ts            # Content type definitions
```

### Key Features Implementation

#### Portfolio System
- **Advanced Filtering**: Category-based project filtering
- **Multiple View Modes**: Grid and list views with smooth transitions
- **Case Study Details**: Rich project presentations
- **Client Integration**: Client information and testimonials

#### News & Content
- **Magazine Layout**: Modern newsroom with card-based design
- **Category Management**: Dynamic content categorization
- **Article Pages**: Rich content with embedded media
- **SEO Optimization**: Metadata and structured data

#### Creative Divisions
- **3D Animations**: Interactive division showcases
- **Team Integration**: Division-based team member grouping
- **Service Highlighting**: Capability presentations
- **Performance Metrics**: Division statistics and achievements

### Adding New Features

#### New Animated Components
1. Create component in `src/components/animated/`
2. Implement Framer Motion animations
3. Add TypeScript types and props
4. Export from component index

#### New Content Types
1. Define schema in `sanity/schema/`
2. Add to schema index
3. Create TypeScript types in `src/types/sanity.ts`
4. Build corresponding React components

#### New Pages
1. Create folder in `src/app/`
2. Add `page.tsx` with server component
3. Implement client components as needed
4. Add navigation links

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Animation Performance
**Issue**: Animations stuttering or laggy
**Solutions**:
- Check for `will-change` CSS property usage
- Optimize Framer Motion animations with `layoutId`
- Use `transform` and `opacity` for best performance
- Enable GPU acceleration in browser settings

#### 3D Rendering Issues
**Issue**: Three.js components not loading
**Solutions**:
- Verify WebGL support in browser
- Check console for Three.js errors
- Ensure proper canvas sizing
- Use error boundaries for 3D components

#### Sanity Content Loading
**Issue**: Content not appearing or outdated
**Solutions**:
- Check environment variables
- Verify Sanity project ID and dataset
- Test API connections in network tab
- Clear browser cache and restart dev server

#### Image Optimization
**Issue**: Images loading slowly or not at all
**Solutions**:
- Verify Cloudinary configuration
- Check image URLs and public IDs
- Ensure proper Next.js Image component usage
- Test image domains in `next.config.ts`

#### Theme Switching
**Issue**: Dark/light mode not working properly
**Solutions**:
- Check `next-themes` configuration
- Verify CSS variable definitions
- Ensure hydration matches on server/client
- Test theme persistence in localStorage

#### TypeScript Errors
**Issue**: Type errors during development
**Solutions**:
- Run `pnpm type-check` for detailed errors
- Update Sanity types with schema changes
- Check component prop interfaces
- Verify import/export consistency

### Performance Optimization

#### Bundle Analysis
```bash
# Analyze bundle size
pnpm build && pnpm analyze

# Check for unnecessary dependencies
pnpm dlx depcheck
```

#### Image Optimization
- Use Cloudinary transformations
- Implement progressive loading
- Add proper alt texts for accessibility
- Use responsive image sizing

#### Animation Optimization
- Use `transform` and `opacity` for animations
- Implement `useMemo` for expensive calculations
- Add `will-change` CSS for animation elements
- Use `framer-motion` layout animations efficiently

### Getting Help & Support

#### Documentation Resources
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Sanity Content Studio](https://www.sanity.io/docs/studio)
- [Framer Motion API](https://www.framer.com/motion/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)

#### Community Support
- GitHub Issues for bug reports
- Discussions for feature requests
- Stack Overflow for development questions
- Discord/Slack communities for real-time help

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Sanity](https://www.sanity.io/) for the powerful CMS
- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for the seamless deployment platform

---

**Built with ❤️ using Next.js, Sanity, and Tailwind CSS**

For support, please open an issue on GitHub or contact the maintainers.

---

*This README was generated with the help of Dyad - Your AI development assistant.*