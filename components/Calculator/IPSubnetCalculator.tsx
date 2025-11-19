'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Download, Printer, Share2, Network } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface IPv4Result {
  ipAddress: string;
  subnetMask: string;
  cidr: number;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIP: string;
  lastUsableIP: string;
  totalHosts: number;
  usableHosts: number;
  wildcardMask: string;
  ipClass: string;
  ipType: string;
  binary: {
    ip: string;
    subnet: string;
    network: string;
    broadcast: string;
  };
}

interface IPv6Result {
  ipAddress: string;
  prefixLength: number;
  networkAddress: string;
  firstAddress: string;
  lastAddress: string;
  totalAddresses: string;
  ipType: string;
  compressed: string;
  expanded: string;
}

export default function IPSubnetCalculator() {
  const [activeTab, setActiveTab] = useState<'ipv4' | 'ipv6'>('ipv4');
  
  // IPv4 inputs
  const [ipv4Address, setIpv4Address] = useState('192.168.1.1');
  const [networkClass, setNetworkClass] = useState<'Any' | 'A' | 'B' | 'C'>('Any');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [cidrNotation, setCidrNotation] = useState('24');
  
  // IPv6 inputs
  const [ipv6Address, setIpv6Address] = useState('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
  const [prefixLength, setPrefixLength] = useState('64');
  
  const [ipv4Result, setIpv4Result] = useState<IPv4Result | null>(null);
  const [ipv6Result, setIpv6Result] = useState<IPv6Result | null>(null);
  const [subdivisionCidr, setSubdivisionCidr] = useState('30');
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/ip-subnet-calculator',
    getShareParams: () => ({
      t: activeTab,
      ip: activeTab === 'ipv4' ? ipv4Address : ipv6Address,
      m: activeTab === 'ipv4' ? subnetMask : prefixLength,
    }),
    getShareText: () => {
      if (activeTab === 'ipv4' && ipv4Result) {
        return `IP Subnet: ${ipv4Result.networkAddress}/${ipv4Result.cidr} - ${ipv4Result.usableHosts} usable hosts`;
      }
      if (activeTab === 'ipv6' && ipv6Result) {
        return `IPv6 Subnet: ${ipv6Result.networkAddress}/${ipv6Result.prefixLength}`;
      }
      return 'Calculate IP subnets with this free tool!';
    },
  });

  // IPv4 helper functions
  const ipToInt = (ip: string): number => {
    const parts = ip.split('.').map(Number);
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
  };

  const intToIp = (int: number): string => {
    return [
      (int >>> 24) & 0xFF,
      (int >>> 16) & 0xFF,
      (int >>> 8) & 0xFF,
      int & 0xFF
    ].join('.');
  };

  const ipToBinary = (ip: string): string => {
    return ip.split('.').map(octet => 
      parseInt(octet).toString(2).padStart(8, '0')
    ).join('.');
  };

  const cidrToMask = (cidr: number): string => {
    const mask = ~(2 ** (32 - cidr) - 1);
    return intToIp(mask >>> 0);
  };

  const maskToCidr = (mask: string): number => {
    const binary = ipToBinary(mask).replace(/\./g, '');
    return binary.split('1').length - 1;
  };

  const getIPClass = (ip: string): string => {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reserved)';
    return 'Unknown';
  };

  const getIPType = (ip: string): string => {
    const firstOctet = parseInt(ip.split('.')[0]);
    const secondOctet = parseInt(ip.split('.')[1]);
    
    if (ip === '127.0.0.1' || ip.startsWith('127.')) return 'Loopback';
    if (ip.startsWith('10.')) return 'Private (Class A)';
    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) return 'Private (Class B)';
    if (ip.startsWith('192.168.')) return 'Private (Class C)';
    if (ip.startsWith('169.254.')) return 'APIPA (Link-Local)';
    if (firstOctet >= 224) return 'Special Use';
    return 'Public';
  };

  // Generate subnet subdivisions
  const generateSubnetDivisions = (networkAddr: string, currentCidr: number, targetCidr: number) => {
    if (targetCidr <= currentCidr) return [];
    
    const networkInt = ipToInt(networkAddr);
    const subnetSize = Math.pow(2, 32 - targetCidr);
    const totalSubnets = Math.pow(2, targetCidr - currentCidr);
    
    // Limit display to reasonable number
    const maxDisplay = 256;
    const subnets = [];
    
    for (let i = 0; i < Math.min(totalSubnets, maxDisplay); i++) {
      const subnetNetworkInt = networkInt + (i * subnetSize);
      const subnetBroadcastInt = subnetNetworkInt + subnetSize - 1;
      
      subnets.push({
        network: intToIp(subnetNetworkInt),
        firstUsable: intToIp(subnetNetworkInt + 1),
        lastUsable: intToIp(subnetBroadcastInt - 1),
        broadcast: intToIp(subnetBroadcastInt),
      });
    }
    
    return subnets;
  };

  const calculateIPv4 = () => {
    try {
      // Validate IP address
      const ipParts = ipv4Address.split('.');
      if (ipParts.length !== 4 || ipParts.some(p => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
        alert('Invalid IPv4 address format.');
        return;
      }

      // Validate subnet mask
      const maskParts = subnetMask.split('.');
      if (maskParts.length !== 4 || maskParts.some(p => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
        alert('Invalid subnet mask format.');
        return;
      }

      const ipInt = ipToInt(ipv4Address);
      const maskInt = ipToInt(subnetMask);
      const cidr = maskToCidr(subnetMask);
      
      // Calculate network and broadcast addresses
      const networkInt = ipInt & maskInt;
      const broadcastInt = networkInt | (~maskInt >>> 0);
      
      const networkAddress = intToIp(networkInt);
      const broadcastAddress = intToIp(broadcastInt);
      const firstUsableIP = intToIp(networkInt + 1);
      const lastUsableIP = intToIp(broadcastInt - 1);
      
      const totalHosts = broadcastInt - networkInt + 1;
      const usableHosts = Math.max(0, totalHosts - 2);
      
      // Wildcard mask
      const wildcardInt = ~maskInt >>> 0;
      const wildcardMask = intToIp(wildcardInt);
      
      setIpv4Result({
        ipAddress: ipv4Address,
        subnetMask,
        cidr,
        networkAddress,
        broadcastAddress,
        firstUsableIP,
        lastUsableIP,
        totalHosts,
        usableHosts,
        wildcardMask,
        ipClass: getIPClass(ipv4Address),
        ipType: getIPType(ipv4Address),
        binary: {
          ip: ipToBinary(ipv4Address),
          subnet: ipToBinary(subnetMask),
          network: ipToBinary(networkAddress),
          broadcast: ipToBinary(broadcastAddress),
        },
      });
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Error calculating subnet. Please check your inputs.');
    }
  };

  const calculateIPv6 = () => {
    try {
      // Basic IPv6 validation and processing
      let cleanedIPv6 = ipv6Address.trim().toLowerCase();
      
      // Expand :: notation
      if (cleanedIPv6.includes('::')) {
        const parts = cleanedIPv6.split('::');
        const leftParts = parts[0] ? parts[0].split(':') : [];
        const rightParts = parts[1] ? parts[1].split(':') : [];
        const missingParts = 8 - leftParts.length - rightParts.length;
        const middleParts = Array(missingParts).fill('0000');
        cleanedIPv6 = [...leftParts, ...middleParts, ...rightParts].join(':');
      }
      
      // Expand short notation
      const expandedParts = cleanedIPv6.split(':').map(part => part.padStart(4, '0'));
      const expanded = expandedParts.join(':');
      
      // Compress for display
      let compressed = expanded.replace(/:0000:/g, '::').replace(/^0000:/, '::').replace(/:0000$/, '::');
      if (compressed.includes(':::')) {
        compressed = compressed.replace(/:{3,}/, '::');
      }
      
      const prefix = parseInt(prefixLength);
      if (isNaN(prefix) || prefix < 0 || prefix > 128) {
        alert('Invalid prefix length. Must be between 0 and 128.');
        return;
      }
      
      // Calculate network address (simplified)
      const networkParts = expandedParts.slice();
      const bitsToZero = 128 - prefix;
      const groupsToZero = Math.floor(bitsToZero / 16);
      const partialBits = bitsToZero % 16;
      
      // Zero out the host portion
      for (let i = 0; i < groupsToZero; i++) {
        networkParts[7 - i] = '0000';
      }
      
      if (partialBits > 0 && groupsToZero < 8) {
        const groupIndex = 7 - groupsToZero;
        const value = parseInt(networkParts[groupIndex], 16);
        const mask = (0xFFFF << partialBits) & 0xFFFF;
        networkParts[groupIndex] = (value & mask).toString(16).padStart(4, '0');
      }
      
      const networkAddress = networkParts.join(':');
      
      // Calculate first and last address
      const firstAddress = networkAddress;
      
      const lastParts = networkParts.slice();
      for (let i = 0; i < groupsToZero; i++) {
        lastParts[7 - i] = 'ffff';
      }
      if (partialBits > 0 && groupsToZero < 8) {
        const groupIndex = 7 - groupsToZero;
        const value = parseInt(lastParts[groupIndex], 16);
        const mask = (1 << partialBits) - 1;
        lastParts[groupIndex] = (value | mask).toString(16).padStart(4, '0');
      }
      const lastAddress = lastParts.join(':');
      
      // Calculate total addresses
      const totalAddresses = bitsToZero <= 64 
        ? `2^${bitsToZero}` 
        : `~${(2 ** Math.min(bitsToZero, 64)).toExponential(2)}`;
      
      // Determine IP type
      let ipType = 'Global Unicast';
      if (expanded.startsWith('fe80:')) ipType = 'Link-Local';
      else if (expanded.startsWith('ff')) ipType = 'Multicast';
      else if (expanded === '0000:0000:0000:0000:0000:0000:0000:0001') ipType = 'Loopback';
      else if (expanded.startsWith('fc') || expanded.startsWith('fd')) ipType = 'Unique Local';
      
      setIpv6Result({
        ipAddress: ipv6Address,
        prefixLength: prefix,
        networkAddress,
        firstAddress,
        lastAddress,
        totalAddresses,
        ipType,
        compressed,
        expanded,
      });
    } catch (error) {
      console.error('IPv6 calculation error:', error);
      alert('Error calculating IPv6 subnet. Please check your input.');
    }
  };

  const handleCalculate = () => {
    if (activeTab === 'ipv4') {
      calculateIPv4();
    } else {
      calculateIPv6();
    }
  };

  const handleClear = () => {
    if (activeTab === 'ipv4') {
      setIpv4Address('192.168.1.1');
      setSubnetMask('255.255.255.0');
      setCidrNotation('24');
      setNetworkClass('Any');
      setIpv4Result(null);
    } else {
      setIpv6Address('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
      setPrefixLength('64');
      setIpv6Result(null);
    }
  };

  const handleSubnetMaskChange = (mask: string) => {
    setSubnetMask(mask);
    setCidrNotation(maskToCidr(mask).toString());
  };

  const handleCidrChange = (cidr: string) => {
    const cidrNum = parseInt(cidr);
    if (!isNaN(cidrNum) && cidrNum >= 0 && cidrNum <= 32) {
      setCidrNotation(cidr);
      setSubnetMask(cidrToMask(cidrNum));
    }
  };

  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `ip-subnet-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>IP Subnet Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const result = activeTab === 'ipv4' ? ipv4Result : ipv6Result;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tab Selection */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={() => setActiveTab('ipv4')}
          className={activeTab === 'ipv4' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
        >
          IPv4 Subnet Calculator
        </Button>
        <Button
          onClick={() => setActiveTab('ipv6')}
          className={activeTab === 'ipv6' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
        >
          IPv6 Subnet Calculator
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">
                {activeTab === 'ipv4' ? 'IPv4 Subnet Configuration' : 'IPv6 Subnet Configuration'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {activeTab === 'ipv4' ? (
                <>
                  {/* Network Class */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Network Class <span className="text-gray-500 text-xs">- Optional</span>
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Any', 'A', 'B', 'C'] as const).map((cls) => (
                        <Button
                          key={cls}
                          onClick={() => setNetworkClass(cls)}
                          className={networkClass === cls 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                        >
                          {cls}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Select a class for default subnet mask</p>
                  </div>

                  {/* Subnet Mask */}
                  <div className="space-y-2">
                    <Label htmlFor="subnetMask" className="text-sm font-medium text-gray-700">
                      Subnet Mask <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="subnetMask"
                      value={subnetMask}
                      onChange={(e) => handleSubnetMaskChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="255.255.255.252">255.255.255.252 /30 (2 usable hosts)</option>
                      <option value="255.255.255.248">255.255.255.248 /29 (6 usable hosts)</option>
                      <option value="255.255.255.240">255.255.255.240 /28 (14 usable hosts)</option>
                      <option value="255.255.255.224">255.255.255.224 /27 (30 usable hosts)</option>
                      <option value="255.255.255.192">255.255.255.192 /26 (62 usable hosts)</option>
                      <option value="255.255.255.128">255.255.255.128 /25 (126 usable hosts)</option>
                      <option value="255.255.255.0">255.255.255.0 /24 (254 usable hosts)</option>
                      <option value="255.255.254.0">255.255.254.0 /23 (510 usable hosts)</option>
                      <option value="255.255.252.0">255.255.252.0 /22 (1022 usable hosts)</option>
                      <option value="255.255.248.0">255.255.248.0 /21 (2046 usable hosts)</option>
                      <option value="255.255.240.0">255.255.240.0 /20 (4094 usable hosts)</option>
                      <option value="255.255.224.0">255.255.224.0 /19 (8190 usable hosts)</option>
                      <option value="255.255.192.0">255.255.192.0 /18 (16382 usable hosts)</option>
                      <option value="255.255.128.0">255.255.128.0 /17 (32766 usable hosts)</option>
                      <option value="255.255.0.0">255.255.0.0 /16 (65534 usable hosts)</option>
                      <option value="255.254.0.0">255.254.0.0 /15 (131070 usable hosts)</option>
                      <option value="255.252.0.0">255.252.0.0 /14 (262142 usable hosts)</option>
                      <option value="255.248.0.0">255.248.0.0 /13 (524286 usable hosts)</option>
                      <option value="255.240.0.0">255.240.0.0 /12 (1048574 usable hosts)</option>
                      <option value="255.224.0.0">255.224.0.0 /11 (2097150 usable hosts)</option>
                      <option value="255.192.0.0">255.192.0.0 /10 (4194302 usable hosts)</option>
                      <option value="255.128.0.0">255.128.0.0 /9 (8388606 usable hosts)</option>
                      <option value="255.0.0.0">255.0.0.0 /8 (16777214 usable hosts)</option>
                    </select>
                  </div>

                  {/* CIDR Notation */}
                  <div className="space-y-2">
                    <Label htmlFor="cidr" className="text-sm font-medium text-gray-700">
                      CIDR Notation <span className="text-gray-500 text-xs">- Alternative</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">/</span>
                      <input
                        id="cidr"
                        type="number"
                        min="0"
                        max="32"
                        value={cidrNotation}
                        onChange={(e) => handleCidrChange(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="24"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Enter CIDR prefix length (0-32)</p>
                  </div>

                  {/* IP Address */}
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress" className="text-sm font-medium text-gray-700">
                      IP Address <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="ipAddress"
                      type="text"
                      value={ipv4Address}
                      onChange={(e) => setIpv4Address(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="192.168.1.1"
                    />
                    <p className="text-xs text-gray-500">Enter IPv4 address (e.g., 192.168.1.1)</p>
                  </div>
                </>
              ) : (
                <>
                  {/* IPv6 Prefix Length */}
                  <div className="space-y-2">
                    <Label htmlFor="ipv6Prefix" className="text-sm font-medium text-gray-700">
                      Prefix Length <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="ipv6Prefix"
                      value={prefixLength}
                      onChange={(e) => setPrefixLength(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="48">/48 (Site)</option>
                      <option value="56">/56 (Small Site)</option>
                      <option value="64">/64 (Subnet - Standard)</option>
                      <option value="96">/96 (Point-to-Point)</option>
                      <option value="112">/112 (Small Subnet)</option>
                      <option value="120">/120 (Very Small)</option>
                      <option value="128">/128 (Single Host)</option>
                    </select>
                    <p className="text-xs text-gray-500">Select IPv6 prefix length</p>
                  </div>

                  {/* IPv6 Address */}
                  <div className="space-y-2">
                    <Label htmlFor="ipv6Address" className="text-sm font-medium text-gray-700">
                      IP Address <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="ipv6Address"
                      type="text"
                      value={ipv6Address}
                      onChange={(e) => setIpv6Address(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="2001:0db8:85a3::8a2e:0370:7334"
                    />
                    <p className="text-xs text-gray-500">Enter IPv6 address (full or compressed notation)</p>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Network className="h-4 w-4" />
                      IPv6 Format Support
                    </h4>
                    <ul className="text-xs text-blue-900 space-y-1 ml-4 list-disc">
                      <li>Full: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</li>
                      <li>Compressed: 2001:db8:85a3::8a2e:370:7334</li>
                      <li>Double colon (::) represents consecutive zeros</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleCalculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate
            </Button>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="px-6 py-3 min-h-[44px]"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-3 space-y-6" ref={resultRef}>
          {result ? (
            <>
              {activeTab === 'ipv4' && ipv4Result && (
                <>
                  {/* Primary Results */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Subnet Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">IP Address</p>
                          <p className="text-lg font-bold text-blue-700 font-mono break-all">{ipv4Result.ipAddress}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Subnet Mask</p>
                          <p className="text-lg font-bold text-gray-900 font-mono">{ipv4Result.subnetMask}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">CIDR Notation</p>
                          <p className="text-lg font-bold text-gray-900 font-mono">/{ipv4Result.cidr}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Wildcard Mask</p>
                          <p className="text-lg font-bold text-gray-900 font-mono">{ipv4Result.wildcardMask}</p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Network Address</p>
                          <p className="text-lg font-bold text-green-700 font-mono">{ipv4Result.networkAddress}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Broadcast Address</p>
                          <p className="text-lg font-bold text-gray-900 font-mono">{ipv4Result.broadcastAddress}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">First Usable IP</p>
                          <p className="text-lg font-bold text-gray-900 font-mono break-all">{ipv4Result.firstUsableIP}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Last Usable IP</p>
                          <p className="text-lg font-bold text-gray-900 font-mono break-all">{ipv4Result.lastUsableIP}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Total Hosts</p>
                          <p className="text-2xl font-bold text-blue-700">{ipv4Result.totalHosts.toLocaleString()}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Usable Hosts</p>
                          <p className="text-2xl font-bold text-blue-700">{ipv4Result.usableHosts.toLocaleString()}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">IP Class</p>
                          <p className="text-lg font-bold text-gray-900">Class {ipv4Result.ipClass}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">IP Type</p>
                          <p className="text-lg font-bold text-gray-900">{ipv4Result.ipType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Binary Representation */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Binary Representation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-3 font-mono text-xs sm:text-sm">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">IP Address:</p>
                          <p className="text-blue-700 font-semibold break-all">{ipv4Result.binary.ip}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Subnet Mask:</p>
                          <p className="text-gray-900 font-semibold break-all">{ipv4Result.binary.subnet}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Network Address:</p>
                          <p className="text-green-700 font-semibold break-all">{ipv4Result.binary.network}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-gray-600 mb-1">Broadcast Address:</p>
                          <p className="text-gray-900 font-semibold break-all">{ipv4Result.binary.broadcast}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Subnet Summary */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">Subnet Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>• <strong>Network:</strong> {ipv4Result.networkAddress}/{ipv4Result.cidr}</p>
                        <p>• <strong>Usable IP Range:</strong> {ipv4Result.firstUsableIP} - {ipv4Result.lastUsableIP}</p>
                        <p>• <strong>Total Addresses:</strong> {ipv4Result.totalHosts.toLocaleString()} ({ipv4Result.usableHosts.toLocaleString()} usable for hosts)</p>
                        <p>• <strong>Subnet Class:</strong> Class {ipv4Result.ipClass}</p>
                        <p>• <strong>IP Type:</strong> {ipv4Result.ipType}</p>
                        {ipv4Result.ipType.includes('Private') && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-xs">
                              ✓ This is a <strong>private IP address</strong> (RFC 1918). It can be used within private networks and is not routable on the public Internet.
                            </p>
                          </div>
                        )}
                        {ipv4Result.ipType === 'Public' && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 text-xs">
                              ℹ This is a <strong>public IP address</strong>. It is routable on the Internet and must be assigned by an Internet Service Provider or regional registry.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Subnet Division Table */}
                  {(() => {
                    const targetCidr = parseInt(subdivisionCidr);
                    const subnets = generateSubnetDivisions(ipv4Result.networkAddress, ipv4Result.cidr, targetCidr);
                    const totalPossibleSubnets = Math.pow(2, targetCidr - ipv4Result.cidr);
                    
                    if (subnets.length > 0) {
                      return (
                        <Card className="shadow-lg">
                          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                              <CardTitle className="text-xl text-gray-900">
                                All {totalPossibleSubnets} Possible /{subdivisionCidr} Networks
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Label className="text-sm text-gray-700 whitespace-nowrap">Divide into:</Label>
                                <select
                                  value={subdivisionCidr}
                                  onChange={(e) => setSubdivisionCidr(e.target.value)}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                >
                                  {Array.from({ length: 32 - ipv4Result.cidr }, (_, i) => ipv4Result.cidr + i + 1).map(cidr => {
                                    const hosts = Math.pow(2, 32 - cidr) - 2;
                                    return (
                                      <option key={cidr} value={cidr}>
                                        /{cidr} ({hosts} usable hosts each)
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 sm:p-6">
                            {subnets.length < totalPossibleSubnets && (
                              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-xs text-yellow-800">
                                  ⚠ Showing first {subnets.length} of {totalPossibleSubnets} subnets. 
                                  The display is limited to 256 subnets for performance.
                                </p>
                              </div>
                            )}
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[600px] text-sm border-collapse">
                                <thead>
                                  <tr className="bg-blue-50 border-b-2 border-blue-200">
                                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Network Address</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Usable Host Range</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Broadcast Address</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {subnets.map((subnet, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                      <td className="px-4 py-3 font-mono text-gray-900">{subnet.network}</td>
                                      <td className="px-4 py-3 font-mono text-gray-700">
                                        {subnet.firstUsable} - {subnet.lastUsable}
                                      </td>
                                      <td className="px-4 py-3 font-mono text-gray-900">{subnet.broadcast}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    }
                    return null;
                  })()}
                </>
              )}

              {activeTab === 'ipv6' && ipv6Result && (
                <>
                  {/* IPv6 Results */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">IPv6 Subnet Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Compressed Format</p>
                          <p className="text-base font-bold text-blue-700 font-mono break-all">{ipv6Result.compressed}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Expanded Format</p>
                          <p className="text-base font-bold text-gray-900 font-mono break-all">{ipv6Result.expanded}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Prefix Length</p>
                          <p className="text-lg font-bold text-gray-900 font-mono">/{ipv6Result.prefixLength}</p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Network Address</p>
                          <p className="text-base font-bold text-green-700 font-mono break-all">{ipv6Result.networkAddress}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">First Address</p>
                          <p className="text-base font-bold text-gray-900 font-mono break-all">{ipv6Result.firstAddress}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Last Address</p>
                          <p className="text-base font-bold text-gray-900 font-mono break-all">{ipv6Result.lastAddress}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">Total Addresses</p>
                          <p className="text-xl font-bold text-blue-700">{ipv6Result.totalAddresses}</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-xs text-gray-600 mb-1">IP Type</p>
                          <p className="text-lg font-bold text-gray-900">{ipv6Result.ipType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* IPv6 Summary */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-xl text-gray-900">IPv6 Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>• <strong>Network:</strong> {ipv6Result.networkAddress}/{ipv6Result.prefixLength}</p>
                        <p>• <strong>Address Range:</strong> {ipv6Result.firstAddress} to {ipv6Result.lastAddress}</p>
                        <p>• <strong>Total Addresses:</strong> {ipv6Result.totalAddresses}</p>
                        <p>• <strong>Address Type:</strong> {ipv6Result.ipType}</p>
                        {ipv6Result.ipType === 'Link-Local' && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-800 text-xs">
                              ⚠ This is a <strong>link-local address</strong> (fe80::/10). Valid only within a single network segment.
                            </p>
                          </div>
                        )}
                        {ipv6Result.ipType === 'Unique Local' && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-xs">
                              ✓ This is a <strong>unique local address</strong> (fc00::/7). Similar to IPv4 private addresses, for use in private networks.
                            </p>
                          </div>
                        )}
                        {ipv6Result.ipType === 'Global Unicast' && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 text-xs">
                              ℹ This is a <strong>global unicast address</strong>. It is globally routable on the IPv6 Internet.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Network className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Configure your {activeTab === 'ipv4' ? 'IPv4' : 'IPv6'} subnet and click Calculate to see results
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="IP Subnet Calculator"
      />
    </div>
  );
}

