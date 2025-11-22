import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calculator, Server, Code, Zap, TrendingDown } from 'lucide-react'

const ValueModel = () => {
  const { valueModel, updateValueModel } = usePCMO()
  
  // Current Spend (Baseline) inputs
  const [currentHardware, setCurrentHardware] = useState(valueModel.baseline.hardwareCost || 0)
  const [currentSoftware, setCurrentSoftware] = useState(valueModel.baseline.licensingCost || 0)
  const [currentPower, setCurrentPower] = useState(valueModel.baseline.operationalCost || 0)
  
  // Projected VCF Spend inputs
  const [vcfHardware, setVcfHardware] = useState(valueModel.vcf.hardwareCost || 0)
  const [vcfSoftware, setVcfSoftware] = useState(valueModel.vcf.licensingCost || 0)
  const [vcfPower, setVcfPower] = useState(valueModel.vcf.operationalCost || 0)
  
  const timeframe = 3 // 3-Year TCO
  
  // Calculate 3-Year TCO
  const calculateTCO = () => {
    const currentTotal = (parseFloat(currentHardware) || 0) + 
                         (parseFloat(currentSoftware) || 0) + 
                         (parseFloat(currentPower) || 0)
    
    const vcfTotal = (parseFloat(vcfHardware) || 0) + 
                    (parseFloat(vcfSoftware) || 0) + 
                    (parseFloat(vcfPower) || 0)
    
    const current3YearTCO = currentTotal * timeframe
    const vcf3YearTCO = vcfTotal * timeframe
    const totalSavings = current3YearTCO - vcf3YearTCO
    const roi = currentTotal > 0 ? ((totalSavings / current3YearTCO) * 100) : 0
    
    return {
      current3YearTCO,
      vcf3YearTCO,
      totalSavings,
      roi,
      currentTotal,
      vcfTotal
    }
  }
  
  const tcoData = calculateTCO()
  
  // Prepare chart data
  const chartData = [
    {
      name: 'Current Environment',
      'Hardware': (parseFloat(currentHardware) || 0) * timeframe,
      'Software': (parseFloat(currentSoftware) || 0) * timeframe,
      'Power/Operations': (parseFloat(currentPower) || 0) * timeframe,
      'Total': tcoData.current3YearTCO
    },
    {
      name: 'VCF Environment',
      'Hardware': (parseFloat(vcfHardware) || 0) * timeframe,
      'Software': (parseFloat(vcfSoftware) || 0) * timeframe,
      'Power/Operations': (parseFloat(vcfPower) || 0) * timeframe,
      'Total': tcoData.vcf3YearTCO
    }
  ]
  
  // Update context when inputs change
  useEffect(() => {
    updateValueModel({
      baseline: {
        hardwareCost: parseFloat(currentHardware) || 0,
        licensingCost: parseFloat(currentSoftware) || 0,
        operationalCost: parseFloat(currentPower) || 0,
        maintenanceCost: 0
      },
      vcf: {
        hardwareCost: parseFloat(vcfHardware) || 0,
        licensingCost: parseFloat(vcfSoftware) || 0,
        operationalCost: parseFloat(vcfPower) || 0,
        maintenanceCost: 0
      },
      timeframe: timeframe
    })
  }, [currentHardware, currentSoftware, currentPower, vcfHardware, vcfSoftware, vcfPower, updateValueModel])
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Value Model (VCF TCO/ROI)</h1>
        <p className="text-gray-600">Compare Current Spend vs Projected VCF Spend over 3 years</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current Spend Inputs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Current Spend (Annual)</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-gray-500" />
                  <span>Hardware ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={currentHardware}
                onChange={(e) => setCurrentHardware(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual hardware cost"
                min="0"
                step="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-gray-500" />
                  <span>Software/Licensing ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={currentSoftware}
                onChange={(e) => setCurrentSoftware(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual software cost"
                min="0"
                step="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span>Power/Operations ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={currentPower}
                onChange={(e) => setCurrentPower(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual power/operations cost"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </div>
        
        {/* Projected VCF Spend Inputs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Projected VCF Spend (Annual)</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-gray-500" />
                  <span>Hardware ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={vcfHardware}
                onChange={(e) => setVcfHardware(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual VCF hardware cost"
                min="0"
                step="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-gray-500" />
                  <span>Software/Licensing ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={vcfSoftware}
                onChange={(e) => setVcfSoftware(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual VCF software cost"
                min="0"
                step="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span>Power/Operations ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={vcfPower}
                onChange={(e) => setVcfPower(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual VCF power/operations cost"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Current 3-Year TCO</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(tcoData.current3YearTCO)}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">VCF 3-Year TCO</div>
          <div className="text-2xl font-bold text-indigo-600">{formatCurrency(tcoData.vcf3YearTCO)}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-lg shadow-lg text-white">
          <div className="text-sm text-green-100 mb-1">Total Savings</div>
          <div className="text-2xl font-bold">{formatCurrency(tcoData.totalSavings)}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
          <div className="text-sm text-blue-100 mb-1">ROI</div>
          <div className="text-2xl font-bold">{tcoData.roi.toFixed(1)}%</div>
        </div>
      </div>
      
      {/* 3-Year TCO Comparison Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">3-Year TCO Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="Hardware" fill="#6366f1" />
            <Bar dataKey="Software" fill="#8b5cf6" />
            <Bar dataKey="Power/Operations" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ValueModel

