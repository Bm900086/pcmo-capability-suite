import { usePCMO } from '../PCMOContext'
import { Printer, FileText } from 'lucide-react'
import { useState } from 'react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'

const Proposal = () => {
  const { pastValue, valueModel, competitive, maturity, readiness } = usePCMO()
  const [isPrinting, setIsPrinting] = useState(false)
  
  // Calculate financial metrics
  const calculatePastValueSavings = () => {
    const laborCostNum = pastValue.laborCost || 0
    const efficiencyGainNum = pastValue.efficiencyGain || 0
    const productivityGainNum = pastValue.productivityGain || 0
    const costAvoidedNum = pastValue.costAvoided || 0
    const efficiencySavings = laborCostNum * (efficiencyGainNum / 100)
    const productivitySavings = laborCostNum * (productivityGainNum / 100)
    return efficiencySavings + productivitySavings + costAvoidedNum
  }
  
  const calculateCurrentSpend = () => {
    return (valueModel.baseline.hardwareCost || 0) + 
           (valueModel.baseline.licensingCost || 0) + 
           (valueModel.baseline.operationalCost || 0)
  }
  
  const calculateFutureSpend = () => {
    return (valueModel.vcf.hardwareCost || 0) + 
           (valueModel.vcf.licensingCost || 0) + 
           (valueModel.vcf.operationalCost || 0)
  }
  
  const calculate3YearTCO = () => {
    const currentSpend = calculateCurrentSpend()
    const futureSpend = calculateFutureSpend()
    const timeframe = valueModel.timeframe || 3
    return {
      current: currentSpend * timeframe,
      future: futureSpend * timeframe,
      savings: (currentSpend - futureSpend) * timeframe
    }
  }
  
  const calculateROI = () => {
    const tco = calculate3YearTCO()
    return tco.current > 0 ? (tco.savings / tco.current) * 100 : 0
  }
  
  const roi = calculateROI()
  const tco = calculate3YearTCO()
  const currentSpend = calculateCurrentSpend()
  const futureSpend = calculateFutureSpend()
  
  // Determine readiness status
  const getReadinessStatus = () => {
    const score = readiness.readinessScore || 0
    if (score >= 90) return { label: 'Ready', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' }
    if (score >= 60) return { label: 'Warning', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' }
    return { label: 'Not Ready', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
  }
  
  const readinessStatus = getReadinessStatus()
  
  // Get maturity score
  const maturityScore = maturity.totalScore ? (maturity.totalScore / 5) * 100 : 0
  
  // Generate executive summary
  const generateExecutiveSummary = () => {
    let summary = "This assessment evaluates the organization's private cloud maturity and optimization potential through comprehensive analysis of financial impact, technical readiness, and strategic positioning.\n\n"
    
    if (roi > 100) {
      summary += "Strong Financial Case: The projected return on investment exceeds 100%, demonstrating significant cost savings and value realization potential.\n\n"
    } else if (roi > 50) {
      summary += "Positive Financial Case: The projected return on investment shows substantial cost savings and value potential.\n\n"
    } else {
      summary += "Financial Analysis: The assessment reveals cost optimization opportunities with measurable return on investment.\n\n"
    }
    
    if (readinessStatus.color === 'green') {
      summary += "Technical Environment Ready: The infrastructure assessment indicates readiness for VCF 9.0 upgrade with minimal gaps identified.\n\n"
    } else if (readinessStatus.color === 'yellow') {
      summary += "Technical Environment Requires Review: Some infrastructure gaps need to be addressed before proceeding with VCF 9.0 upgrade.\n\n"
    } else {
      summary += "Technical Environment Needs Attention: Significant infrastructure gaps require remediation before VCF 9.0 upgrade can be considered.\n\n"
    }
    
    summary += `The analysis demonstrates ${formatCurrency(tco.savings)} in projected savings over a ${valueModel.timeframe || 3}-year period, with a maturity score of ${maturityScore.toFixed(0)}% indicating ${maturityScore >= 70 ? 'strong' : maturityScore >= 50 ? 'moderate' : 'developing'} organizational maturity in private cloud operations.`
    
    return summary
  }
  
  // Generate next steps based on gaps
  const generateNextSteps = () => {
    const steps = []
    const gaps = readiness.gaps || []
    const criticalGaps = readiness.riskMatrix?.critical || []
    const highGaps = readiness.riskMatrix?.high || []
    
    if (criticalGaps.length > 0) {
      steps.push({
        priority: 'Critical',
        items: criticalGaps.map(gap => `Address critical gap: ${gap}`)
      })
    }
    
    if (highGaps.length > 0) {
      steps.push({
        priority: 'High',
        items: highGaps.map(gap => `Resolve high-priority gap: ${gap}`)
      })
    }
    
    if (gaps.length === 0) {
      steps.push({
        priority: 'General',
        items: [
          'Proceed with VCF 9.0 upgrade planning',
          'Establish governance framework for ongoing optimization',
          'Implement continuous monitoring and assessment processes'
        ]
      })
    } else {
      steps.push({
        priority: 'General',
        items: [
          'Complete remaining technical requirements',
          'Establish governance framework for ongoing optimization',
          'Schedule follow-up assessment after gap remediation'
        ]
      })
    }
    
    // Add maturity-based recommendations
    if (maturityScore < 50) {
      steps.push({
        priority: 'Maturity',
        items: [
          'Focus on automation and operational efficiency improvements',
          'Enhance security and governance practices',
          'Invest in team training and capability development'
        ]
      })
    }
    
    return steps
  }
  
  const nextSteps = generateNextSteps()
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }
  
  return (
    <div className="pb-24">
      {/* Business Guide */}
      <div className="print:hidden mb-8">
        <BusinessGuide
          context="The Proposal Generation module consolidates all assessment results into a professional, print-ready document suitable for executive presentation and stakeholder review. It includes dynamic executive summaries, comprehensive financial impact analysis, maturity scores, readiness status, and strategic recommendations based on your completed assessments across all modules."
          action="Review the generated proposal below. The document automatically includes all data from your completed assessments. Use the 'Print / Save as PDF' button to generate a professional document. Customize the 'Prepared For' field and upload customer logos for branding. The proposal is optimized for printing with proper page breaks and formatting."
          assumptions="The proposal aggregates data from Past Value Analysis (realized value), Value Model (TCO/ROI projections), Competitive TCO (market comparisons), Maturity Assessment (capability scores), and Readiness Assessment (deployment readiness). Financial metrics are calculated based on your inputs and industry-standard assumptions. Recommendations are dynamically generated based on identified gaps, maturity scores, and readiness blockers."
        />
      </div>
      
    <>
      {/* Floating Print Button */}
      <div className="print:hidden fixed bottom-8 right-8 z-50">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-colors"
        >
          <Printer className="w-5 h-5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>
      
      {/* Proposal Document */}
      <div className="proposal-document bg-white min-h-screen p-8 md:p-12 print:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 print:mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Private Cloud Maturity & Optimization Assessment
            </h1>
            <p className="text-lg text-gray-600">
              Assessment Date: {formatDate()}
            </p>
          </div>
          
          {/* Executive Summary */}
          <section className="mb-8 print:mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
              Executive Summary
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {generateExecutiveSummary()}
            </div>
          </section>
          
          {/* Financial Impact */}
          <section className="mb-8 print:mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
              Financial Impact
            </h2>
            {/* Desktop: Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Metric</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-900">Current Spend</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-900">Future Spend (VCF)</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-900">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Annual Spend</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">{formatCurrency(currentSpend)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">{formatCurrency(futureSpend)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-green-700">{formatCurrency(currentSpend - futureSpend)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{valueModel.timeframe || 3}-Year TCO</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">{formatCurrency(tco.current)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">{formatCurrency(tco.future)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-green-700">{formatCurrency(tco.savings)}</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border border-gray-300 px-4 py-3 font-bold text-gray-900">Total Savings</td>
                    <td colSpan="2" className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-700">3-Year ROI</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold text-indigo-700">{roi.toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Mobile: Card View */}
            <div className="md:hidden space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-gray-900 mb-3 text-base border-b border-gray-200 pb-2">Annual Spend</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Spend:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(currentSpend)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Future Spend (VCF):</span>
                    <span className="font-medium text-gray-900">{formatCurrency(futureSpend)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Difference:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(currentSpend - futureSpend)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-gray-900 mb-3 text-base border-b border-gray-200 pb-2">{valueModel.timeframe || 3}-Year TCO</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(tco.current)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Future (VCF):</span>
                    <span className="font-medium text-gray-900">{formatCurrency(tco.future)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(tco.savings)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-gray-900 mb-3 text-base border-b border-indigo-300 pb-2">Total Savings</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-900 font-semibold">3-Year ROI:</span>
                    <span className="font-bold text-indigo-700 text-base">{roi.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Strategic Analysis */}
          <section className="mb-8 print:mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
              Strategic Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Maturity Score</h3>
                <div className="text-5xl font-bold text-indigo-600 mb-2">
                  {maturityScore.toFixed(0)}%
                </div>
                <p className="text-sm text-gray-600">
                  Overall organizational maturity across 5 key domains
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">VCF 9.0 Readiness</h3>
                <div className={`inline-block px-4 py-2 rounded-full font-semibold ${readinessStatus.bgColor} ${readinessStatus.textColor} mb-2`}>
                  {readinessStatus.label}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Readiness Score: {readiness.readinessScore?.toFixed(0) || 0}%
                </p>
              </div>
            </div>
          </section>
          
          {/* Next Steps */}
          <section className="mb-8 print:mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
              Recommended Next Steps
            </h2>
            <div className="space-y-4">
              {nextSteps.map((stepGroup, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {stepGroup.priority} Priority
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {stepGroup.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          
          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-500 print:mt-8">
            <p>Generated by PCMO Capability Suite</p>
            <p className="mt-1">Confidential Assessment Document</p>
          </div>
        </div>
      </div>
      
      {/* Disclaimer Footer */}
      <div className="print:hidden">
        <DisclaimerFooter />
      </div>
    </>
    </div>
  )
}

export default Proposal

