# AI Calculator

> Free online calculator platform with AI-powered insights. 100% free forever, supported by ads.

## 🌟 Features

- ✅ **Basic Calculator** - Full-featured calculator with keyboard support
- ✅ **30+ Specialized Calculators** - BMI, Loan, Tax, Percentage, and more
- ✅ **AI-Powered Analysis** - Get intelligent insights for your calculations
- ✅ **100% Free** - All features available to everyone
- ✅ **Multi-language Support** - Available in 10+ languages
- ✅ **Responsive Design** - Perfect on desktop, tablet, and mobile
- ✅ **No Registration Required** - Start calculating immediately

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: OpenAI GPT-4 API
- **Database**: Supabase (PostgreSQL)
- **Caching**: Upstash Redis
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm/pnpm/yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-calculator.git
   cd ai-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and fill in your API keys:
   - `OPENAI_API_KEY` - Get from [OpenAI Platform](https://platform.openai.com)
   - `NEXT_PUBLIC_SUPABASE_URL` - Get from [Supabase](https://supabase.com)
   - Other optional keys as needed

4. **Run development server**
   
   **Windows (Recommended):**
   Double-click `快速启动.bat` for one-click startup!
   
   **Or use command line:**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
ai-calculator/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── api/               # API routes
│       ├── health/        # Health check
│       └── ai/            # AI analysis
├── components/            # React components
│   ├── Calculator/        # Calculator components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   └── ...
├── lib/                   # Utilities
│   ├── utils.ts           # Helper functions
│   └── types.ts           # TypeScript types
├── public/                # Static assets
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind config
└── package.json           # Dependencies
```

## 🔧 Development

### Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript checks
```

### Adding a New Calculator

1. Create a new page in `app/(calculators)/[name]/page.tsx`
2. Create the calculator component in `components/Calculator/`
3. Add to the calculator list in `components/PopularCalculators.tsx`
4. Update the types in `lib/types.ts`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-calculator)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Vercel

Add these in your Vercel project settings:

- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## 📊 Roadmap

### Phase 1: MVP (Month 1-2) ✅
- [x] Basic calculator
- [x] First 4 specialized calculators
- [x] AI analysis integration
- [x] Responsive UI
- [x] SEO optimization

### Phase 2: Growth (Month 3-6)
- [ ] 30+ specialized calculators
- [ ] Multi-language support
- [ ] User accounts (optional)
- [ ] Calculation history
- [ ] PDF export

### Phase 3: Scale (Month 7-12)
- [ ] Blog platform
- [ ] Advanced AI features
- [ ] API for developers
- [ ] Mobile apps (PWA)
- [ ] Community features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💰 Business Model

This platform is **100% free** for all users, supported by:

- 📢 Google AdSense (non-intrusive ads)
- 🤝 Affiliate partnerships (financial/health products)
- 📝 Sponsored content (future)

## 📮 Contact

- Website: [aicalculator.com](https://aicalculator.com)
- Email: support@aicalculator.com
- Twitter: [@AICalculator](https://twitter.com/AICalculator)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [OpenAI](https://openai.com/) - AI-powered analysis
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Vercel](https://vercel.com/) - Deployment platform

---

**Made with ❤️ for everyone who needs calculations**

