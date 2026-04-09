# Modern Fullstack Developer Portfolio

A premium, interactive portfolio website built with cutting-edge web technologies to showcase fullstack development expertise. Featuring smooth animations, interactive elements, and a polished dark-mode design optimized for exceptional user experience.

## Features

- **Interactive Node Graph Hero** - Dynamic constellation of nodes representing microservices architecture with cursor interaction and data packet animations
- **Custom Morphing Cursor** - Context-aware cursor that adapts based on content type (text, links, projects)
- **Lenis Smooth Scroll** - Premium inertia-based scrolling for a polished, native-app feel
- **Command Palette (Cmd+K)** - Keyboard-driven navigation and quick access to portfolio sections
- **Responsive Design** - Seamlessly adapts from mobile to desktop with optimized layouts
- **Skills Visualization** - Interactive skill cards with category filtering and animated progress indicators
- **Project Showcase** - Featured and full project gallery with detailed information and links
- **Experience Timeline** - Professional journey displayed in an elegant alternating timeline layout
- **Terminal-Styled Contact Form** - Modern contact form with terminal aesthetic and real-time validation
- **Smooth Animations** - Framer Motion and GSAP powered transitions throughout
- **SEO Optimized** - Proper metadata, semantic HTML, and accessibility best practices

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Advanced animations and interactions
- **shadcn/ui** - High-quality UI components
- **Lenis** - Smooth scrolling library
- **GSAP** - Professional animation toolkit

### Development
- **pnpm** - Fast package manager
- **ESLint** - Code quality
- **Vercel Analytics** - Performance monitoring

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
/app
  /layout.tsx          - Root layout with fonts and metadata
  /page.tsx            - Main portfolio page
  /globals.css         - Global styles and CSS variables

/components
  /sections
    /hero.tsx          - Hero section with node graph
    /about.tsx         - About section with highlights
    /skills.tsx        - Skills section with filtering
    /projects.tsx      - Projects showcase
    /experience.tsx    - Experience timeline
    /contact.tsx       - Contact form with terminal style
  /ui                  - shadcn/ui components
  custom-cursor.tsx    - Custom cursor implementation
  smooth-scroll.tsx    - Lenis scroll setup
  command-palette.tsx  - Command palette (Cmd+K)
  node-graph.tsx       - Interactive node graph canvas
  navigation.tsx       - Navigation bar with scroll spy
  footer.tsx           - Footer component
```

## Customization

### Update Personal Information

Edit the content in each section component:
- **Hero**: `/components/sections/hero.tsx`
- **About**: `/components/sections/about.tsx`
- **Skills**: `/components/sections/skills.tsx`
- **Projects**: `/components/sections/projects.tsx`
- **Experience**: `/components/sections/experience.tsx`
- **Contact**: `/components/sections/contact.tsx`

### Customize Colors

Edit the design tokens in `/app/globals.css`:
```css
:root {
  --primary: oklch(0.72 0.18 180);      /* Main accent color */
  --background: oklch(0.08 0.01 270);   /* Background color */
  --card: oklch(0.11 0.012 270);        /* Card background */
  /* ... more tokens ... */
}
```

### Add More Projects

Add project data to the projects section array with title, description, links, and tags.

### Modify Animations

- **Global animations**: `/app/globals.css` contains keyframe animations
- **Component animations**: Framer Motion variants in individual components
- **Scroll animations**: Configured in `smooth-scroll.tsx`

## Key Components Explained

### Custom Cursor
Provides an interactive cursor that morphs based on what element it hovers over. Variants include default, text selection, links, and projects.

### Node Graph
Canvas-based interactive visualization showing nodes with distance-based connections. Features cursor evasion and animated data packets flowing between nodes.

### Command Palette
Keyboard-driven command interface (Cmd+K or Ctrl+K) for quick navigation and theme switching.

### Terminal Contact Form
A stylized contact form with terminal aesthetic, including blinking cursor effects, ASCII loading states, and success animations.

## Performance Optimizations

- **Image Optimization**: Next.js Image component for responsive images
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Animation Performance**: Hardware-accelerated transforms with Framer Motion
- **Lazy Loading**: Components load on demand

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel auto-deploys on push
4. Custom domain configuration available

### Deploy to Other Platforms

```bash
# Build the project
pnpm build

# The build output is in .next/
# Deploy the .next folder with Node.js runtime
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Accessibility

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support (Command Palette)
- Focus states on interactive elements
- High contrast color scheme
- Screen reader friendly

## Environment Variables

Currently no environment variables required. For future integrations (email service, analytics), add them to `.env.local`:

```env
NEXT_PUBLIC_ANALYTICS_ID=your_id_here
```

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Animation Performance Issues
- Reduce animation complexity in `globals.css`
- Check browser hardware acceleration is enabled
- Test on different devices for optimal performance

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Clear browser cache (Cmd+Shift+Delete)
- Verify CSS variables are set in `globals.css`

## Contributing

Feel free to fork this project and customize it for your own portfolio. Pull requests for improvements are welcome!

## License

This project is open source and available under the MIT License.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Author

**Alex Chen** - Fullstack Developer

- Email: contact@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com)
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

## Support

For questions, issues, or suggestions, please open an issue on GitHub or reach out through the contact form on the portfolio.

---

Built with ❤️ using modern web technologies.
