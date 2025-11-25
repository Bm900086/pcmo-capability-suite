import { X, Building2, Hash, Users, MapPin, Tag, Globe, Briefcase, CheckCircle2, XCircle, Factory } from 'lucide-react'

const CustomerDetailsCard = ({ customer, onClose }) => {
  if (!customer) return null
  
  const fieldConfig = [
    { key: 'customerName', label: 'Customer Name', icon: Building2 },
    { key: 'erpAccountNumber', label: 'ERP Account Number', icon: Hash },
    { key: 'industryType', label: 'Industry Type', icon: Factory },
    { key: 'parentId', label: 'Parent ID', icon: Users },
    { key: 'parentName', label: 'Parent Name', icon: Users },
    { key: 'salesOrg', label: 'Sales Org', icon: Briefcase },
    { key: 'salesArea', label: 'Sales Area', icon: MapPin },
    { key: 'salesRegion', label: 'Sales Region', icon: Globe },
    { key: 'classification', label: 'Classification', icon: Tag },
    { key: 'region', label: 'Region', icon: Globe },
    { key: 'partnerFlag', label: 'Partner Flag', icon: customer.partnerFlag ? CheckCircle2 : XCircle }
  ]
  
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-200 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
          <Building2 className="w-5 h-5 md:w-6 md:h-6 mr-2 text-indigo-600 flex-shrink-0" />
          <span>Customer Details</span>
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 active:text-gray-800 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fieldConfig.map(({ key, label, icon: Icon }) => {
          let value = customer[key]
          
          // Format boolean values
          if (key === 'partnerFlag') {
            value = value ? 'Yes' : 'No'
          }
          
          return (
            <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <Icon className={`w-4 h-4 mr-2 ${
                  key === 'partnerFlag' 
                    ? (customer.partnerFlag ? 'text-green-600' : 'text-red-600')
                    : 'text-indigo-600'
                }`} />
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {label}
                </label>
              </div>
              <div className="text-sm font-medium text-gray-900 break-words">
                {value || 'N/A'}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Please verify all fields before proceeding with the assessment. All fields are read-only.
        </p>
      </div>
    </div>
  )
}

export default CustomerDetailsCard

