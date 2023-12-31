// node_modules/photoswipe/dist/photoswipe-lightbox.esm.js
function createElement(className, tagName, appendToEl) {
  const el = document.createElement(tagName);
  if (className) {
    el.className = className;
  }
  if (appendToEl) {
    appendToEl.appendChild(el);
  }
  return el;
}
function toTransformString(x, y, scale) {
  let propValue = `translate3d(${x}px,${y || 0}px,0)`;
  if (scale !== void 0) {
    propValue += ` scale3d(${scale},${scale},1)`;
  }
  return propValue;
}
function setWidthHeight(el, w, h) {
  el.style.width = typeof w === "number" ? `${w}px` : w;
  el.style.height = typeof h === "number" ? `${h}px` : h;
}
var LOAD_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function specialKeyUsed(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function getElementsFromOption(option, legacySelector, parent = document) {
  let elements = [];
  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === "string" ? option : legacySelector;
    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }
  return elements;
}
function isPswpClass(fn) {
  return typeof fn === "function" && fn.prototype && fn.prototype.goTo;
}
function isSafari() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
var PhotoSwipeEvent = class {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(type, details) {
    this.type = type;
    this.defaultPrevented = false;
    if (details) {
      Object.assign(this, details);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
};
var Eventable = class {
  constructor() {
    this._listeners = {};
    this._filters = {};
    this.pswp = void 0;
    this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(name, fn, priority = 100) {
    var _a, _b, _c;
    if (!this._filters[name]) {
      this._filters[name] = [];
    }
    (_a = this._filters[name]) == null ? void 0 : _a.push({ fn, priority });
    (_b = this._filters[name]) == null ? void 0 : _b.sort((f1, f2) => f1.priority - f2.priority);
    (_c = this.pswp) == null ? void 0 : _c.addFilter(name, fn, priority);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(name, fn) {
    if (this._filters[name]) {
      this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
    }
    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(name, ...args) {
    var _a;
    (_a = this._filters[name]) == null ? void 0 : _a.forEach((filter) => {
      args[0] = filter.fn.apply(this, args);
    });
    return args[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(name, fn) {
    var _a, _b;
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    (_a = this._listeners[name]) == null ? void 0 : _a.push(fn);
    (_b = this.pswp) == null ? void 0 : _b.on(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(name, fn) {
    var _a;
    if (this._listeners[name]) {
      this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
    }
    (_a = this.pswp) == null ? void 0 : _a.off(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(name, details) {
    var _a;
    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }
    const event = (
      /** @type {AugmentedEvent<T>} */
      new PhotoSwipeEvent(name, details)
    );
    (_a = this._listeners[name]) == null ? void 0 : _a.forEach((listener) => {
      listener.call(this, event);
    });
    return event;
  }
};
var Placeholder = class {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(imageSrc, container) {
    this.element = createElement(
      "pswp__img pswp__img--placeholder",
      imageSrc ? "img" : "div",
      container
    );
    if (imageSrc) {
      const imgEl = (
        /** @type {HTMLImageElement} */
        this.element
      );
      imgEl.decoding = "async";
      imgEl.alt = "";
      imgEl.src = imageSrc;
      imgEl.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.element.tagName === "IMG") {
      setWidthHeight(this.element, 250, "auto");
      this.element.style.transformOrigin = "0 0";
      this.element.style.transform = toTransformString(0, 0, width / 250);
    } else {
      setWidthHeight(this.element, width, height);
    }
  }
  destroy() {
    var _a;
    if ((_a = this.element) == null ? void 0 : _a.parentNode) {
      this.element.remove();
    }
    this.element = null;
  }
};
var Content = class {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(itemData, instance, index) {
    this.instance = instance;
    this.data = itemData;
    this.index = index;
    this.element = void 0;
    this.placeholder = void 0;
    this.slide = void 0;
    this.displayedImageWidth = 0;
    this.displayedImageHeight = 0;
    this.width = Number(this.data.w) || Number(this.data.width) || 0;
    this.height = Number(this.data.h) || Number(this.data.height) || 0;
    this.isAttached = false;
    this.hasSlide = false;
    this.isDecoding = false;
    this.state = LOAD_STATE.IDLE;
    if (this.data.type) {
      this.type = this.data.type;
    } else if (this.data.src) {
      this.type = "image";
    } else {
      this.type = "html";
    }
    this.instance.dispatch("contentInit", { content: this });
  }
  removePlaceholder() {
    if (this.placeholder && !this.keepPlaceholder()) {
      setTimeout(() => {
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = void 0;
        }
      }, 1e3);
    }
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(isLazy, reload) {
    if (this.slide && this.usePlaceholder()) {
      if (!this.placeholder) {
        const placeholderSrc = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
          this
        );
        this.placeholder = new Placeholder(
          placeholderSrc,
          this.slide.container
        );
      } else {
        const placeholderEl = this.placeholder.element;
        if (placeholderEl && !placeholderEl.parentElement) {
          this.slide.container.prepend(placeholderEl);
        }
      }
    }
    if (this.element && !reload) {
      return;
    }
    if (this.instance.dispatch("contentLoad", { content: this, isLazy }).defaultPrevented) {
      return;
    }
    if (this.isImageContent()) {
      this.element = createElement("pswp__img", "img");
      if (this.displayedImageWidth) {
        this.loadImage(isLazy);
      }
    } else {
      this.element = createElement("pswp__content", "div");
      this.element.innerHTML = this.data.html || "";
    }
    if (reload && this.slide) {
      this.slide.updateContentSize(true);
    }
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(isLazy) {
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", { content: this, isLazy }).defaultPrevented) {
      return;
    }
    const imageElement = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes();
    if (this.data.srcset) {
      imageElement.srcset = this.data.srcset;
    }
    imageElement.src = this.data.src ?? "";
    imageElement.alt = this.data.alt ?? "";
    this.state = LOAD_STATE.LOADING;
    if (imageElement.complete) {
      this.onLoaded();
    } else {
      imageElement.onload = () => {
        this.onLoaded();
      };
      imageElement.onerror = () => {
        this.onError();
      };
    }
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(slide) {
    this.slide = slide;
    this.hasSlide = true;
    this.instance = slide.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = LOAD_STATE.LOADED;
    if (this.slide && this.element) {
      this.instance.dispatch("loadComplete", { slide: this.slide, content: this });
      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
        this.append();
        this.slide.updateContentSize(true);
      }
      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = LOAD_STATE.ERROR;
    if (this.slide) {
      this.displayError();
      this.instance.dispatch("loadComplete", { slide: this.slide, isError: true, content: this });
      this.instance.dispatch("loadError", { slide: this.slide, content: this });
    }
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters(
      "isContentLoading",
      this.state === LOAD_STATE.LOADING,
      this
    );
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === LOAD_STATE.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.placeholder) {
      this.placeholder.setDisplayedSize(width, height);
    }
    if (this.instance.dispatch(
      "contentResize",
      { content: this, width, height }
    ).defaultPrevented) {
      return;
    }
    setWidthHeight(this.element, width, height);
    if (this.isImageContent() && !this.isError()) {
      const isInitialSizeUpdate = !this.displayedImageWidth && width;
      this.displayedImageWidth = width;
      this.displayedImageHeight = height;
      if (isInitialSizeUpdate) {
        this.loadImage(false);
      } else {
        this.updateSrcsetSizes();
      }
      if (this.slide) {
        this.instance.dispatch(
          "imageSizeChange",
          { slide: this.slide, width, height, content: this }
        );
      }
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters(
      "isContentZoomable",
      this.isImageContent() && this.state !== LOAD_STATE.ERROR,
      this
    );
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset) {
      return;
    }
    const image = (
      /** @type HTMLImageElement */
      this.element
    );
    const sizesWidth = this.instance.applyFilters(
      "srcsetSizesWidth",
      this.displayedImageWidth,
      this
    );
    if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
      image.sizes = sizesWidth + "px";
      image.dataset.largestUsedSize = String(sizesWidth);
    }
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters(
      "useContentPlaceholder",
      this.isImageContent(),
      this
    );
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    if (this.instance.dispatch("contentLazyLoad", { content: this }).defaultPrevented) {
      return;
    }
    this.load(true);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters(
      "isKeepingPlaceholder",
      this.isLoading(),
      this
    );
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = false;
    this.slide = void 0;
    if (this.instance.dispatch("contentDestroy", { content: this }).defaultPrevented) {
      return;
    }
    this.remove();
    if (this.placeholder) {
      this.placeholder.destroy();
      this.placeholder = void 0;
    }
    if (this.isImageContent() && this.element) {
      this.element.onload = null;
      this.element.onerror = null;
      this.element = void 0;
    }
  }
  /**
   * Display error message
   */
  displayError() {
    var _a;
    if (this.slide) {
      let errorMsgEl = createElement("pswp__error-msg", "div");
      errorMsgEl.innerText = ((_a = this.instance.options) == null ? void 0 : _a.errorMsg) ?? "";
      errorMsgEl = /** @type {HTMLDivElement} */
      this.instance.applyFilters(
        "contentErrorElement",
        errorMsgEl,
        this
      );
      this.element = createElement("pswp__content pswp__error-msg-container", "div");
      this.element.appendChild(errorMsgEl);
      this.slide.container.innerText = "";
      this.slide.container.appendChild(this.element);
      this.slide.updateContentSize(true);
      this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element) {
      return;
    }
    this.isAttached = true;
    if (this.state === LOAD_STATE.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", { content: this }).defaultPrevented) {
      return;
    }
    const supportsDecode = "decode" in this.element;
    if (this.isImageContent()) {
      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
        this.isDecoding = true;
        this.element.decode().catch(() => {
        }).finally(() => {
          this.isDecoding = false;
          this.appendImage();
        });
      } else {
        this.appendImage();
      }
    } else if (this.slide && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    if (this.instance.dispatch("contentActivate", { content: this }).defaultPrevented || !this.slide) {
      return;
    }
    if (this.isImageContent() && this.isDecoding && !isSafari()) {
      this.appendImage();
    } else if (this.isError()) {
      this.load(false, true);
    }
    if (this.slide.holderElement) {
      this.slide.holderElement.setAttribute("aria-hidden", "false");
    }
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", { content: this });
    if (this.slide && this.slide.holderElement) {
      this.slide.holderElement.setAttribute("aria-hidden", "true");
    }
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = false;
    if (this.instance.dispatch("contentRemove", { content: this }).defaultPrevented) {
      return;
    }
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    if (this.placeholder && this.placeholder.element) {
      this.placeholder.element.remove();
    }
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    if (!this.isAttached) {
      return;
    }
    if (this.instance.dispatch("contentAppendImage", { content: this }).defaultPrevented) {
      return;
    }
    if (this.slide && this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
      this.removePlaceholder();
    }
  }
};
function getViewportSize(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function parsePaddingOption(prop, options, viewportSize, itemData, index) {
  let paddingValue = 0;
  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
    if (options[legacyPropName]) {
      paddingValue = options[legacyPropName];
    }
  }
  return Number(paddingValue) || 0;
}
function getPanAreaSize(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption("left", options, viewportSize, itemData, index) - parsePaddingOption("right", options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption("top", options, viewportSize, itemData, index) - parsePaddingOption("bottom", options, viewportSize, itemData, index)
  };
}
var MAX_IMAGE_WIDTH = 4e3;
var ZoomLevel = class {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(options, itemData, index, pswp) {
    this.pswp = pswp;
    this.options = options;
    this.itemData = itemData;
    this.index = index;
    this.panAreaSize = null;
    this.elementSize = null;
    this.fit = 1;
    this.fill = 1;
    this.vFill = 1;
    this.initial = 1;
    this.secondary = 1;
    this.max = 1;
    this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(maxWidth, maxHeight, panAreaSize) {
    const elementSize = { x: maxWidth, y: maxHeight };
    this.elementSize = elementSize;
    this.panAreaSize = panAreaSize;
    const hRatio = panAreaSize.x / elementSize.x;
    const vRatio = panAreaSize.y / elementSize.y;
    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
    this.vFill = Math.min(1, vRatio);
    this.initial = this._getInitial();
    this.secondary = this._getSecondary();
    this.max = Math.max(
      this.initial,
      this.secondary,
      this._getMax()
    );
    this.min = Math.min(
      this.fit,
      this.initial,
      this.secondary
    );
    if (this.pswp) {
      this.pswp.dispatch("zoomLevelsUpdate", { zoomLevels: this, slideData: this.itemData });
    }
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(optionPrefix) {
    const optionName = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      optionPrefix + "ZoomLevel"
    );
    const optionValue = this.options[optionName];
    if (!optionValue) {
      return;
    }
    if (typeof optionValue === "function") {
      return optionValue(this);
    }
    if (optionValue === "fill") {
      return this.fill;
    }
    if (optionValue === "fit") {
      return this.fit;
    }
    return Number(optionValue);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let currZoomLevel = this._parseZoomLevelOption("secondary");
    if (currZoomLevel) {
      return currZoomLevel;
    }
    currZoomLevel = Math.min(1, this.fit * 3);
    if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
    }
    return currZoomLevel;
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
};
function lazyLoadData(itemData, instance, index) {
  const content = instance.createContentFromData(itemData, index);
  let zoomLevel;
  const { options } = instance;
  if (options) {
    zoomLevel = new ZoomLevel(options, itemData, -1);
    let viewportSize;
    if (instance.pswp) {
      viewportSize = instance.pswp.viewportSize;
    } else {
      viewportSize = getViewportSize(options, instance);
    }
    const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
    zoomLevel.update(content.width, content.height, panAreaSize);
  }
  content.lazyLoad();
  if (zoomLevel) {
    content.setDisplayedSize(
      Math.ceil(content.width * zoomLevel.initial),
      Math.ceil(content.height * zoomLevel.initial)
    );
  }
  return content;
}
function lazyLoadSlide(index, instance) {
  const itemData = instance.getItemData(index);
  if (instance.dispatch("lazyLoadSlide", { index, itemData }).defaultPrevented) {
    return;
  }
  return lazyLoadData(itemData, instance, index);
}
var PhotoSwipeBase = class extends Eventable {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var _a;
    let numItems = 0;
    const dataSource = (_a = this.options) == null ? void 0 : _a.dataSource;
    if (dataSource && "length" in dataSource) {
      numItems = dataSource.length;
    } else if (dataSource && "gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      if (dataSource.items) {
        numItems = dataSource.items.length;
      }
    }
    const event = this.dispatch("numItems", {
      dataSource,
      numItems
    });
    return this.applyFilters("numItems", event.numItems, dataSource);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(slideData, index) {
    return new Content(slideData, this, index);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(index) {
    var _a;
    const dataSource = (_a = this.options) == null ? void 0 : _a.dataSource;
    let dataSourceItem = {};
    if (Array.isArray(dataSource)) {
      dataSourceItem = dataSource[index];
    } else if (dataSource && "gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      dataSourceItem = dataSource.items[index];
    }
    let itemData = dataSourceItem;
    if (itemData instanceof Element) {
      itemData = this._domElementToItemData(itemData);
    }
    const event = this.dispatch("itemData", {
      itemData: itemData || {},
      index
    });
    return this.applyFilters("itemData", event.itemData, index);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(galleryElement) {
    var _a, _b;
    if (((_a = this.options) == null ? void 0 : _a.children) || ((_b = this.options) == null ? void 0 : _b.childSelector)) {
      return getElementsFromOption(
        this.options.children,
        this.options.childSelector,
        galleryElement
      ) || [];
    }
    return [galleryElement];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(element) {
    const itemData = {
      element
    };
    const linkEl = (
      /** @type {HTMLAnchorElement} */
      element.tagName === "A" ? element : element.querySelector("a")
    );
    if (linkEl) {
      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
      if (linkEl.dataset.pswpSrcset) {
        itemData.srcset = linkEl.dataset.pswpSrcset;
      }
      itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
      itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0;
      itemData.w = itemData.width;
      itemData.h = itemData.height;
      if (linkEl.dataset.pswpType) {
        itemData.type = linkEl.dataset.pswpType;
      }
      const thumbnailEl = element.querySelector("img");
      if (thumbnailEl) {
        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
        itemData.alt = thumbnailEl.getAttribute("alt") ?? "";
      }
      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
        itemData.thumbCropped = true;
      }
    }
    return this.applyFilters("domItemData", itemData, element, linkEl);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(itemData, index) {
    return lazyLoadData(itemData, this, index);
  }
};
var PhotoSwipeLightbox = class extends PhotoSwipeBase {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(options) {
    super();
    this.options = options || {};
    this._uid = 0;
    this.shouldOpen = false;
    this._preloadedContent = void 0;
    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.addEventListener("click", this.onThumbnailsClick, false);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (specialKeyUsed(e) || window.pswp) {
      return;
    }
    let initialPoint = { x: e.clientX, y: e.clientY };
    if (!initialPoint.x && !initialPoint.y) {
      initialPoint = null;
    }
    let clickedIndex = this.getClickedIndex(e);
    clickedIndex = this.applyFilters("clickedIndex", clickedIndex, e, this);
    const dataSource = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    if (clickedIndex >= 0) {
      e.preventDefault();
      this.loadAndOpen(clickedIndex, dataSource, initialPoint);
    }
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(e) {
    if (this.options.getClickedIndexFn) {
      return this.options.getClickedIndexFn.call(this, e);
    }
    const clickedTarget = (
      /** @type {HTMLElement} */
      e.target
    );
    const childElements = getElementsFromOption(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    );
    const clickedChildIndex = childElements.findIndex(
      (child) => child === clickedTarget || child.contains(clickedTarget)
    );
    if (clickedChildIndex !== -1) {
      return clickedChildIndex;
    } else if (this.options.children || this.options.childSelector) {
      return -1;
    }
    return 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} dataSource
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(index, dataSource, initialPoint) {
    if (window.pswp) {
      return false;
    }
    this.options.index = index;
    this.options.initialPointerPos = initialPoint;
    this.shouldOpen = true;
    this.preload(index, dataSource);
    return true;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(index, dataSource) {
    const { options } = this;
    if (dataSource) {
      options.dataSource = dataSource;
    }
    const promiseArray = [];
    const pswpModuleType = typeof options.pswpModule;
    if (isPswpClass(options.pswpModule)) {
      promiseArray.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        options.pswpModule
      ));
    } else if (pswpModuleType === "string") {
      throw new Error("pswpModule as string is no longer supported");
    } else if (pswpModuleType === "function") {
      promiseArray.push(
        /** @type {() => Promise<Type<PhotoSwipe>>} */
        options.pswpModule()
      );
    } else {
      throw new Error("pswpModule is not valid");
    }
    if (typeof options.openPromise === "function") {
      promiseArray.push(options.openPromise());
    }
    if (options.preloadFirstSlide !== false && index >= 0) {
      this._preloadedContent = lazyLoadSlide(index, this);
    }
    const uid = ++this._uid;
    Promise.all(promiseArray).then((iterableModules) => {
      if (this.shouldOpen) {
        const mainModule = iterableModules[0];
        this._openPhotoswipe(mainModule, uid);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(module, uid) {
    if (uid !== this._uid && this.shouldOpen) {
      return;
    }
    this.shouldOpen = false;
    if (window.pswp) {
      return;
    }
    const pswp = typeof module === "object" ? new module.default(this.options) : new module(this.options);
    this.pswp = pswp;
    window.pswp = pswp;
    Object.keys(this._listeners).forEach((name) => {
      var _a;
      (_a = this._listeners[name]) == null ? void 0 : _a.forEach((fn) => {
        pswp.on(
          name,
          /** @type {EventCallback<typeof name>} */
          fn
        );
      });
    });
    Object.keys(this._filters).forEach((name) => {
      var _a;
      (_a = this._filters[name]) == null ? void 0 : _a.forEach((filter) => {
        pswp.addFilter(name, filter.fn, filter.priority);
      });
    });
    if (this._preloadedContent) {
      pswp.contentLoader.addToCache(this._preloadedContent);
      this._preloadedContent = void 0;
    }
    pswp.on("destroy", () => {
      this.pswp = void 0;
      delete window.pswp;
    });
    pswp.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var _a;
    (_a = this.pswp) == null ? void 0 : _a.destroy();
    this.shouldOpen = false;
    this._listeners = {};
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.removeEventListener("click", this.onThumbnailsClick, false);
    });
  }
};
export {
  PhotoSwipeLightbox as default
};
/*! Bundled license information:

photoswipe/dist/photoswipe-lightbox.esm.js:
  (*!
    * PhotoSwipe Lightbox 5.3.8 - https://photoswipe.com
    * (c) 2023 Dmytro Semenov
    *)
*/
//# sourceMappingURL=photoswipe_lightbox.js.map
