
# PCMO Value Model - Complete Technical Specification


## Master Documentation for Web Application Development


**Document Purpose:** This document contains every input, calculation, formula, assumption, 
and output from the Private Cloud Maturity & Optimization (PCMO) Value Model Excel tool.
Use this as a complete specification to build a web-based application.

**Source File:** Value Model for PCMO_Requirements_V3.4_Nov19.xlsx
**Version:** 3.4 (Nov 19)
**Total Sheets:** 18
**Total Formulas:** 2507
**Total Cells with Content:** 4782



## Table of Contents


1. Business Context & Model Overview
2. Global Named Ranges & Parameters
3. UI/UX Guidelines (Color Coding & Cell Types)
4. Detailed Sheet-by-Sheet Specification
   - Initial Screens (Configuration)
   - Notes (Documentation)
   - Excel Output (Summary)
   - Compute (TCO Calculation)
   - Storage (TCO Calculation)
   - Network (TCO Calculation)
   - Software (TCO Calculation)
   - Facilities (TCO Calculation)
   - Labor (TCO Calculation)
   - Support (TCO Calculation)
   - Migration - Reskilling (TCO Calculation)
   - InvestmentBVA (Investment Breakdown)
   - Misc (Internal Calculations)
   - Business Impact (Revenue & Productivity)
   - ROI Results (Financial Metrics)
   - Sustainability (Environmental Impact)
   - Transition (Model Bridge)
   - Benchmarks (Reference Data)
5. Complete Formula Reference
6. Data Flow & Dependencies
7. Validation Rules
8. Web Application Requirements



## Business Context & Model Overview


### Purpose
This is a **Private Cloud Maturity & Optimization (PCMO) Tool** designed for VMware/Broadcom 
sales teams to demonstrate the financial value of migrating to VMware Cloud Foundation (VCF).

### Key Capabilities
- **TCO Analysis:** Compare current state vs. future state infrastructure costs over 10 years
- **ROI Calculation:** Calculate NPV, ROI percentage, payback period
- **Business Impact:** Model productivity gains, revenue increases
- **Sustainability:** Calculate environmental benefits (CO2 reduction, power savings)
- **Labor Productivity:** Detailed FTE modeling with regional salary adjustments
- **Multi-year Investment:** Break down CapEx and OpEx over analysis term

### Analysis Approach
1. **Current State:** Capture existing infrastructure (VMs, hosts, storage, costs)
2. **Future State:** Model optimized VCF infrastructure with consolidation
3. **Delta Analysis:** Calculate 10-year savings across all cost categories
4. **Financial Metrics:** Generate NPV, ROI, payback period
5. **Business Case:** Add sustainability and business impact benefits



## Global Named Ranges & Parameters


The model uses the following named ranges for key parameters that flow throughout calculations:


- **AnalysisTerm:** `<openpyxl.workbook.defined_name.DefinedName object>
Parameters:
name='AnalysisTerm', comment=None, customMenu=None, description=None, help=None, statusBar=None, localSheetId=None, hidden=None, function=None, vbProcedure=None, xlm=None, functionGroupId=None, shortcutKey=None, publishToServer=None, workbookParameter=None, attr_text="'Initial Screens'!$C$14"`

- **Growth:** `<openpyxl.workbook.defined_name.DefinedName object>
Parameters:
name='Growth', comment=None, customMenu=None, description=None, help=None, statusBar=None, localSheetId=None, hidden=None, function=None, vbProcedure=None, xlm=None, functionGroupId=None, shortcutKey=None, publishToServer=None, workbookParameter=None, attr_text="'ROI Results'!$I$8"`

- **Hardware_Refreshcylce:** `<openpyxl.workbook.defined_name.DefinedName object>
Parameters:
name='Hardware_Refreshcylce', comment=None, customMenu=None, description=None, help=None, statusBar=None, localSheetId=None, hidden=None, function=None, vbProcedure=None, xlm=None, functionGroupId=None, shortcutKey=None, publishToServer=None, workbookParameter=None, attr_text="'ROI Results'!$F$53"`

- **Hosts:** `<openpyxl.workbook.defined_name.DefinedName object>
Parameters:
name='Hosts', comment=None, customMenu=None, description=None, help=None, statusBar=None, localSheetId=None, hidden=None, function=None, vbProcedure=None, xlm=None, functionGroupId=None, shortcutKey=None, publishToServer=None, workbookParameter=None, attr_text="'Initial Screens'!$C$17"`

- **Inflation:** `<openpyxl.workbook.defined_name.DefinedName object>
Parameters:
name='Inflation', comment=None, customMenu=None, description=None, help=None, statusBar=None, localSheetId=None, hidden=None, function=None, vbProcedure=None, xlm=None, functionGroupId=None, shortcutKey=None, publishToServer=None, workbookParameter=None, attr_text="'ROI Results'!$I$9"`

- **VMs:** `<openpyxl.workbook.defined_name.DefinedName object>
Parameters:
name='VMs', comment=None, customMenu=None, description=None, help=None, statusBar=None, localSheetId=None, hidden=None, function=None, vbProcedure=None, xlm=None, functionGroupId=None, shortcutKey=None, publishToServer=None, workbookParameter=None, attr_text="'Initial Screens'!$C$16"`


## UI/UX Guidelines (Color Coding & Cell Types)


The original Excel model uses color coding to indicate cell types. Apply this to the web UI:

| Cell Type | Excel Color | Purpose | Web UI Treatment |
|-----------|------------|---------|------------------|
| **Input** | Yellow background | Required user input | Text input field, required validation |
| **Overridable Default** | Orange background | Pre-filled with default, user can edit | Text input with placeholder showing default |
| **Data Pull** | Blue background | Auto-calculated from other inputs | Read-only field, calculated in real-time |
| **Calculation** | Gray background | Formula result | Read-only field, auto-calculated |
| **Data Ingestion/Override** | Light blue | Can't edit if data ingested | Conditional: editable if no data, locked if ingested |
| **Red Notes** | Red text | Internal comments for MediaFly | Tooltip or help text icon |

### Cell Fill Colors Found in Model:


- **FFFFFFCC:** Used in 59 cells (e.g., Initial Screens!E2, Initial Screens!C8, Initial Screens!C9)

- **FF0069AA:** Used in 4 cells (e.g., Initial Screens!B5, Initial Screens!B11, Transition!B8)

- **Values must be of type <class 'str'>:** Used in 2231 cells (e.g., Initial Screens!C7, Initial Screens!C13, Initial Screens!B14)

- **FFCCCCFF:** Used in 15 cells (e.g., Notes!B2, Notes!B12, Misc!B2)

- **FFFF0000:** Used in 10 cells (e.g., Compute!P18, Compute!Q18, Compute!P22)

- **FF0095D3:** Used in 41 cells (e.g., Compute!C52, Compute!D52, Compute!E52)

- **FFD9D9D9:** Used in 3 cells (e.g., Compute!D118, Compute!F129, Compute!F136)

- **FF4472C4:** Used in 1 cells (e.g., Compute!B120)

- **FFFCE4D6:** Used in 10 cells (e.g., Compute!F123, Compute!F124, Compute!F125)

- **FFD0CECE:** Used in 4 cells (e.g., Compute!F126, Compute!F127, Compute!F128)


## Detailed Sheet-by-Sheet Specification


### Sheet: Initial Screens

**Dimensions:** 30 rows x 18 columns

**Total Cells with Content:** 68

**Formula Count:** 6

**Merged Cells:** 2

**Data Validations:** 4


#### Purpose & Structure



Configuration and setup page. Captures:
- Customer information (name, industry, region)
- Value model configuration (future state solution, analysis term)
- Infrastructure baseline (number of VMs, hosts, storage allocation)
- Component usage percentages (current vs future state)
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1                            2                                                  3                                                  4    5                                                6                                             7                                                  8    9    10   11   12   13   14   15   16   17
None                                               None                         None                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None  Private Cloud Maturity & Optimization (PCMO) Tool                         None                                               None any values in yellow input cells for illustrati... None                                Cell Color Legend                                          None                                               None None None None None None None None None None
None                 Layout should be aligned with PCMO                         None                                               None                                               None None                                            Input                                          None                                      must be input None None None None None None None None None
None                                               None                         None                                               None                                               None None                              Overridable default                                          None                                      Can be edited None None None None None None None None None
None                           PCMO Get Started Screen                          None                                               None                                               None None                                        Data pull                                          None                                    Can't be edited None None None None None None None None None
None                                               None                         None                                               None                                               None None                                      Calculation                                          None                                    Can't be edited None None None None None None None None None
None                                      Customer Name                 Acme Company                                               None                                               None None            Data ingestion or overridable default                                          None Can't be edited if data ingested from collector... None None None None None None None None None
None                             Analysis Data Industry           Financial Services      <-- Note to Mediafly: Default should be blank                                               None None                                        red notes             comments for MediaFly or internal                                               None None None None None None None None None None
None                               Analysis Data Region                         AMER      <-- Note to Mediafly: Default should be blank                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                               None                         None                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                          Value Model Configuration                         None <-- This "screen" follows when Value Model is i...                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                               None                         None                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                              Future state solution                        VCF 9                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                   Term of analysis                           10                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                               None                         None                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                      Number of VMs                         5000                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                 Number of VM Hosts                          400                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None Average allocated/provisioned storage (GBs) per VM                          300                                               None                                               None None                                             None vSAN storage = VMs x avg allocated GBs per VM                                               None None None None None None None None None None
None                                               None                         None                                               None                                               None None Traditional storage only used for TCO Assessment                                          None                                               None None None None None None None None None None
None                                    Component Usage                Current State                                       Future State                                               None None                                             None                                          None                                               None None None None None None None None None None
None                           % of Operations coverage                            0                                                  1                                               None None                                             None                                          None                                               None None None None None None None None None None
Show                           % of Automation coverage                            0                                                  1                                               None None                                             None                                          None                                               None None None None None None None None None None
Show                                  % Of NSX coverage                            0                                                  1                                               None None                                             None                                          None                                               None None None None None None None None None None
Show                                 % of vSAN Coverage                            0                                                  1                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                               None                         None                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None
None                          Select Advanced Services:            Avi Load Balancer                                                 No                                               None None                                             None                                          None                                               None None None None None None None None None None
Show                                               None vDefend Distributed Firewall                                                 No                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                               None  Data Services Manager (DSM)                                                 No Must include DSM for any Public Native Cloud co... None                                             None                                          None                                               None None None None None None None None None None
None                                               None   VMware Live Recovery (VLR)                                                 No                                               None None                                             None                                          None                                               None None None None None None None None None None
None                                               None                         None                                               None                                               None None                                             None                                          None                                               None None None None None None None None None None

```


#### Formulas (6 total)


Key calculation formulas:

- **A22:** `=IF(ISNUMBER(SEARCH("VCF",$C$13)),"Show","Hide")` → Result: `Show`

- **D22:** `=IF(A22="Show",100%,0)` → Result: `1`

- **A23:** `=$A$22` → Result: `Show`

- **A24:** `=IF($C$13="VVF","Hide","Show")` → Result: `Show`

- **A27:** `=$A$22` → Result: `Show`

- **E28:** `=IF(D28="Yes","","Must include DSM for any Public Native Cloud comparison")` → Result: `Must include DSM for any Public Native Cloud comparison`


#### Data Validations


- **Cells:** C16:C18

  - Type: whole

  - Formula1: 0

  - Allow Blank: True, Show Dropdown: False

- **Cells:** C14

  - Type: list

  - Formula1: "3,5,7,10"

  - Allow Blank: True, Show Dropdown: False

- **Cells:** D26:D29

  - Type: list

  - Formula1: "Yes, No"

  - Allow Blank: True, Show Dropdown: False

- **Cells:** C13

  - Type: list

  - Formula1: "VCF 5.x,VCF 9, VVF, VVF with vSAN"

  - Allow Blank: True, Show Dropdown: False


### Sheet: Notes

**Dimensions:** 28 rows x 4 columns

**Total Cells with Content:** 30

**Formula Count:** 0

**Merged Cells:** 0

**Data Validations:** 0


#### Purpose & Structure


Internal documentation for MediaFly/Broadcom with cell color legend and feature notes.


#### Key Data Points


First 30 rows of data:

```

   0                                                  1                                 2               3
None                                               None                              None            None
None                                       For MediaFly                              None            None
None                                               None                              None            None
None                                  Cell Color Legend                              None            None
None                                              Input                              None   must be input
None                                Overridable default                              None   Can be edited
None                                          Data pull                              None Can't be edited
None                                        Calculation                              None Can't be edited
None                                          red notes comments for MediaFly or internal            None
None                                               None                              None            None
None                                               None                              None            None
None                                           Internal                              None            None
None                                               None                              None            None
None                                         V2.5 Items                              None            None
   x                                     VLR simplified                              None            None
   x Custom Benefits for Software Cost Savings and L...                              None            None
   x                                     VVF jump start                              None            None
   x                                            add P2V                              None            None
   x                                    Sustainability                               None            None
   x                                 Growth & Inflation                              None            None
None        Past Value Analysis - see separate workbook                              None            None
None                                               None                              None            None
None                                    Time permitting                              None            None
None                                           Rounding                              None            None
None                 Fully Q&A for consistency & errors                              None            None
None                                               None                              None            None
None                                               None                              None            None
None                                               None                              None            None

```


### Sheet: Excel Output

**Dimensions:** 57 rows x 12 columns

**Total Cells with Content:** 134

**Formula Count:** 59

**Merged Cells:** 6

**Data Validations:** 1


#### Purpose & Structure


Summary export page showing key inputs, analysis parameters, and generated timestamp.


#### Key Data Points


First 30 rows of data:

```

  0                                                  1                          2             3            4    5    6                                                  7                   8    9                              10   11
None                                               None                       None          None         None None None                                               None                None None                           None None
None                        TCO & ROI Analysis Workbook                       None          None         None None None                                               None   Cell Color Legend None                           None None
None                                               None                       None          None         None None None                                               None Overridable default None                  Can be edited None
None                                           Customer               Acme Company          None         None None None                                               None           Data pull None Generally should not be edited None
None                                               Date 2025-11-21 19:09:23.670000          None         None None None                                   Date of download         Calculation None            Shouldn't be edited None
None                                   Term of Analysis               10-Year Term          None         None None None                                               None                None None                           None None
None                                    VMware Solution    Vmware Cloud Foundation          None         None None None                                               None                None None                           None None
None                                               None                       None          None         None None None                                               None                None None                           None None
None                                  Workbook Contents                       None          None         None None None                                               None                None None                           None None
None                                              Intro                       None          None         None None None                                               None                None None                           None None
None This workbook provides value analysis output fo...                       None          None         None None None                                               None                None None                           None None
None                                      Analysis Tabs                       None          None         None None None                                               None                None None                           None None
None Tabs include the ablity to create bottoms up ca...                       None          None         None None None                                               None                None None                           None None
None In addition Business Impact in the form of prof...                       None          None         None None None                                               None                None None                           None None
None                                        Results Tab                       None          None         None None None                                               None                None None                           None None
None ROI Summary - provides key financial metrics an...                       None          None         None None None                                               None                None None                           None None
None                                               None                       None          None         None None None                                               None                None None                           None None
None                                     Some Data Used                       None          None         None None None                                               None                None None                           None None
None                                Initial data inputs                       None          None         None None None                                               None                None None                           None None
None                                   Term of analysis                       None            10         None None None                                               None                None None                           None None
None                                               None                       None          None         None None None                                               None                None None                           None None
None                                      Number of VMs                       None          5000         None None None for Excel output, these values should drive the...                None None                           None None
None                                 Number of VM Hosts                       None           400         None None None for Excel output, these values should drive the...                None None                           None None
None Average allocated/provisioned storage (GBs) per VM                       None           300         None None None for Excel output, these values should drive the...                None None                           None None
None                                               None                       None          None         None None None                                               None                None None                           None None
None                                    Component Usage                       None Current State Future State None None                                               None                None None                           None None
None                           % of Operations coverage                       None             0            1 None None for Excel output, these values should drive the...                None None                           None None
Show                           % of Automation coverage                       None             0            1 None None for Excel output, these values should drive the...                None None                           None None
Show                                  % Of NSX coverage                       None             0            1 None None for Excel output, these values should drive the...                None None                           None None
Show                                 % of vSAN Coverage                       None             0            1 None None for Excel output, these values should drive the...                None None                           None None

```


#### Formulas (59 total)


Key calculation formulas:

- **C4:** `='Initial Screens'!C7` → Result: `Acme Company`

- **C5:** `=NOW()` → Result: `2025-11-21 19:09:23.670000`

- **C6:** `=AnalysisTerm&"-Year Term"` → Result: `10-Year Term`

- **B20:** `='Initial Screens'!B14` → Result: `Term of analysis`

- **D20:** `=AnalysisTerm` → Result: `10`

- **B22:** `='Initial Screens'!B16` → Result: `Number of VMs`

- **D22:** `='Initial Screens'!C16` → Result: `5000`

- **B23:** `='Initial Screens'!B17` → Result: `Number of VM Hosts`

- **D23:** `='Initial Screens'!C17` → Result: `400`

- **B24:** `='Initial Screens'!B18` → Result: `Average allocated/provisioned storage (GBs) per VM`

- **D24:** `='Initial Screens'!C18` → Result: `300`

- **B26:** `='Initial Screens'!B20` → Result: `Component Usage`

- **D26:** `='Initial Screens'!C20` → Result: `Current State`

- **E26:** `='Initial Screens'!D20` → Result: `Future State`

- **B27:** `='Initial Screens'!B21` → Result: `% of Operations coverage`

- **D27:** `='Initial Screens'!C21` → Result: ``

- **E27:** `='Initial Screens'!D21` → Result: `1`

- **A28:** `='Initial Screens'!$A$22` → Result: `Show`

- **B28:** `='Initial Screens'!B22` → Result: `% of Automation coverage`

- **D28:** `='Initial Screens'!C22` → Result: ``


... and 39 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** D22:D24

  - Type: whole

  - Formula1: 0

  - Allow Blank: True, Show Dropdown: False


### Sheet: Compute

**Dimensions:** 2034 rows x 20 columns

**Total Cells with Content:** 546

**Formula Count:** 191

**Merged Cells:** 29

**Data Validations:** 2


#### Purpose & Structure



Calculates compute infrastructure costs:
- Current state: ESXi hosts and vSAN Ready Nodes
- Future state: Consolidated vSAN Ready Nodes
- Hardware refresh cycles, support costs
- Server consolidation ratios (VMs per host)
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1    2     3    4          5             6                                                  7    8    9    10         11                       12            13           14              15              16              17              18   19
None                                               None None  None None       None          None                                               None None None None       None                     None          None         None            None            None            None            None None
None Current State Compute Costs & Anticipated Reduc... None  None None       None Return button                                               None None None None       None                     None          None         None            None            None            None            None None
None                                               None None  None None       None          None                                               None None None None       None                     None          None         None            None            None            None            None None
None                                      Current State None  None None       None          None                                Sourcing & Comments None None None       None                     None          None         None            None            None            None            None None
None                                      Number of VMs None  None None       5000          None                                               None None None None       None                     None          None         None            None            None            None            None None
None                                 Number of VM Hosts None  None None        400          None                                               None None None None       None                     None          None         None            None            None            None            None None
None                                           VMs/Host None  None None       12.5          None                                        Calculation None None None       None                     None          None         None            None            None            None            None None
Show         Percent of Hosts that are vSAN ready nodes None  None None          0          None                                               None None None None       None                     None          None         None            None            None            None            None None
Show  Average purchase cost per current state ESXi host None  None None      25000          None                                Placeholder default None None None       None                     None          None         None            None            None            None            None None
Hide Average purchase cost per current state vSAN re... None  None None          0          None                                Placeholder default None None None       None                     None          None         None            None            None            None            None None
None                    Annual compute hardware support None  None None       0.15          None                                Placeholder default None None None       None                     None          None         None            None            None            None            None None
None                         10-Year Current State Cost None  None None   25000000          None                                        Calculation None None None       None                     None          None         None            None            None            None            None None
None                                       Future State None  None None       None          None                                               None None None None       None                     None          None         None            None            None            None            None None
None Percent of VMs to be decommissioned (including ... None  None None        0.1          None Conservative default estimate; The Forrester To... None None None       None                     None          None         None            None            None            None            None None
None                          Number of VMs on premises None  None None       4500          None                                        Calculation None None None       None                     None          None         None            None            None            None            None None
Show     Percent of Hosts that will be vSAN ready nodes None  None None          1          None                                        From Inputs None None None       None                     None          None         None             OLD             OLD             NEW             NEW None
None Number of VM Hosts (vSAN Ready Nodes and ESXi H... None  None None        143          None                               From worksheet below None None None       None          Component Usage Current State Future State CPU Utilization RAM Utilization CPU Utilization RAM Utilization None
None                                           VMs/Host None  None None  31.468531          None                                        Calculation None None None Scenario 1 % of Operations coverage             0            1             0.3        0.458738            0.35        0.458738 None
Show                         Number of vSAN Ready Nodes None  None None        143     Worksheet                                        Calculation None None None Scenario 1 % of Automation coverage             0            1            None            None            None            None None
Hide                               Number of ESXi Hosts None  None None          0     Worksheet                                        Calculation None None None Scenario 1        % Of NSX coverage             0            1            None            None            None            None None
Show Average compute cost (excludes storage componen... None  None None      25000     Worksheet                                  Calculation below None None None Scenario 1       % of vSAN Coverage             0            1            None            None            None            None None
Hide        Average purchase cost per host (ESXi Hosts) None  None None          0          None                                    Pull from above None None None Scenario 2 % of Operations coverage             0            1             0.3        0.409091          0.3125        0.409091 None
None                    Annual compute hardware support None  None None       0.15          None                               Placeholder estimate None None None Scenario 2 % of Automation coverage             0            1            None            None            None            None None
None                          10-Year Future State Cost None  None None    8937500          None                                        Calculation None None None Scenario 2        % Of NSX coverage           0.5            1            None            None            None            None None
None                                               None None  None None       None          None                                               None None None None Scenario 2       % of vSAN Coverage             0            1            None            None            None            None None
None                              Target VM Host Sizing None  None None       None          None                                               None None None None Scenario 3 % of Operations coverage           0.5            1          0.3125        0.409091             0.3        0.409091 None
None                                               None None  None None       None          None                                               None None None None       None                     None          None         None            None            None            None            None None
Show                    Include Memory Tiering benefits None   Yes None       None          None Advanced Memory Management and Scheduling, with... None None None       None                     None          None         None            None            None            None            None None
show Anticipated percentage improvement in CPU overc... None   0.2 None       None          None                                               None None None None       None                     None          None         None            None            None            None            None None
show Anticipated percentage improvement in Memory ov... None  0.05 None       None          0.15                                               None None None None       None                     None          None         None            None            None            None            None None

```


#### Formulas (191 total)


Key calculation formulas:

- **F5:** `='Excel Output'!D22` → Result: `5000`

- **F6:** `='Excel Output'!$D$23` → Result: `400`

- **F7:** `=F5/F6` → Result: `12.5`

- **A8:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F8:** `=IF('Initial Screens'!C13="VVF",0,'Excel Output'!D30)` → Result: ``

- **A9:** `=IF($F$8=100%,"Hide","Show")` → Result: `Show`

- **F9:** `=IF(F8=1,0,25000)` → Result: `25000`

- **A10:** `=IF($F$8=0,"Hide","Show")` → Result: `Hide`

- **F10:** `=IF(F8>0,35000,0)` → Result: ``

- **B12:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F12:** `=(ROUND(F6*(1-F8),0)*F9+ROUND(F6*F8,0)*F10)*(1+AnalysisTerm*F11)` → Result: `25000000`

- **F14:** `=IF('Excel Output'!E28>'Excel Output'!D28,10%,5%)` → Result: `0.1`

- **F15:** `=ROUND(F$5*(1-F$14),0)` → Result: `4500`

- **A16:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F16:** `='Excel Output'!E30` → Result: `1`

- **B17:** `=IF('Initial Screens'!$C$13="VVF","Number of VM Hosts","Number of VM Hosts (vSAN Ready Nodes and ESXi Hosts)")` → Result: `Number of VM Hosts (vSAN Ready Nodes and ESXi Hosts)`

- **F17:** `=F46` → Result: `143`

- **F18:** `=F15/F17` → Result: `31.46853146853147`

- **A19:** `=IF($F$16=0%,"Hide","Show")` → Result: `Show`

- **F19:** `=ROUND(F16*F17,0)` → Result: `143`


... and 171 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** D28

  - Type: list

  - Formula1: "Yes,No"

  - Allow Blank: True, Show Dropdown: False

- **Cells:** F132:G132

  - Type: list

  - Formula1: "1920,3840"

  - Allow Blank: True, Show Dropdown: False


### Sheet: Storage

**Dimensions:** 1981 rows x 20 columns

**Total Cells with Content:** 215

**Formula Count:** 94

**Merged Cells:** 3

**Data Validations:** 0


#### Purpose & Structure



Storage TCO calculations:
- Allocated/provisioned storage per VM
- Total storage capacity requirements
- vSAN vs traditional storage costs
- Usable to raw capacity ratios
- Storage hardware and support costs
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1    2    3    4            5             6                                                  7    8    9    10   11   12   13   14   15   16   17   18   19
None                                               None None None None          NaN          None                                               None None None None None None None None None None None None None
None Current State Storage Costs & Anticipated Reduc... None None None          NaN Return button                                               None None None None None None None None None None None None None
None                                               None None None None          NaN          None                                               None None None None None None None None None None None None None
None                                      Current State None None None          NaN          None                                Sourcing & Comments None None None None None None None None None None None None
None                                      Number of VMs None None None     5000.000          None                                        From inputs None None None None None None None None None None None None
Show                  Number of Physical legacy servers None None None        0.000          None                                       From Compute None None None None None None None None None None None None
None Average allocated/provisioned storage (GBs) per VM None None None      300.000          None                                               None None None None None None None None None None None None None
Show Average allocated/provisioned storage (GBs) per... None None None      300.000          None                                Placeholder default None None None None None None None None None None None None
None Total GBs of allocated/provisioned storage to s... None None None  1500000.000          None                                        Calculation None None None None None None None None None None None None
None                                Usable to Raw Ratio None None None        0.700          None Placeholder estimate - Ratio of Usable storage ... None None None None None None None None None None None None
None    Total Raw Capacity required to support VMs (GB) None None None  2142857.000          None                                        Calculation None None None None None None None None None None None None
Show         Percent of Hosts that are vSAN ready nodes None None None        0.000          None                                        From inputs None None None None None None None None None None None None
Show      Upfront external storage purchase cost per GB None None None        2.000          None                               Placeholder estimate None None None None None None None None None None None None
Hide    Upfront capacity disk based storage cost per GB None None None        0.980          None                                     From worksheet None None None None None None None None None None None None
None Other Storage Devices (includes SAN switches, H... None None None        0.050          None Placeholder estimate - Includes FC SAN switches... None None None None None None None None None None None None
None                                 Number of VM Hosts None None None      400.000          None                                                  0 None None None None None None None None None None None None
None    Average purchase cost per current state VM host None None None    25000.000          None                                        Calculation None None None None None None None None None None None None
Show   Average purchase cost per physical legacy server None None None     5000.000          None                                       From Compute None None None None None None None None None None None None
None                         Other Storage Devices Cost None None None   500000.000          None                                        Calculation None None None None None None None None None None None None
None                    Annual storage hardware support None None None        0.150          None                                Placeholder default None None None None None None None None None None None None
None                         10-Year Current State Cost None None None 11964285.000          None                                        Calculation None None None None None None None None None None None None
None                                       Future State None None None          NaN          None                                               None None None None None None None None None None None None None
None                                      Number of VMs None None None     4500.000          None                                        Calculation None None None None None None None None None None None None
None                                Usable to Raw Ratio None None None        1.125     Worksheet                                     From Worksheet None None None None None None None None None None None None
None    Total Raw Capacity required to support VMs (GB) None None None  1200000.000          None             Calculation based on the vSAN coverage None None None None None None None None None None None None
Show     Upfront storage purchase cost per GB with vSAN None None None        0.980     Worksheet                                    From Worksheet  None None None None None None None None None None None None
Hide  Upfront storage purchase cost per GB without vSAN None None None        2.000          None                               Placeholder estimate None None None None None None None None None None None None
Hide Other Storage Devices (includes SAN switches, H... None None None        0.050          None                                         From above None None None None None None None None None None None None
Show                         Number of vSAN Ready Nodes None None None      143.000          None                                       From Compute None None None None None None None None None None None None
Hide                               Number of ESXi Hosts None None None        0.000          None                                       From Compute None None None None None None None None None None None None

```


#### Formulas (94 total)


Key calculation formulas:

- **F5:** `='Excel Output'!D22` → Result: `5000`

- **A6:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F6:** `=Compute!F73` → Result: ``

- **F7:** `='Excel Output'!D24` → Result: `300`

- **A8:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F8:** `=IF(Compute!D68="No",0,'Excel Output'!D24)` → Result: `300`

- **G8:** `=IF(Compute!D68="No","leave blank","")` → Result: ``

- **F9:** `=ROUND(F5*F7+F6*F8,0)` → Result: `1500000`

- **F11:** `=ROUND(F9/F10,0)` → Result: `2142857`

- **A12:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F12:** `=Compute!F8` → Result: ``

- **A13:** `=IF($F$12=100%,"Hide","Show")` → Result: `Show`

- **A14:** `=IF($F$12=0%,"Hide","Show")` → Result: `Hide`

- **F14:** `=F26` → Result: `0.98`

- **F16:** `='Excel Output'!D23` → Result: `400`

- **H16:** `='Initial Screens'!$E$17` → Result: ``

- **F17:** `=Compute!F8*Compute!F10+(1-Compute!F8)*Compute!F9` → Result: `25000`

- **A18:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F18:** `=Compute!F74` → Result: `5000`

- **F19:** `=ROUND(F15*(F16*F17+F6*F18),0)` → Result: `500000`


... and 74 more formulas (see JSON file for complete list)


### Sheet: Network

**Dimensions:** 1904 rows x 20 columns

**Total Cells with Content:** 190

**Formula Count:** 88

**Merged Cells:** 4

**Data Validations:** 0


#### Purpose & Structure



Network infrastructure costs:
- Host-based networking
- Top of Rack (ToR) switches
- Load balancers and firewalls
- Network hardware support
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1   2    3    4          5             6                                                  7    8    9    10   11   12   13   14   15   16   17   18   19
None                                               None NaN None None        NaN          None                                               None None None None None None None None None None None None None
None Current State Network (Host Based) Costs & Anti... NaN None None        NaN Return button                                               None None None None None None None None None None None None None
None                                               None NaN None None        NaN          None                                               None None None None None None None None None None None None None
None                                      Current State NaN None None        NaN          None                                Sourcing & Comments None None None None None None None None None None None None
None Other Network Devices (primarily ToRs) as % of ... NaN None None       0.10          None                                Placeholder default None None None None None None None None None None None None
None                                 Number of VM Hosts NaN None None     400.00          None                                                  0 None None None None None None None None None None None None
Show Number of Physical legacy servers (that can be ... NaN None None       0.00          None                                       From Compute None None None None None None None None None None None None
None       Average purchase cost per current state host NaN None None   25000.00          None                                      From  Compute None None None None None None None None None None None None
Show Average purchase cost to refresh a physical leg... NaN None None    5000.00          None                                      From  Compute None None None None None None None None None None None None
None                    Annual network hardware support NaN None None       0.15          None                                Placeholder default None None None None None None None None None None None None
None                         10-Year Current State Cost NaN None None 2500000.00          None                                        Calculation None None None None None None None None None None None None
None                                       Future State NaN None None        NaN          None                                               None None None None None None None None None None None None None
None Other Network Devices (primarily ToRs) as % of ... NaN None None       0.10          None                                         From above None None None None None None None None None None None None
Show                         Number of vSAN Ready Nodes NaN None None     143.00          None                                      From  Compute None None None None None None None None None None None None
None                               Number of ESXi Hosts NaN None None       0.00          None                                      From  Compute None None None None None None None None None None None None
Show Average compute cost (excludes storage componen... NaN None None   25000.00          None                                      From  Compute None None None None None None None None None None None None
None        Average purchase cost per host (ESXi Hosts) NaN None None       0.00          None                                      From  Compute None None None None None None None None None None None None
None                    Annual network hardware support NaN None None       0.15          None                                Placeholder default None None None None None None None None None None None None
None                          10-Year Future State Cost NaN None None  893750.00          None                                        Calculation None None None None None None None None None None None None
None                                               None NaN None None        NaN          None                                               None None None None None None None None None None None None None
None                                VCF Network Add-Ons NaN None None        NaN          None                                               None None None None None None None None None None None None None
None                                               None NaN None None        NaN          None                                               None None None None None None None None None None None None None
Hide                     Reduced Load Balancer Hardware NaN None None        NaN          None                                               None None None None None None None None None None None None None
Hide                                               None NaN None None        NaN          None                                               None None None None None None None None None None None None None
Hide                                      Current State NaN None None        NaN          None                                Sourcing & Comments None None None None None None None None None None None None
Hide Number of Data Center HW Load Balancers (existi... NaN None None       0.00     Worksheet Assumes host traffic = 4 Gbps, LB throughput = ... None None None None None None None None None None None None
Hide                             Cost per load balancer NaN None None   87000.00          None   Based on estimated net price for F5-BIG-LTM-8900 None None None None None None None None None None None None
Hide                    Annual network hardware support NaN None None       0.15          None                                Placeholder default None None None None None None None None None None None None
Hide                         10-Year Current State Cost NaN None None       0.00          None                                        Calculation None None None None None None None None None None None None
Hide                                       Future State NaN None None        NaN          None                                               None None None None None None None None None None None None None

```


#### Formulas (88 total)


Key calculation formulas:

- **F6:** `=Compute!F6` → Result: `400`

- **H6:** `='Initial Screens'!$E$17` → Result: ``

- **A7:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F7:** `=Compute!F73` → Result: ``

- **F8:** `=Compute!F8*Compute!F10+(1-Compute!F8)*Compute!F9` → Result: `25000`

- **A9:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F9:** `=Compute!F74` → Result: `5000`

- **B11:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F11:** `=ROUND(Network!F5*Network!F6*Network!F8,0)*(1+AnalysisTerm*Network!F10)` → Result: `2500000`

- **F13:** `=ROUND(F5,3)` → Result: `0.1`

- **A14:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F14:** `=Compute!F19+Compute!F81` → Result: `143`

- **F15:** `=Compute!F20+Compute!F82` → Result: ``

- **A16:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F16:** `=Compute!F21` → Result: `25000`

- **F17:** `=Compute!F22` → Result: ``

- **B19:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"` → Result: `10-Year Future State Cost`

- **F19:** `=ROUND(F13*(F14*F16+F15*F17),0)*(1+AnalysisTerm*F18)` → Result: `893750`

- **A23:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")` → Result: `Hide`

- **A24:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")` → Result: `Hide`


... and 68 more formulas (see JSON file for complete list)


### Sheet: Software

**Dimensions:** 1847 rows x 20 columns

**Total Cells with Content:** 72

**Formula Count:** 28

**Merged Cells:** 2

**Data Validations:** 1


#### Purpose & Structure



Software licensing costs:
- Current VMware licenses, subscriptions, services
- Future state VCF licensing
- Data Services Manager (DSM) costs
- Annual increase/escalation rates
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1    2    3    4           5             6                                                  7           8             9    10   11   12   13   14   15   16   17   18   19
None                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None       Current VMware Annual Investment Elimination None None None         NaN Return button                                               None         NaN           NaN None None None None None None None None None None
None                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                                      Current State None None None         NaN          None                                Sourcing & Comments 2762815.625           NaN None None None None None None None None None None
 (i) Annual VMware Software, Subscription and Servic... None None None  500000.000          None  Please update with the actual stated out year ...         NaN           NaN None None None None None None None None None None
None                          Estimated annual increase None None None       0.050          None                                Placeholder default         NaN           NaN None None None None None None None None None None
None                         10-Year Current State Cost None None None 2762815.625          None                                        Calculation         NaN           NaN None None None None None None None None None None
None                                       Future State None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                              Anticipated reduction None None None       0.500          None Assumes elimination of  cost as part of executi...         NaN 250000.033933 None None None None None None None None None None
None                          10-Year Future State Cost None None None 1381408.000          None                                        Calculation         NaN           NaN None None None None None None None None None None
None                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
Hide Software License Cost Reduction with Data Servi... None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
Hide                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
Hide                                      Current State None None None         NaN          None                                Sourcing & Comments         NaN           NaN None None None None None None None None None None
Hide                              Total number of Cores None None None   14400.000          None Pulled from current number of hosts times curre...         NaN           NaN None None None None None None None None None None
Hide            Percent of Cores requiring DSM coverage None None None       0.120          None                                       Postgres use         NaN           NaN None None None None None None None None None None
Hide Average annual cost per core for competitive of... None None None    1000.000          None RDS Outpost - Annualized cost of Nutanix DB (la...         NaN           NaN None None None None None None None None None None
Hide                         10-Year Current State Cost None None None       0.000          None                                        Calculation         NaN           NaN None None None None None None None None None None
Hide                                       Future State None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
Hide                              Anticipated reduction None None None       1.000          None                               Assumes full takeout         NaN           NaN None None None None None None None None None None
Hide                          10-Year Future State Cost None None None       0.000          None                                        Calculation         NaN           NaN None None None None None None None None None None
None                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                             Include Custom Benefit   No None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                     Other Reduced Software Cost(s) None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                                               None None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                                      Current State None None None         NaN          None                                Sourcing & Comments         NaN           NaN None None None None None None None None None None
None          Number of software subscription contracts None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                   Annual average cost per contract None None None         NaN          None                                               None         NaN           NaN None None None None None None None None None None
None                         10-Year Current State Cost None None None       0.000          None                                        Calculation         NaN           NaN None None None None None None None None None None

```


#### Formulas (28 total)


Key calculation formulas:

- **I4:** `=F5*((1+F6)^5-1)/F6` → Result: `2762815.625000001`

- **B7:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F7:** `=IF(AnalysisTerm=3,F5+F5*(1+F6)+F5*(1+F6)^2,F5+F5*(1+F6)+F5*(1+F6)^2+F5*(1+F6)^3+F5*(1+F6)^4)` → Result: `2762815.625`

- **F9:** `=ROUND(100%,3)-50%` → Result: `0.5`

- **J9:** `=F10*F6/((1+F6)^5-1)` → Result: `250000.03393277456`

- **B10:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"` → Result: `10-Year Future State Cost`

- **F10:** `=ROUND(F7*(1-F9),0)` → Result: `1381408`

- **A12:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **A13:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **A14:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **A15:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **F15:** `=Compute!D39*Compute!D41` → Result: `14400`

- **A16:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **F16:** `=ROUND(12%,3)` → Result: `0.12`

- **A17:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **F17:** `=1000` → Result: `1000`

- **A18:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`

- **B18:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F18:** `=IF('Initial Screens'!$D$28="Yes",ROUND(F15*F16*F17*AnalysisTerm,0),0)` → Result: ``

- **A19:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")` → Result: `Hide`


... and 8 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** C23

  - Type: list

  - Formula1: "Yes, No"

  - Allow Blank: True, Show Dropdown: False


### Sheet: Facilities

**Dimensions:** 62 rows x 20 columns

**Total Cells with Content:** 186

**Formula Count:** 79

**Merged Cells:** 3

**Data Validations:** 0


#### Purpose & Structure



Data center operational costs:
- Power consumption per host
- Cooling requirements
- Rack space costs
- Per-device operational expenses
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1    2    3    4        5             6                                                  7    8    9    10   11   12   13   14   15   16   17   18   19
None                                               None None None None     None          None                                               None None None None None None None None None None None None None
None                 Reduced Power, Cooling, Rack Costs None None None     None Return button                                               None None None None None None None None None None None None None
None                                               None None None None     None          None                                               None None None None None None None None None None None None None
None                                      Current State None None None     None          None                                Sourcing & Comments None None None None None None None None None None None None
None                                 Number of VM Hosts None None None      400          None                                                  0 None None None None None None None None None None None None
None      Opex per host per year (rack, power, cooling) None None None     6032     Worksheet                                     From worksheet None None None None None None None None None None None None
Show                  Number of Physical legacy servers None None None        0          None                                                  0 None None None None None None None None None None None None
Show Opex per physical legacy server per year (rack,... None None None     5151          None                                     From worksheet None None None None None None None None None None None None
Hide                           Number of load balancers None None None        0          None From Network Calculation Section Above (Reduced... None None None None None None None None None None None None
Hide Opex per load balancer per year (rack, power, c... None None None        0     Worksheet                                     From worksheet None None None None None None None None None None None None
Hide                                Number of firewalls None None None        0          None From Network Calculation Section Above (Reduced... None None None None None None None None None None None None
Hide Opex per firewalls per year (rack, power, cooling) None None None        0     Worksheet                                     From worksheet None None None None None None None None None None None None
None                         10-Year Current State Cost None None None 24128000          None                                        Calculation None None None None None None None None None None None None
None                                       Future State None None None     None          None                                               None None None None None None None None None None None None None
None    Number of Hosts (vSAN Ready Nodes & ESXi Hosts) None None None      143          None                                       From Compute None None None None None None None None None None None None
None Opex per vSAN Ready Node per year (rack, power,... None None None     5429          None                                         From above None None None None None None None None None None None None
Hide                           Number of load balancers None None None        0          None                                 From Network sheet None None None None None None None None None None None None
Hide Opex per load balancer per year (rack, power, c... None None None        0          None                                         From above None None None None None None None None None None None None
Hide                                Number of firewalls None None None        0          None                                 From Network sheet None None None None None None None None None None None None
Hide Opex per firewalls per year (rack, power, cooling) None None None        0          None                                         From above None None None None None None None None None None None None
None                          10-Year Future State Cost None None None  7763470          None                                        Calculation None None None None None None None None None None None None
None                                               None None None None     None          None                                               None None None None None None None None None None None None None
None     Current State Ongoing Opex per device per year None None None     None          None                                               None None None None None None None None None None None None None
None                        Power & Cooling Requirement None None None     None          None                                Sourcing & Comments None None None None None None None None None None None None
None               24 x 7 Operations for DC HW (365*24) None None None     8760          None               Assumes 365 days x 24 hours per year None None None None None None None None None None None None
None    Operational Power rating per Physical Host (kW) None None None     0.65          None                               Placeholder estimate None None None None None None None None None None None None
Show Operational Power rating per physical legacy se... None None None      0.3          None                               Placeholder estimate None None None None None None None None None None None None
Hide    Operational Power rating per Load balancer (kW) None None None      0.3          None                               Placeholder estimate None None None None None None None None None None None None
Hide         Operational Power rating per Firewall (kW) None None None      0.3          None                               Placeholder estimate None None None None None None None None None None None None
None Burdened rate for additional Network and Storag... None None None      0.3          None                               Placeholder estimate None None None None None None None None None None None None

```


#### Formulas (79 total)


Key calculation formulas:

- **F5:** `='Excel Output'!$D$23+Compute!$F$94*'Excel Output'!$D$23` → Result: `400`

- **H5:** `=Compute!H6` → Result: ``

- **F6:** `=F57` → Result: `6032`

- **A7:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F7:** `=Compute!F73` → Result: ``

- **H7:** `=Compute!H73` → Result: ``

- **A8:** `=IF(Compute!$D$68="No","Hide","Show")` → Result: `Show`

- **F8:** `=F58` → Result: `5151`

- **A9:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")` → Result: `Hide`

- **F9:** `=IF('Initial Screens'!$D$26="Yes",Network!F26,0)` → Result: ``

- **A10:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")` → Result: `Hide`

- **F10:** `=IF('Initial Screens'!$D$26="Yes",F59,0)` → Result: ``

- **A11:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")` → Result: `Hide`

- **F11:** `=IF('Initial Screens'!$D$27="Yes",Network!F48,0)` → Result: ``

- **A12:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")` → Result: `Hide`

- **F12:** `=IF('Initial Screens'!$D$27="Yes",F60,0)` → Result: ``

- **B13:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F13:** `=ROUND(F5*F6+F7*F8+F9*F10+F11*F12,0)*AnalysisTerm` → Result: `24128000`

- **F15:** `=Compute!F17+Compute!F81+Compute!F82` → Result: `143`

- **F16:** `=ROUND($F$6*IF(AND(Compute!F41>Compute!D41,Compute!F42>Compute!D42),0.9,1),0)` → Result: `5429`


... and 59 more formulas (see JSON file for complete list)


### Sheet: Labor

**Dimensions:** 1239 rows x 21 columns

**Total Cells with Content:** 386

**Formula Count:** 180

**Merged Cells:** 12

**Data Validations:** 1


#### Purpose & Structure



IT labor productivity analysis:
- Multiple roles: Server, Storage, Network, Security, Backup, Monitoring, Service Desk
- Current FTE counts and costs
- Productivity improvement percentages
- Regional salary adjustments
- Total recaptured hours calculation
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1    2    3    4             5             6                                                  7    8    9   10   11   12  13   14   15   16   17  18   19   20
None                                               None None None None          None          None                                               None None None 0.0 None None NaN None None None None NaN None None
None                                 Labor Productivity None None None          None Return button                                               None None None NaN None None NaN None None None None NaN None None
None                                               None None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
None Total Number of FTE(s) involved cosidered in Cu... None None None          25.2          None Calculation -Sum of all the individual FTEs cos... None None NaN None None NaN None None None None NaN None None
None      Total recaptured labor hours in future state  None None None  27828.873784          None Calculation -Sum of all the individual FTEs cos... None None NaN None None NaN None None None None NaN None None
None                Anticipated Efficiency improvement  None None None      0.469077          None Calculation- Sum of all the individual FTEs cos... None None NaN None None NaN None None None None NaN None None
None                                               None None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
None                          Server Admin Productivity None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
None                                      Current State None None None          None          None                                Sourcing & Comments None None NaN None None NaN None None None None NaN None None
None                    Number of Server Administrators None None None             5          None                         Assumes 1000 VMs per admin None None NaN None None NaN None None None None NaN None None
None Average annual fully burdened cost per server a... None None None     175032.71          None Skillsoft 2024 IT Skills and Salary Report Benc... None None NaN None None NaN None None None None NaN None None
None                      Current State Annualized Cost None None None        875164          None                                        Calculation None None NaN None None NaN None None None None NaN None None
None                                       Future State None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
None              Anticipated percent productivity gain None None None          0.48          None                               Placeholder estimate None None NaN None None NaN None None None None NaN None None
None                       Future State Annualized Cost None None None        455085          None                                        Calculation None None NaN None None NaN None None None None NaN None None
None                                               None None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
Show                         Storage Admin Productivity None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
Show                                      Current State None None None          None          None                                Sourcing & Comments None None NaN None None NaN None None None None NaN None None
Show          Number of storage administrator personnel None None None             5          None                          Assumes 300 TBs per admin None None NaN None None NaN None None None None NaN None None
Show Average annual fully burdened cost per storage ... None None None     175032.71          None Skillsoft 2024 IT Skills and Salary Report Benc... None None NaN None None NaN None None None None NaN None None
Show                      Current State Annualized Cost None None None        875164          None                                        Calculation None None NaN None None NaN None None None None NaN None None
Show                                       Future State None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
Show              Anticipated percent productivity gain None None None           0.5          None                               Placeholder estimate None None NaN None None NaN None None None None NaN None None
Show                       Future State Annualized Cost None None None        437582          None                                        Calculation None None NaN None None NaN None None None None NaN None None
None                                               None None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
Show Network Admin (provisioning/troubleshooting) Pr... None None None          None          None                                               None None None NaN None None NaN None None None None NaN None None
Show                                      Current State None None None          None          None                                Sourcing & Comments None None NaN None None NaN None None None None NaN None None
Show          Number of network administrator personnel None None None             5          None                         Assumes 1000 VMs per admin None None NaN None None NaN None None None None NaN None None
Show Average annual fully burdened cost per network ... None None None     175032.71          None Skillsoft 2024 IT Skills and Salary Report Benc... None None NaN None None NaN None None None None NaN None None
Show                      Current State Annualized Cost None None None        875164          None                                        Calculation None None NaN None None NaN None None None None NaN None None

```


#### Formulas (180 total)


Key calculation formulas:

- **K1:** `=(F60*F107*F108)/2080` → Result: ``

- **F4:** `=ROUND(Misc!C156,1)` → Result: `25.2`

- **F5:** `=(F4*2080)*(1-F6)` → Result: `27828.87378391089`

- **F6:** `=(F127-F128)/F127` → Result: `0.46907673641806147`

- **F10:** `=ROUND(MIN(10,'Excel Output'!$D$22/1000),1)` → Result: `5`

- **F11:** `=ROUND(Benchmarks!$D$16,2)` → Result: `175032.71`

- **H11:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"` → Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`

- **F12:** `=ROUND(F10*F11,0)` → Result: `875164`

- **F14:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MIN(50%,ROUND(40%*(1+Compute!$D$29),3)),ROUND(20%,3))` → Result: `0.48`

- **F15:** `=ROUND(F12*(1-F14),0)` → Result: `455085`

- **A17:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **A18:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **A19:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F19:** `=IF(A17="Show",ROUND(MIN(10,'Excel Output'!D22*'Excel Output'!D24/1000/300),1),0)` → Result: `5`

- **A20:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F20:** `=ROUND(Benchmarks!$D$16,2)` → Result: `175032.71`

- **H20:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"` → Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`

- **A21:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`

- **F21:** `=ROUND(F19*F20,0)` → Result: `875164`

- **A22:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")` → Result: `Show`


... and 160 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** C88 C101 C115

  - Type: list

  - Formula1: "Yes, No"

  - Allow Blank: True, Show Dropdown: False


### Sheet: Support

**Dimensions:** 1838 rows x 20 columns

**Total Cells with Content:** 19

**Formula Count:** 4

**Merged Cells:** 1

**Data Validations:** 0


#### Purpose & Structure



VMware support and professional services:
- Annual support costs (TAM, etc.)
- Escalation rates
- Anticipated reduction percentages
        


#### Key Data Points


First 30 rows of data:

```

  0                                             1    2    3    4         5             6                                                  7    8    9    10   11   12   13   14   15   16   17   18   19
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None Current VMware Support Investment Elimination None None None       NaN Return button any values in yellow input cells for illustrati... None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                 Current State None None None       NaN          None                                Sourcing & Comments None None None None None None None None None None None None
None       Annual VMware Support (e.g., TAM, etc.) None None None  250000.0          None                                               None None None None None None None None None None None None None
None                     Estimated annual increase None None None       0.0          None                                               None None None None None None None None None None None None None
None                    10-Year Current State Cost None None None 1250000.0          None                                        Calculation None None None None None None None None None None None None
None                                  Future State None None None       NaN          None                                               None None None None None None None None None None None None None
None                         Anticipated reduction None None None       0.5          None Assumes elimination of cost as part of executio... None None None None None None None None None None None None
None                     10-Year Future State Cost None None None  625000.0          None                                        Calculation None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None
None                                          None None None None       NaN          None                                               None None None None None None None None None None None None None

```


#### Formulas (4 total)


Key calculation formulas:

- **B7:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F7:** `=IF(AnalysisTerm=3,F5+F5*(1+F6)+F5*(1+F6)^2,F5+F5*(1+F6)+F5*(1+F6)^2+F5*(1+F6)^3+F5*(1+F6)^4)` → Result: `1250000`

- **B10:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"` → Result: `10-Year Future State Cost`

- **F10:** `=ROUND(F7*(1-F9),0)` → Result: `625000`


### Sheet: Migration - Reskilling

**Dimensions:** 1869 rows x 20 columns

**Total Cells with Content:** 73

**Formula Count:** 35

**Merged Cells:** 1

**Data Validations:** 1


#### Purpose & Structure



One-time and ongoing costs:
- VM migration efficiency (hours per VM)
- HCX acceleration benefits
- Staff reskilling/training costs
- Training hours per FTE
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1    2    3    4          5             6                                                  7    8    9    10   11   12   13   14   15   16   17   18   19
None                                               None None None None        NaN          None                                               None None None None None None None None None None None None None
None                      Include Migration Efficiency?  Yes None None        NaN          None                                               None None None None None None None None None None None None None
None                                               None None None None        NaN          None                                               None None None None None None None None None None None None None
Show Migration Efficiency (related to host refresh a... None None None        NaN Return button                                               None None None None None None None None None None None None None
Show                                               None None None None        NaN          None                                               None None None None None None None None None None None None None
Show                                      Current State None None None        NaN          None                                Sourcing & Comments None None None None None None None None None None None None
Show                                      Number of VMs None None None    5000.00          None                                                  0 None None None None None None None None None None None None
Show Expected percent of VMs to migrate over duratio... None None None       1.00          None                             Assumes full migration None None None None None None None None None None None None
Show Average hours to migrate a VM (to the cloud or ... None None None       1.00          None VMware Benchmark (assumes vSphere only current ... None None None None None None None None None None None None
Show              Fully burdened IT labor cost per hour None None None      97.50          None Skillsoft 2024 IT Skills and Salary Report Benc... None None None None None None None None None None None None
Show                         10-Year Current State Cost None None None 4875000.00          None                                        Calculation None None None None None None None None None None None None
Show                                       Future State None None None        NaN          None                                               None None None None None None None None None None None None None
Show                      Anticipated percent reduction None None None       0.75          None              VMware Benchmark (assumes VCF w/ HCX) None None None None None None None None None None None None
Show                          10-Year Future State Cost None None None 1218750.00          None                                        Calculation None None None None None None None None None None None None
None                                               None None None None        NaN          None                                               None None None None None None None None None None None None None
None                                        Reskilling  None None None        NaN Return button                                               None None None None None None None None None None None None None
None                                               None None None None        NaN          None                                               None None None None None None None None None None None None None
None                                      Current State None None None        NaN          None                                               None None None None None None None None None None None None None
None Number of FTEs (Server, Storage, Network, Servi... None None None      20.00          None                                         From labor None None None None None None None None None None None None
None                     Annual Training Hours per year None None None      20.00          None                               Placeholder estimate None None None None None None None None None None None None
None                      Total Training Hours per year None None None     400.00          None                                        Calculation None None None None None None None None None None None None
None              Fully burdened IT labor cost per hour None None None      97.50          None Skillsoft 2024 IT Skills and Salary Report Benc... None None None None None None None None None None None None
None             One Time Current State Reskilling cost None None None   39000.00          None                                        Calculation None None None None None None None None None None None None
None                                       Future State None None None        NaN          None                                               None None None None None None None None None None None None None
None Number of FTEs (Server, Storage, Network, Servi... None None None      20.00          None                                         From labor None None None None None None None None None None None None
None   Average Training Hours for Reskilling (one time) None None None      80.00          None Calculation based on current-future state cover... None None None None None None None None None None None None
None                Total Training Hours for reskilling None None None    1600.00          None                                        Calculation None None None None None None None None None None None None
None              Fully burdened IT labor cost per hour None None None      97.50          None Skillsoft 2024 IT Skills and Salary Report Benc... None None None None None None None None None None None None
None              One Time Future State Reskilling cost None None None  156000.00          None                                        Calculation None None None None None None None None None None None None
None                                               None None None None        NaN          None                                               None None None None None None None None None None None None None

```


#### Formulas (35 total)


Key calculation formulas:

- **A4:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **B4:** `=IF('Initial Screens'!C13="VCF 9","Migration Efficiency (related to host refresh and migration to VCF 9)","Migration Efficiency (related to host refresh)")` → Result: `Migration Efficiency (related to host refresh and migration to VCF 9)`

- **A5:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **A6:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **A7:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **F7:** `=IF(C2="Yes",'Excel Output'!D22,0)` → Result: `5000`

- **H7:** `='Initial Screens'!$E$16` → Result: ``

- **A8:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **F8:** `=ROUND(100%,3)` → Result: `1`

- **A9:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **F9:** `=ROUND(1,1)` → Result: `1`

- **A10:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **F10:** `=ROUND(Benchmarks!$D$10,2)` → Result: `97.5`

- **H10:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"` → Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`

- **A11:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **B11:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"` → Result: `10-Year Current State Cost`

- **F11:** `=ROUND(F7*F8*F9*F10*AnalysisTerm,0)` → Result: `4875000`

- **A12:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **A13:** `=IF($C$2="Yes","Show","Hide")` → Result: `Show`

- **F13:** `=ROUND(75%,3)` → Result: `0.75`


... and 15 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** C2

  - Type: list

  - Formula1: "Yes, No"

  - Allow Blank: True, Show Dropdown: False


### Sheet: InvestmentBVA

**Dimensions:** 21 rows x 9 columns

**Total Cells with Content:** 38

**Formula Count:** 20

**Merged Cells:** 0

**Data Validations:** 1


#### Purpose & Structure



Multi-year investment breakdown:
- Subscription, licenses, maintenance
- Professional services, education, training
- Success360/TAM costs
- Organizational change management
- Year-by-year investment phasing
        


#### Key Data Points


First 30 rows of data:

```

   0                                                  1      2      3      4     5     6     7    8
None                                               None   None   None   None  None  None  None None
None                                               None   None   None   None  None  None  None None
None                                               None   None   None   None  None  None  None None
None                                               None   None   None   None  None  None  None None
None                                               None   None   None   None  None  None  None None
None                                               None   None   None   None #REF! #REF!  None None
None                         Multi-year Impact (likely)   None   None   None  None  None  None None
None                                               None   None   None   None  None  None  None None
None                              Estimated Investment  Year 1 Year 2 Year 3 #REF! #REF! Total None
None                                       Subscription   None   None   None  None  None     0 None
None                                           License    None   None   None  None  None     0 None
None                                  Maintenance (SnS)   None   None   None  None  None     0 None
None                              Professional Services   None   None   None  None  None     0 None
None                               Education / Training   None   None   None  None  None     0 None
None                                   Success360 / TAM   None   None   None  None  None     0 None
None                                              Other   None   None   None  None  None     0 None
None      Organizational Change Management (Consulting)   None   None   None  None  None     0 None
None        Organizational Change Management (Internal)   None   None   None  None  None     0 None
None                                       User Defined   None   None   None  None  None     0 None
None                                   Total Investment      0      0      0     0     0     0 None
None Note: All pricing herein is an estimation and n...   None   None   None  None  None  None None

```


#### Formulas (20 total)


Key calculation formulas:

- **F6:** `=IF(#REF!<=3,"hide column","show column")` → Result: `#REF!`

- **G6:** `=IF(#REF!<=4,"hide column","show column")` → Result: `#REF!`

- **F9:** `=IF(#REF!>3,"Year 4","")` → Result: `#REF!`

- **G9:** `=IF(#REF!>4,"Year 5","")` → Result: `#REF!`

- **H10:** `=SUM(C10:G10)` → Result: ``

- **H11:** `=SUM(C11:G11)` → Result: ``

- **H12:** `=SUM(C12:G12)` → Result: ``

- **H13:** `=SUM(C13:G13)` → Result: ``

- **H14:** `=SUM(C14:G14)` → Result: ``

- **H15:** `=SUM(C15:G15)` → Result: ``

- **H16:** `=SUM(C16:G16)` → Result: ``

- **H17:** `=SUM(C17:G17)` → Result: ``

- **H18:** `=SUM(C18:G18)` → Result: ``

- **H19:** `=SUM(C19:G19)` → Result: ``

- **C20:** `=SUM(C10:C19)` → Result: ``

- **D20:** `=SUM(D10:D19)` → Result: ``

- **E20:** `=SUM(E10:E19)` → Result: ``

- **F20:** `=SUM(F10:F19)` → Result: ``

- **G20:** `=SUM(G10:G19)` → Result: ``

- **H20:** `=SUM(H10:H19)` → Result: ``


#### Data Validations


- **Cells:** B19

  - Type: list

  - Formula1: "User Defined"

  - Allow Blank: True, Show Dropdown: False


### Sheet: Misc

**Dimensions:** 162 rows x 26 columns

**Total Cells with Content:** 912

**Formula Count:** 637

**Merged Cells:** 37

**Data Validations:** 0


#### Purpose & Structure



Internal calculation sheet containing:
- Accordion totals (rollup of all cost categories)
- CapEx vs OpEx allocation
- Year-by-year cost breakdown
- Hardware refresh cycle calculations
- Growth and inflation adjustments
        


#### Key Data Points


First 30 rows of data:

```

  0                                   1               2                3                                                4              5               6               7            8            9            10           11           12              13               14   15   16   17   18   19    20   21   22   23   24   25
None                                None            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                    Accordion Totals            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                                None            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                                None   Current State     Future State  Future State  for TCO Model (VCF at List Price)           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                             Compute        25000000          8937500                                          8937500           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                             Storage        11964285          2940000                                          2940000           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                             Network         2500000           893750                                           893750           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                            Software     2762815.625          8881408                                         10000000           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                          Facilities        24128000          7763470                                          7763470           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                               Labor  44760534.97175  23764409.306875                                  23764409.306875           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                             Support         1250000          1375000                                           750000           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                           Migration         4875000          1218750                                          1218750           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                 One-time Reskilling           39000           156000                                           156000           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None Sum of Annualized Business Benefits               0             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                                None            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                  CapEx v OpEx Calcs            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                                None            None             None                                            CapEx           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None         Ongoing current state (TCO)            None             None                                           Year 1         Year 2          Year 3               4 5.000000e+00 6.000000e+00 7.000000e+00 8.000000e+00 9.000000e+00              10            Total None None None None None  None None None None None None
None                             Compute            None             None                                          2618750    2724285.625  2835185.628438  2951790.103905 3.074464e+06 3.203599e+06 3.339615e+06 3.482964e+06 3.634132e+06  3793638.669954   31658424.28751 True True True True True  True True True True True True
None                             Storage            None             None                                        1196428.5  1244644.56855  1295311.461061  1348584.556117 1.404631e+06 1.463628e+06 1.525770e+06 1.591262e+06 1.660326e+06  1733199.970763  14463786.570948 True True True True True  True True True True True True
None                             Network            None             None                                           261875    272428.5625   283518.562844   295179.010391 3.074464e+05 3.203599e+05 3.339615e+05 3.482964e+05 3.634132e+05   379363.866995   3165842.428751 True True True True True False True True True True True
None                            Software            None             None                                                0              0               0               0 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00               0                0 True True True True True  True True True True True True
None                          Facilities            None             None                                                0              0               0               0 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00               0                0 True True True True True  True True True True True True
None                               Labor            None             None                                                0              0               0               0 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00               0                0 True True True True True  True True True True True True
None                             Support            None             None                                                0              0               0               0 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00               0                0 True True True True True  True True True True True True
None                           Migration            None             None                                         499687.5   540412.03125   584455.611797   632088.744158 6.836040e+05 7.393177e+05 7.995721e+05 8.647372e+05 9.352133e+05  1011433.186683   7290521.366847 True True True True True  True True True True True True
None                 One-time Reskilling            None             None                                                0              0               0               0 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00 0.000000e+00               0                0 True True True True True  True True True True True True
None                                None            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN     Total CapEx  56578574.654056 None None None None None  None None None None None None
None                                None            None             None                                             None           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None
None                                None            None             None                                             OpEx           None            None            None          NaN          NaN          NaN          NaN          NaN            None             None None None None None None  None None None None None None

```


#### Formulas (637 total)


Key calculation formulas:

- **C5:** `=Compute!F12+Compute!F76+Compute!F100` → Result: `25000000`

- **D5:** `=Compute!F24+Compute!F86+Compute!F112` → Result: `8937500`

- **E5:** `=Transition!D11` → Result: `8937500`

- **C6:** `=Storage!F21+Compute!F101` → Result: `11964285`

- **D6:** `=Storage!F34+Compute!F113` → Result: `2940000`

- **E6:** `=Transition!D12` → Result: `2940000`

- **C7:** `=Network!F11+Network!F29+Network!F51+Compute!F102` → Result: `2500000`

- **D7:** `=Network!F19+Network!F34+Network!F56+Compute!F114` → Result: `893750`

- **E7:** `=Transition!D13` → Result: `893750`

- **C8:** `=Software!F7+Software!F18+Software!F30` → Result: `2762815.625`

- **D8:** `=Software!F10+Software!F21+Software!F34+'ROI Results'!O37` → Result: `8881408`

- **E8:** `=Transition!D14` → Result: `10000000`

- **C9:** `=Facilities!F13` → Result: `24128000`

- **D9:** `=Facilities!F21` → Result: `7763470`

- **E9:** `=Transition!D15` → Result: `7763470`

- **C10:** `=Labor!F127` → Result: `44760534.97175`

- **D10:** `=Labor!F128` → Result: `23764409.306875`

- **E10:** `=Transition!D16` → Result: `23764409.306875`

- **C11:** `=Support!F7` → Result: `1250000`

- **D11:** `=Support!F10+'ROI Results'!O40` → Result: `1375000`


... and 617 more formulas (see JSON file for complete list)


### Sheet: Business impact

**Dimensions:** 146 rows x 19 columns

**Total Cells with Content:** 264

**Formula Count:** 109

**Merged Cells:** 4

**Data Validations:** 2


#### Purpose & Structure



Business value calculations:
- Revenue increase via velocity of innovation
- IT downtime reduction
- M&A integration efficiency
- Developer productivity gains
- Security breach risk reduction
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1                      2                      3    4                5             6                                                  7    8    9    10   11   12   13   14   15   16   17   18
None                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
None                                        Some Inputs                   None                   None None             None Return button                                               None None None None None None None None None None None None
None                                               None                   None                   None None For illustration          None                                               None None None None None None None None None None None None
None                                     Annual revenue                   None                   None None       1000000000          None                                          From 10-k None None None None None None None None None None None
Show                                   Operating margin                   None                   None None              0.1          None                                          From 10-k None None None None None None None None None None None
None                                Number of employees                   None                   None None             2500          None                                          From 10-k None None None None None None None None None None None
None                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
None            Average fully burdened IT cost per hour                   None                   None None             97.5          None Skillsoft 2024 IT Skills and Salary Report Benc... None None None None None None None None None None None
None                                               None to illustrate override default from table --> None             None          None                                               None None None None None None None None None None None None
hide                          Include Increased Revenue                   None                     No None             None          None              Don't use if Government or non-profit None None None None None None None None None None None
None                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
Hide       Increased Revenue via Velocity of innovation                   None                   None None             None          None                                               None None None None None None None None None None None None
None                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
Hide                                               None                   None                   None None             None          None                                Sourcing & Comments None None None None None None None None None None None
Hide                                     Annual revenue                   None                   None None       1000000000          None                                          From 10-k None None None None None None None None None None None
Hide Increase in revenue via accelerated innovation,...                   None                   None None                0          None                               Placeholder estimate None None None None None None None None None None None
Hide                      Estimated incremental revenue                   None                   None None                0          None                                        Calculation None None None None None None None None None None None
Hide                                   Operating margin                   None                   None None              0.1          None                                          From 10-k None None None None None None None None None None None
Hide                            Annual associated value                   None                   None None                0          None                                        Calculation None None None None None None None None None None None
None                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
hide                       Include Avoided Lost Revenue                   None                     No None             None          None              Don't use if Government or non-profit None None None None None None None None None None None
None                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
Hide Avoided lost Revenue via Improved Application P...                   None                   None None             None          None                                               None None None None None None None None None None None None
Hide                                               None                   None                   None None             None          None                                               None None None None None None None None None None None None
Hide                                               None                   None                   None None             None          None                                Sourcing & Comments None None None None None None None None None None None
Hide                                     Annual revenue                   None                   None None       1000000000          None                                          From 10-k None None None None None None None None None None None
Hide Anticipated percent annual revenue growth via s...                   None                   None None             0.05          None                               Placeholder Estimate None None None None None None None None None None None
Hide Estimated annual revenue based on new customer ...                   None                   None None         50000000          None                                        Calculation None None None None None None None None None None None
Hide Percent of annual revenue growth at risk due to...                   None                   None None              0.1          None                               Placeholder estimate None None None None None None None None None None None
Hide            Estimated annual growth revenue at risk                   None                   None None          5000000          None                                        Calculation None None None None None None None None None None None

```


#### Formulas (109 total)


Key calculation formulas:

- **B4:** `=IF('Initial Screens'!C8="Government and Non-Profit","Annual operating budget","Annual revenue")` → Result: `Annual revenue`

- **A5:** `=IF('Initial Screens'!C8="Government","Hide","Show")` → Result: `Show`

- **F8:** `=ROUND(Benchmarks!$D$10,2)` → Result: `97.5`

- **H8:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"` → Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`

- **A10:** `=IF('Initial Screens'!$C$8="Government","Show","hide")` → Result: `hide`

- **D10:** `=IF('Initial Screens'!$C$8="Government","No",IF(C10="","No",C10))` → Result: `No`

- **A12:** `=IF(AND($A$10="Show",$D$10="Yes"),"Show","Hide")` → Result: `Hide`

- **A14:** `=$A$12` → Result: `Hide`

- **A15:** `=$A$12` → Result: `Hide`

- **F15:** `=F4` → Result: `1000000000`

- **H15:** `=$H$4` → Result: `From 10-k`

- **A16:** `=$A$12` → Result: `Hide`

- **F16:** `=IF(D10="Yes",0.5%,0)` → Result: ``

- **A17:** `=$A$12` → Result: `Hide`

- **F17:** `=ROUND(F15*F16,0)` → Result: ``

- **A18:** `=$A$12` → Result: `Hide`

- **F18:** `=F5` → Result: `0.1`

- **H18:** `=$H$5` → Result: `From 10-k`

- **A19:** `=$A$12` → Result: `Hide`

- **F19:** `=ROUND(F17*F18,0)` → Result: ``


... and 89 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** C58 C70

  - Type: list

  - Formula1: "Yes, No"

  - Allow Blank: True, Show Dropdown: False

- **Cells:** F5

  - Type: decimal

  - Formula1: 0

  - Formula2: 0.99

  - Allow Blank: True, Show Dropdown: False


### Sheet: ROI Results

**Dimensions:** 117 rows x 32 columns

**Total Cells with Content:** 1013

**Formula Count:** 816

**Merged Cells:** 34

**Data Validations:** 1


#### Purpose & Structure



Primary output sheet with financial metrics:
- 10-Year NPV (Net Present Value)
- ROI percentage
- Payback period
- Monthly cost of delay
- Year-by-year benefit breakdown
- CapEx vs OpEx analysis
        


#### Key Data Points


First 30 rows of data:

```

  0                                                1    2    3               4               5               6                                7                        8                9                10               11               12              13        14   15                                                 16   17   18   19   20   21   22   23   24   25   26   27   28   29   30   31
None                                             None None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                       ROI Output None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                              2025-11-21 00:00:00 None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                             None None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                        Multi-year Impact Summary None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                             None None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                            Key Financial Metrics None None            None            None            None Weighted Average Cost of Capital                     0.09              (i)             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                  10-Year Net Present Value (NPV) None None        31216461            None            None            Average Annual Growth                     0.05              (i)             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None               10-Year Return on Investment (ROI) None None            9.75            None            None      Annual Inflation Adjustment                     0.03              (i)             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                          Payback None None       12 Months            None            None                             None Review Value Realization             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None Monthly cost of delayed customer buying decision None None      260137.175            None            None                             None    Review Sustainability             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                             None None None            None            None            None                      show column              show column             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                     Net Benefits None None          Year 1          Year 2          Year 3                           Year 4                   Year 5                6                7                8                9              10     Total None                                               None None None None None None None None None None None None None None None None
None                                   Gross Benefits None None  4145663.169065  5136305.776263  6130376.519542                   7258904.915477           8537413.954672  10144328.336846  11819983.494179  13571308.784821  15697158.687699  18086367.80171 100527811 None                                               None None None None None None None None None None None None None None None None
None                            Estimated Investment  None None         2750000         1650000         1650000                          1650000                  1650000                0                0                0                0               0   9350000 None                                               None None None None None None None None None None None None None None None None
None                                      Net Benefit None None         1395663         3486306         4480377                          5608905                  6887414         10144328         11819983             None             None            None  91177811 None                                               None None None None None None None None None None None None None None None None
None                                             None None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                         Multi-year Impact Detail None None            None            None            None                             None                     None             None             None             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                             None None None            None            None            None                      show column              show column      show column      show column             None             None            None      None None                                               None None None None None None None None None None None None None None None None
None                                   Gross Benefits None None          Year 1          Year 2          Year 3                           Year 4                   Year 5                6                7                8                9              10     Total None                                               None None None None None None None None None None None None None None None None
None                                          Compute None None     1870202.485  2114761.816618  2390410.408563                   2700700.839302           3049561.538548   3441334.552407   3880816.970707   4373306.362668   4924650.599223  5541302.475283  34287048 None                                               None None None None None None None None None None None None None None None None
None                                          Storage None None     959281.4955  1061769.397816  1176505.813488                   1304863.943107           1448361.184569    1608673.56779   1787651.586044   1987337.555723   2209984.648561  2458077.753666  16002507 None                                               None None None None None None None None None None None None None None None None
None                                          Network None None      187432.911   211751.636493   239155.348488                    269996.349046            304664.203621    343589.484798    387247.879042    436164.690777    490919.781277   552152.983361   3423075 None                                               None None None None None None None None None None None None None None None None
None                                         Software None None        361859.2        386859.2        413109.2                         440671.7               469612.325     499999.98125    531907.020312    565409.411328    600586.921895   637523.307989   4907538 None                                               None None None None None None None None None None None None None None None None
None                                       Facilities None None     168911.1645   365354.848813   592696.903488                    854668.934829           1155405.566272   1574459.611104    1986574.41431   2455405.976087   2987461.758531  3589933.213168  15730872 None                                               None None None None None None None None None None None None None None None None
None                                            Labor None None   215210.288065   465499.853085   755157.136666                   1088936.591073           1472106.154057   2006024.335072   2531101.204776   3128441.089104   3806335.167599  4573946.093065  20042758 None                                               None None None None None None None None None None None None None None None None
None                                          Support None None          125000          125000          125000                           125000                   125000           125000           125000           -12500           -12500          -12500    837500 None                                               None None None None None None None None None None None None None None None None
None                                        Migration None None      374765.625   405309.023438   438341.708848                    474066.558119            512702.982605    545246.804426    589684.418987    637743.699134    689719.810614   745931.975179   5413513 None                                               None None None None None None None None None None None None None None None None
None                              One-time Reskilling None None         -117000               0               0                                0                        0                0                0                0                0               0   -117000 None                                               None None None None None None None None None None None None None None None None
None                                   Revenue Impact None None               0               0               0                                0                        0                0                0                0                0               0         0 None <-- growth and inflation NOT applied to revenue... None None None None None None None None None None None None None None None

```


#### Formulas (816 total)


Key calculation formulas:

- **B3:** `=TODAY()` → Result: `2025-11-21 00:00:00`

- **B8:** `=AnalysisTerm&"-Year Net Present Value (NPV)"` → Result: `10-Year Net Present Value (NPV)`

- **E8:** `=ROUND(NPV(I7,F47:K47)+E47,0)` → Result: `31216461`

- **I8:** `=5%` → Result: `0.05`

- **B9:** `=AnalysisTerm&"-Year Return on Investment (ROI)"` → Result: `10-Year Return on Investment (ROI)`

- **E9:** `=ROUND(O47/O46,2)` → Result: `9.75`

- **I9:** `=3%` → Result: `0.03`

- **E10:** `=ROUND(O115,0)&" Months"` → Result: `12 Months`

- **E11:** `=E8/(AnalysisTerm*12)` → Result: `260137.175`

- **H12:** `=IF(AnalysisTerm<=3,"hide column","show column")` → Result: `show column`

- **I12:** `=IF(AnalysisTerm<=4,"hide column","show column")` → Result: `show column`

- **H13:** `=IF(AnalysisTerm>3,"Year 4","")` → Result: `Year 4`

- **I13:** `=IF(AnalysisTerm>4,"Year 5","")` → Result: `Year 5`

- **J13:** `=IF(AnalysisTerm>5,6,"")` → Result: `6`

- **K13:** `=IF(AnalysisTerm>6,7,"")` → Result: `7`

- **L13:** `=IF(AnalysisTerm>7,8,"")` → Result: `8`

- **M13:** `=IF(AnalysisTerm>7,9,"")` → Result: `9`

- **N13:** `=IF(AnalysisTerm>7,10,"")` → Result: `10`

- **E14:** `=SUM(E$21:E$31)` → Result: `4145663.169064967`

- **F14:** `=SUM(F$21:F$31)` → Result: `5136305.7762625255`


... and 796 more formulas (see JSON file for complete list)


#### Data Validations


- **Cells:** E53

  - Type: list

  - Formula1: "1,3,5,7"

  - Allow Blank: True, Show Dropdown: False


### Sheet: Sustainability

**Dimensions:** 50 rows x 24 columns

**Total Cells with Content:** 169

**Formula Count:** 88

**Merged Cells:** 0

**Data Validations:** 0


#### Purpose & Structure



Environmental impact calculations:
- Power consumption reduction (MWh)
- CO2 emissions avoided (Metric Tons)
- Equivalent motor vehicles off road
- Urban trees planted equivalent
- EPA greenhouse gas conversion factors
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1          2    3    4    5    6    7    8    9    10   11   12                                                 13   14   15   16   17   18   19   20   21   22   23
None                                               None       None None None None None None None None None None None                                               None None None None None None None None None None None
None     Projected Sustainability Benefit Over 10 Years       None None None None None None None None None None None                                               None None None None None None None None None None None
None                 Reduced Power Consumption (in MWh)  17787.484 None None None None None None None None None None                                               None None None None None None None None None None None
None                 CO2 emission avoided (Metric Tons)       9819 None None None None None None None None None None                                               None None None None None None None None None None None
None                           Motor Vehicles off Road        2116 None None None None None None None None None None                                               None None None None None None None None None None None
None     Urban Planted Trees (allowed to grow 10 years)     163650 None None None None None None None None None None                                               None None None None None None None None None None None
None                                               None       None None None None None None None None None None None                                               None None None None None None None None None None None
None                        Green House Gas Assumptions       None None None None None None None None None None None                                               None None None None None None None None None None None
None            Carbon Emission from Datacenter Servers       None None None None None None None None None None None                              Sourcing and Comments None None None None None None None None None None
None Marginal Operating Emissions Rate (MOER in CO2 ...    1217.44 None None None      None None None None None None Represents the emissions rate of the electricit... None None None None None None None None None None
None                              Metric tons per pound     2204.6 None None None None None None None None None None                     Ratio of metric tons per pound None None None None None None None None None None
None                                     CO2 MT per MWh      0.552 None None None None None None None None None None Calculation, https://www.epa.gov/energy/greenho... None None None None None None None None None None
None         Carbon Emission from gasoline powered cars       None None None None None None None None None None None                                               None None None None None None None None None None None
None         CO2 emissions ratio for passenger vehicles      0.994 None None None      None None None None None None CO2 emissions to total greenhouse gas emissions... None None None None None None None None None None
None      Average motor vehicle miles traveled per year      11520 None None None None None None None None None None                Placeholder estimate from FHWA 2020 None None None None None None None None None None
None Carbon dioxide emitted per gallon of motor gaso...    0.00889 None None None None None None None None None None                Placeholder estimate from FHWA 2020 None None None None None None None None None None
None      Number of Miles per Gallon for motor vehicles       22.2 None None None None None None None None None None                Placeholder estimate from FHWA 2020 None None None None None None None None None None
None     Metric Ton CO2 Equivalent per Vehicle per year      4.641 None None None      None None None None None None Calculation, https://www.epa.gov/energy/greenho... None None None None None None None None None None
None Carbon Sequestered by Urban Planted Trees allow...       None None None None None None None None None None None                                               None None None None None None None None None None None
None           Carbon Sequestered per tree (lbs C/tree)       36.4 None None None None None None None None None None https://www.epa.gov/energy/greenhouse-gases-equ... None None None None None None None None None None
None Carbon Dioxide (CO2) Sequestered per tree (MT p...    0.00166 None None None None None None None None None None Calculation, Ratio of the molecular weight of c... None None None None None None None None None None
None              Metric Ton CO2 per Urban Planted Tree       0.06 None None None      None None None None None None Calculation, https://www.epa.gov/energy/greenho... None None None None None None None None None None
None                                               None       None None None None None None None None None None None                                               None None None None None None None None None None None
None                       Power & Cooling Requirements       None None None None None None None None None None None                                               None None None None None None None None None None None
None       Power Consumption by Hardware Component Type     Annual None None None None None None None None None None                              Sourcing and Comments None None None None None None None None None None
None                                Physical Host (kWh)      12584 None None None None None None None None None None                                     From Facilites None None None None None None None None None None
None                            Physical legacy servers       5808 None None None None None None None None None None                                     From Facilites None None None None None None None None None None
None                                Load balancer (kWh)       5808 None None None None None None None None None None                                     From Facilites None None None None None None None None None None
None                                     Firewall (kWh)       5808 None None None None None None None None None None                                     From Facilites None None None None None None None None None None
None                                               None       None None None None None None None None None None None                                               None None None None None None None None None None None

```


#### Formulas (88 total)


Key calculation formulas:

- **B2:** `="Projected Sustainability Benefit Over "&AnalysisTerm&" Years"` → Result: `Projected Sustainability Benefit Over 10 Years`

- **C3:** `=C50` → Result: `17787.484`

- **C4:** `=ROUND(C3*C12,0)` → Result: `9819`

- **C5:** `=ROUNDUP(C4/C18,0)` → Result: `2116`

- **C6:** `=ROUNDUP(C4/C22,0)` → Result: `163650`

- **C10:** `=ROUND(1217.44,2)` → Result: `1217.44`

- **C11:** `=ROUND(2204.6,2)` → Result: `2204.6`

- **C12:** `=ROUND(C10/C11,3)` → Result: `0.552`

- **C14:** `=ROUND(0.994,3)` → Result: `0.994`

- **C15:** `=ROUND(11520,0)` → Result: `11520`

- **C16:** `=ROUND(0.00889,5)` → Result: `0.00889`

- **C17:** `=ROUND(22.2,2)` → Result: `22.2`

- **C18:** `=ROUND(C16*C15/(C14*C17),3)` → Result: `4.641`

- **C20:** `=ROUND(36.4,2)` → Result: `36.4`

- **C21:** `=ROUND((44/12)*1/C11,5)` → Result: `0.00166`

- **C22:** `=ROUND(C20*C21,3)` → Result: `0.06`

- **C26:** `=Facilities!F32` → Result: `12584`

- **C27:** `=Facilities!F33` → Result: `5808`

- **C28:** `=Facilities!F35` → Result: `5808`

- **C29:** `=Facilities!F34` → Result: `5808`


... and 68 more formulas (see JSON file for complete list)


### Sheet: Transition

**Dimensions:** 44 rows x 13 columns

**Total Cells with Content:** 84

**Formula Count:** 47

**Merged Cells:** 5

**Data Validations:** 0


#### Purpose & Structure



Bridge between Value Model and Competitive TCO:
- Side-by-side comparison of both models
- TCO reconciliation
- Cost category mapping
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1                           2                                                  3                                                  4    5    6    7    8    9    10   11   12
None                                               None                        None                                               None                                               None None None None None None None None None
None Transition from Value Model to Competitive TCO ...                        None                                               None                                               None None None None None None None None None
None When you choose to use both a value model and a...                        None                                               None                                               None None None None None None None None None
None You have to consider the results of the two mod...                        None                                               None                                               None None None None None None None None None
None                                        Value Model                        None                         Competitive TCO Comparison                                               None None None None None None None None None
None The Value Model looks at actual costs and the v...                        None The Competitive TCO Comparison model compares a...                                               None None None None None None None None None
None The TCO shown on the next screen will be slight...                        None                                               None <-- If "VVF" or "VVF with vSAN", replace "VCF" ... None None None None None None None None
None                         VCF 9 TCO Results Overview                        None                                               None                                               None None None None None None None None None
None                                               None                        None                                               None                                               None None None None None None None None None
None                                        Value Model             Cost Categories                         Competitive TCO Comparison                                               None None None None None None None None None
None                                    27627723.825432                     Compute                                            8937500                                               None None None None None None None None None
None                                     9458613.262583                     Storage                                            2940000                                               None None None None None None None None None
None                                     2743020.290772                     Network                                             893750                                               None None None None None None None None None
None                                          8881408.0                    Software                                           10000000                                               None None None None None None None None None
None                                     21605404.60853                  Facilities                                            7763470                                               None None None None None None None None None
None                                     48893378.51125                       Labor                                    23764409.306875                                               None None None None None None None None None
None                                             750000                     Support                                             750000                                               None None None None None None None None None
None                                     1877008.760497                   Migration                                            1218750                                               None None None None None None None None None
None                                             156000                  Reskilling                                             156000                                               None None None None None None None None None
None                                   121992557.259063           10 Year Total TCO                                    56423879.306875                                               None None None None None None None None None
None                                               None                        None                                               None                                               None None None None None None None None None
None Summary of Key Value Model Data Points Also Pas...                        None                                               None                                               None None None None None None None None None
None                                               None                        None                                               None                                               None None None None None None None None None
None                                      Current State                      Metric                             VCF 9 End Future State                                             Update None None None None None None None None
None                                               5000               Number of VMs                                               4500                                               None None None None None None None None None
None                                                400             Number of Hosts                                                143                                               None None None None None None None None None
None                                               12.5                   VMs/Hosts                                          31.468531                                               None None None None None None None None None
None                                              25000 Average host (compute) cost                                              25000                                               None None None None None None None None None
None                                            1500000   Total Usable Storage (GB)                                            1350000                                               None None None None None None None None None
None                                            2142857            Raw Storage (GB)                                            1200000                                               None None None None None None None None None

```


#### Formulas (47 total)


Key calculation formulas:

- **B6:** `="The Value Model looks at actual costs and the value of "&'Initial Screens'!C13&" in the customers environment ramping over time taking into account adoption timeframes and investments."` → Result: `The Value Model looks at actual costs and the value of VCF 9 in the customers environment ramping over time taking into account adoption timeframes and investments.`

- **B8:** `='Initial Screens'!C13&" TCO Results Overview"` → Result: `VCF 9 TCO Results Overview`

- **B11:** `='ROI Results'!O85` → Result: `27627723.82543159`

- **D11:** `=Compute!F24+Compute!F86+Compute!F108*(1+AnalysisTerm*Compute!F111)` → Result: `8937500`

- **B12:** `='ROI Results'!O86` → Result: `9458613.26258312`

- **D12:** `=Storage!F34+Compute!F109*(1+AnalysisTerm*Compute!F111)` → Result: `2940000`

- **B13:** `='ROI Results'!O87` → Result: `2743020.2907715766`

- **D13:** `=Network!F19+Network!F34+Network!F56+Compute!F110*(1+AnalysisTerm*Compute!F111)` → Result: `893750`

- **B14:** `='ROI Results'!O88` → Result: `8881408.000000002`

- **D14:** `=Software!F21+'ROI Results'!O37/(1-'ROI Results'!F34)` → Result: `10000000`

- **B15:** `='ROI Results'!O89` → Result: `21605404.60853014`

- **D15:** `=Facilities!F21` → Result: `7763470`

- **B16:** `='ROI Results'!O90` → Result: `48893378.51124972`

- **D16:** `=Labor!F128` → Result: `23764409.306875`

- **B17:** `='ROI Results'!O40` → Result: `750000`

- **D17:** `='ROI Results'!O40` → Result: `750000`

- **B18:** `='ROI Results'!O92` → Result: `1877008.7604972676`

- **D18:** `='Migration - Reskilling'!F14` → Result: `1218750`

- **B19:** `='ROI Results'!O93` → Result: `156000`

- **D19:** `='Migration - Reskilling'!F29` → Result: `156000`


... and 27 more formulas (see JSON file for complete list)


### Sheet: Benchmarks

**Dimensions:** 91 rows x 17 columns

**Total Cells with Content:** 383

**Formula Count:** 26

**Merged Cells:** 0

**Data Validations:** 0


#### Purpose & Structure



Reference data and lookup tables:
- Regional IT salary benchmarks
- Industry-specific data
- Skillsoft 2024 IT Skills & Salary Report data
- FTE cost calculations by region (AMER, EMEA, LATAM, APAC)
        


#### Key Data Points


First 30 rows of data:

```

  0                                                  1        2              3    4                                             5                                            6    7                            8                                                 9                10   11                       12   13              14                                        15                    16
None                                               None     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                       For MediaFly, not part of UI     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               None     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None               IT Employee Costs by Region and Role     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None              Fully burdened IT labor cost per hour     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               AMER     None      97.496303 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               EMEA     None      52.618775 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                              LATAM     None      46.283022 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               APAC     None      45.240684 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               None Selected      97.496303 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None Average annual fully burdened cost per IT Infra...     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               AMER     None  175032.711861 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               EMEA     None   83534.049805 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                              LATAM     None   83090.769176 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               APAC     None   81219.485136 None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None                                               None Selected  175032.711861 None                                          None                                         None None For Broadcom, not part of UI                                              None             None None                     None  NaN            None                                      None                  None
None                                               None     None           None None                                          None                                         None None                         None                                              None             None None                     None  NaN            None                                      None                  None
None Average Annual Salary per IT employee by Indust...     None           None None                                        Source                                         None None                         None                                               VVM Closest PCMO fit None                     PCMO  NaN Closest VVM fit                    2024 Skillsoft Mapping   2024 Cost of Breach
None                              Aerospace and Defense     None         117402 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                            1                    Banking and Financial Services            3 & 8 None    Aerospace and Defense  1.0            None                     Aerospace and Defense        Transportation
None                           Automotive and Transport     None         103121 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                            2                                         Education                7 None Automotive and Transport  2.0              16                                Automotive        Transportation
None                                            Banking     None         126409 None From Skillsoft 2024 IT Skills & Salary Report from Natural Resources: Mining, Oil, and Gas None                            3                                            Energy             None None                  Banking  3.0               1 Accounting, Auditing, Banking and Finance             Financial
None                                  Business Services     None         123646 None From Skillsoft 2024 IT Skills & Salary Report          from Gov: Non-defense, state, local None                            4                         Government and Non-Profit                9 None        Business Services  4.0            None            Professional Business Services Professional Services
None                                  Computer Services     None         117145 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                            5                                 Healthcare Payers       13 (or 10) None        Computer Services  5.0               8                             IT Consulting            Technology
None                                  Consumer Services     None         106402 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                            6                              Healthcare Providers               10 None        Consumer Services  6.0              7?        Hospitality, Travel and Recreation           Hospitality
None                                          Education     None          81492 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                            7                              Hospitality & Travel               6? None                Education  7.0               2                        Education Services             Education
None                                 Financial Services     None         126409 None From Skillsoft 2024 IT Skills & Salary Report                           from IT Consulting None                            8                            Information Technology                5 None       Financial Services  8.0               1 Accounting, Auditing, Banking and Finance             Financial
None                                         Government     None         105305 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                            9                                         Insurance               13 None               Government  9.0               4      Government: Nondefense, State, Local                Public
None                                        Health Care     None         100339 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                           10                                     Manufacturing               12 None              Health Care 10.0               6                                Healthcare            Healthcare
None                                          High Tech     None         139887 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                           11                         Manufacturing - High Tech               11 None                High Tech 11.0              11                               IT Software            Technology
None                           Industrial Manufacturing     None         109381 None From Skillsoft 2024 IT Skills & Salary Report                                         None None                           12 Pharmaceuticals, Life Sciences & Medical Products               15 None Industrial Manufacturing 12.0              10    Manufacturing: Consumer and Industrial            Industrial

```


#### Formulas (26 total)


Key calculation formulas:

- **D6:** `=D38/1880*(1+D41)` → Result: `97.49630319148935`

- **D7:** `=D6/(1+D$41)*D$60*(1+D$42)` → Result: `52.61877489819894`

- **D8:** `=D6/(1+D$41)*D$61*(1+D$43)` → Result: `46.2830218296959`

- **D9:** `=D6/(1+D$41)*D$62*(1+D$44)` → Result: `45.2406836622334`

- **D10:** `=OFFSET(D5,MATCH('Initial Screens'!$C$9,Benchmarks!B6:B9,0),0)` → Result: `97.49630319148935`

- **D12:** `=D$6*D48*1880` → Result: `175032.71186059655`

- **D13:** `=D$7*D51*1880` → Result: `83534.04980523096`

- **D14:** `=D12/(1+D$41)*D$61*(1+D$43)` → Result: `83090.76917556416`

- **D15:** `=D12/(1+D$41)*D$62*(1+D$44)` → Result: `81219.48513550744`

- **D16:** `=OFFSET(D11,MATCH('Initial Screens'!$C$9,Benchmarks!B12:B15,0),0)` → Result: `175032.71186059655`

- **P19:** `=M19` → Result: `Aerospace and Defense`

- **D38:** `=OFFSET(D18,MATCH('Initial Screens'!C8,Benchmarks!B19:B37,0),0)` → Result: `126409`

- **D45:** `=OFFSET(D40,MATCH('Initial Screens'!C9,Benchmarks!B41:B44,0),0)` → Result: `0.45`

- **D48:** `=108109/D37` → Result: `0.9549337078552438`

- **D51:** `=59850/70876` → Result: `0.8444325300524861`

- **D54:** `=48879/57724` → Result: `0.8467708405515904`

- **D57:** `=44707/63477` → Result: `0.7043023457315248`

- **D60:** `=70876/D37` → Result: `0.6260522387400518`

- **D61:** `=57724/D37` → Result: `0.5098797819999823`

- **D62:** `=63477/D37` → Result: `0.5606963987598378`


... and 6 more formulas (see JSON file for complete list)


## Complete Formula Reference


Below is every formula in the model, organized by sheet. Use this to implement 
calculation logic in the web application.



### Initial Screens Formulas (6)

**A22:** `=IF(ISNUMBER(SEARCH("VCF",$C$13)),"Show","Hide")`

  Result: `Show`



**D22:** `=IF(A22="Show",100%,0)`

  Result: `1`



**A23:** `=$A$22`

  Result: `Show`



**A24:** `=IF($C$13="VVF","Hide","Show")`

  Result: `Show`



**A27:** `=$A$22`

  Result: `Show`



**E28:** `=IF(D28="Yes","","Must include DSM for any Public Native Cloud comparison")`

  Result: `Must include DSM for any Public Native Cloud comparison`




### Excel Output Formulas (59)

**C4:** `='Initial Screens'!C7`

  Result: `Acme Company`



**C5:** `=NOW()`

  Result: `2025-11-21 19:09:23.670000`



**C6:** `=AnalysisTerm&"-Year Term"`

  Result: `10-Year Term`



**B20:** `='Initial Screens'!B14`

  Result: `Term of analysis`



**D20:** `=AnalysisTerm`

  Result: `10`



**B22:** `='Initial Screens'!B16`

  Result: `Number of VMs`



**D22:** `='Initial Screens'!C16`

  Result: `5000`



**B23:** `='Initial Screens'!B17`

  Result: `Number of VM Hosts`



**D23:** `='Initial Screens'!C17`

  Result: `400`



**B24:** `='Initial Screens'!B18`

  Result: `Average allocated/provisioned storage (GBs) per VM`



**D24:** `='Initial Screens'!C18`

  Result: `300`



**B26:** `='Initial Screens'!B20`

  Result: `Component Usage`



**D26:** `='Initial Screens'!C20`

  Result: `Current State`



**E26:** `='Initial Screens'!D20`

  Result: `Future State`



**B27:** `='Initial Screens'!B21`

  Result: `% of Operations coverage`



**D27:** `='Initial Screens'!C21`

  Result: ``



**E27:** `='Initial Screens'!D21`

  Result: `1`



**A28:** `='Initial Screens'!$A$22`

  Result: `Show`



**B28:** `='Initial Screens'!B22`

  Result: `% of Automation coverage`



**D28:** `='Initial Screens'!C22`

  Result: ``



**E28:** `=IF(A28="Hide",D28,'Initial Screens'!D22)`

  Result: `1`



**A29:** `='Initial Screens'!$A$22`

  Result: `Show`



**B29:** `='Initial Screens'!B23`

  Result: `% Of NSX coverage`



**D29:** `='Initial Screens'!C23`

  Result: ``



**E29:** `=IF(A29="Hide",D29,'Initial Screens'!D23)`

  Result: `1`



**A30:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**B30:** `='Initial Screens'!B24`

  Result: `% of vSAN Coverage`



**D30:** `='Initial Screens'!C24`

  Result: ``



**E30:** `=IF(A30="Hide",D30,'Initial Screens'!D24)`

  Result: `1`



**C35:** `="vSphere"&IF('Excel Output'!D27>0,", VCF Operations","")&IF('Excel Output'!D28>0,", VCF Automation","")&IF('Excel Output'!D29>0,", NSX","")&IF('Excel Output'!D30>0,", vSAN","")`

  Result: `vSphere`



**F35:** `=IF('Initial Screens'!C13="VCF","VMware Cloud Foundation"&IF('Initial Screens'!D26="Yes",", Avi Load Balancer","")&IF('Initial Screens'!D27="yes",", vDefend Firewall","")&IF('Initial Screens'!D28="yes",", Data Services Manager","")&IF('Initial Screens'!D29="yes",", VMware Live Recovery",""),IF('Initial Screens'!C13="VVF","VMware vSphere Foundation","VMware vSphere Foundation, vSAN"))`

  Result: `VMware vSphere Foundation, vSAN`



**C36:** `=FIXED(Compute!D40,0)&" CPUs, "&FIXED(Compute!D41,0)&" Cores, "&FIXED(Compute!D42,0)&" GB RAM per Host"`

  Result: `2 CPUs, 36 Cores, 768 GB RAM per Host`



**F36:** `=FIXED(Compute!F40,0)&" CPUs, "&FIXED(Compute!F41,0)&" Cores, "&FIXED(Compute!F42,0)&" GB RAM per Host"`

  Result: `2 CPUs, 48 Cores, 1,024 GB RAM per Host`



**B39:** `='Initial Screens'!C14&" Year Total TCO"`

  Result: `10 Year Total TCO`



**C39:** `=SUM(C45:C53)`

  Result: `214682868.69933724`



**E39:** `=B39`

  Result: `10 Year Total TCO`



**F39:** `=SUM(F45:F53)`

  Result: `122617557.25906342`



**F40:** `=C39-F39`

  Result: `92065311.44027382`



**F41:** `=F40/C39`

  Result: `0.4288433073307355`



**F42:** `='ROI Results'!E9`

  Result: `9.75`



**E44:** `=FIXED(D20,0)&"-Year VCF Migration and Adoption Future State"`

  Result: `10-Year VCF Migration and Adoption Future State`



**C45:** `='ROI Results'!O71`

  Result: `61914771.87375067`



**F45:** `='ROI Results'!O85`

  Result: `27627723.82543159`



**C46:** `='ROI Results'!O72`

  Result: `25461120.208846748`



**F46:** `='ROI Results'!O86`

  Result: `9458613.26258312`



**C47:** `='ROI Results'!O73`

  Result: `6166095.558675885`



**F47:** `='ROI Results'!O87`

  Result: `2743020.2907715766`



**C48:** `='ROI Results'!O74`

  Result: `6288946.267774414`



**F48:** `='ROI Results'!O88`

  Result: `8881408.000000002`



**C49:** `='ROI Results'!O75`

  Result: `37336276.9996317`



**F49:** `='ROI Results'!O89`

  Result: `21605404.60853014`



**C50:** `='ROI Results'!O76`

  Result: `68936136.4238105`



**F50:** `='ROI Results'!O90`

  Result: `48893378.51124972`



**C51:** `='ROI Results'!O77`

  Result: `1250000`



**F51:** `='ROI Results'!O91`

  Result: `1375000`



**C52:** `='ROI Results'!O78`

  Result: `7290521.366847323`



**F52:** `='ROI Results'!O92`

  Result: `1877008.7604972676`



**C53:** `='ROI Results'!O79`

  Result: `39000`



**F53:** `='ROI Results'!O93`

  Result: `156000`




### Compute Formulas (191)

**F5:** `='Excel Output'!D22`

  Result: `5000`



**F6:** `='Excel Output'!$D$23`

  Result: `400`



**F7:** `=F5/F6`

  Result: `12.5`



**A8:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F8:** `=IF('Initial Screens'!C13="VVF",0,'Excel Output'!D30)`

  Result: ``



**A9:** `=IF($F$8=100%,"Hide","Show")`

  Result: `Show`



**F9:** `=IF(F8=1,0,25000)`

  Result: `25000`



**A10:** `=IF($F$8=0,"Hide","Show")`

  Result: `Hide`



**F10:** `=IF(F8>0,35000,0)`

  Result: ``



**B12:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F12:** `=(ROUND(F6*(1-F8),0)*F9+ROUND(F6*F8,0)*F10)*(1+AnalysisTerm*F11)`

  Result: `25000000`



**F14:** `=IF('Excel Output'!E28>'Excel Output'!D28,10%,5%)`

  Result: `0.1`



**F15:** `=ROUND(F$5*(1-F$14),0)`

  Result: `4500`



**A16:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F16:** `='Excel Output'!E30`

  Result: `1`



**B17:** `=IF('Initial Screens'!$C$13="VVF","Number of VM Hosts","Number of VM Hosts (vSAN Ready Nodes and ESXi Hosts)")`

  Result: `Number of VM Hosts (vSAN Ready Nodes and ESXi Hosts)`



**F17:** `=F46`

  Result: `143`



**F18:** `=F15/F17`

  Result: `31.46853146853147`



**A19:** `=IF($F$16=0%,"Hide","Show")`

  Result: `Show`



**F19:** `=ROUND(F16*F17,0)`

  Result: `143`



**A20:** `=IF($F$16=100%,"Hide","Show")`

  Result: `Hide`



**F20:** `=ROUND(F17*(1-F16),0)`

  Result: ``



**A21:** `=IF($F$16=0%,"Hide","Show")`

  Result: `Show`



**F21:** `=IF(F16=0,0,C65)`

  Result: `25000`



**A22:** `=IF($F$16=100%,"Hide","Show")`

  Result: `Hide`



**F22:** `=IF(F16=1,0,F9)`

  Result: ``



**B24:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F24:** `=ROUND(F19*F21+F20*F22,0)*(1+AnalysisTerm*F23)`

  Result: `8937500`



**A28:** `=IF('Initial Screens'!C13="VCF 9","Show","hide")`

  Result: `Show`



**D28:** `=IF(A28="show","Yes","No")`

  Result: `Yes`



**A29:** `=IF(D28="No","hide","show")`

  Result: `show`



**D29:** `=IF(D28="Yes",20%,0%)`

  Result: `0.2`



**A30:** `=$A$29`

  Result: `show`



**D30:** `=IF(D28="Yes",5%,0%)`

  Result: `0.05`



**G30:** `=(50%-D43)/(2+IF('Excel Output'!E27=0,2,0)+IF('Excel Output'!E29=0,2,0))*SUM(Misc!E136,Misc!E138)/2`

  Result: `0.15`



**G31:** `=G30*(1+D29)`

  Result: `0.18`



**D33:** `=F5`

  Result: `5000`



**F33:** `=F15`

  Result: `4500`



**H33:** `=H5`

  Result: ``



**D34:** `='Excel Output'!D24`

  Result: `300`



**F34:** `=D34`

  Result: `300`



**H34:** `='Initial Screens'!$E$18`

  Result: ``



**F35:** `=D35`

  Result: `2`



**F36:** `=D36`

  Result: `4`



**F37:** `=D37`

  Result: `4`



**D39:** `=F6`

  Result: `400`



**H39:** `='Initial Screens'!$E$17`

  Result: ``



**D40:** `=ROUND(2,0)`

  Result: `2`



**G40:** `=48-F41`

  Result: ``



**F41:** `=IF('Initial Screens'!$C$13="VCF",MAX(48,D41),D41)+12`

  Result: `48`



**D42:** `=ROUND(768,0)`

  Result: `768`



**F42:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MAX(1024,D42),D42)`

  Result: `1024`



**F43:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),D43+(50%-D43)/(2+IF('Excel Output'!E27=0,2,0)+IF('Excel Output'!E29=0,2,0))*SUM(Misc!E136,Misc!E138)/2*(1+D29),D43+1%)`

  Result: `0.38`



**F44:** `=D44*D42*D39*(1-F14)/F17/F42*(1+D30)`

  Result: `0.6938811188811188`



**G44:** `=IF(F44>80%,"Decrease CPU Utilization","")`

  Result: ``



**F46:** `=ROUNDUP(F33/(D33/D39*F41/D41*F43/D43),0)`

  Result: `143`



**F47:** `=(D39-F46)/D39`

  Result: `0.6425`



**A49:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A50:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A51:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A52:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A53:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C53:** `=F40`

  Result: `2`



**D53:** `=F40`

  Result: `2`



**A54:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C54:** `=F42`

  Result: `1024`



**D54:** `=ROUND(C54/64,0)`

  Result: `16`



**A55:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**E55:** `=FIXED(C55,0)&" GB Disk"`

  Result: `2,000 GB Disk`



**F55:** `=ROUND(C55*0.3,0)`

  Result: `600`



**A56:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A57:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A58:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A59:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**D59:** `=ROUND(1,0)`

  Result: `1`



**A60:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**D60:** `=ROUND(1,0)`

  Result: `1`



**A61:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**D61:** `=ROUND(0,0)`

  Result: ``



**A62:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A63:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C63:** `=SUMPRODUCT(D53:D55,F53:F55)+SUMPRODUCT(D59:D61,F59:F61)`

  Result: `25000`



**A64:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A65:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C65:** `=ROUNDUP(C63*(1-C64),0)`

  Result: `25000`



**D68:** `=IF(C68="",IF('Initial Screens'!C13="VCF","No","Yes"),C68)`

  Result: `Yes`



**B76:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F76:** `=IF(D68="Yes",F73*F74*(1+AnalysisTerm*F75),0)`

  Result: ``



**F78:** `=F73`

  Result: ``



**F79:** `=F18`

  Result: `31.46853146853147`



**A80:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F80:** `=F16`

  Result: `1`



**A81:** `=IF(OR($F$80=0%,'Initial Screens'!$C$13="VVF"),"Hide","Show")`

  Result: `Show`



**F81:** `=ROUND(F78/F79*F80,0)`

  Result: ``



**F82:** `=ROUND(F78/F79-F81,0)`

  Result: ``



**A83:** `=IF(OR($F$80=0%,'Initial Screens'!$C$13="VVF"),"Hide","Show")`

  Result: `Show`



**F83:** `=F21`

  Result: `25000`



**F84:** `=F22`

  Result: ``



**B86:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F86:** `=IF(D68="Yes",(F81*F83+F82*F84)*(1+AnalysisTerm*F85),0)`

  Result: ``



**A89:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A90:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A91:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F91:** `=(ROUND(F6*(1-F8),0)*F9+ROUND(F6*F8,0)*F10)`

  Result: `10000000`



**A92:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F92:** `=ROUND(Storage!F11*Storage!F12*Storage!F14+Storage!F11*(1-Storage!F12)*Storage!F13+Storage!F19,0)`

  Result: `4785714`



**A93:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F93:** `=ROUND(Network!F5*Network!F6*Network!F8,0)`

  Result: `1000000`



**A94:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F94:** `=IF('Initial Screens'!$D$29="Yes",80%,0)`

  Result: ``



**A95:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F95:** `=ROUND(50%,3)`

  Result: `0.5`



**A96:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F96:** `=F91*$F$94*$F$95`

  Result: ``



**A97:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F97:** `=F92*$F$94*$F$95`

  Result: ``



**A98:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F98:** `=F93*$F$94*$F$95`

  Result: ``



**A99:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A100:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B100:** `=AnalysisTerm&"-Year Current State Cost - Compute"`

  Result: `10-Year Current State Cost - Compute`



**F100:** `=F96*(1+AnalysisTerm*$F$99)`

  Result: ``



**A101:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B101:** `=AnalysisTerm&"-Year Current State Cost - Storage"`

  Result: `10-Year Current State Cost - Storage`



**F101:** `=F97*(1+AnalysisTerm*$F$99)`

  Result: ``



**A102:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B102:** `=AnalysisTerm&"-Year Current State Cost - Network"`

  Result: `10-Year Current State Cost - Network`



**F102:** `=F98*(1+AnalysisTerm*$F$99)`

  Result: ``



**A103:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B103:** `="Total "&AnalysisTerm&"-Year Current State Cost"`

  Result: `Total 10-Year Current State Cost`



**F103:** `=ROUND(SUM(F96:F98)*(1+AnalysisTerm*F99),0)`

  Result: ``



**A104:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A105:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F105:** `=IF('Initial Screens'!$D$29="Yes",F94*50%,0)`

  Result: ``



**G105:** `=IF(SUM(F105:F106)>100%,"Sum of VLCR & VLSR protection is limited to 100%","")`

  Result: ``



**A106:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F106:** `=IF('Initial Screens'!$D$29="Yes",F94*50%,0)`

  Result: ``



**A107:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F107:** `=IFERROR(ROUND(SUM(F105:F106)/F94*75%,3),0)`

  Result: ``



**A108:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F108:** `=IFERROR(MIN(SUM($F$105:$F$106)/$F$94,1)*(1-$F$107)*F96,0)`

  Result: ``



**A109:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F109:** `=IFERROR(MIN(SUM($F$105:$F$106)/$F$94,1)*(1-$F$107)*F97,0)`

  Result: ``



**A110:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F110:** `=IFERROR(MIN(SUM($F$105:$F$106)/$F$94,1)*(1-$F$107)*F98,0)`

  Result: ``



**A111:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A112:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B112:** `=AnalysisTerm&"-Year Future State Cost - Compute"`

  Result: `10-Year Future State Cost - Compute`



**F112:** `=F108*(1+AnalysisTerm*$F$111)`

  Result: ``



**A113:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B113:** `=AnalysisTerm&"-Year Future State Cost - Storage"`

  Result: `10-Year Future State Cost - Storage`



**F113:** `=F109*(1+AnalysisTerm*$F$111)`

  Result: ``



**A114:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B114:** `=AnalysisTerm&"-Year Future State Cost - Network"`

  Result: `10-Year Future State Cost - Network`



**F114:** `=F110*(1+AnalysisTerm*$F$111)`

  Result: ``



**A115:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**B115:** `="Total "&AnalysisTerm&"-Year Future State Cost"`

  Result: `Total 10-Year Future State Cost`



**F115:** `=ROUND(SUM(F108:F110)*(1+AnalysisTerm*F111),0)`

  Result: ``



**A118:** `=$A$28`

  Result: `Show`



**D118:** `=IF(C118="",IF('Initial Screens'!C13="VCF 9","Yes","No"),C118)`

  Result: `Yes`



**A120:** `=IF(OR(A118="Hide",D118="No"),"Hide","Show")`

  Result: `Show`



**A121:** `=$A$120`

  Result: `Show`



**A122:** `=$A$120`

  Result: `Show`



**A123:** `=$A$120`

  Result: `Show`



**F123:** `=ROUND(F122/(D42*D44),0)`

  Result: `19`



**A124:** `=$A$120`

  Result: `Show`



**F124:** `=MAX(F9:F10)`

  Result: `25000`



**A125:** `=$A$120`

  Result: `Show`



**F125:** `=F11`

  Result: `0.15`



**A126:** `=$A$120`

  Result: `Show`



**F126:** `=F123*F124*(1+AnalysisTerm*F125)`

  Result: `1187500`



**A127:** `=$A$120`

  Result: `Show`



**F127:** `=(Network!F5*Compute!F123*Compute!F124*(1+AnalysisTerm*F125))`

  Result: `118750`



**A128:** `=$A$120`

  Result: `Show`



**F128:** `=F123*Facilities!F57`

  Result: `114608`



**A129:** `=$A$120`

  Result: `Show`



**B129:** `="Total "&AnalysisTerm&"-Year Current State Cost"`

  Result: `Total 10-Year Current State Cost`



**F129:** `=IF(D118="No",0,SUM(F126:F128))`

  Result: `1420858`



**A130:** `=$A$120`

  Result: `Show`



**A131:** `=$A$120`

  Result: `Show`



**A132:** `=$A$120`

  Result: `Show`



**A133:** `=$A$120`

  Result: `Show`



**F133:** `=IF(F132=1920,2157,1759)`

  Result: `1759`



**H133:** `=IF(F132=3840,"HPE 3.84 TB Gen4 U.3","HPE 1.92 TB NVMe Gen4 ")`

  Result: `HPE 3.84 TB Gen4 U.3`



**A134:** `=$A$120`

  Result: `Show`



**F134:** `=ROUND(F122/(F132*F44),0)`

  Result: `2`



**A135:** `=$A$120`

  Result: `Show`



**F135:** `=F134*F133*(1+AnalysisTerm*F125)`

  Result: `8795`



**A136:** `=$A$120`

  Result: `Show`



**B136:** `="Total "&AnalysisTerm&"-Year Current State Cost"`

  Result: `Total 10-Year Current State Cost`



**F136:** `=IF(D118="No",0,F135)`

  Result: `8795`




### Storage Formulas (94)

**F5:** `='Excel Output'!D22`

  Result: `5000`



**A6:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F6:** `=Compute!F73`

  Result: ``



**F7:** `='Excel Output'!D24`

  Result: `300`



**A8:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F8:** `=IF(Compute!D68="No",0,'Excel Output'!D24)`

  Result: `300`



**G8:** `=IF(Compute!D68="No","leave blank","")`

  Result: ``



**F9:** `=ROUND(F5*F7+F6*F8,0)`

  Result: `1500000`



**F11:** `=ROUND(F9/F10,0)`

  Result: `2142857`



**A12:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F12:** `=Compute!F8`

  Result: ``



**A13:** `=IF($F$12=100%,"Hide","Show")`

  Result: `Show`



**A14:** `=IF($F$12=0%,"Hide","Show")`

  Result: `Hide`



**F14:** `=F26`

  Result: `0.98`



**F16:** `='Excel Output'!D23`

  Result: `400`



**H16:** `='Initial Screens'!$E$17`

  Result: ``



**F17:** `=Compute!F8*Compute!F10+(1-Compute!F8)*Compute!F9`

  Result: `25000`



**A18:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F18:** `=Compute!F74`

  Result: `5000`



**F19:** `=ROUND(F15*(F16*F17+F6*F18),0)`

  Result: `500000`



**B21:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F21:** `=ROUND(Storage!F11*Storage!F12*Storage!F14+Storage!F11*(1-Storage!F12)*Storage!F13+Storage!F19,0)*(1+AnalysisTerm*Storage!F20)`

  Result: `11964285`



**F23:** `=ROUND(SUM(Compute!F15),0)`

  Result: `4500`



**F24:** `=IF('Initial Screens'!$C$13="VVF",F10,C47)`

  Result: `1.125`



**F25:** `=ROUND(F23*F7*'Initial Screens'!D24/F24+F23*F7*(1-'Initial Screens'!D24)/Storage!F10,0)`

  Result: `1200000`



**A26:** `=IF($F$29>0,"Show","Hide")`

  Result: `Show`



**F26:** `=C66`

  Result: `0.98`



**A27:** `=IF($F$30>0,"Show","Hide")`

  Result: `Hide`



**F27:** `=F13`

  Result: `2`



**A28:** `=IF($F$30>0,"Show","Hide")`

  Result: `Hide`



**B28:** `=B15`

  Result: `Other Storage Devices (includes SAN switches, HBAs etc.)  as % of Host Cost`



**F28:** `=F15`

  Result: `0.05`



**A29:** `=IF($F$29>0,"Show","Hide")`

  Result: `Show`



**F29:** `=Compute!F19`

  Result: `143`



**A30:** `=IF($F$30>0,"Show","Hide")`

  Result: `Hide`



**F30:** `=Compute!F20`

  Result: ``



**A31:** `=IF($F$30>0,"Show","Hide")`

  Result: `Hide`



**F31:** `=Compute!F9`

  Result: `25000`



**A32:** `=IF($F$30>0,"Show","Hide")`

  Result: `Hide`



**F32:** `=F28*F30*F31`

  Result: ``



**B34:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F34:** `=ROUND(F25*F26*Compute!F16+F25*(1-Compute!F16)*F27+F32,0)*(1+AnalysisTerm*F33)`

  Result: `2940000`



**A36:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A37:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A38:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A39:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A40:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C40:** `=ROUND(25%,3)`

  Result: `0.25`



**A41:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C41:** `=ROUND(1-C40,3)`

  Result: `0.75`



**A42:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A43:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A44:** `=IF(AND($A$43="Show",'Initial Screens'!C13="VCF 9"),"Show","hide")`

  Result: `Show`



**C44:** `=IF(A44="Show",1.5,1)`

  Result: `1.5`



**A45:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C45:** `=ROUND(C39*C41*C43*C44/C42,1)`

  Result: `2160`



**A46:** `=$A$44`

  Result: `Show`



**C46:** `=C45/C39`

  Result: `1.125`



**A47:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C47:** `=ROUND(C45/(C39),3)`

  Result: `1.125`



**A48:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A49:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A50:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A51:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A52:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C52:** `=F29`

  Result: `143`



**A53:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C53:** `=IFERROR(IF(ROUNDUP(F25*'Excel Output'!E30/(F29*C39),0)<4,4,ROUNDUP(F25*'Excel Output'!E30/(F29*C39),0)),0)`

  Result: `5`



**D53:** `=IF(C53>24,"Increase Capacity Disk Size","")`

  Result: ``



**A54:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C54:** `=C53*C39*0.000909495`

  Result: `8.731152`



**A55:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C55:** `=C54*C47`

  Result: `9.822545999999999`



**A56:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A57:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A58:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**B58:** `=B53`

  Result: `Total capacity disks per host                                        `



**C58:** `=C39`

  Result: `1920`



**D58:** `=C53`

  Result: `5`



**E58:** `=ROUND(C58*0.855,0)`

  Result: `1642`



**A59:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A60:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A61:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C61:** `=ROUNDUP(D58*E58*(1-C60),0)`

  Result: `8210`



**A62:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A63:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A64:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C64:** `=F29*C61`

  Result: `1174030`



**A65:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C65:** `=F25*'Excel Output'!E30`

  Result: `1200000`



**A66:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C66:** `=IFERROR(ROUND(C64/(C65),2),0)`

  Result: `0.98`



**A67:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**C67:** `=IFERROR(ROUND(C64/(C55*C52*1099.511627776),2),0)`

  Result: `0.76`




### Network Formulas (88)

**F6:** `=Compute!F6`

  Result: `400`



**H6:** `='Initial Screens'!$E$17`

  Result: ``



**A7:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F7:** `=Compute!F73`

  Result: ``



**F8:** `=Compute!F8*Compute!F10+(1-Compute!F8)*Compute!F9`

  Result: `25000`



**A9:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F9:** `=Compute!F74`

  Result: `5000`



**B11:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F11:** `=ROUND(Network!F5*Network!F6*Network!F8,0)*(1+AnalysisTerm*Network!F10)`

  Result: `2500000`



**F13:** `=ROUND(F5,3)`

  Result: `0.1`



**A14:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F14:** `=Compute!F19+Compute!F81`

  Result: `143`



**F15:** `=Compute!F20+Compute!F82`

  Result: ``



**A16:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F16:** `=Compute!F21`

  Result: `25000`



**F17:** `=Compute!F22`

  Result: ``



**B19:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F19:** `=ROUND(F13*(F14*F16+F15*F17),0)*(1+AnalysisTerm*F18)`

  Result: `893750`



**A23:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A24:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A25:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A26:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F26:** `=IF('Initial Screens'!D26="Yes",C43,0)`

  Result: ``



**A27:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A28:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A29:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**B29:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F29:** `=ROUND(F26*F27,0)*(1+AnalysisTerm*F28)`

  Result: ``



**A30:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A31:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**B31:** `="Anticipated Percent of DC load balancers that can be retired (or purchases avoided) in "&AnalysisTerm&" years"`

  Result: `Anticipated Percent of DC load balancers that can be retired (or purchases avoided) in 10 years`



**A32:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F32:** `=EVEN(F26*(1-F31))`

  Result: ``



**A33:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A34:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**B34:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F34:** `=ROUND(F32*F27,0)*(1+AnalysisTerm*F33)`

  Result: ``



**A35:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A36:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A37:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**A38:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**C38:** `='Excel Output'!$D$23`

  Result: `400`



**A39:** `=IF('Initial Screens'!$D$26="Yes",IF(Compute!$D$68="No","Hide","Show"),"Hide")`

  Result: `Hide`



**C39:** `=Compute!$F$73`

  Result: ``



**A40:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**C40:** `=ROUND(4,1)`

  Result: `4`



**A41:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**C41:** `=ROUND(20,1)`

  Result: `20`



**A42:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**C42:** `=ROUND(25%,2)`

  Result: `0.25`



**A43:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**C43:** `=EVEN((C38+C39)*C40/C41*C42)`

  Result: `20`



**A45:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A46:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A47:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A48:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F48:** `=IF('Initial Screens'!D27="Yes",C65,0)`

  Result: ``



**A49:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F49:** `=ROUND(90000,0)`

  Result: `90000`



**A50:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A51:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**B51:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F51:** `=ROUND(F48*F49,0)*(1+AnalysisTerm*F50)`

  Result: ``



**A52:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A53:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**B53:** `="Anticipated Percent of DC firewalls that can be retired (or purchases avoided) in "&AnalysisTerm&" years"`

  Result: `Anticipated Percent of DC firewalls that can be retired (or purchases avoided) in 10 years`



**F53:** `=ROUND(70%,3)`

  Result: `0.7`



**A54:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F54:** `=ROUND(F48*(1-F53),0)`

  Result: ``



**A55:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A56:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**B56:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F56:** `=ROUND(F54*F49,0)*(1+AnalysisTerm*F55)`

  Result: ``



**A57:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A58:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A59:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**A60:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**C60:** `='Excel Output'!$D$23`

  Result: `400`



**A61:** `=IF('Initial Screens'!$D$26="Yes",IF(Compute!$D$68="No","Hide","Show"),"Hide")`

  Result: `Hide`



**C61:** `=Compute!$F$73`

  Result: ``



**A62:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**C62:** `=ROUND(4,1)`

  Result: `4`



**A63:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**C63:** `=ROUND(20,1)`

  Result: `20`



**A64:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**C64:** `=ROUND(30%,2)`

  Result: `0.3`



**A65:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**C65:** `=EVEN((C60+C61)*C62/C63*C64)`

  Result: `24`




### Software Formulas (28)

**I4:** `=F5*((1+F6)^5-1)/F6`

  Result: `2762815.625000001`



**B7:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F7:** `=IF(AnalysisTerm=3,F5+F5*(1+F6)+F5*(1+F6)^2,F5+F5*(1+F6)+F5*(1+F6)^2+F5*(1+F6)^3+F5*(1+F6)^4)`

  Result: `2762815.625`



**F9:** `=ROUND(100%,3)-50%`

  Result: `0.5`



**J9:** `=F10*F6/((1+F6)^5-1)`

  Result: `250000.03393277456`



**B10:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F10:** `=ROUND(F7*(1-F9),0)`

  Result: `1381408`



**A12:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A13:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A14:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A15:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F15:** `=Compute!D39*Compute!D41`

  Result: `14400`



**A16:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F16:** `=ROUND(12%,3)`

  Result: `0.12`



**A17:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F17:** `=1000`

  Result: `1000`



**A18:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**B18:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F18:** `=IF('Initial Screens'!$D$28="Yes",ROUND(F15*F16*F17*AnalysisTerm,0),0)`

  Result: ``



**A19:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A20:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A21:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**B21:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F21:** `=IF('Initial Screens'!$D$28="Yes",ROUND(F18*(1-F20),0),0)`

  Result: ``



**B30:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F30:** `=IFERROR(ROUND(F28*F29*AnalysisTerm,0),"")`

  Result: ``



**B34:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F34:** `=IFERROR(ROUND((F30*(1-F32)+F30*F32*(1-F33))*AnalysisTerm,0),"")`

  Result: ``




### Facilities Formulas (79)

**F5:** `='Excel Output'!$D$23+Compute!$F$94*'Excel Output'!$D$23`

  Result: `400`



**H5:** `=Compute!H6`

  Result: ``



**F6:** `=F57`

  Result: `6032`



**A7:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F7:** `=Compute!F73`

  Result: ``



**H7:** `=Compute!H73`

  Result: ``



**A8:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F8:** `=F58`

  Result: `5151`



**A9:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F9:** `=IF('Initial Screens'!$D$26="Yes",Network!F26,0)`

  Result: ``



**A10:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F10:** `=IF('Initial Screens'!$D$26="Yes",F59,0)`

  Result: ``



**A11:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F11:** `=IF('Initial Screens'!$D$27="Yes",Network!F48,0)`

  Result: ``



**A12:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F12:** `=IF('Initial Screens'!$D$27="Yes",F60,0)`

  Result: ``



**B13:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F13:** `=ROUND(F5*F6+F7*F8+F9*F10+F11*F12,0)*AnalysisTerm`

  Result: `24128000`



**F15:** `=Compute!F17+Compute!F81+Compute!F82`

  Result: `143`



**F16:** `=ROUND($F$6*IF(AND(Compute!F41>Compute!D41,Compute!F42>Compute!D42),0.9,1),0)`

  Result: `5429`



**A17:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F17:** `=IF('Initial Screens'!$D$26="Yes",Network!F32,0)`

  Result: ``



**A18:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F18:** `=F10`

  Result: ``



**A19:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F19:** `=IF('Initial Screens'!$D$27="Yes",Network!F54,0)`

  Result: ``



**A20:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F20:** `=F12`

  Result: ``



**B21:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F21:** `=ROUND(F15*F16+F17*F18+F19*F20,0)*AnalysisTerm`

  Result: `7763470`



**F25:** `=ROUND(365*24,0)`

  Result: `8760`



**F26:** `=ROUND(0.65,2)`

  Result: `0.65`



**A27:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F27:** `=ROUND(0.3,2)`

  Result: `0.3`



**A28:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F28:** `=ROUND(0.3,2)`

  Result: `0.3`



**A29:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F29:** `=ROUND(0.3,2)`

  Result: `0.3`



**F30:** `=ROUND(30%,2)`

  Result: `0.3`



**F31:** `=ROUND(1.7,1)`

  Result: `1.7`



**F32:** `=ROUND($F$25*F26*(1+$F$30)*$F$31,0)`

  Result: `12584`



**A33:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F33:** `=ROUND($F$25*F27*(1+$F$30)*$F$31,0)`

  Result: `5808`



**A34:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F34:** `=ROUND($F$25*F28*(1+$F$30)*$F$31,0)`

  Result: `5808`



**A35:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F35:** `=ROUND($F$25*F29*(1+$F$30)*$F$31,0)`

  Result: `5808`



**F38:** `=ROUND(F32*$F$36,0)`

  Result: `1636`



**A39:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F39:** `=ROUND(F33*$F$36,0)`

  Result: `755`



**A40:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F40:** `=ROUND(F34*$F$36,0)`

  Result: `755`



**A41:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F41:** `=ROUND(F35*$F$36,0)`

  Result: `755`



**B44:** `="Space required per rack ("&F43&" )"`

  Result: `Space required per rack (Sq. Feet )`



**F44:** `=ROUNDUP(IF(F43=Misc!B112,0.092903,1)*25,2)`

  Result: `25`



**F45:** `=ROUND(42,0)`

  Result: `42`



**F46:** `=ROUND(65%,2)`

  Result: `0.65`



**F47:** `=ROUND(2,0)`

  Result: `2`



**A48:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F48:** `=ROUND(2,0)`

  Result: `2`



**A49:** `=IF(OR('Initial Screens'!$D$26="Yes",'Initial Screens'!$D$27="Yes"),"Show","Hide")`

  Result: `Hide`



**F49:** `=ROUND(2,0)`

  Result: `2`



**B50:** `="Annual Rack and Floor Space rental (per "&F43&")"`

  Result: `Annual Rack and Floor Space rental (per Sq. Feet)`



**F50:** `=ROUND(((2400/IF(F43=Misc!B112,0.092903,1))),0)`

  Result: `2400`



**F52:** `=ROUND($F$47/($F$45*$F$46)*$F$44*$F$50,0)`

  Result: `4396`



**A53:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F53:** `=ROUND($F$48/($F$45*$F$46)*$F$44*$F$50,0)`

  Result: `4396`



**A54:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F54:** `=ROUND($F$49/($F$45*$F$46)*$F$44*$F$50,0)`

  Result: `4396`



**A55:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F55:** `=ROUND($F$49/($F$45*$F$46)*$F$44*$F$50,0)`

  Result: `4396`



**F57:** `=ROUNDUP(SUM(F38,F52),0)`

  Result: `6032`



**A58:** `=IF(Compute!$D$68="No","Hide","Show")`

  Result: `Show`



**F58:** `=ROUNDUP(SUM(F39,F53),0)`

  Result: `5151`



**A59:** `=IF('Initial Screens'!$D$26="Yes","Show","Hide")`

  Result: `Hide`



**F59:** `=ROUNDUP(SUM(F40,F54),0)`

  Result: `5151`



**A60:** `=IF('Initial Screens'!$D$27="Yes","Show","Hide")`

  Result: `Hide`



**F60:** `=ROUNDUP(SUM(F41,F55),0)`

  Result: `5151`




### Labor Formulas (180)

**K1:** `=(F60*F107*F108)/2080`

  Result: ``



**F4:** `=ROUND(Misc!C156,1)`

  Result: `25.2`



**F5:** `=(F4*2080)*(1-F6)`

  Result: `27828.87378391089`



**F6:** `=(F127-F128)/F127`

  Result: `0.46907673641806147`



**F10:** `=ROUND(MIN(10,'Excel Output'!$D$22/1000),1)`

  Result: `5`



**F11:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H11:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**F12:** `=ROUND(F10*F11,0)`

  Result: `875164`



**F14:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MIN(50%,ROUND(40%*(1+Compute!$D$29),3)),ROUND(20%,3))`

  Result: `0.48`



**F15:** `=ROUND(F12*(1-F14),0)`

  Result: `455085`



**A17:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A18:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A19:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F19:** `=IF(A17="Show",ROUND(MIN(10,'Excel Output'!D22*'Excel Output'!D24/1000/300),1),0)`

  Result: `5`



**A20:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F20:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H20:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A21:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F21:** `=ROUND(F19*F20,0)`

  Result: `875164`



**A22:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**A23:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F23:** `=MIN(50%,ROUND(40%*Misc!$E$139*(1+(Storage!F11-Storage!F25)/Storage!F11),3))`

  Result: `0.5`



**A24:** `=IF('Initial Screens'!$C$13="VVF","Hide","Show")`

  Result: `Show`



**F24:** `=ROUND(F21*(1-F23),0)`

  Result: `437582`



**A26:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),"Show",IF(OR('Initial Screens'!$D$26="Yes",'Initial Screens'!$D$27="Yes"),"Show","Hide"))`

  Result: `Show`



**A27:** `=$A$26`

  Result: `Show`



**A28:** `=$A$26`

  Result: `Show`



**F28:** `=ROUND(MIN(10,'Excel Output'!$D$22/1000),1)`

  Result: `5`



**A29:** `=$A$26`

  Result: `Show`



**F29:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H29:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A30:** `=$A$26`

  Result: `Show`



**F30:** `=ROUND(F28*F29,0)`

  Result: `875164`



**A31:** `=$A$26`

  Result: `Show`



**A32:** `=$A$26`

  Result: `Show`



**F32:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MIN(50%,ROUND(40%*(1+Compute!$D$29)*('Excel Output'!E29-'Excel Output'!D29),3)),ROUND(20%,3))`

  Result: `0.48`



**A33:** `=$A$26`

  Result: `Show`



**F33:** `=ROUND(F30*(1-F32),0)`

  Result: `455085`



**A35:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),"Show","Hide")`

  Result: `Show`



**K35:** `=3000*2.5`

  Result: `7500`



**A36:** `=$A$35`

  Result: `Show`



**K36:** `=K35/1960`

  Result: `3.826530612244898`



**A37:** `=$A$35`

  Result: `Show`



**F37:** `=IF(A35="Show",ROUND(MIN(10,'Excel Output'!$D$22/1000),1),0)`

  Result: `5`



**A38:** `=$A$35`

  Result: `Show`



**F38:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H38:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**K38:** `=3000/K36`

  Result: `784`



**A39:** `=$A$35`

  Result: `Show`



**F39:** `=ROUND(F37*F38,0)`

  Result: `875164`



**A40:** `=$A$35`

  Result: `Show`



**A41:** `=$A$35`

  Result: `Show`



**F41:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MIN(50%,ROUND(40%*(1+Compute!$D$29)*Misc!E137,3)),ROUND(20%,3))`

  Result: `0.48`



**A42:** `=$A$35`

  Result: `Show`



**F42:** `=ROUND(F39*(1-F41),0)`

  Result: `455085`



**A44:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),"Show","Hide")`

  Result: `Show`



**B44:** `=IF('Initial Screens'!C13="VCF 9", "Operational Efficency for Enterprise/Cloud Admin with VCF operations","Software Defined Datacenter (SDDC) Manager Productivity")`

  Result: `Operational Efficency for Enterprise/Cloud Admin with VCF operations`



**A45:** `=$A$44`

  Result: `Show`



**A46:** `=$A$44`

  Result: `Show`



**B46:** `=IF('Initial Screens'!C13="VCF 9","Number of Cloud/Enterprise Admin", "Number of IT admin for existing SDDC Software LCM")`

  Result: `Number of Cloud/Enterprise Admin`



**F46:** `=IF(A44="Show",ROUND(3,1),0)`

  Result: `3`



**A47:** `=IF(AND('Initial Screens'!C13="VCF 9",A46="Show"),"Show","hide")`

  Result: `Show`



**F47:** `=IF(A47="Show",26,0)`

  Result: `26`



**A48:** `=$A$47`

  Result: `Show`



**F48:** `=IF(A48="Show",4,0)`

  Result: `4`



**A49:** `=$A$47`

  Result: `Show`



**F49:** `=IF(A49="Show",96,0)`

  Result: `96`



**A50:** `=$A$44`

  Result: `Show`



**F50:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H50:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A51:** `=$A$44`

  Result: `Show`



**F51:** `=ROUND(IF('Initial Screens'!C13="VCF 9",F47*F48*F46*F50/2080+F49*F50/2080+F46*F50,F46*F50),0)`

  Result: `559431`



**A52:** `=$A$44`

  Result: `Show`



**A53:** `=$A$44`

  Result: `Show`



**F53:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MIN(50%,ROUND(IF('Initial Screens'!$C$13="VCF 9",60%*(1+Compute!$D$29)*('Excel Output'!E27-'Excel Output'!D27),40%),3)),ROUND(20%,3))`

  Result: `0.5`



**A54:** `=$A$47`

  Result: `Show`



**F54:** `=IF(A54="Show",MIN(77%,ROUND(77%*Misc!E136,3)),0)`

  Result: `0.77`



**A55:** `=$A$47`

  Result: `Show`



**F55:** `=IF(A55="Show",MIN(79%,ROUND(79%*Misc!E136,3)),0)`

  Result: `0.79`



**A56:** `=$A$44`

  Result: `Show`



**F56:** `=ROUND(F51*(1-F53)+(F47*F48*F46*F50/2080)*(1-F54)+(F49*F50/2080)*(1-F55),0)`

  Result: `287451`



**A58:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A59:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A60:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F60:** `=IF(A58="Show",ROUND(MIN(10,MAX(3,'Excel Output'!D22/1000)),1),0)`

  Result: ``



**A61:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F61:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H61:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A62:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F62:** `=IF('Initial Screens'!$D$28="Yes",ROUND(F60*F61,0),0)`

  Result: ``



**A63:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**A64:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F64:** `=ROUND(40%,3)`

  Result: `0.4`



**A65:** `=IF('Initial Screens'!$D$28="Yes","Show","Hide")`

  Result: `Hide`



**F65:** `=IF('Initial Screens'!$D$28="Yes",ROUND(F62*(1-F64),0),0)`

  Result: ``



**A67:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A68:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A69:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F69:** `=IF(A67="Show",ROUND(MIN(5,'Excel Output'!D22*'Excel Output'!D24/1000/300/2),1),0)`

  Result: ``



**A70:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F70:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H70:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A71:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F71:** `=ROUND(F69*F70,0)`

  Result: ``



**A72:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**A73:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F73:** `=IFERROR(ROUND(MAX(1,SUM(Compute!F105:F106)/Compute!F94)*75%,3),0)`

  Result: ``



**A74:** `=IF('Initial Screens'!$D$29="Yes","Show","Hide")`

  Result: `Hide`



**F74:** `=ROUND(F71*(1-F73),0)`

  Result: ``



**A77:** `=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),"Show","Hide")`

  Result: `Show`



**A78:** `=$A$77`

  Result: `Show`



**A79:** `=$A$77`

  Result: `Show`



**A80:** `=$A$77`

  Result: `Show`



**F80:** `=MIN(1300,ROUND(F79/2,0))`

  Result: ``



**A81:** `=$A$77`

  Result: `Show`



**F81:** `=ROUND(Benchmarks!$D$16*1.1,2)`

  Result: `192535.98`



**A82:** `=$A$77`

  Result: `Show`



**F82:** `=F80*F81`

  Result: ``



**A83:** `=$A$77`

  Result: `Show`



**A84:** `=$A$77`

  Result: `Show`



**F84:** `=ROUND(6%,3)`

  Result: `0.06`



**A85:** `=$A$77`

  Result: `Show`



**F85:** `=ROUND(F82*(1-F84),0)`

  Result: ``



**A88:** `=IF(AND('Initial Screens'!C13="VCF 9",'Initial Screens'!D21>0%),"Show","hide")`

  Result: `Show`



**C88:** `=IF(A88="Hide","No","Yes")`

  Result: `Yes`



**A90:** `=IF(C88="No","Hide","Show")`

  Result: `Show`



**A91:** `=$A$90`

  Result: `Show`



**R91:** `=Q91`

  Result: `120000`



**A92:** `=$A$90`

  Result: `Show`



**F92:** `=IF(A92="Show",ROUND(MIN(5,'Excel Output'!$D$22/3000),1),0)`

  Result: `1.7`



**A93:** `=$A$90`

  Result: `Show`



**F93:** `=IF(A93="Show",1,0)`

  Result: `1`



**Q93:** `=Q90*Q91`

  Result: `1800000`



**R93:** `=R90*R91*(1-R92)`

  Result: `1440000`



**S93:** `=Q93-R93`

  Result: `360000`



**A94:** `=$A$90`

  Result: `Show`



**F94:** `=ROUND(Benchmarks!$D$16,2)`

  Result: `175032.71`



**H94:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A95:** `=$A$90`

  Result: `Show`



**F95:** `=F92*F94*(1+F93*52/2080)`

  Result: `304994.4971749999`



**Q95:** `=Q94*(Q91/2080)*52*Q90`

  Result: `45000`



**R95:** `=R94*(R91/2080)*52*R90`

  Result: `22500`



**S95:** `=Q95-R95`

  Result: `22500`



**A96:** `=$A$90`

  Result: `Show`



**A97:** `=$A$90`

  Result: `Show`



**F97:** `=MIN(20%,ROUND(20%*Misc!$E$136,3))`

  Result: `0.2`



**A98:** `=$A$90`

  Result: `Show`



**F98:** `=MIN(50%,ROUND(50%*Misc!$E$136,3))`

  Result: `0.5`



**A99:** `=$A$90`

  Result: `Show`



**F99:** `=F92*F94*(1*(1-F97)+F93*52*1/2080*(1-F98))`

  Result: `241763.93068749996`



**A103:** `=IF(C101="No","Hide","Show")`

  Result: `Show`



**A104:** `=$A$103`

  Result: `Show`



**A105:** `=$A$103`

  Result: `Show`



**F105:** `=IF(A103="Show",ROUND((20%*VMs)/52,0),0)`

  Result: `19`



**A106:** `=$A$103`

  Result: `Show`



**F106:** `=ROUND(F105*52,0)`

  Result: `988`



**A107:** `=$A$103`

  Result: `Show`



**N107:** `=N105/N106`

  Result: `0.2459016393442623`



**A108:** `=$A$103`

  Result: `Show`



**A109:** `=$A$103`

  Result: `Show`



**F109:** `=ROUND(Benchmarks!D10,2)`

  Result: `97.5`



**H109:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**O109:** `=N109*$G$102`

  Result: ``



**A110:** `=$A$103`

  Result: `Show`



**F110:** `=ROUND(F106*F107*F108*F109,0)`

  Result: `110972`



**O110:** `=N110*$G$102`

  Result: ``



**A111:** `=$A$103`

  Result: `Show`



**O111:** `=N111*$G$102`

  Result: ``



**A112:** `=$A$103`

  Result: `Show`



**B112:** `=IF('Initial Screens'!C13="VCF 9","Anticipated reduction in infrastructure related SR tickets ","Anticipated time reduction")`

  Result: `Anticipated reduction in infrastructure related SR tickets `



**F112:** `=IF('Initial Screens'!C13="VCF 9", MIN(60%,ROUND(60%*Misc!E137,3)),ROUND(40%,3))`

  Result: `0.6`



**A113:** `=$A$103`

  Result: `Show`



**F113:** `=ROUND(F110*(1-F112),0)`

  Result: `44389`



**O113:** `=SUMPRODUCT(O109:O111,P109:P111)/SUM(O109:O111)`

  Result: `#DIV/0!`



**F121:** `=ROUND(F119*F120,0)`

  Result: ``



**F124:** `=ROUND(F121*(1-F123),0)`

  Result: ``



**B127:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F127:** `=(F110+F12+F30+F21+F39+F51+F62+F71+F121+F82+F95)*AnalysisTerm`

  Result: `44760534.97175`



**B128:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F128:** `=(F113+F15+F33+F24+F42+F56+F65+F74+F124+F85+F99)*AnalysisTerm`

  Result: `23764409.306875`




### Support Formulas (4)

**B7:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F7:** `=IF(AnalysisTerm=3,F5+F5*(1+F6)+F5*(1+F6)^2,F5+F5*(1+F6)+F5*(1+F6)^2+F5*(1+F6)^3+F5*(1+F6)^4)`

  Result: `1250000`



**B10:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F10:** `=ROUND(F7*(1-F9),0)`

  Result: `625000`




### Migration - Reskilling Formulas (35)

**A4:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**B4:** `=IF('Initial Screens'!C13="VCF 9","Migration Efficiency (related to host refresh and migration to VCF 9)","Migration Efficiency (related to host refresh)")`

  Result: `Migration Efficiency (related to host refresh and migration to VCF 9)`



**A5:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**A6:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**A7:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**F7:** `=IF(C2="Yes",'Excel Output'!D22,0)`

  Result: `5000`



**H7:** `='Initial Screens'!$E$16`

  Result: ``



**A8:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**F8:** `=ROUND(100%,3)`

  Result: `1`



**A9:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**F9:** `=ROUND(1,1)`

  Result: `1`



**A10:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**F10:** `=ROUND(Benchmarks!$D$10,2)`

  Result: `97.5`



**H10:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A11:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**B11:** `=FIXED(AnalysisTerm,0)&"-Year Current State Cost"`

  Result: `10-Year Current State Cost`



**F11:** `=ROUND(F7*F8*F9*F10*AnalysisTerm,0)`

  Result: `4875000`



**A12:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**A13:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**F13:** `=ROUND(75%,3)`

  Result: `0.75`



**A14:** `=IF($C$2="Yes","Show","Hide")`

  Result: `Show`



**B14:** `=FIXED(AnalysisTerm,0)&"-Year Future State Cost"`

  Result: `10-Year Future State Cost`



**F14:** `=ROUND(F11*(1-F13),0)`

  Result: `1218750`



**F19:** `=Labor!F10+Labor!F28+Labor!F19+Labor!F37`

  Result: `20`



**F20:** `=ROUND(20,1)`

  Result: `20`



**F21:** `=F19*F20`

  Result: `400`



**F22:** `=ROUND(Benchmarks!$D$10,2)`

  Result: `97.5`



**H22:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**F23:** `=F21*F22`

  Result: `39000`



**F25:** `=Labor!F10+Labor!F28+Labor!F19+Labor!F37`

  Result: `20`



**F26:** `=ROUND(20*(('Excel Output'!E27-'Excel Output'!D27)+('Excel Output'!E28-'Excel Output'!D28)+('Excel Output'!E29-'Excel Output'!D29)+('Excel Output'!E30-'Excel Output'!D30)),1)`

  Result: `80`



**F27:** `=F25*F26`

  Result: `1600`



**F28:** `=ROUND(Benchmarks!$D$10,2)`

  Result: `97.5`



**H28:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**F29:** `=F27*F28`

  Result: `156000`




### InvestmentBVA Formulas (20)

**F6:** `=IF(#REF!<=3,"hide column","show column")`

  Result: `#REF!`



**G6:** `=IF(#REF!<=4,"hide column","show column")`

  Result: `#REF!`



**F9:** `=IF(#REF!>3,"Year 4","")`

  Result: `#REF!`



**G9:** `=IF(#REF!>4,"Year 5","")`

  Result: `#REF!`



**H10:** `=SUM(C10:G10)`

  Result: ``



**H11:** `=SUM(C11:G11)`

  Result: ``



**H12:** `=SUM(C12:G12)`

  Result: ``



**H13:** `=SUM(C13:G13)`

  Result: ``



**H14:** `=SUM(C14:G14)`

  Result: ``



**H15:** `=SUM(C15:G15)`

  Result: ``



**H16:** `=SUM(C16:G16)`

  Result: ``



**H17:** `=SUM(C17:G17)`

  Result: ``



**H18:** `=SUM(C18:G18)`

  Result: ``



**H19:** `=SUM(C19:G19)`

  Result: ``



**C20:** `=SUM(C10:C19)`

  Result: ``



**D20:** `=SUM(D10:D19)`

  Result: ``



**E20:** `=SUM(E10:E19)`

  Result: ``



**F20:** `=SUM(F10:F19)`

  Result: ``



**G20:** `=SUM(G10:G19)`

  Result: ``



**H20:** `=SUM(H10:H19)`

  Result: ``




### Misc Formulas (637)

**C5:** `=Compute!F12+Compute!F76+Compute!F100`

  Result: `25000000`



**D5:** `=Compute!F24+Compute!F86+Compute!F112`

  Result: `8937500`



**E5:** `=Transition!D11`

  Result: `8937500`



**C6:** `=Storage!F21+Compute!F101`

  Result: `11964285`



**D6:** `=Storage!F34+Compute!F113`

  Result: `2940000`



**E6:** `=Transition!D12`

  Result: `2940000`



**C7:** `=Network!F11+Network!F29+Network!F51+Compute!F102`

  Result: `2500000`



**D7:** `=Network!F19+Network!F34+Network!F56+Compute!F114`

  Result: `893750`



**E7:** `=Transition!D13`

  Result: `893750`



**C8:** `=Software!F7+Software!F18+Software!F30`

  Result: `2762815.625`



**D8:** `=Software!F10+Software!F21+Software!F34+'ROI Results'!O37`

  Result: `8881408`



**E8:** `=Transition!D14`

  Result: `10000000`



**C9:** `=Facilities!F13`

  Result: `24128000`



**D9:** `=Facilities!F21`

  Result: `7763470`



**E9:** `=Transition!D15`

  Result: `7763470`



**C10:** `=Labor!F127`

  Result: `44760534.97175`



**D10:** `=Labor!F128`

  Result: `23764409.306875`



**E10:** `=Transition!D16`

  Result: `23764409.306875`



**C11:** `=Support!F7`

  Result: `1250000`



**D11:** `=Support!F10+'ROI Results'!O40`

  Result: `1375000`



**E11:** `=Transition!D17`

  Result: `750000`



**C12:** `='Migration - Reskilling'!F11`

  Result: `4875000`



**D12:** `='Migration - Reskilling'!F14`

  Result: `1218750`



**E12:** `=Transition!D18`

  Result: `1218750`



**C13:** `='Migration - Reskilling'!F23`

  Result: `39000`



**D13:** `='Migration - Reskilling'!F29`

  Result: `156000`



**E13:** `=Transition!D19`

  Result: `156000`



**C14:** `='Business impact'!F19+'Business impact'!F34+'Business impact'!F54+'Business impact'!F65+'Business impact'!F77`

  Result: ``



**B18:** `='ROI Results'!$B$70`

  Result: `Ongoing current state (TCO)`



**H18:** `=IF(AnalysisTerm>3,4,"")`

  Result: `4`



**I18:** `=IF(AnalysisTerm>3,H18+1,"")`

  Result: `5`



**J18:** `=IF(AnalysisTerm>5,I18+1,"")`

  Result: `6`



**K18:** `=IF(AnalysisTerm>5,J18+1,"")`

  Result: `7`



**L18:** `=IF(AnalysisTerm>7,K18+1,"")`

  Result: `8`



**M18:** `=IF(AnalysisTerm>7,L18+1,"")`

  Result: `9`



**N18:** `=IF(AnalysisTerm>7,M18+1,"")`

  Result: `10`



**E19:** `=(Hardware_Refreshcylce+Growth)*'ROI Results'!$C71`

  Result: `2618750`



**F19:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*'ROI Results'!$C71)*(1+Inflation)^1`

  Result: `2724285.6249999995`



**G19:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*'ROI Results'!$C71)*(1+Inflation)^2`

  Result: `2835185.6284375004`



**H19:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^H$18-(1+Growth)^3)*'ROI Results'!$C71)*(1+Inflation)^3,"")`

  Result: `2951790.1039051544`



**I19:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^I$18-(1+Growth)^H$18)*'ROI Results'!$C71)*(1+Inflation)^H$18," ")`

  Result: `3074463.949525927`



**J19:** `=IF(AnalysisTerm>$I$18,((Hardware_Refreshcylce+(1+Growth)^J$18-(1+Growth)^I$18)*'ROI Results'!$C71)*(1+Inflation)^I$18," ")`

  Result: `3203598.802129362`



**K19:** `=IF(AnalysisTerm>$I$18,((Hardware_Refreshcylce+(1+Growth)^K$18-(1+Growth)^J$18)*'ROI Results'!$C71)*(1+Inflation)^J$18," ")`

  Result: `3339615.1264414974`



**L19:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^L$18-(1+Growth)^K$18)*'ROI Results'!$C71)*(1+Inflation)^K$18," ")`

  Result: `3482964.4718432184`



**M19:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^M$18-(1+Growth)^L$18)*'ROI Results'!$C71)*(1+Inflation)^L$18," ")`

  Result: `3634131.9102730914`



**N19:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^N$18-(1+Growth)^M$18)*'ROI Results'!$C71)*(1+Inflation)^M$18," ")`

  Result: `3793638.6699542343`



**O19:** `=SUM(E19:N19)`

  Result: `31658424.287509985`



**P19:** `=SUM(E19+E32)='ROI Results'!E71`

  Result: `True`



**Q19:** `=SUM(F19+F32)='ROI Results'!F71`

  Result: `True`



**R19:** `=SUM(G19+G32)='ROI Results'!G71`

  Result: `True`



**S19:** `=SUM(H19+H32)='ROI Results'!H71`

  Result: `True`



**T19:** `=SUM(I19+I32)='ROI Results'!I71`

  Result: `True`



**U19:** `=SUM(J19+J32)='ROI Results'!J71`

  Result: `True`



**V19:** `=SUM(K19+K32)='ROI Results'!K71`

  Result: `True`



**W19:** `=SUM(L19+L32)='ROI Results'!L71`

  Result: `True`



**X19:** `=SUM(M19+M32)='ROI Results'!M71`

  Result: `True`



**Y19:** `=SUM(N19+N32)='ROI Results'!N71`

  Result: `True`



**Z19:** `=SUM(O19+O32)='ROI Results'!O71`

  Result: `True`



**E20:** `=(Hardware_Refreshcylce+Growth)*'ROI Results'!$C72`

  Result: `1196428.5`



**F20:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*'ROI Results'!$C72)*(1+Inflation)^1`

  Result: `1244644.5685499997`



**G20:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*'ROI Results'!$C72)*(1+Inflation)^2`

  Result: `1295311.4610608253`



**H20:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^H$18-(1+Growth)^3)*'ROI Results'!$C72)*(1+Inflation)^3,"")`

  Result: `1348584.5561165013`



**I20:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^I$18-(1+Growth)^H$18)*'ROI Results'!$C72)*(1+Inflation)^H$18," ")`

  Result: `1404630.564748594`



**J20:** `=IF(AnalysisTerm>$I$18,((Hardware_Refreshcylce+(1+Growth)^J$18-(1+Growth)^I$18)*'ROI Results'!$C72)*(1+Inflation)^I$18," ")`

  Result: `1463628.4141034575`



**K20:** `=IF(AnalysisTerm>$I$18,((Hardware_Refreshcylce+(1+Growth)^K$18-(1+Growth)^J$18)*'ROI Results'!$C72)*(1+Inflation)^J$18," ")`

  Result: `1525770.2019305818`



**L20:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^L$18-(1+Growth)^K$18)*'ROI Results'!$C72)*(1+Inflation)^K$18," ")`

  Result: `1591262.2276279426`



**M20:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^M$18-(1+Growth)^L$18)*'ROI Results'!$C72)*(1+Inflation)^L$18," ")`

  Result: `1660326.1060468426`



**N20:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^N$18-(1+Growth)^M$18)*'ROI Results'!$C72)*(1+Inflation)^M$18," ")`

  Result: `1733199.970762898`



**O20:** `=SUM(E20:N20)`

  Result: `14463786.570947643`



**P20:** `=SUM(E20+E33)='ROI Results'!E72`

  Result: `True`



**Q20:** `=SUM(F20+F33)='ROI Results'!F72`

  Result: `True`



**R20:** `=SUM(G20+G33)='ROI Results'!G72`

  Result: `True`



**S20:** `=SUM(H20+H33)='ROI Results'!H72`

  Result: `True`



**T20:** `=SUM(I20+I33)='ROI Results'!I72`

  Result: `True`



**U20:** `=SUM(J20+J33)='ROI Results'!J72`

  Result: `True`



**V20:** `=SUM(K20+K33)='ROI Results'!K72`

  Result: `True`



**W20:** `=SUM(L20+L33)='ROI Results'!L72`

  Result: `True`



**X20:** `=SUM(M20+M33)='ROI Results'!M72`

  Result: `True`



**Y20:** `=SUM(N20+N33)='ROI Results'!N72`

  Result: `True`



**Z20:** `=SUM(O20+O33)='ROI Results'!O72`

  Result: `True`



**E21:** `=(Hardware_Refreshcylce+Growth)*'ROI Results'!$C73`

  Result: `261875`



**F21:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*'ROI Results'!$C73)*(1+Inflation)^1`

  Result: `272428.56249999994`



**G21:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*'ROI Results'!$C73)*(1+Inflation)^2`

  Result: `283518.56284375006`



**H21:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^H$18-(1+Growth)^3)*'ROI Results'!$C73)*(1+Inflation)^3,"")`

  Result: `295179.01039051544`



**I21:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^I$18-(1+Growth)^H$18)*'ROI Results'!$C73)*(1+Inflation)^H$18," ")`

  Result: `307446.39495259273`



**J21:** `=IF(AnalysisTerm>$I$18,((Hardware_Refreshcylce+(1+Growth)^J$18-(1+Growth)^I$18)*'ROI Results'!$C73)*(1+Inflation)^I$18," ")`

  Result: `320359.88021293614`



**K21:** `=IF(AnalysisTerm>$I$18,((Hardware_Refreshcylce+(1+Growth)^K$18-(1+Growth)^J$18)*'ROI Results'!$C73)*(1+Inflation)^J$18," ")`

  Result: `333961.51264414977`



**L21:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^L$18-(1+Growth)^K$18)*'ROI Results'!$C73)*(1+Inflation)^K$18," ")`

  Result: `348296.4471843219`



**M21:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^M$18-(1+Growth)^L$18)*'ROI Results'!$C73)*(1+Inflation)^L$18," ")`

  Result: `363413.19102730916`



**N21:** `=IF(AnalysisTerm>$K$18,((Hardware_Refreshcylce+(1+Growth)^N$18-(1+Growth)^M$18)*'ROI Results'!$C73)*(1+Inflation)^M$18," ")`

  Result: `379363.86699542345`



**O21:** `=SUM(E21:N21)`

  Result: `3165842.428750999`



**P21:** `=SUM(E21+E34)='ROI Results'!E73`

  Result: `True`



**Q21:** `=SUM(F21+F34)='ROI Results'!F73`

  Result: `True`



**R21:** `=SUM(G21+G34)='ROI Results'!G73`

  Result: `True`



**S21:** `=SUM(H21+H34)='ROI Results'!H73`

  Result: `True`



**T21:** `=SUM(I21+I34)='ROI Results'!I73`

  Result: `True`



**U21:** `=SUM(J21+J34)='ROI Results'!J73`

  Result: ``



**V21:** `=SUM(K21+K34)='ROI Results'!K73`

  Result: `True`



**W21:** `=SUM(L21+L34)='ROI Results'!L73`

  Result: `True`



**X21:** `=SUM(M21+M34)='ROI Results'!M73`

  Result: `True`



**Y21:** `=SUM(N21+N34)='ROI Results'!N73`

  Result: `True`



**Z21:** `=SUM(O21+O34)='ROI Results'!O73`

  Result: `True`



**O22:** `=SUM(E22:N22)`

  Result: ``



**P22:** `=SUM(E22+E35)='ROI Results'!E74`

  Result: `True`



**Q22:** `=SUM(F22+F35)='ROI Results'!F74`

  Result: `True`



**R22:** `=SUM(G22+G35)='ROI Results'!G74`

  Result: `True`



**S22:** `=SUM(H22+H35)='ROI Results'!H74`

  Result: `True`



**T22:** `=SUM(I22+I35)='ROI Results'!I74`

  Result: `True`



**U22:** `=SUM(J22+J35)='ROI Results'!J74`

  Result: `True`



**V22:** `=SUM(K22+K35)='ROI Results'!K74`

  Result: `True`



**W22:** `=SUM(L22+L35)='ROI Results'!L74`

  Result: `True`



**X22:** `=SUM(M22+M35)='ROI Results'!M74`

  Result: `True`



**Y22:** `=SUM(N22+N35)='ROI Results'!N74`

  Result: `True`



**Z22:** `=SUM(O22+O35)='ROI Results'!O74`

  Result: `True`



**O23:** `=SUM(E23:N23)`

  Result: ``



**P23:** `=SUM(E23+E36)='ROI Results'!E75`

  Result: `True`



**Q23:** `=SUM(F23+F36)='ROI Results'!F75`

  Result: `True`



**R23:** `=SUM(G23+G36)='ROI Results'!G75`

  Result: `True`



**S23:** `=SUM(H23+H36)='ROI Results'!H75`

  Result: `True`



**T23:** `=SUM(I23+I36)='ROI Results'!I75`

  Result: `True`



**U23:** `=SUM(J23+J36)='ROI Results'!J75`

  Result: `True`



**V23:** `=SUM(K23+K36)='ROI Results'!K75`

  Result: `True`



**W23:** `=SUM(L23+L36)='ROI Results'!L75`

  Result: `True`



**X23:** `=SUM(M23+M36)='ROI Results'!M75`

  Result: `True`



**Y23:** `=SUM(N23+N36)='ROI Results'!N75`

  Result: `True`



**Z23:** `=SUM(O23+O36)='ROI Results'!O75`

  Result: `True`



**O24:** `=SUM(E24:N24)`

  Result: ``



**P24:** `=SUM(E24+E37)='ROI Results'!E76`

  Result: `True`



**Q24:** `=SUM(F24+F37)='ROI Results'!F76`

  Result: `True`



**R24:** `=SUM(G24+G37)='ROI Results'!G76`

  Result: `True`



**S24:** `=SUM(H24+H37)='ROI Results'!H76`

  Result: `True`



**T24:** `=SUM(I24+I37)='ROI Results'!I76`

  Result: `True`



**U24:** `=SUM(J24+J37)='ROI Results'!J76`

  Result: `True`



**V24:** `=SUM(K24+K37)='ROI Results'!K76`

  Result: `True`



**W24:** `=SUM(L24+L37)='ROI Results'!L76`

  Result: `True`



**X24:** `=SUM(M24+M37)='ROI Results'!M76`

  Result: `True`



**Y24:** `=SUM(N24+N37)='ROI Results'!N76`

  Result: `True`



**Z24:** `=SUM(O24+O37)='ROI Results'!O76`

  Result: `True`



**O25:** `=SUM(E25:N25)`

  Result: ``



**P25:** `=SUM(E25+E38)='ROI Results'!E77`

  Result: `True`



**Q25:** `=SUM(F25+F38)='ROI Results'!F77`

  Result: `True`



**R25:** `=SUM(G25+G38)='ROI Results'!G77`

  Result: `True`



**S25:** `=SUM(H25+H38)='ROI Results'!H77`

  Result: `True`



**T25:** `=SUM(I25+I38)='ROI Results'!I77`

  Result: `True`



**U25:** `=SUM(J25+J38)='ROI Results'!J77`

  Result: `True`



**V25:** `=SUM(K25+K38)='ROI Results'!K77`

  Result: `True`



**W25:** `=SUM(L25+L38)='ROI Results'!L77`

  Result: `True`



**X25:** `=SUM(M25+M38)='ROI Results'!M77`

  Result: `True`



**Y25:** `=SUM(N25+N38)='ROI Results'!N77`

  Result: `True`



**Z25:** `=SUM(O25+O38)='ROI Results'!O77`

  Result: `True`



**E26:** `='ROI Results'!E78`

  Result: `499687.49999999994`



**F26:** `='ROI Results'!F78`

  Result: `540412.03125`



**G26:** `='ROI Results'!G78`

  Result: `584455.611796875`



**H26:** `='ROI Results'!H78`

  Result: `632088.7441583204`



**I26:** `='ROI Results'!I78`

  Result: `683603.9768072233`



**J26:** `='ROI Results'!J78`

  Result: `739317.700917012`



**K26:** `='ROI Results'!K78`

  Result: `799572.0935417484`



**L26:** `='ROI Results'!L78`

  Result: `864737.2191654011`



**M26:** `='ROI Results'!M78`

  Result: `935213.3025273811`



**N26:** `='ROI Results'!N78`

  Result: `1011433.1866833628`



**O26:** `=SUM(E26:N26)`

  Result: `7290521.366847323`



**P26:** `=SUM(E26+E39)='ROI Results'!E78`

  Result: `True`



**Q26:** `=SUM(F26+F39)='ROI Results'!F78`

  Result: `True`



**R26:** `=SUM(G26+G39)='ROI Results'!G78`

  Result: `True`



**S26:** `=SUM(H26+H39)='ROI Results'!H78`

  Result: `True`



**T26:** `=SUM(I26+I39)='ROI Results'!I78`

  Result: `True`



**U26:** `=SUM(J26+J39)='ROI Results'!J78`

  Result: `True`



**V26:** `=SUM(K26+K39)='ROI Results'!K78`

  Result: `True`



**W26:** `=SUM(L26+L39)='ROI Results'!L78`

  Result: `True`



**X26:** `=SUM(M26+M39)='ROI Results'!M78`

  Result: `True`



**Y26:** `=SUM(N26+N39)='ROI Results'!N78`

  Result: `True`



**Z26:** `=SUM(O26+O39)='ROI Results'!O78`

  Result: `True`



**O27:** `=SUM(E27:N27)`

  Result: ``



**P27:** `=SUM(E27+E40)='ROI Results'!E79`

  Result: `True`



**Q27:** `=SUM(F27+F40)='ROI Results'!F79`

  Result: `True`



**R27:** `=SUM(G27+G40)='ROI Results'!G79`

  Result: `True`



**S27:** `=SUM(H27+H40)='ROI Results'!H79`

  Result: `True`



**T27:** `=SUM(I27+I40)='ROI Results'!I79`

  Result: `True`



**U27:** `=SUM(J27+J40)='ROI Results'!J79`

  Result: `True`



**V27:** `=SUM(K27+K40)='ROI Results'!K79`

  Result: `True`



**W27:** `=SUM(L27+L40)='ROI Results'!L79`

  Result: `True`



**X27:** `=SUM(M27+M40)='ROI Results'!M79`

  Result: `True`



**Y27:** `=SUM(N27+N40)='ROI Results'!N79`

  Result: `True`



**Z27:** `=SUM(O27+O40)='ROI Results'!O79`

  Result: `True`



**O28:** `=SUM(O19:O27)`

  Result: `56578574.654055946`



**B31:** `='ROI Results'!$B$70`

  Result: `Ongoing current state (TCO)`



**H31:** `=H$18`

  Result: `4`



**I31:** `=I$18`

  Result: `5`



**J31:** `=J$18`

  Result: `6`



**K31:** `=K$18`

  Result: `7`



**L31:** `=L$18`

  Result: `8`



**M31:** `=M$18`

  Result: `9`



**N31:** `=N$18`

  Result: `10`



**E32:** `='ROI Results'!$D71/AnalysisTerm*(1+Growth)`

  Result: `2073750`



**F32:** `='ROI Results'!$D71/AnalysisTerm*((1+Growth)^2)*(1+Inflation)^1`

  Result: `2242760.625`



**G32:** `='ROI Results'!$D71/AnalysisTerm*((1+Growth)^3)*(1+Inflation)^2`

  Result: `2425545.6159375003`



**H32:** `=IF(AnalysisTerm>3,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^H$31)*(1+Inflation)^3," ")`

  Result: `2623227.5836364063`



**I32:** `=IF(AnalysisTerm>3,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^I$31)*(1+Inflation)^H$31," ")`

  Result: `2837020.6317027737`



**J32:** `=IF(AnalysisTerm>$I$31,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^J$31)*(1+Inflation)^I$31," ")`

  Result: `3068237.8131865487`



**K32:** `=IF(AnalysisTerm>$I$31,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^K$31)*(1+Inflation)^J$31," ")`

  Result: `3318299.1949612536`



**L32:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^L$31)*(1+Inflation)^K$31," ")`

  Result: `3588740.5793505954`



**M32:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^M$31)*(1+Inflation)^L$31," ")`

  Result: `3881222.936567669`



**N32:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D71/AnalysisTerm*((1+Growth)^N$31)*(1+Inflation)^M$31," ")`

  Result: `4197542.605897934`



**O32:** `=SUM(E32:N32)`

  Result: `30256347.58624068`



**E33:** `='ROI Results'!$D72/AnalysisTerm*(1+Growth)`

  Result: `753749.955`



**F33:** `='ROI Results'!$D72/AnalysisTerm*((1+Growth)^2)*(1+Inflation)^1`

  Result: `815180.5763325001`



**G33:** `='ROI Results'!$D72/AnalysisTerm*((1+Growth)^3)*(1+Inflation)^2`

  Result: `881617.7933035989`



**H33:** `=IF(AnalysisTerm>3,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^H$31)*(1+Inflation)^3," ")`

  Result: `953469.643457842`



**I33:** `=IF(AnalysisTerm>3,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^I$31)*(1+Inflation)^H$31," ")`

  Result: `1031177.4193996561`



**J33:** `=IF(AnalysisTerm>$I$31,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^J$31)*(1+Inflation)^I$31," ")`

  Result: `1115218.379080728`



**K33:** `=IF(AnalysisTerm>$I$31,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^K$31)*(1+Inflation)^J$31," ")`

  Result: `1206108.6769758076`



**L33:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^L$31)*(1+Inflation)^K$31," ")`

  Result: `1304406.5341493357`



**M33:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^M$31)*(1+Inflation)^L$31," ")`

  Result: `1410715.6666825067`



**N33:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D72/AnalysisTerm*((1+Growth)^N$31)*(1+Inflation)^M$31," ")`

  Result: `1525688.9935171308`



**O33:** `=SUM(E33:N33)`

  Result: `10997333.637899105`



**E34:** `='ROI Results'!$D73/AnalysisTerm*(1+Growth)`

  Result: `205635.36000000002`



**F34:** `='ROI Results'!$D73/AnalysisTerm*((1+Growth)^2)*(1+Inflation)^1`

  Result: `222394.64184000003`



**G34:** `='ROI Results'!$D73/AnalysisTerm*((1+Growth)^3)*(1+Inflation)^2`

  Result: `240519.80514996004`



**H34:** `=IF(AnalysisTerm>3,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^H$31)*(1+Inflation)^3," ")`

  Result: `260122.16926968176`



**I34:** `=IF(AnalysisTerm>3,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^I$31)*(1+Inflation)^H$31," ")`

  Result: `281322.12606516085`



**J34:** `=IF(AnalysisTerm>$I$31,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^J$31)*(1+Inflation)^I$31," ")`

  Result: `304249.8793394714`



**K34:** `=IF(AnalysisTerm>$I$31,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^K$31)*(1+Inflation)^J$31," ")`

  Result: `329046.2445056384`



**L34:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^L$31)*(1+Inflation)^K$31," ")`

  Result: `355863.51343284786`



**M34:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^M$31)*(1+Inflation)^L$31," ")`

  Result: `384866.389777625`



**N34:** `=IF(AnalysisTerm>$L$31,'ROI Results'!$D73/AnalysisTerm*((1+Growth)^N$31)*(1+Inflation)^M$31," ")`

  Result: `416233.00054450147`



**O34:** `=SUM(E34:N34)`

  Result: `3000253.129924887`



**E35:** `='ROI Results'!E74`

  Result: `500000`



**F35:** `='ROI Results'!F74`

  Result: `525000`



**G35:** `='ROI Results'!G74`

  Result: `551250`



**H35:** `='ROI Results'!H74`

  Result: `578812.5000000001`



**I35:** `='ROI Results'!I74`

  Result: `607753.125`



**J35:** `='ROI Results'!J74`

  Result: `638140.7812500001`



**K35:** `='ROI Results'!K74`

  Result: `670047.8203125`



**L35:** `='ROI Results'!L74`

  Result: `703550.2113281251`



**M35:** `='ROI Results'!M74`

  Result: `738727.7218945313`



**N35:** `='ROI Results'!N74`

  Result: `775664.1079892579`



**O35:** `=SUM(E35:N35)`

  Result: `6288946.267774414`



**E36:** `='ROI Results'!E75`

  Result: `2484867.3199999994`



**F36:** `='ROI Results'!F75`

  Result: `2687384.0065799993`



**G36:** `='ROI Results'!G75`

  Result: `2906405.803116269`



**H36:** `='ROI Results'!H75`

  Result: `3143277.8760702456`



**I36:** `='ROI Results'!I75`

  Result: `3399455.02296997`



**J36:** `='ROI Results'!J75`

  Result: `3860336.137709123`



**K36:** `='ROI Results'!K75`

  Result: `4174953.532932418`



**L36:** `='ROI Results'!L75`

  Result: `4515212.2458664095`



**M36:** `='ROI Results'!M75`

  Result: `4883202.0439045215`



**N36:** `='ROI Results'!N75`

  Result: `5281183.010482741`



**O36:** `=SUM(E36:N36)`

  Result: `37336276.9996317`



**E37:** `='ROI Results'!E76`

  Result: `4587954.834604374`



**F37:** `='ROI Results'!F76`

  Result: `4961873.1536246305`



**G37:** `='ROI Results'!G76`

  Result: `5366265.815645037`



**H37:** `='ROI Results'!H76`

  Result: `5803616.479620109`



**I37:** `='ROI Results'!I76`

  Result: `6276611.222709147`



**J37:** `='ROI Results'!J76`

  Result: `7127562.789227939`



**K37:** `='ROI Results'!K76`

  Result: `7708459.156550018`



**L37:** `='ROI Results'!L76`

  Result: `8336698.577808844`



**M37:** `='ROI Results'!M76`

  Result: `9016139.511900265`



**N37:** `='ROI Results'!N76`

  Result: `9750954.882120136`



**O37:** `=SUM(E37:N37)`

  Result: `68936136.4238105`



**E38:** `='ROI Results'!E77`

  Result: `125000`



**F38:** `='ROI Results'!F77`

  Result: `125000`



**G38:** `='ROI Results'!G77`

  Result: `125000`



**H38:** `='ROI Results'!H77`

  Result: `125000`



**I38:** `='ROI Results'!I77`

  Result: `125000`



**J38:** `='ROI Results'!J77`

  Result: `125000`



**K38:** `='ROI Results'!K77`

  Result: `125000`



**L38:** `='ROI Results'!L77`

  Result: `125000`



**M38:** `='ROI Results'!M77`

  Result: `125000`



**N38:** `='ROI Results'!N77`

  Result: `125000`



**O38:** `=SUM(E38:N38)`

  Result: `1250000`



**O39:** `=SUM(E39:N39)`

  Result: ``



**E40:** `='ROI Results'!E79`

  Result: `39000`



**F40:** `='ROI Results'!F79`

  Result: ``



**G40:** `='ROI Results'!G79`

  Result: ``



**H40:** `='ROI Results'!H79`

  Result: ``



**I40:** `='ROI Results'!I79`

  Result: ``



**J40:** `='ROI Results'!J79`

  Result: ``



**K40:** `='ROI Results'!K79`

  Result: ``



**L40:** `='ROI Results'!L79`

  Result: ``



**M40:** `='ROI Results'!M79`

  Result: ``



**N40:** `='ROI Results'!N79`

  Result: ``



**O40:** `=SUM(E40:N40)`

  Result: `39000`



**O41:** `=SUM(O32:O40)`

  Result: `158104294.0452813`



**H43:** `=H$18`

  Result: `4`



**I43:** `=I$18`

  Result: `5`



**J43:** `=J$18`

  Result: `6`



**K43:** `=K$18`

  Result: `7`



**L43:** `=L$18`

  Result: `8`



**M43:** `=M$18`

  Result: `9`



**N43:** `=N$18`

  Result: `10`



**E44:** `=(Hardware_Refreshcylce+Growth)*'ROI Results'!$C85`

  Result: `899246.875`



**F44:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*'ROI Results'!$C85)*(1+Inflation)^1`

  Result: `935486.5240624998`



**G44:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*'ROI Results'!$C85)*(1+Inflation)^2`

  Result: `973568.235386094`



**H44:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*'ROI Results'!$C85)*(1+Inflation)^3," ")`

  Result: `1013608.7929709348`



**I44:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*'ROI Results'!$C85)*(1+Inflation)^4," ")`

  Result: `1055733.4983909682`



**J44:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^J$43-(1+Growth)^I$43)*'ROI Results'!$C85)*(1+Inflation)^I$43," ")`

  Result: `1100076.8349665191`



**K44:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^K$43-(1+Growth)^J$43)*'ROI Results'!$C85)*(1+Inflation)^J$43," ")`

  Result: `1146783.1851666812`



**L44:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^L$43-(1+Growth)^K$43)*'ROI Results'!$C85)*(1+Inflation)^K$43," ")`

  Result: `1196007.6055526645`



**M44:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^M$43-(1+Growth)^L$43)*'ROI Results'!$C85)*(1+Inflation)^L$43," ")`

  Result: `1247916.6639239553`



**N44:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^N$43-(1+Growth)^M$43)*'ROI Results'!$C85)*(1+Inflation)^M$43," ")`

  Result: `1302689.3437080672`



**O44:** `=SUM(E44:N44)`

  Result: `10871117.559128385`



**P44:** `=SUM(E44+E57)='ROI Results'!E85`

  Result: `True`



**Q44:** `=SUM(F44+F57)='ROI Results'!F85`

  Result: `True`



**R44:** `=SUM(G44+G57)='ROI Results'!G85`

  Result: `True`



**S44:** `=SUM(H44+H57)='ROI Results'!H85`

  Result: `True`



**T44:** `=SUM(I44+I57)='ROI Results'!I85`

  Result: ``



**U44:** `=SUM(J44+J57)='ROI Results'!J85`

  Result: `True`



**V44:** `=SUM(K44+K57)='ROI Results'!K85`

  Result: `True`



**W44:** `=SUM(L44+L57)='ROI Results'!L85`

  Result: `True`



**X44:** `=SUM(M44+M57)='ROI Results'!M85`

  Result: `True`



**Y44:** `=SUM(N44+N57)='ROI Results'!N85`

  Result: `True`



**Z44:** `=SUM(O44+O57)='ROI Results'!O85`

  Result: `True`



**E45:** `=(Hardware_Refreshcylce+Growth)*'ROI Results'!$C86`

  Result: `294000`



**F45:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*'ROI Results'!$C86)*(1+Inflation)^1`

  Result: `305848.19999999995`



**G45:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*'ROI Results'!$C86)*(1+Inflation)^2`

  Result: `318298.64430000004`



**H45:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*'ROI Results'!$C86)*(1+Inflation)^3," ")`

  Result: `331389.5142904498`



**I45:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*'ROI Results'!$C86)*(1+Inflation)^4," ")`

  Result: `345161.7760995217`



**J45:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^J$43-(1+Growth)^I$43)*'ROI Results'!$C86)*(1+Inflation)^I$43," ")`

  Result: `359659.3977378644`



**K45:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^K$43-(1+Growth)^J$43)*'ROI Results'!$C86)*(1+Inflation)^J$43," ")`

  Result: `374929.5836463199`



**L45:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^L$43-(1+Growth)^K$43)*'ROI Results'!$C86)*(1+Inflation)^K$43," ")`

  Result: `391023.02805609786`



**M45:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^M$43-(1+Growth)^L$43)*'ROI Results'!$C86)*(1+Inflation)^L$43," ")`

  Result: `407994.18868555187`



**N45:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^N$43-(1+Growth)^M$43)*'ROI Results'!$C86)*(1+Inflation)^M$43," ")`

  Result: `425901.58242159226`



**O45:** `=SUM(E45:N45)`

  Result: `3554205.9152373974`



**P45:** `=SUM(E45+E58)='ROI Results'!E86`

  Result: `True`



**Q45:** `=SUM(F45+F58)='ROI Results'!F86`

  Result: `True`



**R45:** `=SUM(G45+G58)='ROI Results'!G86`

  Result: `True`



**S45:** `=SUM(H45+H58)='ROI Results'!H86`

  Result: `True`



**T45:** `=SUM(I45+I58)='ROI Results'!I86`

  Result: `True`



**U45:** `=SUM(J45+J58)='ROI Results'!J86`

  Result: `True`



**V45:** `=SUM(K45+K58)='ROI Results'!K86`

  Result: `True`



**W45:** `=SUM(L45+L58)='ROI Results'!L86`

  Result: `True`



**X45:** `=SUM(M45+M58)='ROI Results'!M86`

  Result: `True`



**Y45:** `=SUM(N45+N58)='ROI Results'!N86`

  Result: `True`



**Z45:** `=SUM(O45+O58)='ROI Results'!O86`

  Result: `True`



**E46:** `=(Hardware_Refreshcylce+Growth)*'ROI Results'!$C87`

  Result: `89375`



**F46:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*'ROI Results'!$C87)*(1+Inflation)^1`

  Result: `92976.81249999999`



**G46:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*'ROI Results'!$C87)*(1+Inflation)^2`

  Result: `96761.70521875001`



**H46:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*'ROI Results'!$C87)*(1+Inflation)^3," ")`

  Result: `100741.28516907807`



**I46:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*'ROI Results'!$C87)*(1+Inflation)^4," ")`

  Result: `104928.00591460802`



**J46:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^J$43-(1+Growth)^I$43)*'ROI Results'!$C87)*(1+Inflation)^I$43," ")`

  Result: `109335.23358102594`



**K46:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^K$43-(1+Growth)^J$43)*'ROI Results'!$C87)*(1+Inflation)^J$43," ")`

  Result: `113977.31815778857`



**L46:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^L$43-(1+Growth)^K$43)*'ROI Results'!$C87)*(1+Inflation)^K$43," ")`

  Result: `118869.67051875425`



**M46:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^M$43-(1+Growth)^L$43)*'ROI Results'!$C87)*(1+Inflation)^L$43," ")`

  Result: `124028.84562507209`



**N46:** `=IF(AnalysisTerm>7,((Hardware_Refreshcylce+(1+Growth)^N$43-(1+Growth)^M$43)*'ROI Results'!$C87)*(1+Inflation)^M$43," ")`

  Result: `129472.63241132589`



**O46:** `=SUM(E46:N46)`

  Result: `1080466.509096403`



**P46:** `=SUM(E46+E59)='ROI Results'!E87`

  Result: `True`



**Q46:** `=SUM(F46+F59)='ROI Results'!F87`

  Result: `True`



**R46:** `=SUM(G46+G59)='ROI Results'!G87`

  Result: `True`



**S46:** `=SUM(H46+H59)='ROI Results'!H87`

  Result: `True`



**T46:** `=SUM(I46+I59)='ROI Results'!I87`

  Result: `True`



**U46:** `=SUM(J46+J59)='ROI Results'!J87`

  Result: `True`



**V46:** `=SUM(K46+K59)='ROI Results'!K87`

  Result: `True`



**W46:** `=SUM(L46+L59)='ROI Results'!L87`

  Result: `True`



**X46:** `=SUM(M46+M59)='ROI Results'!M87`

  Result: `True`



**Y46:** `=SUM(N46+N59)='ROI Results'!N87`

  Result: `True`



**Z46:** `=SUM(O46+O59)='ROI Results'!O87`

  Result: `True`



**O47:** `=SUM(E47:N47)`

  Result: ``



**P47:** `=SUM(E47+E60)='ROI Results'!E88`

  Result: `True`



**Q47:** `=SUM(F47+F60)='ROI Results'!F88`

  Result: `True`



**R47:** `=SUM(G47+G60)='ROI Results'!G88`

  Result: `True`



**S47:** `=SUM(H47+H60)='ROI Results'!H88`

  Result: `True`



**T47:** `=SUM(I47+I60)='ROI Results'!I88`

  Result: `True`



**U47:** `=SUM(J47+J60)='ROI Results'!J88`

  Result: `True`



**V47:** `=SUM(K47+K60)='ROI Results'!K88`

  Result: `True`



**W47:** `=SUM(L47+L60)='ROI Results'!L88`

  Result: `True`



**X47:** `=SUM(M47+M60)='ROI Results'!M88`

  Result: `True`



**Y47:** `=SUM(N47+N60)='ROI Results'!N88`

  Result: `True`



**Z47:** `=SUM(O47+O60)='ROI Results'!O88`

  Result: `True`



**O48:** `=SUM(E48:N48)`

  Result: ``



**P48:** `=SUM(E48+E61)='ROI Results'!E89`

  Result: `True`



**Q48:** `=SUM(F48+F61)='ROI Results'!F89`

  Result: `True`



**R48:** `=SUM(G48+G61)='ROI Results'!G89`

  Result: `True`



**S48:** `=SUM(H48+H61)='ROI Results'!H89`

  Result: `True`



**T48:** `=SUM(I48+I61)='ROI Results'!I89`

  Result: `True`



**U48:** `=SUM(J48+J61)='ROI Results'!J89`

  Result: `True`



**V48:** `=SUM(K48+K61)='ROI Results'!K89`

  Result: `True`



**W48:** `=SUM(L48+L61)='ROI Results'!L89`

  Result: `True`



**X48:** `=SUM(M48+M61)='ROI Results'!M89`

  Result: `True`



**Y48:** `=SUM(N48+N61)='ROI Results'!N89`

  Result: `True`



**Z48:** `=SUM(O48+O61)='ROI Results'!O89`

  Result: `True`



**O49:** `=SUM(E49:N49)`

  Result: ``



**P49:** `=SUM(E49+E62)='ROI Results'!E90`

  Result: `True`



**Q49:** `=SUM(F49+F62)='ROI Results'!F90`

  Result: `True`



**R49:** `=SUM(G49+G62)='ROI Results'!G90`

  Result: `True`



**S49:** `=SUM(H49+H62)='ROI Results'!H90`

  Result: `True`



**T49:** `=SUM(I49+I62)='ROI Results'!I90`

  Result: `True`



**U49:** `=SUM(J49+J62)='ROI Results'!J90`

  Result: `True`



**V49:** `=SUM(K49+K62)='ROI Results'!K90`

  Result: `True`



**W49:** `=SUM(L49+L62)='ROI Results'!L90`

  Result: `True`



**X49:** `=SUM(M49+M62)='ROI Results'!M90`

  Result: `True`



**Y49:** `=SUM(N49+N62)='ROI Results'!N90`

  Result: `True`



**Z49:** `=SUM(O49+O62)='ROI Results'!O90`

  Result: `True`



**O50:** `=SUM(E50:N50)`

  Result: ``



**P50:** `=SUM(E50+E63)='ROI Results'!E91`

  Result: `True`



**Q50:** `=SUM(F50+F63)='ROI Results'!F91`

  Result: `True`



**R50:** `=SUM(G50+G63)='ROI Results'!G91`

  Result: `True`



**S50:** `=SUM(H50+H63)='ROI Results'!H91`

  Result: `True`



**T50:** `=SUM(I50+I63)='ROI Results'!I91`

  Result: `True`



**U50:** `=SUM(J50+J63)='ROI Results'!J91`

  Result: `True`



**V50:** `=SUM(K50+K63)='ROI Results'!K91`

  Result: `True`



**W50:** `=SUM(L50+L63)='ROI Results'!L91`

  Result: `True`



**X50:** `=SUM(M50+M63)='ROI Results'!M91`

  Result: `True`



**Y50:** `=SUM(N50+N63)='ROI Results'!N91`

  Result: `True`



**Z50:** `=SUM(O50+O63)='ROI Results'!O91`

  Result: `True`



**E51:** `='ROI Results'!E92`

  Result: `124921.87499999999`



**F51:** `='ROI Results'!F92`

  Result: `135103.0078125`



**G51:** `='ROI Results'!G92`

  Result: `146113.90294921875`



**H51:** `='ROI Results'!H92`

  Result: `158022.1860395801`



**I51:** `='ROI Results'!I92`

  Result: `170900.99420180582`



**J51:** `='ROI Results'!J92`

  Result: `194070.89649071562`



**K51:** `='ROI Results'!K92`

  Result: `209887.674554709`



**L51:** `='ROI Results'!L92`

  Result: `226993.52003091777`



**M51:** `='ROI Results'!M92`

  Result: `245493.49191343758`



**N51:** `='ROI Results'!N92`

  Result: `265501.2115043827`



**O51:** `=SUM(E51:N51)`

  Result: `1877008.7604972676`



**P51:** `=SUM(E51+E64)='ROI Results'!E92`

  Result: `True`



**Q51:** `=SUM(F51+F64)='ROI Results'!F92`

  Result: `True`



**R51:** `=SUM(G51+G64)='ROI Results'!G92`

  Result: `True`



**S51:** `=SUM(H51+H64)='ROI Results'!H92`

  Result: `True`



**T51:** `=SUM(I51+I64)='ROI Results'!I92`

  Result: `True`



**U51:** `=SUM(J51+J64)='ROI Results'!J92`

  Result: `True`



**V51:** `=SUM(K51+K64)='ROI Results'!K92`

  Result: `True`



**W51:** `=SUM(L51+L64)='ROI Results'!L92`

  Result: `True`



**X51:** `=SUM(M51+M64)='ROI Results'!M92`

  Result: `True`



**Y51:** `=SUM(N51+N64)='ROI Results'!N92`

  Result: `True`



**Z51:** `=SUM(O51+O64)='ROI Results'!O92`

  Result: `True`



**O52:** `=SUM(E52:N52)`

  Result: ``



**P52:** `=SUM(E52+E65)='ROI Results'!E93`

  Result: `True`



**Q52:** `=SUM(F52+F65)='ROI Results'!F93`

  Result: `True`



**R52:** `=SUM(G52+G65)='ROI Results'!G93`

  Result: `True`



**S52:** `=SUM(H52+H65)='ROI Results'!H93`

  Result: `True`



**T52:** `=SUM(I52+I65)='ROI Results'!I93`

  Result: `True`



**U52:** `=SUM(J52+J65)='ROI Results'!J93`

  Result: `True`



**V52:** `=SUM(K52+K65)='ROI Results'!K93`

  Result: `True`



**W52:** `=SUM(L52+L65)='ROI Results'!L93`

  Result: `True`



**X52:** `=SUM(M52+M65)='ROI Results'!M93`

  Result: `True`



**Y52:** `=SUM(N52+N65)='ROI Results'!N93`

  Result: `True`



**Z52:** `=SUM(O52+O65)='ROI Results'!O93`

  Result: `True`



**O53:** `=SUM(O44:O52)`

  Result: `17382798.743959453`



**H56:** `=H$18`

  Result: `4`



**I56:** `=I$18`

  Result: `5`



**J56:** `=J$18`

  Result: `6`



**K56:** `=K$18`

  Result: `7`



**L56:** `=L$18`

  Result: `8`



**M56:** `=M$18`

  Result: `9`



**N56:** `=N$18`

  Result: `10`



**E57:** `=MIN(SUM('ROI Results'!$E56:E56),1)*'ROI Results'!$D85*(1+Growth)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:E56),1))*'ROI Results'!$D71*(1+Growth)/AnalysisTerm`

  Result: `1923050.64`



**F57:** `=(MIN(SUM('ROI Results'!$E56:F56),1)*'ROI Results'!$D85*((1+Growth)^2)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:F56),1))*'ROI Results'!$D71*((1+Growth)^2)/AnalysisTerm)*(1+Inflation)^1`

  Result: `1916797.90932`



**G57:** `=(MIN(SUM('ROI Results'!$E56:G56),1)*'ROI Results'!$D85*((1+Growth)^3)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:G56),1))*'ROI Results'!$D71*((1+Growth)^3)/AnalysisTerm)*(1+Inflation)^2`

  Result: `1896752.60042562`



**H57:** `=IF(AnalysisTerm>3,(MIN(SUM('ROI Results'!$E56:H56),1)*'ROI Results'!$D85*((1+Growth)^4)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:H56),1))*'ROI Results'!$D71*((1+Growth)^4)/AnalysisTerm)*(1+Inflation)^3," ")`

  Result: `1860708.0552682756`



**I57:** `=IF(AnalysisTerm>3,(MIN(SUM('ROI Results'!$E56:I56),1)*'ROI Results'!$D85*((1+Growth)^5)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:I56),1))*'ROI Results'!$D71*((1+Growth)^5)/AnalysisTerm)*(1+Inflation)^4," ")`

  Result: `1806189.5442901067`



**J57:** `=IF(AnalysisTerm>5,(MIN(SUM('ROI Results'!$E56:J56),1)*'ROI Results'!$D85*((1+Growth)^J$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:J56),1))*'ROI Results'!$D71*((1+Growth)^J$56)/AnalysisTerm)*(1+Inflation)^I$56," ")`

  Result: `1730425.22794239`



**K57:** `=IF(AnalysisTerm>5,(MIN(SUM('ROI Results'!$E56:K56),1)*'ROI Results'!$D85*((1+Growth)^K$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:K56),1))*'ROI Results'!$D71*((1+Growth)^K$56)/AnalysisTerm)*(1+Inflation)^J$56," ")`

  Result: `1630314.1655294355`



**L57:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E56:L56),1)*'ROI Results'!$D85*((1+Growth)^L$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:L56),1))*'ROI Results'!$D71*((1+Growth)^L$56)/AnalysisTerm)*(1+Inflation)^K$56," ")`

  Result: `1502391.0829728686`



**M57:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E56:M56),1)*'ROI Results'!$D85*((1+Growth)^M$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:M56),1))*'ROI Results'!$D71*((1+Growth)^M$56)/AnalysisTerm)*(1+Inflation)^L$56," ")`

  Result: `1342787.583693593`



**N57:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E56:N56),1)*'ROI Results'!$D85*((1+Growth)^N$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E56:N56),1))*'ROI Results'!$D71*((1+Growth)^N$56)/AnalysisTerm)*(1+Inflation)^M$56," ")`

  Result: `1147189.4568609197`



**O57:** `=SUM(E57:N57)`

  Result: `16756606.266303213`



**E58:** `=MIN(SUM('ROI Results'!$E57:E57),1)*'ROI Results'!$D86*(1+Growth)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:E57),1))*'ROI Results'!$D72*(1+Growth)/AnalysisTerm`

  Result: `696896.9595000001`



**F58:** `=(MIN(SUM('ROI Results'!$E57:F57),1)*'ROI Results'!$D86*((1+Growth)^2)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:F57),1))*'ROI Results'!$D72*((1+Growth)^2)/AnalysisTerm)*(1+Inflation)^1`

  Result: `692207.5470660002`



**G58:** `=(MIN(SUM('ROI Results'!$E57:G57),1)*'ROI Results'!$D86*((1+Growth)^3)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:G57),1))*'ROI Results'!$D72*((1+Growth)^3)/AnalysisTerm)*(1+Inflation)^2`

  Result: `682124.7965760191`



**H58:** `=IF(AnalysisTerm>3,(MIN(SUM('ROI Results'!$E57:H57),1)*'ROI Results'!$D86*((1+Growth)^4)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:H57),1))*'ROI Results'!$D72*((1+Growth)^4)/AnalysisTerm)*(1+Inflation)^3," ")`

  Result: `665800.7421766721`



**I58:** `=IF(AnalysisTerm>3,(MIN(SUM('ROI Results'!$E57:I57),1)*'ROI Results'!$D86*((1+Growth)^5)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:I57),1))*'ROI Results'!$D72*((1+Growth)^5)/AnalysisTerm)*(1+Inflation)^4," ")`

  Result: `642285.0234801747`



**J58:** `=IF(AnalysisTerm>5,(MIN(SUM('ROI Results'!$E57:J57),1)*'ROI Results'!$D86*((1+Growth)^J$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:J57),1))*'ROI Results'!$D72*((1+Growth)^J$56)/AnalysisTerm)*(1+Inflation)^I$56," ")`

  Result: `610513.8276564251`



**K58:** `=IF(AnalysisTerm>5,(MIN(SUM('ROI Results'!$E57:K57),1)*'ROI Results'!$D86*((1+Growth)^K$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:K57),1))*'ROI Results'!$D72*((1+Growth)^K$56)/AnalysisTerm)*(1+Inflation)^J$56," ")`

  Result: `569297.7092161932`



**L58:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E57:L57),1)*'ROI Results'!$D86*((1+Growth)^L$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:L57),1))*'ROI Results'!$D72*((1+Growth)^L$56)/AnalysisTerm)*(1+Inflation)^K$56," ")`

  Result: `517308.1779984526`



**M58:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E57:M57),1)*'ROI Results'!$D86*((1+Growth)^M$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:M57),1))*'ROI Results'!$D72*((1+Growth)^M$56)/AnalysisTerm)*(1+Inflation)^L$56," ")`

  Result: `453062.93548317894`



**N58:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E57:N57),1)*'ROI Results'!$D86*((1+Growth)^N$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E57:N57),1))*'ROI Results'!$D72*((1+Growth)^N$56)/AnalysisTerm)*(1+Inflation)^M$56," ")`

  Result: `374909.6281926055`



**O58:** `=SUM(E58:N58)`

  Result: `5904407.347345721`



**E59:** `=MIN(SUM('ROI Results'!$E58:E58),1)*'ROI Results'!$D87*(1+Growth)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:E58),1))*'ROI Results'!$D73*(1+Growth)/AnalysisTerm`

  Result: `190702.44900000002`



**F59:** `=(MIN(SUM('ROI Results'!$E58:F58),1)*'ROI Results'!$D87*((1+Growth)^2)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:F58),1))*'ROI Results'!$D73*((1+Growth)^2)/AnalysisTerm)*(1+Inflation)^1`

  Result: `190094.75534700003`



**G59:** `=(MIN(SUM('ROI Results'!$E58:G58),1)*'ROI Results'!$D87*((1+Growth)^3)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:G58),1))*'ROI Results'!$D73*((1+Growth)^3)/AnalysisTerm)*(1+Inflation)^2`

  Result: `188121.31428669076`



**H59:** `=IF(AnalysisTerm>3,(MIN(SUM('ROI Results'!$E58:H58),1)*'ROI Results'!$D87*((1+Growth)^4)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:H58),1))*'ROI Results'!$D73*((1+Growth)^4)/AnalysisTerm)*(1+Inflation)^3," ")`

  Result: `184563.5454448475`



**I59:** `=IF(AnalysisTerm>3,(MIN(SUM('ROI Results'!$E58:I58),1)*'ROI Results'!$D87*((1+Growth)^5)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:I58),1))*'ROI Results'!$D73*((1+Growth)^5)/AnalysisTerm)*(1+Inflation)^4," ")`

  Result: `179176.311481963`



**J59:** `=IF(AnalysisTerm>5,(MIN(SUM('ROI Results'!$E58:J58),1)*'ROI Results'!$D87*((1+Growth)^J$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:J58),1))*'ROI Results'!$D73*((1+Growth)^J$56)/AnalysisTerm)*(1+Inflation)^I$56," ")`

  Result: `171685.04117339727`



**K59:** `=IF(AnalysisTerm>5,(MIN(SUM('ROI Results'!$E58:K58),1)*'ROI Results'!$D87*((1+Growth)^K$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:K58),1))*'ROI Results'!$D73*((1+Growth)^K$56)/AnalysisTerm)*(1+Inflation)^J$56," ")`

  Result: `161782.55994959432`



**L59:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E58:L58),1)*'ROI Results'!$D87*((1+Growth)^L$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:L58),1))*'ROI Results'!$D73*((1+Growth)^L$56)/AnalysisTerm)*(1+Inflation)^K$56," ")`

  Result: `149125.59932157747`



**M59:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E58:M58),1)*'ROI Results'!$D87*((1+Growth)^M$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:M58),1))*'ROI Results'!$D73*((1+Growth)^M$56)/AnalysisTerm)*(1+Inflation)^L$56," ")`

  Result: `133330.95390236867`



**N59:** `=IF(AnalysisTerm>7,(MIN(SUM('ROI Results'!$E58:N58),1)*'ROI Results'!$D87*((1+Growth)^N$56)/AnalysisTerm+(1-MIN(SUM('ROI Results'!$E58:N58),1))*'ROI Results'!$D73*((1+Growth)^N$56)/AnalysisTerm)*(1+Inflation)^M$56," ")`

  Result: `113971.25176773504`



**O59:** `=SUM(E59:N59)`

  Result: `1662553.781675174`



**E60:** `='ROI Results'!E88`

  Result: `1638140.8`



**F60:** `='ROI Results'!F88`

  Result: `1638140.8`



**G60:** `='ROI Results'!G88`

  Result: `1638140.8`



**H60:** `='ROI Results'!H88`

  Result: `1638140.8`



**I60:** `='ROI Results'!I88`

  Result: `1638140.8`



**J60:** `='ROI Results'!J88`

  Result: `138140.8`



**K60:** `='ROI Results'!K88`

  Result: `138140.8`



**L60:** `='ROI Results'!L88`

  Result: `138140.8`



**M60:** `='ROI Results'!M88`

  Result: `138140.8`



**N60:** `='ROI Results'!N88`

  Result: `138140.8`



**O60:** `=SUM(E60:N60)`

  Result: `8881408.000000002`



**E61:** `='ROI Results'!E89`

  Result: `2315956.1555`



**F61:** `='ROI Results'!F89`

  Result: `2322029.1577665005`



**G61:** `='ROI Results'!G89`

  Result: `2313708.8996285694`



**H61:** `='ROI Results'!H89`

  Result: `2288608.941240982`



**I61:** `='ROI Results'!I89`

  Result: `2244049.4566976596`



**J61:** `='ROI Results'!J89`

  Result: `2285876.5266055083`



**K61:** `='ROI Results'!K89`

  Result: `2188379.1186224315`



**L61:** `='ROI Results'!L89`

  Result: `2059806.2697792666`



**M61:** `='ROI Results'!M89`

  Result: `1895740.285373996`



**N61:** `='ROI Results'!N89`

  Result: `1691249.797315225`



**O61:** `=SUM(E61:N61)`

  Result: `21605404.60853014`



**E62:** `='ROI Results'!E90`

  Result: `4372744.546539405`



**F62:** `='ROI Results'!F90`

  Result: `4496373.300540104`



**G62:** `='ROI Results'!G90`

  Result: `4611108.678978664`



**H62:** `='ROI Results'!H90`

  Result: `4714679.888547197`



**I62:** `='ROI Results'!I90`

  Result: `4804505.068652454`



**J62:** `='ROI Results'!J90`

  Result: `5121538.454156426`



**K62:** `='ROI Results'!K90`

  Result: `5177357.9517735345`



**L62:** `='ROI Results'!L90`

  Result: `5208257.488705111`



**M62:** `='ROI Results'!M90`

  Result: `5209804.344301365`



**N62:** `='ROI Results'!N90`

  Result: `5177008.789055459`



**O62:** `=SUM(E62:N62)`

  Result: `48893378.51124972`



**E63:** `='ROI Results'!E91`

  Result: `137500`



**F63:** `='ROI Results'!F91`

  Result: `137500`



**G63:** `='ROI Results'!G91`

  Result: `137500`



**H63:** `='ROI Results'!H91`

  Result: `137500`



**I63:** `='ROI Results'!I91`

  Result: `137500`



**J63:** `='ROI Results'!J91`

  Result: `137500`



**K63:** `='ROI Results'!K91`

  Result: `137500`



**L63:** `='ROI Results'!L91`

  Result: `137500`



**M63:** `='ROI Results'!M91`

  Result: `137500`



**N63:** `='ROI Results'!N91`

  Result: `137500`



**O63:** `=SUM(E63:N63)`

  Result: `1375000`



**O64:** `=SUM(E64:N64)`

  Result: ``



**E65:** `='ROI Results'!E93`

  Result: `156000`



**F65:** `='ROI Results'!F93`

  Result: ``



**G65:** `='ROI Results'!G93`

  Result: ``



**H65:** `='ROI Results'!H93`

  Result: ``



**I65:** `='ROI Results'!I93`

  Result: ``



**J65:** `='ROI Results'!J93`

  Result: ``



**K65:** `='ROI Results'!K93`

  Result: ``



**L65:** `='ROI Results'!L93`

  Result: ``



**M65:** `='ROI Results'!M93`

  Result: ``



**N65:** `='ROI Results'!N93`

  Result: ``



**O65:** `=SUM(E65:N65)`

  Result: `156000`



**O66:** `=SUM(O57:O65)`

  Result: `105234758.51510397`



**C71:** `=ROUND('Excel Output'!C39/AnalysisTerm/Transition!B25,0)`

  Result: `4294`



**C72:** `=ROUND(Transition!B20/AnalysisTerm/(Transition!D25*(1+Growth)^AnalysisTerm),0)`

  Result: `1664`



**C77:** `=O28/1000000`

  Result: `56.57857465405595`



**C78:** `=O41/1000000`

  Result: `158.10429404528128`



**C81:** `=Misc!O53/1000000`

  Result: `17.38279874395945`



**C82:** `=Misc!O66/1000000`

  Result: `105.23475851510396`



**C87:** `=IF('Initial Screens'!C13="VCF","VMware Cloud Foundation",IF('Initial Screens'!C13="VVF","VMware vSphere Foundation","VMware vSphere Foundation w/ vSAN"))`

  Result: `VMware vSphere Foundation w/ vSAN`



**C88:** `='Excel Output'!C39-Transition!D20`

  Result: `158258989.39246225`



**C89:** `=('Excel Output'!C39-Transition!D20)/'Excel Output'!C39`

  Result: `0.7371756784846374`



**B107:** `=12.8*1000`

  Result: `12800`



**B108:** `=15.36*1000`

  Result: `15360`



**P117:** `=(99.7%-99.4%)/99.4%`

  Result: `0.0030181086519113593`



**C119:** `='Initial Screens'!C13`

  Result: `VCF 9`



**C121:** `=IF('Initial Screens'!$D$26="Yes",0.8,0)`

  Result: ``



**F121:** `=IF('Initial Screens'!$D$29="Yes",0.8,0)`

  Result: ``



**G121:** `=IF('Initial Screens'!D21>0%,0.7*E136,0)`

  Result: `0.7`



**H121:** `=IF('Initial Screens'!D22>0%,0.73*E137,0)`

  Result: `0.73`



**D122:** `=IF(AND(C119="VCF",'Initial Screens'!$D$27="Yes"),0.35,0)`

  Result: ``



**E122:** `=IF('Initial Screens'!$D$28="Yes",0.35,0)`

  Result: ``



**F123:** `=IF('Initial Screens'!$D$29="Yes",0.4,0)`

  Result: ``



**F124:** `=IF('Initial Screens'!$D$29="Yes",100%-SUM(C124,G124:H124),0%)`

  Result: ``



**F126:** `=1-SUM(C124,G124:H124)`

  Result: `0.35`



**G126:** `=C121*C124+F121*F124+G121*G124+H121*H124`

  Result: `0.21299999999999997`



**C128:** `=Compute!F73`

  Result: ``



**C129:** `=Compute!F14`

  Result: `0.1`



**C130:** `=Compute!F18`

  Result: `31.46853146853147`



**C131:** `=Compute!F81+Compute!F82`

  Result: ``



**B135:** `='Initial Screens'!B20`

  Result: `Component Usage`



**C135:** `='Initial Screens'!C20`

  Result: `Current State`



**D135:** `='Initial Screens'!D20`

  Result: `Future State`



**B136:** `='Initial Screens'!B21`

  Result: `% of Operations coverage`



**C136:** `='Initial Screens'!C21`

  Result: ``



**D136:** `='Initial Screens'!D21`

  Result: `1`



**E136:** `=D136-C136`

  Result: `1`



**B137:** `='Initial Screens'!B22`

  Result: `% of Automation coverage`



**C137:** `='Initial Screens'!C22`

  Result: ``



**D137:** `='Initial Screens'!D22`

  Result: `1`



**E137:** `=D137-C137`

  Result: `1`



**B138:** `='Initial Screens'!B23`

  Result: `% Of NSX coverage`



**C138:** `='Initial Screens'!C23`

  Result: ``



**D138:** `='Initial Screens'!D23`

  Result: `1`



**E138:** `=D138-C138`

  Result: `1`



**B139:** `='Initial Screens'!B24`

  Result: `% of vSAN Coverage`



**C139:** `='Initial Screens'!C24`

  Result: ``



**D139:** `='Initial Screens'!D24`

  Result: `1`



**E139:** `=D139-C139`

  Result: `1`



**B145:** `=Labor!B10`

  Result: `Number of Server Administrators`



**C145:** `=Labor!F10`

  Result: `5`



**D145:** `=Labor!F14`

  Result: `0.48`



**E145:** `=C145*(1-D145)`

  Result: `2.6`



**B146:** `=Labor!B19`

  Result: `Number of storage administrator personnel`



**C146:** `=Labor!F19`

  Result: `5`



**D146:** `=Labor!F23`

  Result: `0.5`



**E146:** `=C146*(1-D146)`

  Result: `2.5`



**B147:** `=Labor!B28`

  Result: `Number of network administrator personnel`



**C147:** `=Labor!F28`

  Result: `5`



**D147:** `=Labor!F32`

  Result: `0.48`



**E147:** `=C147*(1-D147)`

  Result: `2.6`



**B148:** `=Labor!B37`

  Result: `Number of IT service delivery personnel required for provisioning and deploying new VMS`



**C148:** `=Labor!F37`

  Result: `5`



**D148:** `=Labor!F41`

  Result: `0.48`



**E148:** `=C148*(1-D148)`

  Result: `2.6`



**B149:** `=Labor!B46`

  Result: `Number of Cloud/Enterprise Admin`



**C149:** `=Labor!F46`

  Result: `3`



**D149:** `=(Labor!F51-Labor!F56)/Labor!F51`

  Result: `0.48617255747357585`



**E149:** `=C149*(1-D149)`

  Result: `1.5414823275792726`



**B150:** `=Labor!B60`

  Result: `Number of IT Personnel managing DBs`



**C150:** `=Labor!F60`

  Result: ``



**D150:** `=Labor!F64`

  Result: `0.4`



**E150:** `=C150*(1-D150)`

  Result: ``



**B151:** `=Labor!B69`

  Result: `Number of Disaster Recovery Administrators`



**C151:** `=Labor!F69`

  Result: ``



**D151:** `=Labor!F73`

  Result: ``



**E151:** `=C151*(1-D151)`

  Result: ``



**B152:** `=Labor!B80`

  Result: `Number of Developers `



**C152:** `=Labor!F80`

  Result: ``



**D152:** `=Labor!F84`

  Result: `0.06`



**E152:** `=C152*(1-D152)`

  Result: ``



**B153:** `=Labor!B92`

  Result: `Number of  infrastructure Admins required for resolving  workload infrastructure issues `



**C153:** `=Labor!F92`

  Result: `1.7`



**D153:** `=(Labor!F95-Labor!F99)/Labor!F95`

  Result: `0.20731707317073161`



**E153:** `=C153*(1-D153)`

  Result: `1.3475609756097562`



**B154:** `=Labor!B103`

  Result: `Service Request (SR) Time Reduction`



**C154:** `=(Labor!F106*Labor!F107*Labor!F108)/2080`

  Result: `0.5472`



**D154:** `=(Labor!F110-Labor!F113)/Labor!F110`

  Result: `0.599998197743575`



**E154:** `=C154*(1-D154)`

  Result: `0.21888098619471577`



**B155:** `=Labor!B119`

  Result: `Number of FTEs`



**C155:** `=Labor!F119`

  Result: ``



**D155:** `=Labor!F123`

  Result: ``



**E155:** `=C155*(1-D155)`

  Result: ``



**C156:** `=SUM(C145:C155)`

  Result: `25.2472`



**E156:** `=SUM(E145:E155)`

  Result: `13.407924289383743`



**D157:** `=SUMPRODUCT(C145:C155,D145:D155)`

  Result: `11.839275710616256`



**D158:** `=C156-D157`

  Result: `13.407924289383743`



**E158:** `=D158/C156`

  Result: `0.531065793014027`



**C159:** `=C156*2080`

  Result: `52514.176`



**E159:** `=E156*2080`

  Result: `27888.482521918188`



**C160:** `=C159-E159`

  Result: `24625.693478081812`



**C161:** `=C160/C159`

  Result: `0.46893420698597293`



**D161:** `=C156-E156`

  Result: `11.839275710616256`



**D162:** `=D161*2080`

  Result: `24625.693478081812`




### Business impact Formulas (109)

**B4:** `=IF('Initial Screens'!C8="Government and Non-Profit","Annual operating budget","Annual revenue")`

  Result: `Annual revenue`



**A5:** `=IF('Initial Screens'!C8="Government","Hide","Show")`

  Result: `Show`



**F8:** `=ROUND(Benchmarks!$D$10,2)`

  Result: `97.5`



**H8:** `="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"`

  Result: `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`



**A10:** `=IF('Initial Screens'!$C$8="Government","Show","hide")`

  Result: `hide`



**D10:** `=IF('Initial Screens'!$C$8="Government","No",IF(C10="","No",C10))`

  Result: `No`



**A12:** `=IF(AND($A$10="Show",$D$10="Yes"),"Show","Hide")`

  Result: `Hide`



**A14:** `=$A$12`

  Result: `Hide`



**A15:** `=$A$12`

  Result: `Hide`



**F15:** `=F4`

  Result: `1000000000`



**H15:** `=$H$4`

  Result: `From 10-k`



**A16:** `=$A$12`

  Result: `Hide`



**F16:** `=IF(D10="Yes",0.5%,0)`

  Result: ``



**A17:** `=$A$12`

  Result: `Hide`



**F17:** `=ROUND(F15*F16,0)`

  Result: ``



**A18:** `=$A$12`

  Result: `Hide`



**F18:** `=F5`

  Result: `0.1`



**H18:** `=$H$5`

  Result: `From 10-k`



**A19:** `=$A$12`

  Result: `Hide`



**F19:** `=ROUND(F17*F18,0)`

  Result: ``



**A21:** `=IF('Initial Screens'!$C$8="Government","Show","hide")`

  Result: `hide`



**D21:** `=IF('Initial Screens'!$C$8="Government","No",IF(C21="","No",C21))`

  Result: `No`



**A23:** `=IF(AND($A$21="Show",$D$21="Yes"),"Show","Hide")`

  Result: `Hide`



**A24:** `=$A$23`

  Result: `Hide`



**A25:** `=$A$23`

  Result: `Hide`



**A26:** `=$A$23`

  Result: `Hide`



**F26:** `=F4`

  Result: `1000000000`



**H26:** `=$H$4`

  Result: `From 10-k`



**A27:** `=$A$23`

  Result: `Hide`



**F27:** `=ROUND(5%,3)`

  Result: `0.05`



**A28:** `=$A$23`

  Result: `Hide`



**F28:** `=ROUND(F26*F27,0)`

  Result: `50000000`



**A29:** `=$A$23`

  Result: `Hide`



**F29:** `=ROUND(10%,3)`

  Result: `0.1`



**A30:** `=$A$23`

  Result: `Hide`



**F30:** `=ROUND(F28*F29,0)`

  Result: `5000000`



**A31:** `=$A$23`

  Result: `Hide`



**F31:** `=ROUND(IF(D21="Yes",75%,0),3)`

  Result: ``



**A32:** `=$A$23`

  Result: `Hide`



**F32:** `=ROUND(F30*F31,0)`

  Result: ``



**A33:** `=$A$23`

  Result: `Hide`



**F33:** `=F5`

  Result: `0.1`



**H33:** `=$H$5`

  Result: `From 10-k`



**A34:** `=$A$23`

  Result: `Hide`



**F34:** `=ROUND(F32*F33,0)`

  Result: ``



**D36:** `=IF(C36="",IF(SUM(Misc!$C$121:$FM$121)>0,"Yes","No"),C36)`

  Result: `No`



**A40:** `=IF(D36="Yes","Show","hide")`

  Result: `hide`



**A41:** `=$A$40`

  Result: `hide`



**F41:** `=ROUND(99.7%,5)`

  Result: `0.997`



**A42:** `=$A$40`

  Result: `hide`



**F42:** `=ROUND(365*24*(1-F41),1)`

  Result: `26.3`



**A43:** `=IF(AND(D36="Yes",AND('Initial Screens'!C13="VCF 9",'Initial Screens'!D21>0%)),"Show","hide")`

  Result: `hide`



**A44:** `=$A$43`

  Result: `hide`



**F44:** `=IF($A$43="Show",90%*(0.8*Misc!E136+0.2*Misc!E137),0%)`

  Result: ``



**A45:** `=$A$43`

  Result: `hide`



**F45:** `=IF($A$43="Show",5%,0%)`

  Result: ``



**A46:** `=$A$43`

  Result: `hide`



**F46:** `=F42*F45*F6*F8*F44`

  Result: ``



**A47:** `=IF(AND(D36="Yes",OR('Initial Screens'!D21>0%,'Initial Screens'!D29="Yes",'Initial Screens'!D26="Yes")),"Show","hide")`

  Result: `hide`



**A48:** `=IF(AND(D36="Yes",OR('Initial Screens'!D22>0%,'Initial Screens'!D30="Yes",'Initial Screens'!D27="Yes")),"Show","hide")`

  Result: `hide`



**F48:** `=IF($A$47="Show",10%,0%)`

  Result: ``



**A49:** `=IF(AND(D36="Yes",OR('Initial Screens'!D23>0%,'Initial Screens'!D31="Yes",'Initial Screens'!D28="Yes")),"Show","hide")`

  Result: `hide`



**F49:** `=IF('Initial Screens'!C8="Government",ROUND(F6*F8,0),ROUND(F4*F5/(365*24)*F48*F42,0))`

  Result: ``



**H49:** `=IF('Initial Screens'!C8="Government","Estimate based on 'Number of employees' times 'Average fully burdened employee cost per hour (modeled with IT cost per hour)' ","Estimate based on 'Annual revenue' times 'Operating margin' divided by number of hours in a year (24 x 365)")`

  Result: `Estimate based on 'Annual revenue' times 'Operating margin' divided by number of hours in a year (24 x 365)`



**A50:** `=$A$40`

  Result: `hide`



**F50:** `=IF(D36="Yes",SUM(F46,F49*F42),0)`

  Result: ``



**A51:** `=$A$40`

  Result: `hide`



**A52:** `=$A$40`

  Result: `hide`



**F52:** `=ROUND(IF(D36="Yes",MIN(70%,SUMPRODUCT(Misc!C121:H121,Misc!C124:H124)),0),2)`

  Result: ``



**A53:** `=$A$40`

  Result: `hide`



**F53:** `=F50*(1-F52)`

  Result: ``



**A54:** `=$A$40`

  Result: `hide`



**F54:** `=F50-F53`

  Result: ``



**D56:** `=IF(C56="",IF(SUM(Misc!$C$122:$F$122)>0,"Yes","No"),C56)`

  Result: `No`



**F61:** `=ROUND(Benchmarks!D91,0)`

  Result: `11660000`



**F62:** `=ROUND(1/3,3)`

  Result: `0.333`



**H62:** `="Chance of a significant breach in next "&FIXED(1/F62,1)&" years"`

  Result: `Chance of a significant breach in next 3.0 years`



**F63:** `=ROUND(F61*F62,0)`

  Result: `3882780`



**F64:** `=ROUND(IF(D56="Yes",SUM(Misc!C122:F122),0),3)`

  Result: ``



**F65:** `=ROUND(F63*F64,0)`

  Result: ``



**D68:** `=IF(C68="",IF(SUM(Misc!$C$123:$F$123)>0,"Yes","No"),C68)`

  Result: `No`



**F73:** `=ROUND(F113,0)`

  Result: `10313813`



**F74:** `=ROUND(1/3,3)`

  Result: `0.333`



**H74:** `="Chance of a significant breach in next "&FIXED(1/F74,1)&" years"`

  Result: `Chance of a significant breach in next 3.0 years`



**F75:** `=ROUND(F73*F74,0)`

  Result: `3434500`



**F76:** `=IF(D68="Yes",ROUND(SUM(Misc!C123:F123),3),0)`

  Result: ``



**F77:** `=ROUND(F75*F76,0)`

  Result: ``



**F82:** `=ROUND(24*7,0)`

  Result: `168`



**F84:** `=SUM(F87,F92)`

  Result: `6075888`



**F86:** `=IF('Initial Screens'!C8="Government",ROUND(F6*F8,0),ROUND(F4*F5/(365*24),0))`

  Result: `11416`



**H86:** `=IF('Initial Screens'!C8="Government","Estimate based on 'Number of employees' times 'Average fully burdened employee cost per hour (modeled with IT cost per hour)' ","Estimate based on 'Annual revenue' times 'Operating margin' divided by number of hours in a year (24 x 365)")`

  Result: `Estimate based on 'Annual revenue' times 'Operating margin' divided by number of hours in a year (24 x 365)`



**F87:** `=ROUND(F86*F82,0)`

  Result: `1917888`



**F89:** `=ROUND(0.3,2)`

  Result: `0.3`



**F90:** `=IF('Initial Screens'!C9="AMER",100,IF('Initial Screens'!C9="Latam",35,65))`

  Result: `100`



**F91:** `=ROUND(0.33,2)`

  Result: `0.33`



**F92:** `=F6*F89*F90*F91*F82`

  Result: `4158000`



**F94:** `=SUM(F98,F102)`

  Result: `709800`



**F96:** `=ROUND('Excel Output'!D22/500,2)`

  Result: `10`



**F98:** `=F96*F97*F82`

  Result: `546000`



**F100:** `=ROUND('Excel Output'!D22/500,2)`

  Result: `10`



**F101:** `=ROUND(F8,2)`

  Result: `97.5`



**F102:** `=F101*F100*F82`

  Result: `163800`



**F104:** `=SUM(F108,F110,F111)`

  Result: `3528125`



**F106:** `=ROUND(228125,0)`

  Result: `228125`



**F107:** `=250000`

  Result: `250000`



**F108:** `=SUM(F106:F107)`

  Result: `478125`



**F110:** `=ROUND(3%*F4*F5,0)`

  Result: `3000000`



**F111:** `=ROUND(0.05%*F4*F5,0)`

  Result: `50000`



**F113:** `=SUM(F84,F94,F104)`

  Result: `10313813`




### ROI Results Formulas (816)

**B3:** `=TODAY()`

  Result: `2025-11-21 00:00:00`



**B8:** `=AnalysisTerm&"-Year Net Present Value (NPV)"`

  Result: `10-Year Net Present Value (NPV)`



**E8:** `=ROUND(NPV(I7,F47:K47)+E47,0)`

  Result: `31216461`



**I8:** `=5%`

  Result: `0.05`



**B9:** `=AnalysisTerm&"-Year Return on Investment (ROI)"`

  Result: `10-Year Return on Investment (ROI)`



**E9:** `=ROUND(O47/O46,2)`

  Result: `9.75`



**I9:** `=3%`

  Result: `0.03`



**E10:** `=ROUND(O115,0)&" Months"`

  Result: `12 Months`



**E11:** `=E8/(AnalysisTerm*12)`

  Result: `260137.175`



**H12:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I12:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**H13:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**I13:** `=IF(AnalysisTerm>4,"Year 5","")`

  Result: `Year 5`



**J13:** `=IF(AnalysisTerm>5,6,"")`

  Result: `6`



**K13:** `=IF(AnalysisTerm>6,7,"")`

  Result: `7`



**L13:** `=IF(AnalysisTerm>7,8,"")`

  Result: `8`



**M13:** `=IF(AnalysisTerm>7,9,"")`

  Result: `9`



**N13:** `=IF(AnalysisTerm>7,10,"")`

  Result: `10`



**E14:** `=SUM(E$21:E$31)`

  Result: `4145663.169064967`



**F14:** `=SUM(F$21:F$31)`

  Result: `5136305.7762625255`



**G14:** `=SUM(G$21:G$31)`

  Result: `6130376.51954169`



**H14:** `=SUM(H$21:H$31)`

  Result: `7258904.915476759`



**I14:** `=SUM(I$21:I$31)`

  Result: `8537413.954671783`



**J14:** `=SUM(J$21:J$31)`

  Result: `10144328.336846305`



**K14:** `=SUM(K$21:K$31)`

  Result: `11819983.494178925`



**L14:** `=SUM(L$21:L$31)`

  Result: `13571308.784821332`



**M14:** `=SUM(M$21:M$31)`

  Result: `15697158.687699223`



**N14:** `=SUM(N$21:N$31)`

  Result: `18086367.801710308`



**O14:** `=ROUND(SUM(E14:N14),0)`

  Result: `100527811`



**E15:** `=ROUND(SUM(E$37:E$41),0)`

  Result: `2750000`



**F15:** `=ROUND(SUM(F$37:F$41),0)`

  Result: `1650000`



**G15:** `=ROUND(SUM(G$37:G$41),0)`

  Result: `1650000`



**H15:** `=ROUND(SUM(H$37:H$41),0)`

  Result: `1650000`



**I15:** `=ROUND(SUM(I$37:I$41),0)`

  Result: `1650000`



**J15:** `=ROUND(SUM(J$37:J$41),0)`

  Result: ``



**K15:** `=ROUND(SUM(K$37:K$41),0)`

  Result: ``



**L15:** `=ROUND(SUM(L$37:L$41),0)`

  Result: ``



**M15:** `=ROUND(SUM(M$37:M$41),0)`

  Result: ``



**N15:** `=ROUND(SUM(N$37:N$41),0)`

  Result: ``



**O15:** `=ROUND(SUM(E15:N15),0)`

  Result: `9350000`



**E16:** `=ROUND(E14-E15,0)`

  Result: `1395663`



**F16:** `=ROUND(F14-F15,0)`

  Result: `3486306`



**G16:** `=ROUND(G14-G15,0)`

  Result: `4480377`



**H16:** `=ROUND(H14-H15,0)`

  Result: `5608905`



**I16:** `=ROUND(I14-I15,0)`

  Result: `6887414`



**J16:** `=ROUND(J14-J15,0)`

  Result: `10144328`



**K16:** `=ROUND(K14-K15,0)`

  Result: `11819983`



**O16:** `=ROUND(O14-O15,0)`

  Result: `91177811`



**H19:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I19:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**J19:** `=IF(AnalysisTerm<=5,"hide column","show column")`

  Result: `show column`



**K19:** `=IF(AnalysisTerm<=5,"hide column","show column")`

  Result: `show column`



**H20:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**I20:** `=IF(AnalysisTerm>4,"Year 5","")`

  Result: `Year 5`



**J20:** `=$J$13`

  Result: `6`



**K20:** `=K$13`

  Result: `7`



**L20:** `=L$13`

  Result: `8`



**M20:** `=M$13`

  Result: `9`



**N20:** `=N$13`

  Result: `10`



**B21:** `='ROI Results'!B56`

  Result: `Compute`



**E21:** `='ROI Results'!E71-'ROI Results'!E85`

  Result: `1870202.4849999999`



**F21:** `='ROI Results'!F71-'ROI Results'!F85`

  Result: `2114761.8166175005`



**G21:** `='ROI Results'!G71-'ROI Results'!G85`

  Result: `2390410.4085632865`



**H21:** `=IF(AnalysisTerm>3,'ROI Results'!H71-'ROI Results'!H85,"")`

  Result: `2700700.8393023503`



**I21:** `=IF(AnalysisTerm>3,'ROI Results'!I71-'ROI Results'!I85,"")`

  Result: `3049561.538547626`



**J21:** `=IF(AnalysisTerm>5,'ROI Results'!J71-'ROI Results'!J85,"")`

  Result: `3441334.5524070016`



**K21:** `=IF(AnalysisTerm>5,'ROI Results'!K71-'ROI Results'!K85,"")`

  Result: `3880816.970706634`



**L21:** `=IF(AnalysisTerm>7,'ROI Results'!L71-'ROI Results'!L85,"")`

  Result: `4373306.362668281`



**M21:** `=IF(AnalysisTerm>7,'ROI Results'!M71-'ROI Results'!M85,"")`

  Result: `4924650.599223211`



**N21:** `=IF(AnalysisTerm>7,'ROI Results'!N71-'ROI Results'!N85,"")`

  Result: `5541302.475283181`



**O21:** `=ROUND(SUM(E21:N21),0)`

  Result: `34287048`



**B22:** `='ROI Results'!B57`

  Result: `Storage`



**E22:** `='ROI Results'!E72-'ROI Results'!E86`

  Result: `959281.4955`



**F22:** `='ROI Results'!F72-'ROI Results'!F86`

  Result: `1061769.3978164997`



**G22:** `='ROI Results'!G72-'ROI Results'!G86`

  Result: `1176505.8134884047`



**H22:** `=IF(AnalysisTerm>3,'ROI Results'!H72-'ROI Results'!H86,"")`

  Result: `1304863.9431072215`



**I22:** `=IF(AnalysisTerm>3,'ROI Results'!I72-'ROI Results'!I86,"")`

  Result: `1448361.1845685535`



**J22:** `=IF(AnalysisTerm>5,'ROI Results'!J72-'ROI Results'!J86,"")`

  Result: `1608673.5677898964`



**K22:** `=IF(AnalysisTerm>5,'ROI Results'!K72-'ROI Results'!K86,"")`

  Result: `1787651.5860438761`



**L22:** `=IF(AnalysisTerm>7,'ROI Results'!L72-'ROI Results'!L86,"")`

  Result: `1987337.555722728`



**M22:** `=IF(AnalysisTerm>7,'ROI Results'!M72-'ROI Results'!M86,"")`

  Result: `2209984.6485606185`



**N22:** `=IF(AnalysisTerm>7,'ROI Results'!N72-'ROI Results'!N86,"")`

  Result: `2458077.753665831`



**O22:** `=ROUND(SUM(E22:N22),0)`

  Result: `16002507`



**B23:** `='ROI Results'!B58`

  Result: `Network`



**E23:** `='ROI Results'!E73-'ROI Results'!E87`

  Result: `187432.91099999996`



**F23:** `='ROI Results'!F73-'ROI Results'!F87`

  Result: `211751.63649299997`



**G23:** `='ROI Results'!G73-'ROI Results'!G87`

  Result: `239155.34848826932`



**H23:** `=IF(AnalysisTerm>3,'ROI Results'!H73-'ROI Results'!H87,"")`

  Result: `269996.3490462717`



**I23:** `=IF(AnalysisTerm>3,'ROI Results'!I73-'ROI Results'!I87,"")`

  Result: `304664.2036211826`



**J23:** `=IF(AnalysisTerm>5,'ROI Results'!J73-'ROI Results'!J87,"")`

  Result: `343589.4847979842`



**K23:** `=IF(AnalysisTerm>5,'ROI Results'!K73-'ROI Results'!K87,"")`

  Result: `387247.87904240517`



**L23:** `=IF(AnalysisTerm>7,'ROI Results'!L73-'ROI Results'!L87,"")`

  Result: `436164.69077683805`



**M23:** `=IF(AnalysisTerm>7,'ROI Results'!M73-'ROI Results'!M87,"")`

  Result: `490919.78127749346`



**N23:** `=IF(AnalysisTerm>7,'ROI Results'!N73-'ROI Results'!N87,"")`

  Result: `552152.983360864`



**O23:** `=ROUND(SUM(E23:N23),0)`

  Result: `3423075`



**B24:** `='ROI Results'!B59`

  Result: `Software`



**E24:** `='ROI Results'!E74-'ROI Results'!E88+E37`

  Result: `361859.19999999995`



**F24:** `='ROI Results'!F74-'ROI Results'!F88+F37`

  Result: `386859.19999999995`



**G24:** `='ROI Results'!G74-'ROI Results'!G88+G37`

  Result: `413109.19999999995`



**H24:** `=IF(AnalysisTerm>3,'ROI Results'!H74-'ROI Results'!H88+H37,"")`

  Result: `440671.7000000002`



**I24:** `=IF(AnalysisTerm>3,'ROI Results'!I74-'ROI Results'!I88+I37,"")`

  Result: `469612.32499999995`



**J24:** `=IF(AnalysisTerm>5,'ROI Results'!J74-'ROI Results'!J88+J37,"")`

  Result: `499999.9812500001`



**K24:** `=IF(AnalysisTerm>5,'ROI Results'!K74-'ROI Results'!K88+K37,"")`

  Result: `531907.0203125`



**L24:** `=IF(AnalysisTerm>7,'ROI Results'!L74-'ROI Results'!L88,"")`

  Result: `565409.411328125`



**M24:** `=IF(AnalysisTerm>7,'ROI Results'!M74-'ROI Results'!M88,"")`

  Result: `600586.9218945312`



**N24:** `=IF(AnalysisTerm>7,'ROI Results'!N74-'ROI Results'!N88,"")`

  Result: `637523.3079892579`



**O24:** `=ROUND(SUM(E24:N24),0)`

  Result: `4907538`



**B25:** `='ROI Results'!B60`

  Result: `Facilities`



**E25:** `='ROI Results'!E75-'ROI Results'!E89`

  Result: `168911.1644999995`



**F25:** `='ROI Results'!F75-'ROI Results'!F89`

  Result: `365354.84881349886`



**G25:** `='ROI Results'!G75-'ROI Results'!G89`

  Result: `592696.9034876996`



**H25:** `=IF(AnalysisTerm>3,'ROI Results'!H75-'ROI Results'!H89,"")`

  Result: `854668.9348292635`



**I25:** `=IF(AnalysisTerm>3,'ROI Results'!I75-'ROI Results'!I89,"")`

  Result: `1155405.5662723104`



**J25:** `=IF(AnalysisTerm>5,'ROI Results'!J75-'ROI Results'!J89,"")`

  Result: `1574459.6111036148`



**K25:** `=IF(AnalysisTerm>5,'ROI Results'!K75-'ROI Results'!K89,"")`

  Result: `1986574.4143099864`



**L25:** `=IF(AnalysisTerm>7,'ROI Results'!L75-'ROI Results'!L89,"")`

  Result: `2455405.9760871427`



**M25:** `=IF(AnalysisTerm>7,'ROI Results'!M75-'ROI Results'!M89,"")`

  Result: `2987461.7585305255`



**N25:** `=IF(AnalysisTerm>7,'ROI Results'!N75-'ROI Results'!N89,"")`

  Result: `3589933.2131675156`



**O25:** `=ROUND(SUM(E25:N25),0)`

  Result: `15730872`



**B26:** `='ROI Results'!B61`

  Result: `Labor`



**E26:** `='ROI Results'!E76-'ROI Results'!E90`

  Result: `215210.28806496877`



**F26:** `='ROI Results'!F76-'ROI Results'!F90`

  Result: `465499.85308452696`



**G26:** `='ROI Results'!G76-'ROI Results'!G90`

  Result: `755157.1366663733`



**H26:** `=IF(AnalysisTerm>3,'ROI Results'!H76-'ROI Results'!H90,"")`

  Result: `1088936.5910729123`



**I26:** `=IF(AnalysisTerm>3,'ROI Results'!I76-'ROI Results'!I90,"")`

  Result: `1472106.1540566934`



**J26:** `=IF(AnalysisTerm>5,'ROI Results'!J76-'ROI Results'!J90,"")`

  Result: `2006024.3350715134`



**K26:** `=IF(AnalysisTerm>5,'ROI Results'!K76-'ROI Results'!K90,"")`

  Result: `2531101.2047764836`



**L26:** `=IF(AnalysisTerm>7,'ROI Results'!L76-'ROI Results'!L90,"")`

  Result: `3128441.089103733`



**M26:** `=IF(AnalysisTerm>7,'ROI Results'!M76-'ROI Results'!M90,"")`

  Result: `3806335.1675988995`



**N26:** `=IF(AnalysisTerm>7,'ROI Results'!N76-'ROI Results'!N90,"")`

  Result: `4573946.093064677`



**O26:** `=ROUND(SUM(E26:N26),0)`

  Result: `20042758`



**B27:** `='ROI Results'!B62`

  Result: `Support`



**E27:** `='ROI Results'!E77`

  Result: `125000`



**F27:** `='ROI Results'!F77`

  Result: `125000`



**G27:** `='ROI Results'!G77`

  Result: `125000`



**H27:** `=IF(AnalysisTerm>3,'ROI Results'!H77,"")`

  Result: `125000`



**I27:** `=IF(AnalysisTerm>3,'ROI Results'!I77,"")`

  Result: `125000`



**J27:** `=IF(AnalysisTerm>5,'ROI Results'!J77,"")`

  Result: `125000`



**K27:** `=IF(AnalysisTerm>5,'ROI Results'!K77,"")`

  Result: `125000`



**L27:** `=IF(AnalysisTerm>7,'ROI Results'!L77-'ROI Results'!L91,"")`

  Result: `-12500`



**M27:** `=IF(AnalysisTerm>7,'ROI Results'!M77-'ROI Results'!M91,"")`

  Result: `-12500`



**N27:** `=IF(AnalysisTerm>7,'ROI Results'!N77-'ROI Results'!N91,"")`

  Result: `-12500`



**O27:** `=ROUND(SUM(E27:N27),0)`

  Result: `837500`



**B28:** `='ROI Results'!B63`

  Result: `Migration`



**E28:** `='ROI Results'!E78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!E92,0)`

  Result: `374765.62499999994`



**F28:** `='ROI Results'!F78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!F92,0)`

  Result: `405309.0234375`



**G28:** `='ROI Results'!G78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!G92,0)`

  Result: `438341.70884765626`



**H28:** `=IF(AnalysisTerm>3,'ROI Results'!H78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!H92,0),"")`

  Result: `474066.5581187403`



**I28:** `=IF(AnalysisTerm>3,'ROI Results'!I78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!I92,0),"")`

  Result: `512702.9826054175`



**J28:** `=IF(AnalysisTerm>5,'ROI Results'!J78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!J92,0),"")`

  Result: `545246.8044262964`



**K28:** `=IF(AnalysisTerm>5,'ROI Results'!K78-IF('Migration - Reskilling'!$F$14>$O$38,'ROI Results'!K92,0),"")`

  Result: `589684.4189870394`



**L28:** `=IF(AnalysisTerm>7,'ROI Results'!L78-'ROI Results'!L92,"")`

  Result: `637743.6991344832`



**M28:** `=IF(AnalysisTerm>7,'ROI Results'!M78-'ROI Results'!M92,"")`

  Result: `689719.8106139435`



**N28:** `=IF(AnalysisTerm>7,'ROI Results'!N78-'ROI Results'!N92,"")`

  Result: `745931.97517898`



**O28:** `=ROUND(SUM(E28:N28),0)`

  Result: `5413513`



**B29:** `='ROI Results'!B64`

  Result: `One-time Reskilling`



**E29:** `='ROI Results'!E79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!E93,0)`

  Result: `-117000`



**F29:** `='ROI Results'!F79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!F93,0)`

  Result: ``



**G29:** `='ROI Results'!G79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!G93,0)`

  Result: ``



**H29:** `=IF(AnalysisTerm>3,'ROI Results'!H79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!H93,0),"")`

  Result: ``



**I29:** `=IF(AnalysisTerm>3,'ROI Results'!I79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!I93,0),"")`

  Result: ``



**J29:** `=IF(AnalysisTerm>5,'ROI Results'!J79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!J93,0),"")`

  Result: ``



**K29:** `=IF(AnalysisTerm>5,'ROI Results'!K79-IF('Migration - Reskilling'!$F$29>$O$39,'ROI Results'!K93,0),"")`

  Result: ``



**L29:** `=IF(AnalysisTerm>7,'ROI Results'!L79-'ROI Results'!L93,"")`

  Result: ``



**M29:** `=IF(AnalysisTerm>7,'ROI Results'!M79-'ROI Results'!M93,"")`

  Result: ``



**N29:** `=IF(AnalysisTerm>7,'ROI Results'!N79-'ROI Results'!N93,"")`

  Result: ``



**O29:** `=ROUND(SUM(E29:N29),0)`

  Result: `-117000`



**B30:** `='ROI Results'!B65`

  Result: `Revenue Impact`



**E30:** `='ROI Results'!E94`

  Result: ``



**F30:** `='ROI Results'!F94`

  Result: ``



**G30:** `='ROI Results'!G94`

  Result: ``



**H30:** `='ROI Results'!H94`

  Result: ``



**I30:** `='ROI Results'!I94`

  Result: ``



**J30:** `='ROI Results'!J94`

  Result: ``



**K30:** `='ROI Results'!K94`

  Result: ``



**L30:** `='ROI Results'!L94`

  Result: ``



**M30:** `='ROI Results'!M94`

  Result: ``



**N30:** `='ROI Results'!N94`

  Result: ``



**O30:** `=ROUND(SUM(E30:N30),0)`

  Result: ``



**B31:** `='ROI Results'!B66`

  Result: `Risk Reduction`



**E31:** `='ROI Results'!E95`

  Result: ``



**F31:** `='ROI Results'!F95`

  Result: ``



**G31:** `='ROI Results'!G95`

  Result: ``



**H31:** `='ROI Results'!H95`

  Result: ``



**I31:** `='ROI Results'!I95`

  Result: ``



**J31:** `='ROI Results'!J95`

  Result: ``



**K31:** `='ROI Results'!K95`

  Result: ``



**L31:** `='ROI Results'!L95`

  Result: ``



**M31:** `='ROI Results'!M95`

  Result: ``



**N31:** `='ROI Results'!N95`

  Result: ``



**O31:** `=ROUND(SUM(E31:N31),0)`

  Result: ``



**E32:** `=ROUND(SUM(E21:E31),0)`

  Result: `4145663`



**F32:** `=ROUND(SUM(F21:F31),0)`

  Result: `5136306`



**G32:** `=ROUND(SUM(G21:G31),0)`

  Result: `6130377`



**H32:** `=ROUND(SUM(H21:H31),0)`

  Result: `7258905`



**I32:** `=ROUND(SUM(I21:I31),0)`

  Result: `8537414`



**J32:** `=ROUND(SUM(J21:J31),0)`

  Result: `10144328`



**K32:** `=ROUND(SUM(K21:K31),0)`

  Result: `11819983`



**L32:** `=ROUND(SUM(L21:L31),0)`

  Result: `13571309`



**M32:** `=ROUND(SUM(M21:M31),0)`

  Result: `15697159`



**N32:** `=ROUND(SUM(N21:N31),0)`

  Result: `18086368`



**O32:** `=SUM(O21:O31)`

  Result: `100527811`



**B34:** `="Estimated VCF discount (to be used in competitive comparison)"`

  Result: `Estimated VCF discount (to be used in competitive comparison)`



**H35:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I35:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**J35:** `=IF(AnalysisTerm<=5,"hide column","show column")`

  Result: `show column`



**K35:** `=IF(AnalysisTerm<=5,"hide column","show column")`

  Result: `show column`



**L35:** `=IF(AnalysisTerm<=7,"hide column","show column")`

  Result: `show column`



**M35:** `=IF(AnalysisTerm<=7,"hide column","show column")`

  Result: `show column`



**N35:** `=IF(AnalysisTerm<=7,"hide column","show column")`

  Result: `show column`



**B36:** `=InvestmentBVA!B9`

  Result: `Estimated Investment `



**H36:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**I36:** `=IF(AnalysisTerm>4,"Year 5","")`

  Result: `Year 5`



**J36:** `=$J$13`

  Result: `6`



**K36:** `=K$13`

  Result: `7`



**L36:** `=L$13`

  Result: `8`



**M36:** `=M$13`

  Result: `9`



**N36:** `=N$13`

  Result: `10`



**O37:** `=ROUND(SUM(E37:N37),0)`

  Result: `7500000`



**O38:** `=ROUND(SUM(E38:N38),0)`

  Result: `1000000`



**O39:** `=ROUND(SUM(E39:N39),0)`

  Result: `100000`



**O40:** `=ROUND(SUM(E40:N40),0)`

  Result: `750000`



**O41:** `=ROUND(SUM(E41:N41),0)`

  Result: ``



**E42:** `=SUM(E37:E41)`

  Result: `2750000`



**F42:** `=SUM(F37:F41)`

  Result: `1650000`



**G42:** `=SUM(G37:G41)`

  Result: `1650000`



**H42:** `=IF(AnalysisTerm>3,SUM(H37:H41),0)`

  Result: `1650000`



**I42:** `=IF(AnalysisTerm>4,SUM(I37:I41),0)`

  Result: `1650000`



**J42:** `=IF(AnalysisTerm>5,SUM(J37:J41),0)`

  Result: ``



**K42:** `=IF(AnalysisTerm>6,SUM(K37:K41),0)`

  Result: ``



**L42:** `=IF(AnalysisTerm>6,SUM(L37:L41),0)`

  Result: ``



**M42:** `=IF(AnalysisTerm>6,SUM(M37:M41),0)`

  Result: ``



**N42:** `=IF(AnalysisTerm>6,SUM(N37:N41),0)`

  Result: ``



**O42:** `=SUM(O37:O41)`

  Result: `9350000`



**H43:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I43:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**J43:** `=IF(AnalysisTerm<=5,"hide column","show column")`

  Result: `show column`



**K43:** `=IF(AnalysisTerm<=5,"hide column","show column")`

  Result: `show column`



**L43:** `=$L$35`

  Result: `show column`



**M43:** `=$L$35`

  Result: `show column`



**N43:** `=$L$35`

  Result: `show column`



**H44:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**I44:** `=IF(AnalysisTerm>4,"Year 5","")`

  Result: `Year 5`



**J44:** `=$J$13`

  Result: `6`



**K44:** `=K$13`

  Result: `7`



**L44:** `=L$13`

  Result: `8`



**M44:** `=M$13`

  Result: `9`



**N44:** `=N$13`

  Result: `10`



**B45:** `=B20`

  Result: `Gross Benefits`



**E45:** `=E32`

  Result: `4145663`



**F45:** `=F32`

  Result: `5136306`



**G45:** `=G32`

  Result: `6130377`



**H45:** `=IF(AnalysisTerm>3,H32,0)`

  Result: `7258905`



**I45:** `=IF(AnalysisTerm>4,I32,0)`

  Result: `8537414`



**J45:** `=IF(AnalysisTerm>5,J32,0)`

  Result: `10144328`



**K45:** `=IF(AnalysisTerm>6,K32,0)`

  Result: `11819983`



**L45:** `=IF(AnalysisTerm>7,L32,0)`

  Result: `13571309`



**M45:** `=IF(AnalysisTerm>7,M32,0)`

  Result: `15697159`



**N45:** `=IF(AnalysisTerm>7,N32,0)`

  Result: `18086368`



**O45:** `=SUM(E45:N45)`

  Result: `100527812`



**B46:** `=B36`

  Result: `Estimated Investment `



**E46:** `=E42`

  Result: `2750000`



**F46:** `=F42`

  Result: `1650000`



**G46:** `=G42`

  Result: `1650000`



**H46:** `=IF(AnalysisTerm>3,H42,0)`

  Result: `1650000`



**I46:** `=IF(AnalysisTerm>4,I42,0)`

  Result: `1650000`



**J46:** `=IF(AnalysisTerm>5,J42,0)`

  Result: ``



**K46:** `=IF(AnalysisTerm>6,K42,0)`

  Result: ``



**L46:** `=IF(AnalysisTerm>6,L42,0)`

  Result: ``



**M46:** `=IF(AnalysisTerm>6,M42,0)`

  Result: ``



**N46:** `=IF(AnalysisTerm>6,N42,0)`

  Result: ``



**O46:** `=SUM(E46:N46)`

  Result: `9350000`



**E47:** `=E45-E46`

  Result: `1395663`



**F47:** `=F45-F46`

  Result: `3486306`



**G47:** `=G45-G46`

  Result: `4480377`



**H47:** `=IF(AnalysisTerm>3,H45-H46,"")`

  Result: `5608905`



**I47:** `=IF(AnalysisTerm>4,I45-I46,"")`

  Result: `6887414`



**J47:** `=IF(AnalysisTerm>5,J45-J46,"")`

  Result: `10144328`



**K47:** `=IF(AnalysisTerm>6,K45-K46,"")`

  Result: `11819983`



**L47:** `=IF(AnalysisTerm>6,L45-L46,"")`

  Result: `13571309`



**M47:** `=IF(AnalysisTerm>6,M45-M46,"")`

  Result: `15697159`



**N47:** `=IF(AnalysisTerm>6,N45-N46,"")`

  Result: `18086368`



**O47:** `=O45-O46`

  Result: `91177812`



**E53:** `<openpyxl.worksheet.formula.ArrayFormula object at 0x000001FF593AB380>`

  Result: `5`



**F53:** `=1/E53`

  Result: `0.2`



**H54:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I54:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**J54:** `=J43`

  Result: `show column`



**K54:** `=K43`

  Result: `show column`



**L54:** `=L43`

  Result: `show column`



**M54:** `=M43`

  Result: `show column`



**N54:** `=N43`

  Result: `show column`



**H55:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**I55:** `=IF(AnalysisTerm>3,"Year 5","")`

  Result: `Year 5`



**J55:** `=$J$13`

  Result: `6`



**K55:** `=K$13`

  Result: `7`



**L55:** `=L$13`

  Result: `8`



**M55:** `=M$13`

  Result: `9`



**N55:** `=N$13`

  Result: `10`



**E56:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F56:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G56:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H56:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I56:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J56:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K56:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L56:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M56:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N56:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O56:** `=ROUND(SUM(E56:K56),0)`

  Result: `1`



**E57:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F57:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G57:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H57:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I57:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J57:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K57:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L57:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M57:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N57:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O57:** `=ROUND(SUM(E57:K57),0)`

  Result: `1`



**E58:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F58:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G58:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H58:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I58:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J58:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K58:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L58:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M58:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N58:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O58:** `=ROUND(SUM(E58:K58),0)`

  Result: `1`



**E59:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F59:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G59:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H59:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I59:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J59:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K59:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L59:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M59:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N59:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O59:** `=ROUND(SUM(E59:K59),0)`

  Result: `1`



**E60:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F60:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G60:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H60:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I60:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J60:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K60:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L60:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M60:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N60:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O60:** `=ROUND(SUM(E60:K60),0)`

  Result: `1`



**E61:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F61:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G61:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H61:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I61:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J61:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K61:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L61:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M61:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N61:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O61:** `=ROUND(SUM(E61:K61),0)`

  Result: `1`



**O62:** `=ROUND(SUM(E62:K62),0)`

  Result: `1`



**E63:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F63:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**G63:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**H63:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**I63:** `=IF(AnalysisTerm>3,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**J63:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**K63:** `=IF(AnalysisTerm>5,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**L63:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**M63:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**N63:** `=IF(AnalysisTerm>7,ROUND(1/AnalysisTerm,3),"")`

  Result: `0.1`



**O63:** `=ROUND(SUM(E63:K63),0)`

  Result: `1`



**O64:** `=ROUND(SUM(E64:K64),0)`

  Result: `1`



**E66:** `=ROUND(1/AnalysisTerm,3)`

  Result: `0.1`



**F66:** `=ROUND(2/AnalysisTerm,3)`

  Result: `0.2`



**G66:** `=ROUND(3/AnalysisTerm,3)`

  Result: `0.3`



**H66:** `=IF(AnalysisTerm>3,ROUND(4/AnalysisTerm,3),"")`

  Result: `0.4`



**I66:** `=IF(AnalysisTerm>3,ROUND(5/AnalysisTerm,3),"")`

  Result: `0.5`



**J66:** `=IF(AnalysisTerm>5,ROUND(6/AnalysisTerm,3),"")`

  Result: `0.6`



**K66:** `=IF(AnalysisTerm>5,ROUND(7/AnalysisTerm,3),"")`

  Result: `0.7`



**L66:** `=IF(AnalysisTerm>7,ROUND(8/AnalysisTerm,3),"")`

  Result: `0.8`



**M66:** `=IF(AnalysisTerm>7,ROUND(9/AnalysisTerm,3),"")`

  Result: `0.9`



**N66:** `=IF(AnalysisTerm>7,ROUND(10/AnalysisTerm,3),"")`

  Result: `1`



**H69:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I69:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**J69:** `=J$54`

  Result: `show column`



**K69:** `=K$54`

  Result: `show column`



**L69:** `=L$54`

  Result: `show column`



**M69:** `=M$54`

  Result: `show column`



**N69:** `=N$54`

  Result: `show column`



**H70:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**I70:** `=IF(AnalysisTerm>3,5,"")`

  Result: `5`



**J70:** `=$J$13`

  Result: `6`



**K70:** `=K$13`

  Result: `7`



**L70:** `=L$13`

  Result: `8`



**M70:** `=M$13`

  Result: `9`



**N70:** `=N$13`

  Result: `10`



**B71:** `=B56`

  Result: `Compute`



**C71:** `=Compute!F12/(1+AnalysisTerm*Compute!F11)+Compute!F76/(1+AnalysisTerm*Compute!F75)+Compute!F96+Compute!F126/(1+AnalysisTerm*Compute!F125)`

  Result: `10475000`



**D71:** `=Compute!F12/(1+AnalysisTerm*Compute!F11)*AnalysisTerm*Compute!F11+Compute!F76/(1+AnalysisTerm*Compute!F75)*AnalysisTerm*Compute!F75+Compute!F96*Compute!F99*AnalysisTerm+Compute!F126/(1+AnalysisTerm*Compute!F125)*AnalysisTerm`

  Result: `19750000`



**E71:** `=(Hardware_Refreshcylce+Growth)*$C71+$D71/AnalysisTerm*(1+Growth)`

  Result: `4692500`



**F71:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*$C71+$D71/AnalysisTerm*(1+Growth)^2)*(1+Inflation)^1`

  Result: `4967046.25`



**G71:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*$C71+$D71/AnalysisTerm*(1+Growth)^3)*(1+Inflation)^2`

  Result: `5260731.244375001`



**H71:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*$C71+$D71/AnalysisTerm*(1+Growth)^4)*(1+Inflation)^3,"")`

  Result: `5575017.68754156`



**I71:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*$C71+$D71/AnalysisTerm*(1+Growth)^5)*(1+Inflation)^4,"")`

  Result: `5911484.581228701`



**J71:** `=IF(AnalysisTerm>$I$70,((Hardware_Refreshcylce+(1+Growth)^J$70-(1+Growth)^I$70)*$C71+$D71/AnalysisTerm*(1+Growth)^J$70)*(1+Inflation)^I$70,"")`

  Result: `6271836.61531591`



**K71:** `=IF(AnalysisTerm>$I$70,((Hardware_Refreshcylce+(1+Growth)^K$70-(1+Growth)^J$70)*$C71+$D71/AnalysisTerm*(1+Growth)^K$70)*(1+Inflation)^J$70,"")`

  Result: `6657914.321402751`



**L71:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^L$70-(1+Growth)^K$70)*$C71+$D71/AnalysisTerm*(1+Growth)^L$70)*(1+Inflation)^K$70,"")`

  Result: `7071705.051193815`



**M71:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^M$70-(1+Growth)^L$70)*$C71+$D71/AnalysisTerm*(1+Growth)^M$70)*(1+Inflation)^L$70,"")`

  Result: `7515354.84684076`



**N71:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^N$70-(1+Growth)^M$70)*$C71+$D71/AnalysisTerm*(1+Growth)^N$70)*(1+Inflation)^M$70,"")`

  Result: `7991181.275852168`



**O71:** `=SUM(E71:N71)`

  Result: `61914771.87375067`



**B72:** `=B57`

  Result: `Storage`



**C72:** `=Storage!F21/(1+AnalysisTerm*Storage!F20)+Compute!F97`

  Result: `4785714`



**D72:** `=Storage!F21/(1+AnalysisTerm*Storage!F20)*AnalysisTerm*Storage!F20+Compute!F97*Compute!F99*AnalysisTerm`

  Result: `7178571`



**E72:** `=(Hardware_Refreshcylce+Growth)*$C72+$D72/AnalysisTerm*(1+Growth)`

  Result: `1950178.455`



**F72:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*$C72+$D72/AnalysisTerm*(1+Growth)^2)*(1+Inflation)^1`

  Result: `2059825.1448825`



**G72:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*$C72+$D72/AnalysisTerm*(1+Growth)^3)*(1+Inflation)^2`

  Result: `2176929.254364424`



**H72:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*$C72+$D72/AnalysisTerm*(1+Growth)^4)*(1+Inflation)^3,"")`

  Result: `2302054.1995743434`



**I72:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*$C72+$D72/AnalysisTerm*(1+Growth)^5)*(1+Inflation)^4,"")`

  Result: `2435807.98414825`



**J72:** `=IF(AnalysisTerm>$I$70,((Hardware_Refreshcylce+(1+Growth)^J$70-(1+Growth)^I$70)*$C72+$D72/AnalysisTerm*(1+Growth)^J$70)*(1+Inflation)^I$70,"")`

  Result: `2578846.793184186`



**K72:** `=IF(AnalysisTerm>$I$70,((Hardware_Refreshcylce+(1+Growth)^K$70-(1+Growth)^J$70)*$C72+$D72/AnalysisTerm*(1+Growth)^K$70)*(1+Inflation)^J$70,"")`

  Result: `2731878.878906389`



**L72:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^L$70-(1+Growth)^K$70)*$C72+$D72/AnalysisTerm*(1+Growth)^L$70)*(1+Inflation)^K$70,"")`

  Result: `2895668.7617772785`



**M72:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^M$70-(1+Growth)^L$70)*$C72+$D72/AnalysisTerm*(1+Growth)^M$70)*(1+Inflation)^L$70,"")`

  Result: `3071041.7727293493`



**N72:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^N$70-(1+Growth)^M$70)*$C72+$D72/AnalysisTerm*(1+Growth)^N$70)*(1+Inflation)^M$70,"")`

  Result: `3258888.964280029`



**O72:** `=SUM(E72:N72)`

  Result: `25461120.208846748`



**B73:** `=B58`

  Result: `Network`



**C73:** `=Network!F11/(1+AnalysisTerm*Network!F10)+Network!F29/(1+AnalysisTerm*Network!F28)+Network!F51/(1+AnalysisTerm*Network!F50)+Compute!F98+Compute!F127/(1+AnalysisTerm*Compute!F125)`

  Result: `1047500`



**D73:** `=Network!F11/(1+AnalysisTerm*Network!F10)*AnalysisTerm*Network!F10+Network!F29/(1+AnalysisTerm*Network!F28)*AnalysisTerm*Network!F28+Network!F51/(1+AnalysisTerm*Network!F50)*AnalysisTerm*Network!F50+Compute!F98*Compute!F99*AnalysisTerm+Compute!F128/(1+AnalysisTerm*Compute!F125)*AnalysisTerm`

  Result: `1958432`



**E73:** `=(Hardware_Refreshcylce+Growth)*$C73+$D73/AnalysisTerm*(1+Growth)`

  Result: `467510.36`



**F73:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*$C73+$D73/AnalysisTerm*(1+Growth)^2)*(1+Inflation)^1`

  Result: `494823.20434`



**G73:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*$C73+$D73/AnalysisTerm*(1+Growth)^3)*(1+Inflation)^2`

  Result: `524038.36799371004`



**H73:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*$C73+$D73/AnalysisTerm*(1+Growth)^4)*(1+Inflation)^3,"")`

  Result: `555301.1796601972`



**I73:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*$C73+$D73/AnalysisTerm*(1+Growth)^5)*(1+Inflation)^4,"")`

  Result: `588768.5210177536`



**J73:** `=IF(AnalysisTerm>$I$70,((Hardware_Refreshcylce+(1+Growth)^J$70-(1+Growth)^I$70)*$C73+$D73/AnalysisTerm*(1+Growth)^J$70)*(1+Inflation)^I$70,"")`

  Result: `624609.7595524074`



**K73:** `=IF(AnalysisTerm>$I$70,((Hardware_Refreshcylce+(1+Growth)^K$70-(1+Growth)^J$70)*$C73+$D73/AnalysisTerm*(1+Growth)^K$70)*(1+Inflation)^J$70,"")`

  Result: `663007.7571497881`



**L73:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^L$70-(1+Growth)^K$70)*$C73+$D73/AnalysisTerm*(1+Growth)^L$70)*(1+Inflation)^K$70,"")`

  Result: `704159.9606171697`



**M73:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^M$70-(1+Growth)^L$70)*$C73+$D73/AnalysisTerm*(1+Growth)^M$70)*(1+Inflation)^L$70,"")`

  Result: `748279.5808049341`



**N73:** `=IF(AnalysisTerm>$K$70,((Hardware_Refreshcylce+(1+Growth)^N$70-(1+Growth)^M$70)*$C73+$D73/AnalysisTerm*(1+Growth)^N$70)*(1+Inflation)^M$70,"")`

  Result: `795596.8675399249`



**O73:** `=SUM(E73:N73)`

  Result: `6166095.558675885`



**B74:** `=B59`

  Result: `Software`



**D74:** `=Software!F7+Software!F18+Software!F30`

  Result: `2762815.625`



**E74:** `=Software!$F$5+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)`

  Result: `500000`



**F74:** `=Software!$F$5*(1+Software!$F$6)+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^2*(1+Inflation)^1`

  Result: `525000`



**G74:** `=Software!$F$5*(1+Software!$F$6)^2+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^3*(1+Inflation)^2`

  Result: `551250`



**H74:** `=IF(AnalysisTerm>3,Software!$F$5*(1+Software!$F$6)^3+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^4*(1+Inflation)^3,"")`

  Result: `578812.5000000001`



**I74:** `=IF(AnalysisTerm>3,Software!$F$5*(1+Software!$F$6)^4+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^5*(1+Inflation)^4,"")`

  Result: `607753.125`



**J74:** `=IF(AnalysisTerm>$I$70,Software!$F$5*(1+Software!$F$6)^I$70+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^J$70*(1+Inflation)^I$70,"")`

  Result: `638140.7812500001`



**K74:** `=IF(AnalysisTerm>$I$70,Software!$F$5*(1+Software!$F$6)^J$70+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^K$70*(1+Inflation)^J$70,"")`

  Result: `670047.8203125`



**L74:** `=IF(AnalysisTerm>$K$70,Software!$F$5*(1+Software!$F$6)^K$70+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^L$70*(1+Inflation)^K$70,"")`

  Result: `703550.2113281251`



**M74:** `=IF(AnalysisTerm>$K$70,Software!$F$5*(1+Software!$F$6)^L$70+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^M$70*(1+Inflation)^L$70,"")`

  Result: `738727.7218945313`



**N74:** `=IF(AnalysisTerm>$K$70,Software!$F$5*(1+Software!$F$6)^M$70+(Software!$F$18+Software!$F$30)/AnalysisTerm*(1+Growth)^N$70*(1+Inflation)^M$70,"")`

  Result: `775664.1079892579`



**O74:** `=SUM(E74:N74)`

  Result: `6288946.267774414`



**B75:** `=B60`

  Result: `Facilities`



**D75:** `=Facilities!F13+Compute!F128`

  Result: `24242608`



**E75:** `=$D75/AnalysisTerm*(1+Growth/2)`

  Result: `2484867.3199999994`



**F75:** `=$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)*(1+Inflation)^1`

  Result: `2687384.0065799993`



**G75:** `=$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^2*(1+Inflation)^2`

  Result: `2906405.803116269`



**H75:** `=IF(AnalysisTerm>3,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^3*(1+Inflation)^3,"")`

  Result: `3143277.8760702456`



**I75:** `=IF(AnalysisTerm>3,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^4*(1+Inflation)^4,"")`

  Result: `3399455.02296997`



**J75:** `=IF(AnalysisTerm>$I$70,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^J$70*(1+Inflation)^I$70,"")`

  Result: `3860336.137709123`



**K75:** `=IF(AnalysisTerm>$I$70,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^K$70*(1+Inflation)^J$70,"")`

  Result: `4174953.532932418`



**L75:** `=IF(AnalysisTerm>$K$70,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^L$70*(1+Inflation)^K$70,"")`

  Result: `4515212.2458664095`



**M75:** `=IF(AnalysisTerm>$K$70,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^M$70*(1+Inflation)^L$70,"")`

  Result: `4883202.0439045215`



**N75:** `=IF(AnalysisTerm>$K$70,$D75/AnalysisTerm*(1+Growth/2)*(1+Growth)^N$70*(1+Inflation)^M$70,"")`

  Result: `5281183.010482741`



**O75:** `=SUM(E75:N75)`

  Result: `37336276.9996317`



**B76:** `=B61`

  Result: `Labor`



**D76:** `=Labor!F127`

  Result: `44760534.97175`



**E76:** `=$D76/AnalysisTerm*(1+Growth/2)`

  Result: `4587954.834604374`



**F76:** `=$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)*(1+Inflation)^1`

  Result: `4961873.1536246305`



**G76:** `=$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^2*(1+Inflation)^2`

  Result: `5366265.815645037`



**H76:** `=IF(AnalysisTerm>3,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^3*(1+Inflation)^3,"")`

  Result: `5803616.479620109`



**I76:** `=IF(AnalysisTerm>3,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^4*(1+Inflation)^4,"")`

  Result: `6276611.222709147`



**J76:** `=IF(AnalysisTerm>$I$70,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^J$70*(1+Inflation)^I$70,"")`

  Result: `7127562.789227939`



**K76:** `=IF(AnalysisTerm>$I$70,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^K$70*(1+Inflation)^J$70,"")`

  Result: `7708459.156550018`



**L76:** `=IF(AnalysisTerm>$K$70,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^L$70*(1+Inflation)^K$70,"")`

  Result: `8336698.577808844`



**M76:** `=IF(AnalysisTerm>$K$70,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^M$70*(1+Inflation)^L$70,"")`

  Result: `9016139.511900265`



**N76:** `=IF(AnalysisTerm>$K$70,$D76/AnalysisTerm*(1+Growth/2)*(1+Growth)^N$70*(1+Inflation)^M$70,"")`

  Result: `9750954.882120136`



**O76:** `=SUM(E76:N76)`

  Result: `68936136.4238105`



**B77:** `=B62`

  Result: `Support`



**D77:** `=Support!F7`

  Result: `1250000`



**E77:** `=$D77/AnalysisTerm`

  Result: `125000`



**F77:** `=$D77/AnalysisTerm`

  Result: `125000`



**G77:** `=$D77/AnalysisTerm`

  Result: `125000`



**H77:** `=IF(AnalysisTerm>3,$D77/AnalysisTerm,"")`

  Result: `125000`



**I77:** `=IF(AnalysisTerm>3,$D77/AnalysisTerm,"")`

  Result: `125000`



**J77:** `=IF(AnalysisTerm>$I$70,$D77/AnalysisTerm,"")`

  Result: `125000`



**K77:** `=IF(AnalysisTerm>$I$70,$D77/AnalysisTerm,"")`

  Result: `125000`



**L77:** `=IF(AnalysisTerm>$K$70,$D77/AnalysisTerm,"")`

  Result: `125000`



**M77:** `=IF(AnalysisTerm>$K$70,$D77/AnalysisTerm,"")`

  Result: `125000`



**N77:** `=IF(AnalysisTerm>$K$70,$D77/AnalysisTerm,"")`

  Result: `125000`



**O77:** `=SUM(E77:N77)`

  Result: `1250000`



**B78:** `=B63`

  Result: `Migration`



**C78:** `='Migration - Reskilling'!F11`

  Result: `4875000`



**E78:** `=$C78/AnalysisTerm*(1+Growth/2)`

  Result: `499687.49999999994`



**F78:** `=$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)*(1+Inflation)^1`

  Result: `540412.03125`



**G78:** `=$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^2*(1+Inflation)^2`

  Result: `584455.611796875`



**H78:** `=IF(AnalysisTerm>3,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^3*(1+Inflation)^3,"")`

  Result: `632088.7441583204`



**I78:** `=IF(AnalysisTerm>3,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^4*(1+Inflation)^4,"")`

  Result: `683603.9768072233`



**J78:** `=IF(AnalysisTerm>$I$70,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^I$70*(1+Inflation)^I$70,"")`

  Result: `739317.700917012`



**K78:** `=IF(AnalysisTerm>$I$70,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^J$70*(1+Inflation)^J$70,"")`

  Result: `799572.0935417484`



**L78:** `=IF(AnalysisTerm>$K$70,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^K$70*(1+Inflation)^K$70,"")`

  Result: `864737.2191654011`



**M78:** `=IF(AnalysisTerm>$K$70,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^L$70*(1+Inflation)^L$70,"")`

  Result: `935213.3025273811`



**N78:** `=IF(AnalysisTerm>$K$70,$C78/AnalysisTerm*(1+Growth/2)*(1+Growth)^M$70*(1+Inflation)^M$70,"")`

  Result: `1011433.1866833628`



**O78:** `=SUM(E78:N78)`

  Result: `7290521.366847323`



**B79:** `=B64`

  Result: `One-time Reskilling`



**D79:** `='Migration - Reskilling'!F23`

  Result: `39000`



**E79:** `=$D$79*E64`

  Result: `39000`



**F79:** `=$D$79*F64`

  Result: ``



**G79:** `=$D$79*G64`

  Result: ``



**H79:** `=IF(AnalysisTerm>3,$D$79*H64,"")`

  Result: ``



**I79:** `=IF(AnalysisTerm>3,$D$79*I64,"")`

  Result: ``



**J79:** `=IF(AnalysisTerm>$I$70,$D$79*J64,"")`

  Result: ``



**K79:** `=IF(AnalysisTerm>$I$70,$D$79*K64,"")`

  Result: ``



**L79:** `=IF(AnalysisTerm>$K$70,$D$79*L64,"")`

  Result: ``



**M79:** `=IF(AnalysisTerm>$K$70,$D$79*M64,"")`

  Result: ``



**N79:** `=IF(AnalysisTerm>$K$70,$D$79*N64,"")`

  Result: ``



**O79:** `=SUM(E79:N79)`

  Result: `39000`



**B80:** `=B65`

  Result: `Revenue Impact`



**H80:** `=IF(AnalysisTerm>3,"n/a","")`

  Result: `n/a`



**I80:** `=IF(AnalysisTerm>3,"n/a","")`

  Result: `n/a`



**J80:** `=IF(AnalysisTerm>5,"n/a","")`

  Result: `n/a`



**K80:** `=IF(AnalysisTerm>5,"n/a","")`

  Result: `n/a`



**L80:** `=IF(AnalysisTerm>7,"n/a","")`

  Result: `n/a`



**M80:** `=IF(AnalysisTerm>7,"n/a","")`

  Result: `n/a`



**N80:** `=IF(AnalysisTerm>7,"n/a","")`

  Result: `n/a`



**O80:** `=IF(AnalysisTerm>5,"n/a","")`

  Result: `n/a`



**B81:** `=B66`

  Result: `Risk Reduction`



**H81:** `=IF(AnalysisTerm>3,"n/a","")`

  Result: `n/a`



**I81:** `=IF(AnalysisTerm>3,"n/a","")`

  Result: `n/a`



**J81:** `=IF(AnalysisTerm>5,"n/a","")`

  Result: `n/a`



**K81:** `=IF(AnalysisTerm>5,"n/a","")`

  Result: `n/a`



**L81:** `=IF(AnalysisTerm>7,"n/a","")`

  Result: `n/a`



**M81:** `=IF(AnalysisTerm>7,"n/a","")`

  Result: `n/a`



**N81:** `=IF(AnalysisTerm>7,"n/a","")`

  Result: `n/a`



**O81:** `=IF(AnalysisTerm>5,"n/a","")`

  Result: `n/a`



**H83:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**I83:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**J83:** `=J$54`

  Result: `show column`



**K83:** `=K$54`

  Result: `show column`



**L83:** `=L$54`

  Result: `show column`



**M83:** `=M$54`

  Result: `show column`



**N83:** `=N$54`

  Result: `show column`



**H84:** `=IF(AnalysisTerm>3,4,"")`

  Result: `4`



**I84:** `=IF(AnalysisTerm>3,5,"")`

  Result: `5`



**J84:** `=$J$13`

  Result: `6`



**K84:** `=K$13`

  Result: `7`



**L84:** `=L$13`

  Result: `8`



**M84:** `=M$13`

  Result: `9`



**N84:** `=N$13`

  Result: `10`



**B85:** `=B56`

  Result: `Compute`



**C85:** `=Compute!F24/(1+AnalysisTerm*Compute!F23)+Compute!F86/(1+AnalysisTerm*Compute!F85)+Compute!F108+Compute!F135*(1+AnalysisTerm*Compute!F125)`

  Result: `3596987.5`



**D85:** `=Compute!F24/(1+AnalysisTerm*Compute!F23)*AnalysisTerm*Compute!F23+Compute!F86/(1+AnalysisTerm*Compute!F85)*AnalysisTerm*Compute!F85+Compute!F108*AnalysisTerm*Compute!F111+Compute!F135/(1+AnalysisTerm*Compute!F125)*AnalysisTerm`

  Result: `5397680`



**E85:** `=(Hardware_Refreshcylce+Growth)*$C85+MIN(SUM($E56:E56),1)*$D85*(1+Growth)/AnalysisTerm+(1-MIN(SUM($E56:E56),1))*$D71*(1+Growth)/AnalysisTerm`

  Result: `2822297.515`



**F85:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*$C85+MIN(SUM($E56:F56),1)*$D85*(1+Growth)^2/AnalysisTerm+(1-MIN(SUM($E56:F56),1))*$D71*(1+Growth)^2/AnalysisTerm)*(1+Inflation)^1`

  Result: `2852284.4333824995`



**G85:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*$C85+MIN(SUM($E56:G56),1)*$D85*(1+Growth)^3/AnalysisTerm+(1-MIN(SUM($E56:G56),1))*$D71*(1+Growth)^3/AnalysisTerm)*(1+Inflation)^2`

  Result: `2870320.835811714`



**H85:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*$C85+MIN(SUM($E56:H56),1)*$D85*(1+Growth)^4/AnalysisTerm+(1-MIN(SUM($E56:H56),1))*$D71*(1+Growth)^4/AnalysisTerm)*(1+Inflation)^3,"")`

  Result: `2874316.84823921`



**I85:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*$C85+MIN(SUM($E56:I56),1)*$D85*(1+Growth)^5/AnalysisTerm+(1-MIN(SUM($E56:I56),1))*$D71*(1+Growth)^5/AnalysisTerm)*(1+Inflation)^4,"")`

  Result: `2861923.042681075`



**J85:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^J$84-(1+Growth)^I$84)*$C85+MIN(SUM($E56:J56),1)*$D85*(1+Growth)^J$84/AnalysisTerm+(1-MIN(SUM($E56:J56),1))*$D71*(1+Growth)^J$84/AnalysisTerm)*(1+Inflation)^I$84,"")`

  Result: `2830502.062908909`



**K85:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^K$84-(1+Growth)^J$84)*$C85+MIN(SUM($E56:K56),1)*$D85*(1+Growth)^K$84/AnalysisTerm+(1-MIN(SUM($E56:K56),1))*$D71*(1+Growth)^K$84/AnalysisTerm)*(1+Inflation)^J$84,"")`

  Result: `2777097.3506961167`



**L85:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^L$84-(1+Growth)^K$84)*$C85+MIN(SUM($E56:L56),1)*$D85*(1+Growth)^L$84/AnalysisTerm+(1-MIN(SUM($E56:L56),1))*$D71*(1+Growth)^L$84/AnalysisTerm)*(1+Inflation)^K$84,"")`

  Result: `2698398.688525533`



**M85:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^M$84-(1+Growth)^L$84)*$C85+MIN(SUM($E56:M56),1)*$D85*(1+Growth)^M$84/AnalysisTerm+(1-MIN(SUM($E56:M56),1))*$D71*(1+Growth)^M$84/AnalysisTerm)*(1+Inflation)^L$84,"")`

  Result: `2590704.2476175483`



**N85:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^N$84-(1+Growth)^M$84)*$C85+MIN(SUM($E56:N56),1)*$D85*(1+Growth)^N$84/AnalysisTerm+(1-MIN(SUM($E56:N56),1))*$D71*(1+Growth)^N$84/AnalysisTerm)*(1+Inflation)^M$84,"")`

  Result: `2449878.800568987`



**O85:** `=SUM(E85:N85)`

  Result: `27627723.82543159`



**B86:** `=B57`

  Result: `Storage`



**C86:** `=Storage!F34/(1+AnalysisTerm*Storage!F33)+Compute!F109`

  Result: `1176000`



**D86:** `=Storage!F34/(1+AnalysisTerm*Storage!F33)*AnalysisTerm*Storage!F33+Compute!F109*AnalysisTerm*Compute!F111`

  Result: `1764000`



**E86:** `=(Hardware_Refreshcylce+Growth)*$C86+MIN(SUM($E57:E57),1)*$D86*(1+Growth)/AnalysisTerm+(1-MIN(SUM($E57:E57),1))*$D72*(1+Growth)/AnalysisTerm`

  Result: `990896.9595000001`



**F86:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*$C86+MIN(SUM($E57:F57),1)*$D86*(1+Growth)^2/AnalysisTerm+(1-MIN(SUM($E57:F57),1))*$D72*(1+Growth)^2/AnalysisTerm)*(1+Inflation)^1`

  Result: `998055.7470660001`



**G86:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*$C86+MIN(SUM($E57:G57),1)*$D86*(1+Growth)^3/AnalysisTerm+(1-MIN(SUM($E57:G57),1))*$D72*(1+Growth)^3/AnalysisTerm)*(1+Inflation)^2`

  Result: `1000423.4408760191`



**H86:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*$C86+MIN(SUM($E57:H57),1)*$D86*(1+Growth)^4/AnalysisTerm+(1-MIN(SUM($E57:H57),1))*$D72*(1+Growth)^4/AnalysisTerm)*(1+Inflation)^3,"")`

  Result: `997190.2564671219`



**I86:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*$C86+MIN(SUM($E57:I57),1)*$D86*(1+Growth)^5/AnalysisTerm+(1-MIN(SUM($E57:I57),1))*$D72*(1+Growth)^5/AnalysisTerm)*(1+Inflation)^4,"")`

  Result: `987446.7995796965`



**J86:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^J$84-(1+Growth)^I$84)*$C86+MIN(SUM($E57:J57),1)*$D86*(1+Growth)^J$84/AnalysisTerm+(1-MIN(SUM($E57:J57),1))*$D72*(1+Growth)^J$84/AnalysisTerm)*(1+Inflation)^I$84,"")`

  Result: `970173.2253942895`



**K86:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^K$84-(1+Growth)^J$84)*$C86+MIN(SUM($E57:K57),1)*$D86*(1+Growth)^K$84/AnalysisTerm+(1-MIN(SUM($E57:K57),1))*$D72*(1+Growth)^K$84/AnalysisTerm)*(1+Inflation)^J$84,"")`

  Result: `944227.2928625131`



**L86:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^L$84-(1+Growth)^K$84)*$C86+MIN(SUM($E57:L57),1)*$D86*(1+Growth)^L$84/AnalysisTerm+(1-MIN(SUM($E57:L57),1))*$D72*(1+Growth)^L$84/AnalysisTerm)*(1+Inflation)^K$84,"")`

  Result: `908331.2060545505`



**M86:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^M$84-(1+Growth)^L$84)*$C86+MIN(SUM($E57:M57),1)*$D86*(1+Growth)^M$84/AnalysisTerm+(1-MIN(SUM($E57:M57),1))*$D72*(1+Growth)^M$84/AnalysisTerm)*(1+Inflation)^L$84,"")`

  Result: `861057.1241687309`



**N86:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^N$84-(1+Growth)^M$84)*$C86+MIN(SUM($E57:N57),1)*$D86*(1+Growth)^N$84/AnalysisTerm+(1-MIN(SUM($E57:N57),1))*$D72*(1+Growth)^N$84/AnalysisTerm)*(1+Inflation)^M$84,"")`

  Result: `800811.2106141978`



**O86:** `=SUM(E86:N86)`

  Result: `9458613.26258312`



**B87:** `=B58`

  Result: `Network`



**C87:** `=Network!F19/(1+AnalysisTerm*Network!F18)+Network!F34/(1+AnalysisTerm*Network!F33)+Network!F56/(1+AnalysisTerm*Network!F55)+Compute!F110`

  Result: `357500`



**D87:** `=Network!F19/(1+AnalysisTerm*Network!F18)*AnalysisTerm*Network!F18+Network!F34/(1+AnalysisTerm*Network!F33)*AnalysisTerm*Network!F33+Network!F56/(1+AnalysisTerm*Network!F55)*AnalysisTerm*Network!F55+Compute!F110*AnalysisTerm*Compute!F111`

  Result: `536250`



**E87:** `=(Hardware_Refreshcylce+Growth)*$C87+MIN(SUM($E58:E58),1)*$D87*(1+Growth)/AnalysisTerm+(1-MIN(SUM($E58:E58),1))*$D73*(1+Growth)/AnalysisTerm`

  Result: `280077.449`



**F87:** `=((Hardware_Refreshcylce+(1+Growth)^2-(1+Growth))*$C87+MIN(SUM($E58:F58),1)*$D87*(1+Growth)^2/AnalysisTerm+(1-MIN(SUM($E58:F58),1))*$D73*(1+Growth)^2/AnalysisTerm)*(1+Inflation)^1`

  Result: `283071.567847`



**G87:** `=((Hardware_Refreshcylce+(1+Growth)^3-(1+Growth)^2)*$C87+MIN(SUM($E58:G58),1)*$D87*(1+Growth)^3/AnalysisTerm+(1-MIN(SUM($E58:G58),1))*$D73*(1+Growth)^3/AnalysisTerm)*(1+Inflation)^2`

  Result: `284883.0195054407`



**H87:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^4-(1+Growth)^3)*$C87+MIN(SUM($E58:H58),1)*$D87*(1+Growth)^4/AnalysisTerm+(1-MIN(SUM($E58:H58),1))*$D73*(1+Growth)^4/AnalysisTerm)*(1+Inflation)^3,"")`

  Result: `285304.83061392553`



**I87:** `=IF(AnalysisTerm>3,((Hardware_Refreshcylce+(1+Growth)^5-(1+Growth)^4)*$C87+MIN(SUM($E58:I58),1)*$D87*(1+Growth)^5/AnalysisTerm+(1-MIN(SUM($E58:I58),1))*$D73*(1+Growth)^5/AnalysisTerm)*(1+Inflation)^4,"")`

  Result: `284104.31739657104`



**J87:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^J$84-(1+Growth)^I$84)*$C87+MIN(SUM($E58:J58),1)*$D87*(1+Growth)^J$84/AnalysisTerm+(1-MIN(SUM($E58:J58),1))*$D73*(1+Growth)^J$84/AnalysisTerm)*(1+Inflation)^I$84,"")`

  Result: `281020.27475442324`



**K87:** `=IF(AnalysisTerm>5,((Hardware_Refreshcylce+(1+Growth)^K$84-(1+Growth)^J$84)*$C87+MIN(SUM($E58:K58),1)*$D87*(1+Growth)^K$84/AnalysisTerm+(1-MIN(SUM($E58:K58),1))*$D73*(1+Growth)^K$84/AnalysisTerm)*(1+Inflation)^J$84,"")`

  Result: `275759.8781073829`



**L87:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^L$84-(1+Growth)^K$84)*$C87+MIN(SUM($E58:L58),1)*$D87*(1+Growth)^L$84/AnalysisTerm+(1-MIN(SUM($E58:L58),1))*$D73*(1+Growth)^L$84/AnalysisTerm)*(1+Inflation)^K$84,"")`

  Result: `267995.2698403317`



**M87:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^M$84-(1+Growth)^L$84)*$C87+MIN(SUM($E58:M58),1)*$D87*(1+Growth)^M$84/AnalysisTerm+(1-MIN(SUM($E58:M58),1))*$D73*(1+Growth)^M$84/AnalysisTerm)*(1+Inflation)^L$84,"")`

  Result: `257359.79952744071`



**N87:** `=IF(AnalysisTerm>$K$84,((Hardware_Refreshcylce+(1+Growth)^N$84-(1+Growth)^M$84)*$C87+MIN(SUM($E58:N58),1)*$D87*(1+Growth)^N$84/AnalysisTerm+(1-MIN(SUM($E58:N58),1))*$D73*(1+Growth)^N$84/AnalysisTerm)*(1+Inflation)^M$84,"")`

  Result: `243443.88417906096`



**O87:** `=SUM(E87:N87)`

  Result: `2743020.2907715766`



**B88:** `=B59`

  Result: `Software`



**D88:** `='ROI Results'!O37+Software!F21+Software!F34+Software!F10`

  Result: `8881408`



**E88:** `='ROI Results'!E37+(MIN(SUM($E59:E59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:E59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)+Software!$F$10/AnalysisTerm`

  Result: `1638140.8`



**F88:** `='ROI Results'!F37+(MIN(SUM($E59:F59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:F59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^2*(1+Inflation)^1+Software!$F$10/AnalysisTerm`

  Result: `1638140.8`



**G88:** `='ROI Results'!G37+(MIN(SUM($E59:G59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:G59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^3*(1+Inflation)^2+Software!$F$10/AnalysisTerm`

  Result: `1638140.8`



**H88:** `=IF(AnalysisTerm>3,'ROI Results'!H37+(MIN(SUM($E59:H59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:H59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^4*(1+Inflation)^3+Software!$F$10/AnalysisTerm,"")`

  Result: `1638140.8`



**I88:** `=IF(AnalysisTerm>3,'ROI Results'!I37+(MIN(SUM($E59:I59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:I59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^5*(1+Inflation)^4+Software!$F$10/AnalysisTerm,"")`

  Result: `1638140.8`



**J88:** `=IF(AnalysisTerm>5,'ROI Results'!J37+(MIN(SUM($E59:J59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:J59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^J$84*(1+Inflation)^I$84+Software!$F$10/AnalysisTerm,"")`

  Result: `138140.8`



**K88:** `=IF(AnalysisTerm>5,'ROI Results'!K37+(MIN(SUM($E59:K59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:K59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^K$84*(1+Inflation)^J$84+Software!$F$10/AnalysisTerm,"")`

  Result: `138140.8`



**L88:** `=IF(AnalysisTerm>$K$84,'ROI Results'!L37+(MIN(SUM($E59:L59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:L59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^L$84*(1+Inflation)^K$84+Software!$F$10/AnalysisTerm,"")`

  Result: `138140.8`



**M88:** `=IF(AnalysisTerm>$K$84,'ROI Results'!M37+(MIN(SUM($E59:M59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:M59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^M$84*(1+Inflation)^L$84+Software!$F$10/AnalysisTerm,"")`

  Result: `138140.8`



**N88:** `=IF(AnalysisTerm>$K$84,'ROI Results'!N37+(MIN(SUM($E59:N59),1)*(Software!$F$21+Software!$F$34)/AnalysisTerm+(1-MIN(SUM($E59:N59),1))*(Software!$F$18+Software!$F$30)/AnalysisTerm)*(1+Growth)^N$84*(1+Inflation)^M$84+Software!$F$10/AnalysisTerm,"")`

  Result: `138140.8`



**O88:** `=SUM(E88:N88)`

  Result: `8881408.000000002`



**B89:** `=B60`

  Result: `Facilities`



**D89:** `=Facilities!F21`

  Result: `7763470`



**E89:** `=(MIN(SUM($E60:E60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:E60),1))*$D75/AnalysisTerm)*(1+Growth/2)`

  Result: `2315956.1555`



**F89:** `=((MIN(SUM($E60:F60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:F60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth))*(1+Inflation)^1`

  Result: `2322029.1577665005`



**G89:** `=((MIN(SUM($E60:G60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:G60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^2)*(1+Inflation)^2`

  Result: `2313708.8996285694`



**H89:** `=IF(AnalysisTerm>3,((MIN(SUM($E60:H60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:H60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^3)*(1+Inflation)^3,"")`

  Result: `2288608.941240982`



**I89:** `=IF(AnalysisTerm>3,((MIN(SUM($E60:I60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:I60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^4)*(1+Inflation)^4,"")`

  Result: `2244049.4566976596`



**J89:** `=IF(AnalysisTerm>$I$84,((MIN(SUM($E60:J60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:J60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^J$84)*(1+Inflation)^I$84,"")`

  Result: `2285876.5266055083`



**K89:** `=IF(AnalysisTerm>$I$84,((MIN(SUM($E60:K60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:K60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^K$84)*(1+Inflation)^J$84,"")`

  Result: `2188379.1186224315`



**L89:** `=IF(AnalysisTerm>$K$84,((MIN(SUM($E60:L60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:L60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^L$84)*(1+Inflation)^K$84,"")`

  Result: `2059806.2697792666`



**M89:** `=IF(AnalysisTerm>$K$84,((MIN(SUM($E60:M60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:M60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^M$84)*(1+Inflation)^L$84,"")`

  Result: `1895740.285373996`



**N89:** `=IF(AnalysisTerm>$K$84,((MIN(SUM($E60:N60),1)*$D89/AnalysisTerm+(1-MIN(SUM($E60:N60),1))*$D75/AnalysisTerm)*(1+Growth/2)*(1+Growth)^N$84)*(1+Inflation)^M$84,"")`

  Result: `1691249.797315225`



**O89:** `=SUM(E89:N89)`

  Result: `21605404.60853014`



**B90:** `=B61`

  Result: `Labor`



**D90:** `=Labor!F128`

  Result: `23764409.306875`



**E90:** `=(MIN(SUM($E61:E61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:E61),1))*$D76/AnalysisTerm)*(1+Growth/2)`

  Result: `4372744.546539405`



**F90:** `=((MIN(SUM($E61:F61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:F61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth))*(1+Inflation)^1`

  Result: `4496373.300540104`



**G90:** `=((MIN(SUM($E61:G61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:G61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^2)*(1+Inflation)^2`

  Result: `4611108.678978664`



**H90:** `=IF(AnalysisTerm>3,((MIN(SUM($E61:H61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:H61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^3)*(1+Inflation)^3,"")`

  Result: `4714679.888547197`



**I90:** `=IF(AnalysisTerm>3,((MIN(SUM($E61:I61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:I61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^4)*(1+Inflation)^4,"")`

  Result: `4804505.068652454`



**J90:** `=IF(AnalysisTerm>$I$84,((MIN(SUM($E61:J61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:J61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^J$84)*(1+Inflation)^I$84,"")`

  Result: `5121538.454156426`



**K90:** `=IF(AnalysisTerm>$I$84,((MIN(SUM($E61:K61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:K61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^K$84)*(1+Inflation)^J$84,"")`

  Result: `5177357.9517735345`



**L90:** `=IF(AnalysisTerm>$K$84,((MIN(SUM($E61:L61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:L61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^L$84)*(1+Inflation)^K$84,"")`

  Result: `5208257.488705111`



**M90:** `=IF(AnalysisTerm>$K$84,((MIN(SUM($E61:M61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:M61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^M$84)*(1+Inflation)^L$84,"")`

  Result: `5209804.344301365`



**N90:** `=IF(AnalysisTerm>$K$84,((MIN(SUM($E61:N61),1)*$D90/AnalysisTerm+(1-MIN(SUM($E61:N61),1))*$D76/AnalysisTerm)*(1+Growth/2)*(1+Growth)^N$84)*(1+Inflation)^M$84,"")`

  Result: `5177008.789055459`



**O90:** `=SUM(E90:N90)`

  Result: `48893378.51124972`



**B91:** `=B62`

  Result: `Support`



**D91:** `='ROI Results'!O40+Support!F10`

  Result: `1375000`



**E91:** `=MIN(SUM($E62:E62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:E62),1))*$D77/AnalysisTerm`

  Result: `137500`



**F91:** `=MIN(SUM($E62:F62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:F62),1))*$D77/AnalysisTerm`

  Result: `137500`



**G91:** `=MIN(SUM($E62:G62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:G62),1))*$D77/AnalysisTerm`

  Result: `137500`



**H91:** `=IF(AnalysisTerm>3,MIN(SUM($E62:H62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:H62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**I91:** `=IF(AnalysisTerm>3,MIN(SUM($E62:I62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:I62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**J91:** `=IF(AnalysisTerm>5,MIN(SUM($E62:J62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:J62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**K91:** `=IF(AnalysisTerm>5,MIN(SUM($E62:K62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:K62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**L91:** `=IF(AnalysisTerm>$K$84,MIN(SUM($E62:L62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:L62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**M91:** `=IF(AnalysisTerm>$K$84,MIN(SUM($E62:M62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:M62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**N91:** `=IF(AnalysisTerm>$K$84,MIN(SUM($E62:N62),1)*$D91/AnalysisTerm+(1-MIN(SUM($E62:N62),1))*$D77/AnalysisTerm,"")`

  Result: `137500`



**O91:** `=SUM(E91:N91)`

  Result: `1375000`



**B92:** `=B63`

  Result: `Migration`



**C92:** `=MAX('Migration - Reskilling'!F14,O38)`

  Result: `1218750`



**E92:** `=IF('Migration - Reskilling'!$F$14>$O$38,E63*$C92*(1+Growth/2),E38)`

  Result: `124921.87499999999`



**F92:** `=IF('Migration - Reskilling'!$F$14>$O$38,F63*$C92*(1+Growth/2)*(1+Growth)*(1+Inflation)^1,F38)`

  Result: `135103.0078125`



**G92:** `=IF('Migration - Reskilling'!$F$14>$O$38,G63*$C92*(1+Growth/2)*(1+Growth)^2*(1+Inflation)^2,G38)`

  Result: `146113.90294921875`



**H92:** `=IF(AnalysisTerm>3,IF('Migration - Reskilling'!$F$14>$O$38,H63*$C92*(1+Growth/2)*(1+Growth)^3*(1+Inflation)^3,H38),"")`

  Result: `158022.1860395801`



**I92:** `=IF(AnalysisTerm>3,IF('Migration - Reskilling'!$F$14>$O$38,I63*$C92*(1+Growth/2)*(1+Growth)^4*(1+Inflation)^4,I38),"")`

  Result: `170900.99420180582`



**J92:** `=IF(AnalysisTerm>5,IF('Migration - Reskilling'!$F$14>$O$38,J63*$C92*(1+Growth/2)*(1+Growth)^J$84*(1+Inflation)^I$84,J38),"")`

  Result: `194070.89649071562`



**K92:** `=IF(AnalysisTerm>5,IF('Migration - Reskilling'!$F$14>$O$38,K63*$C92*(1+Growth/2)*(1+Growth)^K$84*(1+Inflation)^J$84,K38),"")`

  Result: `209887.674554709`



**L92:** `=IF(AnalysisTerm>7,IF('Migration - Reskilling'!$F$14>$O$38,L63*$C92*(1+Growth/2)*(1+Growth)^L$84*(1+Inflation)^K$84,L38),"")`

  Result: `226993.52003091777`



**M92:** `=IF(AnalysisTerm>7,IF('Migration - Reskilling'!$F$14>$O$38,M63*$C92*(1+Growth/2)*(1+Growth)^M$84*(1+Inflation)^L$84,M38),"")`

  Result: `245493.49191343758`



**N92:** `=IF(AnalysisTerm>7,IF('Migration - Reskilling'!$F$14>$O$38,N63*$C92*(1+Growth/2)*(1+Growth)^N$84*(1+Inflation)^M$84,N38),"")`

  Result: `265501.2115043827`



**O92:** `=SUM(E92:N92)`

  Result: `1877008.7604972676`



**B93:** `=B64`

  Result: `One-time Reskilling`



**D93:** `=MAX('Migration - Reskilling'!F29,O39)`

  Result: `156000`



**E93:** `=IF('Migration - Reskilling'!$F$29>$O$39,$D$93*E64,E39)`

  Result: `156000`



**F93:** `=IF('Migration - Reskilling'!$F$29>$O$39,$D$93*F64,F39)`

  Result: ``



**G93:** `=IF('Migration - Reskilling'!$F$29>$O$39,$D$93*G64,G39)`

  Result: ``



**H93:** `=IF(AnalysisTerm>3,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*H64,H39),"")`

  Result: ``



**I93:** `=IF(AnalysisTerm>3,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*I64,I39),"")`

  Result: ``



**J93:** `=IF(AnalysisTerm>5,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*J64,J39),"")`

  Result: ``



**K93:** `=IF(AnalysisTerm>5,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*K64,K39),"")`

  Result: ``



**L93:** `=IF(AnalysisTerm>$K$84,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*L64,L39),"")`

  Result: ``



**M93:** `=IF(AnalysisTerm>$K$84,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*M64,M39),"")`

  Result: ``



**N93:** `=IF(AnalysisTerm>$K$84,IF('Migration - Reskilling'!$F$29>$O$39,$D$93*N64,N39),"")`

  Result: ``



**O93:** `=SUM(E93:N93)`

  Result: `156000`



**B94:** `=B65`

  Result: `Revenue Impact`



**D94:** `='Business impact'!F19+'Business impact'!F34`

  Result: ``



**E94:** `=$D$94*E65`

  Result: ``



**F94:** `=$D$94*F65`

  Result: ``



**G94:** `=$D$94*G65`

  Result: ``



**H94:** `=IF(AnalysisTerm>3,$D$94*H65,"")`

  Result: ``



**I94:** `=IF(AnalysisTerm>3,$D$94*I65,"")`

  Result: ``



**J94:** `=IF(AnalysisTerm>5,$D$94*J65,"")`

  Result: ``



**K94:** `=IF(AnalysisTerm>5,$D$94*K65,"")`

  Result: ``



**L94:** `=IF(AnalysisTerm>$K$84,$D$94*L65,"")`

  Result: ``



**M94:** `=IF(AnalysisTerm>$K$84,$D$94*M65,"")`

  Result: ``



**N94:** `=IF(AnalysisTerm>$K$84,$D$94*N65,"")`

  Result: ``



**O94:** `=SUM(E94:N94)`

  Result: ``



**B95:** `=B66`

  Result: `Risk Reduction`



**D95:** `='Business impact'!F54+'Business impact'!F65+'Business impact'!F77`

  Result: ``



**E95:** `=$D$95*E66`

  Result: ``



**F95:** `=$D$95*F66`

  Result: ``



**G95:** `=$D$95*G66`

  Result: ``



**H95:** `=IF(AnalysisTerm>3,$D$95*H66,"")`

  Result: ``



**I95:** `=IF(AnalysisTerm>3,$D$95*I66,"")`

  Result: ``



**J95:** `=IF(AnalysisTerm>5,$D$95*J66,"")`

  Result: ``



**K95:** `=IF(AnalysisTerm>5,$D$95*K66,"")`

  Result: ``



**L95:** `=IF(AnalysisTerm>$K$84,$D$95*L66,"")`

  Result: ``



**M95:** `=IF(AnalysisTerm>$K$84,$D$95*M66,"")`

  Result: ``



**N95:** `=IF(AnalysisTerm>$K$84,$D$95*N66,"")`

  Result: ``



**O95:** `=SUM(E95:N95)`

  Result: ``



**I99:** `=IF(AnalysisTerm<=3,"hide column","show column")`

  Result: `show column`



**J99:** `=IF(AnalysisTerm<=4,"hide column","show column")`

  Result: `show column`



**K99:** `=K$54`

  Result: `show column`



**L99:** `=L$54`

  Result: `show column`



**M99:** `=M$54`

  Result: `show column`



**N99:** `=N$54`

  Result: `show column`



**I100:** `=IF(AnalysisTerm>3,"Year 4 (end)","")`

  Result: `Year 4 (end)`



**J100:** `=IF(AnalysisTerm>3,"Year 5 (end)","")`

  Result: `Year 5 (end)`



**K100:** `=IF(AnalysisTerm>5,"Year 6 (end)","")`

  Result: `Year 6 (end)`



**L100:** `=IF(AnalysisTerm>5,"Year 7 (end)","")`

  Result: `Year 7 (end)`



**M100:** `=IF(AnalysisTerm>7,"Year 8 (end)","")`

  Result: `Year 8 (end)`



**N100:** `=IF(AnalysisTerm>7,"Year 9 (end)","")`

  Result: `Year 9 (end)`



**O100:** `=IF(AnalysisTerm>7,"Year 10 (end)","")`

  Result: `Year 10 (end)`



**B101:** `="Total VMs "&IF(Compute!D68="yes","(including P2V)","")`

  Result: `Total VMs (including P2V)`



**E101:** `=VMs`

  Result: `5000`



**F101:** `=VMs*(1-Compute!$F$14)*(1+Growth)^1+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^1,0)*MIN(1,SUM($E$56:E56))`

  Result: `4725`



**G101:** `=VMs*(1-Compute!$F$14)*(1+Growth)^2+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^2,0)*MIN(1,SUM($E$56:F56))`

  Result: `4961.25`



**H101:** `=VMs*(1-Compute!$F$14)*(1+Growth)^3+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^3,0)*MIN(1,SUM($E$56:G56))`

  Result: `5209.312500000001`



**I101:** `=IF(AnalysisTerm>3,VMs*(1-Compute!$F$14)*(1+Growth)^4+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^4,0)*MIN(1,SUM($E$56:H56)),"")`

  Result: `5469.778125`



**J101:** `=IF(AnalysisTerm>3,VMs*(1-Compute!$F$14)*(1+Growth)^5+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^5,0)*MIN(1,SUM($E$56:I56)),"")`

  Result: `5743.26703125`



**K101:** `=IF(AnalysisTerm>5,VMs*(1-Compute!$F$14)*(1+Growth)^6+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^6,0)*MIN(1,SUM($E$56:J56)),"")`

  Result: `6030.4303828125`



**L101:** `=IF(AnalysisTerm>5,VMs*(1-Compute!$F$14)*(1+Growth)^7+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^7,0)*MIN(1,SUM($E$56:K56)),"")`

  Result: `6331.951901953126`



**M101:** `=IF(AnalysisTerm>7,VMs*(1-Compute!$F$14)*(1+Growth)^8+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^8,0)*MIN(1,SUM($E$56:L56)),"")`

  Result: `6648.549497050782`



**N101:** `=IF(AnalysisTerm>7,VMs*(1-Compute!$F$14)*(1+Growth)^9+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^9,0)*MIN(1,SUM($E$56:M56)),"")`

  Result: `6980.976971903321`



**O101:** `=IF(AnalysisTerm>7,VMs*(1-Compute!$F$14)*(1+Growth)^10+IF(Compute!$D$68="Yes",Compute!$F$73*(1+Growth)^10,0)*MIN(1,SUM($E$56:N56)),"")`

  Result: `7330.025820498487`



**B102:** `="VM Hosts - on prem "&IF(Compute!D68="yes","(including P2V hosts)","")`

  Result: `VM Hosts - on prem (including P2V hosts)`



**E102:** `=Hosts`

  Result: `400`



**F102:** `=VMs*(1+Growth)^1*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:E56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:E56))*(1+Growth)^1,0)`

  Result: `328.125`



**G102:** `=VMs*(1+Growth)^2*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:F56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:F56))*(1+Growth)^2,0)`

  Result: `304.37116564417175`



**H102:** `=VMs*(1+Growth)^3*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:G56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:G56))*(1+Growth)^3,0)`

  Result: `286.2259615384616`



**I102:** `=IF(AnalysisTerm>3,VMs*(1+Growth)^4*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:H56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:H56))*(1+Growth)^4,0),"")`

  Result: `272.1282649253731`



**J102:** `=IF(AnalysisTerm>3,VMs*(1+Growth)^5*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:I56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:I56))*(1+Growth)^5,0),"")`

  Result: `261.05759232954546`



**K102:** `=IF(AnalysisTerm>5,VMs*(1+Growth)^6*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:J56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:J56))*(1+Growth)^6,0),"")`

  Result: `252.31926287918412`



**L102:** `=IF(AnalysisTerm>5,VMs*(1+Growth)^7*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:K56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:K56))*(1+Growth)^7,0),"")`

  Result: `245.42449232376458`



**M102:** `=IF(AnalysisTerm>7,VMs*(1+Growth)^8*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:L56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:L56))*(1+Growth)^8,0),"")`

  Result: `240.0198374386564`



**N102:** `=IF(AnalysisTerm>7,VMs*(1+Growth)^9*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:M56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:M56))*(1+Growth)^9,0),"")`

  Result: `235.84381661835542`



**O102:** `=IF(AnalysisTerm>7,VMs*(1+Growth)^10*(1-Compute!$F$14)/ROUND($E$103+(Misc!$C$130-$E$103)*MIN(1,SUM($E$56:N56)),1)+IF(Compute!$D$68="Yes",Misc!$C$131*MIN(1,SUM($E$56:N56))*(1+Growth)^10,0),"")`

  Result: `232.69923239677738`



**B103:** `="Consolidation Ratio - on prem "&IF(Compute!D68="yes","(weighted average with P2V)","")`

  Result: `Consolidation Ratio - on prem (weighted average with P2V)`



**E103:** `=E101/E102`

  Result: `12.5`



**F103:** `=F101/F102`

  Result: `14.4`



**G103:** `=G101/G102`

  Result: `16.3`



**H103:** `=H101/H102`

  Result: `18.2`



**I103:** `=IF(AnalysisTerm>3,I101/I102,"")`

  Result: `20.1`



**J103:** `=IF(AnalysisTerm>3,J101/J102,"")`

  Result: `22`



**K103:** `=IF(AnalysisTerm>5,K101/K102,"")`

  Result: `23.9`



**L103:** `=IF(AnalysisTerm>5,L101/L102,"")`

  Result: `25.8`



**M103:** `=IF(AnalysisTerm>7,M101/M102,"")`

  Result: `27.7`



**N103:** `=IF(AnalysisTerm>7,N101/N102,"")`

  Result: `29.6`



**O103:** `=IF(AnalysisTerm>7,O101/O102,"")`

  Result: `31.499999999999996`



**J107:** `=$J$13`

  Result: `6`



**K107:** `=K$13`

  Result: `7`



**L107:** `=L$13`

  Result: `8`



**M107:** `=M$13`

  Result: `9`



**N107:** `=N$13`

  Result: `10`



**E108:** `=E16`

  Result: `1395663`



**F108:** `=F16+E108`

  Result: `4881969`



**G108:** `=G16+F108`

  Result: `9362346`



**H108:** `=H16+G108`

  Result: `14971251`



**I108:** `=I16+H108`

  Result: `21858665`



**J108:** `=J16+I108`

  Result: `32002993`



**K108:** `=K16+J108`

  Result: `43822976`



**L108:** `=L16+K108`

  Result: `43822976`



**M108:** `=M16+L108`

  Result: `43822976`



**N108:** `=N16+M108`

  Result: `43822976`



**E109:** `=IF(E108<0,0,1)`

  Result: `1`



**F109:** `=IF(F108<0,0,1)`

  Result: `1`



**G109:** `=IF(G108<0,0,1)`

  Result: `1`



**H109:** `=IF(H108<0,0,1)`

  Result: `1`



**I109:** `=IF(I108<0,0,1)`

  Result: `1`



**J109:** `=IF(J108<0,0,1)`

  Result: `1`



**K109:** `=IF(K108<0,0,1)`

  Result: `1`



**L109:** `=IF(L108<0,0,1)`

  Result: `1`



**M109:** `=IF(M108<0,0,1)`

  Result: `1`



**N109:** `=IF(N108<0,0,1)`

  Result: `1`



**E110:** `=IF(E109=1,1,0)`

  Result: `1`



**F110:** `=IF(F109=1,1+E110,0)`

  Result: `2`



**G110:** `=IF(G109=1,1+F110,0)`

  Result: `3`



**H110:** `=IF(H109=1,1+G110,0)`

  Result: `4`



**I110:** `=IF(I109=1,1+H110,0)`

  Result: `5`



**J110:** `=IF(J109=1,1+I110,0)`

  Result: `6`



**K110:** `=IF(K109=1,1+J110,0)`

  Result: `7`



**L110:** `=IF(L109=1,1+K110,0)`

  Result: `8`



**M110:** `=IF(M109=1,1+L110,0)`

  Result: `9`



**N110:** `=IF(N109=1,1+M110,0)`

  Result: `10`



**E111:** `=(1-E108/E32)`

  Result: `0.6633438366794406`



**F111:** `=(1-F108/F32)`

  Result: `0.04951749370072578`



**G111:** `=(1-G108/G32)`

  Result: `-0.5272055862143552`



**H111:** `=(1-H108/H32)`

  Result: `-1.0624668596709834`



**I111:** `=(1-I108/I32)`

  Result: `-1.5603379430820623`



**J111:** `=(1-J108/J32)`

  Result: `-2.1547671762979275`



**K111:** `=(1-K108/K32)`

  Result: `-2.7075329126953904`



**L111:** `=(1-L108/L32)`

  Result: `-2.2290898394546907`



**M111:** `=(1-M108/M32)`

  Result: `-1.7917775439491948`



**N111:** `=(1-N108/N32)`

  Result: `-1.4229837632409117`



**E112:** `=(1-SUMPRODUCT('ROI Results'!E56:E66,'ROI Results'!E21:E31)/'ROI Results'!E32)*12`

  Result: `10.779158893793838`



**E113:** `=(1-E108/E32)*(12-E112)+E112`

  Result: `11.588996317160605`



**F113:** `=(1-F108/F32)*(12-F112)+F112`

  Result: `0.5942099244087093`



**G113:** `=(1-G108/G32)*(12-G112)+G112`

  Result: `-6.3264670345722624`



**H113:** `=(1-H108/H32)*(12-H112)+H112`

  Result: `-12.749602316051801`



**I113:** `=(1-I108/I32)*(12-I112)+I112`

  Result: `-18.724055316984746`



**J113:** `=(1-J108/J32)*(12-J112)+J112`

  Result: `-25.85720611557513`



**K113:** `=(1-K108/K32)*(12-K112)+K112`

  Result: `-32.49039495234469`



**L113:** `=(1-L108/L32)*(12-L112)+L112`

  Result: `-26.74907807345629`



**M113:** `=(1-M108/M32)*(12-M112)+M112`

  Result: `-21.501330527390337`



**N113:** `=(1-N108/N32)*(12-N112)+N112`

  Result: `-17.07580515889094`



**E115:** `=E113`

  Result: `11.588996317160605`



**F115:** `=F113+12`

  Result: `12.594209924408709`



**G115:** `=G113+24`

  Result: `17.67353296542774`



**H115:** `=H113+24`

  Result: `11.250397683948199`



**I115:** `=I113+24`

  Result: `5.275944683015254`



**J115:** `=J113+24`

  Result: `-1.8572061155751314`



**K115:** `=K113+24`

  Result: `-8.490394952344687`



**L115:** `=L113+24`

  Result: `-2.749078073456289`



**M115:** `=M113+24`

  Result: `2.498669472609663`



**N115:** `=N113+24`

  Result: `6.92419484110906`



**O115:** `=HLOOKUP(1,E110:N115,6,FALSE)`

  Result: `11.588996317160605`




### Sustainability Formulas (88)

**B2:** `="Projected Sustainability Benefit Over "&AnalysisTerm&" Years"`

  Result: `Projected Sustainability Benefit Over 10 Years`



**C3:** `=C50`

  Result: `17787.484`



**C4:** `=ROUND(C3*C12,0)`

  Result: `9819`



**C5:** `=ROUNDUP(C4/C18,0)`

  Result: `2116`



**C6:** `=ROUNDUP(C4/C22,0)`

  Result: `163650`



**C10:** `=ROUND(1217.44,2)`

  Result: `1217.44`



**C11:** `=ROUND(2204.6,2)`

  Result: `2204.6`



**C12:** `=ROUND(C10/C11,3)`

  Result: `0.552`



**C14:** `=ROUND(0.994,3)`

  Result: `0.994`



**C15:** `=ROUND(11520,0)`

  Result: `11520`



**C16:** `=ROUND(0.00889,5)`

  Result: `0.00889`



**C17:** `=ROUND(22.2,2)`

  Result: `22.2`



**C18:** `=ROUND(C16*C15/(C14*C17),3)`

  Result: `4.641`



**C20:** `=ROUND(36.4,2)`

  Result: `36.4`



**C21:** `=ROUND((44/12)*1/C11,5)`

  Result: `0.00166`



**C22:** `=ROUND(C20*C21,3)`

  Result: `0.06`



**C26:** `=Facilities!F32`

  Result: `12584`



**C27:** `=Facilities!F33`

  Result: `5808`



**C28:** `=Facilities!F35`

  Result: `5808`



**C29:** `=Facilities!F34`

  Result: `5808`



**C32:** `='Excel Output'!D23`

  Result: `400`



**D32:** `=Facilities!F15`

  Result: `143`



**C33:** `=Compute!F73`

  Result: ``



**C34:** `=Network!F26`

  Result: ``



**D34:** `=Network!F32`

  Result: ``



**C35:** `=Network!F48`

  Result: ``



**D35:** `=Network!F54`

  Result: ``



**C36:** `=SUMPRODUCT(C32:C35,$C$26:$C$29)`

  Result: `5033600`



**D36:** `=SUMPRODUCT(D32:D35,$C$26:$C$29)`

  Result: `1799512`



**F37:** `=IF(AnalysisTerm=3,"Hide","Show")`

  Result: `Show`



**G37:** `=IF(AnalysisTerm=3,"Hide","Show")`

  Result: `Show`



**H37:** `=IF(AnalysisTerm<=5,"hide","show ")`

  Result: `show `



**I37:** `=IF(AnalysisTerm<=5,"hide","show")`

  Result: `show`



**J37:** `=IF(AnalysisTerm<=7,"hide","show")`

  Result: `show`



**K37:** `=IF(AnalysisTerm<=7,"hide","show")`

  Result: `show`



**L37:** `=IF(AnalysisTerm<=7,"hide","show")`

  Result: `show`



**F39:** `=IF(AnalysisTerm>3,"Year 4","")`

  Result: `Year 4`



**G39:** `=IF(AnalysisTerm>3,"Year 5","")`

  Result: `Year 5`



**H39:** `=IF(AnalysisTerm>5,6,"")`

  Result: `6`



**I39:** `=IF(AnalysisTerm>6,7,"")`

  Result: `7`



**J39:** `=IF(AnalysisTerm>7,8,"")`

  Result: `8`



**K39:** `=IF(AnalysisTerm>7,9,"")`

  Result: `9`



**L39:** `=IF(AnalysisTerm>7,10,"")`

  Result: `10`



**C40:** `='ROI Results'!E$56`

  Result: `0.1`



**D40:** `='ROI Results'!F$56`

  Result: `0.1`



**E40:** `='ROI Results'!G$56`

  Result: `0.1`



**F40:** `='ROI Results'!H$56`

  Result: `0.1`



**G40:** `='ROI Results'!I$56`

  Result: `0.1`



**H40:** `='ROI Results'!J$56`

  Result: `0.1`



**I40:** `='ROI Results'!K$56`

  Result: `0.1`



**J40:** `='ROI Results'!L$56`

  Result: `0.1`



**K40:** `='ROI Results'!M$56`

  Result: `0.1`



**L40:** `='ROI Results'!N$56`

  Result: `0.1`



**C41:** `='ROI Results'!E$56`

  Result: `0.1`



**D41:** `='ROI Results'!F$56`

  Result: `0.1`



**E41:** `='ROI Results'!G$56`

  Result: `0.1`



**F41:** `='ROI Results'!H$56`

  Result: `0.1`



**G41:** `='ROI Results'!I$56`

  Result: `0.1`



**H41:** `='ROI Results'!J$56`

  Result: `0.1`



**I41:** `='ROI Results'!K$56`

  Result: `0.1`



**J41:** `='ROI Results'!L$56`

  Result: `0.1`



**K41:** `='ROI Results'!M$56`

  Result: `0.1`



**L41:** `='ROI Results'!N$56`

  Result: `0.1`



**C42:** `='ROI Results'!E$58`

  Result: `0.1`



**D42:** `='ROI Results'!F$58`

  Result: `0.1`



**E42:** `='ROI Results'!G$58`

  Result: `0.1`



**F42:** `='ROI Results'!H$58`

  Result: `0.1`



**G42:** `='ROI Results'!I$58`

  Result: `0.1`



**H42:** `='ROI Results'!J$58`

  Result: `0.1`



**I42:** `='ROI Results'!K$58`

  Result: `0.1`



**J42:** `='ROI Results'!L$58`

  Result: `0.1`



**K42:** `='ROI Results'!M$58`

  Result: `0.1`



**L42:** `='ROI Results'!N$58`

  Result: `0.1`



**C43:** `='ROI Results'!E$58`

  Result: `0.1`



**D43:** `='ROI Results'!F$58`

  Result: `0.1`



**E43:** `='ROI Results'!G$58`

  Result: `0.1`



**F43:** `='ROI Results'!H$58`

  Result: `0.1`



**G43:** `='ROI Results'!I$58`

  Result: `0.1`



**H43:** `='ROI Results'!J$58`

  Result: `0.1`



**I43:** `='ROI Results'!K$58`

  Result: `0.1`



**J43:** `='ROI Results'!L$58`

  Result: `0.1`



**K43:** `='ROI Results'!M$58`

  Result: `0.1`



**L43:** `='ROI Results'!N$58`

  Result: `0.1`



**C46:** `=(C32-D32)*C26*(IF(AnalysisTerm=3,SUMPRODUCT(C40:E40,{3,2,1}),IF(AnalysisTerm=5,SUMPRODUCT(C40:G40,{5,4,3,2,1}),IF(AnalysisTerm=7,SUMPRODUCT(C40:I40,{7,6,5,4,3,2,1}),SUMPRODUCT(C40:L40,{10,9,8,7,6,5,4,3,2,1}))))/1000)`

  Result: `17787.484`



**C47:** `=(C33-D33)*C27*(IF(AnalysisTerm=3,SUMPRODUCT(C41:E41,{3,2,1}),IF(AnalysisTerm=5,SUMPRODUCT(C41:G41,{5,4,3,2,1}),IF(AnalysisTerm=7,SUMPRODUCT(C41:I41,{7,6,5,4,3,2,1}),SUMPRODUCT(C41:L41,{10,9,8,7,6,5,4,3,2,1}))))/1000)`

  Result: ``



**C48:** `=(C34-D34)*C28*(IF(AnalysisTerm=3,SUMPRODUCT(C42:E42,{3,2,1}),IF(AnalysisTerm=5,SUMPRODUCT(C42:G42,{5,4,3,2,1}),IF(AnalysisTerm=7,SUMPRODUCT(C42:I42,{7,6,5,4,3,2,1}),SUMPRODUCT(C42:L42,{10,9,8,7,6,5,4,3,2,1}))))/1000)`

  Result: ``



**C49:** `=(C35-D35)*C29*(IF(AnalysisTerm=3,SUMPRODUCT(C43:E43,{3,2,1}),IF(AnalysisTerm=5,SUMPRODUCT(C43:G43,{5,4,3,2,1}),IF(AnalysisTerm=7,SUMPRODUCT(C43:I43,{7,6,5,4,3,2,1}),SUMPRODUCT(C43:L43,{10,9,8,7,6,5,4,3,2,1}))))/1000)`

  Result: ``



**C50:** `=SUM(C46:C49)`

  Result: `17787.484`




### Transition Formulas (47)

**B6:** `="The Value Model looks at actual costs and the value of "&'Initial Screens'!C13&" in the customers environment ramping over time taking into account adoption timeframes and investments."`

  Result: `The Value Model looks at actual costs and the value of VCF 9 in the customers environment ramping over time taking into account adoption timeframes and investments.`



**B8:** `='Initial Screens'!C13&" TCO Results Overview"`

  Result: `VCF 9 TCO Results Overview`



**B11:** `='ROI Results'!O85`

  Result: `27627723.82543159`



**D11:** `=Compute!F24+Compute!F86+Compute!F108*(1+AnalysisTerm*Compute!F111)`

  Result: `8937500`



**B12:** `='ROI Results'!O86`

  Result: `9458613.26258312`



**D12:** `=Storage!F34+Compute!F109*(1+AnalysisTerm*Compute!F111)`

  Result: `2940000`



**B13:** `='ROI Results'!O87`

  Result: `2743020.2907715766`



**D13:** `=Network!F19+Network!F34+Network!F56+Compute!F110*(1+AnalysisTerm*Compute!F111)`

  Result: `893750`



**B14:** `='ROI Results'!O88`

  Result: `8881408.000000002`



**D14:** `=Software!F21+'ROI Results'!O37/(1-'ROI Results'!F34)`

  Result: `10000000`



**B15:** `='ROI Results'!O89`

  Result: `21605404.60853014`



**D15:** `=Facilities!F21`

  Result: `7763470`



**B16:** `='ROI Results'!O90`

  Result: `48893378.51124972`



**D16:** `=Labor!F128`

  Result: `23764409.306875`



**B17:** `='ROI Results'!O40`

  Result: `750000`



**D17:** `='ROI Results'!O40`

  Result: `750000`



**B18:** `='ROI Results'!O92`

  Result: `1877008.7604972676`



**D18:** `='Migration - Reskilling'!F14`

  Result: `1218750`



**B19:** `='ROI Results'!O93`

  Result: `156000`



**D19:** `='Migration - Reskilling'!F29`

  Result: `156000`



**B20:** `=SUM(B11:B19)`

  Result: `121992557.25906342`



**C20:** `='Initial Screens'!C14&" Year Total TCO"`

  Result: `10 Year Total TCO`



**D20:** `=SUM(D11:D19)`

  Result: `56423879.306875005`



**D24:** `='Initial Screens'!C13&" End Future State"`

  Result: `VCF 9 End Future State`



**B25:** `='Initial Screens'!C16`

  Result: `5000`



**D25:** `=Compute!F33`

  Result: `4500`



**B26:** `='Initial Screens'!C17`

  Result: `400`



**D26:** `=Compute!F46`

  Result: `143`



**B27:** `=Compute!F7`

  Result: `12.5`



**D27:** `=Compute!F18`

  Result: `31.46853146853147`



**B28:** `=(Compute!F8*Compute!F10+(1-Compute!F8)*Compute!F9)`

  Result: `25000`



**D28:** `=(Compute!F19*Compute!F21+Compute!F20*Compute!F22)/Compute!F17`

  Result: `25000`



**B29:** `='Initial Screens'!C18*B25`

  Result: `1500000`



**D29:** `=Compute!F34*D25`

  Result: `1350000`



**B30:** `=Storage!F11`

  Result: `2142857`



**D30:** `=Storage!F25`

  Result: `1200000`



**B31:** `=Storage!F13`

  Result: `2`



**D31:** `=(Storage!F26*Storage!F29+Storage!F27*Storage!F30)/(Storage!F29+Storage!F30)`

  Result: `0.9799999999999999`



**B32:** `=Facilities!F6`

  Result: `6032`



**D32:** `=Facilities!F16`

  Result: `5429`



**B33:** `=Compute!D39*Compute!D41`

  Result: `14400`



**D33:** `=Compute!F41*Compute!F46`

  Result: `6864`



**C35:** `='Initial Screens'!D26`

  Result: `No`



**A36:** `=IF('Initial Screens'!C13="VCF","Show","Hide")`

  Result: `Hide`



**C36:** `='Initial Screens'!D27`

  Result: `No`



**C37:** `='Initial Screens'!D28`

  Result: `No`



**C38:** `='Initial Screens'!D29`

  Result: `No`




### Benchmarks Formulas (26)

**D6:** `=D38/1880*(1+D41)`

  Result: `97.49630319148935`



**D7:** `=D6/(1+D$41)*D$60*(1+D$42)`

  Result: `52.61877489819894`



**D8:** `=D6/(1+D$41)*D$61*(1+D$43)`

  Result: `46.2830218296959`



**D9:** `=D6/(1+D$41)*D$62*(1+D$44)`

  Result: `45.2406836622334`



**D10:** `=OFFSET(D5,MATCH('Initial Screens'!$C$9,Benchmarks!B6:B9,0),0)`

  Result: `97.49630319148935`



**D12:** `=D$6*D48*1880`

  Result: `175032.71186059655`



**D13:** `=D$7*D51*1880`

  Result: `83534.04980523096`



**D14:** `=D12/(1+D$41)*D$61*(1+D$43)`

  Result: `83090.76917556416`



**D15:** `=D12/(1+D$41)*D$62*(1+D$44)`

  Result: `81219.48513550744`



**D16:** `=OFFSET(D11,MATCH('Initial Screens'!$C$9,Benchmarks!B12:B15,0),0)`

  Result: `175032.71186059655`



**P19:** `=M19`

  Result: `Aerospace and Defense`



**D38:** `=OFFSET(D18,MATCH('Initial Screens'!C8,Benchmarks!B19:B37,0),0)`

  Result: `126409`



**D45:** `=OFFSET(D40,MATCH('Initial Screens'!C9,Benchmarks!B41:B44,0),0)`

  Result: `0.45`



**D48:** `=108109/D37`

  Result: `0.9549337078552438`



**D51:** `=59850/70876`

  Result: `0.8444325300524861`



**D54:** `=48879/57724`

  Result: `0.8467708405515904`



**D57:** `=44707/63477`

  Result: `0.7043023457315248`



**D60:** `=70876/D37`

  Result: `0.6260522387400518`



**D61:** `=57724/D37`

  Result: `0.5098797819999823`



**D62:** `=63477/D37`

  Result: `0.5606963987598378`



**D84:** `=OFFSET(D64,MATCH('Initial Screens'!C8,B65:B83,0),0)`

  Result: `6080000`



**D87:** `=9360000/D83`

  Result: `1.9180327868852458`



**D88:** `=AVERAGE(4.53,5.31,4.17,8.75)*1000000/D83`

  Result: `1.1659836065573768`



**D89:** `=4160000/D83`

  Result: `0.8524590163934426`



**D90:** `=AVERAGE(4.19,2.35,3.23,2.78)*1000000/D83`

  Result: `0.6429303278688525`



**D91:** `=ROUND(IF('Initial Screens'!C9="AMER",D87,IF('Initial Screens'!C9="EMEA",D88,IF('Initial Screens'!C9="LATAM",D89,D90)))*D84,-4)`

  Result: `11660000`




## Web Application Requirements


### Technology Stack Recommendations

**Frontend:**
- React or Vue.js for component-based UI
- TailwindCSS or Material-UI for styling
- Chart.js or D3.js for visualizations
- React Hook Form for form validation

**Backend:**
- Node.js with Express or Python with Flask/FastAPI
- Formula calculation engine (implement Excel formula parser or use libraries)
- PDF export functionality for reports

**Database:**
- PostgreSQL or MongoDB for storing analysis scenarios
- Redis for session/cache management

### Core Features Required

1. **Multi-step Configuration Wizard**
   - Customer information entry
   - Infrastructure baseline inputs
   - Component usage configuration

2. **Real-time Calculation Engine**
   - Implement all Excel formulas as JavaScript/Python functions
   - Auto-calculate dependent fields on input change
   - Validation and error checking

3. **Cost Category Modules**
   - Individual pages for: Compute, Storage, Network, Software, Facilities, Labor, Support, Migration
   - Current state vs. future state comparison
   - Year-by-year breakdown views

4. **Results Dashboard**
   - Key financial metrics (NPV, ROI, Payback)
   - Interactive charts and graphs
   - Sustainability metrics visualization
   - Export to PDF/Excel functionality

5. **Scenario Management**
   - Save multiple analysis scenarios
   - Compare scenarios side-by-side
   - Clone and modify existing scenarios

6. **Benchmarks & Defaults**
   - Pre-populated industry/region defaults
   - User can override any default
   - Tooltip help text for each field

7. **Data Validation**
   - Required field validation
   - Range validation (e.g., percentages 0-100)
   - Dependency validation (e.g., future hosts ≤ current hosts)

8. **Export & Reporting**
   - PDF executive summary
   - Excel export with formulas intact
   - PowerPoint slide deck generation

### UI/UX Requirements

1. **Navigation**
   - Left sidebar with sheet navigation
   - Progress indicator for multi-step wizard
   - Breadcrumb navigation

2. **Input Components**
   - Number inputs with proper formatting (currency, percentages, decimals)
   - Dropdowns for predefined options
   - Toggle switches for Yes/No fields
   - Info icons with tooltips for help text

3. **Calculation Display**
   - Read-only fields visually distinct from inputs
   - Real-time updates as inputs change
   - Loading indicators for complex calculations

4. **Responsive Design**
   - Mobile-friendly layout
   - Collapsible sections for long forms
   - Sticky headers for navigation

5. **Color Coding (matching Excel)**
   - Yellow border/background for required inputs
   - Orange border for overridable defaults
   - Blue background for calculated fields
   - Tooltip icons for notes/comments

### Formula Implementation Strategy

1. **Create Formula Library**
   - Parse each Excel formula
   - Convert to JavaScript/Python equivalent
   - Handle Excel-specific functions (SUMIFS, VLOOKUP, etc.)

2. **Dependency Graph**
   - Build directed acyclic graph (DAG) of cell dependencies
   - Calculate cells in topological order
   - Enable incremental recalculation

3. **Named Ranges**
   - Implement named range system
   - Map Excel named ranges to variable names
   - Update all dependent calculations when named range changes

4. **Excel Function Equivalents**
   - SUM, SUMIF, SUMIFS
   - IF, IFS, SWITCH
   - VLOOKUP, XLOOKUP, INDEX/MATCH
   - NPV, IRR, PMT
   - ROUND, ROUNDUP, ROUNDDOWN
   - AND, OR, NOT
   - IFERROR, IFNA

### Data Model

```javascript
// Analysis Schema
{
  id: string,
  created_at: timestamp,
  updated_at: timestamp,
  customer_name: string,
  industry: string,
  region: string,
  analysis_term: number,
  future_state_solution: string,
  
  // Initial Screens inputs
  initial_screens: {
    number_of_vms: number,
    number_of_hosts: number,
    avg_storage_per_vm: number,
    component_usage: {
      operations_coverage_current: number,
      operations_coverage_future: number,
      automation_coverage_current: number,
      automation_coverage_future: number,
      nsx_coverage_current: number,
      nsx_coverage_future: number,
      cpu_utilization_old: number,
      cpu_utilization_new: number,
      ram_utilization_old: number,
      ram_utilization_new: number
    }
  },
  
  // Compute inputs
  compute: {
    percent_vsan_ready_current: number,
    avg_cost_per_esxi_host: number,
    avg_cost_per_vsan_node: number,
    annual_hw_support_rate: number,
    percent_vms_decommissioned: number,
    percent_vsan_ready_future: number
  },
  
  // Storage inputs
  storage: {
    avg_storage_per_vm: number,
    usable_to_raw_ratio: number,
    storage_cost_per_gb: number,
    other_storage_devices_pct: number,
    annual_storage_support_rate: number
  },
  
  // ... (repeat for all sheets)
  
  // Calculated results
  results: {
    tco_current_state: number,
    tco_future_state: number,
    total_savings: number,
    npv: number,
    roi_percentage: number,
    payback_months: number,
    monthly_cost_of_delay: number
  }
}
```

### Testing Requirements

1. **Unit Tests**
   - Test each formula function independently
   - Verify calculations match Excel results
   - Test edge cases (zero, negative, null values)

2. **Integration Tests**
   - Test full calculation flow
   - Verify data dependencies
   - Test with sample customer data

3. **End-to-End Tests**
   - Test complete user workflow
   - Verify exports match expectations
   - Test scenario save/load

### Performance Requirements

- **Calculation Speed:** < 500ms for full recalculation
- **Page Load:** < 2 seconds initial load
- **Export Generation:** < 5 seconds for PDF
- **Concurrent Users:** Support 100+ simultaneous users

### Security Requirements

- User authentication and authorization
- Role-based access control (admin, sales rep, customer)
- Data encryption at rest and in transit
- Audit logging for all changes
- Secure export with watermarking

### Deployment Requirements

- Docker containerization
- CI/CD pipeline with automated testing
- Staging and production environments
- Database backup and recovery
- Monitoring and alerting

