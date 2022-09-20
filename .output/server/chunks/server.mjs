import require$$0 from 'unenv/runtime/mock/proxy';
import { r as require$$1, s as serverRenderer } from './renderer.mjs';
import { $fetch } from 'ohmyfetch';
import { joinURL, hasProtocol, isEqual } from 'ufo';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { createError as createError$1, sendRedirect } from 'h3';
import defu from 'defu';
import { a as useRuntimeConfig$1 } from './node-server.mjs';
import 'stream';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var vue_cjs_prod = {};
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var compilerDom = require$$0;
  var runtimeDom = require$$1;
  var shared = shared_cjs_prod;
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    var n = /* @__PURE__ */ Object.create(null);
    if (e) {
      Object.keys(e).forEach(function(k) {
        n[k] = e[k];
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var runtimeDom__namespace = /* @__PURE__ */ _interopNamespace(runtimeDom);
  const compileCache = /* @__PURE__ */ Object.create(null);
  function compileToFunction(template, options) {
    if (!shared.isString(template)) {
      if (template.nodeType) {
        template = template.innerHTML;
      } else {
        return shared.NOOP;
      }
    }
    const key = template;
    const cached = compileCache[key];
    if (cached) {
      return cached;
    }
    if (template[0] === "#") {
      const el = document.querySelector(template);
      template = el ? el.innerHTML : ``;
    }
    const opts = shared.extend({
      hoistStatic: true,
      onError: void 0,
      onWarn: shared.NOOP
    }, options);
    if (!opts.isCustomElement && typeof customElements !== "undefined") {
      opts.isCustomElement = (tag) => !!customElements.get(tag);
    }
    const { code } = compilerDom.compile(template, opts);
    const render = new Function("Vue", code)(runtimeDom__namespace);
    render._rc = true;
    return compileCache[key] = render;
  }
  runtimeDom.registerRuntimeCompiler(compileToFunction);
  Object.keys(runtimeDom).forEach(function(k) {
    if (k !== "default")
      exports2[k] = runtimeDom[k];
  });
  exports2.compile = compileToFunction;
})(vue_cjs_prod);
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide && typeof provide === "object") {
    for (const key in provide) {
      nuxtApp.provide(key, provide[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = vue_cjs_prod.getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
var vueRouter_cjs_prod = { exports: {} };
var vueRouter_prod = {};
/*!
  * vue-router v4.1.5
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var vue = vue_cjs_prod;
  function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === "Module";
  }
  const assign = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = isArray2(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop = () => {
  };
  const isArray2 = Array.isArray;
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const hashPos = location2.indexOf("#");
    let searchPos = location2.indexOf("?");
    if (hashPos < searchPos && hashPos >= 0) {
      searchPos = -1;
    }
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return isArray2(a) ? isEquivalentArray(a, b) : isArray2(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return isArray2(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/"))
      return to;
    if (!to)
      return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (segment === ".")
        continue;
      if (segment === "..") {
        if (position > 1)
          position--;
      } else
        break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
  }
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  const START = "";
  function normalizeBase(base) {
    if (!base) {
      {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#")
      base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
  });
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/")
        pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index = listeners.indexOf(callback);
        if (index > -1)
          listeners.splice(index, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state)
        return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
    function destroy() {
      for (const teardown of teardowns)
        teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener);
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = { value: history2.state };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history2.length - 1,
        replaced: true,
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      const state = assign({}, history2.state, buildState(
        historyState.value.back,
        to,
        historyState.value.forward,
        true
      ), data, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign(
        {},
        historyState.value,
        history2.state,
        {
          forward: to,
          scroll: computeScrollPosition()
        }
      );
      changeLocation(currentState.current, currentState, true);
      const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners)
        historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function createMemoryHistory(base = "") {
    let listeners = [];
    let queue = [START];
    let position = 0;
    base = normalizeBase(base);
    function setLocation(location2) {
      position++;
      if (position === queue.length) {
        queue.push(location2);
      } else {
        queue.splice(position);
        queue.push(location2);
      }
    }
    function triggerListeners(to, from, { direction, delta }) {
      const info = {
        direction,
        delta,
        type: NavigationType.pop
      };
      for (const callback of listeners) {
        callback(to, from, info);
      }
    }
    const routerHistory = {
      location: START,
      state: {},
      base,
      createHref: createHref.bind(null, base),
      replace(to) {
        queue.splice(position--, 1);
        setLocation(to);
      },
      push(to, data) {
        setLocation(to);
      },
      listen(callback) {
        listeners.push(callback);
        return () => {
          const index = listeners.indexOf(callback);
          if (index > -1)
            listeners.splice(index, 1);
        };
      },
      destroy() {
        listeners = [];
        queue = [START];
        position = 0;
      },
      go(delta, shouldTrigger = true) {
        const from = this.location;
        const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
        position = Math.max(0, Math.min(position + delta, queue.length - 1));
        if (shouldTrigger) {
          triggerListeners(this.location, from, {
            direction,
            delta
          });
        }
      }
    };
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => queue[position]
    });
    return routerHistory;
  }
  function createWebHashHistory(base) {
    base = location.host ? base || location.pathname + location.search : "";
    if (!base.includes("#"))
      base += "#";
    return createWebHistory(base);
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  const NavigationFailureSymbol = Symbol("");
  exports2.NavigationFailureType = void 0;
  (function(NavigationFailureType) {
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
  })(exports2.NavigationFailureType || (exports2.NavigationFailureType = {}));
  const ErrorTypeMessages = {
    [1]({ location: location2, currentLocation }) {
      return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
    },
    [2]({ from, to }) {
      return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
    },
    [4]({ from, to }) {
      return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
    },
    [8]({ from, to }) {
      return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
    },
    [16]({ from, to }) {
      return `Avoided redundant navigation to current location: "${from.fullPath}".`;
    }
  };
  function createRouterError(type, params) {
    {
      return assign(new Error(ErrorTypeMessages[type](params)), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const propertiesToLog = ["params", "query", "hash"];
  function stringifyRoute(to) {
    if (typeof to === "string")
      return to;
    if ("path" in to)
      return to.path;
    const location2 = {};
    for (const key of propertiesToLog) {
      if (key in to)
        location2[key] = to[key];
    }
    return JSON.stringify(location2, null, 2);
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [90];
      if (options.strict && !segment.length)
        pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex)
            pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re2 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re2})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
          if (!tokenIndex)
            subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional)
            subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional)
            subSegmentScore += -8;
          if (repeatable)
            subSegmentScore += -20;
          if (re2 === ".*")
            subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001;
    }
    if (!options.strict)
      pattern += "/?";
    if (options.end)
      pattern += "$";
    else if (options.strict)
      pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re);
      const params = {};
      if (!match)
        return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/"))
          path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (isArray2(param) && !repeatable) {
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            }
            const text = isArray2(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2) {
                  if (path.endsWith("/"))
                    path = path.slice(0, -1);
                  else
                    avoidDuplicatedSlash = true;
                }
              } else
                throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path || "/";
    }
    return {
      re,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff)
        return diff;
      i++;
    }
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp)
        return comp;
      i++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
      if (isLastScoreNegative(aScore))
        return 1;
      if (isLastScoreNegative(bScore))
        return -1;
    }
    return bScore.length - aScore.length;
  }
  function isLastScoreNegative(score) {
    const last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path)
      return [[]];
    if (path === "/")
      return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment)
        tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer)
        return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+"))
          crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+")
              i--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\")
              customRe = customRe.slice(0, -1) + char;
            else
              state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2)
      crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf)
        parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes2, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [
        mainNormalizedRecord
      ];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(assign({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          }));
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher)
            originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher))
            removeRoute(record.name);
        }
        if (mainNormalizedRecord.children) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        originalRecord = originalRecord || matcher;
        insertMatcher(matcher);
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index = matchers.indexOf(matcherRef);
        if (index > -1) {
          matchers.splice(index, 1);
          if (matcherRef.record.name)
            matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      let i = 0;
      while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
        i++;
      matchers.splice(i, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher))
        matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher)
          throw createRouterError(1, {
            location: location2
          });
        name = matcher.record.name;
        params = assign(
          paramsFromLocation(
            currentLocation.params,
            matcher.keys.filter((k) => !k.optional).map((k) => k.name)
          ),
          location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
        );
        path = matcher.stringify(params);
      } else if ("path" in location2) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher)
          throw createRouterError(1, {
            location: location2,
            currentLocation
          });
        name = matcher.record.name;
        params = assign({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes2.forEach((route) => addRoute(route));
    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params)
        newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    return {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: void 0,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || null : record.component && { default: record.component }
    };
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components)
        propsObject[name] = typeof props === "boolean" ? props : props[name];
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf)
        return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign(meta, record.meta), {});
  }
  function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
  }
  function isRecordChildOf(record, parent) {
    return parent.children.some((child) => child === record || isRecordChildOf(record, child));
  }
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  function parseQuery(search) {
    const query = {};
    if (search === "" || search === "?")
      return query;
    const hasLeadingIM = search[0] === "?";
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!isArray2(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search += (search.length ? "&" : "") + key;
        }
        continue;
      }
      const values = isArray2(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search += (search.length ? "&" : "") + key;
          if (value2 != null)
            search += "=" + value2;
        }
      });
    }
    return search;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = isArray2(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  const matchedRouteKey = Symbol("");
  const viewDepthKey = Symbol("");
  const routerKey = Symbol("");
  const routeLocationKey = Symbol("");
  const routerViewLocationKey = Symbol("");
  function useCallbacks() {
    let handlers = [];
    function add(handler) {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i > -1)
          handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add,
      list: () => handlers,
      reset
    };
  }
  function registerGuard(record, name, guard) {
    const removeFromList = () => {
      record[name].delete(guard);
    };
    vue.onUnmounted(removeFromList);
    vue.onDeactivated(removeFromList);
    vue.onActivated(() => {
      record[name].add(guard);
    });
    record[name].add(guard);
  }
  function onBeforeRouteLeave(leaveGuard) {
    const activeRecord = vue.inject(
      matchedRouteKey,
      {}
    ).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "leaveGuards", leaveGuard);
  }
  function onBeforeRouteUpdate(updateGuard) {
    const activeRecord = vue.inject(
      matchedRouteKey,
      {}
    ).value;
    if (!activeRecord) {
      return;
    }
    registerGuard(activeRecord, "updateGuards", updateGuard);
  }
  function guardToPromiseFn(guard, to, from, record, name) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
      const next = (valid) => {
        if (valid === false) {
          reject(createRouterError(4, {
            from,
            to
          }));
        } else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
            enterCallbackArray.push(valid);
          }
          resolve();
        }
      };
      const guardReturn = guard.call(record && record.instances[name], to, from, next);
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3)
        guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name])
          continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved)
              return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name)();
          }));
        }
      }
    }
    return guards;
  }
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function loadRouteLocation(route) {
    return route.matched.every((record) => record.redirect) ? Promise.reject(new Error("Cannot load a route that redirects.")) : Promise.all(route.matched.map((record) => record.components && Promise.all(Object.keys(record.components).reduce((promises, name) => {
      const rawComponent = record.components[name];
      if (typeof rawComponent === "function" && !("displayName" in rawComponent)) {
        promises.push(rawComponent().then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          return;
        }));
      }
      return promises;
    }, [])))).then(() => route);
  }
  function useLink(props) {
    const router = vue.inject(routerKey);
    const currentRoute = vue.inject(routeLocationKey);
    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
    const activeRecordIndex = vue.computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index > -1)
        return index;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
    });
    const isActive = vue.computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        return router[vue.unref(props.replace) ? "replace" : "push"](
          vue.unref(props.to)
        ).catch(noop);
      }
      return Promise.resolve();
    }
    return {
      route,
      href: vue.computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  const RouterLinkImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink,
    setup(props, { slots }) {
      const link = vue.reactive(useLink(props));
      const { options } = vue.inject(routerKey);
      const elClass = vue.computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && slots.default(link);
        return props.custom ? children : vue.h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!isArray2(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ vue.defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
      const injectedRoute = vue.inject(routerViewLocationKey);
      const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
      const injectedDepth = vue.inject(viewDepthKey, 0);
      const depth = vue.computed(() => {
        let initialDepth = vue.unref(injectedDepth);
        const { matched } = routeToDisplay.value;
        let matchedRoute;
        while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
          initialDepth++;
        }
        return initialDepth;
      });
      const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth.value]);
      vue.provide(viewDepthKey, vue.computed(() => depth.value + 1));
      vue.provide(matchedRouteKey, matchedRouteRef);
      vue.provide(routerViewLocationKey, routeToDisplay);
      const viewRef = vue.ref();
      vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const currentName = props.name;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[currentName];
        if (!ViewComponent) {
          return normalizeSlot(slots.default, { Component: ViewComponent, route });
        }
        const routePropsOption = matchedRoute.props[currentName];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = vue.h(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, { Component: component, route }) || component;
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot)
      return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if ("path" in rawLocation) {
        matcherLocation = assign({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign({}, rawLocation, {
          params: encodeParams(rawLocation.params)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
          newTargetLocation.params = {};
        }
        return assign({
          query: to.query,
          hash: to.hash,
          params: "path" in newTargetLocation ? {} : to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect)
        return pushWithRedirect(
          assign(locationAsObject(shouldRedirect), {
            state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
            force,
            replace: replace2
          }),
          redirectedFrom || targetLocation
        );
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, { to: toLocation, from });
        handleScroll();
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(failure2, 2)) {
            return pushWithRedirect(
              assign({
                replace: replace2
              }, locationAsObject(failure2.to), {
                state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
                force
              }),
              redirectedFrom || toLocation
            );
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of to.matched) {
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (isArray2(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      for (const guard of afterGuards.list())
        guard(to, from, failure);
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error)
        return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = {};
      if (isPush) {
        if (replace2 || isFirstNavigation)
          routerHistory.replace(toLocation.fullPath, assign({
            scroll: isFirstNavigation && state && state.scroll
          }, data));
        else
          routerHistory.push(toLocation.fullPath, data);
      }
      currentRoute.value = toLocation;
      handleScroll();
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener)
        return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        if (!router.listening)
          return;
        const toLocation = resolve(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, 4 | 8)) {
            return error;
          }
          if (isNavigationFailure(error, 2)) {
            pushWithRedirect(
              error.to,
              toLocation
            ).then((failure) => {
              if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop);
            return Promise.reject();
          }
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          }
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(
            toLocation,
            from,
            false
          );
          if (failure) {
            if (info.delta && !isNavigationFailure(failure, 8)) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop);
      });
    }
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorHandlers.list();
      if (list.length) {
        list.forEach((handler) => handler(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
        return Promise.resolve();
      return new Promise((resolve2, reject) => {
        readyHandlers.add([resolve2, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      return Promise.resolve();
    }
    const go = (delta) => routerHistory.go(delta);
    const installedApps = /* @__PURE__ */ new Set();
    const router = {
      currentRoute,
      listening: true,
      addRoute,
      removeRoute,
      hasRoute,
      getRoutes,
      resolve,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorHandlers.add,
      isReady,
      install(app) {
        const router2 = this;
        app.component("RouterLink", RouterLink);
        app.component("RouterView", RouterView);
        app.config.globalProperties.$router = router2;
        Object.defineProperty(app.config.globalProperties, "$route", {
          enumerable: true,
          get: () => vue.unref(currentRoute)
        });
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
        }
        app.provide(routerKey, router2);
        app.provide(routeLocationKey, vue.reactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function() {
          installedApps.delete(app);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    return router;
  }
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
          updatingRecords.push(recordFrom);
        else
          leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }
  function useRouter2() {
    return vue.inject(routerKey);
  }
  function useRoute2() {
    return vue.inject(routeLocationKey);
  }
  exports2.RouterLink = RouterLink;
  exports2.RouterView = RouterView;
  exports2.START_LOCATION = START_LOCATION_NORMALIZED;
  exports2.createMemoryHistory = createMemoryHistory;
  exports2.createRouter = createRouter;
  exports2.createRouterMatcher = createRouterMatcher;
  exports2.createWebHashHistory = createWebHashHistory;
  exports2.createWebHistory = createWebHistory;
  exports2.isNavigationFailure = isNavigationFailure;
  exports2.loadRouteLocation = loadRouteLocation;
  exports2.matchedRouteKey = matchedRouteKey;
  exports2.onBeforeRouteLeave = onBeforeRouteLeave;
  exports2.onBeforeRouteUpdate = onBeforeRouteUpdate;
  exports2.parseQuery = parseQuery;
  exports2.routeLocationKey = routeLocationKey;
  exports2.routerKey = routerKey;
  exports2.routerViewLocationKey = routerViewLocationKey;
  exports2.stringifyQuery = stringifyQuery;
  exports2.useLink = useLink;
  exports2.useRoute = useRoute2;
  exports2.useRouter = useRouter2;
  exports2.viewDepthKey = viewDepthKey;
})(vueRouter_prod);
(function(module2) {
  module2.exports = vueRouter_prod;
})(vueRouter_cjs_prod);
const useError = () => vue_cjs_prod.toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (vue_cjs_prod.getCurrentInstance()) {
    return vue_cjs_prod.inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 302));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(
            vue_cjs_prod.resolveComponent("RouterLink"),
            {
              to: to.value,
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0 = defineNuxtLink({ componentName: "NuxtLink" });
function useHead(meta) {
  const resolvedMeta = isFunction_1(meta) ? vue_cjs_prod.computed(meta) : meta;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(vue_cjs_prod.unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: __spreadValues({ key: "default" }, obj[key]) });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: item });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document2),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute("content", "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length));
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(vue_cjs_prod.shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const titleTemplate = allHeadObjs.map((i) => vue_cjs_prod.unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(vue_cjs_prod.unref(objs));
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index = i;
                  break;
                }
              }
              if (index !== -1) {
                deduped.splice(index, 1);
              }
            }
          }
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(titleTemplate, tag.props.children);
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta = vue_cjs_prod.ref(_meta);
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (meta.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta.value.charset });
      }
      if (meta.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta.value.viewport });
      }
      return defu(overrides, meta.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta = renderHeadToString(head);
      return {
        ...meta,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const NoScript = vue_cjs_prod.defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((meta) => ({
    meta: [meta]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "meta": [], "link": [], "style": [], "script": [], "noscript": [], "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw({ title: "", ...metaConfig.globalMeta }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = {
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_cjs_prod.exports.RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          return _wrapIf(
            vue_cjs_prod.Transition,
            (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition,
            wrapInKeepAlive(
              routeProps.route.meta.keepalive,
              isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(Component, { key, routeProps, pageKey: key }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => vue_cjs_prod.h(Component, { key, routeProps, pageKey: key }) })
            )
          ).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const Component = vue_cjs_prod.defineComponent({
  props: ["routeProps", "pageKey"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = vue_cjs_prod.computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    vue_cjs_prod.provide("_route", vue_cjs_prod.reactive(route));
    return () => vue_cjs_prod.h(props.routeProps.Component);
  }
});
const routes = [];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_cjs_prod.exports.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_cjs_prod.exports.createRouter({
    ...routerOptions,
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = vue_cjs_prod.computed(() => _route.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const _plugins = [
  preload,
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = vue_cjs_prod.defineAsyncComponent(() => import('./error-component.f864f862.mjs'));
    const nuxtApp = useNuxtApp();
    vue_cjs_prod.provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorComponent), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
(function(h, e) {
  "object" === typeof exports && "undefined" !== typeof module ? e(exports, require("three")) : "function" === typeof define && define.amd ? define(["exports", "three"], e) : (h = h || self, e(h.PANOLENS = {}, h.THREE));
})(globalThis, function(h, e) {
  function S(a) {
    this.constraints = Object.assign({ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: { exact: "environment" } }, audio: false }, a);
    this.element = this.scene = this.container = null;
    this.devices = [];
    this.stream = null;
    this.ratioScalar = 1;
    this.videoDeviceIndex = 0;
  }
  function M(a, b, c) {
    a = void 0 === a ? 16777215 : a;
    b = void 0 === b ? true : b;
    c = void 0 === c ? 1500 : c;
    this.dpr = window.devicePixelRatio;
    var d = this.createCanvas(), g = d.canvas;
    d = d.context;
    var k = new e.SpriteMaterial({ color: a, map: this.createCanvasTexture(g) });
    e.Sprite.call(this, k);
    this.canvasWidth = g.width;
    this.canvasHeight = g.height;
    this.context = d;
    this.color = a instanceof e.Color ? a : new e.Color(a);
    this.autoSelect = b;
    this.dwellTime = c;
    this.rippleDuration = 500;
    this.position.z = -10;
    this.center.set(0.5, 0.5);
    this.scale.set(0.5, 0.5, 1);
    this.callback = this.timerId = this.startTimestamp = null;
    this.frustumCulled = false;
    this.updateCanvasArcByProgress(0);
  }
  function z(a, b, c) {
    a = void 0 === a ? 300 : a;
    b = b || u.Info;
    e.Sprite.call(this);
    this.type = "infospot";
    this.animated = void 0 !== c ? c : true;
    this.frustumCulled = this.isHovering = false;
    this.cursorStyle = this.toPanorama = this.element = null;
    this.mode = t.NORMAL;
    this.scale.set(a, a, 1);
    this.rotation.y = Math.PI;
    this.container = null;
    this.originalRaycast = this.raycast;
    this.HANDLER_FOCUS = null;
    this.material.side = e.DoubleSide;
    this.material.depthTest = false;
    this.material.transparent = true;
    this.material.opacity = 0;
    this.scaleUpAnimation = new r.Tween();
    this.scaleDownAnimation = new r.Tween();
    c = function(d) {
      if (this.material) {
        var b2 = d.image.width / d.image.height, c2 = new e.Vector3();
        d.image.width = d.image.naturalWidth || 64;
        d.image.height = d.image.naturalHeight || 64;
        this.scale.set(b2 * a, a, 1);
        c2.copy(this.scale);
        this.scaleUpAnimation = new r.Tween(this.scale).to({ x: 1.3 * c2.x, y: 1.3 * c2.y }, 500).easing(r.Easing.Elastic.Out);
        this.scaleDownAnimation = new r.Tween(this.scale).to({ x: c2.x, y: c2.y }, 500).easing(r.Easing.Elastic.Out);
        this.material.map = d;
        this.material.needsUpdate = true;
      }
    }.bind(this);
    this.showAnimation = new r.Tween(this.material).to({ opacity: 1 }, 500).onStart(this.enableRaycast.bind(this, true)).easing(r.Easing.Quartic.Out);
    this.hideAnimation = new r.Tween(this.material).to({ opacity: 0 }, 500).onStart(this.enableRaycast.bind(this, false)).easing(r.Easing.Quartic.Out);
    this.addEventListener("click", this.onClick);
    this.addEventListener("hover", this.onHover);
    this.addEventListener("hoverenter", this.onHoverStart);
    this.addEventListener(
      "hoverleave",
      this.onHoverEnd
    );
    this.addEventListener("panolens-dual-eye-effect", this.onDualEyeEffect);
    this.addEventListener("panolens-container", this.setContainer.bind(this));
    this.addEventListener("dismiss", this.onDismiss);
    this.addEventListener("panolens-infospot-focus", this.setFocusMethod);
    N.load(b, c);
  }
  function I(a) {
    a || console.warn("PANOLENS.Widget: No container specified");
    e.EventDispatcher.call(this);
    this.DEFAULT_TRANSITION = "all 0.27s ease";
    this.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
    this.PREVENT_EVENT_HANDLER = function(a2) {
      a2.preventDefault();
      a2.stopPropagation();
    };
    this.container = a;
    this.mask = this.activeSubMenu = this.activeMainItem = this.mainMenu = this.settingElement = this.videoElement = this.fullscreenElement = this.barElement = null;
  }
  function n(a, b) {
    e.Mesh.call(this, a, b);
    this.type = "panorama";
    this.ImageQualityLow = 1;
    this.ImageQualityFair = 2;
    this.ImageQualityMedium = 3;
    this.ImageQualityHigh = 4;
    this.ImageQualitySuperHigh = 5;
    this.animationDuration = 1e3;
    this.defaultInfospotSize = 350;
    this.container = void 0;
    this.loaded = false;
    this.linkedSpots = [];
    this.isInfospotVisible = false;
    this.linkingImageScale = this.linkingImageURL = void 0;
    this.material.side = e.BackSide;
    this.material.opacity = 0;
    this.scale.x *= -1;
    this.renderOrder = -1;
    this.active = false;
    this.infospotAnimation = new r.Tween(this).to({}, this.animationDuration / 2);
    this.addEventListener("load", this.fadeIn.bind(this));
    this.addEventListener("panolens-container", this.setContainer.bind(this));
    this.addEventListener("click", this.onClick.bind(this));
    this.setupTransitions();
  }
  function y(a, b, c) {
    b = b || new e.SphereBufferGeometry(5e3, 60, 40);
    c = c || new e.MeshBasicMaterial({ opacity: 0, transparent: true });
    n.call(this, b, c);
    this.src = a;
    this.radius = 5e3;
  }
  function W() {
    var a = new e.BufferGeometry(), b = new e.MeshBasicMaterial({ color: 0, opacity: 0, transparent: true });
    a.addAttribute("position", new e.BufferAttribute(new Float32Array(), 1));
    n.call(this, a, b);
  }
  function F(a) {
    a = void 0 === a ? [] : a;
    var b = Object.assign({}, e.ShaderLib.cube), c = new e.BoxBufferGeometry(1e4, 1e4, 1e4);
    b = new e.ShaderMaterial({
      fragmentShader: b.fragmentShader,
      vertexShader: b.vertexShader,
      uniforms: b.uniforms,
      side: e.BackSide,
      transparent: true
    });
    n.call(this, c, b);
    this.images = a;
    this.edgeLength = 1e4;
    this.material.uniforms.opacity.value = 0;
  }
  function O() {
    for (var a = [], b = 0; 6 > b; b++)
      a.push(u.WhiteTile);
    F.call(this, a);
  }
  function B(a, b) {
    b = void 0 === b ? {} : b;
    var c = new e.SphereBufferGeometry(5e3, 60, 40), d = new e.MeshBasicMaterial({ opacity: 0, transparent: true });
    n.call(this, c, d);
    this.src = a;
    this.options = {
      videoElement: document.createElement("video"),
      loop: true,
      muted: true,
      autoplay: false,
      playsinline: true,
      crossOrigin: "anonymous"
    };
    Object.assign(this.options, b);
    this.videoElement = this.options.videoElement;
    this.videoProgress = 0;
    this.radius = 5e3;
    this.addEventListener("leave", this.pauseVideo.bind(this));
    this.addEventListener("enter-fade-start", this.resumeVideoProgress.bind(this));
    this.addEventListener("video-toggle", this.toggleVideo.bind(this));
    this.addEventListener("video-time", this.setVideoCurrentTime.bind(this));
  }
  function P(a) {
    this._parameters = a = void 0 === a ? {} : a;
    this._panoId = this._zoom = null;
    this._panoClient = new google.maps.StreetViewService();
    this._total = this._count = 0;
    this._canvas = [];
    this._ctx = [];
    this._hc = this._wc = 0;
    this.result = null;
    this.rotation = 0;
    this.copyright = "";
    this.onPanoramaLoad = this.onSizeChange = null;
    this.levelsW = [1, 2, 4, 7, 13, 26];
    this.levelsH = [1, 1, 2, 4, 7, 13];
    this.widths = [416, 832, 1664, 3328, 6656, 13312];
    this.heights = [416, 416, 832, 1664, 3328, 6656];
    this.maxH = this.maxW = 6656;
    var b;
    try {
      var c = document.createElement("canvas");
      (b = c.getContext("experimental-webgl")) || (b = c.getContext("webgl"));
    } catch (d) {
    }
    this.maxW = Math.max(b.getParameter(b.MAX_TEXTURE_SIZE), this.maxW);
    this.maxH = Math.max(b.getParameter(b.MAX_TEXTURE_SIZE), this.maxH);
  }
  function Z(a, b) {
    y.call(this);
    this.panoId = a;
    this.gsvLoader = null;
    this.loadRequested = false;
    this.setupGoogleMapAPI(b);
  }
  function C(a, b, c, d) {
    c = void 0 === c ? 1e4 : c;
    d = void 0 === d ? 0.5 : d;
    "image" === (void 0 === a ? "image" : a) && y.call(this, b, this.createGeometry(c, d), this.createMaterial(c));
    this.size = c;
    this.ratio = d;
    this.EPS = 1e-6;
    this.frameId = null;
    this.dragging = false;
    this.userMouse = new e.Vector2();
    this.quatA = new e.Quaternion();
    this.quatB = new e.Quaternion();
    this.quatCur = new e.Quaternion();
    this.quatSlerp = new e.Quaternion();
    this.vectorX = new e.Vector3(1, 0, 0);
    this.vectorY = new e.Vector3(0, 1, 0);
    this.addEventListener("window-resize", this.onWindowResize);
  }
  function aa(a, b, c) {
    C.call(this, "image", a, b, c);
  }
  function J(a) {
    var b = new e.SphereBufferGeometry(5e3, 60, 40), c = new e.MeshBasicMaterial({ visible: false });
    n.call(this, b, c);
    this.media = new S(a);
    this.radius = 5e3;
    this.addEventListener("enter", this.start.bind(this));
    this.addEventListener("leave", this.stop.bind(this));
    this.addEventListener("panolens-container", this.onPanolensContainer.bind(this));
    this.addEventListener("panolens-scene", this.onPanolensScene.bind(this));
  }
  function ba(a, b) {
    function c(a2) {
      Q = false;
      K = L = 0;
      if (false !== f.enabled) {
        a2.preventDefault();
        if (a2.button === f.mouseButtons.ORBIT) {
          if (true === f.noRotate)
            return;
          x = w.ROTATE;
          D.set(a2.clientX, a2.clientY);
        } else if (a2.button === f.mouseButtons.ZOOM) {
          if (true === f.noZoom)
            return;
          x = w.DOLLY;
          y2.set(a2.clientX, a2.clientY);
        } else if (a2.button === f.mouseButtons.PAN) {
          if (true === f.noPan)
            return;
          x = w.PAN;
          n2.set(a2.clientX, a2.clientY);
        }
        x !== w.NONE && (document.addEventListener("mousemove", d, false), document.addEventListener("mouseup", g, false), f.dispatchEvent(O2));
        f.update();
      }
    }
    function d(a2) {
      if (false !== f.enabled) {
        a2.preventDefault();
        var d2 = f.domElement === document ? f.domElement.body : f.domElement;
        if (x === w.ROTATE) {
          if (true === f.noRotate)
            return;
          h2.set(a2.clientX, a2.clientY);
          r2.subVectors(h2, D);
          f.rotateLeft(2 * Math.PI * r2.x / d2.clientWidth * f.rotateSpeed);
          f.rotateUp(2 * Math.PI * r2.y / d2.clientHeight * f.rotateSpeed);
          D.copy(h2);
          G && (K = a2.clientX - G.clientX, L = a2.clientY - G.clientY);
          G = a2;
        } else if (x === w.DOLLY) {
          if (true === f.noZoom)
            return;
          z2.set(a2.clientX, a2.clientY);
          T.subVectors(z2, y2);
          0 < T.y ? f.dollyIn() : 0 > T.y && f.dollyOut();
          y2.copy(z2);
        } else if (x === w.PAN) {
          if (true === f.noPan)
            return;
          U.set(a2.clientX, a2.clientY);
          t2.subVectors(U, n2);
          f.pan(t2.x, t2.y);
          n2.copy(U);
        }
        x !== w.NONE && f.update();
      }
    }
    function g() {
      Q = true;
      G = void 0;
      false !== f.enabled && (document.removeEventListener("mousemove", d, false), document.removeEventListener("mouseup", g, false), f.dispatchEvent(P2), x = w.NONE);
    }
    function k(a2) {
      if (false !== f.enabled && true !== f.noZoom && x === w.NONE) {
        a2.preventDefault();
        a2.stopPropagation();
        var d2 = 0;
        void 0 !== a2.wheelDelta ? d2 = a2.wheelDelta : void 0 !== a2.detail && (d2 = -a2.detail);
        0 < d2 ? (f.object.fov = f.object.fov < f.maxFov ? f.object.fov + 1 : f.maxFov, f.object.updateProjectionMatrix()) : 0 > d2 && (f.object.fov = f.object.fov > f.minFov ? f.object.fov - 1 : f.minFov, f.object.updateProjectionMatrix());
        f.update();
        f.dispatchEvent(V);
        f.dispatchEvent(O2);
        f.dispatchEvent(P2);
      }
    }
    function p(a2) {
      switch (a2.keyCode) {
        case f.keys.UP:
          I2 = false;
          break;
        case f.keys.BOTTOM:
          J2 = false;
          break;
        case f.keys.LEFT:
          X = false;
          break;
        case f.keys.RIGHT:
          Y = false;
      }
    }
    function m(a2) {
      if (false !== f.enabled && true !== f.noKeys && true !== f.noRotate) {
        switch (a2.keyCode) {
          case f.keys.UP:
            I2 = true;
            break;
          case f.keys.BOTTOM:
            J2 = true;
            break;
          case f.keys.LEFT:
            X = true;
            break;
          case f.keys.RIGHT:
            Y = true;
        }
        if (I2 || J2 || X || Y)
          Q = true, I2 && (L = -f.rotateSpeed * f.momentumKeydownFactor), J2 && (L = f.rotateSpeed * f.momentumKeydownFactor), X && (K = -f.rotateSpeed * f.momentumKeydownFactor), Y && (K = f.rotateSpeed * f.momentumKeydownFactor);
      }
    }
    function l(a2) {
      Q = false;
      K = L = 0;
      if (false !== f.enabled) {
        switch (a2.touches.length) {
          case 1:
            if (true === f.noRotate)
              return;
            x = w.TOUCH_ROTATE;
            D.set(a2.touches[0].pageX, a2.touches[0].pageY);
            break;
          case 2:
            if (true === f.noZoom)
              return;
            x = w.TOUCH_DOLLY;
            var d2 = a2.touches[0].pageX - a2.touches[1].pageX;
            a2 = a2.touches[0].pageY - a2.touches[1].pageY;
            y2.set(0, Math.sqrt(d2 * d2 + a2 * a2));
            break;
          case 3:
            if (true === f.noPan)
              return;
            x = w.TOUCH_PAN;
            n2.set(a2.touches[0].pageX, a2.touches[0].pageY);
            break;
          default:
            x = w.NONE;
        }
        x !== w.NONE && f.dispatchEvent(O2);
      }
    }
    function v(a2) {
      if (false !== f.enabled) {
        a2.preventDefault();
        a2.stopPropagation();
        var d2 = f.domElement === document ? f.domElement.body : f.domElement;
        switch (a2.touches.length) {
          case 1:
            if (true === f.noRotate)
              break;
            if (x !== w.TOUCH_ROTATE)
              break;
            h2.set(a2.touches[0].pageX, a2.touches[0].pageY);
            r2.subVectors(h2, D);
            f.rotateLeft(2 * Math.PI * r2.x / d2.clientWidth * f.rotateSpeed);
            f.rotateUp(2 * Math.PI * r2.y / d2.clientHeight * f.rotateSpeed);
            D.copy(h2);
            G && (K = a2.touches[0].pageX - G.pageX, L = a2.touches[0].pageY - G.pageY);
            G = { pageX: a2.touches[0].pageX, pageY: a2.touches[0].pageY };
            f.update();
            break;
          case 2:
            if (true === f.noZoom)
              break;
            if (x !== w.TOUCH_DOLLY)
              break;
            d2 = a2.touches[0].pageX - a2.touches[1].pageX;
            a2 = a2.touches[0].pageY - a2.touches[1].pageY;
            z2.set(0, Math.sqrt(d2 * d2 + a2 * a2));
            T.subVectors(z2, y2);
            0 > T.y ? (f.object.fov = f.object.fov < f.maxFov ? f.object.fov + 1 : f.maxFov, f.object.updateProjectionMatrix()) : 0 < T.y && (f.object.fov = f.object.fov > f.minFov ? f.object.fov - 1 : f.minFov, f.object.updateProjectionMatrix());
            y2.copy(z2);
            f.update();
            f.dispatchEvent(V);
            break;
          case 3:
            if (true === f.noPan)
              break;
            if (x !== w.TOUCH_PAN)
              break;
            U.set(a2.touches[0].pageX, a2.touches[0].pageY);
            t2.subVectors(U, n2);
            f.pan(t2.x, t2.y);
            n2.copy(U);
            f.update();
            break;
          default:
            x = w.NONE;
        }
      }
    }
    function q() {
      Q = true;
      G = void 0;
      false !== f.enabled && (f.dispatchEvent(P2), x = w.NONE);
    }
    this.object = a;
    this.domElement = void 0 !== b ? b : document;
    this.frameId = null;
    this.enabled = true;
    this.center = this.target = new e.Vector3();
    this.noZoom = false;
    this.zoomSpeed = 1;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.noRotate = false;
    this.rotateSpeed = -0.15;
    this.noPan = true;
    this.keyPanSpeed = 7;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.momentumDampingFactor = 0.9;
    this.momentumScalingFactor = -5e-3;
    this.momentumKeydownFactor = 20;
    this.minFov = 30;
    this.maxFov = 120;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.noKeys = false;
    this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
    this.mouseButtons = { ORBIT: e.MOUSE.LEFT, ZOOM: e.MOUSE.MIDDLE, PAN: e.MOUSE.RIGHT };
    var f = this, D = new e.Vector2(), h2 = new e.Vector2(), r2 = new e.Vector2(), n2 = new e.Vector2(), U = new e.Vector2(), t2 = new e.Vector2(), u2 = new e.Vector3(), A = new e.Vector3(), y2 = new e.Vector2(), z2 = new e.Vector2(), T = new e.Vector2(), R = 0, H = 0, B2 = 0, C2 = 0, E2 = 1, F2 = new e.Vector3(), M2 = new e.Vector3(), N2 = new e.Quaternion(), K = 0, L = 0, G, Q = false, I2, J2, X, Y, w = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 }, x = w.NONE;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    var S2 = new e.Quaternion().setFromUnitVectors(a.up, new e.Vector3(0, 1, 0)), W2 = S2.clone().inverse(), V = { type: "change" }, O2 = { type: "start" }, P2 = { type: "end" };
    this.setLastQuaternion = function(a2) {
      N2.copy(a2);
      f.object.quaternion.copy(a2);
    };
    this.getLastPosition = function() {
      return M2;
    };
    this.rotateLeft = function(a2) {
      void 0 === a2 && (a2 = 2 * Math.PI / 60 / 60 * f.autoRotateSpeed);
      C2 -= a2;
    };
    this.rotateUp = function(a2) {
      void 0 === a2 && (a2 = 2 * Math.PI / 60 / 60 * f.autoRotateSpeed);
      B2 -= a2;
    };
    this.panLeft = function(a2) {
      var d2 = this.object.matrix.elements;
      u2.set(d2[0], d2[1], d2[2]);
      u2.multiplyScalar(-a2);
      F2.add(u2);
    };
    this.panUp = function(a2) {
      var d2 = this.object.matrix.elements;
      u2.set(d2[4], d2[5], d2[6]);
      u2.multiplyScalar(a2);
      F2.add(u2);
    };
    this.pan = function(a2, d2) {
      var b2 = f.domElement === document ? f.domElement.body : f.domElement;
      if (f.object instanceof e.PerspectiveCamera) {
        var c2 = f.object.position.clone().sub(f.target).length();
        c2 *= Math.tan(f.object.fov / 2 * Math.PI / 180);
        f.panLeft(2 * a2 * c2 / b2.clientHeight);
        f.panUp(2 * d2 * c2 / b2.clientHeight);
      } else
        f.object instanceof e.OrthographicCamera ? (f.panLeft(a2 * (f.object.right - f.object.left) / b2.clientWidth), f.panUp(d2 * (f.object.top - f.object.bottom) / b2.clientHeight)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
    };
    this.momentum = function() {
      Q && (1e-4 > Math.abs(K) && 1e-4 > Math.abs(L) ? Q = false : (L *= this.momentumDampingFactor, K *= this.momentumDampingFactor, C2 -= this.momentumScalingFactor * K, B2 -= this.momentumScalingFactor * L));
    };
    this.dollyIn = function(a2) {
      void 0 === a2 && (a2 = Math.pow(0.95, f.zoomSpeed));
      f.object instanceof e.PerspectiveCamera ? E2 /= a2 : f.object instanceof e.OrthographicCamera ? (f.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * a2)), f.object.updateProjectionMatrix(), f.dispatchEvent(V)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
    };
    this.dollyOut = function(a2) {
      void 0 === a2 && (a2 = Math.pow(0.95, f.zoomSpeed));
      f.object instanceof e.PerspectiveCamera ? E2 *= a2 : f.object instanceof e.OrthographicCamera ? (f.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / a2)), f.object.updateProjectionMatrix(), f.dispatchEvent(V)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
    };
    this.update = function(a2) {
      var d2 = this.object.position;
      A.copy(d2).sub(this.target);
      A.applyQuaternion(S2);
      R = Math.atan2(
        A.x,
        A.z
      );
      H = Math.atan2(Math.sqrt(A.x * A.x + A.z * A.z), A.y);
      this.autoRotate && x === w.NONE && this.rotateLeft(2 * Math.PI / 60 / 60 * f.autoRotateSpeed);
      this.momentum();
      R += C2;
      H += B2;
      R = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, R));
      H = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, H));
      H = Math.max(1e-7, Math.min(Math.PI - 1e-7, H));
      var b2 = A.length() * E2;
      b2 = Math.max(this.minDistance, Math.min(this.maxDistance, b2));
      this.target.add(F2);
      A.x = b2 * Math.sin(H) * Math.sin(R);
      A.y = b2 * Math.cos(H);
      A.z = b2 * Math.sin(H) * Math.cos(R);
      A.applyQuaternion(W2);
      d2.copy(this.target).add(A);
      this.object.lookAt(this.target);
      B2 = C2 = 0;
      E2 = 1;
      F2.set(0, 0, 0);
      if (1e-7 < M2.distanceToSquared(this.object.position) || 1e-7 < 8 * (1 - N2.dot(this.object.quaternion)))
        true !== a2 && this.dispatchEvent(V), M2.copy(this.object.position), N2.copy(this.object.quaternion);
    };
    this.reset = function() {
      x = w.NONE;
      this.target.copy(this.target0);
      this.object.position.copy(this.position0);
      this.object.zoom = this.zoom0;
      this.object.updateProjectionMatrix();
      this.dispatchEvent(V);
      this.update();
    };
    this.getPolarAngle = function() {
      return H;
    };
    this.getAzimuthalAngle = function() {
      return R;
    };
    this.dispose = function() {
      this.domElement.removeEventListener("mousedown", c);
      this.domElement.removeEventListener("mousewheel", k);
      this.domElement.removeEventListener("DOMMouseScroll", k);
      this.domElement.removeEventListener("touchstart", l);
      this.domElement.removeEventListener("touchend", q);
      this.domElement.removeEventListener("touchmove", v);
      window.removeEventListener("keyup", p);
      window.removeEventListener("keydown", m);
    };
    this.domElement.addEventListener(
      "mousedown",
      c,
      { passive: false }
    );
    this.domElement.addEventListener("mousewheel", k, { passive: false });
    this.domElement.addEventListener("DOMMouseScroll", k, { passive: false });
    this.domElement.addEventListener("touchstart", l, { passive: false });
    this.domElement.addEventListener("touchend", q, { passive: false });
    this.domElement.addEventListener("touchmove", v, { passive: false });
    window.addEventListener("keyup", p, { passive: false });
    window.addEventListener("keydown", m, { passive: false });
    this.update();
  }
  function ca(a, b) {
    var c = this, d = { type: "change" }, g = 0, k = 0, p = 0, m = 0;
    this.camera = a;
    this.camera.rotation.reorder("YXZ");
    this.domElement = void 0 !== b ? b : document;
    this.enabled = true;
    this.deviceOrientation = {};
    this.alphaOffsetAngle = this.alpha = this.screenOrientation = 0;
    var l = function(a2) {
      c.deviceOrientation = a2;
    }, v = function() {
      c.screenOrientation = window.orientation || 0;
    }, q = function(a2) {
      a2.preventDefault();
      a2.stopPropagation();
      p = a2.touches[0].pageX;
      m = a2.touches[0].pageY;
    }, f = function(a2) {
      a2.preventDefault();
      a2.stopPropagation();
      g += e.Math.degToRad((a2.touches[0].pageX - p) / 4);
      k += e.Math.degToRad((m - a2.touches[0].pageY) / 4);
      c.updateAlphaOffsetAngle(g);
      p = a2.touches[0].pageX;
      m = a2.touches[0].pageY;
    };
    this.connect = function() {
      v();
      window.addEventListener("orientationchange", v, { passive: true });
      window.addEventListener("deviceorientation", l, { passive: true });
      window.addEventListener("deviceorientation", this.update.bind(this), { passive: true });
      c.domElement.addEventListener("touchstart", q, { passive: false });
      c.domElement.addEventListener("touchmove", f, { passive: false });
      c.enabled = true;
    };
    this.disconnect = function() {
      window.removeEventListener(
        "orientationchange",
        v,
        false
      );
      window.removeEventListener("deviceorientation", l, false);
      window.removeEventListener("deviceorientation", this.update.bind(this), false);
      c.domElement.removeEventListener("touchstart", q, false);
      c.domElement.removeEventListener("touchmove", f, false);
      c.enabled = false;
    };
    this.update = function(a2) {
      if (false !== c.enabled) {
        var b2 = c.deviceOrientation.alpha ? e.Math.degToRad(c.deviceOrientation.alpha) + c.alphaOffsetAngle : 0, g2 = c.deviceOrientation.beta ? e.Math.degToRad(c.deviceOrientation.beta) : 0, f2 = c.deviceOrientation.gamma ? e.Math.degToRad(c.deviceOrientation.gamma) : 0, p2 = c.screenOrientation ? e.Math.degToRad(c.screenOrientation) : 0, m2 = c.camera.quaternion, l2 = new e.Vector3(0, 0, 1), D = new e.Euler(), q2 = new e.Quaternion(), v2 = new e.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)), h2 = new e.Quaternion(), r2 = new e.Quaternion();
        if (0 == c.screenOrientation) {
          var n2 = new e.Vector3(1, 0, 0);
          h2.setFromAxisAngle(n2, -k);
        } else
          180 == c.screenOrientation ? (n2 = new e.Vector3(1, 0, 0), h2.setFromAxisAngle(n2, k)) : 90 == c.screenOrientation ? (n2 = new e.Vector3(0, 1, 0), h2.setFromAxisAngle(n2, k)) : -90 == c.screenOrientation && (n2 = new e.Vector3(
            0,
            1,
            0
          ), h2.setFromAxisAngle(n2, -k));
        v2.multiply(h2);
        v2.multiply(r2);
        D.set(g2, b2, -f2, "YXZ");
        m2.setFromEuler(D);
        m2.multiply(v2);
        m2.multiply(q2.setFromAxisAngle(l2, -p2));
        c.alpha = b2;
        true !== a2 && c.dispatchEvent(d);
      }
    };
    this.updateAlphaOffsetAngle = function(a2) {
      this.alphaOffsetAngle = a2;
      this.update();
    };
    this.dispose = function() {
      this.disconnect();
    };
    this.connect();
  }
  function ha(a) {
    var b = new e.OrthographicCamera(-1, 1, 1, -1, 0, 1), c = new e.Scene(), d = new e.StereoCamera();
    d.aspect = 0.5;
    var g = new e.WebGLRenderTarget(512, 512, {
      minFilter: e.LinearFilter,
      magFilter: e.NearestFilter,
      format: e.RGBAFormat
    });
    g.scissorTest = true;
    g.texture.generateMipmaps = false;
    var k = new e.Vector2(0.441, 0.156), p = new e.PlaneBufferGeometry(1, 1, 10, 20).removeAttribute("normal").toNonIndexed(), m = p.attributes.position.array, l = p.attributes.uv.array;
    p.attributes.position.count *= 2;
    p.attributes.uv.count *= 2;
    var v = new Float32Array(2 * m.length);
    v.set(m);
    v.set(m, m.length);
    var q = new Float32Array(2 * l.length);
    q.set(l);
    q.set(l, l.length);
    l = new e.Vector2();
    m = m.length / 3;
    for (var f = 0, D = v.length / 3; f < D; f++) {
      l.x = v[3 * f];
      l.y = v[3 * f + 1];
      var h2 = l.dot(l);
      h2 = 1.5 + (k.x + k.y * h2) * h2;
      var n2 = f < m ? 0 : 1;
      v[3 * f] = l.x / h2 * 1.5 - 0.5 + n2;
      v[3 * f + 1] = l.y / h2 * 3;
      q[2 * f] = 0.5 * (q[2 * f] + n2);
    }
    p.attributes.position.array = v;
    p.attributes.uv.array = q;
    k = new e.MeshBasicMaterial({ map: g.texture });
    p = new e.Mesh(p, k);
    c.add(p);
    this.setSize = function(d2, b2) {
      a.setSize(d2, b2);
      var c2 = a.getPixelRatio();
      g.setSize(d2 * c2, b2 * c2);
    };
    this.render = function(k2, f2) {
      k2.updateMatrixWorld();
      null === f2.parent && f2.updateMatrixWorld();
      d.update(f2);
      f2 = g.width / 2;
      var e2 = g.height;
      a.autoClear && a.clear();
      g.scissor.set(0, 0, f2, e2);
      g.viewport.set(
        0,
        0,
        f2,
        e2
      );
      a.setRenderTarget(g);
      a.render(k2, d.cameraL);
      a.clearDepth();
      g.scissor.set(f2, 0, f2, e2);
      g.viewport.set(f2, 0, f2, e2);
      a.setRenderTarget(g);
      a.render(k2, d.cameraR);
      a.clearDepth();
      a.setRenderTarget(null);
      a.render(c, b);
    };
  }
  function da(a) {
    a = a || {};
    a.controlBar = void 0 !== a.controlBar ? a.controlBar : true;
    a.controlButtons = a.controlButtons || ["fullscreen", "setting", "video"];
    a.autoHideControlBar = void 0 !== a.autoHideControlBar ? a.autoHideControlBar : false;
    a.autoHideInfospot = void 0 !== a.autoHideInfospot ? a.autoHideInfospot : true;
    a.horizontalView = void 0 !== a.horizontalView ? a.horizontalView : false;
    a.clickTolerance = a.clickTolerance || 10;
    a.cameraFov = a.cameraFov || 60;
    a.reverseDragging = a.reverseDragging || false;
    a.enableReticle = a.enableReticle || false;
    a.dwellTime = a.dwellTime || 1500;
    a.autoReticleSelect = void 0 !== a.autoReticleSelect ? a.autoReticleSelect : true;
    a.viewIndicator = void 0 !== a.viewIndicator ? a.viewIndicator : false;
    a.indicatorSize = a.indicatorSize || 30;
    a.output = a.output ? a.output : "none";
    a.autoRotate = a.autoRotate || false;
    a.autoRotateSpeed = a.autoRotateSpeed || 2;
    a.autoRotateActivationDuration = a.autoRotateActivationDuration || 5e3;
    this.options = a;
    if (a.container) {
      var b = a.container;
      b._width = b.clientWidth;
      b._height = b.clientHeight;
    } else
      b = document.createElement("div"), b.classList.add("panolens-container"), b.style.width = "100%", b.style.height = "100%", b._width = window.innerWidth, b._height = window.innerHeight, document.body.appendChild(b);
    this.container = b;
    this.camera = a.camera || new e.PerspectiveCamera(this.options.cameraFov, this.container.clientWidth / this.container.clientHeight, 1, 1e4);
    this.scene = a.scene || new e.Scene();
    this.renderer = a.renderer || new e.WebGLRenderer({ alpha: true, antialias: false });
    this.sceneReticle = new e.Scene();
    this.viewIndicatorSize = this.options.indicatorSize;
    this.reticle = {};
    this.tempEnableReticle = this.options.enableReticle;
    this.mode = t.NORMAL;
    this.pressObject = this.pressEntityObject = this.infospot = this.hoverObject = this.widget = this.panorama = null;
    this.raycaster = new e.Raycaster();
    this.raycasterPoint = new e.Vector2();
    this.userMouse = new e.Vector2();
    this.updateCallbacks = [];
    this.requestAnimationId = null;
    this.cameraFrustum = new e.Frustum();
    this.cameraViewProjectionMatrix = new e.Matrix4();
    this.outputDivElement = this.autoRotateRequestId = null;
    this.touchSupported = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
    this.HANDLER_MOUSE_DOWN = this.onMouseDown.bind(this);
    this.HANDLER_MOUSE_UP = this.onMouseUp.bind(this);
    this.HANDLER_MOUSE_MOVE = this.onMouseMove.bind(this);
    this.HANDLER_WINDOW_RESIZE = this.onWindowResize.bind(this);
    this.HANDLER_KEY_DOWN = this.onKeyDown.bind(this);
    this.HANDLER_KEY_UP = this.onKeyUp.bind(this);
    this.HANDLER_TAP = this.onTap.bind(this, { clientX: this.container.clientWidth / 2, clientY: this.container.clientHeight / 2 });
    this.OUTPUT_INFOSPOT = false;
    this.tweenLeftAnimation = new r.Tween();
    this.tweenUpAnimation = new r.Tween();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0, 0);
    this.renderer.autoClear = false;
    this.renderer.domElement.classList.add("panolens-canvas");
    this.renderer.domElement.style.display = "block";
    this.container.style.backgroundColor = "#000";
    this.container.appendChild(this.renderer.domElement);
    this.OrbitControls = new ba(this.camera, this.container);
    this.OrbitControls.id = "orbit";
    this.OrbitControls.minDistance = 1;
    this.OrbitControls.noPan = true;
    this.OrbitControls.autoRotate = this.options.autoRotate;
    this.OrbitControls.autoRotateSpeed = this.options.autoRotateSpeed;
    this.DeviceOrientationControls = new ca(this.camera, this.container);
    this.DeviceOrientationControls.id = "device-orientation";
    this.DeviceOrientationControls.enabled = false;
    this.camera.position.z = 1;
    this.options.passiveRendering && console.warn("passiveRendering is now deprecated");
    this.controls = [this.OrbitControls, this.DeviceOrientationControls];
    this.control = this.OrbitControls;
    this.CardboardEffect = new ha(this.renderer);
    this.CardboardEffect.setSize(this.container.clientWidth, this.container.clientHeight);
    this.StereoEffect = new ia(this.renderer);
    this.StereoEffect.setSize(this.container.clientWidth, this.container.clientHeight);
    this.effect = this.CardboardEffect;
    this.addReticle();
    this.options.horizontalView && (this.OrbitControls.minPolarAngle = Math.PI / 2, this.OrbitControls.maxPolarAngle = Math.PI / 2);
    false !== this.options.controlBar && this.addDefaultControlBar(this.options.controlButtons);
    this.options.viewIndicator && this.addViewIndicator();
    this.options.reverseDragging && this.reverseDraggingDirection();
    this.options.enableReticle ? this.enableReticleControl() : this.registerMouseAndTouchEvents();
    "overlay" === this.options.output && this.addOutputElement();
    this.registerEventListeners();
    this.animate.call(this);
  }
  var ja = "^0.105.2".replace(/[^0-9.]/g, ""), E = { ORBIT: 0, DEVICEORIENTATION: 1 }, t = { UNKNOWN: 0, NORMAL: 1, CARDBOARD: 2, STEREO: 3 }, u = {
    Info: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADBklEQVR42u2bP08UQRiHnzFaSYCI/xoksdBIqGwIiYWRUBISExpCQ0ej38FWOmlIKKhoMPEbaCxsrrHiYrQgOSlQEaICrT+LHSPZzNzt3s3c3Hn7lHvLzvv82L2dm30XKioqKgYY062BJF0HpoA7wARwBbhsPz4DjoEG8AnYNcZ8Sx1Op8IXJM1KWpdUV3nq9m9nJV1I7VNGfEzSM0mNNqR9NOwxx1L7NRMflbQm6SSgeJ4TO8Zoat+8/LKkg4jieQ4kLaf2RtKwpJ0uiufZkTScSn5S0l5C+b/sSZrstvyMpKPU5uc4kjTTjkvpeYCkaeA1/+7hvcIZMGuMqUULQNIU8Aa4ltrWwyHwyBizGzwASSPAe+B2assW7AH3jTE/i+xcZoa12Qfy2Bo3i+5cKABl99zF1GYlWFTBeULLS0DZrOsDcDNggTXgc27bLWA64BhfgHvGmB8dHUXZ1DM0S45xliKMs9bKr+klIOkqsBrwv9JtVq1DewEAT4Ch1BYdMGQdygeg7Df4SmqDAKyoyXpCszPgITCeuvoAjFuX0gE8jljUdv7bCtiOOJ7XpdUZ8L/gdXHOA5QtYH5NXXVgbrgWWn1nwFTqaiPgdPIFcDd1tRFwOl307DwRuZgXwLvctgfA04hjOp18AcReZ6sZY16e3yDpUuQxnU6+S2AkcjEpcDr1zxOXSPgCKLSa0mc4nXwB/EpdbQScTr4AGqmrjYDTyRfAx9TVRsDp5Aug8LJyH+F0cgZg58z11BUHpO5ruGh2G3ybuuqAeF2aBfAqddUB8bq0OgP2U1cegH3aOQOMMb+BrdTVB2DLupQLwLIOnKY26IBT6+ClaQDGmO/ARmqLDtiwDn7HVkcY+EdjNoTlCI+tYhO2iUppm6HKslPUq2qQKHpUe8AFsjaUXuUQWCgqXyoAG8IuME/WkNRrnAHzZfqDSgdgQ6gBc2Td3b3CMTBXtkOsIzTIjZLnQhjcVtlcEIPZLJ0LoVvt8s/Va+3yuSAG84UJRxB98cpM9dJURUVFxSDzBxKde4Lk3/h2AAAAAElFTkSuQmCC",
    Arrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADPklEQVR42u2bMUscQRiG30/SRaJEI1ZKUiRErNIELRUbQYSAnX8hpVUgkDYp0wgWVjYW+QcJaQzYpLojJIXhtDDEKBpj65ti58ixmdmb2ZvZ7+T2AUHudmfmeXf2bnb3O6CmpqZmgJGqOiI5AWAWwEMA0wDuArht3r4CcAagBeAbgIaI/NQOp1fhIZKLJN+SbDKcptl3keSQtk+I+BjJVyRbJaRdtEybY9p+ReKjJN+QvIwonufS9DGq7ZuXXyd5nFA8zzHJdW1vkLxDcrdC8Ty7JO9oyc+QPFCUb3NAcqZq+TmSp9rmHZySnCvjErwOIPkUwHv8+w7vF64ALIrIfrIASM4C+ADgnratgxMACyLSiB4AyREAnwE80LbswgGAJyJy4bNxyApr6wbIw4xxy3djrwCYfeeuaZsFsEbPdULXU4DZqusLgMkEA21P05EEbf8A8FhEzos28pkBLxLKL5s/r/M1kEkz9vKQHGeatf05yfmOfubNa7G5JDle5NhtBjwHMBz5yFwAWBaRT+0XzP8pZsKwcQiH2fX8Ycojb+kzxUw4ZJn7CSQXqpRPHMKCq7+iZJ71Mvdy/DftXSQ6HcJdSDaqPPKW/mPOBO+lcbvzCU35RCFM2PpwnQKzZQfdgfe0dxH5dLA6uQJ4pC2fIASrkyuA6X6QjxyC1ckVQNn7bNHlI4ZgdXIFUObiJJl8pBCsTjGfuIwA2Cv4FN7xbYjkjqsRAHuIePXoCiDF1Zk2VidXAL+1R5sAq5MrgJb2aBNgdXIF8FV7tAmwOrkCCFs73wysTtYATHFCU3vEEWm6Ci6KvgY/ao86Ik6XogDeaY86Ik6XbjPgSHvkEThCwQy45XpDRK5JbgN4GWkgUyR9H65MRQxgW0SunZ5FezK7pfwd8e8MV8UfAPdF5Jdrg8JrAbPjprZFD2wWyQP6j8ZSEufRmGlgQ9umBBvd5IOgbjFUKLu+XnWBhG+rpsFVZGUo/coJgFVf+aAATAgNACvICpL6jSsAKyH1QcEBmBD2ASwhq+7uF84ALIVWiPUEB7lQsiOEwS2VzQUxmMXSuRCqKpd/zX4rl88FMZg/mLAEcSN+MlP/aKqmpqZmkPkL0hSjwOpNKxwAAAAASUVORK5CYII=",
    FullscreenEnter: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik03IDE0SDV2NWg1di0ySDd2LTN6bS0yLTRoMlY3aDNWNUg1djV6bTEyIDdoLTN2Mmg1di01aC0ydjN6TTE0IDV2MmgzdjNoMlY1aC01eiIvPgo8L3N2Zz4=",
    FullscreenLeave: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE0SDE5VjE2SDE2VjE5SDE0VjE0TTUsMTRIMTBWMTlIOFYxNkg1VjE0TTgsNUgxMFYxMEg1VjhIOFY1TTE5LDhWMTBIMTRWNUgxNlY4SDE5WiIgLz48L3N2Zz4=",
    VideoPlay: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTgsNS4xNFYxOS4xNEwxOSwxMi4xNEw4LDUuMTRaIiAvPjwvc3ZnPg==",
    VideoPause: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE5LjE0SDE4VjUuMTRIMTRNNiwxOS4xNEgxMFY1LjE0SDZWMTkuMTRaIiAvPjwvc3ZnPg==",
    WhiteTile: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAtiABQAAACRQTFRFAAAAAAAABgYGBwcHHh4eKysrx8fHy8vLzMzM7OzsAAAABgYG+q7SZgAAAAp0Uk5TAP7+/v7+/v7+/iJx/a8AAAOwSURBVHja7d0hbsNAEAVQo6SFI6XEcALDcgNLvUBvEBQVhpkWVYWlhSsVFS7t5QIshRt695lEASZP+8c7a1kzDL1fz+/zyuvzp6FbvoddrL6uDd1yGZ5eXldeb18N3fIx7A+58prmhm65DfvDcd0952lu6JabFbD/zVprZj1lzcys+fj9z8xTZtbT8rv8yWlu6BYAIgAAAAAAAAAAAABAM6QXEAEAAAAAAAAAgJ2gnaAIiIA3Q2qAGgAAAAAAAAAAAAAAAAAAAAAAAAAAQJsADkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBVlfAcZ3aeZobusUKMGBhV6KUElHGKBERJR6/fxExRkQZl9/lT8S1oVsuhqyYMmPKjCkzvfcCpsxohrwY0Q06EAEAAAAAAAAAAACgGdILiAAAAAAAAAAAwE7QTlAERMCbITVADQAAAAAAAAAAAAAAAAAAAAAAAAAAwKmwQ1ERAAAAAACPQY9BERABERABERABERABERABAAAAAAAAAICdoJ2gCIiAT2bUADVADRABEQAAQBFUBEVABERgEyvAlJm+V4ApM6bMmDJjyowpM6bMdN0LmDKjGfJiRDfoQAQAAAAAAAAAAACAZkgvIAIAAAAAAAAAADtBO0EREAFvhtQANQAAAAAAAAAAAAAAAAAAAAAAAAAAAKfCDkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBTawAU2b6XgGmzJgyY8qMKTOmzJgy03UvYMqMZsiLEd2gAxEAAAAAAAAAAAAAmiG9gAgAAAAAAAAAAOwE7QRFQAS8GVID1AAAAAAAAAAAAAAAAAAAAAAAAAAAAJwKOxQVAQAAAADwGPQYFAEREAEREAEREAEREAERAAAAAAAAAADYCdoJioAI+GRGDVAD1AAREAEAABRBRVAEREAENrECTJnpewWYMmPKjCkzpsyYMmPKTNe9gCkzmiEvRnSDDkQAAAAAAAAAAAAAaIb0AiIAAAAAAAAAALATtBMUARHwZkgNUAMAAAAAAAAAAAAAAAAAAAAAAAAAAHAq7FBUBAAAAADAY9BjUAREQAREQAREQAREQAREAAAAAAAAAABgJ2gnKAIi4JMZNUANUANEQAQAAFAEFUEREAER2MQKMGWm7xVgyowpM50PWen9ugNGXz1XaocAFgAAAABJRU5ErkJggg==",
    Setting: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADn0lEQVR42u2bzUsVURjGnyO6CPzAMnTjppAo3LTwH1CqTfaxbeOiRS37A0wXtROFVi1aRBs3LWohSIGbQAQXViBGRhG0UIRKUCpK7q/FnOB2uc6cOXNmRnGe3eW+H8/7zLln3vNxpQoVKlQ4wjBFJAFOSRqX1O7osivpvjHmU1nChBZglvSYLYJbS0EanCvIJzWK+gnsyH34/8OuMaYjb265jwCgz6N4SWq3vodbAEmnS/KtBDgoAgyU5BteAOAkMAPcBroc7PskDWfgN+wyDwBdltMMcDI3tYBnde/pHeARMNTErgd4APzweP834oeN1dMkz5DlsFNn/yyv4kdiSK4At4AO4CqwGaDwRmza2B0210qM7YhrXU59ANAq6bWkwQTTn5KO5fIE0uVYlXTeGLOXFMx1DrjlULwKKN41x6DlnIjEEQCckPRe0okCiguJr5LOGGO+xhm5jICJQ1i8LOeJJKPYEQAMKvrtt5ZdjSf2FM0Fq/sZJI2A6UNcvCz36TiDfUcAcE1SPu/U6Mm8k/TFfu6XdFb5iX3dGPM8lQfwNod3+TowBnQ3yddtv1vPIe+b1JIBiwEJ1IAJ208k5W21trWA+V/5CHAcmAtU/A2P/DcCiTAHHE8tgCVhgLvAXgYCk17Jo/yTGfLuWe7Zd72AC8CWB4n3OAz7mLytNkZabAEXMhfeQKYfWEpJZCxA3rGUOZeA/qDF15FpAz47EvlNk9neI2e3jeWCz0BbmvipNkSMMX8kuSZYM8Z8zyqAjbHmaN5mOeYjgIXrU93MWrxHrNQjrqiDkQMLHwG+OdqF3NN3jeXKzU8AoF1SzdH8XKhJUO7HZDXLMbwAwICkJUULFxe0SbqSVQAbw3Xi7Ze0ZLmGAzAKbHs0JGU1QtvAaIjCW4B7ZOvJy2qFa5a730RPtBiaz0CgnkiZi6F5fBZDVMvho7EhcuS3xJJ2hV9IupgTqaLw0hhzab8vq23xOG/r+LDsKjLgYVzxUnU0ltwK2wDezUyJmEwqXgp/PL4rvxthaeCSI+zxuA10J8ZkWdJNSb2SLkvayKHwDRu71+ZajrG941J8agALDQ3GU/a/IvMkYCPzmCbtLNEVmacNtgs5iP9fYVNEV1Q6Hez7yNZSL+J2SarTcpqiyV2iUkG0IvPFvbz5FbEn+KEk3wMjwMeSfCsBXFBdly9CAPk9ydyffpECuB5tZfVJjaKWueOSfinln6YK4lahQoUKRxd/AcRPGTcQCAUQAAAAAElFTkSuQmCC",
    ChevronRight: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNTksMTYuNThMMTMuMTcsMTJMOC41OSw3LjQxTDEwLDZMMTYsMTJMMTAsMThMOC41OSwxNi41OFoiIC8+PC9zdmc+",
    Check: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WiIgLz48L3N2Zz4=",
    ViewIndicator: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0idmlldy1pbmRpY2F0b3IiIGhlaWdodD0iMzAiIHdpZHRoPSIzMCIgdmlld0JveD0iLTIuNSAtMSAzMCAzMCI+Cgk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7ZmlsbDpub25lO30uc3Qxe3N0cm9rZS13aWR0aDo2O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCTwvc3R5bGU+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNIDEyLjUgMCBBIDEyLjUgMTIuNSAwIDAgMCAtMTIuNSAwIEEgMTIuNSAxMi41IDAgMCAwIDEyLjUgMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMywxNS41KSI+PC9wYXRoPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0gMTMgMCBMIDEwIDIgTCAxNiAyIFoiPjwvcGF0aD4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNIDIgMCBBIDIgMiAwIDAgMCAtMiAwIEEgMiAyIDAgMCAwIDIgMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMywxNS41KSI+PC9wYXRoPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGlkPSJpbmRpY2F0b3IiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTMsMTUuNSkiPjwvcGF0aD4KCTwvZz4KPC9zdmc+"
  }, ea = { load: function(a, b, c, d) {
    b = void 0 === b ? function() {
    } : b;
    c = void 0 === c ? function() {
    } : c;
    d = void 0 === d ? function() {
    } : d;
    e.Cache.enabled = true;
    var g, k, p, m;
    for (m in u)
      u.hasOwnProperty(m) && a === u[m] && (g = m);
    var l = e.Cache.get(g ? g : a);
    if (void 0 !== l)
      return b && setTimeout(function() {
        c({ loaded: 1, total: 1 });
        b(l);
      }, 0), l;
    var h2 = window.URL || window.webkitURL;
    var q = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
    e.Cache.add(g ? g : a, q);
    var f = function() {
      h2.revokeObjectURL(q.src);
      b(q);
    };
    if (0 === a.indexOf("data:"))
      return q.addEventListener(
        "load",
        f,
        false
      ), q.src = a, q;
    q.crossOrigin = void 0 !== this.crossOrigin ? this.crossOrigin : "";
    g = new window.XMLHttpRequest();
    g.open("GET", a, true);
    g.responseType = "arraybuffer";
    g.addEventListener("error", d);
    g.addEventListener("progress", function(a2) {
      if (a2) {
        var d2 = a2.loaded, b2 = a2.total;
        a2.lengthComputable && c({ loaded: d2, total: b2 });
      }
    });
    g.addEventListener("loadend", function(a2) {
      a2 && (k = new Uint8Array(a2.currentTarget.response), p = new window.Blob([k]), q.addEventListener("load", f, false), q.src = h2.createObjectURL(p));
    });
    g.send(null);
  } }, N = { load: function(a, b, c, d) {
    b = void 0 === b ? function() {
    } : b;
    var g = new e.Texture();
    ea.load(a, function(d2) {
      g.image = d2;
      d2 = 0 < a.search(/\.(jpg|jpeg)$/) || 0 === a.search(/^data:image\/jpeg/);
      g.format = d2 ? e.RGBFormat : e.RGBAFormat;
      g.needsUpdate = true;
      b(g);
    }, c, d);
    return g;
  } }, fa = { load: function(a, b, c, d) {
    b = void 0 === b ? function() {
    } : b;
    c = void 0 === c ? function() {
    } : c;
    var g;
    var k = new e.CubeTexture([]);
    var p = 0;
    var m = {};
    var l = {};
    a.map(function(a2, e2) {
      ea.load(a2, function(a3) {
        k.images[e2] = a3;
        p++;
        6 === p && (k.needsUpdate = true, b(k));
      }, function(a3) {
        m[e2] = { loaded: a3.loaded, total: a3.total };
        l.loaded = 0;
        g = l.total = 0;
        for (var d2 in m)
          g++, l.loaded += m[d2].loaded, l.total += m[d2].total;
        6 > g && (l.total = l.total / g * 6);
        c(l);
      }, d);
    });
    return k;
  } };
  S.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), { setContainer: function(a) {
    this.container = a;
  }, setScene: function(a) {
    this.scene = a;
  }, enumerateDevices: function() {
    var a = this.devices, b = new Promise(function(b2) {
      b2(a);
    });
    return 0 < a.length ? b : window.navigator.mediaDevices.enumerateDevices();
  }, switchNextVideoDevice: function() {
    var a = this.stop.bind(this), b = this.start.bind(this), c = this.setVideDeviceIndex.bind(this), d = this.videoDeviceIndex;
    this.getDevices("video").then(function(g) {
      a();
      d++;
      d >= g.length ? (c(0), d--) : c(d);
      b(g[d]);
    });
  }, getDevices: function(a) {
    a = void 0 === a ? "video" : a;
    var b = this.devices;
    return this.enumerateDevices().then(function(a2) {
      return a2.map(function(a3) {
        b.includes(a3) || b.push(a3);
        return a3;
      });
    }).then(function(b2) {
      var d = new RegExp(a, "i");
      return b2.filter(function(a2) {
        return d.test(a2.kind);
      });
    });
  }, getUserMedia: function(a) {
    var b = this.setMediaStream.bind(this), c = this.playVideo.bind(this);
    return window.navigator.mediaDevices.getUserMedia(a).then(b).then(c).catch(function(a2) {
      console.warn("PANOLENS.Media: " + a2);
    });
  }, setVideDeviceIndex: function(a) {
    this.videoDeviceIndex = a;
  }, start: function(a) {
    var b = this.constraints, c = this.getUserMedia.bind(this);
    this.element = this.createVideoElement();
    return this.getDevices().then(function(d) {
      if (!d || 0 === d.length)
        throw Error("no video device found");
      b.video.deviceId = (a || d[0]).deviceId;
      return c(b);
    });
  }, stop: function() {
    var a = this.stream;
    a && a.active && (a.getTracks()[0].stop(), window.removeEventListener("resize", this.onWindowResize.bind(this)), this.stream = this.element = null);
  }, setMediaStream: function(a) {
    this.stream = a;
    this.element.srcObject = a;
    this.scene && (this.scene.background = this.createVideoTexture());
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }, playVideo: function() {
    var a = this.element;
    a && (a.play(), this.dispatchEvent({ type: "play" }));
  }, pauseVideo: function() {
    var a = this.element;
    a && (a.pause(), this.dispatchEvent({ type: "pause" }));
  }, createVideoTexture: function() {
    var a = this.element, b = new e.VideoTexture(a);
    b.generateMipmaps = false;
    b.minFilter = e.LinearFilter;
    b.magFilter = e.LinearFilter;
    b.format = e.RGBFormat;
    b.center.set(0.5, 0.5);
    a.addEventListener("canplay", this.onWindowResize.bind(this));
    return b;
  }, createVideoElement: function() {
    var a = this.dispatchEvent.bind(this), b = document.createElement("video");
    b.setAttribute("autoplay", "");
    b.setAttribute("muted", "");
    b.setAttribute("playsinline", "");
    b.style.position = "absolute";
    b.style.top = "0";
    b.style.left = "0";
    b.style.width = "100%";
    b.style.height = "100%";
    b.style.objectPosition = "center";
    b.style.objectFit = "cover";
    b.style.display = this.scene ? "none" : "";
    b.addEventListener("canplay", function() {
      return a({ type: "canplay" });
    });
    return b;
  }, onWindowResize: function() {
    if (this.element && this.element.videoWidth && this.element.videoHeight && this.scene) {
      var a = this.container, b = a.clientWidth;
      a = a.clientHeight;
      var c = this.scene.background, d = this.element;
      d = d.videoHeight / d.videoWidth * (this.container ? b / a : 1) * this.ratioScalar;
      b > a ? c.repeat.set(d, 1) : c.repeat.set(1, 1 / d);
    }
  } });
  M.prototype = Object.assign(Object.create(e.Sprite.prototype), {
    constructor: M,
    setColor: function(a) {
      this.material.color.copy(a instanceof e.Color ? a : new e.Color(a));
    },
    createCanvasTexture: function(a) {
      a = new e.CanvasTexture(a);
      a.minFilter = e.LinearFilter;
      a.magFilter = e.LinearFilter;
      a.generateMipmaps = false;
      return a;
    },
    createCanvas: function() {
      var a = document.createElement("canvas"), b = a.getContext("2d"), c = this.dpr;
      a.width = 32 * c;
      a.height = 32 * c;
      b.scale(c, c);
      b.shadowBlur = 5;
      b.shadowColor = "rgba(200,200,200,0.9)";
      return { canvas: a, context: b };
    },
    updateCanvasArcByProgress: function(a) {
      var b = this.context, c = this.canvasWidth, d = this.canvasHeight, g = this.material, k = this.dpr, e2 = a * Math.PI * 2, m = this.color.getStyle(), l = 0.5 * c / k;
      k = 0.5 * d / k;
      b.clearRect(0, 0, c, d);
      b.beginPath();
      0 === a ? (b.arc(l, k, c / 16, 0, 2 * Math.PI), b.fillStyle = m, b.fill()) : (b.arc(l, k, c / 4 - 3, -Math.PI / 2, -Math.PI / 2 + e2), b.strokeStyle = m, b.lineWidth = 3, b.stroke());
      b.closePath();
      g.map.needsUpdate = true;
    },
    ripple: function() {
      var a = this, b = this.context, c = this.canvasWidth, d = this.canvasHeight, g = this.material, k = this.rippleDuration, e2 = performance.now(), m = this.color, l = this.dpr, h2 = 0.5 * c / l, q = 0.5 * d / l, f = function() {
        var p = window.requestAnimationFrame(f), v = (performance.now() - e2) / k, n2 = 0 < 1 - v ? 1 - v : 0, r2 = v * c * 0.5 / l;
        b.clearRect(0, 0, c, d);
        b.beginPath();
        b.arc(h2, q, r2, 0, 2 * Math.PI);
        b.fillStyle = "rgba(" + 255 * m.r + ", " + 255 * m.g + ", " + 255 * m.b + ", " + n2 + ")";
        b.fill();
        b.closePath();
        1 <= v && (window.cancelAnimationFrame(p), a.updateCanvasArcByProgress(0), a.dispatchEvent({ type: "reticle-ripple-end" }));
        g.map.needsUpdate = true;
      };
      this.dispatchEvent({ type: "reticle-ripple-start" });
      f();
    },
    show: function() {
      this.visible = true;
    },
    hide: function() {
      this.visible = false;
    },
    start: function(a) {
      this.autoSelect && (this.dispatchEvent({ type: "reticle-start" }), this.startTimestamp = performance.now(), this.callback = a, this.update());
    },
    end: function() {
      this.startTimestamp && (window.cancelAnimationFrame(this.timerId), this.updateCanvasArcByProgress(0), this.startTimestamp = this.timerId = this.callback = null, this.dispatchEvent({ type: "reticle-end" }));
    },
    update: function() {
      this.timerId = window.requestAnimationFrame(this.update.bind(this));
      var a = (performance.now() - this.startTimestamp) / this.dwellTime;
      this.updateCanvasArcByProgress(a);
      this.dispatchEvent({ type: "reticle-update", progress: a });
      1 <= a && (window.cancelAnimationFrame(this.timerId), this.callback && this.callback(), this.end(), this.ripple());
    }
  });
  var r = function(a, b) {
    return b = { exports: {} }, a(b, b.exports), b.exports;
  }(function(a, b) {
    b = function() {
      this._tweens = {};
      this._tweensAddedDuringUpdate = {};
    };
    b.prototype = {
      getAll: function() {
        return Object.keys(this._tweens).map(function(a2) {
          return this._tweens[a2];
        }.bind(this));
      },
      removeAll: function() {
        this._tweens = {};
      },
      add: function(a2) {
        this._tweens[a2.getId()] = a2;
        this._tweensAddedDuringUpdate[a2.getId()] = a2;
      },
      remove: function(a2) {
        delete this._tweens[a2.getId()];
        delete this._tweensAddedDuringUpdate[a2.getId()];
      },
      update: function(a2, b2) {
        var d = Object.keys(this._tweens);
        if (0 === d.length)
          return false;
        for (a2 = void 0 !== a2 ? a2 : c.now(); 0 < d.length; ) {
          this._tweensAddedDuringUpdate = {};
          for (var g = 0; g < d.length; g++) {
            var e2 = this._tweens[d[g]];
            e2 && false === e2.update(a2) && (e2._isPlaying = false, b2 || delete this._tweens[d[g]]);
          }
          d = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
      }
    };
    var c = new b();
    c.Group = b;
    c._nextId = 0;
    c.nextId = function() {
      return c._nextId++;
    };
    c.now = "undefined" === typeof self && "undefined" !== typeof process && process.hrtime ? function() {
      var a2 = process.hrtime();
      return 1e3 * a2[0] + a2[1] / 1e6;
    } : "undefined" !== typeof self && void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now.bind(self.performance) : void 0 !== Date.now ? Date.now : function() {
      return new Date().getTime();
    };
    c.Tween = function(a2, b2) {
      this._object = a2;
      this._valuesStart = {};
      this._valuesEnd = {};
      this._valuesStartRepeat = {};
      this._duration = 1e3;
      this._repeat = 0;
      this._repeatDelayTime = void 0;
      this._reversed = this._isPlaying = this._yoyo = false;
      this._delayTime = 0;
      this._startTime = null;
      this._easingFunction = c.Easing.Linear.None;
      this._interpolationFunction = c.Interpolation.Linear;
      this._chainedTweens = [];
      this._onStartCallback = null;
      this._onStartCallbackFired = false;
      this._onStopCallback = this._onCompleteCallback = this._onRepeatCallback = this._onUpdateCallback = null;
      this._group = b2 || c;
      this._id = c.nextId();
    };
    c.Tween.prototype = {
      getId: function() {
        return this._id;
      },
      isPlaying: function() {
        return this._isPlaying;
      },
      to: function(a2, b2) {
        this._valuesEnd = Object.create(a2);
        void 0 !== b2 && (this._duration = b2);
        return this;
      },
      duration: function(a2) {
        this._duration = a2;
        return this;
      },
      start: function(a2) {
        this._group.add(this);
        this._isPlaying = true;
        this._onStartCallbackFired = false;
        this._startTime = void 0 !== a2 ? "string" === typeof a2 ? c.now() + parseFloat(a2) : a2 : c.now();
        this._startTime += this._delayTime;
        for (var d in this._valuesEnd) {
          if (this._valuesEnd[d] instanceof Array) {
            if (0 === this._valuesEnd[d].length)
              continue;
            this._valuesEnd[d] = [this._object[d]].concat(this._valuesEnd[d]);
          }
          void 0 !== this._object[d] && (this._valuesStart[d] = this._object[d], false === this._valuesStart[d] instanceof Array && (this._valuesStart[d] *= 1), this._valuesStartRepeat[d] = this._valuesStart[d] || 0);
        }
        return this;
      },
      stop: function() {
        if (!this._isPlaying)
          return this;
        this._group.remove(this);
        this._isPlaying = false;
        null !== this._onStopCallback && this._onStopCallback(this._object);
        this.stopChainedTweens();
        return this;
      },
      end: function() {
        this.update(Infinity);
        return this;
      },
      stopChainedTweens: function() {
        for (var a2 = 0, b2 = this._chainedTweens.length; a2 < b2; a2++)
          this._chainedTweens[a2].stop();
      },
      group: function(a2) {
        this._group = a2;
        return this;
      },
      delay: function(a2) {
        this._delayTime = a2;
        return this;
      },
      repeat: function(a2) {
        this._repeat = a2;
        return this;
      },
      repeatDelay: function(a2) {
        this._repeatDelayTime = a2;
        return this;
      },
      yoyo: function(a2) {
        this._yoyo = a2;
        return this;
      },
      easing: function(a2) {
        this._easingFunction = a2;
        return this;
      },
      interpolation: function(a2) {
        this._interpolationFunction = a2;
        return this;
      },
      chain: function() {
        this._chainedTweens = arguments;
        return this;
      },
      onStart: function(a2) {
        this._onStartCallback = a2;
        return this;
      },
      onUpdate: function(a2) {
        this._onUpdateCallback = a2;
        return this;
      },
      onRepeat: function(a2) {
        this._onRepeatCallback = a2;
        return this;
      },
      onComplete: function(a2) {
        this._onCompleteCallback = a2;
        return this;
      },
      onStop: function(a2) {
        this._onStopCallback = a2;
        return this;
      },
      update: function(a2) {
        var b2;
        if (a2 < this._startTime)
          return true;
        false === this._onStartCallbackFired && (null !== this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = true);
        var d = (a2 - this._startTime) / this._duration;
        d = 0 === this._duration || 1 < d ? 1 : d;
        var c2 = this._easingFunction(d);
        for (b2 in this._valuesEnd)
          if (void 0 !== this._valuesStart[b2]) {
            var e2 = this._valuesStart[b2] || 0, l = this._valuesEnd[b2];
            l instanceof Array ? this._object[b2] = this._interpolationFunction(l, c2) : ("string" === typeof l && (l = "+" === l.charAt(0) || "-" === l.charAt(0) ? e2 + parseFloat(l) : parseFloat(l)), "number" === typeof l && (this._object[b2] = e2 + (l - e2) * c2));
          }
        null !== this._onUpdateCallback && this._onUpdateCallback(this._object, d);
        if (1 === d)
          if (0 < this._repeat) {
            isFinite(this._repeat) && this._repeat--;
            for (b2 in this._valuesStartRepeat)
              "string" === typeof this._valuesEnd[b2] && (this._valuesStartRepeat[b2] += parseFloat(this._valuesEnd[b2])), this._yoyo && (d = this._valuesStartRepeat[b2], this._valuesStartRepeat[b2] = this._valuesEnd[b2], this._valuesEnd[b2] = d), this._valuesStart[b2] = this._valuesStartRepeat[b2];
            this._yoyo && (this._reversed = !this._reversed);
            this._startTime = void 0 !== this._repeatDelayTime ? a2 + this._repeatDelayTime : a2 + this._delayTime;
            null !== this._onRepeatCallback && this._onRepeatCallback(this._object);
          } else {
            null !== this._onCompleteCallback && this._onCompleteCallback(this._object);
            a2 = 0;
            for (b2 = this._chainedTweens.length; a2 < b2; a2++)
              this._chainedTweens[a2].start(this._startTime + this._duration);
            return false;
          }
        return true;
      }
    };
    c.Easing = { Linear: { None: function(a2) {
      return a2;
    } }, Quadratic: { In: function(a2) {
      return a2 * a2;
    }, Out: function(a2) {
      return a2 * (2 - a2);
    }, InOut: function(a2) {
      return 1 > (a2 *= 2) ? 0.5 * a2 * a2 : -0.5 * (--a2 * (a2 - 2) - 1);
    } }, Cubic: { In: function(a2) {
      return a2 * a2 * a2;
    }, Out: function(a2) {
      return --a2 * a2 * a2 + 1;
    }, InOut: function(a2) {
      return 1 > (a2 *= 2) ? 0.5 * a2 * a2 * a2 : 0.5 * ((a2 -= 2) * a2 * a2 + 2);
    } }, Quartic: { In: function(a2) {
      return a2 * a2 * a2 * a2;
    }, Out: function(a2) {
      return 1 - --a2 * a2 * a2 * a2;
    }, InOut: function(a2) {
      return 1 > (a2 *= 2) ? 0.5 * a2 * a2 * a2 * a2 : -0.5 * ((a2 -= 2) * a2 * a2 * a2 - 2);
    } }, Quintic: { In: function(a2) {
      return a2 * a2 * a2 * a2 * a2;
    }, Out: function(a2) {
      return --a2 * a2 * a2 * a2 * a2 + 1;
    }, InOut: function(a2) {
      return 1 > (a2 *= 2) ? 0.5 * a2 * a2 * a2 * a2 * a2 : 0.5 * ((a2 -= 2) * a2 * a2 * a2 * a2 + 2);
    } }, Sinusoidal: { In: function(a2) {
      return 1 - Math.cos(a2 * Math.PI / 2);
    }, Out: function(a2) {
      return Math.sin(a2 * Math.PI / 2);
    }, InOut: function(a2) {
      return 0.5 * (1 - Math.cos(Math.PI * a2));
    } }, Exponential: { In: function(a2) {
      return 0 === a2 ? 0 : Math.pow(1024, a2 - 1);
    }, Out: function(a2) {
      return 1 === a2 ? 1 : 1 - Math.pow(2, -10 * a2);
    }, InOut: function(a2) {
      return 0 === a2 ? 0 : 1 === a2 ? 1 : 1 > (a2 *= 2) ? 0.5 * Math.pow(1024, a2 - 1) : 0.5 * (-Math.pow(2, -10 * (a2 - 1)) + 2);
    } }, Circular: { In: function(a2) {
      return 1 - Math.sqrt(1 - a2 * a2);
    }, Out: function(a2) {
      return Math.sqrt(1 - --a2 * a2);
    }, InOut: function(a2) {
      return 1 > (a2 *= 2) ? -0.5 * (Math.sqrt(1 - a2 * a2) - 1) : 0.5 * (Math.sqrt(1 - (a2 -= 2) * a2) + 1);
    } }, Elastic: { In: function(a2) {
      return 0 === a2 ? 0 : 1 === a2 ? 1 : -Math.pow(2, 10 * (a2 - 1)) * Math.sin(5 * (a2 - 1.1) * Math.PI);
    }, Out: function(a2) {
      return 0 === a2 ? 0 : 1 === a2 ? 1 : Math.pow(2, -10 * a2) * Math.sin(5 * (a2 - 0.1) * Math.PI) + 1;
    }, InOut: function(a2) {
      if (0 === a2)
        return 0;
      if (1 === a2)
        return 1;
      a2 *= 2;
      return 1 > a2 ? -0.5 * Math.pow(2, 10 * (a2 - 1)) * Math.sin(5 * (a2 - 1.1) * Math.PI) : 0.5 * Math.pow(2, -10 * (a2 - 1)) * Math.sin(5 * (a2 - 1.1) * Math.PI) + 1;
    } }, Back: { In: function(a2) {
      return a2 * a2 * (2.70158 * a2 - 1.70158);
    }, Out: function(a2) {
      return --a2 * a2 * (2.70158 * a2 + 1.70158) + 1;
    }, InOut: function(a2) {
      return 1 > (a2 *= 2) ? 0.5 * a2 * a2 * (3.5949095 * a2 - 2.5949095) : 0.5 * ((a2 -= 2) * a2 * (3.5949095 * a2 + 2.5949095) + 2);
    } }, Bounce: { In: function(a2) {
      return 1 - c.Easing.Bounce.Out(1 - a2);
    }, Out: function(a2) {
      return a2 < 1 / 2.75 ? 7.5625 * a2 * a2 : a2 < 2 / 2.75 ? 7.5625 * (a2 -= 1.5 / 2.75) * a2 + 0.75 : a2 < 2.5 / 2.75 ? 7.5625 * (a2 -= 2.25 / 2.75) * a2 + 0.9375 : 7.5625 * (a2 -= 2.625 / 2.75) * a2 + 0.984375;
    }, InOut: function(a2) {
      return 0.5 > a2 ? 0.5 * c.Easing.Bounce.In(2 * a2) : 0.5 * c.Easing.Bounce.Out(2 * a2 - 1) + 0.5;
    } } };
    c.Interpolation = { Linear: function(a2, b2) {
      var d = a2.length - 1, g = d * b2, e2 = Math.floor(g), l = c.Interpolation.Utils.Linear;
      return 0 > b2 ? l(a2[0], a2[1], g) : 1 < b2 ? l(a2[d], a2[d - 1], d - g) : l(a2[e2], a2[e2 + 1 > d ? d : e2 + 1], g - e2);
    }, Bezier: function(a2, b2) {
      for (var d = 0, g = a2.length - 1, e2 = Math.pow, l = c.Interpolation.Utils.Bernstein, h2 = 0; h2 <= g; h2++)
        d += e2(1 - b2, g - h2) * e2(b2, h2) * a2[h2] * l(g, h2);
      return d;
    }, CatmullRom: function(a2, b2) {
      var d = a2.length - 1, g = d * b2, e2 = Math.floor(g), l = c.Interpolation.Utils.CatmullRom;
      return a2[0] === a2[d] ? (0 > b2 && (e2 = Math.floor(g = d * (1 + b2))), l(a2[(e2 - 1 + d) % d], a2[e2], a2[(e2 + 1) % d], a2[(e2 + 2) % d], g - e2)) : 0 > b2 ? a2[0] - (l(a2[0], a2[0], a2[1], a2[1], -g) - a2[0]) : 1 < b2 ? a2[d] - (l(a2[d], a2[d], a2[d - 1], a2[d - 1], g - d) - a2[d]) : l(a2[e2 ? e2 - 1 : 0], a2[e2], a2[d < e2 + 1 ? d : e2 + 1], a2[d < e2 + 2 ? d : e2 + 2], g - e2);
    }, Utils: { Linear: function(a2, b2, c2) {
      return (b2 - a2) * c2 + a2;
    }, Bernstein: function(a2, b2) {
      var d = c.Interpolation.Utils.Factorial;
      return d(a2) / d(b2) / d(a2 - b2);
    }, Factorial: function() {
      var a2 = [1];
      return function(b2) {
        var c2 = 1;
        if (a2[b2])
          return a2[b2];
        for (var d = b2; 1 < d; d--)
          c2 *= d;
        return a2[b2] = c2;
      };
    }(), CatmullRom: function(a2, b2, c2, e2, m) {
      a2 = 0.5 * (c2 - a2);
      e2 = 0.5 * (e2 - b2);
      var d = m * m;
      return (2 * b2 - 2 * c2 + a2 + e2) * m * d + (-3 * b2 + 3 * c2 - 2 * a2 - e2) * d + a2 * m + b2;
    } } };
    a.exports = c;
  });
  z.prototype = Object.assign(Object.create(e.Sprite.prototype), {
    constructor: z,
    setContainer: function(a) {
      if (a instanceof HTMLElement)
        var b = a;
      else
        a && a.container && (b = a.container);
      b && this.element && b.appendChild(this.element);
      this.container = b;
    },
    getContainer: function() {
      return this.container;
    },
    onClick: function(a) {
      this.element && this.getContainer() && (this.onHoverStart(a), this.lockHoverElement());
    },
    onDismiss: function() {
      this.element && (this.unlockHoverElement(), this.onHoverEnd());
    },
    onHover: function() {
    },
    onHoverStart: function(a) {
      if (this.getContainer()) {
        var b = this.cursorStyle || (this.mode === t.NORMAL ? "pointer" : "default"), c = this.scaleDownAnimation, d = this.scaleUpAnimation, g = this.element;
        this.isHovering = true;
        this.container.style.cursor = b;
        this.animated && (c.stop(), d.start());
        g && 0 <= a.mouseEvent.clientX && 0 <= a.mouseEvent.clientY && (a = g.left, b = g.right, c = g.style, this.mode === t.CARDBOARD || this.mode === t.STEREO ? (c.display = "none", a.style.display = "block", b.style.display = "block", g._width = a.clientWidth, g._height = a.clientHeight) : (c.display = "block", a && (a.style.display = "none"), b && (b.style.display = "none"), g._width = g.clientWidth, g._height = g.clientHeight));
      }
    },
    onHoverEnd: function() {
      if (this.getContainer()) {
        var a = this.scaleDownAnimation, b = this.scaleUpAnimation, c = this.element;
        this.isHovering = false;
        this.container.style.cursor = "default";
        this.animated && (b.stop(), a.start());
        c && !this.element.locked && (a = c.left, b = c.right, c.style.display = "none", a && (a.style.display = "none"), b && (b.style.display = "none"), this.unlockHoverElement());
      }
    },
    onDualEyeEffect: function(a) {
      if (this.getContainer()) {
        this.mode = a.mode;
        a = this.element;
        var b = this.container.clientWidth / 2;
        var c = this.container.clientHeight / 2;
        a && (a.left || a.right || (a.left = a.cloneNode(true), a.right = a.cloneNode(true)), this.mode === t.CARDBOARD || this.mode === t.STEREO ? (a.left.style.display = a.style.display, a.right.style.display = a.style.display, a.style.display = "none") : (a.style.display = a.left.style.display, a.left.style.display = "none", a.right.style.display = "none"), this.translateElement(b, c), this.container.appendChild(a.left), this.container.appendChild(a.right));
      }
    },
    translateElement: function(a, b) {
      if (this.element._width && this.element._height && this.getContainer()) {
        var c = this.container;
        var d = this.element;
        var g = d._width / 2;
        var e2 = d._height / 2;
        var p = void 0 !== d.verticalDelta ? d.verticalDelta : 40;
        var m = a - g;
        var l = b - e2 - p;
        this.mode !== t.CARDBOARD && this.mode !== t.STEREO || !d.left || !d.right || a === c.clientWidth / 2 && b === c.clientHeight / 2 ? this.setElementStyle("transform", d, "translate(" + m + "px, " + l + "px)") : (m = c.clientWidth / 4 - g + (a - c.clientWidth / 2), l = c.clientHeight / 2 - e2 - p + (b - c.clientHeight / 2), this.setElementStyle("transform", d.left, "translate(" + m + "px, " + l + "px)"), m += c.clientWidth / 2, this.setElementStyle("transform", d.right, "translate(" + m + "px, " + l + "px)"));
      }
    },
    setElementStyle: function(a, b, c) {
      b = b.style;
      "transform" === a && (b.webkitTransform = b.msTransform = b.transform = c);
    },
    setText: function(a) {
      this.element && (this.element.textContent = a);
    },
    setCursorHoverStyle: function(a) {
      this.cursorStyle = a;
    },
    addHoverText: function(a, b) {
      b = void 0 === b ? 40 : b;
      this.element || (this.element = document.createElement("div"), this.element.style.display = "none", this.element.style.color = "#fff", this.element.style.top = 0, this.element.style.maxWidth = "50%", this.element.style.maxHeight = "50%", this.element.style.textShadow = "0 0 3px #000000", this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif', this.element.style.position = "absolute", this.element.classList.add("panolens-infospot"), this.element.verticalDelta = b);
      this.setText(a);
    },
    addHoverElement: function(a, b) {
      b = void 0 === b ? 40 : b;
      this.element || (this.element = a.cloneNode(true), this.element.style.display = "none", this.element.style.top = 0, this.element.style.position = "absolute", this.element.classList.add("panolens-infospot"), this.element.verticalDelta = b);
    },
    removeHoverElement: function() {
      this.element && (this.element.left && (this.container.removeChild(this.element.left), this.element.left = null), this.element.right && (this.container.removeChild(this.element.right), this.element.right = null), this.container.removeChild(this.element), this.element = null);
    },
    lockHoverElement: function() {
      this.element && (this.element.locked = true);
    },
    unlockHoverElement: function() {
      this.element && (this.element.locked = false);
    },
    enableRaycast: function(a) {
      this.raycast = void 0 === a || a ? this.originalRaycast : function() {
      };
    },
    show: function(a) {
      a = void 0 === a ? 0 : a;
      var b = this.hideAnimation, c = this.showAnimation, d = this.material;
      this.animated ? (b.stop(), c.delay(a).start()) : (this.enableRaycast(true), d.opacity = 1);
    },
    hide: function(a) {
      a = void 0 === a ? 0 : a;
      var b = this.hideAnimation, c = this.showAnimation, d = this.material;
      this.animated ? (c.stop(), b.delay(a).start()) : (this.enableRaycast(false), d.opacity = 0);
    },
    setFocusMethod: function(a) {
      a && (this.HANDLER_FOCUS = a.method);
    },
    focus: function(a, b) {
      this.HANDLER_FOCUS && (this.HANDLER_FOCUS(this.position, a, b), this.onDismiss());
    },
    dispose: function() {
      var a = this.geometry, b = this.material, c = b.map;
      this.removeHoverElement();
      this.parent && this.parent.remove(this);
      c && (c.dispose(), b.map = null);
      a && (a.dispose(), this.geometry = null);
      b && (b.dispose(), this.material = null);
    }
  });
  I.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), {
    constructor: I,
    addControlBar: function() {
      if (this.container) {
        var a = this, b, c;
        var d = document.createElement("div");
        d.style.width = "100%";
        d.style.height = "44px";
        d.style.float = "left";
        d.style.transform = d.style.webkitTransform = d.style.msTransform = "translateY(-100%)";
        d.style.background = "-webkit-linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))";
        d.style.background = "-moz-linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))";
        d.style.background = "-o-linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))";
        d.style.background = "-ms-linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))";
        d.style.background = "linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))";
        d.style.transition = this.DEFAULT_TRANSITION;
        d.style.pointerEvents = "none";
        d.isHidden = false;
        d.toggle = function() {
          d.isHidden = !d.isHidden;
          b = d.isHidden ? "translateY(0)" : "translateY(-100%)";
          c = d.isHidden ? 0 : 1;
          d.style.transform = d.style.webkitTransform = d.style.msTransform = b;
          d.style.opacity = c;
        };
        var g = this.createDefaultMenu();
        this.mainMenu = this.createMainMenu(g);
        d.appendChild(this.mainMenu);
        this.mask = g = this.createMask();
        this.container.appendChild(g);
        d.dispose = function() {
          a.fullscreenElement && (d.removeChild(a.fullscreenElement), a.fullscreenElement.dispose(), a.fullscreenElement = null);
          a.settingElement && (d.removeChild(a.settingElement), a.settingElement.dispose(), a.settingElement = null);
          a.videoElement && (d.removeChild(a.videoElement), a.videoElement.dispose(), a.videoElement = null);
        };
        this.container.appendChild(d);
        this.mask.addEventListener("mousemove", this.PREVENT_EVENT_HANDLER, true);
        this.mask.addEventListener("mouseup", this.PREVENT_EVENT_HANDLER, true);
        this.mask.addEventListener("mousedown", this.PREVENT_EVENT_HANDLER, true);
        this.mask.addEventListener(a.TOUCH_ENABLED ? "touchend" : "click", function(b2) {
          b2.preventDefault();
          b2.stopPropagation();
          a.mask.hide();
          a.settingElement.deactivate();
        }, false);
        this.addEventListener("control-bar-toggle", d.toggle);
        this.barElement = d;
      } else
        console.warn("Widget container not set");
    },
    createDefaultMenu: function() {
      var a = this;
      var b = function(b2, d) {
        return function() {
          a.dispatchEvent({ type: "panolens-viewer-handler", method: b2, data: d });
        };
      };
      return [{ title: "Control", subMenu: [{ title: this.TOUCH_ENABLED ? "Touch" : "Mouse", handler: b("enableControl", E.ORBIT) }, { title: "Sensor", handler: b("enableControl", E.DEVICEORIENTATION) }] }, { title: "Mode", subMenu: [{ title: "Normal", handler: b("disableEffect") }, { title: "Cardboard", handler: b("enableEffect", t.CARDBOARD) }, {
        title: "Stereoscopic",
        handler: b("enableEffect", t.STEREO)
      }] }];
    },
    addControlButton: function(a) {
      switch (a) {
        case "fullscreen":
          this.fullscreenElement = a = this.createFullscreenButton();
          break;
        case "setting":
          this.settingElement = a = this.createSettingButton();
          break;
        case "video":
          this.videoElement = a = this.createVideoControl();
          break;
        default:
          return;
      }
      a && this.barElement.appendChild(a);
    },
    createMask: function() {
      var a = document.createElement("div");
      a.style.position = "absolute";
      a.style.top = 0;
      a.style.left = 0;
      a.style.width = "100%";
      a.style.height = "100%";
      a.style.background = "transparent";
      a.style.display = "none";
      a.show = function() {
        this.style.display = "block";
      };
      a.hide = function() {
        this.style.display = "none";
      };
      return a;
    },
    createSettingButton: function() {
      var a = this;
      var b = this.createCustomItem({ style: { backgroundImage: 'url("' + u.Setting + '")', webkitTransition: this.DEFAULT_TRANSITION, transition: this.DEFAULT_TRANSITION }, onTap: function(b2) {
        b2.preventDefault();
        b2.stopPropagation();
        a.mainMenu.toggle();
        this.activated ? this.deactivate() : this.activate();
      } });
      b.activate = function() {
        this.style.transform = "rotate3d(0,0,1,90deg)";
        this.activated = true;
        a.mask.show();
      };
      b.deactivate = function() {
        this.style.transform = "rotate3d(0,0,0,0)";
        this.activated = false;
        a.mask.hide();
        a.mainMenu && a.mainMenu.visible && a.mainMenu.hide();
        a.activeSubMenu && a.activeSubMenu.visible && a.activeSubMenu.hide();
        a.mainMenu && a.mainMenu._width && (a.mainMenu.changeSize(a.mainMenu._width), a.mainMenu.unslideAll());
      };
      b.activated = false;
      return b;
    },
    createFullscreenButton: function() {
      function a() {
        d && (c = !c, e2.style.backgroundImage = c ? 'url("' + u.FullscreenLeave + '")' : 'url("' + u.FullscreenEnter + '")');
        b.dispatchEvent({ type: "panolens-viewer-handler", method: "onWindowResize" });
        d = true;
      }
      var b = this, c = false, d = true, g = this.container;
      if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
        document.addEventListener("fullscreenchange", a, false);
        document.addEventListener("webkitfullscreenchange", a, false);
        document.addEventListener("mozfullscreenchange", a, false);
        document.addEventListener("MSFullscreenChange", a, false);
        var e2 = this.createCustomItem({ style: { backgroundImage: 'url("' + u.FullscreenEnter + '")' }, onTap: function(a2) {
          a2.preventDefault();
          a2.stopPropagation();
          d = false;
          c ? (document.exitFullscreen && document.exitFullscreen(), document.msExitFullscreen && document.msExitFullscreen(), document.mozCancelFullScreen && document.mozCancelFullScreen(), document.webkitExitFullscreen && document.webkitExitFullscreen(), c = false) : (g.requestFullscreen && g.requestFullscreen(), g.msRequestFullscreen && g.msRequestFullscreen(), g.mozRequestFullScreen && g.mozRequestFullScreen(), g.webkitRequestFullscreen && g.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT), c = true);
          this.style.backgroundImage = c ? 'url("' + u.FullscreenLeave + '")' : 'url("' + u.FullscreenEnter + '")';
        } });
        if (!document.querySelector("panolens-style-addon")) {
          var p = document.createElement("style");
          p.id = "panolens-style-addon";
          p.innerHTML = ":-webkit-full-screen { width: 100% !important; height: 100% !important }";
          document.body.appendChild(p);
        }
        return e2;
      }
    },
    createVideoControl: function() {
      var a = document.createElement("span");
      a.style.display = "none";
      a.show = function() {
        a.style.display = "";
      };
      a.hide = function() {
        a.style.display = "none";
        a.controlButton.paused = true;
        a.controlButton.update();
      };
      a.controlButton = this.createVideoControlButton();
      a.seekBar = this.createVideoControlSeekbar();
      a.appendChild(a.controlButton);
      a.appendChild(a.seekBar);
      a.dispose = function() {
        a.removeChild(a.controlButton);
        a.removeChild(a.seekBar);
        a.controlButton.dispose();
        a.controlButton = null;
        a.seekBar.dispose();
        a.seekBar = null;
      };
      this.addEventListener("video-control-show", a.show);
      this.addEventListener(
        "video-control-hide",
        a.hide
      );
      return a;
    },
    createVideoControlButton: function() {
      var a = this, b = this.createCustomItem({ style: { float: "left", backgroundImage: 'url("' + u.VideoPlay + '")' }, onTap: function(c) {
        c.preventDefault();
        c.stopPropagation();
        a.dispatchEvent({ type: "panolens-viewer-handler", method: "toggleVideoPlay", data: !this.paused });
        this.paused = !this.paused;
        b.update();
      } });
      b.paused = true;
      b.update = function(a2) {
        this.paused = void 0 !== a2 ? a2 : this.paused;
        this.style.backgroundImage = 'url("' + (this.paused ? u.VideoPlay : u.VideoPause) + '")';
      };
      return b;
    },
    createVideoControlSeekbar: function() {
      function a(a2) {
        a2.stopPropagation();
        e2 = true;
        p = a2.clientX || a2.changedTouches && a2.changedTouches[0].clientX;
        m = parseInt(h2.style.width) / 100;
        g.container.addEventListener("mousemove", b, { passive: true });
        g.container.addEventListener("mouseup", c, { passive: true });
        g.container.addEventListener("touchmove", b, { passive: true });
        g.container.addEventListener("touchend", c, { passive: true });
      }
      function b(a2) {
        e2 && (l = ((a2.clientX || a2.changedTouches && a2.changedTouches[0].clientX) - p) / f.clientWidth, l = m + l, l = 1 < l ? 1 : 0 > l ? 0 : l, f.setProgress(l), g.dispatchEvent({ type: "panolens-viewer-handler", method: "setVideoCurrentTime", data: l }));
      }
      function c(a2) {
        a2.stopPropagation();
        e2 = false;
        d();
      }
      function d() {
        g.container.removeEventListener("mousemove", b, false);
        g.container.removeEventListener("mouseup", c, false);
        g.container.removeEventListener("touchmove", b, false);
        g.container.removeEventListener("touchend", c, false);
      }
      var g = this, e2 = false, p, m, l;
      var h2 = document.createElement("div");
      h2.style.width = "0%";
      h2.style.height = "100%";
      h2.style.backgroundColor = "#fff";
      var q = document.createElement("div");
      q.style.float = "right";
      q.style.width = "14px";
      q.style.height = "14px";
      q.style.transform = "translate(7px, -5px)";
      q.style.borderRadius = "50%";
      q.style.backgroundColor = "#ddd";
      q.addEventListener("mousedown", a, { passive: true });
      q.addEventListener("touchstart", a, { passive: true });
      h2.appendChild(q);
      var f = this.createCustomItem({ style: { float: "left", width: "30%", height: "4px", marginTop: "20px", backgroundColor: "rgba(188,188,188,0.8)" }, onTap: function(a2) {
        a2.preventDefault();
        a2.stopPropagation();
        if (a2.target !== q) {
          var b2 = a2.changedTouches && 0 < a2.changedTouches.length ? (a2.changedTouches[0].pageX - a2.target.getBoundingClientRect().left) / this.clientWidth : a2.offsetX / this.clientWidth;
          g.dispatchEvent({ type: "panolens-viewer-handler", method: "setVideoCurrentTime", data: b2 });
          f.setProgress(a2.offsetX / this.clientWidth);
        }
      }, onDispose: function() {
        d();
        q = h2 = null;
      } });
      f.appendChild(h2);
      f.setProgress = function(a2) {
        h2.style.width = 100 * a2 + "%";
      };
      this.addEventListener("video-update", function(a2) {
        f.setProgress(a2.percentage);
      });
      f.progressElement = h2;
      f.progressElementControl = q;
      return f;
    },
    createMenuItem: function(a) {
      var b = this, c = document.createElement("a");
      c.textContent = a;
      c.style.display = "block";
      c.style.padding = "10px";
      c.style.textDecoration = "none";
      c.style.cursor = "pointer";
      c.style.pointerEvents = "auto";
      c.style.transition = this.DEFAULT_TRANSITION;
      c.slide = function(a2) {
        this.style.transform = "translateX(" + (a2 ? "" : "-") + "100%)";
      };
      c.unslide = function() {
        this.style.transform = "translateX(0)";
      };
      c.setIcon = function(a2) {
        this.icon && (this.icon.style.backgroundImage = "url(" + a2 + ")");
      };
      c.setSelectionTitle = function(a2) {
        this.selection && (this.selection.textContent = a2);
      };
      c.addSelection = function(a2) {
        var b2 = document.createElement("span");
        b2.style.fontSize = "13px";
        b2.style.fontWeight = "300";
        b2.style.float = "right";
        this.selection = b2;
        this.setSelectionTitle(a2);
        this.appendChild(b2);
        return this;
      };
      c.addIcon = function(a2, b2, c2) {
        a2 = void 0 === a2 ? u.ChevronRight : a2;
        b2 = void 0 === b2 ? false : b2;
        c2 = void 0 === c2 ? false : c2;
        var d = document.createElement("span");
        d.style.float = b2 ? "left" : "right";
        d.style.width = "17px";
        d.style.height = "17px";
        d.style["margin" + (b2 ? "Right" : "Left")] = "12px";
        d.style.backgroundSize = "cover";
        c2 && (d.style.transform = "rotateZ(180deg)");
        this.icon = d;
        this.setIcon(a2);
        this.appendChild(d);
        return this;
      };
      c.addSubMenu = function(a2, c2) {
        this.subMenu = b.createSubMenu(a2, c2);
        return this;
      };
      c.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "#e0e0e0";
      }, false);
      c.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "#fafafa";
      }, false);
      return c;
    },
    createMenuItemHeader: function(a) {
      a = this.createMenuItem(a);
      a.style.borderBottom = "1px solid #333";
      a.style.paddingBottom = "15px";
      return a;
    },
    createMainMenu: function(a) {
      function b(a2) {
        a2.preventDefault();
        a2.stopPropagation();
        var b2 = c.mainMenu, d2 = this.subMenu;
        b2.hide();
        b2.slideAll();
        b2.parentElement.appendChild(d2);
        c.activeMainItem = this;
        c.activeSubMenu = d2;
        window.requestAnimationFrame(function() {
          b2.changeSize(d2.clientWidth);
          d2.show();
          d2.unslideAll();
        });
      }
      var c = this, d = this.createMenu();
      d._width = 200;
      d.changeSize(d._width);
      for (var e2 = 0; e2 < a.length; e2++) {
        var k = d.addItem(a[e2].title);
        k.style.paddingLeft = "20px";
        k.addIcon().addEventListener(c.TOUCH_ENABLED ? "touchend" : "click", b, false);
        a[e2].subMenu && 0 < a[e2].subMenu.length && k.addSelection(a[e2].subMenu[0].title).addSubMenu(a[e2].title, a[e2].subMenu);
      }
      return d;
    },
    createSubMenu: function(a, b) {
      function c(a2) {
        a2.preventDefault();
        a2.stopPropagation();
        e2 = d.mainMenu;
        e2.changeSize(e2._width);
        e2.unslideAll();
        e2.show();
        k.slideAll(true);
        k.hide();
        "header" !== this.type && (k.setActiveItem(this), d.activeMainItem.setSelectionTitle(this.textContent), this.handler && this.handler());
      }
      var d = this, e2, k = this.createMenu();
      k.items = b;
      k.activeItem = null;
      k.addHeader(a).addIcon(
        void 0,
        true,
        true
      ).addEventListener(d.TOUCH_ENABLED ? "touchend" : "click", c, false);
      for (a = 0; a < b.length; a++) {
        var h2 = k.addItem(b[a].title);
        h2.style.fontWeight = 300;
        h2.handler = b[a].handler;
        h2.addIcon(" ", true);
        h2.addEventListener(d.TOUCH_ENABLED ? "touchend" : "click", c, false);
        k.activeItem || k.setActiveItem(h2);
      }
      k.slideAll(true);
      return k;
    },
    createMenu: function() {
      var a = this, b = document.createElement("span"), c = b.style;
      c.padding = "5px 0";
      c.position = "fixed";
      c.bottom = "100%";
      c.right = "14px";
      c.backgroundColor = "#fafafa";
      c.fontFamily = "Helvetica Neue";
      c.fontSize = "14px";
      c.visibility = "hidden";
      c.opacity = 0;
      c.boxShadow = "0 0 12pt rgba(0,0,0,0.25)";
      c.borderRadius = "2px";
      c.overflow = "hidden";
      c.willChange = "width, height, opacity";
      c.pointerEvents = "auto";
      c.transition = this.DEFAULT_TRANSITION;
      b.visible = false;
      b.changeSize = function(a2, b2) {
        a2 && (this.style.width = a2 + "px");
        b2 && (this.style.height = b2 + "px");
      };
      b.show = function() {
        this.style.opacity = 1;
        this.style.visibility = "visible";
        this.visible = true;
      };
      b.hide = function() {
        this.style.opacity = 0;
        this.style.visibility = "hidden";
        this.visible = false;
      };
      b.toggle = function() {
        this.visible ? this.hide() : this.show();
      };
      b.slideAll = function(a2) {
        for (var c2 = 0; c2 < b.children.length; c2++)
          b.children[c2].slide && b.children[c2].slide(a2);
      };
      b.unslideAll = function() {
        for (var a2 = 0; a2 < b.children.length; a2++)
          b.children[a2].unslide && b.children[a2].unslide();
      };
      b.addHeader = function(b2) {
        b2 = a.createMenuItemHeader(b2);
        b2.type = "header";
        this.appendChild(b2);
        return b2;
      };
      b.addItem = function(b2) {
        b2 = a.createMenuItem(b2);
        b2.type = "item";
        this.appendChild(b2);
        return b2;
      };
      b.setActiveItem = function(a2) {
        this.activeItem && this.activeItem.setIcon(" ");
        a2.setIcon(u.Check);
        this.activeItem = a2;
      };
      b.addEventListener("mousemove", this.PREVENT_EVENT_HANDLER, true);
      b.addEventListener("mouseup", this.PREVENT_EVENT_HANDLER, true);
      b.addEventListener("mousedown", this.PREVENT_EVENT_HANDLER, true);
      return b;
    },
    createCustomItem: function(a) {
      a = void 0 === a ? {} : a;
      var b = this, c = a.element || document.createElement("span"), d = a.onDispose;
      c.style.cursor = "pointer";
      c.style.float = "right";
      c.style.width = "44px";
      c.style.height = "100%";
      c.style.backgroundSize = "60%";
      c.style.backgroundRepeat = "no-repeat";
      c.style.backgroundPosition = "center";
      c.style.webkitUserSelect = c.style.MozUserSelect = c.style.userSelect = "none";
      c.style.position = "relative";
      c.style.pointerEvents = "auto";
      c.addEventListener(b.TOUCH_ENABLED ? "touchstart" : "mouseenter", function() {
        c.style.filter = c.style.webkitFilter = "drop-shadow(0 0 5px rgba(255,255,255,1))";
      }, { passive: true });
      c.addEventListener(b.TOUCH_ENABLED ? "touchend" : "mouseleave", function() {
        c.style.filter = c.style.webkitFilter = "";
      }, { passive: true });
      this.mergeStyleOptions(c, a.style);
      a.onTap && c.addEventListener(b.TOUCH_ENABLED ? "touchend" : "click", a.onTap, false);
      c.dispose = function() {
        c.removeEventListener(b.TOUCH_ENABLED ? "touchend" : "click", a.onTap, false);
        if (d)
          a.onDispose();
      };
      return c;
    },
    mergeStyleOptions: function(a, b) {
      b = void 0 === b ? {} : b;
      for (var c in b)
        b.hasOwnProperty(c) && (a.style[c] = b[c]);
      return a;
    },
    dispose: function() {
      this.barElement && (this.container.removeChild(this.barElement), this.barElement.dispose(), this.barElement = null);
    }
  });
  n.prototype = Object.assign(Object.create(e.Mesh.prototype), {
    constructor: n,
    add: function(a) {
      var b;
      if (1 < arguments.length) {
        for (b = 0; b < arguments.length; b++)
          this.add(arguments[b]);
        return this;
      }
      if (a instanceof z) {
        if (b = a, a.dispatchEvent) {
          var c = this.container;
          c && a.dispatchEvent({ type: "panolens-container", container: c });
          a.dispatchEvent({ type: "panolens-infospot-focus", method: function(a2, b2, c2) {
            this.dispatchEvent({ type: "panolens-viewer-handler", method: "tweenControlCenter", data: [a2, b2, c2] });
          }.bind(this) });
        }
      } else
        b = new e.Object3D(), b.scale.x = -1, b.scalePlaceHolder = true, b.add(a);
      e.Object3D.prototype.add.call(
        this,
        b
      );
    },
    load: function() {
      this.onLoad();
    },
    onClick: function(a) {
      a.intersects && 0 === a.intersects.length && this.traverse(function(a2) {
        a2.dispatchEvent({ type: "dismiss" });
      });
    },
    setContainer: function(a) {
      if (a instanceof HTMLElement)
        var b = a;
      else
        a && a.container && (b = a.container);
      b && (this.children.forEach(function(a2) {
        a2 instanceof z && a2.dispatchEvent && a2.dispatchEvent({ type: "panolens-container", container: b });
      }), this.container = b);
    },
    onLoad: function() {
      this.loaded = true;
      this.dispatchEvent({ type: "load" });
    },
    onProgress: function(a) {
      this.dispatchEvent({
        type: "progress",
        progress: a
      });
    },
    onError: function() {
      this.dispatchEvent({ type: "error" });
    },
    getZoomLevel: function() {
      return 800 >= window.innerWidth ? this.ImageQualityFair : 800 < window.innerWidth && 1280 >= window.innerWidth ? this.ImageQualityMedium : 1280 < window.innerWidth && 1920 >= window.innerWidth ? this.ImageQualityHigh : 1920 < window.innerWidth ? this.ImageQualitySuperHigh : this.ImageQualityLow;
    },
    updateTexture: function(a) {
      this.material.map = a;
      this.material.needsUpdate = true;
    },
    toggleInfospotVisibility: function(a, b) {
      b = void 0 !== b ? b : 0;
      var c = void 0 !== a ? a : this.isInfospotVisible ? false : true;
      this.traverse(function(a2) {
        a2 instanceof z && (c ? a2.show(b) : a2.hide(b));
      });
      this.isInfospotVisible = c;
      this.infospotAnimation.onComplete(function() {
        this.dispatchEvent({ type: "infospot-animation-complete", visible: c });
      }.bind(this)).delay(b).start();
    },
    setLinkingImage: function(a, b) {
      this.linkingImageURL = a;
      this.linkingImageScale = b;
    },
    link: function(a, b, c, d) {
      this.visible = true;
      b ? (c = void 0 !== c ? c : void 0 !== a.linkingImageScale ? a.linkingImageScale : 300, d = d ? d : a.linkingImageURL ? a.linkingImageURL : u.Arrow, d = new z(c, d), d.position.copy(b), d.toPanorama = a, d.addEventListener("click", function() {
        this.dispatchEvent({ type: "panolens-viewer-handler", method: "setPanorama", data: a });
      }.bind(this)), this.linkedSpots.push(d), this.add(d), this.visible = false) : console.warn("Please specify infospot position for linking");
    },
    reset: function() {
      this.children.length = 0;
    },
    setupTransitions: function() {
      this.fadeInAnimation = new r.Tween(this.material).easing(r.Easing.Quartic.Out).onStart(function() {
        this.visible = true;
        this.dispatchEvent({ type: "enter-fade-start" });
      }.bind(this));
      this.fadeOutAnimation = new r.Tween(this.material).easing(r.Easing.Quartic.Out).onComplete(function() {
        this.visible = false;
        this.dispatchEvent({ type: "leave-complete" });
      }.bind(this));
      this.enterTransition = new r.Tween(this).easing(r.Easing.Quartic.Out).onComplete(function() {
        this.dispatchEvent({ type: "enter-complete" });
      }.bind(this)).start();
      this.leaveTransition = new r.Tween(this).easing(r.Easing.Quartic.Out);
    },
    onFadeAnimationUpdate: function() {
      var a = this.material.opacity, b = this.material.uniforms;
      b && b.opacity && (b.opacity.value = a);
    },
    fadeIn: function(a) {
      a = 0 <= a ? a : this.animationDuration;
      this.fadeOutAnimation.stop();
      this.fadeInAnimation.to({ opacity: 1 }, a).onUpdate(this.onFadeAnimationUpdate.bind(this)).onComplete(function() {
        this.toggleInfospotVisibility(true, a / 2);
        this.dispatchEvent({ type: "enter-fade-complete" });
      }.bind(this)).start();
    },
    fadeOut: function(a) {
      a = 0 <= a ? a : this.animationDuration;
      this.fadeInAnimation.stop();
      this.fadeOutAnimation.to({ opacity: 0 }, a).onUpdate(this.onFadeAnimationUpdate.bind(this)).start();
    },
    onEnter: function() {
      var a = this.animationDuration;
      this.leaveTransition.stop();
      this.enterTransition.to({}, a).onStart(function() {
        this.dispatchEvent({ type: "enter-start" });
        this.loaded ? this.fadeIn(a) : this.load();
      }.bind(this)).start();
      this.dispatchEvent({ type: "enter" });
      this.children.forEach(function(a2) {
        a2.dispatchEvent({ type: "panorama-enter" });
      });
      this.active = true;
    },
    onLeave: function() {
      var a = this.animationDuration;
      this.enterTransition.stop();
      this.leaveTransition.to({}, a).onStart(function() {
        this.dispatchEvent({ type: "leave-start" });
        this.fadeOut(a);
        this.toggleInfospotVisibility(false);
      }.bind(this)).start();
      this.dispatchEvent({ type: "leave" });
      this.children.forEach(function(a2) {
        a2.dispatchEvent({ type: "panorama-leave" });
      });
      this.active = false;
    },
    dispose: function() {
      function a(b) {
        for (var c = b.geometry, d = b.material, e2 = b.children.length - 1; 0 <= e2; e2--)
          a(b.children[e2]), b.remove(b.children[e2]);
        b instanceof z && b.dispose();
        c && (c.dispose(), b.geometry = null);
        d && (d.dispose(), b.material = null);
      }
      this.infospotAnimation.stop();
      this.fadeInAnimation.stop();
      this.fadeOutAnimation.stop();
      this.enterTransition.stop();
      this.leaveTransition.stop();
      this.dispatchEvent({ type: "panolens-viewer-handler", method: "onPanoramaDispose", data: this });
      a(this);
      this.parent && this.parent.remove(this);
    }
  });
  y.prototype = Object.assign(Object.create(n.prototype), {
    constructor: y,
    load: function(a) {
      a = a || this.src;
      if (!a)
        console.warn("Image source undefined");
      else if ("string" === typeof a)
        N.load(a, this.onLoad.bind(this), this.onProgress.bind(this), this.onError.bind(this));
      else if (a instanceof HTMLImageElement)
        this.onLoad(new e.Texture(a));
    },
    onLoad: function(a) {
      a.minFilter = a.magFilter = e.LinearFilter;
      a.needsUpdate = true;
      this.updateTexture(a);
      window.requestAnimationFrame(n.prototype.onLoad.bind(this));
    },
    reset: function() {
      n.prototype.reset.call(this);
    },
    dispose: function() {
      var a = this.material.map;
      e.Cache.remove(this.src);
      a && a.dispose();
      n.prototype.dispose.call(this);
    }
  });
  W.prototype = Object.assign(Object.create(n.prototype), { constructor: W });
  F.prototype = Object.assign(Object.create(n.prototype), { constructor: F, load: function() {
    fa.load(
      this.images,
      this.onLoad.bind(this),
      this.onProgress.bind(this),
      this.onError.bind(this)
    );
  }, onLoad: function(a) {
    this.material.uniforms.tCube.value = a;
    n.prototype.onLoad.call(this);
  }, dispose: function() {
    var a = this.material.uniforms.tCube.value;
    this.images.forEach(function(a2) {
      e.Cache.remove(a2);
    });
    a instanceof e.CubeTexture && a.dispose();
    n.prototype.dispose.call(this);
  } });
  O.prototype = Object.assign(Object.create(F.prototype), { constructor: O });
  B.prototype = Object.assign(Object.create(n.prototype), {
    constructor: B,
    isMobile: function() {
      var a = false, b = window.navigator.userAgent || window.navigator.vendor || window.opera;
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(
        0,
        4
      )))
        a = true;
      return a;
    },
    load: function() {
      var a = this.options, b = a.muted, c = a.loop, d = a.autoplay, e2 = a.playsinline;
      a = a.crossOrigin;
      var k = this.videoElement, h2 = this.material, m = this.onProgress.bind(this), l = this.onLoad.bind(this);
      k.loop = c;
      k.autoplay = d;
      k.playsinline = e2;
      k.crossOrigin = a;
      k.muted = b;
      e2 && (k.setAttribute("playsinline", ""), k.setAttribute("webkit-playsinline", ""));
      e2 = function() {
        this.setVideoTexture(k);
        d && this.dispatchEvent({ type: "panolens-viewer-handler", method: "updateVideoPlayButton", data: false });
        this.isMobile() && (k.pause(), d && b ? this.dispatchEvent({ type: "panolens-viewer-handler", method: "updateVideoPlayButton", data: false }) : this.dispatchEvent({ type: "panolens-viewer-handler", method: "updateVideoPlayButton", data: true }));
        window.requestAnimationFrame(function() {
          h2.map.needsUpdate = true;
          m({ loaded: 1, total: 1 });
          l();
        });
      };
      2 < k.readyState ? e2.call(this) : (0 === k.querySelectorAll("source").length && (a = document.createElement("source"), a.src = this.src, k.appendChild(a)), k.load());
      k.addEventListener("loadeddata", e2.bind(this));
      k.addEventListener(
        "timeupdate",
        function() {
          this.videoProgress = 0 <= k.duration ? k.currentTime / k.duration : 0;
          this.dispatchEvent({ type: "panolens-viewer-handler", method: "onVideoUpdate", data: this.videoProgress });
        }.bind(this)
      );
      k.addEventListener("ended", function() {
        c || (this.resetVideo(), this.dispatchEvent({ type: "panolens-viewer-handler", method: "updateVideoPlayButton", data: true }));
      }.bind(this), false);
    },
    setVideoTexture: function(a) {
      a && (a = new e.VideoTexture(a), a.minFilter = e.LinearFilter, a.magFilter = e.LinearFilter, a.format = e.RGBFormat, this.updateTexture(a));
    },
    reset: function() {
      this.videoElement = void 0;
      n.prototype.reset.call(this);
    },
    isVideoPaused: function() {
      return this.videoElement.paused;
    },
    toggleVideo: function() {
      var a = this.videoElement;
      if (a)
        a[a.paused ? "play" : "pause"]();
    },
    setVideoCurrentTime: function(a) {
      a = a.percentage;
      var b = this.videoElement;
      b && !Number.isNaN(a) && 1 !== a && (b.currentTime = b.duration * a, this.dispatchEvent({ type: "panolens-viewer-handler", method: "onVideoUpdate", data: a }));
    },
    playVideo: function() {
      var a = this.videoElement, b = this.playVideo.bind(this), c = this.dispatchEvent.bind(this), d = function() {
        c({ type: "play" });
      }, e2 = function(a2) {
        window.requestAnimationFrame(b);
        c({ type: "play-error", error: a2 });
      };
      a && a.paused && a.play().then(d).catch(e2);
    },
    pauseVideo: function() {
      var a = this.videoElement;
      a && !a.paused && a.pause();
      this.dispatchEvent({ type: "pause" });
    },
    resumeVideoProgress: function() {
      var a = this.videoElement;
      4 <= a.readyState && a.autoplay && !this.isMobile() ? (this.playVideo(), this.dispatchEvent({ type: "panolens-viewer-handler", method: "updateVideoPlayButton", data: false })) : (this.pauseVideo(), this.dispatchEvent({
        type: "panolens-viewer-handler",
        method: "updateVideoPlayButton",
        data: true
      }));
      this.setVideoCurrentTime({ percentage: this.videoProgress });
    },
    resetVideo: function() {
      this.videoElement && this.setVideoCurrentTime({ percentage: 0 });
    },
    isVideoMuted: function() {
      return this.videoElement.muted;
    },
    muteVideo: function() {
      var a = this.videoElement;
      a && !a.muted && (a.muted = true);
      this.dispatchEvent({ type: "volumechange" });
    },
    unmuteVideo: function() {
      var a = this.videoElement;
      a && this.isVideoMuted() && (a.muted = false);
      this.dispatchEvent({ type: "volumechange" });
    },
    getVideoElement: function() {
      return this.videoElement;
    },
    dispose: function() {
      var a = this.material.map;
      this.pauseVideo();
      this.removeEventListener("leave", this.pauseVideo.bind(this));
      this.removeEventListener("enter-fade-start", this.resumeVideoProgress.bind(this));
      this.removeEventListener("video-toggle", this.toggleVideo.bind(this));
      this.removeEventListener("video-time", this.setVideoCurrentTime.bind(this));
      a && a.dispose();
      n.prototype.dispose.call(this);
    }
  });
  Object.assign(P.prototype, { constructor: P, setProgress: function(a, b) {
    if (this.onProgress)
      this.onProgress({
        loaded: a,
        total: b
      });
  }, adaptTextureToZoom: function() {
    var a = this.widths[this._zoom], b = this.heights[this._zoom], c = this.maxW, d = this.maxH;
    this._wc = Math.ceil(a / c);
    this._hc = Math.ceil(b / d);
    for (var e2 = 0; e2 < this._hc; e2++)
      for (var k = 0; k < this._wc; k++) {
        var h2 = document.createElement("canvas");
        h2.width = k < this._wc - 1 ? c : a - c * k;
        h2.height = e2 < this._hc - 1 ? d : b - d * e2;
        this._canvas.push(h2);
        this._ctx.push(h2.getContext("2d"));
      }
  }, composeFromTile: function(a, b, c) {
    var d = this.maxW, e2 = this.maxH;
    a *= 512;
    b *= 512;
    var k = Math.floor(a / d), h2 = Math.floor(b / e2);
    this._ctx[h2 * this._wc + k].drawImage(c, 0, 0, c.width, c.height, a - k * d, b - h2 * e2, 512, 512);
    this.progress();
  }, progress: function() {
    this._count++;
    this.setProgress(this._count, this._total);
    if (this._count === this._total && (this.canvas = this._canvas, this.panoId = this._panoId, this.zoom = this._zoom, this.onPanoramaLoad))
      this.onPanoramaLoad(this._canvas[0]);
  }, composePanorama: function() {
    this.setProgress(0, 1);
    var a = this.levelsW[this._zoom], b = this.levelsH[this._zoom], c = this;
    this._count = 0;
    this._total = a * b;
    for (var d = this._parameters.useWebGL, e2 = 0; e2 < b; e2++)
      for (var k = {}, h2 = 0; h2 < a; k = { $jscomp$loop$prop$url$1: k.$jscomp$loop$prop$url$1 }, h2++)
        k.$jscomp$loop$prop$url$1 = "https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile&zoom=" + this._zoom + "&x=" + h2 + "&y=" + e2 + "&panoid=" + this._panoId + "&nbt&fover=2", function(a2) {
          return function(b2, e3) {
            if (d)
              var g = N.load(a2.$jscomp$loop$prop$url$1, null, function() {
                c.composeFromTile(b2, e3, g);
              });
            else {
              var f = new Image();
              f.addEventListener("load", function() {
                c.composeFromTile(b2, e3, this);
              });
              f.crossOrigin = "";
              f.src = a2.$jscomp$loop$prop$url$1;
            }
          };
        }(k)(h2, e2);
  }, load: function(a) {
    this.loadPano(a);
  }, loadPano: function(a) {
    var b = this;
    this._panoClient.getPanoramaById(a, function(a2, d) {
      d === google.maps.StreetViewStatus.OK && (b.result = a2, b.copyright = a2.copyright, b._panoId = a2.location.pano, b.composePanorama());
    });
  }, setZoom: function(a) {
    this._zoom = a;
    this.adaptTextureToZoom();
  } });
  Z.prototype = Object.assign(Object.create(y.prototype), {
    constructor: Z,
    load: function(a) {
      this.loadRequested = true;
      (a = a || this.panoId || {}, this.gsvLoader) && this.loadGSVLoader(a);
    },
    setupGoogleMapAPI: function(a) {
      var b = document.createElement("script");
      b.src = "https://maps.googleapis.com/maps/api/js?";
      b.src += a ? "key=" + a : "";
      b.onreadystatechange = this.setGSVLoader.bind(this);
      b.onload = this.setGSVLoader.bind(this);
      document.querySelector("head").appendChild(b);
    },
    setGSVLoader: function() {
      this.gsvLoader = new P();
      this.loadRequested && this.load();
    },
    getGSVLoader: function() {
      return this.gsvLoader;
    },
    loadGSVLoader: function(a) {
      this.loadRequested = false;
      this.gsvLoader.onProgress = this.onProgress.bind(this);
      this.gsvLoader.onPanoramaLoad = this.onLoad.bind(this);
      this.gsvLoader.setZoom(this.getZoomLevel());
      this.gsvLoader.load(a);
      this.gsvLoader.loaded = true;
    },
    onLoad: function(a) {
      y.prototype.onLoad.call(this, new e.Texture(a));
    },
    reset: function() {
      this.gsvLoader = void 0;
      y.prototype.reset.call(this);
    }
  });
  var ka = { uniforms: { tDiffuse: { value: new e.Texture() }, resolution: { value: 1 }, transform: { value: new e.Matrix4() }, zoom: { value: 1 }, opacity: { value: 1 } }, vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = vec4( position, 1.0 );\n}", fragmentShader: "uniform sampler2D tDiffuse;\nuniform float resolution;\nuniform mat4 transform;\nuniform float zoom;\nuniform float opacity;\nvarying vec2 vUv;\nconst float PI = 3.141592653589793;\nvoid main(){\nvec2 position = -1.0 +  2.0 * vUv;\nposition *= vec2( zoom * resolution, zoom * 0.5 );\nfloat x2y2 = position.x * position.x + position.y * position.y;\nvec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );\nsphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );\nvec2 sampleUV = vec2(\n(atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,\n(asin(sphere_pnt.z) / PI + 0.5)\n);\ngl_FragColor = texture2D( tDiffuse, sampleUV );\ngl_FragColor.a *= opacity;\n}" };
  C.prototype = Object.assign(Object.create(y.prototype), { constructor: C, add: function(a) {
    if (1 < arguments.length) {
      for (var b = 0; b < arguments.length; b++)
        this.add(arguments[b]);
      return this;
    }
    a instanceof z && (a.material.depthTest = false);
    y.prototype.add.call(this, a);
  }, createGeometry: function(a, b) {
    return new e.PlaneBufferGeometry(a, a * b);
  }, createMaterial: function(a) {
    var b = Object.assign({}, ka), c = b.uniforms;
    c.zoom.value = a;
    c.opacity.value = 0;
    return new e.ShaderMaterial({
      uniforms: c,
      vertexShader: b.vertexShader,
      fragmentShader: b.fragmentShader,
      side: e.BackSide,
      transparent: true
    });
  }, registerMouseEvents: function() {
    this.container.addEventListener("mousedown", this.onMouseDown.bind(this), { passive: true });
    this.container.addEventListener("mousemove", this.onMouseMove.bind(this), { passive: true });
    this.container.addEventListener("mouseup", this.onMouseUp.bind(this), { passive: true });
    this.container.addEventListener("touchstart", this.onMouseDown.bind(this), { passive: true });
    this.container.addEventListener("touchmove", this.onMouseMove.bind(this), { passive: true });
    this.container.addEventListener(
      "touchend",
      this.onMouseUp.bind(this),
      { passive: true }
    );
    this.container.addEventListener("mousewheel", this.onMouseWheel.bind(this), { passive: false });
    this.container.addEventListener("DOMMouseScroll", this.onMouseWheel.bind(this), { passive: false });
    this.container.addEventListener("contextmenu", this.onContextMenu.bind(this), { passive: true });
  }, unregisterMouseEvents: function() {
    this.container.removeEventListener("mousedown", this.onMouseDown.bind(this), false);
    this.container.removeEventListener("mousemove", this.onMouseMove.bind(this), false);
    this.container.removeEventListener("mouseup", this.onMouseUp.bind(this), false);
    this.container.removeEventListener("touchstart", this.onMouseDown.bind(this), false);
    this.container.removeEventListener("touchmove", this.onMouseMove.bind(this), false);
    this.container.removeEventListener("touchend", this.onMouseUp.bind(this), false);
    this.container.removeEventListener("mousewheel", this.onMouseWheel.bind(this), false);
    this.container.removeEventListener("DOMMouseScroll", this.onMouseWheel.bind(this), false);
    this.container.removeEventListener(
      "contextmenu",
      this.onContextMenu.bind(this),
      false
    );
  }, onMouseDown: function(a) {
    switch (a.touches && a.touches.length || 1) {
      case 1:
        var b = 0 <= a.clientX ? a.clientX : a.touches[0].clientX;
        a = 0 <= a.clientY ? a.clientY : a.touches[0].clientY;
        this.dragging = true;
        this.userMouse.set(b, a);
        break;
      case 2:
        b = a.touches[0].pageX - a.touches[1].pageX, a = a.touches[0].pageY - a.touches[1].pageY, this.userMouse.pinchDistance = Math.sqrt(b * b + a * a);
    }
    this.onUpdateCallback();
  }, onMouseMove: function(a) {
    switch (a.touches && a.touches.length || 1) {
      case 1:
        var b = 0 <= a.clientX ? a.clientX : a.touches[0].clientX;
        a = 0 <= a.clientY ? a.clientY : a.touches[0].clientY;
        var c = 0.4 * e.Math.degToRad(b - this.userMouse.x), d = 0.4 * e.Math.degToRad(a - this.userMouse.y);
        this.dragging && (this.quatA.setFromAxisAngle(this.vectorY, c), this.quatB.setFromAxisAngle(this.vectorX, d), this.quatCur.multiply(this.quatA).multiply(this.quatB), this.userMouse.set(b, a));
        break;
      case 2:
        b = a.touches[0].pageX - a.touches[1].pageX, a = a.touches[0].pageY - a.touches[1].pageY, this.addZoomDelta(this.userMouse.pinchDistance - Math.sqrt(b * b + a * a));
    }
  }, onMouseUp: function() {
    this.dragging = false;
  }, onMouseWheel: function(a) {
    a.preventDefault();
    a.stopPropagation();
    var b = 0;
    void 0 !== a.wheelDelta ? b = a.wheelDelta : void 0 !== a.detail && (b = -a.detail);
    this.addZoomDelta(b);
    this.onUpdateCallback();
  }, addZoomDelta: function(a) {
    var b = this.material.uniforms, c = 0.1 * this.size, d = 10 * this.size;
    b.zoom.value += a;
    b.zoom.value <= c ? b.zoom.value = c : b.zoom.value >= d && (b.zoom.value = d);
  }, onUpdateCallback: function() {
    this.frameId = window.requestAnimationFrame(this.onUpdateCallback.bind(this));
    this.quatSlerp.slerp(this.quatCur, 0.1);
    this.material && this.material.uniforms.transform.value.makeRotationFromQuaternion(this.quatSlerp);
    !this.dragging && 1 - this.quatSlerp.clone().dot(this.quatCur) < this.EPS && window.cancelAnimationFrame(this.frameId);
  }, reset: function() {
    this.quatCur.set(0, 0, 0, 1);
    this.quatSlerp.set(0, 0, 0, 1);
    this.onUpdateCallback();
  }, onLoad: function(a) {
    this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;
    this.registerMouseEvents();
    this.onUpdateCallback();
    this.dispatchEvent({
      type: "panolens-viewer-handler",
      method: "disableControl"
    });
    y.prototype.onLoad.call(this, a);
  }, onLeave: function() {
    this.unregisterMouseEvents();
    this.dispatchEvent({ type: "panolens-viewer-handler", method: "enableControl", data: E.ORBIT });
    window.cancelAnimationFrame(this.frameId);
    y.prototype.onLeave.call(this);
  }, onWindowResize: function() {
    this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;
  }, onContextMenu: function() {
    this.dragging = false;
  }, dispose: function() {
    this.unregisterMouseEvents();
    y.prototype.dispose.call(this);
  } });
  aa.prototype = Object.assign(Object.create(C.prototype), { constructor: aa, onLoad: function(a) {
    this.updateTexture(a);
    C.prototype.onLoad.call(this, a);
  }, updateTexture: function(a) {
    a.minFilter = a.magFilter = e.LinearFilter;
    this.material.uniforms.tDiffuse.value = a;
  }, dispose: function() {
    var a = this.material.uniforms.tDiffuse;
    a && a.value && a.value.dispose();
    C.prototype.dispose.call(this);
  } });
  J.prototype = Object.assign(Object.create(n.prototype), {
    constructor: J,
    onPanolensContainer: function(a) {
      this.media.setContainer(a.container);
    },
    onPanolensScene: function(a) {
      this.media.setScene(a.scene);
    },
    start: function() {
      return this.media.start();
    },
    stop: function() {
      this.media.stop();
    }
  });
  ba.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), { constructor: ba });
  ca.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), { constructor: ca });
  var ia = function(a) {
    var b = new e.StereoCamera();
    b.aspect = 0.5;
    var c = new e.Vector2();
    this.setEyeSeparation = function(a2) {
      b.eyeSep = a2;
    };
    this.setSize = function(b2, c2) {
      a.setSize(b2, c2);
    };
    this.render = function(d, e2) {
      d.updateMatrixWorld();
      null === e2.parent && e2.updateMatrixWorld();
      b.update(e2);
      a.getSize(c);
      a.autoClear && a.clear();
      a.setScissorTest(true);
      a.setScissor(0, 0, c.width / 2, c.height);
      a.setViewport(0, 0, c.width / 2, c.height);
      a.render(d, b.cameraL);
      a.setScissor(c.width / 2, 0, c.width / 2, c.height);
      a.setViewport(c.width / 2, 0, c.width / 2, c.height);
      a.render(d, b.cameraR);
      a.setScissorTest(false);
    };
  };
  da.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), {
    constructor: da,
    add: function(a) {
      if (1 < arguments.length) {
        for (var b = 0; b < arguments.length; b++)
          this.add(arguments[b]);
        return this;
      }
      this.scene.add(a);
      a.addEventListener && a.addEventListener("panolens-viewer-handler", this.eventHandler.bind(this));
      a instanceof n && a.dispatchEvent && a.dispatchEvent({ type: "panolens-container", container: this.container });
      a instanceof J && a.dispatchEvent({ type: "panolens-scene", scene: this.scene });
      "panorama" === a.type && (this.addPanoramaEventListener(a), this.panorama || this.setPanorama(a));
    },
    remove: function(a) {
      a.removeEventListener && a.removeEventListener(
        "panolens-viewer-handler",
        this.eventHandler.bind(this)
      );
      this.scene.remove(a);
    },
    addDefaultControlBar: function(a) {
      if (this.widget)
        console.warn("Default control bar exists");
      else {
        var b = new I(this.container);
        b.addEventListener("panolens-viewer-handler", this.eventHandler.bind(this));
        b.addControlBar();
        a.forEach(function(a2) {
          b.addControlButton(a2);
        });
        this.widget = b;
      }
    },
    setPanorama: function(a) {
      var b = this.panorama;
      if ("panorama" === a.type && b !== a) {
        this.hideInfospot();
        var c = function() {
          if (b)
            b.onLeave();
          a.removeEventListener(
            "enter-fade-start",
            c
          );
        };
        a.addEventListener("enter-fade-start", c);
        (this.panorama = a).onEnter();
      }
    },
    eventHandler: function(a) {
      if (a.method && this[a.method])
        this[a.method](a.data);
    },
    dispatchEventToChildren: function(a) {
      this.scene.traverse(function(b) {
        b.dispatchEvent && b.dispatchEvent(a);
      });
    },
    activateWidgetItem: function(a, b) {
      var c = this.widget.mainMenu, d = c.children[0];
      c = c.children[1];
      if (void 0 !== a) {
        switch (a) {
          case 0:
            a = d.subMenu.children[1];
            break;
          case 1:
            a = d.subMenu.children[2];
            break;
          default:
            a = d.subMenu.children[1];
        }
        d.subMenu.setActiveItem(a);
        d.setSelectionTitle(a.textContent);
      }
      if (void 0 !== b) {
        switch (b) {
          case t.CARDBOARD:
            a = c.subMenu.children[2];
            break;
          case t.STEREO:
            a = c.subMenu.children[3];
            break;
          default:
            a = c.subMenu.children[1];
        }
        c.subMenu.setActiveItem(a);
        c.setSelectionTitle(a.textContent);
      }
    },
    enableEffect: function(a) {
      if (this.mode !== a)
        if (a === t.NORMAL)
          this.disableEffect();
        else {
          this.mode = a;
          var b = this.camera.fov;
          switch (a) {
            case t.CARDBOARD:
              this.effect = this.CardboardEffect;
              this.enableReticleControl();
              break;
            case t.STEREO:
              this.effect = this.StereoEffect;
              this.enableReticleControl();
              break;
            default:
              this.effect = null, this.disableReticleControl();
          }
          this.activateWidgetItem(void 0, this.mode);
          this.dispatchEventToChildren({ type: "panolens-dual-eye-effect", mode: this.mode });
          this.camera.fov = b + 0.01;
          this.effect.setSize(this.container.clientWidth, this.container.clientHeight);
          this.render();
          this.camera.fov = b;
          this.dispatchEvent({ type: "mode-change", mode: this.mode });
        }
    },
    disableEffect: function() {
      this.mode !== t.NORMAL && (this.mode = t.NORMAL, this.disableReticleControl(), this.activateWidgetItem(
        void 0,
        this.mode
      ), this.dispatchEventToChildren({ type: "panolens-dual-eye-effect", mode: this.mode }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.render(), this.dispatchEvent({ type: "mode-change", mode: this.mode }));
    },
    enableReticleControl: function() {
      this.reticle.visible || (this.tempEnableReticle = true, this.unregisterMouseAndTouchEvents(), this.reticle.show(), this.registerReticleEvent(), this.updateReticleEvent());
    },
    disableReticleControl: function() {
      this.tempEnableReticle = false;
      this.options.enableReticle ? this.updateReticleEvent() : (this.reticle.hide(), this.unregisterReticleEvent(), this.registerMouseAndTouchEvents());
    },
    enableAutoRate: function() {
      this.options.autoRotate = true;
      this.OrbitControls.autoRotate = true;
    },
    disableAutoRate: function() {
      clearTimeout(this.autoRotateRequestId);
      this.options.autoRotate = false;
      this.OrbitControls.autoRotate = false;
    },
    toggleVideoPlay: function(a) {
      this.panorama instanceof B && this.panorama.dispatchEvent({ type: "video-toggle", pause: a });
    },
    setVideoCurrentTime: function(a) {
      this.panorama instanceof B && this.panorama.dispatchEvent({ type: "video-time", percentage: a });
    },
    onVideoUpdate: function(a) {
      var b = this.widget;
      b && b.dispatchEvent({ type: "video-update", percentage: a });
    },
    addUpdateCallback: function(a) {
      a && this.updateCallbacks.push(a);
    },
    removeUpdateCallback: function(a) {
      var b = this.updateCallbacks.indexOf(a);
      a && 0 <= b && this.updateCallbacks.splice(b, 1);
    },
    showVideoWidget: function() {
      var a = this.widget;
      a && a.dispatchEvent({ type: "video-control-show" });
    },
    hideVideoWidget: function() {
      var a = this.widget;
      a && a.dispatchEvent({ type: "video-control-hide" });
    },
    updateVideoPlayButton: function(a) {
      var b = this.widget;
      b && b.videoElement && b.videoElement.controlButton && b.videoElement.controlButton.update(a);
    },
    addPanoramaEventListener: function(a) {
      a.addEventListener("enter-fade-start", this.setCameraControl.bind(this));
      a instanceof B && (a.addEventListener("enter-fade-start", this.showVideoWidget.bind(this)), a.addEventListener("leave", function() {
        this.panorama instanceof B || this.hideVideoWidget.call(this);
      }.bind(this)));
    },
    setCameraControl: function() {
      this.OrbitControls.target.copy(this.panorama.position);
    },
    getControl: function() {
      return this.control;
    },
    getScene: function() {
      return this.scene;
    },
    getCamera: function() {
      return this.camera;
    },
    getRenderer: function() {
      return this.renderer;
    },
    getContainer: function() {
      return this.container;
    },
    getControlId: function() {
      return this.control.id;
    },
    getNextControlId: function() {
      return this.controls[this.getNextControlIndex()].id;
    },
    getNextControlIndex: function() {
      var a = this.controls, b = a.indexOf(this.control) + 1;
      return b >= a.length ? 0 : b;
    },
    setCameraFov: function(a) {
      this.camera.fov = a;
      this.camera.updateProjectionMatrix();
    },
    enableControl: function(a) {
      a = 0 <= a && a < this.controls.length ? a : 0;
      this.control.enabled = false;
      this.control = this.controls[a];
      this.control.enabled = true;
      switch (a) {
        case E.ORBIT:
          this.camera.position.copy(this.panorama.position);
          this.camera.position.z += 1;
          break;
        case E.DEVICEORIENTATION:
          this.camera.position.copy(this.panorama.position);
      }
      this.control.update();
      this.activateWidgetItem(a, void 0);
    },
    disableControl: function() {
      this.control.enabled = false;
    },
    toggleNextControl: function() {
      this.enableControl(this.getNextControlIndex());
    },
    getScreenVector: function(a) {
      a = a.clone();
      var b = this.container.clientWidth / 2, c = this.container.clientHeight / 2;
      a.project(this.camera);
      a.x = a.x * b + b;
      a.y = -(a.y * c) + c;
      a.z = 0;
      return a;
    },
    checkSpriteInViewport: function(a) {
      this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
      this.cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
      this.cameraFrustum.setFromMatrix(this.cameraViewProjectionMatrix);
      return a.visible && this.cameraFrustum.intersectsSprite(a);
    },
    reverseDraggingDirection: function() {
      this.OrbitControls.rotateSpeed *= -1;
      this.OrbitControls.momentumScalingFactor *= -1;
    },
    addReticle: function() {
      this.reticle = new M(16777215, true, this.options.dwellTime);
      this.reticle.hide();
      this.camera.add(this.reticle);
      this.sceneReticle.add(this.camera);
    },
    tweenControlCenter: function(a, b, c) {
      var d;
      if (this.control === this.OrbitControls) {
        a instanceof Array && (b = a[1], c = a[2], a = a[0]);
        b = void 0 !== b ? b : 1e3;
        c = c || r.Easing.Exponential.Out;
        var g = this;
        var k = this.camera.getWorldDirection(new e.Vector3());
        var h2 = k.clone();
        var m = this.panorama.getWorldPosition(new e.Vector3()).sub(this.camera.getWorldPosition(new e.Vector3()));
        a = a.clone();
        a.x *= -1;
        a.add(m).normalize();
        var l = a.clone();
        k.y = 0;
        a.y = 0;
        m = Math.atan2(a.z, a.x) - Math.atan2(k.z, k.x);
        m = m > Math.PI ? m - 2 * Math.PI : m;
        m = m < -Math.PI ? m + 2 * Math.PI : m;
        k = Math.abs(h2.angleTo(k) + (0 >= h2.y * l.y ? l.angleTo(a) : -l.angleTo(a)));
        k *= l.y < h2.y ? 1 : -1;
        h2 = { left: 0, up: 0 };
        var n2 = d = 0;
        this.tweenLeftAnimation.stop();
        this.tweenUpAnimation.stop();
        this.tweenLeftAnimation = new r.Tween(h2).to(
          { left: m },
          b
        ).easing(c).onUpdate(function(a2) {
          g.control.rotateLeft(a2.left - d);
          d = a2.left;
        }).start();
        this.tweenUpAnimation = new r.Tween(h2).to({ up: k }, b).easing(c).onUpdate(function(a2) {
          g.control.rotateUp(a2.up - n2);
          n2 = a2.up;
        }).start();
      }
    },
    tweenControlCenterByObject: function(a, b, c) {
      var d = false;
      a.traverseAncestors(function(a2) {
        a2.scalePlaceHolder && (d = true);
      });
      if (d) {
        var g = new e.Vector3(-1, 1, 1);
        this.tweenControlCenter(a.getWorldPosition(new e.Vector3()).multiply(g), b, c);
      } else
        this.tweenControlCenter(a.getWorldPosition(new e.Vector3()), b, c);
    },
    onWindowResize: function(a, b) {
      var c = this.container.classList.contains("panolens-container") || this.container.isFullscreen;
      if (void 0 !== a && void 0 !== b) {
        var d = a;
        var e2 = b;
        this.container._width = a;
        this.container._height = b;
      } else
        a = (b = /(android)/i.test(window.navigator.userAgent)) ? Math.min(document.documentElement.clientWidth, window.innerWidth || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), b = b ? Math.min(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ), d = c ? a : this.container.clientWidth, e2 = c ? b : this.container.clientHeight, this.container._width = d, this.container._height = e2;
      this.camera.aspect = d / e2;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(d, e2);
      (this.options.enableReticle || this.tempEnableReticle) && this.updateReticleEvent();
      this.dispatchEvent({ type: "window-resize", width: d, height: e2 });
      this.scene.traverse(function(a2) {
        a2.dispatchEvent && a2.dispatchEvent({ type: "window-resize", width: d, height: e2 });
      });
    },
    addOutputElement: function() {
      var a = document.createElement("div");
      a.style.position = "absolute";
      a.style.right = "10px";
      a.style.top = "10px";
      a.style.color = "#fff";
      this.container.appendChild(a);
      this.outputDivElement = a;
    },
    outputPosition: function() {
      var a = this.raycaster.intersectObject(this.panorama, true);
      if (0 < a.length) {
        a = a[0].point.clone();
        var b = new e.Vector3(-1, 1, 1), c = this.panorama.getWorldPosition(new e.Vector3());
        a.sub(c).multiply(b);
        b = a.x.toFixed(2) + ", " + a.y.toFixed(2) + ", " + a.z.toFixed(2);
        if (0 !== a.length())
          switch (this.options.output) {
            case "console":
              console.info(b);
              break;
            case "overlay":
              this.outputDivElement.textContent = b;
          }
      }
    },
    onMouseDown: function(a) {
      a.preventDefault();
      this.userMouse.x = 0 <= a.clientX ? a.clientX : a.touches[0].clientX;
      this.userMouse.y = 0 <= a.clientY ? a.clientY : a.touches[0].clientY;
      this.userMouse.type = "mousedown";
      this.onTap(a);
    },
    onMouseMove: function(a) {
      a.preventDefault();
      this.userMouse.type = "mousemove";
      this.onTap(a);
    },
    onMouseUp: function(a) {
      this.userMouse.type = "mouseup";
      var b = this.userMouse.x >= a.clientX - this.options.clickTolerance && this.userMouse.x <= a.clientX + this.options.clickTolerance && this.userMouse.y >= a.clientY - this.options.clickTolerance && this.userMouse.y <= a.clientY + this.options.clickTolerance || a.changedTouches && this.userMouse.x >= a.changedTouches[0].clientX - this.options.clickTolerance && this.userMouse.x <= a.changedTouches[0].clientX + this.options.clickTolerance && this.userMouse.y >= a.changedTouches[0].clientY - this.options.clickTolerance && this.userMouse.y <= a.changedTouches[0].clientY + this.options.clickTolerance ? "click" : void 0;
      if (!a || !a.target || a.target.classList.contains("panolens-canvas")) {
        if (a.preventDefault(), a = a.changedTouches && 1 === a.changedTouches.length ? this.onTap({ clientX: a.changedTouches[0].clientX, clientY: a.changedTouches[0].clientY }, b) : this.onTap(a, b), this.userMouse.type = "none", !a && "click" === b) {
          b = this.options;
          a = b.autoHideControlBar;
          var c = this.panorama, d = this.toggleControlBar;
          b.autoHideInfospot && c && c.toggleInfospotVisibility();
          a && d();
        }
      }
    },
    onTap: function(a, b) {
      var c = this.container.getBoundingClientRect(), d = c.top, e2 = this.container, h2 = e2.clientHeight;
      this.raycasterPoint.x = (a.clientX - c.left) / e2.clientWidth * 2 - 1;
      this.raycasterPoint.y = 2 * -((a.clientY - d) / h2) + 1;
      this.raycaster.setFromCamera(this.raycasterPoint, this.camera);
      if (this.panorama) {
        ("mousedown" !== a.type && this.touchSupported || this.OUTPUT_INFOSPOT) && this.outputPosition();
        c = this.raycaster.intersectObjects(this.panorama.children, true);
        d = this.getConvertedIntersect(c);
        e2 = 0 < c.length ? c[0].object : void 0;
        "mouseup" === this.userMouse.type && (d && this.pressEntityObject === d && this.pressEntityObject.dispatchEvent && this.pressEntityObject.dispatchEvent({
          type: "pressstop-entity",
          mouseEvent: a
        }), this.pressEntityObject = void 0);
        "mouseup" === this.userMouse.type && (e2 && this.pressObject === e2 && this.pressObject.dispatchEvent && this.pressObject.dispatchEvent({ type: "pressstop", mouseEvent: a }), this.pressObject = void 0);
        if ("click" === b)
          this.panorama.dispatchEvent({ type: "click", intersects: c, mouseEvent: a }), d && d.dispatchEvent && d.dispatchEvent({ type: "click-entity", mouseEvent: a }), e2 && e2.dispatchEvent && e2.dispatchEvent({ type: "click", mouseEvent: a });
        else {
          this.panorama.dispatchEvent({
            type: "hover",
            intersects: c,
            mouseEvent: a
          });
          if (this.hoverObject && 0 < c.length && this.hoverObject !== d || this.hoverObject && 0 === c.length)
            this.hoverObject.dispatchEvent && (this.hoverObject.dispatchEvent({ type: "hoverleave", mouseEvent: a }), this.reticle.end()), this.hoverObject = void 0;
          d && 0 < c.length && (this.hoverObject !== d && (this.hoverObject = d, this.hoverObject.dispatchEvent && (this.hoverObject.dispatchEvent({ type: "hoverenter", mouseEvent: a }), (this.options.autoReticleSelect && this.options.enableReticle || this.tempEnableReticle) && this.reticle.start(this.onTap.bind(
            this,
            a,
            "click"
          )))), "mousedown" === this.userMouse.type && this.pressEntityObject != d && (this.pressEntityObject = d, this.pressEntityObject.dispatchEvent && this.pressEntityObject.dispatchEvent({ type: "pressstart-entity", mouseEvent: a })), "mousedown" === this.userMouse.type && this.pressObject != e2 && (this.pressObject = e2, this.pressObject.dispatchEvent && this.pressObject.dispatchEvent({ type: "pressstart", mouseEvent: a })), "mousemove" === this.userMouse.type || this.options.enableReticle) && (e2 && e2.dispatchEvent && e2.dispatchEvent({
            type: "hover",
            mouseEvent: a
          }), this.pressEntityObject && this.pressEntityObject.dispatchEvent && this.pressEntityObject.dispatchEvent({ type: "pressmove-entity", mouseEvent: a }), this.pressObject && this.pressObject.dispatchEvent && this.pressObject.dispatchEvent({ type: "pressmove", mouseEvent: a }));
          !d && this.pressEntityObject && this.pressEntityObject.dispatchEvent && (this.pressEntityObject.dispatchEvent({ type: "pressstop-entity", mouseEvent: a }), this.pressEntityObject = void 0);
          !e2 && this.pressObject && this.pressObject.dispatchEvent && (this.pressObject.dispatchEvent({
            type: "pressstop",
            mouseEvent: a
          }), this.pressObject = void 0);
        }
        if (e2 && e2 instanceof z) {
          if (this.infospot = e2, "click" === b)
            return true;
        } else
          this.infospot && this.hideInfospot();
        this.options.autoRotate && "mousemove" !== this.userMouse.type && (clearTimeout(this.autoRotateRequestId), this.control === this.OrbitControls && (this.OrbitControls.autoRotate = false, this.autoRotateRequestId = window.setTimeout(this.enableAutoRate.bind(this), this.options.autoRotateActivationDuration)));
      }
    },
    getConvertedIntersect: function(a) {
      for (var b, c = 0; c < a.length; c++)
        if (0 <= a[c].distance && a[c].object && !a[c].object.passThrough && (!a[c].object.entity || !a[c].object.entity.passThrough)) {
          b = a[c].object.entity && !a[c].object.entity.passThrough ? a[c].object.entity : a[c].object;
          break;
        }
      return b;
    },
    hideInfospot: function() {
      this.infospot && (this.infospot.onHoverEnd(), this.infospot = void 0);
    },
    toggleControlBar: function() {
      var a = this.widget;
      a && a.dispatchEvent({ type: "control-bar-toggle" });
    },
    onKeyDown: function(a) {
      this.options.output && "none" !== this.options.output && "Control" === a.key && (this.OUTPUT_INFOSPOT = true);
    },
    onKeyUp: function() {
      this.OUTPUT_INFOSPOT = false;
    },
    update: function() {
      r.update();
      this.updateCallbacks.forEach(function(a) {
        a();
      });
      this.control.update();
      this.scene.traverse(function(a) {
        if (a instanceof z && a.element && (this.hoverObject === a || "none" !== a.element.style.display || a.element.left && "none" !== a.element.left.style.display || a.element.right && "none" !== a.element.right.style.display))
          if (this.checkSpriteInViewport(a)) {
            var b = this.getScreenVector(a.getWorldPosition(new e.Vector3()));
            a.translateElement(b.x, b.y);
          } else
            a.onDismiss();
      }.bind(this));
    },
    render: function() {
      this.mode === t.CARDBOARD || this.mode === t.STEREO ? (this.renderer.clear(), this.effect.render(this.scene, this.camera), this.effect.render(this.sceneReticle, this.camera)) : (this.renderer.clear(), this.renderer.render(this.scene, this.camera), this.renderer.clearDepth(), this.renderer.render(this.sceneReticle, this.camera));
    },
    animate: function() {
      this.requestAnimationId = window.requestAnimationFrame(this.animate.bind(this));
      this.onChange();
    },
    onChange: function() {
      this.update();
      this.render();
    },
    registerMouseAndTouchEvents: function() {
      var a = { passive: false };
      this.container.addEventListener("mousedown", this.HANDLER_MOUSE_DOWN, a);
      this.container.addEventListener("mousemove", this.HANDLER_MOUSE_MOVE, a);
      this.container.addEventListener("mouseup", this.HANDLER_MOUSE_UP, a);
      this.container.addEventListener("touchstart", this.HANDLER_MOUSE_DOWN, a);
      this.container.addEventListener("touchend", this.HANDLER_MOUSE_UP, a);
    },
    unregisterMouseAndTouchEvents: function() {
      this.container.removeEventListener("mousedown", this.HANDLER_MOUSE_DOWN, false);
      this.container.removeEventListener(
        "mousemove",
        this.HANDLER_MOUSE_MOVE,
        false
      );
      this.container.removeEventListener("mouseup", this.HANDLER_MOUSE_UP, false);
      this.container.removeEventListener("touchstart", this.HANDLER_MOUSE_DOWN, false);
      this.container.removeEventListener("touchend", this.HANDLER_MOUSE_UP, false);
    },
    registerReticleEvent: function() {
      this.addUpdateCallback(this.HANDLER_TAP);
    },
    unregisterReticleEvent: function() {
      this.removeUpdateCallback(this.HANDLER_TAP);
    },
    updateReticleEvent: function() {
      var a = this.container.clientWidth / 2 + this.container.offsetLeft, b = this.container.clientHeight / 2;
      this.removeUpdateCallback(this.HANDLER_TAP);
      this.HANDLER_TAP = this.onTap.bind(this, { clientX: a, clientY: b });
      this.addUpdateCallback(this.HANDLER_TAP);
    },
    registerEventListeners: function() {
      window.addEventListener("resize", this.HANDLER_WINDOW_RESIZE, true);
      window.addEventListener("keydown", this.HANDLER_KEY_DOWN, true);
      window.addEventListener("keyup", this.HANDLER_KEY_UP, true);
    },
    unregisterEventListeners: function() {
      window.removeEventListener("resize", this.HANDLER_WINDOW_RESIZE, true);
      window.removeEventListener(
        "keydown",
        this.HANDLER_KEY_DOWN,
        true
      );
      window.removeEventListener("keyup", this.HANDLER_KEY_UP, true);
    },
    dispose: function() {
      function a(b) {
        for (var c = b.children.length - 1; 0 <= c; c--)
          a(b.children[c]), b.remove(b.children[c]);
        b instanceof n || b instanceof z ? b.dispose() : b.dispatchEvent && b.dispatchEvent("dispose");
      }
      this.tweenLeftAnimation.stop();
      this.tweenUpAnimation.stop();
      this.unregisterEventListeners();
      a(this.scene);
      this.widget && (this.widget.dispose(), this.widget = null);
      e.Cache && e.Cache.enabled && e.Cache.clear();
    },
    destroy: function() {
      this.dispose();
      this.render();
      window.cancelAnimationFrame(this.requestAnimationId);
    },
    onPanoramaDispose: function(a) {
      a instanceof B && this.hideVideoWidget();
      a === this.panorama && (this.panorama = null);
    },
    loadAsyncRequest: function(a, b) {
      b = void 0 === b ? function() {
      } : b;
      var c = new window.XMLHttpRequest();
      c.onloadend = function(a2) {
        b(a2);
      };
      c.open("GET", a, true);
      c.send(null);
    },
    addViewIndicator: function() {
      var a = this;
      this.loadAsyncRequest(u.ViewIndicator, function(b) {
        if (0 !== b.loaded) {
          b = b.target.responseXML.documentElement;
          b.style.width = a.viewIndicatorSize + "px";
          b.style.height = a.viewIndicatorSize + "px";
          b.style.position = "absolute";
          b.style.top = "10px";
          b.style.left = "10px";
          b.style.opacity = "0.5";
          b.style.cursor = "pointer";
          b.id = "panolens-view-indicator-container";
          a.container.appendChild(b);
          var c = b.querySelector("#indicator");
          a.addUpdateCallback(function() {
            a.radius = 0.225 * a.viewIndicatorSize;
            a.currentPanoAngle = a.camera.rotation.y - e.Math.degToRad(90);
            a.fovAngle = e.Math.degToRad(a.camera.fov);
            a.leftAngle = -a.currentPanoAngle - a.fovAngle / 2;
            a.rightAngle = -a.currentPanoAngle + a.fovAngle / 2;
            a.leftX = a.radius * Math.cos(a.leftAngle);
            a.leftY = a.radius * Math.sin(a.leftAngle);
            a.rightX = a.radius * Math.cos(a.rightAngle);
            a.rightY = a.radius * Math.sin(a.rightAngle);
            a.indicatorD = "M " + a.leftX + " " + a.leftY + " A " + a.radius + " " + a.radius + " 0 0 1 " + a.rightX + " " + a.rightY;
            a.leftX && a.leftY && a.rightX && a.rightY && a.radius && c.setAttribute("d", a.indicatorD);
          });
          b.addEventListener("mouseenter", function() {
            this.style.opacity = "1";
          });
          b.addEventListener("mouseleave", function() {
            this.style.opacity = "0.5";
          });
        }
      });
    },
    appendControlItem: function(a) {
      var b = this.widget.createCustomItem(a);
      "video" === a.group ? this.widget.videoElement.appendChild(b) : this.widget.barElement.appendChild(b);
      return b;
    },
    clearAllCache: function() {
      e.Cache.clear();
    }
  });
  "105" != e.REVISION && console.warn("three.js version is not matched. Please consider use the target revision 105");
  window.TWEEN = r;
  h.BasicPanorama = O;
  h.CONTROLS = E;
  h.CameraPanorama = J;
  h.CubePanorama = F;
  h.CubeTextureLoader = fa;
  h.DataImage = u;
  h.EmptyPanorama = W;
  h.GoogleStreetviewPanorama = Z;
  h.ImageLittlePlanet = aa;
  h.ImageLoader = ea;
  h.ImagePanorama = y;
  h.Infospot = z;
  h.LittlePlanet = C;
  h.MODES = t;
  h.Media = S;
  h.Panorama = n;
  h.REVISION = "11";
  h.Reticle = M;
  h.THREE_REVISION = "105";
  h.THREE_VERSION = ja;
  h.TextureLoader = N;
  h.VERSION = "0.11.0";
  h.VideoPanorama = B;
  h.Viewer = da;
  h.Widget = I;
  Object.defineProperty(h, "__esModule", { value: true });
});
({
  TWEEN,
  PANOLENS
});
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<h1${serverRenderer.exports.ssrRenderAttrs(_attrs)}>HI</h1>`);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$1);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, __nuxt_component_0 as a, entry$1 as default, useHead as u, vue_cjs_prod as v };
//# sourceMappingURL=server.mjs.map
