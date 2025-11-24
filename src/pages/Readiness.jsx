import { useState, useEffect } from 'react'
import { usePCMO } from '../PCMOContext'
import { CheckCircle2, XCircle, AlertCircle, CheckCircle, ArrowLeft, Info } from 'lucide-react'
import BusinessGuide from '../components/BusinessGuide'
import DisclaimerFooter from '../components/DisclaimerFooter'

const Readiness = () => {
  const { readiness, updateReadiness } = usePCMO()
  
  // Path data - exact match from GAS code
  const pathData = {
    path1: {
      title: "Path 1: Deploy New VCF 9 Environment (Greenfield)",
      description: "Start fresh with a new VCF 9 deployment. Ideal for new projects, hardware refreshes, or when an in-place upgrade is too complex.",
      customer: {
        title: "Customer Considerations",
        details: [
          { icon: '🛡️', text: 'Lowest Risk: This path is the safest as your current production environment remains untouched during the build phase.' },
          { icon: '💰', text: 'Highest Initial Cost: Requires capital expenditure for new hardware and running two environments in parallel during migration.' },
          { icon: '🧹', text: 'Clean Slate: Avoids carrying over legacy configuration issues or technical debt.' }
        ]
      },
      delivery: {
        title: "Delivery Considerations",
        sections: [
          { title: "Tools Involved", icon: "🔧", items: ["VCF Installer", "VMware HCX (Optional for migration)"] },
          { title: "Design Options", icon: "🗺️", items: ["Appliance Model: Simple (lab) or HA (production)", "Fleet Topology: Single-Site or Multi-Site"] },
          { title: "Key Implementation Activities", icon: "✅", items: ["Deploy VCF Installer & run automated deployment", "Build Workload Domains", "Deploy & configure HCX for migration", "Execute migration waves", "License & Decommission"] }
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
        { id: "gf-min-hosts", text: 'Have you confirmed that a minimum of 4 HCL-compliant ESXi hosts are available for the management domain?', category: "Environment", type: "boolean", yes: "The minimum host count for the management domain is met.", no: "You cannot proceed. A minimum of 4 ESXi hosts is required for the VCF Management Domain." },
        { id: "gf-redundant-switches", text: 'Are redundant physical network switches (e.g., ToR switches) in place for all VCF host connections?', category: "Networking", type: "boolean", yes: "Redundant networking hardware is in place, reducing single points of failure.", no: "Deployment can proceed, but this is a high-risk configuration. Redundant switches are strongly recommended for production. -- Caution" },
        { id: "gf-vlan-planning", text: 'Have all required VLANs (Management, vSAN, vMotion, etc.) and their corresponding subnets/IP pools been planned and documented?', category: "Networking", type: "boolean", yes: "IP and VLAN planning is complete, which is a critical step for a successful bring-up.", no: "You cannot proceed. Complete and document all IP and VLAN planning before starting the deployment." },
        { id: "gf-ntp", text: 'Are NTP servers available on the network, and have all planned components been configured for time synchronization?', category: "Environment", type: "boolean", yes: "Proper time synchronization is configured, which is essential for stable operations.", no: "You cannot proceed. Consistent NTP is mandatory for all VCF components." },
        { id: "gf-dns", text: 'Has DNS been configured with both Forward (A) and Reverse (PTR) lookup records for all planned VCF components (SDDC Manager, vCenter, NSX, Hosts)?', category: "Environment", type: "boolean", yes: "DNS is correctly configured, which is required for component communication.", no: "You cannot proceed. Fully functional DNS with both forward and reverse lookups is mandatory." },
        { id: "gf-software", text: 'Have all required VCF 9.0 software components (Cloud Builder, ESXi ISOs, etc.) been downloaded from the Broadcom support portal?', category: "Software", type: "boolean", yes: "All necessary software is downloaded and ready for deployment.", no: "Please download all required software from the VCF 9.0 Bill of Materials (BOM) before proceeding." },
        { id: "gf-licenses", text: 'Are all necessary VCF 9.0 licenses (VCF, vSphere, vSAN, NSX) available and documented?', category: "Licensing", type: "boolean", yes: "All required licenses are available.", no: "You cannot deploy VCF 9.0 without the appropriate licenses. Please acquire them first." },
        { id: "gf-backup", text: 'Do you have a documented backup strategy for critical components (SDDC Manager, vCenter, NSX) that will be implemented immediately after deployment?', category: "Operations", type: "boolean", yes: "A day-one backup strategy is planned, which is critical for operational readiness.", no: "It is highly recommended to have a backup plan ready before deployment to avoid data loss risk. -- Caution" }
      ]
    },
    path2: {
      title: "Path 2: Upgrade Existing VMware Environment to VCF 9 (Brownfield)",
      description: "Convert your existing VMWare vSphere environment into a full VCF 9 Fleet, leveraging your current hardware.",
      customer: {
        title: "Customer Considerations",
        details: [
          { icon: '⚠️', text: 'Caution: The conversion process is complex and intrusive. A failure during a critical step can lead to significant downtime.' },
          { icon: '💰', text: 'Lower Hardware Cost: Leverages existing hardware, avoiding a major new purchase.' },
          { icon: '📋', text: 'Mandatory Prerequisites: This path is not possible unless all remediation steps (Break ELM, Convert to vLCM Images) are completed.' }
        ]
      },
      delivery: {
        title: "Delivery Considerations",
        sections: [
          { title: "Tools Involved", icon: "🔧", items: ["vCenter Installer & Lifecycle Manager", "VCF Installer", "VCF Operations & Import Tool", "Aria Suite Lifecycle (if applicable)"] },
          { title: "Design Options", icon: "🗺️", items: ["Appliance Model: Simple or HA", "Fleet Topology: Single-Site or Multi-Site"] },
          { title: "Key Implementation Activities", icon: "✅", items: ["Perform sequenced Aria/vSphere upgrades", "Remediate: Break ELM & Remove IWA", "Convert clusters to vLCM Images", "Run pre-checks & execute conversion", "License & Validate"] }
        ]
      },
      genericQuestions: [
        { id: "g-hw", text: "Have you reviewed the Broadcom Compatibility Guide (BCG) Hardware List for any incompatibility issues (https://compatibilityguide.broadcom.com/)? Yes or No", category: 'Hardware', type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0, because of incompatibility hardware" },
        { id: "g-vxrail", text: "Is VXRAIL hardware deployed in environment and apart VCF Upgrade Plan? Yes or No", category: 'Hardware', type: "boolean", yes: "You cannot upgrade to VCF 9.0, because VXRAIL Hardware is not supported for upgrade", no: "You can upgrade to VCF 9.0" },
        { id: "g-powerflex", text: "Is Dell PowerFlex being used in environment? Yes or No", category: 'Hardware', type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that RPQ is required for storage. -- Caution", no: "You can upgrade to VCF 9.0" },
        { id: "g-vcd", text: "Is vCloud Director being used in the environment? Yes or No", category: 'Integration', type: "boolean", yes: "You cannot upgrade to VCF 9.0, because vCloud Director is not supported in VCF 9", no: "You can upgrade to VCF 9.0" },
        { id: "g-vvol", text: "Is vVOL storage being used in environment?", category: 'Hardware', type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that vVOLs will be deprecated in a future release. -- Caution", no: "You can upgrade to VCF 9.0" },
        { id: "g-firmware", text: 'Have you verified that all server firmware and BIOS versions are compliant with the versions specified in the VCF 9.0 Hardware Compatibility List (HCL)?', category: "Hardware", type: "boolean", yes: "Firmware and BIOS levels are confirmed to be compatible.", no: "You cannot proceed with the upgrade. All hardware firmware and BIOS must be updated to HCL-compliant versions first." },
        { id: "g-backup", text: 'Have you established a post-upgrade backup plan and verified that your current backup solution is compatible with the new VCF 9.0 component versions?', category: "Operations", type: "boolean", yes: "A post-upgrade backup strategy is in place.", no: "It is highly recommended to validate your backup plan and software compatibility before starting the upgrade. -- Caution" }
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
            { id: "vs-auto", text: "Is vCenter auto-deploy being used today?", category: "Core vSphere", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that auto-deploy will be deprecated in a future release. -- Caution", no: "You can upgrade to VCF 9.0" }
          ]
        },
        nsx: {
          title: "NSX",
          questions: [
            { id: "nsx-vsmgmt", text: "Is vCenter that will be upgrade to be VCF Management Domain connected to a NSX Manager?", category: "NSX", type: "boolean", yes: "You cannot upgrade to VCF 9.0, vCenter with NSX Manager(s) cannot be upgraded to a management domain but can but imported as a workload domain.", no: "You can upgrade to VCF 9.0" },
            { id: "nsx-elm1", text: "Is NSX Manager(s) connected to two or more vCenters with ELM configured?", category: "NSX", type: "boolean", yes: "You cannot upgrade to VCF 9.0, vCenter with ELM configured and connected to NSX Manager(s) cannot be imported as a workload domain.", no: "You can upgrade to VCF 9.0" },
            { id: "nsx-fed", text: "Is NSX configured with NSX Federation?", category: "NSX", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware this could have impact on networks supported in NSX Federation, NSX Firewall Rules, Security Groups, etc.. -- Caution", no: "You can upgrade to VCF 9.0" },
            { id: "nsx-bare", text: "Are there any Bare Metal Edges deployed?", category: "NSX", type: "boolean", yes: "You can upgrade to VCF 9.0, but be aware that all Bare Metal NSX Edges will need to be removed and replaced wtih new Virtual Edges. -- Caution", no: "You can upgrade to VCF 9.0" }
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
    path3: {
      title: "Path 3: Upgrade Existing VCF 5.x to VCF 9.0",
      description: "Upgrade your existing VCF 5.x environment directly to VCF 9.0. This path is for customers already running VCF and seeking an in-place version upgrade.",
      customer: {
        title: "Customer Considerations",
        details: [
          { icon: '⚡', text: 'Direct Upgrade Path: A more streamlined upgrade if your current VCF version is 5.0 or higher.' },
          { icon: '🛡️', text: 'Requires Prerequisites: Ensure all components meet the minimum version and configuration requirements for VCF 9.0 before starting.' },
          { icon: '⏱️', text: 'Downtime Considerations: Plan for potential downtime during upgrade sequences for various components (e.g., SDDC Manager, vCenter, NSX, Workload Domains).' }
        ]
      },
      delivery: {
        title: "Delivery Considerations",
        sections: [
          { title: "Tools Involved", icon: "🔧", items: ["SDDC Manager", "vCenter Server Lifecycle Manager", "NSX-T Manager"] },
          { title: "Design Options", icon: "🗺️", items: ["Review VCF 9.0 reference architecture updates", "Assess networking and storage compatibility and changes", "Plan for new features and components in VCF 9.0"] },
          { title: "Key Implementation Activities", icon: "✅", items: ["Review VCF 9.0 upgrade bundles and release notes", "Execute pre-checks", "Perform sequenced component upgrades via SDDC Manager (e.g., SDDC Manager, vCenter, NSX, vSphere, Workload Domains)", "Validate upgraded deployment and post-upgrade health checks"] }
        ]
      },
      vcfUpgradeQuestions: [
        { id: "vcf3-hcl", text: "Does Customer have supported hardware for VCF 9 based on HCL? Yes or No", category: "Hardware", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0" },
        { id: "vcf3-version", text: "Is Customer running VCF 5.0 or higher? Yes or No", category: "VCF Version", type: "boolean", yes: "You can upgrade to VCF 9.0", no: "You cannot upgrade to VCF 9.0" },
        { id: "vcf3-vum", text: "Is vSphere Update Manager (VUM) being used in environment?", category: "Lifecycle Management", type: "boolean", yes: "You can upgrade to VCF 9.0 but be aware that all clusters will need to be converted to VMware Lifecycle Manager(vLCM) -- Caution", no: "You can upgrade to VCF 9.0" },
        { id: "vcf3-firmware", text: 'Have you verified that all server firmware and BIOS versions are compliant with the versions specified in the VCF 9.0 Hardware Compatibility List (HCL)?', category: "Hardware", type: "boolean", yes: "Firmware and BIOS levels are confirmed to be compatible.", no: "You cannot proceed with the upgrade. All hardware firmware and BIOS must be updated to HCL-compliant versions first." },
        { id: "vcf3-backup", text: 'Have you established a post-upgrade backup plan and verified that your current backup solution is compatible with the new VCF 9.0 component versions?', category: "Operations", type: "boolean", yes: "A post-upgrade backup strategy is in place.", no: "It is highly recommended to validate your backup plan and software compatibility before starting the upgrade. -- Caution" }
      ]
    }
  }

  // State management
  const [selectedPath, setSelectedPath] = useState(null)
  const [selectedSubPaths, setSelectedSubPaths] = useState({}) // For Brownfield path
  const [questionnaireState, setQuestionnaireState] = useState({}) // { "prefix-id": { question, answer, result, category, notes } }
  const [showConsiderations, setShowConsiderations] = useState(true)

  // Check if result is a blocker (exact match from GAS code)
  const isBlocker = (resultText) => {
    const lower = resultText.toLowerCase()
    return lower.includes('cannot deploy') || 
           lower.includes('update to') || 
           lower.includes('upgrade aria operations for networks') || 
           lower.includes('you cannot upgrade')
  }

  // Check if result is a caution (exact match from GAS code)
  const isCaution = (resultText) => {
    return resultText.toLowerCase().includes('-- caution')
  }

  // Calculate readiness score (exact match from GAS code)
  const calculateScore = () => {
    let totalScore = 0
    let maxScore = 0
    let hasBlocker = false

    Object.values(questionnaireState).forEach(q => {
      const resultText = q.result.toLowerCase()
      if (isBlocker(q.result)) {
        hasBlocker = true
      } else if (isCaution(q.result)) {
        totalScore += 1
      } else {
        totalScore += 2
      }
      maxScore += 2
    })

    return hasBlocker ? 0 : (maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 100)
  }

  // Generate readiness summary (exact match from GAS code)
  const generateReadinessSummary = () => {
    const blockers = []
    const warnings = []
    const goodToGo = []

    Object.values(questionnaireState).forEach(q => {
      const resultText = q.result
      const notes = q.notes ? `<div class="text-xs text-gray-500 pl-4 mt-1"><strong>Notes:</strong> ${q.notes}</div>` : ''
      
      // Clean question text
      let cleanedQuestionText = q.question.replace(/<span.*<\/span>/g, '').replace(/ \(https:\/\/.*?\)/g, '').replace(/ Yes or No/g, '').trim()
      
      if (q.id === "gf-storage" && q.prefix === "greenfield") {
        cleanedQuestionText = "Primary Storage used:"
      } else {
        cleanedQuestionText = cleanedQuestionText.replace(/Deploy VCF/g, '').replace(/Upgrade to VCF 9\.0/g, '').trim()
      }

      const itemHtml = (
        <li key={`${q.prefix}-${q.id}`} className="mb-3">
          <div className="font-semibold text-gray-800">{cleanedQuestionText}</div>
          <div className="text-xs text-gray-600 pl-4"><strong>Action:</strong> {resultText.replace(/-- caution/i, '')}</div>
          {q.notes && <div className="text-xs text-gray-500 pl-4 mt-1"><strong>Notes:</strong> {q.notes}</div>}
        </li>
      )

      if (isBlocker(q.result)) {
        blockers.push(itemHtml)
      } else if (isCaution(q.result)) {
        warnings.push(itemHtml)
      } else {
        goodToGo.push(itemHtml)
      }
    })

    return { blockers, warnings, goodToGo }
  }

  // Handle question answer
  const handleAnswer = (question, prefix, answer, result) => {
    const key = `${prefix}-${question.id}`
    setQuestionnaireState(prev => ({
      ...prev,
      [key]: {
        question: question.text,
        answer: answer,
        result: result,
        category: question.category,
        notes: prev[key]?.notes || '',
        id: question.id,
        prefix: prefix
      }
    }))
  }

  // Handle notes change
  const handleNotesChange = (key, notes) => {
    setQuestionnaireState(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        notes: notes
      }
    }))
  }

  // Get all questions for current path
  const getAllQuestions = () => {
    if (!selectedPath) return []
    
    const questions = []
    
    if (selectedPath === 'path1') {
      pathData.path1.greenfieldQuestions.forEach(q => {
        questions.push({ ...q, prefix: 'greenfield' })
      })
    } else if (selectedPath === 'path2') {
      // Generic questions
      pathData.path2.genericQuestions.forEach(q => {
        questions.push({ ...q, prefix: 'generic' })
      })
      // SubPath questions
      Object.keys(selectedSubPaths).forEach(subPathKey => {
        if (selectedSubPaths[subPathKey] && pathData.path2.subPaths[subPathKey]) {
          pathData.path2.subPaths[subPathKey].questions.forEach(q => {
            questions.push({ ...q, prefix: subPathKey })
          })
        }
      })
    } else if (selectedPath === 'path3') {
      pathData.path3.vcfUpgradeQuestions.forEach(q => {
        questions.push({ ...q, prefix: 'vcfUpgrade' })
      })
    }
    
    return questions
  }

  // Update context
  useEffect(() => {
    const score = calculateScore()
    const summary = generateReadinessSummary()
    
    // Determine status based on checked count (0-5 = Red, 6-8 = Yellow, 9-10 = Green)
    const answeredCount = Object.keys(questionnaireState).length
    let status = 'not-ready'
    if (answeredCount >= 9) {
      status = 'ready'
    } else if (answeredCount >= 6) {
      status = 'warning'
    }

    updateReadiness({
      gaps: summary.blockers.map(b => b.props.children[0].props.children),
      readinessScore: score,
      status: status,
      blockers: summary.blockers.length,
      warnings: summary.warnings.length,
      goodToGo: summary.goodToGo.length
    })
  }, [questionnaireState, selectedPath, selectedSubPaths, updateReadiness])

  // Render question component
  const renderQuestion = (question, index, prefix) => {
    const key = `${prefix}-${question.id}`
    const state = questionnaireState[key]
    const resultText = state?.result || ''
    const isBlock = resultText && isBlocker(resultText)
    const isCaut = resultText && isCaution(resultText)
    const isGo = resultText && !isBlock && !isCaut

    return (
      <div key={key} className="p-4 border border-gray-200 rounded-lg bg-white">
        <p className="font-medium text-gray-800 mb-3">
          {index + 1}. <span dangerouslySetInnerHTML={{ __html: question.text }} />
        </p>
        
        {question.type === 'boolean' && (
          <div className="mt-3 flex items-center space-x-4">
            <button
              onClick={() => handleAnswer(question, prefix, 'yes', question.yes)}
              className={`px-6 py-2 text-sm font-medium border rounded-md transition-colors ${
                state?.answer === 'yes'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(question, prefix, 'no', question.no)}
              className={`px-6 py-2 text-sm font-medium border rounded-md transition-colors ${
                state?.answer === 'no'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              No
            </button>
          </div>
        )}
        
        {question.type === 'select' && question.options && (
          <div className="mt-3">
            <select
              value={state?.answer || ''}
              onChange={(e) => {
                const selectedOption = question.options.find(opt => opt.value === e.target.value)
                if (selectedOption) {
                  handleAnswer(question, prefix, e.target.value, selectedOption.result)
                }
              }}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">-- Select an option --</option>
              {question.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.value}</option>
              ))}
            </select>
          </div>
        )}

        {resultText && (
          <div className={`mt-3 p-3 border-l-4 rounded-r-md text-sm ${
            isBlock ? 'bg-red-50 border-red-500 text-red-800' :
            isCaut ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
            'bg-green-50 border-green-500 text-green-800'
          }`}>
            <strong>Action/Result:</strong> {resultText.replace(/-- caution/i, '').trim()}
          </div>
        )}

        <textarea
          value={state?.notes || ''}
          onChange={(e) => handleNotesChange(key, e.target.value)}
          className="mt-3 w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Add notes for this item..."
        />
      </div>
    )
  }

  // Render path selection
  if (!selectedPath) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VCF 9.0 Readiness Assessment</h1>
          <p className="text-gray-600">Select your deployment path to begin the assessment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(pathData).map(([pathKey, path]) => (
            <div
              key={pathKey}
              onClick={() => setSelectedPath(pathKey)}
              className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-indigo-500 cursor-pointer transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h2>
              <p className="text-gray-600 mb-4">{path.description}</p>
              <div className="flex items-center text-indigo-600 font-medium">
                Select Path <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const currentPath = pathData[selectedPath]
  const allQuestions = getAllQuestions()
  const score = calculateScore()
  const summary = generateReadinessSummary()
  const answeredCount = Object.keys(questionnaireState).length
  let status = 'not-ready'
  let statusColor = 'red'
  let statusLabel = 'Not Ready'
  let statusIcon = XCircle

  if (answeredCount >= 9) {
    status = 'ready'
    statusColor = 'green'
    statusLabel = 'Ready for Upgrade'
    statusIcon = CheckCircle
  } else if (answeredCount >= 6) {
    status = 'warning'
    statusColor = 'yellow'
    statusLabel = 'Warning - Review Required'
    statusIcon = AlertCircle
  }

  return (
    <div className="p-4 md:p-8 pb-24">
      {/* Business Guide */}
      <BusinessGuide
        context="The VCF 9.0 Readiness Assessment evaluates your infrastructure's readiness for upgrading to VMware Cloud Foundation 9.0. Three deployment paths are available: Greenfield (new deployment for fresh environments), Upgrade (from VCF 5.x for existing VCF customers), and Migration (from vSphere for traditional vSphere environments). Each path has specific technical requirements, hardware compatibility needs, and migration considerations."
        action="Select your deployment path based on your current infrastructure state. Answer all questions in each section honestly - the assessment will identify critical blockers, high-priority items, and provide specific guidance based on your answers. Review the risk matrix to understand potential deployment blockers and recommended actions. Critical items must be resolved before deployment."
        assumptions="Readiness criteria are based on VCF 9.0 Hardware Compatibility List (HCL), VMware best practices documentation, and minimum version requirements. Critical blockers prevent deployment and must be resolved. High-priority items require attention but may not block deployment. Assessment logic follows VMware's official VCF 9.0 deployment guidelines and compatibility requirements."
      />
      
      <div className="mb-6">
        <button
          onClick={() => {
            setSelectedPath(null)
            setSelectedSubPaths({})
            setQuestionnaireState({})
          }}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Path Selection
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentPath.title}</h1>
        <p className="text-gray-600">{currentPath.description}</p>
      </div>

      {/* Customer & Delivery Considerations */}
      {showConsiderations && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Path Considerations
            </h2>
            <button
              onClick={() => setShowConsiderations(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Hide
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">{currentPath.customer.title}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {currentPath.customer.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">{detail.icon}</span>
                    <span dangerouslySetInnerHTML={{ __html: detail.text }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">{currentPath.delivery.title}</h3>
              {currentPath.delivery.sections.map((section, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex items-center mb-1">
                    <span className="mr-2">{section.icon}</span>
                    <span className="font-medium text-sm text-gray-800">{section.title}</span>
                  </div>
                  <ul className="text-xs text-gray-600 ml-6 list-disc">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Status Card */}
      {answeredCount > 0 && (
        <div className={`mb-8 p-6 rounded-lg shadow-lg ${
          status === 'ready' ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' :
          status === 'warning' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' :
          'bg-gradient-to-br from-red-500 to-rose-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {status === 'ready' && <CheckCircle className="w-12 h-12" />}
              {status === 'warning' && <AlertCircle className="w-12 h-12" />}
              {status === 'not-ready' && <XCircle className="w-12 h-12" />}
              <div>
                <h2 className="text-2xl font-bold mb-1">{statusLabel}</h2>
                <p className="opacity-90">
                  {answeredCount} of {allQuestions.length} questions answered ({score}% readiness score)
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Readiness Score</div>
              <div className="text-4xl font-bold">{score}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Brownfield SubPath Selection */}
      {selectedPath === 'path2' && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2A: Select Component Mix (Optional)</h2>
          <p className="text-sm text-gray-600 mb-4">Select which components are in your environment to see relevant questions:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(pathData.path2.subPaths).map(([key, subPath]) => (
              <label key={key} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedSubPaths[key] || false}
                  onChange={(e) => {
                    setSelectedSubPaths(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))
                    // Clear questions for this subPath if unchecked
                    if (!e.target.checked) {
                      setQuestionnaireState(prev => {
                        const newState = { ...prev }
                        Object.keys(newState).forEach(k => {
                          if (k.startsWith(`${key}-`)) {
                            delete newState[k]
                          }
                        })
                        return newState
                      })
                    }
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">{subPath.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {selectedPath === 'path1' && '2. Greenfield Deployment Questionnaire'}
          {selectedPath === 'path2' && '2. Brownfield Readiness Questionnaire'}
          {selectedPath === 'path3' && '2. VCF 5.x to VCF 9.0 Upgrade Questionnaire'}
        </h2>
        
        {selectedPath === 'path2' && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">2A: Generic Questions (All Brownfield Paths)</h3>
            <div className="space-y-4">
              {pathData.path2.genericQuestions.map((q, idx) => renderQuestion(q, idx, 'generic'))}
            </div>
          </div>
        )}

        {selectedPath === 'path2' && Object.keys(selectedSubPaths).some(key => selectedSubPaths[key]) && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">2B: Component-Specific Questions</h3>
            {Object.entries(pathData.path2.subPaths).map(([key, subPath]) => {
              if (!selectedSubPaths[key]) return null
              return (
                <div key={key} className="mb-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">{subPath.title}</h4>
                  <div className="space-y-4">
                    {subPath.questions.map((q, idx) => renderQuestion(q, idx, key))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {(selectedPath === 'path1' || selectedPath === 'path3') && (
          <div className="space-y-4">
            {allQuestions.map((q, idx) => renderQuestion(q, idx, q.prefix))}
          </div>
        )}
      </div>

      {/* Readiness Analysis Summary */}
      {answeredCount > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Readiness Analysis Summary</h2>
          
          {summary.blockers.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h3 className="font-bold text-lg mb-3 flex items-center text-red-600">
                <XCircle className="w-5 h-5 mr-2" />
                🛑 Blockers (Must Fix) - {summary.blockers.length}
              </h3>
              <ul className="space-y-3 text-sm">{summary.blockers}</ul>
            </div>
          )}

          {summary.warnings.length > 0 && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                ⚠️ Warnings (Action Required) - {summary.warnings.length}
              </h3>
              <ul className="space-y-3 text-sm">{summary.warnings}</ul>
            </div>
          )}

          {summary.goodToGo.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3 flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                ✅ Good to Go (No Action) - {summary.goodToGo.length}
              </h3>
              <ul className="space-y-3 text-sm">{summary.goodToGo}</ul>
            </div>
          )}

          {summary.blockers.length === 0 && summary.warnings.length === 0 && summary.goodToGo.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-2 flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Great News!
              </h3>
              <p className="text-sm text-gray-700">No blockers or warnings identified. Your environment appears ready for VCF 9.0 deployment/upgrade.</p>
            </div>
          )}

          {summary.blockers.length > 0 && (
            <div className="mt-4 p-4 bg-red-100 rounded-lg border-2 border-red-500">
              <h3 className="font-bold text-lg mb-2 flex items-center text-red-800">
                <XCircle className="w-5 h-5 mr-2" />
                Project Blocked!
              </h3>
              <p className="text-sm text-red-800">Critical blockers must be resolved before proceeding with VCF 9.0 deployment/upgrade.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Disclaimer Footer */}
      <DisclaimerFooter />
    </div>
  )
}

export default Readiness
