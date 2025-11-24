import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { CheckCircle2, XCircle, AlertCircle, CheckCircle } from 'lucide-react'

const Readiness = () => {
  const { readiness, updateReadiness } = usePCMO()
  
  // 10 technical requirements checklist
  const [requirements, setRequirements] = useState([
    { id: 1, label: 'vSphere 8.0 or later installed', checked: false },
    { id: 2, label: 'vSAN ReadyNodes configured', checked: false },
    { id: 3, label: 'NSX compatible network infrastructure', checked: false },
    { id: 4, label: 'vCenter Server 8.0 or later', checked: false },
    { id: 5, label: 'Minimum 64GB RAM per host', checked: false },
    { id: 6, label: 'CPU compatibility (Intel Skylake+ or AMD EPYC+)', checked: false },
    { id: 7, label: 'vRealize Suite 8.x installed', checked: false },
    { id: 8, label: 'Storage vMotion enabled', checked: false },
    { id: 9, label: 'Network redundancy configured', checked: false },
    { id: 10, label: 'Backup and recovery solution in place', checked: false }
  ])
  
  // Initialize from context if available
  useEffect(() => {
    if (readiness.gaps && readiness.gaps.length > 0) {
      // If we have gaps data, we can restore state
      // For now, we'll use the checklist state
    }
  }, [])
  
  // Calculate readiness status
  const checkedCount = requirements.filter(req => req.checked).length
  const readinessScore = (checkedCount / 10) * 100
  
  let status = 'not-ready' // Red
  let statusColor = 'red'
  let statusLabel = 'Not Ready'
  let statusIcon = XCircle
  
  if (checkedCount >= 9) {
    status = 'ready' // Green
    statusColor = 'green'
    statusLabel = 'Ready for Upgrade'
    statusIcon = CheckCircle
  } else if (checkedCount >= 6) {
    status = 'warning' // Yellow
    statusColor = 'yellow'
    statusLabel = 'Warning - Review Required'
    statusIcon = AlertCircle
  }
  
  // Update context when requirements change
  useEffect(() => {
    const gaps = requirements.filter(req => !req.checked).map(req => req.label)
    
    // Categorize gaps by severity
    const criticalGaps = gaps.slice(0, Math.min(2, gaps.length))
    const highGaps = gaps.slice(2, Math.min(5, gaps.length))
    const mediumGaps = gaps.slice(5, Math.min(8, gaps.length))
    const lowGaps = gaps.slice(8)
    
    updateReadiness({
      gaps: gaps,
      readinessScore: readinessScore,
      riskMatrix: {
        critical: criticalGaps,
        high: highGaps,
        medium: mediumGaps,
        low: lowGaps
      }
    })
  }, [requirements, readinessScore, updateReadiness])
  
  const handleToggle = (id) => {
    setRequirements(prev => 
      prev.map(req => 
        req.id === id ? { ...req, checked: !req.checked } : req
      )
    )
  }
  
  const getStatusCardStyles = () => {
    if (status === 'ready') {
      return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
    } else if (status === 'warning') {
      return 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
    } else {
      return 'bg-gradient-to-br from-red-500 to-rose-600 text-white'
    }
  }
  
  const getStatusIconColor = () => {
    if (status === 'ready') return 'text-green-100'
    if (status === 'warning') return 'text-yellow-100'
    return 'text-red-100'
  }
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VCF 9.0 Readiness</h1>
        <p className="text-gray-600">Assess your infrastructure readiness for VCF 9.0 upgrade</p>
      </div>
      
      {/* Status Card */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${getStatusCardStyles()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {status === 'ready' && <CheckCircle className="w-12 h-12" />}
            {status === 'warning' && <AlertCircle className="w-12 h-12" />}
            {status === 'not-ready' && <XCircle className="w-12 h-12" />}
            <div>
              <h2 className="text-2xl font-bold mb-1">{statusLabel}</h2>
              <p className="opacity-90">
                {checkedCount} of 10 requirements met ({readinessScore.toFixed(0)}%)
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90 mb-1">Readiness Score</div>
            <div className="text-4xl font-bold">{readinessScore.toFixed(0)}%</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requirements Checklist */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Technical Requirements</h2>
          
          <div className="space-y-3">
            {requirements.map((req) => (
              <div
                key={req.id}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  req.checked
                    ? 'bg-green-50 border-green-300'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleToggle(req.id)}
              >
                <div className="flex-shrink-0">
                  {req.checked ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-800 cursor-pointer">
                    {req.label}
                  </label>
                </div>
                <div className="text-xs text-gray-500">
                  #{req.id}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-lg font-bold text-indigo-600">
                {checkedCount} / 10
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  status === 'ready' ? 'bg-green-500' :
                  status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${readinessScore}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Readiness Details */}
        <div className="space-y-6">
          {/* Status Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Readiness Breakdown</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Completed</span>
                </div>
                <span className="text-lg font-bold text-green-600">{checkedCount}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">Remaining</span>
                </div>
                <span className="text-lg font-bold text-red-600">{10 - checkedCount}</span>
              </div>
            </div>
          </div>
          
          {/* Status Guidelines */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Guidelines</h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Ready (9-10 checked)</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your infrastructure is ready for VCF 9.0 upgrade. Proceed with upgrade planning.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Warning (6-8 checked)</span>
                </div>
                <p className="text-sm text-gray-600">
                  Review remaining requirements before proceeding. Address critical gaps first.
                </p>
              </div>
              
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Not Ready (0-5 checked)</span>
                </div>
                <p className="text-sm text-gray-600">
                  Significant gaps identified. Complete requirements before considering upgrade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Readiness

