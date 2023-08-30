const fs = require('fs');

const data = [
    {
        "Place": "Lake Mackay",
        "URL": "#mapCenter=128.736%2C-22.494%2C12.000&mode=dynamic&mainScene=2023-06-04%7CAgriculture+with+DRA%7C8789455"
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
        name: Place,
        location: center,
        renderer: queryParams.rasterFunctionName
    })
}

fs.writeFileSync('interesting-places.json', JSON.stringify(output, null, 2))


