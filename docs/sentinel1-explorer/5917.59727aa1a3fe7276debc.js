"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[5917],{15917:function(n,e,t){t.r(e),t.d(e,{buffer:function(){return z},changeDefaultSpatialReferenceTolerance:function(){return X},clearDefaultSpatialReferenceTolerance:function(){return Y},clip:function(){return w},contains:function(){return m},convexHull:function(){return k},crosses:function(){return g},cut:function(){return d},densify:function(){return G},difference:function(){return v},disjoint:function(){return O},distance:function(){return h},equals:function(){return S},extendedSpatialReferenceInfo:function(){return y},flipHorizontal:function(){return j},flipVertical:function(){return q},generalize:function(){return B},geodesicArea:function(){return M},geodesicBuffer:function(){return C},geodesicDensify:function(){return W},geodesicLength:function(){return Q},intersect:function(){return T},intersectLinesToPoints:function(){return U},intersects:function(){return x},isSimple:function(){return N},nearestCoordinate:function(){return H},nearestVertex:function(){return _},nearestVertices:function(){return I},offset:function(){return E},overlaps:function(){return D},planarArea:function(){return F},planarLength:function(){return K},relate:function(){return J},rotate:function(){return Z},simplify:function(){return b},symmetricDifference:function(){return L},touches:function(){return A},union:function(){return V},within:function(){return R}});t(91957);var r=t(62517),i=t(67666),u=t(53736);function c(n){return Array.isArray(n)?n[0]?.spatialReference:n?.spatialReference}function a(n){return n?Array.isArray(n)?n.map(a):n.toJSON?n.toJSON():n:n}function o(n){return Array.isArray(n)?n.map((n=>(0,u.im)(n))):(0,u.im)(n)}let f;async function s(){return f||(f=(0,r.bA)("geometryEngineWorker",{strategy:"distributed"})),f}async function l(n,e){return(await s()).invoke("executeGEOperation",{operation:n,parameters:a(e)})}async function p(n,e){const t=await s();return Promise.all(t.broadcast("executeGEOperation",{operation:n,parameters:a(e)}))}function y(n){return l("extendedSpatialReferenceInfo",[n])}async function w(n,e){return o(await l("clip",[c(n),n,e]))}async function d(n,e){return o(await l("cut",[c(n),n,e]))}function m(n,e){return l("contains",[c(n),n,e])}function g(n,e){return l("crosses",[c(n),n,e])}function h(n,e,t){return l("distance",[c(n),n,e,t])}function S(n,e){return l("equals",[c(n),n,e])}function x(n,e){return l("intersects",[c(n),n,e])}function A(n,e){return l("touches",[c(n),n,e])}function R(n,e){return l("within",[c(n),n,e])}function O(n,e){return l("disjoint",[c(n),n,e])}function D(n,e){return l("overlaps",[c(n),n,e])}function J(n,e,t){return l("relate",[c(n),n,e,t])}function N(n){return l("isSimple",[c(n),n])}async function b(n){return o(await l("simplify",[c(n),n]))}async function k(n,e=!1){return o(await l("convexHull",[c(n),n,e]))}async function v(n,e){return o(await l("difference",[c(n),n,e]))}async function L(n,e){return o(await l("symmetricDifference",[c(n),n,e]))}async function T(n,e){return o(await l("intersect",[c(n),n,e]))}async function V(n,e=null){const t=function(n,e){let t;return Array.isArray(n)?t=n:(t=[],t.push(n),null!=e&&t.push(e)),t}(n,e);return o(await l("union",[c(t),t]))}async function E(n,e,t,r,i,u){return o(await l("offset",[c(n),n,e,t,r,i,u]))}async function z(n,e,t,r=!1){const i=[c(n),n,e,t,r];return o(await l("buffer",i))}async function C(n,e,t,r,i,u){const a=[c(n),n,e,t,r,i,u];return o(await l("geodesicBuffer",a))}async function H(n,e,t=!0){const r=await l("nearestCoordinate",[c(n),n,e,t]);return{...r,coordinate:i.Z.fromJSON(r.coordinate)}}async function _(n,e){const t=await l("nearestVertex",[c(n),n,e]);return{...t,coordinate:i.Z.fromJSON(t.coordinate)}}async function I(n,e,t,r){return(await l("nearestVertices",[c(n),n,e,t,r])).map((n=>({...n,coordinate:i.Z.fromJSON(n.coordinate)})))}function P(n){return"xmin"in n?n.center:"x"in n?n:n.extent?.center}async function Z(n,e,t){if(null==n)throw new $;const r=n.spatialReference;if(null==(t=t??P(n)))throw new $;const i=n.constructor.fromJSON(await l("rotate",[r,n,e,t]));return i.spatialReference=r,i}async function j(n,e){if(null==n)throw new $;const t=n.spatialReference;if(null==(e=e??P(n)))throw new $;const r=n.constructor.fromJSON(await l("flipHorizontal",[t,n,e]));return r.spatialReference=t,r}async function q(n,e){if(null==n)throw new $;const t=n.spatialReference;if(null==(e=e??P(n)))throw new $;const r=n.constructor.fromJSON(await l("flipVertical",[t,n,e]));return r.spatialReference=t,r}async function B(n,e,t,r){return o(await l("generalize",[c(n),n,e,t,r]))}async function G(n,e,t){return o(await l("densify",[c(n),n,e,t]))}async function W(n,e,t,r=0){return o(await l("geodesicDensify",[c(n),n,e,t,r]))}function F(n,e){return l("planarArea",[c(n),n,e])}function K(n,e){return l("planarLength",[c(n),n,e])}function M(n,e,t){return l("geodesicArea",[c(n),n,e,t])}function Q(n,e,t){return l("geodesicLength",[c(n),n,e,t])}async function U(n,e){return o(await l("intersectLinesToPoints",[c(n),n,e]))}async function X(n,e){await p("changeDefaultSpatialReferenceTolerance",[n,e])}async function Y(n){await p("clearDefaultSpatialReferenceTolerance",[n])}class $ extends Error{constructor(){super("Illegal Argument Exception")}}}}]);