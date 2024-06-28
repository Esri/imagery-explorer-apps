"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[8858],{12916:function(e,t,i){i.d(t,{q:function(){return l}});var r=i(7753),s=i(23148),a=i(13802),o=i(78668),n=i(62517);class l{constructor(e,t,i,r,s={}){this._mainMethod=t,this._transferLists=i,this._listeners=[],this._promise=(0,n.bA)(e,{...s,schedule:r}).then((e=>{if(void 0===this._thread){this._thread=e,this._promise=null,s.hasInitialize&&this.broadcast({},"initialize");for(const e of this._listeners)this._connectListener(e)}else e.close()})),this._promise.catch((t=>a.Z.getLogger("esri.core.workers.WorkerHandle").error(`Failed to initialize ${e} worker: ${t}`)))}on(e,t){const i={removed:!1,eventName:e,callback:t,threadHandle:null};return this._listeners.push(i),this._connectListener(i),(0,s.kB)((()=>{i.removed=!0,(0,r.Od)(this._listeners,i),this._thread&&null!=i.threadHandle&&i.threadHandle.remove()}))}destroy(){this._thread&&(this._thread.close(),this._thread=null),this._promise=null,this._listeners.length=0,this._transferLists={}}invoke(e,t){return this.invokeMethod(this._mainMethod,e,t)}invokeMethod(e,t,i){if(this._thread){const r=this._transferLists[e],s=r?r(t):[];return this._thread.invoke(e,t,{transferList:s,signal:i})}return this._promise?this._promise.then((()=>((0,o.k_)(i),this.invokeMethod(e,t,i)))):Promise.reject(null)}broadcast(e,t){return this._thread?Promise.all(this._thread.broadcast(t,e)).then((()=>{})):this._promise?this._promise.then((()=>this.broadcast(e,t))):Promise.reject()}get promise(){return this._promise}_connectListener(e){this._thread&&this._thread.on(e.eventName,e.callback).then((t=>{e.removed||(e.threadHandle=t)}))}}},68858:function(e,t,i){i.r(t),i.d(t,{default:function(){return S}});var r=i(36663),s=i(66341),a=i(70375),o=i(61681),n=i(15842),l=i(78668),h=i(3466),d=i(81977),u=(i(39994),i(13802),i(4157),i(34248)),p=i(40266),c=i(64307),_=i(38481),y=i(89993),v=i(87232),m=i(43330),f=i(18241),g=i(51599);class b{constructor(e,t,i,r){this._hasNoDataValues=null,this._minValue=null,this._maxValue=null,"pixelData"in e?(this.values=e.pixelData,this.width=e.width,this.height=e.height,this.noDataValue=e.noDataValue):(this.values=e,this.width=t,this.height=i,this.noDataValue=r)}get hasNoDataValues(){if(null==this._hasNoDataValues){const e=this.noDataValue;this._hasNoDataValues=this.values.includes(e)}return this._hasNoDataValues}get minValue(){return this._ensureBounds(),this._minValue}get maxValue(){return this._ensureBounds(),this._maxValue}_ensureBounds(){if(null!=this._minValue)return;const{noDataValue:e,values:t}=this;let i=1/0,r=-1/0,s=!0;for(const a of t)a===e?this._hasNoDataValues=!0:(i=a<i?a:i,r=a>r?a:r,s=!1);s?(this._minValue=0,this._maxValue=0):(this._minValue=i,this._maxValue=r>-3e38?r:0)}}var w=i(12916);class V extends w.q{constructor(e=null){super("LercWorker","_decode",{_decode:e=>[e.buffer]},e,{strategy:"dedicated"}),this.schedule=e,this.ref=0}decode(e,t,i){return e&&0!==e.byteLength?this.invoke({buffer:e,options:t},i):Promise.resolve(null)}release(){--this.ref<=0&&(T.forEach(((e,t)=>{e===this&&T.delete(t)})),this.destroy())}}const T=new Map;let k=class extends((0,y.Z)((0,v.Y)((0,m.q)((0,f.I)((0,n.R)(_.Z)))))){constructor(...e){super(...e),this.capabilities={operations:{supportsTileMap:!1}},this.copyright=null,this.heightModelInfo=null,this.path=null,this.minScale=void 0,this.maxScale=void 0,this.opacity=1,this.operationalLayerType="ArcGISTiledElevationServiceLayer",this.sourceJSON=null,this.type="elevation",this.url=null,this.version=null,this._lercDecoder=function(e=null){let t=T.get(e);return t||(null!=e?(t=new V((t=>e.immediate.schedule(t))),T.set(e,t)):(t=new V,T.set(null,t))),++t.ref,t}()}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}destroy(){this._lercDecoder=(0,o.RY)(this._lercDecoder)}readCapabilities(e,t){const i=t.capabilities&&t.capabilities.split(",").map((e=>e.toLowerCase().trim()));return i?{operations:{supportsTileMap:i.includes("tilemap")}}:{operations:{supportsTileMap:!1}}}readVersion(e,t){let i=t.currentVersion;return i||(i=9.3),i}load(e){const t=null!=e?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:e=>{if(e.typeKeywords)for(let t=0;t<e.typeKeywords.length;t++)if("elevation 3d layer"===e.typeKeywords[t].toLowerCase())return!0;throw new a.Z("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},e).catch(l.r9).then((()=>this._fetchImageService(t)))),Promise.resolve(this)}fetchTile(e,t,i,r){const a=null!=(r=r||{signal:null}).signal?r.signal:r.signal=(new AbortController).signal,o={responseType:"array-buffer",signal:a},n={noDataValue:r.noDataValue,returnFileInfo:!0};return this.load().then((()=>this._fetchTileAvailability(e,t,i,r))).then((()=>(0,s.Z)(this.getTileUrl(e,t,i),o))).then((e=>this._lercDecoder.decode(e.data,n,a))).then((e=>new b(e)))}getTileUrl(e,t,i){const r=!this.capabilities.operations.supportsTileMap&&this.supportsBlankTile,s=(0,h.B7)({...this.parsedUrl.query,blankTile:!r&&null});return`${this.parsedUrl.path}/tile/${e}/${t}/${i}${s?"?"+s:""}`}async queryElevation(e,t){const{ElevationQuery:r}=await i.e(2420).then(i.bind(i,22420));return(0,l.k_)(t),(new r).query(this,e,t)}async createElevationSampler(e,t){const{ElevationQuery:r}=await i.e(2420).then(i.bind(i,22420));return(0,l.k_)(t),(new r).createSampler(this,e,t)}_fetchTileAvailability(e,t,i,r){return this.tilemapCache?this.tilemapCache.fetchAvailability(e,t,i,r):Promise.resolve("unknown")}async _fetchImageService(e){if(this.sourceJSON)return this.sourceJSON;const t={query:{f:"json",...this.parsedUrl.query},responseType:"json",signal:e},i=await(0,s.Z)(this.parsedUrl.path,t);i.ssl&&(this.url=this.url?.replace(/^http:/i,"https:")),this.sourceJSON=i.data,this.read(i.data,{origin:"service",url:this.parsedUrl})}get hasOverriddenFetchTile(){return!this.fetchTile[C]}};(0,r._)([(0,d.Cb)({readOnly:!0})],k.prototype,"capabilities",void 0),(0,r._)([(0,u.r)("service","capabilities",["capabilities"])],k.prototype,"readCapabilities",null),(0,r._)([(0,d.Cb)({json:{read:{source:"copyrightText"}}})],k.prototype,"copyright",void 0),(0,r._)([(0,d.Cb)({readOnly:!0,type:c.Z})],k.prototype,"heightModelInfo",void 0),(0,r._)([(0,d.Cb)({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],k.prototype,"path",void 0),(0,r._)([(0,d.Cb)({type:["show","hide"]})],k.prototype,"listMode",void 0),(0,r._)([(0,d.Cb)({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],k.prototype,"minScale",void 0),(0,r._)([(0,d.Cb)({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],k.prototype,"maxScale",void 0),(0,r._)([(0,d.Cb)({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],k.prototype,"opacity",void 0),(0,r._)([(0,d.Cb)({type:["ArcGISTiledElevationServiceLayer"]})],k.prototype,"operationalLayerType",void 0),(0,r._)([(0,d.Cb)()],k.prototype,"sourceJSON",void 0),(0,r._)([(0,d.Cb)({json:{read:!1},value:"elevation",readOnly:!0})],k.prototype,"type",void 0),(0,r._)([(0,d.Cb)(g.HQ)],k.prototype,"url",void 0),(0,r._)([(0,d.Cb)()],k.prototype,"version",void 0),(0,r._)([(0,u.r)("version",["currentVersion"])],k.prototype,"readVersion",null),k=(0,r._)([(0,p.j)("esri.layers.ElevationLayer")],k);const C=Symbol("default-fetch-tile");k.prototype.fetchTile[C]=!0;const S=k}}]);