# ModernBlog - A Next.js & Sanity Blog Platform

![ModernBlog Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop)

## 🌟 Overview

ModernBlog is a production-ready, full-featured blog platform that combines the power of Next.js with the flexibility of Sanity CMS. It delivers a stunning, modern user experience with a focus on performance, accessibility, and content management simplicity.

## ✨ Key Features

### 🎨 Design & User Experience
- **Modern Glassmorphism Design**: Sleek header with backdrop blur effects
- **Responsive Layout**: Perfect experience on all devices (mobile, tablet, desktop)
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Dark Mode Ready**: Built with CSS variables for easy theme switching
- **Professional Typography**: Clean, readable fonts with optimal spacing

### 📝 Content Management
- **Sanity CMS Integration**: Powerful, flexible content management
- **Rich Text Editor**: Support for formatted text, images, and embedded content
- **Real-time Preview**: See changes instantly as you edit
- **SEO-Optimized**: Built-in SEO features for better search rankings
- **Image Optimization**: Automatic image resizing and format optimization

### 🚀 Performance & Technical
- **Next.js App Router**: Latest Next.js features for optimal performance
- **Server-Side Rendering**: Fast initial page loads and better SEO
- **TypeScript**: Full type safety throughout the application
- **Image Optimization**: Next.js Image component for automatic optimization
- **Code Splitting**: Automatic code splitting for faster load times

### 🔧 Developer Experience
- **Component-Based Architecture**: Reusable, maintainable components
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Shadcn/UI**: Beautiful, accessible components
- **Hot Reload**: Instant feedback during development
- **ESLint & TypeScript**: Code quality and consistency

## 🏗️ Architecture

```
modern-blog/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [slug]/            # Dynamic blog post pages
│   │   ├── studio/            # Sanity Studio integration
│   │   ├── layout.tsx         # Root layout with header/footer
│   │   └── page.tsx           # Homepage with hero and posts
│   ├── components/            # Reusable React components
│   │   ├── ui/               # Shadcn/UI components
│   │   ├── header.tsx        # Modern navigation header
│   │   ├── footer.tsx        # Feature-rich footer
│   │   └── hero-section.tsx  # Landing page hero
│   ├── lib/                   # Utility functions and configurations
│   │   ├── utils.ts          # Helper functions
│   │   └── sanity.ts         # Sanity client configuration
│   └── hooks/                 # Custom React hooks
├── sanity/                    # Sanity CMS configuration
│   ├── schema/               # Content type definitions
│   │   └── post.ts           # Blog post schema
│   ├── sanity.config.ts      # Studio configuration
│   └── sanity.cli.ts         # CLI configuration
├── public/                    # Static assets
├── .env.local.example         # Environment variables template
└── package.json              # Dependencies and scripts
```

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React version
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Sanity CMS](https://www.sanity.io/)** - Headless content management

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Prose styling

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Vercel](https://vercel.com/)** - Deployment platform

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - or npm/yarn as alternative
- **Git** (for version control)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/modern-blog.git
   cd modern-blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   
   # Open .env.local and add your Sanity project details
   nano .env.local
   ```

4. **Configure Sanity CMS**
   - Visit [Sanity.io](https://www.sanity.io/) and create a new project
   - Get your project ID and dataset name from the Sanity dashboard
   - Update your `.env.local` file:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
     NEXT_PUBLIC_SANITY_DATASET="your-dataset-name"
     NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
     ```

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your blog.

## 📖 Using Sanity Studio

Sanity Studio is your content management interface, fully integrated into your Next.js application.

### Accessing the Studio
- Navigate to `http://localhost:3000/studio`
- You'll see the Sanity Studio interface embedded in your app

### Creating Content
1. **Create a new post**
   - Click the "+" button or "Post" in the sidebar
   - Fill in the required fields:
     - **Title**: Your blog post title
     - **Slug**: URL-friendly version (auto-generated from title)
     - **Image**: Featured image for the post
     - **Published At**: Publication date
     - **Body**: Main content using the rich text editor

2. **Rich Text Editing**
   - Use the toolbar to format text (bold, italic, headings)
   - Insert images by clicking the image button
   - Create lists, quotes, and links
   - Preview your content in real-time

3. **Publishing Content**
   - Click "Publish" to make content live
   - Use "Save" to store drafts
   - Content updates automatically on your website

### Best Practices
- **SEO Optimization**: Write descriptive titles and slugs
- **Image Optimization**: Upload high-quality images, Sanity handles resizing
- **Content Structure**: Use headings (H2, H3) to organize your content
- **Regular Updates**: Keep your content fresh and engaging

## 🎨 Customization Guide

### Styling
- **Colors**: Modify `tailwind.config.ts` to change the color scheme
- **Fonts**: Update the font in `src/app/layout.tsx`
- **Spacing**: Adjust Tailwind classes throughout components
- **Animations**: Customize or add new animations in `globals.css`

### Components
- **Header**: Modify `src/components/header.tsx` for navigation changes
- **Footer**: Update `src/components/footer.tsx` for footer content
- **Hero Section**: Customize `src/components/hero-section.tsx`
- **Post Cards**: Style post cards in `src/app/page.tsx`

### Content Schema
- **Post Schema**: Modify `sanity/schema/post.ts` to add new fields
- **New Content Types**: Create additional schemas in `sanity/schema/`

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/modern-blog.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy!

### Environment Variables on Vercel
Add these to your Vercel project settings:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### Alternative Deployment Options
- **Netlify**: Connect your GitHub repo
- **Railway**: Use their CLI or dashboard
- **DigitalOcean**: Deploy using their App Platform

## 🔧 Development Guide

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── [slug]/            # Dynamic blog post pages
│   ├── studio/            # Sanity Studio
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── hero-section.tsx  # Landing hero
├── lib/                   # Utilities
│   ├── utils.ts          # Helper functions
│   └── sanity.ts         # Sanity client
└── hooks/                 # Custom hooks
```

### Key Files
- `src/app/page.tsx` - Homepage with hero and post grid
- `src/app/[slug]/page.tsx` - Individual blog post pages
- `src/lib/sanity.ts` - Sanity client configuration
- `sanity/schema/post.ts` - Blog post content schema

### Adding New Features
1. **New Components**: Create in `src/components/`
2. **New Pages**: Add folders in `src/app/`
3. **API Routes**: Create in `src/app/api/`
4. **Content Types**: Add schemas in `sanity/schema/`

## 🐛 Troubleshooting

### Common Issues

**Sanity Client Error**
- Ensure environment variables are correctly set
- Check Sanity project ID and dataset name
- Verify network connectivity

**Build Errors**
- Run `pnpm build` to see detailed error messages
- Check for TypeScript errors
- Ensure all dependencies are installed

**Images Not Loading**
- Verify image URLs in Sanity
- Check Next.js image configuration
- Ensure proper image domains in `next.config.ts`

**Studio Not Loading**
- Check browser console for errors
- Verify Sanity configuration
- Ensure all Sanity packages are installed

### Getting Help
- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [Sanity documentation](https://www.sanity.io/docs)
- Review [Tailwind CSS documentation](https://tailwindcss.com/docs)

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
 
