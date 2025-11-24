import { AlertTriangle } from 'lucide-react'

const DisclaimerFooter = ({ 
  text = "DISCLAIMER: These figures are high-level estimates for assessment purposes only. They represent potential scenarios based on standard industry benchmarks and do not constitute a guarantee of actual savings, efficiency, or TCO. Actual results may vary based on specific environment configurations."
}) => {
  return (
    <div className="sticky bottom-0 z-30 bg-gray-100 border-t border-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-700 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DisclaimerFooter

