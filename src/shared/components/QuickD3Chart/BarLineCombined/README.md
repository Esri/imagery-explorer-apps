## install dependencies:

```shell
npm install d3@5.16.0 @types/d3@5.16.3
```

## Usage

```jsx

import {
    BarLineCombined
} from './QuickD3Chart';

import {
    QuickD3ChartData
} from './QuickD3Chart/types';

// Chart Data
const data: QuickD3ChartData = [
    {
        "key": 1577836800000,
        "value": 7
    }, {
        "key": 1580515200000,
        "value": 2
    }, {
        "key": 1583020800000,
        "value": 1
    }, {
        "key": 1585699200000,
        "value": 9
    }, {
        "key": 1588291200000,
        "value": 2
    }
]

// Bar and Line Combined
<BarLineCombined 
    timeFormatSpecifier='%b %d'
    data4Bars={data}
    data4Line={data}
/>

// Bar Only
<BarLineCombined 
    barColor='green'
    data4Bars={CO2PPMData}
    numOfTicksOnXAxisToHide={120}
/>

// Line Only
<BarLineCombined 
    timeFormatSpecifier='%b'
    data4Line={data}
    lineColor='pink'
    lineWidth={3}
/>
```
## Properties:

| Name        | Type           |  Required | Description |
| ------------- |:-------------| :-----| :-----|
| data4Bars | QuickD3ChartDataItem[]  | false |  |
| data4Line | QuickD3ChartDataItem[]  | false |  |
| margin | object | false | `{ top: 20, right: 20, bottom: 30, left: 40}` |
| timeFormatSpecifier | string | false | d3 string specifier to format time. Bar chart would convert `key` for each data item into `Date` before drawing if `timeFormatSpecifier` is provided. here is the detailed list of specifiers: https://github.com/d3/d3-time-format#locale_format |
| barColor | string | false | e.g. `#56a5d8` |
| lineColor | string | false | e.g. `#56a5d8` |
| lineWidth | number | false | |
| resizable | boolean | false | resizable is `true` by defaut |
| showAxis | boolean | false | showAxis is `true` by defaut |

## Customizations: