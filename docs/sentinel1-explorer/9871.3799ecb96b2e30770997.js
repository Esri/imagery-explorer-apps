"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[9871],{59871:function(e,t,r){r.r(t),r.d(t,{default:function(){return Xe}});var s=r(36663),i=r(6865),o=r(81739),n=r(70375),a=r(67134),l=r(63592),p=r(13802),u=r(15842),d=r(78668),y=r(3466),c=r(81977),h=(r(39994),r(34248)),f=r(40266),b=r(14685),g=r(38481),m=r(80085),v=r(80020),_=(r(86004),r(55565),r(16192),r(71297),r(878),r(22836),r(50172),r(72043),r(72506),r(54021)),w=r(66341),S=r(25709),C=r(68309),I=r(64189),x=(r(4157),r(79438)),j=r(91772),O=r(12926),T=r(86618),F=r(7283),L=r(51599);let E=class extends((0,T.IG)(u.w)){constructor(e){super(e),this.title="",this.id=-1,this.modelName=null,this.isEmpty=null,this.legendEnabled=!0,this.visible=!0,this.opacity=1}readTitle(e,t){return"string"==typeof t.alias?t.alias:"string"==typeof t.name?t.name:""}readIdOnlyOnce(e){return-1!==this.id?this.id:"number"==typeof e?e:-1}};(0,s._)([(0,c.Cb)({type:String,json:{origins:{"web-scene":{write:!0},"portal-item":{write:!0}}}})],E.prototype,"title",void 0),(0,s._)([(0,h.r)("service","title",["alias","name"])],E.prototype,"readTitle",null),(0,s._)([(0,c.Cb)()],E.prototype,"layer",void 0),(0,s._)([(0,c.Cb)({type:F.z8,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],E.prototype,"id",void 0),(0,s._)([(0,h.r)("service","id")],E.prototype,"readIdOnlyOnce",null),(0,s._)([(0,c.Cb)((0,L.Lx)(String))],E.prototype,"modelName",void 0),(0,s._)([(0,c.Cb)((0,L.Lx)(Boolean))],E.prototype,"isEmpty",void 0),(0,s._)([(0,c.Cb)({type:Boolean,nonNullable:!0})],E.prototype,"legendEnabled",void 0),(0,s._)([(0,c.Cb)({type:Boolean,json:{name:"visibility",write:!0}})],E.prototype,"visible",void 0),(0,s._)([(0,c.Cb)({type:Number,json:{write:!0}})],E.prototype,"opacity",void 0),E=(0,s._)([(0,f.j)("esri.layers.buildingSublayers.BuildingSublayer")],E);const A=E;var B=r(23745),q=r(31484),Z=r(89076),P=r(28790),R=r(14845),U=r(40909),k=r(97304),M=r(14136),N=r(10171),Q=r(74710),D=r(32411),V=r(59439);const K=(0,Z.v)();let z=class extends((0,B.G)(C.Z.LoadableMixin((0,I.v)(A)))){constructor(e){super(e),this.type="building-component",this.nodePages=null,this.materialDefinitions=[],this.textureSetDefinitions=[],this.geometryDefinitions=[],this.indexInfo=null,this.serviceUpdateTimeStamp=null,this.store=null,this.attributeStorageInfo=[],this.fields=[],this.associatedLayer=null,this.outFields=null,this.listMode="show",this.renderer=null,this.definitionExpression=null,this.popupEnabled=!0,this.popupTemplate=null,this.layerType="3d-object"}get parsedUrl(){return this.layer?{path:`${this.layer.parsedUrl?.path}/sublayers/${this.id}`,query:this.layer.parsedUrl?.query}:{path:""}}get fieldsIndex(){return new P.Z(this.fields)}readAssociatedLayer(e,t){const r=this.layer.associatedFeatureServiceItem,s=t.associatedLayerID;return null!=r&&"number"==typeof s?new O.default({portalItem:r,customParameters:this.customParameters,layerId:s}):null}get objectIdField(){if(null!=this.fields)for(const e of this.fields)if("oid"===e.type)return e.name;return null}get displayField(){return null!=this.associatedLayer?this.associatedLayer.displayField:void 0}get apiKey(){return this.layer.apiKey}get customParameters(){return this.layer.customParameters}get fullExtent(){return this.layer.fullExtent}get spatialReference(){return this.layer.spatialReference}get version(){return this.layer.version}get elevationInfo(){return this.layer.elevationInfo}get minScale(){return this.layer.minScale}get maxScale(){return this.layer.maxScale}get effectiveScaleRange(){return this.layer.effectiveScaleRange}get defaultPopupTemplate(){return this.createPopupTemplate()}load(e){const t=null!=e?e.signal:null,r=this._fetchService(t).then((()=>{this.indexInfo=(0,U.T)(this.parsedUrl.path,this.rootNode,this.nodePages,this.customParameters,this.apiKey,p.Z.getLogger(this),t)}));return this.addResolvingPromise(r),Promise.resolve(this)}createPopupTemplate(e){return(0,N.eZ)(this,e)}async _fetchService(e){const t=(await(0,w.Z)(this.parsedUrl.path,{query:{f:"json",...this.customParameters,token:this.apiKey},responseType:"json",signal:e})).data;this.read(t,{origin:"service",url:this.parsedUrl})}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,t){const r=this.getFeatureType(t?.feature)?.domains?.[e];return r&&"inherited"!==r.type?r:this.getField(e)?.domain??null}getFeatureType(e){return e&&null!=this.associatedLayer?this.associatedLayer.getFeatureType(e):null}get types(){return null!=this.associatedLayer?this.associatedLayer.types??[]:[]}get typeIdField(){return null!=this.associatedLayer?this.associatedLayer.typeIdField:null}get geometryType(){return"3d-object"===this.layerType?"mesh":"point"}get profile(){return"3d-object"===this.layerType?"mesh-pyramids":"points"}get capabilities(){const e=null!=this.associatedLayer&&this.associatedLayer.capabilities?this.associatedLayer.capabilities:q.C,{query:t,data:{supportsZ:r,supportsM:s,isVersioned:i}}=e;return{query:t,data:{supportsZ:r,supportsM:s,isVersioned:i}}}createQuery(){const e=new M.Z;return"mesh"!==this.geometryType&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e}queryExtent(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryExtent(e||this.createQuery(),t)))}queryFeatureCount(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryFeatureCount(e||this.createQuery(),t)))}queryFeatures(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryFeatures(e||this.createQuery(),t))).then((e=>{if(e?.features)for(const t of e.features)t.layer=this.layer,t.sourceLayer=this;return e}))}queryObjectIds(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryObjectIds(e||this.createQuery(),t)))}async queryCachedAttributes(e,t){const r=(0,R.Lk)(this.fieldsIndex,await(0,V.e7)(this,(0,V.V5)(this)));return(0,D.xe)(this.parsedUrl.path,this.attributeStorageInfo,e,t,r,this.apiKey,this.customParameters)}async queryCachedFeature(e,t){const r=await this.queryCachedAttributes(e,[t]);if(!r||0===r.length)throw new n.Z("scenelayer:feature-not-in-cached-data","Feature not found in cached data");const s=new m.Z;return s.attributes=r[0],s.layer=this,s.sourceLayer=this,s}getFieldUsageInfo(e){return this.fieldsIndex.has(e)?{supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1}:{supportsLabelingInfo:!1,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:null!=this.associatedLayer}}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return null!=e&&e.loaded?Promise.resolve(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),null==this.associatedLayer)throw new n.Z("buildingscenelayer:query-not-available","BuildingSceneLayer component layer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new n.Z("buildingscenelayer:query-not-available","BuildingSceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}};(0,s._)([(0,c.Cb)({readOnly:!0})],z.prototype,"parsedUrl",null),(0,s._)([(0,c.Cb)({type:k.U4,readOnly:!0})],z.prototype,"nodePages",void 0),(0,s._)([(0,c.Cb)({type:[k.QI],readOnly:!0})],z.prototype,"materialDefinitions",void 0),(0,s._)([(0,c.Cb)({type:[k.Yh],readOnly:!0})],z.prototype,"textureSetDefinitions",void 0),(0,s._)([(0,c.Cb)({type:[k.H3],readOnly:!0})],z.prototype,"geometryDefinitions",void 0),(0,s._)([(0,c.Cb)({readOnly:!0})],z.prototype,"serviceUpdateTimeStamp",void 0),(0,s._)([(0,c.Cb)({readOnly:!0})],z.prototype,"store",void 0),(0,s._)([(0,c.Cb)({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],z.prototype,"rootNode",void 0),(0,s._)([(0,c.Cb)({readOnly:!0})],z.prototype,"attributeStorageInfo",void 0),(0,s._)([(0,c.Cb)(K.fields)],z.prototype,"fields",void 0),(0,s._)([(0,c.Cb)({readOnly:!0})],z.prototype,"fieldsIndex",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:O.default})],z.prototype,"associatedLayer",void 0),(0,s._)([(0,h.r)("service","associatedLayer",["associatedLayerID"])],z.prototype,"readAssociatedLayer",null),(0,s._)([(0,c.Cb)(K.outFields)],z.prototype,"outFields",void 0),(0,s._)([(0,c.Cb)({type:String,readOnly:!0})],z.prototype,"objectIdField",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:String,json:{read:!1}})],z.prototype,"displayField",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:String})],z.prototype,"apiKey",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:String})],z.prototype,"customParameters",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:j.Z})],z.prototype,"fullExtent",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:b.Z})],z.prototype,"spatialReference",null),(0,s._)([(0,c.Cb)({readOnly:!0})],z.prototype,"version",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:Q.Z})],z.prototype,"elevationInfo",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:Number})],z.prototype,"minScale",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:Number})],z.prototype,"maxScale",null),(0,s._)([(0,c.Cb)({readOnly:!0,type:Number})],z.prototype,"effectiveScaleRange",null),(0,s._)([(0,c.Cb)({type:["hide","show"],json:{write:!0}})],z.prototype,"listMode",void 0),(0,s._)([(0,c.Cb)({types:_.o,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],z.prototype,"renderer",void 0),(0,s._)([(0,c.Cb)({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],z.prototype,"definitionExpression",void 0),(0,s._)([(0,c.Cb)(L.C_)],z.prototype,"popupEnabled",void 0),(0,s._)([(0,c.Cb)({type:v.Z,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],z.prototype,"popupTemplate",void 0),(0,s._)([(0,c.Cb)({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],z.prototype,"normalReferenceFrame",void 0),(0,s._)([(0,c.Cb)({readOnly:!0,json:{read:!1}})],z.prototype,"defaultPopupTemplate",null),(0,s._)([(0,c.Cb)()],z.prototype,"types",null),(0,s._)([(0,c.Cb)()],z.prototype,"typeIdField",null),(0,s._)([(0,c.Cb)({json:{write:!1}}),(0,x.J)(new S.X({"3DObject":"3d-object",Point:"point"}))],z.prototype,"layerType",void 0),(0,s._)([(0,c.Cb)()],z.prototype,"geometryType",null),(0,s._)([(0,c.Cb)()],z.prototype,"profile",null),(0,s._)([(0,c.Cb)({readOnly:!0,json:{read:!1}})],z.prototype,"capabilities",null),z=(0,s._)([(0,f.j)("esri.layers.buildingSublayers.BuildingComponentSublayer")],z);const H=z;var G,J=r(96863);const $={type:i.Z,readOnly:!0,json:{origins:{service:{read:{source:"sublayers",reader:W}}},read:!1}};function W(e,t,r){if(e&&Array.isArray(e))return new i.Z(e.map((e=>{const t=function(e){return"group"===e.layerType?X:H}(e);if(t){const s=new t;return s.read(e,r),s}return r?.messages&&e&&r.messages.push(new J.Z("building-scene-layer:unsupported-sublayer-type","Building scene sublayer of type '"+(e.type||"unknown")+"' are not supported",{definition:e,context:r})),null})))}let X=G=class extends A{constructor(e){super(e),this.type="building-group",this.listMode="show",this.sublayers=null}loadAll(){return(0,l.w)(this,(e=>G.forEachSublayer(this.sublayers,(t=>{"building-group"!==t.type&&e(t)}))))}};var Y;(0,s._)([(0,c.Cb)({type:["hide","show","hide-children"],json:{write:!0}})],X.prototype,"listMode",void 0),(0,s._)([(0,c.Cb)($)],X.prototype,"sublayers",void 0),X=G=(0,s._)([(0,f.j)("esri.layers.buildingSublayers.BuildingGroupSublayer")],X),(Y=X||(X={})).sublayersProperty=$,Y.readSublayers=W,Y.forEachSublayer=function e(t,r){t.forEach((t=>{r(t),"building-group"===t.type&&e(t.sublayers,r)}))};const ee=X;var te=r(91223),re=r(87232),se=r(63989),ie=r(43330),oe=r(18241),ne=r(95874),ae=r(93902),le=r(53264),pe=r(82064),ue=r(12173);let de=class extends pe.wq{constructor(){super(...arguments),this.type=null}};(0,s._)([(0,c.Cb)({type:String,readOnly:!0,json:{write:!0}})],de.prototype,"type",void 0),de=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterAuthoringInfo")],de);const ye=de;var ce;let he=ce=class extends pe.wq{constructor(){super(...arguments),this.filterType=null,this.filterValues=null}clone(){return new ce({filterType:this.filterType,filterValues:(0,a.d9)(this.filterValues)})}};(0,s._)([(0,c.Cb)({type:String,json:{write:!0}})],he.prototype,"filterType",void 0),(0,s._)([(0,c.Cb)({type:[String],json:{write:!0}})],he.prototype,"filterValues",void 0),he=ce=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterAuthoringInfoType")],he);const fe=he;var be;const ge=i.Z.ofType(fe);let me=be=class extends pe.wq{clone(){return new be({filterTypes:(0,a.d9)(this.filterTypes)})}};(0,s._)([(0,c.Cb)({type:ge,json:{write:!0}})],me.prototype,"filterTypes",void 0),me=be=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterAuthoringInfoBlock")],me);const ve=me;var _e;const we=i.Z.ofType(ve);let Se=_e=class extends ye{constructor(){super(...arguments),this.type="checkbox"}clone(){return new _e({filterBlocks:(0,a.d9)(this.filterBlocks)})}};(0,s._)([(0,c.Cb)({type:["checkbox"]})],Se.prototype,"type",void 0),(0,s._)([(0,c.Cb)({type:we,json:{write:!0}})],Se.prototype,"filterBlocks",void 0),Se=_e=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterAuthoringInfoCheckbox")],Se);const Ce=Se;let Ie=class extends pe.wq{};(0,s._)([(0,c.Cb)({readOnly:!0,json:{read:!1}})],Ie.prototype,"type",void 0),Ie=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterMode")],Ie);const xe=Ie;var je;let Oe=je=class extends xe{constructor(){super(...arguments),this.type="solid"}clone(){return new je}};(0,s._)([(0,c.Cb)({type:["solid"],readOnly:!0,json:{write:!0}})],Oe.prototype,"type",void 0),Oe=je=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterModeSolid")],Oe);const Te=Oe;var Fe,Le=r(64372);let Ee=Fe=class extends xe{constructor(){super(...arguments),this.type="wire-frame",this.edges=null}clone(){return new Fe({edges:(0,a.d9)(this.edges)})}};(0,s._)([(0,x.J)({wireFrame:"wire-frame"})],Ee.prototype,"type",void 0),(0,s._)([(0,c.Cb)(Le.Z)],Ee.prototype,"edges",void 0),Ee=Fe=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterModeWireFrame")],Ee);const Ae=Ee;var Be;let qe=Be=class extends xe{constructor(){super(...arguments),this.type="x-ray"}clone(){return new Be}};(0,s._)([(0,c.Cb)({type:["x-ray"],readOnly:!0,json:{write:!0}})],qe.prototype,"type",void 0),qe=Be=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterModeXRay")],qe);const Ze=qe;var Pe;const Re={nonNullable:!0,types:{key:"type",base:xe,typeMap:{solid:Te,"wire-frame":Ae,"x-ray":Ze}},json:{read:e=>{switch(e?.type){case"solid":return Te.fromJSON(e);case"wireFrame":return Ae.fromJSON(e);case"x-ray":return Ze.fromJSON(e);default:return}},write:{enabled:!0,isRequired:!0}}};let Ue=Pe=class extends pe.wq{constructor(){super(...arguments),this.filterExpression=null,this.filterMode=new Te,this.title=""}clone(){return new Pe({filterExpression:this.filterExpression,filterMode:(0,a.d9)(this.filterMode),title:this.title})}};(0,s._)([(0,c.Cb)({type:String,json:{write:{enabled:!0,isRequired:!0}}})],Ue.prototype,"filterExpression",void 0),(0,s._)([(0,c.Cb)(Re)],Ue.prototype,"filterMode",void 0),(0,s._)([(0,c.Cb)({type:String,json:{write:{enabled:!0,isRequired:!0}}})],Ue.prototype,"title",void 0),Ue=Pe=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilterBlock")],Ue);const ke=Ue;var Me;const Ne=i.Z.ofType(ke);let Qe=Me=class extends pe.wq{constructor(){super(...arguments),this.description=null,this.filterBlocks=null,this.id=(0,ue.DO)(),this.name=null}clone(){return new Me({description:this.description,filterBlocks:(0,a.d9)(this.filterBlocks),id:this.id,name:this.name,filterAuthoringInfo:(0,a.d9)(this.filterAuthoringInfo)})}};(0,s._)([(0,c.Cb)({type:String,json:{write:!0}})],Qe.prototype,"description",void 0),(0,s._)([(0,c.Cb)({type:Ne,json:{write:{enabled:!0,isRequired:!0}}})],Qe.prototype,"filterBlocks",void 0),(0,s._)([(0,c.Cb)({types:{key:"type",base:ye,typeMap:{checkbox:Ce}},json:{read:e=>"checkbox"===e?.type?Ce.fromJSON(e):null,write:!0}})],Qe.prototype,"filterAuthoringInfo",void 0),(0,s._)([(0,c.Cb)({type:String,constructOnly:!0,json:{write:{enabled:!0,isRequired:!0}}})],Qe.prototype,"id",void 0),(0,s._)([(0,c.Cb)({type:String,json:{write:{enabled:!0,isRequired:!0}}})],Qe.prototype,"name",void 0),Qe=Me=(0,s._)([(0,f.j)("esri.layers.support.BuildingFilter")],Qe);const De=Qe;let Ve=class extends pe.wq{constructor(){super(...arguments),this.fieldName=null,this.modelName=null,this.label=null,this.min=null,this.max=null,this.mostFrequentValues=null,this.subLayerIds=null}};(0,s._)([(0,c.Cb)({type:String})],Ve.prototype,"fieldName",void 0),(0,s._)([(0,c.Cb)({type:String})],Ve.prototype,"modelName",void 0),(0,s._)([(0,c.Cb)({type:String})],Ve.prototype,"label",void 0),(0,s._)([(0,c.Cb)({type:Number})],Ve.prototype,"min",void 0),(0,s._)([(0,c.Cb)({type:Number})],Ve.prototype,"max",void 0),(0,s._)([(0,c.Cb)({json:{read:e=>Array.isArray(e)&&(e.every((e=>"string"==typeof e))||e.every((e=>"number"==typeof e)))?e.slice():null}})],Ve.prototype,"mostFrequentValues",void 0),(0,s._)([(0,c.Cb)({type:[Number]})],Ve.prototype,"subLayerIds",void 0),Ve=(0,s._)([(0,f.j)("esri.layers.support.BuildingFieldStatistics")],Ve);let Ke=class extends(C.Z.LoadableMixin((0,I.v)(pe.wq))){constructor(){super(...arguments),this.url=null}get fields(){return this.loaded||"loading"===this.loadStatus?this._get("fields"):(p.Z.getLogger(this).error("building summary statistics are not loaded"),null)}load(e){const t=null!=e?e.signal:null;return this.addResolvingPromise(this._fetchService(t)),Promise.resolve(this)}async _fetchService(e){const t=(await(0,w.Z)(this.url,{query:{f:"json"},responseType:"json",signal:e})).data;this.read(t,{origin:"service"})}};(0,s._)([(0,c.Cb)({constructOnly:!0,type:String})],Ke.prototype,"url",void 0),(0,s._)([(0,c.Cb)({readOnly:!0,type:[Ve],json:{read:{source:"summary"}}})],Ke.prototype,"fields",null),Ke=(0,s._)([(0,f.j)("esri.layers.support.BuildingSummaryStatistics")],Ke);const ze=Ke;var He=r(83772);const Ge=i.Z.ofType(De),Je=(0,a.d9)(ee.sublayersProperty),$e=Je.json?.origins;$e&&($e["web-scene"]={type:[H],write:{enabled:!0,overridePolicy:()=>({enabled:!1})}},$e["portal-item"]={type:[H],write:{enabled:!0,overridePolicy:()=>({enabled:!1})}});let We=class extends((0,ae.Vt)((0,re.Y)((0,ie.q)((0,oe.I)((0,ne.M)((0,u.R)((0,se.N)((0,te.V)(g.Z))))))))){constructor(e){super(e),this.operationalLayerType="BuildingSceneLayer",this.allSublayers=new o.Z({getCollections:()=>[this.sublayers],getChildrenFunction:e=>"building-group"===e.type?e.sublayers:null}),this.sublayers=null,this._sublayerOverrides=null,this.filters=new Ge,this.activeFilterId=null,this.summaryStatistics=null,this.outFields=null,this.legendEnabled=!0,this.type="building-scene"}normalizeCtorArgs(e){return"string"==typeof e?{url:e}:e??{}}destroy(){this.allSublayers.destroy()}readSublayers(e,t,r){const s=ee.readSublayers(e,t,r);return ee.forEachSublayer(s,(e=>e.layer=this)),this._sublayerOverrides&&(this.applySublayerOverrides(s,this._sublayerOverrides),this._sublayerOverrides=null),s}applySublayerOverrides(e,{overrides:t,context:r}){ee.forEachSublayer(e,(e=>e.read(t.get(e.id),r)))}readSublayerOverrides(e,t){const r=new Map;for(const s of e)null!=s&&"object"==typeof s&&"number"==typeof s.id?r.set(s.id,s):t.messages?.push(new n.Z("building-scene-layer:invalid-sublayer-override","Invalid value for sublayer override. Not an object or no id specified.",{value:s}));return{overrides:r,context:t}}writeSublayerOverrides(e,t,r){const s=[];ee.forEachSublayer(this.sublayers,(e=>{const t=e.write({},r);Object.keys(t).length>1&&s.push(t)})),s.length>0&&(t.sublayers=s)}writeUnappliedOverrides(e,t){t.sublayers=[],e.overrides.forEach((e=>{t.sublayers.push((0,a.d9)(e))}))}write(e,t){return e=super.write(e,t),!t||"web-scene"!==t.origin&&"portal-item"!==t.origin||(this.sublayers?this.writeSublayerOverrides(this.sublayers,e,t):this._sublayerOverrides&&this.writeUnappliedOverrides(this._sublayerOverrides,e)),e}read(e,t){if(super.read(e,t),t&&("web-scene"===t.origin||"portal-item"===t.origin)&&null!=e&&Array.isArray(e.sublayers)){const r=this.readSublayerOverrides(e.sublayers,t);this.sublayers?this.applySublayerOverrides(this.sublayers,r):this._sublayerOverrides=r}}readSummaryStatistics(e,t){if("string"==typeof t.statisticsHRef){const e=(0,y.v_)(this.parsedUrl?.path,t.statisticsHRef);return new ze({url:e})}return null}set elevationInfo(e){this._set("elevationInfo",e),this._validateElevationInfo()}load(e){const t=null!=e?e.signal:null,r=this.loadFromPortal({supportedTypes:["Scene Service"]},e).catch(d.r9).then((()=>this._fetchService(t))).then((()=>this._fetchAssociatedFeatureService(t)));return this.addResolvingPromise(r),Promise.resolve(this)}loadAll(){return(0,l.G)(this,(e=>{ee.forEachSublayer(this.sublayers,(t=>{"building-group"!==t.type&&e(t)})),this.summaryStatistics&&e(this.summaryStatistics)}))}async saveAs(e,t){return this._debouncedSaveOperations(ae.xp.SAVE_AS,{...t,getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"building-scene"},e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"building-scene"};return this._debouncedSaveOperations(ae.xp.SAVE,e)}validateLayer(e){if(!e.layerType||"Building"!==e.layerType)throw new n.Z("buildingscenelayer:layer-type-not-supported","BuildingSceneLayer does not support this layer type",{layerType:e.layerType})}_getTypeKeywords(){return["Building"]}async _fetchAssociatedFeatureService(e){try{const{portalItem:t}=await(0,le.w)(`${this.url}/layers/${this.layerId}`,{sceneLayerItem:this.portalItem,customParameters:this.customParameters,apiKey:this.apiKey,signal:e});this.associatedFeatureServiceItem=t}catch(e){p.Z.getLogger(this).warn("Associated feature service item could not be loaded",e)}}_validateElevationInfo(){const e=this.elevationInfo,t="Building scene layers";(0,He.LR)(p.Z.getLogger(this),(0,He.Uy)(t,"absolute-height",e)),(0,He.LR)(p.Z.getLogger(this),(0,He.kf)(t,e))}};(0,s._)([(0,c.Cb)({type:["BuildingSceneLayer"]})],We.prototype,"operationalLayerType",void 0),(0,s._)([(0,c.Cb)({readOnly:!0})],We.prototype,"allSublayers",void 0),(0,s._)([(0,c.Cb)(Je)],We.prototype,"sublayers",void 0),(0,s._)([(0,h.r)("service","sublayers")],We.prototype,"readSublayers",null),(0,s._)([(0,c.Cb)({type:Ge,nonNullable:!0,json:{write:!0}})],We.prototype,"filters",void 0),(0,s._)([(0,c.Cb)({type:String,json:{write:!0}})],We.prototype,"activeFilterId",void 0),(0,s._)([(0,c.Cb)({readOnly:!0,type:ze})],We.prototype,"summaryStatistics",void 0),(0,s._)([(0,h.r)("summaryStatistics",["statisticsHRef"])],We.prototype,"readSummaryStatistics",null),(0,s._)([(0,c.Cb)({type:[String],json:{read:!1}})],We.prototype,"outFields",void 0),(0,s._)([(0,c.Cb)(L.vg)],We.prototype,"fullExtent",void 0),(0,s._)([(0,c.Cb)(L.rn)],We.prototype,"legendEnabled",void 0),(0,s._)([(0,c.Cb)({type:["show","hide","hide-children"]})],We.prototype,"listMode",void 0),(0,s._)([(0,c.Cb)((0,L.Lx)(b.Z))],We.prototype,"spatialReference",void 0),(0,s._)([(0,c.Cb)(L.PV)],We.prototype,"elevationInfo",null),(0,s._)([(0,c.Cb)({json:{read:!1},readOnly:!0})],We.prototype,"type",void 0),(0,s._)([(0,c.Cb)()],We.prototype,"associatedFeatureServiceItem",void 0),We=(0,s._)([(0,f.j)("esri.layers.BuildingSceneLayer")],We);const Xe=We},23745:function(e,t,r){r.d(t,{G:function(){return u}});var s=r(36663),i=r(37956),o=r(74589),n=r(81977),a=(r(39994),r(13802),r(4157),r(40266)),l=r(14845),p=r(23756);const u=e=>{let t=class extends e{get timeInfo(){const e=this.associatedLayer?.timeInfo;if(null==e)return e;const t=e.clone();return(0,l.UF)(t,this.fieldsIndex),t}set timeInfo(e){(0,l.UF)(e,this.fieldsIndex),this._override("timeInfo",e)}get timeExtent(){return this.associatedLayer?.timeExtent}set timeExtent(e){this._override("timeExtent",e)}get timeOffset(){return this.associatedLayer?.timeOffset}set timeOffset(e){this._override("timeOffset",e)}get useViewTime(){return this.associatedLayer?.useViewTime??!0}set useViewTime(e){this._override("useViewTime",e)}get datesInUnknownTimezone(){return this.associatedLayer?.datesInUnknownTimezone??!1}set datesInUnknownTimezone(e){this._override("datesInUnknownTimezone",e)}};return(0,s._)([(0,n.Cb)({type:p.Z})],t.prototype,"timeInfo",null),(0,s._)([(0,n.Cb)({type:i.Z})],t.prototype,"timeExtent",null),(0,s._)([(0,n.Cb)({type:o.Z})],t.prototype,"timeOffset",null),(0,s._)([(0,n.Cb)({type:Boolean,nonNullable:!0})],t.prototype,"useViewTime",null),(0,s._)([(0,n.Cb)({type:Boolean,nonNullable:!0})],t.prototype,"datesInUnknownTimezone",null),t=(0,s._)([(0,a.j)("esri.layers.mixins.TemporalSceneLayer")],t),t}},53264:function(e,t,r){r.d(t,{w:function(){return u}});var s=r(88256),i=r(66341),o=r(70375),n=r(78668),a=r(20692),l=r(93968),p=r(53110);async function u(e,t){const r=(0,a.Qc)(e);if(!r)throw new o.Z("invalid-url","Invalid scene service url");const u={...t,sceneServerUrl:r.url.path,layerId:r.sublayer??void 0};if(u.sceneLayerItem??=await async function(e){const t=(await d(e)).serviceItemId;if(!t)return null;const r=new p.default({id:t,apiKey:e.apiKey}),o=await async function(e){const t=s.id?.findServerInfo(e.sceneServerUrl);if(t?.owningSystemUrl)return t.owningSystemUrl;const r=e.sceneServerUrl.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const t=(await(0,i.Z)(r,{query:{f:"json"},responseType:"json",signal:e.signal})).data.owningSystemUrl;if(t)return t}catch(e){(0,n.r9)(e)}return null}(e);null!=o&&(r.portal=new l.Z({url:o}));try{return r.load({signal:e.signal})}catch(e){return(0,n.r9)(e),null}}(u),null==u.sceneLayerItem)return y(u.sceneServerUrl.replace("/SceneServer","/FeatureServer"),u);const c=await async function({sceneLayerItem:e,signal:t}){if(!e)return null;try{const r=(await e.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:t})).find((e=>"Feature Service"===e.type))||null;if(!r)return null;const s=new p.default({portal:r.portal,id:r.id});return await s.load(),s}catch(e){return(0,n.r9)(e),null}}(u);if(!c?.url)throw new o.Z("related-service-not-found","Could not find feature service through portal item relationship");u.featureServiceItem=c;const h=await y(c.url,u);return h.portalItem=c,h}async function d(e){if(e.rootDocument)return e.rootDocument;const t={query:{f:"json",...e.customParameters,token:e.apiKey},responseType:"json",signal:e.signal};try{const r=await(0,i.Z)(e.sceneServerUrl,t);e.rootDocument=r.data}catch{e.rootDocument={}}return e.rootDocument}async function y(e,t){const r=(0,a.Qc)(e);if(!r)throw new o.Z("invalid-feature-service-url","Invalid feature service url");const s=r.url.path,n=t.layerId;if(null==n)return{serverUrl:s};const l=d(t),p=t.featureServiceItem?await t.featureServiceItem.fetchData("json"):null,u=(p?.layers?.[0]||p?.tables?.[0])?.customParameters,y=e=>{const r={query:{f:"json",...u},responseType:"json",authMode:e,signal:t.signal};return(0,i.Z)(s,r)},c=y("anonymous").catch((()=>y("no-prompt"))),[h,f]=await Promise.all([c,l]),b=f?.layers,g=h.data&&h.data.layers;if(!Array.isArray(g))throw new Error("expected layers array");if(Array.isArray(b)){for(let e=0;e<Math.min(b.length,g.length);e++)if(b[e].id===n)return{serverUrl:s,layerId:g[e].id}}else if(null!=n&&n<g.length)return{serverUrl:s,layerId:g[n].id};throw new Error("could not find matching associated sublayer")}},31484:function(e,t,r){r.d(t,{C:function(){return s}});const s={analytics:{supportsCacheHint:!1},attachment:{supportsContentType:!1,supportsExifInfo:!1,supportsKeywords:!1,supportsName:!1,supportsSize:!1,supportsCacheHint:!1,supportsResize:!1},data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:!1},editing:{supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsGeometryUpdate:!1,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsAsyncApplyEdits:!1,zDefault:void 0},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!1,supportsDelete:!1,supportsEditing:!1,supportsChangeTracking:!1,supportsQuery:!1,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:!1,supportsExceedsLimitStatistics:!1,supportsAsyncConvert3D:!1},queryRelated:{supportsCount:!1,supportsOrderBy:!1,supportsPagination:!1,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},query:{maxRecordCount:0,maxRecordCountFactor:0,standardMaxRecordCount:0,supportsCacheHint:!1,supportsCentroid:!1,supportsCompactGeometry:!1,supportsDefaultSpatialReference:!1,supportsFullTextSearch:!1,supportsDisjointSpatialRelationship:!1,supportsDistance:!1,supportsDistinct:!1,supportsExtent:!1,supportsFormatPBF:!1,supportsGeometryProperties:!1,supportsHavingClause:!1,supportsHistoricMoment:!1,supportsMaxRecordCountFactor:!1,supportsOrderBy:!1,supportsPagination:!1,supportsPercentileStatistics:!1,supportsQuantization:!1,supportsQuantizationEditMode:!1,supportsQueryByAnonymous:!1,supportsQueryByOthers:!1,supportsQueryGeometry:!1,supportsResultType:!1,supportsSqlExpression:!1,supportsStandardizedQueriesOnly:!1,supportsTopFeaturesQuery:!1,supportsSpatialAggregationStatistics:!1,supportedSpatialAggregationStatistics:{envelope:!1,centroid:!1,convexHull:!1},supportsStatistics:!1,tileMaxRecordCount:0}}},59439:function(e,t,r){r.d(t,{V5:function(){return o},e7:function(){return i}});var s=r(14845);async function i(e,t=e.popupTemplate){if(null==t)return[];const r=await t.getRequiredFields(e.fieldsIndex),{lastEditInfoEnabled:i}=t,{objectIdField:o,typeIdField:n,globalIdField:a,relationships:l}=e;if(r.includes("*"))return["*"];const p=i?(0,s.CH)(e):[],u=(0,s.Q0)(e.fieldsIndex,[...r,...p]);return n&&u.push(n),u&&o&&e.fieldsIndex?.has(o)&&!u.includes(o)&&u.push(o),u&&a&&e.fieldsIndex?.has(a)&&!u.includes(a)&&u.push(a),l&&l.forEach((t=>{const{keyField:r}=t;u&&r&&e.fieldsIndex?.has(r)&&!u.includes(r)&&u.push(r)})),u}function o(e,t){return e.popupTemplate?e.popupTemplate:null!=t&&t.defaultPopupTemplateEnabled&&null!=e.defaultPopupTemplate?e.defaultPopupTemplate:null}}}]);