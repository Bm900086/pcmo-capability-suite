import { useState, useEffect } from 'react'
import { Info, RotateCcw } from 'lucide-react'

const SmartInput = ({
  type = 'text',
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  className = '',
  disabled = false,
  citation = null, // { source: string, rationale: string }
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const isDirty = value !== defaultValue && value !== '' && value !== null && value !== undefined
  
  // Determine input classes
  const baseClasses = "w-full px-4 py-2 border rounded-lg transition-all duration-200"
  const stateClasses = disabled
    ? "bg-gray-100 text-gray-600 cursor-not-allowed border-gray-300"
    : isFocused
    ? "border-blue-500 ring-2 ring-blue-200 bg-white"
    : isDirty
    ? "border-amber-400 bg-amber-50 font-semibold text-gray-900"
    : "border-gray-300 bg-white hover:border-gray-400"
  
  const inputClasses = `${baseClasses} ${stateClasses} ${className}`
  
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <span>{label}</span>
            {citation && (
              <div className="relative inline-block">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
                {showTooltip && (
                  <div className="absolute z-50 w-80 p-3 mt-1 text-xs text-white bg-gray-900 rounded-lg shadow-xl bottom-full left-1/2 transform -translate-x-1/2">
                    <div className="font-semibold mb-2 text-indigo-300">Rationale:</div>
                    <div className="mb-3 leading-relaxed">{citation.rationale}</div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="font-semibold text-amber-300 mb-1">Source:</div>
                      <div className="text-gray-300">{citation.source}</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </label>
      )}
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${inputClasses} text-base md:text-sm min-h-[44px] md:min-h-0 touch-manipulation`}
        {...props}
      />
      {isDirty && !disabled && (
        <div className="mt-1 flex items-center justify-between">
          <div className="text-xs text-amber-700 flex items-center space-x-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span>Modified from default</span>
          </div>
          <button
            type="button"
            onClick={() => onChange({ target: { value: defaultValue } })}
            className="text-xs text-indigo-600 hover:text-indigo-800 active:text-indigo-900 flex items-center space-x-1 transition-colors touch-manipulation min-h-[44px] md:min-h-0 px-2 -mr-2"
            title="Reset to default value"
          >
            <RotateCcw className="w-4 h-4 md:w-3 md:h-3" />
            <span>Reset</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default SmartInput

