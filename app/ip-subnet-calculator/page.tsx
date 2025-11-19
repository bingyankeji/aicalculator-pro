import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import IPSubnetCalculator from '@/components/Calculator/IPSubnetCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'IP Subnet Calculator - IPv4 & IPv6 CIDR, Subnet Mask | AICalculator',
  description: 'Free IP subnet calculator for IPv4 and IPv6. Calculate CIDR notation, subnet mask, network address, broadcast address, usable hosts, and wildcard mask. Support for all network classes.',
  keywords: [
    'ip subnet calculator',
    'subnet calculator',
    'cidr calculator',
    'subnet mask calculator',
    'ipv4 subnet calculator',
    'ipv6 subnet calculator',
    'network calculator',
    'ip calculator',
    'cidr notation',
    'subnet mask',
    'network address calculator',
    'broadcast address',
    'wildcard mask',
    'ip address calculator',
    'subnetting calculator',
    'vlsm calculator',
    'ip range calculator',
    'usable hosts calculator',
    'binary subnet calculator',
    'network planning tool',
    'ip subnet tool',
    'subnet divider',
    'network class calculator',
    'private ip calculator',
    'public ip calculator',
    'network design tool',
    'ip allocation calculator',
    'subnet planner',
    'network subnetting',
    'ip addressing tool',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'IP Subnet Calculator - IPv4 & IPv6 CIDR, Subnet Mask',
    description: 'Calculate IP subnets for IPv4 and IPv6. Get network address, broadcast address, usable hosts, and binary representation with CIDR notation support.',
    type: 'website',
    url: getUrl('/ip-subnet-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('ip-subnet'),
      width: 1200,
      height: 630,
      alt: 'IP Subnet Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IP Subnet Calculator - IPv4 & IPv6 CIDR, Subnet Mask',
    description: 'Calculate IP subnets for IPv4 and IPv6. Get network address, broadcast address, usable hosts, and binary representation with CIDR notation support.',
    images: [getOgImage('ip-subnet')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/ip-subnet-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function IPSubnetCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/ip-subnet-calculator'),
        name: 'IP Subnet Calculator',
        url: getUrl('/ip-subnet-calculator'),
        description: 'Free online IP subnet calculator supporting IPv4 and IPv6. Calculate CIDR notation, subnet masks, network addresses, broadcast addresses, usable host ranges, and binary representations for network planning.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'IPv4 subnet calculation',
          'IPv6 subnet calculation',
          'CIDR notation support',
          'Subnet mask converter',
          'Network address calculation',
          'Broadcast address calculation',
          'Usable host range calculation',
          'Wildcard mask calculation',
          'Binary representation',
          'IP class identification',
          'Private/Public IP detection',
          'Network planning tool',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/ip-subnet-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Other',
            item: getUrl('/other'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'IP Subnet Calculator',
            item: getUrl('/ip-subnet-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/ip-subnet-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is IP subnetting and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'IP subnetting is the process of dividing a large network into smaller, more manageable sub-networks (subnets). It improves network performance by reducing broadcast traffic, enhances security by isolating network segments, and optimizes IP address allocation. Subnetting uses CIDR notation (e.g., /24) or subnet masks (e.g., 255.255.255.0) to define network boundaries. For example, a /24 network provides 254 usable host addresses, while a /16 network provides 65,534 usable addresses. Proper subnetting is essential for efficient network design, scalability, and meeting organizational security requirements.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate the number of usable hosts in a subnet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The number of usable hosts is calculated using the formula: 2^(32-CIDR) - 2 for IPv4. The "-2" accounts for the network address and broadcast address, which cannot be assigned to hosts. For example, a /24 subnet has 2^(32-24) - 2 = 2^8 - 2 = 256 - 2 = 254 usable hosts. A /30 subnet (commonly used for point-to-point links) has 2^2 - 2 = 2 usable hosts. For IPv6, the calculation is 2^(128-prefix), though the vast address space means host limitations are rarely a concern. Understanding usable host calculations is crucial for capacity planning and avoiding IP address exhaustion.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is CIDR notation and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CIDR (Classless Inter-Domain Routing) notation is a compact method for specifying IP addresses and their routing prefixes. Written as IP/prefix (e.g., 192.168.1.0/24), the number after the slash indicates how many bits of the IP address represent the network portion. A /24 means the first 24 bits are the network, leaving 8 bits for hosts (256 addresses). CIDR replaced the old classful addressing system (Class A, B, C) to allow more flexible network sizing. Common CIDR blocks include /24 (256 addresses), /16 (65,536 addresses), and /8 (16,777,216 addresses). CIDR enables efficient IP address allocation and reduces routing table sizes on the Internet.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between private and public IP addresses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Private IP addresses (RFC 1918) are reserved for use within private networks and are not routable on the public Internet. The three private IPv4 ranges are: 10.0.0.0/8 (16.7 million addresses), 172.16.0.0/12 (1 million addresses), and 192.168.0.0/16 (65,536 addresses). Multiple organizations can use the same private IPs without conflict because they are isolated by NAT (Network Address Translation). Public IP addresses are globally unique and routable on the Internet, assigned by ISPs or regional registries (ARIN, RIPE, APNIC). Organizations use private IPs internally and NAT to translate to public IPs for Internet access, conserving the limited IPv4 address space.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do subnet masks relate to CIDR notation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Subnet masks and CIDR notation are two ways to express the same information—the network and host portions of an IP address. A subnet mask uses dotted decimal notation (e.g., 255.255.255.0), while CIDR uses a prefix length (e.g., /24). Both define which bits of the IP address identify the network. For example, 255.255.255.0 equals /24 because it has 24 consecutive 1-bits in binary (11111111.11111111.11111111.00000000). Common conversions: /8 = 255.0.0.0, /16 = 255.255.0.0, /24 = 255.255.255.0, /25 = 255.255.255.128, /30 = 255.255.255.252. CIDR is more concise and widely used in modern networking, while subnet masks are still common in device configurations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between IPv4 and IPv6 subnetting?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'IPv4 uses 32-bit addresses (4.3 billion addresses) and is nearly exhausted, making efficient subnetting critical. IPv4 subnetting focuses on conserving addresses and typically uses /24 to /30 prefixes. IPv6 uses 128-bit addresses (340 undecillion addresses), virtually eliminating address scarcity concerns. IPv6 subnetting focuses on hierarchical network design rather than conservation. Standard IPv6 allocations use /48 for sites, /64 for subnets, and /128 for single hosts. IPv6 eliminates the need for NAT and private addressing. While IPv4 requires careful planning to avoid waste, IPv6 allows generous allocations. However, both use similar CIDR concepts for routing and network segmentation. Most modern networks implement dual-stack configurations supporting both protocols.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/ip-subnet-calculator'),
        name: 'How to Calculate IP Subnets',
        description: 'Step-by-step guide to calculating IP subnets using CIDR notation and subnet masks',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'IP Subnet Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose IP Version',
            text: 'Select IPv4 or IPv6 subnet calculator based on your network requirements. IPv4 is standard for most networks, while IPv6 is used for modern deployments.',
            url: getStepUrl('/ip-subnet-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter IP Address',
            text: 'For IPv4, enter an address like 192.168.1.1. For IPv6, enter in full or compressed format like 2001:db8::1. The calculator accepts standard IP notation.',
            url: getStepUrl('/ip-subnet-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Subnet Mask or CIDR',
            text: 'Choose a subnet mask (e.g., 255.255.255.0) from the dropdown or enter CIDR notation (e.g., /24). Both methods define the same network boundary.',
            url: getStepUrl('/ip-subnet-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Subnet',
            text: 'Click Calculate to compute network address, broadcast address, usable host range, and total available addresses. Binary representation shows bit-level details.',
            url: getStepUrl('/ip-subnet-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Network Information',
            text: 'Examine the calculated network address, broadcast address, first and last usable IPs, and total usable hosts. Note IP class and type (private/public).',
            url: getStepUrl('/ip-subnet-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Verify Binary Representation',
            text: 'Review binary notation to understand how subnet masking works at the bit level. This helps with troubleshooting and advanced network design.',
            url: getStepUrl('/ip-subnet-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/ip-subnet-calculator'),
        headline: 'Complete Guide to IP Subnet Calculation and Network Planning',
        description: 'Learn how to calculate IP subnets, understand CIDR notation, subnet masks, and plan efficient network architectures for IPv4 and IPv6.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        image: getOgImage('ip-subnet'),
        articleBody: 'Comprehensive guide to IP subnet calculation, CIDR notation, subnet masks, network planning, and efficient IP address allocation for IPv4 and IPv6 networks.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">IP Subnet Calculator - IPv4 & IPv6 CIDR, Subnet Mask, Network Address</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="IP Subnet Calculator"
        calculatorUrl="/ip-subnet-calculator"
      />

      {/* Calculator Component */}
      <IPSubnetCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding IP Subnet Calculation and Network Design</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-gray-700 leading-relaxed">
              IP subnetting is a fundamental networking concept that divides large networks into smaller, more manageable segments. 
              This calculator supports both <strong>IPv4 and IPv6</strong>, providing complete subnet information including network addresses, 
              broadcast addresses, usable host ranges, and binary representations for detailed network analysis and planning.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is IP Subnetting?</h3>
          <p className="text-gray-700 mb-4">
            IP subnetting is the practice of dividing a single network into multiple logical sub-networks (subnets). This division serves several critical purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Network Performance:</strong> Reduces broadcast traffic by limiting broadcast domains to smaller segments</li>
            <li><strong>Security:</strong> Isolates different network segments, containing security breaches and simplifying access control</li>
            <li><strong>Efficient IP Allocation:</strong> Optimizes IP address usage by matching subnet sizes to actual needs</li>
            <li><strong>Simplified Management:</strong> Makes large networks easier to troubleshoot, monitor, and maintain</li>
            <li><strong>Geographical Organization:</strong> Allows logical grouping of network resources by location or department</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">CIDR Notation Explained</h3>
          <p className="text-gray-700 mb-4">
            CIDR (Classless Inter-Domain Routing) notation is the modern standard for specifying IP addresses and their associated network prefixes. 
            It uses the format <code className="bg-gray-100 px-2 py-1 rounded">IP/prefix</code>, where the prefix indicates how many bits represent the network portion.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">CIDR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Subnet Mask</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Addresses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Usable Hosts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Common Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/8</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.0.0.0</td>
                  <td className="px-6 py-4 text-sm text-gray-900">16,777,216</td>
                  <td className="px-6 py-4 text-sm text-gray-900">16,777,214</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Large ISP, Class A</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/16</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.255.0.0</td>
                  <td className="px-6 py-4 text-sm text-gray-900">65,536</td>
                  <td className="px-6 py-4 text-sm text-gray-900">65,534</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Large enterprise, Class B</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/24</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.255.255.0</td>
                  <td className="px-6 py-4 text-sm text-gray-900">256</td>
                  <td className="px-6 py-4 text-sm text-gray-900">254</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Standard subnet, Class C</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/25</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.255.255.128</td>
                  <td className="px-6 py-4 text-sm text-gray-900">128</td>
                  <td className="px-6 py-4 text-sm text-gray-900">126</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Medium subnet</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/26</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.255.255.192</td>
                  <td className="px-6 py-4 text-sm text-gray-900">64</td>
                  <td className="px-6 py-4 text-sm text-gray-900">62</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Small office</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/30</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.255.255.252</td>
                  <td className="px-6 py-4 text-sm text-gray-900">4</td>
                  <td className="px-6 py-4 text-sm text-gray-900">2</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Point-to-point links</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">/32</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">255.255.255.255</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Single host route</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Calculating Usable Hosts</h3>
          <p className="text-gray-700 mb-4">
            The formula for calculating the number of usable hosts in an IPv4 subnet is:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-semibold text-gray-900 mb-2">
              Usable Hosts = 2<sup>(32 - CIDR)</sup> - 2
            </p>
            <p className="text-center text-sm text-gray-600">
              The "-2" accounts for the network address and broadcast address
            </p>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Example calculations:</strong>
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><code>/24</code>: 2<sup>8</sup> - 2 = 256 - 2 = <strong>254 usable hosts</strong></li>
            <li><code>/25</code>: 2<sup>7</sup> - 2 = 128 - 2 = <strong>126 usable hosts</strong></li>
            <li><code>/26</code>: 2<sup>6</sup> - 2 = 64 - 2 = <strong>62 usable hosts</strong></li>
            <li><code>/30</code>: 2<sup>2</sup> - 2 = 4 - 2 = <strong>2 usable hosts</strong> (point-to-point links)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Private vs. Public IP Addresses</h3>
          <p className="text-gray-700 mb-4">
            Understanding the distinction between private and public IP addresses is crucial for network design:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 mb-3">Private IP Ranges (RFC 1918)</h4>
              <ul className="space-y-2 text-sm text-green-900">
                <li><code className="bg-green-100 px-2 py-1 rounded">10.0.0.0/8</code><br/>
                10.0.0.0 – 10.255.255.255<br/>
                <span className="text-xs">16,777,216 addresses</span></li>
                <li><code className="bg-green-100 px-2 py-1 rounded">172.16.0.0/12</code><br/>
                172.16.0.0 – 172.31.255.255<br/>
                <span className="text-xs">1,048,576 addresses</span></li>
                <li><code className="bg-green-100 px-2 py-1 rounded">192.168.0.0/16</code><br/>
                192.168.0.0 – 192.168.255.255<br/>
                <span className="text-xs">65,536 addresses</span></li>
              </ul>
              <p className="mt-3 text-xs text-green-800">
                ✓ Use for internal networks, not routable on Internet
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">Public IP Addresses</h4>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Globally unique and routable on the Internet</li>
                <li>• Assigned by ISPs or regional registries (ARIN, RIPE, APNIC, LACNIC, AFRINIC)</li>
                <li>• Required for servers accessible from the Internet</li>
                <li>• Limited availability (IPv4 address exhaustion)</li>
                <li>• Organizations typically use NAT to share one public IP among many private IPs</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Network Address and Broadcast Address</h3>
          <p className="text-gray-700 mb-4">
            Every subnet has two special addresses that cannot be assigned to hosts:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Network Address:</strong> The first address in the subnet, where all host bits are 0. 
              It identifies the network itself and is used in routing tables. 
              Example: For 192.168.1.0/24, the network address is 192.168.1.0.
            </li>
            <li>
              <strong>Broadcast Address:</strong> The last address in the subnet, where all host bits are 1. 
              Used to send packets to all hosts in the subnet simultaneously. 
              Example: For 192.168.1.0/24, the broadcast address is 192.168.1.255.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">IPv6 Subnetting</h3>
          <p className="text-gray-700 mb-4">
            IPv6 uses 128-bit addresses, providing an astronomical 340 undecillion (3.4 × 10<sup>38</sup>) addresses. 
            This abundance changes how we approach subnetting:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>/48 Prefix:</strong> Standard allocation for sites (281 trillion subnets available)</li>
            <li><strong>/64 Prefix:</strong> Standard subnet size (18.4 quintillion addresses per subnet)</li>
            <li><strong>/128 Prefix:</strong> Single host address (equivalent to IPv4 /32)</li>
            <li><strong>No Broadcast:</strong> IPv6 uses multicast instead of broadcast addresses</li>
            <li><strong>No NAT Required:</strong> Eliminates the need for address translation</li>
            <li><strong>Hierarchical Design:</strong> Focus on organizational structure rather than address conservation</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">VLSM (Variable Length Subnet Masking)</h3>
          <p className="text-gray-700 mb-4">
            VLSM allows you to use different subnet mask lengths within the same network, enabling more efficient IP address allocation:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Example: Subdividing 192.168.1.0/24</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Subnet 1: 192.168.1.0/26 (62 hosts) - Main office</li>
              <li>• Subnet 2: 192.168.1.64/26 (62 hosts) - Sales department</li>
              <li>• Subnet 3: 192.168.1.128/27 (30 hosts) - Engineering</li>
              <li>• Subnet 4: 192.168.1.160/27 (30 hosts) - Marketing</li>
              <li>• Subnet 5: 192.168.1.192/28 (14 hosts) - Server room</li>
              <li>• Subnet 6: 192.168.1.208/28 (14 hosts) - Guest Wi-Fi</li>
              <li>• Point-to-point links: Multiple /30 subnets from remaining space</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Wildcard Masks</h3>
          <p className="text-gray-700 mb-4">
            Wildcard masks are the inverse of subnet masks, primarily used in Cisco access control lists (ACLs) and OSPF routing. 
            They indicate which bits to ignore when matching addresses:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Calculated as: Wildcard = 255.255.255.255 - Subnet Mask</li>
            <li>Example: Subnet mask 255.255.255.0 → Wildcard 0.0.0.255</li>
            <li>"0" in wildcard = must match exactly</li>
            <li>"255" in wildcard = any value acceptable</li>
            <li>Used in ACLs: <code>access-list 10 permit 192.168.1.0 0.0.0.255</code></li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Subnet Planning Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Do:</h4>
              <ul className="space-y-1 text-sm text-blue-900">
                <li>✓ Plan for growth (allocate 30-50% extra capacity)</li>
                <li>✓ Document your IP allocation scheme</li>
                <li>✓ Use private IPs for internal networks</li>
                <li>✓ Implement hierarchical addressing</li>
                <li>✓ Standardize subnet sizes where possible</li>
                <li>✓ Leave room for future subnets</li>
                <li>✓ Use summarization-friendly allocations</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-4">
              <h4 className="font-semibold text-red-900 mb-2">Don't:</h4>
              <ul className="space-y-1 text-sm text-red-900">
                <li>✗ Over-allocate address space unnecessarily</li>
                <li>✗ Use random, non-contiguous subnets</li>
                <li>✗ Forget to account for network and broadcast addresses</li>
                <li>✗ Ignore future expansion needs</li>
                <li>✗ Use overlapping subnets</li>
                <li>✗ Mix public and private IPs carelessly</li>
                <li>✗ Forget to update documentation</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Subnetting Scenarios</h3>
          
          <div className="space-y-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Scenario 1: Small Office Network</h4>
              <p className="text-gray-700 mb-2">
                <strong>Requirement:</strong> 50 employees, each with a computer and phone
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Solution:</strong> 192.168.1.0/25 (126 usable hosts)
              </p>
              <p className="text-sm text-gray-600">
                Provides room for 100 devices plus growth. Subnet mask: 255.255.255.128
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Scenario 2: Point-to-Point Router Link</h4>
              <p className="text-gray-700 mb-2">
                <strong>Requirement:</strong> Connect two routers
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Solution:</strong> 10.0.0.0/30 (2 usable hosts)
              </p>
              <p className="text-sm text-gray-600">
                Minimal waste, standard for WAN links. Subnet mask: 255.255.255.252
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Scenario 3: Multi-Floor Office Building</h4>
              <p className="text-gray-700 mb-2">
                <strong>Requirement:</strong> 5 floors, 100 devices per floor
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Solution:</strong> Use /25 subnets from a /21 allocation
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mt-2">
                <li>• Floor 1: 10.0.0.0/25 (126 hosts)</li>
                <li>• Floor 2: 10.0.0.128/25 (126 hosts)</li>
                <li>• Floor 3: 10.0.1.0/25 (126 hosts)</li>
                <li>• Floor 4: 10.0.1.128/25 (126 hosts)</li>
                <li>• Floor 5: 10.0.2.0/25 (126 hosts)</li>
                <li>• Remaining space for servers, Wi-Fi, guests</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Binary Subnet Calculation</h3>
          <p className="text-gray-700 mb-4">
            Understanding binary is essential for truly mastering subnetting. Here's how to perform a subnet calculation at the bit level:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Example: Find the network address of 192.168.45.78/26</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <span className="text-gray-600">IP Address:    </span>
                <span className="text-blue-700">11000000.10101000.00101101.01001110</span>
              </div>
              <div>
                <span className="text-gray-600">Subnet Mask:   </span>
                <span className="text-gray-900">11111111.11111111.11111111.11000000</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div>
                <span className="text-gray-600">Network (AND): </span>
                <span className="text-green-700">11000000.10101000.00101101.01000000</span>
              </div>
              <div>
                <span className="text-gray-600">Result:        </span>
                <span className="text-green-700 font-semibold">192.168.45.64</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              The AND operation keeps network bits, zeros out host bits
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Subnet Issues</h3>
          <p className="text-gray-700 mb-4">
            Common problems and their solutions:
          </p>
          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-red-600 pl-4">
              <p className="font-semibold text-gray-900">Problem: Devices can't communicate across subnets</p>
              <p className="text-sm text-gray-700">Solution: Check default gateway configuration and routing tables. Ensure inter-VLAN routing is properly configured.</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <p className="font-semibold text-gray-900">Problem: Running out of IP addresses in a subnet</p>
              <p className="text-sm text-gray-700">Solution: Redesign with a larger subnet prefix (smaller CIDR number) or implement VLSM. Consider IPv6 migration.</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <p className="font-semibold text-gray-900">Problem: Overlapping subnets</p>
              <p className="text-sm text-gray-700">Solution: Audit IP allocation, use IP Address Management (IPAM) tools, maintain accurate documentation.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Further Resources</h3>
          <p className="text-gray-700 mb-4">
            For additional information and standards:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a href="https://www.ietf.org/rfc/rfc1918.txt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                RFC 1918 - Private Internet Address Allocation
              </a>
            </li>
            <li>
              <a href="https://www.ietf.org/rfc/rfc4632.txt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                RFC 4632 - Classless Inter-domain Routing (CIDR)
              </a>
            </li>
            <li>
              <a href="https://www.iana.org/assignments/ipv4-address-space/ipv4-address-space.xhtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                IANA IPv4 Address Space Registry
              </a>
            </li>
            <li>
              <a href="https://www.iana.org/assignments/ipv6-address-space/ipv6-address-space.xhtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                IANA IPv6 Address Space Registry
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/bandwidth-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-semibold text-gray-900">Bandwidth Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate network bandwidth requirements</p>
          </a>
          
          <a 
            href="/binary-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">1️⃣</div>
            <h3 className="font-semibold text-gray-900">Binary Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between binary and decimal</p>
          </a>
          
          <a 
            href="/hex-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-gray-900">Hex Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Hexadecimal calculations and conversion</p>
          </a>
          
          <a 
            href="/unit-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between different units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

