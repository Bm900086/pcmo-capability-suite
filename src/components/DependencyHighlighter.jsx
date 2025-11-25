import { useEffect, useState } from 'react'
import { GitBranch, X } from 'lucide-react'

/**
 * DependencyHighlighter Component
 * Tracks and visualizes dependencies between inputs and calculations
 */
const DependencyHighlighter = ({ dependencies, activeField, onFieldClick }) => {
  const [highlightedFields, setHighlightedFields] = useState(new Set())
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (activeField && dependencies[activeField]) {
      setHighlightedFields(new Set(dependencies[activeField]))
    } else {
      setHighlightedFields(new Set())
    }
  }, [activeField, dependencies])

  const isHighlighted = (fieldId) => {
    return highlightedFields.has(fieldId) || activeField === fieldId
  }

  const getDependencyPath = (fieldId) => {
    const path = []
    let current = fieldId
    
    while (current && dependencies[current]) {
      path.push(current)
      // Find what depends on this field
      const dependents = Object.entries(dependencies)
        .filter(([_, deps]) => deps.includes(current))
        .map(([key]) => key)
      
      if (dependents.length > 0) {
        current = dependents[0] // Take first dependent
      } else {
        break
      }
    }
    
    return path
  }

  return (
    <>
      {/* Dependency Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setShowMap(false)}>
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                Dependency Map
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(dependencies).map(([fieldId, deps]) => (
                  <div key={fieldId} className="border border-gray-200 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">{fieldId}</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Depends on:</span>
                      <div className="flex flex-wrap gap-2">
                        {deps.map((dep, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200"
                            onClick={() => onFieldClick && onFieldClick(dep)}
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dependency Highlight Wrapper */}
      <div className="dependency-highlighter">
        {/* This will be used to wrap fields and apply highlighting */}
      </div>
    </>
  )
}

/**
 * Hook to use dependency highlighting
 */
export const useDependencyHighlight = (dependencies, activeField) => {
  const [highlightedFields, setHighlightedFields] = useState(new Set())

  useEffect(() => {
    if (activeField && dependencies[activeField]) {
      setHighlightedFields(new Set(dependencies[activeField]))
    } else {
      setHighlightedFields(new Set())
    }
  }, [activeField, dependencies])

  const getFieldClassName = (fieldId) => {
    const baseClasses = "transition-all duration-300"
    
    if (activeField === fieldId) {
      return `${baseClasses} ring-4 ring-indigo-400 ring-opacity-75 shadow-lg`
    }
    
    if (highlightedFields.has(fieldId)) {
      return `${baseClasses} ring-2 ring-blue-300 ring-opacity-50 shadow-md`
    }
    
    return baseClasses
  }

  return { getFieldClassName, highlightedFields }
}

/**
 * Dependency Map Button Component
 */
export const DependencyMapButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
    >
      <GitBranch className="w-4 h-4" />
      <span>View Dependency Map</span>
    </button>
  )
}

export default DependencyHighlighter

