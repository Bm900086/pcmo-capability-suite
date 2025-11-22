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
  // Past Value Analysis State
  const [pastValue, setPastValue] = useState({
    laborCost: 0,
    efficiencyGain: 0,
    productivityGain: 0,
    costAvoided: 0,
    savings: []
  })

  // Value Model (VCF TCO/ROI) State
  const [valueModel, setValueModel] = useState({
    baseline: {
      hardwareCost: 0,
      licensingCost: 0,
      maintenanceCost: 0,
      operationalCost: 0
    },
    vcf: {
      hardwareCost: 0,
      licensingCost: 0,
      maintenanceCost: 0,
      operationalCost: 0
    },
    totalVMs: 0,
    timeframe: 5 // years
  })

  // Competitive TCO State
  const [competitive, setCompetitive] = useState({
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
    // Update functions
    updatePastValue,
    updateValueModel,
    updateCompetitive,
    updateMaturity,
    updateReadiness
  }

  return (
    <PCMOContext.Provider value={value}>
      {children}
    </PCMOContext.Provider>
  )
}

