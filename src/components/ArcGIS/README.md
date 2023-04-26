## ArcGIS API for JavaScript items as React Components

### MapView
```jsx
// will pass a property called 'mapView' with MapView object to all children components
<MapView 
    webmapId='5f3b7605b3364e7bb2416c93fae00995'
>
</MapView>
```

### SearchWidget
```jsx
<SearchWidget 
    position='top-leading'
    searchCompletedHandler={(result)=>{
        console.log(result)
    }}
/>
```