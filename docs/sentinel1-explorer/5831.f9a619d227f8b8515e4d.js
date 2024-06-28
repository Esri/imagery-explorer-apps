"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[5831],{12408:function(e,t,r){r.d(t,{L:function(){return n}});var a=r(40371);class n{constructor(){this._serviceMetadatas=new Map,this._itemDatas=new Map}async fetchServiceMetadata(e,t){const r=this._serviceMetadatas.get(e);if(r)return r;const n=await(0,a.T)(e,t);return this._serviceMetadatas.set(e,n),n}async fetchItemData(e){const{id:t}=e;if(!t)return null;const{_itemDatas:r}=this;if(r.has(t))return r.get(t);const a=await e.fetchData();return r.set(t,a),a}async fetchCustomParameters(e,t){const r=await this.fetchItemData(e);return r&&"object"==typeof r&&(t?t(r):r.customParameters)||null}}},53264:function(e,t,r){r.d(t,{w:function(){return o}});var a=r(88256),n=r(66341),s=r(70375),c=r(78668),i=r(20692),u=r(93968),l=r(53110);async function o(e,t){const r=(0,i.Qc)(e);if(!r)throw new s.Z("invalid-url","Invalid scene service url");const o={...t,sceneServerUrl:r.url.path,layerId:r.sublayer??void 0};if(o.sceneLayerItem??=await async function(e){const t=(await y(e)).serviceItemId;if(!t)return null;const r=new l.default({id:t,apiKey:e.apiKey}),s=await async function(e){const t=a.id?.findServerInfo(e.sceneServerUrl);if(t?.owningSystemUrl)return t.owningSystemUrl;const r=e.sceneServerUrl.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const t=(await(0,n.Z)(r,{query:{f:"json"},responseType:"json",signal:e.signal})).data.owningSystemUrl;if(t)return t}catch(e){(0,c.r9)(e)}return null}(e);null!=s&&(r.portal=new u.Z({url:s}));try{return r.load({signal:e.signal})}catch(e){return(0,c.r9)(e),null}}(o),null==o.sceneLayerItem)return f(o.sceneServerUrl.replace("/SceneServer","/FeatureServer"),o);const m=await async function({sceneLayerItem:e,signal:t}){if(!e)return null;try{const r=(await e.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:t})).find((e=>"Feature Service"===e.type))||null;if(!r)return null;const a=new l.default({portal:r.portal,id:r.id});return await a.load(),a}catch(e){return(0,c.r9)(e),null}}(o);if(!m?.url)throw new s.Z("related-service-not-found","Could not find feature service through portal item relationship");o.featureServiceItem=m;const d=await f(m.url,o);return d.portalItem=m,d}async function y(e){if(e.rootDocument)return e.rootDocument;const t={query:{f:"json",...e.customParameters,token:e.apiKey},responseType:"json",signal:e.signal};try{const r=await(0,n.Z)(e.sceneServerUrl,t);e.rootDocument=r.data}catch{e.rootDocument={}}return e.rootDocument}async function f(e,t){const r=(0,i.Qc)(e);if(!r)throw new s.Z("invalid-feature-service-url","Invalid feature service url");const a=r.url.path,c=t.layerId;if(null==c)return{serverUrl:a};const u=y(t),l=t.featureServiceItem?await t.featureServiceItem.fetchData("json"):null,o=(l?.layers?.[0]||l?.tables?.[0])?.customParameters,f=e=>{const r={query:{f:"json",...o},responseType:"json",authMode:e,signal:t.signal};return(0,n.Z)(a,r)},m=f("anonymous").catch((()=>f("no-prompt"))),[d,p]=await Promise.all([m,u]),w=p?.layers,h=d.data&&d.data.layers;if(!Array.isArray(h))throw new Error("expected layers array");if(Array.isArray(w)){for(let e=0;e<Math.min(w.length,h.length);e++)if(w[e].id===c)return{serverUrl:a,layerId:h[e].id}}else if(null!=c&&c<h.length)return{serverUrl:a,layerId:h[c].id};throw new Error("could not find matching associated sublayer")}},91362:function(e,t,r){r.d(t,{$O:function(){return s},CD:function(){return f},H2:function(){return y},Ok:function(){return c},Q4:function(){return u},XX:function(){return l},_Y:function(){return o},bS:function(){return n},uE:function(){return i}});var a=r(53264);function n(e){const t={id:e.id,name:e.name};return"Oriented Imagery Layer"===e.type&&(t.layerType="OrientedImageryLayer"),t}async function s(e,t,r){if(null==e?.layers||null==e?.tables){const a=await r.fetchServiceMetadata(t,{customParameters:i(e)?.customParameters});(e=e||{}).layers=e.layers||a?.layers?.map(n),e.tables=e.tables||a?.tables?.map(n)}return e}function c(e){const{layers:t,tables:r}=e;return t?.length?t[0].id:r?.length?r[0].id:null}function i(e){if(!e)return null;const{layers:t,tables:r}=e;return t?.length?t[0]:r?.length?r[0]:null}function u(e){return(e?.layers?.length??0)+(e?.tables?.length??0)}function l(e){const t=[];return e?.layers?.forEach((e=>{"SubtypeGroupLayer"===e.layerType&&t.push(e.id)})),t}function o(e){return e?.layers?.filter((({layerType:e})=>"OrientedImageryLayer"===e)).map((({id:e})=>e))}function y(e){return e?.layers?.filter((({layerType:e})=>"CatalogLayer"===e)).map((({id:e})=>e))}async function f(e,t,r){if(!e?.url)return t??{};if(t??={},!t.layers){const a=await r.fetchServiceMetadata(e.url);t.layers=a.layers?.map(n)}const{serverUrl:s,portalItem:c}=await(0,a.w)(e.url,{sceneLayerItem:e,customParameters:i(t)?.customParameters}).catch((()=>({serverUrl:null,portalItem:null})));if(null==s)return t.tables=[],t;if(!t.tables&&c){const e=await c.fetchData();if(e?.tables)t.tables=e.tables.map(n);else{const a=await r.fetchServiceMetadata(s,{customParameters:i(e)?.customParameters});t.tables=a?.tables?.map(n)}}if(t.tables)for(const e of t.tables)e.url=`${s}/${e.id}`;return t}},55831:function(e,t,r){r.d(t,{fromItem:function(){return y},v:function(){return f}});var a=r(70375),n=r(53264),s=r(12408),c=r(54957),i=r(92557),u=r(53110),l=r(91362),o=r(31370);async function y(e){!e.portalItem||e.portalItem instanceof u.default||(e={...e,portalItem:new u.default(e.portalItem)});const t=await async function(e){await e.load();const t=new s.L;return async function(e){const t=e.className,r=i.T[t];return{constructor:await r(),properties:e.properties}}(await f(e,t))}(e.portalItem);return new(0,t.constructor)({portalItem:e.portalItem,...t.properties})}async function f(e,t){switch(e.type){case"3DTiles Service":return{className:"IntegratedMesh3DTilesLayer"};case"CSV":return{className:"CSVLayer"};case"Feature Collection":return async function(e){await e.load();const t=(0,o._$)(e,"Map Notes"),r=(0,o._$)(e,"Markup");if(t||r)return{className:"MapNotesLayer"};if((0,o._$)(e,"Route Layer"))return{className:"RouteLayer"};const a=await e.fetchData();return 1===(0,l.Q4)(a)?{className:"FeatureLayer"}:{className:"GroupLayer"}}(e);case"Feature Service":return async function(e,t){const r=await m(e,t);if("object"==typeof r){const{sourceJSON:e,className:t}=r,a={sourceJSON:e};return null!=r.id&&(a.layerId=r.id),{className:t||"FeatureLayer",properties:a}}return{className:"GroupLayer"}}(e,t);case"Feed":case"Stream Service":return{className:"StreamLayer"};case"GeoJson":return{className:"GeoJSONLayer"};case"Group Layer":return{className:"GroupLayer"};case"Image Service":return async function(e,t){await e.load();const r=e.typeKeywords?.map((e=>e.toLowerCase()))??[];if(r.includes("elevation 3d layer"))return{className:"ElevationLayer"};if(r.includes("tiled imagery"))return{className:"ImageryTileLayer"};const a=await t.fetchItemData(e),n=a?.layerType;if("ArcGISTiledImageServiceLayer"===n)return{className:"ImageryTileLayer"};if("ArcGISImageServiceLayer"===n)return{className:"ImageryLayer"};const s=await t.fetchServiceMetadata(e.url,{customParameters:await t.fetchCustomParameters(e)}),c=s.cacheType?.toLowerCase(),i=s.capabilities?.toLowerCase().includes("tilesonly");return"map"===c||i?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}(e,t);case"KML":return{className:"KMLLayer"};case"Map Service":return async function(e,t){return await async function(e,t){const{tileInfo:r}=await t.fetchServiceMetadata(e.url,{customParameters:await t.fetchCustomParameters(e)});return r}(e,t)?{className:"TileLayer"}:{className:"MapImageLayer"}}(e,t);case"Media Layer":return{className:"MediaLayer"};case"Scene Service":return async function(e,t){const r=await m(e,t,(async()=>{try{if(!e.url)return[];const{serverUrl:r}=await(0,n.w)(e.url,{sceneLayerItem:e}),a=await t.fetchServiceMetadata(r);return a?.tables??[]}catch{return[]}}));if("object"==typeof r){const a={};let n;if(null!=r.id?(a.layerId=r.id,n=`${e.url}/layers/${r.id}`):n=e.url,e.typeKeywords?.length)for(const t of Object.keys(c.fb))if(e.typeKeywords.includes(t))return{className:c.fb[t]};const s=await t.fetchServiceMetadata(n,{customParameters:await t.fetchCustomParameters(e,(e=>(0,l.uE)(e)?.customParameters))});return{className:c.fb[s?.layerType]||"SceneLayer",properties:a}}if(!1===r){const r=await t.fetchServiceMetadata(e.url);if("Voxel"===r?.layerType)return{className:"VoxelLayer"}}return{className:"GroupLayer"}}(e,t);case"Vector Tile Service":return{className:"VectorTileLayer"};case"WFS":return{className:"WFSLayer"};case"WMS":return{className:"WMSLayer"};case"WMTS":return{className:"WMTSLayer"};default:throw new a.Z("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type})}}async function m(e,t,r){const{url:a,type:n}=e,s="Feature Service"===n;if(!a)return{};if(/\/\d+$/.test(a)){if(s){const r=await t.fetchServiceMetadata(a,{customParameters:await t.fetchCustomParameters(e,(e=>(0,l.uE)(e)?.customParameters))});if("Oriented Imagery Layer"===r.type)return{id:r.id,className:"OrientedImageryLayer",sourceJSON:r}}return{}}await e.load();let c=await t.fetchItemData(e);if(s){const e=await(0,l.$O)(c,a,t),r=d(e);if("object"==typeof r){const t=(0,l.XX)(e),a=(0,l._Y)(e),n=(0,l.H2)(e);r.className=null!=r.id&&t.includes(r.id)?"SubtypeGroupLayer":null!=r.id&&a?.includes(r.id)?"OrientedImageryLayer":null!=r.id&&n?.includes(r.id)?"CatalogLayer":"FeatureLayer"}return r}if("Scene Service"===n&&(c=await(0,l.CD)(e,c,t)),(0,l.Q4)(c)>0)return d(c);const i=await t.fetchServiceMetadata(a);return r&&(i.tables=await r()),d(i)}function d(e){return 1===(0,l.Q4)(e)&&{id:(0,l.Ok)(e)}}},40371:function(e,t,r){r.d(t,{T:function(){return n}});var a=r(66341);async function n(e,t){const{data:r}=await(0,a.Z)(e,{responseType:"json",query:{f:"json",...t?.customParameters,token:t?.apiKey}});return r}}}]);