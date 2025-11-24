import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, Cloud, Server, TrendingDown, Settings, RotateCcw, CheckCircle2, XCircle, HelpCircle, Upload, FileText, Download, Sliders } from 'lucide-react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'

const Competitive = () => {
  const { competitive, updateCompetitive, globalConfig } = usePCMO()
  
  // Current Environment (Legacy)
  const [hostArchitecture, setHostArchitecture] = useState(competitive.hostArchitecture || '3-Tier')
  const [serverGeneration, setServerGeneration] = useState(competitive.serverGeneration || 'Gen3')
  const [cpuConfig, setCpuConfig] = useState(competitive.cpuConfig || 2)
  const [coreTechnology, setCoreTechnology] = useState(competitive.coreTechnology || 'Intel')
  
  // Sizing Metrics - Use globalConfig (shared across all models)
  const totalVMs = globalConfig?.totalVMs || 0
  const totalHosts = globalConfig?.totalHosts || 0
  const [vmsPerHost, setVmsPerHost] = useState(competitive.vmsPerHost || 0)
  
  // Strategic Assumptions (Editable)
  const [assumptions, setAssumptions] = useState(competitive.assumptions || {
    avgDataEgressPercent: { value: 15, defaultValue: 15, unit: '%', isModified: false },
    publicCloudEgressCost: { value: 0.08, defaultValue: 0.08, unit: '$/GB', isModified: false },
    adminHourlyRate: { value: 85.00, defaultValue: 85.00, unit: '$/hr', isModified: false },
    refactoringCostLow: { value: 500, defaultValue: 500, unit: '$/VM', isModified: false },
    refactoringCostHigh: { value: 2500, defaultValue: 2500, unit: '$/VM', isModified: false },
    thirdPartySecuritySurcharge: { value: 15, defaultValue: 15, unit: '%', isModified: false }
  })
  
  // Solution Selection
  const [selectedSolutions, setSelectedSolutions] = useState(competitive.selectedSolutions || ['VCF'])
  const maxCompetitors = 5
  
  // Available Competitors
  const availableCompetitors = {
    private: [
      { id: 'VVF', name: 'VVF', category: 'private', hasFeatureParity: true },
      { id: 'Nutanix', name: 'Nutanix', category: 'private', hasFeatureParity: false },
      { id: 'Red Hat', name: 'Red Hat', category: 'private', hasFeatureParity: false }
    ],
    public: [
      { id: 'AWS Native', name: 'AWS Native', category: 'public', hasEgress: true, hasRefactoring: true },
      { id: 'Azure Native', name: 'Azure Native', category: 'public', hasEgress: true, hasRefactoring: true },
      { id: 'GCP Native', name: 'GCP Native', category: 'public', hasEgress: true, hasRefactoring: true }
    ],
    hybrid: [
      { id: 'AVS', name: 'AVS', category: 'hybrid', hasEgress: false, hasRefactoring: false },
      { id: 'GCVE', name: 'GCVE', category: 'hybrid', hasEgress: false, hasRefactoring: false },
      { id: 'VCF on AWS', name: 'VCF on AWS', category: 'hybrid', hasEgress: false, hasRefactoring: false }
    ]
  }
  
  // Refactoring Complexity (for Public Cloud)
  const [refactoringComplexity, setRefactoringComplexity] = useState({}) // { 'AWS Native': 'Low', ... }
  
  // Interactive Adjustments
  const [adjustments, setAdjustments] = useState(competitive.adjustments || {
    vcf: { consolidationRatio: 3.0, laborProductivity: 100 },
    current: { consolidationRatio: 1.0, laborProductivity: 100 }
  })
  
  // Proposal Customization
  const [preparedFor, setPreparedFor] = useState(competitive.proposal?.preparedFor || '')
  const [customerLogo, setCustomerLogo] = useState(competitive.proposal?.customerLogo || null)
  
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
  
  // Editable Assumption Component
  const EditableAssumption = ({ id, assumption, onUpdate }) => {
    const handleChange = (newValue) => {
      const numValue = parseFloat(newValue) || 0
      const isModified = numValue !== assumption.defaultValue
      onUpdate(id, {
        ...assumption,
        value: numValue,
        isModified: isModified
      })
    }
    
    const handleReset = () => {
      onUpdate(id, {
        ...assumption,
        value: assumption.defaultValue,
        isModified: false
      })
    }
    
    return (
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={assumption.value}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          step={assumption.unit.includes('%') ? '0.1' : assumption.unit.includes('$') ? '0.01' : '1'}
          min="0"
        />
        <span className="text-sm text-gray-500 w-16">{assumption.unit}</span>
        {assumption.isModified && (
          <button
            onClick={handleReset}
            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }
  
  // Update assumption
  const updateAssumption = (id, updatedAssumption) => {
    setAssumptions(prev => ({
      ...prev,
      [id]: updatedAssumption
    }))
  }
  
  // Note: totalVMs and totalHosts are now managed in GlobalConfiguration component
  // Auto-calculation would need to be handled there if needed
  
  // Toggle solution selection
  const toggleSolution = (solutionId) => {
    if (solutionId === 'VCF') {
      // VCF is always selected
      return
    }
    
    setSelectedSolutions(prev => {
      if (prev.includes(solutionId)) {
        // Remove adjustments when deselected
        setAdjustments(prevAdj => {
          const newAdj = { ...prevAdj }
          delete newAdj[solutionId]
          return newAdj
        })
        return prev.filter(id => id !== solutionId)
      } else {
        if (prev.length >= maxCompetitors) {
          alert(`Maximum ${maxCompetitors} competitors allowed`)
          return prev
        }
        // Initialize adjustments when selected
        setAdjustments(prevAdj => ({
          ...prevAdj,
          [solutionId]: {
            consolidationRatio: 3.0,
            laborProductivity: 100
          }
        }))
        return [...prev, solutionId]
      }
    })
  }
  
  // Get solution details
  const getSolutionDetails = (solutionId) => {
    if (solutionId === 'VCF') {
      return { name: 'VMware Cloud Foundation', category: 'baseline', color: '#6366f1' }
    }
    
    for (const category of ['private', 'public', 'hybrid']) {
      const solution = availableCompetitors[category].find(s => s.id === solutionId)
      if (solution) return solution
    }
    return null
  }
  
  // Calculate TCO for a solution
  const calculateSolutionTCO = (solutionId) => {
    if (solutionId === 'VCF') {
      // VCF baseline calculation with adjustments
      const consolidation = adjustments.vcf?.consolidationRatio || 3.0
      const laborProd = (adjustments.vcf?.laborProductivity || 100) / 100
      const effectiveHosts = Math.ceil(totalVMs / consolidation) || totalHosts
      const baseInfrastructure = effectiveHosts * 25000 * (1 + 0.15) // Hardware + 15% support
      const capex = baseInfrastructure
      const opex = (baseInfrastructure * 0.20 * 3) / laborProd // 3-year operational, adjusted for productivity
      const migrationCost = 0 // VCF is baseline
      const riskCost = 0 // VCF has built-in security
      
      return {
        capex,
        opex,
        migrationCost,
        riskCost,
        totalTCO: capex + opex + migrationCost + riskCost
      }
    }
    
    if (solutionId === 'Current') {
      // Current State calculation with adjustments
      const consolidation = adjustments.current?.consolidationRatio || 1.0
      const laborProd = (adjustments.current?.laborProductivity || 100) / 100
      const effectiveHosts = Math.ceil(totalVMs / consolidation) || totalHosts
      const baseInfrastructure = effectiveHosts * 30000 * (1 + 0.20) // Higher cost for legacy
      const capex = baseInfrastructure
      const opex = (baseInfrastructure * 0.25 * 3) / laborProd // 25% annual operational, 3-year, adjusted
      const migrationCost = 0 // Current state has no migration
      const riskCost = baseInfrastructure * 0.10 // 10% risk premium for legacy
      
      return {
        capex,
        opex,
        migrationCost,
        riskCost,
        totalTCO: capex + opex + migrationCost + riskCost
      }
    }
    
    const solution = getSolutionDetails(solutionId)
    if (!solution) return { capex: 0, opex: 0, migrationCost: 0, riskCost: 0, totalTCO: 0 }
    
    // Apply adjustments
    const consolidation = adjustments[solutionId]?.consolidationRatio || 3.0
    const laborProd = (adjustments[solutionId]?.laborProductivity || 100) / 100
    const effectiveHosts = Math.ceil(totalVMs / consolidation) || totalHosts
    
    // Base Infrastructure
    let baseInfrastructure = 0
    if (solution.category === 'public') {
      // Public cloud: instance pricing
      baseInfrastructure = totalVMs * 280 * 36 // $280/month per VM × 36 months
    } else {
      // Private/Hybrid: similar to VCF
      baseInfrastructure = effectiveHosts * 25000 * (1 + 0.15)
    }
    
    // Refactoring Tax (Public Cloud only)
    let refactoringCost = 0
    if (solution.hasRefactoring && refactoringComplexity[solutionId]) {
      const complexity = refactoringComplexity[solutionId]
      const costPerVM = complexity === 'High' 
        ? assumptions.refactoringCostHigh.value 
        : assumptions.refactoringCostLow.value
      refactoringCost = totalVMs * costPerVM
    }
    
    // Egress Tax (Public Cloud only)
    let egressCost = 0
    if (solution.hasEgress) {
      const totalStorageGB = totalVMs * 100 // Estimate 100GB per VM
      egressCost = totalStorageGB * (assumptions.avgDataEgressPercent.value / 100) * assumptions.publicCloudEgressCost.value * 36 // 36 months
    }
    
    // Feature Parity Adjustment (Competitors only)
    let featureParitySurcharge = 0
    if (!solution.hasFeatureParity && solution.category === 'private') {
      featureParitySurcharge = baseInfrastructure * (assumptions.thirdPartySecuritySurcharge.value / 100)
    }
    
    const capex = baseInfrastructure + refactoringCost + featureParitySurcharge
    const opex = ((baseInfrastructure * 0.20 * 3) + egressCost) / laborProd // 3-year operational + egress, adjusted for productivity
    const migrationCost = refactoringCost // Migration cost = refactoring for public cloud
    const riskCost = featureParitySurcharge // Risk cost = security surcharge
    
    return {
      capex,
      opex,
      migrationCost,
      riskCost,
      totalTCO: capex + opex + migrationCost + riskCost,
      breakdown: {
        baseInfrastructure,
        refactoringCost,
        egressCost,
        featureParitySurcharge
      }
    }
  }
  
  // Calculate all TCOs
  const calculateAllTCOs = () => {
    const tcos = {}
    selectedSolutions.forEach(solutionId => {
      tcos[solutionId] = calculateSolutionTCO(solutionId)
    })
    return tcos
  }
  
  const allTCOs = calculateAllTCOs()
  
  // Calculate Current State TCO
  const calculateCurrentStateTCO = () => {
    const baseInfrastructure = totalHosts * 30000 * (1 + 0.20) // Higher cost for legacy
    const capex = baseInfrastructure
    const opex = baseInfrastructure * 0.25 * 3 // 25% annual operational, 3-year
    const migrationCost = 0 // Current state has no migration
    const riskCost = baseInfrastructure * 0.10 // 10% risk premium for legacy
    
    return {
      capex,
      opex,
      migrationCost,
      riskCost,
      totalTCO: capex + opex + migrationCost + riskCost
    }
  }
  
  // Generate comparison grid data
  const generateComparisonGrid = () => {
    const currentTCO = calculateCurrentStateTCO()
    const rows = ['capex', 'opex', 'migrationCost', 'riskCost', 'totalTCO']
    const rowLabels = {
      capex: 'CapEx',
      opex: 'OpEx (3-Year)',
      migrationCost: 'Migration Cost',
      riskCost: 'Risk Cost',
      totalTCO: 'Total TCO'
    }
    
    return rows.map(row => ({
      category: rowLabels[row],
      current: currentTCO[row] || 0,
      vcf: allTCOs['VCF']?.[row] || 0,
      ...selectedSolutions.filter(s => s !== 'VCF').reduce((acc, solutionId) => {
        acc[solutionId] = allTCOs[solutionId]?.[row] || 0
        return acc
      }, {})
    }))
  }
  
  const comparisonGrid = generateComparisonGrid()
  
  // Generate waterfall chart data for public cloud solutions
  const generateWaterfallData = (solutionId) => {
    const tco = allTCOs[solutionId]
    if (!tco || !tco.breakdown) return []
    
    const baseCompute = tco.breakdown.baseInfrastructure
    const storage = baseCompute * 0.3
    const egress = tco.breakdown.egressCost || 0
    const refactoring = tco.breakdown.refactoringCost || 0
    
    return [
      { name: 'Base Compute', value: baseCompute },
      { name: 'Storage', value: storage },
      { name: 'Egress Fees', value: egress },
      { name: 'Refactoring', value: refactoring },
      { name: 'Total', value: tco.totalTCO }
    ]
  }
  
  // Generate proposal text
  const generateProposalText = () => {
    const vcfTCO = allTCOs['VCF']?.totalTCO || 0
    const publicCloudSolutions = selectedSolutions.filter(s => {
      const solution = getSolutionDetails(s)
      return solution?.category === 'public'
    })
    
    let text = []
    
    publicCloudSolutions.forEach(solutionId => {
      const solutionTCO = allTCOs[solutionId]?.totalTCO || 0
      const solution = getSolutionDetails(solutionId)
      const savings = solutionTCO - vcfTCO
      const savingsPercent = vcfTCO > 0 ? ((savings / solutionTCO) * 100) : 0
      
      if (savingsPercent > 0) {
        text.push(`While ${solution.name} Base Compute appears competitive, adding Egress and Refactoring costs results in a ${savingsPercent.toFixed(1)}% higher TCO than VCF.`)
      } else {
        text.push(`${solution.name} shows ${Math.abs(savingsPercent).toFixed(1)}% cost advantage, but requires significant refactoring and egress cost considerations.`)
      }
    })
    
    return text.length > 0 ? text : ['VCF provides the most cost-effective solution with built-in security and operational efficiency.']
  }
  
  const proposalText = generateProposalText()
  
  // Update context
  useEffect(() => {
    updateCompetitive({
      hostArchitecture,
      serverGeneration,
      cpuConfig,
      coreTechnology,
      // Note: totalVMs and totalHosts are now in globalConfig, not stored in competitive
      vmsPerHost: parseFloat(vmsPerHost) || 0,
      assumptions,
      selectedSolutions,
      adjustments,
      tcoCalculations: allTCOs,
      proposal: {
        preparedFor,
        customerLogo,
        generatedText: proposalText.join(' ')
      },
      // Legacy fields
      vcf: {
        totalCost: allTCOs['VCF']?.totalTCO || 0,
        cpuRatio: 1.0,
        vcpuRatio: 1.0
      },
      competitor: {
        totalCost: selectedSolutions.length > 1 ? allTCOs[selectedSolutions[1]]?.totalTCO || 0 : 0,
        cpuRatio: 1.0,
        vcpuRatio: 1.0
      },
      comparisonData: selectedSolutions.map(solutionId => ({
        name: getSolutionDetails(solutionId)?.name || solutionId,
        cost: allTCOs[solutionId]?.totalTCO || 0,
        color: getSolutionDetails(solutionId)?.color || '#6366f1'
      }))
    })
  }, [
    hostArchitecture, serverGeneration, cpuConfig, coreTechnology,
    vmsPerHost,
    assumptions, selectedSolutions, adjustments, refactoringComplexity,
    preparedFor, customerLogo, updateCompetitive
  ])
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  // Reset all assumptions
  const resetAllAssumptions = () => {
    const resetAssumptions = {}
    Object.keys(assumptions).forEach(key => {
      resetAssumptions[key] = {
        ...assumptions[key],
        value: assumptions[key].defaultValue,
        isModified: false
      }
    })
    setAssumptions(resetAssumptions)
  }
  
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
      {/* Business Guide */}
      <BusinessGuide
        context="The Competitive TCO & Proposal Engine provides a comprehensive comparison of VCF against public cloud providers (AWS, Azure, GCP) and market competitors (Nutanix, Red Hat, VVF). It calculates true total cost of ownership including hidden costs like egress fees, refactoring expenses, and feature parity adjustments that are often overlooked in initial cloud cost comparisons."
        action="Select up to 5 competitors to compare against VCF. For public cloud options, choose refactoring complexity (None, Low, High) to account for application migration costs. Use the interactive sliders to adjust consolidation ratios and labor productivity, then review the waterfall charts to understand how hidden costs stack up. Fields highlighted in yellow show modified assumptions - use Reset buttons to restore defaults."
        assumptions="Baseline assumptions include: $280/month per VM for public cloud (Gartner 2024 average), 15% data egress rate (typical enterprise cloud usage), $500-$2,500 refactoring costs per VM (VMware Migration Best Practices), 15% security surcharge for competitors lacking native features (Gartner Security Analysis). All assumptions are editable with citations available via info icons."
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Competitive TCO & Proposal Engine</h1>
        <p className="text-gray-600">
          Compare VCF against Public Cloud and Market Competitors with defensible, high-fidelity TCO analysis
        </p>
      </div>
      
      {/* Section 1: Competitive Configuration */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-indigo-600" />
          Section 1: Competitive Configuration
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Current Environment (Legacy) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Environment (Legacy)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host Architecture
                </label>
                <select
                  value={hostArchitecture}
                  onChange={(e) => setHostArchitecture(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="3-Tier">3-Tier</option>
                  <option value="HCI">HCI</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Server Generation
                </label>
                <select
                  value={serverGeneration}
                  onChange={(e) => setServerGeneration(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Gen2">Gen2</option>
                  <option value="Gen3">Gen3</option>
                  <option value="Gen4">Gen4</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPU Config
                </label>
                <select
                  value={cpuConfig}
                  onChange={(e) => setCpuConfig(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Core Technology
                </label>
                <select
                  value={coreTechnology}
                  onChange={(e) => setCoreTechnology(e.target.value)}
                  className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-sm touch-manipulation min-h-[44px] md:min-h-0"
                >
                  <option value="Intel">Intel</option>
                  <option value="AMD">AMD</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Column 2: Sizing Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Sizing Metrics</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-gray-500" />
                    <span>Total VMs</span>
                    <Tooltip text="Total number of virtual machines">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={totalVMs}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  placeholder="Set in Global Configuration above"
                />
                <p className="mt-1 text-xs text-gray-500">Configured in Global Configuration bar</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-gray-500" />
                    <span>Total Hosts</span>
                    <Tooltip text="Total number of physical hosts (auto-calculated if VMs and VMs/Host provided)">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={totalHosts}
                  disabled
                  className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed text-base md:text-sm min-h-[44px] md:min-h-0"
                  placeholder="Set in Global Configuration above"
                />
                <p className="mt-1 text-xs text-gray-500">Configured in Global Configuration bar</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>VMs/Host</span>
                    <Tooltip text="Virtual machines per host ratio">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={vmsPerHost}
                  onChange={(e) => setVmsPerHost(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter VMs per host"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
          
          {/* Column 3: Strategic Assumptions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-700">Strategic Assumptions</h3>
              <button
                onClick={resetAllAssumptions}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">The "Reality Check" - Editable with reset to defaults</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Avg. Data Egress %
                </label>
                <EditableAssumption
                  id="avgDataEgressPercent"
                  assumption={assumptions.avgDataEgressPercent}
                  onUpdate={updateAssumption}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Public Cloud Egress Cost
                </label>
                <EditableAssumption
                  id="publicCloudEgressCost"
                  assumption={assumptions.publicCloudEgressCost}
                  onUpdate={updateAssumption}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Admin Hourly Rate
                </label>
                <EditableAssumption
                  id="adminHourlyRate"
                  assumption={assumptions.adminHourlyRate}
                  onUpdate={updateAssumption}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Refactoring Cost (Low)
                </label>
                <EditableAssumption
                  id="refactoringCostLow"
                  assumption={assumptions.refactoringCostLow}
                  onUpdate={updateAssumption}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Refactoring Cost (High)
                </label>
                <EditableAssumption
                  id="refactoringCostHigh"
                  assumption={assumptions.refactoringCostHigh}
                  onUpdate={updateAssumption}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  3rd Party Security Surcharge %
                </label>
                <EditableAssumption
                  id="thirdPartySecuritySurcharge"
                  assumption={assumptions.thirdPartySecuritySurcharge}
                  onUpdate={updateAssumption}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 2: Solution Selection */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 2: Solution Selection (The Marketplace)</h2>
        <p className="text-sm text-gray-600 mb-4">Select up to {maxCompetitors} competitors to compare against VCF (VCF is always selected as baseline)</p>
        
        {/* VCF Anchor (Always Selected) */}
        <div className="mb-6">
          <div className="p-4 bg-indigo-50 border-2 border-indigo-500 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">VMware Cloud Foundation</h3>
                  <p className="text-sm text-gray-600">Baseline (Always Selected)</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">Baseline</span>
            </div>
          </div>
        </div>
        
        {/* Competitors */}
        <div className="space-y-6">
          {/* Private */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-3">Private Cloud</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableCompetitors.private.map(competitor => (
                <div
                  key={competitor.id}
                  onClick={() => toggleSolution(competitor.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedSolutions.includes(competitor.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {selectedSolutions.includes(competitor.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className="font-medium text-gray-800">{competitor.name}</span>
                    </div>
                    {!competitor.hasFeatureParity && (
                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Feature Parity Surcharge</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Public */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-3">Public Cloud</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableCompetitors.public.map(competitor => (
                <div key={competitor.id}>
                  <div
                    onClick={() => toggleSolution(competitor.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSolutions.includes(competitor.id)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {selectedSolutions.includes(competitor.id) ? (
                          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <span className="font-medium text-gray-800">{competitor.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Egress</span>
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">Refactoring</span>
                    </div>
                  </div>
                  
                  {selectedSolutions.includes(competitor.id) && (
                    <div className="mt-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Refactoring Complexity
                      </label>
                      <select
                        value={refactoringComplexity[competitor.id] || 'Low'}
                        onChange={(e) => setRefactoringComplexity(prev => ({
                          ...prev,
                          [competitor.id]: e.target.value
                        }))}
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="None">None</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Hybrid */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-3">Hybrid Cloud</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableCompetitors.hybrid.map(competitor => (
                <div
                  key={competitor.id}
                  onClick={() => toggleSolution(competitor.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedSolutions.includes(competitor.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {selectedSolutions.includes(competitor.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className="font-medium text-gray-800">{competitor.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 3: TCO Engine & Comparison Grid */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 3: TCO Engine & Comparison Grid</h2>
        
        {/* Interactive Adjustments */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-indigo-600" />
            Interactive Adjustments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedSolutions.map(solutionId => {
              const solution = getSolutionDetails(solutionId)
              if (!solution) return null
              
              return (
                <div key={solutionId} className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-800 mb-3">{solution.name}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Host Consolidation Ratio
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={adjustments[solutionId]?.consolidationRatio || 3.0}
                        onChange={(e) => setAdjustments(prev => ({
                          ...prev,
                          [solutionId]: {
                            ...prev[solutionId],
                            consolidationRatio: parseFloat(e.target.value)
                          }
                        }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1.0</span>
                        <span className="font-semibold">{adjustments[solutionId]?.consolidationRatio || 3.0}</span>
                        <span>5.0</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Labor Productivity %
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        step="5"
                        value={adjustments[solutionId]?.laborProductivity || 100}
                        onChange={(e) => setAdjustments(prev => ({
                          ...prev,
                          [solutionId]: {
                            ...prev[solutionId],
                            laborProductivity: parseFloat(e.target.value)
                          }
                        }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>50%</span>
                        <span className="font-semibold">{adjustments[solutionId]?.laborProductivity || 100}%</span>
                        <span>150%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Comparison Grid */}
        <div className="mb-6">
          {/* Desktop: Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 bg-gray-50">Current State</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 bg-indigo-50">VCF</th>
                  {selectedSolutions.filter(s => s !== 'VCF').map(solutionId => {
                    const solution = getSolutionDetails(solutionId)
                    return (
                      <th key={solutionId} className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                        {solution?.name || solutionId}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonGrid.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-800 font-medium">{row.category}</td>
                    <td className="py-4 px-4 text-right text-gray-900 bg-gray-50">{formatCurrency(row.current)}</td>
                    <td className="py-4 px-4 text-right text-indigo-600 font-semibold bg-indigo-50">{formatCurrency(row.vcf)}</td>
                    {selectedSolutions.filter(s => s !== 'VCF').map(solutionId => (
                      <td key={solutionId} className="py-4 px-4 text-right text-gray-900">
                        {formatCurrency(row[solutionId] || 0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile: Card View */}
          <div className="md:hidden space-y-4">
            {comparisonGrid.map((row, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-gray-900 mb-3 text-base border-b border-gray-200 pb-2">
                  {row.category}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Current State:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(row.current)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-indigo-50 p-2 rounded">
                    <span className="text-gray-700 font-medium">VCF:</span>
                    <span className="font-semibold text-indigo-600">{formatCurrency(row.vcf)}</span>
                  </div>
                  {selectedSolutions.filter(s => s !== 'VCF').map(solutionId => {
                    const solution = getSolutionDetails(solutionId)
                    return (
                      <div key={solutionId} className="flex justify-between items-center p-2 rounded border border-gray-100">
                        <span className="text-gray-600">{solution?.name || solutionId}:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(row[solutionId] || 0)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* TCO Comparison Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">3-Year TCO Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={[
              { name: 'Current State', value: calculateCurrentStateTCO().totalTCO, color: '#9ca3af' },
              ...selectedSolutions.map(solutionId => ({
                name: getSolutionDetails(solutionId)?.name || solutionId,
                value: allTCOs[solutionId]?.totalTCO || 0,
                color: getSolutionDetails(solutionId)?.color || '#6366f1'
              }))
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {[
                  { name: 'Current State', color: '#9ca3af' },
                  ...selectedSolutions.map(solutionId => ({
                    name: getSolutionDetails(solutionId)?.name || solutionId,
                    color: getSolutionDetails(solutionId)?.color || '#6366f1'
                  }))
                ].map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Waterfall Charts for Public Cloud */}
        {selectedSolutions.filter(s => {
          const solution = getSolutionDetails(s)
          return solution?.category === 'public'
        }).map(solutionId => {
          const waterfallData = generateWaterfallData(solutionId)
          if (waterfallData.length === 0) return null
          
          return (
            <div key={solutionId} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {getSolutionDetails(solutionId)?.name} - Cost Breakdown (Waterfall)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={waterfallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>
      
      {/* Section 4: Proposal Generator */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-purple-600" />
          Section 4: Proposal Generator
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Dynamic Text Summary</h3>
          <div className="space-y-2">
            {proposalText.map((text, idx) => (
              <p key={idx} className="text-gray-700 flex items-start">
                <span className="mr-2 text-indigo-600">•</span>
                {text}
              </p>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prepared For (Name/Email)
              </label>
              <input
                type="text"
                value={preparedFor}
                onChange={(e) => setPreparedFor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name or email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Logo
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setCustomerLogo(reader.result)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {customerLogo && (
                  <img src={customerLogo} alt="Customer Logo" className="h-10 object-contain" />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 font-medium">
            <Download className="w-5 h-5" />
            <span>Generate PDF Report</span>
          </button>
        </div>
      </div>
      
      {/* Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  )
}

export default Competitive
