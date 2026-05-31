var DateRangePickerWc=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=globalThis,n=t.ShadowRoot&&(t.ShadyCSS===void 0||t.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap,a=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(n&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=i.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}},o=e=>new a(typeof e==`string`?e:e+``,void 0,r),s=(e,...t)=>new a(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,r),c=(e,r)=>{if(n)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of r){let r=document.createElement(`style`),i=t.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=n.cssText,e.appendChild(r)}},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return o(t)})(e):e,{is:u,defineProperty:d,getOwnPropertyDescriptor:f,getOwnPropertyNames:p,getOwnPropertySymbols:ee,getPrototypeOf:te}=Object,m=globalThis,h=m.trustedTypes,g=h?h.emptyScript:``,ne=m.reactiveElementPolyfillSupport,_=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},y=(e,t)=>!u(e,t),re={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol(`metadata`),m.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=f(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??re}static _$Ei(){if(this.hasOwnProperty(_(`elementProperties`)))return;let e=te(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_(`properties`))){let e=this.properties,t=[...p(e),...ee(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(l(e))}else e!==void 0&&t.push(l(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?v:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?v:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??y)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:`open`},b[_(`elementProperties`)]=new Map,b[_(`finalized`)]=new Map,ne?.({ReactiveElement:b}),(m.reactiveElementVersions??=[]).push(`2.1.2`);var x=globalThis,ie=e=>e,S=x.trustedTypes,ae=S?S.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,C=`$lit$`,w=`lit$${Math.random().toFixed(9).slice(2)}$`,T=`?`+w,oe=`<${T}>`,E=document,D=()=>E.createComment(``),O=e=>e===null||typeof e!=`object`&&typeof e!=`function`,k=Array.isArray,se=e=>k(e)||typeof e?.[Symbol.iterator]==`function`,A=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,le=/>/g,M=RegExp(`>|${A}(?:([^\\s"'>=/]+)(${A}*=${A}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ue=/'/g,de=/"/g,fe=/^(?:script|style|textarea|title)$/i,N=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),P=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),pe=new WeakMap,I=E.createTreeWalker(E,129);function me(e,t){if(!k(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ae===void 0?t:ae.createHTML(t)}var he=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=j;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===j?c[1]===`!--`?o=ce:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=M):(fe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=M):o=le:o===M?c[0]===`>`?(o=i??j,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?M:c[3]===`"`?de:ue):o===de||o===ue?o=M:o===ce||o===le?o=j:(o=M,i=void 0);let d=o===M&&e[t+1].startsWith(`/>`)?` `:``;a+=o===j?n+oe:l>=0?(r.push(s),n.slice(0,l)+C+n.slice(l)+w+d):n+w+(l===-2?t:d)}return[me(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},L=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=he(t,n);if(this.el=e.createElement(l,r),I.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=I.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(C)){let t=u[o++],n=i.getAttribute(e).split(w),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ge:r[1]===`?`?_e:r[1]===`@`?ve:V}),i.removeAttribute(e)}else e.startsWith(w)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(fe.test(i.tagName)){let e=i.textContent.split(w),t=e.length-1;if(t>0){i.textContent=S?S.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],D()),I.nextNode(),c.push({type:2,index:++a});i.append(e[t],D())}}}else if(i.nodeType===8)if(i.data===T)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(w,e+1))!==-1;)c.push({type:7,index:a}),e+=w.length-1}a++}}static createElement(e,t){let n=E.createElement(`template`);return n.innerHTML=e,n}};function R(e,t,n=e,r){if(t===P)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=O(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=R(e,i._$AS(e,t.values),i,r)),t}var z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??E).importNode(t,!0);I.currentNode=r;let i=I.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new B(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ye(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=I.nextNode(),a++)}return I.currentNode=E,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},B=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),O(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==P&&this._(e):e._$litType$===void 0?e.nodeType===void 0?se(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=L.createElement(me(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new z(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=pe.get(e.strings);return t===void 0&&pe.set(e.strings,t=new L(e)),t}k(t){k(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(D()),this.O(D()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ie(e).nextSibling;ie(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=R(this,e,t,0),a=!O(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=R(this,r[n+o],t,o),s===P&&(s=this._$AH[o]),a||=!O(s)||s!==this._$AH[o],s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ge=class extends V{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},_e=class extends V{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},ve=class extends V{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??F)===P)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ye=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}},be={M:C,P:w,A:T,C:1,L:he,R:z,D:se,V:R,I:B,H:V,N:_e,U:ve,B:ge,F:ye},xe=x.litHtmlPolyfillSupport;xe?.(L,B),(x.litHtmlVersions??=[]).push(`3.3.3`);var Se=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new B(t.insertBefore(D(),e),e,void 0,n??{})}return i._$AI(e),i},H=globalThis,U=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};U._$litElement$=!0,U.finalized=!0,H.litElementHydrateSupport?.({LitElement:U});var Ce=H.litElementPolyfillSupport;Ce?.({LitElement:U}),(H.litElementVersions??=[]).push(`4.2.2`);var we=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Te={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},Ee=(e=Te,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function W(e){return(t,n)=>typeof n==`object`?Ee(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function De(e){return W({...e,state:!0,attribute:!1})}var Oe=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function G(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return Oe(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return Oe(n,r,{get(){return a(this)}})}}var ke={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ae=e=>(...t)=>({_$litDirective$:e,values:t}),je=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Me=Ae(class extends je{constructor(e){if(super(e),e.type!==ke.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return P}}),{I:Ne}=be,Pe=e=>e.strings===void 0,K=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),K(e,t);return!0},q=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Fe=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Re(t)}};function Ie(e){this._$AN===void 0?this._$AM=e:(q(this),this._$AM=e,Fe(this))}function Le(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let e=n;e<r.length;e++)K(r[e],!1),q(r[e]);else r!=null&&(K(r,!1),q(r));else K(this,e)}var Re=e=>{e.type==ke.CHILD&&(e._$AP??=Le,e._$AQ??=Ie)},ze=class extends je{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Fe(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(K(this,e),q(this))}setValue(e){if(Pe(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Be=()=>new Ve,Ve=class{},J=new WeakMap,He=Ae(class extends ze{render(e){return F}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),F}rt(e){if(this.G!==void 0)if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=J.get(t);n===void 0&&(n=new WeakMap,J.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?J.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Ue={0:`January`,1:`February`,2:`March`,3:`April`,4:`May`,5:`June`,6:`July`,7:`August`,8:`September`,9:`October`,10:`November`,11:`December`},Y={d:{MONDAY:`M`,TUESDAY:`T`,WEDNESDAY:`W`,THURSDAY:`T`,FRIDAY:`F`,SATURDAY:`S`,SUNDAY:`S`},ddd:{MONDAY:`Mon`,TUESDAY:`Tue`,WEDNESDAY:`Wed`,THURSDAY:`Thu`,FRIDAY:`Fri`,SATURDAY:`Sat`,SUNDAY:`Sun`}},We=s`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, serif;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: max-content;
    border: 1px solid black;
    border-radius: 0.25rem;
    padding-inline: 8px;
    margin-left: 5rem;
  }

  .date-input-field {
    border: none;
    outline: none;
    min-width: 15rem;
    font-size: 0.875rem;
  }

  .calendar-icon-button {
    all: unset;
    display: flex;
    padding: 6px;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .calendar-icon-button:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .calendar-popover {
    border-radius: 0.5rem;
    width: max-content;
    box-shadow:
      0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border: none;
    padding: 8px;
    overflow: hidden;
  }
  .calendar-popover:popover-open {
    display: flex;
  }

  #calendar-popover {
    margin: 0;
    inset: auto;
    top: calc(anchor(bottom) + 0.5rem);
    justify-self: anchor-center;
    position-try-fallbacks: flip-block, flip-inline;
    opacity: 0;
    transition: all 0.2s allow-discrete;
  }
  #calendar-popover:popover-open {
    opacity: 1;
  }

  @starting-style {
    #calendar-popover:popover-open {
      opacity: 0;
    }
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .year-button {
    all: unset;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .year-button:focus {
    border: 1px solid black;
  }

  #year-selector-container {
    top: anchor(bottom);
    left: anchor(left);
    border: 1px solid silver;
    padding: 8px 0px;
  }

  .years-container {
    display: flex;
    flex-direction: column;
    max-height: 20rem;
    overflow-y: auto;
    gap: 0.25rem;
  }

  .year-option {
    all: unset;
    padding: 8px;
    cursor: pointer;
    transition: all 0.1s ease;
    border: 1px solid transparent;
  }
  .year-option:focus {
    border: 1px solid black;
  }
  .year-option:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
  .year-option--selected {
    background-color: rgba(0, 0, 0, 0.15);
  }

  .calendar-month-change-icon-container {
    all: unset;
    border: 1px solid transparent;
    border-radius: 100%;
    height: 2.5rem;
    width: 2.5rem;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .calendar-month-change-icon-container:focus {
    border: 1px solid black;
  }
  .calendar-month-change-icon-container:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .calendar-grid-wrapper {
    max-width: 21.875rem;
    height: 19.375rem;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 0.25rem;
    /* animation: slide-in 0.15s linear; */
  }

  #calendar-grid-days-container {
  }

  .calendar-grid-cell {
    height: 2.5rem;
    width: 2.5rem;
    font-size: 0.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    transition: all 0.15s ease;
  }
  .calendar-grid-cell:focus {
    border: 1px solid black;
  }
  .calendar-grid-cell:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .calendar-grid-cell--empty,
  .calendar-grid-cell--column-cell {
    pointer-events: none;
  }
  .calendar-grid-cell--column-cell {
    font-weight: 700;
  }
  .calendar-grid-cell--current-day {
    border: 1px solid black;
    border-radius: 100%;
  }
  .calendar-grid-cell--selected {
    background-color: grey;
    color: white;
  }
  .calendar-grid-cell--selected:hover {
    background-color: grey;
  }
  .calendar-date-cell--highlighted {
    position: relative;
    /* background-color: rgba(0, 0, 0, 0.15); */
  }
  .calendar-date-cell--highlighted::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.15);
    height: 100%;
    width: 100%;
  }
  .calendar-date-cell--highlighted-row-cell-first::before {
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
  }
  .calendar-date-cell--highlighted-row-cell-last::before {
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }

  .clear-button-container {
    padding: 8px;
    display: flex;
  }

  .clear-selections-button {
    all: unset;
    color: black;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.875rem;
  }
  .clear-selections-button:focus {
    border: 1px solid black;
  }
  .clear-selections-button:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  @keyframes slide-left {
    0% {
      transform: translateX(0%);
    }

    49% {
      transform: translateX(-100%);
    }

    50% {
      opacity: 0;
      transform: translateX(100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes slide-right {
    0% {
      transform: translateX(0%);
    }

    49% {
      transform: translateX(100%);
    }

    50% {
      opacity: 0;
      transform: translateX(-100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`,X={START_DATE:`start-date`,END_DATE:`end-date`,LABEL_FORMAT_FOR_DAYS:`label-format-for-days`,RANGE_PREVIEW_BORDER_COLOR:`range-preview-border-color`,HIDE_CLEAR_BUTTON:`hide-clear-button`};function Z(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Ge=`YYYY/MM/DD - YYYY/MM/DD`,Q=[{start:0,end:4,length:4,placeholder:`YYYY`},{start:5,end:7,length:2,placeholder:`MM`},{start:8,end:10,length:2,placeholder:`DD`},{start:13,end:17,length:4,placeholder:`YYYY`},{start:18,end:20,length:2,placeholder:`MM`},{start:21,end:23,length:2,placeholder:`DD`}],$=class extends U{constructor(...e){super(...e),this.calendarPopoverRef=Be(),this._segmentDigits=[``,``,``,``,``,``],this._activeSegmentIdx=-1,this._activeSegmentTypedCount=0,this.startDate=void 0,this.endDate=void 0,this.labelFormatForDays=`ddd`,this.rangePreviewBorderColor=`black`,this.hideClearButton=!1,this._currentSelectedDate=this.startDate||new Date().toISOString(),this._mouseOveredDate=void 0}static{this.styles=[We]}_emitCustomEvent({name:e,detail:t}){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}get _currentSelectedDateDetails(){let e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),i=new Date(this._currentSelectedDate),a=i.getFullYear(),o=i.getMonth();return{currentYear:t,currentMonthIndex:n,currentDayNumber:r,currentSelectedYear:a,currentSelectedMonthIndex:o,currentSelectedMonthName:Ue[o],startDayOfMonth:new Date(i.setDate(1)).getDay(),totalDaysInSelectedDate:new Date(a,o+1,0).getDate()}}_moveToNextMonth(){let e=new Date(this._currentSelectedDateDetails.currentSelectedYear,this._currentSelectedDateDetails.currentSelectedMonthIndex+1);this._currentSelectedDate=e.toISOString();let t=this._calendarGridDaysContainerElem;t&&(t.style.animation=`slide-left 0.15s ease-out`,t.addEventListener(`animationend`,()=>{t.style.animation=``},{once:!0}))}_moveToPreviousMonth(){let e=new Date(this._currentSelectedDateDetails.currentSelectedYear,this._currentSelectedDateDetails.currentSelectedMonthIndex-1);this._currentSelectedDate=e.toISOString();let t=this._calendarGridDaysContainerElem;t&&(t.style.animation=`slide-right 0.15s ease-out`,t.addEventListener(`animationend`,()=>{t.style.animation=``},{once:!0}))}_buildInputValue(){let e=(e,t,n)=>e.length?e.padStart(t,`0`):n,[t,n,r,i,a,o]=this._segmentDigits;return`${e(t,4,`YYYY`)}/${e(n,2,`MM`)}/${e(r,2,`DD`)} - ${e(i,4,`YYYY`)}/${e(a,2,`MM`)}/${e(o,2,`DD`)}`}_getSegmentIndex(e){for(let t=0;t<Q.length;t++){let n=Q[t];if(e>=n.start&&e<n.end)return t}for(let t=0;t<Q.length;t++)if(e<Q[t].start)return t;return Q.length-1}_getFirstIncompleteSegmentIndex(){for(let e=0;e<Q.length;e++)if(this._segmentDigits[e].length<Q[e].length)return e;return 0}_setSelection(e,t){let n=Q[t];requestAnimationFrame(()=>{e.setSelectionRange(n.start,n.end)})}_activateSegment(e,t){this._activeSegmentTypedCount=0,this._activeSegmentIdx=t,this._setSelection(e,t)}_parseDateFromSegments(e,t,n){if(e.length!==4||t.length===0||n.length===0)return null;let r=parseInt(e,10),i=parseInt(t,10),a=parseInt(n,10);return r<1e3||r>9999||i<1||i>12||a<1||a>new Date(r,i,0).getDate()?null:new Date(r,i-1,a)}_handleInputFocus(e){let t=e.target;t.value||=this._buildInputValue(),this._activateSegment(t,this._getFirstIncompleteSegmentIndex())}_handleInputBlur(e){let t=e.target,[n,r,i,a,o,s]=this._segmentDigits,c=this._parseDateFromSegments(n,r,i),l=this._parseDateFromSegments(a,o,s);c&&l&&l<=c&&(l=new Date(c),l.setDate(l.getDate()+1),this._segmentDigits[3]=String(l.getFullYear()),this._segmentDigits[4]=String(l.getMonth()+1).padStart(2,`0`),this._segmentDigits[5]=String(l.getDate()).padStart(2,`0`)),c||(this._segmentDigits[0]=``,this._segmentDigits[1]=``,this._segmentDigits[2]=``),l||(this._segmentDigits[3]=``,this._segmentDigits[4]=``,this._segmentDigits[5]=``),t.value=this._segmentDigits.some(e=>e.length>0)?this._buildInputValue():``,this.startDate=c?c.toISOString():void 0,this.endDate=l?l.toISOString():void 0}_handleInputClick(e){let t=e.target;if(!t.value)return;let n=t.selectionStart??0;this._activateSegment(t,this._getSegmentIndex(n))}_handleInputKeydown(e){if(e.key===`Tab`)return;let t=e.target,n=t.selectionStart??0,r=this._getSegmentIndex(n);if(/^[0-9]$/.test(e.key)){e.preventDefault();let n=Q[r];this._activeSegmentTypedCount===0?this._segmentDigits[r]=e.key:this._segmentDigits[r]=(this._segmentDigits[r]+e.key).slice(-n.length),this._activeSegmentTypedCount++,t.value=this._buildInputValue(),this._activeSegmentTypedCount>=n.length&&r<Q.length-1?this._activateSegment(t,r+1):this._setSelection(t,r)}else e.key===`Backspace`?(e.preventDefault(),this._activeSegmentTypedCount>0?(this._segmentDigits[r]=this._segmentDigits[r].slice(0,-1),this._activeSegmentTypedCount--,t.value=this._buildInputValue(),this._setSelection(t,r)):r>0?this._activateSegment(t,r-1):this._setSelection(t,r)):e.key===`ArrowLeft`?(e.preventDefault(),this._activateSegment(t,Math.max(0,r-1))):e.key===`ArrowRight`?(e.preventDefault(),this._activateSegment(t,Math.min(Q.length-1,r+1))):e.preventDefault()}willUpdate(e){super.willUpdate(e),e.has(`labelFormatForDays`)&&(Object.keys(Y).includes(this.labelFormatForDays)||(this.labelFormatForDays=`ddd`))}updated(e){super.updated(e);let t=e.has(`startDate`),n=e.has(`endDate`);if(!t&&!n)return;if(t)if(this.startDate){let e=new Date(this.startDate);this._segmentDigits[0]=String(e.getFullYear()),this._segmentDigits[1]=String(e.getMonth()+1).padStart(2,`0`),this._segmentDigits[2]=String(e.getDate()).padStart(2,`0`),this._currentSelectedDate=this.startDate}else this._segmentDigits[0]=``,this._segmentDigits[1]=``,this._segmentDigits[2]=``;if(n)if(this.endDate){let e=new Date(this.endDate);this._segmentDigits[3]=String(e.getFullYear()),this._segmentDigits[4]=String(e.getMonth()+1).padStart(2,`0`),this._segmentDigits[5]=String(e.getDate()).padStart(2,`0`)}else this._segmentDigits[3]=``,this._segmentDigits[4]=``,this._segmentDigits[5]=``;if(!this._dateInputFieldElem)return;let r=this._segmentDigits.some(e=>e.length>0);this._dateInputFieldElem.value=r?this._buildInputValue():``}_renderCurrentMonthGrid(){let{currentDayNumber:e,startDayOfMonth:t,totalDaysInSelectedDate:n}=this._currentSelectedDateDetails;return N`
      <div class="calendar-grid-wrapper">
        <div class="calendar-grid">
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].MONDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].TUESDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].WEDNESDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].THURSDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].FRIDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].SATURDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${Y[this.labelFormatForDays].SUNDAY}
          </div>
        </div>

        <div id="calendar-grid-days-container" class="calendar-grid">
          ${Array.from({length:t===0?6:t-1}).map(()=>N`
              <div class="calendar-grid-cell calendar-grid-cell--empty"></div>
            `)}
          ${Array.from({length:n}).map((t,n)=>{let r=n+1,i=new Date(this._currentSelectedDateDetails.currentSelectedYear,this._currentSelectedDateDetails.currentSelectedMonthIndex,r),a=this._mouseOveredDate?new Date(this._mouseOveredDate):null,o=this.startDate?new Date(this.startDate):null,s=this.endDate?new Date(this.endDate):null,c=e===r&&this._currentSelectedDateDetails.currentMonthIndex===this._currentSelectedDateDetails.currentSelectedMonthIndex&&this._currentSelectedDateDetails.currentSelectedYear===this._currentSelectedDateDetails.currentYear,l=(()=>{if(!this.startDate&&!this.endDate)return!1;let e=o,t=e?.getFullYear?.(),n=e?.getMonth?.(),i=e?.getDate?.(),a=s,c=a?.getFullYear?.(),l=a?.getMonth?.(),u=a?.getDate?.(),d=t===this._currentSelectedDateDetails.currentSelectedYear&&n===this._currentSelectedDateDetails.currentSelectedMonthIndex&&r===i,f=c===this._currentSelectedDateDetails.currentSelectedYear&&l===this._currentSelectedDateDetails.currentSelectedMonthIndex&&r===u;return d||f})(),u=i.getTime()===o?.getTime?.(),d=i.getTime()===s?.getTime?.(),f=i.getDay()===1,p=i.getDay()===0,ee=(()=>{if(o&&s){if(!a)return!1;if(a>s)return i.getTime()===s.getTime();if(a<o)return i.getTime()===a.getTime()}return o?i.getTime()===o.getTime():!1})(),te=(()=>{if(!a)return!1;if(o&&s){if(a>s)return i.getTime()===a.getTime();if(a<o)return i.getTime()===o.getTime()}return i.getTime()===a.getTime()})(),m=!o||!s?!1:i>=o&&i<=s,h=!a||!o?!1:o&&s?a>s?i>=s&&i<=a:a<o?i<=o&&i>=a:!1:o&&a>o?i>=o&&i<=a:!1,g=()=>{let e=new Date(this._currentSelectedDateDetails.currentSelectedYear,this._currentSelectedDateDetails.currentSelectedMonthIndex,r),t=e.toISOString();if(o&&s){if(m){this.startDate=t,this.endDate=void 0,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{startDate:t,endDate:null}});return}if(e<o){this.startDate=t,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{startDate:t,endDate:this.endDate}});return}if(e>s){this.endDate=t,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{endDate:t,startDate:this.startDate}});return}}if(!o){this.startDate=t,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{startDate:t,endDate:this.endDate}});return}if(e<o){this.startDate=t,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{startDate:t,endDate:this.endDate}});return}this.endDate=t,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{startDate:this.startDate,endDate:t}})};return N`
                <div
                  part=${`calendar-date-cell${l?` calendar-grid-cell--selected`:``}${m?` calendar-date-cell--highlighted`:``}`}
                  class=${Me({"calendar-grid-cell":!0,"calendar-grid-cell--current-day":c,"calendar-grid-cell--selected":l,"calendar-date-cell--highlighted":m,"calendar-date-cell--highlighted-row-cell-first":m&&(f||u),"calendar-date-cell--highlighted-row-cell-last":m&&(p||d),"calendar-date-cell--preview-range":h,"calendar-date-cell--preview-range-row-cell-first":h&&(f||ee),"calendar-date-cell--preview-range-row-cell-last":h&&(p||te)})}
                  @click=${g}
                  @mouseover=${()=>{this._mouseOveredDate=i.toISOString()}}
                  @mouseout=${()=>{this._mouseOveredDate=void 0}}
                  tabindex="0"
                  @keydown=${e=>{console.log({event:e}),[`Space`,`Enter`].includes(e?.code)&&g()}}
                >
                  ${r}
                </div>
              `})}
        </div>
      </div>
    `}_handleCalendarPopoverToggle(e){e?.newState===`closed`&&(this._currentSelectedDate=this.startDate||new Date().toISOString())}_onClearClick(){this.startDate=void 0,this.endDate=void 0,this._emitCustomEvent({name:`date-range-picker-wc:on-date-select`,detail:{startDate:this.startDate,endDate:this.endDate}})}render(){return N`
      <style>
        .calendar-date-cell--preview-range {
          position: relative;
        }
        .calendar-date-cell--preview-range::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-top: 1px dashed ${o(this.rangePreviewBorderColor)};
          border-bottom: 1px dashed ${o(this.rangePreviewBorderColor)};
        }
        .calendar-date-cell--preview-range-row-cell-first::before {
          border-left: 1px dashed ${o(this.rangePreviewBorderColor)};
          border-top-left-radius: 1.5rem;
          border-bottom-left-radius: 1.5rem;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        .calendar-date-cell--preview-range-row-cell-last::before {
          border-right: 1px dashed ${o(this.rangePreviewBorderColor)};
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }
      </style>

      <div>
        <div class="input-container" part="input-container">
          <slot name="input-field">
            <input
              type="text"
              inputmode="numeric"
              class="date-input-field"
              part="date-input-field"
              placeholder=${Ge}
              @focus=${this._handleInputFocus}
              @blur=${this._handleInputBlur}
              @click=${this._handleInputClick}
              @keydown=${this._handleInputKeydown}
            />
          </slot>

          <button class="calendar-icon-button" popovertarget="calendar-popover">
            <slot name="calendar-trigger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path
                  d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"
                />
              </svg>
            </slot>
          </button>
        </div>

        <div
          ${He(this.calendarPopoverRef)}
          id="calendar-popover"
          class="calendar-popover"
          popover
          @toggle=${this._handleCalendarPopoverToggle}
        >
          <slot name="left-sidebar"> </slot>

          <div>
            <div class="calendar-header" part="calendar-header">
              <slot
                name="step-to-previous-month-button"
                @click=${this._moveToPreviousMonth}
              >
                <button class="calendar-month-change-icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path
                      d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"
                    />
                  </svg>
                </button>
              </slot>

              <div style="display:flex; align-items:center;gap:0.5rem;">
                <p>
                  ${this._currentSelectedDateDetails.currentSelectedMonthName}
                </p>

                <button
                  class="year-button"
                  popovertarget="year-selector-container"
                  @click=${()=>{setTimeout(()=>{let e=this.shadowRoot?.querySelector(`.years-container`),t=e?.querySelector(`.year-option--${this._currentSelectedDateDetails.currentSelectedYear}`);e&&(e.scrollTop=t?.offsetTop?t?.offsetTop-50:0)},0)}}
                >
                  ${this._currentSelectedDateDetails.currentSelectedYear}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path
                      d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                    />
                  </svg>
                </button>

                <div id="year-selector-container" popover>
                  <div class="years-container">
                    ${Array.from({length:1199}).map((e,t)=>{let n=1800+t;return N`
                          <button
                            class=${`year-option year-option--${n}${String(n)===String(this._currentSelectedDateDetails.currentSelectedYear)?` year-option--selected`:``}`}
                            @click=${()=>{let e=new Date(n,this._currentSelectedDateDetails.currentSelectedMonthIndex,this._currentSelectedDateDetails.currentDayNumber);this._currentSelectedDate=e.toISOString(),this._yearSelectorContainerPopoverElem&&this._yearSelectorContainerPopoverElem.hidePopover()}}
                          >
                            ${n}
                          </button>
                        `})}
                  </div>
                </div>
              </div>

              <slot
                name="step-to-next-month-button"
                @click=${this._moveToNextMonth}
              >
                <button class="calendar-month-change-icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path
                      d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
                    />
                  </svg>
                </button>
              </slot>
            </div>

            <div class="calendar-main">${this._renderCurrentMonthGrid()}</div>

            ${this.hideClearButton?F:N`
                  <div class="clear-button-container">
                    <button
                      class="clear-selections-button"
                      ?disabled=${!this.startDate&&!this.endDate}
                      @click=${this._onClearClick}
                    >
                      Clear
                    </button>
                  </div>
                `}

            <slot name="calendar-footer"></slot>
          </div>

          <slot name="right-sidebar"> </slot>
        </div>
      </div>
    `}};return Z([W({type:String,attribute:X.START_DATE})],$.prototype,`startDate`,void 0),Z([W({type:String,attribute:X.END_DATE})],$.prototype,`endDate`,void 0),Z([W({type:String,attribute:X.LABEL_FORMAT_FOR_DAYS})],$.prototype,`labelFormatForDays`,void 0),Z([W({type:String,attribute:X.RANGE_PREVIEW_BORDER_COLOR})],$.prototype,`rangePreviewBorderColor`,void 0),Z([W({type:Boolean,attribute:X.HIDE_CLEAR_BUTTON})],$.prototype,`hideClearButton`,void 0),Z([De()],$.prototype,`_currentSelectedDate`,void 0),Z([De()],$.prototype,`_mouseOveredDate`,void 0),Z([G(`.date-input-field`)],$.prototype,`_dateInputFieldElem`,void 0),Z([G(`#calendar-grid-days-container`)],$.prototype,`_calendarGridDaysContainerElem`,void 0),Z([G(`#year-selector-container`)],$.prototype,`_yearSelectorContainerPopoverElem`,void 0),$=Z([we(`date-range-picker-wc`)],$),Object.defineProperty(e,"DateRangePickerWc",{enumerable:!0,get:function(){return $}}),e})({});