import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Gauge, Sliders } from 'lucide-react'

const Maturity = () => {
  const { maturity, updateMaturity } = usePCMO()
  
  // Initialize scores from context or defaults
  const [automation, setAutomation] = useState(maturity.scores.automation || 3)
  const [operations, setOperations] = useState(maturity.scores.operations || 3)
  const [financialMgmt, setFinancialMgmt] = useState(maturity.scores.optimization || 3) // Using optimization field for Financial Mgmt
  const [security, setSecurity] = useState(maturity.scores.security || 3)
  const [governance, setGovernance] = useState(maturity.scores.governance || 3)
  
  // Industry benchmarks (hardcoded, scale 1-5)
  const industryBenchmark = {
    automation: 3.5,
    operations: 3.5,
    financialMgmt: 3.5,
    security: 4.0,
    governance: 3.8
  }
  
  // Calculate overall maturity score (average of 5 domains, out of 5)
  const overallScore = ((automation + operations + financialMgmt + security + governance) / 5).toFixed(1)
  
  // Prepare data for radar chart (convert to 0-100 scale for display)
  const chartData = [
    {
      domain: 'Automation',
      user: (automation / 5) * 100,
      benchmark: (industryBenchmark.automation / 5) * 100
    },
    {
      domain: 'Operations',
      user: (operations / 5) * 100,
      benchmark: (industryBenchmark.operations / 5) * 100
    },
    {
      domain: 'Financial Mgmt',
      user: (financialMgmt / 5) * 100,
      benchmark: (industryBenchmark.financialMgmt / 5) * 100
    },
    {
      domain: 'Security',
      user: (security / 5) * 100,
      benchmark: (industryBenchmark.security / 5) * 100
    },
    {
      domain: 'Governance',
      user: (governance / 5) * 100,
      benchmark: (industryBenchmark.governance / 5) * 100
    }
  ]
  
  // Update context when scores change
  useEffect(() => {
    updateMaturity({
      scores: {
        automation: parseFloat(automation),
        operations: parseFloat(operations),
        optimization: parseFloat(financialMgmt), // Storing Financial Mgmt in optimization field
        security: parseFloat(security),
        governance: parseFloat(governance)
      },
      industryBenchmark: {
        automation: (industryBenchmark.automation / 5) * 100,
        operations: (industryBenchmark.operations / 5) * 100,
        optimization: (industryBenchmark.financialMgmt / 5) * 100,
        security: (industryBenchmark.security / 5) * 100,
        governance: (industryBenchmark.governance / 5) * 100
      },
      totalScore: parseFloat(overallScore)
    })
  }, [automation, operations, financialMgmt, security, governance, overallScore, updateMaturity])
  
  const getScoreColor = (score) => {
    if (score >= 4) return 'text-green-600'
    if (score >= 3) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getScoreBgColor = (score) => {
    if (score >= 4) return 'bg-green-100'
    if (score >= 3) return 'bg-yellow-100'
    return 'bg-red-100'
  }
  
  const domains = [
    { name: 'Automation', value: automation, setValue: setAutomation, icon: '⚙️' },
    { name: 'Operations', value: operations, setValue: setOperations, icon: '🔧' },
    { name: 'Financial Mgmt', value: financialMgmt, setValue: setFinancialMgmt, icon: '💰' },
    { name: 'Security', value: security, setValue: setSecurity, icon: '🔒' },
    { name: 'Governance', value: governance, setValue: setGovernance, icon: '📋' }
  ]
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Maturity Assessment</h1>
        <p className="text-gray-600">Rate your organization's maturity across 5 key domains (1-5 scale)</p>
      </div>
      
      {/* Overall Score Card */}
      <div className="mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Gauge className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Overall Maturity Score</h2>
            </div>
            <div className="text-4xl font-bold">{overallScore} / 5.0</div>
            <div className="text-indigo-100 mt-2">
              Average across all 5 domains
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-100 mb-1">Percentage</div>
            <div className="text-3xl font-bold">
              {((overallScore / 5) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scoring Interface */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-6">
            <Sliders className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Domain Scoring</h2>
          </div>
          
          <div className="space-y-6">
            {domains.map((domain) => (
              <div key={domain.name}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{domain.icon}</span>
                    <label className="text-sm font-medium text-gray-700">
                      {domain.name}
                    </label>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBgColor(domain.value)} ${getScoreColor(domain.value)}`}>
                    {domain.value} / 5
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={domain.value}
                  onChange={(e) => domain.setValue(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 - Low</span>
                  <span>3 - Medium</span>
                  <span>5 - High</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Maturity Comparison</h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="domain" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 10 }}
              />
              <Radar
                name="Your Score"
                dataKey="user"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
              />
              <Radar
                name="Industry Benchmark"
                dataKey="benchmark"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip 
                formatter={(value) => `${value.toFixed(1)}%`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Domain Details */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Domain Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {domains.map((domain) => (
            <div key={domain.name} className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">{domain.icon}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{domain.name}</div>
              <div className={`text-2xl font-bold ${getScoreColor(domain.value)}`}>
                {domain.value} / 5
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Benchmark: {industryBenchmark[domain.name.toLowerCase().replace(' ', '')] || industryBenchmark.automation} / 5
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Maturity

