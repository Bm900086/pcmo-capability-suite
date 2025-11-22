import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, Cloud, Server, TrendingDown } from 'lucide-react'

const Competitive = () => {
  const { competitive, updateCompetitive } = usePCMO()
  
  // VCF cost input
  const [vcfCost, setVcfCost] = useState(competitive.vcf.totalCost || 0)
  
  // Public Cloud competitor is 20% more expensive
  const competitorMultiplier = 1.2
  const competitorCost = (parseFloat(vcfCost) || 0) * competitorMultiplier
  
  // Calculate savings
  const savings = competitorCost - (parseFloat(vcfCost) || 0)
  const savingsPercent = (parseFloat(vcfCost) || 0) > 0 
    ? ((savings / competitorCost) * 100) 
    : 0
  
  // Prepare chart data for side-by-side comparison
  const comparisonData = [
    {
      name: 'VCF',
      cost: parseFloat(vcfCost) || 0,
      color: '#6366f1'
    },
    {
      name: 'Public Cloud',
      cost: competitorCost,
      color: '#ef4444'
    }
  ]
  
  // Update context when VCF cost changes
  useEffect(() => {
    const vcfCostNum = parseFloat(vcfCost) || 0
    const competitorCostNum = vcfCostNum * competitorMultiplier
    
    updateCompetitive({
      vcf: {
        totalCost: vcfCostNum,
        cpuRatio: 1.0,
        vcpuRatio: 1.0
      },
      competitor: {
        totalCost: competitorCostNum,
        cpuRatio: 1.0,
        vcpuRatio: 1.0
      },
      comparisonData: [
        {
          name: 'VCF',
          cost: vcfCostNum,
          color: '#6366f1'
        },
        {
          name: 'Public Cloud',
          cost: competitorCostNum,
          color: '#ef4444'
        }
      ]
    })
  }, [vcfCost, updateCompetitive])
  
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Competitive TCO</h1>
        <p className="text-gray-600">Compare VCF cost against Public Cloud competitor</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* VCF Cost Input */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Server className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">VCF Cost</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual VCF Cost ($)
            </label>
            <input
              type="number"
              value={vcfCost}
              onChange={(e) => setVcfCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              placeholder="Enter VCF annual cost"
              min="0"
              step="1000"
            />
            <p className="mt-2 text-sm text-gray-500">
              Current VCF cost: {formatCurrency(parseFloat(vcfCost) || 0)}
            </p>
          </div>
        </div>
        
        {/* Competitor Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Cloud className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">Public Cloud</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">Competitor Cost</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(competitorCost)}
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Assumed 20% more expensive than VCF
              </div>
            </div>
          </div>
        </div>
        
        {/* Savings Summary */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Savings with VCF</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-green-100 mb-1">Total Savings</div>
              <div className="text-3xl font-bold">
                {formatCurrency(savings)}
              </div>
            </div>
            <div className="pt-3 border-t border-green-400/30">
              <div className="text-sm text-green-100 mb-1">Savings Percentage</div>
              <div className="text-2xl font-semibold">
                {savingsPercent.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Side-by-Side Comparison Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Cost Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
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
            <Bar dataKey="cost" radius={[8, 8, 0, 0]}>
              {comparisonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Additional Comparison Details */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparison Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">VCF Annual Cost</div>
            <div className="text-xl font-bold text-indigo-600">{formatCurrency(parseFloat(vcfCost) || 0)}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Public Cloud Annual Cost</div>
            <div className="text-xl font-bold text-red-600">{formatCurrency(competitorCost)}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Annual Savings</div>
            <div className="text-xl font-bold text-green-600">{formatCurrency(savings)}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Cost Advantage</div>
            <div className="text-xl font-bold text-indigo-600">{savingsPercent.toFixed(1)}% lower with VCF</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Competitive

