const fs = require('fs');

const data = [
    {
        "Place": "Singapore",
        "URL": "#mapCenter=103.775%2C1.235%2C11.557&mode=dynamic&mainScene=2023-05-02%7CNatural+Color+with+DRA%7C8722521"
    },
    {
        "Place": "Everest",
        "URL": "#mapCenter=86.983%2C27.952%2C11.557&mode=dynamic&mainScene=2023-05-02%7CNatural+Color+with+DRA%7C8722521"
    },
    {
        "Place": "Manicouagan",
        "URL": "#mapCenter=-68.631%2C51.389%2C10.000&mode=dynamic&mainScene=2023-05-02%7CShort-wave+Infrared+with+DRA%7C8722521"
    },
    {
        "Place": "Giza Pyramids",
        "URL": "#mapCenter=31.130%2C29.977%2C14.497&mode=dynamic&mainScene=2023-05-02%7CNatural+Color+with+DRA%7C8722521"
    },
    {
        "Place": "Ganges Delta",
        "URL": "#mapCenter=89.080%2C21.909%2C11.557&mode=dynamic&mainScene=2023-05-02%7CNDVI+Colorized%7C8722521"
    },
    {
        "Place": "Mt. Fuji",
        "URL": "#mapCenter=138.731%2C35.367%2C12.958&mode=dynamic&mainScene=2023-05-02%7CColor+Infrared+with+DRA%7C8722521"
    },
    {
        "Place": "Grand Canyon",
        "URL": "#mapCenter=-112.913%2C36.242%2C12.430&mode=dynamic&mainScene=2023-05-02%7CShort-wave+Infrared+with+DRA%7C8722521"
    },
    {
        "Place": "Richat",
        "URL": "#mapCenter=-11.398%2C21.124%2C12.430&mode=dynamic&mainScene=2023-05-02%7CGeology+with+DRA%7C8722521"
    },
    {
        "Place": "Aral Sea",
        "URL": "#mapCenter=59.311%2C45.091%2C9.493&mode=dynamic&mainScene=2023-05-02%7CNatural+Color+with+DRA%7C8722521"
    },
    {
        "Place": "Irrigation",
        "URL": "#mapCenter=-99.383%2C37.616%2C12.000&mode=dynamic&mainScene=2023-05-02%7CAgriculture+with+DRA%7C"
    },
    {
        "Place": "Key West",
        "URL": "#mapCenter=-81.694%2C24.615%2C12.000&mode=dynamic&mainScene=2023-05-02%7CBathymetric+with+DRA%7C"
    },
    {
        "Place": "Kilimanjaro",
        "URL": "#mapCenter=37.356%2C-3.066%2C12.000&mode=dynamic&mainScene=2023-05-02%7CLandsat_TIRS1_Temperature_Farhenheit_Colorized%7C8715559"
    }
]

const decodeMapCenter = (value)=>{
    if (!value) {
        return null;
    }

    const [longitude, latitude, zoom] = value.split(',');

    if (!longitude || !latitude || !zoom) {
        return null;
    }

    return {
        center: [+longitude, +latitude],
        zoom: +zoom,
    };
}

const decodeQueryParams4ImageryScene = (
    val
) => {
    if (!val) {
        return null;
    }

    const [acquisitionDate, rasterFunctionName, objectId] = val.split('|');

    return {
        acquisitionDate,
        rasterFunctionName,
        objectIdOfSelectedScene: objectId ? +objectId : null,
        cloudCover: 0.5,
        animationFrameId: null,
    };
};

const output = []

for(const item of data){
    const { Place, URL } = item;

    const [host, hash] = URL.split('#')
    const params = new URLSearchParams(hash)

    const center = decodeMapCenter(params.get('mapCenter'));
    const queryParams = decodeQueryParams4ImageryScene(params.get('mainScene'))

    output.push({
        place: Place,
        location: center,
        renderer: queryParams.rasterFunctionName
    })
}

fs.writeFileSync('interesting-places.json', JSON.stringify(output, null, 2))


