import { useState } from 'react'
import { Info, ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react'

const BusinessGuide = ({ 
  context = "This page provides a comprehensive analysis of your organization's cloud infrastructure.",
  action = "Review the assumptions and inputs below, then adjust values as needed to reflect your specific environment.",
  assumptions = "Baseline assumptions are derived from industry standards and typical enterprise configurations."
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    context: false, // Hidden by default on mobile
    action: true,   // Shown by default
    assumptions: false // Hidden by default on mobile
  })
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 md:px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors touch-manipulation"
      >
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <span className="font-semibold text-gray-900 text-sm md:text-base">Business Guide</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          {/* Desktop: Side-by-side layout */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-4">
            {/* Context Section */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Context</h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {context}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Section */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Action</h3>
                  <p className="text-sm text-green-800 leading-relaxed">
                    {action}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Assumptions Section */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Assumptions</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {assumptions}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile: Vertical accordion layout */}
          <div className="md:hidden space-y-3">
            {/* Context Section - Collapsible */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg overflow-hidden">
              <button
                onClick={() => toggleSection('context')}
                className="w-full px-4 py-3 flex items-center justify-between touch-manipulation min-h-[44px]"
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <h3 className="font-semibold text-blue-900 text-left">Context</h3>
                </div>
                {expandedSections.context ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
              {expandedSections.context && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {context}
                  </p>
                </div>
              )}
            </div>
            
            {/* Action Section - Always visible on mobile */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start space-x-2">
                <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Action</h3>
                  <p className="text-sm text-green-800 leading-relaxed">
                    {action}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Assumptions Section - Collapsible */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg overflow-hidden">
              <button
                onClick={() => toggleSection('assumptions')}
                className="w-full px-4 py-3 flex items-center justify-between touch-manipulation min-h-[44px]"
              >
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <h3 className="font-semibold text-amber-900 text-left">Assumptions</h3>
                </div>
                {expandedSections.assumptions ? (
                  <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-600 flex-shrink-0" />
                )}
              </button>
              {expandedSections.assumptions && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {assumptions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessGuide

