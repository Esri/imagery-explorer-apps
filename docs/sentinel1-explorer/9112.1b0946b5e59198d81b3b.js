"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[9112,5423,5831],{12408:function(e,r,a){a.d(r,{L:function(){return n}});var t=a(40371);class n{constructor(){this._serviceMetadatas=new Map,this._itemDatas=new Map}async fetchServiceMetadata(e,r){const a=this._serviceMetadatas.get(e);if(a)return a;const n=await(0,t.T)(e,r);return this._serviceMetadatas.set(e,n),n}async fetchItemData(e){const{id:r}=e;if(!r)return null;const{_itemDatas:a}=this;if(a.has(r))return a.get(r);const t=await e.fetchData();return a.set(r,t),t}async fetchCustomParameters(e,r){const a=await this.fetchItemData(e);return a&&"object"==typeof a&&(r?r(a):a.customParameters)||null}}},53264:function(e,r,a){a.d(r,{w:function(){return u}});var t=a(88256),n=a(66341),s=a(70375),i=a(78668),c=a(20692),o=a(93968),l=a(53110);async function u(e,r){const a=(0,c.Qc)(e);if(!a)throw new s.Z("invalid-url","Invalid scene service url");const u={...r,sceneServerUrl:a.url.path,layerId:a.sublayer??void 0};if(u.sceneLayerItem??=await async function(e){const r=(await y(e)).serviceItemId;if(!r)return null;const a=new l.default({id:r,apiKey:e.apiKey}),s=await async function(e){const r=t.id?.findServerInfo(e.sceneServerUrl);if(r?.owningSystemUrl)return r.owningSystemUrl;const a=e.sceneServerUrl.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const r=(await(0,n.Z)(a,{query:{f:"json"},responseType:"json",signal:e.signal})).data.owningSystemUrl;if(r)return r}catch(e){(0,i.r9)(e)}return null}(e);null!=s&&(a.portal=new o.Z({url:s}));try{return a.load({signal:e.signal})}catch(e){return(0,i.r9)(e),null}}(u),null==u.sceneLayerItem)return p(u.sceneServerUrl.replace("/SceneServer","/FeatureServer"),u);const f=await async function({sceneLayerItem:e,signal:r}){if(!e)return null;try{const a=(await e.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:r})).find((e=>"Feature Service"===e.type))||null;if(!a)return null;const t=new l.default({portal:a.portal,id:a.id});return await t.load(),t}catch(e){return(0,i.r9)(e),null}}(u);if(!f?.url)throw new s.Z("related-service-not-found","Could not find feature service through portal item relationship");u.featureServiceItem=f;const d=await p(f.url,u);return d.portalItem=f,d}async function y(e){if(e.rootDocument)return e.rootDocument;const r={query:{f:"json",...e.customParameters,token:e.apiKey},responseType:"json",signal:e.signal};try{const a=await(0,n.Z)(e.sceneServerUrl,r);e.rootDocument=a.data}catch{e.rootDocument={}}return e.rootDocument}async function p(e,r){const a=(0,c.Qc)(e);if(!a)throw new s.Z("invalid-feature-service-url","Invalid feature service url");const t=a.url.path,i=r.layerId;if(null==i)return{serverUrl:t};const o=y(r),l=r.featureServiceItem?await r.featureServiceItem.fetchData("json"):null,u=(l?.layers?.[0]||l?.tables?.[0])?.customParameters,p=e=>{const a={query:{f:"json",...u},responseType:"json",authMode:e,signal:r.signal};return(0,n.Z)(t,a)},f=p("anonymous").catch((()=>p("no-prompt"))),[d,L]=await Promise.all([f,o]),m=L?.layers,S=d.data&&d.data.layers;if(!Array.isArray(S))throw new Error("expected layers array");if(Array.isArray(m)){for(let e=0;e<Math.min(m.length,S.length);e++)if(m[e].id===i)return{serverUrl:t,layerId:S[e].id}}else if(null!=i&&i<S.length)return{serverUrl:t,layerId:S[i].id};throw new Error("could not find matching associated sublayer")}},8308:function(e,r,a){a.d(r,{V:function(){return n}});var t=a(40371);async function n(e,r){const{loadContext:a,...n}=r||{},s=a?await a.fetchServiceMetadata(e,n):await(0,t.T)(e,n);u(s),c(s);const i={serviceJSON:s};if((s.currentVersion??0)<10.5)return i;const o=`${e}/layers`,l=a?await a.fetchServiceMetadata(o,n):await(0,t.T)(o,n);return u(l),c(l),i.layersJSON={layers:l.layers,tables:l.tables},i}function s(e){return"Feature Layer"===e.type||"Oriented Imagery Layer"===e.type}function i(e){return"Table"===e.type}function c(e){e.layers=e.layers?.filter(s),e.tables=e.tables?.filter(i)}function o(e){e.type||="Feature Layer"}function l(e){e.type||="Table"}function u(e){e.layers?.forEach(o),e.tables?.forEach(l)}},45423:function(e,r,a){a.r(r),a.d(r,{populateGroupLayer:function(){return M},populateOperationalLayers:function(){return u}});var t=a(6865),n=(a(39994),a(12408)),s=a(92557),i=a(53110);function c(e,r){return!(!e.layerType||"ArcGISFeatureLayer"!==e.layerType)&&e.featureCollectionType===r}var o=a(55831),l=a(16603);async function u(e,r,a){if(!r)return;const t=r.map((e=>async function(e,r){return async function(e,r,a){const t=new e;return t.read(r,a.context),"group"===t.type&&("GroupLayer"===r.layerType?await M(t,r,a):T(r)?function(e,r,a){r.itemId&&(e.portalItem=new i.default({id:r.itemId,portal:a?.portal}),e.when((()=>{const t=t=>{const n=t.layerId;G(t,e,r,n,a);const s=r.featureCollection?.layers?.[n];s&&t.read(s,a)};e.layers?.forEach(t),e.tables?.forEach(t)})))}(t,r,a.context):v(r)&&await async function(e,r,a){const t=s.T.FeatureLayer,n=await t(),i=r.featureCollection,c=i?.showLegend,o=i?.layers?.map(((t,s)=>{const i=new n;i.read(t,a);const o={...a,ignoreDefaults:!0};return G(i,e,r,s,o),null!=c&&i.read({showLegend:c},o),i}));e.layers.addMany(o??[])}(t,r,a.context)),await(0,l.y)(t,a.context),t}(await g(e,r),e,r)}(e,a))),n=await Promise.allSettled(t);for(const r of n)"rejected"===r.status||r.value&&e.add(r.value)}const y={ArcGISDimensionLayer:"DimensionLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",OGCFeatureLayer:"OGCFeatureLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",GeoJSON:"GeoJSONLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",IntegratedMesh3DTilesLayer:"IntegratedMesh3DTilesLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer",Voxel:"VoxelLayer",LineOfSightLayer:"LineOfSightLayer"},p={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},f={ArcGISFeatureLayer:"FeatureLayer"},d={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",ArcGISSceneServiceLayer:"SceneLayer",DefaultTileLayer:"TileLayer"},L={ArcGISAnnotationLayer:"UnsupportedLayer",ArcGISDimensionLayer:"UnsupportedLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",CatalogLayer:"CatalogLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoRSS:"GeoRSSLayer",GeoJSON:"GeoJSONLayer",GroupLayer:"GroupLayer",KML:"KMLLayer",KnowledgeGraphLayer:"UnsupportedLayer",MediaLayer:"MediaLayer",OGCFeatureLayer:"OGCFeatureLayer",OrientedImageryLayer:"OrientedImageryLayer",SubtypeGroupLayer:"SubtypeGroupLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},m={ArcGISFeatureLayer:"FeatureLayer",SubtypeGroupTable:"UnsupportedLayer"},S={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"},w={...L,LinkChartLayer:"LinkChartLayer"},I={...m},h={...S};async function g(e,r){const a=r.context,t=b(a);let l=e.layerType||e.type;!l&&r?.defaultLayerType&&(l=r.defaultLayerType);const u=t[l];let y=u?s.T[u]:s.T.UnknownLayer;if(T(e)){const r=a?.portal;if(e.itemId){const a=new i.default({id:e.itemId,portal:r});await a.load();const t=(await(0,o.v)(a,new n.L)).className||"UnknownLayer";y=s.T[t]}}else"ArcGISFeatureLayer"===l?function(e){return c(e,"notes")}(e)||function(e){return c(e,"markup")}(e)?y=s.T.MapNotesLayer:function(e){return c(e,"route")}(e)?y=s.T.RouteLayer:v(e)&&(y=s.T.GroupLayer):e.wmtsInfo?.url&&e.wmtsInfo.layerIdentifier?y=s.T.WMTSLayer:"WFS"===l&&"2.0.0"!==e.wfsInfo?.version&&(y=s.T.UnsupportedLayer);return y()}function v(e){return"ArcGISFeatureLayer"===e.layerType&&!T(e)&&(e.featureCollection?.layers?.length??0)>1}function T(e){return"Feature Collection"===e.type}function b(e){let r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=d;break;case"ground":r=p;break;case"tables":r=f;break;default:r=y}break;case"link-chart":switch(e.layerContainerType){case"basemap":r=h;break;case"tables":r=I;break;default:r=w}break;default:switch(e.layerContainerType){case"basemap":r=S;break;case"tables":r=m;break;default:r=L}}return r}async function M(e,r,a){const n=new t.Z,s=u(n,Array.isArray(r.layers)?r.layers:[],a);try{try{if(await s,"group"===e.type)return e.layers.addMany(n),e}catch(r){e.destroy();for(const e of n)e.destroy();throw r}}catch(e){throw e}}function G(e,r,a,t,n){e.read({id:`${r.id}-sublayer-${t}`,visibility:a.visibleLayers?.includes(t)??!0},n)}},49112:function(e,r,a){a.d(r,{load:function(){return L}});var t=a(70375),n=a(20692),s=a(8308),i=a(12408),c=a(45423),o=a(92557),l=a(93968),u=a(84513),y=a(91362),p=a(31370),f=a(16603),d=a(40371);async function L(e,r){const a=e.instance.portalItem;if(a?.id)return await a.load(r),function(e){const r=e.instance.portalItem;if(!r?.type||!e.supportedTypes.includes(r.type))throw new t.Z("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:r?.type,expectedType:e.supportedTypes.join(", ")})}(e),e.validateItem&&e.validateItem(a),async function(e,r){const a=e.instance,n=a.portalItem;if(!n)return;const{url:o,title:l}=n,L=(0,u.h)(n,"portal-item");if("group"===a.type)return async function(e,r,a){const n=e.portalItem;if(!e.sourceIsPortalItem)return;const{title:o,type:l}=n;if("Group Layer"===l){if(!(0,p._$)(n,"Map"))throw new t.Z("portal:invalid-layer-item-typekeyword","'Group Layer' item without 'Map' type keyword is not supported");return async function(e){const r=e.portalItem,a=await r.fetchData("json");if(!a)return;const t=(0,u.h)(r,"web-map");e.read(a,t),await(0,c.populateGroupLayer)(e,a,{context:t}),e.resourceReferences={portalItem:r,paths:t.readResourcePaths??[]}}(e)}return e.read({title:o},r),async function(e,r){let a;const{portalItem:n}=e;if(!n)return;const c=n.type,o=r.layerModuleTypeMap;switch(c){case"Feature Service":case"Feature Collection":a=o.FeatureLayer;break;case"Stream Service":a=o.StreamLayer;break;case"Scene Service":a=o.SceneLayer;break;default:throw new t.Z("portal:unsupported-item-type-as-group",`The item type '${c}' is not supported as a 'IGroupLayer'`)}const l=new i.L;let[u,p]=await Promise.all([a(),w(r,l)]),f=()=>u;if("Feature Service"===c){const r=(0,y.uE)(p)?.customParameters;p=n.url?await(0,y.$O)(p,n.url,l):{};const a=(0,y.XX)(p),t=(0,y._Y)(p),i=(0,y.H2)(p),c=[];if(a.length||t?.length){a.length&&c.push("SubtypeGroupLayer"),t?.length&&c.push("OrientedImageryLayer"),i?.length&&c.push("CatalogLayer");const e=[];for(const r of c){const a=o[r];e.push(a())}const r=await Promise.all(e),n=new Map;c.forEach(((e,a)=>{n.set(e,r[a])})),f=e=>e.layerType?n.get(e.layerType)??u:u}const d=await async function(e,r){const{layersJSON:a}=await(0,s.V)(e,r);if(!a)return null;const t=[...a.layers,...a.tables];return e=>t.find((r=>r.id===e.id))}(n.url,{customParameters:r,loadContext:l});return await m(e,f,p,d)}return"Scene Service"===c&&n.url&&(p=await(0,y.CD)(n,p,l)),(0,y.Q4)(p)>0?await m(e,f,p):await async function(e,r){const{portalItem:a}=e;if(!a?.url)return;const t=await(0,d.T)(a.url);t&&m(e,r,{layers:t.layers?.map(y.bS),tables:t.tables?.map(y.bS)})}(e,f)}(e,a)}(a,L,e);o&&"media"!==a.type&&a.read({url:o},L);const S=new i.L,I=await w(e,S,r);return I&&a.read(I,L),a.resourceReferences={portalItem:n,paths:L.readResourcePaths??[]},"subtype-group"!==a.type&&a.read({title:l},L),(0,f.y)(a,L)}(e,r)}async function m(e,r,a,t){let n=a.layers||[];const s=a.tables||[];if("Feature Collection"===e.portalItem?.type?(n.forEach(((e,r)=>{e.id=r,"Table"===e?.layerDefinition?.type&&s.push(e)})),n=n.filter((e=>"Table"!==e?.layerDefinition?.type))):(n.reverse(),s.reverse()),n.forEach((n=>{const s=t?.(n);if(s||!t){const t=S(e,r(n),a,n,s);e.add(t)}})),s.length){const r=await o.T.FeatureLayer();s.forEach((n=>{const s=t?.(n);if(s||!t){const t=S(e,r,a,n,s);e.tables.add(t)}}))}}function S(e,r,a,t,n){const s=e.portalItem,i={portalItem:s.clone(),layerId:t.id};null!=t.url&&(i.url=t.url);const c=new r(i);if("sourceJSON"in c&&(c.sourceJSON=n),"subtype-group"!==c.type&&"catalog"!==c.type&&(c.sublayerTitleMode="service-name"),"Feature Collection"===s.type){const e={origin:"portal-item",portal:s.portal||l.Z.getDefault()};c.read(t,e);const r=a.showLegend;null!=r&&c.read({showLegend:r},e)}return c}async function w(e,r,a){if(!1===e.supportsData)return;const t=e.instance,s=t.portalItem;if(!s)return;let i=null;try{i=await s.fetchData("json",a)}catch(e){}if(function(e){return"stream"!==e.type&&"layerId"in e}(t)){let e=null;const a=await async function(e,r,a){if(r?.layers&&r?.tables)return(0,y.Q4)(r);const t=(0,n.Qc)(e.url);if(!t)return 1;const s=await a.fetchServiceMetadata(t.url.path,{customParameters:(0,y.uE)(r)?.customParameters}).catch((()=>null));return(r?.layers?.length??s?.layers?.length??0)+(r?.tables?.length??s?.tables?.length??0)}(s,i,r);if((i?.layers||i?.tables)&&a>0){if(null==t.layerId){const e=(0,y.XX)(i);t.layerId="subtype-group"===t.type?e?.[0]:(0,y.Ok)(i)}e=function(e,r){const{layerId:a}=r,t=e.layers?.find((e=>e.id===a))||e.tables?.find((e=>e.id===a));return t&&function(e,r){return!("feature"===r.type&&"layerType"in e&&"SubtypeGroupLayer"===e.layerType||"subtype-group"===r.type&&!("layerType"in e))}(t,r)?t:null}(i,t),e&&null!=i.showLegend&&(e.showLegend=i.showLegend)}return a>1&&"sublayerTitleMode"in t&&"service-name"!==t.sublayerTitleMode&&(t.sublayerTitleMode="item-title-and-service-name"),e}return i}},91362:function(e,r,a){a.d(r,{$O:function(){return s},CD:function(){return p},H2:function(){return y},Ok:function(){return i},Q4:function(){return o},XX:function(){return l},_Y:function(){return u},bS:function(){return n},uE:function(){return c}});var t=a(53264);function n(e){const r={id:e.id,name:e.name};return"Oriented Imagery Layer"===e.type&&(r.layerType="OrientedImageryLayer"),r}async function s(e,r,a){if(null==e?.layers||null==e?.tables){const t=await a.fetchServiceMetadata(r,{customParameters:c(e)?.customParameters});(e=e||{}).layers=e.layers||t?.layers?.map(n),e.tables=e.tables||t?.tables?.map(n)}return e}function i(e){const{layers:r,tables:a}=e;return r?.length?r[0].id:a?.length?a[0].id:null}function c(e){if(!e)return null;const{layers:r,tables:a}=e;return r?.length?r[0]:a?.length?a[0]:null}function o(e){return(e?.layers?.length??0)+(e?.tables?.length??0)}function l(e){const r=[];return e?.layers?.forEach((e=>{"SubtypeGroupLayer"===e.layerType&&r.push(e.id)})),r}function u(e){return e?.layers?.filter((({layerType:e})=>"OrientedImageryLayer"===e)).map((({id:e})=>e))}function y(e){return e?.layers?.filter((({layerType:e})=>"CatalogLayer"===e)).map((({id:e})=>e))}async function p(e,r,a){if(!e?.url)return r??{};if(r??={},!r.layers){const t=await a.fetchServiceMetadata(e.url);r.layers=t.layers?.map(n)}const{serverUrl:s,portalItem:i}=await(0,t.w)(e.url,{sceneLayerItem:e,customParameters:c(r)?.customParameters}).catch((()=>({serverUrl:null,portalItem:null})));if(null==s)return r.tables=[],r;if(!r.tables&&i){const e=await i.fetchData();if(e?.tables)r.tables=e.tables.map(n);else{const t=await a.fetchServiceMetadata(s,{customParameters:c(e)?.customParameters});r.tables=t?.tables?.map(n)}}if(r.tables)for(const e of r.tables)e.url=`${s}/${e.id}`;return r}},55831:function(e,r,a){a.d(r,{fromItem:function(){return y},v:function(){return p}});var t=a(70375),n=a(53264),s=a(12408),i=a(54957),c=a(92557),o=a(53110),l=a(91362),u=a(31370);async function y(e){!e.portalItem||e.portalItem instanceof o.default||(e={...e,portalItem:new o.default(e.portalItem)});const r=await async function(e){await e.load();const r=new s.L;return async function(e){const r=e.className,a=c.T[r];return{constructor:await a(),properties:e.properties}}(await p(e,r))}(e.portalItem);return new(0,r.constructor)({portalItem:e.portalItem,...r.properties})}async function p(e,r){switch(e.type){case"3DTiles Service":return{className:"IntegratedMesh3DTilesLayer"};case"CSV":return{className:"CSVLayer"};case"Feature Collection":return async function(e){await e.load();const r=(0,u._$)(e,"Map Notes"),a=(0,u._$)(e,"Markup");if(r||a)return{className:"MapNotesLayer"};if((0,u._$)(e,"Route Layer"))return{className:"RouteLayer"};const t=await e.fetchData();return 1===(0,l.Q4)(t)?{className:"FeatureLayer"}:{className:"GroupLayer"}}(e);case"Feature Service":return async function(e,r){const a=await f(e,r);if("object"==typeof a){const{sourceJSON:e,className:r}=a,t={sourceJSON:e};return null!=a.id&&(t.layerId=a.id),{className:r||"FeatureLayer",properties:t}}return{className:"GroupLayer"}}(e,r);case"Feed":case"Stream Service":return{className:"StreamLayer"};case"GeoJson":return{className:"GeoJSONLayer"};case"Group Layer":return{className:"GroupLayer"};case"Image Service":return async function(e,r){await e.load();const a=e.typeKeywords?.map((e=>e.toLowerCase()))??[];if(a.includes("elevation 3d layer"))return{className:"ElevationLayer"};if(a.includes("tiled imagery"))return{className:"ImageryTileLayer"};const t=await r.fetchItemData(e),n=t?.layerType;if("ArcGISTiledImageServiceLayer"===n)return{className:"ImageryTileLayer"};if("ArcGISImageServiceLayer"===n)return{className:"ImageryLayer"};const s=await r.fetchServiceMetadata(e.url,{customParameters:await r.fetchCustomParameters(e)}),i=s.cacheType?.toLowerCase(),c=s.capabilities?.toLowerCase().includes("tilesonly");return"map"===i||c?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}(e,r);case"KML":return{className:"KMLLayer"};case"Map Service":return async function(e,r){return await async function(e,r){const{tileInfo:a}=await r.fetchServiceMetadata(e.url,{customParameters:await r.fetchCustomParameters(e)});return a}(e,r)?{className:"TileLayer"}:{className:"MapImageLayer"}}(e,r);case"Media Layer":return{className:"MediaLayer"};case"Scene Service":return async function(e,r){const a=await f(e,r,(async()=>{try{if(!e.url)return[];const{serverUrl:a}=await(0,n.w)(e.url,{sceneLayerItem:e}),t=await r.fetchServiceMetadata(a);return t?.tables??[]}catch{return[]}}));if("object"==typeof a){const t={};let n;if(null!=a.id?(t.layerId=a.id,n=`${e.url}/layers/${a.id}`):n=e.url,e.typeKeywords?.length)for(const r of Object.keys(i.fb))if(e.typeKeywords.includes(r))return{className:i.fb[r]};const s=await r.fetchServiceMetadata(n,{customParameters:await r.fetchCustomParameters(e,(e=>(0,l.uE)(e)?.customParameters))});return{className:i.fb[s?.layerType]||"SceneLayer",properties:t}}if(!1===a){const a=await r.fetchServiceMetadata(e.url);if("Voxel"===a?.layerType)return{className:"VoxelLayer"}}return{className:"GroupLayer"}}(e,r);case"Vector Tile Service":return{className:"VectorTileLayer"};case"WFS":return{className:"WFSLayer"};case"WMS":return{className:"WMSLayer"};case"WMTS":return{className:"WMTSLayer"};default:throw new t.Z("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type})}}async function f(e,r,a){const{url:t,type:n}=e,s="Feature Service"===n;if(!t)return{};if(/\/\d+$/.test(t)){if(s){const a=await r.fetchServiceMetadata(t,{customParameters:await r.fetchCustomParameters(e,(e=>(0,l.uE)(e)?.customParameters))});if("Oriented Imagery Layer"===a.type)return{id:a.id,className:"OrientedImageryLayer",sourceJSON:a}}return{}}await e.load();let i=await r.fetchItemData(e);if(s){const e=await(0,l.$O)(i,t,r),a=d(e);if("object"==typeof a){const r=(0,l.XX)(e),t=(0,l._Y)(e),n=(0,l.H2)(e);a.className=null!=a.id&&r.includes(a.id)?"SubtypeGroupLayer":null!=a.id&&t?.includes(a.id)?"OrientedImageryLayer":null!=a.id&&n?.includes(a.id)?"CatalogLayer":"FeatureLayer"}return a}if("Scene Service"===n&&(i=await(0,l.CD)(e,i,r)),(0,l.Q4)(i)>0)return d(i);const c=await r.fetchServiceMetadata(t);return a&&(c.tables=await a()),d(c)}function d(e){return 1===(0,l.Q4)(e)&&{id:(0,l.Ok)(e)}}},40371:function(e,r,a){a.d(r,{T:function(){return n}});var t=a(66341);async function n(e,r){const{data:a}=await(0,t.Z)(e,{responseType:"json",query:{f:"json",...r?.customParameters,token:r?.apiKey}});return a}}}]);