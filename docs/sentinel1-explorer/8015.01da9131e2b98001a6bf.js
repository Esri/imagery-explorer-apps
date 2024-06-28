"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[8015],{50516:function(e,t,r){r.d(t,{D:function(){return n}});var a=r(71760);function n(e){e?.writtenProperties&&e.writtenProperties.forEach((({target:e,propName:t,newOrigin:r})=>{(0,a.l)(e)&&r&&e.originOf(t)!==r&&e.updateOrigin(t,r)}))}},71760:function(e,t,r){function a(e){return e&&"getAtOrigin"in e&&"originOf"in e}r.d(t,{l:function(){return a}})},8015:function(e,t,r){r.d(t,{save:function(){return P},saveAs:function(){return N}});var a=r(7753),n=(r(70375),r(50516),r(21011)),o=r(20692),i=r(8308),s=r(54957),u=r(92557),c=r(31370);const l="Feature Service",f="feature-layer-utils",y=`${f}-save`,p=`${f}-save-as`;function d(e){return{isValid:(0,s.fP)(e)&&("feature"!==e.type||!e.dynamicDataSource),errorMessage:"Feature layer should be a layer or table in a map or feature service"}}function m(e){const t=[],r=[];for(const{layer:a,layerJSON:n}of e)a.isTable?r.push(n):t.push(n);return{layers:t,tables:r}}function w(e){return m([e])}async function h(e,t){return/\/\d+\/?$/.test(e.url)?w(t[0]):v(t,e)}async function v(e,t){if(e.reverse(),!t)return m(e);const r=await async function(e,t){let r=await e.fetchData("json");if(function(e){return!!(e&&Array.isArray(e.layers)&&Array.isArray(e.tables))}(r))return r;r||={},function(e){e.layers||=[],e.tables||=[]}(r);const{layer:{url:a,customParameters:n,apiKey:o}}=t[0];return await async function(e,t,r){const{url:a,customParameters:n,apiKey:o}=t,{serviceJSON:s,layersJSON:c}=await(0,i.V)(a,{customParameters:n,apiKey:o}),l=T(e.layers,s.layers,r),f=T(e.tables,s.tables,r);e.layers=l.itemResources,e.tables=f.itemResources;const y=[...l.added,...f.added],p=c?[...c.layers,...c.tables]:[];await async function(e,t,r,a){const n=await async function(e){const t=[];e.forEach((({type:e})=>{const r=function(e){let t;switch(e){case"Feature Layer":case"Table":t="FeatureLayer";break;case"Oriented Imagery Layer":t="OrientedImageryLayer";break;case"Catalog Layer":t="CatalogLayer"}return t}(e),a=u.T[r];t.push(a())}));const r=await Promise.all(t),a=new Map;return e.forEach((({type:e},t)=>{a.set(e,r[t])})),a}(t),o=t.map((({id:e,type:t})=>new(n.get(t))({url:r,layerId:e,sourceJSON:a.find((({id:t})=>t===e))})));await Promise.allSettled(o.map((e=>e.load()))),o.forEach((t=>{const{layerId:r,loaded:a,defaultPopupTemplate:n}=t;if(!a||null==n)return;const o={id:r,popupInfo:n.toJSON()};"ArcGISFeatureLayer"!==t.operationalLayerType&&(o.layerType=t.operationalLayerType),S(t,o,e)}))}(e,y,a,p)}(r,{url:a??"",customParameters:n,apiKey:o},t.map((e=>e.layer.layerId))),r}(t,e);for(const t of e)S(t.layer,t.layerJSON,r);return function(e,t){const r=[],a=[];for(const{layer:e}of t){const{isTable:t,layerId:n}=e;t?a.push(n):r.push(n)}b(e.layers,r),b(e.tables,a)}(r,e),r}function b(e,t){if(e.length<2)return;const r=[];for(const{id:t}of e)r.push(t);(0,a.fS)(r.sort(I),t.slice().sort(I))&&e.sort(((e,r)=>{const a=t.indexOf(e.id),n=t.indexOf(r.id);return a<n?-1:a>n?1:0}))}function I(e,t){return e<t?-1:e>t?1:0}function T(e,t,r){const n=(0,a.e5)(e,t,((e,t)=>e.id===t.id));e=e.filter((e=>!n.removed.some((t=>t.id===e.id))));const o=n.added;return o.forEach((({id:t})=>{e.push({id:t})})),{itemResources:e,added:o.filter((({id:e})=>!r.includes(e)))}}function S(e,t,r){e.isTable?g(r.tables,t):g(r.layers,t)}function g(e,t){const r=e.findIndex((({id:e})=>e===t.id));-1===r?e.push(t):e[r]=t}async function O(e,t){const{url:r,layerId:a,title:n,fullExtent:i,isTable:s}=e,u=(0,o.Qc)(r);t.url="FeatureServer"===u?.serverType?r:`${r}/${a}`,t.title||=n,t.extent=null,s||null==i||(t.extent=await(0,c.$o)(i)),(0,c.ck)(t,c.hz.METADATA),(0,c.ck)(t,c.hz.MULTI_LAYER),(0,c.qj)(t,c.hz.SINGLE_LAYER),s&&(0,c.qj)(t,c.hz.TABLE)}async function P(e,t){return(0,n.a1)({layer:e,itemType:l,validateLayer:d,createItemData:(e,t)=>h(t,[e]),errorNamePrefix:y},t)}async function N(e,t,r){return(0,n.po)({layer:e,itemType:l,validateLayer:d,createItemData:(e,t)=>Promise.resolve(w(e)),errorNamePrefix:p,newItem:t,setItemProperties:O},r)}},21011:function(e,t,r){r.d(t,{DC:function(){return f},Nw:function(){return v},UY:function(){return b},V3:function(){return h},Ym:function(){return m},a1:function(){return T},jX:function(){return I},po:function(){return S},uT:function(){return w},xG:function(){return p}});var a=r(70375),n=r(50516),o=r(93968),i=r(53110),s=r(84513),u=r(31370),c=r(76990),l=r(60629);function f(e,t,r){const n=r(e);if(!n.isValid)throw new a.Z(`${t}:invalid-parameters`,n.errorMessage,{layer:e})}async function y(e){const{layer:t,errorNamePrefix:r,validateLayer:a}=e;await t.load(),f(t,r,a)}function p(e,t){return`Layer (title: ${e.title}, id: ${e.id}) of type '${e.declaredClass}' ${t}`}function d(e){const{item:t,errorNamePrefix:r,layer:n,validateItem:o}=e;if((0,c.w)(t),function(e){const{item:t,itemType:r,additionalItemType:n,errorNamePrefix:o,layer:i}=e,s=[r];if(n&&s.push(n),!s.includes(t.type)){const e=s.map((e=>`'${e}'`)).join(", ");throw new a.Z(`${o}:portal-item-wrong-type`,`Portal item type should be one of: "${e}"`,{item:t,layer:i})}}(e),o){const e=o(t);if(!e.isValid)throw new a.Z(`${r}:invalid-parameters`,e.errorMessage,{layer:n})}}function m(e){const{layer:t,errorNamePrefix:r}=e,{portalItem:n}=t;if(!n)throw new a.Z(`${r}:portal-item-not-set`,p(t,"requires the portalItem property to be set"));if(!n.loaded)throw new a.Z(`${r}:portal-item-not-loaded`,p(t,"cannot be saved to a portal item that does not exist or is inaccessible"));d({...e,item:n})}function w(e){const{newItem:t,itemType:r}=e;let a=i.default.from(t);return a.id&&(a=a.clone(),a.id=null),a.type??=r,a.portal??=o.Z.getDefault(),d({...e,item:a}),a}function h(e){return(0,s.Y)(e,"portal-item")}async function v(e,t,r){"beforeSave"in e&&"function"==typeof e.beforeSave&&await e.beforeSave();const a=e.write({},t);return await Promise.all(t.resources?.pendingOperations??[]),(0,l.z)(t,{errorName:"layer-write:unsupported"},r),a}function b(e){(0,u.qj)(e,u.hz.JSAPI),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(((e,t,r)=>r.indexOf(e)===t)))}async function I(e,t,r){const a=e.portal;await a.signIn(),await(a.user?.addItem({item:e,data:t,folder:r?.folder}))}async function T(e,t){const{layer:r,createItemData:a,createJSONContext:o,saveResources:i,supplementalUnsupportedErrors:s}=e;await y(e),m(e);const u=r.portalItem,c=o?o(u):h(u),l=await v(r,c,{...t,supplementalUnsupportedErrors:s}),f=await a({layer:r,layerJSON:l},u);return b(u),await u.update({data:f}),(0,n.D)(c),await(i?.(u,c)),u}async function S(e,t){const{layer:r,createItemData:a,createJSONContext:o,setItemProperties:i,saveResources:s,supplementalUnsupportedErrors:u}=e;await y(e);const c=w(e),l=o?o(c):h(c),f=await v(r,l,{...t,supplementalUnsupportedErrors:u}),p=await a({layer:r,layerJSON:f},c);return await i(r,c),b(c),await I(c,p,t),r.portalItem=c,(0,n.D)(l),await(s?.(c,l)),c}},8308:function(e,t,r){r.d(t,{V:function(){return n}});var a=r(40371);async function n(e,t){const{loadContext:r,...n}=t||{},o=r?await r.fetchServiceMetadata(e,n):await(0,a.T)(e,n);l(o),s(o);const i={serviceJSON:o};if((o.currentVersion??0)<10.5)return i;const u=`${e}/layers`,c=r?await r.fetchServiceMetadata(u,n):await(0,a.T)(u,n);return l(c),s(c),i.layersJSON={layers:c.layers,tables:c.tables},i}function o(e){return"Feature Layer"===e.type||"Oriented Imagery Layer"===e.type}function i(e){return"Table"===e.type}function s(e){e.layers=e.layers?.filter(o),e.tables=e.tables?.filter(i)}function u(e){e.type||="Feature Layer"}function c(e){e.type||="Table"}function l(e){e.layers?.forEach(u),e.tables?.forEach(c)}},40371:function(e,t,r){r.d(t,{T:function(){return n}});var a=r(66341);async function n(e,t){const{data:r}=await(0,a.Z)(e,{responseType:"json",query:{f:"json",...t?.customParameters,token:t?.apiKey}});return r}},76990:function(e,t,r){r.d(t,{w:function(){return i}});var a=r(51366),n=r(70375),o=r(99522);function i(e){if(a.default.apiKey&&(0,o.r)(e.portal.url))throw new n.Z("save-api-key-utils:api-key-not-supported",`Saving is not supported on ${e.portal.url} when using an api key`)}}}]);