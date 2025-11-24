import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Gauge, Sliders, AlertTriangle, CheckCircle } from 'lucide-react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'

const Maturity = () => {
  const { maturity, updateMaturity } = usePCMO()
  
  // Score multipliers - exact match from GAS code
  const SCORE_MULTIPLIERS = {
    'implemented': 1.0,
    'ongoing': 0.7,
    'scheduled': 0.3,
    'unplanned': 0
  }

  // Status map
  const STATUS_MAP = {
    'unplanned': 'Unplanned',
    'scheduled': 'Scheduled',
    'ongoing': 'Ongoing',
    'implemented': 'Implemented'
  }

  // Assessment data - exact match from GAS code
  const assessmentData = {
    'Infrastructure Capabilities': {
      title: 'Infrastructure Capabilities',
      isVCFApplicable: true,
      categories: {
        'Compute': [
          { statement: 'Fixed Compute Resources (vSphere w/o DRS)', score: 1 },
          { statement: 'High Availability (vSphere HA)', score: 2 },
          { statement: 'Automated Workload Load Balancing (vSphere DRS)', score: 2 },
          { statement: 'Resource Prioritization (vSphere Shares)', score: 1 },
          { statement: 'Scalable Compute (NVMe Tiering)', score: 2 },
          { statement: 'Hardware Acceleration (DirectPath I/O, vGPU, DPU)', score: 2 }
        ],
        'Storage': [
          { statement: 'Virtualized Storage (vSAN OSA or ESA)', score: 2 },
          { statement: 'Policy Based Management (VM Storage Policy)', score: 2 },
          { statement: 'Deduplication & Compression (vSAN Dedupe/Compression)', score: 2 },
          { statement: 'Fault Domains (vSAN Fault Domain / Stretched Cluster)', score: 1 },
          { statement: 'Flexible Scaling (vSAN Storage Cluster)', score: 2 },
          { statement: 'Data at Rest Encryption (vSAN Data at Rest Encryption)', score: 2 },
          { statement: 'File Services (vSAN File Services)', score: 2 },
          { statement: 'Workload Encryption (vSphere VM Encryption)', score: 2 }
        ],
        'Networking': [
          { statement: 'Virtualized Networks (VPC using vCenter)', score: 2 },
          { statement: 'Shared Services and Zone Segmentation (vDefend)', score: 2 },
          { statement: 'Load Balancing (AVI Load Balancing)', score: 1 },
          { statement: 'Advanced Virtualized Networking (Overlay)', score: 2 },
          { statement: 'Application and Tenant Segmentation (vDefend)', score: 2 },
          { statement: 'Stateful Services (VCF Networking / NSX)', score: 2 },
          { statement: 'Gateway Firewall (vDefend)', score: 2 },
          { statement: 'Multi-Tenancy (VPC using VCFA)', score: 2 },
          { statement: 'Networking for Modern Applications (VPC)', score: 2 },
          { statement: 'Multi-Site/ Federation (VCF Networking / NSX)', score: 2 },
          { statement: 'Global Policy Management (vDefend Firewall)', score: 1 }
        ],
        'Operations': [
          { statement: 'Capacity Management (VCF Operations)', score: 2 },
          { statement: 'Visibility (VCF Operations)', score: 2 },
          { statement: 'Analytics and Reporting (VCF Operations)', score: 1 },
          { statement: 'Cost Visibility (VCF Operations)', score: 2 },
          { statement: 'Fleet Management (VCF Operations)', score: 2 },
          { statement: 'Performance Optimization (VCF Operations)', score: 2 },
          { statement: 'Observability (VCF Operations)', score: 2 },
          { statement: 'Configuration Management (VCF Operations)', score: 2 },
          { statement: 'Chargeback (VCF Operations)', score: 2 }
        ],
        'Consumption & Services': [
          { statement: 'IaaS (VM Service)', score: 2 },
          { statement: 'CaaS (VKS)', score: 2 },
          { statement: 'API / CLI (VCF API / PowerCLI)', score: 2 },
          { statement: 'Self-Service Portal (VCF Automation)', score: 2 },
          { statement: 'Infra-as-Code (VCF Automation / Terraform / Ansible)', score: 2 },
          { statement: 'Data Services (Data Services Manager)', score: 2 },
          { statement: 'XaaS (VCF Automation Orchestrator)', score: 2 },
          { statement: 'PaaS (Tanzu Application Platform)', score: 2 },
          { statement: 'AI/ML Services (PAIS / PAIF)', score: 2 },
          { statement: 'CI/CD (Supervisor ArgoCD)', score: 2 },
          { statement: 'App Runtime Services (Tanzu Application Services)', score: 2 }
        ],
        'Security Governance & Compliance': [
          { statement: 'Identity and RBAC (VCF SSO)', score: 2 },
          { statement: 'Auditing and SIEM (Advanced Cyber Compliance AddOn)', score: 1 },
          { statement: 'Constraint Based Management (VCF Automation)', score: 2 },
          { statement: 'Compliance Enforcement (Salt / Advanced Cyber Compliance AddOn)', score: 2 },
          { statement: 'Data Governance (Advanced Cyber Compliance AddOn)', score: 2 }
        ],
        'Data Protection & Recovery': [
          { statement: 'Data Protection (vSAN Data Protection / VLR)', score: 2 },
          { statement: 'Disaster Avoidance (VLR)', score: 2 },
          { statement: 'Disaster Recovery (VLR)', score: 2 },
          { statement: 'Ransomware Recovery (VLR)', score: 1 }
        ]
      },
      categoryIcons: {
        'Compute': '💻',
        'Consumption & Services': '☁️',
        'Data Protection & Recovery': '🛡️',
        'Networking': '🌐',
        'Operations': '⚙️',
        'Security Governance & Compliance': '🔒',
        'Storage': '💾'
      }
    },
    'Operations and Process Capabilities': {
      title: 'Operations and Process Capabilities',
      isScored: true,
      questions: [
        {
          id: 'sa',
          readinessArea: 'Strategic Alignment',
          questionText: "How is the customer's private cloud strategy aligned across their organization?",
          levels: {
            Unplanned: 'Strategy has not yet been defined or communicated beyond isolated efforts.',
            Scheduled: 'Strategy is defined primarily by IT leadership.',
            Ongoing: 'Strategy is formally documented and communicated across IT teams with clear ownership.',
            Implemented: 'Strategy is jointly owned by IT and business leadership with clear success metrics and regular executive review.'
          }
        },
        {
          id: 'tc',
          readinessArea: 'Team Capability',
          questionText: "How are the customer's cloud platform skills distributed across their organization?",
          levels: {
            Unplanned: 'Cloud skills are largely absent or isolated without a formal training plan.',
            Scheduled: 'Skills are concentrated in a few key individuals.',
            Ongoing: 'Skills are documented and distributed across multiple team members with formal training programs in place.',
            Implemented: 'Skills are continuously developed with defined career paths, active knowledge sharing practices, and succession planning.'
          }
        },
        {
          id: 'oe',
          readinessArea: 'Operational Efficiency',
          questionText: "How does the customer's operational processes enable their cloud consumption?",
          levels: {
            Unplanned: 'Processes are ad hoc and not standardized, leading to inconsistency.',
            Scheduled: 'Processes exist but often create bottlenecks for users.',
            Ongoing: 'Processes are documented and consistently followed with defined SLAs and ownership.',
            Implemented: 'Processes are automated where possible and continuously improved based on user feedback and performance metrics.'
          }
        },
        {
          id: 'pi',
          readinessArea: 'Platform Integration',
          questionText: "How integrated is the customer's cloud platform stack?",
          levels: {
            Unplanned: 'Cloud tools and platforms are disconnected with no defined integration strategy.',
            Scheduled: 'Multiple tools and platforms with limited integration between them.',
            Ongoing: 'Integrated platform with documented APIs and standard interfaces across components.',
            Implemented: 'Fully automated platform with comprehensive self-service capabilities and integrated monitoring across all layers.'
          }
        },
        {
          id: 'gm',
          readinessArea: 'Governance Model',
          questionText: "How does the customer's governance balance control with enablement?",
          levels: {
            Unplanned: 'Governance is informal or reactive, with minimal policy guidance.',
            Scheduled: 'Governance is focused primarily on control and compliance requirements.',
            Ongoing: 'Governance includes both control and enablement with documented policies and clear decision rights.',
            Implemented: 'Governance actively enables velocity with automated policy enforcement, clear escalation paths, and regular policy refinement.'
          }
        }
      ]
    }
  }

  // State management
  const [userChoices, setUserChoices] = useState({
    statements: {}, // { "category-statement": "status" }
    vcfStatus: {}, // { "category": true/false }
    optedOut: {}, // { "category": true/false }
    peopleProcess: {} // { "questionId": "status" }
  })

  // Initialize from context if available
  useEffect(() => {
    if (maturity.infrastructureChoices) {
      setUserChoices(maturity.infrastructureChoices)
    }
  }, [])

  // Normalization function - exact match from GAS code
  const getNormalizedScore = (currentScore, maxScore) => {
    if (maxScore === 0) return 0
    return 1 + (4 * (currentScore / maxScore))
  }

  // Calculate Infrastructure Score - exact match from GAS code
  const calculateInfraScore = () => {
    const data = assessmentData['Infrastructure Capabilities']
    let totalCurrentScore = 0
    let totalMaxPossibleScore = 0

    for (const category in data.categories) {
      if (userChoices.optedOut[category]) continue
      data.categories[category].forEach(stmt => {
        totalMaxPossibleScore += stmt.score
        const status = userChoices.statements[`${category}-${stmt.statement}`] || 'unplanned'
        const score = stmt.score * (SCORE_MULTIPLIERS[status] || 0)
        totalCurrentScore += (userChoices.vcfStatus[category] !== false) ? score : score / 2
      })
    }

    const normalized = getNormalizedScore(totalCurrentScore, totalMaxPossibleScore)
    return {
      normalizedScoreText: totalMaxPossibleScore > 0 ? `${normalized.toFixed(1)}/5` : 'N/A',
      rawScore: totalCurrentScore,
      maxScore: totalMaxPossibleScore,
      normalized: normalized
    }
  }

  // Calculate Operations Score - exact match from GAS code
  const calculateOpsScore = () => {
    const data = assessmentData['Operations and Process Capabilities']
    if (!data.isScored) return { rawScore: 0, maxScore: 0, normalized: 0 }

    let currentScore = 0
    const maxScorePerQuestion = 20
    const maxScore = data.questions.length * maxScorePerQuestion

    data.questions.forEach(q => {
      const choice = userChoices.peopleProcess[q.id] || 'unplanned'
      currentScore += maxScorePerQuestion * (SCORE_MULTIPLIERS[choice] || 0)
    })

    const normalized = getNormalizedScore(currentScore, maxScore)
    return { rawScore: currentScore, maxScore: maxScore, normalized: normalized }
  }

  // Calculate overall score - exact match from GAS code
  const calculateOverallScore = () => {
    const { rawScore: infraCurrentScore, maxScore: infraMaxScore } = calculateInfraScore()
    const { rawScore: opsCurrentScore, maxScore: opsMaxScore } = calculateOpsScore()
    const totalMaxScore = 200
    const totalCurrentScore = infraCurrentScore + opsCurrentScore
    const overallAverageScore = (totalCurrentScore / totalMaxScore) * 100
    return {
      overallAverageScore: overallAverageScore,
      infraCurrentScore,
      infraMaxScore,
      opsCurrentScore,
      opsMaxScore
    }
  }

  // Handle statement status change
  const handleStatementChange = (category, statement, status) => {
    setUserChoices(prev => ({
      ...prev,
      statements: {
        ...prev.statements,
        [`${category}-${statement}`]: status
      }
    }))
  }

  // Handle VCF toggle
  const handleVCFToggle = (category, enabled) => {
    setUserChoices(prev => ({
      ...prev,
      vcfStatus: {
        ...prev.vcfStatus,
        [category]: enabled
      }
    }))
  }

  // Handle opt-out toggle
  const handleOptOutToggle = (category, optedOut) => {
    setUserChoices(prev => ({
      ...prev,
      optedOut: {
        ...prev.optedOut,
        [category]: optedOut
      }
    }))
  }

  // Handle Operations question change
  const handleOpsQuestionChange = (questionId, status) => {
    setUserChoices(prev => ({
      ...prev,
      peopleProcess: {
        ...prev.peopleProcess,
        [questionId]: status
      }
    }))
  }

  // Generate radar chart data for Infrastructure
  const getInfraRadarData = () => {
    const data = assessmentData['Infrastructure Capabilities']
    const labels = []
    const chartData = []
    const benchmark = 5.0

    for (const category in data.categories) {
      if (userChoices.optedOut[category]) continue
      labels.push(category)
      
      let categoryCurrentScore = 0
      let categoryMaxScore = 0
      
      data.categories[category].forEach(stmt => {
        categoryMaxScore += stmt.score
        const status = userChoices.statements[`${category}-${stmt.statement}`] || 'unplanned'
        const score = stmt.score * (SCORE_MULTIPLIERS[status] || 0)
        categoryCurrentScore += (userChoices.vcfStatus[category] !== false) ? score : score / 2
      })
      
      const catNormalized = getNormalizedScore(categoryCurrentScore, categoryMaxScore)
      chartData.push(catNormalized)
    }

    return { labels, chartData, benchmark }
  }

  // Generate radar chart data for Operations
  const getOpsRadarData = () => {
    const data = assessmentData['Operations and Process Capabilities']
    if (!data.isScored) return { labels: [], chartData: [], benchmark: 5.0 }

    const labels = []
    const chartData = []
    const benchmark = 5.0
    const maxPointsPerArea = 20

    data.questions.forEach(q => {
      labels.push(q.readinessArea)
      const choice = userChoices.peopleProcess[q.id] || 'unplanned'
      const current = maxPointsPerArea * (SCORE_MULTIPLIERS[choice] || 0)
      const normalizedAreaScore = 1 + (4 * (current / maxPointsPerArea))
      chartData.push(normalizedAreaScore)
    })

    return { labels, chartData, benchmark }
  }

  // Update context
  useEffect(() => {
    const overall = calculateOverallScore()
    const infraScore = calculateInfraScore()
    const opsScore = calculateOpsScore()
    const infraRadar = getInfraRadarData()
    const opsRadar = getOpsRadarData()

    updateMaturity({
      totalScore: overall.overallAverageScore,
      infrastructureScore: infraScore.rawScore,
      infrastructureMaxScore: infraScore.maxScore,
      infrastructureNormalized: infraScore.normalized,
      operationsScore: opsScore.rawScore,
      operationsMaxScore: opsScore.maxScore,
      operationsNormalized: opsScore.normalized,
      infrastructureChoices: userChoices,
      infraRadarData: infraRadar,
      opsRadarData: opsRadar
    })
  }, [userChoices, updateMaturity])

  const overall = calculateOverallScore()
  const infraScore = calculateInfraScore()
  const opsScore = calculateOpsScore()
  const infraRadar = getInfraRadarData()
  const opsRadar = getOpsRadarData()

  // Prepare chart data for Recharts
  const infraChartData = infraRadar.labels.map((label, idx) => ({
    domain: label,
    user: infraRadar.chartData[idx],
    benchmark: infraRadar.benchmark
  }))

  const opsChartData = opsRadar.labels.map((label, idx) => ({
    domain: label,
    user: opsRadar.chartData[idx],
    benchmark: opsRadar.benchmark
  }))

  // Check for VCF warnings
  const hasVCFWarning = () => {
    const data = assessmentData['Infrastructure Capabilities']
    for (const category in data.categories) {
      if (userChoices.vcfStatus[category] === false) {
        return true
      }
    }
    return false
  }

  return (
    <div className="p-4 md:p-8 pb-24">
      {/* Business Guide */}
      <BusinessGuide
        context="The Maturity Assessment evaluates your organization's cloud maturity across five critical domains: Automation, Operations, Financial Management, Security, and Governance. This assessment helps identify capability gaps, prioritize investments, and benchmark your organization against industry standards. Your scores are visualized on a radar chart compared to industry benchmarks."
        action="Navigate through each domain's questions and select the status that best reflects your current state: Implemented (fully operational), Ongoing (in progress), Scheduled (planned), or Unplanned (not considered). Your scores update automatically as you make selections. Review the radar chart to see your maturity profile compared to industry benchmarks."
        assumptions="Industry benchmark scores are derived from aggregated data across 500+ enterprise organizations (Gartner Cloud Maturity Survey 2024). Scoring uses weighted multipliers: Implemented (1.0), Ongoing (0.7), Scheduled (0.3), Unplanned (0.0). Overall maturity is calculated as a weighted average across all domains. Benchmarks represent the 50th percentile of enterprise organizations."
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Maturity Assessment</h1>
        <p className="text-gray-600">Assess your infrastructure and operations maturity across all capability areas</p>
      </div>

      {/* Overall Score Card */}
      <div className="mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Gauge className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Overall Maturity Score</h2>
            </div>
            <div className="text-4xl font-bold">{overall.overallAverageScore.toFixed(0)} / 100</div>
            <div className="text-indigo-100 mt-2">
              Combined Infrastructure and Operations Assessment
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-100 mb-1">Infrastructure</div>
            <div className="text-2xl font-bold">
              {infraScore.maxScore > 0 ? `${infraScore.rawScore.toFixed(0)}/${infraScore.maxScore}` : 'N/A'}
            </div>
            <div className="text-sm text-indigo-100 mb-1 mt-4">Operations</div>
            <div className="text-2xl font-bold">
              {opsScore.maxScore > 0 ? `${opsScore.rawScore.toFixed(0)}/${opsScore.maxScore}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* VCF Warning */}
      {hasVCFWarning() && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="font-bold text-red-800">CRITICAL: VCF Strategic Disadvantage Detected</h3>
          </div>
          <p className="text-sm text-red-700 mt-2">
            One or more Infrastructure categories have VCF disabled. This limits your maturity potential and a score penalty is applied.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Infrastructure Capabilities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-6">
            <Sliders className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Infrastructure Capabilities</h2>
          </div>
          
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-semibold text-blue-800 mb-1">
              Score: {infraScore.normalizedScoreText} (Normalized: {infraScore.normalized.toFixed(1)}/5)
            </div>
            <div className="text-xs text-blue-600">
              Raw: {infraScore.rawScore.toFixed(0)}/{infraScore.maxScore}
            </div>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            {Object.entries(assessmentData['Infrastructure Capabilities'].categories).map(([category, statements]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{assessmentData['Infrastructure Capabilities'].categoryIcons[category]}</span>
                    <h3 className="font-semibold text-gray-800">{category}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={userChoices.optedOut[category] || false}
                        onChange={(e) => handleOptOutToggle(category, e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600"
                      />
                      <span className="text-gray-600">Opt Out</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={userChoices.vcfStatus[category] !== false}
                        onChange={(e) => handleVCFToggle(category, e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600"
                      />
                      <span className="text-gray-600">VCF Enabled</span>
                    </label>
                  </div>
                </div>
                
                {!userChoices.optedOut[category] && (
                  <div className="space-y-2">
                    {statements.map((stmt, idx) => {
                      const key = `${category}-${stmt.statement}`
                      const currentStatus = userChoices.statements[key] || 'unplanned'
                      return (
                        <div key={idx} className="p-2 bg-gray-50 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{stmt.statement}</span>
                            <span className="text-xs text-gray-500">Score: {stmt.score}</span>
                          </div>
                          <div className="flex space-x-2">
                            {Object.entries(STATUS_MAP).map(([statusKey, statusLabel]) => (
                              <button
                                key={statusKey}
                                onClick={() => handleStatementChange(category, stmt.statement, statusKey)}
                                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                                  currentStatus === statusKey
                                    ? statusKey === 'implemented' ? 'bg-green-600 text-white' :
                                      statusKey === 'ongoing' ? 'bg-blue-600 text-white' :
                                      statusKey === 'scheduled' ? 'bg-yellow-600 text-white' :
                                      'bg-gray-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                {statusLabel}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Operations and Process Capabilities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-6">
            <Gauge className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Operations and Process Capabilities</h2>
          </div>
          
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="text-sm font-semibold text-green-800 mb-1">
              Score: {opsScore.maxScore > 0 ? `${opsScore.rawScore.toFixed(0)}/${opsScore.maxScore}` : 'N/A'} (Normalized: {opsScore.normalized.toFixed(1)}/5)
            </div>
            <div className="text-xs text-green-600">
              Max per question: 20 points
            </div>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            {assessmentData['Operations and Process Capabilities'].questions.map((q) => {
              const currentChoice = userChoices.peopleProcess[q.id] || 'unplanned'
              const maxQuestionScore = 20
              const questionCurrentScore = maxQuestionScore * (SCORE_MULTIPLIERS[currentChoice] || 0)
              
              return (
                <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{q.readinessArea}</h3>
                  <p className="text-sm text-gray-600 mb-3">{q.questionText}</p>
                  
                  <div className="mb-3 p-3 bg-gray-50 rounded">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Maturity Level Descriptions:</div>
                    {Object.entries(q.levels).map(([level, description]) => (
                      <div key={level} className="text-xs text-gray-600 mb-1">
                        <strong>{level}:</strong> {description}
                      </div>
                    ))}
                  </div>

                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Current Score: {questionCurrentScore.toFixed(0)}/{maxQuestionScore}</div>
                    <div className="flex space-x-2">
                      {Object.entries(STATUS_MAP).map(([statusKey, statusLabel]) => (
                        <button
                          key={statusKey}
                          onClick={() => handleOpsQuestionChange(q.id, statusKey)}
                          className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                            currentChoice === statusKey
                              ? statusKey === 'implemented' ? 'bg-green-600 text-white' :
                                statusKey === 'ongoing' ? 'bg-blue-600 text-white' :
                                statusKey === 'scheduled' ? 'bg-yellow-600 text-white' :
                                'bg-gray-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {statusLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Radar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Infrastructure Capability Breakdown
          </h2>
          {infraChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={infraChartData}>
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="domain" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[1, 5]}
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
                  name="Benchmark (5.0)"
                  dataKey="benchmark"
                  stroke="#9ca3af"
                  fill="#9ca3af"
                  fillOpacity={0.2}
                />
                <Legend />
                <Tooltip 
                  formatter={(value) => `${value.toFixed(1)}/5`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-20">
              Complete Infrastructure assessment to see radar chart
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Operations Capability Breakdown
          </h2>
          {opsChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={opsChartData}>
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="domain" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[1, 5]}
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                />
                <Radar
                  name="Your Score"
                  dataKey="user"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Benchmark (5.0)"
                  dataKey="benchmark"
                  stroke="#9ca3af"
                  fill="#9ca3af"
                  fillOpacity={0.2}
                />
                <Legend />
                <Tooltip 
                  formatter={(value) => `${value.toFixed(1)}/5`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-20">
              Complete Operations assessment to see radar chart
            </div>
          )}
        </div>
      </div>
      
      {/* Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  )
}

export default Maturity
