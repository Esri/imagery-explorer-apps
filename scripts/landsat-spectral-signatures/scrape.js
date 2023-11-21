const fs = require('fs');
const path = require('path')

const raw_data_dir = path.join(__dirname, 'raw-data')

/**
 * list of spectral signature data to be scraped from USGS
 */
const scrapeList = fs.readFileSync('scrape-list.txt', 'utf8')
    .split('\r\n')
    .map(d=>d.trim());

/**
 * fetch json data for each item in the list and save the data to 'raw-data' folder
 */
const startScrapingData = async()=>{
    try {
        for(const name of scrapeList){
            if(!name){
                continue
            }
    
            const filename = `${name}.json`
    
            const url = `https://landsat.usgs.gov/landsat/spectral_viewer/c3-master/htdocs/data/spectra_response/${filename}`;
    
            // console.log(url);
    
            const res = await fetch(url);

            if(!res.ok){
                console.log('failed to fetch data for ' + filename)
                continue
            }
    
            const data = await res.json()
            
            fs.writeFileSync(raw_data_dir + '/' + filename, JSON.stringify(data), 'utf8');

            // console.log('scraped data for ' + filename)
        }
    } catch(err){
        console.error(err)
    }
}

startScrapingData()