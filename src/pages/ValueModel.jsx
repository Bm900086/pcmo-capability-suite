import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Calculator, Server, Code, Zap, TrendingDown, Info, RotateCcw, Network, Settings, HelpCircle, HardDrive, Shield, Database, Activity, Cloud, Leaf, DollarSign, Percent, AlertTriangle } from 'lucide-react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'
import SmartInput from '../components/SmartInput'
import SmartSelect from '../components/SmartSelect'
import FormulaInfo from '../components/FormulaInfo'
import AssumptionPanel from '../components/AssumptionPanel'
import { useDependencyHighlight, DependencyMapButton } from '../components/DependencyHighlighter'
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
  const [migrationCostPerVM, setMigrationCostPerVM] = useState(valueModel.migrationCostPerVM || 1000)
  const [trainingCostPerFTE, setTrainingCostPerFTE] = useState(valueModel.trainingCostPerFTE || 5000)
  
  // Facilities/Data Center
  const [costPerHostPerYear, setCostPerHostPerYear] = useState(valueModel.costPerHostPerYear || 5000)
  
  // Software Licensing (Current State)
  const [currentStateSoftwareCost, setCurrentStateSoftwareCost] = useState(valueModel.currentStateSoftwareCost || 0)
  
  // Financial
  const [discountRate, setDiscountRate] = useState(valueModel.discountRate || 10)
  
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
  
  // Dependency highlighting
  const [activeField, setActiveField] = useState(null)
  
  // Format currency helper (needed early for assumptions and calculations)
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  // Define dependencies for highlighting
  const dependencies = {
    'avgCostPerHost': [],
    'supportPercentage': [],
    'consolidationRatio': [],
    'totalVMs': [],
    'totalHosts': [],
    'currentStateCost': ['avgCostPerHost', 'supportPercentage', 'totalHosts'],
    'vcfHosts': ['totalVMs', 'consolidationRatio'],
    'vcfHardwareCost': ['vcfHosts', 'avgCostPerHost'],
    'vcfSubscriptionCost': ['vcfHardwareCost'],
    'vcfFutureStateCost': ['vcfHardwareCost', 'vcfSubscriptionCost'],
    'totalStorageGB': [],
    'currentStorageCostPerGB': [],
    'currentStorageCost': ['totalStorageGB', 'currentStorageCostPerGB'],
    'ftes': [],
    'burdenedCostPerFTE': [],
    'productivityGainServerAdmin': [],
    'productivityGainNetworkAdmin': [],
    'productivityGainDBAdmin': [],
    'totalLaborCost': ['ftes', 'burdenedCostPerFTE'],
    'operationalEfficiency': ['totalLaborCost', 'productivityGainServerAdmin', 'productivityGainNetworkAdmin', 'productivityGainDBAdmin'],
    'annualRevenue': [],
    'marginPercentage': [],
    'riskMitigation': ['annualRevenue', 'marginPercentage'],
    'npv': ['vcfTCO', 'currentStateTCO', 'operationalEfficiency', 'riskMitigation'],
    'roi': ['totalSavings', 'totalInvestment'],
    'paybackPeriod': ['vcfTCO', 'monthlySavings']
  }
  
  const { getFieldClassName } = useDependencyHighlight(dependencies, activeField)
  
  // Assumptions data structure
  const [assumptions, setAssumptions] = useState([
    // Financial Assumptions (Blue)
    {
      id: 'avgCostPerHost',
      name: 'Average Cost Per Host',
      value: `$${avgCostPerHost.toLocaleString()}`,
      unit: '',
      category: 'Financial',
      description: 'Average purchase cost per physical host including compute, memory, networking, and initial storage. Typical enterprise-grade server suitable for virtualization workloads.',
      impact: 'Directly affects compute TCO. Higher cost increases both current and future state costs.',
      type: 'number',
      editable: true,
      formulaInfo: {
        title: 'Average Cost Per Host',
        description: 'The total hardware cost per physical server including all components needed for virtualization.',
        formula: 'Avg Cost Per Host = Base Server Cost + Memory + Networking + Initial Storage',
        components: [
          { name: 'Base Server Cost', description: 'CPU, motherboard, chassis' },
          { name: 'Memory', description: 'RAM modules for virtualization' },
          { name: 'Networking', description: 'Network interface cards' },
          { name: 'Initial Storage', description: 'Local storage for hypervisor' }
        ],
        assumptions: [
          { name: 'Avg Cost Per Host', value: `$${avgCostPerHost.toLocaleString()}`, color: 'bg-blue-400', category: 'Financial' }
        ],
        example: {
          description: 'For a typical enterprise server:',
          calculation: '$20,000 (base) + $3,000 (memory) + $1,000 (networking) + $1,000 (storage) = $25,000',
          result: '$25,000 per host'
        },
        edgeCases: [
          'Costs vary significantly by vendor and configuration',
          'Bulk purchases may reduce per-unit cost by 10-20%',
          'High-end servers can exceed $50,000 per host'
        ]
      }
    },
    {
      id: 'supportPercentage',
      name: 'Hardware Support Percentage',
      value: `${supportPercentage}%`,
      unit: '%',
      category: 'Financial',
      description: 'Annual support cost as a percentage of hardware cost. Includes maintenance, firmware updates, and technical support.',
      impact: 'Applied to hardware costs annually. 15% is standard for enterprise support contracts.',
      type: 'number',
      editable: true,
      formulaInfo: {
        title: 'Hardware Support Percentage',
        description: 'Annual support cost expressed as a percentage of hardware purchase price.',
        formula: 'Annual Support Cost = Hardware Cost × Support Percentage',
        components: [
          { name: 'Hardware Cost', description: 'Initial purchase price of hardware' },
          { name: 'Support Percentage', description: 'Annual support rate (typically 15-20%)' }
        ],
        assumptions: [
          { name: 'Support Percentage', value: `${supportPercentage}%`, color: 'bg-blue-400', category: 'Financial' }
        ],
        example: {
          description: 'For $25,000 hardware with 15% support:',
          calculation: '$25,000 × 15% = $3,750 per year',
          result: '$3,750 annual support cost'
        },
        edgeCases: [
          'Support rates vary by vendor (12-20% typical)',
          'Extended warranties may increase to 25%',
          'Some vendors offer tiered support levels'
        ]
      }
    },
    {
      id: 'consolidationRatio',
      name: 'Consolidation Ratio',
      value: `${consolidationRatio}:1`,
      unit: 'VMs per Host',
      category: 'Operational',
      description: 'Number of VMs that can run on a single physical host. A 3:1 ratio is conservative and accounts for resource overhead, peak usage, and performance headroom.',
      impact: 'Higher ratio reduces future host count, lowering VCF TCO. Directly affects infrastructure efficiency.',
      type: 'number',
      editable: true,
      formulaInfo: {
        title: 'Consolidation Ratio',
        description: 'The ratio of virtual machines to physical hosts, indicating infrastructure efficiency.',
        formula: 'Future Hosts = Total VMs ÷ Consolidation Ratio',
        components: [
          { name: 'Total VMs', description: 'Number of virtual machines to be hosted' },
          { name: 'Consolidation Ratio', description: 'VMs per host (typically 3-5:1)' }
        ],
        assumptions: [
          { name: 'Consolidation Ratio', value: `${consolidationRatio}:1`, color: 'bg-green-400', category: 'Operational' }
        ],
        example: {
          description: 'For 5,000 VMs with 3:1 consolidation:',
          calculation: '5,000 VMs ÷ 3 = 1,667 hosts (rounded up)',
          result: '1,667 hosts required'
        },
        edgeCases: [
          'Conservative ratios (2-3:1) provide more headroom',
          'Aggressive ratios (5-8:1) require careful capacity planning',
          'Workload type significantly affects optimal ratio'
        ]
      }
    },
    {
      id: 'discountRate',
      name: 'Discount Rate (WACC)',
      value: `${discountRate}%`,
      unit: '%',
      category: 'Financial',
      description: 'Weighted Average Cost of Capital used for NPV calculations. Represents the opportunity cost of capital.',
      impact: 'Higher discount rate reduces NPV. Standard range is 8-12% for enterprise IT projects.',
      type: 'number',
      editable: true,
      formulaInfo: {
        title: 'Discount Rate (WACC)',
        description: 'The rate used to discount future cash flows to present value in NPV calculations.',
        formula: 'NPV = Σ(Cash Flow / (1 + Discount Rate)^Year)',
        components: [
          { name: 'Cash Flow', description: 'Net benefit for each year' },
          { name: 'Discount Rate', description: 'WACC or required rate of return' },
          { name: 'Year', description: 'Time period (1, 2, 3, etc.)' }
        ],
        assumptions: [
          { name: 'Discount Rate', value: `${discountRate}%`, color: 'bg-blue-400', category: 'Financial' }
        ],
        example: {
          description: `For Year 1 cash flow of $1,000,000 with ${discountRate}% discount:`,
          calculation: `$1,000,000 / (1 + ${discountRate / 100})^1 = $${Math.round(1000000 / (1 + discountRate / 100)).toLocaleString()}`,
          result: `$${Math.round(1000000 / (1 + discountRate / 100)).toLocaleString()} present value`
        },
        edgeCases: [
          'Lower rates favor longer-term projects',
          'Higher rates favor projects with early returns',
          'Should match company\'s cost of capital'
        ]
      }
    },
    // Operational Assumptions (Green)
    {
      id: 'productivityGainServerAdmin',
      name: 'Server Admin Productivity Gain',
      value: `${productivityGainServerAdmin}%`,
      unit: '%',
      category: 'Operational',
      description: 'Productivity improvement for server administrators due to automation, self-service capabilities, and simplified management.',
      impact: 'Directly reduces labor costs. 40% is typical for modern cloud management platforms.',
      type: 'number',
      editable: true,
      formulaInfo: {
        title: 'Server Admin Productivity Gain',
        description: 'Percentage reduction in time required for server administration tasks due to automation and improved tools.',
        formula: 'Labor Savings = Total Labor Cost × Productivity Gain % × Server Admin Allocation %',
        components: [
          { name: 'Total Labor Cost', description: 'Annual cost of all IT staff' },
          { name: 'Productivity Gain %', description: 'Efficiency improvement (typically 30-50%)' },
          { name: 'Server Admin Allocation', description: 'Percentage of labor allocated to server admin (typically 40%)' }
        ],
        assumptions: [
          { name: 'Productivity Gain', value: `${productivityGainServerAdmin}%`, color: 'bg-green-400', category: 'Operational' }
        ],
        example: {
          description: 'For $1M labor cost with 40% gain and 40% allocation:',
          calculation: '$1,000,000 × 40% × 40% = $160,000 annual savings',
          result: '$160,000 saved per year'
        },
        edgeCases: [
          'Gains may take 6-12 months to fully realize',
          'Training and adoption affect actual results',
          'Some organizations see 50-60% gains with full automation'
        ]
      }
    },
    {
      id: 'productivityGainNetworkAdmin',
      name: 'Network Admin Productivity Gain',
      value: `${productivityGainNetworkAdmin}%`,
      unit: '%',
      category: 'Operational',
      description: 'Productivity improvement for network administrators through software-defined networking and automated provisioning.',
      impact: 'Reduces network administration labor costs. 40% improvement reflects reduced manual configuration time.',
      type: 'number',
      editable: true
    },
    {
      id: 'productivityGainDBAdmin',
      name: 'DB Admin Productivity Gain',
      value: `${productivityGainDBAdmin}%`,
      unit: '%',
      category: 'Operational',
      description: 'Productivity gain for database administrators through Data Services Manager automation and backup automation.',
      impact: 'Only applies if DSM is included. Can be 0% if not using database automation.',
      type: 'number',
      editable: true
    },
    // Adoption Assumptions (Yellow)
    {
      id: 'parallelRunPeriod',
      name: 'Parallel Run Period',
      value: `${parallelRunPeriod} months`,
      unit: 'months',
      category: 'Adoption',
      description: 'Transition phase where both legacy and new infrastructure operate simultaneously. Allows for gradual migration, testing, and validation.',
      impact: 'Creates "double bubble" costs during parallel run. Longer periods increase total TCO but reduce migration risk.',
      type: 'number',
      editable: true,
      formulaInfo: {
        title: 'Parallel Run Period',
        description: 'Duration of simultaneous operation of current and future state infrastructure during migration.',
        formula: 'Parallel Run Cost = (Current State Cost + VCF Cost) × Parallel Run Months',
        components: [
          { name: 'Current State Cost', description: 'Monthly cost of existing infrastructure' },
          { name: 'VCF Cost', description: 'Monthly cost of new VCF infrastructure' },
          { name: 'Parallel Run Months', description: 'Duration of overlap period' }
        ],
        assumptions: [
          { name: 'Parallel Run Period', value: `${parallelRunPeriod} months`, color: 'bg-yellow-400', category: 'Adoption' }
        ],
        example: {
          description: 'For $100K/month current + $50K/month VCF over 6 months:',
          calculation: '($100,000 + $50,000) × 6 = $900,000',
          result: '$900,000 parallel run cost'
        },
        edgeCases: [
          'Shorter periods (3-4 months) reduce cost but increase risk',
          'Longer periods (9-12 months) provide safety but increase expense',
          'Some organizations use 6 months as standard'
        ]
      }
    },
    // Risk Assumptions (Red)
    {
      id: 'downtimeReduction',
      name: 'Downtime Reduction',
      value: `${downtimeReduction}%`,
      unit: '%',
      category: 'Risk',
      description: 'Percentage reduction in downtime risk through improved infrastructure reliability, automated failover, and enhanced monitoring.',
      impact: 'Reduces revenue loss from downtime. 70% represents typical improvements from high availability infrastructure.',
      type: 'number',
      editable: false,
      formulaInfo: {
        title: 'Downtime Reduction',
        description: 'Percentage reduction in unplanned downtime incidents and duration.',
        formula: 'Downtime Value = Annual Revenue × Margin % × Downtime Reduction %',
        components: [
          { name: 'Annual Revenue', description: 'Total company revenue' },
          { name: 'Margin %', description: 'Operating margin percentage' },
          { name: 'Downtime Reduction %', description: 'Risk reduction percentage' }
        ],
        assumptions: [
          { name: 'Downtime Reduction', value: `${downtimeReduction}%`, color: 'bg-red-400', category: 'Risk' }
        ],
        example: {
          description: 'For $1B revenue, 10% margin, 70% reduction:',
          calculation: '$1,000,000,000 × 10% × 70% = $70,000,000',
          result: '$70M annual value'
        },
        edgeCases: [
          'Actual reduction depends on current infrastructure maturity',
          'Some organizations see 80-90% reduction with full automation',
          'Government/non-profit may use different metrics'
        ]
      }
    },
    {
      id: 'breachProbability',
      name: 'Security Breach Probability',
      value: `${breachProbability}%`,
      unit: '% per year',
      category: 'Risk',
      description: 'Annual probability of a significant security breach for organizations without advanced security controls.',
      impact: 'Used to calculate expected breach cost. 33% represents industry average based on security incident data.',
      type: 'number',
      editable: false
    },
    {
      id: 'riskReduction',
      name: 'Security Risk Reduction',
      value: `${riskReduction}%`,
      unit: '%',
      category: 'Risk',
      description: 'Percentage reduction in security breach risk through advanced security controls, micro-segmentation, and threat detection.',
      impact: 'Reduces expected breach costs. 35% represents typical risk reduction from comprehensive security frameworks.',
      type: 'number',
      editable: false
    },
    // System-Inferred Assumptions (Gray)
    {
      id: 'vcfSubscriptionRate',
      name: 'VCF Subscription Rate',
      value: '25%',
      unit: 'of hardware cost',
      category: 'System-Inferred',
      description: 'Estimated annual VCF subscription cost as percentage of hardware cost. System-inferred based on typical VCF pricing models.',
      impact: 'Applied to VCF hardware costs. Can be overridden if actual subscription costs are known.',
      type: 'number',
      editable: true
    },
    {
      id: 'storageSupportRate',
      name: 'Storage Support Rate',
      value: '5%',
      unit: 'of storage cost',
      category: 'System-Inferred',
      description: 'Estimated annual support cost for vSAN storage as percentage of storage cost. System-inferred default.',
      impact: 'Applied to total storage cost. Lower than external storage support rates due to HCI integration.',
      type: 'number',
      editable: true
    },
    // Migration & Implementation Assumptions
    {
      id: 'migrationCostPerVM',
      name: 'Migration Cost Per VM',
      value: `$${migrationCostPerVM.toLocaleString()}`,
      unit: 'per VM',
      category: 'Adoption',
      description: 'One-time cost per VM for migration including consulting, professional services, and data migration. Typical range: $500-$2,500 per VM.',
      impact: 'One-time cost added to Year 1 investment. Higher costs reduce ROI but reflect realistic migration complexity.',
      type: 'number',
      editable: true
    },
    {
      id: 'trainingCostPerFTE',
      name: 'Training Cost Per FTE',
      value: `$${trainingCostPerFTE.toLocaleString()}`,
      unit: 'per FTE',
      category: 'Adoption',
      description: 'One-time training cost per IT staff member for VCF adoption. Includes training courses, certifications, and ramp-up time. Typical: $3,000-$7,000 per FTE.',
      impact: 'One-time cost added to Year 1 investment. Ensures staff are properly trained on new platform.',
      type: 'number',
      editable: true
    },
    // Facilities Assumptions
    {
      id: 'costPerHostPerYear',
      name: 'Facilities Cost Per Host/Year',
      value: `$${costPerHostPerYear.toLocaleString()}`,
      unit: 'per host/year',
      category: 'Financial',
      description: 'Annual facilities cost per host including rack space, power, cooling, and data center overhead. Typical: $3,000-$7,000 per host/year.',
      impact: 'Applied annually to all hosts. Fewer hosts in future state reduce facilities costs. Represents 10-20% of TCO.',
      type: 'number',
      editable: true
    },
    // Software Licensing Assumptions
    {
      id: 'currentStateSoftwareCost',
      name: 'Current State Software Licensing',
      value: `$${currentStateSoftwareCost.toLocaleString()}`,
      unit: 'per year',
      category: 'Financial',
      description: 'Annual software licensing costs for current state (VMware vSphere, vCenter, third-party software). VCF subscription is included in compute calculation.',
      impact: 'Reduces current state TCO accuracy if not included. Should include all virtualization and management software licenses.',
      type: 'number',
      editable: true
    }
  ])
  
  const handleAssumptionUpdate = (id, value) => {
    setAssumptions(prev => prev.map(a => 
      a.id === id ? { ...a, value } : a
    ))
    
    // Update corresponding state variable
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    switch(id) {
      case 'avgCostPerHost':
        setAvgCostPerHost(numericValue)
        break
      case 'supportPercentage':
        setSupportPercentage(numericValue)
        break
      case 'consolidationRatio':
        setConsolidationRatio(numericValue)
        break
      case 'productivityGainServerAdmin':
        setProductivityGainServerAdmin(numericValue)
        break
      case 'productivityGainNetworkAdmin':
        setProductivityGainNetworkAdmin(numericValue)
        break
      case 'productivityGainDBAdmin':
        setProductivityGainDBAdmin(numericValue)
        break
      case 'parallelRunPeriod':
        setParallelRunPeriod(numericValue)
        break
      case 'discountRate':
        setDiscountRate(numericValue)
        break
      case 'migrationCostPerVM':
        setMigrationCostPerVM(numericValue)
        break
      case 'trainingCostPerFTE':
        setTrainingCostPerFTE(numericValue)
        break
      case 'costPerHostPerYear':
        setCostPerHostPerYear(numericValue)
        break
      default:
        break
    }
  }
  
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
    
    // Store formula info for display
    window.computeFormulaInfo = {
      title: 'Compute & Licensing Cost Calculation',
      description: 'Calculates the total cost of ownership for compute infrastructure in both current and future states, including hardware, support, and VCF subscription costs.',
      formula: 'Current State = (Hosts × Cost Per Host) × (1 + Support %)\nFuture State = (VMs ÷ Consolidation Ratio) × Cost Per Host × (1 + Subscription Rate)',
      components: [
        { name: 'Current Hosts', description: 'Number of physical hosts in current infrastructure' },
        { name: 'Cost Per Host', description: 'Average hardware cost per host' },
        { name: 'Support %', description: 'Annual support as percentage of hardware cost' },
        { name: 'Future Hosts', description: 'Calculated as VMs divided by consolidation ratio' },
        { name: 'VCF Subscription', description: 'Annual VCF subscription (typically 25% of hardware)' }
      ],
      assumptions: [
        { name: 'Avg Cost Per Host', value: `$${avgCostPerHost.toLocaleString()}`, color: 'bg-blue-400', category: 'Financial' },
        { name: 'Support Percentage', value: `${supportPercentage}%`, color: 'bg-blue-400', category: 'Financial' },
        { name: 'Consolidation Ratio', value: `${consolidationRatio}:1`, color: 'bg-green-400', category: 'Operational' },
        { name: 'VCF Subscription Rate', value: '25%', color: 'bg-gray-400', category: 'System-Inferred' }
      ],
      example: {
        description: 'For 400 hosts at $25K with 15% support, and 5,000 VMs with 3:1 consolidation:',
        calculation: 'Current: (400 × $25,000) × 1.15 = $11,500,000\nFuture: (5,000 ÷ 3) × $25,000 × 1.25 = $52,083,333',
        result: 'Current: $11.5M annual, Future: $52.1M annual'
      },
      edgeCases: [
        'Parallel run period creates "double bubble" costs',
        'Hardware refresh cycles may occur during analysis period',
        'Subscription rates vary by VCF edition and support level'
      ]
    }
    
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
    // Fixed: 5% of storage cost, not capacity
    const vcfStorageSupport = (totalStorageGB * currentStorageCostPerGB) * 0.05 // Estimate 5% of storage cost for support
    
    // Store formula info
    window.storageFormulaInfo = {
      title: 'Storage Cost Calculation',
      description: 'Calculates storage costs comparing external SAN/NAS (current) versus vSAN HCI (future). VCF eliminates separate storage hardware as storage is integrated into compute nodes.',
      formula: 'Current: (Storage GB × Cost/GB) × (1 + Maintenance %)\nFuture: Storage GB × Support Rate (typically 5%)',
      components: [
        { name: 'Total Storage GB', description: 'Total storage capacity required' },
        { name: 'Cost Per GB', description: 'Purchase cost per GB for external storage' },
        { name: 'Maintenance %', description: 'Annual maintenance (typically 15%)' },
        { name: 'VCF Support Rate', description: 'Minimal support for vSAN (typically 5%)' }
      ],
      assumptions: [
        { name: 'Storage Cost/GB', value: `$${currentStorageCostPerGB}`, color: 'bg-blue-400', category: 'Financial' },
        { name: 'Storage Support Rate', value: '5%', color: 'bg-gray-400', category: 'System-Inferred' }
      ],
      example: {
        description: 'For 1.5TB (1,500GB) at $0.10/GB with 15% maintenance:',
        calculation: 'Current: (1,500 × $0.10) × 1.15 = $172.50\nFuture: 1,500 × $0.05 = $75',
        result: 'Current: $172.50, Future: $75 (56% savings)'
      },
      edgeCases: [
        'vSAN eliminates separate storage array CapEx',
        'Support costs are lower for integrated HCI storage',
        'Capacity planning affects total storage requirements'
      ]
    }
    
    return {
      currentStateAnnual: currentStorageCost,
      vcfFutureStateAnnual: vcfStorageSupport,
      currentStateTotal: currentStorageCost * analysisTerm,
      vcfTotal: vcfStorageSupport * analysisTerm
    }
  }
  
  // C. Network (Hardware Elimination)
  const calculateNetwork = () => {
    // Add annual support for network hardware
    const networkHardwareCost = (physicalFirewallCount + loadBalancerCount) * networkHardwareCostPerUnit
    const currentNetworkCost = networkHardwareCost * (1 + supportPercentage / 100) // Include annual support
    const vcfNetworkCost = 0 // 100% retirement of HW Load Balancers (replaced by Avi/NSX)
    
    return {
      currentStateAnnual: currentNetworkCost,
      vcfFutureStateAnnual: vcfNetworkCost,
      currentStateTotal: currentNetworkCost * analysisTerm,
      vcfTotal: vcfNetworkCost * analysisTerm
    }
  }
  
  // D. Migration & Implementation Costs
  const calculateMigrationCosts = () => {
    const migrationCost = totalVMs * migrationCostPerVM
    const trainingCost = ftes * trainingCostPerFTE
    const oneTimeMigrationCost = migrationCost + trainingCost
    
    return {
      migrationCost: migrationCost,
      trainingCost: trainingCost,
      totalOneTimeCost: oneTimeMigrationCost,
      // No ongoing costs for migration (one-time only)
      annualCost: 0,
      totalCost: oneTimeMigrationCost
    }
  }
  
  // E. Facilities/Data Center Costs
  const calculateFacilities = () => {
    const currentHosts = totalHosts
    const vcfHosts = Math.ceil(totalVMs / consolidationRatio)
    
    const currentFacilitiesAnnual = currentHosts * costPerHostPerYear
    const vcfFacilitiesAnnual = vcfHosts * costPerHostPerYear
    
    return {
      currentStateAnnual: currentFacilitiesAnnual,
      vcfFutureStateAnnual: vcfFacilitiesAnnual,
      currentStateTotal: currentFacilitiesAnnual * analysisTerm,
      vcfTotal: vcfFacilitiesAnnual * analysisTerm
    }
  }
  
  // F. Software Licensing (Current State)
  const calculateSoftwareLicensing = () => {
    // Current state software costs (VMware licenses, third-party)
    const currentSoftwareAnnual = currentStateSoftwareCost
    const vcfSoftwareAnnual = 0 // VCF subscription already included in compute calculation
    
    return {
      currentStateAnnual: currentSoftwareAnnual,
      vcfFutureStateAnnual: vcfSoftwareAnnual,
      currentStateTotal: currentSoftwareAnnual * analysisTerm,
      vcfTotal: vcfSoftwareAnnual * analysisTerm
    }
  }
  
  // G. Sustainability & ESG
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
  
  // H. Operational Efficiency (Labor)
  const calculateOperationalEfficiency = () => {
    const totalLaborCost = ftes * burdenedCostPerFTE
    const serverAdminSavings = totalLaborCost * 0.4 * (productivityGainServerAdmin / 100)
    const networkAdminSavings = totalLaborCost * 0.3 * (productivityGainNetworkAdmin / 100)
    const dbAdminSavings = productivityGainDBAdmin > 0 ? totalLaborCost * 0.3 * (productivityGainDBAdmin / 100) : 0
    
    const totalLaborSavings = (serverAdminSavings + networkAdminSavings + dbAdminSavings) * analysisTerm
    
    // Store formula info
    window.laborFormulaInfo = {
      title: 'Operational Efficiency (Labor) Calculation',
      description: 'Calculates labor cost savings from productivity improvements. This is often the largest source of value in VCF deployments, representing 40-50% of total savings.',
      formula: 'Labor Savings = Total Labor Cost × Role Allocation % × Productivity Gain %',
      components: [
        { name: 'Total Labor Cost', description: 'FTEs × Burdened Cost Per FTE' },
        { name: 'Server Admin Allocation', description: '40% of labor allocated to server administration' },
        { name: 'Network Admin Allocation', description: '30% of labor allocated to network administration' },
        { name: 'DB Admin Allocation', description: '30% of labor (if DSM enabled)' },
        { name: 'Productivity Gains', description: 'Efficiency improvements per role (40%, 40%, variable%)' }
      ],
      assumptions: [
        { name: 'FTEs', value: ftes.toString(), color: 'bg-blue-400', category: 'Financial' },
        { name: 'Burdened Cost/FTE', value: formatCurrency(burdenedCostPerFTE), color: 'bg-blue-400', category: 'Financial' },
        { name: 'Server Admin Gain', value: `${productivityGainServerAdmin}%`, color: 'bg-green-400', category: 'Operational' },
        { name: 'Network Admin Gain', value: `${productivityGainNetworkAdmin}%`, color: 'bg-green-400', category: 'Operational' }
      ],
      example: {
        description: 'For 50 FTEs at $175K each with 40% server admin gain:',
        calculation: '($175,000 × 50) × 40% × 40% = $8,750,000 × 0.16 = $1,400,000',
        result: '$1.4M annual server admin savings'
      },
      edgeCases: [
        'Productivity gains may take 6-12 months to fully realize',
        'Training and adoption affect actual results',
        'Some organizations see 50-60% gains with full automation',
        'DB Admin savings only apply if Data Services Manager is included'
      ]
    }
    
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
  
  // I. Risk Mitigation (Revenue Protection)
  const calculateRiskMitigation = () => {
    // Downtime Cost
    const downtimeCost = annualRevenue * (marginPercentage / 100) * (downtimeReduction / 100)
    
    // Security Breach
    const breachCost = breachProbability / 100 * avgBreachCost * (riskReduction / 100)
    
    const totalRiskMitigation = (downtimeCost + breachCost) * analysisTerm
    
    // Store formula info
    window.riskFormulaInfo = {
      title: 'Risk Mitigation Value Calculation',
      description: 'Calculates the financial value of reduced business risk through improved infrastructure reliability and security. Represents avoided costs rather than direct savings.',
      formula: 'Downtime Value = Revenue × Margin % × Downtime Reduction %\nSecurity Value = (Breach Probability × Avg Breach Cost) × Risk Reduction %',
      components: [
        { name: 'Annual Revenue', description: 'Total company revenue' },
        { name: 'Margin %', description: 'Operating margin percentage' },
        { name: 'Downtime Reduction', description: 'Percentage reduction in downtime risk (70% default)' },
        { name: 'Breach Probability', description: 'Annual probability of breach (33% default)' },
        { name: 'Avg Breach Cost', description: 'Average cost per breach ($9.36M default)' },
        { name: 'Risk Reduction', description: 'Percentage reduction in breach risk (35% default)' }
      ],
      assumptions: [
        { name: 'Annual Revenue', value: formatCurrency(annualRevenue), color: 'bg-blue-400', category: 'Financial' },
        { name: 'Margin %', value: `${marginPercentage}%`, color: 'bg-blue-400', category: 'Financial' },
        { name: 'Downtime Reduction', value: `${downtimeReduction}%`, color: 'bg-red-400', category: 'Risk' },
        { name: 'Risk Reduction', value: `${riskReduction}%`, color: 'bg-red-400', category: 'Risk' }
      ],
      example: {
        description: 'For $1B revenue, 10% margin, 70% downtime reduction:',
        calculation: '$1,000,000,000 × 10% × 70% = $70,000,000',
        result: '$70M annual downtime protection value'
      },
      edgeCases: [
        'Government/non-profit organizations may use different metrics',
        'Actual reduction depends on current infrastructure maturity',
        'Some organizations see 80-90% reduction with full automation',
        'Security breach costs vary significantly by industry'
      ]
    }
    
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
    const facilities = calculateFacilities()
    const software = calculateSoftwareLicensing()
    const migration = calculateMigrationCosts()
    const labor = calculateOperationalEfficiency()
    
    // VCF TCO = All costs - labor savings + one-time migration
    return compute.vcfTotal + storage.vcfTotal + network.vcfTotal + facilities.vcfTotal + software.vcfTotal + migration.totalCost - labor.totalSavings
  }
  
  // Calculate Current State Total TCO
  const calculateCurrentStateTotalTCO = () => {
    const compute = calculateComputeAndLicensing()
    const storage = calculateStorage()
    const network = calculateNetwork()
    const facilities = calculateFacilities()
    const software = calculateSoftwareLicensing()
    
    return compute.currentStateTotal + storage.currentStateTotal + network.currentStateTotal + facilities.currentStateTotal + software.currentStateTotal
  }
  
  // J. Public Cloud Comparison
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
    
    // NPV calculation (fixed to properly account for investment vs ongoing costs)
    const discountRateDecimal = discountRate / 100
    
    // Get detailed breakdowns for proper cashflow calculation
    const compute = calculateComputeAndLicensing()
    const storage = calculateStorage()
    const network = calculateNetwork()
    const facilities = calculateFacilities()
    const software = calculateSoftwareLicensing()
    const migration = calculateMigrationCosts()
    
    // Year 1: Initial investment + parallel run costs + benefits
    const monthsPerYear = 12
    const parallelRunMonths = parallelRunPeriod
    const rampDownMonths = 6
    
    // One-time costs (Year 1 only)
    const vcfHardwareCost = compute.vcfHosts * avgCostPerHost
    const year1OneTimeCosts = vcfHardwareCost + migration.totalCost
    
    // Ongoing costs (annual, prorated for parallel run)
    const vcfAnnualOpEx = compute.vcfFutureStateAnnual + storage.vcfFutureStateAnnual + network.vcfFutureStateAnnual + facilities.vcfFutureStateAnnual + software.vcfFutureStateAnnual
    const currentAnnualOpEx = compute.currentStateAnnual + storage.currentStateAnnual + network.currentStateAnnual + facilities.currentStateTotal / analysisTerm + software.currentStateTotal / analysisTerm
    
    // Year 1: Parallel run period (both systems running)
    const year1ParallelRunMonths = Math.min(parallelRunMonths, monthsPerYear)
    const year1VcfOpEx = (vcfAnnualOpEx / monthsPerYear) * year1ParallelRunMonths
    const year1CurrentOpEx = (currentAnnualOpEx / monthsPerYear) * year1ParallelRunMonths
    
    // Year 1: Ramp down period (if parallel run extends into ramp down)
    const year1RampDownMonths = Math.max(0, Math.min(rampDownMonths, monthsPerYear - year1ParallelRunMonths))
    let year1RampDownCurrentOpEx = 0
    if (year1RampDownMonths > 0) {
      // Linear ramp down
      const rampDownStartMonth = year1ParallelRunMonths
      for (let m = 0; m < year1RampDownMonths; m++) {
        const monthInRampDown = rampDownStartMonth + m
        const currentStatePercentage = Math.max(0, 1 - (monthInRampDown / rampDownMonths))
        year1RampDownCurrentOpEx += (currentAnnualOpEx / monthsPerYear) * currentStatePercentage
      }
    }
    
    // Year 1: Normal operation months (after parallel run and ramp down)
    const year1NormalMonths = monthsPerYear - year1ParallelRunMonths - year1RampDownMonths
    const year1VcfNormalOpEx = (vcfAnnualOpEx / monthsPerYear) * year1NormalMonths
    
    // Year 1 benefits (only during normal operation, not during parallel run)
    const year1Benefits = (operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection) * (year1NormalMonths / monthsPerYear)
    
    // Year 1 cashflow
    const year1Cashflow = -year1OneTimeCosts - year1VcfOpEx - year1CurrentOpEx - year1RampDownCurrentOpEx - year1VcfNormalOpEx + year1Benefits
    
    // Year 2: Full VCF operation, no current state
    const year2VcfOpEx = vcfAnnualOpEx
    const year2Benefits = operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection
    const year2Cashflow = -year2VcfOpEx + year2Benefits
    
    // Year 3: Full VCF operation, no current state
    const year3VcfOpEx = vcfAnnualOpEx
    const year3Benefits = operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection
    const year3Cashflow = -year3VcfOpEx + year3Benefits
    
    // Calculate NPV
    const npv = year1Cashflow / (1 + discountRateDecimal) + year2Cashflow / Math.pow(1 + discountRateDecimal, 2) + year3Cashflow / Math.pow(1 + discountRateDecimal, 3)
    
    // Payback Period (months) - based on average monthly savings
    const averageAnnualSavings = (currentStateTCO / analysisTerm - vcfTCO / analysisTerm) + operationalEfficiency.annualSavings + riskMitigation.downtimeProtection + riskMitigation.securityProtection
    const monthlySavings = averageAnnualSavings / 12
    // Initial investment is Year 1 one-time costs
    const initialInvestment = vcfHardwareCost + migration.totalCost
    const paybackPeriodMonths = monthlySavings > 0 ? initialInvestment / monthlySavings : 0
    
    // Store formula info for display
    window.npvFormulaInfo = {
      title: 'Net Present Value (NPV) Calculation',
      description: 'NPV calculates the present value of all future cash flows, discounted at the weighted average cost of capital (WACC). Positive NPV indicates the investment creates value.',
      formula: 'NPV = Σ(Cash Flow / (1 + Discount Rate)^Year)',
      components: [
        { name: 'Year 1 Cash Flow', description: 'Net benefit in first year (may be negative due to investment)' },
        { name: 'Year 2-3 Cash Flow', description: 'Net benefit in subsequent years' },
        { name: 'Discount Rate', description: 'WACC or required rate of return (default 10%)' }
      ],
      assumptions: [
        { name: 'Discount Rate', value: `${discountRate}%`, color: 'bg-blue-400', category: 'Financial' },
        { name: 'Analysis Term', value: `${analysisTerm} years`, color: 'bg-blue-400', category: 'Financial' }
      ],
      example: {
        description: 'For Year 1: -$500K, Year 2: $1M, Year 3: $1M with 10% discount:',
        calculation: 'NPV = -$500K/(1.1) + $1M/(1.1)² + $1M/(1.1)³ = -$454K + $826K + $751K = $1,123K',
        result: '$1.12M NPV'
      },
      edgeCases: [
        'Negative Year 1 cash flow is normal due to initial investment',
        'Higher discount rates reduce NPV',
        'Longer analysis terms increase NPV if benefits continue'
      ]
    }
    
    window.roiFormulaInfo = {
      title: 'Return on Investment (ROI) Calculation',
      description: 'ROI measures the percentage return on the investment. Calculated as total savings divided by total investment, expressed as a percentage.',
      formula: 'ROI = (Total Savings / Total Investment) × 100%',
      components: [
        { name: 'Total Savings', description: 'Sum of all cost savings and benefits over analysis period' },
        { name: 'Total Investment', description: 'Total VCF TCO over analysis period' }
      ],
      assumptions: [
        { name: 'Total Savings', value: formatCurrency(totalSavings), color: 'bg-green-400', category: 'Operational' },
        { name: 'Total Investment', value: formatCurrency(totalInvestment), color: 'bg-blue-400', category: 'Financial' }
      ],
      example: {
        description: 'For $10M savings and $2M investment:',
        calculation: 'ROI = ($10,000,000 / $2,000,000) × 100% = 500%',
        result: '500% ROI (5x return)'
      },
      edgeCases: [
        'ROI > 100% means investment pays for itself and generates additional value',
        'Very high ROI (>1000%) may indicate conservative assumptions',
        'ROI should be compared to company\'s hurdle rate'
      ]
    }
    
    window.paybackFormulaInfo = {
      title: 'Payback Period Calculation',
      description: 'Payback period is the time required for cumulative benefits to equal the initial investment. Shorter payback periods indicate faster return on investment.',
      formula: 'Payback Period (months) = Initial Investment / Monthly Savings',
      components: [
        { name: 'Initial Investment', description: 'First year VCF investment cost' },
        { name: 'Monthly Savings', description: 'Average monthly net benefit (savings - costs)' }
      ],
      assumptions: [
        { name: 'Monthly Savings', value: formatCurrency(monthlySavings), color: 'bg-green-400', category: 'Operational' }
      ],
      example: {
        description: 'For $2M investment and $200K/month savings:',
        calculation: 'Payback = $2,000,000 / $200,000 = 10 months',
        result: '10 months to payback'
      },
      edgeCases: [
        'Payback < 12 months is considered excellent',
        'Longer payback periods may still be acceptable for strategic investments',
        'Does not account for time value of money (use NPV for that)'
      ]
    }
    
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
    const facilities = calculateFacilities()
    const software = calculateSoftwareLicensing()
    const migration = calculateMigrationCosts()
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
        facilities: facilities,
        software: software,
        migration: migration,
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
      migrationCostPerVM,
      trainingCostPerFTE,
      costPerHostPerYear,
      currentStateSoftwareCost,
      discountRate,
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
    migrationCostPerVM, trainingCostPerFTE, costPerHostPerYear, currentStateSoftwareCost, discountRate,
    avgCostPerHost, supportPercentage, consolidationRatio,
    currentStorageCostPerGB, totalStorageGB,
    physicalFirewallCount, loadBalancerCount,
    ftes, burdenedCostPerFTE, productivityGainServerAdmin, productivityGainNetworkAdmin, productivityGainDBAdmin,
    annualRevenue, marginPercentage,
    currentHostWatts, vcfHostWatts,
    updateValueModel
  ])
  
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
    setMigrationCostPerVM(1000)
    setTrainingCostPerFTE(5000)
    setCostPerHostPerYear(5000)
    setCurrentStateSoftwareCost(0)
    setDiscountRate(10)
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
      
      {/* Model Description */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-indigo-600" />
              Strategic Business Value Model (VCF TCO/ROI)
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="text-base leading-relaxed">
                <strong>What this model does:</strong> This comprehensive financial analysis tool calculates the Total Cost of Ownership (TCO) and Return on Investment (ROI) for migrating from legacy VMware infrastructure to VMware Cloud Foundation (VCF). It compares current state costs against future state costs over a {analysisTerm}-year period, accounting for hardware, software, labor, facilities, and operational efficiency gains.
              </p>
              <p className="text-base leading-relaxed">
                <strong>Why it matters:</strong> This model helps CFOs, IT leaders, and decision-makers understand the financial impact of VCF adoption, including cost savings, productivity improvements, risk mitigation, and environmental benefits. It provides the quantitative foundation needed for investment approval and strategic planning.
              </p>
              <p className="text-base leading-relaxed">
                <strong>Key outputs:</strong> The model produces Net Present Value (NPV), ROI percentage, payback period, year-by-year cash flow, TCO breakdown by category, and sustainability metrics. All calculations are transparent and assumptions are clearly documented.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assumptions Panel */}
      <div className="mb-6">
        <AssumptionPanel 
          assumptions={assumptions}
          onUpdate={handleAssumptionUpdate}
          isExpanded={false}
        />
      </div>

      {/* Dependency Map Button */}
      <div className="mb-6 flex justify-end">
        <DependencyMapButton 
          onClick={() => {
            // This will be handled by DependencyHighlighter component
            alert('Dependency map feature - shows how inputs connect to calculations and outputs')
          }}
        />
      </div>

      {/* Assumptions & Reset Controls */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Configuration & Quick Actions
            </h2>
            <p className="text-sm text-gray-700">
              Strategic business value model for {analysisTerm}-year analysis period with parallel run and migration considerations. Edit assumptions above to see real-time impact on calculations.
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
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  ESG Parameters
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Environmental, Social, and Governance metrics measure the sustainability impact of VCF adoption. These parameters calculate power consumption reduction, carbon emissions avoided, and environmental equivalents. Lower PUE and reduced host count directly translate to significant environmental benefits.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('pue')}>
                <SmartInput
                  type="number"
                  value={pue}
                  defaultValue={1.5}
                  onChange={(e) => {
                    setPue(e.target.value)
                    setActiveField('pue')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('pue')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Power Usage Effectiveness (PUE)"
                  placeholder="1.5"
                  min="1"
                  step="0.1"
                  citation={{
                    rationale: "PUE measures data center energy efficiency. A PUE of 1.5 indicates that for every 1 unit of IT power, 0.5 units are used for cooling and overhead. This is a typical value for modern enterprise data centers. Lower PUE (closer to 1.0) means more efficient. Typical range: 1.3-2.0.",
                    source: "Source: Uptime Institute 2024 Data Center Survey - Industry Standard Benchmark"
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this means:</strong> PUE = Total Facility Power ÷ IT Equipment Power. Lower is better. 1.5 is typical for modern data centers. Affects total power consumption calculations.
                </p>
              </div>
              
              <div className={getFieldClassName('gridCarbonIntensity')}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Grid Carbon Intensity (kg/kWh)</span>
                    <Tooltip text="Carbon intensity of grid electricity represents CO2 emissions per kilowatt-hour. Default 0.385 kg/kWh is US national average. Regional values vary: 0.1-0.2 (renewable-heavy), 0.5-0.8 (coal-heavy).">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={gridCarbonIntensity}
                  onChange={(e) => {
                    setGridCarbonIntensity(e.target.value)
                    setActiveField('gridCarbonIntensity')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('gridCarbonIntensity')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.385"
                  min="0"
                  step="0.001"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 0.1-0.2 (renewable-heavy regions), 0.385 (US average), 0.5-0.8 (coal-heavy). Directly affects CO2 reduction calculations.
                </p>
              </div>
              
              <div className={getFieldClassName('currentHostWatts')}>
                <SmartInput
                  type="number"
                  value={currentHostWatts}
                  defaultValue={500}
                  onChange={(e) => {
                    setCurrentHostWatts(e.target.value)
                    setActiveField('currentHostWatts')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('currentHostWatts')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Current Host Power (Watts)"
                  placeholder="500"
                  min="0"
                  step="10"
                  citation={citations.currentHostWatts}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 400-600W for mid-range, 600-1000W for high-end servers. Measured at typical load, not peak. Affects power consumption and ESG metrics.
                </p>
              </div>
              
              <div className={getFieldClassName('vcfHostWatts')}>
                <SmartInput
                  type="number"
                  value={vcfHostWatts}
                  defaultValue={400}
                  onChange={(e) => {
                    setVcfHostWatts(e.target.value)
                    setActiveField('vcfHostWatts')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('vcfHostWatts')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="VCF Host Power (Watts)"
                  placeholder="400"
                  min="0"
                  step="10"
                  citation={citations.vcfHostWatts}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 300-500W for modern servers. Lower than current state due to newer, more efficient hardware and better power management. Lower values improve ESG metrics.
                </p>
              </div>
            </div>
          </div>
          
          {/* Cloud Economics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Cloud className="w-5 h-5 mr-2 text-blue-600" />
                  Cloud Economics
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Compares VCF TCO against public cloud alternatives (AWS, Azure, GCP). This helps quantify the cost avoidance of choosing private cloud over public cloud, accounting for data egress, refactoring costs, and operational overhead. VCF typically provides 30-50% cost savings compared to public cloud for enterprise workloads.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('avgPublicCloudCostPerMonth')}>
                <SmartInput
                  type="number"
                  value={avgPublicCloudCostPerMonth}
                  defaultValue={280}
                  onChange={(e) => {
                    setAvgPublicCloudCostPerMonth(e.target.value)
                    setActiveField('avgPublicCloudCostPerMonth')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('avgPublicCloudCostPerMonth')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Avg Public Cloud Cost/Month ($)"
                  placeholder="280"
                  min="0"
                  step="10"
                  citation={citations.avgPublicCloudCostPerMonth}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this represents:</strong> Average monthly cost per VM on public cloud (AWS, Azure, GCP) including compute and standard storage. Typical: $200-$400/month for mid-tier instances. Used to calculate cloud cost avoidance.
                </p>
              </div>
            </div>
          </div>
          
          {/* Migration Parameters */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-orange-600" />
                  Migration Parameters
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Defines the transition period during which both current and future state infrastructure operate simultaneously. The parallel run period creates a "double bubble" cost scenario but reduces migration risk. Typical periods range from 3-6 months, with longer periods providing more safety but higher costs.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('parallelRunPeriod')}>
                <SmartInput
                  type="number"
                  value={parallelRunPeriod}
                  defaultValue={6}
                  onChange={(e) => {
                    setParallelRunPeriod(e.target.value)
                    setActiveField('parallelRunPeriod')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('parallelRunPeriod')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Parallel Run Period (Months)"
                  placeholder="6"
                  min="0"
                  max="24"
                  step="1"
                  citation={citations.parallelRunPeriod}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this means:</strong> Duration where both current and VCF infrastructure run simultaneously. Creates "double bubble" costs but reduces migration risk. Typical: 3-6 months. Longer periods increase TCO but provide safety.
                </p>
              </div>
            </div>
          </div>

          {/* Migration & Implementation Costs */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Migration & Implementation Costs
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> One-time costs for migrating to VCF including professional services, data migration, and staff training. These are critical for accurate ROI calculations as they represent the initial investment required.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Migration costs are calculated per VM (consulting, data migration, testing). Training costs are calculated per FTE (courses, certifications, ramp-up time). Both are one-time costs added to Year 1 investment.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Higher migration costs reduce ROI but reflect realistic project complexity. Typical migration costs range from $500-$2,500 per VM depending on complexity and data volume.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('migrationCostPerVM')}>
                <SmartInput
                  type="number"
                  value={migrationCostPerVM}
                  defaultValue={1000}
                  onChange={(e) => {
                    setMigrationCostPerVM(e.target.value)
                    setActiveField('migrationCostPerVM')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('migrationCostPerVM')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Migration Cost Per VM ($)"
                  placeholder="1000"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> $500-$2,500 per VM. Includes consulting, professional services, data migration, and testing. Higher for complex migrations.
                </p>
              </div>
              
              <div className={getFieldClassName('trainingCostPerFTE')}>
                <SmartInput
                  type="number"
                  value={trainingCostPerFTE}
                  defaultValue={5000}
                  onChange={(e) => {
                    setTrainingCostPerFTE(e.target.value)
                    setActiveField('trainingCostPerFTE')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('trainingCostPerFTE')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Training Cost Per FTE ($)"
                  placeholder="5000"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> $3,000-$7,000 per FTE. Includes training courses, certifications, and ramp-up time. Ensures staff are properly trained on VCF.
                </p>
              </div>
            </div>
            
            {valueReport.detailedBreakdown.migration && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Migration Cost:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(valueReport.detailedBreakdown.migration.migrationCost)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Training Cost:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(valueReport.detailedBreakdown.migration.trainingCost)}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t">
                    <span className="text-gray-600">Total One-Time Cost:</span>
                    <span className="ml-2 font-semibold text-indigo-600">{formatCurrency(valueReport.detailedBreakdown.migration.totalOneTimeCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Facilities/Data Center Costs */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-teal-600" />
                  Facilities/Data Center Costs
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> Annual facilities costs including rack space, power, cooling, and data center overhead. This represents 10-20% of total TCO and is often overlooked in financial models.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Calculated as cost per host per year, multiplied by number of hosts. Future state benefits from fewer hosts due to consolidation, reducing facilities costs proportionally.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Facilities costs are a significant component of TCO. Consolidation reduces these costs, contributing to overall savings. Typical range: $3,000-$7,000 per host/year.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('costPerHostPerYear')}>
                <SmartInput
                  type="number"
                  value={costPerHostPerYear}
                  defaultValue={5000}
                  onChange={(e) => {
                    setCostPerHostPerYear(e.target.value)
                    setActiveField('costPerHostPerYear')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('costPerHostPerYear')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Facilities Cost Per Host/Year ($)"
                  placeholder="5000"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this includes:</strong> Rack space, power, cooling, data center overhead, and facilities maintenance. Typical: $3,000-$7,000 per host/year depending on data center tier.
                </p>
              </div>
            </div>
            
            {valueReport.detailedBreakdown.facilities && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current State Annual:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(valueReport.detailedBreakdown.facilities.currentStateAnnual)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">VCF Future State Annual:</span>
                    <span className="ml-2 font-semibold text-indigo-600">{formatCurrency(valueReport.detailedBreakdown.facilities.vcfFutureStateAnnual)}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t">
                    <span className="text-gray-600">Annual Savings:</span>
                    <span className="ml-2 font-semibold text-green-600">
                      {formatCurrency(valueReport.detailedBreakdown.facilities.currentStateAnnual - valueReport.detailedBreakdown.facilities.vcfFutureStateAnnual)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Software Licensing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  Software Licensing (Current State)
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> Annual software licensing costs for current state infrastructure including VMware vSphere, vCenter, and third-party software. VCF subscription is already included in compute calculation.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Enter the total annual software licensing cost for current state. This ensures accurate comparison with future state where VCF subscription replaces individual licenses.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Including current software costs provides a complete picture of current state TCO. If omitted, savings may be overstated.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('currentStateSoftwareCost')}>
                <SmartInput
                  type="number"
                  value={currentStateSoftwareCost}
                  defaultValue={0}
                  onChange={(e) => {
                    setCurrentStateSoftwareCost(e.target.value)
                    setActiveField('currentStateSoftwareCost')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('currentStateSoftwareCost')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Current State Software Licensing ($/year)"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What to include:</strong> VMware vSphere, vCenter, vSAN (if applicable), third-party virtualization and management software licenses. VCF subscription is included in compute calculation.
                </p>
              </div>
            </div>
            
            {valueReport.detailedBreakdown.software && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current State Annual:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(valueReport.detailedBreakdown.software.currentStateAnnual)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">VCF Future State Annual:</span>
                    <span className="ml-2 font-semibold text-indigo-600">{formatCurrency(valueReport.detailedBreakdown.software.vcfFutureStateAnnual)}</span>
                    <span className="text-xs text-gray-500 ml-1">(included in compute)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Compute & Licensing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Server className="w-5 h-5 mr-2 text-indigo-600" />
                  A. Compute & Licensing (Modernization)
                  {window.computeFormulaInfo && (
                    <FormulaInfo {...window.computeFormulaInfo} />
                  )}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> The total cost of compute infrastructure including hardware purchase, annual support, and VCF subscription costs. This is typically the largest cost category in the TCO analysis.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Current state costs are calculated as (hosts × cost per host) × (1 + support %). Future state costs account for consolidation (fewer hosts needed) but add VCF subscription costs. The parallel run period creates temporary "double bubble" costs during migration.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Higher consolidation ratios and lower subscription rates improve ROI. Typical consolidation ratios range from 2:1 (conservative) to 5:1 (aggressive), with 3:1 being a balanced default.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={getFieldClassName('avgCostPerHost')}>
                <SmartInput
                  type="number"
                  value={avgCostPerHost}
                  defaultValue={25000}
                  onChange={(e) => {
                    setAvgCostPerHost(e.target.value)
                    setActiveField('avgCostPerHost')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('avgCostPerHost')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Avg Cost Per Host ($)"
                  placeholder="25000"
                  min="0"
                  step="1000"
                  citation={{
                    rationale: "Average hardware cost per physical host including compute, memory, networking, and initial storage. This represents a typical enterprise-grade server suitable for virtualization workloads. Typical range: $20,000-$35,000 for mid-range servers, $40,000-$60,000 for high-end servers.",
                    source: "Source: IDC Enterprise Server Market Analysis 2024 - Average Mid-Range Server Pricing"
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> $20K-$35K (mid-range), $40K-$60K (high-end). Affects both current and future state costs.
                </p>
              </div>
              
              <div className={getFieldClassName('supportPercentage')}>
                <SmartInput
                  type="number"
                  value={supportPercentage}
                  defaultValue={15}
                  onChange={(e) => {
                    setSupportPercentage(e.target.value)
                    setActiveField('supportPercentage')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('supportPercentage')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Support Percentage (%)"
                  placeholder="15"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.supportPercentage}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 12-20% annually. Applied to hardware costs each year. Higher rates increase TCO.
                </p>
              </div>
              
              <div className={getFieldClassName('consolidationRatio')}>
                <SmartInput
                  type="number"
                  value={consolidationRatio}
                  defaultValue={3.0}
                  onChange={(e) => {
                    setConsolidationRatio(e.target.value)
                    setActiveField('consolidationRatio')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('consolidationRatio')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Consolidation Ratio"
                  placeholder="3.0"
                  min="1"
                  step="0.1"
                  citation={citations.consolidationRatio}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 2-3:1 (conservative), 4-5:1 (aggressive). Higher ratios reduce future host count and improve ROI.
                </p>
              </div>
            </div>
            
            {valueReport.detailedBreakdown.compute && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Calculation Results</h3>
                  {window.computeFormulaInfo && (
                    <FormulaInfo {...window.computeFormulaInfo} />
                  )}
                </div>
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
                    <span className="text-xs text-gray-500 ml-1">
                      (from {totalVMs} VMs ÷ {consolidationRatio}:1 ratio)
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Consolidation Savings:</span>
                    <span className="ml-2 font-semibold text-green-600">
                      {totalHosts - valueReport.detailedBreakdown.compute.vcfHosts} fewer hosts
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Storage */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <HardDrive className="w-5 h-5 mr-2 text-indigo-600" />
                  B. Storage (HCI vs SAN)
                  {window.storageFormulaInfo && (
                    <FormulaInfo {...window.storageFormulaInfo} />
                  )}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> Storage costs comparing external SAN/NAS (current state) versus vSAN HCI (future state). VCF eliminates separate storage hardware costs as storage is integrated into compute nodes.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Current state includes upfront storage purchase cost plus annual maintenance (typically 15%). Future state has $0 CapEx (storage included in compute nodes) but includes minimal support costs (typically 5% of capacity).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Storage consolidation is a major cost savings driver. Eliminating external storage arrays can save 40-60% of storage costs while improving performance and simplifying management.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('currentStorageCostPerGB')}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Current Storage Cost/GB ($)</span>
                    <Tooltip text="Cost per GB for external storage (default: $0.10). Typical range: $0.05-$0.20 depending on storage tier and vendor.">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={currentStorageCostPerGB}
                  onChange={(e) => {
                    setCurrentStorageCostPerGB(e.target.value)
                    setActiveField('currentStorageCostPerGB')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('currentStorageCostPerGB')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.10"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> $0.05-$0.20/GB. Higher costs increase current state TCO. Affects storage savings calculation.
                </p>
              </div>
              
              <div className={getFieldClassName('totalStorageGB')}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <span>Total Storage (GB)</span>
                    <Tooltip text="Total storage capacity in gigabytes. Can be calculated as: Total VMs × Average Storage per VM. Typical: 300GB per VM.">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </Tooltip>
                  </div>
                </label>
                <input
                  type="number"
                  value={totalStorageGB}
                  onChange={(e) => {
                    setTotalStorageGB(e.target.value)
                    setActiveField('totalStorageGB')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('totalStorageGB')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter total storage"
                  min="0"
                  step="1000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Calculation hint:</strong> {totalVMs > 0 ? `${totalVMs} VMs × 300 GB/VM = ${totalVMs * 300} GB` : 'Enter total storage capacity or calculate from VMs × storage per VM'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Network */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Network className="w-5 h-5 mr-2 text-indigo-600" />
                  C. Network (Hardware Elimination)
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> Network hardware costs including physical firewalls and load balancers. VCF eliminates these through software-defined networking (NSX) and Avi Load Balancer.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Current state includes purchase and support costs for physical network appliances. Future state has $0 hardware costs as NSX and Avi provide all networking and load balancing capabilities in software.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Complete hardware elimination provides 100% cost savings in this category. Typical savings range from $50K-$500K depending on infrastructure size.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('physicalFirewallCount')}>
                <SmartInput
                  type="number"
                  value={physicalFirewallCount}
                  defaultValue={0}
                  onChange={(e) => {
                    setPhysicalFirewallCount(e.target.value)
                    setActiveField('physicalFirewallCount')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('physicalFirewallCount')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Physical Firewall Count"
                  placeholder="0"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 2-10 for mid-size, 10-50 for large enterprises. Each firewall costs ~$87K. VCF eliminates these through NSX.
                </p>
              </div>
              
              <div className={getFieldClassName('loadBalancerCount')}>
                <SmartInput
                  type="number"
                  value={loadBalancerCount}
                  defaultValue={0}
                  onChange={(e) => {
                    setLoadBalancerCount(e.target.value)
                    setActiveField('loadBalancerCount')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('loadBalancerCount')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Load Balancer Count"
                  placeholder="0"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 2-8 for most organizations. Each load balancer costs ~$87K. VCF replaces with Avi (software-based).
                </p>
              </div>
            </div>
          </div>
          
          {/* Operational Efficiency */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                  F. Operational Efficiency (Labor)
                  {window.laborFormulaInfo && (
                    <FormulaInfo {...window.laborFormulaInfo} />
                  )}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> Labor cost savings from productivity improvements across IT staff roles. This is often the largest source of value in VCF deployments, typically representing 40-50% of total savings.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Calculates productivity gains for server administrators (40% typical), network administrators (40% typical), and database administrators (varies, 0% if not using DSM). Savings are calculated as (Total Labor Cost × Role Allocation % × Productivity Gain %).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Labor savings are often the largest component of ROI. A 40% productivity gain on a $2M annual labor budget creates $800K in annual savings, which compounds over the analysis period.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className={getFieldClassName('ftes')}>
                <SmartInput
                  type="number"
                  value={ftes}
                  defaultValue={0}
                  onChange={(e) => {
                    setFtes(e.target.value)
                    setActiveField('ftes')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('ftes')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="FTEs (Full-Time Equivalents)"
                  placeholder="Enter FTEs"
                  min="0"
                  step="0.5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this means:</strong> Total number of IT staff (can include part-time as decimals). Typical: 20-100 for mid-size, 100-500 for large enterprises.
                </p>
              </div>
              
              <div className={getFieldClassName('burdenedCostPerFTE')}>
                <SmartInput
                  type="number"
                  value={burdenedCostPerFTE}
                  defaultValue={0}
                  onChange={(e) => {
                    setBurdenedCostPerFTE(e.target.value)
                    setActiveField('burdenedCostPerFTE')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('burdenedCostPerFTE')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Burdened Cost Per FTE ($)"
                  placeholder="Enter burdened cost"
                  min="0"
                  step="1000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this includes:</strong> Salary + benefits + overhead. Typical: $150K-$200K for IT staff. Higher costs increase labor savings potential.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={getFieldClassName('productivityGainServerAdmin')}>
                <SmartInput
                  type="number"
                  value={productivityGainServerAdmin}
                  defaultValue={40}
                  onChange={(e) => {
                    setProductivityGainServerAdmin(e.target.value)
                    setActiveField('productivityGainServerAdmin')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('productivityGainServerAdmin')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Server Admin Productivity Gain (%)"
                  placeholder="40"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.productivityGainServerAdmin}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 30-50%. Represents time saved through automation, self-service, and simplified management.
                </p>
              </div>
              
              <div className={getFieldClassName('productivityGainNetworkAdmin')}>
                <SmartInput
                  type="number"
                  value={productivityGainNetworkAdmin}
                  defaultValue={40}
                  onChange={(e) => {
                    setProductivityGainNetworkAdmin(e.target.value)
                    setActiveField('productivityGainNetworkAdmin')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('productivityGainNetworkAdmin')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Network Admin Productivity Gain (%)"
                  placeholder="40"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.productivityGainNetworkAdmin}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Typical values:</strong> 30-50%. Reflects reduced manual configuration time through software-defined networking.
                </p>
              </div>
              
              <div className={getFieldClassName('productivityGainDBAdmin')}>
                <SmartInput
                  type="number"
                  value={productivityGainDBAdmin}
                  defaultValue={0}
                  onChange={(e) => {
                    setProductivityGainDBAdmin(e.target.value)
                    setActiveField('productivityGainDBAdmin')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('productivityGainDBAdmin')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="DB Admin Productivity Gain (%)"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                  citation={citations.productivityGainDBAdmin}
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Note:</strong> Only applies if Data Services Manager (DSM) is included. Set to 0% if not using DSM. Typical: 30-50% if enabled.
                </p>
              </div>
            </div>
          </div>
          
          {/* Risk Mitigation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                  G. Risk Mitigation (Revenue Protection)
                  {window.riskFormulaInfo && (
                    <FormulaInfo {...window.riskFormulaInfo} />
                  )}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>What this calculates:</strong> Financial value of reduced business risk through improved infrastructure reliability and security. Includes downtime reduction value and security breach risk mitigation.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>How it works:</strong> Downtime protection = (Annual Revenue × Margin %) × Downtime Reduction %. Security protection = (Breach Probability × Avg Breach Cost) × Risk Reduction %. These represent avoided costs rather than direct savings.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact on ROI:</strong> Risk mitigation can add significant value, especially for revenue-generating organizations. A 70% downtime reduction on a $1B revenue company with 10% margin creates $70M in annual value.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={getFieldClassName('annualRevenue')}>
                <SmartInput
                  type="number"
                  value={annualRevenue}
                  defaultValue={0}
                  onChange={(e) => {
                    setAnnualRevenue(e.target.value)
                    setActiveField('annualRevenue')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('annualRevenue')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Annual Revenue ($)"
                  placeholder="Enter annual revenue"
                  min="0"
                  step="100000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this is:</strong> Total company annual revenue from 10-K or financial statements. Used to calculate downtime protection value. Not applicable for government/non-profit.
                </p>
              </div>
              
              <div className={getFieldClassName('marginPercentage')}>
                <SmartInput
                  type="number"
                  value={marginPercentage}
                  defaultValue={0}
                  onChange={(e) => {
                    setMarginPercentage(e.target.value)
                    setActiveField('marginPercentage')
                    setTimeout(() => setActiveField(null), 2000)
                  }}
                  onFocus={() => setActiveField('marginPercentage')}
                  onBlur={() => setTimeout(() => setActiveField(null), 500)}
                  label="Margin Percentage (%)"
                  placeholder="Enter margin %"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>What this is:</strong> Operating margin percentage from financial statements. Typical: 5-15% for most industries. Used with revenue to calculate downtime value.
                </p>
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
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-indigo-100">3-Year NPV</div>
                  {window.npvFormulaInfo && (
                    <FormulaInfo {...window.npvFormulaInfo} />
                  )}
                </div>
                <div className="text-2xl font-bold">{formatCurrency(valueReport.financials.npv3Year)}</div>
                <div className="text-xs text-indigo-200 mt-1">
                  Present value of all future cash flows. Positive = value-creating investment.
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-indigo-100">ROI</div>
                  {window.roiFormulaInfo && (
                    <FormulaInfo {...window.roiFormulaInfo} />
                  )}
                </div>
                <div className="text-2xl font-bold">{valueReport.financials.roi.toFixed(1)}%</div>
                <div className="text-xs text-indigo-200 mt-1">
                  Return on investment. {valueReport.financials.roi > 100 ? 'Excellent' : valueReport.financials.roi > 50 ? 'Good' : 'Moderate'} return.
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-indigo-100">Payback Period</div>
                  {window.paybackFormulaInfo && (
                    <FormulaInfo {...window.paybackFormulaInfo} />
                  )}
                </div>
                <div className="text-2xl font-bold">{valueReport.financials.paybackPeriodMonths.toFixed(1)} months</div>
                <div className="text-xs text-indigo-200 mt-1">
                  Time to recover initial investment. {valueReport.financials.paybackPeriodMonths < 12 ? 'Excellent' : valueReport.financials.paybackPeriodMonths < 24 ? 'Good' : 'Moderate'} payback.
                </div>
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
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{analysisTerm}-Year TCO Comparison</h2>
            <p className="text-sm text-gray-600">
              Visual comparison of Total Cost of Ownership across three scenarios: Current State (legacy infrastructure), VCF Future State (modernized infrastructure), and Public Cloud (alternative option). The chart shows total costs over the {analysisTerm}-year analysis period, helping visualize the financial impact of each option.
            </p>
          </div>
        </div>
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
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Cashflow Analysis</h2>
            <p className="text-sm text-gray-600">
              Year-by-year net cash flow showing the financial impact over time. Year 1 typically shows negative cash flow due to initial investment and parallel run costs ("double bubble"). Years 2-3 show positive cash flow as benefits are realized. This helps understand the timing of returns and cash flow implications for budgeting.
            </p>
          </div>
        </div>
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
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Value Report Summary</h2>
          <p className="text-sm text-gray-600">
            Comprehensive breakdown of costs and savings by category. Shows current state costs, VCF future state costs, and the net savings/value created. This table provides the detailed foundation for the financial metrics (NPV, ROI, Payback) shown above. Each category can be expanded to see calculation details.
          </p>
        </div>
        
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
              {valueReport.detailedBreakdown.facilities && (
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800 font-medium">Facilities/Data Center</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.facilities.currentStateTotal)}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.facilities.vcfTotal)}</td>
                  <td className="py-4 px-4 text-right text-green-600 font-semibold">
                    {formatCurrency(valueReport.detailedBreakdown.facilities.currentStateTotal - valueReport.detailedBreakdown.facilities.vcfTotal)}
                  </td>
                </tr>
              )}
              {valueReport.detailedBreakdown.software && (
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800 font-medium">Software Licensing</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.software.currentStateTotal)}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.software.vcfTotal)}</td>
                  <td className="py-4 px-4 text-right text-green-600 font-semibold">
                    {formatCurrency(valueReport.detailedBreakdown.software.currentStateTotal - valueReport.detailedBreakdown.software.vcfTotal)}
                  </td>
                </tr>
              )}
              {valueReport.detailedBreakdown.migration && (
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800 font-medium">Migration & Implementation</td>
                  <td className="py-4 px-4 text-right text-gray-900">-</td>
                  <td className="py-4 px-4 text-right text-gray-900">{formatCurrency(valueReport.detailedBreakdown.migration.totalCost)}</td>
                  <td className="py-4 px-4 text-right text-red-600 font-semibold">
                    -{formatCurrency(valueReport.detailedBreakdown.migration.totalCost)}
                  </td>
                </tr>
              )}
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
            
            {valueReport.detailedBreakdown.facilities && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-3 text-base">Facilities/Data Center</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current State:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.facilities.currentStateTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VCF Future State:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.facilities.vcfTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Savings:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.facilities.currentStateTotal - valueReport.detailedBreakdown.facilities.vcfTotal)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {valueReport.detailedBreakdown.software && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-3 text-base">Software Licensing</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current State:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.software.currentStateTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VCF Future State:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.software.vcfTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Savings:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(valueReport.detailedBreakdown.software.currentStateTotal - valueReport.detailedBreakdown.software.vcfTotal)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {valueReport.detailedBreakdown.migration && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-3 text-base">Migration & Implementation</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Migration Cost:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.migration.migrationCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Cost:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(valueReport.detailedBreakdown.migration.trainingCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Total One-Time Cost:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(valueReport.detailedBreakdown.migration.totalCost)}</span>
                  </div>
                </div>
              </div>
            )}
            
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
