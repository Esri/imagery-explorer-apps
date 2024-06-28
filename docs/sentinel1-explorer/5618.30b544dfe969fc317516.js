/*! For license information please see 5618.30b544dfe969fc317516.js.LICENSE.txt */
"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[5618],{85618:function(e,t,n){n.r(t),n.d(t,{CalciteLabel:function(){return s},defineCustomElement:function(){return r}});var i=n(77210),l=n(81629);const a="container",o=(0,i.GH)(class extends i.mv{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteInternalLabelClick=(0,i.yM)(this,"calciteInternalLabelClick",2),this.labelClickHandler=e=>{this.calciteInternalLabelClick.emit({sourceEvent:e})},this.alignment="start",this.for=void 0,this.scale="m",this.layout="default"}handleForChange(){(0,l.a)(this.el)}connectedCallback(){document.dispatchEvent(new CustomEvent(l.l))}disconnectedCallback(){document.dispatchEvent(new CustomEvent(l.b))}render(){return(0,i.h)(i.AA,{onClick:this.labelClickHandler},(0,i.h)("div",{class:a},(0,i.h)("slot",null)))}get el(){return this}static get watchers(){return{for:["handleForChange"]}}static get style(){return":host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.5rem)}:host([scale=m]) .container{gap:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.75rem)}:host([scale=l]) .container{gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1)}:host([layout=default]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:0.5rem}:host([layout=inline][scale=l]) .container{gap:0.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([disabled])>.container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--tw-bg-opacity:1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--tw-bg-opacity:0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}"}},[1,"calcite-label",{alignment:[513],for:[513],scale:[513],layout:[513]},void 0,{for:["handleForChange"]}]);function c(){if("undefined"==typeof customElements)return;["calcite-label"].forEach((e=>{if("calcite-label"===e)customElements.get(e)||customElements.define(e,o)}))}c();const s=o,r=c},90326:function(e,t,n){function i(e){return"l"===e?"m":"s"}async function l(e){await(function(e){return"function"==typeof e.componentOnReady}(e)?e.componentOnReady():new Promise((e=>requestAnimationFrame((()=>e())))))}n.d(t,{c:function(){return l},g:function(){return i}})},81629:function(e,t,n){n.d(t,{a:function(){return w},b:function(){return c},c:function(){return b},d:function(){return g},g:function(){return v},l:function(){return o}});var i=n(79145),l=n(90326);const a="calciteInternalLabelClick",o="calciteInternalLabelConnected",c="calciteInternalLabelDisconnected",s="calcite-label",r=new WeakMap,d=new WeakMap,u=new WeakMap,h=new WeakMap,m=new Set,f=e=>{const{id:t}=e,n=t&&(0,i.q)(e,{selector:`${s}[for="${t}"]`});if(n)return n;const l=(0,i.c)(e,s);return!l||function(e,t){let n;const i="custom-element-ancestor-check",l=i=>{i.stopImmediatePropagation();const l=i.composedPath();n=l.slice(l.indexOf(t),l.indexOf(e))};e.addEventListener(i,l,{once:!0}),t.dispatchEvent(new CustomEvent(i,{composed:!0,bubbles:!0})),e.removeEventListener(i,l);const a=n.filter((n=>n!==t&&n!==e)).filter((e=>e.tagName?.includes("-")));return a.length>0}(l,e)?null:l};function b(e){if(!e)return;const t=f(e.el);if(d.has(t)&&t===e.labelEl||!t&&m.has(e))return;const n=k.bind(e);if(t){e.labelEl=t;const i=r.get(t)||[];i.push(e),r.set(t,i.sort(p)),d.has(e.labelEl)||(d.set(e.labelEl,E),e.labelEl.addEventListener(a,E)),m.delete(e),document.removeEventListener(o,u.get(e)),h.set(e,n),document.addEventListener(c,n)}else m.has(e)||(n(),document.removeEventListener(c,h.get(e)))}function g(e){if(!e)return;if(m.delete(e),document.removeEventListener(o,u.get(e)),document.removeEventListener(c,h.get(e)),u.delete(e),h.delete(e),!e.labelEl)return;const t=r.get(e.labelEl);1===t.length&&(e.labelEl.removeEventListener(a,d.get(e.labelEl)),d.delete(e.labelEl)),r.set(e.labelEl,t.filter((t=>t!==e)).sort(p)),e.labelEl=null}function p(e,t){return(0,i.u)(e.el,t.el)?-1:1}function v(e){return e.label||e.labelEl?.textContent?.trim()||""}function E(e){const t=e.detail.sourceEvent.target,n=r.get(this),i=n.find((e=>e.el===t));if(n.includes(i))return;const l=n[0];l.disabled||l.onLabelClick(e)}function y(){m.has(this)&&b(this)}function k(){m.add(this);const e=u.get(this)||y.bind(this);u.set(this,e),document.addEventListener(o,e)}async function w(e){await(0,l.c)(e);if(r.has(e))return;const t=e.ownerDocument?.getElementById(e.for);t&&requestAnimationFrame((()=>{for(const e of m)if(e.el===t){b(e);break}}))}}}]);