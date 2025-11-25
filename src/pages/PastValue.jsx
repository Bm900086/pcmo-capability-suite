import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { TrendingUp, DollarSign, Percent, Shield, Info, RotateCcw, Server, HardDrive, Network, Settings, Download, Mail, FileText, HelpCircle } from 'lucide-react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'

const PastValue = () => {
  const { pastValue, updatePastValue } = usePCMO()
  
  // State for all inputs
  const [pastStateSolution, setPastStateSolution] = useState(pastValue.pastStateSolution || 'VVF')
  const [analysisTerm, setAnalysisTerm] = useState(pastValue.analysisTerm || 3)
  const [vmCountPast, setVmCountPast] = useState(pastValue.vmCountPast || 0)
  const [hostCountPast, setHostCountPast] = useState(pastValue.hostCountPast || 0)
  const [avgStoragePerVM, setAvgStoragePerVM] = useState(pastValue.avgStoragePerVM || 0)
  
  // Component Usage - Past vs Current
  const [componentUsage, setComponentUsage] = useState(pastValue.componentUsage || {
    operations: { past: 0, current: 0 },
    automation: { past: 0, current: 0 },
    nsx: { past: 0, current: 0 },
    vsan: { past: 0, current: 0 }
  })
  
  // Advanced Services
  const [advancedServices, setAdvancedServices] = useState(pastValue.advancedServices || {
    aviLoadBalancer: false,
    vdefendFirewall: false,
    dataServicesManager: false,
    vmwareLiveRecovery: false
  })
  
  // Legacy fields (preserved)
  const [laborCost, setLaborCost] = useState(pastValue.laborCost || 0)
  const [efficiencyGain, setEfficiencyGain] = useState(pastValue.efficiencyGain || 0)
  const [costAvoidance, setCostAvoidance] = useState(pastValue.costAvoided || 0)
  
  // Proposal customization
  const [reportType, setReportType] = useState(pastValue.proposalCustomization?.reportType || 'Consolidated Proposal')
  const [additionalEmails, setAdditionalEmails] = useState(pastValue.proposalCustomization?.additionalEmails?.join(', ') || '')
  
  // Tooltip component
  const Tooltip = ({ text, children }) => {
    const [show, setShow] = useState(false)
    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="cursor-help"
        >
          {children}
        </div>
        {show && (
          <div className="absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-900 rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2">
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    )
  }
  
  // Reset all inputs
  const handleReset = () => {
    setPastStateSolution('VVF')
    setAnalysisTerm(3)
    setVmCountPast(0)
    setHostCountPast(0)
    setAvgStoragePerVM(0)
    setComponentUsage({
      operations: { past: 0, current: 0 },
      automation: { past: 0, current: 0 },
      nsx: { past: 0, current: 0 },
      vsan: { past: 0, current: 0 }
    })
    setAdvancedServices({
      aviLoadBalancer: false,
      vdefendFirewall: false,
      dataServicesManager: false,
      vmwareLiveRecovery: false
    })
    setLaborCost(0)
    setEfficiencyGain(0)
    setCostAvoidance(0)
  }
  
  // Calculate savings (preserved logic)
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
  
  // Calculate Past State TCO and ROI
  const calculatePastStateMetrics = () => {
    // Base calculations using normalized VM/Host counts
    const vmCount = parseFloat(vmCountPast) || 0
    const hostCount = parseFloat(hostCountPast) || 0
    const storageGB = parseFloat(avgStoragePerVM) || 0
    
    // Simplified TCO calculation (can be enhanced with actual formulas)
    const computeCost = hostCount * 50000 // Estimated per host
    const storageCost = (vmCount * storageGB * 0.10) / 1000 // $0.10 per GB
    const softwareCost = vmCount * 500 // Estimated per VM
    const laborCostAnnual = parseFloat(laborCost) || 0
    
    const annualTCO = computeCost + storageCost + softwareCost + laborCostAnnual
    const multiYearTCO = annualTCO * analysisTerm
    
    // Realized value calculation
    const efficiencySavings = laborCostAnnual * (efficiencyGain / 100) * analysisTerm
    const productivitySavings = laborCostAnnual * (pastValue.productivityGain / 100) * analysisTerm
    const costAvoidedTotal = parseFloat(costAvoidance) * analysisTerm
    
    const multiYearRealizedValue = efficiencySavings + productivitySavings + costAvoidedTotal
    const pastStateROI = multiYearTCO > 0 ? (multiYearRealizedValue / multiYearTCO) * 100 : 0
    
    return {
      pastStateTCO: annualTCO,
      multiYearRealizedValue,
      pastStateROI,
      benefitTypeBreakdown: {
        efficiency: efficiencySavings,
        productivity: productivitySavings,
        costAvoided: costAvoidedTotal
      }
    }
  }
  
  const savings = calculateSavings()
  const pastMetrics = calculatePastStateMetrics()
  
  // Update context when inputs change
  useEffect(() => {
    const laborCostNum = parseFloat(laborCost) || 0
    const efficiencyGainNum = parseFloat(efficiencyGain) || 0
    const costAvoidanceNum = parseFloat(costAvoidance) || 0
    const productivityGainNum = pastValue.productivityGain || 0
    
    const efficiencySavings = laborCostNum * (efficiencyGainNum / 100)
    const productivitySavings = laborCostNum * (productivityGainNum / 100)
    
    updatePastValue({
      // Legacy fields
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
      ],
      // New fields
      pastStateSolution,
      analysisTerm,
      vmCountPast: parseFloat(vmCountPast) || 0,
      hostCountPast: parseFloat(hostCountPast) || 0,
      avgStoragePerVM: parseFloat(avgStoragePerVM) || 0,
      componentUsage,
      advancedServices,
      // Calculated outputs
      pastStateTCO: pastMetrics.pastStateTCO,
      multiYearRealizedValue: pastMetrics.multiYearRealizedValue,
      pastStateROI: pastMetrics.pastStateROI,
      benefitTypeBreakdown: pastMetrics.benefitTypeBreakdown,
      // Proposal customization
      proposalCustomization: {
        reportType,
        additionalEmails: additionalEmails.split(',').map(e => e.trim()).filter(e => e)
      }
    })
  }, [
    laborCost, efficiencyGain, costAvoidance, pastValue.productivityGain,
    pastStateSolution, analysisTerm, vmCountPast, hostCountPast, avgStoragePerVM,
    componentUsage, advancedServices, reportType, additionalEmails, updatePastValue
  ])
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const handleComponentUsageChange = (component, state, value) => {
    setComponentUsage(prev => ({
      ...prev,
      [component]: {
        ...prev[component],
        [state]: parseFloat(value) || 0
      }
    }))
  }
  
  const handleAdvancedServiceToggle = (service) => {
    setAdvancedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }))
  }
  
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
      {/* Business Guide */}
      <BusinessGuide
        context="Past Value Analysis quantifies the value already realized from your existing VMware/Broadcom infrastructure over the past 3-5 years. This retrospective analysis helps demonstrate ROI from previous investments, validates past strategic decisions, and provides context for future VCF investments. It calculates realized savings from virtualization, automation, and operational efficiency improvements."
        action="Select your past state solution (VVF, VVF w/ vSAN, or VCF), enter historical VM and host counts from your environment, and adjust component adoption percentages (Operations, Automation, NSX, vSAN) to reflect your actual historical usage. Select any advanced services you deployed. Review the savings table to see multi-year realized value and ROI."
        assumptions="Analysis assumes standard cost structures for past state infrastructure based on historical pricing. Typical efficiency gains from virtualization average 35% (VMware ROI Studies). Productivity improvements from automation vary by component (40% for server/network admin - Forrester 2024). Component adoption percentages should reflect actual historical usage patterns. All assumptions can be customized."
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Past Value Analysis</h1>
        <p className="text-gray-600">
          Evaluate the value realized over the past 3–5 years from the customer's existing VMware/Broadcom stack
        </p>
      </div>
      
      {/* A. Assumptions & Reset Controls */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Assumptions & Reset Controls
            </h2>
            <p className="text-sm text-gray-700">
              Use this section to work with your customer to quantify realized value during the past 3–5 years.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="ml-4 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm font-medium text-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* B. Configuration Parameters */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-indigo-600" />
              Configuration Parameters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Past State Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Past State Solution</span>
                    <Tooltip text="Select the solution type that was in place during the analysis period">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <select
                  value={pastStateSolution}
                  onChange={(e) => setPastStateSolution(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="VVF">VVF</option>
                  <option value="VVF w/ vSAN">VVF w/ vSAN</option>
                  <option value="VCF">VCF</option>
                </select>
              </div>
              
              {/* Analysis Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Analysis Term</span>
                    <Tooltip text="Select the number of years to analyze (3, 5, 7, or 10 years)">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <select
                  value={analysisTerm}
                  onChange={(e) => setAnalysisTerm(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={3}>3 Years</option>
                  <option value={5}>5 Years</option>
                  <option value={7}>7 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
              
              {/* VM Count - Past State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-gray-500" />
                    <span>VM Count – Past State</span>
                    <Tooltip text="Number of VMs in the past state environment (linked to worksheet)">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={vmCountPast}
                  onChange={(e) => setVmCountPast(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter VM count"
                  min="0"
                  step="1"
                />
                <p className="mt-1 text-xs text-gray-500">Linked to "Number of VMs – Past State" worksheet</p>
              </div>
              
              {/* Host Count - Past State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-gray-500" />
                    <span>Host Count – Past State</span>
                    <Tooltip text="Number of VM hosts in the past state environment (linked to worksheet)">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={hostCountPast}
                  onChange={(e) => setHostCountPast(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter host count"
                  min="0"
                  step="1"
                />
                <p className="mt-1 text-xs text-gray-500">Linked to "Number of VM Hosts – Past State" worksheet</p>
              </div>
              
              {/* Average Storage per VM */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-gray-500" />
                    <span>Average Allocated/Provisioned Storage per VM (GB)</span>
                    <Tooltip text="Average storage allocated or provisioned per VM in gigabytes">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={avgStoragePerVM}
                  onChange={(e) => setAvgStoragePerVM(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter average storage per VM in GB"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>
          
          {/* C. Component Usage */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2 text-indigo-600" />
              Component Usage
            </h2>
            <p className="text-sm text-gray-600 mb-4">Past vs Current State adoption percentages</p>
            
            {/* Desktop: Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Component</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                      <Tooltip text="Adoption percentage during the past state period">
                        Past State (%)
                      </Tooltip>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                      <Tooltip text="Current adoption percentage">
                        Current State (%)
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'operations', label: 'Operations Coverage' },
                    { key: 'automation', label: 'Automation Coverage' },
                    { key: 'nsx', label: 'NSX Coverage' },
                    { key: 'vsan', label: 'vSAN Coverage' }
                  ].map((comp) => (
                    <tr key={comp.key} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-800 font-medium">{comp.label}</td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          value={componentUsage[comp.key].past}
                          onChange={(e) => handleComponentUsageChange(comp.key, 'past', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center min-h-[44px] text-base"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="ml-2 text-gray-500">%</span>
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          value={componentUsage[comp.key].current}
                          onChange={(e) => handleComponentUsageChange(comp.key, 'current', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center min-h-[44px] text-base"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="ml-2 text-gray-500">%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile: Card View */}
            <div className="md:hidden space-y-4">
              {[
                { key: 'operations', label: 'Operations Coverage' },
                { key: 'automation', label: 'Automation Coverage' },
                { key: 'nsx', label: 'NSX Coverage' },
                { key: 'vsan', label: 'vSAN Coverage' }
              ].map((comp) => (
                <div key={comp.key} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-gray-900 mb-3 text-base border-b border-gray-200 pb-2">
                    {comp.label}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        <Tooltip text="Adoption percentage during the past state period">
                          Past State (%)
                        </Tooltip>
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={componentUsage[comp.key].past}
                          onChange={(e) => handleComponentUsageChange(comp.key, 'past', e.target.value)}
                          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center min-h-[44px] text-base"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="ml-2 text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        <Tooltip text="Current adoption percentage">
                          Current State (%)
                        </Tooltip>
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={componentUsage[comp.key].current}
                          onChange={(e) => handleComponentUsageChange(comp.key, 'current', e.target.value)}
                          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center min-h-[44px] text-base"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="ml-2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Advanced Services */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Advanced Services</h2>
            <p className="text-sm text-gray-600 mb-4">Select advanced services that were utilized</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'aviLoadBalancer', label: 'Avi Load Balancer' },
                { key: 'vdefendFirewall', label: 'vDefend Distributed Firewall' },
                { key: 'dataServicesManager', label: 'Data Services Manager (DSM)' },
                { key: 'vmwareLiveRecovery', label: 'VMware Live Recovery (VLR)' }
              ].map((service) => (
                <label
                  key={service.key}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={advancedServices[service.key]}
                    onChange={() => handleAdvancedServiceToggle(service.key)}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{service.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Legacy Fields (Preserved) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Parameters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  placeholder="Annual labor cost"
                  min="0"
                  step="1000"
                />
              </div>
              
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
                  placeholder="Efficiency gain %"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
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
                  placeholder="Cost avoidance amount"
                  min="0"
                  step="1000"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Summary Cards */}
        <div className="space-y-6">
          {/* Past State TCO */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Past State TCO</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {formatCurrency(pastMetrics.pastStateTCO)}
            </div>
            <div className="text-sm text-indigo-100">Annual Total Cost of Ownership</div>
          </div>
          
          {/* Multi-Year Realized Value */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Multi-Year Realized Value</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {formatCurrency(pastMetrics.multiYearRealizedValue)}
            </div>
            <div className="text-sm text-green-100">Over {analysisTerm} years</div>
          </div>
          
          {/* Past State ROI */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Percent className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Past State ROI</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {pastMetrics.pastStateROI.toFixed(1)}%
            </div>
            <div className="text-sm text-blue-100">Return on Investment</div>
          </div>
          
          {/* Benefit Type Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefit Type Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Efficiency</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(pastMetrics.benefitTypeBreakdown.efficiency)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Productivity</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(pastMetrics.benefitTypeBreakdown.productivity)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost Avoided</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(pastMetrics.benefitTypeBreakdown.costAvoided)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Output Summary Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Value Summary</h2>
        
        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Annual</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">{analysisTerm}-Year Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Past State TCO</td>
                <td className="py-4 px-4 text-right text-gray-900 font-semibold">
                  {formatCurrency(pastMetrics.pastStateTCO)}
                </td>
                <td className="py-4 px-4 text-right text-gray-900 font-semibold">
                  {formatCurrency(pastMetrics.pastStateTCO * analysisTerm)}
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Realized Value</td>
                <td className="py-4 px-4 text-right text-gray-900 font-semibold">
                  {formatCurrency(pastMetrics.multiYearRealizedValue / analysisTerm)}
                </td>
                <td className="py-4 px-4 text-right text-gray-900 font-semibold">
                  {formatCurrency(pastMetrics.multiYearRealizedValue)}
                </td>
              </tr>
              <tr className="bg-indigo-50 font-semibold">
                <td className="py-4 px-4 text-gray-900">Net Value</td>
                <td className="py-4 px-4 text-right text-indigo-600">
                  {formatCurrency((pastMetrics.multiYearRealizedValue / analysisTerm) - pastMetrics.pastStateTCO)}
                </td>
                <td className="py-4 px-4 text-right text-indigo-600">
                  {formatCurrency(pastMetrics.multiYearRealizedValue - (pastMetrics.pastStateTCO * analysisTerm))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Mobile: Card View */}
        <div className="md:hidden space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="font-semibold text-gray-900 mb-3 text-base border-b border-gray-200 pb-2">Past State TCO</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(pastMetrics.pastStateTCO)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-700 font-medium">{analysisTerm}-Year Total:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(pastMetrics.pastStateTCO * analysisTerm)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="font-semibold text-gray-900 mb-3 text-base border-b border-gray-200 pb-2">Realized Value</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(pastMetrics.multiYearRealizedValue / analysisTerm)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-700 font-medium">{analysisTerm}-Year Total:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(pastMetrics.multiYearRealizedValue)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 shadow-sm">
            <div className="font-semibold text-gray-900 mb-3 text-base border-b border-indigo-300 pb-2">Net Value</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Annual:</span>
                <span className="font-semibold text-indigo-600">{formatCurrency((pastMetrics.multiYearRealizedValue / analysisTerm) - pastMetrics.pastStateTCO)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-indigo-300">
                <span className="text-gray-900 font-semibold">{analysisTerm}-Year Total:</span>
                <span className="font-bold text-indigo-600 text-base">{formatCurrency(pastMetrics.multiYearRealizedValue - (pastMetrics.pastStateTCO * analysisTerm))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Proposal Customization Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Customize Your Proposal</h2>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <p className="text-gray-700 mb-6">
            <strong>Congratulations, you're ready to generate your PCMO proposal!</strong> To further personalize and enhance the professionalism of your report, you have the option to add additional email addresses for direct report distribution and upload your customer's logo. This customization ensures your report not only carries critical financial insights but also presents them in a branded, corporate style tailored for your audience.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>Report Type</span>
                </div>
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Consolidated Proposal">Consolidated Proposal</option>
                <option value="Executive Summary">Executive Summary</option>
                <option value="Detailed Analysis">Detailed Analysis</option>
                <option value="Custom Report">Custom Report</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>Additional Email(s) (if applicable)</span>
                </div>
              </label>
              <input
                type="text"
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="email1@example.com, email2@example.com"
              />
              <p className="mt-1 text-xs text-gray-500">Enter comma-separated email addresses</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 font-medium">
            <Download className="w-5 h-5" />
            <span>Generate Proposal</span>
          </button>
        </div>
      </div>
      
      {/* Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  )
}

export default PastValue
