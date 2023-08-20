import{A as E,a2 as L,n as P,v as h,b as d,F as l,p as v,s as D,_ as A,y as g,e as k,f as C,R as I,L as x}from"./chunks/framework.0c0bf760.js";/*!
  * PhotoSwipe Lightbox 5.3.8 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */function p(s,t,e){const i=document.createElement(t);return s&&(i.className=s),e&&e.appendChild(i),i}function z(s,t,e){let i=`translate3d(${s}px,${t||0}px,0)`;return e!==void 0&&(i+=` scale3d(${e},${e},1)`),i}function y(s,t,e){s.style.width=typeof t=="number"?`${t}px`:t,s.style.height=typeof e=="number"?`${e}px`:e}const o={IDLE:"idle",LOADING:"loading",LOADED:"loaded",ERROR:"error"};function O(s){return"button"in s&&s.button===1||s.ctrlKey||s.metaKey||s.altKey||s.shiftKey}function f(s,t,e=document){let i=[];if(s instanceof Element)i=[s];else if(s instanceof NodeList||Array.isArray(s))i=Array.from(s);else{const n=typeof s=="string"?s:t;n&&(i=Array.from(e.querySelectorAll(n)))}return i}function R(s){return typeof s=="function"&&s.prototype&&s.prototype.goTo}function w(){return!!(navigator.vendor&&navigator.vendor.match(/apple/i))}class j{constructor(t,e){this.type=t,this.defaultPrevented=!1,e&&Object.assign(this,e)}preventDefault(){this.defaultPrevented=!0}}class F{constructor(){this._listeners={},this._filters={},this.pswp=void 0,this.options=void 0}addFilter(t,e,i=100){var n,a,r;this._filters[t]||(this._filters[t]=[]),(n=this._filters[t])==null||n.push({fn:e,priority:i}),(a=this._filters[t])==null||a.sort((c,m)=>c.priority-m.priority),(r=this.pswp)==null||r.addFilter(t,e,i)}removeFilter(t,e){this._filters[t]&&(this._filters[t]=this._filters[t].filter(i=>i.fn!==e)),this.pswp&&this.pswp.removeFilter(t,e)}applyFilters(t,...e){var i;return(i=this._filters[t])==null||i.forEach(n=>{e[0]=n.fn.apply(this,e)}),e[0]}on(t,e){var i,n;this._listeners[t]||(this._listeners[t]=[]),(i=this._listeners[t])==null||i.push(e),(n=this.pswp)==null||n.on(t,e)}off(t,e){var i;this._listeners[t]&&(this._listeners[t]=this._listeners[t].filter(n=>e!==n)),(i=this.pswp)==null||i.off(t,e)}dispatch(t,e){var n;if(this.pswp)return this.pswp.dispatch(t,e);const i=new j(t,e);return(n=this._listeners[t])==null||n.forEach(a=>{a.call(this,i)}),i}}class T{constructor(t,e){if(this.element=p("pswp__img pswp__img--placeholder",t?"img":"div",e),t){const i=this.element;i.decoding="async",i.alt="",i.src=t,i.setAttribute("role","presentation")}this.element.setAttribute("aria-hidden","true")}setDisplayedSize(t,e){this.element&&(this.element.tagName==="IMG"?(y(this.element,250,"auto"),this.element.style.transformOrigin="0 0",this.element.style.transform=z(0,0,t/250)):y(this.element,t,e))}destroy(){var t;(t=this.element)!=null&&t.parentNode&&this.element.remove(),this.element=null}}class M{constructor(t,e,i){this.instance=e,this.data=t,this.index=i,this.element=void 0,this.placeholder=void 0,this.slide=void 0,this.displayedImageWidth=0,this.displayedImageHeight=0,this.width=Number(this.data.w)||Number(this.data.width)||0,this.height=Number(this.data.h)||Number(this.data.height)||0,this.isAttached=!1,this.hasSlide=!1,this.isDecoding=!1,this.state=o.IDLE,this.data.type?this.type=this.data.type:this.data.src?this.type="image":this.type="html",this.instance.dispatch("contentInit",{content:this})}removePlaceholder(){this.placeholder&&!this.keepPlaceholder()&&setTimeout(()=>{this.placeholder&&(this.placeholder.destroy(),this.placeholder=void 0)},1e3)}load(t,e){if(this.slide&&this.usePlaceholder())if(this.placeholder){const i=this.placeholder.element;i&&!i.parentElement&&this.slide.container.prepend(i)}else{const i=this.instance.applyFilters("placeholderSrc",this.data.msrc&&this.slide.isFirstSlide?this.data.msrc:!1,this);this.placeholder=new T(i,this.slide.container)}this.element&&!e||this.instance.dispatch("contentLoad",{content:this,isLazy:t}).defaultPrevented||(this.isImageContent()?(this.element=p("pswp__img","img"),this.displayedImageWidth&&this.loadImage(t)):(this.element=p("pswp__content","div"),this.element.innerHTML=this.data.html||""),e&&this.slide&&this.slide.updateContentSize(!0))}loadImage(t){if(!this.isImageContent()||!this.element||this.instance.dispatch("contentLoadImage",{content:this,isLazy:t}).defaultPrevented)return;const e=this.element;this.updateSrcsetSizes(),this.data.srcset&&(e.srcset=this.data.srcset),e.src=this.data.src??"",e.alt=this.data.alt??"",this.state=o.LOADING,e.complete?this.onLoaded():(e.onload=()=>{this.onLoaded()},e.onerror=()=>{this.onError()})}setSlide(t){this.slide=t,this.hasSlide=!0,this.instance=t.pswp}onLoaded(){this.state=o.LOADED,this.slide&&this.element&&(this.instance.dispatch("loadComplete",{slide:this.slide,content:this}),this.slide.isActive&&this.slide.heavyAppended&&!this.element.parentNode&&(this.append(),this.slide.updateContentSize(!0)),(this.state===o.LOADED||this.state===o.ERROR)&&this.removePlaceholder())}onError(){this.state=o.ERROR,this.slide&&(this.displayError(),this.instance.dispatch("loadComplete",{slide:this.slide,isError:!0,content:this}),this.instance.dispatch("loadError",{slide:this.slide,content:this}))}isLoading(){return this.instance.applyFilters("isContentLoading",this.state===o.LOADING,this)}isError(){return this.state===o.ERROR}isImageContent(){return this.type==="image"}setDisplayedSize(t,e){if(this.element&&(this.placeholder&&this.placeholder.setDisplayedSize(t,e),!this.instance.dispatch("contentResize",{content:this,width:t,height:e}).defaultPrevented&&(y(this.element,t,e),this.isImageContent()&&!this.isError()))){const i=!this.displayedImageWidth&&t;this.displayedImageWidth=t,this.displayedImageHeight=e,i?this.loadImage(!1):this.updateSrcsetSizes(),this.slide&&this.instance.dispatch("imageSizeChange",{slide:this.slide,width:t,height:e,content:this})}}isZoomable(){return this.instance.applyFilters("isContentZoomable",this.isImageContent()&&this.state!==o.ERROR,this)}updateSrcsetSizes(){if(!this.isImageContent()||!this.element||!this.data.srcset)return;const t=this.element,e=this.instance.applyFilters("srcsetSizesWidth",this.displayedImageWidth,this);(!t.dataset.largestUsedSize||e>parseInt(t.dataset.largestUsedSize,10))&&(t.sizes=e+"px",t.dataset.largestUsedSize=String(e))}usePlaceholder(){return this.instance.applyFilters("useContentPlaceholder",this.isImageContent(),this)}lazyLoad(){this.instance.dispatch("contentLazyLoad",{content:this}).defaultPrevented||this.load(!0)}keepPlaceholder(){return this.instance.applyFilters("isKeepingPlaceholder",this.isLoading(),this)}destroy(){this.hasSlide=!1,this.slide=void 0,!this.instance.dispatch("contentDestroy",{content:this}).defaultPrevented&&(this.remove(),this.placeholder&&(this.placeholder.destroy(),this.placeholder=void 0),this.isImageContent()&&this.element&&(this.element.onload=null,this.element.onerror=null,this.element=void 0))}displayError(){var t;if(this.slide){let e=p("pswp__error-msg","div");e.innerText=((t=this.instance.options)==null?void 0:t.errorMsg)??"",e=this.instance.applyFilters("contentErrorElement",e,this),this.element=p("pswp__content pswp__error-msg-container","div"),this.element.appendChild(e),this.slide.container.innerText="",this.slide.container.appendChild(this.element),this.slide.updateContentSize(!0),this.removePlaceholder()}}append(){if(this.isAttached||!this.element)return;if(this.isAttached=!0,this.state===o.ERROR){this.displayError();return}if(this.instance.dispatch("contentAppend",{content:this}).defaultPrevented)return;const t="decode"in this.element;this.isImageContent()?t&&this.slide&&(!this.slide.isActive||w())?(this.isDecoding=!0,this.element.decode().catch(()=>{}).finally(()=>{this.isDecoding=!1,this.appendImage()})):this.appendImage():this.slide&&!this.element.parentNode&&this.slide.container.appendChild(this.element)}activate(){this.instance.dispatch("contentActivate",{content:this}).defaultPrevented||!this.slide||(this.isImageContent()&&this.isDecoding&&!w()?this.appendImage():this.isError()&&this.load(!1,!0),this.slide.holderElement&&this.slide.holderElement.setAttribute("aria-hidden","false"))}deactivate(){this.instance.dispatch("contentDeactivate",{content:this}),this.slide&&this.slide.holderElement&&this.slide.holderElement.setAttribute("aria-hidden","true")}remove(){this.isAttached=!1,!this.instance.dispatch("contentRemove",{content:this}).defaultPrevented&&(this.element&&this.element.parentNode&&this.element.remove(),this.placeholder&&this.placeholder.element&&this.placeholder.element.remove())}appendImage(){this.isAttached&&(this.instance.dispatch("contentAppendImage",{content:this}).defaultPrevented||(this.slide&&this.element&&!this.element.parentNode&&this.slide.container.appendChild(this.element),(this.state===o.LOADED||this.state===o.ERROR)&&this.removePlaceholder()))}}function N(s,t){if(s.getViewportSizeFn){const e=s.getViewportSizeFn(s,t);if(e)return e}return{x:document.documentElement.clientWidth,y:window.innerHeight}}function u(s,t,e,i,n){let a=0;if(t.paddingFn)a=t.paddingFn(e,i,n)[s];else if(t.padding)a=t.padding[s];else{const r="padding"+s[0].toUpperCase()+s.slice(1);t[r]&&(a=t[r])}return Number(a)||0}function q(s,t,e,i){return{x:t.x-u("left",s,t,e,i)-u("right",s,t,e,i),y:t.y-u("top",s,t,e,i)-u("bottom",s,t,e,i)}}const _=4e3;class U{constructor(t,e,i,n){this.pswp=n,this.options=t,this.itemData=e,this.index=i,this.panAreaSize=null,this.elementSize=null,this.fit=1,this.fill=1,this.vFill=1,this.initial=1,this.secondary=1,this.max=1,this.min=1}update(t,e,i){const n={x:t,y:e};this.elementSize=n,this.panAreaSize=i;const a=i.x/n.x,r=i.y/n.y;this.fit=Math.min(1,a<r?a:r),this.fill=Math.min(1,a>r?a:r),this.vFill=Math.min(1,r),this.initial=this._getInitial(),this.secondary=this._getSecondary(),this.max=Math.max(this.initial,this.secondary,this._getMax()),this.min=Math.min(this.fit,this.initial,this.secondary),this.pswp&&this.pswp.dispatch("zoomLevelsUpdate",{zoomLevels:this,slideData:this.itemData})}_parseZoomLevelOption(t){const e=t+"ZoomLevel",i=this.options[e];if(i)return typeof i=="function"?i(this):i==="fill"?this.fill:i==="fit"?this.fit:Number(i)}_getSecondary(){let t=this._parseZoomLevelOption("secondary");return t||(t=Math.min(1,this.fit*3),this.elementSize&&t*this.elementSize.x>_&&(t=_/this.elementSize.x),t)}_getInitial(){return this._parseZoomLevelOption("initial")||this.fit}_getMax(){return this._parseZoomLevelOption("max")||Math.max(1,this.fit*4)}}function S(s,t,e){const i=t.createContentFromData(s,e);let n;const{options:a}=t;if(a){n=new U(a,s,-1);let r;t.pswp?r=t.pswp.viewportSize:r=N(a,t);const c=q(a,r,s,e);n.update(i.width,i.height,c)}return i.lazyLoad(),n&&i.setDisplayedSize(Math.ceil(i.width*n.initial),Math.ceil(i.height*n.initial)),i}function W(s,t){const e=t.getItemData(s);if(!t.dispatch("lazyLoadSlide",{index:s,itemData:e}).defaultPrevented)return S(e,t,s)}class G extends F{getNumItems(){var n;let t=0;const e=(n=this.options)==null?void 0:n.dataSource;e&&"length"in e?t=e.length:e&&"gallery"in e&&(e.items||(e.items=this._getGalleryDOMElements(e.gallery)),e.items&&(t=e.items.length));const i=this.dispatch("numItems",{dataSource:e,numItems:t});return this.applyFilters("numItems",i.numItems,e)}createContentFromData(t,e){return new M(t,this,e)}getItemData(t){var r;const e=(r=this.options)==null?void 0:r.dataSource;let i={};Array.isArray(e)?i=e[t]:e&&"gallery"in e&&(e.items||(e.items=this._getGalleryDOMElements(e.gallery)),i=e.items[t]);let n=i;n instanceof Element&&(n=this._domElementToItemData(n));const a=this.dispatch("itemData",{itemData:n||{},index:t});return this.applyFilters("itemData",a.itemData,t)}_getGalleryDOMElements(t){var e,i;return(e=this.options)!=null&&e.children||(i=this.options)!=null&&i.childSelector?f(this.options.children,this.options.childSelector,t)||[]:[t]}_domElementToItemData(t){const e={element:t},i=t.tagName==="A"?t:t.querySelector("a");if(i){e.src=i.dataset.pswpSrc||i.href,i.dataset.pswpSrcset&&(e.srcset=i.dataset.pswpSrcset),e.width=i.dataset.pswpWidth?parseInt(i.dataset.pswpWidth,10):0,e.height=i.dataset.pswpHeight?parseInt(i.dataset.pswpHeight,10):0,e.w=e.width,e.h=e.height,i.dataset.pswpType&&(e.type=i.dataset.pswpType);const n=t.querySelector("img");n&&(e.msrc=n.currentSrc||n.src,e.alt=n.getAttribute("alt")??""),(i.dataset.pswpCropped||i.dataset.cropped)&&(e.thumbCropped=!0)}return this.applyFilters("domItemData",e,t,i)}lazyLoadData(t,e){return S(t,this,e)}}class H extends G{constructor(t){super(),this.options=t||{},this._uid=0,this.shouldOpen=!1,this._preloadedContent=void 0,this.onThumbnailsClick=this.onThumbnailsClick.bind(this)}init(){f(this.options.gallery,this.options.gallerySelector).forEach(t=>{t.addEventListener("click",this.onThumbnailsClick,!1)})}onThumbnailsClick(t){if(O(t)||window.pswp)return;let e={x:t.clientX,y:t.clientY};!e.x&&!e.y&&(e=null);let i=this.getClickedIndex(t);i=this.applyFilters("clickedIndex",i,t,this);const n={gallery:t.currentTarget};i>=0&&(t.preventDefault(),this.loadAndOpen(i,n,e))}getClickedIndex(t){if(this.options.getClickedIndexFn)return this.options.getClickedIndexFn.call(this,t);const e=t.target,n=f(this.options.children,this.options.childSelector,t.currentTarget).findIndex(a=>a===e||a.contains(e));return n!==-1?n:this.options.children||this.options.childSelector?-1:0}loadAndOpen(t,e,i){return window.pswp?!1:(this.options.index=t,this.options.initialPointerPos=i,this.shouldOpen=!0,this.preload(t,e),!0)}preload(t,e){const{options:i}=this;e&&(i.dataSource=e);const n=[],a=typeof i.pswpModule;if(R(i.pswpModule))n.push(Promise.resolve(i.pswpModule));else{if(a==="string")throw new Error("pswpModule as string is no longer supported");if(a==="function")n.push(i.pswpModule());else throw new Error("pswpModule is not valid")}typeof i.openPromise=="function"&&n.push(i.openPromise()),i.preloadFirstSlide!==!1&&t>=0&&(this._preloadedContent=W(t,this));const r=++this._uid;Promise.all(n).then(c=>{if(this.shouldOpen){const m=c[0];this._openPhotoswipe(m,r)}})}_openPhotoswipe(t,e){if(e!==this._uid&&this.shouldOpen||(this.shouldOpen=!1,window.pswp))return;const i=typeof t=="object"?new t.default(this.options):new t(this.options);this.pswp=i,window.pswp=i,Object.keys(this._listeners).forEach(n=>{var a;(a=this._listeners[n])==null||a.forEach(r=>{i.on(n,r)})}),Object.keys(this._filters).forEach(n=>{var a;(a=this._filters[n])==null||a.forEach(r=>{i.addFilter(n,r.fn,r.priority)})}),this._preloadedContent&&(i.contentLoader.addToCache(this._preloadedContent),this._preloadedContent=void 0),i.on("destroy",()=>{this.pswp=void 0,delete window.pswp}),i.init()}destroy(){var t;(t=this.pswp)==null||t.destroy(),this.shouldOpen=!1,this._listeners={},f(this.options.gallery,this.options.gallerySelector).forEach(e=>{e.removeEventListener("click",this.onThumbnailsClick,!1)})}}const $=["id"],V={class:"image-container"},Z=["href","data-pswp-width","data-pswp-height"],B=["src","alt"],K=["href","data-pswp-width","data-pswp-height"],X=["src","alt"],J={__name:"PhotoSwipe",props:{galleryID:String,images:Array|Object},setup(s){const t=s;let e;return E(()=>{e=new H({gallery:"#"+t.galleryID,children:"a",pswpModule:()=>L(()=>import("./chunks/photoswipe.esm.5794cde2.js"),[])}),e.init()}),P(()=>{e&&(e.destroy(),e=null)}),(i,n)=>(h(),d("div",{id:s.galleryID},[l("div",V,[Array.isArray(s.images)?(h(!0),d(v,{key:0},D(s.images,(a,r)=>(h(),d("a",{key:r,href:a.largeURL,"data-pswp-width":a.width,"data-pswp-height":a.height,target:"_blank",rel:"noreferrer"},[l("img",{src:a.thumbnailURL,alt:a.alt},null,8,B)],8,Z))),128)):(h(),d("a",{key:1,href:s.images.largeURL,"data-pswp-width":s.images.width,"data-pswp-height":s.images.height,target:"_blank",rel:"noreferrer"},[l("img",{src:s.images.thumbnailURL,alt:s.images.alt},null,8,X)],8,K))])],8,$))}};const Q=s=>(k("data-v-54b29f5b"),s=s(),C(),s),Y=Q(()=>l("p",{class:"image-note"},"(Select the image to enable fullscreen mode)",-1)),tt={__name:"Inflow",props:{images:Array|Object},setup(s){return(t,e)=>(h(),d(v,null,[g(J,{galleryID:"my-test-gallery",images:s.images},null,8,["images"]),Y],64))}},b=A(tt,[["__scopeId","data-v-54b29f5b"]]),et=I('<h1 id="inflow" tabindex="-1">Inflow <a class="header-anchor" href="#inflow" aria-label="Permalink to &quot;Inflow&quot;">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>&quot;Inflow&quot; was created as the final academic project for the web development subject, utilizing the Laravel framework. The primary goal of this project is to enhance Benilde&#39;s student information system flowchart by providing more comprehensive information about each subject, going beyond the mere display of subject codes. The name &quot;Inflow&quot; is derived from &quot;information overflow,&quot; symbolizing the project&#39;s intent. The project is based on the following technologies :</p><ul><li><a href="https://laravel.com/" target="_blank" rel="noreferrer"><strong>Laravel</strong></a></li><li><a href="https://getbootstrap.com/" target="_blank" rel="noreferrer"><strong>Bootstrap</strong></a></li><li><a href="https://jquery.com/" target="_blank" rel="noreferrer"><strong>jQuery</strong></a></li></ul><h2 id="problem" tabindex="-1">Problem <a class="header-anchor" href="#problem" aria-label="Permalink to &quot;Problem&quot;">​</a></h2>',5),it=l("p",null,"The picture above depicts the current flowchart of Benilde's student information system as of the writing. As a former student, I often found it challenging to decipher the meaning of subject codes. While some subjects are easily recognizable, others remain unclear. Additionally, there is an issue with not knowing whether a subject is a major or minor or what topics it covers for students interested in advanced study.",-1),st=l("p",null,"Furthermore, the system lacks clear information on when a student can retake a failed subject or when they can take a particular subject should they wish not to follow the provided flowchart. This lack of clarity can lead to confusion and delays in academic progress.",-1),nt=l("p",null,"Another glaring problem is the lack of timely updates, as evidenced by the top-left section still displaying the student as a freshman despite being in their junior year.",-1),at=l("p",null,"To validate these concerns, we conducted a survey with 40 Benildean student participants. The findings revealed that 30% of the participants stated that they were not aware of the elective courses available within their program. Furthermore, only 20% stated that they knew the topics and coverage of study for their future subjects. Of significant note, a substantial 92.5% of the participants expressed a strong desire for an interactive student information system flowchart.",-1),rt=l("h2",{id:"solution",tabindex:"-1"},[x("Solution "),l("a",{class:"header-anchor",href:"#solution","aria-label":'Permalink to "Solution"'},"​")],-1),ot=l("p",null,`To address these shortcomings, the academic project "Inflow" was developed. Its main objective is to enhance the student information system flowchart by providing comprehensive subject information that goes beyond mere codes, symbolizing its intent to tackle the issue of "information overflow." With "Inflow," students can access detailed subject descriptions, determine their major or minor status, and explore potential topics for advanced study. Moreover, the system offers clear information on subject retakes and helps students make informed decisions about their academic path. Through these improvements, "Inflow" aims to streamline and optimize the student's academic journey at Benilde.`,-1),lt=I('<h2 id="contributions" tabindex="-1">Contributions <a class="header-anchor" href="#contributions" aria-label="Permalink to &quot;Contributions&quot;">​</a></h2><ul><li><strong>Lead Backend Developer</strong> : Lead the backend development, ensuring a robust and efficient system.</li><li><strong>Team Coordination</strong> : Managed the team&#39;s collaboration by assigning tasks and overseeing progress to achieve project milestones.</li><li><strong>Module Integration</strong>: Integrated my work with contributions from my group mates using Git and Github, creating a cohesive and functional system.</li></ul><h2 id="github-repository" tabindex="-1">GitHub Repository <a class="header-anchor" href="#github-repository" aria-label="Permalink to &quot;GitHub Repository&quot;">​</a></h2><p><a href="https://github.com/simonpangan/BenildeProjects/tree/master/inflow-project" target="_blank" rel="noreferrer">View on GitHub</a></p>',4),ct=JSON.parse('{"title":"Inflow","description":"","frontmatter":{"theme":"page"},"headers":[],"relativePath":"projects/inflow.md","filePath":"projects/inflow.md"}'),ht={name:"projects/inflow.md"},pt=Object.assign(ht,{setup(s){return(t,e)=>(h(),d("div",null,[et,g(b,{images:{largeURL:"../assets/img/flowchart.png",thumbnailURL:"../assets/img/flowchart.png",width:3e3,height:2e3,alt:"Inflow"}},null,8,["images"]),it,st,nt,at,rt,ot,g(b,{images:{largeURL:"../assets/img/inflow-sample.png",thumbnailURL:"../assets/img/inflow-sample.png",width:4e3,height:2e3}},null,8,["images"]),lt]))}});export{ct as __pageData,pt as default};
