import { useState } from 'react'
import { Settings, Info, Edit2, Check, X } from 'lucide-react'
import FormulaInfo from './FormulaInfo'

/**
 * AssumptionPanel Component
 * Displays editable assumptions grouped by category with color coding
 */
const AssumptionPanel = ({ assumptions, onUpdate, isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  const categoryColors = {
    'Financial': 'bg-blue-100 border-blue-300 text-blue-800',
    'Operational': 'bg-green-100 border-green-300 text-green-800',
    'Adoption': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'Risk': 'bg-red-100 border-red-300 text-red-800',
    'System-Inferred': 'bg-gray-100 border-gray-300 text-gray-800'
  }

  const categoryIcons = {
    'Financial': '💰',
    'Operational': '⚙️',
    'Adoption': '👥',
    'Risk': '⚠️',
    'System-Inferred': '🤖'
  }

  const handleEdit = (assumption) => {
    setEditingId(assumption.id)
    setEditValue(assumption.value)
  }

  const handleSave = (id) => {
    onUpdate(id, editValue)
    setEditingId(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  // Group assumptions by category
  const groupedAssumptions = assumptions.reduce((acc, assumption) => {
    const category = assumption.category || 'System-Inferred'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(assumption)
    return acc
  }, {})

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Model Assumptions (Editable)</h2>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {assumptions.length} assumptions
            </span>
          </div>
          <button
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {Object.entries(groupedAssumptions).map(([category, categoryAssumptions]) => (
            <div key={category} className="space-y-3">
              {/* Category Header */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 ${categoryColors[category]}`}>
                <span className="text-lg">{categoryIcons[category] || '📋'}</span>
                <h3 className="font-semibold">{category} Assumptions</h3>
                <span className="text-xs bg-white/50 px-2 py-0.5 rounded">
                  {categoryAssumptions.length}
                </span>
              </div>

              {/* Assumptions List */}
              <div className="space-y-2 ml-4">
                {categoryAssumptions.map((assumption) => (
                  <div
                    key={assumption.id}
                    className={`p-3 rounded-lg border-2 ${categoryColors[category]} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{assumption.name}</span>
                          {assumption.formulaInfo && (
                            <FormulaInfo {...assumption.formulaInfo} />
                          )}
                          {!assumption.formulaInfo && assumption.description && (
                            <div className="group relative">
                              <Info className="w-4 h-4 text-gray-500 cursor-help" />
                              <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-900 rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2">
                                {assumption.description}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {assumption.description && (
                          <p className="text-sm text-gray-700 mb-2">{assumption.description}</p>
                        )}

                        {editingId === assumption.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type={assumption.type || 'number'}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSave(assumption.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-900">
                              {assumption.value}
                              {assumption.unit && <span className="text-sm text-gray-600 ml-1">{assumption.unit}</span>}
                            </span>
                            {assumption.editable !== false && (
                              <button
                                onClick={() => handleEdit(assumption)}
                                className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                title="Edit assumption"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}

                        {assumption.impact && (
                          <p className="text-xs text-gray-600 mt-2 italic">
                            Impact: {assumption.impact}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Color Coding Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {Object.entries(categoryColors).map(([category, colorClass]) => (
                <div key={category} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded border ${colorClass.split(' ')[0]}`} />
                  <span className="text-gray-600">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssumptionPanel

