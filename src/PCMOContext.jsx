import { createContext, useContext, useState } from 'react'

const PCMOContext = createContext()

export const usePCMO = () => {
  const context = useContext(PCMOContext)
  if (!context) {
    throw new Error('usePCMO must be used within a PCMOProvider')
  }
  return context
}

export const PCMOProvider = ({ children }) => {
  // Global Configuration State (Shared across all models)
  const [globalConfig, setGlobalConfig] = useState({
    selectedCustomer: null,
    analysisTerm: 5,
    totalVMs: 0,
    totalHosts: 0
  })
  
  // Customer Analysis History (Stores previous analysis values per customer)
  const [customerAnalysisHistory, setCustomerAnalysisHistory] = useState({})
  
  // Update Global Configuration
  const updateGlobalConfig = (updates) => {
    setGlobalConfig(prev => ({ ...prev, ...updates }))
  }
  
  // Update Customer Analysis History
  const updateCustomerAnalysisHistory = (erpAccountNumber, history) => {
    setCustomerAnalysisHistory(prev => ({
      ...prev,
      [erpAccountNumber]: history
    }))
  }
  
  // Past Value Analysis State
  const [pastValue, setPastValue] = useState({
    // Legacy fields (preserved for backward compatibility)
    laborCost: 0,
    efficiencyGain: 0,
    productivityGain: 0,
    costAvoided: 0,
    savings: [],
    // New fields
    pastStateSolution: 'VVF', // VVF, VVF w/ vSAN, VCF
    analysisTerm: 5, // 3, 5, 7, or 10 years
    vmCountPast: 0,
    hostCountPast: 0,
    avgStoragePerVM: 0, // GB
    componentUsage: {
      operations: { past: 0, current: 0 },
      automation: { past: 0, current: 0 },
      nsx: { past: 0, current: 0 },
      vsan: { past: 0, current: 0 }
    },
    advancedServices: {
      aviLoadBalancer: false,
      vdefendFirewall: false,
      dataServicesManager: false,
      vmwareLiveRecovery: false
    },
    // Calculated outputs
    pastStateTCO: 0,
    multiYearRealizedValue: 0,
    pastStateROI: 0,
    benefitTypeBreakdown: {},
    // Proposal customization
    proposalCustomization: {
      reportType: 'Consolidated Proposal',
      additionalEmails: []
    }
  })

  // Value Model (VCF TCO/ROI) State - Strategic Business Value Model
  const [valueModel, setValueModel] = useState({
    // Configuration
    customerName: 'HCLTech', // Dynamic customer name
    customerErpAccount: null, // ERP Account Number for selected customer
    selectedCustomer: null, // Full customer object for details card
    analysisTerm: 5, // 3, 5, 7, or 10 years (default: 5)
    totalVMs: 0,
    totalHosts: 0,
    
    // ESG Parameters
    pue: 1.5, // Power Usage Effectiveness
    gridCarbonIntensity: 0.385, // kg/kWh
    
    // Cloud Economics
    avgPublicCloudCostPerMonth: 280, // $ per instance/month
    
    // Migration
    parallelRunPeriod: 6, // months
    
    // Compute & Licensing
    avgCostPerHost: 25000, // $ per host
    supportPercentage: 15, // %
    consolidationRatio: 3.0, // VMs per host consolidation
    
    // Storage
    currentStorageCostPerGB: 0.10, // $ per GB
    totalStorageGB: 0,
    
    // Network
    physicalFirewallCount: 0,
    loadBalancerCount: 0,
    networkHardwareCostPerUnit: 87000, // $
    
    // Operational Efficiency
    ftes: 0,
    burdenedCostPerFTE: 0,
    productivityGainServerAdmin: 40, // %
    productivityGainNetworkAdmin: 40, // %
    productivityGainDBAdmin: 0, // % (via DSM)
    
    // Risk Mitigation
    annualRevenue: 0,
    marginPercentage: 0,
    downtimeReduction: 70, // %
    breachProbability: 33, // %
    avgBreachCost: 9360000, // $9.36M
    riskReduction: 35, // %
    
    // Power consumption (Watts per host)
    currentHostWatts: 500,
    vcfHostWatts: 400,
    
    // Legacy fields (preserved for backward compatibility)
    baseline: {
      hardwareCost: 0,
      licensingCost: 0,
      maintenanceCost: 0,
      operationalCost: 0,
      laborCost: 0,
      facilitiesCost: 0,
      storageCost: 0,
      networkCost: 0,
      drCost: 0
    },
    vcf: {
      hardwareCost: 0,
      licensingCost: 0,
      maintenanceCost: 0,
      operationalCost: 0,
      laborCost: 0,
      facilitiesCost: 0,
      storageCost: 0,
      networkCost: 0,
      drCost: 0
    },
    timeframe: 3,
    currentStateSolution: 'VVF',
    migrationCost: 0,
    riskMitigation: 0,
    vmCountCurrent: 0,
    vmCountVCF: 0,
    hostCountCurrent: 0,
    hostCountVCF: 0,
    avgStoragePerVM: 0,
    componentUsage: {
      operations: { current: 0, vcf: 0 },
      automation: { current: 0, vcf: 0 },
      nsx: { current: 0, vcf: 0 },
      vsan: { current: 0, vcf: 0 }
    },
    advancedServices: {
      aviLoadBalancer: false,
      vdefendFirewall: false,
      dataServicesManager: false,
      vmwareLiveRecovery: false
    },
    
    // Calculated outputs
    valueReport: {
      financials: {
        npv3Year: 0,
        roi: 0,
        paybackPeriodMonths: 0
      },
      tcoBreakdown: {
        currentState: 0,
        futureState: 0,
        publicCloud: 0
      },
      esgImpact: {
        kwhSaved: 0,
        co2eReduced: 0,
        treesEquivalent: 0
      },
      cashflow: {
        year1: 0,
        year2: 0,
        year3: 0
      }
    }
  })

  // Competitive TCO State - Strategic Competitive TCO & Proposal Engine
  const [competitive, setCompetitive] = useState({
    // Current Environment (Legacy)
    hostArchitecture: '3-Tier', // 3-Tier, HCI
    serverGeneration: 'Gen3', // Gen2, Gen3, Gen4
    cpuConfig: 2, // 2, 4
    coreTechnology: 'Intel', // Intel, AMD
    
    // Sizing Metrics
    totalVMs: 0,
    totalHosts: 0,
    vmsPerHost: 0,
    
    // Strategic Assumptions (Editable)
    assumptions: {
      avgDataEgressPercent: { value: 15, defaultValue: 15, unit: '%', isModified: false },
      publicCloudEgressCost: { value: 0.08, defaultValue: 0.08, unit: '$/GB', isModified: false },
      adminHourlyRate: { value: 85.00, defaultValue: 85.00, unit: '$/hr', isModified: false },
      refactoringCostLow: { value: 500, defaultValue: 500, unit: '$/VM', isModified: false },
      refactoringCostHigh: { value: 2500, defaultValue: 2500, unit: '$/VM', isModified: false },
      thirdPartySecuritySurcharge: { value: 15, defaultValue: 15, unit: '%', isModified: false }
    },
    
    // Solution Selection
    selectedSolutions: ['VCF'], // VCF is always selected (baseline)
    maxCompetitors: 5,
    
    // Available Competitors
    availableCompetitors: {
      private: ['VVF', 'Nutanix', 'Red Hat'],
      public: ['AWS Native', 'Azure Native', 'GCP Native'],
      hybrid: ['AVS', 'GCVE', 'VCF on AWS']
    },
    
    // TCO Calculations per Solution
    tcoCalculations: {},
    
    // Interactive Adjustments
    adjustments: {
      vcf: { consolidationRatio: 3.0, laborProductivity: 100 },
      current: { consolidationRatio: 1.0, laborProductivity: 100 }
    },
    
    // Proposal Customization
    proposal: {
      preparedFor: '',
      customerLogo: null,
      generatedText: ''
    },
    
    // Legacy fields (preserved for backward compatibility)
    vcf: {
      cpuRatio: 1.0,
      vcpuRatio: 1.0,
      totalCost: 0
    },
    competitor: {
      cpuRatio: 1.0,
      vcpuRatio: 1.0,
      totalCost: 0
    },
    comparisonData: []
  })

  // Maturity Assessment State
  const [maturity, setMaturity] = useState({
    scores: {
      governance: 0,
      operations: 0,
      automation: 0,
      security: 0,
      optimization: 0
    },
    industryBenchmark: {
      governance: 75,
      operations: 70,
      automation: 65,
      security: 80,
      optimization: 70
    },
    totalScore: 0
  })

  // VCF 9.0 Readiness State
  const [readiness, setReadiness] = useState({
    hardware: {
      cpuCompatible: false,
      memoryCompatible: false,
      storageCompatible: false,
      networkCompatible: false
    },
    software: {
      esxiVersion: '',
      vcenterVersion: '',
      nsxVersion: '',
      vrealizeVersion: ''
    },
    gaps: [],
    readinessScore: 0,
    riskMatrix: {
      critical: [],
      high: [],
      medium: [],
      low: []
    }
  })

  const updatePastValue = (data) => {
    setPastValue(prev => ({ ...prev, ...data }))
  }

  const updateValueModel = (data) => {
    setValueModel(prev => ({ ...prev, ...data }))
  }

  const updateCompetitive = (data) => {
    setCompetitive(prev => ({ ...prev, ...data }))
  }

  const updateMaturity = (data) => {
    setMaturity(prev => ({ ...prev, ...data }))
  }

  const updateReadiness = (data) => {
    setReadiness(prev => ({ ...prev, ...data }))
  }

  const value = {
    // State
    pastValue,
    valueModel,
    competitive,
    maturity,
    readiness,
    globalConfig,
    customerAnalysisHistory,
    // Update functions
    updatePastValue,
    updateValueModel,
    updateCompetitive,
    updateMaturity,
    updateReadiness,
    updateGlobalConfig,
    updateCustomerAnalysisHistory
  }

  return (
    <PCMOContext.Provider value={value}>
      {children}
    </PCMOContext.Provider>
  )
}

