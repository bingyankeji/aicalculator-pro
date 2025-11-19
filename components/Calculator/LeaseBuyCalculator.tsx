'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Share2, Printer, Download, Car, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';

interface LeaseResult {
  leaseTotalCost: number;
  leaseMonthlyPayment: number;
  leaseDownPayment: number;
  leaseMileageFees: number;
  buyTotalCost: number;
  buyMonthlyPayment: number;
  buyDownPayment: number;
  buyResaleValue: number;
  buyNetCost: number;
  savings: number;
  recommendation: 'lease' | 'buy';
}

export default function LeaseBuyCalculator() {
  // Vehicle Info
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  
  // Lease Terms
  const [leaseMonthlyPayment, setLeaseMonthlyPayment] = useState(350);
  const [leaseDownPayment, setLeaseDownPayment] = useState(2000);
  const [leaseTerm, setLeaseTerm] = useState(36); // months
  const [mileageLimit, setMileageLimit] = useState(12000); // per year
  const [expectedMileage, setExpectedMileage] = useState(12000); // per year
  const [excessMileageFee, setExcessMileageFee] = useState(0.25); // per mile
  
  // Buy Terms
  const [buyDownPayment, setBuyDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(5.5); // APR
  const [resaleValue, setResaleValue] = useState(15000); // after loan term
  
  // Additional Costs
  const [leaseInsurance, setLeaseInsurance] = useState(150); // per month
  const [buyInsurance, setBuyInsurance] = useState(120); // per month
  const [leaseMaintenance, setLeaseMaintenance] = useState(50); // per month
  const [buyMaintenance, setBuyMaintenance] = useState(100); // per month
  
  const [result, setResult] = useState<LeaseResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/lease-buy-calculator',
    getShareParams: () => ({}),
    getShareText: () => 
      result 
        ? `${result.recommendation === 'lease' ? 'Leasing' : 'Buying'} saves $${Math.abs(result.savings).toFixed(0)} over ${Math.max(leaseTerm, loanTerm)} months`
        : 'Compare lease vs buy costs!',
  });

  const calculateComparison = () => {
    // Calculate lease costs
    const leaseMonths = leaseTerm;
    const leaseTotalPayments = leaseMonthlyPayment * leaseMonths;
    const leaseInsuranceCost = leaseInsurance * leaseMonths;
    const leaseMaintenanceCost = leaseMaintenance * leaseMonths;
    
    // Calculate excess mileage fees
    const totalMileage = (expectedMileage * leaseMonths) / 12;
    const allowedMileage = (mileageLimit * leaseMonths) / 12;
    const excessMiles = Math.max(0, totalMileage - allowedMileage);
    const mileageFees = excessMiles * excessMileageFee;
    
    const leaseTotalCost = leaseDownPayment + leaseTotalPayments + leaseInsuranceCost + leaseMaintenanceCost + mileageFees;
    
    // Calculate buy costs
    const loanAmount = vehiclePrice - buyDownPayment;
    const monthlyRate = interestRate / 100 / 12;
    const buyMonthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    const buyMonths = loanTerm;
    const buyTotalPayments = buyMonthlyPayment * buyMonths;
    const buyInsuranceCost = buyInsurance * buyMonths;
    const buyMaintenanceCost = buyMaintenance * buyMonths;
    
    const buyTotalCost = buyDownPayment + buyTotalPayments + buyInsuranceCost + buyMaintenanceCost;
    const buyNetCost = buyTotalCost - resaleValue;
    
    // Normalize to same time period for fair comparison
    const comparisonMonths = Math.max(leaseMonths, buyMonths);
    const normalizedLeaseCost = (leaseTotalCost / leaseMonths) * comparisonMonths;
    const normalizedBuyNetCost = (buyNetCost / buyMonths) * comparisonMonths;
    
    const savings = normalizedLeaseCost - normalizedBuyNetCost;
    const recommendation = savings > 0 ? 'buy' : 'lease';

    setResult({
      leaseTotalCost,
      leaseMonthlyPayment,
      leaseDownPayment,
      leaseMileageFees: mileageFees,
      buyTotalCost,
      buyMonthlyPayment,
      buyDownPayment,
      buyResaleValue: resaleValue,
      buyNetCost,
      savings: Math.abs(savings),
      recommendation,
    });
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
      link.download = `lease-buy-comparison-${new Date().toISOString().split('T')[0]}.png`;
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
              <title>Lease vs Buy Comparison</title>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Car className="h-5 w-5 text-blue-600" />
                Lease vs Buy Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Vehicle Price */}
              <div className="space-y-2">
                <Label htmlFor="vehiclePrice" className="text-sm font-medium text-gray-700">
                  Vehicle Price ($)
                </Label>
                <input
                  id="vehiclePrice"
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="1000"
                  min="0"
                />
              </div>

              {/* Lease Terms */}
              <div className="pt-3 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Lease Terms</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Monthly Payment</Label>
                      <input
                        type="number"
                        value={leaseMonthlyPayment}
                        onChange={(e) => setLeaseMonthlyPayment(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="10"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Down Payment</Label>
                      <input
                        type="number"
                        value={leaseDownPayment}
                        onChange={(e) => setLeaseDownPayment(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="100"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Lease Term (months)</Label>
                    <select
                      value={leaseTerm}
                      onChange={(e) => setLeaseTerm(parseInt(e.target.value))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                    >
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Mileage Limit/Year</Label>
                      <input
                        type="number"
                        value={mileageLimit}
                        onChange={(e) => setMileageLimit(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="1000"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Expected Miles/Year</Label>
                      <input
                        type="number"
                        value={expectedMileage}
                        onChange={(e) => setExpectedMileage(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="1000"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Excess Mileage Fee ($/mile)</Label>
                    <input
                      type="number"
                      value={excessMileageFee}
                      onChange={(e) => setExcessMileageFee(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      step="0.05"
                      min="0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Insurance/Month</Label>
                      <input
                        type="number"
                        value={leaseInsurance}
                        onChange={(e) => setLeaseInsurance(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="10"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Maintenance/Month</Label>
                      <input
                        type="number"
                        value={leaseMaintenance}
                        onChange={(e) => setLeaseMaintenance(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="10"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buy Terms */}
              <div className="pt-3 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Buy Terms</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Down Payment</Label>
                      <input
                        type="number"
                        value={buyDownPayment}
                        onChange={(e) => setBuyDownPayment(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="100"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Interest Rate (%)</Label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Loan Term (months)</Label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                    >
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                      <option value={72}>72 months</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Resale Value After Loan</Label>
                    <input
                      type="number"
                      value={resaleValue}
                      onChange={(e) => setResaleValue(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      step="1000"
                      min="0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">Insurance/Month</Label>
                      <input
                        type="number"
                        value={buyInsurance}
                        onChange={(e) => setBuyInsurance(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="10"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Maintenance/Month</Label>
                      <input
                        type="number"
                        value={buyMaintenance}
                        onChange={(e) => setBuyMaintenance(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        step="10"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculateComparison}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Compare Lease vs Buy
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-2">
          {result ? (
            <div ref={resultRef}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                    <Car className="h-5 w-5 text-blue-600" />
                    Comparison Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`${result.recommendation === 'buy' ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'} border-2 rounded-lg p-6 text-center`}>
                      <p className="text-sm text-gray-600 mb-2">Recommendation</p>
                      <p className="text-4xl font-bold mb-2" style={{ color: result.recommendation === 'buy' ? '#16a34a' : '#2563eb' }}>
                        {result.recommendation === 'buy' ? 'BUY' : 'LEASE'}
                      </p>
                      <p className="text-lg text-gray-700">
                        Save ${result.savings.toFixed(0)} by {result.recommendation === 'buy' ? 'buying' : 'leasing'}
                      </p>
                    </div>

                    {/* Cost Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Lease Costs */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Lease Costs</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Down Payment:</span>
                            <span className="font-semibold">${result.leaseDownPayment.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Payment:</span>
                            <span className="font-semibold">${result.leaseMonthlyPayment.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Payments:</span>
                            <span className="font-semibold">${(result.leaseMonthlyPayment * leaseTerm).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Insurance:</span>
                            <span className="font-semibold">${(leaseInsurance * leaseTerm).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Maintenance:</span>
                            <span className="font-semibold">${(leaseMaintenance * leaseTerm).toFixed(0)}</span>
                          </div>
                          {result.leaseMileageFees > 0 && (
                            <div className="flex justify-between text-red-600">
                              <span>Excess Mileage:</span>
                              <span className="font-semibold">${result.leaseMileageFees.toFixed(0)}</span>
                            </div>
                          )}
                          <div className="pt-2 border-t border-blue-300 flex justify-between">
                            <span className="font-semibold text-gray-900">Total Cost:</span>
                            <span className="text-xl font-bold text-blue-700">${result.leaseTotalCost.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Buy Costs */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Buy Costs</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Down Payment:</span>
                            <span className="font-semibold">${result.buyDownPayment.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Payment:</span>
                            <span className="font-semibold">${result.buyMonthlyPayment.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Payments:</span>
                            <span className="font-semibold">${(result.buyMonthlyPayment * loanTerm).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Insurance:</span>
                            <span className="font-semibold">${(buyInsurance * loanTerm).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Maintenance:</span>
                            <span className="font-semibold">${(buyMaintenance * loanTerm).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Resale Value:</span>
                            <span className="font-semibold">-${result.buyResaleValue.toFixed(0)}</span>
                          </div>
                          <div className="pt-2 border-t border-green-300 flex justify-between">
                            <span className="font-semibold text-gray-900">Net Cost:</span>
                            <span className="text-xl font-bold text-green-700">${result.buyNetCost.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Leasing Pros</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✓ Lower monthly payments</li>
                          <li>✓ Drive new car every few years</li>
                          <li>✓ Lower maintenance costs</li>
                          <li>✓ Warranty coverage</li>
                          <li>✓ No resale hassle</li>
                        </ul>
                        <h4 className="font-semibold text-gray-900 mt-3 mb-2">Leasing Cons</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✗ No ownership/equity</li>
                          <li>✗ Mileage restrictions</li>
                          <li>✗ Wear and tear fees</li>
                          <li>✗ Continuous payments</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Buying Pros</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✓ Build equity/ownership</li>
                          <li>✓ No mileage limits</li>
                          <li>✓ Customize as desired</li>
                          <li>✓ Sell anytime</li>
                          <li>✓ No lease-end fees</li>
                        </ul>
                        <h4 className="font-semibold text-gray-900 mt-3 mb-2">Buying Cons</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✗ Higher monthly payments</li>
                          <li>✗ Depreciation risk</li>
                          <li>✗ Higher maintenance costs</li>
                          <li>✗ Resale responsibility</li>
                        </ul>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Decision Factors</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• <strong>Drive a lot?</strong> Buying may be better to avoid mileage fees</li>
                        <li>• <strong>Want latest tech?</strong> Leasing lets you upgrade frequently</li>
                        <li>• <strong>Long-term ownership?</strong> Buying is more economical over 7+ years</li>
                        <li>• <strong>Business use?</strong> Leasing may offer tax advantages</li>
                        <li>• <strong>Credit score?</strong> Buying may be easier to finance with lower credit</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Enter vehicle and financing details to compare</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {result && (
            <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
              <Button 
                onClick={handleSaveAsImage} 
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Save as Image
              </Button>
              
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Comparison
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
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Lease vs Buy Calculator"
      />
    </div>
  );
}

