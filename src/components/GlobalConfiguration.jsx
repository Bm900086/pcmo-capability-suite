import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { Settings, Search, ChevronDown, ChevronUp, Building2 } from 'lucide-react'
import CustomerSelectionModal from './CustomerSelectionModal'
import CustomerDetailsCard from './CustomerDetailsCard'

const GlobalConfiguration = () => {
  const { 
    globalConfig, 
    updateGlobalConfig,
    customerAnalysisHistory,
    updateCustomerAnalysisHistory
  } = usePCMO()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  
  // Local state - sync with context
  const [analysisTerm, setAnalysisTerm] = useState(globalConfig?.analysisTerm || 3)
  const [totalVMs, setTotalVMs] = useState(globalConfig?.totalVMs || 0)
  const [totalHosts, setTotalHosts] = useState(globalConfig?.totalHosts || 0)
  const [selectedCustomer, setSelectedCustomer] = useState(globalConfig?.selectedCustomer || null)
  
  // Sync local state with context when context changes (from other sources)
  useEffect(() => {
    if (globalConfig) {
      if (globalConfig.analysisTerm !== undefined) setAnalysisTerm(globalConfig.analysisTerm)
      if (globalConfig.totalVMs !== undefined) setTotalVMs(globalConfig.totalVMs)
      if (globalConfig.totalHosts !== undefined) setTotalHosts(globalConfig.totalHosts)
      if (globalConfig.selectedCustomer) setSelectedCustomer(globalConfig.selectedCustomer)
    }
  }, [globalConfig?.analysisTerm, globalConfig?.totalVMs, globalConfig?.totalHosts, globalConfig?.selectedCustomer])
  
  // Handle customer selection
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer)
    
    // Load previous analysis values for this customer if they exist
    const history = customerAnalysisHistory?.[customer.erpAccountNumber]
    if (history) {
      setAnalysisTerm(history.analysisTerm || 3)
      setTotalVMs(history.totalVMs || 0)
      setTotalHosts(history.totalHosts || 0)
    } else {
      // Reset to defaults if no history
      setAnalysisTerm(3)
      setTotalVMs(0)
      setTotalHosts(0)
    }
    
    // Log to console
    console.log('Selected Customer:', customer)
    console.log('Previous Analysis History:', history || 'No previous analysis found')
  }
  
  // Update context when values change
  useEffect(() => {
    updateGlobalConfig({
      selectedCustomer,
      analysisTerm,
      totalVMs,
      totalHosts
    })
  }, [selectedCustomer, analysisTerm, totalVMs, totalHosts, updateGlobalConfig])
  
  // Save to history when customer is selected and values are entered
  useEffect(() => {
    if (selectedCustomer && (analysisTerm !== 3 || totalVMs > 0 || totalHosts > 0)) {
      const history = {
        erpAccountNumber: selectedCustomer.erpAccountNumber,
        customerName: selectedCustomer.customerName,
        analysisTerm,
        totalVMs,
        totalHosts,
        lastUpdated: new Date().toISOString()
      }
      
      updateCustomerAnalysisHistory(selectedCustomer.erpAccountNumber, history)
    }
  }, [selectedCustomer, analysisTerm, totalVMs, totalHosts, updateCustomerAnalysisHistory])
  
  // Clear customer selection
  const handleClearCustomer = () => {
    setSelectedCustomer(null)
    setAnalysisTerm(3)
    setTotalVMs(0)
    setTotalHosts(0)
  }
  
  if (!selectedCustomer) {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 flex-1">
              <Settings className="w-5 h-5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">Global Configuration</h3>
                <p className="text-xs md:text-sm text-indigo-100">Please select a customer to begin analysis</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 transition-colors flex items-center justify-center space-x-2 font-medium shadow-md touch-manipulation min-h-[44px]"
            >
              <Search className="w-4 h-4" />
              <span>Find Customer</span>
            </button>
          </div>
        </div>
        
        <CustomerSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleCustomerSelect}
        />
      </div>
    )
  }
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <CustomerSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCustomerSelect}
      />
      
      {/* Header - Always Visible */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
              <Building2 className="w-5 h-5 flex-shrink-0 mt-1 sm:mt-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-sm md:text-base truncate">{selectedCustomer.customerName}</h3>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded whitespace-nowrap">ERP: {selectedCustomer.erpAccountNumber}</span>
                  {customerAnalysisHistory?.[selectedCustomer.erpAccountNumber] && (
                    <span className="text-xs bg-green-500/20 px-2 py-1 rounded flex items-center whitespace-nowrap">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                      Previous Analysis Found
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-indigo-100 mt-1 break-words">
                  {selectedCustomer.region} • {selectedCustomer.classification} • {selectedCustomer.parentName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg transition-colors text-sm flex items-center space-x-1 touch-manipulation min-h-[44px] min-w-[44px] justify-center"
                title="Change Customer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Change</span>
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Configuration Panel */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Analysis Term */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Analysis Term (Years)
              </label>
              <select
                value={analysisTerm}
                onChange={(e) => setAnalysisTerm(parseInt(e.target.value))}
                className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-base md:text-sm touch-manipulation min-h-[44px] md:min-h-0"
              >
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
              </select>
            </div>
            
            {/* Total VMs */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Total VMs
              </label>
              <input
                type="number"
                value={totalVMs}
                onChange={(e) => setTotalVMs(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-base md:text-sm touch-manipulation min-h-[44px] md:min-h-0"
                placeholder="Enter total VMs"
                min="0"
                step="1"
              />
            </div>
            
            {/* Total Hosts */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Total Hosts (Current)
              </label>
              <input
                type="number"
                value={totalHosts}
                onChange={(e) => setTotalHosts(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-base md:text-sm touch-manipulation min-h-[44px] md:min-h-0"
                placeholder="Enter total hosts"
                min="0"
                step="1"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-end">
              <button
                onClick={handleClearCustomer}
                className="w-full px-4 py-3 md:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm font-medium touch-manipulation min-h-[44px] md:min-h-0"
              >
                Clear Selection
              </button>
            </div>
          </div>
          
          {/* Customer Details Card (Collapsible) */}
          <div className="mt-4">
            <CustomerDetailsCard customer={selectedCustomer} onClose={null} />
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalConfiguration

