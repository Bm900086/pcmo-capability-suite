import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle2, XCircle, Loader2, AlertCircle, Info } from 'lucide-react'
import FieldExtractionDisplay from './FieldExtractionDisplay'

const RVToolsUpload = ({ onExtractionComplete, extractedFields: externalExtractedFields, onFieldOverride }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [extractedFields, setExtractedFields] = useState(externalExtractedFields || {})
  const [extractionSummary, setExtractionSummary] = useState(null)
  const [showExtraction, setShowExtraction] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validExtensions = ['.xlsx', '.xls', '.xlsm']
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    
    if (!validExtensions.includes(fileExt)) {
      setUploadError(`Invalid file type. Please upload an Excel file (.xlsx, .xls, or .xlsm)`)
      return
    }

    setIsUploading(true)
    setUploadError(null)
    setShowExtraction(false)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Upload file directly (health check removed to simplify)
      const response = await fetch('http://localhost:8001/api/rvtools/process', {
        method: 'POST',
        mode: 'cors',
        body: formData,
        cache: 'no-cache',
        headers: {
          // Don't set Content-Type - browser will set it with boundary for FormData
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
        throw new Error(errorData.detail || `Server error: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'success') {
        // Initialize extracted fields with override tracking
        const fieldsWithOverrides = {}
        Object.keys(data.extracted_fields).forEach(key => {
          fieldsWithOverrides[key] = {
            ...data.extracted_fields[key],
            isOverridden: false,
            originalValue: data.extracted_fields[key].value
          }
        })

        setExtractedFields(fieldsWithOverrides)
        setExtractionSummary(data.summary)
        setShowExtraction(true)

        // Notify parent component
        if (onExtractionComplete) {
          onExtractionComplete(fieldsWithOverrides, data)
        }
      } else {
        throw new Error(data.message || 'Processing failed')
      }
    } catch (error) {
      console.error('RVTools upload error:', error)
      setUploadError(error.message || 'Failed to process RVTools file. Please check that the backend API is running on port 8001.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFieldOverride = (fieldName, newValue) => {
    setExtractedFields(prev => {
      const updated = {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: newValue,
          isOverridden: newValue !== prev[fieldName].originalValue,
          overrideValue: newValue
        }
      }

      // Update summary
      const overrideCount = Object.values(updated).filter(f => f.isOverridden).length
      setExtractionSummary(prev => ({
        ...prev,
        user_overrides: overrideCount
      }))

      // Notify parent
      if (onFieldOverride) {
        onFieldOverride(fieldName, newValue, updated[fieldName])
      }

      return updated
    })
  }

  const handleClearUpload = () => {
    setExtractedFields({})
    setExtractionSummary(null)
    setShowExtraction(false)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (onExtractionComplete) {
      onExtractionComplete({}, null)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">RVTools Excel Upload</h3>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Optional</span>
        </div>
        {showExtraction && (
          <button
            onClick={handleClearUpload}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Upload a raw RVTools Excel export file to automatically extract infrastructure metrics. 
        This is completely optional - if no file is uploaded, you can enter values manually as usual.
      </p>

      {/* Upload Area */}
      {!showExtraction && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.xlsm"
            onChange={handleFileSelect}
            className="hidden"
            id="rvtools-file-input"
            disabled={isUploading}
          />
          <label
            htmlFor="rvtools-file-input"
            className={`cursor-pointer flex flex-col items-center space-y-3 ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <span className="text-sm text-gray-600">Processing RVTools file...</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <div>
                  <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Click to upload
                  </span>
                  <span className="text-sm text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">Excel files (.xlsx, .xls, .xlsm)</p>
              </>
            )}
          </label>
        </div>
      )}

      {/* Error Display */}
      {uploadError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Upload Error</p>
            <p className="text-sm text-red-700 mt-1">{uploadError}</p>
          </div>
        </div>
      )}

      {/* Extraction Results */}
      {showExtraction && extractionSummary && (
        <div className="mt-4">
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">File Processed Successfully</p>
              <p className="text-xs text-green-700 mt-1">
                Extracted {extractionSummary.auto_extracted} fields from RVTools, 
                {extractionSummary.default_assumptions} default assumptions applied
              </p>
            </div>
          </div>

          <FieldExtractionDisplay
            extractedFields={extractedFields}
            onFieldOverride={handleFieldOverride}
            summary={extractionSummary}
          />
        </div>
      )}

      {/* Info Box */}
      {!showExtraction && !isUploading && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> The RVTools file should contain vInfo, vHost, and vMetaData sheets. 
              If a field cannot be extracted, default assumptions will be used. You can override any extracted value.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RVToolsUpload

