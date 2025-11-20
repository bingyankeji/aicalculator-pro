import { getUrl } from '@/config/site';

export const quadraticStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Quadratic Formula Calculator",
      "url": getUrl('/quadratic-formula-calculator'),
      "description": "Free quadratic formula calculator to solve ax^2 + bx + c = 0 with discriminant and step-by-step explanation.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "Solve ax^2 + bx + c = 0 with step-by-step solutions",
        "Calculate discriminant and determine root types",
        "Find real and complex roots with exact values",
        "Vertex calculation and parabola properties",
        "Axis of symmetry and opening direction analysis",
        "Multiple equation forms (standard, vertex, factorized)",
        "Domain and range determination",
        "Smart examples with real-world applications",
        "Interactive examples for physics, economics, and geometry",
        "Share results and collaborate via URL"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": getUrl('/') },
        { "@type": "ListItem", "position": 2, "name": "Math & Numbers", "item": getUrl('/math-numbers') },
        { "@type": "ListItem", "position": 3, "name": "Quadratic Formula Calculator", "item": getUrl('/quadratic-formula-calculator') }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the quadratic formula?", "acceptedAnswer": { "@type": "Answer", "text": "The quadratic formula is x = (-b ± √(b²-4ac)) / (2a) for solving ax² + bx + c = 0. It works for any quadratic equation where a ≠ 0." } },
        { "@type": "Question", "name": "How do I know if roots are real or complex?", "acceptedAnswer": { "@type": "Answer", "text": "Check the discriminant D = b² - 4ac. If D > 0: two distinct real roots, D = 0: one repeated real root, D < 0: two complex conjugate roots." } },
        { "@type": "Question", "name": "What is the vertex of a parabola?", "acceptedAnswer": { "@type": "Answer", "text": "The vertex is the highest or lowest point of the parabola, located at x = -b/(2a). For y = ax² + bx + c, the vertex coordinates are (-b/(2a), f(-b/(2a)))." } },
        { "@type": "Question", "name": "How do I find the axis of symmetry?", "acceptedAnswer": { "@type": "Answer", "text": "The axis of symmetry is the vertical line x = -b/(2a) that passes through the vertex and divides the parabola into two mirror-image halves." } },
        { "@type": "Question", "name": "What are the different forms of quadratic equations?", "acceptedAnswer": { "@type": "Answer", "text": "Standard form: ax² + bx + c = 0, Vertex form: a(x-h)² + k = 0, Factored form: a(x-r₁)(x-r₂) = 0 where r₁, r₂ are the roots." } },
        { "@type": "Question", "name": "When do we use quadratic equations in real life?", "acceptedAnswer": { "@type": "Answer", "text": "Quadratic equations model projectile motion, profit optimization, area problems, physics trajectories, and engineering design where relationships involve squared terms." } }
      ]
    }
  ]
} as const;
