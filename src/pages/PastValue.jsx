import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { TrendingUp, DollarSign, Percent, Shield } from 'lucide-react'

const PastValue = () => {
  const { pastValue, updatePastValue } = usePCMO()
  
  const [laborCost, setLaborCost] = useState(pastValue.laborCost || 0)
  const [efficiencyGain, setEfficiencyGain] = useState(pastValue.efficiencyGain || 0)
  const [costAvoidance, setCostAvoidance] = useState(pastValue.costAvoided || 0)
  
  // Calculate savings
  const calculateSavings = () => {
    const efficiencySavings = laborCost * (efficiencyGain / 100)
    const productivitySavings = laborCost * (pastValue.productivityGain / 100)
    const totalSavings = efficiencySavings + productivitySavings + costAvoidance
    
    return {
      efficiencySavings,
      productivitySavings,
      costAvoidance,
      totalSavings
    }
  }
  
  const savings = calculateSavings()
  
  // Update context when inputs change
  useEffect(() => {
    const laborCostNum = parseFloat(laborCost) || 0
    const efficiencyGainNum = parseFloat(efficiencyGain) || 0
    const costAvoidanceNum = parseFloat(costAvoidance) || 0
    const productivityGainNum = pastValue.productivityGain || 0
    
    const efficiencySavings = laborCostNum * (efficiencyGainNum / 100)
    const productivitySavings = laborCostNum * (productivityGainNum / 100)
    
    updatePastValue({
      laborCost: laborCostNum,
      efficiencyGain: efficiencyGainNum,
      costAvoided: costAvoidanceNum,
      savings: [
        {
          category: 'Efficiency Gain',
          amount: efficiencySavings,
          percentage: efficiencyGainNum
        },
        {
          category: 'Productivity Gain',
          amount: productivitySavings,
          percentage: productivityGainNum
        },
        {
          category: 'Cost Avoided',
          amount: costAvoidanceNum,
          percentage: 0
        }
      ]
    })
  }, [laborCost, efficiencyGain, costAvoidance, pastValue.productivityGain, updatePastValue])
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const savingsData = [
    {
      category: 'Efficiency Gain Savings',
      amount: savings.efficiencySavings,
      description: `Based on ${efficiencyGain}% efficiency gain`
    },
    {
      category: 'Productivity Gain Savings',
      amount: savings.productivitySavings,
      description: `Based on ${pastValue.productivityGain || 0}% productivity gain`
    },
    {
      category: 'Cost Avoided',
      amount: savings.costAvoidance,
      description: 'Direct cost avoidance'
    }
  ]
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Past Value Analysis</h1>
        <p className="text-gray-600">Calculate and analyze past value realized from VCF implementation</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Input Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Input Parameters</h2>
          
          <div className="space-y-6">
            {/* Labor Cost Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>Labor Cost ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter annual labor cost"
                min="0"
                step="1000"
              />
              <p className="mt-1 text-sm text-gray-500">Annual labor cost baseline</p>
            </div>
            
            {/* Efficiency Gain Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Percent className="w-4 h-4 text-gray-500" />
                  <span>Efficiency Gain (%)</span>
                </div>
              </label>
              <input
                type="number"
                value={efficiencyGain}
                onChange={(e) => setEfficiencyGain(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter efficiency gain percentage"
                min="0"
                max="100"
                step="0.1"
              />
              <p className="mt-1 text-sm text-gray-500">Percentage improvement in operational efficiency</p>
            </div>
            
            {/* Cost Avoidance Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span>Cost Avoided ($)</span>
                </div>
              </label>
              <input
                type="number"
                value={costAvoidance}
                onChange={(e) => setCostAvoidance(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter cost avoidance amount"
                min="0"
                step="1000"
              />
              <p className="mt-1 text-sm text-gray-500">Direct costs avoided through VCF implementation</p>
            </div>
          </div>
        </div>
        
        {/* Value Realized Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h2 className="text-xl font-semibold">Value Realized</h2>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-indigo-100 mb-1">Total Savings</div>
            <div className="text-4xl font-bold mb-6">
              {formatCurrency(savings.totalSavings)}
            </div>
            
            <div className="space-y-3 pt-4 border-t border-indigo-400/30">
              <div className="flex justify-between text-sm">
                <span className="text-indigo-100">Efficiency Savings</span>
                <span className="font-semibold">{formatCurrency(savings.efficiencySavings)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-indigo-100">Productivity Savings</span>
                <span className="font-semibold">{formatCurrency(savings.productivitySavings)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-indigo-100">Cost Avoided</span>
                <span className="font-semibold">{formatCurrency(savings.costAvoidance)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Savings Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Savings Breakdown</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {savingsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800 font-medium">{item.category}</td>
                  <td className="py-4 px-4 text-right text-gray-900 font-semibold">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-sm">{item.description}</td>
                </tr>
              ))}
              <tr className="bg-indigo-50 font-semibold">
                <td className="py-4 px-4 text-gray-900">Total Savings</td>
                <td className="py-4 px-4 text-right text-indigo-600">
                  {formatCurrency(savings.totalSavings)}
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">Sum of all savings categories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PastValue

