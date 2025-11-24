import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Calculator, Server, Code, Zap, TrendingDown, Info, RotateCcw, Network, Settings, HelpCircle, HardDrive, Shield, Database, Activity, Cloud, Leaf, DollarSign, Percent, AlertTriangle } from 'lucide-react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'
import SmartInput from '../components/SmartInput'
import SmartSelect from '../components/SmartSelect'
import { citations } from '../data/citations'

const ValueModel = () => {
  const { valueModel, updateValueModel, globalConfig } = usePCMO()
  
  // Get values from global config (shared across all models)
  const analysisTerm = globalConfig?.analysisTerm || 3
  const totalVMs = globalConfig?.totalVMs || 0
  const totalHosts = globalConfig?.totalHosts || 0
  const selectedCustomer = globalConfig?.selectedCustomer
  const customerName = selectedCustomer?.customerName || 'HCLTech'
  
  // Note: Customer selection, analysisTerm, totalVMs, and totalHosts are now managed in GlobalConfiguration component
  
  // ESG Parameters
  const [pue, setPue] = useState(valueModel.pue || 1.5)
  const [gridCarbonIntensity, setGridCarbonIntensity] = useState(valueModel.gridCarbonIntensity || 0.385)
  
  // Cloud Economics
  const [avgPublicCloudCostPerMonth, setAvgPublicCloudCostPerMonth] = useState(valueModel.avgPublicCloudCostPerMonth || 280)
  
  // Migration
  const [parallelRunPeriod, setParallelRunPeriod] = useState(valueModel.parallelRunPeriod || 6)
  
  // Compute & Licensing
  const [avgCostPerHost, setAvgCostPerHost] = useState(valueModel.avgCostPerHost || 25000)
  const [supportPercentage, setSupportPercentage] = useState(valueModel.supportPercentage || 15)
  const [consolidationRatio, setConsolidationRatio] = useState(valueModel.consolidationRatio || 3.0)
  
  // Storage
  const [currentStorageCostPerGB, setCurrentStorageCostPerGB] = useState(valueModel.currentStorageCostPerGB || 0.10)
  const [totalStorageGB, setTotalStorageGB] = useState(valueModel.totalStorageGB || 0)
  
  // Network
  const [physicalFirewallCount, setPhysicalFirewallCount] = useState(valueModel.physicalFirewallCount || 0)
  const [loadBalancerCount, setLoadBalancerCount] = useState(valueModel.loadBalancerCount || 0)
  const networkHardwareCostPerUnit = 87000
  
  // Operational Efficiency
  const [ftes, setFtes] = useState(valueModel.ftes || 0)
  const [burdenedCostPerFTE, setBurdenedCostPerFTE] = useState(valueModel.burdenedCostPerFTE || 0)
  const [productivityGainServerAdmin, setProductivityGainServerAdmin] = useState(valueModel.productivityGainServerAdmin || 40)
  const [productivityGainNetworkAdmin, setProductivityGainNetworkAdmin] = useState(valueModel.productivityGainNetworkAdmin || 40)
  const [productivityGainDBAdmin, setProductivityGainDBAdmin] = useState(valueModel.productivityGainDBAdmin || 0)
  
  // Risk Mitigation
  const [annualRevenue, setAnnualRevenue] = useState(valueModel.annualRevenue || 0)
  const [marginPercentage, setMarginPercentage] = useState(valueModel.marginPercentage || 0)
  const downtimeReduction = 70 // %
  const breachProbability = 33 // %
  const avgBreachCost = 9360000 // $9.36M
  const riskReduction = 35 // %
  
  // Power consumption
  const [currentHostWatts, setCurrentHostWatts] = useState(valueModel.currentHostWatts || 500)
  const [vcfHostWatts, setVcfHostWatts] = useState(valueModel.vcfHostWatts || 400)
  
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
  
  // A. Compute & Licensing (Modernization)
  const calculateComputeAndLicensing = () => {
    const currentHosts = totalHosts
    const currentStateCost = (currentHosts * avgCostPerHost) * (1 + supportPercentage / 100)
    
    // Calculate required vSAN Nodes based on consolidation
    const vcfHosts = Math.ceil(totalVMs / consolidationRatio)
    const vcfHardwareCost = vcfHosts * avgCostPerHost
    const vcfSubscriptionCost = vcfHardwareCost * 0.25 // Estimate 25% for VCF subscription
    const vcfFutureStateCost = vcfHardwareCost + vcfSubscriptionCost
    
    // Parallel Run Logic
    const parallelRunMonths = parallelRunPeriod
    const monthsPerYear = 12
    const totalMonths = analysisTerm * monthsPerYear
    
    let totalCurrentStateCost = 0
    let totalVcfCost = 0
    
    for (let month = 1; month <= totalMonths; month++) {
      if (month <= parallelRunMonths) {
        // Double bubble: 100% current + 100% VCF
        totalCurrentStateCost += currentStateCost / monthsPerYear
        totalVcfCost += vcfFutureStateCost / monthsPerYear
      } else {
        // Ramp down current state (linear ramp over 6 months after parallel run)
        const rampDownMonths = 6
        const monthsAfterParallel = month - parallelRunMonths
        const currentStatePercentage = Math.max(0, 1 - (monthsAfterParallel / rampDownMonths))
        totalCurrentStateCost += (currentStateCost / monthsPerYear) * currentStatePercentage
        totalVcfCost += vcfFutureStateCost / monthsPerYear
      }
    }
    
    return {
      currentStateAnnual: currentStateCost,
      vcfFutureStateAnnual: vcfFutureStateCost,
      currentStateTotal: totalCurrentStateCost,
      vcfTotal: totalVcfCost,
      vcfHosts: vcfHosts
    }
  }
  
  // B. Storage (HCI vs SAN)
  const calculateStorage = () => {
    const currentStorageCost = (totalStorageGB * currentStorageCostPerGB) + (totalStorageGB * currentStorageCostPerGB * 0.15) // +15% maintenance
    const vcfStorageCost = 0 // $0 CapEx (included in vSAN/Compute nodes), only support
    const vcfStorageSupport = (totalStorageGB * 0.05) // Estimate 5% for support
    
    return {
      currentStateAnnual: currentStorageCost,
      vcfFutureStateAnnual: vcfStorageSupport,
      currentStateTotal: currentStorageCost * analysisTerm,
      vcfTotal: vcfStorageSupport * analysisTerm
    }
  }
  
  // C. Network (Hardware Elimination)
  const calculateNetwork = () => {
    const currentNetworkCost = (physicalFirewallCount + loadBalancerCount) * networkHardwareCostPerUnit
    const vcfNetworkCost = 0 // 100% retirement of HW Load Balancers (replaced by Avi/NSX)
    
    return {
      currentStateAnnual: currentNetworkCost,
      vcfFutureStateAnnual: vcfNetworkCost,
      currentStateTotal: currentNetworkCost * analysisTerm,
      vcfTotal: vcfNetworkCost * analysisTerm
    }
  }
  
  // D. Sustainability & ESG
  const calculateESG = () => {
    const currentHosts = totalHosts
    const vcfHosts = Math.ceil(totalVMs / consolidationRatio)
    
    // Calculate kWh Savings
    const currentKwhPerYear = (currentHosts * currentHostWatts * 24 * 365) / 1000 * pue
    const vcfKwhPerYear = (vcfHosts * vcfHostWatts * 24 * 365) / 1000 * pue
    const kwhSaved = currentKwhPerYear - vcfKwhPerYear
    const totalKwhSaved = kwhSaved * analysisTerm
    
    // Calculate Carbon Avoided
    const carbonAvoidedPerYear = kwhSaved * gridCarbonIntensity / 1000 // Convert to metric tons
    const totalCo2eReduced = carbonAvoidedPerYear * analysisTerm
    
    // Trees Equivalent (0.06 trees per kg CO2)
    const treesEquivalent = totalCo2eReduced * 1000 * 0.06
    
    return {
      kwhSaved: totalKwhSaved,
      co2eReduced: totalCo2eReduced,
      treesEquivalent: treesEquivalent
    }
  }
  
  // F. Operational Efficiency (Labor)
  const calculateOperationalEfficiency = () => {
    const totalLaborCost = ftes * burdenedCostPerFTE
    const serverAdminSavings = totalLaborCost * 0.4 * (productivityGainServerAdmin / 100)
    const networkAdminSavings = totalLaborCost * 0.3 * (productivityGainNetworkAdmin / 100)
    const dbAdminSavings = productivityGainDBAdmin > 0 ? totalLaborCost * 0.3 * (productivityGainDBAdmin / 100) : 0
    
    const totalLaborSavings = (serverAdminSavings + networkAdminSavings + dbAdminSavings) * analysisTerm
    
    return {
      annualSavings: serverAdminSavings + networkAdminSavings + dbAdminSavings,
      totalSavings: totalLaborSavings,
      breakdown: {
        serverAdmin: serverAdminSavings,
        networkAdmin: networkAdminSavings,
        dbAdmin: dbAdminSavings
      }
    }
  }
  
  // G. Risk Mitigation (Revenue Protection)
  const calculateRiskMitigation = () => {
    // Downtime Cost
    const downtimeCost = annualRevenue * (marginPercentage / 100) * (downtimeReduction / 100)
    
    // Security Breach
    const breachCost = breachProbability / 100 * avgBreachCost * (riskReduction / 100)
    
    const totalRiskMitigation = (downtimeCost + breachCost) * analysisTerm
    
    return {
      downtimeProtection: downtimeCost,
      securityProtection: breachCost,
      totalRiskMitigation: totalRiskMitigation
    }
  }
  
  // Calculate VCF Total TCO
  const calculateVCFTotalTCO = () => {
    const compute = calculateComputeAndLicensing()
    const storage = calculateStorage()
    const network = calculateNetwork()
    const labor = calculateOperationalEfficiency()
    
    return compute.vcfTotal + storage.vcfTotal + network.vcfTotal - labor.totalSavings
  }
  
  // Calculate Current State Total TCO
  const calculateCurrentStateTotalTCO = () => {
    const compute = calculateComputeAndLicensing()
    const storage = calculateStorage()
    const network = calculateNetwork()
    
    return compute.currentStateTotal + storage.currentStateTotal + network.currentStateTotal
  }
  
  // E. Public Cloud Comparison
  const calculatePublicCloudComparison = () => {
    const publicCloudTCO = totalVMs * avgPublicCloudCostPerMonth * (analysisTerm * 12)
    const vcfTCO = calculateVCFTotalTCO()
    const cloudCostAvoidance = publicCloudTCO - vcfTCO
    
    return {
      publicCloudTCO: publicCloudTCO,
      vcfTCO: vcfTCO,
      cloudCostAvoidance: cloudCostAvoidance
    }
  }
  
  // Calculate Financial Metrics
  const calculateFinancialMetrics = () => {
    const currentStateTCO = calculateCurrentStateTotalTCO()
    const vcfTCO = calculateVCFTotalTCO()
    const operationalEfficiency = calculateOperationalEfficiency()
    const riskMitigation = calculateRiskMitigation()
    const publicCloud = calculatePublicCloudComparison()
    
    const totalSavings = currentStateTCO - vcfTCO + operationalEfficiency.totalSavings + riskMitigation.totalRiskMitigation
    const totalInvestment = vcfTCO
    
    // ROI
    const roi = totalInvestment > 0 ? (totalSavings / totalInvestment) * 100 : 0
    
    // NPV (simplified, assuming 10% discount rate)
    const discountRate = 0.10
    const year1Cashflow = -vcfTCO / analysisTerm + (currentStateTCO / analysisTerm - vcfTCO / analysisTerm) + operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection
    const year2Cashflow = (currentStateTCO / analysisTerm - vcfTCO / analysisTerm) + operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection
    const year3Cashflow = (currentStateTCO / analysisTerm - vcfTCO / analysisTerm) + operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection
    
    const npv = year1Cashflow / (1 + discountRate) + year2Cashflow / Math.pow(1 + discountRate, 2) + year3Cashflow / Math.pow(1 + discountRate, 3)
    
    // Payback Period (months)
    const monthlySavings = (currentStateTCO / analysisTerm - vcfTCO / analysisTerm + operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection) / 12
    const paybackPeriodMonths = monthlySavings > 0 ? (vcfTCO / analysisTerm) / monthlySavings : 0
    
    return {
      npv3Year: npv,
      roi: roi,
      paybackPeriodMonths: paybackPeriodMonths,
      totalSavings: totalSavings,
      cashflow: {
        year1: year1Cashflow,
        year2: year2Cashflow,
        year3: year3Cashflow
      }
    }
  }
  
  // Generate Value Report
  const generateValueReport = () => {
    const compute = calculateComputeAndLicensing()
    const storage = calculateStorage()
    const network = calculateNetwork()
    const esg = calculateESG()
    const publicCloud = calculatePublicCloudComparison()
    const operationalEfficiency = calculateOperationalEfficiency()
    const riskMitigation = calculateRiskMitigation()
    const financials = calculateFinancialMetrics()
    
    const currentStateTCO = calculateCurrentStateTotalTCO()
    const vcfTCO = calculateVCFTotalTCO()
    
    return {
      financials: {
        npv3Year: financials.npv3Year,
        roi: financials.roi,
        paybackPeriodMonths: financials.paybackPeriodMonths
      },
      tcoBreakdown: {
        currentState: currentStateTCO,
        futureState: vcfTCO,
        publicCloud: publicCloud.publicCloudTCO
      },
      esgImpact: {
        kwhSaved: esg.kwhSaved,
        co2eReduced: esg.co2eReduced,
        treesEquivalent: esg.treesEquivalent
      },
      cashflow: financials.cashflow,
      detailedBreakdown: {
        compute: compute,
        storage: storage,
        network: network,
        operationalEfficiency: operationalEfficiency,
        riskMitigation: riskMitigation,
        publicCloud: publicCloud
      }
    }
  }
  
  const valueReport = generateValueReport()
  
  // Update context (note: customer, analysisTerm, totalVMs, totalHosts are now in globalConfig)
  useEffect(() => {
    updateValueModel({
      // These are now managed in GlobalConfiguration component
      // customerName, analysisTerm, totalVMs, totalHosts removed
      pue,
      gridCarbonIntensity,
      avgPublicCloudCostPerMonth,
      parallelRunPeriod,
      avgCostPerHost,
      supportPercentage,
      consolidationRatio,
      currentStorageCostPerGB,
      totalStorageGB,
      physicalFirewallCount,
      loadBalancerCount,
      ftes,
      burdenedCostPerFTE,
      productivityGainServerAdmin,
      productivityGainNetworkAdmin,
      productivityGainDBAdmin,
      annualRevenue,
      marginPercentage,
      currentHostWatts,
      vcfHostWatts,
      valueReport: valueReport
    })
  }, [
    // Note: customerName, analysisTerm, totalVMs, totalHosts are now from globalConfig
    globalConfig?.selectedCustomer, globalConfig?.analysisTerm, globalConfig?.totalVMs, globalConfig?.totalHosts,
    pue, gridCarbonIntensity, avgPublicCloudCostPerMonth, parallelRunPeriod,
    avgCostPerHost, supportPercentage, consolidationRatio,
    currentStorageCostPerGB, totalStorageGB,
    physicalFirewallCount, loadBalancerCount,
    ftes, burdenedCostPerFTE, productivityGainServerAdmin, productivityGainNetworkAdmin, productivityGainDBAdmin,
    annualRevenue, marginPercentage,
    currentHostWatts, vcfHostWatts,
    updateValueModel
  ])
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const formatNumber = (value, decimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }
  
  // Reset all inputs
  const handleReset = () => {
    // Note: Customer selection, Analysis Term, Total VMs, Total Hosts are now managed in GlobalConfiguration
    setPue(1.5)
    setGridCarbonIntensity(0.385)
    setAvgPublicCloudCostPerMonth(280)
    setParallelRunPeriod(6)
    setAvgCostPerHost(25000)
    setSupportPercentage(15)
    setConsolidationRatio(3.0)
    setCurrentStorageCostPerGB(0.10)
    setTotalStorageGB(0)
    setPhysicalFirewallCount(0)
    setLoadBalancerCount(0)
    setFtes(0)
    setBurdenedCostPerFTE(0)
    setProductivityGainServerAdmin(40)
    setProductivityGainNetworkAdmin(40)
    setProductivityGainDBAdmin(0)
    setAnnualRevenue(0)
    setMarginPercentage(0)
    setCurrentHostWatts(500)
    setVcfHostWatts(400)
  }
  
  // Prepare chart data
  const tcoChartData = [
    {
      name: 'Current State',
      value: valueReport.tcoBreakdown.currentState
    },
    {
      name: 'VCF Future State',
      value: valueReport.tcoBreakdown.futureState
    },
    {
      name: 'Public Cloud',
      value: valueReport.tcoBreakdown.publicCloud
    }
  ]
  
  const cashflowChartData = [
    { year: 'Year 1', cashflow: valueReport.cashflow.year1 },
    { year: 'Year 2', cashflow: valueReport.cashflow.year2 },
    { year: 'Year 3', cashflow: valueReport.cashflow.year3 }
  ]
  
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Strategic Business Value Model (VCF TCO/ROI)</h1>
        <p className="text-gray-600">
          Comprehensive business value analysis for {customerName} - Compare Current State vs VCF Future State
        </p>
      </div>
      
      {/* Assumptions & Reset Controls */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Configuration & Assumptions
            </h2>
            <p className="text-sm text-gray-700">
              Strategic business value model for {analysisTerm}-year analysis period with parallel run and migration considerations.
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
          {/* Note: Global Configuration (Customer, Analysis Term, Total VMs, Total Hosts) is now in the top sticky bar */}
          
          {/* ESG Parameters */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-600" />
              ESG Parameters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SmartInput
                  type="number"
                  value={pue}
                  defaultValue={1.5}
                  onChange={(e) => setPue(e.target.value)}
                  label="Power Usage Effectiveness (PUE)"
                  placeholder="1.5"
                  min="1"
                  step="0.1"
                  citation={{
                    rationale: "PUE measures data center energy efficiency. A PUE of 1.5 indicates that for every 1 unit of IT power, 0.5 units are used for cooling and overhead. This is a typical value for modern enterprise data centers.",
                    source: "Source: Uptime Institute 2024 Data Center Survey - Industry Standard Benchmark"
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Grid Carbon Intensity (kg/kWh)</span>
                    <Tooltip text="Carbon intensity of grid electricity (default: 0.385 kg/kWh)">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={gridCarbonIntensity}
                  onChange={(e) => setGridCarbonIntensity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.385"
                  min="0"
                  step="0.001"
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={currentHostWatts}
                  defaultValue={500}
                  onChange={(e) => setCurrentHostWatts(e.target.value)}
                  label="Current Host Power (Watts)"
                  placeholder="500"
                  min="0"
                  step="10"
                  citation={citations.currentHostWatts}
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={vcfHostWatts}
                  defaultValue={400}
                  onChange={(e) => setVcfHostWatts(e.target.value)}
                  label="VCF Host Power (Watts)"
                  placeholder="400"
                  min="0"
                  step="10"
                  citation={citations.vcfHostWatts}
                />
              </div>
            </div>
          </div>
          
          {/* Cloud Economics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Cloud className="w-5 h-5 mr-2 text-blue-600" />
              Cloud Economics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SmartInput
                  type="number"
                  value={avgPublicCloudCostPerMonth}
                  defaultValue={280}
                  onChange={(e) => setAvgPublicCloudCostPerMonth(e.target.value)}
                  label="Avg Public Cloud Cost/Month ($)"
                  placeholder="280"
                  min="0"
                  step="10"
                  citation={citations.avgPublicCloudCostPerMonth}
                />
              </div>
            </div>
          </div>
          
          {/* Migration Parameters */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-600" />
              Migration Parameters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SmartInput
                  type="number"
                  value={parallelRunPeriod}
                  defaultValue={6}
                  onChange={(e) => setParallelRunPeriod(e.target.value)}
                  label="Parallel Run Period (Months)"
                  placeholder="6"
                  min="0"
                  max="24"
                  step="1"
                  citation={citations.parallelRunPeriod}
                />
              </div>
            </div>
          </div>
          
          {/* Compute & Licensing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Server className="w-5 h-5 mr-2 text-indigo-600" />
              A. Compute & Licensing (Modernization)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <SmartInput
                  type="number"
                  value={avgCostPerHost}
                  defaultValue={25000}
                  onChange={(e) => setAvgCostPerHost(e.target.value)}
                  label="Avg Cost Per Host ($)"
                  placeholder="25000"
                  min="0"
                  step="1000"
                  citation={{
                    rationale: "Average hardware cost per physical host including compute, memory, networking, and initial storage. This represents a typical enterprise-grade server suitable for virtualization workloads.",
                    source: "Source: IDC Enterprise Server Market Analysis 2024 - Average Mid-Range Server Pricing"
                  }}
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={supportPercentage}
                  defaultValue={15}
                  onChange={(e) => setSupportPercentage(e.target.value)}
                  label="Support Percentage (%)"
                  placeholder="15"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.supportPercentage}
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={consolidationRatio}
                  defaultValue={3.0}
                  onChange={(e) => setConsolidationRatio(e.target.value)}
                  label="Consolidation Ratio"
                  placeholder="3.0"
                  min="1"
                  step="0.1"
                  citation={citations.consolidationRatio}
                />
              </div>
            </div>
            
            {valueReport.detailedBreakdown.compute && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current State Annual:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(valueReport.detailedBreakdown.compute.currentStateAnnual)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">VCF Future State Annual:</span>
                    <span className="ml-2 font-semibold text-indigo-600">{formatCurrency(valueReport.detailedBreakdown.compute.vcfFutureStateAnnual)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Projected VCF Hosts:</span>
                    <span className="ml-2 font-semibold">{valueReport.detailedBreakdown.compute.vcfHosts}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Storage */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <HardDrive className="w-5 h-5 mr-2 text-indigo-600" />
              B. Storage (HCI vs SAN)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Current Storage Cost/GB ($)</span>
                    <Tooltip text="Cost per GB for external storage (default: $0.10)">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={currentStorageCostPerGB}
                  onChange={(e) => setCurrentStorageCostPerGB(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.10"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Total Storage (GB)</span>
                    <Tooltip text="Total storage capacity in gigabytes">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={totalStorageGB}
                  onChange={(e) => setTotalStorageGB(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter total storage"
                  min="0"
                  step="1000"
                />
              </div>
            </div>
          </div>
          
          {/* Network */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2 text-indigo-600" />
              C. Network (Hardware Elimination)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SmartInput
                  type="number"
                  value={physicalFirewallCount}
                  defaultValue={0}
                  onChange={(e) => setPhysicalFirewallCount(e.target.value)}
                  label="Physical Firewall Count"
                  placeholder="0"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={loadBalancerCount}
                  defaultValue={0}
                  onChange={(e) => setLoadBalancerCount(e.target.value)}
                  label="Load Balancer Count"
                  placeholder="0"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>
          
          {/* Operational Efficiency */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" />
              F. Operational Efficiency (Labor)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <SmartInput
                  type="number"
                  value={ftes}
                  defaultValue={0}
                  onChange={(e) => setFtes(e.target.value)}
                  label="FTEs"
                  placeholder="Enter FTEs"
                  min="0"
                  step="0.5"
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={burdenedCostPerFTE}
                  defaultValue={0}
                  onChange={(e) => setBurdenedCostPerFTE(e.target.value)}
                  label="Burdened Cost Per FTE ($)"
                  placeholder="Enter burdened cost"
                  min="0"
                  step="1000"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <SmartInput
                  type="number"
                  value={productivityGainServerAdmin}
                  defaultValue={40}
                  onChange={(e) => setProductivityGainServerAdmin(e.target.value)}
                  label="Server Admin Productivity Gain (%)"
                  placeholder="40"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.productivityGainServerAdmin}
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={productivityGainNetworkAdmin}
                  defaultValue={40}
                  onChange={(e) => setProductivityGainNetworkAdmin(e.target.value)}
                  label="Network Admin Productivity Gain (%)"
                  placeholder="40"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.productivityGainNetworkAdmin}
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={productivityGainDBAdmin}
                  defaultValue={0}
                  onChange={(e) => setProductivityGainDBAdmin(e.target.value)}
                  label="DB Admin Productivity Gain (%)"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.productivityGainDBAdmin}
                />
              </div>
            </div>
          </div>
          
          {/* Risk Mitigation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-600" />
              G. Risk Mitigation (Revenue Protection)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SmartInput
                  type="number"
                  value={annualRevenue}
                  defaultValue={0}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                  label="Annual Revenue ($)"
                  placeholder="Enter annual revenue"
                  min="0"
                  step="100000"
                />
              </div>
              
              <div>
                <SmartInput
                  type="number"
                  value={marginPercentage}
                  defaultValue={0}
                  onChange={(e) => setMarginPercentage(e.target.value)}
                  label="Margin Percentage (%)"
                  placeholder="Enter margin %"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Summary Cards */}
        <div className="space-y-6 w-full lg:w-auto">
          {/* Financial Metrics */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Calculator className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Financial Metrics</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-indigo-100 mb-1">3-Year NPV</div>
                <div className="text-2xl font-bold">{formatCurrency(valueReport.financials.npv3Year)}</div>
              </div>
              <div>
                <div className="text-sm text-indigo-100 mb-1">ROI</div>
                <div className="text-2xl font-bold">{valueReport.financials.roi.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-indigo-100 mb-1">Payback Period</div>
                <div className="text-2xl font-bold">{valueReport.financials.paybackPeriodMonths.toFixed(1)} months</div>
              </div>
            </div>
          </div>
          
          {/* TCO Comparison */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingDown className="w-6 h-6" />
              <h2 className="text-xl font-semibold">{analysisTerm}-Year TCO</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-blue-100 mb-1">Current State</div>
                <div className="text-xl font-bold">{formatCurrency(valueReport.tcoBreakdown.currentState)}</div>
              </div>
              <div>
                <div className="text-sm text-blue-100 mb-1">VCF Future State</div>
                <div className="text-xl font-bold">{formatCurrency(valueReport.tcoBreakdown.futureState)}</div>
              </div>
              <div className="pt-3 border-t border-blue-400/30">
                <div className="text-sm text-blue-100 mb-1">Total Savings</div>
                <div className="text-2xl font-bold">{formatCurrency(valueReport.tcoBreakdown.currentState - valueReport.tcoBreakdown.futureState)}</div>
              </div>
            </div>
          </div>
          
          {/* Public Cloud Comparison */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Public Cloud Comparison</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-green-100 mb-1">Public Cloud TCO</div>
                <div className="text-xl font-bold">{formatCurrency(valueReport.detailedBreakdown.publicCloud.publicCloudTCO)}</div>
              </div>
              <div>
                <div className="text-sm text-green-100 mb-1">VCF TCO</div>
                <div className="text-xl font-bold">{formatCurrency(valueReport.detailedBreakdown.publicCloud.vcfTCO)}</div>
              </div>
              <div className="pt-3 border-t border-green-400/30">
                <div className="text-sm text-green-100 mb-1">Cloud Cost Avoidance</div>
                <div className="text-2xl font-bold">{formatCurrency(valueReport.detailedBreakdown.publicCloud.cloudCostAvoidance)}</div>
              </div>
            </div>
          </div>
          
          {/* ESG Impact */}
          <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="w-6 h-6" />
              <h2 className="text-xl font-semibold">ESG Impact</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-green-100 mb-1">kWh Saved</div>
                <div className="text-xl font-bold">{formatNumber(valueReport.esgImpact.kwhSaved, 0)} kWh</div>
              </div>
              <div>
                <div className="text-sm text-green-100 mb-1">CO2e Reduced</div>
                <div className="text-xl font-bold">{formatNumber(valueReport.esgImpact.co2eReduced, 2)} metric tons</div>
              </div>
              <div>
                <div className="text-sm text-green-100 mb-1">Trees Equivalent</div>
                <div className="text-xl font-bold">{formatNumber(valueReport.esgImpact.treesEquivalent, 0)} trees</div>
              </div>
            </div>
          </div>
          
          {/* Operational Efficiency Savings */}
          {valueReport.detailedBreakdown.operationalEfficiency && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Operational Efficiency</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Annual Savings</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(valueReport.detailedBreakdown.operationalEfficiency.annualSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{analysisTerm}-Year Total</span>
                  <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.operationalEfficiency.totalSavings)}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Risk Mitigation */}
          {valueReport.detailedBreakdown.riskMitigation && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Risk Mitigation</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Downtime Protection</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(valueReport.detailedBreakdown.riskMitigation.downtimeProtection)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Security Protection</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(valueReport.detailedBreakdown.riskMitigation.securityProtection)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-semibold text-gray-700">{analysisTerm}-Year Total</span>
                  <span className="font-bold text-indigo-600">{formatCurrency(valueReport.detailedBreakdown.riskMitigation.totalRiskMitigation)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* TCO Comparison Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{analysisTerm}-Year TCO Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={tcoChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <RechartsTooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Cashflow Analysis */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Cashflow Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cashflowChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <RechartsTooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="cashflow" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Year 1</div>
            <div className="text-lg font-bold text-red-600">{formatCurrency(valueReport.cashflow.year1)}</div>
            <div className="text-xs text-gray-500 mt-1">High cost (double bubble)</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Year 2</div>
            <div className="text-lg font-bold text-yellow-600">{formatCurrency(valueReport.cashflow.year2)}</div>
            <div className="text-xs text-gray-500 mt-1">Stabilized</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Year 3</div>
            <div className="text-lg font-bold text-green-600">{formatCurrency(valueReport.cashflow.year3)}</div>
            <div className="text-xs text-gray-500 mt-1">Maximum value</div>
          </div>
        </div>
      </div>
      
      {/* Detailed Summary Table */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Value Report Summary</h2>
        
        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Current State</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">VCF Future State</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Savings/Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Compute & Licensing</td>
                <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.compute.currentStateTotal)}</td>
                <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.compute.vcfTotal)}</td>
                <td className="py-4 px-4 text-right text-green-600 font-semibold">
                  {formatCurrency(valueReport.detailedBreakdown.compute.currentStateTotal - valueReport.detailedBreakdown.compute.vcfTotal)}
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Storage</td>
                <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.storage.currentStateTotal)}</td>
                <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.storage.vcfTotal)}</td>
                <td className="py-4 px-4 text-right text-green-600 font-semibold">
                  {formatCurrency(valueReport.detailedBreakdown.storage.currentStateTotal - valueReport.detailedBreakdown.storage.vcfTotal)}
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Network</td>
                <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.network.currentStateTotal)}</td>
                <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.network.vcfTotal)}</td>
                <td className="py-4 px-4 text-right text-green-600 font-semibold">
                  {formatCurrency(valueReport.detailedBreakdown.network.currentStateTotal - valueReport.detailedBreakdown.network.vcfTotal)}
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Operational Efficiency</td>
                <td className="py-4 px-4 text-right text-gray-900">-</td>
                <td className="py-4 px-4 text-right text-gray-900">-</td>
                <td className="py-4 px-4 text-right text-green-600 font-semibold">
                  {formatCurrency(valueReport.detailedBreakdown.operationalEfficiency.totalSavings)}
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Risk Mitigation</td>
                <td className="py-4 px-4 text-right text-gray-900">-</td>
                <td className="py-4 px-4 text-right text-gray-900">-</td>
                <td className="py-4 px-4 text-right text-green-600 font-semibold">
                  {formatCurrency(valueReport.detailedBreakdown.riskMitigation.totalRiskMitigation)}
                </td>
              </tr>
              <tr className="bg-indigo-50 font-semibold">
                <td className="py-4 px-4 text-gray-900">Total</td>
                <td className="py-4 px-4 text-right text-indigo-600">{formatCurrency(valueReport.tcoBreakdown.currentState)}</td>
                <td className="py-4 px-4 text-right text-indigo-600">{formatCurrency(valueReport.tcoBreakdown.futureState)}</td>
                <td className="py-4 px-4 text-right text-indigo-600">
                  {formatCurrency(
                    valueReport.tcoBreakdown.currentState - 
                    valueReport.tcoBreakdown.futureState + 
                    valueReport.detailedBreakdown.operationalEfficiency.totalSavings + 
                    valueReport.detailedBreakdown.riskMitigation.totalRiskMitigation
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Mobile: Card View */}
        <div className="md:hidden space-y-4">
            {/* Compute & Licensing */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-3 text-base">Compute & Licensing</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current State:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.compute.currentStateTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VCF Future State:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.compute.vcfTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Savings:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.compute.currentStateTotal - valueReport.detailedBreakdown.compute.vcfTotal)}</span>
                </div>
              </div>
            </div>
            
            {/* Storage */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-3 text-base">Storage</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current State:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.storage.currentStateTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VCF Future State:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.storage.vcfTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Savings:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.storage.currentStateTotal - valueReport.detailedBreakdown.storage.vcfTotal)}</span>
                </div>
              </div>
            </div>
            
            {/* Network */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-3 text-base">Network</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current State:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.network.currentStateTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VCF Future State:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.network.vcfTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Savings:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.network.currentStateTotal - valueReport.detailedBreakdown.network.vcfTotal)}</span>
                </div>
              </div>
            </div>
            
            {/* Operational Efficiency */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-3 text-base">Operational Efficiency</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current State:</span>
                  <span className="font-medium text-gray-500">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VCF Future State:</span>
                  <span className="font-medium text-gray-500">-</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Savings:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.operationalEfficiency.totalSavings)}</span>
                </div>
              </div>
            </div>
            
            {/* Risk Mitigation */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-3 text-base">Risk Mitigation</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current State:</span>
                  <span className="font-medium text-gray-500">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VCF Future State:</span>
                  <span className="font-medium text-gray-500">-</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Savings:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.riskMitigation.totalRiskMitigation)}</span>
                </div>
              </div>
            </div>
            
            {/* Total */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-3 text-base">Total</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Current State:</span>
                  <span className="font-semibold text-indigo-600">{formatCurrency(valueReport.tcoBreakdown.currentState)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">VCF Future State:</span>
                  <span className="font-semibold text-indigo-600">{formatCurrency(valueReport.tcoBreakdown.futureState)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-indigo-300">
                  <span className="text-gray-900 font-semibold">Total Savings:</span>
                  <span className="font-bold text-indigo-600 text-base">
                    {formatCurrency(
                      valueReport.tcoBreakdown.currentState - 
                      valueReport.tcoBreakdown.futureState + 
                      valueReport.detailedBreakdown.operationalEfficiency.totalSavings + 
                      valueReport.detailedBreakdown.riskMitigation.totalRiskMitigation
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
      
      {/* Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  )
}

export default ValueModel
