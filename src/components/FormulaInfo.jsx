import { useState } from 'react'
import { Info, X } from 'lucide-react'

/**
 * FormulaInfo Component
 * Displays detailed information about a formula when the "i" icon is clicked
 */
const FormulaInfo = ({ 
  title, 
  formula, 
  description, 
  components = [], 
  assumptions = [], 
  example = null,
  edgeCases = []
}) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center w-5 h-5 ml-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors"
        title="View formula details"
        aria-label="View formula information"
      >
        <Info className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setIsOpen(false)}>
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center">
            <Info className="w-5 h-5 mr-2" />
            {title}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {description && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Description</h4>
              <p className="text-gray-600">{description}</p>
            </div>
          )}

          {/* Formula */}
          {formula && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Formula</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm">
                <code className="text-indigo-700">{formula}</code>
              </div>
            </div>
          )}

          {/* Components Breakdown */}
          {components.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Component Breakdown</h4>
              <ul className="space-y-2">
                {components.map((component, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">{component.name}:</span>
                      <span className="text-gray-600 ml-2">{component.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Assumptions Used */}
          {assumptions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Assumptions Used</h4>
              <div className="space-y-2">
                {assumptions.map((assumption, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div 
                      className={`w-4 h-4 rounded ${assumption.color || 'bg-gray-400'}`}
                      title={assumption.category}
                    />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">{assumption.name}:</span>
                      <span className="ml-1 text-gray-600">{assumption.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          {example && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Example Calculation</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">{example.description}</p>
                <div className="font-mono text-sm text-gray-800 bg-white p-2 rounded border">
                  {example.calculation}
                </div>
                <p className="text-sm font-semibold text-blue-700 mt-2">Result: {example.result}</p>
              </div>
            </div>
          )}

          {/* Edge Cases */}
          {edgeCases.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Notes & Edge Cases</h4>
              <ul className="space-y-1">
                {edgeCases.map((note, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-amber-600 mr-2">⚠</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 rounded-b-lg">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormulaInfo

