"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[5423,5831],{12408:function(e,r,a){a.d(r,{L:function(){return n}});var t=a(40371);class n{constructor(){this._serviceMetadatas=new Map,this._itemDatas=new Map}async fetchServiceMetadata(e,r){const a=this._serviceMetadatas.get(e);if(a)return a;const n=await(0,t.T)(e,r);return this._serviceMetadatas.set(e,n),n}async fetchItemData(e){const{id:r}=e;if(!r)return null;const{_itemDatas:a}=this;if(a.has(r))return a.get(r);const t=await e.fetchData();return a.set(r,t),t}async fetchCustomParameters(e,r){const a=await this.fetchItemData(e);return a&&"object"==typeof a&&(r?r(a):a.customParameters)||null}}},53264:function(e,r,a){a.d(r,{w:function(){return y}});var t=a(88256),n=a(66341),i=a(70375),s=a(78668),c=a(20692),o=a(93968),l=a(53110);async function y(e,r){const a=(0,c.Qc)(e);if(!a)throw new i.Z("invalid-url","Invalid scene service url");const y={...r,sceneServerUrl:a.url.path,layerId:a.sublayer??void 0};if(y.sceneLayerItem??=await async function(e){const r=(await u(e)).serviceItemId;if(!r)return null;const a=new l.default({id:r,apiKey:e.apiKey}),i=await async function(e){const r=t.id?.findServerInfo(e.sceneServerUrl);if(r?.owningSystemUrl)return r.owningSystemUrl;const a=e.sceneServerUrl.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const r=(await(0,n.Z)(a,{query:{f:"json"},responseType:"json",signal:e.signal})).data.owningSystemUrl;if(r)return r}catch(e){(0,s.r9)(e)}return null}(e);null!=i&&(a.portal=new o.Z({url:i}));try{return a.load({signal:e.signal})}catch(e){return(0,s.r9)(e),null}}(y),null==y.sceneLayerItem)return L(y.sceneServerUrl.replace("/SceneServer","/FeatureServer"),y);const f=await async function({sceneLayerItem:e,signal:r}){if(!e)return null;try{const a=(await e.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:r})).find((e=>"Feature Service"===e.type))||null;if(!a)return null;const t=new l.default({portal:a.portal,id:a.id});return await t.load(),t}catch(e){return(0,s.r9)(e),null}}(y);if(!f?.url)throw new i.Z("related-service-not-found","Could not find feature service through portal item relationship");y.featureServiceItem=f;const p=await L(f.url,y);return p.portalItem=f,p}async function u(e){if(e.rootDocument)return e.rootDocument;const r={query:{f:"json",...e.customParameters,token:e.apiKey},responseType:"json",signal:e.signal};try{const a=await(0,n.Z)(e.sceneServerUrl,r);e.rootDocument=a.data}catch{e.rootDocument={}}return e.rootDocument}async function L(e,r){const a=(0,c.Qc)(e);if(!a)throw new i.Z("invalid-feature-service-url","Invalid feature service url");const t=a.url.path,s=r.layerId;if(null==s)return{serverUrl:t};const o=u(r),l=r.featureServiceItem?await r.featureServiceItem.fetchData("json"):null,y=(l?.layers?.[0]||l?.tables?.[0])?.customParameters,L=e=>{const a={query:{f:"json",...y},responseType:"json",authMode:e,signal:r.signal};return(0,n.Z)(t,a)},f=L("anonymous").catch((()=>L("no-prompt"))),[p,d]=await Promise.all([f,o]),m=d?.layers,S=p.data&&p.data.layers;if(!Array.isArray(S))throw new Error("expected layers array");if(Array.isArray(m)){for(let e=0;e<Math.min(m.length,S.length);e++)if(m[e].id===s)return{serverUrl:t,layerId:S[e].id}}else if(null!=s&&s<S.length)return{serverUrl:t,layerId:S[s].id};throw new Error("could not find matching associated sublayer")}},45423:function(e,r,a){a.r(r),a.d(r,{populateGroupLayer:function(){return b},populateOperationalLayers:function(){return y}});var t=a(6865),n=(a(39994),a(12408)),i=a(92557),s=a(53110);function c(e,r){return!(!e.layerType||"ArcGISFeatureLayer"!==e.layerType)&&e.featureCollectionType===r}var o=a(55831),l=a(16603);async function y(e,r,a){if(!r)return;const t=r.map((e=>async function(e,r){return async function(e,r,a){const t=new e;return t.read(r,a.context),"group"===t.type&&("GroupLayer"===r.layerType?await b(t,r,a):T(r)?function(e,r,a){r.itemId&&(e.portalItem=new s.default({id:r.itemId,portal:a?.portal}),e.when((()=>{const t=t=>{const n=t.layerId;G(t,e,r,n,a);const i=r.featureCollection?.layers?.[n];i&&t.read(i,a)};e.layers?.forEach(t),e.tables?.forEach(t)})))}(t,r,a.context):h(r)&&await async function(e,r,a){const t=i.T.FeatureLayer,n=await t(),s=r.featureCollection,c=s?.showLegend,o=s?.layers?.map(((t,i)=>{const s=new n;s.read(t,a);const o={...a,ignoreDefaults:!0};return G(s,e,r,i,o),null!=c&&s.read({showLegend:c},o),s}));e.layers.addMany(o??[])}(t,r,a.context)),await(0,l.y)(t,a.context),t}(await v(e,r),e,r)}(e,a))),n=await Promise.allSettled(t);for(const r of n)"rejected"===r.status||r.value&&e.add(r.value)}const u={ArcGISDimensionLayer:"DimensionLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",OGCFeatureLayer:"OGCFeatureLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",GeoJSON:"GeoJSONLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",IntegratedMesh3DTilesLayer:"IntegratedMesh3DTilesLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer",Voxel:"VoxelLayer",LineOfSightLayer:"LineOfSightLayer"},L={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},f={ArcGISFeatureLayer:"FeatureLayer"},p={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",ArcGISSceneServiceLayer:"SceneLayer",DefaultTileLayer:"TileLayer"},d={ArcGISAnnotationLayer:"UnsupportedLayer",ArcGISDimensionLayer:"UnsupportedLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",CatalogLayer:"CatalogLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoRSS:"GeoRSSLayer",GeoJSON:"GeoJSONLayer",GroupLayer:"GroupLayer",KML:"KMLLayer",KnowledgeGraphLayer:"UnsupportedLayer",MediaLayer:"MediaLayer",OGCFeatureLayer:"OGCFeatureLayer",OrientedImageryLayer:"OrientedImageryLayer",SubtypeGroupLayer:"SubtypeGroupLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},m={ArcGISFeatureLayer:"FeatureLayer",SubtypeGroupTable:"UnsupportedLayer"},S={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"},I={...d,LinkChartLayer:"LinkChartLayer"},w={...m},g={...S};async function v(e,r){const a=r.context,t=M(a);let l=e.layerType||e.type;!l&&r?.defaultLayerType&&(l=r.defaultLayerType);const y=t[l];let u=y?i.T[y]:i.T.UnknownLayer;if(T(e)){const r=a?.portal;if(e.itemId){const a=new s.default({id:e.itemId,portal:r});await a.load();const t=(await(0,o.v)(a,new n.L)).className||"UnknownLayer";u=i.T[t]}}else"ArcGISFeatureLayer"===l?function(e){return c(e,"notes")}(e)||function(e){return c(e,"markup")}(e)?u=i.T.MapNotesLayer:function(e){return c(e,"route")}(e)?u=i.T.RouteLayer:h(e)&&(u=i.T.GroupLayer):e.wmtsInfo?.url&&e.wmtsInfo.layerIdentifier?u=i.T.WMTSLayer:"WFS"===l&&"2.0.0"!==e.wfsInfo?.version&&(u=i.T.UnsupportedLayer);return u()}function h(e){return"ArcGISFeatureLayer"===e.layerType&&!T(e)&&(e.featureCollection?.layers?.length??0)>1}function T(e){return"Feature Collection"===e.type}function M(e){let r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=p;break;case"ground":r=L;break;case"tables":r=f;break;default:r=u}break;case"link-chart":switch(e.layerContainerType){case"basemap":r=g;break;case"tables":r=w;break;default:r=I}break;default:switch(e.layerContainerType){case"basemap":r=S;break;case"tables":r=m;break;default:r=d}}return r}async function b(e,r,a){const n=new t.Z,i=y(n,Array.isArray(r.layers)?r.layers:[],a);try{try{if(await i,"group"===e.type)return e.layers.addMany(n),e}catch(r){e.destroy();for(const e of n)e.destroy();throw r}}catch(e){throw e}}function G(e,r,a,t,n){e.read({id:`${r.id}-sublayer-${t}`,visibility:a.visibleLayers?.includes(t)??!0},n)}},91362:function(e,r,a){a.d(r,{$O:function(){return i},CD:function(){return L},H2:function(){return u},Ok:function(){return s},Q4:function(){return o},XX:function(){return l},_Y:function(){return y},bS:function(){return n},uE:function(){return c}});var t=a(53264);function n(e){const r={id:e.id,name:e.name};return"Oriented Imagery Layer"===e.type&&(r.layerType="OrientedImageryLayer"),r}async function i(e,r,a){if(null==e?.layers||null==e?.tables){const t=await a.fetchServiceMetadata(r,{customParameters:c(e)?.customParameters});(e=e||{}).layers=e.layers||t?.layers?.map(n),e.tables=e.tables||t?.tables?.map(n)}return e}function s(e){const{layers:r,tables:a}=e;return r?.length?r[0].id:a?.length?a[0].id:null}function c(e){if(!e)return null;const{layers:r,tables:a}=e;return r?.length?r[0]:a?.length?a[0]:null}function o(e){return(e?.layers?.length??0)+(e?.tables?.length??0)}function l(e){const r=[];return e?.layers?.forEach((e=>{"SubtypeGroupLayer"===e.layerType&&r.push(e.id)})),r}function y(e){return e?.layers?.filter((({layerType:e})=>"OrientedImageryLayer"===e)).map((({id:e})=>e))}function u(e){return e?.layers?.filter((({layerType:e})=>"CatalogLayer"===e)).map((({id:e})=>e))}async function L(e,r,a){if(!e?.url)return r??{};if(r??={},!r.layers){const t=await a.fetchServiceMetadata(e.url);r.layers=t.layers?.map(n)}const{serverUrl:i,portalItem:s}=await(0,t.w)(e.url,{sceneLayerItem:e,customParameters:c(r)?.customParameters}).catch((()=>({serverUrl:null,portalItem:null})));if(null==i)return r.tables=[],r;if(!r.tables&&s){const e=await s.fetchData();if(e?.tables)r.tables=e.tables.map(n);else{const t=await a.fetchServiceMetadata(i,{customParameters:c(e)?.customParameters});r.tables=t?.tables?.map(n)}}if(r.tables)for(const e of r.tables)e.url=`${i}/${e.id}`;return r}},55831:function(e,r,a){a.d(r,{fromItem:function(){return u},v:function(){return L}});var t=a(70375),n=a(53264),i=a(12408),s=a(54957),c=a(92557),o=a(53110),l=a(91362),y=a(31370);async function u(e){!e.portalItem||e.portalItem instanceof o.default||(e={...e,portalItem:new o.default(e.portalItem)});const r=await async function(e){await e.load();const r=new i.L;return async function(e){const r=e.className,a=c.T[r];return{constructor:await a(),properties:e.properties}}(await L(e,r))}(e.portalItem);return new(0,r.constructor)({portalItem:e.portalItem,...r.properties})}async function L(e,r){switch(e.type){case"3DTiles Service":return{className:"IntegratedMesh3DTilesLayer"};case"CSV":return{className:"CSVLayer"};case"Feature Collection":return async function(e){await e.load();const r=(0,y._$)(e,"Map Notes"),a=(0,y._$)(e,"Markup");if(r||a)return{className:"MapNotesLayer"};if((0,y._$)(e,"Route Layer"))return{className:"RouteLayer"};const t=await e.fetchData();return 1===(0,l.Q4)(t)?{className:"FeatureLayer"}:{className:"GroupLayer"}}(e);case"Feature Service":return async function(e,r){const a=await f(e,r);if("object"==typeof a){const{sourceJSON:e,className:r}=a,t={sourceJSON:e};return null!=a.id&&(t.layerId=a.id),{className:r||"FeatureLayer",properties:t}}return{className:"GroupLayer"}}(e,r);case"Feed":case"Stream Service":return{className:"StreamLayer"};case"GeoJson":return{className:"GeoJSONLayer"};case"Group Layer":return{className:"GroupLayer"};case"Image Service":return async function(e,r){await e.load();const a=e.typeKeywords?.map((e=>e.toLowerCase()))??[];if(a.includes("elevation 3d layer"))return{className:"ElevationLayer"};if(a.includes("tiled imagery"))return{className:"ImageryTileLayer"};const t=await r.fetchItemData(e),n=t?.layerType;if("ArcGISTiledImageServiceLayer"===n)return{className:"ImageryTileLayer"};if("ArcGISImageServiceLayer"===n)return{className:"ImageryLayer"};const i=await r.fetchServiceMetadata(e.url,{customParameters:await r.fetchCustomParameters(e)}),s=i.cacheType?.toLowerCase(),c=i.capabilities?.toLowerCase().includes("tilesonly");return"map"===s||c?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}(e,r);case"KML":return{className:"KMLLayer"};case"Map Service":return async function(e,r){return await async function(e,r){const{tileInfo:a}=await r.fetchServiceMetadata(e.url,{customParameters:await r.fetchCustomParameters(e)});return a}(e,r)?{className:"TileLayer"}:{className:"MapImageLayer"}}(e,r);case"Media Layer":return{className:"MediaLayer"};case"Scene Service":return async function(e,r){const a=await f(e,r,(async()=>{try{if(!e.url)return[];const{serverUrl:a}=await(0,n.w)(e.url,{sceneLayerItem:e}),t=await r.fetchServiceMetadata(a);return t?.tables??[]}catch{return[]}}));if("object"==typeof a){const t={};let n;if(null!=a.id?(t.layerId=a.id,n=`${e.url}/layers/${a.id}`):n=e.url,e.typeKeywords?.length)for(const r of Object.keys(s.fb))if(e.typeKeywords.includes(r))return{className:s.fb[r]};const i=await r.fetchServiceMetadata(n,{customParameters:await r.fetchCustomParameters(e,(e=>(0,l.uE)(e)?.customParameters))});return{className:s.fb[i?.layerType]||"SceneLayer",properties:t}}if(!1===a){const a=await r.fetchServiceMetadata(e.url);if("Voxel"===a?.layerType)return{className:"VoxelLayer"}}return{className:"GroupLayer"}}(e,r);case"Vector Tile Service":return{className:"VectorTileLayer"};case"WFS":return{className:"WFSLayer"};case"WMS":return{className:"WMSLayer"};case"WMTS":return{className:"WMTSLayer"};default:throw new t.Z("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type})}}async function f(e,r,a){const{url:t,type:n}=e,i="Feature Service"===n;if(!t)return{};if(/\/\d+$/.test(t)){if(i){const a=await r.fetchServiceMetadata(t,{customParameters:await r.fetchCustomParameters(e,(e=>(0,l.uE)(e)?.customParameters))});if("Oriented Imagery Layer"===a.type)return{id:a.id,className:"OrientedImageryLayer",sourceJSON:a}}return{}}await e.load();let s=await r.fetchItemData(e);if(i){const e=await(0,l.$O)(s,t,r),a=p(e);if("object"==typeof a){const r=(0,l.XX)(e),t=(0,l._Y)(e),n=(0,l.H2)(e);a.className=null!=a.id&&r.includes(a.id)?"SubtypeGroupLayer":null!=a.id&&t?.includes(a.id)?"OrientedImageryLayer":null!=a.id&&n?.includes(a.id)?"CatalogLayer":"FeatureLayer"}return a}if("Scene Service"===n&&(s=await(0,l.CD)(e,s,r)),(0,l.Q4)(s)>0)return p(s);const c=await r.fetchServiceMetadata(t);return a&&(c.tables=await a()),p(c)}function p(e){return 1===(0,l.Q4)(e)&&{id:(0,l.Ok)(e)}}},40371:function(e,r,a){a.d(r,{T:function(){return n}});var t=a(66341);async function n(e,r){const{data:a}=await(0,t.Z)(e,{responseType:"json",query:{f:"json",...r?.customParameters,token:r?.apiKey}});return a}}}]);