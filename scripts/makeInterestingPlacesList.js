const fs = require('fs');

const data = [
    {
        "Place": "Kalahari Dunes",
        "URL": "#mapCenter=18.476%2C-23.914%2C11.692&mode=dynamic&mainScene=%7CGeology+with+DRA%7C"
    },
    {
        "Place": "Kuiseb Canyon",
        "URL": "#mapCenter=15.398%2C-23.680%2C12.430&mode=dynamic&mainScene=%7CColor+Infrared+with+DRA%7C"
    },
    {
        "Place": "Quelccaya",
        "URL": "#mapCenter=-70.819%2C-13.943%2C12.430&mode=dynamic&mainScene=%7CShort-wave+Infrared+with+DRA%7C"
    },
    {
        "Place": "Rupert Bay",
        "URL": "#mapCenter=-78.993%2C51.730%2C11.000&mode=dynamic&mainScene=2022-10-18%7CColor+Infrared+with+DRA%7C6986657"
    },
    {
        "Place": "Three Gorges",
        "URL": "#mapCenter=110.947%2C30.862%2C12.430&mode=dynamic&mainScene=2022-12-02%7CAgriculture+with+DRA%7C"
    },
    {
        "Place": "Dasht-e Kevir",
        "URL": "#mapCenter=54.557%2C34.570%2C11.000&mode=dynamic&mainScene=%7CShort-wave+Infrared+with+DRA%7C"
    },
    {
        "Place": "Ouarkziz",
        "URL": "#mapCenter=-7.531%2C29.021%2C12.000&mode=dynamic&mainScene=%7CAgriculture+with+DRA%7C"
    },
    {
        "Place": "Etosha Pan",
        "URL": "#mapCenter=16.400%2C-18.746%2C10.000&mode=dynamic&mainScene=%7CShort-wave+Infrared+with+DRA%7C"
    },
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
        name: Place,
        location: center,
        renderer: queryParams.rasterFunctionName
    })
}

fs.writeFileSync('interesting-places.json', JSON.stringify(output, null, 2))


