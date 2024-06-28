"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[6361],{66361:function(e,r,t){t.r(r),t.d(r,{fromUrl:function(){return f}});var a=t(70375),n=t(3466),s=t(20692),l=t(53264),o=t(8308),i=t(54957),c=t(92557),u=t(40371);const y={FeatureLayer:!0,SceneLayer:!0};async function f(e){const r=e.properties?.customParameters,c=await async function(e,r){let t=(0,s.Qc)(e);if(null==t&&(t=await async function(e,r){const t=await(0,u.T)(e,{customParameters:r});let a=null,l=null;const o=t.type;if("Feature Layer"===o||"Table"===o?(a="FeatureServer",l=t.id??null):"indexedVector"===o?a="VectorTileServer":t.hasOwnProperty("mapName")?a="MapServer":t.hasOwnProperty("bandCount")&&t.hasOwnProperty("pixelSizeX")?a="ImageServer":t.hasOwnProperty("maxRecordCount")&&t.hasOwnProperty("allowGeometryUpdates")?a="FeatureServer":t.hasOwnProperty("streamUrls")?a="StreamServer":p(t)?(a="SceneServer",l=t.id):t.hasOwnProperty("layers")&&p(t.layers?.[0])&&(a="SceneServer"),!a)return null;const i=null!=l?(0,s.DR)(e):null;return{title:null!=i&&t.name||(0,n.vt)(e),serverType:a,sublayer:l,url:{path:null!=i?i.serviceUrl:(0,n.mN)(e).path}}}(e,r)),null==t)throw new a.Z("arcgis-layers:url-mismatch","The url '${url}' is not a valid arcgis resource",{url:e});const{serverType:c,sublayer:f}=t;let d;const v={FeatureServer:"FeatureLayer",StreamServer:"StreamLayer",VectorTileServer:"VectorTileLayer"},w="FeatureServer"===c,h="SceneServer"===c,S={parsedUrl:t,Constructor:null,layerId:w||h?f??void 0:void 0,layers:[],tables:[]};switch(c){case"MapServer":d=null!=f?"FeatureLayer":await async function(e,r){return(await(0,u.T)(e,{customParameters:r})).tileInfo}(e,r)?"TileLayer":"MapImageLayer";break;case"ImageServer":{const t=await(0,u.T)(e,{customParameters:r}),{tileInfo:a,cacheType:n}=t;d=a?"LERC"!==a?.format?.toUpperCase()||n&&"elevation"!==n.toLowerCase()?"ImageryTileLayer":"ElevationLayer":"ImageryLayer";break}case"SceneServer":{const e=await(0,u.T)(t.url.path,{customParameters:r});if(d="SceneLayer",e){const r=e?.layers;if("Voxel"===e?.layerType)d="VoxelLayer";else if(r?.length){const e=r[0]?.layerType;null!=e&&null!=i.fb[e]&&(d=i.fb[e])}}break}case"3DTilesServer":throw new a.Z("arcgis-layers:unsupported","fromUrl() not supported for 3DTiles layers");case"FeatureServer":if(d="FeatureLayer",null!=f){const t=await(0,u.T)(e,{customParameters:r});S.sourceJSON=t,"Oriented Imagery Layer"===t.type&&(d="OrientedImageryLayer")}break;default:d=v[c]}if(y[d]&&null==f){const t=await async function(e,r,t){let a,n,s=!1;switch(r){case"FeatureServer":{const r=await(0,o.V)(e,{customParameters:t});s=!!r.layersJSON,a=r.layersJSON||r.serviceJSON;break}case"SceneServer":{const r=await async function(e,r){const t=await(0,u.T)(e,{customParameters:r}),a=t.layers?.[0];if(!a)return{serviceInfo:t};try{const{serverUrl:a}=await(0,l.w)(e),n=await(0,u.T)(a,{customParameters:r}).catch((()=>null));return n&&(t.tables=n.tables),{serviceInfo:t,tableServerUrl:a}}catch{return{serviceInfo:t}}}(e,t);a=r.serviceInfo,n=r.tableServerUrl;break}default:a=await(0,u.T)(e,{customParameters:t})}const i=a?.layers,c=a?.tables;return{layers:i?.map((e=>({id:e.id}))).reverse()||[],tables:c?.map((e=>({serverUrl:n,id:e.id}))).reverse()||[],layerInfos:s?i:[],tableInfos:s?c:[]}}(e,c,r);if(w&&(S.sublayerInfos=t.layerInfos,S.tableInfos=t.tableInfos),1!==t.layers.length+t.tables.length)S.layers=t.layers,S.tables=t.tables,w&&t.layerInfos?.length&&(S.sublayerConstructorProvider=await async function(e){const r=[],t=[];if(e.forEach((e=>{const{type:a}=e;"Oriented Imagery Layer"===a?(r.push(a),t.push(m("OrientedImageryLayer"))):(r.push(a),t.push(m("FeatureLayer")))})),!t.length)return;const a=await Promise.all(t),n=new Map;return r.forEach(((e,r)=>{n.set(e,a[r])})),e=>n.get(e.type)}(t.layerInfos));else if(w||h){const e=t.layerInfos?.[0]??t.tableInfos?.[0];S.layerId=t.layers[0]?.id??t.tables[0]?.id,S.sourceJSON=e,w&&"Oriented Imagery Layer"===e?.type&&(d="OrientedImageryLayer")}}return S.Constructor=await m(d),S}(e.url,r),f={...e.properties,url:e.url};if(c.layers.length+c.tables.length===0)return null!=c.layerId&&(f.layerId=c.layerId),null!=c.sourceJSON&&(f.sourceJSON=c.sourceJSON),new c.Constructor(f);const v=new(0,(await Promise.resolve().then(t.bind(t,13840))).default)({title:c.parsedUrl.title});return await async function(e,r,t){function a(e,r,a,n){const s={...t,layerId:r,sublayerTitleMode:"service-name"};return null!=e&&(s.url=e),null!=a&&(s.sourceJSON=a),n(s)}const n=r.sublayerConstructorProvider;for(const{id:t,serverUrl:s}of r.layers){const l=d(r.sublayerInfos,t),o=(l&&n?.(l))??r.Constructor,i=a(s,t,l,(e=>new o(e)));e.add(i)}if(r.tables.length){const t=await m("FeatureLayer");r.tables.forEach((({id:n,serverUrl:s})=>{const l=a(s,n,d(r.tableInfos,n),(e=>new t(e)));e.tables.add(l)}))}}(v,c,f),v}function d(e,r){return e?e.find((e=>e.id===r)):null}function p(e){return null!=e&&e.hasOwnProperty("store")&&e.hasOwnProperty("id")&&"number"==typeof e.id}async function m(e){return(0,c.T[e])()}},53264:function(e,r,t){t.d(r,{w:function(){return u}});var a=t(88256),n=t(66341),s=t(70375),l=t(78668),o=t(20692),i=t(93968),c=t(53110);async function u(e,r){const t=(0,o.Qc)(e);if(!t)throw new s.Z("invalid-url","Invalid scene service url");const u={...r,sceneServerUrl:t.url.path,layerId:t.sublayer??void 0};if(u.sceneLayerItem??=await async function(e){const r=(await y(e)).serviceItemId;if(!r)return null;const t=new c.default({id:r,apiKey:e.apiKey}),s=await async function(e){const r=a.id?.findServerInfo(e.sceneServerUrl);if(r?.owningSystemUrl)return r.owningSystemUrl;const t=e.sceneServerUrl.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const r=(await(0,n.Z)(t,{query:{f:"json"},responseType:"json",signal:e.signal})).data.owningSystemUrl;if(r)return r}catch(e){(0,l.r9)(e)}return null}(e);null!=s&&(t.portal=new i.Z({url:s}));try{return t.load({signal:e.signal})}catch(e){return(0,l.r9)(e),null}}(u),null==u.sceneLayerItem)return f(u.sceneServerUrl.replace("/SceneServer","/FeatureServer"),u);const d=await async function({sceneLayerItem:e,signal:r}){if(!e)return null;try{const t=(await e.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:r})).find((e=>"Feature Service"===e.type))||null;if(!t)return null;const a=new c.default({portal:t.portal,id:t.id});return await a.load(),a}catch(e){return(0,l.r9)(e),null}}(u);if(!d?.url)throw new s.Z("related-service-not-found","Could not find feature service through portal item relationship");u.featureServiceItem=d;const p=await f(d.url,u);return p.portalItem=d,p}async function y(e){if(e.rootDocument)return e.rootDocument;const r={query:{f:"json",...e.customParameters,token:e.apiKey},responseType:"json",signal:e.signal};try{const t=await(0,n.Z)(e.sceneServerUrl,r);e.rootDocument=t.data}catch{e.rootDocument={}}return e.rootDocument}async function f(e,r){const t=(0,o.Qc)(e);if(!t)throw new s.Z("invalid-feature-service-url","Invalid feature service url");const a=t.url.path,l=r.layerId;if(null==l)return{serverUrl:a};const i=y(r),c=r.featureServiceItem?await r.featureServiceItem.fetchData("json"):null,u=(c?.layers?.[0]||c?.tables?.[0])?.customParameters,f=e=>{const t={query:{f:"json",...u},responseType:"json",authMode:e,signal:r.signal};return(0,n.Z)(a,t)},d=f("anonymous").catch((()=>f("no-prompt"))),[p,m]=await Promise.all([d,i]),v=m?.layers,w=p.data&&p.data.layers;if(!Array.isArray(w))throw new Error("expected layers array");if(Array.isArray(v)){for(let e=0;e<Math.min(v.length,w.length);e++)if(v[e].id===l)return{serverUrl:a,layerId:w[e].id}}else if(null!=l&&l<w.length)return{serverUrl:a,layerId:w[l].id};throw new Error("could not find matching associated sublayer")}},8308:function(e,r,t){t.d(r,{V:function(){return n}});var a=t(40371);async function n(e,r){const{loadContext:t,...n}=r||{},s=t?await t.fetchServiceMetadata(e,n):await(0,a.T)(e,n);u(s),o(s);const l={serviceJSON:s};if((s.currentVersion??0)<10.5)return l;const i=`${e}/layers`,c=t?await t.fetchServiceMetadata(i,n):await(0,a.T)(i,n);return u(c),o(c),l.layersJSON={layers:c.layers,tables:c.tables},l}function s(e){return"Feature Layer"===e.type||"Oriented Imagery Layer"===e.type}function l(e){return"Table"===e.type}function o(e){e.layers=e.layers?.filter(s),e.tables=e.tables?.filter(l)}function i(e){e.type||="Feature Layer"}function c(e){e.type||="Table"}function u(e){e.layers?.forEach(i),e.tables?.forEach(c)}},40371:function(e,r,t){t.d(r,{T:function(){return n}});var a=t(66341);async function n(e,r){const{data:t}=await(0,a.Z)(e,{responseType:"json",query:{f:"json",...r?.customParameters,token:r?.apiKey}});return t}}}]);