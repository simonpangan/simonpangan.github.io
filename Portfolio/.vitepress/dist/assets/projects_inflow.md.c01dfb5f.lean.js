import{A as E,a2 as L,n as P,v as h,b as d,F as l,p as v,s as D,_ as k,y as g,e as A,f as C,R as I,L as z}from"./chunks/framework.0c0bf760.js";/*!
  * PhotoSwipe Lightbox 5.3.8 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */function p(s,e,t){const i=document.createElement(e);return s&&(i.className=s),t&&t.appendChild(i),i}function x(s,e,t){let i=`translate3d(${s}px,${e||0}px,0)`;return t!==void 0&&(i+=` scale3d(${t},${t},1)`),i}function y(s,e,t){s.style.width=typeof e=="number"?`${e}px`:e,s.style.height=typeof t=="number"?`${t}px`:t}const o={IDLE:"idle",LOADING:"loading",LOADED:"loaded",ERROR:"error"};function O(s){return"button"in s&&s.button===1||s.ctrlKey||s.metaKey||s.altKey||s.shiftKey}function f(s,e,t=document){let i=[];if(s instanceof Element)i=[s];else if(s instanceof NodeList||Array.isArray(s))i=Array.from(s);else{const n=typeof s=="string"?s:e;n&&(i=Array.from(t.querySelectorAll(n)))}return i}function R(s){return typeof s=="function"&&s.prototype&&s.prototype.goTo}function w(){return!!(navigator.vendor&&navigator.vendor.match(/apple/i))}class j{constructor(e,t){this.type=e,this.defaultPrevented=!1,t&&Object.assign(this,t)}preventDefault(){this.defaultPrevented=!0}}class F{constructor(){this._listeners={},this._filters={},this.pswp=void 0,this.options=void 0}addFilter(e,t,i=100){var n,a,r;this._filters[e]||(this._filters[e]=[]),(n=this._filters[e])==null||n.push({fn:t,priority:i}),(a=this._filters[e])==null||a.sort((c,m)=>c.priority-m.priority),(r=this.pswp)==null||r.addFilter(e,t,i)}removeFilter(e,t){this._filters[e]&&(this._filters[e]=this._filters[e].filter(i=>i.fn!==t)),this.pswp&&this.pswp.removeFilter(e,t)}applyFilters(e,...t){var i;return(i=this._filters[e])==null||i.forEach(n=>{t[0]=n.fn.apply(this,t)}),t[0]}on(e,t){var i,n;this._listeners[e]||(this._listeners[e]=[]),(i=this._listeners[e])==null||i.push(t),(n=this.pswp)==null||n.on(e,t)}off(e,t){var i;this._listeners[e]&&(this._listeners[e]=this._listeners[e].filter(n=>t!==n)),(i=this.pswp)==null||i.off(e,t)}dispatch(e,t){var n;if(this.pswp)return this.pswp.dispatch(e,t);const i=new j(e,t);return(n=this._listeners[e])==null||n.forEach(a=>{a.call(this,i)}),i}}class M{constructor(e,t){if(this.element=p("pswp__img pswp__img--placeholder",e?"img":"div",t),e){const i=this.element;i.decoding="async",i.alt="",i.src=e,i.setAttribute("role","presentation")}this.element.setAttribute("aria-hidden","true")}setDisplayedSize(e,t){this.element&&(this.element.tagName==="IMG"?(y(this.element,250,"auto"),this.element.style.transformOrigin="0 0",this.element.style.transform=x(0,0,e/250)):y(this.element,e,t))}destroy(){var e;(e=this.element)!=null&&e.parentNode&&this.element.remove(),this.element=null}}class T{constructor(e,t,i){this.instance=t,this.data=e,this.index=i,this.element=void 0,this.placeholder=void 0,this.slide=void 0,this.displayedImageWidth=0,this.displayedImageHeight=0,this.width=Number(this.data.w)||Number(this.data.width)||0,this.height=Number(this.data.h)||Number(this.data.height)||0,this.isAttached=!1,this.hasSlide=!1,this.isDecoding=!1,this.state=o.IDLE,this.data.type?this.type=this.data.type:this.data.src?this.type="image":this.type="html",this.instance.dispatch("contentInit",{content:this})}removePlaceholder(){this.placeholder&&!this.keepPlaceholder()&&setTimeout(()=>{this.placeholder&&(this.placeholder.destroy(),this.placeholder=void 0)},1e3)}load(e,t){if(this.slide&&this.usePlaceholder())if(this.placeholder){const i=this.placeholder.element;i&&!i.parentElement&&this.slide.container.prepend(i)}else{const i=this.instance.applyFilters("placeholderSrc",this.data.msrc&&this.slide.isFirstSlide?this.data.msrc:!1,this);this.placeholder=new M(i,this.slide.container)}this.element&&!t||this.instance.dispatch("contentLoad",{content:this,isLazy:e}).defaultPrevented||(this.isImageContent()?(this.element=p("pswp__img","img"),this.displayedImageWidth&&this.loadImage(e)):(this.element=p("pswp__content","div"),this.element.innerHTML=this.data.html||""),t&&this.slide&&this.slide.updateContentSize(!0))}loadImage(e){if(!this.isImageContent()||!this.element||this.instance.dispatch("contentLoadImage",{content:this,isLazy:e}).defaultPrevented)return;const t=this.element;this.updateSrcsetSizes(),this.data.srcset&&(t.srcset=this.data.srcset),t.src=this.data.src??"",t.alt=this.data.alt??"",this.state=o.LOADING,t.complete?this.onLoaded():(t.onload=()=>{this.onLoaded()},t.onerror=()=>{this.onError()})}setSlide(e){this.slide=e,this.hasSlide=!0,this.instance=e.pswp}onLoaded(){this.state=o.LOADED,this.slide&&this.element&&(this.instance.dispatch("loadComplete",{slide:this.slide,content:this}),this.slide.isActive&&this.slide.heavyAppended&&!this.element.parentNode&&(this.append(),this.slide.updateContentSize(!0)),(this.state===o.LOADED||this.state===o.ERROR)&&this.removePlaceholder())}onError(){this.state=o.ERROR,this.slide&&(this.displayError(),this.instance.dispatch("loadComplete",{slide:this.slide,isError:!0,content:this}),this.instance.dispatch("loadError",{slide:this.slide,content:this}))}isLoading(){return this.instance.applyFilters("isContentLoading",this.state===o.LOADING,this)}isError(){return this.state===o.ERROR}isImageContent(){return this.type==="image"}setDisplayedSize(e,t){if(this.element&&(this.placeholder&&this.placeholder.setDisplayedSize(e,t),!this.instance.dispatch("contentResize",{content:this,width:e,height:t}).defaultPrevented&&(y(this.element,e,t),this.isImageContent()&&!this.isError()))){const i=!this.displayedImageWidth&&e;this.displayedImageWidth=e,this.displayedImageHeight=t,i?this.loadImage(!1):this.updateSrcsetSizes(),this.slide&&this.instance.dispatch("imageSizeChange",{slide:this.slide,width:e,height:t,content:this})}}isZoomable(){return this.instance.applyFilters("isContentZoomable",this.isImageContent()&&this.state!==o.ERROR,this)}updateSrcsetSizes(){if(!this.isImageContent()||!this.element||!this.data.srcset)return;const e=this.element,t=this.instance.applyFilters("srcsetSizesWidth",this.displayedImageWidth,this);(!e.dataset.largestUsedSize||t>parseInt(e.dataset.largestUsedSize,10))&&(e.sizes=t+"px",e.dataset.largestUsedSize=String(t))}usePlaceholder(){return this.instance.applyFilters("useContentPlaceholder",this.isImageContent(),this)}lazyLoad(){this.instance.dispatch("contentLazyLoad",{content:this}).defaultPrevented||this.load(!0)}keepPlaceholder(){return this.instance.applyFilters("isKeepingPlaceholder",this.isLoading(),this)}destroy(){this.hasSlide=!1,this.slide=void 0,!this.instance.dispatch("contentDestroy",{content:this}).defaultPrevented&&(this.remove(),this.placeholder&&(this.placeholder.destroy(),this.placeholder=void 0),this.isImageContent()&&this.element&&(this.element.onload=null,this.element.onerror=null,this.element=void 0))}displayError(){var e;if(this.slide){let t=p("pswp__error-msg","div");t.innerText=((e=this.instance.options)==null?void 0:e.errorMsg)??"",t=this.instance.applyFilters("contentErrorElement",t,this),this.element=p("pswp__content pswp__error-msg-container","div"),this.element.appendChild(t),this.slide.container.innerText="",this.slide.container.appendChild(this.element),this.slide.updateContentSize(!0),this.removePlaceholder()}}append(){if(this.isAttached||!this.element)return;if(this.isAttached=!0,this.state===o.ERROR){this.displayError();return}if(this.instance.dispatch("contentAppend",{content:this}).defaultPrevented)return;const e="decode"in this.element;this.isImageContent()?e&&this.slide&&(!this.slide.isActive||w())?(this.isDecoding=!0,this.element.decode().catch(()=>{}).finally(()=>{this.isDecoding=!1,this.appendImage()})):this.appendImage():this.slide&&!this.element.parentNode&&this.slide.container.appendChild(this.element)}activate(){this.instance.dispatch("contentActivate",{content:this}).defaultPrevented||!this.slide||(this.isImageContent()&&this.isDecoding&&!w()?this.appendImage():this.isError()&&this.load(!1,!0),this.slide.holderElement&&this.slide.holderElement.setAttribute("aria-hidden","false"))}deactivate(){this.instance.dispatch("contentDeactivate",{content:this}),this.slide&&this.slide.holderElement&&this.slide.holderElement.setAttribute("aria-hidden","true")}remove(){this.isAttached=!1,!this.instance.dispatch("contentRemove",{content:this}).defaultPrevented&&(this.element&&this.element.parentNode&&this.element.remove(),this.placeholder&&this.placeholder.element&&this.placeholder.element.remove())}appendImage(){this.isAttached&&(this.instance.dispatch("contentAppendImage",{content:this}).defaultPrevented||(this.slide&&this.element&&!this.element.parentNode&&this.slide.container.appendChild(this.element),(this.state===o.LOADED||this.state===o.ERROR)&&this.removePlaceholder()))}}function N(s,e){if(s.getViewportSizeFn){const t=s.getViewportSizeFn(s,e);if(t)return t}return{x:document.documentElement.clientWidth,y:window.innerHeight}}function u(s,e,t,i,n){let a=0;if(e.paddingFn)a=e.paddingFn(t,i,n)[s];else if(e.padding)a=e.padding[s];else{const r="padding"+s[0].toUpperCase()+s.slice(1);e[r]&&(a=e[r])}return Number(a)||0}function q(s,e,t,i){return{x:e.x-u("left",s,e,t,i)-u("right",s,e,t,i),y:e.y-u("top",s,e,t,i)-u("bottom",s,e,t,i)}}const _=4e3;class U{constructor(e,t,i,n){this.pswp=n,this.options=e,this.itemData=t,this.index=i,this.panAreaSize=null,this.elementSize=null,this.fit=1,this.fill=1,this.vFill=1,this.initial=1,this.secondary=1,this.max=1,this.min=1}update(e,t,i){const n={x:e,y:t};this.elementSize=n,this.panAreaSize=i;const a=i.x/n.x,r=i.y/n.y;this.fit=Math.min(1,a<r?a:r),this.fill=Math.min(1,a>r?a:r),this.vFill=Math.min(1,r),this.initial=this._getInitial(),this.secondary=this._getSecondary(),this.max=Math.max(this.initial,this.secondary,this._getMax()),this.min=Math.min(this.fit,this.initial,this.secondary),this.pswp&&this.pswp.dispatch("zoomLevelsUpdate",{zoomLevels:this,slideData:this.itemData})}_parseZoomLevelOption(e){const t=e+"ZoomLevel",i=this.options[t];if(i)return typeof i=="function"?i(this):i==="fill"?this.fill:i==="fit"?this.fit:Number(i)}_getSecondary(){let e=this._parseZoomLevelOption("secondary");return e||(e=Math.min(1,this.fit*3),this.elementSize&&e*this.elementSize.x>_&&(e=_/this.elementSize.x),e)}_getInitial(){return this._parseZoomLevelOption("initial")||this.fit}_getMax(){return this._parseZoomLevelOption("max")||Math.max(1,this.fit*4)}}function S(s,e,t){const i=e.createContentFromData(s,t);let n;const{options:a}=e;if(a){n=new U(a,s,-1);let r;e.pswp?r=e.pswp.viewportSize:r=N(a,e);const c=q(a,r,s,t);n.update(i.width,i.height,c)}return i.lazyLoad(),n&&i.setDisplayedSize(Math.ceil(i.width*n.initial),Math.ceil(i.height*n.initial)),i}function W(s,e){const t=e.getItemData(s);if(!e.dispatch("lazyLoadSlide",{index:s,itemData:t}).defaultPrevented)return S(t,e,s)}class H extends F{getNumItems(){var n;let e=0;const t=(n=this.options)==null?void 0:n.dataSource;t&&"length"in t?e=t.length:t&&"gallery"in t&&(t.items||(t.items=this._getGalleryDOMElements(t.gallery)),t.items&&(e=t.items.length));const i=this.dispatch("numItems",{dataSource:t,numItems:e});return this.applyFilters("numItems",i.numItems,t)}createContentFromData(e,t){return new T(e,this,t)}getItemData(e){var r;const t=(r=this.options)==null?void 0:r.dataSource;let i={};Array.isArray(t)?i=t[e]:t&&"gallery"in t&&(t.items||(t.items=this._getGalleryDOMElements(t.gallery)),i=t.items[e]);let n=i;n instanceof Element&&(n=this._domElementToItemData(n));const a=this.dispatch("itemData",{itemData:n||{},index:e});return this.applyFilters("itemData",a.itemData,e)}_getGalleryDOMElements(e){var t,i;return(t=this.options)!=null&&t.children||(i=this.options)!=null&&i.childSelector?f(this.options.children,this.options.childSelector,e)||[]:[e]}_domElementToItemData(e){const t={element:e},i=e.tagName==="A"?e:e.querySelector("a");if(i){t.src=i.dataset.pswpSrc||i.href,i.dataset.pswpSrcset&&(t.srcset=i.dataset.pswpSrcset),t.width=i.dataset.pswpWidth?parseInt(i.dataset.pswpWidth,10):0,t.height=i.dataset.pswpHeight?parseInt(i.dataset.pswpHeight,10):0,t.w=t.width,t.h=t.height,i.dataset.pswpType&&(t.type=i.dataset.pswpType);const n=e.querySelector("img");n&&(t.msrc=n.currentSrc||n.src,t.alt=n.getAttribute("alt")??""),(i.dataset.pswpCropped||i.dataset.cropped)&&(t.thumbCropped=!0)}return this.applyFilters("domItemData",t,e,i)}lazyLoadData(e,t){return S(e,this,t)}}class G extends H{constructor(e){super(),this.options=e||{},this._uid=0,this.shouldOpen=!1,this._preloadedContent=void 0,this.onThumbnailsClick=this.onThumbnailsClick.bind(this)}init(){f(this.options.gallery,this.options.gallerySelector).forEach(e=>{e.addEventListener("click",this.onThumbnailsClick,!1)})}onThumbnailsClick(e){if(O(e)||window.pswp)return;let t={x:e.clientX,y:e.clientY};!t.x&&!t.y&&(t=null);let i=this.getClickedIndex(e);i=this.applyFilters("clickedIndex",i,e,this);const n={gallery:e.currentTarget};i>=0&&(e.preventDefault(),this.loadAndOpen(i,n,t))}getClickedIndex(e){if(this.options.getClickedIndexFn)return this.options.getClickedIndexFn.call(this,e);const t=e.target,n=f(this.options.children,this.options.childSelector,e.currentTarget).findIndex(a=>a===t||a.contains(t));return n!==-1?n:this.options.children||this.options.childSelector?-1:0}loadAndOpen(e,t,i){return window.pswp?!1:(this.options.index=e,this.options.initialPointerPos=i,this.shouldOpen=!0,this.preload(e,t),!0)}preload(e,t){const{options:i}=this;t&&(i.dataSource=t);const n=[],a=typeof i.pswpModule;if(R(i.pswpModule))n.push(Promise.resolve(i.pswpModule));else{if(a==="string")throw new Error("pswpModule as string is no longer supported");if(a==="function")n.push(i.pswpModule());else throw new Error("pswpModule is not valid")}typeof i.openPromise=="function"&&n.push(i.openPromise()),i.preloadFirstSlide!==!1&&e>=0&&(this._preloadedContent=W(e,this));const r=++this._uid;Promise.all(n).then(c=>{if(this.shouldOpen){const m=c[0];this._openPhotoswipe(m,r)}})}_openPhotoswipe(e,t){if(t!==this._uid&&this.shouldOpen||(this.shouldOpen=!1,window.pswp))return;const i=typeof e=="object"?new e.default(this.options):new e(this.options);this.pswp=i,window.pswp=i,Object.keys(this._listeners).forEach(n=>{var a;(a=this._listeners[n])==null||a.forEach(r=>{i.on(n,r)})}),Object.keys(this._filters).forEach(n=>{var a;(a=this._filters[n])==null||a.forEach(r=>{i.addFilter(n,r.fn,r.priority)})}),this._preloadedContent&&(i.contentLoader.addToCache(this._preloadedContent),this._preloadedContent=void 0),i.on("destroy",()=>{this.pswp=void 0,delete window.pswp}),i.init()}destroy(){var e;(e=this.pswp)==null||e.destroy(),this.shouldOpen=!1,this._listeners={},f(this.options.gallery,this.options.gallerySelector).forEach(t=>{t.removeEventListener("click",this.onThumbnailsClick,!1)})}}const $=["id"],V={class:"image-container"},Z=["href","data-pswp-width","data-pswp-height"],B=["src","alt"],K=["href","data-pswp-width","data-pswp-height"],X=["src","alt"],J={__name:"PhotoSwipe",props:{galleryID:String,images:Array|Object},setup(s){const e=s;let t;return E(()=>{t=new G({gallery:"#"+e.galleryID,children:"a",pswpModule:()=>L(()=>import("./chunks/photoswipe.esm.5794cde2.js"),[])}),t.init()}),P(()=>{t&&(t.destroy(),t=null)}),(i,n)=>(h(),d("div",{id:s.galleryID},[l("div",V,[Array.isArray(s.images)?(h(!0),d(v,{key:0},D(s.images,(a,r)=>(h(),d("a",{key:r,href:a.largeURL,"data-pswp-width":a.width,"data-pswp-height":a.height,target:"_blank",rel:"noreferrer"},[l("img",{src:a.thumbnailURL,alt:a.alt},null,8,B)],8,Z))),128)):(h(),d("a",{key:1,href:s.images.largeURL,"data-pswp-width":s.images.width,"data-pswp-height":s.images.height,target:"_blank",rel:"noreferrer"},[l("img",{src:s.images.thumbnailURL,alt:s.images.alt},null,8,X)],8,K))])],8,$))}};const Q=s=>(A("data-v-54b29f5b"),s=s(),C(),s),Y=Q(()=>l("p",{class:"image-note"},"(Select the image to enable fullscreen mode)",-1)),ee={__name:"Inflow",props:{images:Array|Object},setup(s){return(e,t)=>(h(),d(v,null,[g(J,{galleryID:"my-test-gallery",images:s.images},null,8,["images"]),Y],64))}},b=k(ee,[["__scopeId","data-v-54b29f5b"]]),te=I('<h1 id="inflow" tabindex="-1">Inflow <a class="header-anchor" href="#inflow" aria-label="Permalink to &quot;Inflow&quot;">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>&quot;Inflow&quot; was created as the final academic project for the web development subject, utilizing the Laravel framework. The primary goal of this project is to enhance Benilde&#39;s student information system flowchart by providing more comprehensive information about each subject, going beyond the mere display of subject codes. The name &quot;Inflow&quot; is derived from &quot;information overflow,&quot; symbolizing the project&#39;s intent. The project is based on the following technologies :</p><ul><li><a href="https://laravel.com/" target="_blank" rel="noreferrer"><strong>Laravel</strong></a></li><li><a href="https://getbootstrap.com/" target="_blank" rel="noreferrer"><strong>Bootstrap</strong></a></li><li><a href="https://jquery.com/" target="_blank" rel="noreferrer"><strong>jQuery</strong></a></li></ul><h2 id="problem" tabindex="-1">Problem <a class="header-anchor" href="#problem" aria-label="Permalink to &quot;Problem&quot;">​</a></h2>',5),ie=l("p",null,"The picture above depicts the current flowchart of Benilde's student information system as of the writing. As a former student, I often found it challenging to decipher the meaning of subject codes. While some subjects are easily recognizable, others remain unclear. Additionally, there is an issue with not knowing whether a subject is a major or minor or what topics it covers for students interested in advanced study.",-1),se=l("p",null,"Furthermore, the system lacks clear information on when a student can retake a failed subject or when they can take a particular subject should they wish not to follow the provided flowchart. This lack of clarity can lead to confusion and delays in academic progress.",-1),ne=l("p",null,"Another glaring problem is the lack of timely updates, as evidenced by the top-left section still displaying the student as a freshman despite being in their junior year.",-1),ae=l("h2",{id:"solution",tabindex:"-1"},[z("Solution "),l("a",{class:"header-anchor",href:"#solution","aria-label":'Permalink to "Solution"'},"​")],-1),re=l("p",null,`To address these shortcomings, the academic project "Inflow" was developed. Its main objective is to enhance the student information system flowchart by providing comprehensive subject information that goes beyond mere codes, symbolizing its intent to tackle the issue of "information overflow." With "Inflow," students can access detailed subject descriptions, determine their major or minor status, and explore potential topics for advanced study. Moreover, the system offers clear information on subject retakes and helps students make informed decisions about their academic path. Through these improvements, "Inflow" aims to streamline and optimize the student's academic journey at Benilde.`,-1),oe=I('<h2 id="contributions" tabindex="-1">Contributions <a class="header-anchor" href="#contributions" aria-label="Permalink to &quot;Contributions&quot;">​</a></h2><ul><li><strong>Lead Backend Developer</strong> : Lead the backend development, ensuring a robust and efficient system.</li><li><strong>Team Coordination</strong> : Managed the team&#39;s collaboration by assigning tasks and overseeing progress to achieve project milestones.</li><li><strong>Module Integration</strong>: Seamlessly merged my backend work with my groupmates&#39; frontend work, creating a cohesive and functional system.</li></ul><h2 id="github-repository" tabindex="-1">GitHub Repository <a class="header-anchor" href="#github-repository" aria-label="Permalink to &quot;GitHub Repository&quot;">​</a></h2><p><a href="https://github.com/simonpangan/BenildeProjects/tree/master/inflow-project" target="_blank" rel="noreferrer">View on GitHub</a></p>',4),de=JSON.parse('{"title":"Inflow","description":"","frontmatter":{"theme":"page"},"headers":[],"relativePath":"projects/inflow.md","filePath":"projects/inflow.md"}'),le={name:"projects/inflow.md"},ce=Object.assign(le,{setup(s){return(e,t)=>(h(),d("div",null,[te,g(b,{images:{largeURL:"../assets/img/flowchart.png",thumbnailURL:"../assets/img/flowchart.png",width:3e3,height:2e3,alt:"Inflow"}},null,8,["images"]),ie,se,ne,ae,re,g(b,{images:{largeURL:"../assets/img/inflow-sample.png",thumbnailURL:"../assets/img/inflow-sample.png",width:4e3,height:2e3}},null,8,["images"]),oe]))}});export{de as __pageData,ce as default};