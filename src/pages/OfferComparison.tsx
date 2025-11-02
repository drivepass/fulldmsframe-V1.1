import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

interface OfferOption {
  type: string;
  monthlyPayment?: number;
  totalAmount: number;
  downPayment: number;
  interestRate?: number;
  term?: number;
  benefits: string[];
  recommended?: boolean;
}

const mockVehicle = {
  make: 'BMW',
  model: 'X5',
  year: 2024,
  price: 285000,
  image: '/api/placeholder/400/300'
};

const mockOffers: OfferOption[] = [
  {
    type: 'Cash Purchase',
    totalAmount: 270000,
    downPayment: 270000,
    benefits: [
      'No monthly payments',
      'Full ownership immediately',
      'No interest charges',
      '5% discount on vehicle price'
    ]
  },
  {
    type: 'Finance',
    monthlyPayment: 4850,
    totalAmount: 291000,
    downPayment: 57000,
    interestRate: 3.5,
    term: 48,
    benefits: [
      'Spread payments over 4 years',
      'Build credit history',
      'Keep cash for other investments',
      'Fixed monthly payments'
    ],
    recommended: true
  },
  {
    type: 'Lease',
    monthlyPayment: 2890,
    totalAmount: 139000,
    downPayment: 28500,
    interestRate: 2.9,
    term: 36,
    benefits: [
      'Lower monthly payments',
      'Always drive latest models',
      'Warranty coverage included',
      'Option to purchase at lease end'
    ]
  }
];

const comparisonMetrics = [
  { label: 'Initial Payment', key: 'downPayment' },
  { label: 'Monthly Payment', key: 'monthlyPayment' },
  { label: 'Total Cost', key: 'totalAmount' },
  { label: 'Interest Rate', key: 'interestRate' },
  { label: 'Term (Months)', key: 'term' }
];

export default function OfferComparison() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString()}`;
  };

  const formatPercentage = (rate?: number) => {
    return rate ? `${rate}%` : 'N/A';
  };

  const handleSelectOffer = (offerType: string) => {
    setSelectedOffer(offerType);
    console.log(`Selected offer: ${offerType}`);
  };

  const handleSendOffer = (offerType: string) => {
    console.log(`Sending offer: ${offerType}`);
  };

  const calculateSavings = (baseAmount: number, compareAmount: number) => {
    const savings = baseAmount - compareAmount;
    return savings > 0 ? savings : 0;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offer Comparison</h1>
          <p className="text-gray-600">Compare different payment options for your customers</p>
        </div>
        <Button>
          <Calculator className="mr-2 h-4 w-4" />
          Customize Offers
        </Button>
      </div>

      {/* Vehicle Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Vehicle Image</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{mockVehicle.make} {mockVehicle.model} {mockVehicle.year}</h2>
              <p className="text-xl text-gray-600">Starting from {formatCurrency(mockVehicle.price)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comparison">Side-by-Side Comparison</TabsTrigger>
          <TabsTrigger value="calculator">Payment Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          {/* Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockOffers.map((offer) => (
              <Card key={offer.type} className={`relative ${offer.recommended ? 'ring-2 ring-blue-500' : ''}`}>
                {offer.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Recommended</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {offer.type}
                    {offer.type === 'Cash Purchase' && <DollarSign className="h-5 w-5 text-green-600" />}
                    {offer.type === 'Finance' && <Calendar className="h-5 w-5 text-blue-600" />}
                    {offer.type === 'Lease' && <TrendingUp className="h-5 w-5 text-purple-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Initial Payment:</span>
                      <span className="font-semibold">{formatCurrency(offer.downPayment)}</span>
                    </div>
                    {offer.monthlyPayment && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Monthly Payment:</span>
                        <span className="font-semibold">{formatCurrency(offer.monthlyPayment)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Cost:</span>
                      <span className="font-semibold">{formatCurrency(offer.totalAmount)}</span>
                    </div>
                    {offer.interestRate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Interest Rate:</span>
                        <span className="font-semibold">{formatPercentage(offer.interestRate)}</span>
                      </div>
                    )}
                    {offer.term && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Term:</span>
                        <span className="font-semibold">{offer.term} months</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {offer.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      variant={selectedOffer === offer.type ? "default" : "outline"}
                      onClick={() => handleSelectOffer(offer.type)}
                    >
                      {selectedOffer === offer.type ? 'Selected' : 'Select This Option'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSendOffer(offer.type)}
                    >
                      Send to Customer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
              <CardDescription>Compare all payment options side by side</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Feature</th>
                      {mockOffers.map((offer) => (
                        <th key={offer.type} className="text-center py-2">{offer.type}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((metric) => (
                      <tr key={metric.key} className="border-b">
                        <td className="py-3 font-medium">{metric.label}</td>
                        {mockOffers.map((offer) => (
                          <td key={offer.type} className="text-center py-3">
                            {metric.key === 'downPayment' && formatCurrency(offer.downPayment)}
                            {metric.key === 'monthlyPayment' && (offer.monthlyPayment ? formatCurrency(offer.monthlyPayment) : 'N/A')}
                            {metric.key === 'totalAmount' && formatCurrency(offer.totalAmount)}
                            {metric.key === 'interestRate' && formatPercentage(offer.interestRate)}
                            {metric.key === 'term' && (offer.term ? `${offer.term} months` : 'N/A')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Savings Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Analysis</CardTitle>
              <CardDescription>Compare potential savings between options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Cash vs Finance</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(calculateSavings(mockOffers[1].totalAmount, mockOffers[0].totalAmount))}
                  </p>
                  <p className="text-sm text-green-700">Savings with cash purchase</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Finance vs Lease</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(calculateSavings(mockOffers[1].totalAmount, mockOffers[2].totalAmount))}
                  </p>
                  <p className="text-sm text-blue-700">Difference over lease term</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Monthly Payment</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency((mockOffers[1].monthlyPayment || 0) - (mockOffers[2].monthlyPayment || 0))}
                  </p>
                  <p className="text-sm text-purple-700">Finance vs Lease difference</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Calculator</CardTitle>
              <CardDescription>Customize payment options for your customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Vehicle Price</label>
                    <div className="mt-1">
                      <input 
                        type="number" 
                        defaultValue={mockVehicle.price}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Down Payment</label>
                    <div className="mt-1">
                      <input 
                        type="number" 
                        defaultValue={57000}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Interest Rate (%)</label>
                    <div className="mt-1">
                      <input 
                        type="number" 
                        step="0.1"
                        defaultValue={3.5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Loan Term (Months)</label>
                    <div className="mt-1">
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="24">24 months</option>
                        <option value="36">36 months</option>
                        <option value="48" selected>48 months</option>
                        <option value="60">60 months</option>
                        <option value="72">72 months</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Payment
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Calculated Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monthly Payment:</span>
                      <span className="font-semibold">{formatCurrency(4850)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold">{formatCurrency(6000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-semibold">{formatCurrency(291000)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}