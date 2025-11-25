// Dummy Customer Database for Demo
// Factory function to generate 50-100 realistic customer records
// Designed to be easily swapped with API calls later

// Parent Companies (5-8 unique parents for hierarchy demonstration)
const parentCompanies = [
  { id: '123456789012345', name: 'GlobalTech Holdings Inc.' },
  { id: '234567890123456', name: 'Enterprise Solutions Group' },
  { id: '345678901234567', name: 'Digital Transformation Corp' },
  { id: '456789012345678', name: 'CloudFirst Industries' },
  { id: '567890123456789', name: 'Innovation Partners LLC' },
  { id: '678901234567890', name: 'Strategic Ventures Ltd' },
  { id: '789012345678901', name: 'Technology Alliance Group' },
  { id: '890123456789012', name: 'NextGen Capital Partners' }
]

// Helper function to generate random 7-digit ERP account number (as string)
const generateErpAccount = () => {
  return String(Math.floor(1000000 + Math.random() * 9000000))
}

// Helper function to generate Sales Org format (e.g., "COMM-APJ-JP")
const generateSalesOrg = (classification, region, country) => {
  const classShort = classification === 'Commercial' ? 'COMM' : classification === 'Strategic' ? 'STRAT' : 'CORP'
  const regionShort = region === 'AMER' ? 'AMR' : region === 'EMEA' ? 'EMEA' : 'APJ'
  const countryCode = country.code || 'US'
  return `${classShort}-${regionShort}-${countryCode}`
}

// Helper function to generate Sales Area
const generateSalesArea = (region, country) => {
  const regionShort = region === 'AMER' ? 'AMR' : region === 'EMEA' ? 'EMEA' : 'APJ'
  return `${regionShort}-${country.code}-AREA`
}

// Helper function to generate Sales Region
const generateSalesRegion = (region) => {
  return `${region}-REGION`
}

// Countries by region
const countriesByRegion = {
  AMER: [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Brazil', code: 'BR' }
  ],
  EMEA: [
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'United Arab Emirates', code: 'AE' }
  ],
  APAC: [
    { name: 'Japan', code: 'JP' },
    { name: 'China', code: 'CN' },
    { name: 'India', code: 'IN' },
    { name: 'Australia', code: 'AU' },
    { name: 'Singapore', code: 'SG' },
    { name: 'South Korea', code: 'KR' }
  ]
}

// Industry Types
const industryTypes = [
  'Technology',
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Telecommunications',
  'Energy & Utilities',
  'Government',
  'Education',
  'Media & Entertainment',
  'Transportation & Logistics',
  'Professional Services',
  'Hospitality',
  'Pharmaceuticals',
  'Insurance'
]

// Company name templates
const companyNameTemplates = [
  'Tech', 'Solutions', 'Systems', 'Services', 'Enterprises', 'Group', 'Corporation', 'Industries',
  'Digital', 'Cloud', 'Data', 'Network', 'Software', 'Infrastructure', 'Platform', 'Innovation',
  'Ventures', 'Capital', 'Holdings', 'Partners', 'Alliance', 'Consortium'
]

const companyPrefixes = [
  'Advanced', 'Global', 'Enterprise', 'Premier', 'Elite', 'Pro', 'Smart', 'NextGen', 'Future',
  'Quantum', 'Nexus', 'Vertex', 'Apex', 'Summit', 'Prime', 'Core', 'Main', 'Alpha', 'Beta',
  'Titan', 'Phoenix', 'Stellar', 'Nova', 'Zenith', 'Pinnacle', 'Crest', 'Peak'
]

// Generate realistic company name
const generateCompanyName = () => {
  const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]
  const template = companyNameTemplates[Math.floor(Math.random() * companyNameTemplates.length)]
  const suffix = Math.random() > 0.5 ? ' Inc.' : Math.random() > 0.5 ? ' LLC' : Math.random() > 0.5 ? ' Ltd.' : ' Corp.'
  return `${prefix} ${template}${suffix}`
}

// Factory function to generate customer data
// This can be easily replaced with an async API call later
export const generateCustomers = (count = 75) => {
  const customers = []
  const classifications = ['Commercial', 'Strategic', 'Corporate']
  const regions = ['AMER', 'EMEA', 'APAC']
  const usedErpAccounts = new Set()
  const usedCompanyNames = new Set()
  
  // Generate 50-100 customers (default 75)
  const customerCount = Math.min(Math.max(50, count), 100)
  
  for (let i = 0; i < customerCount; i++) {
    // Select parent (some customers share parents to show hierarchy)
    const parentIndex = Math.floor(Math.random() * parentCompanies.length)
    const parent = parentCompanies[parentIndex]
    
    // Select classification and region
    const classification = classifications[Math.floor(Math.random() * classifications.length)]
    const region = regions[Math.floor(Math.random() * regions.length)]
    
    // Select country from region
    const countries = countriesByRegion[region]
    const country = countries[Math.floor(Math.random() * countries.length)]
    
    // Select industry type
    const industryType = industryTypes[Math.floor(Math.random() * industryTypes.length)]
    
    // Generate unique company name
    let companyName = generateCompanyName()
    let attempts = 0
    while (usedCompanyNames.has(companyName) && attempts < 20) {
      companyName = generateCompanyName()
      attempts++
    }
    usedCompanyNames.add(companyName)
    
    // Generate unique ERP account
    let erpAccount = generateErpAccount()
    attempts = 0
    while (usedErpAccounts.has(erpAccount) && attempts < 20) {
      erpAccount = generateErpAccount()
      attempts++
    }
    usedErpAccounts.add(erpAccount)
    
    // Generate customer object with correct field names
    const customer = {
      customerName: companyName,
      erpAccountNumber: erpAccount,
      industryType: industryType,
      parentId: parent.id,
      parentName: parent.name,
      classification: classification,
      region: region,
      salesOrg: generateSalesOrg(classification, region, country),
      salesArea: generateSalesArea(region, country),
      salesRegion: generateSalesRegion(region),
      partnerFlag: Math.random() > 0.5
    }
    
    customers.push(customer)
  }
  
  return customers
}

// Generate and export the dummy customer data (75 customers by default)
export const dummyCustomers = generateCustomers(75)

// Export parent companies for reference
export const parentCompaniesList = parentCompanies

// Helper function to get customer by ERP account number
export const getCustomerByErpAccount = (erpAccountNumber) => {
  return dummyCustomers.find(customer => customer.erpAccountNumber === String(erpAccountNumber))
}

// Helper function to get customers by parent
export const getCustomersByParent = (parentId) => {
  return dummyCustomers.filter(customer => customer.parentId === String(parentId))
}

// Search function (can be replaced with API call)
export const searchCustomers = async (query, filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  let results = [...dummyCustomers]
  
  // Apply search query (searches customerName and erpAccountNumber)
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim()
    results = results.filter(customer => 
      customer.customerName.toLowerCase().includes(searchTerm) ||
      customer.erpAccountNumber.includes(searchTerm)
    )
  }
  
  // Apply filters
  if (filters.region && filters.region.length > 0) {
    results = results.filter(customer => filters.region.includes(customer.region))
  }
  
  if (filters.parentName && filters.parentName !== '') {
    results = results.filter(customer => customer.parentName === filters.parentName)
  }
  
  if (filters.salesOrg && filters.salesOrg.trim() !== '') {
    const salesOrgTerm = filters.salesOrg.toLowerCase().trim()
    results = results.filter(customer => 
      customer.salesOrg.toLowerCase().includes(salesOrgTerm)
    )
  }
  
  return results
}
