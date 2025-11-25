# FORMULA CONVERSION GUIDE
## Excel to JavaScript/Python Implementation

This document provides detailed guidance on converting every formula from the Excel model to code.

**Total Formulas to Implement:** 2507

## Excel Functions Used in Model

The model uses 21 unique Excel functions:

- AND
- AVERAGE
- EVEN
- FIXED
- HLOOKUP
- IF
- IFERROR
- ISNUMBER
- MATCH
- MAX
- MIN
- NOW
- NPV
- OFFSET
- OR
- ROUND
- ROUNDUP
- SEARCH
- SUM
- SUMPRODUCT
- TODAY

## Function Conversion Reference

### SUM

**Description:** Sum a range of values

**Excel Example:**
```excel
=SUM(A1:A10)
```

**JavaScript:**
```javascript
values.reduce((a, b) => a + b, 0)
```

**Python:**
```python
sum(values)
```

### IF

**Description:** Conditional logic

**Excel Example:**
```excel
=IF(A1>10, "High", "Low")
```

**JavaScript:**
```javascript
value > 10 ? 'High' : 'Low'
```

**Python:**
```python
'High' if value > 10 else 'Low'
```

### IFERROR

**Description:** Return alternative value if error

**Excel Example:**
```excel
=IFERROR(A1/B1, 0)
```

**JavaScript:**
```javascript
try { return a / b } catch { return 0 }
```

**Python:**
```python
a / b if b != 0 else 0
```

### MATCH

**Description:** Find position of value in range

**Excel Example:**
```excel
=MATCH("x", A1:A10, 0)
```

**JavaScript:**
```javascript
array.indexOf('x')
```

**Python:**
```python
array.index('x')
```

### ROUND

**Description:** Round to specified decimals

**Excel Example:**
```excel
=ROUND(A1, 2)
```

**JavaScript:**
```javascript
Math.round(value * 100) / 100
```

**Python:**
```python
round(value, 2)
```

### ROUNDUP

**Description:** Round up to specified decimals

**Excel Example:**
```excel
=ROUNDUP(A1, 0)
```

**JavaScript:**
```javascript
Math.ceil(value)
```

**Python:**
```python
math.ceil(value)
```

### AND

**Description:** Logical AND

**Excel Example:**
```excel
=AND(A1>5, B1<10)
```

**JavaScript:**
```javascript
value1 > 5 && value2 < 10
```

**Python:**
```python
value1 > 5 and value2 < 10
```

### OR

**Description:** Logical OR

**Excel Example:**
```excel
=OR(A1>5, B1<10)
```

**JavaScript:**
```javascript
value1 > 5 || value2 < 10
```

**Python:**
```python
value1 > 5 or value2 < 10
```

### NPV

**Description:** Net Present Value

**Excel Example:**
```excel
=NPV(0.1, 1000, 2000, 3000)
```

**JavaScript:**
```javascript
cashFlows.reduce((npv, cf, i) => npv + cf / Math.pow(1 + rate, i + 1), 0)
```

**Python:**
```python
sum(cf / (1 + rate)**(i+1) for i, cf in enumerate(cash_flows))
```

### AVERAGE

**Description:** Calculate mean

**Excel Example:**
```excel
=AVERAGE(A1:A10)
```

**JavaScript:**
```javascript
values.reduce((a, b) => a + b, 0) / values.length
```

**Python:**
```python
statistics.mean(values)
```

### MIN

**Description:** Find minimum value

**Excel Example:**
```excel
=MIN(A1:A10)
```

**JavaScript:**
```javascript
Math.min(...values)
```

**Python:**
```python
min(values)
```

### MAX

**Description:** Find maximum value

**Excel Example:**
```excel
=MAX(A1:A10)
```

**JavaScript:**
```javascript
Math.max(...values)
```

**Python:**
```python
max(values)
```

## Sheet-by-Sheet Formula Implementation

### Initial Screens

**Formula Count:** 6

#### A22

**Excel Formula:**
```excel
=IF(ISNUMBER(SEARCH("VCF",$C$13)),"Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D22

**Excel Formula:**
```excel
=IF(A22="Show",100%,0)
```

**Expected Result:** `1`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A23

**Excel Formula:**
```excel
=$A$22
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A24

**Excel Formula:**
```excel
=IF($C$13="VVF","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A27

**Excel Formula:**
```excel
=$A$22
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E28

**Excel Formula:**
```excel
=IF(D28="Yes","","Must include DSM for any Public Native Cloud comparison")
```

**Expected Result:** `Must include DSM for any Public Native Cloud comparison`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

### Excel Output

**Formula Count:** 59

#### C4

**Excel Formula:**
```excel
='Initial Screens'!C7
```

**Expected Result:** `Acme Company`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C5

**Excel Formula:**
```excel
=NOW()
```

**Expected Result:** `2025-11-21 19:09:23.670000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C6

**Excel Formula:**
```excel
=AnalysisTerm&"-Year Term"
```

**Expected Result:** `10-Year Term`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B20

**Excel Formula:**
```excel
='Initial Screens'!B14
```

**Expected Result:** `Term of analysis`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D20

**Excel Formula:**
```excel
=AnalysisTerm
```

**Expected Result:** `10`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B22

**Excel Formula:**
```excel
='Initial Screens'!B16
```

**Expected Result:** `Number of VMs`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D22

**Excel Formula:**
```excel
='Initial Screens'!C16
```

**Expected Result:** `5000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B23

**Excel Formula:**
```excel
='Initial Screens'!B17
```

**Expected Result:** `Number of VM Hosts`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D23

**Excel Formula:**
```excel
='Initial Screens'!C17
```

**Expected Result:** `400`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B24

**Excel Formula:**
```excel
='Initial Screens'!B18
```

**Expected Result:** `Average allocated/provisioned storage (GBs) per VM`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 49 more formulas*

### Compute

**Formula Count:** 191

#### F5

**Excel Formula:**
```excel
='Excel Output'!D22
```

**Expected Result:** `5000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F6

**Excel Formula:**
```excel
='Excel Output'!$D$23
```

**Expected Result:** `400`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
=F5/F6
```

**Expected Result:** `12.5`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A8

**Excel Formula:**
```excel
=IF('Initial Screens'!$C$13="VVF","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F8

**Excel Formula:**
```excel
=IF('Initial Screens'!C13="VVF",0,'Excel Output'!D30)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A9

**Excel Formula:**
```excel
=IF($F$8=100%,"Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F9

**Excel Formula:**
```excel
=IF(F8=1,0,25000)
```

**Expected Result:** `25000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A10

**Excel Formula:**
```excel
=IF($F$8=0,"Hide","Show")
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F10

**Excel Formula:**
```excel
=IF(F8>0,35000,0)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B12

**Excel Formula:**
```excel
=FIXED(AnalysisTerm,0)&"-Year Current State Cost"
```

**Expected Result:** `10-Year Current State Cost`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 181 more formulas*

### Storage

**Formula Count:** 94

#### F5

**Excel Formula:**
```excel
='Excel Output'!D22
```

**Expected Result:** `5000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A6

**Excel Formula:**
```excel
=IF(Compute!$D$68="No","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F6

**Excel Formula:**
```excel
=Compute!F73
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
='Excel Output'!D24
```

**Expected Result:** `300`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A8

**Excel Formula:**
```excel
=IF(Compute!$D$68="No","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F8

**Excel Formula:**
```excel
=IF(Compute!D68="No",0,'Excel Output'!D24)
```

**Expected Result:** `300`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### G8

**Excel Formula:**
```excel
=IF(Compute!D68="No","leave blank","")
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F9

**Excel Formula:**
```excel
=ROUND(F5*F7+F6*F8,0)
```

**Expected Result:** `1500000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F11

**Excel Formula:**
```excel
=ROUND(F9/F10,0)
```

**Expected Result:** `2142857`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A12

**Excel Formula:**
```excel
=IF('Initial Screens'!$C$13="VVF","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 84 more formulas*

### Network

**Formula Count:** 88

#### F6

**Excel Formula:**
```excel
=Compute!F6
```

**Expected Result:** `400`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H6

**Excel Formula:**
```excel
='Initial Screens'!$E$17
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A7

**Excel Formula:**
```excel
=IF(Compute!$D$68="No","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
=Compute!F73
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F8

**Excel Formula:**
```excel
=Compute!F8*Compute!F10+(1-Compute!F8)*Compute!F9
```

**Expected Result:** `25000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A9

**Excel Formula:**
```excel
=IF(Compute!$D$68="No","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F9

**Excel Formula:**
```excel
=Compute!F74
```

**Expected Result:** `5000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B11

**Excel Formula:**
```excel
=FIXED(AnalysisTerm,0)&"-Year Current State Cost"
```

**Expected Result:** `10-Year Current State Cost`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F11

**Excel Formula:**
```excel
=ROUND(Network!F5*Network!F6*Network!F8,0)*(1+AnalysisTerm*Network!F10)
```

**Expected Result:** `2500000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F13

**Excel Formula:**
```excel
=ROUND(F5,3)
```

**Expected Result:** `0.1`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 78 more formulas*

### Software

**Formula Count:** 28

#### I4

**Excel Formula:**
```excel
=F5*((1+F6)^5-1)/F6
```

**Expected Result:** `2762815.625000001`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B7

**Excel Formula:**
```excel
=FIXED(AnalysisTerm,0)&"-Year Current State Cost"
```

**Expected Result:** `10-Year Current State Cost`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
=IF(AnalysisTerm=3,F5+F5*(1+F6)+F5*(1+F6)^2,F5+F5*(1+F6)+F5*(1+F6)^2+F5*(1+F6)^3+F5*(1+F6)^4)
```

**Expected Result:** `2762815.625`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F9

**Excel Formula:**
```excel
=ROUND(100%,3)-50%
```

**Expected Result:** `0.5`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### J9

**Excel Formula:**
```excel
=F10*F6/((1+F6)^5-1)
```

**Expected Result:** `250000.03393277456`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B10

**Excel Formula:**
```excel
=FIXED(AnalysisTerm,0)&"-Year Future State Cost"
```

**Expected Result:** `10-Year Future State Cost`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F10

**Excel Formula:**
```excel
=ROUND(F7*(1-F9),0)
```

**Expected Result:** `1381408`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A12

**Excel Formula:**
```excel
=IF('Initial Screens'!$D$28="Yes","Show","Hide")
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A13

**Excel Formula:**
```excel
=IF('Initial Screens'!$D$28="Yes","Show","Hide")
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A14

**Excel Formula:**
```excel
=IF('Initial Screens'!$D$28="Yes","Show","Hide")
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 18 more formulas*

### Facilities

**Formula Count:** 79

#### F5

**Excel Formula:**
```excel
='Excel Output'!$D$23+Compute!$F$94*'Excel Output'!$D$23
```

**Expected Result:** `400`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H5

**Excel Formula:**
```excel
=Compute!H6
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F6

**Excel Formula:**
```excel
=F57
```

**Expected Result:** `6032`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A7

**Excel Formula:**
```excel
=IF(Compute!$D$68="No","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
=Compute!F73
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H7

**Excel Formula:**
```excel
=Compute!H73
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A8

**Excel Formula:**
```excel
=IF(Compute!$D$68="No","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F8

**Excel Formula:**
```excel
=F58
```

**Expected Result:** `5151`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A9

**Excel Formula:**
```excel
=IF('Initial Screens'!$D$26="Yes","Show","Hide")
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F9

**Excel Formula:**
```excel
=IF('Initial Screens'!$D$26="Yes",Network!F26,0)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 69 more formulas*

### Labor

**Formula Count:** 180

#### K1

**Excel Formula:**
```excel
=(F60*F107*F108)/2080
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F4

**Excel Formula:**
```excel
=ROUND(Misc!C156,1)
```

**Expected Result:** `25.2`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F5

**Excel Formula:**
```excel
=(F4*2080)*(1-F6)
```

**Expected Result:** `27828.87378391089`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F6

**Excel Formula:**
```excel
=(F127-F128)/F127
```

**Expected Result:** `0.46907673641806147`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F10

**Excel Formula:**
```excel
=ROUND(MIN(10,'Excel Output'!$D$22/1000),1)
```

**Expected Result:** `5`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F11

**Excel Formula:**
```excel
=ROUND(Benchmarks!$D$16,2)
```

**Expected Result:** `175032.71`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H11

**Excel Formula:**
```excel
="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"
```

**Expected Result:** `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F12

**Excel Formula:**
```excel
=ROUND(F10*F11,0)
```

**Expected Result:** `875164`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F14

**Excel Formula:**
```excel
=IF(ISNUMBER(SEARCH("VCF",'Initial Screens'!$C$13)),MIN(50%,ROUND(40%*(1+Compute!$D$29),3)),ROUND(20%,3))
```

**Expected Result:** `0.48`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F15

**Excel Formula:**
```excel
=ROUND(F12*(1-F14),0)
```

**Expected Result:** `455085`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 170 more formulas*

### Support

**Formula Count:** 4

#### B7

**Excel Formula:**
```excel
=FIXED(AnalysisTerm,0)&"-Year Current State Cost"
```

**Expected Result:** `10-Year Current State Cost`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
=IF(AnalysisTerm=3,F5+F5*(1+F6)+F5*(1+F6)^2,F5+F5*(1+F6)+F5*(1+F6)^2+F5*(1+F6)^3+F5*(1+F6)^4)
```

**Expected Result:** `1250000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B10

**Excel Formula:**
```excel
=FIXED(AnalysisTerm,0)&"-Year Future State Cost"
```

**Expected Result:** `10-Year Future State Cost`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F10

**Excel Formula:**
```excel
=ROUND(F7*(1-F9),0)
```

**Expected Result:** `625000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

### Migration - Reskilling

**Formula Count:** 35

#### A4

**Excel Formula:**
```excel
=IF($C$2="Yes","Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B4

**Excel Formula:**
```excel
=IF('Initial Screens'!C13="VCF 9","Migration Efficiency (related to host refresh and migration to VCF 9)","Migration Efficiency (related to host refresh)")
```

**Expected Result:** `Migration Efficiency (related to host refresh and migration to VCF 9)`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A5

**Excel Formula:**
```excel
=IF($C$2="Yes","Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A6

**Excel Formula:**
```excel
=IF($C$2="Yes","Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A7

**Excel Formula:**
```excel
=IF($C$2="Yes","Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F7

**Excel Formula:**
```excel
=IF(C2="Yes",'Excel Output'!D22,0)
```

**Expected Result:** `5000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H7

**Excel Formula:**
```excel
='Initial Screens'!$E$16
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A8

**Excel Formula:**
```excel
=IF($C$2="Yes","Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F8

**Excel Formula:**
```excel
=ROUND(100%,3)
```

**Expected Result:** `1`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A9

**Excel Formula:**
```excel
=IF($C$2="Yes","Show","Hide")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 25 more formulas*

### InvestmentBVA

**Formula Count:** 20

#### F6

**Excel Formula:**
```excel
=IF(#REF!<=3,"hide column","show column")
```

**Expected Result:** `#REF!`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### G6

**Excel Formula:**
```excel
=IF(#REF!<=4,"hide column","show column")
```

**Expected Result:** `#REF!`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F9

**Excel Formula:**
```excel
=IF(#REF!>3,"Year 4","")
```

**Expected Result:** `#REF!`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### G9

**Excel Formula:**
```excel
=IF(#REF!>4,"Year 5","")
```

**Expected Result:** `#REF!`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H10

**Excel Formula:**
```excel
=SUM(C10:G10)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H11

**Excel Formula:**
```excel
=SUM(C11:G11)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H12

**Excel Formula:**
```excel
=SUM(C12:G12)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H13

**Excel Formula:**
```excel
=SUM(C13:G13)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H14

**Excel Formula:**
```excel
=SUM(C14:G14)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H15

**Excel Formula:**
```excel
=SUM(C15:G15)
```

**Expected Result:** ``

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 10 more formulas*

### Misc

**Formula Count:** 637

#### C5

**Excel Formula:**
```excel
=Compute!F12+Compute!F76+Compute!F100
```

**Expected Result:** `25000000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D5

**Excel Formula:**
```excel
=Compute!F24+Compute!F86+Compute!F112
```

**Expected Result:** `8937500`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E5

**Excel Formula:**
```excel
=Transition!D11
```

**Expected Result:** `8937500`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C6

**Excel Formula:**
```excel
=Storage!F21+Compute!F101
```

**Expected Result:** `11964285`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D6

**Excel Formula:**
```excel
=Storage!F34+Compute!F113
```

**Expected Result:** `2940000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E6

**Excel Formula:**
```excel
=Transition!D12
```

**Expected Result:** `2940000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C7

**Excel Formula:**
```excel
=Network!F11+Network!F29+Network!F51+Compute!F102
```

**Expected Result:** `2500000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D7

**Excel Formula:**
```excel
=Network!F19+Network!F34+Network!F56+Compute!F114
```

**Expected Result:** `893750`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E7

**Excel Formula:**
```excel
=Transition!D13
```

**Expected Result:** `893750`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C8

**Excel Formula:**
```excel
=Software!F7+Software!F18+Software!F30
```

**Expected Result:** `2762815.625`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 627 more formulas*

### Business impact

**Formula Count:** 109

#### B4

**Excel Formula:**
```excel
=IF('Initial Screens'!C8="Government and Non-Profit","Annual operating budget","Annual revenue")
```

**Expected Result:** `Annual revenue`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A5

**Excel Formula:**
```excel
=IF('Initial Screens'!C8="Government","Hide","Show")
```

**Expected Result:** `Show`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F8

**Excel Formula:**
```excel
=ROUND(Benchmarks!$D$10,2)
```

**Expected Result:** `97.5`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H8

**Excel Formula:**
```excel
="Skillsoft 2024 IT Skills and Salary Report Benchmark for "&'Initial Screens'!$C$9&" "&'Initial Screens'!$C$8&" + conservative "&FIXED(Benchmarks!$D$45*100,1)&"% burden rate per"
```

**Expected Result:** `Skillsoft 2024 IT Skills and Salary Report Benchmark for AMER Financial Services + conservative 45.0% burden rate per`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A10

**Excel Formula:**
```excel
=IF('Initial Screens'!$C$8="Government","Show","hide")
```

**Expected Result:** `hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D10

**Excel Formula:**
```excel
=IF('Initial Screens'!$C$8="Government","No",IF(C10="","No",C10))
```

**Expected Result:** `No`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A12

**Excel Formula:**
```excel
=IF(AND($A$10="Show",$D$10="Yes"),"Show","Hide")
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A14

**Excel Formula:**
```excel
=$A$12
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### A15

**Excel Formula:**
```excel
=$A$12
```

**Expected Result:** `Hide`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### F15

**Excel Formula:**
```excel
=F4
```

**Expected Result:** `1000000000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 99 more formulas*

### ROI Results

**Formula Count:** 816

#### B3

**Excel Formula:**
```excel
=TODAY()
```

**Expected Result:** `2025-11-21 00:00:00`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B8

**Excel Formula:**
```excel
=AnalysisTerm&"-Year Net Present Value (NPV)"
```

**Expected Result:** `10-Year Net Present Value (NPV)`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E8

**Excel Formula:**
```excel
=ROUND(NPV(I7,F47:K47)+E47,0)
```

**Expected Result:** `31216461`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### I8

**Excel Formula:**
```excel
=5%
```

**Expected Result:** `0.05`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B9

**Excel Formula:**
```excel
=AnalysisTerm&"-Year Return on Investment (ROI)"
```

**Expected Result:** `10-Year Return on Investment (ROI)`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E9

**Excel Formula:**
```excel
=ROUND(O47/O46,2)
```

**Expected Result:** `9.75`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### I9

**Excel Formula:**
```excel
=3%
```

**Expected Result:** `0.03`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E10

**Excel Formula:**
```excel
=ROUND(O115,0)&" Months"
```

**Expected Result:** `12 Months`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### E11

**Excel Formula:**
```excel
=E8/(AnalysisTerm*12)
```

**Expected Result:** `260137.175`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### H12

**Excel Formula:**
```excel
=IF(AnalysisTerm<=3,"hide column","show column")
```

**Expected Result:** `show column`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 806 more formulas*

### Sustainability

**Formula Count:** 88

#### B2

**Excel Formula:**
```excel
="Projected Sustainability Benefit Over "&AnalysisTerm&" Years"
```

**Expected Result:** `Projected Sustainability Benefit Over 10 Years`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C3

**Excel Formula:**
```excel
=C50
```

**Expected Result:** `17787.484`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C4

**Excel Formula:**
```excel
=ROUND(C3*C12,0)
```

**Expected Result:** `9819`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C5

**Excel Formula:**
```excel
=ROUNDUP(C4/C18,0)
```

**Expected Result:** `2116`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C6

**Excel Formula:**
```excel
=ROUNDUP(C4/C22,0)
```

**Expected Result:** `163650`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C10

**Excel Formula:**
```excel
=ROUND(1217.44,2)
```

**Expected Result:** `1217.44`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C11

**Excel Formula:**
```excel
=ROUND(2204.6,2)
```

**Expected Result:** `2204.6`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C12

**Excel Formula:**
```excel
=ROUND(C10/C11,3)
```

**Expected Result:** `0.552`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C14

**Excel Formula:**
```excel
=ROUND(0.994,3)
```

**Expected Result:** `0.994`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### C15

**Excel Formula:**
```excel
=ROUND(11520,0)
```

**Expected Result:** `11520`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 78 more formulas*

### Transition

**Formula Count:** 47

#### B6

**Excel Formula:**
```excel
="The Value Model looks at actual costs and the value of "&'Initial Screens'!C13&" in the customers environment ramping over time taking into account adoption timeframes and investments."
```

**Expected Result:** `The Value Model looks at actual costs and the value of VCF 9 in the customers environment ramping over time taking into account adoption timeframes and investments.`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B8

**Excel Formula:**
```excel
='Initial Screens'!C13&" TCO Results Overview"
```

**Expected Result:** `VCF 9 TCO Results Overview`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B11

**Excel Formula:**
```excel
='ROI Results'!O85
```

**Expected Result:** `27627723.82543159`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D11

**Excel Formula:**
```excel
=Compute!F24+Compute!F86+Compute!F108*(1+AnalysisTerm*Compute!F111)
```

**Expected Result:** `8937500`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B12

**Excel Formula:**
```excel
='ROI Results'!O86
```

**Expected Result:** `9458613.26258312`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D12

**Excel Formula:**
```excel
=Storage!F34+Compute!F109*(1+AnalysisTerm*Compute!F111)
```

**Expected Result:** `2940000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B13

**Excel Formula:**
```excel
='ROI Results'!O87
```

**Expected Result:** `2743020.2907715766`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D13

**Excel Formula:**
```excel
=Network!F19+Network!F34+Network!F56+Compute!F110*(1+AnalysisTerm*Compute!F111)
```

**Expected Result:** `893750`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### B14

**Excel Formula:**
```excel
='ROI Results'!O88
```

**Expected Result:** `8881408.000000002`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D14

**Excel Formula:**
```excel
=Software!F21+'ROI Results'!O37/(1-'ROI Results'!F34)
```

**Expected Result:** `10000000`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 37 more formulas*

### Benchmarks

**Formula Count:** 26

#### D6

**Excel Formula:**
```excel
=D38/1880*(1+D41)
```

**Expected Result:** `97.49630319148935`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D7

**Excel Formula:**
```excel
=D6/(1+D$41)*D$60*(1+D$42)
```

**Expected Result:** `52.61877489819894`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D8

**Excel Formula:**
```excel
=D6/(1+D$41)*D$61*(1+D$43)
```

**Expected Result:** `46.2830218296959`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D9

**Excel Formula:**
```excel
=D6/(1+D$41)*D$62*(1+D$44)
```

**Expected Result:** `45.2406836622334`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D10

**Excel Formula:**
```excel
=OFFSET(D5,MATCH('Initial Screens'!$C$9,Benchmarks!B6:B9,0),0)
```

**Expected Result:** `97.49630319148935`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D12

**Excel Formula:**
```excel
=D$6*D48*1880
```

**Expected Result:** `175032.71186059655`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D13

**Excel Formula:**
```excel
=D$7*D51*1880
```

**Expected Result:** `83534.04980523096`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D14

**Excel Formula:**
```excel
=D12/(1+D$41)*D$61*(1+D$43)
```

**Expected Result:** `83090.76917556416`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D15

**Excel Formula:**
```excel
=D12/(1+D$41)*D$62*(1+D$44)
```

**Expected Result:** `81219.48513550744`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

#### D16

**Excel Formula:**
```excel
=OFFSET(D11,MATCH('Initial Screens'!$C$9,Benchmarks!B12:B15,0),0)
```

**Expected Result:** `175032.71186059655`

**Implementation Notes:**
- Parse formula and extract cell references
- Replace cell references with variable lookups
- Convert Excel functions to JavaScript/Python equivalents
- Handle errors and edge cases

*... and 16 more formulas*

## Building the Dependency Graph


To properly implement the calculation engine, you need to:

1. **Parse all formulas** to extract dependencies
2. **Build a directed acyclic graph (DAG)** where:
   - Nodes = cells
   - Edges = dependencies (A depends on B if A's formula references B)
3. **Topologically sort** the DAG to determine calculation order
4. **Calculate cells** in the sorted order

### Example Dependency Chain

```
'Initial Screens'!C16 (VMs input) 
  → Compute!F5 (VMs reference)
    → Compute!F7 (VMs/Host calculation)
      → Compute!F17 (Future VMs/Host)
        → ROI Results!... (Final metrics)
```

### JavaScript Implementation Example

```javascript
class CalculationEngine {
  constructor() {
    this.cells = new Map(); // cell reference -> value
    this.formulas = new Map(); // cell reference -> formula function
    this.dependencies = new Map(); // cell reference -> [dependencies]
  }
  
  registerFormula(cellRef, formula, dependencies) {
    this.formulas.set(cellRef, formula);
    this.dependencies.set(cellRef, dependencies);
  }
  
  setValue(cellRef, value) {
    this.cells.set(cellRef, value);
    this.recalculateDependents(cellRef);
  }
  
  recalculateDependents(cellRef) {
    // Find all cells that depend on this cell
    const toRecalculate = this.findDependents(cellRef);
    
    // Topologically sort them
    const sorted = this.topologicalSort(toRecalculate);
    
    // Calculate in order
    for (const cell of sorted) {
      const formula = this.formulas.get(cell);
      if (formula) {
        const value = formula(this.cells);
        this.cells.set(cell, value);
      }
    }
  }
  
  topologicalSort(cells) {
    // Implement Kahn's algorithm or DFS
    // ...
  }
  
  findDependents(cellRef) {
    // Find all cells that transitively depend on cellRef
    // ...
  }
}
```

### Python Implementation Example

```python
import networkx as nx
from typing import Dict, Callable, List

class CalculationEngine:
    def __init__(self):
        self.cells: Dict[str, any] = {}
        self.formulas: Dict[str, Callable] = {}
        self.graph = nx.DiGraph()
    
    def register_formula(self, cell_ref: str, formula: Callable, dependencies: List[str]):
        self.formulas[cell_ref] = formula
        for dep in dependencies:
            self.graph.add_edge(dep, cell_ref)
    
    def set_value(self, cell_ref: str, value: any):
        self.cells[cell_ref] = value
        self.recalculate_dependents(cell_ref)
    
    def recalculate_dependents(self, cell_ref: str):
        # Get all descendants (cells that depend on this cell)
        dependents = nx.descendants(self.graph, cell_ref)
        
        # Topologically sort them
        subgraph = self.graph.subgraph([cell_ref] + list(dependents))
        sorted_cells = list(nx.topological_sort(subgraph))
        
        # Calculate in order
        for cell in sorted_cells:
            if cell in self.formulas:
                formula = self.formulas[cell]
                self.cells[cell] = formula(self.cells)
```
