import { Metadata } from 'next';
import PasswordGeneratorCalculator from '@/components/Calculator/PasswordGeneratorCalculator';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong & Secure Passwords | AICalculator.pro',
  description: 'Free online password generator tool. Create strong, secure, and random passwords with customizable length (4-128 characters), character types, and advanced options. Evaluate password strength and estimated crack time.',
  keywords: [
    'password generator',
    'random password',
    'strong password',
    'secure password',
    'password strength',
    'password creator',
    'generate password online',
    'safe password',
    'complex password',
    'password security',
    'password maker',
    'free password generator'
  ],
  openGraph: {
    title: 'Password Generator - Create Strong & Secure Passwords',
    description: 'Generate strong, secure random passwords with customizable options. Evaluate password strength and security.',
    type: 'website',
    url: 'https://aicalculator.pro/password-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Create Strong & Secure Passwords',
    description: 'Generate strong, secure random passwords with customizable options.',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/password-generator',
  },
};

// JSON-LD for rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebApplication
    {
      '@type': 'WebApplication',
      '@id': 'https://aicalculator.pro/password-generator#webapp',
      name: 'Password Generator',
      url: 'https://aicalculator.pro/password-generator',
      description: 'Free online password generator tool for creating strong, secure, and random passwords',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Customizable password length (4-128 characters)',
        'Multiple character types: uppercase, lowercase, numbers, symbols',
        'Exclude similar characters option',
        'Custom include/exclude rules',
        'Password strength analysis',
        'Estimated crack time calculation',
        'Batch password generation',
        'One-click copy to clipboard',
      ],
    },
    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://aicalculator.pro/password-generator#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://aicalculator.pro',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Other',
          item: 'https://aicalculator.pro/other',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Password Generator',
          item: 'https://aicalculator.pro/password-generator',
        },
      ],
    },
    // FAQPage
    {
      '@type': 'FAQPage',
      '@id': 'https://aicalculator.pro/password-generator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What makes a password strong?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A strong password typically has: 1) At least 12-16 characters in length, 2) A mix of uppercase and lowercase letters, 3) Numbers and special symbols, 4) No dictionary words or personal information, 5) No predictable patterns. Our generator creates passwords that meet all these criteria.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long should my password be?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We recommend passwords of at least 12-16 characters for general accounts and 16+ characters for sensitive accounts like email, banking, or work accounts. Longer passwords are exponentially harder to crack.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to use online password generators?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our password generator runs entirely in your browser using JavaScript. No passwords are sent to our servers or stored anywhere. The passwords are generated using cryptographically secure random number generation (crypto.getRandomValues).',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I exclude similar characters?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Excluding similar characters (0, O, I, l, 1) can make passwords easier to read and type, especially if you need to manually enter them. However, it slightly reduces the password complexity. For maximum security, leave them included.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often should I change my passwords?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Security experts recommend changing passwords every 60-90 days for sensitive accounts. However, using a unique, strong password with two-factor authentication is more important than frequent changes. Never reuse passwords across different sites.',
          },
        },
      ],
    },
    // HowTo
    {
      '@type': 'HowTo',
      '@id': 'https://aicalculator.pro/password-generator#howto',
      name: 'How to Generate a Strong Password',
      description: 'Step-by-step guide to generating a strong, secure password',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Set Password Length',
          text: 'Choose a password length between 4-128 characters. We recommend at least 12-16 characters for good security.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Select Character Types',
          text: 'Choose which character types to include: uppercase letters, lowercase letters, numbers, and symbols. Including all types creates stronger passwords.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Configure Advanced Options',
          text: 'Optionally exclude similar characters (0, O, I, l, 1) or add custom include/exclude rules for specific requirements.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Generate Password',
          text: 'Click the "Generate Password" button to create a secure random password. You can generate multiple passwords at once.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Copy and Use',
          text: 'Review the password strength analysis, then click the copy button to copy your password to the clipboard.',
        },
      ],
    },
    // Article
    {
      '@type': 'Article',
      '@id': 'https://aicalculator.pro/password-generator#article',
      headline: 'Password Generator - Complete Guide to Creating Secure Passwords',
      description: 'Learn how to create strong, secure passwords and protect your online accounts',
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aicalculator.pro/logo.png',
        },
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Password Generator - Create Strong, Secure Random Passwords with Password Strength Analysis
        </h1>

        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <div className="bg-white rounded-lg shadow-sm px-4 py-3">
            <ol className="flex flex-wrap items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link
                  href="/other"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Other
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-700 font-medium">Password Generator</li>
            </ol>
          </div>
        </nav>

        {/* Calculator Component */}
        <PasswordGeneratorCalculator />

        {/* Educational Content */}
        <section className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Password Security
            </h2>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              What Makes a Password Strong?
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A strong password is your first line of defense against unauthorized access to your accounts. 
              In today's digital age, where data breaches and cyber attacks are increasingly common, creating 
              and maintaining strong passwords is more critical than ever.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Strong passwords share several key characteristics:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Length:</strong> At least 12-16 characters. Each additional character exponentially 
                increases the number of possible combinations, making brute-force attacks much more difficult.
              </li>
              <li>
                <strong>Complexity:</strong> A mix of uppercase letters, lowercase letters, numbers, and 
                special symbols. This increases the "character space" attackers must search through.
              </li>
              <li>
                <strong>Unpredictability:</strong> Avoid dictionary words, common phrases, personal information 
                (names, birthdays), or predictable patterns (123456, qwerty, password).
              </li>
              <li>
                <strong>Uniqueness:</strong> Each account should have a completely different password. Password 
                reuse is one of the most dangerous security practices.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Password Length vs. Complexity
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              There's often debate about whether length or complexity is more important. The truth is, both matter, 
              but length typically has a more dramatic impact on security. Consider these examples:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                An 8-character password with uppercase, lowercase, numbers, and symbols has about 
                218 trillion possible combinations (62^8).
              </li>
              <li>
                A 16-character password using only lowercase letters has about 
                4.4 septillion possible combinations (26^16) - over 20,000 times more secure.
              </li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This is why security experts increasingly recommend longer passwords over complex shorter ones. 
              A 16-character password is significantly harder to crack than an 8-character password, even if 
              the shorter one includes more character types.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Password Mistakes to Avoid
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Many people make these common mistakes when creating passwords:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Using personal information:</strong> Names, birthdays, addresses, or phone numbers 
                are easily guessable, especially with social engineering.
              </li>
              <li>
                <strong>Simple substitutions:</strong> Replacing 'a' with '@' or 'o' with '0' (like "P@ssw0rd") 
                doesn't fool modern password crackers.
              </li>
              <li>
                <strong>Dictionary words:</strong> Even with modifications, dictionary words are vulnerable to 
                dictionary attacks.
              </li>
              <li>
                <strong>Reusing passwords:</strong> If one account is compromised, all accounts using the same 
                password become vulnerable.
              </li>
              <li>
                <strong>Writing passwords down insecurely:</strong> Sticky notes, unencrypted text files, or 
                shared documents are security risks.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Password Attack Methods
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Understanding how attackers try to crack passwords helps you create better defenses:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Brute Force:</strong> Systematically trying every possible combination. Modern computers 
                can attempt billions of guesses per second for simple passwords.
              </li>
              <li>
                <strong>Dictionary Attacks:</strong> Using lists of common words and phrases. Attackers have 
                databases with billions of commonly used passwords.
              </li>
              <li>
                <strong>Rainbow Tables:</strong> Pre-computed tables of password hashes. Proper password hashing 
                with salt defeats these, but not all websites use proper security.
              </li>
              <li>
                <strong>Social Engineering:</strong> Tricking users into revealing passwords through phishing, 
                pretexting, or other manipulation techniques.
              </li>
              <li>
                <strong>Credential Stuffing:</strong> Using passwords leaked from one breach to access accounts 
                on other sites (why password reuse is so dangerous).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Using a Password Manager
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creating and remembering dozens of strong, unique passwords is nearly impossible without help. 
              Password managers solve this problem:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Generate strong passwords:</strong> Create truly random passwords for each account.
              </li>
              <li>
                <strong>Secure storage:</strong> Encrypt all passwords with a master password.
              </li>
              <li>
                <strong>Auto-fill:</strong> Automatically enter credentials on websites and apps.
              </li>
              <li>
                <strong>Cross-device sync:</strong> Access passwords on all your devices.
              </li>
              <li>
                <strong>Security alerts:</strong> Warn you about weak or reused passwords and data breaches.
              </li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Popular password managers include 1Password, LastPass, Bitwarden, and Dashlane. Many browsers 
              also have built-in password managers, though dedicated apps usually offer more features.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Two-Factor Authentication (2FA)
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Even the strongest password isn't foolproof. Two-factor authentication adds a crucial second 
              layer of security:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Something you know:</strong> Your password
              </li>
              <li>
                <strong>Something you have:</strong> Your phone, security key, or authentication app
              </li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With 2FA enabled, even if someone obtains your password, they can't access your account without 
              the second factor. Enable 2FA on all accounts that offer it, especially for email, banking, and 
              social media. Authenticator apps (Google Authenticator, Authy) are more secure than SMS codes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Password Change Frequency
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Security advice about password changes has evolved. Frequent mandatory password changes (every 30-90 days) 
              were once standard, but research shows this often leads to weaker passwords as users make minimal, 
              predictable modifications. Current best practices recommend:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Change immediately:</strong> If you suspect a breach or receive a breach notification
              </li>
              <li>
                <strong>Change regularly:</strong> Every 6-12 months for high-value accounts (email, banking)
              </li>
              <li>
                <strong>Never reuse:</strong> When changing passwords, don't cycle through previous passwords
              </li>
              <li>
                <strong>Prioritize strength:</strong> A strong, unique password with 2FA is more important than 
                frequent changes
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Special Considerations for Different Accounts
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Not all accounts need the same level of password security:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Critical accounts (email, banking):</strong> 16+ character passwords, 2FA, regular monitoring
              </li>
              <li>
                <strong>Important accounts (social media, shopping):</strong> 12-16 character passwords, 2FA when available
              </li>
              <li>
                <strong>Low-risk accounts (news sites, forums):</strong> 12+ character passwords, still unique
              </li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your email account deserves special attention - it's often the master key to password resets for 
              other accounts. Securing your email is paramount.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Checking for Data Breaches
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Even with strong passwords, data breaches can expose your credentials. Services like{' '}
              <a
                href="https://haveibeenpwned.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Have I Been Pwned
              </a>{' '}
              let you check if your email or passwords have appeared in known breaches. If you discover you've 
              been affected:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Change the affected password immediately</li>
              <li>Change passwords on any other sites where you used the same password</li>
              <li>Enable 2FA if you haven't already</li>
              <li>Monitor your accounts for suspicious activity</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Our Password Generator
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This password generator is designed with security and usability in mind:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>
                <strong>Cryptographically secure:</strong> Uses <code className="bg-gray-100 px-1 rounded">crypto.getRandomValues()</code>, 
                the browser's built-in cryptographically secure random number generator
              </li>
              <li>
                <strong>Client-side only:</strong> All password generation happens in your browser. Nothing is 
                sent to our servers or stored anywhere
              </li>
              <li>
                <strong>Highly customizable:</strong> Control length, character types, and specific inclusion/exclusion rules
              </li>
              <li>
                <strong>Strength analysis:</strong> Instant feedback on password strength and estimated crack time
              </li>
              <li>
                <strong>Batch generation:</strong> Create multiple passwords at once for different accounts
              </li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Remember: Generate a unique, strong password for each account, store them in a password manager, 
              and enable 2FA wherever possible. These three steps will dramatically improve your online security.
            </p>
          </div>
        </section>
      </div>

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

