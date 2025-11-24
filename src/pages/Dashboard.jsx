import { Link } from 'react-router-dom'
import { TrendingUp, Calculator, BarChart3, Gauge, CheckCircle2, ArrowRight } from 'lucide-react'
import { usePCMO } from '../PCMOContext'

const Dashboard = () => {
  const { pastValue, valueModel, competitive, maturity, readiness, globalConfig } = usePCMO()
  
  // Calculate values from context data
  const calculatePastValueSavings = () => {
    const laborCostNum = pastValue.laborCost || 0
    const efficiencyGainNum = pastValue.efficiencyGain || 0
    const productivityGainNum = pastValue.productivityGain || 0
    const costAvoidedNum = pastValue.costAvoided || 0
    const efficiencySavings = laborCostNum * (efficiencyGainNum / 100)
    const productivitySavings = laborCostNum * (productivityGainNum / 100)
    return efficiencySavings + productivitySavings + costAvoidedNum
  }
  
  const calculateValueModelSavings = () => {
    const baselineTotal = (valueModel.baseline.hardwareCost || 0) + 
                         (valueModel.baseline.licensingCost || 0) + 
                         (valueModel.baseline.operationalCost || 0)
    const vcfTotal = (valueModel.vcf.hardwareCost || 0) + 
                    (valueModel.vcf.licensingCost || 0) + 
                    (valueModel.vcf.operationalCost || 0)
    const timeframe = valueModel.timeframe || 3
    return (baselineTotal - vcfTotal) * timeframe
  }
  
  const calculateValueModelROI = () => {
    const baselineTotal = (valueModel.baseline.hardwareCost || 0) + 
                         (valueModel.baseline.licensingCost || 0) + 
                         (valueModel.baseline.operationalCost || 0)
    const vcfTotal = (valueModel.vcf.hardwareCost || 0) + 
                    (valueModel.vcf.licensingCost || 0) + 
                    (valueModel.vcf.operationalCost || 0)
    const timeframe = valueModel.timeframe || 3
    const baseline3Year = baselineTotal * timeframe
    const vcf3Year = vcfTotal * timeframe
    const savings = baseline3Year - vcf3Year
    return baseline3Year > 0 ? (savings / baseline3Year) * 100 : 0
  }
  
  const calculateCompetitiveSavings = () => {
    const vcfCost = competitive.vcf.totalCost || 0
    const competitorCost = competitive.competitor.totalCost || 0
    return competitorCost - vcfCost
  }
  
  const calculateCompetitiveSavingsPercent = () => {
    const vcfCost = competitive.vcf.totalCost || 0
    const competitorCost = competitive.competitor.totalCost || 0
    return competitorCost > 0 ? ((competitorCost - vcfCost) / competitorCost) * 100 : 0
  }
  
  const getReadinessStatus = () => {
    const score = readiness.readinessScore || 0
    if (score >= 90) return { label: 'Ready', color: 'text-green-600' }
    if (score >= 60) return { label: 'Warning', color: 'text-yellow-600' }
    return { label: 'Not Ready', color: 'text-red-600' }
  }
  
  const getReadinessGaps = () => {
    const critical = readiness.riskMatrix?.critical?.length || 0
    const high = readiness.riskMatrix?.high?.length || 0
    return { critical, high }
  }
  
  // Use real data from context, fallback to mock data if no data exists
  const data = {
    pastValue: {
      totalSavings: calculatePastValueSavings() || 2450000,
      efficiencyGain: pastValue.efficiencyGain || 35,
      costAvoided: pastValue.costAvoided || 1800000
    },
    valueModel: {
      totalSavings: calculateValueModelSavings() || 3200000,
      vcfCost: ((valueModel.vcf.hardwareCost || 0) + (valueModel.vcf.licensingCost || 0) + (valueModel.vcf.operationalCost || 0)) || 1850000,
      baselineCost: ((valueModel.baseline.hardwareCost || 0) + (valueModel.baseline.licensingCost || 0) + (valueModel.baseline.operationalCost || 0)) || 5050000,
      roi: calculateValueModelROI() || 73.0,
      totalVMs: globalConfig?.totalVMs || 0
    },
    competitive: {
      vcfCost: competitive.vcf.totalCost || 1850000,
      competitorCost: competitive.competitor.totalCost || 2400000,
      savings: calculateCompetitiveSavings() || 550000,
      savingsPercent: calculateCompetitiveSavingsPercent() || 22.9
    },
    maturity: {
      totalScore: maturity.totalScore ? (maturity.totalScore / 5) * 100 : 68,
      governance: maturity.scores?.governance ? (maturity.scores.governance / 5) * 100 : 72,
      operations: maturity.scores?.operations ? (maturity.scores.operations / 5) * 100 : 65,
      automation: maturity.scores?.automation ? (maturity.scores.automation / 5) * 100 : 60,
      security: maturity.scores?.security ? (maturity.scores.security / 5) * 100 : 75,
      optimization: maturity.scores?.optimization ? (maturity.scores.optimization / 5) * 100 : 68
    },
    readiness: {
      readinessScore: readiness.readinessScore || 82,
      criticalGaps: getReadinessGaps().critical || 1,
      highGaps: getReadinessGaps().high || 3
    }
  }
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const summaryCards = [
    {
      title: 'Past Value Analysis',
      icon: TrendingUp,
      link: '/past-value',
      metrics: [
        { label: 'Total Savings', value: formatCurrency(data.pastValue.totalSavings), color: 'text-green-600' },
        { label: 'Efficiency Gain', value: `${data.pastValue.efficiencyGain}%`, color: 'text-blue-600' },
        { label: 'Cost Avoided', value: formatCurrency(data.pastValue.costAvoided), color: 'text-purple-600' }
      ]
    },
    {
      title: 'Value Model (TCO/ROI)',
      icon: Calculator,
      link: '/tco',
      metrics: [
        { label: 'Total Savings', value: formatCurrency(data.valueModel.totalSavings), color: 'text-green-600' },
        { label: 'ROI', value: `${data.valueModel.roi.toFixed(1)}%`, color: 'text-blue-600' },
        { label: 'Total VMs', value: data.valueModel.totalVMs.toLocaleString(), color: 'text-indigo-600' }
      ]
    },
    {
      title: 'Competitive TCO',
      icon: BarChart3,
      link: '/competitive',
      metrics: [
        { label: 'VCF Cost', value: formatCurrency(data.competitive.vcfCost), color: 'text-blue-600' },
        { label: 'Competitor Cost', value: formatCurrency(data.competitive.competitorCost), color: 'text-gray-600' },
        { label: 'Savings', value: formatCurrency(data.competitive.savings), color: 'text-green-600' }
      ]
    },
    {
      title: 'Maturity Assessment',
      icon: Gauge,
      link: '/maturity',
      metrics: [
        { label: 'Overall Score', value: `${data.maturity.totalScore.toFixed(0)}/100`, color: 'text-indigo-600' },
        { label: 'Governance', value: `${data.maturity.governance.toFixed(0)}/100`, color: 'text-blue-600' },
        { label: 'Security', value: `${data.maturity.security.toFixed(0)}/100`, color: 'text-green-600' }
      ]
    },
    {
      title: 'VCF 9.0 Readiness',
      icon: CheckCircle2,
      link: '/readiness',
      metrics: [
        { label: 'Readiness Score', value: `${data.readiness.readinessScore.toFixed(0)}%`, color: getReadinessStatus().color },
        { label: 'Critical Gaps', value: data.readiness.criticalGaps, color: 'text-red-600' },
        { label: 'High Gaps', value: data.readiness.highGaps, color: 'text-orange-600' }
      ]
    }
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Executive Dashboard</h1>
        <p className="text-gray-600">Overview of PCMO Capability Suite metrics and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              
              <div className="space-y-3">
                {card.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className={`text-lg font-semibold ${metric.color}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard

