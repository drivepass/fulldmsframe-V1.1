import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Calculator, RefreshCw, FileText, Download } from 'lucide-react';

export default function DealRoom() {
  const [selectedCar, setSelectedCar] = useState({
    model: 'BMW X5 2024',
    trim: 'xDrive40i',
    color: 'Alpine White',
    price: 285000
  });

  const [financeOptions, setFinanceOptions] = useState({
    loanAmount: 250000,
    downPayment: 35000,
    term: 60,
    interestRate: 3.5
  });

  const [tradeIn, setTradeIn] = useState({
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    mileage: 45000,
    condition: 'Good',
    estimatedValue: 85000
  });

  const calculateMonthlyPayment = () => {
    const principal = financeOptions.loanAmount;
    const monthlyRate = financeOptions.interestRate / 100 / 12;
    const numPayments = financeOptions.term;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment.toFixed(0);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deal Room</h1>
          <p className="text-gray-600">Configure deals and generate contracts</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Contract
        </Button>
      </div>

      <Tabs defaultValue="configurator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configurator">Car Configurator</TabsTrigger>
          <TabsTrigger value="finance">Finance Options</TabsTrigger>
          <TabsTrigger value="trade-in">Trade-In</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
        </TabsList>

        <TabsContent value="configurator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Configuration</CardTitle>
                <CardDescription>Customize the selected vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <Select value={selectedCar.model} onValueChange={(value) => 
                    setSelectedCar(prev => ({ ...prev, model: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BMW X5 2024">BMW X5 2024</SelectItem>
                      <SelectItem value="BMW X3 2024">BMW X3 2024</SelectItem>
                      <SelectItem value="Mercedes GLE 2024">Mercedes GLE 2024</SelectItem>
                      <SelectItem value="Audi Q7 2024">Audi Q7 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Trim Level</label>
                  <Select value={selectedCar.trim} onValueChange={(value) => 
                    setSelectedCar(prev => ({ ...prev, trim: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xDrive40i">xDrive40i</SelectItem>
                      <SelectItem value="xDrive50i">xDrive50i</SelectItem>
                      <SelectItem value="M50i">M50i</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <Select value={selectedCar.color} onValueChange={(value) => 
                    setSelectedCar(prev => ({ ...prev, color: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alpine White">Alpine White</SelectItem>
                      <SelectItem value="Jet Black">Jet Black</SelectItem>
                      <SelectItem value="Storm Bay">Storm Bay</SelectItem>
                      <SelectItem value="Mineral Grey">Mineral Grey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Base Price</label>
                  <Input 
                    value={`AED ${selectedCar.price.toLocaleString()}`}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optional Extras</CardTitle>
                <CardDescription>Add optional features and packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Premium Package', price: 15000, selected: true },
                    { name: 'M Sport Package', price: 12000, selected: false },
                    { name: 'Panoramic Sunroof', price: 8000, selected: true },
                    { name: 'Harman Kardon Sound', price: 5000, selected: false },
                    { name: 'Adaptive Suspension', price: 7000, selected: true }
                  ].map((extra, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked={extra.selected} />
                        <span className="font-medium">{extra.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">+AED {extra.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Price:</span>
                    <span>AED 315,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Finance Calculator</CardTitle>
                <CardDescription>Calculate monthly payments and terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Loan Amount (AED)</label>
                  <Input 
                    type="number"
                    value={financeOptions.loanAmount}
                    onChange={(e) => setFinanceOptions(prev => ({ 
                      ...prev, 
                      loanAmount: parseInt(e.target.value) 
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Down Payment (AED)</label>
                  <Input 
                    type="number"
                    value={financeOptions.downPayment}
                    onChange={(e) => setFinanceOptions(prev => ({ 
                      ...prev, 
                      downPayment: parseInt(e.target.value) 
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Loan Term (Months)</label>
                  <Select value={financeOptions.term.toString()} onValueChange={(value) => 
                    setFinanceOptions(prev => ({ ...prev, term: parseInt(value) }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="72">72 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Interest Rate (%)</label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={financeOptions.interestRate}
                    onChange={(e) => setFinanceOptions(prev => ({ 
                      ...prev, 
                      interestRate: parseFloat(e.target.value) 
                    }))}
                  />
                </div>
                <Button className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Recalculate
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Monthly payment breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      AED {calculateMonthlyPayment()}
                    </div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vehicle Price:</span>
                      <span>AED 315,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment:</span>
                      <span>AED {financeOptions.downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span>AED {financeOptions.loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span>{financeOptions.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Term:</span>
                      <span>{financeOptions.term} months</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total Amount:</span>
                      <span>AED {(parseInt(calculateMonthlyPayment()) * financeOptions.term + financeOptions.downPayment).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trade-in" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade-In Valuation</CardTitle>
              <CardDescription>Evaluate customer's current vehicle for trade-in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Make</label>
                    <Input 
                      value={tradeIn.make}
                      onChange={(e) => setTradeIn(prev => ({ ...prev, make: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Model</label>
                    <Input 
                      value={tradeIn.model}
                      onChange={(e) => setTradeIn(prev => ({ ...prev, model: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Year</label>
                    <Input 
                      type="number"
                      value={tradeIn.year}
                      onChange={(e) => setTradeIn(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mileage (km)</label>
                    <Input 
                      type="number"
                      value={tradeIn.mileage}
                      onChange={(e) => setTradeIn(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Condition</label>
                    <Select value={tradeIn.condition} onValueChange={(value) => 
                      setTradeIn(prev => ({ ...prev, condition: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      AED {tradeIn.estimatedValue.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Estimated Trade-In Value</p>
                  </div>
                  <Button className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Get Updated Valuation
                  </Button>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Market Value:</span>
                      <span>AED 95,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condition Adjustment:</span>
                      <span>-AED 5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mileage Adjustment:</span>
                      <span>-AED 5,000</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Final Offer:</span>
                      <span>AED {tradeIn.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Generation</CardTitle>
              <CardDescription>Generate and manage sales contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Vehicle Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Model:</span>
                        <span>{selectedCar.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trim:</span>
                        <span>{selectedCar.trim}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span>{selectedCar.color}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Price:</span>
                        <span>AED 315,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Finance Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span>AED {financeOptions.downPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span>AED {financeOptions.loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span>AED {calculateMonthlyPayment()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trade-In Value:</span>
                        <span>AED {tradeIn.estimatedValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Contract
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}