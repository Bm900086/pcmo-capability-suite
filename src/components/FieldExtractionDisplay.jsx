import { useState } from 'react'
import { CheckCircle2, AlertCircle, Edit2, X, Info, FileText } from 'lucide-react'

const FieldExtractionDisplay = ({ extractedFields, onFieldOverride, summary }) => {
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')

  const handleEdit = (fieldName, currentValue) => {
    setEditingField(fieldName)
    setEditValue(currentValue)
  }

  const handleSave = (fieldName) => {
    const numValue = parseFloat(editValue)
    if (!isNaN(numValue)) {
      onFieldOverride(fieldName, numValue)
    }
    setEditingField(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingField(null)
    setEditValue('')
  }

  const getStatusIcon = (field) => {
    if (field.isOverridden) {
      return <Edit2 className="w-4 h-4 text-orange-500" />
    } else if (field.status === 'auto-extracted') {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />
    } else {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (field) => {
    if (field.isOverridden) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
          Override: User modified
        </span>
      )
    } else if (field.status === 'auto-extracted') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          Auto-extracted
        </span>
      )
    } else if (field.status === 'default-assumption') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
          Default assumption
        </span>
      )
    }
    return null
  }

  const formatValue = (value, unit) => {
    if (value === null || value === undefined) return 'N/A'
    
    if (typeof value === 'number') {
      if (unit === 'percentage (0-1)') {
        return `${(value * 100).toFixed(1)}%`
      } else if (unit === 'ratio') {
        return value.toFixed(2) + ':1'
      } else if (value % 1 === 0) {
        return value.toLocaleString()
      } else {
        return value.toFixed(2)
      }
    }
    return String(value)
  }

  const fieldLabels = {
    totalVMs: 'Total VMs (Powered On)',
    totalHosts: 'Total Hosts',
    consolidationRatio: 'vCPU to pCore Ratio',
    totalStorageGB: 'Total Storage (GB)',
    avgCpuUtilization: 'Average CPU Utilization',
    avgRamUtilization: 'Average RAM Utilization',
    avgCoresPerHost: 'Average Cores per Host',
    avgRamGBPerHost: 'Average RAM per Host (GB)',
    avgVcpusPerVM: 'Average vCPUs per VM',
    avgRamGBPerVM: 'Average RAM per VM (GB)',
    avgCostPerHost: 'Average Cost per Host',
    avgPublicCloudCostPerMonth: 'Avg Public Cloud Cost/Month',
    ftes: 'FTEs',
    burdenedCostPerFTE: 'Burdened Cost per FTE'
  }

  return (
    <div className="space-y-4">
      {/* Summary Section */}
      {summary && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Input Summary</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-gray-700">
                <strong className="text-gray-900">{summary.auto_extracted}</strong> Auto-extracted
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">
                <strong className="text-gray-900">{summary.default_assumptions}</strong> Default assumptions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Edit2 className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700">
                <strong className="text-gray-900">{summary.user_overrides}</strong> User overrides
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Fields Display */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Extracted Fields</h4>
        
        {Object.entries(extractedFields).map(([fieldName, field]) => (
          <div
            key={fieldName}
            className={`border rounded-lg p-4 ${
              field.isOverridden
                ? 'border-orange-300 bg-orange-50'
                : field.status === 'auto-extracted'
                ? 'border-green-300 bg-green-50'
                : 'border-yellow-300 bg-yellow-50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {getStatusIcon(field)}
                  <h5 className="text-sm font-medium text-gray-900">
                    {fieldLabels[fieldName] || fieldName}
                  </h5>
                  {getStatusBadge(field)}
                </div>
                
                {/* Value Display/Edit */}
                {editingField === fieldName ? (
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      step={field.unit === 'ratio' ? '0.1' : field.unit === 'percentage (0-1)' ? '0.01' : '1'}
                    />
                    <button
                      onClick={() => handleSave(fieldName)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatValue(field.value, field.unit)}
                    </span>
                    {field.unit && (
                      <span className="text-xs text-gray-500">({field.unit})</span>
                    )}
                    <button
                      onClick={() => handleEdit(fieldName, field.value)}
                      className="ml-auto px-2 py-1 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded"
                    >
                      <Edit2 className="w-3 h-3 inline mr-1" />
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Source Information */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              {field.status === 'auto-extracted' && (
                <div className="text-xs text-gray-600 space-y-1">
                  <div>
                    <strong>Source:</strong> RVTools {field.source_sheet} Sheet / Column '{field.source_column}'
                  </div>
                  {field.calculation && (
                    <div>
                      <strong>Calculation:</strong> {field.calculation}
                    </div>
                  )}
                  {field.description && (
                    <div className="text-gray-500 italic">{field.description}</div>
                  )}
                </div>
              )}
              
              {field.status === 'default-assumption' && (
                <div className="text-xs text-gray-600 space-y-1">
                  <div>
                    <strong>Status:</strong> Default assumption (not available in RVTools)
                  </div>
                  {field.reason && (
                    <div className="text-gray-500 italic">{field.reason}</div>
                  )}
                  {field.description && (
                    <div className="text-gray-500 italic">{field.description}</div>
                  )}
                </div>
              )}

              {field.isOverridden && (
                <div className="text-xs text-orange-700 space-y-1">
                  <div>
                    <strong>Original Value:</strong> {formatValue(field.originalValue, field.unit)}
                  </div>
                  <div>
                    <strong>Override:</strong> User modified this field
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FieldExtractionDisplay

