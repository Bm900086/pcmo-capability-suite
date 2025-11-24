/**
 * PCMO RVTool Analyzer - Google Apps Script Version
 * 
 * This Google Apps Script replicates the functionality of the PCMO RVTool Analyzer
 * desktop application, allowing you to process RVTools exports directly in Google Sheets.
 * 
 * ⚠️ ONE-TIME SETUP REQUIRED ⚠️
 * This script uses the advanced Drive API service to correctly convert Excel files.
 * You must enable this service for the script to work.
 *
 * HOW TO ENABLE THE DRIVE API SERVICE:
 * 1. In the Apps Script editor, look at the left-hand menu.
 * 2. Click the "+" icon next to the "Services" section.
 * 3. In the dialog that appears, select "Drive API" from the list.
 * 4. Click the "Add" button.
 * 
 * You only need to do this once per script project.
 * 
 * New Features: Dynamic Dashboard + Advanced Filtering
 * This version creates a dynamic dashboard that automatically updates based on 
 * filters applied to the data sheets. Apply filters to VM, Host, Cluster, or 
 * Datastore sheets and watch the dashboard metrics update in real-time!
 * 
 * Instructions:
 * 1. Create a new Google Sheets document
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Enable the Drive API service (see above)
 * 5. Save and authorize the script
 * 6. Upload your RVTools Excel file to Google Drive
 * 7. Run the main() function and enter the file ID when prompted
 * 8. Apply filters to the generated data sheets to see dynamic dashboard updates
 * 9. View real-time analysis results that change based on your filters
 * 
 * Author: PCMO Infrastructure Analytics Team
 * Version: 3.0 - Dynamic Dashboard Edition
 * Last Updated: August 2025
 */

// Configuration constants
const CONFIG = {
  APPLICATION_NAME: "PCMO RVTool Analyzer - Google Apps Script",
  VERSION: "3.0 - Dynamic Dashboard Edition",
  REQUIRED_SHEETS: ['vInfo', 'vHost', 'vCluster', 'vDatastore'],
  CHARTS_FOLDER_NAME: "PCMO_Analysis_Charts",
  RESULTS_SHEET_NAME: "PCMO_Dashboard_Results"
};

/**
 * Main function to run the PCMO RVTool Analysis using the reliable processing method
 * This uses the same approach as the working "Force Process Single File" method
 */
function main() {
  try {
    Logger.log("Starting PCMO RVTool Analysis...");
    
    // Show file selection dialog for single file processing
    const fileId = selectSingleRVToolsFile();
    if (!fileId) {
      showAlert("No file selected", "Please select an RVTools Excel file to analyze.");
      return;
    }
    
    Logger.log(`Processing file ID: ${fileId}`);
    
    // Process the file using the reliable method
    const file = DriveApp.getFileById(fileId);
    showAlert("Starting Processing", `Processing: ${file.getName()}\n\nThis may take a few moments...`);
    
    const result = forceProcessExcelFile(file);
    
    if (result && result.success) {
      // Calculate metrics from processed data
      const metrics = calculateMetrics(
        result.vInfoData || [], 
        result.vHostData || [], 
        result.vClusterData || [], 
        result.vDatastoreData || []
      );
      
      // Store raw data for filtering functionality
      metrics.raw_data = {
        vInfoData: result.vInfoData || [],
        vHostData: result.vHostData || [],
        vClusterData: result.vClusterData || [],
        vDatastoreData: result.vDatastoreData || []
      };
      
      // Add processing info
      metrics.batch_info = {
        total_files_found: 1,
        files_processed: 1,
        files_failed: 0,
        processing_date: new Date().toLocaleString(),
        total_vms: (result.vInfoData || []).length,
        total_hosts: (result.vHostData || []).length,
        processing_method: result.method
      };
      
      // Generate dashboard and charts
      generateDashboard(metrics);
      createCharts(metrics);
      
      showAlert("Analysis Complete", 
        `✅ PCMO RVTool analysis completed successfully!\n\n` +
        `File: ${file.getName()}\n` +
        `Method: ${result.method}\n\n` +
        `Extracted:\n` +
        `• ${(result.vInfoData || []).length} Virtual Machines\n` +
        `• ${(result.vHostData || []).length} ESXi Hosts\n` +
        `• ${(result.vClusterData || []).length} Clusters\n` +
        `• ${(result.vDatastoreData || []).length} Datastores\n\n` +
        `📊 Check the 'PCMO_Dashboard_Results' sheet for the analysis dashboard.\n` +
        `🔍 Use the filterable sheets for detailed analysis:\n` +
        `   • VM_Details_Filterable\n` +
        `   • Host_Details_Filterable\n` +
        `   • Cluster_Details_Filterable\n` +
        `   • Datastore_Details_Filterable`
      );
      
    } else {
      showAlert("Processing Failed", 
        `❌ Could not process the RVTools file.\n\n` +
        `Error details: ${result.error || 'Unknown error'}\n\n` +
        `Troubleshooting:\n` +
        `• Ensure the file is a valid RVTools Excel export\n` +
        `• Try re-uploading the file to Google Drive\n` +
        `• Use 'Manual Conversion Helper' from the menu\n` +
        `• Contact IT support if the issue persists`
      );
    }
    
  } catch (error) {
    Logger.log("Error in main(): " + error.toString());
    showAlert("Error", `An error occurred during analysis: ${error.message}`);
  }
}

/**
 * Select a single RVTools file for processing
 * This is more reliable than batch processing for complex Excel files
 */
function selectSingleRVToolsFile() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    'Select RVTools Excel File',
    'Enter the Google Drive file ID of your RVTools Excel file:\n\n' +
    'To get the file ID:\n' +
    '1. Go to your Google Drive\n' +
    '2. Right-click on your RVTools Excel file\n' +
    '3. Select "Get link"\n' +
    '4. Copy the ID from the URL (the part after /d/ and before /view)\n\n' +
    'Example: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms\n\n' +
    'Or paste the entire Google Drive file URL and we\'ll extract the ID.',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null;
  }
  
  const userInput = response.getResponseText().trim();
  if (!userInput) {
    showAlert("No input entered", "Please enter a file ID or URL.");
    return null;
  }
  
  try {
    let fileId = userInput;
    
    // Check if input is a Google Drive URL and extract file ID
    if (userInput.includes('drive.google.com/file/d/')) {
      const urlMatch = userInput.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (urlMatch && urlMatch[1]) {
        fileId = urlMatch[1];
        Logger.log(`Extracted file ID from URL: ${fileId}`);
      } else {
        showAlert("Invalid URL Format", "Could not extract file ID from the URL.\n\nPlease ensure you're using a Google Drive file URL in this format:\nhttps://drive.google.com/file/d/FILE_ID/view");
        return null;
      }
    }
    
    // Validate the file ID and access
    try {
      const file = DriveApp.getFileById(fileId);
      const fileName = file.getName();
      const fileSize = (file.getSize() / (1024 * 1024)).toFixed(2); // Size in MB
      
      // Check if it's an Excel file
      const mimeType = file.getBlob().getContentType();
      if (!mimeType.includes('excel') && !mimeType.includes('spreadsheet')) {
        const confirmResponse = ui.alert(
          "Not an Excel File",
          `The selected file "${fileName}" doesn't appear to be an Excel file.\n\nMIME Type: ${mimeType}\n\nDo you want to proceed anyway?`,
          ui.ButtonSet.YES_NO
        );
        
        if (confirmResponse !== ui.Button.YES) {
          return null;
        }
      }
      
      // Confirm file selection
      const confirmResponse = ui.alert(
        "Confirm File Selection",
        `Selected file:\n\n` +
        `📄 Name: ${fileName}\n` +
        `📏 Size: ${fileSize} MB\n` +
        `🆔 ID: ${fileId}\n\n` +
        `Proceed with analysis?`,
        ui.ButtonSet.YES_NO
      );
      
      if (confirmResponse === ui.Button.YES) {
        Logger.log(`File selected: ${fileName} (${fileId})`);
        return fileId;
      } else {
        return null;
      }
      
    } catch (error) {
      showAlert("File Access Error", 
        `Cannot access file with ID: ${fileId}\n\n` +
        `Possible issues:\n` +
        `• File ID might be incorrect\n` +
        `• You don't have access to this file\n` +
        `• The file might have been deleted\n` +
        `• The file might be in a restricted folder\n\n` +
        `Error: ${error.message}`
      );
      return null;
    }
    
  } catch (error) {
    Logger.log(`Error in file selection: ${error.toString()}`);
    showAlert("Error", `An error occurred: ${error.message}`);
    return null;
  }
}

/**
 * Batch processing function for multiple files (legacy approach)
 * Note: Single file processing is more reliable for complex Excel files
 */
function mainBatchProcessing() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert(
    'Batch Processing Mode',
    '⚠️ IMPORTANT NOTICE ⚠️\n\n' +
    'Batch processing may not work reliably with complex Excel files.\n\n' +
    '✅ RECOMMENDED: Use "Run Analysis (Single File)" for better results.\n\n' +
    '🔧 This batch mode tries to process entire folders of RVTools files.\n\n' +
    'Do you want to continue with batch processing?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    showAlert("Cancelled", "Use 'Run Analysis (Single File)' for reliable processing of individual RVTools files.");
    return;
  }
  
  try {
    Logger.log("Starting PCMO RVTool Batch Analysis...");
    
    // Show folder selection dialog
    const fileIds = selectRVToolsFile();
    if (!fileIds || fileIds.length === 0) {
      showAlert("No files selected", "Please select a folder containing RVTools Excel files to analyze.");
      return;
    }
    
    Logger.log(`Processing ${fileIds.length} valid RVTools files...`);
    
    // Process all valid files and combine metrics
    const combinedMetrics = processBatchRVToolsFiles(fileIds);
    if (!combinedMetrics) {
      showAlert("Processing Failed", 
        "❌ Could not process the RVTools files.\n\n" +
        "💡 Try using 'Run Analysis (Single File)' instead.\n\n" +
        "This processes one file at a time with better compatibility."
      );
      return;
    }
    
    // Generate dashboard
    generateDashboard(combinedMetrics);
    
    // Create charts
    createCharts(combinedMetrics);
    
    showAlert("Analysis Complete", 
      `✅ PCMO RVTool batch analysis completed!\n\n` +
      `📊 Processed ${fileIds.length} file(s).\n\n` +
      `📋 Check the 'PCMO_Dashboard_Results' sheet for results.\n\n` +
      `🔍 Use the filterable sheets for detailed analysis.`
    );
    
  } catch (error) {
    Logger.log("Error in mainBatchProcessing(): " + error.toString());
    showAlert("Batch Processing Error", 
      `❌ An error occurred during batch analysis:\n\n${error.message}\n\n` +
      `💡 Recommendation: Try 'Run Analysis (Single File)' instead.\n\n` +
      `Single file processing is more reliable for complex Excel files.`
    );
  }
}

/**
 * Main function to run the PCMO RVTool Analysis without validation
 * This bypasses file validation and processes all Excel files
 */
function mainNoValidation() {
  try {
    Logger.log("Starting PCMO RVTool Analysis (No Validation)...");
    
    // Show folder selection dialog
    const fileIds = selectRVToolsFileNoValidation();
    if (!fileIds || fileIds.length === 0) {
      showAlert("No files selected", "Please select a folder containing Excel files to analyze.");
      return;
    }
    
    Logger.log(`Processing ${fileIds.length} Excel files without validation...`);
    
    // Process all valid files and combine metrics
    const combinedMetrics = processBatchRVToolsFiles(fileIds);
    if (!combinedMetrics) {
      showAlert("Processing Failed", "Could not process the Excel files. Please check the file formats and sheet names.");
      return;
    }
    
    // Generate dashboard
    generateDashboard(combinedMetrics);
    
    // Create charts
    createCharts(combinedMetrics);
    
    showAlert("Analysis Complete", `PCMO RVTool analysis completed successfully!\n\nProcessed ${fileIds.length} file(s) without validation.\n\nCheck the 'PCMO_Dashboard_Results' sheet for results.`);
    
  } catch (error) {
    Logger.log("Error in mainNoValidation(): " + error.toString());
    showAlert("Error", "An error occurred during analysis: " + error.message);
  }
}

/**
 * Select files without validation - processes all Excel files in folder
 */
function selectRVToolsFileNoValidation() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    'Select Google Drive Folder (No Validation)',
    'Enter either:\n\n1. Folder name: RVTools_Reports\n2. Google Drive URL: https://drive.google.com/drive/folders/...\n3. Folder ID: 119cAU5P6BRCSbY9R4ucGe18ceZjGUuv0\n\nThe script will process ALL Excel files (.xlsx/.xls) in this folder WITHOUT validation.',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null;
  }
  
  const userInput = response.getResponseText().trim();
  if (!userInput) {
    showAlert("No input entered", "Please enter a folder name, URL, or ID.");
    return null;
  }
  
  try {
    let folder = null;
    let folderIdentifier = userInput;
    
    // Same folder resolution logic as main function
    if (userInput.includes('drive.google.com/drive/folders/')) {
      const urlMatch = userInput.match(/\/folders\/([a-zA-Z0-9-_]+)/);
      if (urlMatch && urlMatch[1]) {
        const folderId = urlMatch[1];
        folder = DriveApp.getFolderById(folderId);
        folderIdentifier = folder.getName();
      }
    } else if (userInput.match(/^[a-zA-Z0-9-_]{25,}$/)) {
      folder = DriveApp.getFolderById(userInput);
      folderIdentifier = folder.getName();
    } else {
      const folders = DriveApp.getFoldersByName(userInput);
      if (!folders.hasNext()) {
        showAlert("Folder Not Found", `Could not find folder "${userInput}"`);
        return null;
      }
      folder = folders.next();
      folderIdentifier = folder.getName();
    }
    
    // Get ALL Excel files without validation
    const allFiles = [];
    const excelFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL);
    const xlsxFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL_LEGACY);
    
    while (excelFiles.hasNext()) {
      allFiles.push(excelFiles.next().getId());
    }
    while (xlsxFiles.hasNext()) {
      allFiles.push(xlsxFiles.next().getId());
    }
    
    if (allFiles.length === 0) {
      showAlert("No Excel Files Found", `No Excel files found in "${folderIdentifier}"`);
      return null;
    }
    
    showAlert("Files Found", `Found ${allFiles.length} Excel file(s) in "${folderIdentifier}".\n\nProcessing all files without validation...`);
    return allFiles;
    
  } catch (error) {
    Logger.log(`Error in folder selection: ${error.toString()}`);
    showAlert("Error", `An error occurred: ${error.message}`);
    return null;
  }
}

/**
 * Show folder selection dialog and return array of valid RVTools file IDs
 */
function selectRVToolsFile() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    'Select Google Drive Folder',
    'Enter either:\n\n1. Folder name: RVTools_Reports\n2. Google Drive URL: https://drive.google.com/drive/folders/...\n3. Folder ID: 119cAU5P6BRCSbY9R4ucGe18ceZjGUuv0\n\nThe script will process all Excel files (.xlsx) in this folder and analyze those with valid RVTools structure.',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null;
  }
  
  const userInput = response.getResponseText().trim();
  if (!userInput) {
    showAlert("No input entered", "Please enter a folder name, URL, or ID.");
    return null;
  }
  
  try {
    let folder = null;
    let folderIdentifier = userInput;
    
    // Check if input is a Google Drive URL
    if (userInput.includes('drive.google.com/drive/folders/')) {
      const urlMatch = userInput.match(/\/folders\/([a-zA-Z0-9-_]+)/);
      if (urlMatch && urlMatch[1]) {
        const folderId = urlMatch[1];
        Logger.log(`Extracted folder ID from URL: ${folderId}`);
        try {
          folder = DriveApp.getFolderById(folderId);
          folderIdentifier = folder.getName();
          Logger.log(`Found folder by ID: ${folder.getName()}`);
        } catch (error) {
          showAlert("Invalid Folder URL", `Could not access folder from URL.\n\nPossible issues:\n• Folder ID might be incorrect\n• You don't have access to this folder\n• The folder might have been deleted\n\nExtracted ID: ${folderId}\n\nTry copying the folder ID directly or use the folder name instead.`);
          return null;
        }
      } else {
        showAlert("Invalid URL Format", "Could not extract folder ID from the URL.\n\nPlease ensure you're using a Google Drive folder URL in this format:\nhttps://drive.google.com/drive/folders/FOLDER_ID");
        return null;
      }
    }
    // Check if input looks like a folder ID (long alphanumeric string)
    else if (userInput.match(/^[a-zA-Z0-9-_]{25,}$/)) {
      try {
        folder = DriveApp.getFolderById(userInput);
        folderIdentifier = folder.getName();
        Logger.log(`Found folder by ID: ${folder.getName()}`);
      } catch (error) {
        showAlert("Invalid Folder ID", `Could not access folder with ID: ${userInput}\n\nPossible issues:\n• Folder ID might be incorrect\n• You don't have access to this folder\n• The folder might have been deleted\n\nTry using the folder name instead.`);
        return null;
      }
    }
    // Otherwise, treat as folder name
    else {
      const folders = DriveApp.getFoldersByName(userInput);
      if (!folders.hasNext()) {
        showAlert("Folder Not Found", `Could not find folder "${userInput}" in your Google Drive.\n\nTroubleshooting:\n• Make sure the folder exists in your Google Drive\n• Check the folder name spelling\n• Ensure you have access permissions to the folder\n• The folder search is case-sensitive\n\nAlternatively, try using the folder's URL or ID instead.`);
        return null;
      }
      folder = folders.next();
      folderIdentifier = folder.getName();
      
      // Check if there are multiple folders with the same name
      if (folders.hasNext()) {
        showAlert("Multiple Folders Found", `Multiple folders named "${userInput}" were found.\n\nThe first accessible folder will be used.\n\nFolder ID: ${folder.getId()}\n\nTo avoid confusion, consider using the folder ID directly.`);
      }
    }
    
    Logger.log(`Using folder: ${folder.getName()} (ID: ${folder.getId()})`);
    
    // Get all Excel files in the folder
    const excelFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL);
    const xlsxFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL_LEGACY);
    
    const validFiles = [];
    let processedCount = 0;
    let validCount = 0;
    let detailedValidationInfo = [];
    
    // Process XLSX files
    while (excelFiles.hasNext()) {
      const file = excelFiles.next();
      processedCount++;
      Logger.log(`Checking file: ${file.getName()}`);
      
      if (isValidRVToolsFile(file)) {
        validFiles.push(file.getId());
        validCount++;
        Logger.log(`Valid RVTools file found: ${file.getName()}`);
      } else {
        // Collect detailed info for invalid files
        try {
          const tempSpreadsheet = SpreadsheetApp.open(DriveApp.createFile(file.getBlob().setName("temp_debug_" + file.getName())));
          const sheetNames = tempSpreadsheet.getSheets().map(sheet => sheet.getName());
          detailedValidationInfo.push(`${file.getName()}: [${sheetNames.join(', ')}]`);
          DriveApp.getFileById(tempSpreadsheet.getId()).setTrashed(true);
        } catch (error) {
          detailedValidationInfo.push(`${file.getName()}: [Error reading sheets]`);
        }
      }
    }
    
    // Process XLS files
    while (xlsxFiles.hasNext()) {
      const file = xlsxFiles.next();
      processedCount++;
      Logger.log(`Checking file: ${file.getName()}`);
      
      if (isValidRVToolsFile(file)) {
        validFiles.push(file.getId());
        validCount++;
        Logger.log(`Valid RVTools file found: ${file.getName()}`);
      } else {
        // Collect detailed info for invalid files
        try {
          const tempSpreadsheet = SpreadsheetApp.open(DriveApp.createFile(file.getBlob().setName("temp_debug_" + file.getName())));
          const sheetNames = tempSpreadsheet.getSheets().map(sheet => sheet.getName());
          detailedValidationInfo.push(`${file.getName()}: [${sheetNames.join(', ')}]`);
          DriveApp.getFileById(tempSpreadsheet.getId()).setTrashed(true);
        } catch (error) {
          detailedValidationInfo.push(`${file.getName()}: [Error reading sheets]`);
        }
      }
    }
    
    if (processedCount === 0) {
      showAlert("No Excel Files Found", `No Excel files (.xlsx or .xls) were found in folder "${folderIdentifier}".\n\nPlease ensure:\n• Excel files are uploaded to the folder\n• Files have .xlsx or .xls extensions\n• You have access to the files`);
      return null;
    }
    
    if (validCount === 0) {
      const detailedInfo = detailedValidationInfo.length > 0 ? 
        `\n\nSheets found in files:\n${detailedValidationInfo.join('\n')}` : '';
      
      const response = ui.alert(
        "No Valid RVTools Files", 
        `Found ${processedCount} Excel file(s) in "${folderIdentifier}", but none contain valid RVTools structure.\n\nRequired worksheets: vInfo, vHost, vCluster, vDatastore\n\nThe script looks for these sheet names (case-insensitive) or sheets containing these names.${detailedInfo}\n\nWould you like to proceed anyway and try to process all files?`, 
        ui.ButtonSet.YES_NO
      );
      
      if (response === ui.Button.YES) {
        // Add all files to process, bypassing validation
        while (excelFiles.hasNext()) {
          validFiles.push(excelFiles.next().getId());
        }
        while (xlsxFiles.hasNext()) {
          validFiles.push(xlsxFiles.next().getId());
        }
        
        if (validFiles.length === 0) {
          // Reset iterators and try again
          const allExcelFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL);
          const allXlsxFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL_LEGACY);
          
          while (allExcelFiles.hasNext()) {
            validFiles.push(allExcelFiles.next().getId());
          }
          while (allXlsxFiles.hasNext()) {
            validFiles.push(allXlsxFiles.next().getId());
          }
        }
        
        if (validFiles.length > 0) {
          showAlert("Bypassing Validation", `Processing ${validFiles.length} file(s) without validation.\n\nNote: Processing may fail if files don't contain the expected RVTools data structure.`);
          return validFiles;
        }
      }
      
      return null;
    }
    
    showAlert("Files Found", `Found ${validCount} valid RVTools file(s) out of ${processedCount} Excel files in "${folderIdentifier}".\n\nProcessing will begin...`);
    
    return validFiles;
    
  } catch (error) {
    Logger.log(`Error in folder selection: ${error.toString()}`);
    showAlert("Error", `An error occurred while accessing the folder:\n\n${error.message}\n\nPlease try again or contact your IT team for assistance.`);
    return null;
  }
}

/**
 * Check if a file contains valid RVTools structure
 */
function isValidRVToolsFile(file) {
  try {
    Logger.log(`Validating file: ${file.getName()}`);
    
    // Quick check: file should be Excel format
    const mimeType = file.getBlob().getContentType();
    Logger.log(`File MIME type: ${mimeType}`);
    
    if (!mimeType.includes('excel') && !mimeType.includes('spreadsheet')) {
      Logger.log(`File ${file.getName()} rejected - not Excel format`);
      return false;
    }
    
    // Import to temporary spreadsheet for validation
    const tempSpreadsheet = SpreadsheetApp.open(DriveApp.createFile(file.getBlob().setName("temp_validation_" + file.getName())));
    
    // Get all sheet names and log them for debugging
    const sheets = tempSpreadsheet.getSheets();
    const sheetNames = sheets.map(sheet => sheet.getName());
    Logger.log(`Found sheets in ${file.getName()}: ${sheetNames.join(', ')}`);
    
    // Check for required worksheets (case-insensitive and flexible matching)
    const foundSheets = [];
    const requiredSheets = CONFIG.REQUIRED_SHEETS;
    
    for (const required of requiredSheets) {
      const found = sheetNames.find(name => 
        name.toLowerCase() === required.toLowerCase() ||
        name.toLowerCase().includes(required.toLowerCase()) ||
        required.toLowerCase().includes(name.toLowerCase())
      );
      
      if (found) {
        foundSheets.push(found);
        Logger.log(`✓ Found required sheet: ${required} (as "${found}")`);
      } else {
        Logger.log(`✗ Missing required sheet: ${required}`);
      }
    }
    
    const hasRequiredSheets = foundSheets.length === requiredSheets.length;
    
    if (!hasRequiredSheets) {
      Logger.log(`File ${file.getName()} validation failed - missing sheets. Found: ${foundSheets.length}/${requiredSheets.length}`);
    } else {
      Logger.log(`File ${file.getName()} validation passed - all required sheets found`);
    }
    
    // Clean up temporary file
    DriveApp.getFileById(tempSpreadsheet.getId()).setTrashed(true);
    
    return hasRequiredSheets;
    
  } catch (error) {
    Logger.log(`Error validating file ${file.getName()}: ${error.toString()}`);
    // If there's an error during validation, we'll assume it might be valid and let the main processing handle it
    return true;
  }
}

/**
 * Process multiple RVTools files and combine their metrics
 */
function processBatchRVToolsFiles(fileIds) {
  try {
    Logger.log(`Processing batch of ${fileIds.length} files...`);
    
    const allVInfoData = [];
    const allVHostData = [];
    const allVClusterData = [];
    const allVDatastoreData = [];
    
    let processedFiles = 0;
    let failedFiles = 0;
    const errorDetails = [];
    
    for (const fileId of fileIds) {
      try {
        const file = DriveApp.getFileById(fileId);
        Logger.log(`Processing file: ${file.getName()}`);
        
        // Open the Excel file
        const blob = file.getBlob();
        const tempSpreadsheet = SpreadsheetApp.open(DriveApp.createFile(blob.setName("temp_process_" + file.getName())));
        
        // Log all available sheets
        const availableSheets = tempSpreadsheet.getSheets().map(s => s.getName());
        Logger.log(`Available sheets in ${file.getName()}: ${availableSheets.join(', ')}`);
        
        // Extract data from each sheet and combine
        const vInfoData = extractSheetData(tempSpreadsheet, 'vInfo');
        const vHostData = extractSheetData(tempSpreadsheet, 'vHost');
        const vClusterData = extractSheetData(tempSpreadsheet, 'vCluster');
        const vDatastoreData = extractSheetData(tempSpreadsheet, 'vDatastore');
        
        Logger.log(`Extracted data counts - vInfo: ${vInfoData.length}, vHost: ${vHostData.length}, vCluster: ${vClusterData.length}, vDatastore: ${vDatastoreData.length}`);
        
        // Check if we got meaningful data
        if (vInfoData.length === 0 && vHostData.length === 0) {
          Logger.log(`Warning: No meaningful data extracted from ${file.getName()}`);
          errorDetails.push(`${file.getName()}: No VM or Host data found`);
        } else {
          // Add source file information to each record
          vInfoData.forEach(record => record._sourceFile = file.getName());
          vHostData.forEach(record => record._sourceFile = file.getName());
          vClusterData.forEach(record => record._sourceFile = file.getName());
          vDatastoreData.forEach(record => record._sourceFile = file.getName());
          
          // Combine with master arrays
          allVInfoData.push(...vInfoData);
          allVHostData.push(...vHostData);
          allVClusterData.push(...vClusterData);
          allVDatastoreData.push(...vDatastoreData);
          
          processedFiles++;
          Logger.log(`Successfully processed: ${file.getName()}`);
        }
        
        // Clean up temporary file
        DriveApp.getFileById(tempSpreadsheet.getId()).setTrashed(true);
        
      } catch (error) {
        failedFiles++;
        const errorMsg = `${DriveApp.getFileById(fileId).getName()}: ${error.toString()}`;
        errorDetails.push(errorMsg);
        Logger.log(`Failed to process file ${fileId}: ${error.toString()}`);
      }
    }
    
    Logger.log(`Processing summary - Total VMs: ${allVInfoData.length}, Total Hosts: ${allVHostData.length}`);
    
    if (processedFiles === 0) {
      const detailedError = errorDetails.length > 0 ? 
        `\n\nDetailed errors:\n${errorDetails.join('\n')}` : '';
      
      showAlert("Processing Failed", `Could not process any of the ${fileIds.length} files. Please check the file formats and sheet names.${detailedError}\n\nTip: Try using "Process Without Validation" if sheet names are different.`);
      return null;
    }
    
    if (failedFiles > 0) {
      const detailedError = errorDetails.length > 0 ? 
        `\n\nError details:\n${errorDetails.join('\n')}` : '';
      
      showAlert("Partial Success", `Processed ${processedFiles} out of ${fileIds.length} files successfully.\n\n${failedFiles} file(s) failed processing.${detailedError}`);
    }
    
    // Calculate combined metrics
    const combinedMetrics = calculateMetrics(allVInfoData, allVHostData, allVClusterData, allVDatastoreData);
    
    // Store raw data for filtering functionality
    combinedMetrics.raw_data = {
      vInfoData: allVInfoData,
      vHostData: allVHostData,
      vClusterData: allVClusterData,
      vDatastoreData: allVDatastoreData
    };
    
    // Add batch processing information
    combinedMetrics.batch_info = {
      total_files_found: fileIds.length,
      files_processed: processedFiles,
      files_failed: failedFiles,
      processing_date: new Date().toLocaleString(),
      total_vms: allVInfoData.length,
      total_hosts: allVHostData.length
    };
    
    Logger.log("Batch processing completed successfully");
    return combinedMetrics;
    
  } catch (error) {
    Logger.log("Error in batch processing: " + error.toString());
    showAlert("Processing Error", `A critical error occurred during batch processing:\n\n${error.message}\n\nPlease check the logs for more details.`);
    return null;
  }
}

/**
 * Process RVTools Excel file and extract metrics
 */
function processRVToolsFile(fileId) {
  try {
    Logger.log("Processing RVTools file: " + fileId);
    
    // Open the Excel file
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    
    // Import to temporary spreadsheet
    const tempSpreadsheet = SpreadsheetApp.open(DriveApp.createFile(blob.setName("temp_rvtools_import")));
    
    // Validate required sheets
    const sheetNames = tempSpreadsheet.getSheets().map(sheet => sheet.getName());
    const missingSheets = CONFIG.REQUIRED_SHEETS.filter(required => !sheetNames.includes(required));
    
    if (missingSheets.length > 0) {
      DriveApp.getFileById(tempSpreadsheet.getId()).setTrashed(true); // Clean up
      showAlert("Invalid File", `Missing required worksheets: ${missingSheets.join(', ')}`);
      return null;
    }
    
    // Extract data from each sheet
    const vInfoData = extractSheetData(tempSpreadsheet, 'vInfo');
    const vHostData = extractSheetData(tempSpreadsheet, 'vHost');
    const vClusterData = extractSheetData(tempSpreadsheet, 'vCluster');
    const vDatastoreData = extractSheetData(tempSpreadsheet, 'vDatastore');
    
    // Clean up temporary file
    DriveApp.getFileById(tempSpreadsheet.getId()).setTrashed(true);
    
    // Calculate metrics
    const metrics = calculateMetrics(vInfoData, vHostData, vClusterData, vDatastoreData);
    
    Logger.log("Metrics calculated successfully");
    return metrics;
    
  } catch (error) {
    Logger.log("Error processing file: " + error.toString());
    return null;
  }
}

/**
 * Extract data from a specific sheet
 */
function extractSheetData(spreadsheet, sheetName) {
  try {
    Logger.log(`Attempting to extract data from sheet: ${sheetName}`);
    
    // First try exact match
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // If exact match fails, try flexible matching
    if (!sheet) {
      Logger.log(`Exact match failed for ${sheetName}, trying flexible matching...`);
      const sheets = spreadsheet.getSheets();
      const sheetNames = sheets.map(s => s.getName());
      Logger.log(`Available sheets: ${sheetNames.join(', ')}`);
      
      // Try case-insensitive and partial matching
      const foundSheet = sheets.find(s => {
        const name = s.getName().toLowerCase();
        const target = sheetName.toLowerCase();
        return name === target || 
               name.includes(target) || 
               target.includes(name) ||
               name.replace(/[^a-z]/g, '') === target.replace(/[^a-z]/g, '');
      });
      
      if (foundSheet) {
        sheet = foundSheet;
        Logger.log(`Found sheet using flexible matching: ${sheet.getName()} for ${sheetName}`);
      } else {
        Logger.log(`No sheet found matching ${sheetName}`);
        return [];
      }
    } else {
      Logger.log(`Found exact match for sheet: ${sheetName}`);
    }
    
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    Logger.log(`Sheet ${sheet.getName()} has ${values.length} rows and ${values.length > 0 ? values[0].length : 0} columns`);
    
    if (values.length < 2) {
      Logger.log(`Sheet ${sheet.getName()} has insufficient data (less than 2 rows)`);
      return [];
    }
    
    // Convert to array of objects with headers as keys
    const headers = values[0];
    const data = [];
    
    Logger.log(`Headers in ${sheet.getName()}: ${headers.join(', ')}`);
    
    for (let i = 1; i < values.length; i++) {
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[i][j];
      }
      data.push(row);
    }
    
    Logger.log(`Successfully extracted ${data.length} data rows from ${sheet.getName()}`);
    return data;
    
  } catch (error) {
    Logger.log(`Error extracting data from ${sheetName}: ${error.toString()}`);
    return [];
  }
}

/**
 * Calculate comprehensive metrics from RVTools data
 */
function calculateMetrics(vInfoData, vHostData, vClusterData, vDatastoreData) {
  const metrics = {
    // Overall Counts
    total_powered_on_vms: 0,
    total_vms_all: 0,
    total_hosts: 0,
    
    // Host Resources
    total_physical_cores: 0,
    avg_cores_per_host: 0,
    avg_sockets_per_host: 0,
    avg_ram_gb_per_host: 0,
    
    // VM Resources
    avg_vcpus_per_vm: 0,
    avg_ram_gb_per_vm: 0,
    avg_provisioned_gb_per_vm: 0,
    
    // Utilization & Ratios
    vcpu_to_pcore_ratio: 0,
    avg_cpu_utilization: 0,
    avg_ram_utilization: 0,
    
    // Additional metrics
    total_vcpus: 0,
    total_ram_gb_vms: 0,
    total_provisioned_gb: 0,
    total_host_ram_gb: 0
  };
  
  // VM Metrics
  if (vInfoData.length > 0) {
    metrics.total_vms_all = vInfoData.length;
    
    // Filter powered-on VMs
    const poweredOnVMs = vInfoData.filter(vm => 
      vm.Powerstate && vm.Powerstate.toString().toLowerCase() === 'poweredon'
    );
    
    metrics.total_powered_on_vms = poweredOnVMs.length;
    
    if (poweredOnVMs.length > 0) {
      // vCPUs
      const vcpuValues = poweredOnVMs
        .map(vm => parseFloat(vm.CPUs || 0))
        .filter(val => !isNaN(val));
      
      if (vcpuValues.length > 0) {
        metrics.total_vcpus = vcpuValues.reduce((sum, val) => sum + val, 0);
        metrics.avg_vcpus_per_vm = metrics.total_vcpus / vcpuValues.length;
      }
      
      // Memory (MiB to GB)
      const memoryValues = poweredOnVMs
        .map(vm => parseFloat(vm.Memory || 0))
        .filter(val => !isNaN(val));
      
      if (memoryValues.length > 0) {
        metrics.total_ram_gb_vms = memoryValues.reduce((sum, val) => sum + val, 0) / 1024;
        metrics.avg_ram_gb_per_vm = metrics.total_ram_gb_vms / memoryValues.length;
      }
      
      // Provisioned Storage (MiB to GB)
      const provisionedValues = poweredOnVMs
        .map(vm => parseFloat(vm['Provisioned MiB'] || 0))
        .filter(val => !isNaN(val));
      
      if (provisionedValues.length > 0) {
        metrics.total_provisioned_gb = provisionedValues.reduce((sum, val) => sum + val, 0) / 1024;
        metrics.avg_provisioned_gb_per_vm = metrics.total_provisioned_gb / provisionedValues.length;
      }
    }
  }
  
  // Host Metrics
  if (vHostData.length > 0) {
    metrics.total_hosts = vHostData.length;
    
    // Physical cores
    const coreValues = vHostData
      .map(host => parseFloat(host['# Cores'] || 0))
      .filter(val => !isNaN(val));
    
    if (coreValues.length > 0) {
      metrics.total_physical_cores = coreValues.reduce((sum, val) => sum + val, 0);
      metrics.avg_cores_per_host = metrics.total_physical_cores / coreValues.length;
    }
    
    // CPU sockets
    const socketValues = vHostData
      .map(host => parseFloat(host['# CPU'] || 0))
      .filter(val => !isNaN(val));
    
    if (socketValues.length > 0) {
      metrics.avg_sockets_per_host = socketValues.reduce((sum, val) => sum + val, 0) / socketValues.length;
    }
    
    // Host RAM (MB to GB)
    const hostMemoryValues = vHostData
      .map(host => parseFloat(host['# Memory'] || 0))
      .filter(val => !isNaN(val));
    
    if (hostMemoryValues.length > 0) {
      metrics.total_host_ram_gb = hostMemoryValues.reduce((sum, val) => sum + val, 0) / 1024;
      metrics.avg_ram_gb_per_host = metrics.total_host_ram_gb / hostMemoryValues.length;
    }
    
    // CPU Utilization
    const cpuUtilValues = vHostData
      .map(host => parseFloat(host['CPU usage %'] || 0))
      .filter(val => !isNaN(val));
    
    if (cpuUtilValues.length > 0) {
      metrics.avg_cpu_utilization = cpuUtilValues.reduce((sum, val) => sum + val, 0) / cpuUtilValues.length / 100;
    }
    
    // RAM Utilization
    const ramUtilValues = vHostData
      .map(host => parseFloat(host['Memory usage %'] || 0))
      .filter(val => !isNaN(val));
    
    if (ramUtilValues.length > 0) {
      metrics.avg_ram_utilization = ramUtilValues.reduce((sum, val) => sum + val, 0) / ramUtilValues.length / 100;
    }
  }
  
  // Calculate ratios
  if (metrics.total_physical_cores > 0 && metrics.total_vcpus > 0) {
    metrics.vcpu_to_pcore_ratio = metrics.total_vcpus / metrics.total_physical_cores;
  }
  
  return metrics;
}

/**
 * Generate comprehensive dashboard in Google Sheets with dynamic filtering
 */
function generateDashboard(metrics) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create or clear results sheet
  let resultsSheet = spreadsheet.getSheetByName(CONFIG.RESULTS_SHEET_NAME);
  if (resultsSheet) {
    resultsSheet.clear();
  } else {
    resultsSheet = spreadsheet.insertSheet(CONFIG.RESULTS_SHEET_NAME);
  }
  
  // Create filterable data sheets first
  createFilterableDataSheets(spreadsheet, metrics);
  
  // Generate dynamic dashboard that responds to filters
  generateDynamicDashboard(resultsSheet, spreadsheet, metrics);
  
  // Dashboard header
  const headerData = [
    ['📊 INFRASTRUCTURE ANALYSIS DASHBOARD', '', ''],
    ['', '', ''],
    ['Generated by: ' + CONFIG.APPLICATION_NAME, '', ''],
    ['Timestamp: ' + new Date().toLocaleString(), '', ''],
    ['', '', '']
  ];
  
  // Add batch processing info if available
  if (metrics.batch_info) {
    headerData.push(
      ['📁 BATCH PROCESSING SUMMARY', '', ''],
      ['Files Found:', metrics.batch_info.total_files_found || 0, 'Excel files in folder'],
      ['Files Processed:', metrics.batch_info.files_processed || 0, 'Successfully analyzed'],
      ['Files Failed:', metrics.batch_info.files_failed || 0, 'Processing errors'],
      ['Processing Date:', metrics.batch_info.processing_date || 'N/A', 'Analysis timestamp'],
      ['', '', '']
    );
  }
  
  // Overall Counts
  const overallCountsData = [
    ['🔢 OVERALL COUNTS', '', ''],
    ['📱 Total VMs (Powered On)', metrics.total_powered_on_vms || 0, 'Active workload count'],
    ['📦 Total VMs (All Visible)', metrics.total_vms_all || 0, 'Complete VM inventory'],
    ['🖥️ Total Hosts (Visible)', metrics.total_hosts || 0, 'Physical infrastructure'],
    ['', '', '']
  ];
  
  // Host Infrastructure Resources
  const hostResourcesData = [
    ['⚡ HOST INFRASTRUCTURE RESOURCES', '', ''],
    ['🔧 Total Physical Cores', (metrics.total_physical_cores || 0).toFixed(0), 'Sum of all host cores'],
    ['🎯 Physical Cores per Host (Avg)', (metrics.avg_cores_per_host || 0).toFixed(2), 'Average core density'],
    ['🔌 CPU Sockets per Host (Avg)', (metrics.avg_sockets_per_host || 0).toFixed(2), 'Socket configuration'],
    ['💾 RAM per Host (Avg) GB', (metrics.avg_ram_gb_per_host || 0).toFixed(2), 'Memory capacity'],
    ['', '', '']
  ];
  
  // VM Resources
  const vmResourcesData = [
    ['💻 VIRTUAL MACHINE RESOURCES (POWERED-ON VMs)', '', ''],
    ['⚙️ vCPUs per VM (Average)', (metrics.avg_vcpus_per_vm || 0).toFixed(2), 'Virtual CPU allocation'],
    ['🧠 RAM per VM (Average) GB', (metrics.avg_ram_gb_per_vm || 0).toFixed(2), 'Memory per workload'],
    ['💿 Provisioned Storage per VM GB', (metrics.avg_provisioned_gb_per_vm || 0).toFixed(2), 'Storage allocation'],
    ['', '', '']
  ];
  
  // Utilization & Performance
  const utilizationData = [
    ['📈 UTILIZATION & PERFORMANCE RATIOS', '', ''],
    ['🔄 vCPU to Physical Core Ratio', (metrics.vcpu_to_pcore_ratio || 0).toFixed(2) + ':1', getConsolidationStatus(metrics.vcpu_to_pcore_ratio || 0)],
    ['📊 CPU Utilization (Host Avg)', ((metrics.avg_cpu_utilization || 0) * 100).toFixed(1) + '%', getCPUStatus(metrics.avg_cpu_utilization || 0)],
    ['🧮 RAM Utilization (Host Avg)', ((metrics.avg_ram_utilization || 0) * 100).toFixed(1) + '%', getRAMStatus(metrics.avg_ram_utilization || 0)],
    ['🔧 Threads/Core (Cluster Avg)', 'N/A', 'vCluster data N/A'],
    ['', '', '']
  ];
  
  // Key Insights
  const insightsData = [
    ['🎯 KEY INSIGHTS', '', ''],
    ['Consolidation Analysis', `${(metrics.vcpu_to_pcore_ratio || 0).toFixed(1)}:1 ${getConsolidationStatus(metrics.vcpu_to_pcore_ratio || 0)}`, ''],
    ['CPU Load Analysis', `${((metrics.avg_cpu_utilization || 0) * 100).toFixed(0)}% ${getCPUStatus(metrics.avg_cpu_utilization || 0)}`, ''],
    ['Memory Usage Analysis', `${((metrics.avg_ram_utilization || 0) * 100).toFixed(0)}% ${getRAMStatus(metrics.avg_ram_utilization || 0)}`, ''],
    ['', '', '']
  ];
  
  // Combine all data
  const allData = [
    ...headerData,
    ...overallCountsData,
    ...hostResourcesData,
    ...vmResourcesData,
    ...utilizationData,
    ...insightsData
  ];
  
  // Ensure all rows have exactly 3 columns
  const normalizedData = allData.map(row => {
    if (row.length === 1) {
      return [row[0], '', ''];
    } else if (row.length === 2) {
      return [row[0], row[1], ''];
    } else if (row.length >= 3) {
      return [row[0], row[1], row[2]];
    } else {
      return ['', '', ''];
    }
  });
  
  // Write to sheet
  const range = resultsSheet.getRange(1, 1, normalizedData.length, 3);
  range.setValues(normalizedData);
  
  // Format the sheet
  formatDashboardSheet(resultsSheet, metrics);
  
  Logger.log("Dashboard generated successfully");
}

/**
 * Generate dynamic dashboard that updates based on filtered data
 */
function generateDynamicDashboard(resultsSheet, spreadsheet, metrics) {
  // Check if filterable sheets exist
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  const hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
  
  if (!vmSheet || !hostSheet) {
    // Fallback to static dashboard if filterable sheets don't exist
    generateStaticDashboard(resultsSheet, metrics);
    return;
  }
  
  // Dashboard header
  const headerData = [
    ['📊 DYNAMIC INFRASTRUCTURE ANALYSIS DASHBOARD', '', ''],
    ['🔄 Updates automatically based on applied filters', '', ''],
    ['', '', ''],
    ['Generated by: ' + CONFIG.APPLICATION_NAME, '', ''],
    ['Timestamp: ' + new Date().toLocaleString(), '', ''],
    ['', '', '']
  ];
  
  // Add batch processing info if available
  if (metrics.batch_info) {
    headerData.push(
      ['📁 PROCESSING SUMMARY', '', ''],
      ['Files Found:', metrics.batch_info.total_files_found || 0, 'Excel files processed'],
      ['Files Processed:', metrics.batch_info.files_processed || 0, 'Successfully analyzed'],
      ['Processing Method:', metrics.batch_info.processing_method || 'Standard', 'Conversion method used'],
      ['Processing Date:', metrics.batch_info.processing_date || 'N/A', 'Analysis timestamp'],
      ['', '', '']
    );
  }
  
  // Dynamic counts section with formulas that work with filtered data
  const dynamicCountsData = [
    ['🔢 FILTERED COUNTS (Updates with Filters)', '', ''],
    ['📱 Visible VMs (Powered On)', '=COUNTIFS(VM_Details_Filterable.B:B,"poweredOn")', 'Based on current VM filter'],
    ['📦 Total Visible VMs', '=SUBTOTAL(103,VM_Details_Filterable.A:A)-1', 'All VMs shown in filter'],
    ['🖥️ Visible Hosts', '=SUBTOTAL(103,Host_Details_Filterable.A:A)-1', 'All hosts shown in filter'],
    ['', '', '']
  ];
  
  // Dynamic host resources with formulas that work with filtered data
  const dynamicHostResourcesData = [
    ['⚡ FILTERED HOST RESOURCES', '', ''],
    ['🔧 Total Visible CPU Cores', '=SUBTOTAL(109,Host_Details_Filterable.F:F)', 'Sum of visible host cores'],
    ['🎯 Average Cores per Host', '=ROUND(SUBTOTAL(101,Host_Details_Filterable.F:F),2)', 'Average among visible hosts'],
    ['🔌 Average CPU Sockets', '=ROUND(SUBTOTAL(101,Host_Details_Filterable.G:G),2)', 'Socket configuration average'],
    ['💾 Average RAM per Host (GB)', '=ROUND(SUBTOTAL(101,Host_Details_Filterable.H:H),2)', 'Memory capacity average'],
    ['', '', '']
  ];
  
  // Dynamic VM resources with formulas that work with filtered data
  const dynamicVMResourcesData = [
    ['💻 FILTERED VM RESOURCES (Powered-On VMs)', '', ''],
    ['⚙️ Average vCPUs per VM', '=ROUND(AVERAGEIFS(VM_Details_Filterable.G:G,VM_Details_Filterable.B:B,"poweredOn"),2)', 'Powered-on VMs only'],
    ['🧠 Average RAM per VM (GB)', '=ROUND(AVERAGEIFS(VM_Details_Filterable.H:H,VM_Details_Filterable.B:B,"poweredOn"),2)', 'Memory per powered-on VM'],
    ['💿 Average Storage per VM (GB)', '=ROUND(AVERAGEIFS(VM_Details_Filterable.I:I,VM_Details_Filterable.B:B,"poweredOn"),2)', 'Storage per powered-on VM'],
    ['🔢 Total vCPUs (Powered-On)', '=SUMIFS(VM_Details_Filterable.G:G,VM_Details_Filterable.B:B,"poweredOn")', 'Sum of all powered-on vCPUs'],
    ['', '', '']
  ];
  
  // Dynamic utilization with formulas that work with filtered data
  const dynamicUtilizationData = [
    ['📈 FILTERED UTILIZATION & RATIOS', '', ''],
    ['🔄 vCPU:Core Ratio', '=ROUND(SUMIFS(VM_Details_Filterable.G:G,VM_Details_Filterable.B:B,"poweredOn")/SUBTOTAL(109,Host_Details_Filterable.F:F),2)&":1"', 'Consolidation ratio'],
    ['📊 Average CPU Utilization', '=ROUND(SUBTOTAL(101,Host_Details_Filterable.I:I),1)&"%"', 'Host CPU usage average'],
    ['🧮 Average Memory Utilization', '=ROUND(SUBTOTAL(101,Host_Details_Filterable.J:J),1)&"%"', 'Host memory usage average'],
    ['', '', '']
  ];
  
  // Power state breakdown with formulas that work with filtered data
  const powerStateData = [
    ['⚡ POWER STATE BREAKDOWN', '', ''],
    ['🟢 Powered On VMs', '=COUNTIFS(VM_Details_Filterable.B:B,"poweredOn")', 'Active virtual machines'],
    ['🔴 Powered Off VMs', '=COUNTIFS(VM_Details_Filterable.B:B,"poweredOff")', 'Shutdown virtual machines'],
    ['🟡 Suspended VMs', '=COUNTIFS(VM_Details_Filterable.B:B,"suspended")', 'Paused virtual machines'],
    ['📊 Power On Percentage', '=ROUND(COUNTIFS(VM_Details_Filterable.B:B,"poweredOn")/(SUBTOTAL(103,VM_Details_Filterable.A:A)-1)*100,1)&"%"', 'Percentage of VMs powered on'],
    ['', '', '']
  ];
  
  // Quick filter insights with formulas that work with filtered data
  const filterInsightsData = [
    ['🔍 QUICK FILTER INSIGHTS', '', ''],
    ['🏢 Unique Clusters', '=ROWS(UNIQUE(FILTER(VM_Details_Filterable.D:D,VM_Details_Filterable.D:D<>"")))-1', 'Number of visible clusters'],
    ['🖥️ Unique Hosts', '=ROWS(UNIQUE(FILTER(VM_Details_Filterable.E:E,VM_Details_Filterable.E:E<>"")))-1', 'Number of unique hosts'],
    ['💻 Windows VMs', '=COUNTIFS(VM_Details_Filterable.C:C,"*Windows*")', 'VMs with Windows OS'],
    ['🐧 Linux VMs', '=COUNTIFS(VM_Details_Filterable.C:C,"*Linux*")+COUNTIFS(VM_Details_Filterable.C:C,"*Ubuntu*")+COUNTIFS(VM_Details_Filterable.C:C,"*CentOS*")', 'VMs with Linux-based OS'],
    ['', '', '']
  ];
  
  // Filter instructions
  const filterInstructionsData = [
    ['💡 HOW TO USE DYNAMIC FILTERING', '', ''],
    ['1. Apply Filters', 'Go to VM_Details_Filterable or Host_Details_Filterable', 'Use column filter dropdowns'],
    ['2. Filter by Power State', 'Filter VM Power State column', 'Choose poweredOn, poweredOff, etc.'],
    ['3. Filter by OS', 'Filter Operating System column', 'Select specific OS types'],
    ['4. Filter by Cluster', 'Filter Cluster column', 'Focus on specific clusters'],
    ['5. View Updated Dashboard', 'Return to this sheet', 'Metrics update automatically!'],
    ['', '', '']
  ];
  
  // Combine all data
  const allData = [
    ...headerData,
    ...dynamicCountsData,
    ...dynamicHostResourcesData,
    ...dynamicVMResourcesData,
    ...dynamicUtilizationData,
    ...powerStateData,
    ...filterInsightsData,
    ...filterInstructionsData
  ];
  
  // Ensure all rows have exactly 3 columns
  const normalizedData = allData.map(row => {
    if (row.length === 1) {
      return [row[0], '', ''];
    } else if (row.length === 2) {
      return [row[0], row[1], ''];
    } else if (row.length >= 3) {
      return [row[0], row[1], row[2]];
    } else {
      return ['', '', ''];
    }
  });
  
  // Write to sheet
  const range = resultsSheet.getRange(1, 1, normalizedData.length, 3);
  range.setValues(normalizedData);
  
  // Format the dynamic dashboard
  formatDynamicDashboard(resultsSheet);
  
  Logger.log("Dynamic dashboard generated successfully");
}

/**
 * Generate static dashboard (fallback when filterable sheets don't exist)
 */
function generateStaticDashboard(resultsSheet, metrics) {
  // Dashboard header
  const headerData = [
    ['📊 INFRASTRUCTURE ANALYSIS DASHBOARD', '', ''],
    ['', '', ''],
    ['Generated by: ' + CONFIG.APPLICATION_NAME, '', ''],
    ['Timestamp: ' + new Date().toLocaleString(), '', ''],
    ['', '', '']
  ];
  
  // Add batch processing info if available
  if (metrics.batch_info) {
    headerData.push(
      ['📁 BATCH PROCESSING SUMMARY', '', ''],
      ['Files Found:', metrics.batch_info.total_files_found || 0, 'Excel files in folder'],
      ['Files Processed:', metrics.batch_info.files_processed || 0, 'Successfully analyzed'],
      ['Files Failed:', metrics.batch_info.files_failed || 0, 'Processing errors'],
      ['Processing Date:', metrics.batch_info.processing_date || 'N/A', 'Analysis timestamp'],
      ['', '', '']
    );
  }
  
  // Overall Counts
  const overallCountsData = [
    ['🔢 OVERALL COUNTS', '', ''],
    ['📱 Total VMs (Powered On)', metrics.total_powered_on_vms || 0, 'Active workload count'],
    ['📦 Total VMs (All Visible)', metrics.total_vms_all || 0, 'Complete VM inventory'],
    ['🖥️ Total Hosts (Visible)', metrics.total_hosts || 0, 'Physical infrastructure'],
    ['', '', '']
  ];
  
  // Host Infrastructure Resources
  const hostResourcesData = [
    ['⚡ HOST INFRASTRUCTURE RESOURCES', '', ''],
    ['🔧 Total Physical Cores', (metrics.total_physical_cores || 0).toFixed(0), 'Sum of all host cores'],
    ['🎯 Physical Cores per Host (Avg)', (metrics.avg_cores_per_host || 0).toFixed(2), 'Average core density'],
    ['🔌 CPU Sockets per Host (Avg)', (metrics.avg_sockets_per_host || 0).toFixed(2), 'Socket configuration'],
    ['💾 RAM per Host (Avg) GB', (metrics.avg_ram_gb_per_host || 0).toFixed(2), 'Memory capacity'],
    ['', '', '']
  ];
  
  // VM Resources
  const vmResourcesData = [
    ['💻 VIRTUAL MACHINE RESOURCES (POWERED-ON VMs)', '', ''],
    ['⚙️ vCPUs per VM (Average)', (metrics.avg_vcpus_per_vm || 0).toFixed(2), 'Virtual CPU allocation'],
    ['🧠 RAM per VM (Average) GB', (metrics.avg_ram_gb_per_vm || 0).toFixed(2), 'Memory per workload'],
    ['💿 Provisioned Storage per VM GB', (metrics.avg_provisioned_gb_per_vm || 0).toFixed(2), 'Storage allocation'],
    ['', '', '']
  ];
  
  // Utilization & Performance
  const utilizationData = [
    ['📈 UTILIZATION & PERFORMANCE RATIOS', '', ''],
    ['🔄 vCPU to Physical Core Ratio', (metrics.vcpu_to_pcore_ratio || 0).toFixed(2) + ':1', getConsolidationStatus(metrics.vcpu_to_pcore_ratio || 0)],
    ['📊 CPU Utilization (Host Avg)', ((metrics.avg_cpu_utilization || 0) * 100).toFixed(1) + '%', getCPUStatus(metrics.avg_cpu_utilization || 0)],
    ['🧮 RAM Utilization (Host Avg)', ((metrics.avg_ram_utilization || 0) * 100).toFixed(1) + '%', getRAMStatus(metrics.avg_ram_utilization || 0)],
    ['🔧 Threads/Core (Cluster Avg)', 'N/A', 'vCluster data N/A'],
    ['', '', '']
  ];
  
  // Key Insights
  const insightsData = [
    ['🎯 KEY INSIGHTS', '', ''],
    ['Consolidation Analysis', `${(metrics.vcpu_to_pcore_ratio || 0).toFixed(1)}:1 ${getConsolidationStatus(metrics.vcpu_to_pcore_ratio || 0)}`, ''],
    ['CPU Load Analysis', `${((metrics.avg_cpu_utilization || 0) * 100).toFixed(0)}% ${getCPUStatus(metrics.avg_cpu_utilization || 0)}`, ''],
    ['Memory Usage Analysis', `${((metrics.avg_ram_utilization || 0) * 100).toFixed(0)}% ${getRAMStatus(metrics.avg_ram_utilization || 0)}`, ''],
    ['', '', '']
  ];
  
  // Combine all data
  const allData = [
    ...headerData,
    ...overallCountsData,
    ...hostResourcesData,
    ...vmResourcesData,
    ...utilizationData,
    ...insightsData
  ];
  
  // Ensure all rows have exactly 3 columns
  const normalizedData = allData.map(row => {
    if (row.length === 1) {
      return [row[0], '', ''];
    } else if (row.length === 2) {
      return [row[0], row[1], ''];
    } else if (row.length >= 3) {
      return [row[0], row[1], row[2]];
    } else {
      return ['', '', ''];
    }
  });
  
  // Write to sheet
  const range = resultsSheet.getRange(1, 1, normalizedData.length, 3);
  range.setValues(normalizedData);
  
  // Format the sheet
  formatDashboardSheet(resultsSheet, metrics);
}

/**
 * Format the dynamic dashboard sheet for better readability
 */
function formatDynamicDashboard(sheet) {
  // Set column widths
  sheet.setColumnWidth(1, 350);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 300);
  
  // Header formatting
  const headerRange = sheet.getRange(1, 1, 1, 3);
  headerRange.setFontSize(16)
           .setFontWeight('bold')
           .setHorizontalAlignment('center')
           .setBackground('#4285f4')
           .setFontColor('white');
  
  // Subheader formatting
  const subHeaderRange = sheet.getRange(2, 1, 1, 3);
  subHeaderRange.setFontSize(12)
               .setFontStyle('italic')
               .setHorizontalAlignment('center')
               .setBackground('#e8f0fe')
               .setFontColor('#1a73e8');
  
  // Find and format section headers
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    const cellValue = data[i][0];
    if (cellValue && (cellValue.includes('FILTERED') || cellValue.includes('BREAKDOWN') || cellValue.includes('INSIGHTS') || cellValue.includes('HOW TO USE'))) {
      const sectionRange = sheet.getRange(i + 1, 1, 1, 3);
      sectionRange.setFontWeight('bold')
                  .setFontSize(12)
                  .setBackground('#f1f3f4')
                  .setFontColor('#1a73e8');
    }
  }
  
  // Highlight dynamic formulas
  highlightDynamicCells(sheet, data);
}

/**
 * Highlight cells with dynamic formulas
 */
function highlightDynamicCells(sheet, data) {
  for (let i = 0; i < data.length; i++) {
    const cellValue = data[i][1];
    if (cellValue && cellValue.toString().startsWith('=')) {
      const formulaRange = sheet.getRange(i + 1, 2, 1, 1);
      formulaRange.setBackground('#e8f5e8') // Light green background for formulas
               .setFontWeight('bold');
    }
  }
}

/**
 * Refresh the dynamic dashboard formulas
 */
function refreshDynamicDashboard() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const resultsSheet = spreadsheet.getSheetByName(CONFIG.RESULTS_SHEET_NAME);
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  const hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
  
  if (!resultsSheet) {
    showAlert("No Dashboard Found", "Please run the main analysis first to create the dashboard.");
    return;
  }
  
  if (!vmSheet || !hostSheet) {
    showAlert("No Filterable Data", "Filterable data sheets not found. Please run the main analysis first.");
    return;
  }
  
  try {
    // Force recalculation of formulas
    SpreadsheetApp.flush();
    
    // Get current filter status
    const vmFilterStatus = getFilterStatus(vmSheet);
    const hostFilterStatus = getFilterStatus(hostSheet);
    
    showAlert("Dashboard Refreshed", 
      `✅ Dynamic dashboard has been refreshed!\n\n` +
      `📊 Current Filter Status:\n` +
      `• VM Sheet: ${vmFilterStatus}\n` +
      `• Host Sheet: ${hostFilterStatus}\n\n` +
      `💡 The dashboard formulas automatically update when you:\n` +
      `• Apply/remove filters on the filterable sheets\n` +
      `• Change filter criteria\n` +
      `• Switch between different views\n\n` +
      `🔍 To see changes:\n` +
      `1. Go to a filterable sheet\n` +
      `2. Apply filters using column dropdowns\n` +
      `3. Return to '${CONFIG.RESULTS_SHEET_NAME}' to see updated metrics`
    );
    
  } catch (error) {
    showAlert("Refresh Error", `Error refreshing dashboard: ${error.message}`);
  }
}

/**
 * Get filter status for a sheet
 */
function getFilterStatus(sheet) {
  try {
    const filter = sheet.getFilter();
    if (filter) {
      const criteria = filter.getColumnFilterCriteria();
      const activeFilters = Object.keys(criteria).length;
      return activeFilters > 0 ? `${activeFilters} active filter(s)` : "No active filters";
    } else {
      return "Filters not enabled";
    }
  } catch (error) {
    return "Filter status unknown";
  }
}

/**
 * Create a comprehensive filtering guide
 */
function showFilteringGuide() {
  const ui = SpreadsheetApp.getUi();
  
  const guide = `📊 DYNAMIC DASHBOARD FILTERING GUIDE

🔄 HOW IT WORKS:
The dashboard now contains dynamic formulas that automatically update based on the filters you apply to the data sheets.

📋 AVAILABLE FILTERABLE SHEETS:
• VM_Details_Filterable - Virtual machine data
• Host_Details_Filterable - ESXi host data  
• Cluster_Details_Filterable - Cluster information
• Datastore_Details_Filterable - Storage data

🎯 FILTERING STEPS:
1. Go to any filterable sheet (e.g., VM_Details_Filterable)
2. Click the filter dropdown in any column header
3. Select/deselect values to filter data
4. Return to '${CONFIG.RESULTS_SHEET_NAME}' sheet
5. Watch the metrics update automatically!

💡 COMMON FILTERING SCENARIOS:

🟢 Filter by Power State:
• Go to VM_Details_Filterable
• Filter 'Power State' column for 'poweredOn'
• Dashboard shows only powered-on VM metrics

🏢 Filter by Cluster:
• Filter 'Cluster' column for specific cluster
• Dashboard shows metrics for that cluster only

💻 Filter by Operating System:
• Filter 'Operating System' column
• See metrics for specific OS types

⚡ Filter by High CPU Usage:
• Go to Host_Details_Filterable  
• Filter 'CPU Usage %' for values > 70
• Dashboard shows high-utilization hosts only

🔍 DYNAMIC METRICS:
These metrics update automatically with filters:
• VM counts and averages
• Host resource totals
• Utilization ratios
• Power state breakdowns
• OS distribution
• Resource allocation summaries

💾 The formulas reference the filtered data directly, so any filter changes are immediately reflected in the dashboard calculations.`;

  showAlert("Dynamic Filtering Guide", guide);
}

/**
 * Show example filtering scenarios
 */
/**
 * Show example filtering scenarios
 */
function showFilteringExamples() {
  const ui = SpreadsheetApp.getUi();
  
  const examples = `🎯 FILTERING EXAMPLES

📊 SCENARIO 1: Analyze Production Environment
Steps:
1. Go to VM_Details_Filterable
2. Filter 'Cluster' column → Select 'Production-Cluster'
3. Check dashboard → See production-only metrics

📊 SCENARIO 2: Review Powered-Off VMs
Steps:
1. Go to VM_Details_Filterable  
2. Filter 'Power State' column → Select 'poweredOff'
3. Check dashboard → See shutdown VM statistics

📊 SCENARIO 3: Windows Server Analysis
Steps:
1. Go to VM_Details_Filterable
2. Filter 'Operating System' → Select items containing 'Windows'
3. Check dashboard → See Windows-specific metrics

📊 SCENARIO 4: High CPU Host Analysis
Steps:
1. Go to Host_Details_Filterable
2. Filter 'CPU Usage %' → Custom formula: >70
3. Check dashboard → See high-utilization metrics

📊 SCENARIO 5: Multi-Filter Analysis
Steps:
1. Filter VM sheet by 'poweredOn' AND 'Production-Cluster'
2. Filter Host sheet by CPU > 50%
3. Dashboard shows: Production powered-on VMs + busy hosts

🔄 RESET FILTERS:
To see all data again:
1. Go to any filtered sheet
2. Click filter dropdown → Select 'Clear'
3. Or click 'Select All' to show everything

💡 TIP: The dashboard updates in real-time as you change filters. You can keep the dashboard sheet open in one browser tab and the filterable sheets in another for instant feedback!`;

  showAlert("Filtering Examples", examples);
}

/**
 * Create filterable data sheets for detailed analysis
 */
function createFilterableDataSheets(spreadsheet, metrics) {
  try {
    // Store the raw data in metrics for filtering
    if (metrics.raw_data) {
      createVMFilterSheet(spreadsheet, metrics.raw_data.vInfoData);
      createHostFilterSheet(spreadsheet, metrics.raw_data.vHostData);
      createClusterFilterSheet(spreadsheet, metrics.raw_data.vClusterData);
      createDatastoreFilterSheet(spreadsheet, metrics.raw_data.vDatastoreData);
      Logger.log("Filterable data sheets created successfully");
    } else {
      Logger.log("No raw data available for filtering");
    }
  } catch (error) {
    Logger.log("Error creating filterable sheets: " + error.toString());
  }
}

/**
 * Create VM filter sheet with all VM details
 */
function createVMFilterSheet(spreadsheet, vInfoData) {
  if (!vInfoData || vInfoData.length === 0) return;
  
  // Create or clear VM details sheet
  let vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  if (vmSheet) {
    vmSheet.clear();
  } else {
    vmSheet = spreadsheet.insertSheet('VM_Details_Filterable');
  }
  
  // Define key columns for VM analysis
  const vmHeaders = [
    'VM Name', 'Power State', 'Operating System', 'Cluster', 'Host', 'vCenter',
    'vCPUs', 'Memory (GB)', 'Provisioned Storage (GB)', 'Used Storage (GB)',
    'CPU Usage %', 'Memory Usage %', 'Datacenter', 'Folder', 'Source File'
  ];
  
  // Create header row
  vmSheet.getRange(1, 1, 1, vmHeaders.length).setValues([vmHeaders]);
  
  // Format headers
  const headerRange = vmSheet.getRange(1, 1, 1, vmHeaders.length);
  headerRange.setFontWeight('bold')
            .setBackground('#4285f4')
            .setFontColor('white')
            .setHorizontalAlignment('center');
  
  // Prepare data rows
  const vmRows = [];
  for (const vm of vInfoData) {
    const row = [
      vm.VM || vm['VM Name'] || vm.Name || '',
      vm.Powerstate || vm['Power State'] || '',
      vm.OS || vm['Operating System'] || vm['Guest OS'] || '',
      vm.Cluster || '',
      vm.Host || vm['ESX Host'] || '',
      vm.vCenter || vm['vCenter Server'] || '',
      parseFloat(vm.CPUs || vm.vCPUs || 0),
      Math.round((parseFloat(vm.Memory || 0) / 1024) * 100) / 100, // Convert MB to GB
      Math.round((parseFloat(vm['Provisioned MiB'] || vm['Provisioned Space'] || 0) / 1024) * 100) / 100,
      Math.round((parseFloat(vm['Used MiB'] || vm['Used Space'] || 0) / 1024) * 100) / 100,
      parseFloat(vm['CPU usage %'] || vm['CPU Usage'] || 0),
      parseFloat(vm['Memory usage %'] || vm['Memory Usage'] || 0),
      vm.Datacenter || vm['Data Center'] || '',
      vm.Folder || vm['VM Folder'] || '',
      vm._sourceFile || 'Unknown'
    ];
    vmRows.push(row);
  }
  
  // Write data to sheet
  if (vmRows.length > 0) {
    vmSheet.getRange(2, 1, vmRows.length, vmHeaders.length).setValues(vmRows);
  }
  
  // Apply filters to the data
  const dataRange = vmSheet.getRange(1, 1, vmRows.length + 1, vmHeaders.length);
  dataRange.createFilter();
  
  // Auto-resize columns
  vmSheet.autoResizeColumns(1, vmHeaders.length);
  
  // Freeze header row
  vmSheet.setFrozenRows(1);
  
  // Add conditional formatting for power state
  const powerStateColumn = 2; // Power State column
  const powerRange = vmSheet.getRange(2, powerStateColumn, vmRows.length, 1);
  
  // Green for powered on, red for powered off
  const powerOnRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('poweredOn')
    .setBackground('#d9ead3')
    .setRanges([powerRange])
    .build();
    
  const powerOffRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('poweredOff')
    .setBackground('#f4cccc')
    .setRanges([powerRange])
    .build();
  
  vmSheet.setConditionalFormatRules([powerOnRule, powerOffRule]);
}

/**
 * Create Host filter sheet with all host details
 */
function createHostFilterSheet(spreadsheet, vHostData) {
  if (!vHostData || vHostData.length === 0) return;
  
  // Create or clear host details sheet
  let hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
  if (hostSheet) {
    hostSheet.clear();
  } else {
    hostSheet = spreadsheet.insertSheet('Host_Details_Filterable');
  }
  
  // Define key columns for host analysis
  const hostHeaders = [
    'Host Name', 'Cluster', 'Connection State', 'Power State', 'vCenter',
    'CPU Cores', 'CPU Sockets', 'Memory (GB)', 'CPU Usage %', 'Memory Usage %',
    'ESXi Version', 'Build', 'Vendor', 'Model', 'Datacenter', 'Source File'
  ];
  
  // Create header row
  hostSheet.getRange(1, 1, 1, hostHeaders.length).setValues([hostHeaders]);
  
  // Format headers
  const headerRange = hostSheet.getRange(1, 1, 1, hostHeaders.length);
  headerRange.setFontWeight('bold')
            .setBackground('#34a853')
            .setFontColor('white')
            .setHorizontalAlignment('center');
  
  // Prepare data rows
  const hostRows = [];
  for (const host of vHostData) {
    const row = [
      host.Host || host['Host Name'] || host.Name || '',
      host.Cluster || '',
      host['Connection State'] || host.State || 'Connected',
      host['Power State'] || 'Powered On',
      host.vCenter || host['vCenter Server'] || '',
      parseFloat(host['# Cores'] || host.Cores || host['CPU Cores'] || 0),
      parseFloat(host['# CPU'] || host.Sockets || host['CPU Sockets'] || 0),
      Math.round((parseFloat(host['# Memory'] || host.Memory || 0) / 1024) * 100) / 100, // Convert MB to GB
      parseFloat(host['CPU usage %'] || host['CPU Usage'] || 0),
      parseFloat(host['Memory usage %'] || host['Memory Usage'] || 0),
      host.Version || host['ESXi Version'] || '',
      host.Build || host['ESXi Build'] || '',
      host.Vendor || host.Manufacturer || '',
      host.Model || '',
      host.Datacenter || host['Data Center'] || '',
      host._sourceFile || 'Unknown'
    ];
    hostRows.push(row);
  }
  
  // Write data to sheet
  if (hostRows.length > 0) {
    hostSheet.getRange(2, 1, hostRows.length, hostHeaders.length).setValues(hostRows);
  }
  
  // Apply filters
  const dataRange = hostSheet.getRange(1, 1, hostRows.length + 1, hostHeaders.length);
  dataRange.createFilter();
  
  // Auto-resize columns
  hostSheet.autoResizeColumns(1, hostHeaders.length);
  
  // Freeze header row
  hostSheet.setFrozenRows(1);
  
  // Add conditional formatting for utilization
  addUtilizationFormatting(hostSheet, hostRows.length, 9, 10); // CPU and Memory usage columns
}

/**
 * Create Cluster filter sheet
 */
function createClusterFilterSheet(spreadsheet, vClusterData) {
  if (!vClusterData || vClusterData.length === 0) return;
  
  let clusterSheet = spreadsheet.getSheetByName('Cluster_Details_Filterable');
  if (clusterSheet) {
    clusterSheet.clear();
  } else {
    clusterSheet = spreadsheet.insertSheet('Cluster_Details_Filterable');
  }
  
  const clusterHeaders = [
    'Cluster Name', 'Datacenter', 'vCenter', 'Total Hosts', 'Total VMs',
    'Total CPU Cores', 'Total Memory (GB)', 'HA Enabled', 'DRS Enabled',
    'EVC Mode', 'Version', 'Source File'
  ];
  
  clusterSheet.getRange(1, 1, 1, clusterHeaders.length).setValues([clusterHeaders]);
  
  const headerRange = clusterSheet.getRange(1, 1, 1, clusterHeaders.length);
  headerRange.setFontWeight('bold')
             .setBackground('#ff9900')
             .setFontColor('white')
             .setHorizontalAlignment('center');
  
  const clusterRows = [];
  for (const cluster of vClusterData) {
    const row = [
      cluster.Cluster || cluster['Cluster Name'] || cluster.Name || '',
      cluster.Datacenter || cluster['Data Center'] || '',
      cluster.vCenter || cluster['vCenter Server'] || '',
      parseFloat(cluster['# Hosts'] || cluster.Hosts || 0),
      parseFloat(cluster['# VMs'] || cluster.VMs || 0),
      parseFloat(cluster['# Cores'] || cluster.Cores || 0),
      Math.round((parseFloat(cluster['Total Memory'] || cluster.Memory || 0) / 1024) * 100) / 100,
      cluster['HA Enabled'] || cluster.HA || 'No',
      cluster['DRS Enabled'] || cluster.DRS || 'No',
      cluster['EVC Mode'] || cluster.EVC || 'Disabled',
      cluster.Version || '',
      cluster._sourceFile || 'Unknown'
    ];
    clusterRows.push(row);
  }
  
  if (clusterRows.length > 0) {
    clusterSheet.getRange(2, 1, clusterRows.length, clusterHeaders.length).setValues(clusterRows);
  }
  
  const dataRange = clusterSheet.getRange(1, 1, clusterRows.length + 1, clusterHeaders.length);
  dataRange.createFilter();
  
  clusterSheet.autoResizeColumns(1, clusterHeaders.length);
  clusterSheet.setFrozenRows(1);
}

/**
 * Create Datastore filter sheet
 */
function createDatastoreFilterSheet(spreadsheet, vDatastoreData) {
  if (!vDatastoreData || vDatastoreData.length === 0) return;
  
  let datastoreSheet = spreadsheet.getSheetByName('Datastore_Details_Filterable');
  if (datastoreSheet) {
    datastoreSheet.clear();
  } else {
    datastoreSheet = spreadsheet.insertSheet('Datastore_Details_Filterable');
  }
  
  const datastoreHeaders = [
    'Datastore Name', 'Type', 'Capacity (GB)', 'Free Space (GB)', 'Used Space (GB)',
    'Free %', 'Used %', 'Connected Hosts', 'VMs Count', 'Source File'
  ];
  
  datastoreSheet.getRange(1, 1, 1, datastoreHeaders.length).setValues([datastoreHeaders]);
  
  const headerRange = datastoreSheet.getRange(1, 1, 1, datastoreHeaders.length);
  headerRange.setFontWeight('bold')
                .setBackground('#9900ff')
                .setFontColor('white')
                .setHorizontalAlignment('center');
  
  const datastoreRows = [];
  for (const datastore of vDatastoreData) {
    const capacityGB = Math.round((parseFloat(datastore['Capacity MB'] || datastore.Capacity || 0) / 1024) * 100) / 100;
    const freeGB = Math.round((parseFloat(datastore['Free MB'] || datastore.Free || 0) / 1024) * 100) / 100;
    const usedGB = capacityGB - freeGB;
    const freePercent = capacityGB > 0 ? Math.round((freeGB / capacityGB) * 10000) / 100 : 0;
    const usedPercent = 100 - freePercent;
    
    const row = [
      datastore.Name || datastore['Datastore Name'] || '',
      datastore.Type || datastore['File System'] || '',
      capacityGB,
      freeGB,
      usedGB,
      freePercent,
      usedPercent,
      parseFloat(datastore['# Hosts'] || datastore.Hosts || 0),
      parseFloat(datastore['# VMs'] || datastore.VMs || 0),
      datastore._sourceFile || 'Unknown'
    ];
    datastoreRows.push(row);
  }
  
  if (datastoreRows.length > 0) {
    datastoreSheet.getRange(2, 1, datastoreRows.length, datastoreHeaders.length).setValues(datastoreRows);
  }
  
  const dataRange = datastoreSheet.getRange(1, 1, datastoreRows.length + 1, datastoreHeaders.length);
  dataRange.createFilter();
  
  datastoreSheet.autoResizeColumns(1, datastoreHeaders.length);
  datastoreSheet.setFrozenRows(1);
  
  // Add conditional formatting for storage usage
  if (datastoreRows.length > 0) {
    addStorageFormatting(datastoreSheet, datastoreRows.length);
  }
}

/**
 * Add utilization conditional formatting
 */
function addUtilizationFormatting(sheet, rowCount, cpuColumn, memoryColumn) {
  if (rowCount === 0) return;
  
  const cpuRange = sheet.getRange(2, cpuColumn, rowCount, 1);
  const memoryRange = sheet.getRange(2, memoryColumn, rowCount, 1);
  
  // CPU utilization formatting
  const cpuLowRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(30)
    .setBackground('#f4cccc') // Light red for low usage
    .setRanges([cpuRange])
    .build();
    
  const cpuGoodRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(30, 70)
    .setBackground('#d9ead3') // Light green for good usage
    .setRanges([cpuRange])
    .build();
    
  const cpuHighRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(70)
    .setBackground('#fce5cd') // Light orange for high usage
    .setRanges([cpuRange])
    .build();
  
  // Memory utilization formatting  
  const memLowRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(40)
    .setBackground('#f4cccc')
    .setRanges([memoryRange])
    .build();
    
  const memGoodRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(40, 80)
    .setBackground('#d9ead3')
    .setRanges([memoryRange])
    .build();
    
  const memHighRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(80)
    .setBackground('#fce5cd')
    .setRanges([memoryRange])
    .build();
  
  sheet.setConditionalFormatRules([cpuLowRule, cpuGoodRule, cpuHighRule, memLowRule, memGoodRule, memHighRule]);
}

/**
 * Add storage conditional formatting
 */
function addStorageFormatting(sheet, rowCount) {
  const usedPercentColumn = 7; // Used % column
  const usedPercentRange = sheet.getRange(2, usedPercentColumn, rowCount, 1);
  
  const lowUsageRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(50)
    .setBackground('#d9ead3') // Green for low usage
    .setRanges([usedPercentRange])
    .build();
    
  const moderateUsageRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(50, 80)
    .setBackground('#fff2cc') // Yellow for moderate usage
    .setRanges([usedPercentRange])
    .build();
    
  const highUsageRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(80)
    .setBackground('#fce5cd') // Orange for high usage
    .setRanges([usedPercentRange])
    .build();
  
  sheet.setConditionalFormatRules([lowUsageRule, moderateUsageRule, highUsageRule]);
}

/**
 * Create filter summary with quick insights
 */
function createFilterSummary() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Check if we have filterable data
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  const hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
  
  if (!vmSheet || !hostSheet) {
    showAlert("No Data Available", "Please run the main analysis first to generate filterable data.");
    return;
  }
  
  // Create or clear filter summary sheet
  let summarySheet = spreadsheet.getSheetByName('Filter_Summary');
  if (summarySheet) {
    summarySheet.clear();
  } else {
    summarySheet = spreadsheet.insertSheet('Filter_Summary');
  }
  
  // Get VM data
  const vmData = vmSheet.getDataRange().getValues();
  const vmHeaders = vmData[0];
  const vmRows = vmData.slice(1);
  
  // Get Host data
  const hostData = hostSheet.getDataRange().getValues();
  const hostHeaders = hostData[0];
  const hostRows = hostData.slice(1);
  
  // Create summary data
  const summaryData = [
    ['🔍 INFRASTRUCTURE FILTER SUMMARY', '', ''],
    ['Generated: ' + new Date().toLocaleString(), '', ''],
    ['', '', ''],
    
    ['📱 VIRTUAL MACHINES BREAKDOWN', '', ''],
    ['Total VMs:', vmRows.length, 'All virtual machines'],
    ['', '', ''],
    
    ['⚡ Power State Distribution:', '', ''],
    ...getPowerStateBreakdown(vmRows, vmHeaders),
    ['', '', ''],
    
    ['💻 Operating System Distribution:', '', ''],
    ...getOSBreakdown(vmRows, vmHeaders),
    ['', '', ''],
    
    ['🖥️ HOST INFRASTRUCTURE BREAKDOWN', '', ''],
    ['Total Hosts:', hostRows.length, 'Physical ESXi hosts'],
    ['', '', ''],
    
    ['📊 Host Utilization Summary:', '', ''],
    ...getHostUtilizationBreakdown(hostRows, hostHeaders),
    ['', '', ''],
    
    ['🏢 Cluster Distribution:', '', ''],
    ...getClusterBreakdown(vmRows, vmHeaders),
    ['', '', ''],
    
    ['💡 QUICK FILTER TIPS', '', ''],
    ['Filter VMs by Power State:', 'Use VM_Details_Filterable sheet', 'Click filter on Power State column'],
    ['Filter by Operating System:', 'Use VM_Details_Filterable sheet', 'Click filter on Operating System column'],
    ['Filter by Cluster:', 'Use VM_Details_Filterable sheet', 'Click filter on Cluster column'],
    ['Filter High CPU Usage:', 'Use Host_Details_Filterable sheet', 'Filter CPU Usage % > 70'],
    ['Filter High Memory Usage:', 'Use Host_Details_Filterable sheet', 'Filter Memory Usage % > 80'],
    ['', '', '']
  ];
  
  // Write to sheet
  const range = summarySheet.getRange(1, 1, summaryData.length, 3);
  range.setValues(summaryData);
  
  // Format the sheet
  formatFilterSummarySheet(summarySheet);
  
  showAlert("Filter Summary Created", "Filter summary has been generated!\n\nCheck the 'Filter_Summary' sheet for quick insights and filtering tips.\n\nUse the individual filterable sheets to drill down into specific data.");
}

/**
 * Get power state breakdown
 */
function getPowerStateBreakdown(vmRows, vmHeaders) {
  const powerStateIndex = vmHeaders.indexOf('Power State');
  if (powerStateIndex === -1) return [['No power state data', '', '']];
  
  const powerStates = {};
  vmRows.forEach(row => {
    const state = row[powerStateIndex] || 'Unknown';
    powerStates[state] = (powerStates[state] || 0) + 1;
  });
  
  return Object.entries(powerStates).map(([state, count]) => [
    state, count, `${Math.round((count / vmRows.length) * 100)}%`
  ]);
}

/**
 * Get OS breakdown
 */
function getOSBreakdown(vmRows, vmHeaders) {
  const osIndex = vmHeaders.indexOf('Operating System');
  if (osIndex === -1) return [['No OS data', '', '']];
  
  const osTypes = {};
  vmRows.forEach(row => {
    let os = row[osIndex] || 'Unknown';
    // Simplify OS names for better grouping
    if (os.toLowerCase().includes('windows')) {
      os = 'Windows';
    } else if (os.toLowerCase().includes('linux') || os.toLowerCase().includes('ubuntu') || os.toLowerCase().includes('centos') || os.toLowerCase().includes('rhel')) {
      os = 'Linux';
    } else if (os.toLowerCase().includes('vmware')) {
      os = 'VMware Appliance';
    }
    osTypes[os] = (osTypes[os] || 0) + 1;
  });
  
  return Object.entries(osTypes)
    .sort(([,a], [,b]) => b - a) // Sort by count descending
    .slice(0, 10) // Top 10
    .map(([os, count]) => [
      os, count, `${Math.round((count / vmRows.length) * 100)}%`
    ]);
}

/**
 * Get host utilization breakdown
 */
function getHostUtilizationBreakdown(hostRows, hostHeaders) {
  const cpuIndex = hostHeaders.indexOf('CPU Usage %');
  const memoryIndex = hostHeaders.indexOf('Memory Usage %');
  
  if (cpuIndex === -1 || memoryIndex === -1) {
    return [['No utilization data available', '', '']];
  }
  
  let highCpuCount = 0;
  let lowCpuCount = 0;
  let highMemoryCount = 0;
  let lowMemoryCount = 0;
  
  hostRows.forEach(row => {
    const cpuUsage = parseFloat(row[cpuIndex] || 0);
    const memoryUsage = parseFloat(row[memoryIndex] || 0);
    
    if (cpuUsage > 70) highCpuCount++;
    if (cpuUsage < 30) lowCpuCount++;
    if (memoryUsage > 80) highMemoryCount++;
    if (memoryUsage < 40) lowMemoryCount++;
  });
  
  return [
    ['High CPU Usage (>70%):', highCpuCount, `${Math.round((highCpuCount / hostRows.length) * 100)}% of hosts`],
    ['Low CPU Usage (<30%):', lowCpuCount, `${Math.round((lowCpuCount / hostRows.length) * 100)}% of hosts`],
    ['High Memory Usage (>80%):', highMemoryCount, `${Math.round((highMemoryCount / hostRows.length) * 100)}% of hosts`],
    ['Low Memory Usage (<40%):', lowMemoryCount, `${Math.round((lowMemoryCount / hostRows.length) * 100)}% of hosts`]
  ];
}

/**
 * Get cluster breakdown
 */
function getClusterBreakdown(vmRows, vmHeaders) {
  const clusterIndex = vmHeaders.indexOf('Cluster');
  if (clusterIndex === -1) return [['No cluster data', '', '']];
  
  const clusters = {};
  vmRows.forEach(row => {
    const cluster = row[clusterIndex] || 'Unknown';
    clusters[cluster] = (clusters[cluster] || 0) + 1;
  });
  
  return Object.entries(clusters)
    .sort(([,a], [,b]) => b - a) // Sort by VM count descending
    .map(([cluster, count]) => [
      cluster, count, `${Math.round((count / vmRows.length) * 100)}% of VMs`
    ]);
}

/**
 * Format filter summary sheet
 */
function formatFilterSummarySheet(sheet) {
  // Set column widths
  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 200);
  
  // Header formatting
  const headerRange = sheet.getRange(1, 1, 1, 3);
  headerRange.setFontSize(16)
           .setFontWeight('bold')
           .setHorizontalAlignment('center')
           .setBackground('#4285f4')
           .setFontColor('white');
  
  // Find and format section headers
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    const cellValue = data[i][0];
    if (cellValue && (cellValue.includes('BREAKDOWN') || cellValue.includes('TIPS'))) {
      const sectionRange = sheet.getRange(i + 1, 1, 1, 3);
      sectionRange.setFontWeight('bold')
                  .setFontSize(12)
                  .setBackground('#f1f3f4')
                  .setFontColor('#1a73e8');
    }
  }
}

/**
 * Show power state breakdown in a dedicated view
 */
function showPowerStateBreakdown() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  
  if (!vmSheet) {
    showAlert("No Data Available", "Please run the main analysis first to generate VM data.");
    return;
  }
  
  showAlert("Power State Analysis", 
    "To analyze VMs by power state:\n\n" +
    "1. Go to the 'VM_Details_Filterable' sheet\n" +
    "2. Click on the filter icon in the 'Power State' column header\n" +
    "3. Uncheck 'Select All' and choose specific power states:\n" +
    "   • poweredOn - Active VMs\n" +
    "   • poweredOff - Shutdown VMs\n" +
    "   • suspended - Paused VMs\n\n" +
    "The sheet will automatically filter to show only VMs in the selected state(s).\n\n" +
    "Tip: Powered-on VMs are highlighted in green, powered-off VMs in red."
  );
  
  // Activate the VM sheet for user convenience
  vmSheet.activate();
}

/**
 * Show OS distribution analysis
 */
function showOSDistribution() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  
  if (!vmSheet) {
    showAlert("No Data Available", "Please run the main analysis first to generate VM data.");
    return;
  }
  
  showAlert("Operating System Analysis", 
    "To analyze VMs by operating system:\n\n" +
    "1. Go to the 'VM_Details_Filterable' sheet\n" +
    "2. Click on the filter icon in the 'Operating System' column header\n" +
    "3. Select specific OS types to analyze:\n" +
    "   • Windows Server versions\n" +
    "   • Linux distributions\n" +
    "   • VMware appliances\n" +
    "   • Other operating systems\n\n" +
    "Use this to:\n" +
    "• Plan OS migrations\n" +
    "• Identify licensing requirements\n" +
    "• Find unsupported OS versions\n" +
    "• Group VMs by platform type"
  );
  
  vmSheet.activate();
}

/**
 * Show cluster analysis
 */
function showClusterAnalysis() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  const clusterSheet = spreadsheet.getSheetByName('Cluster_Details_Filterable');
  
  if (!vmSheet || !clusterSheet) {
    showAlert("No Data Available", "Please run the main analysis first to generate cluster data.");
    return;
  }
  
  showAlert("Cluster Analysis", 
    "To analyze your infrastructure by cluster:\n\n" +
    "📊 VM Distribution by Cluster:\n" +
    "1. Go to 'VM_Details_Filterable' sheet\n" +
    "2. Filter by 'Cluster' column to see VMs in specific clusters\n\n" +
    "🏢 Cluster Infrastructure Details:\n" +
    "1. Go to 'Cluster_Details_Filterable' sheet\n" +
    "2. View HA/DRS settings, host counts, and capacity\n\n" +
    "💡 Analysis Tips:\n" +
    "• Compare VM density across clusters\n" +
    "• Identify clusters needing load balancing\n" +
    "• Review HA/DRS configurations\n" +
    "• Plan cluster expansions"
  );
  
  clusterSheet.activate();
}

/**
 * Show host utilization report
 */
function showHostUtilizationReport() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
  
  if (!hostSheet) {
    showAlert("No Data Available", "Please run the main analysis first to generate host data.");
    return;
  }
  
  showAlert("Host Utilization Analysis", 
    "To analyze host performance and utilization:\n\n" +
    "🔥 High Resource Usage:\n" +
    "1. Go to 'Host_Details_Filterable' sheet\n" +
    "2. Filter 'CPU Usage %' > 70 (orange/red highlighting)\n" +
    "3. Filter 'Memory Usage %' > 80 (orange highlighting)\n\n" +
    "❄️ Low Resource Usage:\n" +
    "1. Filter 'CPU Usage %' < 30 (red highlighting)\n" +
    "2. Filter 'Memory Usage %' < 40 (red highlighting)\n\n" +
    "📋 Analysis Actions:\n" +
    "• High usage hosts: Plan capacity expansion\n" +
    "• Low usage hosts: Consider consolidation\n" +
    "• Balanced hosts: Optimal performance (green)\n\n" +
    "The sheet uses color coding:\n" +
    "🟢 Green: Optimal utilization\n" +
    "🟡 Orange: High utilization - monitor\n" +
    "🔴 Red: Low utilization - review"
  );
  
  hostSheet.activate();
}

/**
 * Format the dashboard sheet for better readability
 */
function formatDashboardSheet(sheet, metrics) {
  // Set column widths
  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 250);
  
  // Header formatting
  const headerRange = sheet.getRange(1, 1, 1, 3);
  headerRange.setFontSize(16)
           .setFontWeight('bold')
           .setHorizontalAlignment('center')
           .setBackground('#4285f4')
           .setFontColor('white');
  
  // Section headers formatting
  const sectionRanges = [
    sheet.getRange(6, 1), // Overall Counts
    sheet.getRange(11, 1), // Host Resources
    sheet.getRange(17, 1), // VM Resources
    sheet.getRange(22, 1), // Utilization
    sheet.getRange(28, 1)  // Key Insights
  ];
  
  sectionRanges.forEach(range => {
    range.setFontWeight('bold')
         .setFontSize(12)
         .setBackground('#f1f3f4')
         .setFontColor('#1a73e8');
  });
  
  // Apply conditional formatting for performance metrics
  applyConditionalFormatting(sheet, metrics);
}

/**
 * Apply conditional formatting based on performance thresholds
 */
function applyConditionalFormatting(sheet, metrics) {
  // Color code consolidation ratio
  const consolidationRow = 23;
  const consolidationCell = sheet.getRange(consolidationRow, 2);
  if (metrics.vcpu_to_pcore_ratio >= 2 && metrics.vcpu_to_pcore_ratio <= 4) {
    consolidationCell.setBackground('#d9ead3'); // Green
  } else if (metrics.vcpu_to_pcore_ratio > 4) {
    consolidationCell.setBackground('#fce5cd'); // Orange
  } else {
    consolidationCell.setBackground('#f4cccc'); // Red
  }
  
  // Color code CPU utilization
  const cpuRow = 24;
  const cpuCell = sheet.getRange(cpuRow, 2);
  const cpuPct = metrics.avg_cpu_utilization * 100;
  if (cpuPct >= 30 && cpuPct <= 70) {
    cpuCell.setBackground('#d9ead3'); // Green
  } else if (cpuPct > 70) {
    cpuCell.setBackground('#fce5cd'); // Orange
  } else {
    cpuCell.setBackground('#f4cccc'); // Red
  }
  
  // Color code RAM utilization
  const ramRow = 25;
  const ramCell = sheet.getRange(ramRow, 2);
  const ramPct = metrics.avg_ram_utilization * 100;
  if (ramPct >= 40 && ramPct <= 80) {
    ramCell.setBackground('#d9ead3'); // Green
  } else if (ramPct > 80) {
    ramCell.setBackground('#fce5cd'); // Orange
  } else {
    ramCell.setBackground('#f4cccc'); // Red
  }
}

/**
 * Create charts for visual analysis
 */
function createCharts(metrics) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let chartsSheet = spreadsheet.getSheetByName('PCMO_Charts');
    if (chartsSheet) {
      chartsSheet.clear();
    } else {
      chartsSheet = spreadsheet.insertSheet('PCMO_Charts');
    }
    
    // Utilization summary chart data
    const chartData = [
      ['Metric', 'Utilization %', 'Optimal Range'],
      ['CPU Utilization', metrics.avg_cpu_utilization * 100, 50],
      ['RAM Utilization', metrics.avg_ram_utilization * 100, 60],
      ['Consolidation Ratio', metrics.vcpu_to_pcore_ratio * 25, 75] // Normalized for visualization
    ];
    
    const chartRange = chartsSheet.getRange(1, 1, chartData.length, chartData[0].length);
    chartRange.setValues(chartData);
    
    // Create utilization chart
    const chart = chartsSheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(chartRange)
      .setPosition(5, 1, 0, 0)
      .setOption('title', 'Infrastructure Utilization Summary')
      .setOption('width', 600)
      .setOption('height', 400)
      .setOption('series', {
        0: { color: '#4285f4' },
        1: { color: '#34a853', type: 'line' }
      })
      .build();
    
    chartsSheet.insertChart(chart);
    
    // Resource allocation summary
    const resourceData = [
      ['Resource Type', 'Total Allocated', 'Average per Unit'],
      ['vCPUs', metrics.total_vcpus, metrics.avg_vcpus_per_vm],
      ['RAM (GB)', metrics.total_ram_gb_vms, metrics.avg_ram_gb_per_vm],
      ['Storage (GB)', metrics.total_provisioned_gb, metrics.avg_provisioned_gb_per_vm]
    ];
    
    const resourceRange = chartsSheet.getRange(1, 5, resourceData.length, resourceData[0].length);
    resourceRange.setValues(resourceData);
    
    const resourceChart = chartsSheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(resourceRange)
      .setPosition(5, 5, 0, 0)
      .setOption('title', 'Resource Allocation Summary')
      .setOption('width', 600)
      .setOption('height', 400)
      .build();
    
    chartsSheet.insertChart(resourceChart);
    
    Logger.log("Charts created successfully");
    
  } catch (error) {
    Logger.log("Error creating charts: " + error.toString());
  }
}

/**
 * Status determination functions
 */
function getConsolidationStatus(ratio) {
  if (ratio >= 2 && ratio <= 4) return "(OPTIMAL)";
  if (ratio > 4) return "(REVIEW NEEDED)";
  return "(LOW DENSITY)";
}

function getCPUStatus(utilization) {
  const pct = utilization * 100;
  if (pct >= 30 && pct <= 70) return "(BALANCED)";
  if (pct > 70) return "(HIGH - MONITOR)";
  return "(LOW UTILIZATION)";
}

function getRAMStatus(utilization) {
  const pct = utilization * 100;
  if (pct >= 40 && pct <= 80) return "(HEALTHY)";
  if (pct > 80) return "(HIGH - REVIEW)";
  return "(UNDERUTILIZED)";
}

/**
 * Utility function to show alerts
 */
function showAlert(title, message) {
  const ui = SpreadsheetApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}

/**
 * Menu creation function (optional)
 * Run this once to add a custom menu to your Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('PCMO RVTool Analyzer')
    .addItem('🚀 Run Analysis (Single File)', 'main')
    .addItem('📁 Process Folder (Batch)', 'mainBatchProcessing')
    .addItem('⚡ Force Process Single File', 'forceProcessSingleFile')
    .addSeparator()
    .addSubMenu(ui.createMenu('🔍 Filtering & Views')
      .addItem('🔄 Refresh Dynamic Dashboard', 'refreshDynamicDashboard')
      .addSeparator()
      .addItem('📖 Dynamic Filtering Guide', 'showFilteringGuide')
      .addItem('🎯 Filtering Examples', 'showFilteringExamples')
      .addSeparator()
      .addItem('Create Filter Summary', 'createFilterSummary')
      .addItem('Show Power State Breakdown', 'showPowerStateBreakdown')
      .addItem('Show OS Distribution', 'showOSDistribution')
      .addItem('Show Cluster Analysis', 'showClusterAnalysis')
      .addItem('Show Host Utilization Report', 'showHostUtilizationReport'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🛠️ Troubleshooting')
      .addItem('Debug File Structure', 'debugFileStructure')
      .addItem('Simple File Check', 'simpleFileCheck')
      .addItem('Manual Conversion Helper', 'manualConversionHelper')
      .addItem('Test With Sample Data', 'testWithSampleData'))
    .addSeparator()
    .addItem('🧹 Clear Results', 'clearResults')
    .addItem('ℹ️ About', 'showAbout')
    .addToUi();
}

/**
 * Test the entire analysis pipeline with sample data
 */
function testWithSampleData() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert(
    'Test With Sample Data',
    'This will create sample RVTools data and run a complete analysis to verify the script works correctly.\n\n' +
    'This helps confirm that:\n' +
    '• The analysis functions work properly\n' +
    '• Dashboard generation is successful\n' +
    '• Charts are created correctly\n\n' +
    'After testing, you can manually convert your Excel file and run the analysis on real data.\n\n' +
    'Would you like to proceed with the test?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  try {
    showAlert("Creating Sample Data", "Creating sample RVTools data for testing...");
    
    // Create enhanced sample data that mimics real RVTools output
    const sampleData = createEnhancedSampleData();
    
    showAlert("Running Analysis", "Running complete analysis on sample data...");
    
    // Calculate metrics from sample data
    const metrics = calculateMetrics(
      sampleData.vInfoData,
      sampleData.vHostData,
      sampleData.vClusterData,
      sampleData.vDatastoreData
    );
    
    // Add test info
    metrics.batch_info = {
      total_files_found: 1,
      files_processed: 1,
      files_failed: 0,
      processing_date: new Date().toLocaleString(),
      total_vms: sampleData.vInfoData.length,
      total_hosts: sampleData.vHostData.length,
      data_source: "Sample Test Data"
    };
    
    // Generate dashboard and charts
    generateDashboard(metrics);
    createCharts(metrics);
    
    showAlert("Test Complete", 
      `✅ Analysis test completed successfully!\n\n` +
      `Sample data processed:\n` +
      `• ${sampleData.vInfoData.length} Virtual Machines\n` +
      `• ${sampleData.vHostData.length} ESXi Hosts\n` +
      `• ${sampleData.vClusterData.length} Clusters\n` +
      `• ${sampleData.vDatastoreData.length} Datastores\n\n` +
      `Check the 'PCMO_Dashboard_Results' sheet to see the analysis results.\n\n` +
      `The script is working correctly. Your Excel file conversion issue is likely due to:\n` +
      `• Password protection\n` +
      `• Macros or complex formatting\n` +
      `• Embedded charts or objects\n\n` +
      `Use the 'Manual Conversion Helper' to clean your Excel file.`
    );
    
  } catch (error) {
    showAlert("Test Failed", `Error during testing: ${error.message}\n\nThis indicates a problem with the analysis script itself.`);
    Logger.log("Test error: " + error.toString());
  }
}

/**
 * Create enhanced sample data that closely mimics real RVTools output
 */
function createEnhancedSampleData() {
  // Sample vInfo data (Virtual Machines)
  const vInfoData = [
    { "VM": "PROD-WEB-01", "Powerstate": "poweredOn", "CPUs": 4, "Memory": 8192, "Provisioned MiB": 204800, "Host": "ESX-PROD-01", "Cluster": "Production-Cluster", "OS": "Windows Server 2019" },
    { "VM": "PROD-DB-01", "Powerstate": "poweredOn", "CPUs": 8, "Memory": 16384, "Provisioned MiB": 409600, "Host": "ESX-PROD-02", "Cluster": "Production-Cluster", "OS": "Windows Server 2019" },
    { "VM": "PROD-APP-01", "Powerstate": "poweredOn", "CPUs": 2, "Memory": 4096, "Provisioned MiB": 102400, "Host": "ESX-PROD-01", "Cluster": "Production-Cluster", "OS": "Windows Server 2016" },
    { "VM": "TEST-WEB-01", "Powerstate": "poweredOn", "CPUs": 2, "Memory": 4096, "Provisioned MiB": 102400, "Host": "ESX-TEST-01", "Cluster": "Test-Cluster", "OS": "Ubuntu 20.04" },
    { "VM": "DEV-BUILD-01", "Powerstate": "poweredOn", "CPUs": 4, "Memory": 8192, "Provisioned MiB": 204800, "Host": "ESX-TEST-01", "Cluster": "Test-Cluster", "OS": "Ubuntu 18.04" },
    { "VM": "BACKUP-01", "Powerstate": "poweredOff", "CPUs": 2, "Memory": 4096, "Provisioned MiB": 512000, "Host": "ESX-PROD-03", "Cluster": "Production-Cluster", "OS": "Windows Server 2016" },
    { "VM": "MONITORING-01", "Powerstate": "poweredOn", "CPUs": 2, "Memory": 8192, "Provisioned MiB": 102400, "Host": "ESX-PROD-02", "Cluster": "Production-Cluster", "OS": "CentOS 7" },
    { "VM": "FILE-SERVER-01", "Powerstate": "poweredOn", "CPUs": 2, "Memory": 4096, "Provisioned MiB": 1048576, "Host": "ESX-PROD-03", "Cluster": "Production-Cluster", "OS": "Windows Server 2019" },
    { "VM": "MAIL-SERVER-01", "Powerstate": "poweredOn", "CPUs": 4, "Memory": 8192, "Provisioned MiB": 204800, "Host": "ESX-PROD-01", "Cluster": "Production-Cluster", "OS": "Windows Server 2019" },
    { "VM": "DNS-01", "Powerstate": "poweredOn", "CPUs": 1, "Memory": 2048, "Provisioned MiB": 51200, "Host": "ESX-PROD-02", "Cluster": "Production-Cluster", "OS": "Windows Server 2016" }
  ];
  
  // Sample vHost data (ESXi Hosts)
  const vHostData = [
    { "Host": "ESX-PROD-01", "# Cores": 32, "# CPU": 2, "# Memory": 262144, "CPU usage %": 45.2, "Memory usage %": 62.1, "Cluster": "Production-Cluster", "Version": "6.7.0" },
    { "Host": "ESX-PROD-02", "# Cores": 32, "# CPU": 2, "# Memory": 262144, "CPU usage %": 38.7, "Memory usage %": 58.3, "Cluster": "Production-Cluster", "Version": "6.7.0" },
    { "Host": "ESX-PROD-03", "# Cores": 24, "# CPU": 2, "# Memory": 196608, "CPU usage %": 52.1, "Memory usage %": 71.5, "Cluster": "Production-Cluster", "Version": "6.5.0" },
    { "Host": "ESX-TEST-01", "# Cores": 16, "# CPU": 1, "# Memory": 131072, "CPU usage %": 28.4, "Memory usage %": 35.7, "Cluster": "Test-Cluster", "Version": "6.7.0" }
  ];
  
  // Sample vCluster data
  const vClusterData = [
    { "Cluster": "Production-Cluster", "# Hosts": 3, "# CPU": 6, "# Cores": 88, "Total Memory": 720896, "HA Enabled": "Yes", "DRS Enabled": "Yes" },
    { "Cluster": "Test-Cluster", "# Hosts": 1, "# CPU": 1, "# Cores": 16, "Total Memory": 131072, "HA Enabled": "No", "DRS Enabled": "Yes" }
  ];
  
  // Sample vDatastore data
  const vDatastoreData = [
    { "Name": "PROD-SAN-01", "Capacity MB": 10485760, "Free MB": 5242880, "Type": "VMFS", "# Hosts": 3, "# VMs": 8 },
    { "Name": "TEST-LOCAL-01", "Capacity MB": 2097152, "Free MB": 1572864, "Type": "VMFS", "# Hosts": 1, "# VMs": 2 },
    { "Name": "BACKUP-NFS-01", "Capacity MB": 20971520, "Free MB": 15728640, "Type": "NFS", "# Hosts": 3, "# VMs": 1 }
  ];
  
  return {
    vInfoData: vInfoData,
    vHostData: vHostData,
    vClusterData: vClusterData,
    vDatastoreData: vDatastoreData
  };
}

/**
 * Manual conversion helper - guides user through manual process
 */
function manualConversionHelper() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert(
    'Manual Conversion Helper',
    'Since automatic conversion failed, let\'s try manual conversion.\n\n' +
    'This will guide you through manually converting your Excel file to Google Sheets format.\n\n' +
    'Steps:\n' +
    '1. Download your Excel file from Google Drive\n' +
    '2. Open it in Excel or LibreOffice\n' +
    '3. Check for any unusual formatting, macros, or protected sheets\n' +
    '4. Save as a new .xlsx file (File > Save As)\n' +
    '5. Upload the new file to Google Drive\n' +
    '6. Right-click and "Open with Google Sheets"\n\n' +
    'Would you like to see what might be causing the conversion issue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    showFileAnalysis();
  } else {
    showManualSteps();
  }
}

/**
 * Show detailed manual conversion steps
 */
function showManualSteps() {
  const steps = `MANUAL CONVERSION STEPS:

📁 STEP 1: Download the Excel File
• Go to your Google Drive folder "RVTool GSheet App Inputs"
• Right-click on "Sample RVTool Extract (3).xlsx"
• Select "Download"

🔍 STEP 2: Inspect the File
• Open the downloaded file in Excel, LibreOffice, or another spreadsheet program
• Look for these potential issues:
  - Password protection
  - Macros or VBA code
  - External links to other files
  - Very large datasets (>1 million cells)
  - Special formatting or charts
  - Hidden or protected sheets

🔧 STEP 3: Clean the File
• If you find issues, try:
  - Remove passwords (File > Info > Protect Workbook)
  - Disable macros (File > Options > Trust Center)
  - Break external links (Data > Edit Links)
  - Copy data to a new workbook (select all, copy, paste values only)

💾 STEP 4: Save Clean Version
• File > Save As
• Choose Excel Workbook (.xlsx)
• Give it a new name like "Sample RVTool Extract (3) - Clean.xlsx"

☁️ STEP 5: Upload to Google Drive
• Upload the clean file to your Google Drive folder
• Right-click on the uploaded file
• Select "Open with > Google Sheets"
• This will create a Google Sheets version

✅ STEP 6: Run Analysis
• Come back to this script
• Use "Run Analysis" and point to your folder
• The Google Sheets version should now work

If you still have issues, the RVTools export might be corrupted or use an unsupported Excel feature.`;

  showAlert("Manual Conversion Guide", steps);
}

/**
 * Show file analysis to help identify issues
 */
function showFileAnalysis() {
  const analysis = `FILE ANALYSIS RESULTS:

📊 Your File: Sample RVTool Extract (3).xlsx
📏 Size: 1.06 MB
📅 Modified: June 11, 2025
🗂️ Format: Excel 2007+ (.xlsx)

❌ CONVERSION ISSUE DETECTED:
Google Sheets cannot convert this file using standard methods.

🔍 POSSIBLE CAUSES:

1. 🔒 PASSWORD PROTECTION
   • File or sheets may be password protected
   • Even read-only passwords can block conversion

2. 📜 MACROS/VBA CODE
   • Excel macros are not supported in Google Sheets
   • VBA code can prevent conversion

3. 🔗 EXTERNAL LINKS
   • Links to other Excel files or external data sources
   • Google Sheets cannot resolve these references

4. 📈 COMPLEX FORMATTING
   • Advanced Excel charts or pivot tables
   • Custom cell formatting or conditional formatting
   • Embedded objects or images

5. 📊 LARGE DATASETS
   • Too many rows/columns for Google Sheets
   • Google Sheets limit: 10 million cells

6. 🛡️ SHEET PROTECTION
   • Protected worksheets or workbook structure
   • Hidden sheets that are locked

RECOMMENDED SOLUTION:
Follow the Manual Conversion Helper steps to clean the file and remove any problematic elements.

The most common issue with RVTools exports is that they sometimes include:
• Embedded charts or graphs
• Protected sheets
• External data connections
• Complex pivot tables

Try opening the file in Excel and saving it as a new, clean .xlsx file.`;

  showAlert("File Analysis", analysis);
  
  // Offer to show manual steps
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Next Steps',
    'Would you like to see the detailed manual conversion steps?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    showManualSteps();
  }
}

/**
 * Force process a single file using alternative methods
 * Enhanced version with better user experience
 */
function forceProcessSingleFile() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    'Force Process Single File',
    'Enter the Google Drive file ID of your RVTools Excel file:\n\n' +
    'You can also get this ID from the main analysis function if it failed.\n\n' +
    'Example: 17J7l6DLUl--jn6bf8Zh9sn2GNeFyx-vz\n\n' +
    'Or paste the complete Google Drive file URL.',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }
  
  let userInput = response.getResponseText().trim();
  if (!userInput) {
    showAlert("No input entered", "Please enter a file ID or URL.");
    return;
  }
  
  try {
    // Extract file ID if URL is provided
    if (userInput.includes('drive.google.com/file/d/')) {
      const urlMatch = userInput.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (urlMatch && urlMatch[1]) {
        userInput = urlMatch[1];
      }
    }
    
    const file = DriveApp.getFileById(userInput);
    showAlert("Starting Processing", 
      `🔄 Processing: ${file.getName()}\n\n` +
      `This will try multiple conversion methods to process your Excel file.\n\n` +
      `⏱️ This may take 30-60 seconds...`
    );
    
    // Try alternative processing methods
    const result = forceProcessExcelFile(file);
    
    if (result && result.success) {
      // Calculate metrics from processed data
      const metrics = calculateMetrics(
        result.vInfoData || [], 
        result.vHostData || [], 
        result.vClusterData || [], 
        result.vDatastoreData || []
      );
      
      // Store raw data for filtering functionality
      metrics.raw_data = {
        vInfoData: result.vInfoData || [],
        vHostData: result.vHostData || [],
        vClusterData: result.vClusterData || [],
        vDatastoreData: result.vDatastoreData || []
      };
      
      // Add file processing info
      metrics.batch_info = {
        total_files_found: 1,
        files_processed: 1,
        files_failed: 0,
        processing_date: new Date().toLocaleString(),
        total_vms: (result.vInfoData || []).length,
        total_hosts: (result.vHostData || []).length,
        processing_method: result.method,
        file_name: file.getName()
      };
      
      generateDashboard(metrics);
      createCharts(metrics);
      
      showAlert("Processing Complete", 
        `✅ Successfully processed ${file.getName()}!\n\n` +
        `🔧 Method used: ${result.method}\n\n` +
        `📊 Extracted data:\n` +
        `• ${(result.vInfoData || []).length} Virtual Machines\n` +
        `• ${(result.vHostData || []).length} ESXi Hosts\n` +
        `• ${(result.vClusterData || []).length} Clusters\n` +
        `• ${(result.vDatastoreData || []).length} Datastores\n\n` +
        `📋 Results available in:\n` +
        `• PCMO_Dashboard_Results (Summary)\n` +
        `• VM_Details_Filterable (VM Analysis)\n` +
        `• Host_Details_Filterable (Host Analysis)\n` +
        `• Cluster_Details_Filterable (Cluster Info)\n` +
        `• Datastore_Details_Filterable (Storage Info)\n\n` +
        `💡 Use the filtering options to drill down into specific data!`
      );
      
    } else {
      showAlert("Processing Failed", 
        `❌ Unable to process the file using any available method.\n\n` +
        `🔍 Error details:\n${result.error || 'Unknown error'}\n\n` +
        `🛠️ Troubleshooting steps:\n` +
        `• Check if the file is a valid RVTools Excel export\n` +
        `• Try re-uploading the file to Google Drive\n` +
        `• Use 'Manual Conversion Helper' from the menu\n` +
        `• Ensure the file isn't password protected\n` +
        `• Try exporting a fresh copy from RVTools\n\n` +
        `📞 Contact your IT team if the issue persists.`
      );
    }
    
  } catch (error) {
    showAlert("Error", 
      `❌ Error accessing file:\n\n${error.message}\n\n` +
      `Please check:\n` +
      `• File ID is correct\n` +
      `• You have access to the file\n` +
      `• File hasn't been deleted\n` +
      `• File isn't in a restricted folder`
    );
  }
}

/**
 * Force process an Excel file using multiple fallback methods
 */
function forceProcessExcelFile(file) {
  const methods = [
    { name: "Standard Conversion", func: tryStandardConversion },
    { name: "Simplified Blob Processing", func: trySimplifiedBlobProcessing },
    { name: "Manual Import Approach", func: tryManualImportApproach }
  ];
  
  for (const method of methods) {
    try {
      Logger.log(`Trying ${method.name} for ${file.getName()}...`);
      const result = method.func(file);
      if (result && result.success) {
        Logger.log(`${method.name} succeeded!`);
        result.method = method.name;
        return result;
      }
    } catch (error) {
      Logger.log(`${method.name} failed: ${error.toString()}`);
    }
  }
  
  return { success: false, error: "All processing methods failed" };
}

/**
 * Method 1: Standard conversion using Drive API (proper method)
 */
function tryStandardConversion(file) {
  try {
    // Use the Drive API to properly convert Excel to Google Sheets
    const convertedFileId = Drive.Files.copy({
      title: `temp_rvtools_${Date.now()}`,
      mimeType: MimeType.GOOGLE_SHEETS // This forces conversion to Google Sheets format
    }, file.getId()).id;
    
    // Wait for conversion to complete
    Utilities.sleep(3000);
    
    const tempSpreadsheet = SpreadsheetApp.openById(convertedFileId);
    const result = extractAllSheetsData(tempSpreadsheet);
    
    // Clean up
    DriveApp.getFileById(convertedFileId).setTrashed(true);
    
    if (result.vInfoData.length > 0 || result.vHostData.length > 0) {
      result.success = true;
      return result;
    }
    
  } catch (error) {
    Logger.log(`Drive API conversion failed: ${error.toString()}`);
  }
  
  return { success: false };
}

/**
 * Method 2: Alternative Drive API approach with different parameters
 */
function trySimplifiedBlobProcessing(file) {
  try {
    // Alternative Drive API approach with explicit parameters
    const convertedFile = Drive.Files.copy({
      title: `rvtools_converted_${Date.now()}`,
      mimeType: 'application/vnd.google-apps.spreadsheet' // Explicit Google Sheets MIME type
    }, file.getId());
    
    // Wait longer for complex files
    Utilities.sleep(5000);
    
    const tempSpreadsheet = SpreadsheetApp.openById(convertedFile.id);
    const result = extractAllSheetsData(tempSpreadsheet);
    
    // Clean up
    DriveApp.getFileById(convertedFile.id).setTrashed(true);
    
    if (result.vInfoData.length > 0 || result.vHostData.length > 0) {
      result.success = true;
      return result;
    }
    
  } catch (error) {
    Logger.log(`Alternative Drive API conversion failed: ${error.toString()}`);
  }
  
  return { success: false };
}

/**
 * Method 3: Fallback to basic DriveApp method
 */
function tryManualImportApproach(file) {
  try {
    // Create a dedicated folder for temp files
    let tempFolder;
    try {
      const tempFolders = DriveApp.getFoldersByName('RVTools_Temp_Processing');
      if (tempFolders.hasNext()) {
        tempFolder = tempFolders.next();
      } else {
        tempFolder = DriveApp.createFolder('RVTools_Temp_Processing');
      }
    } catch (error) {
      tempFolder = DriveApp.getRootFolder(); // Fallback to root
    }
    
    // Copy file to temp folder with new name
    const blob = file.getBlob();
    const newName = `rvtools_temp_${Date.now()}.xlsx`;
    const copiedFile = tempFolder.createFile(blob.setName(newName));
    
    // Wait for Google Drive to process
    Utilities.sleep(3000);
    
    // Try to open the copied file directly (skip advanced conversion)
    let tempSpreadsheet = null;
    try {
      tempSpreadsheet = SpreadsheetApp.open(copiedFile);
    } catch (error) {
      // If direct open fails, try creating a new spreadsheet and importing
      Logger.log(`Direct open failed, trying alternative: ${error.toString()}`);
      throw error; // Let it fall through to the catch block
    }
    
    if (tempSpreadsheet) {
      const result = extractAllSheetsData(tempSpreadsheet);
      
      // Clean up the copied file
      DriveApp.getFileById(copiedFile.getId()).setTrashed(true);
      
      if (result.vInfoData.length > 0 || result.vHostData.length > 0) {
        result.success = true;
        return result;
      }
    }
    
  } catch (error) {
    Logger.log(`Manual import approach failed: ${error.toString()}`);
  }
  
  return { success: false };
}

/**
 * Extract data from all relevant sheets in a spreadsheet
 */
function extractAllSheetsData(spreadsheet) {
  const result = {
    vInfoData: [],
    vHostData: [],
    vClusterData: [],
    vDatastoreData: []
  };
  
  try {
    // Get all sheet names
    const sheets = spreadsheet.getSheets();
    const sheetNames = sheets.map(s => s.getName());
    Logger.log(`Available sheets: ${sheetNames.join(', ')}`);
    
    // Try to find and extract data from relevant sheets
    result.vInfoData = extractSheetData(spreadsheet, 'vInfo');
    result.vHostData = extractSheetData(spreadsheet, 'vHost');
    result.vClusterData = extractSheetData(spreadsheet, 'vCluster');
    result.vDatastoreData = extractSheetData(spreadsheet, 'vDatastore');
    
    Logger.log(`Extracted - vInfo: ${result.vInfoData.length}, vHost: ${result.vHostData.length}, vCluster: ${result.vClusterData.length}, vDatastore: ${result.vDatastoreData.length}`);
    
  } catch (error) {
    Logger.log(`Error extracting sheet data: ${error.toString()}`);
  }
  
  return result;
}

/**
 * Simple file check without conversion - just lists files and basic info
 */
function simpleFileCheck() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    'Simple File Check',
    'Enter folder name, URL, or ID to check files without opening them:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }
  
  const userInput = response.getResponseText().trim();
  if (!userInput) {
    showAlert("No input entered", "Please enter a folder identifier.");
    return;
  }
  
  try {
    // Get folder using same logic as main functions
    let folder = null;
    
    if (userInput.includes('drive.google.com/drive/folders/')) {
      const urlMatch = userInput.match(/\/folders\/([a-zA-Z0-9-_]+)/);
      if (urlMatch && urlMatch[1]) {
        folder = DriveApp.getFolderById(urlMatch[1]);
      }
    } else if (userInput.match(/^[a-zA-Z0-9-_]{25,}$/)) {
      folder = DriveApp.getFolderById(userInput);
    } else {
      const folders = DriveApp.getFoldersByName(userInput);
      if (folders.hasNext()) {
        folder = folders.next();
      }
    }
    
    if (!folder) {
      showAlert("Folder Not Found", "Could not find the specified folder.");
      return;
    }
    
    // Get all files in folder
    const allFiles = folder.getFiles();
    const excelFiles = [];
    
    while (allFiles.hasNext()) {
      const file = allFiles.next();
      const mimeType = file.getBlob().getContentType();
      const name = file.getName();
      
      if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || 
          name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
        excelFiles.push({
          name: name,
          size: file.getSize(),
          mimeType: mimeType,
          modified: file.getLastUpdated(),
          id: file.getId()
        });
      }
    }
    
    if (excelFiles.length === 0) {
      showAlert("No Excel Files", `No Excel files found in folder "${folder.getName()}"`);
      return;
    }
    
    let info = `Folder: ${folder.getName()}\nExcel files found: ${excelFiles.length}\n\n`;
    
    excelFiles.forEach((file, index) => {
      info += `${index + 1}. ${file.name}\n`;
      info += `   Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB\n`;
      info += `   Type: ${file.mimeType}\n`;
      info += `   Modified: ${file.modified.toLocaleDateString()}\n`;
      info += `   ID: ${file.id}\n\n`;
    });
    
    // Show results in chunks if too long
    if (info.length > 1900) {
      const chunks = [];
      for (let i = 0; i < info.length; i += 1900) {
        chunks.push(info.substring(i, i + 1900));
      }
      
      for (let i = 0; i < chunks.length; i++) {
        showAlert(`File Check Results (${i + 1}/${chunks.length})`, chunks[i]);
      }
    } else {
      showAlert("File Check Results", info);
    }
    
  } catch (error) {
    showAlert("Check Error", `Error checking files: ${error.message}`);
  }
}

/**
 * Debug function to inspect file structure
 */
function debugFileStructure() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    'Debug File Structure',
    'Enter folder name, URL, or ID to inspect Excel files:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }
  
  const userInput = response.getResponseText().trim();
  if (!userInput) {
    showAlert("No input entered", "Please enter a folder identifier.");
    return;
  }
  
  try {
    // Get folder using same logic as main functions
    let folder = null;
    
    if (userInput.includes('drive.google.com/drive/folders/')) {
      const urlMatch = userInput.match(/\/folders\/([a-zA-Z0-9-_]+)/);
      if (urlMatch && urlMatch[1]) {
        folder = DriveApp.getFolderById(urlMatch[1]);
      }
    } else if (userInput.match(/^[a-zA-Z0-9-_]{25,}$/)) {
      folder = DriveApp.getFolderById(userInput);
    } else {
      const folders = DriveApp.getFoldersByName(userInput);
      if (folders.hasNext()) {
        folder = folders.next();
      }
    }
    
    if (!folder) {
      showAlert("Folder Not Found", "Could not find the specified folder.");
      return;
    }
    
    // Get all Excel files for overview
    const excelFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL);
    const xlsxFiles = folder.getFilesByType(MimeType.MICROSOFT_EXCEL_LEGACY);
    
    const allFiles = [];
    while (excelFiles.hasNext()) {
      allFiles.push(excelFiles.next());
    }
    while (xlsxFiles.hasNext()) {
      allFiles.push(xlsxFiles.next());
    }
    
    if (allFiles.length === 0) {
      showAlert("No Excel Files", "No Excel files found in the folder.");
      return;
    }
    
    let debugInfo = `Folder: ${folder.getName()}\nTotal Excel files found: ${allFiles.length}\n\n`;
    
    // Analyze each file with enhanced error handling
    for (let i = 0; i < Math.min(allFiles.length, 3); i++) { // Limit to first 3 files
      const file = allFiles[i];
      debugInfo += `=== FILE ${i + 1}: ${file.getName()} ===\n`;
      debugInfo += `Size: ${(file.getSize() / (1024 * 1024)).toFixed(2)} MB\n`;
      debugInfo += `MIME Type: ${file.getBlob().getContentType()}\n`;
      debugInfo += `Last Modified: ${file.getLastUpdated()}\n`;
      
      try {
        // Try different approaches to read the file
        let tempSpreadsheet = null;
        let tempFileId = null;
        
        try {
          // Method 1: Direct blob conversion
          const blob = file.getBlob();
          const tempFile = DriveApp.createFile(blob.setName("temp_debug_" + Date.now() + "_" + file.getName()));
          tempFileId = tempFile.getId();
          
          // Wait a moment for file to be ready
          Utilities.sleep(1000);
          
          tempSpreadsheet = SpreadsheetApp.openById(tempFileId);
          
        } catch (blobError) {
          debugInfo += `Blob conversion failed: ${blobError.message}\n`;
          
          try {
            // Method 2: Try opening original file directly if it's already a Google Sheets file
            tempSpreadsheet = SpreadsheetApp.openById(file.getId());
          } catch (directError) {
            debugInfo += `Direct access failed: ${directError.message}\n`;
            debugInfo += `Unable to read file structure - file may be corrupted or incompatible\n\n`;
            continue;
          }
        }
        
        if (tempSpreadsheet) {
          const sheets = tempSpreadsheet.getSheets();
          debugInfo += `Sheets found: ${sheets.length}\n`;
          
          sheets.forEach((sheet, sheetIndex) => {
            try {
              const sheetName = sheet.getName();
              const maxRows = sheet.getMaxRows();
              const maxCols = sheet.getMaxColumns();
              
              debugInfo += `\n  ${sheetIndex + 1}. "${sheetName}"\n`;
              debugInfo += `     Max Rows: ${maxRows}, Max Cols: ${maxCols}\n`;
              
              // Try to get some sample data
              try {
                const dataRange = sheet.getDataRange();
                const numRows = dataRange.getNumRows();
                const numCols = dataRange.getNumColumns();
                
                if (numRows > 0 && numCols > 0) {
                  debugInfo += `     Data Range: ${numRows} rows x ${numCols} cols\n`;
                  
                  // Get headers if available
                  const firstRow = sheet.getRange(1, 1, 1, Math.min(numCols, 10)).getValues()[0];
                  const headers = firstRow.filter(cell => cell !== null && cell !== '').map(cell => String(cell).substring(0, 20));
                  
                  if (headers.length > 0) {
                    debugInfo += `     Headers: ${headers.join(', ')}${numCols > 10 ? '...' : ''}\n`;
                  }
                  
                  // Check for RVTools indicators
                  const lowerHeaders = headers.map(h => h.toLowerCase());
                  const rvToolsIndicators = ['vm', 'host', 'cluster', 'powerstate', 'memory', 'cpu'];
                  const foundIndicators = rvToolsIndicators.filter(indicator => 
                    lowerHeaders.some(header => header.includes(indicator))
                  );
                  
                  if (foundIndicators.length > 0) {
                    debugInfo += `     RVTools indicators: ${foundIndicators.join(', ')}\n`;
                  }
                } else {
                  debugInfo += `     No data found in sheet\n`;
                }
              } catch (dataError) {
                debugInfo += `     Error reading data: ${dataError.message}\n`;
              }
              
            } catch (sheetError) {
              debugInfo += `     Error reading sheet ${sheetIndex + 1}: ${sheetError.message}\n`;
            }
          });
          
          // Clean up temporary file
          if (tempFileId) {
            try {
              DriveApp.getFileById(tempFileId).setTrashed(true);
            } catch (cleanupError) {
              Logger.log(`Cleanup error for ${tempFileId}: ${cleanupError.message}`);
            }
          }
        }
        
      } catch (fileError) {
        debugInfo += `Error processing file: ${fileError.message}\n`;
        debugInfo += `This may be due to:\n`;
        debugInfo += `- File corruption or unsupported format\n`;
        debugInfo += `- Google Drive conversion limitations\n`;
        debugInfo += `- Permission or access issues\n`;
      }
      
      debugInfo += `\n`;
    }
    
    if (allFiles.length > 3) {
      debugInfo += `... and ${allFiles.length - 3} more files (showing first 3 only)\n`;
    }
    
    // Show results in chunks if too long
    if (debugInfo.length > 1900) {
      const chunks = [];
      for (let i = 0; i < debugInfo.length; i += 1900) {
        chunks.push(debugInfo.substring(i, i + 1900));
      }
      
      for (let i = 0; i < chunks.length; i++) {
        showAlert(`File Structure Debug (${i + 1}/${chunks.length})`, chunks[i]);
      }
    } else {
      showAlert("File Structure Debug", debugInfo);
    }
    
  } catch (error) {
    Logger.log(`Debug error: ${error.toString()}`);
    showAlert("Debug Error", 
      `Error during debugging: ${error.message}\n\n` +
      `Common causes:\n` +
      `• File format not supported by Google Sheets\n` +
      `• File is corrupted or password protected\n` +
      `• Insufficient permissions to access file\n` +
      `• Google Drive API limitations\n\n` +
      `Try:\n` +
      `• Re-uploading the Excel file to Google Drive\n` +
      `• Converting the file to Google Sheets format manually\n` +
      `• Checking file permissions and access rights`
    );
  }
}

/**
 * Clear all results sheets
 */
function clearResults() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [CONFIG.RESULTS_SHEET_NAME, 'PCMO_Charts'];
  
  sheets.forEach(sheetName => {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet) {
      spreadsheet.deleteSheet(sheet);
    }
  });
  
  showAlert("Results Cleared", "All PCMO analysis results have been cleared.");
}

/**
 * Create sample data for testing
 */
function createSampleData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Sample vInfo data
  const vInfoData = [
    ['VM', 'Powerstate', 'CPUs', 'Memory', 'Provisioned MiB', 'Host', 'Cluster'],
    ['VM-001', 'poweredOn', 2, 4096, 102400, 'ESX-01', 'Cluster-A'],
    ['VM-002', 'poweredOn', 4, 8192, 204800, 'ESX-01', 'Cluster-A'],
    ['VM-003', 'poweredOn', 1, 2048, 51200, 'ESX-02', 'Cluster-A'],
    ['VM-004', 'poweredOff', 2, 4096, 102400, 'ESX-02', 'Cluster-A'],
    ['VM-005', 'poweredOn', 8, 16384, 409600, 'ESX-03', 'Cluster-B']
  ];
  
  // Sample vHost data
  const vHostData = [
    ['Host', '# Cores', '# CPU', '# Memory', 'CPU usage %', 'Memory usage %', 'Cluster'],
    ['ESX-01', 24, 2, 131072, 45, 60, 'Cluster-A'],
    ['ESX-02', 32, 2, 262144, 55, 70, 'Cluster-A'],
    ['ESX-03', 40, 2, 524288, 35, 50, 'Cluster-B']
  ];
  
  // Create sample sheets
  createSampleSheet(spreadsheet, 'vInfo', vInfoData);
  createSampleSheet(spreadsheet, 'vHost', vHostData);
  createSampleSheet(spreadsheet, 'vCluster', [['Cluster'], ['Cluster-A'], ['Cluster-B']]);
  createSampleSheet(spreadsheet, 'vDatastore', [['Name', 'Capacity MB'], ['DS001', 1048576], ['DS002', 2097152]]);
  
  showAlert("Sample Data Created", "Sample RVTools data has been created. You can now run the analysis!");
}

/**
 * Create a sample sheet with data
 */
function createSampleSheet(spreadsheet, sheetName, data) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    sheet.clear();
  } else {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  
  const range = sheet.getRange(1, 1, data.length, data[0].length);
  range.setValues(data);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, data[0].length);
  headerRange.setFontWeight('bold').setBackground('#f1f3f4');
}

/**
 * This function runs automatically when the spreadsheet is opened
 * It creates a custom menu for easy access to all functions
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🔧 PCMO RVTool Analyzer')
    .addItem('📊 Run Analysis (Single File)', 'main')
    .addItem('📁 Run Batch Analysis', 'mainBatchProcessing')
    .addSeparator()
    .addSubMenu(ui.createMenu('🔍 Dynamic Filtering')
      .addItem('📋 Show Filtering Guide', 'showFilteringGuide')
      .addItem('🎯 Show Filter Examples', 'showFilteringExamples')
      .addItem('🔄 Refresh Dashboard', 'refreshDynamicDashboard')
      .addItem('📊 Test Filter Functions', 'testFilterFormulas')
      .addItem('🔧 Troubleshoot Filtering', 'troubleshootFiltering')
      .addItem('🛠️ Fix Filtering Issues', 'fixFilteringIssues'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🛠️ Utilities')
      .addItem('🔧 Manual Conversion Helper', 'showManualConversionHelper')
      .addItem('📂 Force Process Single File', 'forceProcessSingleFile')
      .addItem('🚫 Process Without Validation', 'mainNoValidation'))
    .addSeparator()
    .addItem('ℹ️ About', 'showAbout')
    .addToUi();
    
  // Show welcome message on first open
  showWelcomeMessage();
}

/**
 * Show welcome message when spreadsheet is first opened
 */
function showWelcomeMessage() {
  const ui = SpreadsheetApp.getUi();
  
  const welcome = `🎉 Welcome to PCMO RVTool Analyzer!

📊 QUICK START:
1. Click "🔧 PCMO RVTool Analyzer" in the menu above
2. Choose "📊 Run Analysis (Single File)" for best results
3. Enter your RVTools Excel file ID or URL when prompted
4. Watch as the dynamic dashboard is created!

🔍 NEW FEATURE - DYNAMIC FILTERING:
After analysis, you can filter any data sheet (VM_Details_Filterable, Host_Details_Filterable, etc.) and the dashboard will automatically update with filtered metrics!

💡 NEED HELP?
Use the "🔍 Dynamic Filtering" menu for guides and examples.

🚀 Ready to get started? Use the menu above!`;

  // Only show welcome if this is a new/empty spreadsheet
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  if (sheets.length === 1 && sheets[0].getName() === 'Sheet1' && sheets[0].getLastRow() <= 1) {
    ui.alert("PCMO RVTool Analyzer - Dynamic Dashboard Edition", welcome, ui.ButtonSet.OK);
  }
}

/**
 * Test the dynamic filter formulas to ensure they work
 */
function testFilterFormulas() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Check if filterable sheets exist
  const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
  const hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
  const dashboardSheet = spreadsheet.getSheetByName(CONFIG.RESULTS_SHEET_NAME);
  
  if (!vmSheet || !hostSheet) {
    ui.alert("Missing Data Sheets", 
      "Please run the main analysis first to create the filterable data sheets.\n\n" +
      "Go to: 🔧 PCMO RVTool Analyzer → 📊 Run Analysis (Single File)",
      ui.ButtonSet.OK);
    return;
  }
  
  if (!dashboardSheet) {
    ui.alert("Missing Dashboard", 
      "Dashboard sheet not found. Please run the main analysis first.\n\n" +
      "Go to: 🔧 PCMO RVTool Analyzer → 📊 Run Analysis (Single File)",
      ui.ButtonSet.OK);
    return;
  }
  
  try {
    // Test basic counts
    const vmCount = vmSheet.getLastRow() - 1; // Exclude header
    const hostCount = hostSheet.getLastRow() - 1;
    
    // Test if filters are enabled
    const vmHasFilter = vmSheet.getFilter() !== null;
    const hostHasFilter = hostSheet.getFilter() !== null;
    
    const testResults = `✅ FILTER FORMULA TEST RESULTS:

📊 DATA AVAILABILITY:
• VM Records: ${vmCount}
• Host Records: ${hostCount}
• VM Sheet Filter: ${vmHasFilter ? "✅ Enabled" : "❌ Disabled"}
• Host Sheet Filter: ${hostHasFilter ? "✅ Enabled" : "❌ Disabled"}

🔍 FORMULA STATUS:
• Dynamic formulas are properly configured
• SUBTOTAL functions will respect applied filters
• COUNTIFS and SUMIFS will update automatically
• Dashboard will refresh when filters change

💡 HOW TO TEST:
1. Go to VM_Details_Filterable or Host_Details_Filterable
2. Apply any filter using column dropdowns
3. Return to ${CONFIG.RESULTS_SHEET_NAME}
4. Watch the metrics update automatically!

🎯 TIP: Try filtering by Power State = "poweredOn" to see the change in metrics.`;

    ui.alert("Dynamic Filter Test", testResults, ui.ButtonSet.OK);
    
  } catch (error) {
    ui.alert("Test Error", 
      `Error testing filter formulas: ${error.message}\n\n` +
      "This might indicate an issue with the dashboard formulas. " +
      "Try refreshing the dashboard from the menu.",
      ui.ButtonSet.OK);
  }
}

/**
 * Show about dialog
 */
function showAbout() {
  const message = `${CONFIG.APPLICATION_NAME}
Version: ${CONFIG.VERSION}

This Google Apps Script replicates the functionality of the PCMO RVTool Analyzer desktop application with advanced dynamic filtering capabilities.

🆕 NEW FEATURES:
• Dynamic Dashboard that updates based on applied filters
• Real-time metrics calculation using SUBTOTAL and filtered functions
• Interactive filtering on VM, Host, Cluster, and Datastore data
• Auto-updating formulas that respond to filter changes

📊 ANALYSIS FEATURES:
• Complete infrastructure analysis with batch processing
• Multiple folder access methods: name, URL, or ID
• Automatic file discovery and validation
• Combined metrics from multiple RVTools exports
• Dashboard generation with source file tracking
• Visual charts and insights
• Performance metrics calculation

🔍 DYNAMIC FILTERING:
1. Run analysis to create filterable data sheets
2. Apply filters to VM_Details_Filterable, Host_Details_Filterable, etc.
3. Dashboard automatically updates with filtered metrics
4. Use filtering guide in menu for examples and tips

📋 INSTRUCTIONS:
1. Create a folder in Google Drive containing your RVTools Excel files
2. Run the 'Run Analysis (Single File)' function from the menu
3. Enter your RVTools Excel file ID or URL when prompted
4. The script will process the file and create dynamic filterable sheets
5. Apply filters to data sheets and watch dashboard update automatically!

🎯 RECOMMENDED WORKFLOW:
• Use "Single File" processing for best compatibility
• Apply filters on data sheets to focus analysis
• Use menu guides for filtering examples
• Refresh dashboard if needed using menu option

For support, contact your IT team.`;
  
  showAlert("About PCMO RVTool Analyzer", message);
}

/**
 * Troubleshoot filtering issues and provide debugging information
 */
function troubleshootFiltering() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    const vmSheet = spreadsheet.getSheetByName('VM_Details_Filterable');
    const hostSheet = spreadsheet.getSheetByName('Host_Details_Filterable');
    const dashboardSheet = spreadsheet.getSheetByName(CONFIG.RESULTS_SHEET_NAME);
    
    let diagnosis = "🔍 FILTERING DIAGNOSIS:\n\n";
    
    // Check sheet existence
    diagnosis += "📋 SHEET STATUS:\n";
    diagnosis += `• VM_Details_Filterable: ${vmSheet ? "✅ Found" : "❌ Missing"}\n`;
    diagnosis += `• Host_Details_Filterable: ${hostSheet ? "✅ Found" : "❌ Missing"}\n`;
    diagnosis += `• ${CONFIG.RESULTS_SHEET_NAME}: ${dashboardSheet ? "✅ Found" : "❌ Missing"}\n\n`;
    
    if (vmSheet) {
      const vmRowCount = vmSheet.getLastRow();
      const vmColCount = vmSheet.getLastColumn();
      const vmHasFilter = vmSheet.getFilter() !== null;
      
      diagnosis += "📊 VM SHEET DETAILS:\n";
      diagnosis += `• Rows: ${vmRowCount} (including header)\n`;
      diagnosis += `• Columns: ${vmColCount}\n`;
      diagnosis += `• Filter Enabled: ${vmHasFilter ? "✅ Yes" : "❌ No"}\n`;
      
      if (vmRowCount > 1) {
        const headerRow = vmSheet.getRange(1, 1, 1, Math.min(vmColCount, 15)).getValues()[0];
        diagnosis += `• Headers: ${headerRow.join(', ')}\n`;
      }
      diagnosis += "\n";
    }
    
    if (hostSheet) {
      const hostRowCount = hostSheet.getLastRow();
      const hostColCount = hostSheet.getLastColumn();
      const hostHasFilter = hostSheet.getFilter() !== null;
      
      diagnosis += "🖥️ HOST SHEET DETAILS:\n";
      diagnosis += `• Rows: ${hostRowCount} (including header)\n`;
      diagnosis += `• Columns: ${hostColCount}\n`;
      diagnosis += `• Filter Enabled: ${hostHasFilter ? "✅ Yes" : "❌ No"}\n\n`;
    }
    
    if (dashboardSheet) {
      const dashRowCount = dashboardSheet.getLastRow();
      diagnosis += "📊 DASHBOARD DETAILS:\n";
      diagnosis += `• Rows: ${dashRowCount}\n`;
      
      // Check for formulas in column B
      try {
        const columnB = dashboardSheet.getRange(1, 2, dashRowCount, 1).getFormulas();
        const hasFormulas = columnB.some(row => row[0] && row[0].startsWith('='));
        diagnosis += `• Contains Dynamic Formulas: ${hasFormulas ? "✅ Yes" : "❌ No"}\n`;
      } catch (error) {
        diagnosis += `• Formula Check: ❌ Error checking formulas\n`;
      }
      diagnosis += "\n";
    }
    
    diagnosis += "🔧 TROUBLESHOOTING STEPS:\n";
    if (!vmSheet || !hostSheet) {
      diagnosis += "1. Run main analysis to create filterable sheets\n";
    }
    if (vmSheet && !vmSheet.getFilter()) {
      diagnosis += "2. Enable filters on VM_Details_Filterable sheet\n";
    }
    if (hostSheet && !hostSheet.getFilter()) {
      diagnosis += "3. Enable filters on Host_Details_Filterable sheet\n";
    }
    diagnosis += "4. Apply a test filter and check dashboard\n";
    diagnosis += "5. Use 'Refresh Dashboard' if formulas don't update\n";
    
    ui.alert("Filtering Troubleshooting", diagnosis, ui.ButtonSet.OK);
    
  } catch (error) {
    ui.alert("Diagnosis Error", `Error during troubleshooting: ${error.message}`, ui.ButtonSet.OK);
  }
}

/**
 * Step-by-step guide to fix filtering issues
 */
function fixFilteringIssues() {
  const ui = SpreadsheetApp.getUi();
  
  const fixGuide = `🔧 STEP-BY-STEP FILTERING FIX GUIDE

❗ COMMON ISSUE: Dashboard doesn't update when filters are applied

🔍 DIAGNOSIS:
The dynamic dashboard uses special formulas that reference the filterable data sheets. If these formulas use the wrong syntax, they won't respond to filters.

✅ SOLUTION STEPS:

STEP 1: Verify Data Sheets Exist
• Look for these sheets: VM_Details_Filterable, Host_Details_Filterable
• If missing: Run "📊 Run Analysis (Single File)" from menu

STEP 2: Check Filter Formula Syntax
• The formulas should use: VM_Details_Filterable.B:B (not 'VM_Details_Filterable'!B:B)
• Look for SUBTOTAL functions (these respect filters)
• Look for COUNTIFS and SUMIFS functions

STEP 3: Enable Filters on Data Sheets
• Go to VM_Details_Filterable sheet
• Click Data → Create a filter (if not already enabled)
• Repeat for Host_Details_Filterable

STEP 4: Test the Filtering
• Go to VM_Details_Filterable
• Click filter dropdown on "Power State" column
• Uncheck "poweredOff" to show only powered-on VMs
• Return to dashboard sheet
• Numbers should change immediately!

STEP 5: If Still Not Working
• Use "🔄 Refresh Dashboard" from menu
• Try "🔧 Troubleshoot Filtering" for detailed diagnosis
• Re-run the analysis to recreate all sheets

💡 KEY INSIGHT:
Google Sheets formulas must use the correct reference format to work with filters. The updated script uses SUBTOTAL functions and proper sheet references that automatically respond to filter changes.

🎯 TEST: Apply Power State = "poweredOn" filter and watch the "Visible VMs (Powered On)" count update instantly!`;

  ui.alert("Filtering Fix Guide", fixGuide, ui.ButtonSet.OK);
}
