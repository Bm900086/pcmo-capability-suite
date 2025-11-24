/**
 * @OnlyCurrentDoc
 * This function serves the HTML file of the web app when a user accesses the URL.
 */
function doGet() {
  // Get the email of the user accessing the web app
  const userEmail = Session.getActiveUser().getEmail();

  // Create a template from the Index.html file
  const htmlTemplate = HtmlService.createTemplateFromFile('Index');

  // Pass the user's email to the template
  htmlTemplate.userEmail = userEmail;

  // Evaluate the template and set title/X-Frame options
  return htmlTemplate.evaluate()
    .setTitle('VCF 9.0 Adoption Readiness Application')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Saves the provided assessment data to a sheet named "Assessment Log".
 * @param {object} data The assessment data sent from the client-side JavaScript.
 * @return {string} A success message.
 */
function saveAssessmentData(data) {
  try {
    const sheetName = "Assessment Log";
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    // IMPORTANT: This pathData object MUST be an exact copy from your index.html's
    // JavaScript. It's used here for dynamic header generation consistency.
    const pathData = {
            'path1': {
                title: "Path 1: Deploy New VCF 9 Environment (Greenfield)",
                description: "Start fresh with a new VCF 9 deployment. Ideal for new projects, hardware refreshes, or when an in-place upgrade is too complex.",
                customer: {
                    title: "Customer Considerations",
                    details: [
                        { icon: 'fa-solid fa-server', text: '<strong>Lowest Risk:</strong> This path is the safest as your current production environment remains untouched during the build phase.' },
                        { icon: 'fa-solid fa-dollar-sign', text: '<strong>Highest Initial Cost:</strong> Requires capital expenditure for new hardware and running two environments in parallel during migration.' },
                        { icon: 'fa-solid fa-broom', text: '<strong>Clean Slate:</strong> Avoids carrying over legacy configuration issues or technical debt.' }
                    ]
                },
                delivery: {
                    title: "Delivery Considerations",
                    sections: [
                        { title: "Tools Involved", icon: "fa-solid fa-wrench", items: ["VCF Installer", "VMware HCX (Optional for migration)"] },
                        { title: "Design Options", icon: "fa-solid fa-sitemap", items: ["Appliance Model: Simple (lab) or HA (production)", "Fleet Topology: Single-Site or Multi-Site"] },
                        { title: "Key Implementation Activities", icon: "fa-solid fa-list-check", items: ["Deploy VCF Installer & run automated deployment", "Build Workload Domains", "Deploy & configure HCX for migration", "Execute migration waves", "License & Decommission"] },
                    ]
                },
                greenfieldQuestions: [
                    { id: "gf-hcl", text: "Does Customer have supported hardware for VCF 9 based on HCL? Yes or No", category: "Hardware", type: "boolean", yes: "You can Deploy VCF 9.0", no: "You cannot Deploy VCF 9.0" },
                    { id: "gf-storage", text: "What Primary Storage will be used to deploy VCF 9.0?", category: "Storage", type: "select",
                        options: [
                            { value: "vSAN ESA", result: "You can Deploy VCF 9.0" },
                            { value: "vSAN OSA", result: "You can Deploy VCF 9.0" },
                            { value: "Fibre Channel(FC)", result: "You can Deploy VCF 9.0" },
                            { value: "NFS", result: "You can Deploy VCF 9.0" },
                            { value: "Other", result: "You cannot Deploy VCF 9.0 with any other type of Storage Protocol vSAN ESA, vSAN OSA, Fibre Channel(FC), NFS" }
                        ]
                    },
                    { id: "gf-min-hosts", text: 'Have you confirmed that a minimum of 4 HCL-compliant ESXi hosts are available for the management domain? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Environment", type: "boolean", yes: "The minimum host count for the management domain is met.", no: "You cannot proceed. A minimum of 4 ESXi hosts is required for the VCF Management Domain." },
                    { id: "gf-redundant-switches", text: 'Are redundant physical network switches (e.g., ToR switches) in place for all VCF host connections? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Networking", type: "boolean", yes: "Redundant networking hardware is in place, reducing single points of failure.", no: "Deployment can proceed, but this is a high-risk configuration. Redundant switches are strongly recommended for production. -- Caution" },
                    { id: "gf-vlan-planning", text: 'Have all required VLANs (Management, vSAN, vMotion, etc.) and their corresponding subnets/IP pools been planned and documented? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Networking", type: "boolean", yes: "IP and VLAN planning is complete, which is a critical step for a successful bring-up.", no: "You cannot proceed. Complete and document all IP and VLAN planning before starting the deployment." },
                    { id: "gf-ntp", text: 'Are NTP servers available on the network, and have all planned components been configured for time synchronization? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Environment", type: "boolean", yes: "Proper time synchronization is configured, which is essential for stable operations.", no: "You cannot proceed. Consistent NTP is mandatory for all VCF components." },
                    { id: "gf-dns", text: 'Has DNS been configured with both Forward (A) and Reverse (PTR) lookup records for all planned VCF components (SDDC Manager, vCenter, NSX, Hosts)? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Environment", type: "boolean", yes: "DNS is correctly configured, which is required for component communication.", no: "You cannot proceed. Fully functional DNS with both forward and reverse lookups is mandatory." },
                    { id: "gf-software", text: 'Have all required VCF 9.0 software components (Cloud Builder, ESXi ISOs, etc.) been downloaded from the Broadcom support portal? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Software", type: "boolean", yes: "All necessary software is downloaded and ready for deployment.", no: "Please download all required software from the VCF 9.0 Bill of Materials (BOM) before proceeding." },
                    { id: "gf-licenses", text: 'Are all necessary VCF 9.0 licenses (VCF, vSphere, vSAN, NSX) available and documented? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Licensing", type: "boolean", yes: "All required licenses are available.", no: "You cannot deploy VCF 9.0 without the appropriate licenses. Please acquire them first." },
                    { id: "gf-backup", text: 'Do you have a documented backup strategy for critical components (SDDC Manager, vCenter, NSX) that will be implemented immediately after deployment? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Operations", type: "boolean", yes: "A day-one backup strategy is planned, which is critical for operational readiness.", no: "It is highly recommended to have a backup plan ready before deployment to avoid data loss risk. -- Caution" }
                ]
            },
            'path2': {
                title: "Path 2: Upgrade Existing VMware Environment to VCF 9 (Brownfield)",
                description: "Convert your existing VMWare vSphere environment into a full VCF 9 Fleet, leveraging your current hardware.",
                customer: {
                    title: "Customer Considerations",
                    details: [
                        { icon: 'fa-solid fa-triangle-exclamation', text: '<strong>Caution:</strong> The conversion process is complex and intrusive. A failure during a critical step can lead to significant downtime.' },
                        { icon: 'fa-solid fa-piggy-bank', text: '<strong>Lower Hardware Cost:</strong> Leverages existing hardware, avoiding a major new purchase.' },
                        { icon: 'fa-solid fa-list-ol', text: '<strong>Mandatory Prerequisites:</strong> This path is not possible unless all remediation steps (Break ELM, Convert to vLCM Images) are completed.' }
                    ]
                },
                delivery: {
                    title: "Delivery Considerations",
                    sections: [
                        { title: "Tools Involved", icon: "fa-solid fa-wrench", items: ["vCenter Installer & Lifecycle Manager", "VCF Installer", "VCF Operations & Import Tool", "Aria Suite Lifecycle (if applicable)"] },
                        { title: "Design Options", icon: "fa-solid fa-sitemap", items: ["Appliance Model: Simple or HA", "Fleet Topology: Single-Site or Multi-Site"] },
                        { title: "Key Implementation Activities", icon: "fa-solid fa-list-check", items: ["Perform sequenced Aria/vSphere upgrades", "Remediate: Break ELM & Remove IWA", "Convert clusters to vLCM Images", "Run pre-checks & execute conversion", "License & Validate"] },
                    ]
                },
                genericQuestions: [
                    { id: "g-hw", text: "Have you reviewed the Broadcom Compatibility Guide (BCG) Hardware List for any incompatibility issues (https://compatibilityguide.broadcom.com/)? Yes or No", category: 'Hardware', type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0, because of incompatibility hardware" },
                    { id: "g-vxrail", text: "Is VXRAIL hardware deployed in environment and apart VCF Upgrade Plan? Yes or No", category: 'Hardware', type: "boolean", yes: "You cannot upgrade to VCF 9.0, because VXRAIL Hardware is not supported for upgrade", no: "You can upgrade to VCF 9.0" },
                    { id: "g-powerflex", text: "Is Dell PowerFlex being used in environment? Yes or No", category: 'Hardware', type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that RPQ is required for storage. -- Caution", no: "You can upgrade to VCF 9.0" },
                    { id: "g-vcd", text: "Is vCloud Director being used in the environment? Yes or No", category: 'Integration', type: "boolean", yes: "You cannot upgrade to VCF 9.0, because vCloud Director is not supported in VCF 9", no: "You can upgrade to VCF 9.0" },
                    { id: "g-vvol", text: "Is vVOL storage being used in environment?", category: 'Hardware', type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that vVOLs will be deprecated in a future release. -- Caution", no: "You can upgrade to VCF 9.0" },
                    { id: "g-firmware", text: 'Have you verified that all server firmware and BIOS versions are compliant with the versions specified in the VCF 9.0 Hardware Compatibility List (HCL)? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Hardware", type: "boolean", yes: "Firmware and BIOS levels are confirmed to be compatible.", no: "You cannot proceed with the upgrade. All hardware firmware and BIOS must be updated to HCL-compliant versions first." },
                    { id: "g-backup", text: 'Have you established a post-upgrade backup plan and verified that your current backup solution is compatible with the new VCF 9.0 component versions? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Operations", type: "boolean", yes: "A post-upgrade backup strategy is in place.", no: "It is highly recommended to validate your backup plan and software compatibility before starting the upgrade. -- Caution" }
                ],
                subPaths: {
                    vsphere: {
                        title: "vSphere",
                        questions: [
                            { id: "vs-ver", text: "Is vSphere on 8.x or above?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0. Upgrade to 8.x or above. If hardware is not compatible, then new hardware will need to be acquired." },
                            { id: "vs-elm", text: "Is Enhanced Linked Mode (ELM)/Shared vSphere SSO Domain being used?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that the ELM ring for each vCenter will need to be broken before going to VCF. (https://knowledge.broadcom.com/external/article/370062/splitting-enhanced-linked-mode-elm.html) -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "vs-iwa", text: "Is IWA (Integrated Windows Authentication) being used?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that vCenter(s) will need to be updated to a new Identity Source. -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "vs-vum", text: "Is vSphere Update Manager (VUM) being used in environment?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, be aware that all clusters will need to be converted to VMware Lifecycle Manager(vLCM). (https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/managing-host-and-cluster-lifecycle-8-0/using-images-to-install-and-update-esxi-hosts-and-clusters/switching-from-baselines-to-images.html#GUID-B54663AB-B1D1-4E87-8B8C-76FF2998A477-en) -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "vs-vcha", text: "Is vCenter High Availability Configured on vCenter(s)?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, be aware that vCenter High Availability will need to be removed and added back after VCF upgrade is complete -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "vs-hp", text: "Are vSphere Host Profiles being used?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that Host Profiles will be deprecated in a future release. -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "vs-dload", text: "Are OBTU or UMDS download tools being used for vSphere in the current environment?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that OBTU and UMDS will be deprecated in a future release. -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "vs-auto", text: "Is vCenter auto-deploy being used today?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that auto-deploy will be deprecated in a future release. -- Caution", no: "You can upgrade to VCF 9.0" },
                        ]
                    },
                    nsx: {
                        title: "NSX",
                        questions: [
                            { id: "nsx-vsmgmt", text: "Is vCenter that will be upgrade to be VCF Management Domain connected to a NSX Manager?", category: "NSX", type: "boolean", yes: "You cannot upgrade to VCF 9.0, vCenter with NSX Manager(s) cannot be upgraded to a management domain but can but imported as a workload domain.", no: "You can upgrade to VCF 9.0" },
                            { id: "nsx-elm1", text: "Is NSX Manager(s) connected to two or more vCenters with ELM configured?", category: "NSX", type: "boolean", yes: "You cannot upgrade to VCF 9.0, vCenter with ELM configured and connected to NSX Manager(s) cannot be imported as a workload domain.", no: "You can upgrade to VCF 9.0" },
                            { id: "nsx-fed", text: "Is NSX configured with NSX Federation?", category: "NSX", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware this could have impact on networks supported in NSX Federation, NSX Firewall Rules, Security Groups, etc.. -- Caution", no: "You can upgrade to VCF 9.0" },
                            { id: "nsx-bare", text: "Are there any Bare Metal Edges deployed?", category: "NSX", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that all Bare Metal NSX Edges will need to be removed and replaced wtih new Virtual Edges. -- Caution", no: "You can upgrade to VCF 9.0" },
                        ]
                    },
                    aria_lm: {
                        title: "Aria Suite LM",
                        questions: [
                            { id: "alm-ver", text: "Is Aria Suite Lifecycle Manager at version 8.18 or above?", category: "Aria", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that Patch 2 will need to be applied before upgrade of VCF 9.0 -- Caution", no: "You can upgrade to VCF 9.0, but be aware that Aria Suite Lifecycle Manager will need to be upgraded to version 8.18 Patch 2. -- Caution" }
                        ]
                    },
                    aria_ops: {
                        title: "Aria Operations",
                        questions: [
                            { id: "aops-ver", text: "Is Aria Operations at version 8.18.x or above?", category: "Aria", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You can upgrade to VCF 9.0, but be aware Aria Operations will need to be upgraded to 8.18 or above. -- Caution" },
                            { id: "aops-multi", text: "Is there more than one Aria Operations Deployed?", category: "Aria", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that a VCF Fleet only supports one Aria Operations Instance, so customer will have to decided on multiple fleets, consolidation of instance or have operations not managed by a fleet. -- Caution", no: "You can upgrade to VCF 9.0" }
                        ]
                    },
                    aria_auto: {
                        title: "Aria Automation",
                        questions: [
                            { id: "aauto-ver", text: "Is Aria Automation on 8.18.x or above?", category: "Aria", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You can upgrade to VCF 9.0, but be aware Aria Automation will need to be upgraded to 8.18 or above. -- Caution" },
                            { id: "aauto-multi", text: "Is there more than one Aria Automation Deployed?", category: "Aria", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware of a VCF Fleet only supports one Automation Instances in integrated mode, all other instances will be none integrated instances( still can be Upgrades through Fleet Manager but not certificate or password managed -- Caution", no: "You can upgrade to VCF 9.0" }
                        ]
                    },
                    aria_ops_networks: {
                        title: "Aria Operations for Networks",
                        questions: [
                            { id: "aops-net-ver", text: "Is Aria Operations for Networks on 6.13 or above?", category: "Aria", type: "boolean", yes: "Deploy VCF", no: "Upgrade Aria Operations for Networks to 6.13 or higher" },
                            { id: "aops-net-multi", text: "Is there more than one Aria Operations for Networks Deployed?", category: "Aria", type: "boolean", yes: "Deploy VCF but be aware of a VCF Fleet only supports one Aria Operations for Networks Instances being added to the VCF Fleet , so customer will have to decided on multiple fleets or have operations for networks not managed by a Fleet -- Caution", no: "Deploy VCF" }
                        ]
                    },
                    aria_ops_logs: {
                        title: "Aria Operations for Logs",
                        questions: [
                           { id: "aops-logs-multi", text: "Is there more than one Aria Operations for Logs Deployed?", category: "Aria", type: "boolean", yes: "Deploy VCF but be aware of Aria Operations Logs does not get upgrade, it is new appliances, customers can keep old log appliances and migrate to new appliances over time -- Caution", no: "Deploy VCF" }
                        ]
                    }
                }
            },
            'path3': { // NEW PATH 3
                title: "Path 3: Upgrade Existing VCF 5.x to VCF 9.0",
                description: "Upgrade your existing VCF 5.x environment directly to VCF 9.0. This path is for customers already running VCF and seeking an in-place version upgrade.",
                customer: {
                    title: "Customer Considerations",
                    details: [
                        { icon: 'fa-solid fa-bolt', text: '<strong>Direct Upgrade Path:</strong> A more streamlined upgrade if your current VCF version is 5.0 or higher.' },
                        { icon: 'fa-solid fa-shield-alt', text: '<strong>Requires Prerequisites:</strong> Ensure all components meet the minimum version and configuration requirements for VCF 9.0 before starting.' },
                        { icon: 'fa-solid fa-hourglass-half', text: '<strong>Downtime Considerations:</strong> Plan for potential downtime during upgrade sequences for various components (e.g., SDDC Manager, vCenter, NSX, Workload Domains).' }
                    ]
                },
                delivery: {
                    title: "Delivery Considerations",
                    sections: [
                        { title: "Tools Involved", icon: "fa-solid fa-wrench", items: ["SDDC Manager", "vCenter Server Lifecycle Manager", "NSX-T Manager"] },
                        { title: "Design Options", icon: "fa-solid fa-sitemap", items: ["Review VCF 9.0 reference architecture updates", "Assess networking and storage compatibility and changes", "Plan for new features and components in VCF 9.0"] },
                        { title: "Key Implementation Activities", icon: "fa-solid fa-list-check", items: ["Review VCF 9.0 upgrade bundles and release notes", "Execute pre-checks", "Perform sequenced component upgrades via SDDC Manager (e.g., SDDC Manager, vCenter, NSX, vSphere, Workload Domains)", "Validate upgraded deployment and post-upgrade health checks"] },
                    ]
                },
                vcfUpgradeQuestions: [
                    { id: "vcf3-hcl", text: "Does Customer have supported hardware for VCF 9 based on HCL? Yes or No", category: "Hardware", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0" },
                    { id: "vcf3-version", text: "Is Customer running VCF 5.0 or higher? Yes or No", category: "VCF Version", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0" },
                    { id: "vcf3-vum", text: "Is vSphere Update Manager (VUM) being used in environment?", category: "Lifecycle Management", type: "boolean", yes: "You can upgrade to VCF 9.0 but be aware that all clusters will need to be converted to VMware Lifecycle Manager(vLCM) -- Caution", no: "You can upgrade to VCF 9.0" },
                    { id: "vcf3-firmware", text: 'Have you verified that all server firmware and BIOS versions are compliant with the versions specified in the VCF 9.0 Hardware Compatibility List (HCL)? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Hardware", type: "boolean", yes: "Firmware and BIOS levels are confirmed to be compatible.", no: "You cannot proceed with the upgrade. All hardware firmware and BIOS must be updated to HCL-compliant versions first." },
                    { id: "vcf3-backup", text: 'Have you established a post-upgrade backup plan and verified that your current backup solution is compatible with the new VCF 9.0 component versions? <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">NEW</span>', category: "Operations", type: "boolean", yes: "A post-upgrade backup strategy is in place.", no: "It is highly recommended to validate your backup plan and software compatibility before starting the upgrade. -- Caution" }
                ]
            }
        };

    const userEmail = Session.getActiveUser().getEmail();

    // New: Add "Submission ID" to baseHeaders
    let baseHeaders = ["Timestamp", "Submission ID", "Customer Name", "Assessed By Email", "Selected Path", "Selected Component Mix", "Overall Score (%)"];
    let dynamicHeaders = [];
    let rowData = {};

    // Populate base row data
    rowData["Timestamp"] = new Date();
    rowData["Submission ID"] = data.submissionId; // Add Submission ID
    rowData["Customer Name"] = data.customerName;
    rowData["Assessed By Email"] = userEmail;
    rowData["Selected Path"] = data.pathTitle;
    rowData["Selected Component Mix"] = data.selectedSubPathTitle; // This will be 'N/A' for Greenfield and Path 3
    rowData["Overall Score (%)"] = data.score;

    const allQuestions = [];
    // Handle Greenfield questions
    if (data.pathTitle.includes("Greenfield") && pathData.path1 && pathData.path1.greenfieldQuestions) {
        allQuestions.push(...pathData.path1.greenfieldQuestions.map(q => ({...q, prefix: 'greenfield'})));
    }
    // Handle Brownfield questions
    if (data.pathTitle.includes("Brownfield") && pathData.path2) {
        if (pathData.path2.genericQuestions) {
            allQuestions.push(...pathData.path2.genericQuestions.map(q => ({...q, prefix: 'generic'})));
        }
        if (pathData.path2.subPaths) {
            for (const subPathKey in pathData.path2.subPaths) {
                const subPath = pathData.path2.subPaths[subPathKey];
                if (subPath.questions) {
                    allQuestions.push(...subPath.questions.map(q => ({...q, prefix: subPathKey})));
                }
            }
        }
    }
    // Handle Path 3 questions
    if (data.pathTitle.includes("VCF 5.x to VCF 9.0") && pathData.path3 && pathData.path3.vcfUpgradeQuestions) {
        allQuestions.push(...pathData.path3.vcfUpgradeQuestions.map(q => ({...q, prefix: 'vcfUpgrade'})));
    }

    const addedQuestionHeaders = new Set();

    allQuestions.forEach(q => {
        const fullQuestionId = `${q.prefix}-${q.id}`;
        // Clean the question text for header: remove "Yes or No", URLs, "Deploy VCF" type instructions, and "What Primary Storage will be used to deploy VCF 9.0?" (the specific storage question text itself)
        let sanitizedQuestionText = q.text.replace(/<span.*<\/span>/, '').replace(/[?\/\\*\[\]:]/g, '').replace(/ -- Caution/g, '').replace(/ \(https:\/\/.*?\)/g, '').replace(/ Yes or No/g, '').trim();

        // Specific cleaning for the storage question to ensure a clean header
        if (q.id === "gf-storage" && q.prefix === "greenfield") { // Ensure it only applies to the specific Greenfield storage question
          sanitizedQuestionText = "Primary Storage Type"; // Set a simple, clear header for this question
        } else {
          // Remove potential leading "You cannot Deploy VCF 9.0" or "You can Deploy VCF 9.0"
          sanitizedQuestionText = sanitizedQuestionText.replace(/^(You cannot Deploy VCF 9\.0|You can Deploy VCF 9\.0)\s*,?\s*/i, '').trim();
        }

        const questionHeader = `${q.category} - ${sanitizedQuestionText}`;
        const answerHeader = `${questionHeader} (Answer)`;
        const resultHeader = `${questionHeader} (Result)`;
        const notesHeader = `${questionHeader} (Notes)`;

        if (!addedQuestionHeaders.has(answerHeader)) {
            dynamicHeaders.push(answerHeader);
            dynamicHeaders.push(resultHeader);
            dynamicHeaders.push(notesHeader);
            addedQuestionHeaders.add(answerHeader);
        }

        rowData[answerHeader] = "";
        rowData[resultHeader] = "";
        rowData[notesHeader] = "";

        if (data.details[fullQuestionId]) {
            rowData[answerHeader] = data.details[fullQuestionId].answer;
            rowData[resultHeader] = data.details[fullQuestionId].result.replace(/-- caution/i, '').trim();
            rowData[notesHeader] = data.details[fullQuestionId].notes;
        }
    });

    const finalHeaders = [...baseHeaders, ...dynamicHeaders];

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(finalHeaders);
      sheet.getRange(1, 1, 1, finalHeaders.length).setFontWeight("bold");
    } else {
      const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

      let headersToAppend = [];
      finalHeaders.forEach(header => {
          if (!existingHeaders.includes(header)) {
              headersToAppend.push(header);
          }
      });

      if (headersToAppend.length > 0) {
          const lastCol = sheet.getLastColumn();
          sheet.getRange(1, lastCol + 1, 1, headersToAppend.length).setValues([headersToAppend]);
          console.warn(`Added new columns to Assessment Log: ${headersToAppend.join(', ')}`);
      }
    }

    const actualSheetHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = actualSheetHeaders.map(header => rowData[header] || "");

    sheet.appendRow(newRow);

    // --- Email Notification Logic (UPDATED) ---
    const recipient = userEmail;
    const bccRecipients = "balaji-bm.m@broadcom.com, amy.deck-flanagan@broadcom.com, drew.nielsen@broadcom.com, prab.kalra@broadcom.com, vcf-crr.pdl@broadcom.com";
    // Updated subject line to include Submission ID
    const subject = `VCF 9.0 Readiness Assessment Submission for ${data.customerName} (ID: ${data.submissionId})`;

    // Generate the full text summary for attachment and email body
    const selectedPathKey = data.pathTitle.includes("Greenfield") ? 'path1' : (data.pathTitle.includes("Brownfield") ? 'path2' : 'path3');
    const selectedPath = pathData[selectedPathKey];


    let fullTextSummary = `VCF 9.0 Adoption Readiness Application Summary\n`;
    fullTextSummary += `Customer Name: ${data.customerName || 'N/A'}\n`;
    fullTextSummary += `Assessed By: ${userEmail || 'N/A'}\n`;
    fullTextSummary += `Submission ID: ${data.submissionId || 'N/A'}\n`; // Included Submission ID
    fullTextSummary += `Date: ${new Date().toLocaleDateString()}\n`;
    fullTextSummary += `===========================================================\n\n`;
    fullTextSummary += `Selected Pathway: ${selectedPath.title}\n`;
    fullTextSummary += `Description: ${selectedPath.description}\n`;
    // Only show component mix for brownfield
    if (data.pathTitle.includes("Brownfield")) {
      fullTextSummary += `Selected Component Mix (Brownfield only): ${data.selectedSubPathTitle || 'N/A'}\n\n`;
    } else {
      fullTextSummary += `\n`;
    }

    fullTextSummary += `--- Customer Considerations for ${selectedPath.title} ---\n`;
    selectedPath.customer.details.forEach(detail => {
        // Remove strong tags and HTML entities
        const plainText = detail.text.replace(/<strong>|<\/strong>/g, '').replace(/&nbsp;/g, ' ').trim();
        fullTextSummary += `* ${plainText}\n`;
    });
    fullTextSummary += `\n`;

    fullTextSummary += `--- Delivery Considerations for ${selectedPath.title} ---\n`;
    selectedPath.delivery.sections.forEach(section => {
        fullTextSummary += `   ${section.title}:\n`;
        section.items.forEach(item => {
            fullTextSummary += `    - ${item}\n`;
        });
    });
    fullTextSummary += `\n`;

    // Add Readiness Analysis details for selected path
    if (Object.keys(data.details).length > 0) {
        const blockers = [];
        const warnings = [];
        const goodToGo = [];

        Object.values(data.details).forEach(q => {
            let resultText = q.result.replace(/-- caution/i, '').trim();
            let notes = q.notes ? ` (Notes: ${q.notes})` : '';

            // Clean the question text for the summary to remove "Yes or No", URLs, "Deploy VCF", and also "What Primary Storage will be used to deploy VCF 9.0?" for cleaner look
            let cleanedQuestionText = q.question.replace(/<span.*<\/span>/, '').replace(/ \(https:\/\/.*?\)/g, '').replace(/ Yes or No/g, '').trim();
            if (q.id === "gf-storage" && q.prefix === "greenfield") {
                cleanedQuestionText = "Primary Storage used:"; // Simpler text for the summary
            } else {
                cleanedQuestionText = cleanedQuestionText.replace(/Deploy VCF/g, '').replace(/Upgrade to VCF 9\.0/g, '').trim(); // Also remove "Upgrade to VCF 9.0"
            }


            const item = `- ${cleanedQuestionText}\n   Action/Result: ${resultText}${notes}\n`;

            if (resultText.toLowerCase().includes('cannot deploy') || resultText.toLowerCase().includes('update to') || resultText.toLowerCase().includes('upgrade aria operations for networks') || resultText.toLowerCase().includes('you cannot upgrade')) { // Consolidated blocker conditions
                blockers.push(item);
            } else if (q.result.toLowerCase().includes('-- caution')) {
                warnings.push(item);
            } else { // Covers "You can Deploy VCF 9.0", "You can upgrade to VCF 9.0" and other non-blocker/non-caution results
                goodToGo.push(item);
            }
        });

        fullTextSummary += `--- Readiness Analysis Details ---\n\n`;

        if (blockers.length > 0) {
            fullTextSummary += `🛑 BLOCKERS (MUST BE RESOLVED BEFORE PROCEEDING):\n`;
            fullTextSummary += `=================================================\n`;
            blockers.forEach(item => fullTextSummary += item + '\n');
            fullTextSummary += `\n`;
        } else {
            fullTextSummary += `✅ No critical blockers identified at this stage.\n\n`;
        }

        if (warnings.length > 0) {
            fullTextSummary += `⚠️ WARNINGS / ACTIONS REQUIRED:\n`;
            fullTextSummary += `===============================\n`;
            warnings.forEach(item => fullTextSummary += item + '\n');
            fullTextSummary += `These items require attention and remediation but do not necessarily block the project if managed.\n\n`;
        } else {
            fullTextSummary += `✅ No specific warnings or immediate actions identified.\n\n`;
        }

        if (goodToGo.length > 0) {
            fullTextSummary += `✅ ITEMS GOOD TO GO:\n`;
            fullTextSummary += `====================\n`;
            goodToGo.forEach(item => fullTextSummary += item + '\n');
            fullTextSummary += `These items indicate compatibility or readiness for VCF 9.0.\n\n`;
        }
    } else { 
      fullTextSummary += `--- Readiness Analysis Details ---\n\n`;
      fullTextSummary += `No questions have been answered for the selected path yet. Please answer questions to see readiness details.\n\n`;
    }


    fullTextSummary += `===========================================================\n`;
    fullTextSummary += `This summary is based on the information provided in the assessment tool.\n`;
    fullTextSummary += `For detailed planning and implementation, please consult with VMware experts.\n`;

    // Construct email body (now just directly includes the fullTextSummary)
    let emailBody = `Dear ${userEmail},\n\n`;
    emailBody += `Thank you for submitting the VCF 9.0 Adoption Readiness Assessment for **${data.customerName}**.\n`;
    emailBody += `Your unique Submission ID is: **${data.submissionId}**.\n\n`; // Highlight ID in email body
    emailBody += fullTextSummary; // Embed the entire generated summary here

    emailBody += `\n\nBest regards,\n`;
    emailBody += `VCF 9.0 Adoption Readiness Tool`;

    // Create the attachment
    const customerFileName = data.customerName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    // Include submissionId in attachment filename
    const attachmentFileName = `VCF9_Readiness_Summary_${customerFileName}_${data.submissionId}.txt`;
    const attachmentBlob = Utilities.newBlob(fullTextSummary, MimeType.PLAIN_TEXT, attachmentFileName);

    MailApp.sendEmail({
      to: recipient,
      bcc: bccRecipients,
      subject: subject,
      body: emailBody, // Send the full summary as the body
      attachments: [attachmentBlob] // Attach the same summary as a .txt file
    });
    // --- End Email Notification Logic ---

    return "Assessment saved successfully and confirmation email sent!";
  } catch (e) {
    console.error("Error in saveAssessmentData: " + e.toString());
    if (e.message.includes("Service invoked too many times")) {
      console.warn("Email sending skipped due to quota limits.");
    }
    throw new Error("Failed to save data or send confirmation. Error: " + e.message);
  }
}

