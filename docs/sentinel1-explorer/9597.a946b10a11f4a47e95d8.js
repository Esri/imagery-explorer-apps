"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[9597],{79597:function(r,n,e){e.r(n),e.d(n,{i:function(){return f}});var t,i,o,a=e(58340),u={exports:{}};t=u,i="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,o=function(r={}){var n,e,t=void 0!==r?r:{};t.ready=new Promise(((r,t)=>{n=r,e=t}));var o=Object.assign({},t),a="object"==typeof window,u="function"==typeof importScripts;"object"==typeof process&&"object"==typeof process.versions&&process.versions.node;var c,f="";(a||u)&&(u?f=self.location.href:"undefined"!=typeof document&&document.currentScript&&(f=document.currentScript.src),i&&(f=i),f=0!==f.indexOf("blob:")?f.substr(0,f.replace(/[?#].*/,"").lastIndexOf("/")+1):"",u&&(c=r=>{var n=new XMLHttpRequest;return n.open("GET",r,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}));var s,l,d=t.print||void 0,p=t.printErr||void 0;Object.assign(t,o),o=null,t.arguments&&t.arguments,t.thisProgram&&t.thisProgram,t.quit&&t.quit,t.wasmBinary&&(s=t.wasmBinary),t.noExitRuntime,"object"!=typeof WebAssembly&&S("no native wasm support detected");var h,v,m,g,y,_,w,b,A,T=!1;function C(){var r=l.buffer;t.HEAP8=h=new Int8Array(r),t.HEAP16=m=new Int16Array(r),t.HEAP32=y=new Int32Array(r),t.HEAPU8=v=new Uint8Array(r),t.HEAPU16=g=new Uint16Array(r),t.HEAPU32=_=new Uint32Array(r),t.HEAPF32=w=new Float32Array(r),t.HEAPF64=b=new Float64Array(r)}var P=[],k=[],E=[];function W(r){P.unshift(r)}function j(r){E.unshift(r)}var F=0,R=null;function S(r){t.onAbort&&t.onAbort(r),p(r="Aborted("+r+")"),T=!0,r+=". Build with -sASSERTIONS for more info.";var n=new WebAssembly.RuntimeError(r);throw e(n),n}var x,U="data:application/octet-stream;base64,";function I(r){return r.startsWith(U)}function O(r){try{if(r==x&&s)return new Uint8Array(s);if(c)return c(r);throw"both async and sync fetching of the wasm failed"}catch(r){S(r)}}function z(r,n,e){return function(r){return s||!a&&!u||"function"!=typeof fetch?Promise.resolve().then((()=>O(r))):fetch(r,{credentials:"same-origin"}).then((n=>{if(!n.ok)throw"failed to load wasm binary file at '"+r+"'";return n.arrayBuffer()})).catch((()=>O(r)))}(r).then((r=>WebAssembly.instantiate(r,n))).then((r=>r)).then(e,(r=>{p("failed to asynchronously prepare wasm: "+r),S(r)}))}function D(r){for(;r.length>0;)r.shift()(t)}I(x="i3s.wasm")||(x=function(r){return t.locateFile?t.locateFile(r,f):f+r}(x));var V=[];function H(r){var n=V[r];return n||(r>=V.length&&(V.length=r+1),V[r]=n=A.get(r)),n}function M(r){this.excPtr=r,this.ptr=r-24,this.set_type=function(r){_[this.ptr+4>>2]=r},this.get_type=function(){return _[this.ptr+4>>2]},this.set_destructor=function(r){_[this.ptr+8>>2]=r},this.get_destructor=function(){return _[this.ptr+8>>2]},this.set_caught=function(r){r=r?1:0,h[this.ptr+12>>0]=r},this.get_caught=function(){return 0!=h[this.ptr+12>>0]},this.set_rethrown=function(r){r=r?1:0,h[this.ptr+13>>0]=r},this.get_rethrown=function(){return 0!=h[this.ptr+13>>0]},this.init=function(r,n){this.set_adjusted_ptr(0),this.set_type(r),this.set_destructor(n)},this.set_adjusted_ptr=function(r){_[this.ptr+16>>2]=r},this.get_adjusted_ptr=function(){return _[this.ptr+16>>2]},this.get_exception_ptr=function(){if(Vr(this.get_type()))return _[this.excPtr>>2];var r=this.get_adjusted_ptr();return 0!==r?r:this.excPtr}}var B={};function q(r){for(;r.length;){var n=r.pop();r.pop()(n)}}function N(r){return this.fromWireType(y[r>>2])}var L={},G={},X={},Z=48,$=57;function J(r){if(void 0===r)return"_unknown";var n=(r=r.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return n>=Z&&n<=$?"_"+r:r}function K(r,n){var e=function(r,n){return{[r=J(r)]:function(){return n.apply(this,arguments)}}[r]}(n,(function(r){this.name=n,this.message=r;var e=new Error(r).stack;void 0!==e&&(this.stack=this.toString()+"\n"+e.replace(/^Error(:[^\n]*)?\n/,""))}));return e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},e}var Q=void 0;function Y(r){throw new Q(r)}function rr(r,n,e){function t(n){var t=e(n);t.length!==r.length&&Y("Mismatched type converter count");for(var i=0;i<r.length;++i)ar(r[i],t[i])}r.forEach((function(r){X[r]=n}));var i=new Array(n.length),o=[],a=0;n.forEach(((r,n)=>{G.hasOwnProperty(r)?i[n]=G[r]:(o.push(r),L.hasOwnProperty(r)||(L[r]=[]),L[r].push((()=>{i[n]=G[r],++a===o.length&&t(i)})))})),0===o.length&&t(i)}function nr(r){switch(r){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+r)}}var er=void 0;function tr(r){for(var n="",e=r;v[e];)n+=er[v[e++]];return n}var ir=void 0;function or(r){throw new ir(r)}function ar(r,n,e={}){if(!("argPackAdvance"in n))throw new TypeError("registerType registeredInstance requires argPackAdvance");var t=n.name;if(r||or('type "'+t+'" must have a positive integer typeid pointer'),G.hasOwnProperty(r)){if(e.ignoreDuplicateRegistrations)return;or("Cannot register type '"+t+"' twice")}if(G[r]=n,delete X[r],L.hasOwnProperty(r)){var i=L[r];delete L[r],i.forEach((r=>r()))}}var ur=new function(){this.allocated=[void 0],this.freelist=[],this.get=function(r){return this.allocated[r]},this.allocate=function(r){let n=this.freelist.pop()||this.allocated.length;return this.allocated[n]=r,n},this.free=function(r){this.allocated[r]=void 0,this.freelist.push(r)}};function cr(r){r>=ur.reserved&&0==--ur.get(r).refcount&&ur.free(r)}function fr(){for(var r=0,n=ur.reserved;n<ur.allocated.length;++n)void 0!==ur.allocated[n]&&++r;return r}var sr=r=>(r||or("Cannot use deleted val. handle = "+r),ur.get(r).value),lr=r=>{switch(r){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return ur.allocate({refcount:1,value:r})}};function dr(r,n){switch(n){case 2:return function(r){return this.fromWireType(w[r>>2])};case 3:return function(r){return this.fromWireType(b[r>>3])};default:throw new TypeError("Unknown float type: "+r)}}function pr(r,n,e){t.hasOwnProperty(r)?((void 0===e||void 0!==t[r].overloadTable&&void 0!==t[r].overloadTable[e])&&or("Cannot register public name '"+r+"' twice"),function(r,n,e){if(void 0===r[n].overloadTable){var t=r[n];r[n]=function(){return r[n].overloadTable.hasOwnProperty(arguments.length)||or("Function '"+e+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+r[n].overloadTable+")!"),r[n].overloadTable[arguments.length].apply(this,arguments)},r[n].overloadTable=[],r[n].overloadTable[t.argCount]=t}}(t,r,r),t.hasOwnProperty(e)&&or("Cannot register multiple overloads of a function with the same number of arguments ("+e+")!"),t[r].overloadTable[e]=n):(t[r]=n,void 0!==e&&(t[r].numArguments=e))}function hr(r,n,e){t.hasOwnProperty(r)||Y("Replacing nonexistant public symbol"),void 0!==t[r].overloadTable&&void 0!==e?t[r].overloadTable[e]=n:(t[r]=n,t[r].argCount=e)}function vr(r,n,e){return r.includes("j")?function(r,n,e){var i=t["dynCall_"+r];return e&&e.length?i.apply(null,[n].concat(e)):i.call(null,n)}(r,n,e):H(n).apply(null,e)}function mr(r,n){var e=(r=tr(r)).includes("j")?function(r,n){var e=[];return function(){return e.length=0,Object.assign(e,arguments),vr(r,n,e)}}(r,n):H(n);return"function"!=typeof e&&or("unknown function pointer with signature "+r+": "+n),e}var gr=void 0;function yr(r){var n=zr(r),e=tr(n);return Or(n),e}function _r(r,n,e){switch(n){case 0:return e?function(r){return h[r]}:function(r){return v[r]};case 1:return e?function(r){return m[r>>1]}:function(r){return g[r>>1]};case 2:return e?function(r){return y[r>>2]}:function(r){return _[r>>2]};default:throw new TypeError("Unknown integer type: "+r)}}var wr="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function br(r,n,e){for(var t=n+e,i=n;r[i]&&!(i>=t);)++i;if(i-n>16&&r.buffer&&wr)return wr.decode(r.subarray(n,i));for(var o="";n<i;){var a=r[n++];if(128&a){var u=63&r[n++];if(192!=(224&a)){var c=63&r[n++];if((a=224==(240&a)?(15&a)<<12|u<<6|c:(7&a)<<18|u<<12|c<<6|63&r[n++])<65536)o+=String.fromCharCode(a);else{var f=a-65536;o+=String.fromCharCode(55296|f>>10,56320|1023&f)}}else o+=String.fromCharCode((31&a)<<6|u)}else o+=String.fromCharCode(a)}return o}function Ar(r,n){return r?br(v,r,n):""}var Tr="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function Cr(r,n){for(var e=r,t=e>>1,i=t+n/2;!(t>=i)&&g[t];)++t;if((e=t<<1)-r>32&&Tr)return Tr.decode(v.subarray(r,e));for(var o="",a=0;!(a>=n/2);++a){var u=m[r+2*a>>1];if(0==u)break;o+=String.fromCharCode(u)}return o}function Pr(r,n,e){if(void 0===e&&(e=2147483647),e<2)return 0;for(var t=n,i=(e-=2)<2*r.length?e/2:r.length,o=0;o<i;++o){var a=r.charCodeAt(o);m[n>>1]=a,n+=2}return m[n>>1]=0,n-t}function kr(r){return 2*r.length}function Er(r,n){for(var e=0,t="";!(e>=n/4);){var i=y[r+4*e>>2];if(0==i)break;if(++e,i>=65536){var o=i-65536;t+=String.fromCharCode(55296|o>>10,56320|1023&o)}else t+=String.fromCharCode(i)}return t}function Wr(r,n,e){if(void 0===e&&(e=2147483647),e<4)return 0;for(var t=n,i=t+e-4,o=0;o<r.length;++o){var a=r.charCodeAt(o);if(a>=55296&&a<=57343&&(a=65536+((1023&a)<<10)|1023&r.charCodeAt(++o)),y[n>>2]=a,(n+=4)+4>i)break}return y[n>>2]=0,n-t}function jr(r){for(var n=0,e=0;e<r.length;++e){var t=r.charCodeAt(e);t>=55296&&t<=57343&&++e,n+=4}return n}var Fr={};function Rr(r){var n=l.buffer;try{return l.grow(r-n.byteLength+65535>>>16),C(),1}catch(r){}}var Sr=[null,[],[]];function xr(r,n){var e=Sr[r];0===n||10===n?((1===r?d:p)(br(e,0)),e.length=0):e.push(n)}Q=t.InternalError=K(Error,"InternalError"),function(){for(var r=new Array(256),n=0;n<256;++n)r[n]=String.fromCharCode(n);er=r}(),ir=t.BindingError=K(Error,"BindingError"),ur.allocated.push({value:void 0},{value:null},{value:!0},{value:!1}),ur.reserved=ur.allocated.length,t.count_emval_handles=fr,gr=t.UnboundTypeError=K(Error,"UnboundTypeError");var Ur={__call_sighandler:function(r,n){H(r)(n)},__cxa_throw:function(r,n,e){throw new M(r).init(n,e),r},_embind_finalize_value_object:function(r){var n=B[r];delete B[r];var e=n.rawConstructor,t=n.rawDestructor,i=n.fields;rr([r],i.map((r=>r.getterReturnType)).concat(i.map((r=>r.setterArgumentType))),(r=>{var o={};return i.forEach(((n,e)=>{var t=n.fieldName,a=r[e],u=n.getter,c=n.getterContext,f=r[e+i.length],s=n.setter,l=n.setterContext;o[t]={read:r=>a.fromWireType(u(c,r)),write:(r,n)=>{var e=[];s(l,r,f.toWireType(e,n)),q(e)}}})),[{name:n.name,fromWireType:function(r){var n={};for(var e in o)n[e]=o[e].read(r);return t(r),n},toWireType:function(r,n){for(var i in o)if(!(i in n))throw new TypeError('Missing field:  "'+i+'"');var a=e();for(i in o)o[i].write(a,n[i]);return null!==r&&r.push(t,a),a},argPackAdvance:8,readValueFromPointer:N,destructorFunction:t}]}))},_embind_register_bigint:function(r,n,e,t,i){},_embind_register_bool:function(r,n,e,t,i){var o=nr(e);ar(r,{name:n=tr(n),fromWireType:function(r){return!!r},toWireType:function(r,n){return n?t:i},argPackAdvance:8,readValueFromPointer:function(r){var t;if(1===e)t=h;else if(2===e)t=m;else{if(4!==e)throw new TypeError("Unknown boolean type size: "+n);t=y}return this.fromWireType(t[r>>o])},destructorFunction:null})},_embind_register_emval:function(r,n){ar(r,{name:n=tr(n),fromWireType:function(r){var n=sr(r);return cr(r),n},toWireType:function(r,n){return lr(n)},argPackAdvance:8,readValueFromPointer:N,destructorFunction:null})},_embind_register_float:function(r,n,e){var t=nr(e);ar(r,{name:n=tr(n),fromWireType:function(r){return r},toWireType:function(r,n){return n},argPackAdvance:8,readValueFromPointer:dr(n,t),destructorFunction:null})},_embind_register_function:function(r,n,e,t,i,o,a){var u=function(r,n){for(var e=[],t=0;t<r;t++)e.push(_[n+4*t>>2]);return e}(n,e);r=tr(r),i=mr(t,i),pr(r,(function(){!function(r,n){var e=[],t={};throw n.forEach((function r(n){t[n]||G[n]||(X[n]?X[n].forEach(r):(e.push(n),t[n]=!0))})),new gr(r+": "+e.map(yr).join([", "]))}("Cannot call "+r+" due to unbound types",u)}),n-1),rr([],u,(function(e){var t=[e[0],null].concat(e.slice(1));return hr(r,function(r,n,e,t,i,o){var a=n.length;a<2&&or("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var u=null!==n[1]&&null!==e,c=!1,f=1;f<n.length;++f)if(null!==n[f]&&void 0===n[f].destructorFunction){c=!0;break}var s="void"!==n[0].name,l=a-2,d=new Array(l),p=[],h=[];return function(){var e;arguments.length!==l&&or("function "+r+" called with "+arguments.length+" arguments, expected "+l+" args!"),h.length=0,p.length=u?2:1,p[0]=i,u&&(e=n[1].toWireType(h,this),p[1]=e);for(var o=0;o<l;++o)d[o]=n[o+2].toWireType(h,arguments[o]),p.push(d[o]);return function(r){if(c)q(h);else for(var t=u?1:2;t<n.length;t++){var i=1===t?e:d[t-2];null!==n[t].destructorFunction&&n[t].destructorFunction(i)}if(s)return n[0].fromWireType(r)}(t.apply(null,p))}}(r,t,null,i,o),n-1),[]}))},_embind_register_integer:function(r,n,e,t,i){n=tr(n);var o=nr(e),a=r=>r;if(0===t){var u=32-8*e;a=r=>r<<u>>>u}var c=n.includes("unsigned");ar(r,{name:n,fromWireType:a,toWireType:c?function(r,n){return this.name,n>>>0}:function(r,n){return this.name,n},argPackAdvance:8,readValueFromPointer:_r(n,o,0!==t),destructorFunction:null})},_embind_register_memory_view:function(r,n,e){var t=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][n];function i(r){var n=_,e=n[r>>=2],i=n[r+1];return new t(n.buffer,i,e)}ar(r,{name:e=tr(e),fromWireType:i,argPackAdvance:8,readValueFromPointer:i},{ignoreDuplicateRegistrations:!0})},_embind_register_std_string:function(r,n){var e="std::string"===(n=tr(n));ar(r,{name:n,fromWireType:function(r){var n,t=_[r>>2],i=r+4;if(e)for(var o=i,a=0;a<=t;++a){var u=i+a;if(a==t||0==v[u]){var c=Ar(o,u-o);void 0===n?n=c:(n+=String.fromCharCode(0),n+=c),o=u+1}}else{var f=new Array(t);for(a=0;a<t;++a)f[a]=String.fromCharCode(v[i+a]);n=f.join("")}return Or(r),n},toWireType:function(r,n){var t;n instanceof ArrayBuffer&&(n=new Uint8Array(n));var i="string"==typeof n;i||n instanceof Uint8Array||n instanceof Uint8ClampedArray||n instanceof Int8Array||or("Cannot pass non-string to std::string"),t=e&&i?function(r){for(var n=0,e=0;e<r.length;++e){var t=r.charCodeAt(e);t<=127?n++:t<=2047?n+=2:t>=55296&&t<=57343?(n+=4,++e):n+=3}return n}(n):n.length;var o=Ir(4+t+1),a=o+4;if(_[o>>2]=t,e&&i)!function(r,n,e){(function(r,n,e,t){if(!(t>0))return 0;for(var i=e,o=e+t-1,a=0;a<r.length;++a){var u=r.charCodeAt(a);if(u>=55296&&u<=57343&&(u=65536+((1023&u)<<10)|1023&r.charCodeAt(++a)),u<=127){if(e>=o)break;n[e++]=u}else if(u<=2047){if(e+1>=o)break;n[e++]=192|u>>6,n[e++]=128|63&u}else if(u<=65535){if(e+2>=o)break;n[e++]=224|u>>12,n[e++]=128|u>>6&63,n[e++]=128|63&u}else{if(e+3>=o)break;n[e++]=240|u>>18,n[e++]=128|u>>12&63,n[e++]=128|u>>6&63,n[e++]=128|63&u}}n[e]=0})(r,v,n,e)}(n,a,t+1);else if(i)for(var u=0;u<t;++u){var c=n.charCodeAt(u);c>255&&(Or(a),or("String has UTF-16 code units that do not fit in 8 bits")),v[a+u]=c}else for(u=0;u<t;++u)v[a+u]=n[u];return null!==r&&r.push(Or,o),o},argPackAdvance:8,readValueFromPointer:N,destructorFunction:function(r){Or(r)}})},_embind_register_std_wstring:function(r,n,e){var t,i,o,a,u;e=tr(e),2===n?(t=Cr,i=Pr,a=kr,o=()=>g,u=1):4===n&&(t=Er,i=Wr,a=jr,o=()=>_,u=2),ar(r,{name:e,fromWireType:function(r){for(var e,i=_[r>>2],a=o(),c=r+4,f=0;f<=i;++f){var s=r+4+f*n;if(f==i||0==a[s>>u]){var l=t(c,s-c);void 0===e?e=l:(e+=String.fromCharCode(0),e+=l),c=s+n}}return Or(r),e},toWireType:function(r,t){"string"!=typeof t&&or("Cannot pass non-string to C++ string type "+e);var o=a(t),c=Ir(4+o+n);return _[c>>2]=o>>u,i(t,c+4,o+n),null!==r&&r.push(Or,c),c},argPackAdvance:8,readValueFromPointer:N,destructorFunction:function(r){Or(r)}})},_embind_register_value_object:function(r,n,e,t,i,o){B[r]={name:tr(n),rawConstructor:mr(e,t),rawDestructor:mr(i,o),fields:[]}},_embind_register_value_object_field:function(r,n,e,t,i,o,a,u,c,f){B[r].fields.push({fieldName:tr(n),getterReturnType:e,getter:mr(t,i),getterContext:o,setterArgumentType:a,setter:mr(u,c),setterContext:f})},_embind_register_void:function(r,n){ar(r,{isVoid:!0,name:n=tr(n),argPackAdvance:0,fromWireType:function(){},toWireType:function(r,n){}})},_emval_decref:cr,_emval_incref:function(r){r>4&&(ur.get(r).refcount+=1)},_emval_new_cstring:function(r){return lr(function(r){var n=Fr[r];return void 0===n?tr(r):n}(r))},_emval_take_value:function(r,n){var e=(r=function(r,n){var e=G[r];return void 0===e&&or(n+" has unknown type "+yr(r)),e}(r,"_emval_take_value")).readValueFromPointer(n);return lr(e)},abort:function(){S("")},emscripten_memcpy_big:function(r,n,e){v.copyWithin(r,n,n+e)},emscripten_resize_heap:function(r){var n=v.length,e=2147483648;if((r>>>=0)>e)return!1;let t=(r,n)=>r+(n-r%n)%n;for(var i=1;i<=4;i*=2){var o=n*(1+.2/i);if(o=Math.min(o,r+100663296),Rr(Math.min(e,t(Math.max(r,o),65536))))return!0}return!1},fd_close:function(r){return 52},fd_seek:function(r,n,e,t,i){return 70},fd_write:function(r,n,e,t){for(var i=0,o=0;o<e;o++){var a=_[n>>2],u=_[n+4>>2];n+=8;for(var c=0;c<u;c++)xr(r,v[a+c]);i+=u}return _[t>>2]=i,0}};!function(){var r={env:Ur,wasi_snapshot_preview1:Ur};function n(r,n){var e=r.exports;return t.asm=e,l=t.asm.memory,C(),A=t.asm.__indirect_function_table,function(r){k.unshift(r)}(t.asm.__wasm_call_ctors),function(r){if(F--,t.monitorRunDependencies&&t.monitorRunDependencies(F),0==F&&R){var n=R;R=null,n()}}(),e}if(F++,t.monitorRunDependencies&&t.monitorRunDependencies(F),t.instantiateWasm)try{return t.instantiateWasm(r,n)}catch(r){p("Module.instantiateWasm callback failed with error: "+r),e(r)}(function(r,n,e,t){return r||"function"!=typeof WebAssembly.instantiateStreaming||I(n)||"function"!=typeof fetch?z(n,e,t):fetch(n,{credentials:"same-origin"}).then((r=>WebAssembly.instantiateStreaming(r,e).then(t,(function(r){return p("wasm streaming compile failed: "+r),p("falling back to ArrayBuffer instantiation"),z(n,e,t)}))))})(s,x,r,(function(r){n(r.instance)})).catch(e)}();var Ir=function(){return(Ir=t.asm.malloc).apply(null,arguments)},Or=function(){return(Or=t.asm.free).apply(null,arguments)},zr=function(){return(zr=t.asm.__getTypeName).apply(null,arguments)};t.__embind_initialize_bindings=function(){return(t.__embind_initialize_bindings=t.asm._embind_initialize_bindings).apply(null,arguments)};var Dr,Vr=function(){return(Vr=t.asm.__cxa_is_pointer_type).apply(null,arguments)};function Hr(){function r(){Dr||(Dr=!0,t.calledRun=!0,T||(D(k),n(t),t.onRuntimeInitialized&&t.onRuntimeInitialized(),function(){if(t.postRun)for("function"==typeof t.postRun&&(t.postRun=[t.postRun]);t.postRun.length;)j(t.postRun.shift());D(E)}()))}F>0||(function(){if(t.preRun)for("function"==typeof t.preRun&&(t.preRun=[t.preRun]);t.preRun.length;)W(t.preRun.shift());D(P)}(),F>0||(t.setStatus?(t.setStatus("Running..."),setTimeout((function(){setTimeout((function(){t.setStatus("")}),1),r()}),1)):r()))}if(t.dynCall_vij=function(){return(t.dynCall_vij=t.asm.dynCall_vij).apply(null,arguments)},t.dynCall_jiji=function(){return(t.dynCall_jiji=t.asm.dynCall_jiji).apply(null,arguments)},R=function r(){Dr||Hr(),Dr||(R=r)},t.preInit)for("function"==typeof t.preInit&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.pop()();return Hr(),r.ready},t.exports=o;const c=(0,a.g)(u.exports),f=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}))}}]);