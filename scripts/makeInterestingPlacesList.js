const fs = require('fs');

const data = [
    {
      Place: "Fucino",
      URL: "#mapCenter=13.60505%2C41.97629%2C13.953&mode=dynamic&mainScene=2024-07-13%7CColor+Infrared+for+Visualization%7C1788697"
    },
    {
      Place: "Mississippi",
      URL: "#mapCenter=-89.51169%2C29.37701%2C12.000&mode=dynamic&mainScene=%7CShort-wave+Infrared+for+Visualization%7C&hideMapLabels=true"
    },
    {
      Place: "Rub’ al Khali",
      URL: "#mapCenter=55.02280%2C21.38538%2C13.027&mode=dynamic&mainScene=%7CNatural+Color+for+Visualization%7C"
    },
    {
      Place: "Wilpena Pound",
      URL: "#mapCenter=138.60310%2C-31.55500%2C12.000&mode=dynamic&mainScene=%7CAgriculture+for+Visualization%7C"
    },
    {
      Place: "Richat",
      URL: "#mapCenter=-11.39800%2C21.12400%2C13.000&mode=dynamic&mainScene=%7CUrban+for+Visualization%7C"
    },
    {
      Place: "Emi Koussi",
      URL: "#mapCenter=18.53636%2C19.86560%2C12.000&mode=dynamic&mainScene=%7CShort-wave+Infrared+for+Visualization%7C"
    },
    {
      Place: "Tanezrouft",
      URL: "#mapCenter=2.30945%2C25.29752%2C12.000&mode=dynamic&mainScene=%7CAgriculture+for+Visualization%7C"
    },
    {
      Place: "Santa Cruz",
      URL: "#mapCenter=-62.75816%2C-16.73662%2C13.953&mode=dynamic&mainScene=%7CNatural+Color+for+Visualization%7C"
    },
    {
      Place: "Kumpupintil",
      URL: "#mapCenter=122.87724%2C-23.46876%2C11.000&mode=dynamic&mainScene=2024-08-21%7CAgriculture+for+Visualization%7C685711"
    }
  ];

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


