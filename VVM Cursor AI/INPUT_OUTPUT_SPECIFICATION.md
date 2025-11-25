# INPUT/OUTPUT SPECIFICATION
## Complete Data Dictionary for Web Application

This document defines every input field and output metric in the PCMO Value Model.

## Primary Configuration Inputs

### Customer Information

| Field | Cell | Type | Required | Default | Validation |
|-------|------|------|----------|---------|------------|
| Customer Name | C7 | text | Yes |  |  |
| Industry | C8 | dropdown | Yes |  | Options: Aerospace and Defense, Automotive and Transport, Banking and Financial Services, Education, Energy and Utilities, Government, Healthcare, Manufacturing, Retail, Technology, Telecommunications |
| Region | C9 | dropdown | Yes |  | Options: AMER, EMEA, LATAM, APAC |

### Value Model Configuration

| Field | Cell | Type | Required | Default | Validation |
|-------|------|------|----------|---------|------------|
| Future State Solution | C13 | dropdown | Yes | VCF 9 | Options: VCF 9, VVF, VVF with vSAN |
| Term of Analysis (years) | C14 | number | Yes | 10 |  |

### Infrastructure Baseline

| Field | Cell | Type | Required | Default | Validation |
|-------|------|------|----------|---------|------------|
| Number of VMs | C16 | number | Yes | 5000 | Min: 1 |
| Number of VM Hosts | C17 | number | Yes | 400 | Min: 1 |
| Average Allocated Storage per VM (GB) | C18 | number | Yes | 300 | Min: 0 |

### Component Usage (Current vs Future State)

These fields capture the maturity improvement from current to future state.

| Metric | Current State Cell | Future State Cell | Type | Range |
|--------|-------------------|------------------|------|-------|
| % Operations Coverage | Column D | Column E | Percentage | 0-100% |
| % Automation Coverage | Column D | Column E | Percentage | 0-100% |
| % NSX Coverage | Column D | Column E | Percentage | 0-100% |
| CPU Utilization (OLD) | Column D | - | Percentage | 0-100% |
| RAM Utilization (OLD) | Column D | - | Percentage | 0-100% |
| CPU Utilization (NEW) | - | Column E | Percentage | 0-100% |
| RAM Utilization (NEW) | - | Column E | Percentage | 0-100% |

## Compute Cost Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| Percent of Hosts that are vSAN Ready (Current) | percentage | 0 | 0-100% |
| Average Purchase Cost per Current State ESXi Host | currency | 25000 | N/A |
| Average Purchase Cost per Current State vSAN Ready Node | currency | 0 | N/A |
| Annual Compute Hardware Support (%) | percentage | 15 | 0-100% |
| Percent of VMs to be Decommissioned | percentage | 10 | 0-100% |
| Percent of Hosts that will be vSAN Ready Nodes (Future) | percentage | 100 | 0-100% |

## Storage Cost Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| Average Allocated Storage per VM (GB) | number | 300 | N/A |
| Average Allocated Storage per Physical Server (GB) | number | 300 | N/A |
| Usable to Raw Ratio | decimal | 0.7 | 0-1 |
| Percent of Hosts that are vSAN Ready (Current) | percentage | 0 | N/A |
| Upfront External Storage Purchase Cost per GB | currency | 2.0 | N/A |
| Other Storage Devices (%) | percentage | 5 | 0-100% |
| Annual Storage Hardware Support (%) | percentage | 15 | N/A |

## Network Cost Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| Other Network Devices as % of Host Costs | percentage | 10 | N/A |
| Annual Network Hardware Support (%) | percentage | 15 | N/A |

## Software Cost Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| Annual VMware Software, Subscription & Services | currency | 500000 | N/A |
| Estimated Annual Increase (%) | percentage | 5 | N/A |
| Anticipated Reduction (%) | percentage | 50 | 0-100% |

## Facilities Cost Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| OpEx per Host per Year (rack, power, cooling) | currency | 6032 | N/A |
| OpEx per Physical Server per Year | currency | 5151 | N/A |

## Labor Productivity Inputs

| Role | Count Field | Cost Field | Productivity Gain (%) |
|------|------------|------------|----------------------|
| Server Administrators | Number (default: 5) | Annual Cost (default: $175,032.71) | 48% |
| Storage Administrators | Number (default: 5) | Annual Cost (default: $175,032.71) | 50% |
| Network Administrators | Number (default: 3) | Annual Cost (default: $175,032.71) | 30% |
| Security Personnel | Number (default: 2) | Annual Cost (default: $175,032.71) | 25% |
| Backup Administrators | Number (default: 2) | Annual Cost (default: $175,032.71) | 40% |
| Monitoring Personnel | Number (default: 1) | Annual Cost (default: $175,032.71) | 35% |
| Service Desk Personnel | Number (default: 2.2) | Annual Cost (default: $97.50) | 10% |

## Support Cost Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| Annual VMware Support (TAM, etc.) | currency | 250000 | N/A |
| Estimated Annual Increase (%) | percentage | 0 | N/A |
| Anticipated Reduction (%) | percentage | 50 | N/A |

## Migration & Reskilling Inputs

| Field | Type | Default | Validation |
|-------|------|---------|------------|
| Include Migration Efficiency? | yes/no | Yes | N/A |
| Expected % of VMs to Migrate | percentage | 100 | N/A |
| Average Hours to Migrate a VM | number | 1.0 | N/A |
| Anticipated % Reduction (with HCX) | percentage | 75 | N/A |
| Number of FTEs to Reskill | number | 20 | N/A |
| Annual Training Hours per FTE | number | 20 | N/A |

## Investment Breakdown (Multi-Year)

| Category | Year 1 | Year 2 | Year 3 |
|----------|--------|--------|--------|
| Subscription | Currency Input | Currency Input | Currency Input |
| License | Currency Input | Currency Input | Currency Input |
| Maintenance (SnS) | Currency Input | Currency Input | Currency Input |
| Professional Services | Currency Input | Currency Input | Currency Input |
| Education / Training | Currency Input | Currency Input | Currency Input |
| Success360 / TAM | Currency Input | Currency Input | Currency Input |
| Other | Currency Input | Currency Input | Currency Input |
| Organizational Change Management (Consulting) | Currency Input | Currency Input | Currency Input |
| Organizational Change Management (Internal) | Currency Input | Currency Input | Currency Input |
| User Defined | Currency Input | Currency Input | Currency Input |

## Business Impact Inputs

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| Annual Revenue | currency | 1000000000 | 10-K |
| Operating Margin (%) | percentage | 10 | 10-K |
| Number of Employees | number | 2500 | 10-K |
| Include Increased Revenue? | yes/no | No | Don't use for Government/non-profit |
| Increase in Revenue via Innovation (%) | percentage | 0 | N/A |
| IT Downtime Hours per Month | number | 0 | N/A |
| Downtime Reduction (%) | percentage | 0 | N/A |

## Financial Model Parameters

| Parameter | Default | Unit | Purpose |
|-----------|---------|------|---------|
| Weighted Average Cost of Capital (WACC) | 9 | % | Discount rate for NPV |
| Average Annual Growth | 5 | % | Future value calculation |
| Annual Inflation Adjustment | 3 | % | Future value calculation |
| Hardware Refresh Cycle | 5 | years | Future value calculation |

## Primary Output Metrics

### ROI Results (Main Dashboard)

| Metric | Format | Description |
|--------|--------|-------------|
| 10-Year Net Present Value (NPV) | currency | NPV of all cash flows |
| 10-Year Return on Investment (ROI) | multiplier | (Total Benefits - Total Investment) / Total Investment |
| Payback Period | months | Months until cumulative benefits exceed investment |
| Monthly Cost of Delayed Decision | currency | Average monthly benefit during payback period |
| 10-Year Total Savings | currency | Current State TCO - Future State TCO |

### TCO Breakdown by Category (10-Year)

| Category | Current State (10-Year) | Future State (10-Year) | Savings |
|----------|------------------------|------------------------|---------|
| Compute | Currency | Currency | Currency (calculated) |
| Storage | Currency | Currency | Currency (calculated) |
| Network | Currency | Currency | Currency (calculated) |
| Software | Currency | Currency | Currency (calculated) |
| Facilities | Currency | Currency | Currency (calculated) |
| Labor | Currency | Currency | Currency (calculated) |
| Support | Currency | Currency | Currency (calculated) |
| Migration | Currency | Currency | Currency (calculated) |
| Reskilling | Currency | Currency | Currency (calculated) |

### Year-by-Year Cash Flow

| Year | Gross Benefits | Investment | Net Benefit | Cumulative NPV |
|------|----------------|------------|-------------|----------------|
| 1-10 | Currency for each year | Currency for each year | Calculated | Calculated |

### Sustainability Metrics

| Metric | Unit | 10-Year Total |
|--------|------|---------------|
| Reduced Power Consumption | MWh | Calculated |
| CO2 Emissions Avoided | Metric Tons | Calculated |
| Equivalent Motor Vehicles Off Road | Count | Calculated |
| Equivalent Urban Trees Planted | Count (10-year growth) | Calculated |

## Data Validation Rules

| Rule | Severity | Message |
|------|----------|---------|
| Number of VMs > 0 | Error | Must have at least 1 VM |
| Number of Hosts > 0 | Error | Must have at least 1 host |
| Analysis Term between 1-15 | Error | Analysis term must be 1-15 years |
| Storage per VM ≥ 0 | Error | Storage cannot be negative |
| Future VMs ≤ Current VMs | Warning | Future VMs typically ≤ current due to decommissioning |
| Future Hosts < Current Hosts | Warning | Consolidation should reduce host count |
| Percentages between 0-100 | Error | Percentage values must be 0-100% |
| Productivity Gain ≥ 0 | Error | Productivity gain cannot be negative |
| Annual costs ≥ 0 | Error | Costs cannot be negative |
| WACC > 0 | Error | Discount rate must be positive |

## Calculation Order & Dependencies


### Calculation Flow

1. **Initial Screens** (User Inputs)
   - Customer info, infrastructure baseline, component usage

2. **Compute Calculations**
   - Calculate VMs per host (current and future)
   - Determine future host count based on consolidation
   - Calculate 10-year compute costs (current and future)

3. **Storage Calculations**
   - Total storage required = VMs × storage per VM
   - Convert usable to raw capacity
   - Calculate storage hardware costs

4. **Network Calculations**
   - Network costs as % of compute costs
   - Add ToR switches and other devices

5. **Software Calculations**
   - Apply annual escalation to VMware costs
   - Calculate 10-year current state cost
   - Apply reduction percentage for future state

6. **Facilities Calculations**
   - Facilities cost = hosts × cost per host × years
   - Apply same to future state with reduced hosts

7. **Labor Calculations**
   - For each role: FTE count × annual cost
   - Apply productivity gain % to future state
   - Calculate total recaptured hours

8. **Support Calculations**
   - Apply annual escalation
   - Apply reduction percentage

9. **Migration Calculations**
   - Migration hours = VMs × hours per VM
   - Apply HCX efficiency gain
   - Calculate one-time cost

10. **Reskilling Calculations**
    - Training cost = FTEs × hours × hourly rate
    - One-time investment

11. **Investment Breakdown**
    - Sum all investment categories by year
    - Total investment = sum of all years

12. **Business Impact**
    - Revenue increase = revenue × increase %
    - Downtime reduction value
    - Other business benefits

13. **Aggregate Calculations (Misc sheet)**
    - Sum all current state costs
    - Sum all future state costs
    - Calculate year-by-year with growth and inflation

14. **ROI Results**
    - Gross benefits = current - future + business impact
    - Net benefit = gross benefits - investment
    - NPV = discount all cash flows by WACC
    - ROI % = net benefit / investment
    - Payback = find month where cumulative benefit > investment

15. **Sustainability**
    - Power reduction = (current hosts - future hosts) × power per host
    - CO2 = power × EPA emission factors
    - Equivalents using EPA conversion factors


## Suggested API Endpoints for Web Application


### Analysis CRUD Operations

```
POST   /api/analyses                 Create new analysis
GET    /api/analyses                 List all analyses (with filtering)
GET    /api/analyses/:id             Get specific analysis
PUT    /api/analyses/:id             Update analysis
DELETE /api/analyses/:id             Delete analysis
POST   /api/analyses/:id/clone       Clone existing analysis
```

### Calculation & Results

```
POST   /api/analyses/:id/calculate   Trigger full recalculation
GET    /api/analyses/:id/results     Get calculated results
GET    /api/analyses/:id/tco         Get TCO breakdown
GET    /api/analyses/:id/roi         Get ROI metrics
GET    /api/analyses/:id/cashflow    Get year-by-year cash flow
GET    /api/analyses/:id/sustainability  Get sustainability metrics
```

### Exports

```
GET    /api/analyses/:id/export/pdf       Export PDF report
GET    /api/analyses/:id/export/excel     Export Excel workbook
GET    /api/analyses/:id/export/pptx      Export PowerPoint deck
GET    /api/analyses/:id/export/json      Export raw JSON data
```

### Benchmarks & Reference Data

```
GET    /api/benchmarks/salaries           Get salary benchmarks by region/role
GET    /api/benchmarks/industries         Get industry list
GET    /api/benchmarks/defaults/:industry Get default values for industry
```

### Validation

```
POST   /api/validate/inputs               Validate input data
GET    /api/validate/rules                Get validation rules
```
