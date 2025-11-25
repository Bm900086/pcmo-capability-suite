# 🤖 Cursor AI Prompt for Building PCMO Value Model Web Application

## Copy and Paste This Entire Prompt to Cursor AI

---

**PROJECT:** Build a web-based version of the PCMO (Private Cloud Maturity & Optimization) Value Model

**CONTEXT:** I have a comprehensive Excel-based financial analysis tool (VMware PCMO Value Model) that calculates ROI for cloud migration projects. I need to convert this into a modern web application.

**DOCUMENTATION PROVIDED:**
- ✅ MASTER_DOCUMENTATION.md (393 KB) - Complete technical specification
- ✅ FORMULA_CONVERSION_GUIDE.md (60 KB) - All 2,507 formulas with conversion examples
- ✅ INPUT_OUTPUT_SPECIFICATION.md (14 KB) - Complete data dictionary
- ✅ DEVELOPER_QUICKSTART.md (15 KB) - Architecture and implementation guide
- ✅ model_complete_extraction.json (2.4 MB) - Raw extracted data from Excel
- ✅ README.md (11 KB) - Project overview
- ✅ DOCUMENTATION_INDEX.md (12 KB) - Navigation guide
- ✅ Value Model for PCMO_Requirements_V3.4_Nov19.xlsx (274 KB) - Source Excel file

---

## 🎯 WHAT I NEED YOU TO BUILD

A modern, responsive web application that:

1. **Replicates all functionality** of the Excel model
2. **Produces identical results** (within 0.01% tolerance)
3. **Provides better UX** than Excel with real-time calculations
4. **Supports multiple scenarios** with comparison views
5. **Generates professional exports** (PDF, Excel, PowerPoint)

---

## 📊 MODEL OVERVIEW

**Purpose:** Calculate ROI of migrating to VMware Cloud Foundation (VCF)

**Key Features:**
- TCO Analysis (10-year comparison: current vs. future state)
- ROI Metrics (NPV, ROI %, Payback Period)
- 9 Cost Categories: Compute, Storage, Network, Software, Facilities, Labor, Support, Migration, Reskilling
- Business Impact modeling (productivity, revenue)
- Sustainability metrics (CO2, power savings)

**Sample Results:**
- Input: 5000 VMs, 400 hosts, $500K annual VMware spend
- Output: $31.2M NPV, 9.75x ROI, 12-month payback, $91.2M 10-year savings

**Complexity:**
- 18 worksheets
- 2,507 Excel formulas
- 21 unique Excel functions
- 3,782 cells with content
- 6 named ranges (global parameters)

---

## 🏗️ RECOMMENDED ARCHITECTURE

### Technology Stack

**Frontend:**
```
- React 18+ with TypeScript
- TailwindCSS for styling
- React Hook Form for forms
- Recharts for visualizations
- React Router for navigation
- Axios for API calls
```

**Backend:**
```
- Node.js with Express (or Python FastAPI)
- PostgreSQL for persistence
- Redis for caching
- Calculation engine with dependency graph
```

**Key Components:**
```
1. Formula Parser - Parse Excel formulas to executable functions
2. Dependency Graph - Topological sort for calculation order
3. Calculation Engine - Execute formulas in correct order
4. Validation Engine - Real-time input validation
5. Export Service - Generate PDF/Excel/PowerPoint
```

---

## 📁 PROJECT STRUCTURE

```
pcmo-value-model/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/           # Input forms (Compute, Storage, etc.)
│   │   │   ├── results/         # Results dashboard
│   │   │   ├── charts/          # Visualizations
│   │   │   └── shared/          # Reusable components
│   │   ├── hooks/
│   │   │   ├── useCalculation.ts  # Calculation engine hook
│   │   │   └── useAnalysis.ts     # Analysis state
│   │   ├── services/
│   │   │   ├── api.ts           # API client
│   │   │   └── calculations.ts  # Calculation logic
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx    # Analysis list
│   │   │   ├── Configuration.tsx # Setup wizard
│   │   │   ├── CostCategories.tsx # Input forms
│   │   │   ├── Results.tsx      # ROI dashboard
│   │   │   └── Export.tsx       # Export page
│   │   └── utils/
│   │       ├── formulas.ts      # Formula implementations
│   │       ├── validators.ts    # Validation rules
│   │       └── dependencyGraph.ts # Dependency resolution
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── analyses.ts      # CRUD operations
│   │   │   ├── calculations.ts  # Calculation endpoints
│   │   │   └── exports.ts       # Export endpoints
│   │   ├── services/
│   │   │   ├── CalculationEngine.ts  # Core calculation logic
│   │   │   ├── FormulaParser.ts      # Parse Excel formulas
│   │   │   ├── ExportService.ts      # Generate exports
│   │   │   └── ValidationService.ts  # Validate inputs
│   │   ├── models/
│   │   │   └── Analysis.ts      # Data model
│   │   └── app.ts
│   └── package.json
│
└── docs/
    └── [All documentation files]
```

---

## 🚀 IMPLEMENTATION PHASES

### PHASE 1: Setup & Foundation (Priority: CRITICAL)
**Tasks:**
- [ ] Initialize React + TypeScript frontend
- [ ] Initialize Node.js + Express backend
- [ ] Set up PostgreSQL database
- [ ] Create database schema (see INPUT_OUTPUT_SPECIFICATION.md)
- [ ] Set up authentication
- [ ] Create basic UI shell with navigation
- [ ] Implement Analysis CRUD operations

**Files to Reference:**
- `DEVELOPER_QUICKSTART.md` - Application Structure
- `INPUT_OUTPUT_SPECIFICATION.md` - Data Model

---

### PHASE 2: Calculation Engine (Priority: CRITICAL - MOST IMPORTANT)
**Tasks:**
- [ ] Build Formula Parser (convert Excel formulas to JavaScript)
- [ ] Implement Dependency Graph (topological sort)
- [ ] Implement Excel function library (SUM, SUMIF, SUMIFS, IF, IFERROR, VLOOKUP, NPV, etc.)
- [ ] Create CalculationEngine class with recalculation logic
- [ ] Implement named ranges system (6 global variables)
- [ ] Test calculations against Excel results

**Files to Reference:**
- `FORMULA_CONVERSION_GUIDE.md` - ALL formulas and conversion examples
- `model_complete_extraction.json` - Raw formula data
- `DEVELOPER_QUICKSTART.md` - Implementation tips

**Critical Excel Functions to Implement:**
```javascript
// Priority order:
1. SUM, SUMIF, SUMIFS - Aggregation
2. IF, IFERROR - Conditional logic
3. VLOOKUP, INDEX, MATCH - Lookups
4. ROUND, ROUNDUP - Formatting
5. NPV - Financial calculations
6. AND, OR - Logic
7. COUNTIF, AVERAGE, MIN, MAX - Statistics
```

**Example Implementation:**
```typescript
class CalculationEngine {
  private cells = new Map<string, any>();
  private formulas = new Map<string, Function>();
  private graph = new DependencyGraph();
  
  registerFormula(cellRef: string, formula: string, deps: string[]) {
    const fn = this.parseFormula(formula);
    this.formulas.set(cellRef, fn);
    deps.forEach(dep => this.graph.addEdge(dep, cellRef));
  }
  
  setValue(cellRef: string, value: any) {
    this.cells.set(cellRef, value);
    this.recalculateDependents(cellRef);
  }
  
  recalculateDependents(cellRef: string) {
    const sorted = this.graph.getDescendants(cellRef);
    for (const cell of sorted) {
      const fn = this.formulas.get(cell);
      if (fn) this.cells.set(cell, fn(this.cells));
    }
  }
}
```

---

### PHASE 3: Input Forms (Priority: HIGH)
**Tasks:**
- [ ] Initial Screens form (customer info, VMs, hosts, storage)
- [ ] Compute form (current/future state inputs)
- [ ] Storage form (capacity, costs)
- [ ] Network form (networking costs)
- [ ] Software form (license costs)
- [ ] Facilities form (power, cooling, rack)
- [ ] Labor form (FTE counts, productivity gains) - LARGEST COST COMPONENT
- [ ] Support form (VMware support costs)
- [ ] Migration form (migration hours, reskilling)
- [ ] Investment form (multi-year breakdown)
- [ ] Business Impact form (revenue, productivity benefits)

**Files to Reference:**
- `INPUT_OUTPUT_SPECIFICATION.md` - ALL input specifications
- `MASTER_DOCUMENTATION.md` - Sheet-by-sheet details

**UI/UX Requirements:**
- Yellow border/background = Required input
- Orange border = Overridable default
- Blue background = Calculated (read-only)
- Real-time validation
- Tooltips with help text
- Auto-save functionality

---

### PHASE 4: Results Dashboard (Priority: HIGH)
**Tasks:**
- [ ] ROI Results page with key metrics (NPV, ROI %, Payback)
- [ ] TCO breakdown by category (bar charts)
- [ ] Year-by-year cash flow (line chart)
- [ ] Sustainability metrics visualization
- [ ] Scenario comparison view
- [ ] Export preview

**Files to Reference:**
- `INPUT_OUTPUT_SPECIFICATION.md` - Primary Output Metrics
- `MASTER_DOCUMENTATION.md` - Sheet: ROI Results

**Key Metrics to Display:**
```
Primary:
- 10-Year NPV (large, prominent)
- ROI Percentage (e.g., 975%)
- Payback Period (e.g., 12 months)
- Monthly Cost of Delay

Secondary:
- TCO Current State vs Future State (comparison)
- Savings by Category (Compute, Storage, Labor, etc.)
- Year-by-year breakdown (table + chart)
- Sustainability (CO2, power, equivalents)
```

---

### PHASE 5: Export & Reporting (Priority: MEDIUM)
**Tasks:**
- [ ] PDF executive summary generation
- [ ] Excel workbook export (with formulas)
- [ ] PowerPoint slide deck generation
- [ ] Email sharing functionality

**Libraries:**
- PDF: Puppeteer or PDFKit
- Excel: ExcelJS
- PowerPoint: pptxgenjs

---

## 🔢 CALCULATION PRIORITY ORDER

**Implement calculations in this order:**

1. **Initial Screens calculations** (VMs/Host, component usage)
2. **Compute costs** (host consolidation, 10-year TCO)
3. **Storage costs** (capacity, vSAN costs)
4. **Labor costs** (FTE productivity - LARGEST SAVINGS)
5. **Misc sheet aggregations** (year-by-year totals)
6. **ROI Results** (NPV, ROI %, Payback)
7. Network, Software, Facilities, Support, Migration
8. Business Impact, Sustainability

---

## ✅ VALIDATION RULES

**Implement these validations:**

```typescript
const validations = {
  vms: { required: true, min: 1, type: 'integer' },
  hosts: { required: true, min: 1, type: 'integer' },
  analysisTerm: { required: true, min: 1, max: 15 },
  percentage: { min: 0, max: 100 },
  currency: { min: 0 },
  futureVMs: { lte: 'currentVMs', message: 'Future VMs should be ≤ current' },
  futureHosts: { lt: 'currentHosts', message: 'Consolidation should reduce hosts' }
};
```

**See full list:** `INPUT_OUTPUT_SPECIFICATION.md` - Data Validation Rules

---

## 🎨 UI/UX GUIDELINES

### Color Coding (Critical!)
```css
/* Match Excel color scheme */
.input-required { 
  background: #FEF3C7; /* Yellow */
  border: 2px solid #FCD34D;
}

.input-default { 
  background: #FFEDD5; /* Orange */
  border: 2px solid #FB923C;
}

.calculated-field { 
  background: #F3F4F6; /* Gray */
  cursor: not-allowed;
  pointer-events: none;
}
```

### Navigation
- Wizard flow for new analyses (step-by-step)
- Tabbed navigation for editing
- Sidebar menu for quick access
- Progress indicator

### Responsive Design
- Desktop: Full sidebar + main content
- Tablet: Collapsible sidebar
- Mobile: Bottom navigation + stacked forms

---

## 🧪 TESTING REQUIREMENTS

### Verification Test Case (Critical!)
```javascript
// Test case from Excel file
const testCase = {
  inputs: {
    customerName: "Acme Company",
    vms: 5000,
    hosts: 400,
    avgStoragePerVM: 300,
    analysisTerm: 10,
    vmDecommissionPct: 0.10,
    // ... all other inputs
  },
  expectedOutputs: {
    futureVMs: 4500,
    futureHosts: 143,
    currentStateTCO: 25000000,
    futureStateTCO: 8937500,
    npv: 31216461,
    roi: 9.75,
    paybackMonths: 12,
    totalSavings: 91177811,
    co2Avoided: 9819,
    powerReduction: 17787.484
  }
};

// Must match Excel within 0.01% tolerance
expect(calculator.compute(testCase.inputs))
  .toBeCloseTo(testCase.expectedOutputs, 0.01);
```

---

## 📚 HOW TO USE THE DOCUMENTATION

### For Each Component You Build:

1. **Understanding:** Read relevant section in `MASTER_DOCUMENTATION.md`
2. **Inputs:** Check `INPUT_OUTPUT_SPECIFICATION.md` for field specs
3. **Formulas:** Reference `FORMULA_CONVERSION_GUIDE.md` for calculations
4. **Implementation:** Use code examples from `DEVELOPER_QUICKSTART.md`
5. **Verification:** Test against Excel file

### Example Workflow for Building "Compute" Component:

```
Step 1: Read MASTER_DOCUMENTATION.md - Sheet: Compute (understand purpose)
Step 2: Read INPUT_OUTPUT_SPECIFICATION.md - Compute Cost Inputs (get field specs)
Step 3: Read FORMULA_CONVERSION_GUIDE.md - Compute Formulas (get calculations)
Step 4: Build form component with validation
Step 5: Implement calculations
Step 6: Test against Excel: Compute sheet results
```

---

## 🎯 SUCCESS CRITERIA

Your application MUST:

1. ✅ **Produce identical results to Excel** (within 0.01% tolerance)
2. ✅ **Calculate in < 500ms** (full recalculation)
3. ✅ **Support real-time updates** as inputs change
4. ✅ **Handle all 2,507 formulas** correctly
5. ✅ **Validate all inputs** with helpful error messages
6. ✅ **Export professional reports** (PDF, Excel, PPT)
7. ✅ **Support multiple scenarios** with comparison
8. ✅ **Work on mobile, tablet, desktop** (responsive)
9. ✅ **Load in < 2 seconds**
10. ✅ **Support 100+ concurrent users**

---

## 🚨 CRITICAL IMPLEMENTATION NOTES

### 1. Calculation Engine is MOST CRITICAL
- Build this FIRST and THOROUGHLY
- Test against Excel continuously
- Use dependency graph for correct calculation order
- Handle circular references gracefully

### 2. Named Ranges
```typescript
// These 6 named ranges are used throughout:
const namedRanges = {
  AnalysisTerm: () => getValue("'Initial Screens'!C14"),
  Growth: () => getValue("'ROI Results'!I8"),
  Hardware_Refreshcylce: () => getValue("'ROI Results'!F53"),
  Hosts: () => getValue("'Initial Screens'!C17"),
  Inflation: () => getValue("'ROI Results'!I9"),
  VMs: () => getValue("'Initial Screens'!C16")
};
```

### 3. Labor Sheet is Complex
- Largest cost component (~$44M → $23M)
- Multiple roles with different productivity gains
- Regional salary adjustments
- Recaptured hours calculations
- See `MASTER_DOCUMENTATION.md` - Sheet: Labor for details

### 4. Year-by-Year Calculations
- Misc sheet handles growth and inflation
- Each cost category has annual escalation
- Hardware refresh cycles every 5 years
- See `MASTER_DOCUMENTATION.md` - Sheet: Misc

### 5. NPV Calculation
```typescript
// Net Present Value formula
function NPV(rate: number, cashFlows: number[]): number {
  return cashFlows.reduce((npv, cf, year) => 
    npv + cf / Math.pow(1 + rate, year + 1), 0
  );
}
```

---

## 📋 START HERE CHECKLIST

Before you start coding:

- [ ] Read `README.md` (understand the project)
- [ ] Read `DEVELOPER_QUICKSTART.md` (understand architecture)
- [ ] Skim `MASTER_DOCUMENTATION.md` (understand all sheets)
- [ ] Review `INPUT_OUTPUT_SPECIFICATION.md` (understand data model)
- [ ] Open Excel file (see it visually)

Then start building:

- [ ] Phase 1: Project setup
- [ ] Phase 2: Calculation engine (MOST CRITICAL)
- [ ] Phase 3: Input forms
- [ ] Phase 4: Results dashboard
- [ ] Phase 5: Exports

---

## 💡 CURSOR AI SPECIFIC INSTRUCTIONS

**When I ask you to build components, please:**

1. **Reference the documentation files** - They contain every detail you need
2. **Ask clarifying questions** if anything is unclear
3. **Show me the code** - Don't just describe it
4. **Test against Excel** - Calculations must match
5. **Follow the architecture** - Use recommended tech stack
6. **Implement incrementally** - One component at a time
7. **Add TypeScript types** - Ensure type safety
8. **Include error handling** - Validate all inputs
9. **Add comments** - Explain complex formulas
10. **Write tests** - Especially for calculations

**Example interaction:**
```
Me: "Build the Compute input form"

You should:
1. Read INPUT_OUTPUT_SPECIFICATION.md - Compute Cost Inputs
2. Read MASTER_DOCUMENTATION.md - Sheet: Compute  
3. Create React component with all fields
4. Add validation rules
5. Implement real-time calculation
6. Show me the complete code
7. Include TypeScript types
```

---

## 📞 READY TO START!

I have provided you with:
- ✅ Complete technical specifications (393 KB)
- ✅ All 2,507 formulas documented and explained
- ✅ Complete data dictionary
- ✅ Architecture and implementation guide
- ✅ Raw extracted data (JSON)
- ✅ Source Excel file

**Everything you need to build this application is in the documentation files.**

**Start by:**
1. Acknowledging you've understood the requirements
2. Asking any clarifying questions
3. Proposing the first component to build (I suggest: Calculation Engine)

Let's build an amazing web application! 🚀

---

## 🔗 DOCUMENTATION FILES REFERENCE

Quick links to find information:

- **Business Context:** `README.md`, `MASTER_DOCUMENTATION.md`
- **Architecture:** `DEVELOPER_QUICKSTART.md`
- **All Formulas:** `FORMULA_CONVERSION_GUIDE.md`
- **All Inputs/Outputs:** `INPUT_OUTPUT_SPECIFICATION.md`
- **Raw Data:** `model_complete_extraction.json`
- **Navigation Help:** `DOCUMENTATION_INDEX.md`
- **Source Truth:** `Value Model for PCMO_Requirements_V3.4_Nov19.xlsx`

---

**END OF PROMPT**

*Copy everything above and paste into Cursor AI to begin building the application.*

