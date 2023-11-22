const path = require('path');
const fs = require('fs');
const OUTPUT_JSON_PATH = path.join(__dirname, 'formatted-data', 'output.json');
const RAW_DATA_DIR = path.join(__dirname, 'raw-data')

const getBandIndexbyWavelength = (wavelength)=>{
    if(wavelength >= 0.43 && wavelength <= 0.45){
        return 0
    }

    if(wavelength >= 0.45 && wavelength <= 0.52){
        return 1
    }

    if(wavelength >= 0.52 && wavelength <= 0.60){
        return 2
    }

    if(wavelength >= 0.63 && wavelength <= 0.69){
        return 3
    }

    if(wavelength >= 0.76 && wavelength <= 0.90){
        return 4
    }

    if(wavelength >= 1.55 && wavelength <= 1.75){
        return 5
    }

    if(wavelength >= 2.08 && wavelength <= 2.35){
        return 6
    }

    return -1
}

const convert = (rawData)=>{

    /**
     * the values from raw data will be grouped into 7 different bands by 
     * 
     * - Costal (Wavelength 0.43 - 0.45)
     * - Blue (Wavelength 0.45 - 0.52)
     * - Green (Wavelength 0.52 - 0.60)
     * - Red (Wavelength 0.63 - 0.69)
     * - NIR (Wavelength 0.76 - 0.90)
     * - SWIP1 (Wavelength 1.55 - 1.75)
     * - SWIR2 (Wavelength 2.08 - 2.35)
     */
    const valuesByBands = [...new Array(7)].map(()=>new Array())

    let featureOfInterest = ''

    // grouping by wavelength
    for(const d of rawData){
        const { Wavelength, Spectra } = d;
        const val = d[Spectra];

        if(!featureOfInterest){
            featureOfInterest = Spectra
        }

        const index = getBandIndexbyWavelength(Wavelength);

        if(index === -1){
            continue
        }

        valuesByBands[index].push(val)
    }

    // calculate average value for each band
    const aveValueByBand = valuesByBands.map(vals=>{
        const sum = vals.reduce((prev, curr)=>prev+curr, 0)
        return +(sum / vals.length).toFixed(5)
    })

    return [
        featureOfInterest,
        aveValueByBand
    ]
}

const start = ()=>{
    const output = {}

    try {
        const files = fs.readdirSync(RAW_DATA_DIR);

        files.forEach((file) => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(RAW_DATA_DIR, file);
        
                try {
                    const data = fs.readFileSync(filePath, 'utf8');
                    const jsonData = JSON.parse(data);

                    const [featureOfInterest, values] = convert(jsonData)

                    output[featureOfInterest] = values

                    // Process the JSON data here
                    // console.log(`Contents of ${file}:`, jsonData);
                } catch (readErr) {
                    console.error(`Error reading or parsing file ${file}:`, readErr);
                }
            }
        });

    } catch(err){
        console.error('Error reading directory synchronously:', err);
    }

    fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(output, null, 4), 'utf8');
}

start();