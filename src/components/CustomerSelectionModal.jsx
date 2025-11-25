import { useState, useEffect, useCallback } from 'react'
import { X, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { searchCustomers, parentCompaniesList } from '../data/dummyData'

const CustomerSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    region: [],
    parentName: '',
    salesOrg: ''
  })
  const [showFilters, setShowFilters] = useState(true)
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchQuery])
  
  // Perform search when query or filters change
  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true)
      try {
        const searchResults = await searchCustomers(debouncedQuery, filters)
        setResults(searchResults)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }
    
    performSearch()
  }, [debouncedQuery, filters])
  
  // Load initial results
  useEffect(() => {
    if (isOpen) {
      const loadInitial = async () => {
        setIsLoading(true)
        try {
          const initialResults = await searchCustomers('', {})
          setResults(initialResults)
        } catch (error) {
          console.error('Load error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      }
      loadInitial()
    }
  }, [isOpen])
  
  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setDebouncedQuery('')
      setFilters({
        region: [],
        parentName: '',
        salesOrg: ''
      })
    }
  }, [isOpen])
  
  const handleRegionToggle = (region) => {
    setFilters(prev => ({
      ...prev,
      region: prev.region.includes(region)
        ? prev.region.filter(r => r !== region)
        : [...prev.region, region]
    }))
  }
  
  const handleParentChange = (e) => {
    setFilters(prev => ({
      ...prev,
      parentName: e.target.value
    }))
  }
  
  const handleSalesOrgChange = (e) => {
    setFilters(prev => ({
      ...prev,
      salesOrg: e.target.value
    }))
  }
  
  const handleRowClick = (customer) => {
    onSelect(customer)
    onClose()
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal - Desktop: Centered, Mobile: Full Screen */}
      <div className="flex min-h-full items-center justify-center p-0 md:p-4">
        <div className="relative bg-white md:rounded-lg shadow-xl w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] flex flex-col">
          {/* Header - Fixed on Mobile */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white sticky top-0 z-20 md:static">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Find Customer</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search Bar - Fixed on Mobile */}
          <div className="p-4 md:p-6 border-b border-gray-200 bg-white sticky top-[73px] md:top-0 z-10 md:static">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer name or ERP account number..."
                className="w-full pl-10 pr-4 py-3 md:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Filters Sidebar - Hidden by default on mobile, shown via toggle */}
            <div className={`w-full md:w-64 border-r border-gray-200 bg-gray-50 overflow-y-auto transition-all ${
              showFilters ? 'block' : 'hidden'
            }`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </h3>
                </div>
                
                {/* Region Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <div className="space-y-2">
                    {['AMER', 'EMEA', 'APAC'].map(region => (
                      <label key={region} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.region.includes(region)}
                          onChange={() => handleRegionToggle(region)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Parent Name Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Company
                  </label>
                  <select
                    value={filters.parentName}
                    onChange={handleParentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="">All Parents</option>
                    {parentCompaniesList.map(parent => (
                      <option key={parent.id} value={parent.name}>
                        {parent.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Sales Org Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales Org
                  </label>
                  <input
                    type="text"
                    value={filters.salesOrg}
                    onChange={handleSalesOrgChange}
                    placeholder="e.g., COMM-APJ-JP"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Results - Desktop: Table, Mobile: Cards */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Searching...</div>
                </div>
              ) : results.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">No customers found</div>
                </div>
              ) : (
                <>
                  {/* Desktop: Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            ERP Account
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Industry Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Parent Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Region
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.map((customer, index) => (
                          <tr
                            key={customer.erpAccountNumber}
                            onClick={() => handleRowClick(customer)}
                            className={`cursor-pointer hover:bg-indigo-50 transition-colors ${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {customer.customerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {customer.erpAccountNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {customer.industryType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {customer.parentName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {customer.region}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Mobile: Card View */}
                  <div className="md:hidden p-4 space-y-3">
                    {results.map((customer) => (
                      <div
                        key={customer.erpAccountNumber}
                        onClick={() => handleRowClick(customer)}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm active:bg-indigo-50 transition-colors touch-manipulation"
                      >
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Name</div>
                            <div className="text-base font-semibold text-gray-900">{customer.customerName}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                            <div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">ERP Account</div>
                              <div className="text-sm text-gray-700">{customer.erpAccountNumber}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Region</div>
                              <div className="text-sm text-gray-700">{customer.region}</div>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-gray-100">
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Industry Type</div>
                            <div className="text-sm text-gray-700">{customer.industryType}</div>
                          </div>
                          <div className="pt-2 border-t border-gray-100">
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Parent Name</div>
                            <div className="text-sm text-gray-700">{customer.parentName}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {/* Results Count */}
              {!isLoading && results.length > 0 && (
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    Showing {results.length} customer{results.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 md:static">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center touch-manipulation min-h-[44px]"
            >
              {showFilters ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Hide Filters</span>
                  <span className="sm:hidden">Hide</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Show Filters</span>
                  <span className="sm:hidden">Filters</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm font-medium touch-manipulation min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSelectionModal

