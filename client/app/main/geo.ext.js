!function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document)
            throw new Error("jQuery requires a window with a document");
        return factory(w)
    }
     : factory(global)
}
("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length
          , type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier))
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            }
            );
        if (qualifier.nodeType)
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            }
            );
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier))
                return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not
        }
        )
    }
    function sibling(cur, dir) {
        for (; (cur = cur[dir]) && 1 !== cur.nodeType; )
            ;
        return cur
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0
        }
        ),
        object
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1),
        window.removeEventListener("load", completed, !1),
        jQuery.ready()
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }),
        this.expando = jQuery.expando + Data.uid++
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType)
            if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(),
            data = elem.getAttribute(name),
            "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null  : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                data_user.set(elem, key, data)
            } else
                data = void 0;
        return data
    }
    function returnTrue() {
        return !0
    }
    function returnFalse() {
        return !1
    }
    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }
    function disableScript(elem) {
        return elem.type = (null  !== elem.getAttribute("type")) + "/" + elem.type,
        elem
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"),
        elem
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; l > i; i++)
            data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src),
            pdataCur = data_priv.set(dest, pdataOld),
            events = pdataOld.events)) {
                delete pdataCur.handle,
                pdataCur.events = {};
                for (type in events)
                    for (i = 0,
                    l = events[type].length; l > i; i++)
                        jQuery.event.add(dest, type, events[type][i])
            }
            data_user.hasData(src) && (udataOld = data_user.access(src),
            udataCur = jQuery.extend({}, udataOld),
            data_user.set(dest, udataCur))
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(),
        display
    }
    function defaultDisplay(nodeName) {
        var doc = document
          , display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc),
        "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement),
        doc = iframe[0].contentDocument,
        doc.write(),
        doc.close(),
        display = actualDisplay(nodeName, doc),
        iframe.detach()),
        elemdisplay[nodeName] = display),
        display
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem),
        computed && (ret = computed.getPropertyValue(name) || computed[name]),
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)),
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width,
        minWidth = style.minWidth,
        maxWidth = style.maxWidth,
        style.minWidth = style.maxWidth = style.width = ret,
        ret = computed.width,
        style.width = width,
        style.minWidth = minWidth,
        style.maxWidth = maxWidth)),
        void 0 !== ret ? ret + "" : ret
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments)
            }
        }
    }
    function vendorPropName(style, name) {
        if (name in style)
            return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; )
            if (name = cssPrefixes[i] + capName,
            name in style)
                return name;
        return origName
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2)
            "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)),
            isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)),
            "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles),
            "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0
          , val = "width" === name ? elem.offsetWidth : elem.offsetHeight
          , styles = getStyles(elem)
          , isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null  == val) {
            if (val = curCSS(elem, name, styles),
            (0 > val || null  == val) && (val = elem.style[name]),
            rnumnonpx.test(val))
                return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]),
            val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++)
            elem = elements[index],
            elem.style && (values[index] = data_priv.get(elem, "olddisplay"),
            display = elem.style.display,
            show ? (values[index] || "none" !== display || (elem.style.display = ""),
            "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem),
            "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++)
            elem = elements[index],
            elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem,options,prop,end,easing)
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0
        }
        ),
        fxNow = jQuery.now()
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth)
            which = cssExpand[i],
            attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type),
        attrs
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++)
            if (tween = collection[index].call(animation, prop, value))
                return tween
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"),
        null  == hooks.unqueued && (hooks.unqueued = 0,
        oldfire = hooks.empty.fire,
        hooks.empty.fire = function() {
            hooks.unqueued || oldfire()
        }
        ),
        hooks.unqueued++,
        anim.always(function() {
            anim.always(function() {
                hooks.unqueued--,
                jQuery.queue(elem, "fx").length || hooks.empty.fire()
            }
            )
        }
        )),
        1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY],
        display = jQuery.css(elem, "display"),
        checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display,
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")),
        opts.overflow && (style.overflow = "hidden",
        anim.always(function() {
            style.overflow = opts.overflow[0],
            style.overflowX = opts.overflow[1],
            style.overflowY = opts.overflow[2]
        }
        ));
        for (prop in props)
            if (value = props[prop],
            rfxtypes.exec(value)) {
                if (delete props[prop],
                toggle = toggle || "toggle" === value,
                value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || void 0 === dataShow[prop])
                        continue;hidden = !0
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else
                display = void 0;
        if (jQuery.isEmptyObject(orig))
            "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
        else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}),
            toggle && (dataShow.hidden = !hidden),
            hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide()
            }
            ),
            anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig)
                    jQuery.style(elem, prop, orig[prop])
            }
            );
            for (prop in orig)
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim),
                prop in dataShow || (dataShow[prop] = tween.start,
                hidden && (tween.end = tween.start,
                tween.start = "width" === prop || "height" === prop ? 1 : 0))
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props)
            if (name = jQuery.camelCase(index),
            easing = specialEasing[name],
            value = props[index],
            jQuery.isArray(value) && (easing = value[1],
            value = props[index] = value[0]),
            index !== name && (props[name] = value,
            delete props[index]),
            hooks = jQuery.cssHooks[name],
            hooks && "expand" in hooks) {
                value = hooks.expand(value),
                delete props[name];
                for (index in value)
                    index in props || (props[index] = value[index],
                    specialEasing[index] = easing)
            } else
                specialEasing[name] = easing
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }
        ), tick = function() {
            if (stopped)
                return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++)
                animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [animation, percent, remaining]),
            1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]),
            !1)
        }
        , animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween),
                tween
            },
            stop: function(gotoEnd) {
                var index = 0
                  , length = gotoEnd ? animation.tweens.length : 0;
                if (stopped)
                    return this;
                for (stopped = !0; length > index; index++)
                    animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]),
                this
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++)
            if (result = animationPrefilters[index].call(animation, elem, props, animation.opts))
                return result;
        return jQuery.map(props, createTween, animation),
        jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation),
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })),
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression,
            dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func))
                for (; dataType = dataTypes[i++]; )
                    "+" === dataType[0] ? (dataType = dataType.slice(1) || "*",
                    (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0,
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport),
                inspect(dataTypeOrTransport),
                !1)
            }
            ),
            selected
        }
        var inspected = {}
          , seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src)
            void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep),
        target
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; )
            dataTypes.shift(),
            void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct)
            for (type in contents)
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
        if (dataTypes[0] in responses)
            finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType),
        responses[finalDataType]) : void 0
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1])
            for (conv in s.converters)
                converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; )
            if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response),
            !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)),
            prev = current,
            current = dataTypes.shift())
                if ("*" === current)
                    current = prev;
                else if ("*" !== prev && prev !== current) {
                    if (conv = converters[prev + " " + current] || converters["* " + current],
                    !conv)
                        for (conv2 in converters)
                            if (tmp = conv2.split(" "),
                            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0],
                                dataTypes.unshift(tmp[1]));
                                break
                            }
                    if (conv !== !0)
                        if (conv && s["throws"])
                            response = conv(response);
                        else
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                }
        return {
            state: "success",
            data: response
        }
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj))
            jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
            }
            );
        else if (traditional || "object" !== jQuery.type(obj))
            add(prefix, obj);
        else
            for (name in obj)
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView
    }
    var arr = []
      , slice = arr.slice
      , concat = arr.concat
      , push = arr.push
      , indexOf = arr.indexOf
      , class2type = {}
      , toString = class2type.toString
      , hasOwn = class2type.hasOwnProperty
      , support = {}
      , document = window.document
      , version = "2.1.4"
      , jQuery = function(selector, context) {
        return new jQuery.fn.init(selector,context)
    }
      , rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , rmsPrefix = /^-ms-/
      , rdashAlpha = /-([\da-z])/gi
      , fcamelCase = function(all, letter) {
        return letter.toUpperCase()
    }
    ;
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(num) {
            return null  != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this)
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this,
            ret.context = this.context,
            ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }
            ))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(i) {
            var len = this.length
              , j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null )
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    },
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target,
        target = arguments[i] || {},
        i++),
        "object" == typeof target || jQuery.isFunction(target) || (target = {}),
        i === length && (target = this,
        i--); length > i; i++)
            if (null  != (options = arguments[i]))
                for (name in options)
                    src = target[name],
                    copy = options[name],
                    target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1,
                    clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {},
                    target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target
    }
    ,
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg)
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj)
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null  != obj && obj === obj.window
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0
        },
        isPlainObject: function(obj) {
            return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj)
                return !1;
            return !0
        },
        type: function(obj) {
            return null  == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code),
            code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"),
            script.text = code,
            document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray)
                    for (; length > i && (value = callback.apply(obj[i], args),
                    value !== !1); i++)
                        ;
                else
                    for (i in obj)
                        if (value = callback.apply(obj[i], args),
                        value === !1)
                            break
            } else if (isArray)
                for (; length > i && (value = callback.call(obj[i], i, obj[i]),
                value !== !1); i++)
                    ;
            else
                for (i in obj)
                    if (value = callback.call(obj[i], i, obj[i]),
                    value === !1)
                        break;
            return obj
        },
        trim: function(text) {
            return null  == text ? "" : (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null  != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)),
            ret
        },
        inArray: function(elem, arr, i) {
            return null  == arr ? -1 : indexOf.call(arr, elem, i)
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; j++)
                first[i++] = second[j];
            return first.length = i,
            first
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++)
                callbackInverse = !callback(elems[i], i),
                callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray)
                for (; length > i; i++)
                    value = callback(elems[i], i, arg),
                    null  != value && ret.push(value);
            else
                for (i in elems)
                    value = callback(elems[i], i, arg),
                    null  != value && ret.push(value);
            return concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context],
            context = fn,
            fn = tmp),
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2),
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            }
            ,
            proxy.guid = fn.guid = fn.guid || jQuery.guid++,
            proxy) : void 0
        },
        now: Date.now,
        support: support
    }),
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    }
    );
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context),
            context = context || document,
            results = results || [],
            nodeType = context.nodeType,
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType)
                return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector)))
                    if (m = match[1]) {
                        if (9 === nodeType) {
                            if (elem = context.getElementById(m),
                            !elem || !elem.parentNode)
                                return results;
                            if (elem.id === m)
                                return results.push(elem),
                                results
                        } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m)
                            return results.push(elem),
                            results
                    } else {
                        if (match[2])
                            return push.apply(results, context.getElementsByTagName(selector)),
                            results;
                        if ((m = match[3]) && support.getElementsByClassName)
                            return push.apply(results, context.getElementsByClassName(m)),
                            results
                    }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando,
                    newContext = context,
                    newSelector = 1 !== nodeType && selector,
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector),
                        (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid),
                        nid = "[id='" + nid + "'] ",
                        i = groups.length; i--; )
                            groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context,
                        newSelector = groups.join(",")
                    }
                    if (newSelector)
                        try {
                            return push.apply(results, newContext.querySelectorAll(newSelector)),
                            results
                        } catch (qsaError) {} finally {
                            old || context.removeAttribute("id")
                        }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed)
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()],
                cache[key + " "] = value
            }
            var keys = [];
            return cache
        }
        function markFunction(fn) {
            return fn[expando] = !0,
            fn
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div)
            } catch (e) {
                return !1
            } finally {
                div.parentNode && div.parentNode.removeChild(div),
                div = null 
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; )
                Expr.attrHandle[arr[i]] = handler
        }
        function siblingCheck(a, b) {
            var cur = b && a
              , diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff)
                return diff;
            if (cur)
                for (; cur = cur.nextSibling; )
                    if (cur === b)
                        return -1;
            return a ? 1 : -1
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument,
                markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; )
                        seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                }
                )
            }
            )
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++)
                selector += tokens[i].value;
            return selector
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir
              , checkNonElements = base && "parentNode" === dir
              , doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (; elem = elem[dir]; )
                    if (1 === elem.nodeType || checkNonElements)
                        return matcher(elem, context, xml)
            }
             : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                    for (; elem = elem[dir]; )
                        if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml))
                            return !0
                } else
                    for (; elem = elem[dir]; )
                        if (1 === elem.nodeType || checkNonElements) {
                            if (outerCache = elem[expando] || (elem[expando] = {}),
                            (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName)
                                return newCache[2] = oldCache[2];
                            if (outerCache[dir] = newCache,
                            newCache[2] = matcher(elem, context, xml))
                                return !0
                        }
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; )
                    if (!matchers[i](elem, context, xml))
                        return !1;
                return !0
            }
             : matchers[0]
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++)
                Sizzle(selector, contexts[i], results);
            return results
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null  != map; len > i; i++)
                (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem),
                mapped && map.push(i));
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)),
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)),
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml),
                postFilter)
                    for (temp = condense(matcherOut, postMap),
                    postFilter(temp, [], context, xml),
                    i = temp.length; i--; )
                        (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [],
                            i = matcherOut.length; i--; )
                                (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null , matcherOut = [], temp, xml)
                        }
                        for (i = matcherOut.length; i--; )
                            (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                } else
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut),
                    postFinder ? postFinder(null , results, matcherOut, xml) : push.apply(results, matcherOut)
            }
            )
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            }
            , implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1
            }
            , implicitRelative, !0), matchers = [function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null ,
                ret
            }
            ]; len > i; i++)
                if (matcher = Expr.relative[tokens[i].type])
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null , tokens[i].matches),
                    matcher[expando]) {
                        for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++)
                            ;
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: " " === tokens[i - 2].type ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                    }
                    matchers.push(matcher)
                }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0
              , byElement = elementMatchers.length > 0
              , superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null  == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null  != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; )
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break
                            }
                        outermost && (dirruns = dirrunsUnique)
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--,
                    seed && unmatched.push(elem))
                }
                if (matchedCount += i,
                bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; )
                        matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0)
                            for (; i--; )
                                unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched),
                    outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                }
                return outermost && (dirruns = dirrunsUnique,
                outermostContext = contextBackup),
                unmatched
            }
            ;
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date, preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0),
            0
        }
        , MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++)
                if (list[i] === elem)
                    return i;
            return -1
        }
        , booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+","g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]","g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),
            bool: new RegExp("^(?:" + booleans + ")$","i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)","i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)","ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
        }
        , unloadHandler = function() {
            setDocument()
        }
        ;
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes),
            arr[preferredDoc.childNodes.length].nodeType
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els))
                }
                 : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; )
                        ;
                    target.length = j - 1
                }
            }
        }
        support = Sizzle.support = {},
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1
        }
        ,
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc,
            docElem = doc.documentElement,
            parent = doc.defaultView,
            parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)),
            documentIsHTML = !isXML(doc),
            support.attributes = assert(function(div) {
                return div.className = "i",
                !div.getAttribute("className")
            }
            ),
            support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")),
                !div.getElementsByTagName("*").length
            }
            ),
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName),
            support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando,
                !doc.getElementsByName || !doc.getElementsByName(expando).length
            }
            ),
            support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [m] : []
                }
            }
            ,
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId
                }
            }
            ) : (delete Expr.find.ID,
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId
                }
            }
            ),
            Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0
            }
             : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (; elem = results[i++]; )
                        1 === elem.nodeType && tmp.push(elem);
                    return tmp
                }
                return results
            }
            ,
            Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0
            }
            ,
            rbuggyMatches = [],
            rbuggyQSA = [],
            (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>",
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"),
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"),
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="),
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"),
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]")
            }
            ),
            assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"),
                div.appendChild(input).setAttribute("name", "D"),
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="),
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"),
                div.querySelectorAll("*,:x"),
                rbuggyQSA.push(",.*:")
            }
            )),
            (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"),
                matches.call(div, "[s!='']:x"),
                rbuggyMatches.push("!=", pseudos)
            }
            ),
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")),
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")),
            hasCompare = rnative.test(docElem.compareDocumentPosition),
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a
                  , bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
            }
             : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            sortOrder = hasCompare ? function(a, b) {
                if (a === b)
                    return hasDuplicate = !0,
                    0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1)
            }
             : function(a, b) {
                if (a === b)
                    return hasDuplicate = !0,
                    0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                if (!aup || !bup)
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup)
                    return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; )
                    ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; )
                    bp.unshift(cur);
                for (; ap[i] === bp[i]; )
                    i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
            }
            ,
            doc) : document
        }
        ,
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null , null , elements)
        }
        ,
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem),
            expr = expr.replace(rattributeQuotes, "='$1']"),
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr)))
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType)
                        return ret
                } catch (e) {}
            return Sizzle(expr, document, null , [elem]).length > 0
        }
        ,
        Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context),
            contains(context, elem)
        }
        ,
        Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()]
              , val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null 
        }
        ,
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        }
        ,
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates,
            sortInput = !support.sortStable && results.slice(0),
            results.sort(sortOrder),
            hasDuplicate) {
                for (; elem = results[i++]; )
                    elem === results[i] && (j = duplicates.push(i));
                for (; j--; )
                    results.splice(duplicates[j], 1)
            }
            return sortInput = null ,
            results
        }
        ,
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent)
                        return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        ret += getText(elem)
                } else if (3 === nodeType || 4 === nodeType)
                    return elem.nodeValue
            } else
                for (; node = elem[i++]; )
                    ret += getText(node);
            return ret
        }
        ,
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape),
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape),
                    "~=" === match[2] && (match[3] = " " + match[3] + " "),
                    match.slice(0, 4)
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(),
                    "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]),
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])),
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]),
                    match
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null  : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess),
                    match[2] = unquoted.slice(0, excess)),
                    match.slice(0, 3))
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0
                    }
                     : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "")
                    }
                    )
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null  == result ? "!=" === operator : operator ? (result += "",
                        "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
                    }
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3)
                      , forward = "last" !== type.slice(-4)
                      , ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode
                    }
                     : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (; dir; ) {
                                    for (node = elem; node = node[dir]; )
                                        if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType)
                                            return !1;
                                    start = dir = "only" === type && !start && "nextSibling"
                                }
                                return !0
                            }
                            if (start = [forward ? parent.firstChild : parent.lastChild],
                            forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}),
                                cache = outerCache[type] || [],
                                nodeIndex = cache[0] === dirruns && cache[1],
                                diff = cache[0] === dirruns && cache[2],
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); )
                                    if (1 === node.nodeType && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break
                                    }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns)
                                diff = cache[1];
                            else
                                for (; (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]),
                                node !== elem)); )
                                    ;
                            return diff -= last,
                            diff === first || diff % first === 0 && diff / first >= 0
                        }
                    }
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument],
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; )
                            idx = indexOf(seed, matched[i]),
                            seed[idx] = !(matches[idx] = matched[i])
                    }
                    ) : function(elem) {
                        return fn(elem, 0, args)
                    }
                    ) : fn
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = []
                      , results = []
                      , matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null , xml, []), i = seed.length; i--; )
                            (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }
                    ) : function(elem, context, xml) {
                        return input[0] = elem,
                        matcher(input, null , xml, results),
                        input[0] = null ,
                        !results.pop()
                    }
                }
                ),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }
                ),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape),
                    function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }
                ),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang),
                    lang = lang.replace(runescape, funescape).toLowerCase(),
                    function(elem) {
                        var elemLang;
                        do
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))
                                return elemLang = elemLang.toLowerCase(),
                                elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                        while ((elem = elem.parentNode) && 1 === elem.nodeType);return !1
                    }
                }
                ),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                },
                root: function(elem) {
                    return elem === docElem
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                enabled: function(elem) {
                    return elem.disabled === !1
                },
                disabled: function(elem) {
                    return elem.disabled === !0
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex,
                    elem.selected === !0
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        if (elem.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem)
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName)
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null  == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                },
                first: createPositionalPseudo(function() {
                    return [0]
                }
                ),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }
                ),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0 > argument ? argument + length : argument]
                }
                ),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }
                ),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }
                ),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; )
                        matchIndexes.push(i);
                    return matchIndexes
                }
                ),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; )
                        matchIndexes.push(i);
                    return matchIndexes
                }
                )
            }
        },
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        })
            Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos,
        Expr.setFilters = new setFilters,
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached)
                return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector,
            groups = [],
            preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar),
                groups.push(tokens = [])),
                matched = !1,
                (match = rcombinators.exec(soFar)) && (matched = match.shift(),
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }),
                soFar = soFar.slice(matched.length));
                for (type in Expr.filter)
                    !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(),
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    }),
                    soFar = soFar.slice(matched.length));
                if (!matched)
                    break
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        ,
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)),
                i = match.length; i--; )
                    cached = matcherFromTokens(match[i]),
                    cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)),
                cached.selector = selector
            }
            return cached
        }
        ,
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [],
            1 === match.length) {
                if (tokens = match[0] = match[0].slice(0),
                tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0],
                    !context)
                        return results;
                    compiled && (context = context.parentNode),
                    selector = selector.slice(tokens.shift().value.length)
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i],
                !Expr.relative[type = token.type]); )
                    if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                        if (tokens.splice(i, 1),
                        selector = seed.length && toSelector(tokens),
                        !selector)
                            return push.apply(results, seed),
                            results;
                        break
                    }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context),
            results
        }
        ,
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando,
        support.detectDuplicates = !!hasDuplicate,
        setDocument(),
        support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"))
        }
        ),
        assert(function(div) {
            return div.innerHTML = "<a href='#'></a>",
            "#" === div.firstChild.getAttribute("href")
        }
        ) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
        }
        ),
        support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>",
            div.firstChild.setAttribute("value", ""),
            "" === div.firstChild.getAttribute("value")
        }
        ) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
        }
        ),
        assert(function(div) {
            return null  == div.getAttribute("disabled")
        }
        ) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null 
        }
        ),
        Sizzle
    }
    (window);
    jQuery.find = Sizzle,
    jQuery.expr = Sizzle.selectors,
    jQuery.expr[":"] = jQuery.expr.pseudos,
    jQuery.unique = Sizzle.uniqueSort,
    jQuery.text = Sizzle.getText,
    jQuery.isXMLDoc = Sizzle.isXML,
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext
      , rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      , risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"),
        1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType
        }
        ))
    }
    ,
    jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector)
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; len > i; i++)
                        if (jQuery.contains(self[i], this))
                            return !0
                }
                ));
            for (i = 0; len > i; i++)
                jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret),
            ret.selector = this.selector ? this.selector + " " + selector : selector,
            ret
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1))
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0))
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector)
            return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null , selector, null ] : rquickExpr.exec(selector),
            !match || !match[1] && context)
                return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context,
                jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)),
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                    for (match in context)
                        jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this
            }
            return elem = document.getElementById(match[2]),
            elem && elem.parentNode && (this.length = 1,
            this[0] = elem),
            this.context = document,
            this.selector = selector,
            this
        }
        return selector.nodeType ? (this.context = this[0] = selector,
        this.length = 1,
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector,
        this.context = selector.context),
        jQuery.makeArray(selector, this))
    }
    ;
    init.prototype = jQuery.fn,
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/
      , guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; )
                if (1 === elem.nodeType) {
                    if (truncate && jQuery(elem).is(until))
                        break;
                    matched.push(elem)
                }
            return matched
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling)
                1 === n.nodeType && n !== elem && matched.push(n);
            return matched
        }
    }),
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this)
              , l = targets.length;
            return this.filter(function() {
                for (var i = 0; l > i; i++)
                    if (jQuery.contains(this, targets[i]))
                        return !0
            }
            )
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break
                    }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
        },
        addBack: function(selector) {
            return this.add(null  == selector ? this.prevObject : this.prevObject.filter(selector))
        }
    }),
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null 
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until),
            selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)),
            this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched),
            rparentsprev.test(name) && matched.reverse()),
            this.pushStack(matched)
        }
    }
    );
    var rnotwhite = /\S+/g
      , optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data,
            fired = !0,
            firingIndex = firingStart || 0,
            firingStart = 0,
            firingLength = list.length,
            firing = !0; list && firingLength > firingIndex; firingIndex++)
                if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                    memory = !1;
                    break
                }
            firing = !1,
            list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
        }
        , self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                        }
                        )
                    }
                    (arguments),
                    firing ? firingLength = list.length : memory && (firingStart = start,
                    fire(memory))
                }
                return this
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; )
                        list.splice(index, 1),
                        firing && (firingLength >= index && firingLength--,
                        firingIndex >= index && firingIndex--)
                }
                ),
                this
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
            },
            empty: function() {
                return list = [],
                firingLength = 0,
                this
            },
            disable: function() {
                return list = stack = memory = void 0,
                this
            },
            disabled: function() {
                return !list
            },
            lock: function() {
                return stack = void 0,
                memory || self.disable(),
                this
            },
            locked: function() {
                return !stack
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [],
                args = [context, args.slice ? args.slice() : args],
                firing ? stack.push(args) : fire(args)),
                this
            },
            fire: function() {
                return self.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!fired
            }
        };
        return self
    }
    ,
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]]
              , state = "pending"
              , promise = {
                state: function() {
                    return state
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                            }
                            )
                        }
                        ),
                        fns = null 
                    }
                    ).promise()
                },
                promise: function(obj) {
                    return null  != obj ? jQuery.extend(obj, promise) : promise
                }
            }
              , deferred = {};
            return promise.pipe = promise.then,
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2]
                  , stateString = tuple[3];
                promise[tuple[1]] = list.add,
                stateString && list.add(function() {
                    state = stateString
                }
                , tuples[1 ^ i][2].disable, tuples[2][2].lock),
                deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments),
                    this
                }
                ,
                deferred[tuple[0] + "With"] = list.fireWith
            }
            ),
            promise.promise(deferred),
            func && func.call(deferred, deferred),
            deferred
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this,
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value,
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                }
            }
            ;
            if (length > 1)
                for (progressValues = new Array(length),
                progressContexts = new Array(length),
                resolveContexts = new Array(length); length > i; i++)
                    resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues),
            deferred.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn),
        this
    }
    ,
    jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0,
            wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]),
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"),
            jQuery(document).off("ready"))))
        }
    }),
    jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(),
        "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1),
        window.addEventListener("load", completed, !1))),
        readyList.promise(obj)
    }
    ,
    jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0
          , len = elems.length
          , bulk = null  == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key)
                jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
        } else if (void 0 !== value && (chainable = !0,
        jQuery.isFunction(value) || (raw = !0),
        bulk && (raw ? (fn.call(elems, value),
        fn = null ) : (bulk = fn,
        fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value)
        }
        )),
        fn))
            for (; len > i; i++)
                fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
    }
    ;
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType
    }
    ,
    Data.uid = 1,
    Data.accepts = jQuery.acceptData,
    Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner))
                return 0;
            var descriptor = {}
              , unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    },
                    Object.defineProperties(owner, descriptor)
                } catch (e) {
                    descriptor[this.expando] = unlock,
                    jQuery.extend(owner, descriptor)
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}),
            unlock
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data)
                cache[data] = value;
            else if (jQuery.isEmptyObject(cache))
                jQuery.extend(this.cache[unlock], data);
            else
                for (prop in data)
                    cache[prop] = data[prop];
            return cache
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return void 0 === key ? cache : cache[key]
        },
        access: function(owner, key, value) {
            var stored;
            return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key),
            void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value),
            void 0 !== value ? value : key)
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (void 0 === key)
                this.cache[unlock] = {};
            else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key),
                key in cache ? name = [key, camel] : (name = camel,
                name = name in cache ? [name] : name.match(rnotwhite) || [])),
                i = name.length;
                for (; i--; )
                    delete cache[name[i]]
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]]
        }
    };
    var data_priv = new Data
      , data_user = new Data
      , rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem)
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data)
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name)
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data)
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name)
        }
    }),
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = data_user.get(elem),
                1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; )
                        attrs[i] && (name = attrs[i].name,
                        0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)),
                        dataAttr(elem, name, data[name])));
                    data_priv.set(elem, "hasDataAttrs", !0)
                }
                return data
            }
            return "object" == typeof key ? this.each(function() {
                data_user.set(this, key)
            }
            ) : access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key),
                    void 0 !== data)
                        return data;
                    if (data = data_user.get(elem, camelKey),
                    void 0 !== data)
                        return data;
                    if (data = dataAttr(elem, camelKey, void 0),
                    void 0 !== data)
                        return data
                } else
                    this.each(function() {
                        var data = data_user.get(this, camelKey);
                        data_user.set(this, camelKey, value),
                        -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value)
                    }
                    )
            }
            , null , value, arguments.length > 1, null , !0)
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key)
            }
            )
        }
    }),
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue",
            queue = data_priv.get(elem, type),
            data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)),
            queue || []) : void 0
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type)
              , startLength = queue.length
              , fn = queue.shift()
              , hooks = jQuery._queueHooks(elem, type)
              , next = function() {
                jQuery.dequeue(elem, type)
            }
            ;
            "inprogress" === fn && (fn = queue.shift(),
            startLength--),
            fn && ("fx" === type && queue.unshift("inprogress"),
            delete hooks.stop,
            fn.call(elem, next, hooks)),
            !startLength && hooks && hooks.empty.fire()
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [type + "queue", key])
                }
                )
            })
        }
    }),
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type,
            type = "fx",
            setter--),
            arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type),
                "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            }
            )
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            }
            )
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [elements])
            }
            ;
            for ("string" != typeof type && (obj = type,
            type = void 0),
            type = type || "fx"; i--; )
                tmp = data_priv.get(elements[i], type + "queueHooks"),
                tmp && tmp.empty && (count++,
                tmp.empty.add(resolve));
            return resolve(),
            defer.promise(obj)
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , cssExpand = ["Top", "Right", "Bottom", "Left"]
      , isHidden = function(elem, el) {
        return elem = el || elem,
        "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }
      , rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var fragment = document.createDocumentFragment()
          , div = fragment.appendChild(document.createElement("div"))
          , input = document.createElement("input");
        input.setAttribute("type", "radio"),
        input.setAttribute("checked", "checked"),
        input.setAttribute("name", "t"),
        div.appendChild(input),
        support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked,
        div.innerHTML = "<textarea>x</textarea>",
        support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue
    }
    ();
    var strundefined = "undefined";
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/
      , rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/
      , rfocusMorph = /^(?:focusinfocus|focusoutblur)$/
      , rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData)
                for (handler.handler && (handleObjIn = handler,
                handler = handleObjIn.handler,
                selector = handleObjIn.selector),
                handler.guid || (handler.guid = jQuery.guid++),
                (events = elemData.events) || (events = elemData.events = {}),
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0
                }
                ),
                types = (types || "").match(rnotwhite) || [""],
                t = types.length; t--; )
                    tmp = rtypenamespace.exec(types[t]) || [],
                    type = origType = tmp[1],
                    namespaces = (tmp[2] || "").split(".").sort(),
                    type && (special = jQuery.event.special[type] || {},
                    type = (selector ? special.delegateType : special.bindType) || type,
                    special = jQuery.event.special[type] || {},
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn),
                    (handlers = events[type]) || (handlers = events[type] = [],
                    handlers.delegateCount = 0,
                    special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)),
                    special.add && (special.add.call(elem, handleObj),
                    handleObj.handler.guid || (handleObj.handler.guid = handler.guid)),
                    selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj),
                    jQuery.event.global[type] = !0)
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [""],
                t = types.length; t--; )
                    if (tmp = rtypenamespace.exec(types[t]) || [],
                    type = origType = tmp[1],
                    namespaces = (tmp[2] || "").split(".").sort(),
                    type) {
                        for (special = jQuery.event.special[type] || {},
                        type = (selector ? special.delegateType : special.bindType) || type,
                        handlers = events[type] || [],
                        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        origCount = j = handlers.length; j--; )
                            handleObj = handlers[j],
                            !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1),
                            handleObj.selector && handlers.delegateCount--,
                            special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle),
                        delete events[type])
                    } else
                        for (type in events)
                            jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle,
                data_priv.remove(elem, "events"))
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document,
            3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."),
            type = namespaces.shift(),
            namespaces.sort()),
            ontype = type.indexOf(":") < 0 && "on" + type,
            event = event[jQuery.expando] ? event : new jQuery.Event(type,"object" == typeof event && event),
            event.isTrigger = onlyHandlers ? 2 : 3,
            event.namespace = namespaces.join("."),
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
            event.result = void 0,
            event.target || (event.target = elem),
            data = null  == data ? [event] : jQuery.makeArray(data, [event]),
            special = jQuery.event.special[type] || {},
            onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type,
                    rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode)
                        eventPath.push(cur),
                        tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); )
                    event.type = i > 1 ? bubbleType : special.bindType || type,
                    handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"),
                    handle && handle.apply(cur, data),
                    handle = ontype && cur[ontype],
                    handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data),
                    event.result === !1 && event.preventDefault());
                return event.type = type,
                onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype],
                tmp && (elem[ontype] = null ),
                jQuery.event.triggered = type,
                elem[type](),
                jQuery.event.triggered = void 0,
                tmp && (elem[ontype] = tmp)),
                event.result
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event,
            event.delegateTarget = this,
            !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers),
                i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); )
                    for (event.currentTarget = matched.elem,
                    j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); )
                        (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj,
                        event.data = handleObj.data,
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args),
                        void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(),
                        event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event),
                event.result
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
                for (; cur !== this; cur = cur.parentNode || this)
                    if (cur.disabled !== !0 || "click" !== event.type) {
                        for (matches = [],
                        i = 0; delegateCount > i; i++)
                            handleObj = handlers[i],
                            sel = handleObj.selector + " ",
                            void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null , [cur]).length),
                            matches[sel] && matches.push(handleObj);
                        matches.length && handlerQueue.push({
                            elem: cur,
                            handlers: matches
                        })
                    }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }),
            handlerQueue
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null  == event.which && (event.which = null  != original.charCode ? original.charCode : original.keyCode),
                event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null  == event.pageX && null  != original.clientX && (eventDoc = event.target.ownerDocument || document,
                doc = eventDoc.documentElement,
                body = eventDoc.body,
                event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0),
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0),
                event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando])
                return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}),
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props,
            event = new jQuery.Event(originalEvent),
            i = copy.length; i--; )
                prop = copy[i],
                event[prop] = originalEvent[prop];
            return event.target || (event.target = document),
            3 === event.target.nodeType && (event.target = event.target.parentNode),
            fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(),
                    !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(),
                    !1) : void 0
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result)
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event, event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null , elem) : jQuery.event.dispatch.call(elem, e),
            e.isDefaultPrevented() && event.preventDefault()
        }
    },
    jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1)
    }
    ,
    jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src,
        this.type = src.type,
        this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src,
        props && jQuery.extend(this, props),
        this.timeStamp = src && src.timeStamp || jQuery.now(),
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src,props)
    }
    ,
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue,
            e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue,
            e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType,
                ret = handleObj.handler.apply(this, arguments),
                event.type = fix),
                ret
            }
        }
    }
    ),
    support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
        }
        ;
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this
                  , attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0),
                data_priv.access(doc, fix, (attaches || 0) + 1)
            },
            teardown: function() {
                var doc = this.ownerDocument || this
                  , attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0),
                data_priv.remove(doc, fix))
            }
        }
    }
    ),
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector,
                selector = void 0);
                for (type in types)
                    this.on(type, selector, data, types[type], one);
                return this
            }
            if (null  == data && null  == fn ? (fn = selector,
            data = selector = void 0) : null  == fn && ("string" == typeof selector ? (fn = data,
            data = void 0) : (fn = data,
            data = selector,
            selector = void 0)),
            fn === !1)
                fn = returnFalse;
            else if (!fn)
                return this;
            return 1 === one && (origFn = fn,
            fn = function(event) {
                return jQuery().off(event),
                origFn.apply(this, arguments)
            }
            ,
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)),
            this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            }
            )
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj)
                return handleObj = types.handleObj,
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler),
                this;
            if ("object" == typeof types) {
                for (type in types)
                    this.off(type, selector, types[type]);
                return this
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector,
            selector = void 0),
            fn === !1 && (fn = returnFalse),
            this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            }
            )
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            }
            )
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , rtagName = /<([\w:]+)/
      , rhtml = /<|&#?\w+;/
      , rnoInnerhtml = /<(?:script|style|link)/i
      , rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rscriptType = /^$|\/(?:java|ecma)script/i
      , rscriptTypeMasked = /^true\/(.*)/
      , rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option,
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead,
    wrapMap.th = wrapMap.td,
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                for (destElements = getAll(clone),
                srcElements = getAll(elem),
                i = 0,
                l = srcElements.length; l > i; i++)
                    fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents)
                if (deepDataAndEvents)
                    for (srcElements = srcElements || getAll(elem),
                    destElements = destElements || getAll(clone),
                    i = 0,
                    l = srcElements.length; l > i; i++)
                        cloneCopyEvent(srcElements[i], destElements[i]);
                else
                    cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"),
            destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")),
            clone
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++)
                if (elem = elems[i],
                elem || 0 === elem)
                    if ("object" === jQuery.type(elem))
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    else if (rhtml.test(elem)) {
                        for (tmp = tmp || fragment.appendChild(context.createElement("div")),
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                        wrap = wrapMap[tag] || wrapMap._default,
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2],
                        j = wrap[0]; j--; )
                            tmp = tmp.lastChild;
                        jQuery.merge(nodes, tmp.childNodes),
                        tmp = fragment.firstChild,
                        tmp.textContent = ""
                    } else
                        nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "",
            i = 0; elem = nodes[i++]; )
                if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem),
                tmp = getAll(fragment.appendChild(elem), "script"),
                contains && setGlobalEval(tmp),
                scripts))
                    for (j = 0; elem = tmp[j++]; )
                        rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment
        },
        cleanData: function(elems) {
            for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando],
                key && (data = data_priv.cache[key]))) {
                    if (data.events)
                        for (type in data.events)
                            special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key]
                }
                delete data_user.cache[elem[data_user.expando]]
            }
        }
    }),
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value)
                }
                )
            }
            , null , value, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                }
            }
            )
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            }
            )
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this)
            }
            )
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
            }
            )
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null  != (elem = elems[i]); i++)
                keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)),
                elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")),
                elem.parentNode.removeChild(elem));
            return this
        },
        empty: function() {
            for (var elem, i = 0; null  != (elem = this[i]); i++)
                1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)),
                elem.textContent = "");
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null  == dataAndEvents ? !1 : dataAndEvents,
            deepDataAndEvents = null  == deepDataAndEvents ? dataAndEvents : deepDataAndEvents,
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            }
            )
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (void 0 === value && 1 === elem.nodeType)
                    return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; l > i; i++)
                            elem = this[i] || {},
                            1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)),
                            elem.innerHTML = value);
                        elem = 0
                    } catch (e) {}
                }
                elem && this.empty().append(value)
            }
            , null , value, arguments.length)
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode,
                jQuery.cleanData(getAll(this)),
                arg && arg.replaceChild(elem, this)
            }
            ),
            arg && (arg.length || arg.nodeType) ? this : this.remove()
        },
        detach: function(selector) {
            return this.remove(selector, !0)
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value))
                return this.each(function(index) {
                    var self = set.eq(index);
                    isFunction && (args[0] = value.call(this, index, self.html())),
                    self.domManip(args, callback)
                }
                );
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this),
            first = fragment.firstChild,
            1 === fragment.childNodes.length && (fragment = first),
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript),
                hasScripts = scripts.length; l > i; i++)
                    node = fragment,
                    i !== iNoClone && (node = jQuery.clone(node, !0, !0),
                    hasScripts && jQuery.merge(scripts, getAll(node, "script"))),
                    callback.call(this[i], node, i);
                if (hasScripts)
                    for (doc = scripts[scripts.length - 1].ownerDocument,
                    jQuery.map(scripts, restoreScript),
                    i = 0; hasScripts > i; i++)
                        node = scripts[i],
                        rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
            }
            return this
        }
    }),
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++)
                elems = i === last ? this : this.clone(!0),
                jQuery(insert[i])[original](elems),
                push.apply(ret, elems.get());
            return this.pushStack(ret)
        }
    }
    );
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$","i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null ) : window.getComputedStyle(elem, null )
    }
    ;
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            div.innerHTML = "",
            docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null );
            pixelPositionVal = "1%" !== divStyle.top,
            boxSizingReliableVal = "4px" === divStyle.width,
            docElem.removeChild(container)
        }
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box",
        div.cloneNode(!0).style.backgroundClip = "",
        support.clearCloneStyle = "content-box" === div.style.backgroundClip,
        container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",
        container.appendChild(div),
        window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(),
                pixelPositionVal
            },
            boxSizingReliable: function() {
                return null  == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(),
                boxSizingReliableVal
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                marginDiv.style.marginRight = marginDiv.style.width = "0",
                div.style.width = "1px",
                docElem.appendChild(container),
                ret = !parseFloat(window.getComputedStyle(marginDiv, null ).marginRight),
                docElem.removeChild(container),
                div.removeChild(marginDiv),
                ret
            }
        }))
    }
    (),
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options)
            old[name] = elem.style[name],
            elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options)
            elem.style[name] = old[name];
        return ret
    }
    ;
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/
      , rnumsplit = new RegExp("^(" + pnum + ")(.*)$","i")
      , rrelNum = new RegExp("^([+-])=(" + pnum + ")","i")
      , cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)),
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName],
                void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value,
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)),
                type = "number"),
                null  != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"),
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"),
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)),
                void 0)
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)),
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName],
            hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)),
            void 0 === val && (val = curCSS(elem, name, styles)),
            "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]),
            "" === extra || extra ? (num = parseFloat(val),
            extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
        }
    }),
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra)
                }
                ) : getWidthOrHeight(elem, name, extra) : void 0
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
            }
        }
    }
    ),
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [elem, "marginRight"]) : void 0
    }
    ),
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++)
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }
        },
        rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    }
    ),
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem),
                    len = name.length; len > i; i++)
                        map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }
            , name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            }
            )
        }
    }),
    jQuery.Tween = Tween,
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem,
            this.prop = prop,
            this.easing = easing || "swing",
            this.options = options,
            this.start = this.now = this.cur(),
            this.end = end,
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent,
            this.now = (this.end - this.start) * eased + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this),
            this
        }
    },
    Tween.prototype.init.prototype = Tween.prototype,
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null  == tween.elem[tween.prop] || tween.elem.style && null  != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""),
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null  != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
            }
        }
    },
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }
    },
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        }
    },
    jQuery.fx = Tween.prototype.init,
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$","i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
        "*": [function(prop, value) {
            var tween = this.createTween(prop, value)
              , target = tween.cur()
              , parts = rfxnum.exec(value)
              , unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px")
              , start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop))
              , scale = 1
              , maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3],
                parts = parts || [],
                start = +target || 1;
                do
                    scale = scale || ".5",
                    start /= scale,
                    jQuery.style(tween.elem, prop, start + unit);
                while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
            }
            return parts && (start = tween.start = +start || +target || 0,
            tween.unit = unit,
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]),
            tween
        }
        ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props,
            props = ["*"]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++)
                prop = props[index],
                tweeners[prop] = tweeners[prop] || [],
                tweeners[prop].unshift(callback)
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
        }
    }),
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default,
        (null  == opt.queue || opt.queue === !0) && (opt.queue = "fx"),
        opt.old = opt.complete,
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this),
            opt.queue && jQuery.dequeue(this, opt.queue)
        }
        ,
        opt
    }
    ,
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop)
              , optall = jQuery.speed(speed, easing, callback)
              , doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0)
            }
            ;
            return doAnimation.finish = doAnimation,
            empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop,
                stop(gotoEnd)
            }
            ;
            return "string" != typeof type && (gotoEnd = clearQueue,
            clearQueue = type,
            type = void 0),
            clearQueue && type !== !1 && this.queue(type || "fx", []),
            this.each(function() {
                var dequeue = !0
                  , index = null  != type && type + "queueHooks"
                  , timers = jQuery.timers
                  , data = data_priv.get(this);
                if (index)
                    data[index] && data[index].stop && stopQueue(data[index]);
                else
                    for (index in data)
                        data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; )
                    timers[index].elem !== this || null  != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd),
                    dequeue = !1,
                    timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
            }
            )
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"),
            this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0,
                jQuery.queue(this, type, []),
                hooks && hooks.stop && hooks.stop.call(this, !0),
                index = timers.length; index--; )
                    timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0),
                    timers.splice(index, 1));
                for (index = 0; length > index; index++)
                    queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish
            }
            )
        }
    }),
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null  == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
        }
    }
    ),
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    }
    ),
    jQuery.timers = [],
    jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++)
            timer = timers[i],
            timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(),
        fxNow = void 0
    }
    ,
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer),
        timer() ? jQuery.fx.start() : jQuery.timers.pop()
    }
    ,
    jQuery.fx.interval = 13,
    jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }
    ,
    jQuery.fx.stop = function() {
        clearInterval(timerId),
        timerId = null 
    }
    ,
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time,
        type = type || "fx",
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout)
            }
        }
        )
    }
    ,
    function() {
        var input = document.createElement("input")
          , select = document.createElement("select")
          , opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox",
        support.checkOn = "" !== input.value,
        support.optSelected = opt.selected,
        select.disabled = !0,
        support.optDisabled = !opt.disabled,
        input = document.createElement("input"),
        input.value = "t",
        input.type = "radio",
        support.radioValue = "t" === input.value
    }
    ();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            }
            )
        }
    }),
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
                return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(),
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)),
                void 0 === value ? hooks && "get" in hooks && null  !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name),
                null  == ret ? void 0 : ret) : null  !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""),
                value) : void jQuery.removeAttr(elem, name))
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType)
                for (; name = attrNames[i++]; )
                    propName = jQuery.propFix[name] || name,
                    jQuery.expr.match.bool.test(name) && (elem[propName] = !1),
                    elem.removeAttribute(name)
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value),
                        val && (elem.value = val),
                        value
                    }
                }
            }
        }
    }),
    boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name),
            name
        }
    },
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name],
            attrHandle[name] = ret,
            ret = null  != getter(elem, name, isXML) ? name.toLowerCase() : null ,
            attrHandle[name] = handle),
            ret
        }
    }
    );
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name]
            }
            )
        }
    }),
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
                return notxml = 1 !== nType || !jQuery.isXMLDoc(elem),
                notxml && (name = jQuery.propFix[name] || name,
                hooks = jQuery.propHooks[name]),
                void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null  !== (ret = hooks.get(elem, name)) ? ret : elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
                }
            }
        }
    }),
    support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex,
            null 
        }
    }),
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    }
    );
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                }
                );
            if (proceed)
                for (classes = (value || "").match(rnotwhite) || []; len > i; i++)
                    if (elem = this[i],
                    cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                        for (j = 0; clazz = classes[j++]; )
                            cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                        finalValue = jQuery.trim(cur),
                        elem.className !== finalValue && (elem.className = finalValue)
                    }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                }
                );
            if (proceed)
                for (classes = (value || "").match(rnotwhite) || []; len > i; i++)
                    if (elem = this[i],
                    cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                        for (j = 0; clazz = classes[j++]; )
                            for (; cur.indexOf(" " + clazz + " ") >= 0; )
                                cur = cur.replace(" " + clazz + " ", " ");
                        finalValue = value ? jQuery.trim(cur) : "",
                        elem.className !== finalValue && (elem.className = finalValue)
                    }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            }
            ) : this.each(function() {
                if ("string" === type)
                    for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; )
                        self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                else
                    (type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className),
                    this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "")
            }
            )
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0)
                    return !0;
            return !1
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length)
                    return isFunction = jQuery.isFunction(value),
                    this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value,
                        null  == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null  == value ? "" : value + ""
                        }
                        )),
                        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()],
                        hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                    }
                    );
                if (elem)
                    return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()],
                    hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value,
                    "string" == typeof ret ? ret.replace(rreturn, "") : null  == ret ? "" : ret)
            }
        }
    }),
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null  != val ? val : jQuery.trim(jQuery.text(elem))
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null  : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                        if (option = options[i],
                        (option.selected || i === index) && (support.optDisabled ? !option.disabled : null  === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(),
                            one)
                                return value;
                            values.push(value)
                        }
                    return values
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; )
                        option = options[i],
                        (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1),
                    values
                }
            }
        }
    }),
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
            }
        },
        support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null  === elem.getAttribute("value") ? "on" : elem.value
        }
        )
    }
    ),
    jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null , data, fn) : this.trigger(name)
        }
    }
    ),
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        },
        bind: function(types, data, fn) {
            return this.on(types, null , data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null , fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }
    });
    var nonce = jQuery.now()
      , rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "")
    }
    ,
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data)
            return null ;
        try {
            tmp = new DOMParser,
            xml = tmp.parseFromString(data, "text/xml")
        } catch (e) {
            xml = void 0
        }
        return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data),
        xml
    }
    ;
    var rhash = /#.*$/
      , rts = /([?&])_=[^&]*/
      , rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , rnoContent = /^(?:GET|HEAD)$/
      , rprotocol = /^\/\//
      , rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , prefilters = {}
      , transports = {}
      , allTypes = "*/".concat("*")
      , ajaxLocation = window.location.href
      , ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2,
                timeoutTimer && clearTimeout(timeoutTimer),
                transport = void 0,
                responseHeadersString = headers || "",
                jqXHR.readyState = status > 0 ? 4 : 0,
                isSuccess = status >= 200 && 300 > status || 304 === status,
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)),
                response = ajaxConvert(s, response, jqXHR, isSuccess),
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"),
                modified && (jQuery.lastModified[cacheURL] = modified),
                modified = jqXHR.getResponseHeader("etag"),
                modified && (jQuery.etag[cacheURL] = modified)),
                204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state,
                success = response.data,
                error = response.error,
                isSuccess = !error)) : (error = statusText,
                (status || !statusText) && (statusText = "error",
                0 > status && (status = 0))),
                jqXHR.status = status,
                jqXHR.statusText = (nativeStatusText || statusText) + "",
                isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]),
                jqXHR.statusCode(statusCode),
                statusCode = void 0,
                fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]),
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]),
                fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]),
                --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }
            "object" == typeof url && (options = url,
            url = void 0),
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders)
                            for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); )
                                responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return null  == match ? null  : match
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null 
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name,
                    requestHeaders[name] = value),
                    this
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type),
                    this
                },
                statusCode: function(map) {
                    var code;
                    if (map)
                        if (2 > state)
                            for (code in map)
                                statusCode[code] = [statusCode[code], map[code]];
                        else
                            jqXHR.always(map[jqXHR.status]);
                    return this
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText),
                    done(0, finalText),
                    this
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add,
            jqXHR.success = jqXHR.done,
            jqXHR.error = jqXHR.fail,
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"),
            s.type = options.method || options.type || s.method || s.type,
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""],
            null  == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()),
            s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))),
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)),
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR),
            2 === state)
                return jqXHR;
            fireGlobals = jQuery.event && s.global,
            fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"),
            s.type = s.type.toUpperCase(),
            s.hasContent = !rnoContent.test(s.type),
            cacheURL = s.url,
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data,
            delete s.data),
            s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)),
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]),
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])),
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers)
                jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state))
                return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            })
                jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1,
                fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]),
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout")
                }
                , s.timeout));
                try {
                    state = 1,
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (!(2 > state))
                        throw e;
                    done(-1, e)
                }
            } else
                done(-1, "No Transport");
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script")
        }
    }),
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback,
            callback = data,
            data = void 0),
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            })
        }
    }
    ),
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i))
            }
            ) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && wrap.insertBefore(this[0]),
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; )
                    elem = elem.firstElementChild;
                return elem
            }
            ).append(this)),
            this)
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i))
            }
            ) : this.each(function() {
                var self = jQuery(this)
                  , contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            }
            )
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            }
            )
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }
            ).end()
        }
    }),
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
    }
    ,
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem)
    }
    ;
    var r20 = /%20/g
      , rbracket = /\[\]$/
      , rCRLF = /\r?\n/g
      , rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i
      , rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null  == value ? "" : value,
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        }
        ;
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional),
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a))
            jQuery.each(a, function() {
                add(this.name, this.value)
            }
            );
        else
            for (prefix in a)
                buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    }
    ,
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }
            ).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
            }
            ).map(function(i, elem) {
                var val = jQuery(this).val();
                return null  == val ? null  : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }
                ) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }
            ).get()
        }
    }),
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    }
    ;
    var xhrId = 0
      , xhrCallbacks = {}
      , xhrSuccessStatus = {
        0: 200,
        1223: 204
    }
      , xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks)
            xhrCallbacks[key]()
    }
    ),
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported,
    support.ajax = xhrSupported = !!xhrSupported,
    jQuery.ajaxTransport(function(options) {
        var callback;
        return support.cors || xhrSupported && !options.crossDomain ? {
            send: function(headers, complete) {
                var i, xhr = options.xhr(), id = ++xhrId;
                if (xhr.open(options.type, options.url, options.async, options.username, options.password),
                options.xhrFields)
                    for (i in options.xhrFields)
                        xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType),
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers)
                    xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (delete xhrCallbacks[id],
                        callback = xhr.onload = xhr.onerror = null ,
                        "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                            text: xhr.responseText
                        } : void 0, xhr.getAllResponseHeaders()))
                    }
                }
                ,
                xhr.onload = callback(),
                xhr.onerror = callback("error"),
                callback = xhrCallbacks[id] = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null )
                } catch (e) {
                    if (callback)
                        throw e
                }
            },
            abort: function() {
                callback && callback()
            }
        } : void 0
    }
    ),
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text),
                text
            }
        }
    }),
    jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1),
        s.crossDomain && (s.type = "GET")
    }
    ),
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(),
                        callback = null ,
                        evt && complete("error" === evt.type ? 404 : 200, evt.type)
                    }
                    ),
                    document.head.appendChild(script[0])
                },
                abort: function() {
                    callback && callback()
                }
            }
        }
    }
    );
    var oldCallbacks = []
      , rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0,
            callback
        }
    }),
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName),
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"),
            responseContainer[0]
        }
        ,
        s.dataTypes[0] = "json",
        overwritten = window[callbackName],
        window[callbackName] = function() {
            responseContainer = arguments
        }
        ,
        jqXHR.always(function() {
            window[callbackName] = overwritten,
            s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback,
            oldCallbacks.push(callbackName)),
            responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]),
            responseContainer = overwritten = void 0
        }
        ),
        "script") : void 0
    }
    ),
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data)
            return null ;
        "boolean" == typeof context && (keepScripts = context,
        context = !1),
        context = context || document;
        var parsed = rsingleTag.exec(data)
          , scripts = !keepScripts && [];
        return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts),
        scripts && scripts.length && jQuery(scripts).remove(),
        jQuery.merge([], parsed.childNodes))
    }
    ;
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load)
            return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off)),
        url = url.slice(0, off)),
        jQuery.isFunction(params) ? (callback = params,
        params = void 0) : params && "object" == typeof params && (type = "POST"),
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments,
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
        }
        ).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [jqXHR.responseText, status, jqXHR])
        }
        ),
        this
    }
    ,
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    }
    ),
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }
        ).length
    }
    ;
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css(elem, "top"),
            curCSSLeft = jQuery.css(elem, "left"),
            calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1,
            calculatePosition ? (curPosition = curElem.position(),
            curTop = curPosition.top,
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0,
            curLeft = parseFloat(curCSSLeft) || 0),
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)),
            null  != options.top && (props.top = options.top - curOffset.top + curTop),
            null  != options.left && (props.left = options.left - curOffset.left + curLeft),
            "using" in options ? options.using.call(elem, props) : curElem.css(props)
        }
    },
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length)
                return void 0 === options ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                }
                );
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (doc)
                return docElem = doc.documentElement,
                jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()),
                win = getWindow(doc),
                {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft
                }) : box
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(),
                offset = this.offset(),
                jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()),
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0),
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)),
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); )
                    offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem
            }
            )
        }
    }),
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val)
            }
            , method, val, arguments.length, null )
        }
    }
    ),
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop),
            rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0
        }
        )
    }
    ),
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin)
                  , extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement,
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                }
                , type, chainable ? margin : void 0, chainable, null )
            }
        }
        )
    }
    ),
    jQuery.fn.size = function() {
        return this.length
    }
    ,
    jQuery.fn.andSelf = jQuery.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery
    }
    );
    var _jQuery = window.jQuery
      , _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$),
        deep && window.jQuery === jQuery && (window.jQuery = _jQuery),
        jQuery
    }
    ,
    typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery),
    jQuery
}
),
function() {
    "use strict";
    var shim = {};
    "undefined" == typeof exports ? "function" == typeof define && "object" == typeof define.amd && define.amd ? (shim.exports = {},
    define(function() {
        return shim.exports
    }
    )) : shim.exports = window : shim.exports = exports,
    function(exports) {
        if (!GLMAT_EPSILON)
            var GLMAT_EPSILON = 1e-6;
        if (!GLMAT_ARRAY_TYPE)
            var GLMAT_ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array;
        var glMatrix = {};
        glMatrix.setMatrixArrayType = function(type) {
            GLMAT_ARRAY_TYPE = type
        }
        ,
        "undefined" != typeof exports && (exports.glMatrix = glMatrix);
        var vec2 = {};
        vec2.create = function() {
            var out = new GLMAT_ARRAY_TYPE(2);
            return out[0] = 0,
            out[1] = 0,
            out
        }
        ,
        vec2.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(2);
            return out[0] = a[0],
            out[1] = a[1],
            out
        }
        ,
        vec2.fromValues = function(x, y) {
            var out = new GLMAT_ARRAY_TYPE(2);
            return out[0] = x,
            out[1] = y,
            out
        }
        ,
        vec2.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out
        }
        ,
        vec2.set = function(out, x, y) {
            return out[0] = x,
            out[1] = y,
            out
        }
        ,
        vec2.add = function(out, a, b) {
            return out[0] = a[0] + b[0],
            out[1] = a[1] + b[1],
            out
        }
        ,
        vec2.subtract = function(out, a, b) {
            return out[0] = a[0] - b[0],
            out[1] = a[1] - b[1],
            out
        }
        ,
        vec2.sub = vec2.subtract,
        vec2.multiply = function(out, a, b) {
            return out[0] = a[0] * b[0],
            out[1] = a[1] * b[1],
            out
        }
        ,
        vec2.mul = vec2.multiply,
        vec2.divide = function(out, a, b) {
            return out[0] = a[0] / b[0],
            out[1] = a[1] / b[1],
            out
        }
        ,
        vec2.div = vec2.divide,
        vec2.min = function(out, a, b) {
            return out[0] = Math.min(a[0], b[0]),
            out[1] = Math.min(a[1], b[1]),
            out
        }
        ,
        vec2.max = function(out, a, b) {
            return out[0] = Math.max(a[0], b[0]),
            out[1] = Math.max(a[1], b[1]),
            out
        }
        ,
        vec2.scale = function(out, a, b) {
            return out[0] = a[0] * b,
            out[1] = a[1] * b,
            out
        }
        ,
        vec2.distance = function(a, b) {
            var x = b[0] - a[0]
              , y = b[1] - a[1];
            return Math.sqrt(x * x + y * y)
        }
        ,
        vec2.dist = vec2.distance,
        vec2.squaredDistance = function(a, b) {
            var x = b[0] - a[0]
              , y = b[1] - a[1];
            return x * x + y * y
        }
        ,
        vec2.sqrDist = vec2.squaredDistance,
        vec2.length = function(a) {
            var x = a[0]
              , y = a[1];
            return Math.sqrt(x * x + y * y)
        }
        ,
        vec2.len = vec2.length,
        vec2.squaredLength = function(a) {
            var x = a[0]
              , y = a[1];
            return x * x + y * y
        }
        ,
        vec2.sqrLen = vec2.squaredLength,
        vec2.negate = function(out, a) {
            return out[0] = -a[0],
            out[1] = -a[1],
            out
        }
        ,
        vec2.normalize = function(out, a) {
            var x = a[0]
              , y = a[1]
              , len = x * x + y * y;
            return len > 0 && (len = 1 / Math.sqrt(len),
            out[0] = a[0] * len,
            out[1] = a[1] * len),
            out
        }
        ,
        vec2.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1]
        }
        ,
        vec2.cross = function(out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            return out[0] = out[1] = 0,
            out[2] = z,
            out
        }
        ,
        vec2.lerp = function(out, a, b, t) {
            var ax = a[0]
              , ay = a[1];
            return out[0] = ax + t * (b[0] - ax),
            out[1] = ay + t * (b[1] - ay),
            out
        }
        ,
        vec2.transformMat2 = function(out, a, m) {
            var x = a[0]
              , y = a[1];
            return out[0] = m[0] * x + m[2] * y,
            out[1] = m[1] * x + m[3] * y,
            out
        }
        ,
        vec2.transformMat2d = function(out, a, m) {
            var x = a[0]
              , y = a[1];
            return out[0] = m[0] * x + m[2] * y + m[4],
            out[1] = m[1] * x + m[3] * y + m[5],
            out
        }
        ,
        vec2.transformMat3 = function(out, a, m) {
            var x = a[0]
              , y = a[1];
            return out[0] = m[0] * x + m[3] * y + m[6],
            out[1] = m[1] * x + m[4] * y + m[7],
            out
        }
        ,
        vec2.transformMat4 = function(out, a, m) {
            var x = a[0]
              , y = a[1];
            return out[0] = m[0] * x + m[4] * y + m[12],
            out[1] = m[1] * x + m[5] * y + m[13],
            out
        }
        ,
        vec2.forEach = function() {
            var vec = vec2.create();
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                for (stride || (stride = 2),
                offset || (offset = 0),
                l = count ? Math.min(count * stride + offset, a.length) : a.length,
                i = offset; l > i; i += stride)
                    vec[0] = a[i],
                    vec[1] = a[i + 1],
                    fn(vec, vec, arg),
                    a[i] = vec[0],
                    a[i + 1] = vec[1];
                return a
            }
        }
        (),
        vec2.str = function(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.vec2 = vec2);
        var vec3 = {};
        vec3.create = function() {
            var out = new GLMAT_ARRAY_TYPE(3);
            return out[0] = 0,
            out[1] = 0,
            out[2] = 0,
            out
        }
        ,
        vec3.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(3);
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out
        }
        ,
        vec3.fromValues = function(x, y, z) {
            var out = new GLMAT_ARRAY_TYPE(3);
            return out[0] = x,
            out[1] = y,
            out[2] = z,
            out
        }
        ,
        vec3.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out
        }
        ,
        vec3.set = function(out, x, y, z) {
            return out[0] = x,
            out[1] = y,
            out[2] = z,
            out
        }
        ,
        vec3.add = function(out, a, b) {
            return out[0] = a[0] + b[0],
            out[1] = a[1] + b[1],
            out[2] = a[2] + b[2],
            out
        }
        ,
        vec3.subtract = function(out, a, b) {
            return out[0] = a[0] - b[0],
            out[1] = a[1] - b[1],
            out[2] = a[2] - b[2],
            out
        }
        ,
        vec3.sub = vec3.subtract,
        vec3.multiply = function(out, a, b) {
            return out[0] = a[0] * b[0],
            out[1] = a[1] * b[1],
            out[2] = a[2] * b[2],
            out
        }
        ,
        vec3.mul = vec3.multiply,
        vec3.divide = function(out, a, b) {
            return out[0] = a[0] / b[0],
            out[1] = a[1] / b[1],
            out[2] = a[2] / b[2],
            out
        }
        ,
        vec3.div = vec3.divide,
        vec3.min = function(out, a, b) {
            return out[0] = Math.min(a[0], b[0]),
            out[1] = Math.min(a[1], b[1]),
            out[2] = Math.min(a[2], b[2]),
            out
        }
        ,
        vec3.max = function(out, a, b) {
            return out[0] = Math.max(a[0], b[0]),
            out[1] = Math.max(a[1], b[1]),
            out[2] = Math.max(a[2], b[2]),
            out
        }
        ,
        vec3.scale = function(out, a, b) {
            return out[0] = a[0] * b,
            out[1] = a[1] * b,
            out[2] = a[2] * b,
            out
        }
        ,
        vec3.distance = function(a, b) {
            var x = b[0] - a[0]
              , y = b[1] - a[1]
              , z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z)
        }
        ,
        vec3.dist = vec3.distance,
        vec3.squaredDistance = function(a, b) {
            var x = b[0] - a[0]
              , y = b[1] - a[1]
              , z = b[2] - a[2];
            return x * x + y * y + z * z
        }
        ,
        vec3.sqrDist = vec3.squaredDistance,
        vec3.length = function(a) {
            var x = a[0]
              , y = a[1]
              , z = a[2];
            return Math.sqrt(x * x + y * y + z * z)
        }
        ,
        vec3.len = vec3.length,
        vec3.squaredLength = function(a) {
            var x = a[0]
              , y = a[1]
              , z = a[2];
            return x * x + y * y + z * z
        }
        ,
        vec3.sqrLen = vec3.squaredLength,
        vec3.negate = function(out, a) {
            return out[0] = -a[0],
            out[1] = -a[1],
            out[2] = -a[2],
            out
        }
        ,
        vec3.normalize = function(out, a) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , len = x * x + y * y + z * z;
            return len > 0 && (len = 1 / Math.sqrt(len),
            out[0] = a[0] * len,
            out[1] = a[1] * len,
            out[2] = a[2] * len),
            out
        }
        ,
        vec3.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
        }
        ,
        vec3.cross = function(out, a, b) {
            var ax = a[0]
              , ay = a[1]
              , az = a[2]
              , bx = b[0]
              , by = b[1]
              , bz = b[2];
            return out[0] = ay * bz - az * by,
            out[1] = az * bx - ax * bz,
            out[2] = ax * by - ay * bx,
            out
        }
        ,
        vec3.lerp = function(out, a, b, t) {
            var ax = a[0]
              , ay = a[1]
              , az = a[2];
            return out[0] = ax + t * (b[0] - ax),
            out[1] = ay + t * (b[1] - ay),
            out[2] = az + t * (b[2] - az),
            out
        }
        ,
        vec3.transformMat4 = function(out, a, m) {
            var x = a[0]
              , y = a[1]
              , z = a[2];
            return out[0] = m[0] * x + m[4] * y + m[8] * z + m[12],
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13],
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14],
            out
        }
        ,
        vec3.transformQuat = function(out, a, q) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , qx = q[0]
              , qy = q[1]
              , qz = q[2]
              , qw = q[3]
              , ix = qw * x + qy * z - qz * y
              , iy = qw * y + qz * x - qx * z
              , iz = qw * z + qx * y - qy * x
              , iw = -qx * x - qy * y - qz * z;
            return out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy,
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz,
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx,
            out
        }
        ,
        vec3.forEach = function() {
            var vec = vec3.create();
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                for (stride || (stride = 3),
                offset || (offset = 0),
                l = count ? Math.min(count * stride + offset, a.length) : a.length,
                i = offset; l > i; i += stride)
                    vec[0] = a[i],
                    vec[1] = a[i + 1],
                    vec[2] = a[i + 2],
                    fn(vec, vec, arg),
                    a[i] = vec[0],
                    a[i + 1] = vec[1],
                    a[i + 2] = vec[2];
                return a
            }
        }
        (),
        vec3.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.vec3 = vec3);
        var vec4 = {};
        vec4.create = function() {
            var out = new GLMAT_ARRAY_TYPE(4);
            return out[0] = 0,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out
        }
        ,
        vec4.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out
        }
        ,
        vec4.fromValues = function(x, y, z, w) {
            var out = new GLMAT_ARRAY_TYPE(4);
            return out[0] = x,
            out[1] = y,
            out[2] = z,
            out[3] = w,
            out
        }
        ,
        vec4.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out
        }
        ,
        vec4.set = function(out, x, y, z, w) {
            return out[0] = x,
            out[1] = y,
            out[2] = z,
            out[3] = w,
            out
        }
        ,
        vec4.add = function(out, a, b) {
            return out[0] = a[0] + b[0],
            out[1] = a[1] + b[1],
            out[2] = a[2] + b[2],
            out[3] = a[3] + b[3],
            out
        }
        ,
        vec4.subtract = function(out, a, b) {
            return out[0] = a[0] - b[0],
            out[1] = a[1] - b[1],
            out[2] = a[2] - b[2],
            out[3] = a[3] - b[3],
            out
        }
        ,
        vec4.sub = vec4.subtract,
        vec4.multiply = function(out, a, b) {
            return out[0] = a[0] * b[0],
            out[1] = a[1] * b[1],
            out[2] = a[2] * b[2],
            out[3] = a[3] * b[3],
            out
        }
        ,
        vec4.mul = vec4.multiply,
        vec4.divide = function(out, a, b) {
            return out[0] = a[0] / b[0],
            out[1] = a[1] / b[1],
            out[2] = a[2] / b[2],
            out[3] = a[3] / b[3],
            out
        }
        ,
        vec4.div = vec4.divide,
        vec4.min = function(out, a, b) {
            return out[0] = Math.min(a[0], b[0]),
            out[1] = Math.min(a[1], b[1]),
            out[2] = Math.min(a[2], b[2]),
            out[3] = Math.min(a[3], b[3]),
            out
        }
        ,
        vec4.max = function(out, a, b) {
            return out[0] = Math.max(a[0], b[0]),
            out[1] = Math.max(a[1], b[1]),
            out[2] = Math.max(a[2], b[2]),
            out[3] = Math.max(a[3], b[3]),
            out
        }
        ,
        vec4.scale = function(out, a, b) {
            return out[0] = a[0] * b,
            out[1] = a[1] * b,
            out[2] = a[2] * b,
            out[3] = a[3] * b,
            out
        }
        ,
        vec4.distance = function(a, b) {
            var x = b[0] - a[0]
              , y = b[1] - a[1]
              , z = b[2] - a[2]
              , w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w)
        }
        ,
        vec4.dist = vec4.distance,
        vec4.squaredDistance = function(a, b) {
            var x = b[0] - a[0]
              , y = b[1] - a[1]
              , z = b[2] - a[2]
              , w = b[3] - a[3];
            return x * x + y * y + z * z + w * w
        }
        ,
        vec4.sqrDist = vec4.squaredDistance,
        vec4.length = function(a) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w)
        }
        ,
        vec4.len = vec4.length,
        vec4.squaredLength = function(a) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , w = a[3];
            return x * x + y * y + z * z + w * w
        }
        ,
        vec4.sqrLen = vec4.squaredLength,
        vec4.negate = function(out, a) {
            return out[0] = -a[0],
            out[1] = -a[1],
            out[2] = -a[2],
            out[3] = -a[3],
            out
        }
        ,
        vec4.normalize = function(out, a) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , w = a[3]
              , len = x * x + y * y + z * z + w * w;
            return len > 0 && (len = 1 / Math.sqrt(len),
            out[0] = a[0] * len,
            out[1] = a[1] * len,
            out[2] = a[2] * len,
            out[3] = a[3] * len),
            out
        }
        ,
        vec4.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
        }
        ,
        vec4.lerp = function(out, a, b, t) {
            var ax = a[0]
              , ay = a[1]
              , az = a[2]
              , aw = a[3];
            return out[0] = ax + t * (b[0] - ax),
            out[1] = ay + t * (b[1] - ay),
            out[2] = az + t * (b[2] - az),
            out[3] = aw + t * (b[3] - aw),
            out
        }
        ,
        vec4.transformMat4 = function(out, a, m) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , w = a[3];
            return out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w,
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w,
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w,
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w,
            out
        }
        ,
        vec4.transformQuat = function(out, a, q) {
            var x = a[0]
              , y = a[1]
              , z = a[2]
              , qx = q[0]
              , qy = q[1]
              , qz = q[2]
              , qw = q[3]
              , ix = qw * x + qy * z - qz * y
              , iy = qw * y + qz * x - qx * z
              , iz = qw * z + qx * y - qy * x
              , iw = -qx * x - qy * y - qz * z;
            return out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy,
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz,
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx,
            out
        }
        ,
        vec4.forEach = function() {
            var vec = vec4.create();
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                for (stride || (stride = 4),
                offset || (offset = 0),
                l = count ? Math.min(count * stride + offset, a.length) : a.length,
                i = offset; l > i; i += stride)
                    vec[0] = a[i],
                    vec[1] = a[i + 1],
                    vec[2] = a[i + 2],
                    vec[3] = a[i + 3],
                    fn(vec, vec, arg),
                    a[i] = vec[0],
                    a[i + 1] = vec[1],
                    a[i + 2] = vec[2],
                    a[i + 3] = vec[3];
                return a
            }
        }
        (),
        vec4.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.vec4 = vec4);
        var mat2 = {};
        new Float32Array([1, 0, 0, 1]);
        mat2.create = function() {
            var out = new GLMAT_ARRAY_TYPE(4);
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 1,
            out
        }
        ,
        mat2.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out
        }
        ,
        mat2.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out
        }
        ,
        mat2.identity = function(out) {
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 1,
            out
        }
        ,
        mat2.transpose = function(out, a) {
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2],
                out[2] = a1
            } else
                out[0] = a[0],
                out[1] = a[2],
                out[2] = a[1],
                out[3] = a[3];
            return out
        }
        ,
        mat2.invert = function(out, a) {
            var a0 = a[0]
              , a1 = a[1]
              , a2 = a[2]
              , a3 = a[3]
              , det = a0 * a3 - a2 * a1;
            return det ? (det = 1 / det,
            out[0] = a3 * det,
            out[1] = -a1 * det,
            out[2] = -a2 * det,
            out[3] = a0 * det,
            out) : null 
        }
        ,
        mat2.adjoint = function(out, a) {
            var a0 = a[0];
            return out[0] = a[3],
            out[1] = -a[1],
            out[2] = -a[2],
            out[3] = a0,
            out
        }
        ,
        mat2.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1]
        }
        ,
        mat2.multiply = function(out, a, b) {
            var a0 = a[0]
              , a1 = a[1]
              , a2 = a[2]
              , a3 = a[3]
              , b0 = b[0]
              , b1 = b[1]
              , b2 = b[2]
              , b3 = b[3];
            return out[0] = a0 * b0 + a1 * b2,
            out[1] = a0 * b1 + a1 * b3,
            out[2] = a2 * b0 + a3 * b2,
            out[3] = a2 * b1 + a3 * b3,
            out
        }
        ,
        mat2.mul = mat2.multiply,
        mat2.rotate = function(out, a, rad) {
            var a0 = a[0]
              , a1 = a[1]
              , a2 = a[2]
              , a3 = a[3]
              , s = Math.sin(rad)
              , c = Math.cos(rad);
            return out[0] = a0 * c + a1 * s,
            out[1] = a0 * -s + a1 * c,
            out[2] = a2 * c + a3 * s,
            out[3] = a2 * -s + a3 * c,
            out
        }
        ,
        mat2.scale = function(out, a, v) {
            var a0 = a[0]
              , a1 = a[1]
              , a2 = a[2]
              , a3 = a[3]
              , v0 = v[0]
              , v1 = v[1];
            return out[0] = a0 * v0,
            out[1] = a1 * v1,
            out[2] = a2 * v0,
            out[3] = a3 * v1,
            out
        }
        ,
        mat2.str = function(a) {
            return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.mat2 = mat2);
        var mat2d = {};
        new Float32Array([1, 0, 0, 1, 0, 0]);
        mat2d.create = function() {
            var out = new GLMAT_ARRAY_TYPE(6);
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 1,
            out[4] = 0,
            out[5] = 0,
            out
        }
        ,
        mat2d.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(6);
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4],
            out[5] = a[5],
            out
        }
        ,
        mat2d.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4],
            out[5] = a[5],
            out
        }
        ,
        mat2d.identity = function(out) {
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 1,
            out[4] = 0,
            out[5] = 0,
            out
        }
        ,
        mat2d.invert = function(out, a) {
            var aa = a[0]
              , ab = a[1]
              , ac = a[2]
              , ad = a[3]
              , atx = a[4]
              , aty = a[5]
              , det = aa * ad - ab * ac;
            return det ? (det = 1 / det,
            out[0] = ad * det,
            out[1] = -ab * det,
            out[2] = -ac * det,
            out[3] = aa * det,
            out[4] = (ac * aty - ad * atx) * det,
            out[5] = (ab * atx - aa * aty) * det,
            out) : null 
        }
        ,
        mat2d.determinant = function(a) {
            return a[0] * a[3] - a[1] * a[2]
        }
        ,
        mat2d.multiply = function(out, a, b) {
            var aa = a[0]
              , ab = a[1]
              , ac = a[2]
              , ad = a[3]
              , atx = a[4]
              , aty = a[5]
              , ba = b[0]
              , bb = b[1]
              , bc = b[2]
              , bd = b[3]
              , btx = b[4]
              , bty = b[5];
            return out[0] = aa * ba + ab * bc,
            out[1] = aa * bb + ab * bd,
            out[2] = ac * ba + ad * bc,
            out[3] = ac * bb + ad * bd,
            out[4] = ba * atx + bc * aty + btx,
            out[5] = bb * atx + bd * aty + bty,
            out
        }
        ,
        mat2d.mul = mat2d.multiply,
        mat2d.rotate = function(out, a, rad) {
            var aa = a[0]
              , ab = a[1]
              , ac = a[2]
              , ad = a[3]
              , atx = a[4]
              , aty = a[5]
              , st = Math.sin(rad)
              , ct = Math.cos(rad);
            return out[0] = aa * ct + ab * st,
            out[1] = -aa * st + ab * ct,
            out[2] = ac * ct + ad * st,
            out[3] = -ac * st + ct * ad,
            out[4] = ct * atx + st * aty,
            out[5] = ct * aty - st * atx,
            out
        }
        ,
        mat2d.scale = function(out, a, v) {
            var vx = v[0]
              , vy = v[1];
            return out[0] = a[0] * vx,
            out[1] = a[1] * vy,
            out[2] = a[2] * vx,
            out[3] = a[3] * vy,
            out[4] = a[4] * vx,
            out[5] = a[5] * vy,
            out
        }
        ,
        mat2d.translate = function(out, a, v) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4] + v[0],
            out[5] = a[5] + v[1],
            out
        }
        ,
        mat2d.str = function(a) {
            return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.mat2d = mat2d);
        var mat3 = {};
        new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        mat3.create = function() {
            var out = new GLMAT_ARRAY_TYPE(9);
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 1,
            out[5] = 0,
            out[6] = 0,
            out[7] = 0,
            out[8] = 1,
            out
        }
        ,
        mat3.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(9);
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4],
            out[5] = a[5],
            out[6] = a[6],
            out[7] = a[7],
            out[8] = a[8],
            out
        }
        ,
        mat3.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4],
            out[5] = a[5],
            out[6] = a[6],
            out[7] = a[7],
            out[8] = a[8],
            out
        }
        ,
        mat3.identity = function(out) {
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 1,
            out[5] = 0,
            out[6] = 0,
            out[7] = 0,
            out[8] = 1,
            out
        }
        ,
        mat3.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1]
                  , a02 = a[2]
                  , a12 = a[5];
                out[1] = a[3],
                out[2] = a[6],
                out[3] = a01,
                out[5] = a[7],
                out[6] = a02,
                out[7] = a12
            } else
                out[0] = a[0],
                out[1] = a[3],
                out[2] = a[6],
                out[3] = a[1],
                out[4] = a[4],
                out[5] = a[7],
                out[6] = a[2],
                out[7] = a[5],
                out[8] = a[8];
            return out
        }
        ,
        mat3.invert = function(out, a) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a10 = a[3]
              , a11 = a[4]
              , a12 = a[5]
              , a20 = a[6]
              , a21 = a[7]
              , a22 = a[8]
              , b01 = a22 * a11 - a12 * a21
              , b11 = -a22 * a10 + a12 * a20
              , b21 = a21 * a10 - a11 * a20
              , det = a00 * b01 + a01 * b11 + a02 * b21;
            return det ? (det = 1 / det,
            out[0] = b01 * det,
            out[1] = (-a22 * a01 + a02 * a21) * det,
            out[2] = (a12 * a01 - a02 * a11) * det,
            out[3] = b11 * det,
            out[4] = (a22 * a00 - a02 * a20) * det,
            out[5] = (-a12 * a00 + a02 * a10) * det,
            out[6] = b21 * det,
            out[7] = (-a21 * a00 + a01 * a20) * det,
            out[8] = (a11 * a00 - a01 * a10) * det,
            out) : null 
        }
        ,
        mat3.adjoint = function(out, a) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a10 = a[3]
              , a11 = a[4]
              , a12 = a[5]
              , a20 = a[6]
              , a21 = a[7]
              , a22 = a[8];
            return out[0] = a11 * a22 - a12 * a21,
            out[1] = a02 * a21 - a01 * a22,
            out[2] = a01 * a12 - a02 * a11,
            out[3] = a12 * a20 - a10 * a22,
            out[4] = a00 * a22 - a02 * a20,
            out[5] = a02 * a10 - a00 * a12,
            out[6] = a10 * a21 - a11 * a20,
            out[7] = a01 * a20 - a00 * a21,
            out[8] = a00 * a11 - a01 * a10,
            out
        }
        ,
        mat3.determinant = function(a) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a10 = a[3]
              , a11 = a[4]
              , a12 = a[5]
              , a20 = a[6]
              , a21 = a[7]
              , a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20)
        }
        ,
        mat3.multiply = function(out, a, b) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a10 = a[3]
              , a11 = a[4]
              , a12 = a[5]
              , a20 = a[6]
              , a21 = a[7]
              , a22 = a[8]
              , b00 = b[0]
              , b01 = b[1]
              , b02 = b[2]
              , b10 = b[3]
              , b11 = b[4]
              , b12 = b[5]
              , b20 = b[6]
              , b21 = b[7]
              , b22 = b[8];
            return out[0] = b00 * a00 + b01 * a10 + b02 * a20,
            out[1] = b00 * a01 + b01 * a11 + b02 * a21,
            out[2] = b00 * a02 + b01 * a12 + b02 * a22,
            out[3] = b10 * a00 + b11 * a10 + b12 * a20,
            out[4] = b10 * a01 + b11 * a11 + b12 * a21,
            out[5] = b10 * a02 + b11 * a12 + b12 * a22,
            out[6] = b20 * a00 + b21 * a10 + b22 * a20,
            out[7] = b20 * a01 + b21 * a11 + b22 * a21,
            out[8] = b20 * a02 + b21 * a12 + b22 * a22,
            out
        }
        ,
        mat3.mul = mat3.multiply,
        mat3.translate = function(out, a, v) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a10 = a[3]
              , a11 = a[4]
              , a12 = a[5]
              , a20 = a[6]
              , a21 = a[7]
              , a22 = a[8]
              , x = v[0]
              , y = v[1];
            return out[0] = a00,
            out[1] = a01,
            out[2] = a02,
            out[3] = a10,
            out[4] = a11,
            out[5] = a12,
            out[6] = x * a00 + y * a10 + a20,
            out[7] = x * a01 + y * a11 + a21,
            out[8] = x * a02 + y * a12 + a22,
            out
        }
        ,
        mat3.rotate = function(out, a, rad) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a10 = a[3]
              , a11 = a[4]
              , a12 = a[5]
              , a20 = a[6]
              , a21 = a[7]
              , a22 = a[8]
              , s = Math.sin(rad)
              , c = Math.cos(rad);
            return out[0] = c * a00 + s * a10,
            out[1] = c * a01 + s * a11,
            out[2] = c * a02 + s * a12,
            out[3] = c * a10 - s * a00,
            out[4] = c * a11 - s * a01,
            out[5] = c * a12 - s * a02,
            out[6] = a20,
            out[7] = a21,
            out[8] = a22,
            out
        }
        ,
        mat3.scale = function(out, a, v) {
            var x = v[0]
              , y = v[2];
            return out[0] = x * a[0],
            out[1] = x * a[1],
            out[2] = x * a[2],
            out[3] = y * a[3],
            out[4] = y * a[4],
            out[5] = y * a[5],
            out[6] = a[6],
            out[7] = a[7],
            out[8] = a[8],
            out
        }
        ,
        mat3.fromMat2d = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = 0,
            out[3] = a[2],
            out[4] = a[3],
            out[5] = 0,
            out[6] = a[4],
            out[7] = a[5],
            out[8] = 1,
            out
        }
        ,
        mat3.fromQuat = function(out, q) {
            var x = q[0]
              , y = q[1]
              , z = q[2]
              , w = q[3]
              , x2 = x + x
              , y2 = y + y
              , z2 = z + z
              , xx = x * x2
              , xy = x * y2
              , xz = x * z2
              , yy = y * y2
              , yz = y * z2
              , zz = z * z2
              , wx = w * x2
              , wy = w * y2
              , wz = w * z2;
            return out[0] = 1 - (yy + zz),
            out[1] = xy + wz,
            out[2] = xz - wy,
            out[3] = xy - wz,
            out[4] = 1 - (xx + zz),
            out[5] = yz + wx,
            out[6] = xz + wy,
            out[7] = yz - wx,
            out[8] = 1 - (xx + yy),
            out
        }
        ,
        mat3.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.mat3 = mat3);
        var mat4 = {};
        new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        mat4.create = function() {
            var out = new GLMAT_ARRAY_TYPE(16);
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 0,
            out[5] = 1,
            out[6] = 0,
            out[7] = 0,
            out[8] = 0,
            out[9] = 0,
            out[10] = 1,
            out[11] = 0,
            out[12] = 0,
            out[13] = 0,
            out[14] = 0,
            out[15] = 1,
            out
        }
        ,
        mat4.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(16);
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4],
            out[5] = a[5],
            out[6] = a[6],
            out[7] = a[7],
            out[8] = a[8],
            out[9] = a[9],
            out[10] = a[10],
            out[11] = a[11],
            out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15],
            out
        }
        ,
        mat4.copy = function(out, a) {
            return out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[4] = a[4],
            out[5] = a[5],
            out[6] = a[6],
            out[7] = a[7],
            out[8] = a[8],
            out[9] = a[9],
            out[10] = a[10],
            out[11] = a[11],
            out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15],
            out
        }
        ,
        mat4.identity = function(out) {
            return out[0] = 1,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 0,
            out[5] = 1,
            out[6] = 0,
            out[7] = 0,
            out[8] = 0,
            out[9] = 0,
            out[10] = 1,
            out[11] = 0,
            out[12] = 0,
            out[13] = 0,
            out[14] = 0,
            out[15] = 1,
            out
        }
        ,
        mat4.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1]
                  , a02 = a[2]
                  , a03 = a[3]
                  , a12 = a[6]
                  , a13 = a[7]
                  , a23 = a[11];
                out[1] = a[4],
                out[2] = a[8],
                out[3] = a[12],
                out[4] = a01,
                out[6] = a[9],
                out[7] = a[13],
                out[8] = a02,
                out[9] = a12,
                out[11] = a[14],
                out[12] = a03,
                out[13] = a13,
                out[14] = a23
            } else
                out[0] = a[0],
                out[1] = a[4],
                out[2] = a[8],
                out[3] = a[12],
                out[4] = a[1],
                out[5] = a[5],
                out[6] = a[9],
                out[7] = a[13],
                out[8] = a[2],
                out[9] = a[6],
                out[10] = a[10],
                out[11] = a[14],
                out[12] = a[3],
                out[13] = a[7],
                out[14] = a[11],
                out[15] = a[15];
            return out
        }
        ,
        mat4.invert = function(out, a) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a03 = a[3]
              , a10 = a[4]
              , a11 = a[5]
              , a12 = a[6]
              , a13 = a[7]
              , a20 = a[8]
              , a21 = a[9]
              , a22 = a[10]
              , a23 = a[11]
              , a30 = a[12]
              , a31 = a[13]
              , a32 = a[14]
              , a33 = a[15]
              , b00 = a00 * a11 - a01 * a10
              , b01 = a00 * a12 - a02 * a10
              , b02 = a00 * a13 - a03 * a10
              , b03 = a01 * a12 - a02 * a11
              , b04 = a01 * a13 - a03 * a11
              , b05 = a02 * a13 - a03 * a12
              , b06 = a20 * a31 - a21 * a30
              , b07 = a20 * a32 - a22 * a30
              , b08 = a20 * a33 - a23 * a30
              , b09 = a21 * a32 - a22 * a31
              , b10 = a21 * a33 - a23 * a31
              , b11 = a22 * a33 - a23 * a32
              , det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            return det ? (det = 1 / det,
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det,
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det,
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det,
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det,
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det,
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det,
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det,
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det,
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det,
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det,
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det,
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det,
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det,
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det,
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det,
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det,
            out) : null 
        }
        ,
        mat4.adjoint = function(out, a) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a03 = a[3]
              , a10 = a[4]
              , a11 = a[5]
              , a12 = a[6]
              , a13 = a[7]
              , a20 = a[8]
              , a21 = a[9]
              , a22 = a[10]
              , a23 = a[11]
              , a30 = a[12]
              , a31 = a[13]
              , a32 = a[14]
              , a33 = a[15];
            return out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22),
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22)),
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12),
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12)),
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22)),
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22),
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12)),
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12),
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21),
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21)),
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11),
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11)),
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21)),
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21),
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11)),
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11),
            out
        }
        ,
        mat4.determinant = function(a) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a03 = a[3]
              , a10 = a[4]
              , a11 = a[5]
              , a12 = a[6]
              , a13 = a[7]
              , a20 = a[8]
              , a21 = a[9]
              , a22 = a[10]
              , a23 = a[11]
              , a30 = a[12]
              , a31 = a[13]
              , a32 = a[14]
              , a33 = a[15]
              , b00 = a00 * a11 - a01 * a10
              , b01 = a00 * a12 - a02 * a10
              , b02 = a00 * a13 - a03 * a10
              , b03 = a01 * a12 - a02 * a11
              , b04 = a01 * a13 - a03 * a11
              , b05 = a02 * a13 - a03 * a12
              , b06 = a20 * a31 - a21 * a30
              , b07 = a20 * a32 - a22 * a30
              , b08 = a20 * a33 - a23 * a30
              , b09 = a21 * a32 - a22 * a31
              , b10 = a21 * a33 - a23 * a31
              , b11 = a22 * a33 - a23 * a32;
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
        }
        ,
        mat4.multiply = function(out, a, b) {
            var a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a03 = a[3]
              , a10 = a[4]
              , a11 = a[5]
              , a12 = a[6]
              , a13 = a[7]
              , a20 = a[8]
              , a21 = a[9]
              , a22 = a[10]
              , a23 = a[11]
              , a30 = a[12]
              , a31 = a[13]
              , a32 = a[14]
              , a33 = a[15]
              , b0 = b[0]
              , b1 = b[1]
              , b2 = b[2]
              , b3 = b[3];
            return out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            b0 = b[4],
            b1 = b[5],
            b2 = b[6],
            b3 = b[7],
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            b0 = b[8],
            b1 = b[9],
            b2 = b[10],
            b3 = b[11],
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            b0 = b[12],
            b1 = b[13],
            b2 = b[14],
            b3 = b[15],
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            out
        }
        ,
        mat4.mul = mat4.multiply,
        mat4.translate = function(out, a, v) {
            var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, x = v[0], y = v[1], z = v[2];
            return a === out ? (out[12] = a[0] * x + a[4] * y + a[8] * z + a[12],
            out[13] = a[1] * x + a[5] * y + a[9] * z + a[13],
            out[14] = a[2] * x + a[6] * y + a[10] * z + a[14],
            out[15] = a[3] * x + a[7] * y + a[11] * z + a[15]) : (a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            out[0] = a00,
            out[1] = a01,
            out[2] = a02,
            out[3] = a03,
            out[4] = a10,
            out[5] = a11,
            out[6] = a12,
            out[7] = a13,
            out[8] = a20,
            out[9] = a21,
            out[10] = a22,
            out[11] = a23,
            out[12] = a00 * x + a10 * y + a20 * z + a[12],
            out[13] = a01 * x + a11 * y + a21 * z + a[13],
            out[14] = a02 * x + a12 * y + a22 * z + a[14],
            out[15] = a03 * x + a13 * y + a23 * z + a[15]),
            out
        }
        ,
        mat4.scale = function(out, a, v) {
            var x = v[0]
              , y = v[1]
              , z = v[2];
            return out[0] = a[0] * x,
            out[1] = a[1] * x,
            out[2] = a[2] * x,
            out[3] = a[3] * x,
            out[4] = a[4] * y,
            out[5] = a[5] * y,
            out[6] = a[6] * y,
            out[7] = a[7] * y,
            out[8] = a[8] * z,
            out[9] = a[9] * z,
            out[10] = a[10] * z,
            out[11] = a[11] * z,
            out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15],
            out
        }
        ,
        mat4.rotate = function(out, a, rad, axis) {
            var s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22, x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z);
            return Math.abs(len) < GLMAT_EPSILON ? null  : (len = 1 / len,
            x *= len,
            y *= len,
            z *= len,
            s = Math.sin(rad),
            c = Math.cos(rad),
            t = 1 - c,
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            b00 = x * x * t + c,
            b01 = y * x * t + z * s,
            b02 = z * x * t - y * s,
            b10 = x * y * t - z * s,
            b11 = y * y * t + c,
            b12 = z * y * t + x * s,
            b20 = x * z * t + y * s,
            b21 = y * z * t - x * s,
            b22 = z * z * t + c,
            out[0] = a00 * b00 + a10 * b01 + a20 * b02,
            out[1] = a01 * b00 + a11 * b01 + a21 * b02,
            out[2] = a02 * b00 + a12 * b01 + a22 * b02,
            out[3] = a03 * b00 + a13 * b01 + a23 * b02,
            out[4] = a00 * b10 + a10 * b11 + a20 * b12,
            out[5] = a01 * b10 + a11 * b11 + a21 * b12,
            out[6] = a02 * b10 + a12 * b11 + a22 * b12,
            out[7] = a03 * b10 + a13 * b11 + a23 * b12,
            out[8] = a00 * b20 + a10 * b21 + a20 * b22,
            out[9] = a01 * b20 + a11 * b21 + a21 * b22,
            out[10] = a02 * b20 + a12 * b21 + a22 * b22,
            out[11] = a03 * b20 + a13 * b21 + a23 * b22,
            a !== out && (out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15]),
            out)
        }
        ,
        mat4.rotateX = function(out, a, rad) {
            var s = Math.sin(rad)
              , c = Math.cos(rad)
              , a10 = a[4]
              , a11 = a[5]
              , a12 = a[6]
              , a13 = a[7]
              , a20 = a[8]
              , a21 = a[9]
              , a22 = a[10]
              , a23 = a[11];
            return a !== out && (out[0] = a[0],
            out[1] = a[1],
            out[2] = a[2],
            out[3] = a[3],
            out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15]),
            out[4] = a10 * c + a20 * s,
            out[5] = a11 * c + a21 * s,
            out[6] = a12 * c + a22 * s,
            out[7] = a13 * c + a23 * s,
            out[8] = a20 * c - a10 * s,
            out[9] = a21 * c - a11 * s,
            out[10] = a22 * c - a12 * s,
            out[11] = a23 * c - a13 * s,
            out
        }
        ,
        mat4.rotateY = function(out, a, rad) {
            var s = Math.sin(rad)
              , c = Math.cos(rad)
              , a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a03 = a[3]
              , a20 = a[8]
              , a21 = a[9]
              , a22 = a[10]
              , a23 = a[11];
            return a !== out && (out[4] = a[4],
            out[5] = a[5],
            out[6] = a[6],
            out[7] = a[7],
            out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15]),
            out[0] = a00 * c - a20 * s,
            out[1] = a01 * c - a21 * s,
            out[2] = a02 * c - a22 * s,
            out[3] = a03 * c - a23 * s,
            out[8] = a00 * s + a20 * c,
            out[9] = a01 * s + a21 * c,
            out[10] = a02 * s + a22 * c,
            out[11] = a03 * s + a23 * c,
            out
        }
        ,
        mat4.rotateZ = function(out, a, rad) {
            var s = Math.sin(rad)
              , c = Math.cos(rad)
              , a00 = a[0]
              , a01 = a[1]
              , a02 = a[2]
              , a03 = a[3]
              , a10 = a[4]
              , a11 = a[5]
              , a12 = a[6]
              , a13 = a[7];
            return a !== out && (out[8] = a[8],
            out[9] = a[9],
            out[10] = a[10],
            out[11] = a[11],
            out[12] = a[12],
            out[13] = a[13],
            out[14] = a[14],
            out[15] = a[15]),
            out[0] = a00 * c + a10 * s,
            out[1] = a01 * c + a11 * s,
            out[2] = a02 * c + a12 * s,
            out[3] = a03 * c + a13 * s,
            out[4] = a10 * c - a00 * s,
            out[5] = a11 * c - a01 * s,
            out[6] = a12 * c - a02 * s,
            out[7] = a13 * c - a03 * s,
            out
        }
        ,
        mat4.fromRotationTranslation = function(out, q, v) {
            var x = q[0]
              , y = q[1]
              , z = q[2]
              , w = q[3]
              , x2 = x + x
              , y2 = y + y
              , z2 = z + z
              , xx = x * x2
              , xy = x * y2
              , xz = x * z2
              , yy = y * y2
              , yz = y * z2
              , zz = z * z2
              , wx = w * x2
              , wy = w * y2
              , wz = w * z2;
            return out[0] = 1 - (yy + zz),
            out[1] = xy + wz,
            out[2] = xz - wy,
            out[3] = 0,
            out[4] = xy - wz,
            out[5] = 1 - (xx + zz),
            out[6] = yz + wx,
            out[7] = 0,
            out[8] = xz + wy,
            out[9] = yz - wx,
            out[10] = 1 - (xx + yy),
            out[11] = 0,
            out[12] = v[0],
            out[13] = v[1],
            out[14] = v[2],
            out[15] = 1,
            out
        }
        ,
        mat4.fromQuat = function(out, q) {
            var x = q[0]
              , y = q[1]
              , z = q[2]
              , w = q[3]
              , x2 = x + x
              , y2 = y + y
              , z2 = z + z
              , xx = x * x2
              , xy = x * y2
              , xz = x * z2
              , yy = y * y2
              , yz = y * z2
              , zz = z * z2
              , wx = w * x2
              , wy = w * y2
              , wz = w * z2;
            return out[0] = 1 - (yy + zz),
            out[1] = xy + wz,
            out[2] = xz - wy,
            out[3] = 0,
            out[4] = xy - wz,
            out[5] = 1 - (xx + zz),
            out[6] = yz + wx,
            out[7] = 0,
            out[8] = xz + wy,
            out[9] = yz - wx,
            out[10] = 1 - (xx + yy),
            out[11] = 0,
            out[12] = 0,
            out[13] = 0,
            out[14] = 0,
            out[15] = 1,
            out
        }
        ,
        mat4.frustum = function(out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left)
              , tb = 1 / (top - bottom)
              , nf = 1 / (near - far);
            return out[0] = 2 * near * rl,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 0,
            out[5] = 2 * near * tb,
            out[6] = 0,
            out[7] = 0,
            out[8] = (right + left) * rl,
            out[9] = (top + bottom) * tb,
            out[10] = (far + near) * nf,
            out[11] = -1,
            out[12] = 0,
            out[13] = 0,
            out[14] = far * near * 2 * nf,
            out[15] = 0,
            out
        }
        ,
        mat4.perspective = function(out, fovy, aspect, near, far) {
            var f = 1 / Math.tan(fovy / 2)
              , nf = 1 / (near - far);
            return out[0] = f / aspect,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 0,
            out[5] = f,
            out[6] = 0,
            out[7] = 0,
            out[8] = 0,
            out[9] = 0,
            out[10] = (far + near) * nf,
            out[11] = -1,
            out[12] = 0,
            out[13] = 0,
            out[14] = 2 * far * near * nf,
            out[15] = 0,
            out
        }
        ,
        mat4.ortho = function(out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right)
              , bt = 1 / (bottom - top)
              , nf = 1 / (near - far);
            return out[0] = -2 * lr,
            out[1] = 0,
            out[2] = 0,
            out[3] = 0,
            out[4] = 0,
            out[5] = -2 * bt,
            out[6] = 0,
            out[7] = 0,
            out[8] = 0,
            out[9] = 0,
            out[10] = 2 * nf,
            out[11] = 0,
            out[12] = (left + right) * lr,
            out[13] = (top + bottom) * bt,
            out[14] = (far + near) * nf,
            out[15] = 1,
            out
        }
        ,
        mat4.lookAt = function(out, eye, center, up) {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
            return Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON ? mat4.identity(out) : (z0 = eyex - centerx,
            z1 = eyey - centery,
            z2 = eyez - centerz,
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2),
            z0 *= len,
            z1 *= len,
            z2 *= len,
            x0 = upy * z2 - upz * z1,
            x1 = upz * z0 - upx * z2,
            x2 = upx * z1 - upy * z0,
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2),
            len ? (len = 1 / len,
            x0 *= len,
            x1 *= len,
            x2 *= len) : (x0 = 0,
            x1 = 0,
            x2 = 0),
            y0 = z1 * x2 - z2 * x1,
            y1 = z2 * x0 - z0 * x2,
            y2 = z0 * x1 - z1 * x0,
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2),
            len ? (len = 1 / len,
            y0 *= len,
            y1 *= len,
            y2 *= len) : (y0 = 0,
            y1 = 0,
            y2 = 0),
            out[0] = x0,
            out[1] = y0,
            out[2] = z0,
            out[3] = 0,
            out[4] = x1,
            out[5] = y1,
            out[6] = z1,
            out[7] = 0,
            out[8] = x2,
            out[9] = y2,
            out[10] = z2,
            out[11] = 0,
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez),
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez),
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez),
            out[15] = 1,
            out)
        }
        ,
        mat4.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.mat4 = mat4);
        var quat = {};
        new Float32Array([0, 0, 0, 1]);
        quat.create = function() {
            var out = new GLMAT_ARRAY_TYPE(4);
            return out[0] = 0,
            out[1] = 0,
            out[2] = 0,
            out[3] = 1,
            out
        }
        ,
        quat.clone = vec4.clone,
        quat.fromValues = vec4.fromValues,
        quat.copy = vec4.copy,
        quat.set = vec4.set,
        quat.identity = function(out) {
            return out[0] = 0,
            out[1] = 0,
            out[2] = 0,
            out[3] = 1,
            out
        }
        ,
        quat.setAxisAngle = function(out, axis, rad) {
            rad = .5 * rad;
            var s = Math.sin(rad);
            return out[0] = s * axis[0],
            out[1] = s * axis[1],
            out[2] = s * axis[2],
            out[3] = Math.cos(rad),
            out
        }
        ,
        quat.add = vec4.add,
        quat.multiply = function(out, a, b) {
            var ax = a[0]
              , ay = a[1]
              , az = a[2]
              , aw = a[3]
              , bx = b[0]
              , by = b[1]
              , bz = b[2]
              , bw = b[3];
            return out[0] = ax * bw + aw * bx + ay * bz - az * by,
            out[1] = ay * bw + aw * by + az * bx - ax * bz,
            out[2] = az * bw + aw * bz + ax * by - ay * bx,
            out[3] = aw * bw - ax * bx - ay * by - az * bz,
            out
        }
        ,
        quat.mul = quat.multiply,
        quat.scale = vec4.scale,
        quat.rotateX = function(out, a, rad) {
            rad *= .5;
            var ax = a[0]
              , ay = a[1]
              , az = a[2]
              , aw = a[3]
              , bx = Math.sin(rad)
              , bw = Math.cos(rad);
            return out[0] = ax * bw + aw * bx,
            out[1] = ay * bw + az * bx,
            out[2] = az * bw - ay * bx,
            out[3] = aw * bw - ax * bx,
            out
        }
        ,
        quat.rotateY = function(out, a, rad) {
            rad *= .5;
            var ax = a[0]
              , ay = a[1]
              , az = a[2]
              , aw = a[3]
              , by = Math.sin(rad)
              , bw = Math.cos(rad);
            return out[0] = ax * bw - az * by,
            out[1] = ay * bw + aw * by,
            out[2] = az * bw + ax * by,
            out[3] = aw * bw - ay * by,
            out
        }
        ,
        quat.rotateZ = function(out, a, rad) {
            rad *= .5;
            var ax = a[0]
              , ay = a[1]
              , az = a[2]
              , aw = a[3]
              , bz = Math.sin(rad)
              , bw = Math.cos(rad);
            return out[0] = ax * bw + ay * bz,
            out[1] = ay * bw - ax * bz,
            out[2] = az * bw + aw * bz,
            out[3] = aw * bw - az * bz,
            out
        }
        ,
        quat.calculateW = function(out, a) {
            var x = a[0]
              , y = a[1]
              , z = a[2];
            return out[0] = x,
            out[1] = y,
            out[2] = z,
            out[3] = -Math.sqrt(Math.abs(1 - x * x - y * y - z * z)),
            out
        }
        ,
        quat.dot = vec4.dot,
        quat.lerp = vec4.lerp,
        quat.slerp = function(out, a, b, t) {
            var halfTheta, sinHalfTheta, ratioA, ratioB, ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3], cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw;
            return Math.abs(cosHalfTheta) >= 1 ? (out !== a && (out[0] = ax,
            out[1] = ay,
            out[2] = az,
            out[3] = aw),
            out) : (halfTheta = Math.acos(cosHalfTheta),
            sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta),
            Math.abs(sinHalfTheta) < .001 ? (out[0] = .5 * ax + .5 * bx,
            out[1] = .5 * ay + .5 * by,
            out[2] = .5 * az + .5 * bz,
            out[3] = .5 * aw + .5 * bw,
            out) : (ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta,
            out[0] = ax * ratioA + bx * ratioB,
            out[1] = ay * ratioA + by * ratioB,
            out[2] = az * ratioA + bz * ratioB,
            out[3] = aw * ratioA + bw * ratioB,
            out))
        }
        ,
        quat.invert = function(out, a) {
            var a0 = a[0]
              , a1 = a[1]
              , a2 = a[2]
              , a3 = a[3]
              , dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3
              , invDot = dot ? 1 / dot : 0;
            return out[0] = -a0 * invDot,
            out[1] = -a1 * invDot,
            out[2] = -a2 * invDot,
            out[3] = a3 * invDot,
            out
        }
        ,
        quat.conjugate = function(out, a) {
            return out[0] = -a[0],
            out[1] = -a[1],
            out[2] = -a[2],
            out[3] = a[3],
            out
        }
        ,
        quat.length = vec4.length,
        quat.len = quat.length,
        quat.squaredLength = vec4.squaredLength,
        quat.sqrLen = quat.squaredLength,
        quat.normalize = vec4.normalize,
        quat.fromMat3 = function() {
            var s_iNext = [1, 2, 0];
            return function(out, m) {
                var fRoot, fTrace = m[0] + m[4] + m[8];
                if (fTrace > 0)
                    fRoot = Math.sqrt(fTrace + 1),
                    out[3] = .5 * fRoot,
                    fRoot = .5 / fRoot,
                    out[0] = (m[7] - m[5]) * fRoot,
                    out[1] = (m[2] - m[6]) * fRoot,
                    out[2] = (m[3] - m[1]) * fRoot;
                else {
                    var i = 0;
                    m[4] > m[0] && (i = 1),
                    m[8] > m[3 * i + i] && (i = 2);
                    var j = s_iNext[i]
                      , k = s_iNext[j];
                    fRoot = Math.sqrt(m[3 * i + i] - m[3 * j + j] - m[3 * k + k] + 1),
                    out[i] = .5 * fRoot,
                    fRoot = .5 / fRoot,
                    out[3] = (m[3 * k + j] - m[3 * j + k]) * fRoot,
                    out[j] = (m[3 * j + i] + m[3 * i + j]) * fRoot,
                    out[k] = (m[3 * k + i] + m[3 * i + k]) * fRoot
                }
                return out
            }
        }
        (),
        quat.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }
        ,
        "undefined" != typeof exports && (exports.quat = quat)
    }
    (shim.exports)
}
(),
!function(e) {
    if ("object" == typeof exports)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define(e);
    else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self),
        f.proj4 = e()
    }
}
(function() {
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a)
                        return a(o, !0);
                    if (i)
                        return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }
                , f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++)
            s(r[o]);
        return s
    }
    ({
        1: [function(_dereq_, module, exports) {
            function Point(x, y, z) {
                if (!(this instanceof Point))
                    return new Point(x,y,z);
                if (Array.isArray(x))
                    this.x = x[0],
                    this.y = x[1],
                    this.z = x[2] || 0;
                else if ("object" == typeof x)
                    this.x = x.x,
                    this.y = x.y,
                    this.z = x.z || 0;
                else if ("string" == typeof x && "undefined" == typeof y) {
                    var coords = x.split(",");
                    this.x = parseFloat(coords[0], 10),
                    this.y = parseFloat(coords[1], 10),
                    this.z = parseFloat(coords[2], 10) || 0
                } else
                    this.x = x,
                    this.y = y,
                    this.z = z || 0;
                console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")
            }
            var mgrs = _dereq_("mgrs");
            Point.fromMGRS = function(mgrsStr) {
                return new Point(mgrs.toPoint(mgrsStr))
            }
            ,
            Point.prototype.toMGRS = function(accuracy) {
                return mgrs.forward([this.x, this.y], accuracy)
            }
            ,
            module.exports = Point
        }
        , {
            mgrs: 66
        }],
        2: [function(_dereq_, module, exports) {
            function Projection(srsCode, callback) {
                if (!(this instanceof Projection))
                    return new Projection(srsCode);
                callback = callback || function(error) {
                    if (error)
                        throw error
                }
                ;
                var json = parseCode(srsCode);
                if ("object" != typeof json)
                    return void callback(srsCode);
                var modifiedJSON = deriveConstants(json)
                  , ourProj = Projection.projections.get(modifiedJSON.projName);
                ourProj ? (extend(this, modifiedJSON),
                extend(this, ourProj),
                this.init(),
                callback(null , this)) : callback(srsCode)
            }
            var parseCode = _dereq_("./parseCode")
              , extend = _dereq_("./extend")
              , projections = _dereq_("./projections")
              , deriveConstants = _dereq_("./deriveConstants");
            Projection.projections = projections,
            Projection.projections.start(),
            module.exports = Projection
        }
        , {
            "./deriveConstants": 32,
            "./extend": 33,
            "./parseCode": 36,
            "./projections": 38
        }],
        3: [function(_dereq_, module, exports) {
            module.exports = function(crs, denorm, point) {
                var v, t, i, xin = point.x, yin = point.y, zin = point.z || 0;
                for (i = 0; 3 > i; i++)
                    if (!denorm || 2 !== i || void 0 !== point.z)
                        switch (0 === i ? (v = xin,
                        t = "x") : 1 === i ? (v = yin,
                        t = "y") : (v = zin,
                        t = "z"),
                        crs.axis[i]) {
                        case "e":
                            point[t] = v;
                            break;
                        case "w":
                            point[t] = -v;
                            break;
                        case "n":
                            point[t] = v;
                            break;
                        case "s":
                            point[t] = -v;
                            break;
                        case "u":
                            void 0 !== point[t] && (point.z = v);
                            break;
                        case "d":
                            void 0 !== point[t] && (point.z = -v);
                            break;
                        default:
                            return null 
                        }
                return point
            }
        }
        , {}],
        4: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2
              , sign = _dereq_("./sign");
            module.exports = function(x) {
                return Math.abs(x) < HALF_PI ? x : x - sign(x) * Math.PI
            }
        }
        , {
            "./sign": 21
        }],
        5: [function(_dereq_, module, exports) {
            var TWO_PI = 2 * Math.PI
              , sign = _dereq_("./sign");
            module.exports = function(x) {
                return Math.abs(x) < Math.PI ? x : x - sign(x) * TWO_PI
            }
        }
        , {
            "./sign": 21
        }],
        6: [function(_dereq_, module, exports) {
            module.exports = function(x) {
                return Math.abs(x) > 1 && (x = x > 1 ? 1 : -1),
                Math.asin(x)
            }
        }
        , {}],
        7: [function(_dereq_, module, exports) {
            module.exports = function(x) {
                return 1 - .25 * x * (1 + x / 16 * (3 + 1.25 * x))
            }
        }
        , {}],
        8: [function(_dereq_, module, exports) {
            module.exports = function(x) {
                return .375 * x * (1 + .25 * x * (1 + .46875 * x))
            }
        }
        , {}],
        9: [function(_dereq_, module, exports) {
            module.exports = function(x) {
                return .05859375 * x * x * (1 + .75 * x)
            }
        }
        , {}],
        10: [function(_dereq_, module, exports) {
            module.exports = function(x) {
                return x * x * x * (35 / 3072)
            }
        }
        , {}],
        11: [function(_dereq_, module, exports) {
            module.exports = function(a, e, sinphi) {
                var temp = e * sinphi;
                return a / Math.sqrt(1 - temp * temp)
            }
        }
        , {}],
        12: [function(_dereq_, module, exports) {
            module.exports = function(ml, e0, e1, e2, e3) {
                var phi, dphi;
                phi = ml / e0;
                for (var i = 0; 15 > i; i++)
                    if (dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi)),
                    phi += dphi,
                    Math.abs(dphi) <= 1e-10)
                        return phi;
                return NaN
            }
        }
        , {}],
        13: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2;
            module.exports = function(eccent, q) {
                var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
                if (Math.abs(Math.abs(q) - temp) < 1e-6)
                    return 0 > q ? -1 * HALF_PI : HALF_PI;
                for (var dphi, sin_phi, cos_phi, con, phi = Math.asin(.5 * q), i = 0; 30 > i; i++)
                    if (sin_phi = Math.sin(phi),
                    cos_phi = Math.cos(phi),
                    con = eccent * sin_phi,
                    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + .5 / eccent * Math.log((1 - con) / (1 + con))),
                    phi += dphi,
                    Math.abs(dphi) <= 1e-10)
                        return phi;
                return NaN
            }
        }
        , {}],
        14: [function(_dereq_, module, exports) {
            module.exports = function(e0, e1, e2, e3, phi) {
                return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi)
            }
        }
        , {}],
        15: [function(_dereq_, module, exports) {
            module.exports = function(eccent, sinphi, cosphi) {
                var con = eccent * sinphi;
                return cosphi / Math.sqrt(1 - con * con)
            }
        }
        , {}],
        16: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2;
            module.exports = function(eccent, ts) {
                for (var con, dphi, eccnth = .5 * eccent, phi = HALF_PI - 2 * Math.atan(ts), i = 0; 15 >= i; i++)
                    if (con = eccent * Math.sin(phi),
                    dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi,
                    phi += dphi,
                    Math.abs(dphi) <= 1e-10)
                        return phi;
                return -9999
            }
        }
        , {}],
        17: [function(_dereq_, module, exports) {
            var C00 = 1
              , C02 = .25
              , C04 = .046875
              , C06 = .01953125
              , C08 = .01068115234375
              , C22 = .75
              , C44 = .46875
              , C46 = .013020833333333334
              , C48 = .007120768229166667
              , C66 = .3645833333333333
              , C68 = .005696614583333333
              , C88 = .3076171875;
            module.exports = function(es) {
                var en = [];
                en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08))),
                en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
                var t = es * es;
                return en[2] = t * (C44 - es * (C46 + es * C48)),
                t *= es,
                en[3] = t * (C66 - es * C68),
                en[4] = t * es * C88,
                en
            }
        }
        , {}],
        18: [function(_dereq_, module, exports) {
            var pj_mlfn = _dereq_("./pj_mlfn")
              , EPSLN = 1e-10
              , MAX_ITER = 20;
            module.exports = function(arg, es, en) {
                for (var k = 1 / (1 - es), phi = arg, i = MAX_ITER; i; --i) {
                    var s = Math.sin(phi)
                      , t = 1 - es * s * s;
                    if (t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k,
                    phi -= t,
                    Math.abs(t) < EPSLN)
                        return phi
                }
                return phi
            }
        }
        , {
            "./pj_mlfn": 19
        }],
        19: [function(_dereq_, module, exports) {
            module.exports = function(phi, sphi, cphi, en) {
                return cphi *= sphi,
                sphi *= sphi,
                en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])))
            }
        }
        , {}],
        20: [function(_dereq_, module, exports) {
            module.exports = function(eccent, sinphi) {
                var con;
                return eccent > 1e-7 ? (con = eccent * sinphi,
                (1 - eccent * eccent) * (sinphi / (1 - con * con) - .5 / eccent * Math.log((1 - con) / (1 + con)))) : 2 * sinphi
            }
        }
        , {}],
        21: [function(_dereq_, module, exports) {
            module.exports = function(x) {
                return 0 > x ? -1 : 1
            }
        }
        , {}],
        22: [function(_dereq_, module, exports) {
            module.exports = function(esinp, exp) {
                return Math.pow((1 - esinp) / (1 + esinp), exp)
            }
        }
        , {}],
        23: [function(_dereq_, module, exports) {
            module.exports = function(array) {
                var out = {
                    x: array[0],
                    y: array[1]
                };
                return array.length > 2 && (out.z = array[2]),
                array.length > 3 && (out.m = array[3]),
                out
            }
        }
        , {}],
        24: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2;
            module.exports = function(eccent, phi, sinphi) {
                var con = eccent * sinphi
                  , com = .5 * eccent;
                return con = Math.pow((1 - con) / (1 + con), com),
                Math.tan(.5 * (HALF_PI - phi)) / con
            }
        }
        , {}],
        25: [function(_dereq_, module, exports) {
            exports.wgs84 = {
                towgs84: "0,0,0",
                ellipse: "WGS84",
                datumName: "WGS84"
            },
            exports.ch1903 = {
                towgs84: "674.374,15.056,405.346",
                ellipse: "bessel",
                datumName: "swiss"
            },
            exports.ggrs87 = {
                towgs84: "-199.87,74.79,246.62",
                ellipse: "GRS80",
                datumName: "Greek_Geodetic_Reference_System_1987"
            },
            exports.nad83 = {
                towgs84: "0,0,0",
                ellipse: "GRS80",
                datumName: "North_American_Datum_1983"
            },
            exports.nad27 = {
                nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
                ellipse: "clrk66",
                datumName: "North_American_Datum_1927"
            },
            exports.potsdam = {
                towgs84: "606.0,23.0,413.0",
                ellipse: "bessel",
                datumName: "Potsdam Rauenberg 1950 DHDN"
            },
            exports.carthage = {
                towgs84: "-263.0,6.0,431.0",
                ellipse: "clark80",
                datumName: "Carthage 1934 Tunisia"
            },
            exports.hermannskogel = {
                towgs84: "653.0,-212.0,449.0",
                ellipse: "bessel",
                datumName: "Hermannskogel"
            },
            exports.ire65 = {
                towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
                ellipse: "mod_airy",
                datumName: "Ireland 1965"
            },
            exports.rassadiran = {
                towgs84: "-133.63,-157.5,-158.62",
                ellipse: "intl",
                datumName: "Rassadiran"
            },
            exports.nzgd49 = {
                towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
                ellipse: "intl",
                datumName: "New Zealand Geodetic Datum 1949"
            },
            exports.osgb36 = {
                towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
                ellipse: "airy",
                datumName: "Airy 1830"
            },
            exports.s_jtsk = {
                towgs84: "589,76,480",
                ellipse: "bessel",
                datumName: "S-JTSK (Ferro)"
            },
            exports.beduaram = {
                towgs84: "-106,-87,188",
                ellipse: "clrk80",
                datumName: "Beduaram"
            },
            exports.gunung_segara = {
                towgs84: "-403,684,41",
                ellipse: "bessel",
                datumName: "Gunung Segara Jakarta"
            },
            exports.rnb72 = {
                towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
                ellipse: "intl",
                datumName: "Reseau National Belge 1972"
            }
        }
        , {}],
        26: [function(_dereq_, module, exports) {
            exports.MERIT = {
                a: 6378137,
                rf: 298.257,
                ellipseName: "MERIT 1983"
            },
            exports.SGS85 = {
                a: 6378136,
                rf: 298.257,
                ellipseName: "Soviet Geodetic System 85"
            },
            exports.GRS80 = {
                a: 6378137,
                rf: 298.257222101,
                ellipseName: "GRS 1980(IUGG, 1980)"
            },
            exports.IAU76 = {
                a: 6378140,
                rf: 298.257,
                ellipseName: "IAU 1976"
            },
            exports.airy = {
                a: 6377563.396,
                b: 6356256.91,
                ellipseName: "Airy 1830"
            },
            exports.APL4 = {
                a: 6378137,
                rf: 298.25,
                ellipseName: "Appl. Physics. 1965"
            },
            exports.NWL9D = {
                a: 6378145,
                rf: 298.25,
                ellipseName: "Naval Weapons Lab., 1965"
            },
            exports.mod_airy = {
                a: 6377340.189,
                b: 6356034.446,
                ellipseName: "Modified Airy"
            },
            exports.andrae = {
                a: 6377104.43,
                rf: 300,
                ellipseName: "Andrae 1876 (Den., Iclnd.)"
            },
            exports.aust_SA = {
                a: 6378160,
                rf: 298.25,
                ellipseName: "Australian Natl & S. Amer. 1969"
            },
            exports.GRS67 = {
                a: 6378160,
                rf: 298.247167427,
                ellipseName: "GRS 67(IUGG 1967)"
            },
            exports.bessel = {
                a: 6377397.155,
                rf: 299.1528128,
                ellipseName: "Bessel 1841"
            },
            exports.bess_nam = {
                a: 6377483.865,
                rf: 299.1528128,
                ellipseName: "Bessel 1841 (Namibia)"
            },
            exports.clrk66 = {
                a: 6378206.4,
                b: 6356583.8,
                ellipseName: "Clarke 1866"
            },
            exports.clrk80 = {
                a: 6378249.145,
                rf: 293.4663,
                ellipseName: "Clarke 1880 mod."
            },
            exports.clrk58 = {
                a: 6378293.645208759,
                rf: 294.2606763692654,
                ellipseName: "Clarke 1858"
            },
            exports.CPM = {
                a: 6375738.7,
                rf: 334.29,
                ellipseName: "Comm. des Poids et Mesures 1799"
            },
            exports.delmbr = {
                a: 6376428,
                rf: 311.5,
                ellipseName: "Delambre 1810 (Belgium)"
            },
            exports.engelis = {
                a: 6378136.05,
                rf: 298.2566,
                ellipseName: "Engelis 1985"
            },
            exports.evrst30 = {
                a: 6377276.345,
                rf: 300.8017,
                ellipseName: "Everest 1830"
            },
            exports.evrst48 = {
                a: 6377304.063,
                rf: 300.8017,
                ellipseName: "Everest 1948"
            },
            exports.evrst56 = {
                a: 6377301.243,
                rf: 300.8017,
                ellipseName: "Everest 1956"
            },
            exports.evrst69 = {
                a: 6377295.664,
                rf: 300.8017,
                ellipseName: "Everest 1969"
            },
            exports.evrstSS = {
                a: 6377298.556,
                rf: 300.8017,
                ellipseName: "Everest (Sabah & Sarawak)"
            },
            exports.fschr60 = {
                a: 6378166,
                rf: 298.3,
                ellipseName: "Fischer (Mercury Datum) 1960"
            },
            exports.fschr60m = {
                a: 6378155,
                rf: 298.3,
                ellipseName: "Fischer 1960"
            },
            exports.fschr68 = {
                a: 6378150,
                rf: 298.3,
                ellipseName: "Fischer 1968"
            },
            exports.helmert = {
                a: 6378200,
                rf: 298.3,
                ellipseName: "Helmert 1906"
            },
            exports.hough = {
                a: 6378270,
                rf: 297,
                ellipseName: "Hough"
            },
            exports.intl = {
                a: 6378388,
                rf: 297,
                ellipseName: "International 1909 (Hayford)"
            },
            exports.kaula = {
                a: 6378163,
                rf: 298.24,
                ellipseName: "Kaula 1961"
            },
            exports.lerch = {
                a: 6378139,
                rf: 298.257,
                ellipseName: "Lerch 1979"
            },
            exports.mprts = {
                a: 6397300,
                rf: 191,
                ellipseName: "Maupertius 1738"
            },
            exports.new_intl = {
                a: 6378157.5,
                b: 6356772.2,
                ellipseName: "New International 1967"
            },
            exports.plessis = {
                a: 6376523,
                rf: 6355863,
                ellipseName: "Plessis 1817 (France)"
            },
            exports.krass = {
                a: 6378245,
                rf: 298.3,
                ellipseName: "Krassovsky, 1942"
            },
            exports.SEasia = {
                a: 6378155,
                b: 6356773.3205,
                ellipseName: "Southeast Asia"
            },
            exports.walbeck = {
                a: 6376896,
                b: 6355834.8467,
                ellipseName: "Walbeck"
            },
            exports.WGS60 = {
                a: 6378165,
                rf: 298.3,
                ellipseName: "WGS 60"
            },
            exports.WGS66 = {
                a: 6378145,
                rf: 298.25,
                ellipseName: "WGS 66"
            },
            exports.WGS7 = {
                a: 6378135,
                rf: 298.26,
                ellipseName: "WGS 72"
            },
            exports.WGS84 = {
                a: 6378137,
                rf: 298.257223563,
                ellipseName: "WGS 84"
            },
            exports.sphere = {
                a: 6370997,
                b: 6370997,
                ellipseName: "Normal Sphere (r=6370997)"
            }
        }
        , {}],
        27: [function(_dereq_, module, exports) {
            exports.greenwich = 0,
            exports.lisbon = -9.131906111111,
            exports.paris = 2.337229166667,
            exports.bogota = -74.080916666667,
            exports.madrid = -3.687938888889,
            exports.rome = 12.452333333333,
            exports.bern = 7.439583333333,
            exports.jakarta = 106.807719444444,
            exports.ferro = -17.666666666667,
            exports.brussels = 4.367975,
            exports.stockholm = 18.058277777778,
            exports.athens = 23.7163375,
            exports.oslo = 10.722916666667
        }
        , {}],
        28: [function(_dereq_, module, exports) {
            function transformer(from, to, coords) {
                var transformedArray;
                return Array.isArray(coords) ? (transformedArray = transform(from, to, coords),
                3 === coords.length ? [transformedArray.x, transformedArray.y, transformedArray.z] : [transformedArray.x, transformedArray.y]) : transform(from, to, coords)
            }
            function checkProj(item) {
                return item instanceof proj ? item : item.oProj ? item.oProj : proj(item)
            }
            function proj4(fromProj, toProj, coord) {
                fromProj = checkProj(fromProj);
                var obj, single = !1;
                return "undefined" == typeof toProj ? (toProj = fromProj,
                fromProj = wgs84,
                single = !0) : ("undefined" != typeof toProj.x || Array.isArray(toProj)) && (coord = toProj,
                toProj = fromProj,
                fromProj = wgs84,
                single = !0),
                toProj = checkProj(toProj),
                coord ? transformer(fromProj, toProj, coord) : (obj = {
                    forward: function(coords) {
                        return transformer(fromProj, toProj, coords)
                    },
                    inverse: function(coords) {
                        return transformer(toProj, fromProj, coords)
                    }
                },
                single && (obj.oProj = toProj),
                obj)
            }
            var proj = _dereq_("./Proj")
              , transform = _dereq_("./transform")
              , wgs84 = proj("WGS84");
            module.exports = proj4
        }
        , {
            "./Proj": 2,
            "./transform": 64
        }],
        29: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2
              , PJD_3PARAM = 1
              , PJD_7PARAM = 2
              , PJD_GRIDSHIFT = 3
              , PJD_WGS84 = 4
              , PJD_NODATUM = 5
              , SEC_TO_RAD = 484813681109536e-20
              , AD_C = 1.0026
              , COS_67P5 = .3826834323650898
              , datum = function(proj) {
                if (!(this instanceof datum))
                    return new datum(proj);
                if (this.datum_type = PJD_WGS84,
                proj) {
                    if (proj.datumCode && "none" === proj.datumCode && (this.datum_type = PJD_NODATUM),
                    proj.datum_params) {
                        for (var i = 0; i < proj.datum_params.length; i++)
                            proj.datum_params[i] = parseFloat(proj.datum_params[i]);
                        (0 !== proj.datum_params[0] || 0 !== proj.datum_params[1] || 0 !== proj.datum_params[2]) && (this.datum_type = PJD_3PARAM),
                        proj.datum_params.length > 3 && (0 !== proj.datum_params[3] || 0 !== proj.datum_params[4] || 0 !== proj.datum_params[5] || 0 !== proj.datum_params[6]) && (this.datum_type = PJD_7PARAM,
                        proj.datum_params[3] *= SEC_TO_RAD,
                        proj.datum_params[4] *= SEC_TO_RAD,
                        proj.datum_params[5] *= SEC_TO_RAD,
                        proj.datum_params[6] = proj.datum_params[6] / 1e6 + 1)
                    }
                    this.datum_type = proj.grids ? PJD_GRIDSHIFT : this.datum_type,
                    this.a = proj.a,
                    this.b = proj.b,
                    this.es = proj.es,
                    this.ep2 = proj.ep2,
                    this.datum_params = proj.datum_params,
                    this.datum_type === PJD_GRIDSHIFT && (this.grids = proj.grids)
                }
            }
            ;
            datum.prototype = {
                compare_datums: function(dest) {
                    return this.datum_type !== dest.datum_type ? !1 : this.a !== dest.a || Math.abs(this.es - dest.es) > 5e-11 ? !1 : this.datum_type === PJD_3PARAM ? this.datum_params[0] === dest.datum_params[0] && this.datum_params[1] === dest.datum_params[1] && this.datum_params[2] === dest.datum_params[2] : this.datum_type === PJD_7PARAM ? this.datum_params[0] === dest.datum_params[0] && this.datum_params[1] === dest.datum_params[1] && this.datum_params[2] === dest.datum_params[2] && this.datum_params[3] === dest.datum_params[3] && this.datum_params[4] === dest.datum_params[4] && this.datum_params[5] === dest.datum_params[5] && this.datum_params[6] === dest.datum_params[6] : this.datum_type === PJD_GRIDSHIFT || dest.datum_type === PJD_GRIDSHIFT ? this.nadgrids === dest.nadgrids : !0
                },
                geodetic_to_geocentric: function(p) {
                    var X, Y, Z, Rn, Sin_Lat, Sin2_Lat, Cos_Lat, Longitude = p.x, Latitude = p.y, Height = p.z ? p.z : 0, Error_Code = 0;
                    if (-HALF_PI > Latitude && Latitude > -1.001 * HALF_PI)
                        Latitude = -HALF_PI;
                    else if (Latitude > HALF_PI && 1.001 * HALF_PI > Latitude)
                        Latitude = HALF_PI;
                    else if (-HALF_PI > Latitude || Latitude > HALF_PI)
                        return null ;
                    return Longitude > Math.PI && (Longitude -= 2 * Math.PI),
                    Sin_Lat = Math.sin(Latitude),
                    Cos_Lat = Math.cos(Latitude),
                    Sin2_Lat = Sin_Lat * Sin_Lat,
                    Rn = this.a / Math.sqrt(1 - this.es * Sin2_Lat),
                    X = (Rn + Height) * Cos_Lat * Math.cos(Longitude),
                    Y = (Rn + Height) * Cos_Lat * Math.sin(Longitude),
                    Z = (Rn * (1 - this.es) + Height) * Sin_Lat,
                    p.x = X,
                    p.y = Y,
                    p.z = Z,
                    Error_Code
                },
                geocentric_to_geodetic: function(p) {
                    var P, RR, CT, ST, RX, RK, RN, CPHI0, SPHI0, CPHI, SPHI, SDPHI, At_Pole, iter, Longitude, Latitude, Height, genau = 1e-12, genau2 = genau * genau, maxiter = 30, X = p.x, Y = p.y, Z = p.z ? p.z : 0;
                    if (At_Pole = !1,
                    P = Math.sqrt(X * X + Y * Y),
                    RR = Math.sqrt(X * X + Y * Y + Z * Z),
                    P / this.a < genau) {
                        if (At_Pole = !0,
                        Longitude = 0,
                        RR / this.a < genau)
                            return Latitude = HALF_PI,
                            void (Height = -this.b)
                    } else
                        Longitude = Math.atan2(Y, X);
                    CT = Z / RR,
                    ST = P / RR,
                    RX = 1 / Math.sqrt(1 - this.es * (2 - this.es) * ST * ST),
                    CPHI0 = ST * (1 - this.es) * RX,
                    SPHI0 = CT * RX,
                    iter = 0;
                    do
                        iter++,
                        RN = this.a / Math.sqrt(1 - this.es * SPHI0 * SPHI0),
                        Height = P * CPHI0 + Z * SPHI0 - RN * (1 - this.es * SPHI0 * SPHI0),
                        RK = this.es * RN / (RN + Height),
                        RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST),
                        CPHI = ST * (1 - RK) * RX,
                        SPHI = CT * RX,
                        SDPHI = SPHI * CPHI0 - CPHI * SPHI0,
                        CPHI0 = CPHI,
                        SPHI0 = SPHI;
                    while (SDPHI * SDPHI > genau2 && maxiter > iter);return Latitude = Math.atan(SPHI / Math.abs(CPHI)),
                    p.x = Longitude,
                    p.y = Latitude,
                    p.z = Height,
                    p
                },
                geocentric_to_geodetic_noniter: function(p) {
                    var Longitude, Latitude, Height, W, W2, T0, T1, S0, S1, Sin_B0, Sin3_B0, Cos_B0, Sin_p1, Cos_p1, Rn, Sum, At_Pole, X = p.x, Y = p.y, Z = p.z ? p.z : 0;
                    if (X = parseFloat(X),
                    Y = parseFloat(Y),
                    Z = parseFloat(Z),
                    At_Pole = !1,
                    0 !== X)
                        Longitude = Math.atan2(Y, X);
                    else if (Y > 0)
                        Longitude = HALF_PI;
                    else if (0 > Y)
                        Longitude = -HALF_PI;
                    else if (At_Pole = !0,
                    Longitude = 0,
                    Z > 0)
                        Latitude = HALF_PI;
                    else {
                        if (!(0 > Z))
                            return Latitude = HALF_PI,
                            void (Height = -this.b);
                        Latitude = -HALF_PI
                    }
                    return W2 = X * X + Y * Y,
                    W = Math.sqrt(W2),
                    T0 = Z * AD_C,
                    S0 = Math.sqrt(T0 * T0 + W2),
                    Sin_B0 = T0 / S0,
                    Cos_B0 = W / S0,
                    Sin3_B0 = Sin_B0 * Sin_B0 * Sin_B0,
                    T1 = Z + this.b * this.ep2 * Sin3_B0,
                    Sum = W - this.a * this.es * Cos_B0 * Cos_B0 * Cos_B0,
                    S1 = Math.sqrt(T1 * T1 + Sum * Sum),
                    Sin_p1 = T1 / S1,
                    Cos_p1 = Sum / S1,
                    Rn = this.a / Math.sqrt(1 - this.es * Sin_p1 * Sin_p1),
                    Height = Cos_p1 >= COS_67P5 ? W / Cos_p1 - Rn : -COS_67P5 >= Cos_p1 ? W / -Cos_p1 - Rn : Z / Sin_p1 + Rn * (this.es - 1),
                    At_Pole === !1 && (Latitude = Math.atan(Sin_p1 / Cos_p1)),
                    p.x = Longitude,
                    p.y = Latitude,
                    p.z = Height,
                    p
                },
                geocentric_to_wgs84: function(p) {
                    if (this.datum_type === PJD_3PARAM)
                        p.x += this.datum_params[0],
                        p.y += this.datum_params[1],
                        p.z += this.datum_params[2];
                    else if (this.datum_type === PJD_7PARAM) {
                        var Dx_BF = this.datum_params[0]
                          , Dy_BF = this.datum_params[1]
                          , Dz_BF = this.datum_params[2]
                          , Rx_BF = this.datum_params[3]
                          , Ry_BF = this.datum_params[4]
                          , Rz_BF = this.datum_params[5]
                          , M_BF = this.datum_params[6]
                          , x_out = M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF
                          , y_out = M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF
                          , z_out = M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF;
                        p.x = x_out,
                        p.y = y_out,
                        p.z = z_out
                    }
                },
                geocentric_from_wgs84: function(p) {
                    if (this.datum_type === PJD_3PARAM)
                        p.x -= this.datum_params[0],
                        p.y -= this.datum_params[1],
                        p.z -= this.datum_params[2];
                    else if (this.datum_type === PJD_7PARAM) {
                        var Dx_BF = this.datum_params[0]
                          , Dy_BF = this.datum_params[1]
                          , Dz_BF = this.datum_params[2]
                          , Rx_BF = this.datum_params[3]
                          , Ry_BF = this.datum_params[4]
                          , Rz_BF = this.datum_params[5]
                          , M_BF = this.datum_params[6]
                          , x_tmp = (p.x - Dx_BF) / M_BF
                          , y_tmp = (p.y - Dy_BF) / M_BF
                          , z_tmp = (p.z - Dz_BF) / M_BF;
                        p.x = x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
                        p.y = -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
                        p.z = Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
                    }
                }
            },
            module.exports = datum
        }
        , {}],
        30: [function(_dereq_, module, exports) {
            var PJD_3PARAM = 1
              , PJD_7PARAM = 2
              , PJD_GRIDSHIFT = 3
              , PJD_NODATUM = 5
              , SRS_WGS84_SEMIMAJOR = 6378137
              , SRS_WGS84_ESQUARED = .006694379990141316;
            module.exports = function(source, dest, point) {
                function checkParams(fallback) {
                    return fallback === PJD_3PARAM || fallback === PJD_7PARAM
                }
                var wp, i, l;
                if (source.compare_datums(dest))
                    return point;
                if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM)
                    return point;
                var src_a = source.a
                  , src_es = source.es
                  , dst_a = dest.a
                  , dst_es = dest.es
                  , fallback = source.datum_type;
                if (fallback === PJD_GRIDSHIFT)
                    if (0 === this.apply_gridshift(source, 0, point))
                        source.a = SRS_WGS84_SEMIMAJOR,
                        source.es = SRS_WGS84_ESQUARED;
                    else {
                        if (!source.datum_params)
                            return source.a = src_a,
                            source.es = source.es,
                            point;
                        for (wp = 1,
                        i = 0,
                        l = source.datum_params.length; l > i; i++)
                            wp *= source.datum_params[i];
                        if (0 === wp)
                            return source.a = src_a,
                            source.es = source.es,
                            point;
                        fallback = source.datum_params.length > 3 ? PJD_7PARAM : PJD_3PARAM
                    }
                return dest.datum_type === PJD_GRIDSHIFT && (dest.a = SRS_WGS84_SEMIMAJOR,
                dest.es = SRS_WGS84_ESQUARED),
                (source.es !== dest.es || source.a !== dest.a || checkParams(fallback) || checkParams(dest.datum_type)) && (source.geodetic_to_geocentric(point),
                checkParams(source.datum_type) && source.geocentric_to_wgs84(point),
                checkParams(dest.datum_type) && dest.geocentric_from_wgs84(point),
                dest.geocentric_to_geodetic(point)),
                dest.datum_type === PJD_GRIDSHIFT && this.apply_gridshift(dest, 1, point),
                source.a = src_a,
                source.es = src_es,
                dest.a = dst_a,
                dest.es = dst_es,
                point
            }
        }
        , {}],
        31: [function(_dereq_, module, exports) {
            function defs(name) {
                var that = this;
                if (2 === arguments.length) {
                    var def = arguments[1];
                    "string" == typeof def ? "+" === def[0] ? defs[name] = parseProj(arguments[1]) : defs[name] = wkt(arguments[1]) : defs[name] = def
                } else if (1 === arguments.length) {
                    if (Array.isArray(name))
                        return name.map(function(v) {
                            Array.isArray(v) ? defs.apply(that, v) : defs(v)
                        }
                        );
                    if ("string" == typeof name) {
                        if (name in defs)
                            return defs[name]
                    } else
                        "EPSG" in name ? defs["EPSG:" + name.EPSG] = name : "ESRI" in name ? defs["ESRI:" + name.ESRI] = name : "IAU2000" in name ? defs["IAU2000:" + name.IAU2000] = name : console.log(name);
                    return
                }
            }
            var globals = _dereq_("./global")
              , parseProj = _dereq_("./projString")
              , wkt = _dereq_("./wkt");
            globals(defs),
            module.exports = defs
        }
        , {
            "./global": 34,
            "./projString": 37,
            "./wkt": 65
        }],
        32: [function(_dereq_, module, exports) {
            var Datum = _dereq_("./constants/Datum")
              , Ellipsoid = _dereq_("./constants/Ellipsoid")
              , extend = _dereq_("./extend")
              , datum = _dereq_("./datum")
              , EPSLN = 1e-10
              , SIXTH = .16666666666666666
              , RA4 = .04722222222222222
              , RA6 = .022156084656084655;
            module.exports = function(json) {
                if (json.datumCode && "none" !== json.datumCode) {
                    var datumDef = Datum[json.datumCode];
                    datumDef && (json.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(",") : null ,
                    json.ellps = datumDef.ellipse,
                    json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode)
                }
                if (!json.a) {
                    var ellipse = Ellipsoid[json.ellps] ? Ellipsoid[json.ellps] : Ellipsoid.WGS84;
                    extend(json, ellipse)
                }
                return json.rf && !json.b && (json.b = (1 - 1 / json.rf) * json.a),
                (0 === json.rf || Math.abs(json.a - json.b) < EPSLN) && (json.sphere = !0,
                json.b = json.a),
                json.a2 = json.a * json.a,
                json.b2 = json.b * json.b,
                json.es = (json.a2 - json.b2) / json.a2,
                json.e = Math.sqrt(json.es),
                json.R_A && (json.a *= 1 - json.es * (SIXTH + json.es * (RA4 + json.es * RA6)),
                json.a2 = json.a * json.a,
                json.b2 = json.b * json.b,
                json.es = 0),
                json.ep2 = (json.a2 - json.b2) / json.b2,
                json.k0 || (json.k0 = 1),
                json.axis || (json.axis = "enu"),
                json.datum = datum(json),
                json
            }
        }
        , {
            "./constants/Datum": 25,
            "./constants/Ellipsoid": 26,
            "./datum": 29,
            "./extend": 33
        }],
        33: [function(_dereq_, module, exports) {
            module.exports = function(destination, source) {
                destination = destination || {};
                var value, property;
                if (!source)
                    return destination;
                for (property in source)
                    value = source[property],
                    void 0 !== value && (destination[property] = value);
                return destination
            }
        }
        , {}],
        34: [function(_dereq_, module, exports) {
            module.exports = function(defs) {
                defs("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"),
                defs("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"),
                defs("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"),
                defs.WGS84 = defs["EPSG:4326"],
                defs["EPSG:3785"] = defs["EPSG:3857"],
                defs.GOOGLE = defs["EPSG:3857"],
                defs["EPSG:900913"] = defs["EPSG:3857"],
                defs["EPSG:102113"] = defs["EPSG:3857"]
            }
        }
        , {}],
        35: [function(_dereq_, module, exports) {
            var proj4 = _dereq_("./core");
            proj4.defaultDatum = "WGS84",
            proj4.Proj = _dereq_("./Proj"),
            proj4.WGS84 = new proj4.Proj("WGS84"),
            proj4.Point = _dereq_("./Point"),
            proj4.toPoint = _dereq_("./common/toPoint"),
            proj4.defs = _dereq_("./defs"),
            proj4.transform = _dereq_("./transform"),
            proj4.mgrs = _dereq_("mgrs"),
            proj4.version = _dereq_("../package.json").version,
            _dereq_("./includedProjections")(proj4),
            module.exports = proj4
        }
        , {
            "../package.json": 67,
            "./Point": 1,
            "./Proj": 2,
            "./common/toPoint": 23,
            "./core": 28,
            "./defs": 31,
            "./includedProjections": "gWUPNW",
            "./transform": 64,
            mgrs: 66
        }],
        36: [function(_dereq_, module, exports) {
            function testObj(code) {
                return "string" == typeof code
            }
            function testDef(code) {
                return code in defs
            }
            function testWKT(code) {
                var codeWords = ["GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS"];
                return codeWords.reduce(function(a, b) {
                    return a + 1 + code.indexOf(b)
                }
                , 0)
            }
            function testProj(code) {
                return "+" === code[0]
            }
            function parse(code) {
                return testObj(code) ? testDef(code) ? defs[code] : testWKT(code) ? wkt(code) : testProj(code) ? projStr(code) : void 0 : code
            }
            var defs = _dereq_("./defs")
              , wkt = _dereq_("./wkt")
              , projStr = _dereq_("./projString");
            module.exports = parse
        }
        , {
            "./defs": 31,
            "./projString": 37,
            "./wkt": 65
        }],
        37: [function(_dereq_, module, exports) {
            var D2R = .017453292519943295
              , PrimeMeridian = _dereq_("./constants/PrimeMeridian");
            module.exports = function(defData) {
                var self = {}
                  , paramObj = {};
                defData.split("+").map(function(v) {
                    return v.trim()
                }
                ).filter(function(a) {
                    return a
                }
                ).forEach(function(a) {
                    var split = a.split("=");
                    split.push(!0),
                    paramObj[split[0].toLowerCase()] = split[1]
                }
                );
                var paramName, paramVal, paramOutname, params = {
                    proj: "projName",
                    datum: "datumCode",
                    rf: function(v) {
                        self.rf = parseFloat(v, 10)
                    },
                    lat_0: function(v) {
                        self.lat0 = v * D2R
                    },
                    lat_1: function(v) {
                        self.lat1 = v * D2R
                    },
                    lat_2: function(v) {
                        self.lat2 = v * D2R
                    },
                    lat_ts: function(v) {
                        self.lat_ts = v * D2R
                    },
                    lon_0: function(v) {
                        self.long0 = v * D2R
                    },
                    lon_1: function(v) {
                        self.long1 = v * D2R
                    },
                    lon_2: function(v) {
                        self.long2 = v * D2R
                    },
                    alpha: function(v) {
                        self.alpha = parseFloat(v) * D2R
                    },
                    lonc: function(v) {
                        self.longc = v * D2R
                    },
                    x_0: function(v) {
                        self.x0 = parseFloat(v, 10)
                    },
                    y_0: function(v) {
                        self.y0 = parseFloat(v, 10)
                    },
                    k_0: function(v) {
                        self.k0 = parseFloat(v, 10)
                    },
                    k: function(v) {
                        self.k0 = parseFloat(v, 10)
                    },
                    r_a: function() {
                        self.R_A = !0
                    },
                    zone: function(v) {
                        self.zone = parseInt(v, 10)
                    },
                    south: function() {
                        self.utmSouth = !0
                    },
                    towgs84: function(v) {
                        self.datum_params = v.split(",").map(function(a) {
                            return parseFloat(a, 10)
                        }
                        )
                    },
                    to_meter: function(v) {
                        self.to_meter = parseFloat(v, 10)
                    },
                    from_greenwich: function(v) {
                        self.from_greenwich = v * D2R
                    },
                    pm: function(v) {
                        self.from_greenwich = (PrimeMeridian[v] ? PrimeMeridian[v] : parseFloat(v, 10)) * D2R
                    },
                    nadgrids: function(v) {
                        "@null" === v ? self.datumCode = "none" : self.nadgrids = v
                    },
                    axis: function(v) {
                        var legalAxis = "ewnsud";
                        3 === v.length && -1 !== legalAxis.indexOf(v.substr(0, 1)) && -1 !== legalAxis.indexOf(v.substr(1, 1)) && -1 !== legalAxis.indexOf(v.substr(2, 1)) && (self.axis = v)
                    }
                };
                for (paramName in paramObj)
                    paramVal = paramObj[paramName],
                    paramName in params ? (paramOutname = params[paramName],
                    "function" == typeof paramOutname ? paramOutname(paramVal) : self[paramOutname] = paramVal) : self[paramName] = paramVal;
                return "string" == typeof self.datumCode && "WGS84" !== self.datumCode && (self.datumCode = self.datumCode.toLowerCase()),
                self
            }
        }
        , {
            "./constants/PrimeMeridian": 27
        }],
        38: [function(_dereq_, module, exports) {
            function add(proj, i) {
                var len = projStore.length;
                return proj.names ? (projStore[len] = proj,
                proj.names.forEach(function(n) {
                    names[n.toLowerCase()] = len
                }
                ),
                this) : (console.log(i),
                !0)
            }
            var projs = [_dereq_("./projections/merc"), _dereq_("./projections/longlat")]
              , names = {}
              , projStore = [];
            exports.add = add,
            exports.get = function(name) {
                if (!name)
                    return !1;
                var n = name.toLowerCase();
                return "undefined" != typeof names[n] && projStore[names[n]] ? projStore[names[n]] : void 0
            }
            ,
            exports.start = function() {
                projs.forEach(add)
            }
        }
        , {
            "./projections/longlat": 50,
            "./projections/merc": 51
        }],
        39: [function(_dereq_, module, exports) {
            var EPSLN = 1e-10
              , msfnz = _dereq_("../common/msfnz")
              , qsfnz = _dereq_("../common/qsfnz")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , asinz = _dereq_("../common/asinz");
            exports.init = function() {
                Math.abs(this.lat1 + this.lat2) < EPSLN || (this.temp = this.b / this.a,
                this.es = 1 - Math.pow(this.temp, 2),
                this.e3 = Math.sqrt(this.es),
                this.sin_po = Math.sin(this.lat1),
                this.cos_po = Math.cos(this.lat1),
                this.t1 = this.sin_po,
                this.con = this.sin_po,
                this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po),
                this.qs1 = qsfnz(this.e3, this.sin_po, this.cos_po),
                this.sin_po = Math.sin(this.lat2),
                this.cos_po = Math.cos(this.lat2),
                this.t2 = this.sin_po,
                this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po),
                this.qs2 = qsfnz(this.e3, this.sin_po, this.cos_po),
                this.sin_po = Math.sin(this.lat0),
                this.cos_po = Math.cos(this.lat0),
                this.t3 = this.sin_po,
                this.qs0 = qsfnz(this.e3, this.sin_po, this.cos_po),
                Math.abs(this.lat1 - this.lat2) > EPSLN ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con,
                this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1,
                this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0)
            }
            ,
            exports.forward = function(p) {
                var lon = p.x
                  , lat = p.y;
                this.sin_phi = Math.sin(lat),
                this.cos_phi = Math.cos(lat);
                var qs = qsfnz(this.e3, this.sin_phi, this.cos_phi)
                  , rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0
                  , theta = this.ns0 * adjust_lon(lon - this.long0)
                  , x = rh1 * Math.sin(theta) + this.x0
                  , y = this.rh - rh1 * Math.cos(theta) + this.y0;
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var rh1, qs, con, theta, lon, lat;
                return p.x -= this.x0,
                p.y = this.rh - p.y + this.y0,
                this.ns0 >= 0 ? (rh1 = Math.sqrt(p.x * p.x + p.y * p.y),
                con = 1) : (rh1 = -Math.sqrt(p.x * p.x + p.y * p.y),
                con = -1),
                theta = 0,
                0 !== rh1 && (theta = Math.atan2(con * p.x, con * p.y)),
                con = rh1 * this.ns0 / this.a,
                this.sphere ? lat = Math.asin((this.c - con * con) / (2 * this.ns0)) : (qs = (this.c - con * con) / this.ns0,
                lat = this.phi1z(this.e3, qs)),
                lon = adjust_lon(theta / this.ns0 + this.long0),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.phi1z = function(eccent, qs) {
                var sinphi, cosphi, con, com, dphi, phi = asinz(.5 * qs);
                if (EPSLN > eccent)
                    return phi;
                for (var eccnts = eccent * eccent, i = 1; 25 >= i; i++)
                    if (sinphi = Math.sin(phi),
                    cosphi = Math.cos(phi),
                    con = eccent * sinphi,
                    com = 1 - con * con,
                    dphi = .5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + .5 / eccent * Math.log((1 - con) / (1 + con))),
                    phi += dphi,
                    Math.abs(dphi) <= 1e-7)
                        return phi;
                return null 
            }
            ,
            exports.names = ["Albers_Conic_Equal_Area", "Albers", "aea"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/msfnz": 15,
            "../common/qsfnz": 20
        }],
        40: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , HALF_PI = Math.PI / 2
              , EPSLN = 1e-10
              , mlfn = _dereq_("../common/mlfn")
              , e0fn = _dereq_("../common/e0fn")
              , e1fn = _dereq_("../common/e1fn")
              , e2fn = _dereq_("../common/e2fn")
              , e3fn = _dereq_("../common/e3fn")
              , gN = _dereq_("../common/gN")
              , asinz = _dereq_("../common/asinz")
              , imlfn = _dereq_("../common/imlfn");
            exports.init = function() {
                this.sin_p12 = Math.sin(this.lat0),
                this.cos_p12 = Math.cos(this.lat0)
            }
            ,
            exports.forward = function(p) {
                var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5, lon = p.x, lat = p.y, sinphi = Math.sin(p.y), cosphi = Math.cos(p.y), dlon = adjust_lon(lon - this.long0);
                return this.sphere ? Math.abs(this.sin_p12 - 1) <= EPSLN ? (p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon),
                p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon),
                p) : Math.abs(this.sin_p12 + 1) <= EPSLN ? (p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon),
                p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon),
                p) : (cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon),
                c = Math.acos(cos_c),
                kp = c / Math.sin(c),
                p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon),
                p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon)),
                p) : (e0 = e0fn(this.es),
                e1 = e1fn(this.es),
                e2 = e2fn(this.es),
                e3 = e3fn(this.es),
                Math.abs(this.sin_p12 - 1) <= EPSLN ? (Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI),
                Ml = this.a * mlfn(e0, e1, e2, e3, lat),
                p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon),
                p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon),
                p) : Math.abs(this.sin_p12 + 1) <= EPSLN ? (Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI),
                Ml = this.a * mlfn(e0, e1, e2, e3, lat),
                p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon),
                p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon),
                p) : (tanphi = sinphi / cosphi,
                Nl1 = gN(this.a, this.e, this.sin_p12),
                Nl = gN(this.a, this.e, sinphi),
                psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi)),
                Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon)),
                s = 0 === Az ? Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi)) : Math.abs(Math.abs(Az) - Math.PI) <= EPSLN ? -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi)) : Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az)),
                G = this.e * this.sin_p12 / Math.sqrt(1 - this.es),
                H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es),
                GH = G * H,
                Hs = H * H,
                s2 = s * s,
                s3 = s2 * s,
                s4 = s3 * s,
                s5 = s4 * s,
                c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH),
                p.x = this.x0 + c * Math.sin(Az),
                p.y = this.y0 + c * Math.cos(Az),
                p))
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y -= this.y0;
                var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F;
                if (this.sphere) {
                    if (rh = Math.sqrt(p.x * p.x + p.y * p.y),
                    rh > 2 * HALF_PI * this.a)
                        return;
                    return z = rh / this.a,
                    sinz = Math.sin(z),
                    cosz = Math.cos(z),
                    lon = this.long0,
                    Math.abs(rh) <= EPSLN ? lat = this.lat0 : (lat = asinz(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh),
                    con = Math.abs(this.lat0) - HALF_PI,
                    lon = adjust_lon(Math.abs(con) <= EPSLN ? this.lat0 >= 0 ? this.long0 + Math.atan2(p.x, -p.y) : this.long0 - Math.atan2(-p.x, p.y) : this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz))),
                    p.x = lon,
                    p.y = lat,
                    p
                }
                return e0 = e0fn(this.es),
                e1 = e1fn(this.es),
                e2 = e2fn(this.es),
                e3 = e3fn(this.es),
                Math.abs(this.sin_p12 - 1) <= EPSLN ? (Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI),
                rh = Math.sqrt(p.x * p.x + p.y * p.y),
                M = Mlp - rh,
                lat = imlfn(M / this.a, e0, e1, e2, e3),
                lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y)),
                p.x = lon,
                p.y = lat,
                p) : Math.abs(this.sin_p12 + 1) <= EPSLN ? (Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI),
                rh = Math.sqrt(p.x * p.x + p.y * p.y),
                M = rh - Mlp,
                lat = imlfn(M / this.a, e0, e1, e2, e3),
                lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y)),
                p.x = lon,
                p.y = lat,
                p) : (rh = Math.sqrt(p.x * p.x + p.y * p.y),
                Az = Math.atan2(p.x, p.y),
                N1 = gN(this.a, this.e, this.sin_p12),
                cosAz = Math.cos(Az),
                tmp = this.e * this.cos_p12 * cosAz,
                A = -tmp * tmp / (1 - this.es),
                B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es),
                D = rh / N1,
                Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24,
                F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6,
                psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz),
                lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi))),
                lat = Math.atan((1 - this.es * F * this.sin_p12 / Math.sin(psi)) * Math.tan(psi) / (1 - this.es)),
                p.x = lon,
                p.y = lat,
                p)
            }
            ,
            exports.names = ["Azimuthal_Equidistant", "aeqd"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/gN": 11,
            "../common/imlfn": 12,
            "../common/mlfn": 14
        }],
        41: [function(_dereq_, module, exports) {
            var mlfn = _dereq_("../common/mlfn")
              , e0fn = _dereq_("../common/e0fn")
              , e1fn = _dereq_("../common/e1fn")
              , e2fn = _dereq_("../common/e2fn")
              , e3fn = _dereq_("../common/e3fn")
              , gN = _dereq_("../common/gN")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , adjust_lat = _dereq_("../common/adjust_lat")
              , imlfn = _dereq_("../common/imlfn")
              , HALF_PI = Math.PI / 2
              , EPSLN = 1e-10;
            exports.init = function() {
                this.sphere || (this.e0 = e0fn(this.es),
                this.e1 = e1fn(this.es),
                this.e2 = e2fn(this.es),
                this.e3 = e3fn(this.es),
                this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0))
            }
            ,
            exports.forward = function(p) {
                var x, y, lam = p.x, phi = p.y;
                if (lam = adjust_lon(lam - this.long0),
                this.sphere)
                    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam)),
                    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
                else {
                    var sinphi = Math.sin(phi)
                      , cosphi = Math.cos(phi)
                      , nl = gN(this.a, this.e, sinphi)
                      , tl = Math.tan(phi) * Math.tan(phi)
                      , al = lam * Math.cos(phi)
                      , asq = al * al
                      , cl = this.es * cosphi * cosphi / (1 - this.es)
                      , ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
                    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120)),
                    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (.5 + (5 - tl + 6 * cl) * asq / 24)
                }
                return p.x = x + this.x0,
                p.y = y + this.y0,
                p
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y -= this.y0;
                var phi, lam, x = p.x / this.a, y = p.y / this.a;
                if (this.sphere) {
                    var dd = y + this.lat0;
                    phi = Math.asin(Math.sin(dd) * Math.cos(x)),
                    lam = Math.atan2(Math.tan(x), Math.cos(dd))
                } else {
                    var ml1 = this.ml0 / this.a + y
                      , phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
                    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN)
                        return p.x = this.long0,
                        p.y = HALF_PI,
                        0 > y && (p.y *= -1),
                        p;
                    var nl1 = gN(this.a, this.e, Math.sin(phi1))
                      , rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es)
                      , tl1 = Math.pow(Math.tan(phi1), 2)
                      , dl = x * this.a / nl1
                      , dsq = dl * dl;
                    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (.5 - (1 + 3 * tl1) * dl * dl / 24),
                    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1)
                }
                return p.x = adjust_lon(lam + this.long0),
                p.y = adjust_lat(phi),
                p
            }
            ,
            exports.names = ["Cassini", "Cassini_Soldner", "cass"]
        }
        , {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/gN": 11,
            "../common/imlfn": 12,
            "../common/mlfn": 14
        }],
        42: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , qsfnz = _dereq_("../common/qsfnz")
              , msfnz = _dereq_("../common/msfnz")
              , iqsfnz = _dereq_("../common/iqsfnz");
            exports.init = function() {
                this.sphere || (this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))
            }
            ,
            exports.forward = function(p) {
                var x, y, lon = p.x, lat = p.y, dlon = adjust_lon(lon - this.long0);
                if (this.sphere)
                    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts),
                    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
                else {
                    var qs = qsfnz(this.e, Math.sin(lat));
                    x = this.x0 + this.a * this.k0 * dlon,
                    y = this.y0 + this.a * qs * .5 / this.k0
                }
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y -= this.y0;
                var lon, lat;
                return this.sphere ? (lon = adjust_lon(this.long0 + p.x / this.a / Math.cos(this.lat_ts)),
                lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts))) : (lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a),
                lon = adjust_lon(this.long0 + p.x / (this.a * this.k0))),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["cea"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/iqsfnz": 13,
            "../common/msfnz": 15,
            "../common/qsfnz": 20
        }],
        43: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , adjust_lat = _dereq_("../common/adjust_lat");
            exports.init = function() {
                this.x0 = this.x0 || 0,
                this.y0 = this.y0 || 0,
                this.lat0 = this.lat0 || 0,
                this.long0 = this.long0 || 0,
                this.lat_ts = this.lat_ts || 0,
                this.title = this.title || "Equidistant Cylindrical (Plate Carre)",
                this.rc = Math.cos(this.lat_ts)
            }
            ,
            exports.forward = function(p) {
                var lon = p.x
                  , lat = p.y
                  , dlon = adjust_lon(lon - this.long0)
                  , dlat = adjust_lat(lat - this.lat0);
                return p.x = this.x0 + this.a * dlon * this.rc,
                p.y = this.y0 + this.a * dlat,
                p
            }
            ,
            exports.inverse = function(p) {
                var x = p.x
                  , y = p.y;
                return p.x = adjust_lon(this.long0 + (x - this.x0) / (this.a * this.rc)),
                p.y = adjust_lat(this.lat0 + (y - this.y0) / this.a),
                p
            }
            ,
            exports.names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"]
        }
        , {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5
        }],
        44: [function(_dereq_, module, exports) {
            var e0fn = _dereq_("../common/e0fn")
              , e1fn = _dereq_("../common/e1fn")
              , e2fn = _dereq_("../common/e2fn")
              , e3fn = _dereq_("../common/e3fn")
              , msfnz = _dereq_("../common/msfnz")
              , mlfn = _dereq_("../common/mlfn")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , adjust_lat = _dereq_("../common/adjust_lat")
              , imlfn = _dereq_("../common/imlfn")
              , EPSLN = 1e-10;
            exports.init = function() {
                Math.abs(this.lat1 + this.lat2) < EPSLN || (this.lat2 = this.lat2 || this.lat1,
                this.temp = this.b / this.a,
                this.es = 1 - Math.pow(this.temp, 2),
                this.e = Math.sqrt(this.es),
                this.e0 = e0fn(this.es),
                this.e1 = e1fn(this.es),
                this.e2 = e2fn(this.es),
                this.e3 = e3fn(this.es),
                this.sinphi = Math.sin(this.lat1),
                this.cosphi = Math.cos(this.lat1),
                this.ms1 = msfnz(this.e, this.sinphi, this.cosphi),
                this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1),
                Math.abs(this.lat1 - this.lat2) < EPSLN ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2),
                this.cosphi = Math.cos(this.lat2),
                this.ms2 = msfnz(this.e, this.sinphi, this.cosphi),
                this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2),
                this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)),
                this.g = this.ml1 + this.ms1 / this.ns,
                this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0),
                this.rh = this.a * (this.g - this.ml0))
            }
            ,
            exports.forward = function(p) {
                var rh1, lon = p.x, lat = p.y;
                if (this.sphere)
                    rh1 = this.a * (this.g - lat);
                else {
                    var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
                    rh1 = this.a * (this.g - ml)
                }
                var theta = this.ns * adjust_lon(lon - this.long0)
                  , x = this.x0 + rh1 * Math.sin(theta)
                  , y = this.y0 + this.rh - rh1 * Math.cos(theta);
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y = this.rh - p.y + this.y0;
                var con, rh1, lat, lon;
                this.ns >= 0 ? (rh1 = Math.sqrt(p.x * p.x + p.y * p.y),
                con = 1) : (rh1 = -Math.sqrt(p.x * p.x + p.y * p.y),
                con = -1);
                var theta = 0;
                if (0 !== rh1 && (theta = Math.atan2(con * p.x, con * p.y)),
                this.sphere)
                    return lon = adjust_lon(this.long0 + theta / this.ns),
                    lat = adjust_lat(this.g - rh1 / this.a),
                    p.x = lon,
                    p.y = lat,
                    p;
                var ml = this.g - rh1 / this.a;
                return lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3),
                lon = adjust_lon(this.long0 + theta / this.ns),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Equidistant_Conic", "eqdc"]
        }
        , {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/imlfn": 12,
            "../common/mlfn": 14,
            "../common/msfnz": 15
        }],
        45: [function(_dereq_, module, exports) {
            var FORTPI = Math.PI / 4
              , srat = _dereq_("../common/srat")
              , HALF_PI = Math.PI / 2
              , MAX_ITER = 20;
            exports.init = function() {
                var sphi = Math.sin(this.lat0)
                  , cphi = Math.cos(this.lat0);
                cphi *= cphi,
                this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi),
                this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es)),
                this.phic0 = Math.asin(sphi / this.C),
                this.ratexp = .5 * this.C * this.e,
                this.K = Math.tan(.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp))
            }
            ,
            exports.forward = function(p) {
                var lon = p.x
                  , lat = p.y;
                return p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI,
                p.x = this.C * lon,
                p
            }
            ,
            exports.inverse = function(p) {
                for (var DEL_TOL = 1e-14, lon = p.x / this.C, lat = p.y, num = Math.pow(Math.tan(.5 * lat + FORTPI) / this.K, 1 / this.C), i = MAX_ITER; i > 0 && (lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), -.5 * this.e)) - HALF_PI,
                !(Math.abs(lat - p.y) < DEL_TOL)); --i)
                    p.y = lat;
                return i ? (p.x = lon,
                p.y = lat,
                p) : null 
            }
            ,
            exports.names = ["gauss"]
        }
        , {
            "../common/srat": 22
        }],
        46: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , EPSLN = 1e-10
              , asinz = _dereq_("../common/asinz");
            exports.init = function() {
                this.sin_p14 = Math.sin(this.lat0),
                this.cos_p14 = Math.cos(this.lat0),
                this.infinity_dist = 1e3 * this.a,
                this.rc = 1
            }
            ,
            exports.forward = function(p) {
                var sinphi, cosphi, dlon, coslon, ksp, g, x, y, lon = p.x, lat = p.y;
                return dlon = adjust_lon(lon - this.long0),
                sinphi = Math.sin(lat),
                cosphi = Math.cos(lat),
                coslon = Math.cos(dlon),
                g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon,
                ksp = 1,
                g > 0 || Math.abs(g) <= EPSLN ? (x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g,
                y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g) : (x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon),
                y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon)),
                p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var rh, sinc, cosc, c, lon, lat;
                return p.x = (p.x - this.x0) / this.a,
                p.y = (p.y - this.y0) / this.a,
                p.x /= this.k0,
                p.y /= this.k0,
                (rh = Math.sqrt(p.x * p.x + p.y * p.y)) ? (c = Math.atan2(rh, this.rc),
                sinc = Math.sin(c),
                cosc = Math.cos(c),
                lat = asinz(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh),
                lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc),
                lon = adjust_lon(this.long0 + lon)) : (lat = this.phic0,
                lon = 0),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["gnom"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/asinz": 6
        }],
        47: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon");
            exports.init = function() {
                this.a = 6377397.155,
                this.es = .006674372230614,
                this.e = Math.sqrt(this.es),
                this.lat0 || (this.lat0 = .863937979737193),
                this.long0 || (this.long0 = .4334234309119251),
                this.k0 || (this.k0 = .9999),
                this.s45 = .785398163397448,
                this.s90 = 2 * this.s45,
                this.fi0 = this.lat0,
                this.e2 = this.es,
                this.e = Math.sqrt(this.e2),
                this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)),
                this.uq = 1.04216856380474,
                this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa),
                this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2),
                this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g,
                this.k1 = this.k0,
                this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)),
                this.s0 = 1.37008346281555,
                this.n = Math.sin(this.s0),
                this.ro0 = this.k1 * this.n0 / Math.tan(this.s0),
                this.ad = this.s90 - this.uq
            }
            ,
            exports.forward = function(p) {
                var gfi, u, deltav, s, d, eps, ro, lon = p.x, lat = p.y, delta_lon = adjust_lon(lon - this.long0);
                return gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2),
                u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45),
                deltav = -delta_lon * this.alfa,
                s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav)),
                d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s)),
                eps = this.n * d,
                ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n),
                p.y = ro * Math.cos(eps) / 1,
                p.x = ro * Math.sin(eps) / 1,
                this.czech || (p.y *= -1,
                p.x *= -1),
                p
            }
            ,
            exports.inverse = function(p) {
                var u, deltav, s, d, eps, ro, fi1, ok, tmp = p.x;
                p.x = p.y,
                p.y = tmp,
                this.czech || (p.y *= -1,
                p.x *= -1),
                ro = Math.sqrt(p.x * p.x + p.y * p.y),
                eps = Math.atan2(p.y, p.x),
                d = eps / Math.sin(this.s0),
                s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45),
                u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d)),
                deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u)),
                p.x = this.long0 - deltav / this.alfa,
                fi1 = u,
                ok = 0;
                var iter = 0;
                do
                    p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45),
                    Math.abs(fi1 - p.y) < 1e-10 && (ok = 1),
                    fi1 = p.y,
                    iter += 1;
                while (0 === ok && 15 > iter);return iter >= 15 ? null  : p
            }
            ,
            exports.names = ["Krovak", "krovak"]
        }
        , {
            "../common/adjust_lon": 5
        }],
        48: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2
              , FORTPI = Math.PI / 4
              , EPSLN = 1e-10
              , qsfnz = _dereq_("../common/qsfnz")
              , adjust_lon = _dereq_("../common/adjust_lon");
            exports.S_POLE = 1,
            exports.N_POLE = 2,
            exports.EQUIT = 3,
            exports.OBLIQ = 4,
            exports.init = function() {
                var t = Math.abs(this.lat0);
                if (Math.abs(t - HALF_PI) < EPSLN ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(t) < EPSLN ? this.mode = this.EQUIT : this.mode = this.OBLIQ,
                this.es > 0) {
                    var sinphi;
                    switch (this.qp = qsfnz(this.e, 1),
                    this.mmf = .5 / (1 - this.es),
                    this.apa = this.authset(this.es),
                    this.mode) {
                    case this.N_POLE:
                        this.dd = 1;
                        break;
                    case this.S_POLE:
                        this.dd = 1;
                        break;
                    case this.EQUIT:
                        this.rq = Math.sqrt(.5 * this.qp),
                        this.dd = 1 / this.rq,
                        this.xmf = 1,
                        this.ymf = .5 * this.qp;
                        break;
                    case this.OBLIQ:
                        this.rq = Math.sqrt(.5 * this.qp),
                        sinphi = Math.sin(this.lat0),
                        this.sinb1 = qsfnz(this.e, sinphi) / this.qp,
                        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1),
                        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1),
                        this.ymf = (this.xmf = this.rq) / this.dd,
                        this.xmf *= this.dd
                    }
                } else
                    this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0),
                    this.cosph0 = Math.cos(this.lat0))
            }
            ,
            exports.forward = function(p) {
                var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi, lam = p.x, phi = p.y;
                if (lam = adjust_lon(lam - this.long0),
                this.sphere) {
                    if (sinphi = Math.sin(phi),
                    cosphi = Math.cos(phi),
                    coslam = Math.cos(lam),
                    this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                        if (y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam,
                        EPSLN >= y)
                            return null ;
                        y = Math.sqrt(2 / y),
                        x = y * cosphi * Math.sin(lam),
                        y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam
                    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                        if (this.mode === this.N_POLE && (coslam = -coslam),
                        Math.abs(phi + this.phi0) < EPSLN)
                            return null ;
                        y = FORTPI - .5 * phi,
                        y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y)),
                        x = y * Math.sin(lam),
                        y *= coslam
                    }
                } else {
                    switch (sinb = 0,
                    cosb = 0,
                    b = 0,
                    coslam = Math.cos(lam),
                    sinlam = Math.sin(lam),
                    sinphi = Math.sin(phi),
                    q = qsfnz(this.e, sinphi),
                    (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (sinb = q / this.qp,
                    cosb = Math.sqrt(1 - sinb * sinb)),
                    this.mode) {
                    case this.OBLIQ:
                        b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
                        break;
                    case this.EQUIT:
                        b = 1 + cosb * coslam;
                        break;
                    case this.N_POLE:
                        b = HALF_PI + phi,
                        q = this.qp - q;
                        break;
                    case this.S_POLE:
                        b = phi - HALF_PI,
                        q = this.qp + q
                    }
                    if (Math.abs(b) < EPSLN)
                        return null ;
                    switch (this.mode) {
                    case this.OBLIQ:
                    case this.EQUIT:
                        b = Math.sqrt(2 / b),
                        y = this.mode === this.OBLIQ ? this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam) : (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf,
                        x = this.xmf * b * cosb * sinlam;
                        break;
                    case this.N_POLE:
                    case this.S_POLE:
                        q >= 0 ? (x = (b = Math.sqrt(q)) * sinlam,
                        y = coslam * (this.mode === this.S_POLE ? b : -b)) : x = y = 0
                    }
                }
                return p.x = this.a * x + this.x0,
                p.y = this.a * y + this.y0,
                p
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y -= this.y0;
                var lam, phi, cCe, sCe, q, rho, ab, x = p.x / this.a, y = p.y / this.a;
                if (this.sphere) {
                    var rh, cosz = 0, sinz = 0;
                    if (rh = Math.sqrt(x * x + y * y),
                    phi = .5 * rh,
                    phi > 1)
                        return null ;
                    switch (phi = 2 * Math.asin(phi),
                    (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (sinz = Math.sin(phi),
                    cosz = Math.cos(phi)),
                    this.mode) {
                    case this.EQUIT:
                        phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh),
                        x *= sinz,
                        y = cosz * rh;
                        break;
                    case this.OBLIQ:
                        phi = Math.abs(rh) <= EPSLN ? this.phi0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh),
                        x *= sinz * this.cosph0,
                        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
                        break;
                    case this.N_POLE:
                        y = -y,
                        phi = HALF_PI - phi;
                        break;
                    case this.S_POLE:
                        phi -= HALF_PI
                    }
                    lam = 0 !== y || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(x, y) : 0
                } else {
                    if (ab = 0,
                    this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                        if (x /= this.dd,
                        y *= this.dd,
                        rho = Math.sqrt(x * x + y * y),
                        EPSLN > rho)
                            return p.x = 0,
                            p.y = this.phi0,
                            p;
                        sCe = 2 * Math.asin(.5 * rho / this.rq),
                        cCe = Math.cos(sCe),
                        x *= sCe = Math.sin(sCe),
                        this.mode === this.OBLIQ ? (ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho,
                        q = this.qp * ab,
                        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe) : (ab = y * sCe / rho,
                        q = this.qp * ab,
                        y = rho * cCe)
                    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                        if (this.mode === this.N_POLE && (y = -y),
                        q = x * x + y * y,
                        !q)
                            return p.x = 0,
                            p.y = this.phi0,
                            p;
                        ab = 1 - q / this.qp,
                        this.mode === this.S_POLE && (ab = -ab)
                    }
                    lam = Math.atan2(x, y),
                    phi = this.authlat(Math.asin(ab), this.apa)
                }
                return p.x = adjust_lon(this.long0 + lam),
                p.y = phi,
                p
            }
            ,
            exports.P00 = .3333333333333333,
            exports.P01 = .17222222222222222,
            exports.P02 = .10257936507936508,
            exports.P10 = .06388888888888888,
            exports.P11 = .0664021164021164,
            exports.P20 = .016415012942191543,
            exports.authset = function(es) {
                var t, APA = [];
                return APA[0] = es * this.P00,
                t = es * es,
                APA[0] += t * this.P01,
                APA[1] = t * this.P10,
                t *= es,
                APA[0] += t * this.P02,
                APA[1] += t * this.P11,
                APA[2] = t * this.P20,
                APA
            }
            ,
            exports.authlat = function(beta, APA) {
                var t = beta + beta;
                return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t)
            }
            ,
            exports.names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/qsfnz": 20
        }],
        49: [function(_dereq_, module, exports) {
            var EPSLN = 1e-10
              , msfnz = _dereq_("../common/msfnz")
              , tsfnz = _dereq_("../common/tsfnz")
              , HALF_PI = Math.PI / 2
              , sign = _dereq_("../common/sign")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , phi2z = _dereq_("../common/phi2z");
            exports.init = function() {
                if (this.lat2 || (this.lat2 = this.lat1),
                this.k0 || (this.k0 = 1),
                this.x0 = this.x0 || 0,
                this.y0 = this.y0 || 0,
                !(Math.abs(this.lat1 + this.lat2) < EPSLN)) {
                    var temp = this.b / this.a;
                    this.e = Math.sqrt(1 - temp * temp);
                    var sin1 = Math.sin(this.lat1)
                      , cos1 = Math.cos(this.lat1)
                      , ms1 = msfnz(this.e, sin1, cos1)
                      , ts1 = tsfnz(this.e, this.lat1, sin1)
                      , sin2 = Math.sin(this.lat2)
                      , cos2 = Math.cos(this.lat2)
                      , ms2 = msfnz(this.e, sin2, cos2)
                      , ts2 = tsfnz(this.e, this.lat2, sin2)
                      , ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));
                    Math.abs(this.lat1 - this.lat2) > EPSLN ? this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2) : this.ns = sin1,
                    isNaN(this.ns) && (this.ns = sin1),
                    this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns)),
                    this.rh = this.a * this.f0 * Math.pow(ts0, this.ns),
                    this.title || (this.title = "Lambert Conformal Conic")
                }
            }
            ,
            exports.forward = function(p) {
                var lon = p.x
                  , lat = p.y;
                Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN && (lat = sign(lat) * (HALF_PI - 2 * EPSLN));
                var ts, rh1, con = Math.abs(Math.abs(lat) - HALF_PI);
                if (con > EPSLN)
                    ts = tsfnz(this.e, lat, Math.sin(lat)),
                    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
                else {
                    if (con = lat * this.ns,
                    0 >= con)
                        return null ;
                    rh1 = 0
                }
                var theta = this.ns * adjust_lon(lon - this.long0);
                return p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0,
                p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0,
                p
            }
            ,
            exports.inverse = function(p) {
                var rh1, con, ts, lat, lon, x = (p.x - this.x0) / this.k0, y = this.rh - (p.y - this.y0) / this.k0;
                this.ns > 0 ? (rh1 = Math.sqrt(x * x + y * y),
                con = 1) : (rh1 = -Math.sqrt(x * x + y * y),
                con = -1);
                var theta = 0;
                if (0 !== rh1 && (theta = Math.atan2(con * x, con * y)),
                0 !== rh1 || this.ns > 0) {
                    if (con = 1 / this.ns,
                    ts = Math.pow(rh1 / (this.a * this.f0), con),
                    lat = phi2z(this.e, ts),
                    -9999 === lat)
                        return null 
                } else
                    lat = -HALF_PI;
                return lon = adjust_lon(theta / this.ns + this.long0),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/msfnz": 15,
            "../common/phi2z": 16,
            "../common/sign": 21,
            "../common/tsfnz": 24
        }],
        50: [function(_dereq_, module, exports) {
            function identity(pt) {
                return pt
            }
            exports.init = function() {}
            ,
            exports.forward = identity,
            exports.inverse = identity,
            exports.names = ["longlat", "identity"]
        }
        , {}],
        51: [function(_dereq_, module, exports) {
            var msfnz = _dereq_("../common/msfnz")
              , HALF_PI = Math.PI / 2
              , EPSLN = 1e-10
              , R2D = 57.29577951308232
              , adjust_lon = _dereq_("../common/adjust_lon")
              , FORTPI = Math.PI / 4
              , tsfnz = _dereq_("../common/tsfnz")
              , phi2z = _dereq_("../common/phi2z");
            exports.init = function() {
                var con = this.b / this.a;
                this.es = 1 - con * con,
                "x0" in this || (this.x0 = 0),
                "y0" in this || (this.y0 = 0),
                this.e = Math.sqrt(this.es),
                this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1)
            }
            ,
            exports.forward = function(p) {
                var lon = p.x
                  , lat = p.y;
                if (lat * R2D > 90 && -90 > lat * R2D && lon * R2D > 180 && -180 > lon * R2D)
                    return null ;
                var x, y;
                if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)
                    return null ;
                if (this.sphere)
                    x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0),
                    y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + .5 * lat));
                else {
                    var sinphi = Math.sin(lat)
                      , ts = tsfnz(this.e, lat, sinphi);
                    x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0),
                    y = this.y0 - this.a * this.k0 * Math.log(ts)
                }
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var lon, lat, x = p.x - this.x0, y = p.y - this.y0;
                if (this.sphere)
                    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
                else {
                    var ts = Math.exp(-y / (this.a * this.k0));
                    if (lat = phi2z(this.e, ts),
                    -9999 === lat)
                        return null 
                }
                return lon = adjust_lon(this.long0 + x / (this.a * this.k0)),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/msfnz": 15,
            "../common/phi2z": 16,
            "../common/tsfnz": 24
        }],
        52: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon");
            exports.init = function() {}
            ,
            exports.forward = function(p) {
                var lon = p.x
                  , lat = p.y
                  , dlon = adjust_lon(lon - this.long0)
                  , x = this.x0 + this.a * dlon
                  , y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y -= this.y0;
                var lon = adjust_lon(this.long0 + p.x / this.a)
                  , lat = 2.5 * (Math.atan(Math.exp(.8 * p.y / this.a)) - Math.PI / 4);
                return p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Miller_Cylindrical", "mill"]
        }
        , {
            "../common/adjust_lon": 5
        }],
        53: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , EPSLN = 1e-10;
            exports.init = function() {}
            ,
            exports.forward = function(p) {
                for (var lon = p.x, lat = p.y, delta_lon = adjust_lon(lon - this.long0), theta = lat, con = Math.PI * Math.sin(lat), i = 0; !0; i++) {
                    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
                    if (theta += delta_theta,
                    Math.abs(delta_theta) < EPSLN)
                        break
                }
                theta /= 2,
                Math.PI / 2 - Math.abs(lat) < EPSLN && (delta_lon = 0);
                var x = .900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0
                  , y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var theta, arg;
                p.x -= this.x0,
                p.y -= this.y0,
                arg = p.y / (1.4142135623731 * this.a),
                Math.abs(arg) > .999999999999 && (arg = .999999999999),
                theta = Math.asin(arg);
                var lon = adjust_lon(this.long0 + p.x / (.900316316158 * this.a * Math.cos(theta)));
                lon < -Math.PI && (lon = -Math.PI),
                lon > Math.PI && (lon = Math.PI),
                arg = (2 * theta + Math.sin(2 * theta)) / Math.PI,
                Math.abs(arg) > 1 && (arg = 1);
                var lat = Math.asin(arg);
                return p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Mollweide", "moll"]
        }
        , {
            "../common/adjust_lon": 5
        }],
        54: [function(_dereq_, module, exports) {
            var SEC_TO_RAD = 484813681109536e-20;
            exports.iterations = 1,
            exports.init = function() {
                this.A = [],
                this.A[1] = .6399175073,
                this.A[2] = -.1358797613,
                this.A[3] = .063294409,
                this.A[4] = -.02526853,
                this.A[5] = .0117879,
                this.A[6] = -.0055161,
                this.A[7] = .0026906,
                this.A[8] = -.001333,
                this.A[9] = 67e-5,
                this.A[10] = -34e-5,
                this.B_re = [],
                this.B_im = [],
                this.B_re[1] = .7557853228,
                this.B_im[1] = 0,
                this.B_re[2] = .249204646,
                this.B_im[2] = .003371507,
                this.B_re[3] = -.001541739,
                this.B_im[3] = .04105856,
                this.B_re[4] = -.10162907,
                this.B_im[4] = .01727609,
                this.B_re[5] = -.26623489,
                this.B_im[5] = -.36249218,
                this.B_re[6] = -.6870983,
                this.B_im[6] = -1.1651967,
                this.C_re = [],
                this.C_im = [],
                this.C_re[1] = 1.3231270439,
                this.C_im[1] = 0,
                this.C_re[2] = -.577245789,
                this.C_im[2] = -.007809598,
                this.C_re[3] = .508307513,
                this.C_im[3] = -.112208952,
                this.C_re[4] = -.15094762,
                this.C_im[4] = .18200602,
                this.C_re[5] = 1.01418179,
                this.C_im[5] = 1.64497696,
                this.C_re[6] = 1.9660549,
                this.C_im[6] = 2.5127645,
                this.D = [],
                this.D[1] = 1.5627014243,
                this.D[2] = .5185406398,
                this.D[3] = -.03333098,
                this.D[4] = -.1052906,
                this.D[5] = -.0368594,
                this.D[6] = .007317,
                this.D[7] = .0122,
                this.D[8] = .00394,
                this.D[9] = -.0013
            }
            ,
            exports.forward = function(p) {
                var n, lon = p.x, lat = p.y, delta_lat = lat - this.lat0, delta_lon = lon - this.long0, d_phi = delta_lat / SEC_TO_RAD * 1e-5, d_lambda = delta_lon, d_phi_n = 1, d_psi = 0;
                for (n = 1; 10 >= n; n++)
                    d_phi_n *= d_phi,
                    d_psi += this.A[n] * d_phi_n;
                var th_n_re1, th_n_im1, th_re = d_psi, th_im = d_lambda, th_n_re = 1, th_n_im = 0, z_re = 0, z_im = 0;
                for (n = 1; 6 >= n; n++)
                    th_n_re1 = th_n_re * th_re - th_n_im * th_im,
                    th_n_im1 = th_n_im * th_re + th_n_re * th_im,
                    th_n_re = th_n_re1,
                    th_n_im = th_n_im1,
                    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im,
                    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
                return p.x = z_im * this.a + this.x0,
                p.y = z_re * this.a + this.y0,
                p
            }
            ,
            exports.inverse = function(p) {
                var n, z_n_re1, z_n_im1, x = p.x, y = p.y, delta_x = x - this.x0, delta_y = y - this.y0, z_re = delta_y / this.a, z_im = delta_x / this.a, z_n_re = 1, z_n_im = 0, th_re = 0, th_im = 0;
                for (n = 1; 6 >= n; n++)
                    z_n_re1 = z_n_re * z_re - z_n_im * z_im,
                    z_n_im1 = z_n_im * z_re + z_n_re * z_im,
                    z_n_re = z_n_re1,
                    z_n_im = z_n_im1,
                    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im,
                    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
                for (var i = 0; i < this.iterations; i++) {
                    var th_n_re1, th_n_im1, th_n_re = th_re, th_n_im = th_im, num_re = z_re, num_im = z_im;
                    for (n = 2; 6 >= n; n++)
                        th_n_re1 = th_n_re * th_re - th_n_im * th_im,
                        th_n_im1 = th_n_im * th_re + th_n_re * th_im,
                        th_n_re = th_n_re1,
                        th_n_im = th_n_im1,
                        num_re += (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im),
                        num_im += (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
                    th_n_re = 1,
                    th_n_im = 0;
                    var den_re = this.B_re[1]
                      , den_im = this.B_im[1];
                    for (n = 2; 6 >= n; n++)
                        th_n_re1 = th_n_re * th_re - th_n_im * th_im,
                        th_n_im1 = th_n_im * th_re + th_n_re * th_im,
                        th_n_re = th_n_re1,
                        th_n_im = th_n_im1,
                        den_re += n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im),
                        den_im += n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
                    var den2 = den_re * den_re + den_im * den_im;
                    th_re = (num_re * den_re + num_im * den_im) / den2,
                    th_im = (num_im * den_re - num_re * den_im) / den2
                }
                var d_psi = th_re
                  , d_lambda = th_im
                  , d_psi_n = 1
                  , d_phi = 0;
                for (n = 1; 9 >= n; n++)
                    d_psi_n *= d_psi,
                    d_phi += this.D[n] * d_psi_n;
                var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5
                  , lon = this.long0 + d_lambda;
                return p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["New_Zealand_Map_Grid", "nzmg"]
        }
        , {}],
        55: [function(_dereq_, module, exports) {
            var tsfnz = _dereq_("../common/tsfnz")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , phi2z = _dereq_("../common/phi2z")
              , HALF_PI = Math.PI / 2
              , FORTPI = Math.PI / 4
              , EPSLN = 1e-10;
            exports.init = function() {
                this.no_off = this.no_off || !1,
                this.no_rot = this.no_rot || !1,
                isNaN(this.k0) && (this.k0 = 1);
                var sinlat = Math.sin(this.lat0)
                  , coslat = Math.cos(this.lat0)
                  , con = this.e * sinlat;
                this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(coslat, 4)),
                this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - con * con);
                var t0 = tsfnz(this.e, this.lat0, sinlat)
                  , dl = this.bl / coslat * Math.sqrt((1 - this.es) / (1 - con * con));
                1 > dl * dl && (dl = 1);
                var fl, gl;
                if (isNaN(this.longc)) {
                    var t1 = tsfnz(this.e, this.lat1, Math.sin(this.lat1))
                      , t2 = tsfnz(this.e, this.lat2, Math.sin(this.lat2));
                    this.lat0 >= 0 ? this.el = (dl + Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl) : this.el = (dl - Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
                    var hl = Math.pow(t1, this.bl)
                      , ll = Math.pow(t2, this.bl);
                    fl = this.el / hl,
                    gl = .5 * (fl - 1 / fl);
                    var jl = (this.el * this.el - ll * hl) / (this.el * this.el + ll * hl)
                      , pl = (ll - hl) / (ll + hl)
                      , dlon12 = adjust_lon(this.long1 - this.long2);
                    this.long0 = .5 * (this.long1 + this.long2) - Math.atan(jl * Math.tan(.5 * this.bl * dlon12) / pl) / this.bl,
                    this.long0 = adjust_lon(this.long0);
                    var dlon10 = adjust_lon(this.long1 - this.long0);
                    this.gamma0 = Math.atan(Math.sin(this.bl * dlon10) / gl),
                    this.alpha = Math.asin(dl * Math.sin(this.gamma0))
                } else
                    fl = this.lat0 >= 0 ? dl + Math.sqrt(dl * dl - 1) : dl - Math.sqrt(dl * dl - 1),
                    this.el = fl * Math.pow(t0, this.bl),
                    gl = .5 * (fl - 1 / fl),
                    this.gamma0 = Math.asin(Math.sin(this.alpha) / dl),
                    this.long0 = this.longc - Math.asin(gl * Math.tan(this.gamma0)) / this.bl;
                this.no_off ? this.uc = 0 : this.lat0 >= 0 ? this.uc = this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha)) : this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha))
            }
            ,
            exports.forward = function(p) {
                var us, vs, con, lon = p.x, lat = p.y, dlon = adjust_lon(lon - this.long0);
                if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)
                    con = lat > 0 ? -1 : 1,
                    vs = this.al / this.bl * Math.log(Math.tan(FORTPI + con * this.gamma0 * .5)),
                    us = -1 * con * HALF_PI * this.al / this.bl;
                else {
                    var t = tsfnz(this.e, lat, Math.sin(lat))
                      , ql = this.el / Math.pow(t, this.bl)
                      , sl = .5 * (ql - 1 / ql)
                      , tl = .5 * (ql + 1 / ql)
                      , vl = Math.sin(this.bl * dlon)
                      , ul = (sl * Math.sin(this.gamma0) - vl * Math.cos(this.gamma0)) / tl;
                    vs = Math.abs(Math.abs(ul) - 1) <= EPSLN ? Number.POSITIVE_INFINITY : .5 * this.al * Math.log((1 - ul) / (1 + ul)) / this.bl,
                    us = Math.abs(Math.cos(this.bl * dlon)) <= EPSLN ? this.al * this.bl * dlon : this.al * Math.atan2(sl * Math.cos(this.gamma0) + vl * Math.sin(this.gamma0), Math.cos(this.bl * dlon)) / this.bl
                }
                return this.no_rot ? (p.x = this.x0 + us,
                p.y = this.y0 + vs) : (us -= this.uc,
                p.x = this.x0 + vs * Math.cos(this.alpha) + us * Math.sin(this.alpha),
                p.y = this.y0 + us * Math.cos(this.alpha) - vs * Math.sin(this.alpha)),
                p
            }
            ,
            exports.inverse = function(p) {
                var us, vs;
                this.no_rot ? (vs = p.y - this.y0,
                us = p.x - this.x0) : (vs = (p.x - this.x0) * Math.cos(this.alpha) - (p.y - this.y0) * Math.sin(this.alpha),
                us = (p.y - this.y0) * Math.cos(this.alpha) + (p.x - this.x0) * Math.sin(this.alpha),
                us += this.uc);
                var qp = Math.exp(-1 * this.bl * vs / this.al)
                  , sp = .5 * (qp - 1 / qp)
                  , tp = .5 * (qp + 1 / qp)
                  , vp = Math.sin(this.bl * us / this.al)
                  , up = (vp * Math.cos(this.gamma0) + sp * Math.sin(this.gamma0)) / tp
                  , ts = Math.pow(this.el / Math.sqrt((1 + up) / (1 - up)), 1 / this.bl);
                return Math.abs(up - 1) < EPSLN ? (p.x = this.long0,
                p.y = HALF_PI) : Math.abs(up + 1) < EPSLN ? (p.x = this.long0,
                p.y = -1 * HALF_PI) : (p.y = phi2z(this.e, ts),
                p.x = adjust_lon(this.long0 - Math.atan2(sp * Math.cos(this.gamma0) - vp * Math.sin(this.gamma0), Math.cos(this.bl * us / this.al)) / this.bl)),
                p
            }
            ,
            exports.names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/phi2z": 16,
            "../common/tsfnz": 24
        }],
        56: [function(_dereq_, module, exports) {
            var e0fn = _dereq_("../common/e0fn")
              , e1fn = _dereq_("../common/e1fn")
              , e2fn = _dereq_("../common/e2fn")
              , e3fn = _dereq_("../common/e3fn")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , adjust_lat = _dereq_("../common/adjust_lat")
              , mlfn = _dereq_("../common/mlfn")
              , EPSLN = 1e-10
              , gN = _dereq_("../common/gN")
              , MAX_ITER = 20;
            exports.init = function() {
                this.temp = this.b / this.a,
                this.es = 1 - Math.pow(this.temp, 2),
                this.e = Math.sqrt(this.es),
                this.e0 = e0fn(this.es),
                this.e1 = e1fn(this.es),
                this.e2 = e2fn(this.es),
                this.e3 = e3fn(this.es),
                this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0)
            }
            ,
            exports.forward = function(p) {
                var x, y, el, lon = p.x, lat = p.y, dlon = adjust_lon(lon - this.long0);
                if (el = dlon * Math.sin(lat),
                this.sphere)
                    Math.abs(lat) <= EPSLN ? (x = this.a * dlon,
                    y = -1 * this.a * this.lat0) : (x = this.a * Math.sin(el) / Math.tan(lat),
                    y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat)));
                else if (Math.abs(lat) <= EPSLN)
                    x = this.a * dlon,
                    y = -1 * this.ml0;
                else {
                    var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
                    x = nl * Math.sin(el),
                    y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el))
                }
                return p.x = x + this.x0,
                p.y = y + this.y0,
                p
            }
            ,
            exports.inverse = function(p) {
                var lon, lat, x, y, i, al, bl, phi, dphi;
                if (x = p.x - this.x0,
                y = p.y - this.y0,
                this.sphere)
                    if (Math.abs(y + this.a * this.lat0) <= EPSLN)
                        lon = adjust_lon(x / this.a + this.long0),
                        lat = 0;
                    else {
                        al = this.lat0 + y / this.a,
                        bl = x * x / this.a / this.a + al * al,
                        phi = al;
                        var tanphi;
                        for (i = MAX_ITER; i; --i)
                            if (tanphi = Math.tan(phi),
                            dphi = -1 * (al * (phi * tanphi + 1) - phi - .5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1),
                            phi += dphi,
                            Math.abs(dphi) <= EPSLN) {
                                lat = phi;
                                break
                            }
                        lon = adjust_lon(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat))
                    }
                else if (Math.abs(y + this.ml0) <= EPSLN)
                    lat = 0,
                    lon = adjust_lon(this.long0 + x / this.a);
                else {
                    al = (this.ml0 + y) / this.a,
                    bl = x * x / this.a / this.a + al * al,
                    phi = al;
                    var cl, mln, mlnp, ma, con;
                    for (i = MAX_ITER; i; --i)
                        if (con = this.e * Math.sin(phi),
                        cl = Math.sqrt(1 - con * con) * Math.tan(phi),
                        mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi),
                        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi),
                        ma = mln / this.a,
                        dphi = (al * (cl * ma + 1) - ma - .5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp),
                        phi -= dphi,
                        Math.abs(dphi) <= EPSLN) {
                            lat = phi;
                            break
                        }
                    cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat),
                    lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat))
                }
                return p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Polyconic", "poly"]
        }
        , {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/gN": 11,
            "../common/mlfn": 14
        }],
        57: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , adjust_lat = _dereq_("../common/adjust_lat")
              , pj_enfn = _dereq_("../common/pj_enfn")
              , MAX_ITER = 20
              , pj_mlfn = _dereq_("../common/pj_mlfn")
              , pj_inv_mlfn = _dereq_("../common/pj_inv_mlfn")
              , HALF_PI = Math.PI / 2
              , EPSLN = 1e-10
              , asinz = _dereq_("../common/asinz");
            exports.init = function() {
                this.sphere ? (this.n = 1,
                this.m = 0,
                this.es = 0,
                this.C_y = Math.sqrt((this.m + 1) / this.n),
                this.C_x = this.C_y / (this.m + 1)) : this.en = pj_enfn(this.es)
            }
            ,
            exports.forward = function(p) {
                var x, y, lon = p.x, lat = p.y;
                if (lon = adjust_lon(lon - this.long0),
                this.sphere) {
                    if (this.m)
                        for (var k = this.n * Math.sin(lat), i = MAX_ITER; i; --i) {
                            var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
                            if (lat -= V,
                            Math.abs(V) < EPSLN)
                                break
                        }
                    else
                        lat = 1 !== this.n ? Math.asin(this.n * Math.sin(lat)) : lat;
                    x = this.a * this.C_x * lon * (this.m + Math.cos(lat)),
                    y = this.a * this.C_y * lat
                } else {
                    var s = Math.sin(lat)
                      , c = Math.cos(lat);
                    y = this.a * pj_mlfn(lat, s, c, this.en),
                    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s)
                }
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var lat, temp, lon, s;
                return p.x -= this.x0,
                lon = p.x / this.a,
                p.y -= this.y0,
                lat = p.y / this.a,
                this.sphere ? (lat /= this.C_y,
                lon /= this.C_x * (this.m + Math.cos(lat)),
                this.m ? lat = asinz((this.m * lat + Math.sin(lat)) / this.n) : 1 !== this.n && (lat = asinz(Math.sin(lat) / this.n)),
                lon = adjust_lon(lon + this.long0),
                lat = adjust_lat(lat)) : (lat = pj_inv_mlfn(p.y / this.a, this.es, this.en),
                s = Math.abs(lat),
                HALF_PI > s ? (s = Math.sin(lat),
                temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat)),
                lon = adjust_lon(temp)) : HALF_PI > s - EPSLN && (lon = this.long0)),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Sinusoidal", "sinu"]
        }
        , {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/pj_enfn": 17,
            "../common/pj_inv_mlfn": 18,
            "../common/pj_mlfn": 19
        }],
        58: [function(_dereq_, module, exports) {
            exports.init = function() {
                var phy0 = this.lat0;
                this.lambda0 = this.long0;
                var sinPhy0 = Math.sin(phy0)
                  , semiMajorAxis = this.a
                  , invF = this.rf
                  , flattening = 1 / invF
                  , e2 = 2 * flattening - Math.pow(flattening, 2)
                  , e = this.e = Math.sqrt(e2);
                this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2)),
                this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4)),
                this.b0 = Math.asin(sinPhy0 / this.alpha);
                var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2))
                  , k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2))
                  , k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
                this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3
            }
            ,
            exports.forward = function(p) {
                var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2))
                  , Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)))
                  , S = -this.alpha * (Sa1 + Sa2) + this.K
                  , b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4)
                  , I = this.alpha * (p.x - this.lambda0)
                  , rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)))
                  , rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));
                return p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0,
                p.x = this.R * rotI + this.x0,
                p
            }
            ,
            exports.inverse = function(p) {
                for (var Y = p.x - this.x0, X = p.y - this.y0, rotI = Y / this.R, rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4), b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI)), I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB))), lambda = this.lambda0 + I / this.alpha, S = 0, phy = b, prevPhy = -1e3, iteration = 0; Math.abs(phy - prevPhy) > 1e-7; ) {
                    if (++iteration > 20)
                        return;
                    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2)),
                    prevPhy = phy,
                    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2
                }
                return p.x = lambda,
                p.y = phy,
                p
            }
            ,
            exports.names = ["somerc"]
        }
        , {}],
        59: [function(_dereq_, module, exports) {
            var HALF_PI = Math.PI / 2
              , EPSLN = 1e-10
              , sign = _dereq_("../common/sign")
              , msfnz = _dereq_("../common/msfnz")
              , tsfnz = _dereq_("../common/tsfnz")
              , phi2z = _dereq_("../common/phi2z")
              , adjust_lon = _dereq_("../common/adjust_lon");
            exports.ssfn_ = function(phit, sinphi, eccen) {
                return sinphi *= eccen,
                Math.tan(.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), .5 * eccen)
            }
            ,
            exports.init = function() {
                this.coslat0 = Math.cos(this.lat0),
                this.sinlat0 = Math.sin(this.lat0),
                this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && (this.k0 = .5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= EPSLN && (this.lat0 > 0 ? this.con = 1 : this.con = -1),
                this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)),
                1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && (this.k0 = .5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))),
                this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0),
                this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI,
                this.cosX0 = Math.cos(this.X0),
                this.sinX0 = Math.sin(this.X0))
            }
            ,
            exports.forward = function(p) {
                var A, X, sinX, cosX, ts, rh, lon = p.x, lat = p.y, sinlat = Math.sin(lat), coslat = Math.cos(lat), dlon = adjust_lon(lon - this.long0);
                return Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN ? (p.x = NaN,
                p.y = NaN,
                p) : this.sphere ? (A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon)),
                p.x = this.a * A * coslat * Math.sin(dlon) + this.x0,
                p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0,
                p) : (X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI,
                cosX = Math.cos(X),
                sinX = Math.sin(X),
                Math.abs(this.coslat0) <= EPSLN ? (ts = tsfnz(this.e, lat * this.con, this.con * sinlat),
                rh = 2 * this.a * this.k0 * ts / this.cons,
                p.x = this.x0 + rh * Math.sin(lon - this.long0),
                p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0),
                p) : (Math.abs(this.sinlat0) < EPSLN ? (A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon)),
                p.y = A * sinX) : (A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon))),
                p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0),
                p.x = A * cosX * Math.sin(dlon) + this.x0,
                p))
            }
            ,
            exports.inverse = function(p) {
                p.x -= this.x0,
                p.y -= this.y0;
                var lon, lat, ts, ce, Chi, rh = Math.sqrt(p.x * p.x + p.y * p.y);
                if (this.sphere) {
                    var c = 2 * Math.atan(rh / (.5 * this.a * this.k0));
                    return lon = this.long0,
                    lat = this.lat0,
                    EPSLN >= rh ? (p.x = lon,
                    p.y = lat,
                    p) : (lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh),
                    lon = adjust_lon(Math.abs(this.coslat0) < EPSLN ? this.lat0 > 0 ? this.long0 + Math.atan2(p.x, -1 * p.y) : this.long0 + Math.atan2(p.x, p.y) : this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c))),
                    p.x = lon,
                    p.y = lat,
                    p)
                }
                if (Math.abs(this.coslat0) <= EPSLN) {
                    if (EPSLN >= rh)
                        return lat = this.lat0,
                        lon = this.long0,
                        p.x = lon,
                        p.y = lat,
                        p;
                    p.x *= this.con,
                    p.y *= this.con,
                    ts = rh * this.cons / (2 * this.a * this.k0),
                    lat = this.con * phi2z(this.e, ts),
                    lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, -1 * p.y))
                } else
                    ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1)),
                    lon = this.long0,
                    EPSLN >= rh ? Chi = this.X0 : (Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh),
                    lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)))),
                    lat = -1 * phi2z(this.e, Math.tan(.5 * (HALF_PI + Chi)));
                return p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["stere"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/msfnz": 15,
            "../common/phi2z": 16,
            "../common/sign": 21,
            "../common/tsfnz": 24
        }],
        60: [function(_dereq_, module, exports) {
            var gauss = _dereq_("./gauss")
              , adjust_lon = _dereq_("../common/adjust_lon");
            exports.init = function() {
                gauss.init.apply(this),
                this.rc && (this.sinc0 = Math.sin(this.phic0),
                this.cosc0 = Math.cos(this.phic0),
                this.R2 = 2 * this.rc,
                this.title || (this.title = "Oblique Stereographic Alternative"))
            }
            ,
            exports.forward = function(p) {
                var sinc, cosc, cosl, k;
                return p.x = adjust_lon(p.x - this.long0),
                gauss.forward.apply(this, [p]),
                sinc = Math.sin(p.y),
                cosc = Math.cos(p.y),
                cosl = Math.cos(p.x),
                k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl),
                p.x = k * cosc * Math.sin(p.x),
                p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl),
                p.x = this.a * p.x + this.x0,
                p.y = this.a * p.y + this.y0,
                p
            }
            ,
            exports.inverse = function(p) {
                var sinc, cosc, lon, lat, rho;
                if (p.x = (p.x - this.x0) / this.a,
                p.y = (p.y - this.y0) / this.a,
                p.x /= this.k0,
                p.y /= this.k0,
                rho = Math.sqrt(p.x * p.x + p.y * p.y)) {
                    var c = 2 * Math.atan2(rho, this.R2);
                    sinc = Math.sin(c),
                    cosc = Math.cos(c),
                    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho),
                    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc)
                } else
                    lat = this.phic0,
                    lon = 0;
                return p.x = lon,
                p.y = lat,
                gauss.inverse.apply(this, [p]),
                p.x = adjust_lon(p.x + this.long0),
                p
            }
            ,
            exports.names = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative"]
        }
        , {
            "../common/adjust_lon": 5,
            "./gauss": 45
        }],
        61: [function(_dereq_, module, exports) {
            var e0fn = _dereq_("../common/e0fn")
              , e1fn = _dereq_("../common/e1fn")
              , e2fn = _dereq_("../common/e2fn")
              , e3fn = _dereq_("../common/e3fn")
              , mlfn = _dereq_("../common/mlfn")
              , adjust_lon = _dereq_("../common/adjust_lon")
              , HALF_PI = Math.PI / 2
              , EPSLN = 1e-10
              , sign = _dereq_("../common/sign")
              , asinz = _dereq_("../common/asinz");
            exports.init = function() {
                this.e0 = e0fn(this.es),
                this.e1 = e1fn(this.es),
                this.e2 = e2fn(this.es),
                this.e3 = e3fn(this.es),
                this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0)
            }
            ,
            exports.forward = function(p) {
                var con, x, y, lon = p.x, lat = p.y, delta_lon = adjust_lon(lon - this.long0), sin_phi = Math.sin(lat), cos_phi = Math.cos(lat);
                if (this.sphere) {
                    var b = cos_phi * Math.sin(delta_lon);
                    if (Math.abs(Math.abs(b) - 1) < 1e-10)
                        return 93;
                    x = .5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)),
                    con = Math.acos(cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - b * b)),
                    0 > lat && (con = -con),
                    y = this.a * this.k0 * (con - this.lat0)
                } else {
                    var al = cos_phi * delta_lon
                      , als = Math.pow(al, 2)
                      , c = this.ep2 * Math.pow(cos_phi, 2)
                      , tq = Math.tan(lat)
                      , t = Math.pow(tq, 2);
                    con = 1 - this.es * Math.pow(sin_phi, 2);
                    var n = this.a / Math.sqrt(con)
                      , ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat);
                    x = this.k0 * n * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + Math.pow(t, 2) + 72 * c - 58 * this.ep2))) + this.x0,
                    y = this.k0 * (ml - this.ml0 + n * tq * (als * (.5 + als / 24 * (5 - t + 9 * c + 4 * Math.pow(c, 2) + als / 30 * (61 - 58 * t + Math.pow(t, 2) + 600 * c - 330 * this.ep2))))) + this.y0
                }
                return p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var con, phi, delta_phi, i, lat, lon, max_iter = 6;
                if (this.sphere) {
                    var f = Math.exp(p.x / (this.a * this.k0))
                      , g = .5 * (f - 1 / f)
                      , temp = this.lat0 + p.y / (this.a * this.k0)
                      , h = Math.cos(temp);
                    con = Math.sqrt((1 - h * h) / (1 + g * g)),
                    lat = asinz(con),
                    0 > temp && (lat = -lat),
                    lon = 0 === g && 0 === h ? this.long0 : adjust_lon(Math.atan2(g, h) + this.long0)
                } else {
                    var x = p.x - this.x0
                      , y = p.y - this.y0;
                    for (con = (this.ml0 + y / this.k0) / this.a,
                    phi = con,
                    i = 0; !0 && (delta_phi = (con + this.e1 * Math.sin(2 * phi) - this.e2 * Math.sin(4 * phi) + this.e3 * Math.sin(6 * phi)) / this.e0 - phi,
                    phi += delta_phi,
                    !(Math.abs(delta_phi) <= EPSLN)); i++)
                        if (i >= max_iter)
                            return 95;
                    if (Math.abs(phi) < HALF_PI) {
                        var sin_phi = Math.sin(phi)
                          , cos_phi = Math.cos(phi)
                          , tan_phi = Math.tan(phi)
                          , c = this.ep2 * Math.pow(cos_phi, 2)
                          , cs = Math.pow(c, 2)
                          , t = Math.pow(tan_phi, 2)
                          , ts = Math.pow(t, 2);
                        con = 1 - this.es * Math.pow(sin_phi, 2);
                        var n = this.a / Math.sqrt(con)
                          , r = n * (1 - this.es) / con
                          , d = x / (n * this.k0)
                          , ds = Math.pow(d, 2);
                        lat = phi - n * tan_phi * ds / r * (.5 - ds / 24 * (5 + 3 * t + 10 * c - 4 * cs - 9 * this.ep2 - ds / 30 * (61 + 90 * t + 298 * c + 45 * ts - 252 * this.ep2 - 3 * cs))),
                        lon = adjust_lon(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 - 2 * c + 28 * t - 3 * cs + 8 * this.ep2 + 24 * ts))) / cos_phi)
                    } else
                        lat = HALF_PI * sign(y),
                        lon = this.long0
                }
                return p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Transverse_Mercator", "Transverse Mercator", "tmerc"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/mlfn": 14,
            "../common/sign": 21
        }],
        62: [function(_dereq_, module, exports) {
            var D2R = .017453292519943295
              , tmerc = _dereq_("./tmerc");
            exports.dependsOn = "tmerc",
            exports.init = function() {
                this.zone && (this.lat0 = 0,
                this.long0 = (6 * Math.abs(this.zone) - 183) * D2R,
                this.x0 = 5e5,
                this.y0 = this.utmSouth ? 1e7 : 0,
                this.k0 = .9996,
                tmerc.init.apply(this),
                this.forward = tmerc.forward,
                this.inverse = tmerc.inverse)
            }
            ,
            exports.names = ["Universal Transverse Mercator System", "utm"]
        }
        , {
            "./tmerc": 61
        }],
        63: [function(_dereq_, module, exports) {
            var adjust_lon = _dereq_("../common/adjust_lon")
              , HALF_PI = Math.PI / 2
              , EPSLN = 1e-10
              , asinz = _dereq_("../common/asinz");
            exports.init = function() {
                this.R = this.a
            }
            ,
            exports.forward = function(p) {
                var x, y, lon = p.x, lat = p.y, dlon = adjust_lon(lon - this.long0);
                Math.abs(lat) <= EPSLN && (x = this.x0 + this.R * dlon,
                y = this.y0);
                var theta = asinz(2 * Math.abs(lat / Math.PI));
                (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) && (x = this.x0,
                y = lat >= 0 ? this.y0 + Math.PI * this.R * Math.tan(.5 * theta) : this.y0 + Math.PI * this.R * -Math.tan(.5 * theta));
                var al = .5 * Math.abs(Math.PI / dlon - dlon / Math.PI)
                  , asq = al * al
                  , sinth = Math.sin(theta)
                  , costh = Math.cos(theta)
                  , g = costh / (sinth + costh - 1)
                  , gsq = g * g
                  , m = g * (2 / sinth - 1)
                  , msq = m * m
                  , con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
                0 > dlon && (con = -con),
                x = this.x0 + con;
                var q = asq + g;
                return con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq),
                y = lat >= 0 ? this.y0 + con : this.y0 - con,
                p.x = x,
                p.y = y,
                p
            }
            ,
            exports.inverse = function(p) {
                var lon, lat, xx, yy, xys, c1, c2, c3, a1, m1, con, th1, d;
                return p.x -= this.x0,
                p.y -= this.y0,
                con = Math.PI * this.R,
                xx = p.x / con,
                yy = p.y / con,
                xys = xx * xx + yy * yy,
                c1 = -Math.abs(yy) * (1 + xys),
                c2 = c1 - 2 * yy * yy + xx * xx,
                c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys,
                d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27,
                a1 = (c1 - c2 * c2 / 3 / c3) / c3,
                m1 = 2 * Math.sqrt(-a1 / 3),
                con = 3 * d / a1 / m1,
                Math.abs(con) > 1 && (con = con >= 0 ? 1 : -1),
                th1 = Math.acos(con) / 3,
                lat = p.y >= 0 ? (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI : -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI,
                lon = Math.abs(xx) < EPSLN ? this.long0 : adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx),
                p.x = lon,
                p.y = lat,
                p
            }
            ,
            exports.names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]
        }
        , {
            "../common/adjust_lon": 5,
            "../common/asinz": 6
        }],
        64: [function(_dereq_, module, exports) {
            var D2R = .017453292519943295
              , R2D = 57.29577951308232
              , PJD_3PARAM = 1
              , PJD_7PARAM = 2
              , datum_transform = _dereq_("./datum_transform")
              , adjust_axis = _dereq_("./adjust_axis")
              , proj = _dereq_("./Proj")
              , toPoint = _dereq_("./common/toPoint");
            module.exports = function transform(source, dest, point) {
                function checkNotWGS(source, dest) {
                    return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM) && "WGS84" !== dest.datumCode
                }
                var wgs84;
                return Array.isArray(point) && (point = toPoint(point)),
                source.datum && dest.datum && (checkNotWGS(source, dest) || checkNotWGS(dest, source)) && (wgs84 = new proj("WGS84"),
                transform(source, wgs84, point),
                source = wgs84),
                "enu" !== source.axis && adjust_axis(source, !1, point),
                "longlat" === source.projName ? (point.x *= D2R,
                point.y *= D2R) : (source.to_meter && (point.x *= source.to_meter,
                point.y *= source.to_meter),
                source.inverse(point)),
                source.from_greenwich && (point.x += source.from_greenwich),
                point = datum_transform(source.datum, dest.datum, point),
                dest.from_greenwich && (point.x -= dest.from_greenwich),
                "longlat" === dest.projName ? (point.x *= R2D,
                point.y *= R2D) : (dest.forward(point),
                dest.to_meter && (point.x /= dest.to_meter,
                point.y /= dest.to_meter)),
                "enu" !== dest.axis && adjust_axis(dest, !0, point),
                point
            }
        }
        , {
            "./Proj": 2,
            "./adjust_axis": 3,
            "./common/toPoint": 23,
            "./datum_transform": 30
        }],
        65: [function(_dereq_, module, exports) {
            function mapit(obj, key, v) {
                obj[key] = v.map(function(aa) {
                    var o = {};
                    return sExpr(aa, o),
                    o
                }
                ).reduce(function(a, b) {
                    return extend(a, b)
                }
                , {})
            }
            function sExpr(v, obj) {
                var key;
                return Array.isArray(v) ? (key = v.shift(),
                "PARAMETER" === key && (key = v.shift()),
                1 === v.length ? Array.isArray(v[0]) ? (obj[key] = {},
                sExpr(v[0], obj[key])) : obj[key] = v[0] : v.length ? "TOWGS84" === key ? obj[key] = v : (obj[key] = {},
                ["UNIT", "PRIMEM", "VERT_DATUM"].indexOf(key) > -1 ? (obj[key] = {
                    name: v[0].toLowerCase(),
                    convert: v[1]
                },
                3 === v.length && (obj[key].auth = v[2])) : "SPHEROID" === key ? (obj[key] = {
                    name: v[0],
                    a: v[1],
                    rf: v[2]
                },
                4 === v.length && (obj[key].auth = v[3])) : ["GEOGCS", "GEOCCS", "DATUM", "VERT_CS", "COMPD_CS", "LOCAL_CS", "FITTED_CS", "LOCAL_DATUM"].indexOf(key) > -1 ? (v[0] = ["name", v[0]],
                mapit(obj, key, v)) : v.every(function(aa) {
                    return Array.isArray(aa)
                }
                ) ? mapit(obj, key, v) : sExpr(v, obj[key])) : obj[key] = !0,
                void 0) : void (obj[v] = !0)
            }
            function rename(obj, params) {
                var outName = params[0]
                  , inName = params[1];
                !(outName in obj) && inName in obj && (obj[outName] = obj[inName],
                3 === params.length && (obj[outName] = params[2](obj[outName])))
            }
            function d2r(input) {
                return input * D2R
            }
            function cleanWKT(wkt) {
                function toMeter(input) {
                    var ratio = wkt.to_meter || 1;
                    return parseFloat(input, 10) * ratio
                }
                "GEOGCS" === wkt.type ? wkt.projName = "longlat" : "LOCAL_CS" === wkt.type ? (wkt.projName = "identity",
                wkt.local = !0) : "object" == typeof wkt.PROJECTION ? wkt.projName = Object.keys(wkt.PROJECTION)[0] : wkt.projName = wkt.PROJECTION,
                wkt.UNIT && (wkt.units = wkt.UNIT.name.toLowerCase(),
                "metre" === wkt.units && (wkt.units = "meter"),
                wkt.UNIT.convert && (wkt.to_meter = parseFloat(wkt.UNIT.convert, 10))),
                wkt.GEOGCS && (wkt.GEOGCS.DATUM ? wkt.datumCode = wkt.GEOGCS.DATUM.name.toLowerCase() : wkt.datumCode = wkt.GEOGCS.name.toLowerCase(),
                "d_" === wkt.datumCode.slice(0, 2) && (wkt.datumCode = wkt.datumCode.slice(2)),
                ("new_zealand_geodetic_datum_1949" === wkt.datumCode || "new_zealand_1949" === wkt.datumCode) && (wkt.datumCode = "nzgd49"),
                "wgs_1984" === wkt.datumCode && ("Mercator_Auxiliary_Sphere" === wkt.PROJECTION && (wkt.sphere = !0),
                wkt.datumCode = "wgs84"),
                "_ferro" === wkt.datumCode.slice(-6) && (wkt.datumCode = wkt.datumCode.slice(0, -6)),
                "_jakarta" === wkt.datumCode.slice(-8) && (wkt.datumCode = wkt.datumCode.slice(0, -8)),
                ~wkt.datumCode.indexOf("belge") && (wkt.datumCode = "rnb72"),
                wkt.GEOGCS.DATUM && wkt.GEOGCS.DATUM.SPHEROID && (wkt.ellps = wkt.GEOGCS.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"),
                "international" === wkt.ellps.toLowerCase().slice(0, 13) && (wkt.ellps = "intl"),
                wkt.a = wkt.GEOGCS.DATUM.SPHEROID.a,
                wkt.rf = parseFloat(wkt.GEOGCS.DATUM.SPHEROID.rf, 10)),
                ~wkt.datumCode.indexOf("osgb_1936") && (wkt.datumCode = "osgb36")),
                wkt.b && !isFinite(wkt.b) && (wkt.b = wkt.a);
                var renamer = function(a) {
                    return rename(wkt, a)
                }
                  , list = [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", d2r], ["longitude_of_center", "Longitude_Of_Center"], ["longc", "longitude_of_center", d2r], ["x0", "false_easting", toMeter], ["y0", "false_northing", toMeter], ["long0", "central_meridian", d2r], ["lat0", "latitude_of_origin", d2r], ["lat0", "standard_parallel_1", d2r], ["lat1", "standard_parallel_1", d2r], ["lat2", "standard_parallel_2", d2r], ["alpha", "azimuth", d2r], ["srsCode", "name"]];
                list.forEach(renamer),
                wkt.long0 || !wkt.longc || "Albers_Conic_Equal_Area" !== wkt.PROJECTION && "Lambert_Azimuthal_Equal_Area" !== wkt.PROJECTION || (wkt.long0 = wkt.longc)
            }
            var D2R = .017453292519943295
              , extend = _dereq_("./extend");
            module.exports = function(wkt, self) {
                var lisp = JSON.parse(("," + wkt).replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",').slice(1).replace(/\s*\,\s*([A-Z_0-9]+?)\]/g, ',"$1"]'))
                  , type = lisp.shift()
                  , name = lisp.shift();
                lisp.unshift(["name", name]),
                lisp.unshift(["type", type]),
                lisp.unshift("output");
                var obj = {};
                return sExpr(lisp, obj),
                cleanWKT(obj.output),
                extend(self, obj.output)
            }
        }
        , {
            "./extend": 33
        }],
        66: [function(_dereq_, module, exports) {
            function degToRad(deg) {
                return deg * (Math.PI / 180)
            }
            function radToDeg(rad) {
                return 180 * (rad / Math.PI)
            }
            function LLtoUTM(ll) {
                var LongOrigin, eccPrimeSquared, N, T, C, A, M, LongOriginRad, ZoneNumber, Lat = ll.lat, Long = ll.lon, a = 6378137, eccSquared = .00669438, k0 = .9996, LatRad = degToRad(Lat), LongRad = degToRad(Long);
                ZoneNumber = Math.floor((Long + 180) / 6) + 1,
                180 === Long && (ZoneNumber = 60),
                Lat >= 56 && 64 > Lat && Long >= 3 && 12 > Long && (ZoneNumber = 32),
                Lat >= 72 && 84 > Lat && (Long >= 0 && 9 > Long ? ZoneNumber = 31 : Long >= 9 && 21 > Long ? ZoneNumber = 33 : Long >= 21 && 33 > Long ? ZoneNumber = 35 : Long >= 33 && 42 > Long && (ZoneNumber = 37)),
                LongOrigin = 6 * (ZoneNumber - 1) - 180 + 3,
                LongOriginRad = degToRad(LongOrigin),
                eccPrimeSquared = eccSquared / (1 - eccSquared),
                N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad)),
                T = Math.tan(LatRad) * Math.tan(LatRad),
                C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad),
                A = Math.cos(LatRad) * (LongRad - LongOriginRad),
                M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
                var UTMEasting = k0 * N * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120) + 5e5
                  , UTMNorthing = k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720));
                return 0 > Lat && (UTMNorthing += 1e7),
                {
                    northing: Math.round(UTMNorthing),
                    easting: Math.round(UTMEasting),
                    zoneNumber: ZoneNumber,
                    zoneLetter: getLetterDesignator(Lat)
                }
            }
            function UTMtoLL(utm) {
                var UTMNorthing = utm.northing
                  , UTMEasting = utm.easting
                  , zoneLetter = utm.zoneLetter
                  , zoneNumber = utm.zoneNumber;
                if (0 > zoneNumber || zoneNumber > 60)
                    return null ;
                var eccPrimeSquared, N1, T1, C1, R1, D, M, LongOrigin, mu, phi1Rad, k0 = .9996, a = 6378137, eccSquared = .00669438, e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared)), x = UTMEasting - 5e5, y = UTMNorthing;
                "N" > zoneLetter && (y -= 1e7),
                LongOrigin = 6 * (zoneNumber - 1) - 180 + 3,
                eccPrimeSquared = eccSquared / (1 - eccSquared),
                M = y / k0,
                mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256)),
                phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu),
                N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad)),
                T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad),
                C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad),
                R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5),
                D = x / (N1 * k0);
                var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
                lat = radToDeg(lat);
                var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
                lon = LongOrigin + radToDeg(lon);
                var result;
                if (utm.accuracy) {
                    var topRight = UTMtoLL({
                        northing: utm.northing + utm.accuracy,
                        easting: utm.easting + utm.accuracy,
                        zoneLetter: utm.zoneLetter,
                        zoneNumber: utm.zoneNumber
                    });
                    result = {
                        top: topRight.lat,
                        right: topRight.lon,
                        bottom: lat,
                        left: lon
                    }
                } else
                    result = {
                        lat: lat,
                        lon: lon
                    };
                return result
            }
            function getLetterDesignator(lat) {
                var LetterDesignator = "Z";
                return 84 >= lat && lat >= 72 ? LetterDesignator = "X" : 72 > lat && lat >= 64 ? LetterDesignator = "W" : 64 > lat && lat >= 56 ? LetterDesignator = "V" : 56 > lat && lat >= 48 ? LetterDesignator = "U" : 48 > lat && lat >= 40 ? LetterDesignator = "T" : 40 > lat && lat >= 32 ? LetterDesignator = "S" : 32 > lat && lat >= 24 ? LetterDesignator = "R" : 24 > lat && lat >= 16 ? LetterDesignator = "Q" : 16 > lat && lat >= 8 ? LetterDesignator = "P" : 8 > lat && lat >= 0 ? LetterDesignator = "N" : 0 > lat && lat >= -8 ? LetterDesignator = "M" : -8 > lat && lat >= -16 ? LetterDesignator = "L" : -16 > lat && lat >= -24 ? LetterDesignator = "K" : -24 > lat && lat >= -32 ? LetterDesignator = "J" : -32 > lat && lat >= -40 ? LetterDesignator = "H" : -40 > lat && lat >= -48 ? LetterDesignator = "G" : -48 > lat && lat >= -56 ? LetterDesignator = "F" : -56 > lat && lat >= -64 ? LetterDesignator = "E" : -64 > lat && lat >= -72 ? LetterDesignator = "D" : -72 > lat && lat >= -80 && (LetterDesignator = "C"),
                LetterDesignator
            }
            function encode(utm, accuracy) {
                var seasting = "" + utm.easting
                  , snorthing = "" + utm.northing;
                return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy)
            }
            function get100kID(easting, northing, zoneNumber) {
                var setParm = get100kSetForZone(zoneNumber)
                  , setColumn = Math.floor(easting / 1e5)
                  , setRow = Math.floor(northing / 1e5) % 20;
                return getLetter100kID(setColumn, setRow, setParm)
            }
            function get100kSetForZone(i) {
                var setParm = i % NUM_100K_SETS;
                return 0 === setParm && (setParm = NUM_100K_SETS),
                setParm
            }
            function getLetter100kID(column, row, parm) {
                var index = parm - 1
                  , colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index)
                  , rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index)
                  , colInt = colOrigin + column - 1
                  , rowInt = rowOrigin + row
                  , rollover = !1;
                colInt > Z && (colInt = colInt - Z + A - 1,
                rollover = !0),
                (colInt === I || I > colOrigin && colInt > I || (colInt > I || I > colOrigin) && rollover) && colInt++,
                (colInt === O || O > colOrigin && colInt > O || (colInt > O || O > colOrigin) && rollover) && (colInt++,
                colInt === I && colInt++),
                colInt > Z && (colInt = colInt - Z + A - 1),
                rowInt > V ? (rowInt = rowInt - V + A - 1,
                rollover = !0) : rollover = !1,
                (rowInt === I || I > rowOrigin && rowInt > I || (rowInt > I || I > rowOrigin) && rollover) && rowInt++,
                (rowInt === O || O > rowOrigin && rowInt > O || (rowInt > O || O > rowOrigin) && rollover) && (rowInt++,
                rowInt === I && rowInt++),
                rowInt > V && (rowInt = rowInt - V + A - 1);
                var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
                return twoLetter
            }
            function decode(mgrsString) {
                if (mgrsString && 0 === mgrsString.length)
                    throw "MGRSPoint coverting from nothing";
                for (var testChar, length = mgrsString.length, hunK = null , sb = "", i = 0; !/[A-Z]/.test(testChar = mgrsString.charAt(i)); ) {
                    if (i >= 2)
                        throw "MGRSPoint bad conversion from: " + mgrsString;
                    sb += testChar,
                    i++
                }
                var zoneNumber = parseInt(sb, 10);
                if (0 === i || i + 3 > length)
                    throw "MGRSPoint bad conversion from: " + mgrsString;
                var zoneLetter = mgrsString.charAt(i++);
                if ("A" >= zoneLetter || "B" === zoneLetter || "Y" === zoneLetter || zoneLetter >= "Z" || "I" === zoneLetter || "O" === zoneLetter)
                    throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
                hunK = mgrsString.substring(i, i += 2);
                for (var set = get100kSetForZone(zoneNumber), east100k = getEastingFromChar(hunK.charAt(0), set), north100k = getNorthingFromChar(hunK.charAt(1), set); north100k < getMinNorthing(zoneLetter); )
                    north100k += 2e6;
                var remainder = length - i;
                if (remainder % 2 !== 0)
                    throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
                var accuracyBonus, sepEastingString, sepNorthingString, easting, northing, sep = remainder / 2, sepEasting = 0, sepNorthing = 0;
                return sep > 0 && (accuracyBonus = 1e5 / Math.pow(10, sep),
                sepEastingString = mgrsString.substring(i, i + sep),
                sepEasting = parseFloat(sepEastingString) * accuracyBonus,
                sepNorthingString = mgrsString.substring(i + sep),
                sepNorthing = parseFloat(sepNorthingString) * accuracyBonus),
                easting = sepEasting + east100k,
                northing = sepNorthing + north100k,
                {
                    easting: easting,
                    northing: northing,
                    zoneLetter: zoneLetter,
                    zoneNumber: zoneNumber,
                    accuracy: accuracyBonus
                }
            }
            function getEastingFromChar(e, set) {
                for (var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1), eastingValue = 1e5, rewindMarker = !1; curCol !== e.charCodeAt(0); ) {
                    if (curCol++,
                    curCol === I && curCol++,
                    curCol === O && curCol++,
                    curCol > Z) {
                        if (rewindMarker)
                            throw "Bad character: " + e;
                        curCol = A,
                        rewindMarker = !0
                    }
                    eastingValue += 1e5
                }
                return eastingValue
            }
            function getNorthingFromChar(n, set) {
                if (n > "V")
                    throw "MGRSPoint given invalid Northing " + n;
                for (var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1), northingValue = 0, rewindMarker = !1; curRow !== n.charCodeAt(0); ) {
                    if (curRow++,
                    curRow === I && curRow++,
                    curRow === O && curRow++,
                    curRow > V) {
                        if (rewindMarker)
                            throw "Bad character: " + n;
                        curRow = A,
                        rewindMarker = !0
                    }
                    northingValue += 1e5
                }
                return northingValue
            }
            function getMinNorthing(zoneLetter) {
                var northing;
                switch (zoneLetter) {
                case "C":
                    northing = 11e5;
                    break;
                case "D":
                    northing = 2e6;
                    break;
                case "E":
                    northing = 28e5;
                    break;
                case "F":
                    northing = 37e5;
                    break;
                case "G":
                    northing = 46e5;
                    break;
                case "H":
                    northing = 55e5;
                    break;
                case "J":
                    northing = 64e5;
                    break;
                case "K":
                    northing = 73e5;
                    break;
                case "L":
                    northing = 82e5;
                    break;
                case "M":
                    northing = 91e5;
                    break;
                case "N":
                    northing = 0;
                    break;
                case "P":
                    northing = 8e5;
                    break;
                case "Q":
                    northing = 17e5;
                    break;
                case "R":
                    northing = 26e5;
                    break;
                case "S":
                    northing = 35e5;
                    break;
                case "T":
                    northing = 44e5;
                    break;
                case "U":
                    northing = 53e5;
                    break;
                case "V":
                    northing = 62e5;
                    break;
                case "W":
                    northing = 7e6;
                    break;
                case "X":
                    northing = 79e5;
                    break;
                default:
                    northing = -1
                }
                if (northing >= 0)
                    return northing;
                throw "Invalid zone letter: " + zoneLetter
            }
            var NUM_100K_SETS = 6
              , SET_ORIGIN_COLUMN_LETTERS = "AJSAJS"
              , SET_ORIGIN_ROW_LETTERS = "AFAFAF"
              , A = 65
              , I = 73
              , O = 79
              , V = 86
              , Z = 90;
            exports.forward = function(ll, accuracy) {
                return accuracy = accuracy || 5,
                encode(LLtoUTM({
                    lat: ll[1],
                    lon: ll[0]
                }), accuracy)
            }
            ,
            exports.inverse = function(mgrs) {
                var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
                return [bbox.left, bbox.bottom, bbox.right, bbox.top]
            }
            ,
            exports.toPoint = function(mgrsStr) {
                var llbbox = exports.inverse(mgrsStr);
                return [(llbbox[2] + llbbox[0]) / 2, (llbbox[3] + llbbox[1]) / 2]
            }
        }
        , {}],
        67: [function(_dereq_, module, exports) {
            module.exports = {
                name: "proj4",
                version: "2.2.1",
                description: "Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",
                main: "lib/index.js",
                directories: {
                    test: "test",
                    doc: "docs"
                },
                scripts: {
                    test: "./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"
                },
                repository: {
                    type: "git",
                    url: "git://github.com/proj4js/proj4js.git"
                },
                author: "",
                license: "MIT",
                jam: {
                    main: "dist/proj4.js",
                    include: ["dist/proj4.js", "README.md", "AUTHORS", "LICENSE.md"]
                },
                devDependencies: {
                    "grunt-cli": "~0.1.13",
                    grunt: "~0.4.2",
                    "grunt-contrib-connect": "~0.6.0",
                    "grunt-contrib-jshint": "~0.8.0",
                    chai: "~1.8.1",
                    mocha: "~1.17.1",
                    "grunt-mocha-phantomjs": "~0.4.0",
                    browserify: "~3.24.5",
                    "grunt-browserify": "~1.3.0",
                    "grunt-contrib-uglify": "~0.3.2",
                    curl: "git://github.com/cujojs/curl.git",
                    istanbul: "~0.2.4",
                    tin: "~0.4.0"
                },
                dependencies: {
                    mgrs: "0.0.0"
                }
            }
        }
        , {}],
        "./includedProjections": [function(_dereq_, module, exports) {
            module.exports = _dereq_("gWUPNW")
        }
        , {}],
        gWUPNW: [function(_dereq_, module, exports) {
            var projs = [_dereq_("./lib/projections/tmerc"), _dereq_("./lib/projections/utm"), _dereq_("./lib/projections/sterea"), _dereq_("./lib/projections/stere"), _dereq_("./lib/projections/somerc"), _dereq_("./lib/projections/omerc"), _dereq_("./lib/projections/lcc"), _dereq_("./lib/projections/krovak"), _dereq_("./lib/projections/cass"), _dereq_("./lib/projections/laea"), _dereq_("./lib/projections/aea"), _dereq_("./lib/projections/gnom"), _dereq_("./lib/projections/cea"), _dereq_("./lib/projections/eqc"), _dereq_("./lib/projections/poly"), _dereq_("./lib/projections/nzmg"), _dereq_("./lib/projections/mill"), _dereq_("./lib/projections/sinu"), _dereq_("./lib/projections/moll"), _dereq_("./lib/projections/eqdc"), _dereq_("./lib/projections/vandg"), _dereq_("./lib/projections/aeqd")];
            module.exports = function(proj4) {
                projs.forEach(function(proj) {
                    proj4.Proj.projections.add(proj)
                }
                )
            }
        }
        , {
            "./lib/projections/aea": 39,
            "./lib/projections/aeqd": 40,
            "./lib/projections/cass": 41,
            "./lib/projections/cea": 42,
            "./lib/projections/eqc": 43,
            "./lib/projections/eqdc": 44,
            "./lib/projections/gnom": 46,
            "./lib/projections/krovak": 47,
            "./lib/projections/laea": 48,
            "./lib/projections/lcc": 49,
            "./lib/projections/mill": 52,
            "./lib/projections/moll": 53,
            "./lib/projections/nzmg": 54,
            "./lib/projections/omerc": 55,
            "./lib/projections/poly": 56,
            "./lib/projections/sinu": 57,
            "./lib/projections/somerc": 58,
            "./lib/projections/stere": 59,
            "./lib/projections/sterea": 60,
            "./lib/projections/tmerc": 61,
            "./lib/projections/utm": 62,
            "./lib/projections/vandg": 63
        }]
    }, {}, [35])(35)
}
),
d3 = function() {
    function d3_number(x) {
        return null  != x && !isNaN(x)
    }
    function d3_zipLength(d) {
        return d.length
    }
    function d3_range_integerScale(x) {
        for (var k = 1; x * k % 1; )
            k *= 10;
        return k
    }
    function d3_class(ctor, properties) {
        try {
            for (var key in properties)
                Object.defineProperty(ctor.prototype, key, {
                    value: properties[key],
                    enumerable: !1
                })
        } catch (e) {
            ctor.prototype = properties
        }
    }
    function d3_Map() {}
    function d3_Set() {}
    function d3_rebind(target, source, method) {
        return function() {
            var value = method.apply(source, arguments);
            return value === source ? target : value
        }
    }
    function d3_vendorSymbol(object, name) {
        if (name in object)
            return name;
        name = name.charAt(0).toUpperCase() + name.substring(1);
        for (var i = 0, n = d3_vendorPrefixes.length; n > i; ++i) {
            var prefixName = d3_vendorPrefixes[i] + name;
            if (prefixName in object)
                return prefixName
        }
    }
    function d3_noop() {}
    function d3_dispatch() {}
    function d3_dispatch_event(dispatch) {
        function event() {
            for (var l, z = listeners, i = -1, n = z.length; ++i < n; )
                (l = z[i].on) && l.apply(this, arguments);
            return dispatch
        }
        var listeners = []
          , listenerByName = new d3_Map;
        return event.on = function(name, listener) {
            var i, l = listenerByName.get(name);
            return arguments.length < 2 ? l && l.on : (l && (l.on = null ,
            listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1)),
            listenerByName.remove(name)),
            listener && listeners.push(listenerByName.set(name, {
                on: listener
            })),
            dispatch)
        }
        ,
        event
    }
    function d3_eventPreventDefault() {
        d3.event.preventDefault()
    }
    function d3_eventSource() {
        for (var s, e = d3.event; s = e.sourceEvent; )
            e = s;
        return e
    }
    function d3_eventDispatch(target) {
        for (var dispatch = new d3_dispatch, i = 0, n = arguments.length; ++i < n; )
            dispatch[arguments[i]] = d3_dispatch_event(dispatch);
        return dispatch.of = function(thiz, argumentz) {
            return function(e1) {
                try {
                    var e0 = e1.sourceEvent = d3.event;
                    e1.target = target,
                    d3.event = e1,
                    dispatch[e1.type].apply(thiz, argumentz)
                } finally {
                    d3.event = e0
                }
            }
        }
        ,
        dispatch
    }
    function d3_selection(groups) {
        return d3_subclass(groups, d3_selectionPrototype),
        groups
    }
    function d3_selection_selector(selector) {
        return "function" == typeof selector ? selector : function() {
            return d3_select(selector, this)
        }
    }
    function d3_selection_selectorAll(selector) {
        return "function" == typeof selector ? selector : function() {
            return d3_selectAll(selector, this)
        }
    }
    function d3_selection_attr(name, value) {
        function attrNull() {
            this.removeAttribute(name)
        }
        function attrNullNS() {
            this.removeAttributeNS(name.space, name.local)
        }
        function attrConstant() {
            this.setAttribute(name, value)
        }
        function attrConstantNS() {
            this.setAttributeNS(name.space, name.local, value)
        }
        function attrFunction() {
            var x = value.apply(this, arguments);
            null  == x ? this.removeAttribute(name) : this.setAttribute(name, x)
        }
        function attrFunctionNS() {
            var x = value.apply(this, arguments);
            null  == x ? this.removeAttributeNS(name.space, name.local) : this.setAttributeNS(name.space, name.local, x)
        }
        return name = d3.ns.qualify(name),
        null  == value ? name.local ? attrNullNS : attrNull : "function" == typeof value ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant
    }
    function d3_collapse(s) {
        return s.trim().replace(/\s+/g, " ")
    }
    function d3_selection_classedRe(name) {
        return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)","g")
    }
    function d3_selection_classes(name) {
        return name.trim().split(/^|\s+/)
    }
    function d3_selection_classed(name, value) {
        function classedConstant() {
            for (var i = -1; ++i < n; )
                name[i](this, value)
        }
        function classedFunction() {
            for (var i = -1, x = value.apply(this, arguments); ++i < n; )
                name[i](this, x)
        }
        name = d3_selection_classes(name).map(d3_selection_classedName);
        var n = name.length;
        return "function" == typeof value ? classedFunction : classedConstant
    }
    function d3_selection_classedName(name) {
        var re = d3_selection_classedRe(name);
        return function(node, value) {
            if (c = node.classList)
                return value ? c.add(name) : c.remove(name);
            var c = node.getAttribute("class") || "";
            value ? (re.lastIndex = 0,
            re.test(c) || node.setAttribute("class", d3_collapse(c + " " + name))) : node.setAttribute("class", d3_collapse(c.replace(re, " ")))
        }
    }
    function d3_selection_style(name, value, priority) {
        function styleNull() {
            this.style.removeProperty(name)
        }
        function styleConstant() {
            this.style.setProperty(name, value, priority)
        }
        function styleFunction() {
            var x = value.apply(this, arguments);
            null  == x ? this.style.removeProperty(name) : this.style.setProperty(name, x, priority)
        }
        return null  == value ? styleNull : "function" == typeof value ? styleFunction : styleConstant;
    }
    function d3_selection_property(name, value) {
        function propertyNull() {
            delete this[name]
        }
        function propertyConstant() {
            this[name] = value
        }
        function propertyFunction() {
            var x = value.apply(this, arguments);
            null  == x ? delete this[name] : this[name] = x
        }
        return null  == value ? propertyNull : "function" == typeof value ? propertyFunction : propertyConstant
    }
    function d3_selection_creator(name) {
        return "function" == typeof name ? name : (name = d3.ns.qualify(name)).local ? function() {
            return this.ownerDocument.createElementNS(name.space, name.local)
        }
         : function() {
            return this.ownerDocument.createElementNS(this.namespaceURI, name)
        }
    }
    function d3_selection_dataNode(data) {
        return {
            __data__: data
        }
    }
    function d3_selection_filter(selector) {
        return function() {
            return d3_selectMatches(this, selector)
        }
    }
    function d3_selection_sortComparator(comparator) {
        return arguments.length || (comparator = d3.ascending),
        function(a, b) {
            return a && b ? comparator(a.__data__, b.__data__) : !a - !b
        }
    }
    function d3_selection_each(groups, callback) {
        for (var j = 0, m = groups.length; m > j; j++)
            for (var node, group = groups[j], i = 0, n = group.length; n > i; i++)
                (node = group[i]) && callback(node, i, j);
        return groups
    }
    function d3_selection_enter(selection) {
        return d3_subclass(selection, d3_selection_enterPrototype),
        selection
    }
    function d3_selection_enterInsertBefore(enter) {
        var i0, j0;
        return function(d, i, j) {
            var node, group = enter[j].update, n = group.length;
            for (j != j0 && (j0 = j,
            i0 = 0),
            i >= i0 && (i0 = i + 1); !(node = group[i0]) && ++i0 < n; )
                ;
            return node
        }
    }
    function d3_selection_interrupt() {
        var lock = this.__transition__;
        lock && ++lock.active
    }
    function d3_selection_on(type, listener, capture) {
        function onRemove() {
            var l = this[name];
            l && (this.removeEventListener(type, l, l.$),
            delete this[name])
        }
        function onAdd() {
            var l = wrap(listener, d3_array(arguments));
            onRemove.call(this),
            this.addEventListener(type, this[name] = l, l.$ = capture),
            l._ = listener
        }
        function removeAll() {
            var match, re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$");
            for (var name in this)
                if (match = name.match(re)) {
                    var l = this[name];
                    this.removeEventListener(match[1], l, l.$),
                    delete this[name]
                }
        }
        var name = "__on" + type
          , i = type.indexOf(".")
          , wrap = d3_selection_onListener;
        i > 0 && (type = type.substring(0, i));
        var filter = d3_selection_onFilters.get(type);
        return filter && (type = filter,
        wrap = d3_selection_onFilter),
        i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll
    }
    function d3_selection_onListener(listener, argumentz) {
        return function(e) {
            var o = d3.event;
            d3.event = e,
            argumentz[0] = this.__data__;
            try {
                listener.apply(this, argumentz)
            } finally {
                d3.event = o
            }
        }
    }
    function d3_selection_onFilter(listener, argumentz) {
        var l = d3_selection_onListener(listener, argumentz);
        return function(e) {
            var target = this
              , related = e.relatedTarget;
            related && (related === target || 8 & related.compareDocumentPosition(target)) || l.call(target, e)
        }
    }
    function d3_event_dragSuppress() {
        var name = ".dragsuppress-" + ++d3_event_dragId
          , click = "click" + name
          , w = d3.select(d3_window).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
        if (d3_event_dragSelect) {
            var style = d3_documentElement.style
              , select = style[d3_event_dragSelect];
            style[d3_event_dragSelect] = "none"
        }
        return function(suppressClick) {
            function off() {
                w.on(click, null )
            }
            w.on(name, null ),
            d3_event_dragSelect && (style[d3_event_dragSelect] = select),
            suppressClick && (w.on(click, function() {
                d3_eventPreventDefault(),
                off()
            }
            , !0),
            setTimeout(off, 0))
        }
    }
    function d3_mousePoint(container, e) {
        e.changedTouches && (e = e.changedTouches[0]);
        var svg = container.ownerSVGElement || container;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            if (0 > d3_mouse_bug44083 && (d3_window.scrollX || d3_window.scrollY)) {
                svg = d3.select("body").append("svg").style({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
                    border: "none"
                }, "important");
                var ctm = svg[0][0].getScreenCTM();
                d3_mouse_bug44083 = !(ctm.f || ctm.e),
                svg.remove()
            }
            return d3_mouse_bug44083 ? (point.x = e.pageX,
            point.y = e.pageY) : (point.x = e.clientX,
            point.y = e.clientY),
            point = point.matrixTransform(container.getScreenCTM().inverse()),
            [point.x, point.y]
        }
        var rect = container.getBoundingClientRect();
        return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop]
    }
    function d3_sgn(x) {
        return x > 0 ? 1 : 0 > x ? -1 : 0
    }
    function d3_acos(x) {
        return x > 1 ? 0 : -1 > x ? π : Math.acos(x)
    }
    function d3_asin(x) {
        return x > 1 ? halfπ : -1 > x ? -halfπ : Math.asin(x)
    }
    function d3_sinh(x) {
        return ((x = Math.exp(x)) - 1 / x) / 2
    }
    function d3_cosh(x) {
        return ((x = Math.exp(x)) + 1 / x) / 2
    }
    function d3_tanh(x) {
        return ((x = Math.exp(2 * x)) - 1) / (x + 1)
    }
    function d3_haversin(x) {
        return (x = Math.sin(x / 2)) * x
    }
    function d3_Color() {}
    function d3_hsl(h, s, l) {
        return new d3_Hsl(h,s,l)
    }
    function d3_Hsl(h, s, l) {
        this.h = h,
        this.s = s,
        this.l = l
    }
    function d3_hsl_rgb(h, s, l) {
        function v(h) {
            return h > 360 ? h -= 360 : 0 > h && (h += 360),
            60 > h ? m1 + (m2 - m1) * h / 60 : 180 > h ? m2 : 240 > h ? m1 + (m2 - m1) * (240 - h) / 60 : m1
        }
        function vv(h) {
            return Math.round(255 * v(h))
        }
        var m1, m2;
        return h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h,
        s = isNaN(s) ? 0 : 0 > s ? 0 : s > 1 ? 1 : s,
        l = 0 > l ? 0 : l > 1 ? 1 : l,
        m2 = .5 >= l ? l * (1 + s) : l + s - l * s,
        m1 = 2 * l - m2,
        d3_rgb(vv(h + 120), vv(h), vv(h - 120))
    }
    function d3_hcl(h, c, l) {
        return new d3_Hcl(h,c,l)
    }
    function d3_Hcl(h, c, l) {
        this.h = h,
        this.c = c,
        this.l = l
    }
    function d3_hcl_lab(h, c, l) {
        return isNaN(h) && (h = 0),
        isNaN(c) && (c = 0),
        d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c)
    }
    function d3_lab(l, a, b) {
        return new d3_Lab(l,a,b)
    }
    function d3_Lab(l, a, b) {
        this.l = l,
        this.a = a,
        this.b = b
    }
    function d3_lab_rgb(l, a, b) {
        var y = (l + 16) / 116
          , x = y + a / 500
          , z = y - b / 200;
        return x = d3_lab_xyz(x) * d3_lab_X,
        y = d3_lab_xyz(y) * d3_lab_Y,
        z = d3_lab_xyz(z) * d3_lab_Z,
        d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z))
    }
    function d3_lab_hcl(l, a, b) {
        return l > 0 ? d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : d3_hcl(NaN, NaN, l)
    }
    function d3_lab_xyz(x) {
        return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037
    }
    function d3_xyz_lab(x) {
        return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29
    }
    function d3_xyz_rgb(r) {
        return Math.round(255 * (.00304 >= r ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055))
    }
    function d3_rgbNumber(value) {
        return d3_rgb(value >> 16, value >> 8 & 255, 255 & value)
    }
    function d3_rgbString(value) {
        return d3_rgbNumber(value) + ""
    }
    function d3_rgb(r, g, b) {
        return new d3_Rgb(r,g,b)
    }
    function d3_Rgb(r, g, b) {
        this.r = r,
        this.g = g,
        this.b = b
    }
    function d3_rgb_hex(v) {
        return 16 > v ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16)
    }
    function d3_rgb_parse(format, rgb, hsl) {
        var m1, m2, name, r = 0, g = 0, b = 0;
        if (m1 = /([a-z]+)\((.*)\)/i.exec(format))
            switch (m2 = m1[2].split(","),
            m1[1]) {
            case "hsl":
                return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
            case "rgb":
                return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]))
            }
        return (name = d3_rgb_names.get(format)) ? rgb(name.r, name.g, name.b) : (null  != format && "#" === format.charAt(0) && (4 === format.length ? (r = format.charAt(1),
        r += r,
        g = format.charAt(2),
        g += g,
        b = format.charAt(3),
        b += b) : 7 === format.length && (r = format.substring(1, 3),
        g = format.substring(3, 5),
        b = format.substring(5, 7)),
        r = parseInt(r, 16),
        g = parseInt(g, 16),
        b = parseInt(b, 16)),
        rgb(r, g, b))
    }
    function d3_rgb_hsl(r, g, b) {
        var h, s, min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, l = (max + min) / 2;
        return d ? (s = .5 > l ? d / (max + min) : d / (2 - max - min),
        h = r == max ? (g - b) / d + (b > g ? 6 : 0) : g == max ? (b - r) / d + 2 : (r - g) / d + 4,
        h *= 60) : (h = NaN,
        s = l > 0 && 1 > l ? 0 : h),
        d3_hsl(h, s, l)
    }
    function d3_rgb_lab(r, g, b) {
        r = d3_rgb_xyz(r),
        g = d3_rgb_xyz(g),
        b = d3_rgb_xyz(b);
        var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X)
          , y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y)
          , z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
        return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z))
    }
    function d3_rgb_xyz(r) {
        return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)
    }
    function d3_rgb_parseNumber(c) {
        var f = parseFloat(c);
        return "%" === c.charAt(c.length - 1) ? Math.round(2.55 * f) : f
    }
    function d3_functor(v) {
        return "function" == typeof v ? v : function() {
            return v
        }
    }
    function d3_identity(d) {
        return d
    }
    function d3_xhrType(response) {
        return function(url, mimeType, callback) {
            return 2 === arguments.length && "function" == typeof mimeType && (callback = mimeType,
            mimeType = null ),
            d3_xhr(url, mimeType, response, callback)
        }
    }
    function d3_xhr(url, mimeType, response, callback) {
        function respond() {
            var result, status = request.status;
            if (!status && request.responseText || status >= 200 && 300 > status || 304 === status) {
                try {
                    result = response.call(xhr, request)
                } catch (e) {
                    return void dispatch.error.call(xhr, e)
                }
                dispatch.load.call(xhr, result)
            } else
                dispatch.error.call(xhr, request)
        }
        var xhr = {}
          , dispatch = d3.dispatch("beforesend", "progress", "load", "error")
          , headers = {}
          , request = new XMLHttpRequest
          , responseType = null ;
        return !d3_window.XDomainRequest || "withCredentials" in request || !/^(http(s)?:)?\/\//.test(url) || (request = new XDomainRequest),
        "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
            request.readyState > 3 && respond()
        }
        ,
        request.onprogress = function(event) {
            var o = d3.event;
            d3.event = event;
            try {
                dispatch.progress.call(xhr, request)
            } finally {
                d3.event = o
            }
        }
        ,
        xhr.header = function(name, value) {
            return name = (name + "").toLowerCase(),
            arguments.length < 2 ? headers[name] : (null  == value ? delete headers[name] : headers[name] = value + "",
            xhr)
        }
        ,
        xhr.mimeType = function(value) {
            return arguments.length ? (mimeType = null  == value ? null  : value + "",
            xhr) : mimeType
        }
        ,
        xhr.responseType = function(value) {
            return arguments.length ? (responseType = value,
            xhr) : responseType
        }
        ,
        xhr.response = function(value) {
            return response = value,
            xhr
        }
        ,
        ["get", "post"].forEach(function(method) {
            xhr[method] = function() {
                return xhr.send.apply(xhr, [method].concat(d3_array(arguments)))
            }
        }
        ),
        xhr.send = function(method, data, callback) {
            if (2 === arguments.length && "function" == typeof data && (callback = data,
            data = null ),
            request.open(method, url, !0),
            null  == mimeType || "accept" in headers || (headers.accept = mimeType + ",*/*"),
            request.setRequestHeader)
                for (var name in headers)
                    request.setRequestHeader(name, headers[name]);
            return null  != mimeType && request.overrideMimeType && request.overrideMimeType(mimeType),
            null  != responseType && (request.responseType = responseType),
            null  != callback && xhr.on("error", callback).on("load", function(request) {
                callback(null , request)
            }
            ),
            dispatch.beforesend.call(xhr, request),
            request.send(null  == data ? null  : data),
            xhr
        }
        ,
        xhr.abort = function() {
            return request.abort(),
            xhr
        }
        ,
        d3.rebind(xhr, dispatch, "on"),
        null  == callback ? xhr : xhr.get(d3_xhr_fixCallback(callback))
    }
    function d3_xhr_fixCallback(callback) {
        return 1 === callback.length ? function(error, request) {
            callback(null  == error ? request : null )
        }
         : callback
    }
    function d3_timer_step() {
        var now = d3_timer_mark()
          , delay = d3_timer_sweep() - now;
        delay > 24 ? (isFinite(delay) && (clearTimeout(d3_timer_timeout),
        d3_timer_timeout = setTimeout(d3_timer_step, delay)),
        d3_timer_interval = 0) : (d3_timer_interval = 1,
        d3_timer_frame(d3_timer_step))
    }
    function d3_timer_mark() {
        var now = Date.now();
        for (d3_timer_active = d3_timer_queueHead; d3_timer_active; )
            now >= d3_timer_active.t && (d3_timer_active.f = d3_timer_active.c(now - d3_timer_active.t)),
            d3_timer_active = d3_timer_active.n;
        return now
    }
    function d3_timer_sweep() {
        for (var t0, t1 = d3_timer_queueHead, time = 1 / 0; t1; )
            t1.f ? t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n : (t1.t < time && (time = t1.t),
            t1 = (t0 = t1).n);
        return d3_timer_queueTail = t0,
        time
    }
    function d3_formatPrefix(d, i) {
        var k = Math.pow(10, 3 * abs(8 - i));
        return {
            scale: i > 8 ? function(d) {
                return d / k
            }
             : function(d) {
                return d * k
            }
            ,
            symbol: d
        }
    }
    function d3_format_precision(x, p) {
        return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1)
    }
    function d3_format_typeDefault(x) {
        return x + ""
    }
    function d3_adder() {}
    function d3_adderSum(a, b, o) {
        var x = o.s = a + b
          , bv = x - a
          , av = x - bv;
        o.t = a - av + (b - bv)
    }
    function d3_geo_streamGeometry(geometry, listener) {
        geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type) && d3_geo_streamGeometryType[geometry.type](geometry, listener)
    }
    function d3_geo_streamLine(coordinates, listener, closed) {
        var coordinate, i = -1, n = coordinates.length - closed;
        for (listener.lineStart(); ++i < n; )
            coordinate = coordinates[i],
            listener.point(coordinate[0], coordinate[1], coordinate[2]);
        listener.lineEnd()
    }
    function d3_geo_streamPolygon(coordinates, listener) {
        var i = -1
          , n = coordinates.length;
        for (listener.polygonStart(); ++i < n; )
            d3_geo_streamLine(coordinates[i], listener, 1);
        listener.polygonEnd()
    }
    function d3_geo_areaRingStart() {
        function nextPoint(λ, φ) {
            λ *= d3_radians,
            φ = φ * d3_radians / 2 + π / 4;
            var dλ = λ - λ0
              , cosφ = Math.cos(φ)
              , sinφ = Math.sin(φ)
              , k = sinφ0 * sinφ
              , u = cosφ0 * cosφ + k * Math.cos(dλ)
              , v = k * Math.sin(dλ);
            d3_geo_areaRingSum.add(Math.atan2(v, u)),
            λ0 = λ,
            cosφ0 = cosφ,
            sinφ0 = sinφ
        }
        var λ00, φ00, λ0, cosφ0, sinφ0;
        d3_geo_area.point = function(λ, φ) {
            d3_geo_area.point = nextPoint,
            λ0 = (λ00 = λ) * d3_radians,
            cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4),
            sinφ0 = Math.sin(φ)
        }
        ,
        d3_geo_area.lineEnd = function() {
            nextPoint(λ00, φ00)
        }
    }
    function d3_geo_cartesian(spherical) {
        var λ = spherical[0]
          , φ = spherical[1]
          , cosφ = Math.cos(φ);
        return [cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ)]
    }
    function d3_geo_cartesianDot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    }
    function d3_geo_cartesianCross(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
    }
    function d3_geo_cartesianAdd(a, b) {
        a[0] += b[0],
        a[1] += b[1],
        a[2] += b[2]
    }
    function d3_geo_cartesianScale(vector, k) {
        return [vector[0] * k, vector[1] * k, vector[2] * k]
    }
    function d3_geo_cartesianNormalize(d) {
        var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
        d[0] /= l,
        d[1] /= l,
        d[2] /= l
    }
    function d3_geo_spherical(cartesian) {
        return [Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2])]
    }
    function d3_geo_sphericalEqual(a, b) {
        return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε
    }
    function d3_geo_centroidPoint(λ, φ) {
        λ *= d3_radians;
        var cosφ = Math.cos(φ *= d3_radians);
        d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ))
    }
    function d3_geo_centroidPointXYZ(x, y, z) {
        ++d3_geo_centroidW0,
        d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0,
        d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0,
        d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0
    }
    function d3_geo_centroidLineStart() {
        function nextPoint(λ, φ) {
            λ *= d3_radians;
            var cosφ = Math.cos(φ *= d3_radians)
              , x = cosφ * Math.cos(λ)
              , y = cosφ * Math.sin(λ)
              , z = Math.sin(φ)
              , w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
            d3_geo_centroidW1 += w,
            d3_geo_centroidX1 += w * (x0 + (x0 = x)),
            d3_geo_centroidY1 += w * (y0 + (y0 = y)),
            d3_geo_centroidZ1 += w * (z0 + (z0 = z)),
            d3_geo_centroidPointXYZ(x0, y0, z0)
        }
        var x0, y0, z0;
        d3_geo_centroid.point = function(λ, φ) {
            λ *= d3_radians;
            var cosφ = Math.cos(φ *= d3_radians);
            x0 = cosφ * Math.cos(λ),
            y0 = cosφ * Math.sin(λ),
            z0 = Math.sin(φ),
            d3_geo_centroid.point = nextPoint,
            d3_geo_centroidPointXYZ(x0, y0, z0)
        }
    }
    function d3_geo_centroidLineEnd() {
        d3_geo_centroid.point = d3_geo_centroidPoint
    }
    function d3_geo_centroidRingStart() {
        function nextPoint(λ, φ) {
            λ *= d3_radians;
            var cosφ = Math.cos(φ *= d3_radians)
              , x = cosφ * Math.cos(λ)
              , y = cosφ * Math.sin(λ)
              , z = Math.sin(φ)
              , cx = y0 * z - z0 * y
              , cy = z0 * x - x0 * z
              , cz = x0 * y - y0 * x
              , m = Math.sqrt(cx * cx + cy * cy + cz * cz)
              , u = x0 * x + y0 * y + z0 * z
              , v = m && -d3_acos(u) / m
              , w = Math.atan2(m, u);
            d3_geo_centroidX2 += v * cx,
            d3_geo_centroidY2 += v * cy,
            d3_geo_centroidZ2 += v * cz,
            d3_geo_centroidW1 += w,
            d3_geo_centroidX1 += w * (x0 + (x0 = x)),
            d3_geo_centroidY1 += w * (y0 + (y0 = y)),
            d3_geo_centroidZ1 += w * (z0 + (z0 = z)),
            d3_geo_centroidPointXYZ(x0, y0, z0)
        }
        var λ00, φ00, x0, y0, z0;
        d3_geo_centroid.point = function(λ, φ) {
            λ00 = λ,
            φ00 = φ,
            d3_geo_centroid.point = nextPoint,
            λ *= d3_radians;
            var cosφ = Math.cos(φ *= d3_radians);
            x0 = cosφ * Math.cos(λ),
            y0 = cosφ * Math.sin(λ),
            z0 = Math.sin(φ),
            d3_geo_centroidPointXYZ(x0, y0, z0)
        }
        ,
        d3_geo_centroid.lineEnd = function() {
            nextPoint(λ00, φ00),
            d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd,
            d3_geo_centroid.point = d3_geo_centroidPoint
        }
    }
    function d3_true() {
        return !0
    }
    function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
        var subject = []
          , clip = [];
        if (segments.forEach(function(segment) {
            if (!((n = segment.length - 1) <= 0)) {
                var n, p0 = segment[0], p1 = segment[n];
                if (d3_geo_sphericalEqual(p0, p1)) {
                    listener.lineStart();
                    for (var i = 0; n > i; ++i)
                        listener.point((p0 = segment[i])[0], p0[1]);
                    return void listener.lineEnd()
                }
                var a = new d3_geo_clipPolygonIntersection(p0,segment,null ,!0)
                  , b = new d3_geo_clipPolygonIntersection(p0,null ,a,!1);
                a.o = b,
                subject.push(a),
                clip.push(b),
                a = new d3_geo_clipPolygonIntersection(p1,segment,null ,!1),
                b = new d3_geo_clipPolygonIntersection(p1,null ,a,!0),
                a.o = b,
                subject.push(a),
                clip.push(b)
            }
        }
        ),
        clip.sort(compare),
        d3_geo_clipPolygonLinkCircular(subject),
        d3_geo_clipPolygonLinkCircular(clip),
        subject.length) {
            for (var i = 0, entry = clipStartInside, n = clip.length; n > i; ++i)
                clip[i].e = entry = !entry;
            for (var points, point, start = subject[0]; ; ) {
                for (var current = start, isSubject = !0; current.v; )
                    if ((current = current.n) === start)
                        return;
                points = current.z,
                listener.lineStart();
                do {
                    if (current.v = current.o.v = !0,
                    current.e) {
                        if (isSubject)
                            for (var i = 0, n = points.length; n > i; ++i)
                                listener.point((point = points[i])[0], point[1]);
                        else
                            interpolate(current.x, current.n.x, 1, listener);
                        current = current.n
                    } else {
                        if (isSubject) {
                            points = current.p.z;
                            for (var i = points.length - 1; i >= 0; --i)
                                listener.point((point = points[i])[0], point[1])
                        } else
                            interpolate(current.x, current.p.x, -1, listener);
                        current = current.p
                    }
                    current = current.o,
                    points = current.z,
                    isSubject = !isSubject
                } while (!current.v);listener.lineEnd()
            }
        }
    }
    function d3_geo_clipPolygonLinkCircular(array) {
        if (n = array.length) {
            for (var n, b, i = 0, a = array[0]; ++i < n; )
                a.n = b = array[i],
                b.p = a,
                a = b;
            a.n = b = array[0],
            b.p = a
        }
    }
    function d3_geo_clipPolygonIntersection(point, points, other, entry) {
        this.x = point,
        this.z = points,
        this.o = other,
        this.e = entry,
        this.v = !1,
        this.n = this.p = null 
    }
    function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
        return function(rotate, listener) {
            function point(λ, φ) {
                var point = rotate(λ, φ);
                pointVisible(λ = point[0], φ = point[1]) && listener.point(λ, φ)
            }
            function pointLine(λ, φ) {
                var point = rotate(λ, φ);
                line.point(point[0], point[1])
            }
            function lineStart() {
                clip.point = pointLine,
                line.lineStart()
            }
            function lineEnd() {
                clip.point = point,
                line.lineEnd()
            }
            function pointRing(λ, φ) {
                ring.push([λ, φ]);
                var point = rotate(λ, φ);
                ringListener.point(point[0], point[1])
            }
            function ringStart() {
                ringListener.lineStart(),
                ring = []
            }
            function ringEnd() {
                pointRing(ring[0][0], ring[0][1]),
                ringListener.lineEnd();
                var segment, clean = ringListener.clean(), ringSegments = buffer.buffer(), n = ringSegments.length;
                if (ring.pop(),
                polygon.push(ring),
                ring = null ,
                n) {
                    if (1 & clean) {
                        segment = ringSegments[0];
                        var point, n = segment.length - 1, i = -1;
                        for (listener.lineStart(); ++i < n; )
                            listener.point((point = segment[i])[0], point[1]);
                        return void listener.lineEnd()
                    }
                    n > 1 && 2 & clean && ringSegments.push(ringSegments.pop().concat(ringSegments.shift())),
                    segments.push(ringSegments.filter(d3_geo_clipSegmentLength1))
                }
            }
            var segments, polygon, ring, line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]), clip = {
                point: point,
                lineStart: lineStart,
                lineEnd: lineEnd,
                polygonStart: function() {
                    clip.point = pointRing,
                    clip.lineStart = ringStart,
                    clip.lineEnd = ringEnd,
                    segments = [],
                    polygon = [],
                    listener.polygonStart()
                },
                polygonEnd: function() {
                    clip.point = point,
                    clip.lineStart = lineStart,
                    clip.lineEnd = lineEnd,
                    segments = d3.merge(segments);
                    var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
                    segments.length ? d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener) : clipStartInside && (listener.lineStart(),
                    interpolate(null , null , 1, listener),
                    listener.lineEnd()),
                    listener.polygonEnd(),
                    segments = polygon = null 
                },
                sphere: function() {
                    listener.polygonStart(),
                    listener.lineStart(),
                    interpolate(null , null , 1, listener),
                    listener.lineEnd(),
                    listener.polygonEnd()
                }
            }, buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer);
            return clip
        }
    }
    function d3_geo_clipSegmentLength1(segment) {
        return segment.length > 1
    }
    function d3_geo_clipBufferListener() {
        var line, lines = [];
        return {
            lineStart: function() {
                lines.push(line = [])
            },
            point: function(λ, φ) {
                line.push([λ, φ])
            },
            lineEnd: d3_noop,
            buffer: function() {
                var buffer = lines;
                return lines = [],
                line = null ,
                buffer
            },
            rejoin: function() {
                lines.length > 1 && lines.push(lines.pop().concat(lines.shift()))
            }
        }
    }
    function d3_geo_clipSort(a, b) {
        return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1])
    }
    function d3_geo_pointInPolygon(point, polygon) {
        var meridian = point[0]
          , parallel = point[1]
          , meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0]
          , polarAngle = 0
          , winding = 0;
        d3_geo_areaRingSum.reset();
        for (var i = 0, n = polygon.length; n > i; ++i) {
            var ring = polygon[i]
              , m = ring.length;
            if (m)
                for (var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1; ; ) {
                    j === m && (j = 0),
                    point = ring[j];
                    var λ = point[0]
                      , φ = point[1] / 2 + π / 4
                      , sinφ = Math.sin(φ)
                      , cosφ = Math.cos(φ)
                      , dλ = λ - λ0
                      , antimeridian = abs(dλ) > π
                      , k = sinφ0 * sinφ;
                    if (d3_geo_areaRingSum.add(Math.atan2(k * Math.sin(dλ), cosφ0 * cosφ + k * Math.cos(dλ))),
                    polarAngle += antimeridian ? dλ + (dλ >= 0 ? τ : -τ) : dλ,
                    antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
                        var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
                        d3_geo_cartesianNormalize(arc);
                        var intersection = d3_geo_cartesianCross(meridianNormal, arc);
                        d3_geo_cartesianNormalize(intersection);
                        var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
                        (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) && (winding += antimeridian ^ dλ >= 0 ? 1 : -1)
                    }
                    if (!j++)
                        break;
                    λ0 = λ,
                    sinφ0 = sinφ,
                    cosφ0 = cosφ,
                    point0 = point
                }
        }
        return (-ε > polarAngle || ε > polarAngle && 0 > d3_geo_areaRingSum) ^ 1 & winding
    }
    function d3_geo_clipAntimeridianLine(listener) {
        var clean, λ0 = NaN, φ0 = NaN, sλ0 = NaN;
        return {
            lineStart: function() {
                listener.lineStart(),
                clean = 1
            },
            point: function(λ1, φ1) {
                var sλ1 = λ1 > 0 ? π : -π
                  , dλ = abs(λ1 - λ0);
                abs(dλ - π) < ε ? (listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ),
                listener.point(sλ0, φ0),
                listener.lineEnd(),
                listener.lineStart(),
                listener.point(sλ1, φ0),
                listener.point(λ1, φ0),
                clean = 0) : sλ0 !== sλ1 && dλ >= π && (abs(λ0 - sλ0) < ε && (λ0 -= sλ0 * ε),
                abs(λ1 - sλ1) < ε && (λ1 -= sλ1 * ε),
                φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1),
                listener.point(sλ0, φ0),
                listener.lineEnd(),
                listener.lineStart(),
                listener.point(sλ1, φ0),
                clean = 0),
                listener.point(λ0 = λ1, φ0 = φ1),
                sλ0 = sλ1
            },
            lineEnd: function() {
                listener.lineEnd(),
                λ0 = φ0 = NaN
            },
            clean: function() {
                return 2 - clean
            }
        }
    }
    function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
        var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
        return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2
    }
    function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
        var φ;
        if (null  == from)
            φ = direction * halfπ,
            listener.point(-π, φ),
            listener.point(0, φ),
            listener.point(π, φ),
            listener.point(π, 0),
            listener.point(π, -φ),
            listener.point(0, -φ),
            listener.point(-π, -φ),
            listener.point(-π, 0),
            listener.point(-π, φ);
        else if (abs(from[0] - to[0]) > ε) {
            var s = from[0] < to[0] ? π : -π;
            φ = direction * s / 2,
            listener.point(-s, φ),
            listener.point(0, φ),
            listener.point(s, φ)
        } else
            listener.point(to[0], to[1])
    }
    function d3_geo_clipCircle(radius) {
        function visible(λ, φ) {
            return Math.cos(λ) * Math.cos(φ) > cr
        }
        function clipLine(listener) {
            var point0, c0, v0, v00, clean;
            return {
                lineStart: function() {
                    v00 = v0 = !1,
                    clean = 1
                },
                point: function(λ, φ) {
                    var point2, point1 = [λ, φ], v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (0 > λ ? π : -π), φ) : 0;
                    if (!point0 && (v00 = v0 = v) && listener.lineStart(),
                    v !== v0 && (point2 = intersect(point0, point1),
                    (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) && (point1[0] += ε,
                    point1[1] += ε,
                    v = visible(point1[0], point1[1]))),
                    v !== v0)
                        clean = 0,
                        v ? (listener.lineStart(),
                        point2 = intersect(point1, point0),
                        listener.point(point2[0], point2[1])) : (point2 = intersect(point0, point1),
                        listener.point(point2[0], point2[1]),
                        listener.lineEnd()),
                        point0 = point2;
                    else if (notHemisphere && point0 && smallRadius ^ v) {
                        var t;
                        c & c0 || !(t = intersect(point1, point0, !0)) || (clean = 0,
                        smallRadius ? (listener.lineStart(),
                        listener.point(t[0][0], t[0][1]),
                        listener.point(t[1][0], t[1][1]),
                        listener.lineEnd()) : (listener.point(t[1][0], t[1][1]),
                        listener.lineEnd(),
                        listener.lineStart(),
                        listener.point(t[0][0], t[0][1])))
                    }
                    !v || point0 && d3_geo_sphericalEqual(point0, point1) || listener.point(point1[0], point1[1]),
                    point0 = point1,
                    v0 = v,
                    c0 = c
                },
                lineEnd: function() {
                    v0 && listener.lineEnd(),
                    point0 = null 
                },
                clean: function() {
                    return clean | (v00 && v0) << 1
                }
            }
        }
        function intersect(a, b, two) {
            var pa = d3_geo_cartesian(a)
              , pb = d3_geo_cartesian(b)
              , n1 = [1, 0, 0]
              , n2 = d3_geo_cartesianCross(pa, pb)
              , n2n2 = d3_geo_cartesianDot(n2, n2)
              , n1n2 = n2[0]
              , determinant = n2n2 - n1n2 * n1n2;
            if (!determinant)
                return !two && a;
            var c1 = cr * n2n2 / determinant
              , c2 = -cr * n1n2 / determinant
              , n1xn2 = d3_geo_cartesianCross(n1, n2)
              , A = d3_geo_cartesianScale(n1, c1)
              , B = d3_geo_cartesianScale(n2, c2);
            d3_geo_cartesianAdd(A, B);
            var u = n1xn2
              , w = d3_geo_cartesianDot(A, u)
              , uu = d3_geo_cartesianDot(u, u)
              , t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
            if (!(0 > t2)) {
                var t = Math.sqrt(t2)
                  , q = d3_geo_cartesianScale(u, (-w - t) / uu);
                if (d3_geo_cartesianAdd(q, A),
                q = d3_geo_spherical(q),
                !two)
                    return q;
                var z, λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1];
                λ0 > λ1 && (z = λ0,
                λ0 = λ1,
                λ1 = z);
                var δλ = λ1 - λ0
                  , polar = abs(δλ - π) < ε
                  , meridian = polar || ε > δλ;
                if (!polar && φ0 > φ1 && (z = φ0,
                φ0 = φ1,
                φ1 = z),
                meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
                    var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
                    return d3_geo_cartesianAdd(q1, A),
                    [q, d3_geo_spherical(q1)]
                }
            }
        }
        function code(λ, φ) {
            var r = smallRadius ? radius : π - radius
              , code = 0;
            return -r > λ ? code |= 1 : λ > r && (code |= 2),
            -r > φ ? code |= 4 : φ > r && (code |= 8),
            code
        }
        var cr = Math.cos(radius)
          , smallRadius = cr > 0
          , notHemisphere = abs(cr) > ε
          , interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
        return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-π, radius - π])
    }
    function d3_geom_clipLine(x0, y0, x1, y1) {
        return function(line) {
            var r, a = line.a, b = line.b, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay;
            if (r = x0 - ax,
            dx || !(r > 0)) {
                if (r /= dx,
                0 > dx) {
                    if (t0 > r)
                        return;
                    t1 > r && (t1 = r)
                } else if (dx > 0) {
                    if (r > t1)
                        return;
                    r > t0 && (t0 = r)
                }
                if (r = x1 - ax,
                dx || !(0 > r)) {
                    if (r /= dx,
                    0 > dx) {
                        if (r > t1)
                            return;
                        r > t0 && (t0 = r)
                    } else if (dx > 0) {
                        if (t0 > r)
                            return;
                        t1 > r && (t1 = r)
                    }
                    if (r = y0 - ay,
                    dy || !(r > 0)) {
                        if (r /= dy,
                        0 > dy) {
                            if (t0 > r)
                                return;
                            t1 > r && (t1 = r)
                        } else if (dy > 0) {
                            if (r > t1)
                                return;
                            r > t0 && (t0 = r)
                        }
                        if (r = y1 - ay,
                        dy || !(0 > r)) {
                            if (r /= dy,
                            0 > dy) {
                                if (r > t1)
                                    return;
                                r > t0 && (t0 = r)
                            } else if (dy > 0) {
                                if (t0 > r)
                                    return;
                                t1 > r && (t1 = r)
                            }
                            return t0 > 0 && (line.a = {
                                x: ax + t0 * dx,
                                y: ay + t0 * dy
                            }),
                            1 > t1 && (line.b = {
                                x: ax + t1 * dx,
                                y: ay + t1 * dy
                            }),
                            line
                        }
                    }
                }
            }
        }
    }
    function d3_geo_clipExtent(x0, y0, x1, y1) {
        function corner(p, direction) {
            return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2
        }
        function compare(a, b) {
            return comparePoints(a.x, b.x)
        }
        function comparePoints(a, b) {
            var ca = corner(a, 1)
              , cb = corner(b, 1);
            return ca !== cb ? ca - cb : 0 === ca ? b[1] - a[1] : 1 === ca ? a[0] - b[0] : 2 === ca ? a[1] - b[1] : b[0] - a[0]
        }
        return function(listener) {
            function insidePolygon(p) {
                for (var wn = 0, n = polygon.length, y = p[1], i = 0; n > i; ++i)
                    for (var b, j = 1, v = polygon[i], m = v.length, a = v[0]; m > j; ++j)
                        b = v[j],
                        a[1] <= y ? b[1] > y && isLeft(a, b, p) > 0 && ++wn : b[1] <= y && isLeft(a, b, p) < 0 && --wn,
                        a = b;
                return 0 !== wn
            }
            function isLeft(a, b, c) {
                return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])
            }
            function interpolate(from, to, direction, listener) {
                var a = 0
                  , a1 = 0;
                if (null  == from || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
                    do
                        listener.point(0 === a || 3 === a ? x0 : x1, a > 1 ? y1 : y0);
                    while ((a = (a + direction + 4) % 4) !== a1)
                } else
                    listener.point(to[0], to[1])
            }
            function pointVisible(x, y) {
                return x >= x0 && x1 >= x && y >= y0 && y1 >= y
            }
            function point(x, y) {
                pointVisible(x, y) && listener.point(x, y)
            }
            function lineStart() {
                clip.point = linePoint,
                polygon && polygon.push(ring = []),
                first = !0,
                v_ = !1,
                x_ = y_ = NaN
            }
            function lineEnd() {
                segments && (linePoint(x__, y__),
                v__ && v_ && bufferListener.rejoin(),
                segments.push(bufferListener.buffer())),
                clip.point = point,
                v_ && listener.lineEnd()
            }
            function linePoint(x, y) {
                x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x)),
                y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
                var v = pointVisible(x, y);
                if (polygon && ring.push([x, y]),
                first)
                    x__ = x,
                    y__ = y,
                    v__ = v,
                    first = !1,
                    v && (listener.lineStart(),
                    listener.point(x, y));
                else if (v && v_)
                    listener.point(x, y);
                else {
                    var l = {
                        a: {
                            x: x_,
                            y: y_
                        },
                        b: {
                            x: x,
                            y: y
                        }
                    };
                    clipLine(l) ? (v_ || (listener.lineStart(),
                    listener.point(l.a.x, l.a.y)),
                    listener.point(l.b.x, l.b.y),
                    v || listener.lineEnd(),
                    clean = !1) : v && (listener.lineStart(),
                    listener.point(x, y),
                    clean = !1)
                }
                x_ = x,
                y_ = y,
                v_ = v
            }
            var segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean, listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), clip = {
                point: point,
                lineStart: lineStart,
                lineEnd: lineEnd,
                polygonStart: function() {
                    listener = bufferListener,
                    segments = [],
                    polygon = [],
                    clean = !0
                },
                polygonEnd: function() {
                    listener = listener_,
                    segments = d3.merge(segments);
                    var clipStartInside = insidePolygon([x0, y1])
                      , inside = clean && clipStartInside
                      , visible = segments.length;
                    (inside || visible) && (listener.polygonStart(),
                    inside && (listener.lineStart(),
                    interpolate(null , null , 1, listener),
                    listener.lineEnd()),
                    visible && d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener),
                    listener.polygonEnd()),
                    segments = polygon = ring = null 
                }
            };
            return clip
        }
    }
    function d3_geo_compose(a, b) {
        function compose(x, y) {
            return x = a(x, y),
            b(x[0], x[1])
        }
        return a.invert && b.invert && (compose.invert = function(x, y) {
            return x = b.invert(x, y),
            x && a.invert(x[0], x[1])
        }
        ),
        compose
    }
    function d3_geo_conic(projectAt) {
        var φ0 = 0
          , φ1 = π / 3
          , m = d3_geo_projectionMutator(projectAt)
          , p = m(φ0, φ1);
        return p.parallels = function(_) {
            return arguments.length ? m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180) : [φ0 / π * 180, φ1 / π * 180]
        }
        ,
        p
    }
    function d3_geo_conicEqualArea(φ0, φ1) {
        function forward(λ, φ) {
            var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
            return [ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ)]
        }
        var sinφ0 = Math.sin(φ0)
          , n = (sinφ0 + Math.sin(φ1)) / 2
          , C = 1 + sinφ0 * (2 * n - sinφ0)
          , ρ0 = Math.sqrt(C) / n;
        return forward.invert = function(x, y) {
            var ρ0_y = ρ0 - y;
            return [Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n))]
        }
        ,
        forward
    }
    function d3_geo_pathAreaRingStart() {
        function nextPoint(x, y) {
            d3_geo_pathAreaPolygon += y0 * x - x0 * y,
            x0 = x,
            y0 = y
        }
        var x00, y00, x0, y0;
        d3_geo_pathArea.point = function(x, y) {
            d3_geo_pathArea.point = nextPoint,
            x00 = x0 = x,
            y00 = y0 = y
        }
        ,
        d3_geo_pathArea.lineEnd = function() {
            nextPoint(x00, y00)
        }
    }
    function d3_geo_pathBoundsPoint(x, y) {
        d3_geo_pathBoundsX0 > x && (d3_geo_pathBoundsX0 = x),
        x > d3_geo_pathBoundsX1 && (d3_geo_pathBoundsX1 = x),
        d3_geo_pathBoundsY0 > y && (d3_geo_pathBoundsY0 = y),
        y > d3_geo_pathBoundsY1 && (d3_geo_pathBoundsY1 = y)
    }
    function d3_geo_pathBuffer() {
        function point(x, y) {
            buffer.push("M", x, ",", y, pointCircle)
        }
        function pointLineStart(x, y) {
            buffer.push("M", x, ",", y),
            stream.point = pointLine
        }
        function pointLine(x, y) {
            buffer.push("L", x, ",", y)
        }
        function lineEnd() {
            stream.point = point
        }
        function lineEndPolygon() {
            buffer.push("Z")
        }
        var pointCircle = d3_geo_pathBufferCircle(4.5)
          , buffer = []
          , stream = {
            point: point,
            lineStart: function() {
                stream.point = pointLineStart
            },
            lineEnd: lineEnd,
            polygonStart: function() {
                stream.lineEnd = lineEndPolygon
            },
            polygonEnd: function() {
                stream.lineEnd = lineEnd,
                stream.point = point
            },
            pointRadius: function(_) {
                return pointCircle = d3_geo_pathBufferCircle(_),
                stream
            },
            result: function() {
                if (buffer.length) {
                    var result = buffer.join("");
                    return buffer = [],
                    result
                }
            }
        };
        return stream
    }
    function d3_geo_pathBufferCircle(radius) {
        return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z"
    }
    function d3_geo_pathCentroidPoint(x, y) {
        d3_geo_centroidX0 += x,
        d3_geo_centroidY0 += y,
        ++d3_geo_centroidZ0
    }
    function d3_geo_pathCentroidLineStart() {
        function nextPoint(x, y) {
            var dx = x - x0
              , dy = y - y0
              , z = Math.sqrt(dx * dx + dy * dy);
            d3_geo_centroidX1 += z * (x0 + x) / 2,
            d3_geo_centroidY1 += z * (y0 + y) / 2,
            d3_geo_centroidZ1 += z,
            d3_geo_pathCentroidPoint(x0 = x, y0 = y)
        }
        var x0, y0;
        d3_geo_pathCentroid.point = function(x, y) {
            d3_geo_pathCentroid.point = nextPoint,
            d3_geo_pathCentroidPoint(x0 = x, y0 = y)
        }
    }
    function d3_geo_pathCentroidLineEnd() {
        d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint
    }
    function d3_geo_pathCentroidRingStart() {
        function nextPoint(x, y) {
            var dx = x - x0
              , dy = y - y0
              , z = Math.sqrt(dx * dx + dy * dy);
            d3_geo_centroidX1 += z * (x0 + x) / 2,
            d3_geo_centroidY1 += z * (y0 + y) / 2,
            d3_geo_centroidZ1 += z,
            z = y0 * x - x0 * y,
            d3_geo_centroidX2 += z * (x0 + x),
            d3_geo_centroidY2 += z * (y0 + y),
            d3_geo_centroidZ2 += 3 * z,
            d3_geo_pathCentroidPoint(x0 = x, y0 = y)
        }
        var x00, y00, x0, y0;
        d3_geo_pathCentroid.point = function(x, y) {
            d3_geo_pathCentroid.point = nextPoint,
            d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y)
        }
        ,
        d3_geo_pathCentroid.lineEnd = function() {
            nextPoint(x00, y00)
        }
    }
    function d3_geo_pathContext(context) {
        function point(x, y) {
            context.moveTo(x, y),
            context.arc(x, y, pointRadius, 0, τ)
        }
        function pointLineStart(x, y) {
            context.moveTo(x, y),
            stream.point = pointLine
        }
        function pointLine(x, y) {
            context.lineTo(x, y)
        }
        function lineEnd() {
            stream.point = point
        }
        function lineEndPolygon() {
            context.closePath()
        }
        var pointRadius = 4.5
          , stream = {
            point: point,
            lineStart: function() {
                stream.point = pointLineStart
            },
            lineEnd: lineEnd,
            polygonStart: function() {
                stream.lineEnd = lineEndPolygon
            },
            polygonEnd: function() {
                stream.lineEnd = lineEnd,
                stream.point = point
            },
            pointRadius: function(_) {
                return pointRadius = _,
                stream
            },
            result: d3_noop
        };
        return stream
    }
    function d3_geo_resample(project) {
        function resample(stream) {
            return (maxDepth ? resampleRecursive : resampleNone)(stream)
        }
        function resampleNone(stream) {
            return d3_geo_transformPoint(stream, function(x, y) {
                x = project(x, y),
                stream.point(x[0], x[1])
            }
            )
        }
        function resampleRecursive(stream) {
            function point(x, y) {
                x = project(x, y),
                stream.point(x[0], x[1])
            }
            function lineStart() {
                x0 = NaN,
                resample.point = linePoint,
                stream.lineStart();
            }
            function linePoint(λ, φ) {
                var c = d3_geo_cartesian([λ, φ])
                  , p = project(λ, φ);
                resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream),
                stream.point(x0, y0)
            }
            function lineEnd() {
                resample.point = point,
                stream.lineEnd()
            }
            function ringStart() {
                lineStart(),
                resample.point = ringPoint,
                resample.lineEnd = ringEnd
            }
            function ringPoint(λ, φ) {
                linePoint(λ00 = λ, φ00 = φ),
                x00 = x0,
                y00 = y0,
                a00 = a0,
                b00 = b0,
                c00 = c0,
                resample.point = linePoint
            }
            function ringEnd() {
                resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream),
                resample.lineEnd = lineEnd,
                lineEnd()
            }
            var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0, resample = {
                point: point,
                lineStart: lineStart,
                lineEnd: lineEnd,
                polygonStart: function() {
                    stream.polygonStart(),
                    resample.lineStart = ringStart
                },
                polygonEnd: function() {
                    stream.polygonEnd(),
                    resample.lineStart = lineStart
                }
            };
            return resample
        }
        function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
            var dx = x1 - x0
              , dy = y1 - y0
              , d2 = dx * dx + dy * dy;
            if (d2 > 4 * δ2 && depth--) {
                var a = a0 + a1
                  , b = b0 + b1
                  , c = c0 + c1
                  , m = Math.sqrt(a * a + b * b + c * c)
                  , φ2 = Math.asin(c /= m)
                  , λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a)
                  , p = project(λ2, φ2)
                  , x2 = p[0]
                  , y2 = p[1]
                  , dx2 = x2 - x0
                  , dy2 = y2 - y0
                  , dz = dy * dx2 - dx * dy2;
                (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || cosMinDistance > a0 * a1 + b0 * b1 + c0 * c1) && (resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream),
                stream.point(x2, y2),
                resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream))
            }
        }
        var δ2 = .5
          , cosMinDistance = Math.cos(30 * d3_radians)
          , maxDepth = 16;
        return resample.precision = function(_) {
            return arguments.length ? (maxDepth = (δ2 = _ * _) > 0 && 16,
            resample) : Math.sqrt(δ2)
        }
        ,
        resample
    }
    function d3_geo_pathProjectStream(project) {
        var resample = d3_geo_resample(function(x, y) {
            return project([x * d3_degrees, y * d3_degrees])
        }
        );
        return function(stream) {
            return d3_geo_projectionRadians(resample(stream))
        }
    }
    function d3_geo_transform(stream) {
        this.stream = stream
    }
    function d3_geo_transformPoint(stream, point) {
        return {
            point: point,
            sphere: function() {
                stream.sphere()
            },
            lineStart: function() {
                stream.lineStart()
            },
            lineEnd: function() {
                stream.lineEnd()
            },
            polygonStart: function() {
                stream.polygonStart()
            },
            polygonEnd: function() {
                stream.polygonEnd()
            }
        }
    }
    function d3_geo_projection(project) {
        return d3_geo_projectionMutator(function() {
            return project
        }
        )()
    }
    function d3_geo_projectionMutator(projectAt) {
        function projection(point) {
            return point = projectRotate(point[0] * d3_radians, point[1] * d3_radians),
            [point[0] * k + δx, δy - point[1] * k]
        }
        function invert(point) {
            return point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k),
            point && [point[0] * d3_degrees, point[1] * d3_degrees]
        }
        function reset() {
            projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
            var center = project(λ, φ);
            return δx = x - center[0] * k,
            δy = y + center[1] * k,
            invalidate()
        }
        function invalidate() {
            return stream && (stream.valid = !1,
            stream = null ),
            projection
        }
        var project, rotate, projectRotate, δx, δy, stream, projectResample = d3_geo_resample(function(x, y) {
            return x = project(x, y),
            [x[0] * k + δx, δy - x[1] * k]
        }
        ), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null , clipExtent = null ;
        return projection.stream = function(output) {
            return stream && (stream.valid = !1),
            stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output)))),
            stream.valid = !0,
            stream
        }
        ,
        projection.clipAngle = function(_) {
            return arguments.length ? (preclip = null  == _ ? (clipAngle = _,
            d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians),
            invalidate()) : clipAngle
        }
        ,
        projection.clipExtent = function(_) {
            return arguments.length ? (clipExtent = _,
            postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity,
            invalidate()) : clipExtent
        }
        ,
        projection.scale = function(_) {
            return arguments.length ? (k = +_,
            reset()) : k
        }
        ,
        projection.translate = function(_) {
            return arguments.length ? (x = +_[0],
            y = +_[1],
            reset()) : [x, y]
        }
        ,
        projection.center = function(_) {
            return arguments.length ? (λ = _[0] % 360 * d3_radians,
            φ = _[1] % 360 * d3_radians,
            reset()) : [λ * d3_degrees, φ * d3_degrees]
        }
        ,
        projection.rotate = function(_) {
            return arguments.length ? (δλ = _[0] % 360 * d3_radians,
            δφ = _[1] % 360 * d3_radians,
            δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0,
            reset()) : [δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees]
        }
        ,
        d3.rebind(projection, projectResample, "precision"),
        function() {
            return project = projectAt.apply(this, arguments),
            projection.invert = project.invert && invert,
            reset()
        }
    }
    function d3_geo_projectionRadians(stream) {
        return d3_geo_transformPoint(stream, function(x, y) {
            stream.point(x * d3_radians, y * d3_radians)
        }
        )
    }
    function d3_geo_equirectangular(λ, φ) {
        return [λ, φ]
    }
    function d3_geo_identityRotation(λ, φ) {
        return [λ > π ? λ - τ : -π > λ ? λ + τ : λ, φ]
    }
    function d3_geo_rotation(δλ, δφ, δγ) {
        return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation
    }
    function d3_geo_forwardRotationλ(δλ) {
        return function(λ, φ) {
            return λ += δλ,
            [λ > π ? λ - τ : -π > λ ? λ + τ : λ, φ]
        }
    }
    function d3_geo_rotationλ(δλ) {
        var rotation = d3_geo_forwardRotationλ(δλ);
        return rotation.invert = d3_geo_forwardRotationλ(-δλ),
        rotation
    }
    function d3_geo_rotationφγ(δφ, δγ) {
        function rotation(λ, φ) {
            var cosφ = Math.cos(φ)
              , x = Math.cos(λ) * cosφ
              , y = Math.sin(λ) * cosφ
              , z = Math.sin(φ)
              , k = z * cosδφ + x * sinδφ;
            return [Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ)]
        }
        var cosδφ = Math.cos(δφ)
          , sinδφ = Math.sin(δφ)
          , cosδγ = Math.cos(δγ)
          , sinδγ = Math.sin(δγ);
        return rotation.invert = function(λ, φ) {
            var cosφ = Math.cos(φ)
              , x = Math.cos(λ) * cosφ
              , y = Math.sin(λ) * cosφ
              , z = Math.sin(φ)
              , k = z * cosδγ - y * sinδγ;
            return [Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ)]
        }
        ,
        rotation
    }
    function d3_geo_circleInterpolate(radius, precision) {
        var cr = Math.cos(radius)
          , sr = Math.sin(radius);
        return function(from, to, direction, listener) {
            var step = direction * precision;
            null  != from ? (from = d3_geo_circleAngle(cr, from),
            to = d3_geo_circleAngle(cr, to),
            (direction > 0 ? to > from : from > to) && (from += direction * τ)) : (from = radius + direction * τ,
            to = radius - .5 * step);
            for (var point, t = from; direction > 0 ? t > to : to > t; t -= step)
                listener.point((point = d3_geo_spherical([cr, -sr * Math.cos(t), -sr * Math.sin(t)]))[0], point[1])
        }
    }
    function d3_geo_circleAngle(cr, point) {
        var a = d3_geo_cartesian(point);
        a[0] -= cr,
        d3_geo_cartesianNormalize(a);
        var angle = d3_acos(-a[1]);
        return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI)
    }
    function d3_geo_graticuleX(y0, y1, dy) {
        var y = d3.range(y0, y1 - ε, dy).concat(y1);
        return function(x) {
            return y.map(function(y) {
                return [x, y]
            }
            )
        }
    }
    function d3_geo_graticuleY(x0, x1, dx) {
        var x = d3.range(x0, x1 - ε, dx).concat(x1);
        return function(y) {
            return x.map(function(x) {
                return [x, y]
            }
            )
        }
    }
    function d3_source(d) {
        return d.source
    }
    function d3_target(d) {
        return d.target
    }
    function d3_geo_interpolate(x0, y0, x1, y1) {
        var cy0 = Math.cos(y0)
          , sy0 = Math.sin(y0)
          , cy1 = Math.cos(y1)
          , sy1 = Math.sin(y1)
          , kx0 = cy0 * Math.cos(x0)
          , ky0 = cy0 * Math.sin(x0)
          , kx1 = cy1 * Math.cos(x1)
          , ky1 = cy1 * Math.sin(x1)
          , d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0)))
          , k = 1 / Math.sin(d)
          , interpolate = d ? function(t) {
            var B = Math.sin(t *= d) * k
              , A = Math.sin(d - t) * k
              , x = A * kx0 + B * kx1
              , y = A * ky0 + B * ky1
              , z = A * sy0 + B * sy1;
            return [Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees]
        }
         : function() {
            return [x0 * d3_degrees, y0 * d3_degrees]
        }
        ;
        return interpolate.distance = d,
        interpolate
    }
    function d3_geo_lengthLineStart() {
        function nextPoint(λ, φ) {
            var sinφ = Math.sin(φ *= d3_radians)
              , cosφ = Math.cos(φ)
              , t = abs((λ *= d3_radians) - λ0)
              , cosΔλ = Math.cos(t);
            d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ),
            λ0 = λ,
            sinφ0 = sinφ,
            cosφ0 = cosφ
        }
        var λ0, sinφ0, cosφ0;
        d3_geo_length.point = function(λ, φ) {
            λ0 = λ * d3_radians,
            sinφ0 = Math.sin(φ *= d3_radians),
            cosφ0 = Math.cos(φ),
            d3_geo_length.point = nextPoint
        }
        ,
        d3_geo_length.lineEnd = function() {
            d3_geo_length.point = d3_geo_length.lineEnd = d3_noop
        }
    }
    function d3_geo_azimuthal(scale, angle) {
        function azimuthal(λ, φ) {
            var cosλ = Math.cos(λ)
              , cosφ = Math.cos(φ)
              , k = scale(cosλ * cosφ);
            return [k * cosφ * Math.sin(λ), k * Math.sin(φ)]
        }
        return azimuthal.invert = function(x, y) {
            var ρ = Math.sqrt(x * x + y * y)
              , c = angle(ρ)
              , sinc = Math.sin(c)
              , cosc = Math.cos(c);
            return [Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ)]
        }
        ,
        azimuthal
    }
    function d3_geo_conicConformal(φ0, φ1) {
        function forward(λ, φ) {
            var ρ = abs(abs(φ) - halfπ) < ε ? 0 : F / Math.pow(t(φ), n);
            return [ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ)]
        }
        var cosφ0 = Math.cos(φ0)
          , t = function(φ) {
            return Math.tan(π / 4 + φ / 2)
        }
          , n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0))
          , F = cosφ0 * Math.pow(t(φ0), n) / n;
        return n ? (forward.invert = function(x, y) {
            var ρ0_y = F - y
              , ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
            return [Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ]
        }
        ,
        forward) : d3_geo_mercator
    }
    function d3_geo_conicEquidistant(φ0, φ1) {
        function forward(λ, φ) {
            var ρ = G - φ;
            return [ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ)]
        }
        var cosφ0 = Math.cos(φ0)
          , n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0)
          , G = cosφ0 / n + φ0;
        return abs(n) < ε ? d3_geo_equirectangular : (forward.invert = function(x, y) {
            var ρ0_y = G - y;
            return [Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y)]
        }
        ,
        forward)
    }
    function d3_geo_mercator(λ, φ) {
        return [λ, Math.log(Math.tan(π / 4 + φ / 2))]
    }
    function d3_geo_mercatorProjection(project) {
        var clipAuto, m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent;
        return m.scale = function() {
            var v = scale.apply(m, arguments);
            return v === m ? clipAuto ? m.clipExtent(null ) : m : v
        }
        ,
        m.translate = function() {
            var v = translate.apply(m, arguments);
            return v === m ? clipAuto ? m.clipExtent(null ) : m : v
        }
        ,
        m.clipExtent = function(_) {
            var v = clipExtent.apply(m, arguments);
            if (v === m) {
                if (clipAuto = null  == _) {
                    var k = π * scale()
                      , t = translate();
                    clipExtent([[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]])
                }
            } else
                clipAuto && (v = null );
            return v
        }
        ,
        m.clipExtent(null )
    }
    function d3_geo_transverseMercator(λ, φ) {
        return [Math.log(Math.tan(π / 4 + φ / 2)), -λ]
    }
    function d3_geom_pointX(d) {
        return d[0]
    }
    function d3_geom_pointY(d) {
        return d[1]
    }
    function d3_geom_hullCCW(i1, i2, i3, v) {
        var t, a, b, c, d, e, f;
        return t = v[i1],
        a = t[0],
        b = t[1],
        t = v[i2],
        c = t[0],
        d = t[1],
        t = v[i3],
        e = t[0],
        f = t[1],
        (f - b) * (c - a) - (d - b) * (e - a) > 0
    }
    function d3_geom_polygonInside(p, a, b) {
        return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0])
    }
    function d3_geom_polygonIntersect(c, d, a, b) {
        var x1 = c[0]
          , x3 = a[0]
          , x21 = d[0] - x1
          , x43 = b[0] - x3
          , y1 = c[1]
          , y3 = a[1]
          , y21 = d[1] - y1
          , y43 = b[1] - y3
          , ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
        return [x1 + ua * x21, y1 + ua * y21]
    }
    function d3_geom_polygonClosed(coordinates) {
        var a = coordinates[0]
          , b = coordinates[coordinates.length - 1];
        return !(a[0] - b[0] || a[1] - b[1])
    }
    function d3_geom_voronoiBeach() {
        d3_geom_voronoiRedBlackNode(this),
        this.edge = this.site = this.circle = null 
    }
    function d3_geom_voronoiCreateBeach(site) {
        var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach;
        return beach.site = site,
        beach
    }
    function d3_geom_voronoiDetachBeach(beach) {
        d3_geom_voronoiDetachCircle(beach),
        d3_geom_voronoiBeaches.remove(beach),
        d3_geom_voronoiBeachPool.push(beach),
        d3_geom_voronoiRedBlackNode(beach)
    }
    function d3_geom_voronoiRemoveBeach(beach) {
        var circle = beach.circle
          , x = circle.x
          , y = circle.cy
          , vertex = {
            x: x,
            y: y
        }
          , previous = beach.P
          , next = beach.N
          , disappearing = [beach];
        d3_geom_voronoiDetachBeach(beach);
        for (var lArc = previous; lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε; )
            previous = lArc.P,
            disappearing.unshift(lArc),
            d3_geom_voronoiDetachBeach(lArc),
            lArc = previous;
        disappearing.unshift(lArc),
        d3_geom_voronoiDetachCircle(lArc);
        for (var rArc = next; rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε; )
            next = rArc.N,
            disappearing.push(rArc),
            d3_geom_voronoiDetachBeach(rArc),
            rArc = next;
        disappearing.push(rArc),
        d3_geom_voronoiDetachCircle(rArc);
        var iArc, nArcs = disappearing.length;
        for (iArc = 1; nArcs > iArc; ++iArc)
            rArc = disappearing[iArc],
            lArc = disappearing[iArc - 1],
            d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
        lArc = disappearing[0],
        rArc = disappearing[nArcs - 1],
        rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null , vertex),
        d3_geom_voronoiAttachCircle(lArc),
        d3_geom_voronoiAttachCircle(rArc)
    }
    function d3_geom_voronoiAddBeach(site) {
        for (var lArc, rArc, dxl, dxr, x = site.x, directrix = site.y, node = d3_geom_voronoiBeaches._; node; )
            if (dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x,
            dxl > ε)
                node = node.L;
            else {
                if (dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix),
                !(dxr > ε)) {
                    dxl > -ε ? (lArc = node.P,
                    rArc = node) : dxr > -ε ? (lArc = node,
                    rArc = node.N) : lArc = rArc = node;
                    break
                }
                if (!node.R) {
                    lArc = node;
                    break
                }
                node = node.R
            }
        var newArc = d3_geom_voronoiCreateBeach(site);
        if (d3_geom_voronoiBeaches.insert(lArc, newArc),
        lArc || rArc) {
            if (lArc === rArc)
                return d3_geom_voronoiDetachCircle(lArc),
                rArc = d3_geom_voronoiCreateBeach(lArc.site),
                d3_geom_voronoiBeaches.insert(newArc, rArc),
                newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site),
                d3_geom_voronoiAttachCircle(lArc),
                void d3_geom_voronoiAttachCircle(rArc);
            if (!rArc)
                return void (newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site));
            d3_geom_voronoiDetachCircle(lArc),
            d3_geom_voronoiDetachCircle(rArc);
            var lSite = lArc.site
              , ax = lSite.x
              , ay = lSite.y
              , bx = site.x - ax
              , by = site.y - ay
              , rSite = rArc.site
              , cx = rSite.x - ax
              , cy = rSite.y - ay
              , d = 2 * (bx * cy - by * cx)
              , hb = bx * bx + by * by
              , hc = cx * cx + cy * cy
              , vertex = {
                x: (cy * hb - by * hc) / d + ax,
                y: (bx * hc - cx * hb) / d + ay
            };
            d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex),
            newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null , vertex),
            rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null , vertex),
            d3_geom_voronoiAttachCircle(lArc),
            d3_geom_voronoiAttachCircle(rArc)
        }
    }
    function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
        var site = arc.site
          , rfocx = site.x
          , rfocy = site.y
          , pby2 = rfocy - directrix;
        if (!pby2)
            return rfocx;
        var lArc = arc.P;
        if (!lArc)
            return -(1 / 0);
        site = lArc.site;
        var lfocx = site.x
          , lfocy = site.y
          , plby2 = lfocy - directrix;
        if (!plby2)
            return lfocx;
        var hl = lfocx - rfocx
          , aby2 = 1 / pby2 - 1 / plby2
          , b = hl / plby2;
        return aby2 ? (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx : (rfocx + lfocx) / 2
    }
    function d3_geom_voronoiRightBreakPoint(arc, directrix) {
        var rArc = arc.N;
        if (rArc)
            return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
        var site = arc.site;
        return site.y === directrix ? site.x : 1 / 0
    }
    function d3_geom_voronoiCell(site) {
        this.site = site,
        this.edges = []
    }
    function d3_geom_voronoiCloseCells(extent) {
        for (var x2, y2, x3, y3, cell, iHalfEdge, halfEdges, nHalfEdges, start, end, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], cells = d3_geom_voronoiCells, iCell = cells.length; iCell--; )
            if (cell = cells[iCell],
            cell && cell.prepare())
                for (halfEdges = cell.edges,
                nHalfEdges = halfEdges.length,
                iHalfEdge = 0; nHalfEdges > iHalfEdge; )
                    end = halfEdges[iHalfEdge].end(),
                    x3 = end.x,
                    y3 = end.y,
                    start = halfEdges[++iHalfEdge % nHalfEdges].start(),
                    x2 = start.x,
                    y2 = start.y,
                    (abs(x3 - x2) > ε || abs(y3 - y2) > ε) && (halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
                        x: x0,
                        y: abs(x2 - x0) < ε ? y2 : y1
                    } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
                        x: abs(y2 - y1) < ε ? x2 : x1,
                        y: y1
                    } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
                        x: x1,
                        y: abs(x2 - x1) < ε ? y2 : y0
                    } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
                        x: abs(y2 - y0) < ε ? x2 : x0,
                        y: y0
                    } : null ),cell.site,null )),
                    ++nHalfEdges)
    }
    function d3_geom_voronoiHalfEdgeOrder(a, b) {
        return b.angle - a.angle
    }
    function d3_geom_voronoiCircle() {
        d3_geom_voronoiRedBlackNode(this),
        this.x = this.y = this.arc = this.site = this.cy = null 
    }
    function d3_geom_voronoiAttachCircle(arc) {
        var lArc = arc.P
          , rArc = arc.N;
        if (lArc && rArc) {
            var lSite = lArc.site
              , cSite = arc.site
              , rSite = rArc.site;
            if (lSite !== rSite) {
                var bx = cSite.x
                  , by = cSite.y
                  , ax = lSite.x - bx
                  , ay = lSite.y - by
                  , cx = rSite.x - bx
                  , cy = rSite.y - by
                  , d = 2 * (ax * cy - ay * cx);
                if (!(d >= -ε2)) {
                    var ha = ax * ax + ay * ay
                      , hc = cx * cx + cy * cy
                      , x = (cy * ha - ay * hc) / d
                      , y = (ax * hc - cx * ha) / d
                      , cy = y + by
                      , circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle;
                    circle.arc = arc,
                    circle.site = cSite,
                    circle.x = x + bx,
                    circle.y = cy + Math.sqrt(x * x + y * y),
                    circle.cy = cy,
                    arc.circle = circle;
                    for (var before = null , node = d3_geom_voronoiCircles._; node; )
                        if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
                            if (!node.L) {
                                before = node.P;
                                break
                            }
                            node = node.L
                        } else {
                            if (!node.R) {
                                before = node;
                                break
                            }
                            node = node.R
                        }
                    d3_geom_voronoiCircles.insert(before, circle),
                    before || (d3_geom_voronoiFirstCircle = circle)
                }
            }
        }
    }
    function d3_geom_voronoiDetachCircle(arc) {
        var circle = arc.circle;
        circle && (circle.P || (d3_geom_voronoiFirstCircle = circle.N),
        d3_geom_voronoiCircles.remove(circle),
        d3_geom_voronoiCirclePool.push(circle),
        d3_geom_voronoiRedBlackNode(circle),
        arc.circle = null )
    }
    function d3_geom_voronoiClipEdges(extent) {
        for (var e, edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length; i--; )
            e = edges[i],
            (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) && (e.a = e.b = null ,
            edges.splice(i, 1))
    }
    function d3_geom_voronoiConnectEdge(edge, extent) {
        var vb = edge.b;
        if (vb)
            return !0;
        var fm, fb, va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2;
        if (ry === ly) {
            if (x0 > fx || fx >= x1)
                return;
            if (lx > rx) {
                if (va) {
                    if (va.y >= y1)
                        return
                } else
                    va = {
                        x: fx,
                        y: y0
                    };
                vb = {
                    x: fx,
                    y: y1
                }
            } else {
                if (va) {
                    if (va.y < y0)
                        return
                } else
                    va = {
                        x: fx,
                        y: y1
                    };
                vb = {
                    x: fx,
                    y: y0
                }
            }
        } else if (fm = (lx - rx) / (ry - ly),
        fb = fy - fm * fx,
        -1 > fm || fm > 1)
            if (lx > rx) {
                if (va) {
                    if (va.y >= y1)
                        return
                } else
                    va = {
                        x: (y0 - fb) / fm,
                        y: y0
                    };
                vb = {
                    x: (y1 - fb) / fm,
                    y: y1
                }
            } else {
                if (va) {
                    if (va.y < y0)
                        return
                } else
                    va = {
                        x: (y1 - fb) / fm,
                        y: y1
                    };
                vb = {
                    x: (y0 - fb) / fm,
                    y: y0
                }
            }
        else if (ry > ly) {
            if (va) {
                if (va.x >= x1)
                    return
            } else
                va = {
                    x: x0,
                    y: fm * x0 + fb
                };
            vb = {
                x: x1,
                y: fm * x1 + fb
            }
        } else {
            if (va) {
                if (va.x < x0)
                    return
            } else
                va = {
                    x: x1,
                    y: fm * x1 + fb
                };
            vb = {
                x: x0,
                y: fm * x0 + fb
            }
        }
        return edge.a = va,
        edge.b = vb,
        !0
    }
    function d3_geom_voronoiEdge(lSite, rSite) {
        this.l = lSite,
        this.r = rSite,
        this.a = this.b = null 
    }
    function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
        var edge = new d3_geom_voronoiEdge(lSite,rSite);
        return d3_geom_voronoiEdges.push(edge),
        va && d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va),
        vb && d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb),
        d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge,lSite,rSite)),
        d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge,rSite,lSite)),
        edge
    }
    function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
        var edge = new d3_geom_voronoiEdge(lSite,null );
        return edge.a = va,
        edge.b = vb,
        d3_geom_voronoiEdges.push(edge),
        edge
    }
    function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
        edge.a || edge.b ? edge.l === rSite ? edge.b = vertex : edge.a = vertex : (edge.a = vertex,
        edge.l = lSite,
        edge.r = rSite)
    }
    function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
        var va = edge.a
          , vb = edge.b;
        this.edge = edge,
        this.site = lSite,
        this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y)
    }
    function d3_geom_voronoiRedBlackTree() {
        this._ = null 
    }
    function d3_geom_voronoiRedBlackNode(node) {
        node.U = node.C = node.L = node.R = node.P = node.N = null 
    }
    function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
        var p = node
          , q = node.R
          , parent = p.U;
        parent ? parent.L === p ? parent.L = q : parent.R = q : tree._ = q,
        q.U = parent,
        p.U = q,
        p.R = q.L,
        p.R && (p.R.U = p),
        q.L = p
    }
    function d3_geom_voronoiRedBlackRotateRight(tree, node) {
        var p = node
          , q = node.L
          , parent = p.U;
        parent ? parent.L === p ? parent.L = q : parent.R = q : tree._ = q,
        q.U = parent,
        p.U = q,
        p.L = q.R,
        p.L && (p.L.U = p),
        q.R = p
    }
    function d3_geom_voronoiRedBlackFirst(node) {
        for (; node.L; )
            node = node.L;
        return node
    }
    function d3_geom_voronoi(sites, bbox) {
        var x0, y0, circle, site = sites.sort(d3_geom_voronoiVertexOrder).pop();
        for (d3_geom_voronoiEdges = [],
        d3_geom_voronoiCells = new Array(sites.length),
        d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree,
        d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree; ; )
            if (circle = d3_geom_voronoiFirstCircle,
            site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x))
                (site.x !== x0 || site.y !== y0) && (d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site),
                d3_geom_voronoiAddBeach(site),
                x0 = site.x,
                y0 = site.y),
                site = sites.pop();
            else {
                if (!circle)
                    break;
                d3_geom_voronoiRemoveBeach(circle.arc)
            }
        bbox && (d3_geom_voronoiClipEdges(bbox),
        d3_geom_voronoiCloseCells(bbox));
        var diagram = {
            cells: d3_geom_voronoiCells,
            edges: d3_geom_voronoiEdges
        };
        return d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null ,
        diagram
    }
    function d3_geom_voronoiVertexOrder(a, b) {
        return b.y - a.y || b.x - a.x
    }
    function d3_geom_voronoiTriangleArea(a, b, c) {
        return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y)
    }
    function d3_geom_quadtreeCompatX(d) {
        return d.x
    }
    function d3_geom_quadtreeCompatY(d) {
        return d.y
    }
    function d3_geom_quadtreeNode() {
        return {
            leaf: !0,
            nodes: [],
            point: null ,
            x: null ,
            y: null 
        }
    }
    function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
        if (!f(node, x1, y1, x2, y2)) {
            var sx = .5 * (x1 + x2)
              , sy = .5 * (y1 + y2)
              , children = node.nodes;
            children[0] && d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy),
            children[1] && d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy),
            children[2] && d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2),
            children[3] && d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2)
        }
    }
    function d3_interpolateRgb(a, b) {
        a = d3.rgb(a),
        b = d3.rgb(b);
        var ar = a.r
          , ag = a.g
          , ab = a.b
          , br = b.r - ar
          , bg = b.g - ag
          , bb = b.b - ab;
        return function(t) {
            return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t))
        }
    }
    function d3_interpolateObject(a, b) {
        var k, i = {}, c = {};
        for (k in a)
            k in b ? i[k] = d3_interpolate(a[k], b[k]) : c[k] = a[k];
        for (k in b)
            k in a || (c[k] = b[k]);
        return function(t) {
            for (k in i)
                c[k] = i[k](t);
            return c
        }
    }
    function d3_interpolateNumber(a, b) {
        return b -= a = +a,
        function(t) {
            return a + b * t
        }
    }
    function d3_interpolateString(a, b) {
        var m, i, j, n, o, s0 = 0, s1 = 0, s = [], q = [];
        for (a += "",
        b += "",
        d3_interpolate_number.lastIndex = 0,
        i = 0; m = d3_interpolate_number.exec(b); ++i)
            m.index && s.push(b.substring(s0, s1 = m.index)),
            q.push({
                i: s.length,
                x: m[0]
            }),
            s.push(null ),
            s0 = d3_interpolate_number.lastIndex;
        for (s0 < b.length && s.push(b.substring(s0)),
        i = 0,
        n = q.length; (m = d3_interpolate_number.exec(a)) && n > i; ++i)
            if (o = q[i],
            o.x == m[0]) {
                if (o.i)
                    if (null  == s[o.i + 1])
                        for (s[o.i - 1] += o.x,
                        s.splice(o.i, 1),
                        j = i + 1; n > j; ++j)
                            q[j].i--;
                    else
                        for (s[o.i - 1] += o.x + s[o.i + 1],
                        s.splice(o.i, 2),
                        j = i + 1; n > j; ++j)
                            q[j].i -= 2;
                else if (null  == s[o.i + 1])
                    s[o.i] = o.x;
                else
                    for (s[o.i] = o.x + s[o.i + 1],
                    s.splice(o.i + 1, 1),
                    j = i + 1; n > j; ++j)
                        q[j].i--;
                q.splice(i, 1),
                n--,
                i--
            } else
                o.x = d3_interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
        for (; n > i; )
            o = q.pop(),
            null  == s[o.i + 1] ? s[o.i] = o.x : (s[o.i] = o.x + s[o.i + 1],
            s.splice(o.i + 1, 1)),
            n--;
        return 1 === s.length ? null  == s[0] ? (o = q[0].x,
        function(t) {
            return o(t) + ""
        }
        ) : function() {
            return b
        }
         : function(t) {
            for (i = 0; n > i; ++i)
                s[(o = q[i]).i] = o.x(t);
            return s.join("")
        }
    }
    function d3_interpolate(a, b) {
        for (var f, i = d3.interpolators.length; --i >= 0 && !(f = d3.interpolators[i](a, b)); )
            ;
        return f
    }
    function d3_interpolateArray(a, b) {
        var i, x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length);
        for (i = 0; n0 > i; ++i)
            x.push(d3_interpolate(a[i], b[i]));
        for (; na > i; ++i)
            c[i] = a[i];
        for (; nb > i; ++i)
            c[i] = b[i];
        return function(t) {
            for (i = 0; n0 > i; ++i)
                c[i] = x[i](t);
            return c
        }
    }
    function d3_ease_clamp(f) {
        return function(t) {
            return 0 >= t ? 0 : t >= 1 ? 1 : f(t)
        }
    }
    function d3_ease_reverse(f) {
        return function(t) {
            return 1 - f(1 - t)
        }
    }
    function d3_ease_reflect(f) {
        return function(t) {
            return .5 * (.5 > t ? f(2 * t) : 2 - f(2 - 2 * t))
        }
    }
    function d3_ease_quad(t) {
        return t * t
    }
    function d3_ease_cubic(t) {
        return t * t * t
    }
    function d3_ease_cubicInOut(t) {
        if (0 >= t)
            return 0;
        if (t >= 1)
            return 1;
        var t2 = t * t
          , t3 = t2 * t;
        return 4 * (.5 > t ? t3 : 3 * (t - t2) + t3 - .75)
    }
    function d3_ease_poly(e) {
        return function(t) {
            return Math.pow(t, e)
        }
    }
    function d3_ease_sin(t) {
        return 1 - Math.cos(t * halfπ)
    }
    function d3_ease_exp(t) {
        return Math.pow(2, 10 * (t - 1))
    }
    function d3_ease_circle(t) {
        return 1 - Math.sqrt(1 - t * t)
    }
    function d3_ease_elastic(a, p) {
        var s;
        return arguments.length < 2 && (p = .45),
        arguments.length ? s = p / τ * Math.asin(1 / a) : (a = 1,
        s = p / 4),
        function(t) {
            return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p)
        }
    }
    function d3_ease_back(s) {
        return s || (s = 1.70158),
        function(t) {
            return t * t * ((s + 1) * t - s)
        }
    }
    function d3_ease_bounce(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }
    function d3_interpolateHcl(a, b) {
        a = d3.hcl(a),
        b = d3.hcl(b);
        var ah = a.h
          , ac = a.c
          , al = a.l
          , bh = b.h - ah
          , bc = b.c - ac
          , bl = b.l - al;
        return isNaN(bc) && (bc = 0,
        ac = isNaN(ac) ? b.c : ac),
        isNaN(bh) ? (bh = 0,
        ah = isNaN(ah) ? b.h : ah) : bh > 180 ? bh -= 360 : -180 > bh && (bh += 360),
        function(t) {
            return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + ""
        }
    }
    function d3_interpolateHsl(a, b) {
        a = d3.hsl(a),
        b = d3.hsl(b);
        var ah = a.h
          , as = a.s
          , al = a.l
          , bh = b.h - ah
          , bs = b.s - as
          , bl = b.l - al;
        return isNaN(bs) && (bs = 0,
        as = isNaN(as) ? b.s : as),
        isNaN(bh) ? (bh = 0,
        ah = isNaN(ah) ? b.h : ah) : bh > 180 ? bh -= 360 : -180 > bh && (bh += 360),
        function(t) {
            return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + ""
        }
    }
    function d3_interpolateLab(a, b) {
        a = d3.lab(a),
        b = d3.lab(b);
        var al = a.l
          , aa = a.a
          , ab = a.b
          , bl = b.l - al
          , ba = b.a - aa
          , bb = b.b - ab;
        return function(t) {
            return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + ""
        }
    }
    function d3_interpolateRound(a, b) {
        return b -= a,
        function(t) {
            return Math.round(a + b * t)
        }
    }
    function d3_transform(m) {
        var r0 = [m.a, m.b]
          , r1 = [m.c, m.d]
          , kx = d3_transformNormalize(r0)
          , kz = d3_transformDot(r0, r1)
          , ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
        r0[0] * r1[1] < r1[0] * r0[1] && (r0[0] *= -1,
        r0[1] *= -1,
        kx *= -1,
        kz *= -1),
        this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees,
        this.translate = [m.e, m.f],
        this.scale = [kx, ky],
        this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0
    }
    function d3_transformDot(a, b) {
        return a[0] * b[0] + a[1] * b[1]
    }
    function d3_transformNormalize(a) {
        var k = Math.sqrt(d3_transformDot(a, a));
        return k && (a[0] /= k,
        a[1] /= k),
        k
    }
    function d3_transformCombine(a, b, k) {
        return a[0] += k * b[0],
        a[1] += k * b[1],
        a
    }
    function d3_interpolateTransform(a, b) {
        var n, s = [], q = [], A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
        return ta[0] != tb[0] || ta[1] != tb[1] ? (s.push("translate(", null , ",", null , ")"),
        q.push({
            i: 1,
            x: d3_interpolateNumber(ta[0], tb[0])
        }, {
            i: 3,
            x: d3_interpolateNumber(ta[1], tb[1])
        })) : tb[0] || tb[1] ? s.push("translate(" + tb + ")") : s.push(""),
        ra != rb ? (ra - rb > 180 ? rb += 360 : rb - ra > 180 && (ra += 360),
        q.push({
            i: s.push(s.pop() + "rotate(", null , ")") - 2,
            x: d3_interpolateNumber(ra, rb)
        })) : rb && s.push(s.pop() + "rotate(" + rb + ")"),
        wa != wb ? q.push({
            i: s.push(s.pop() + "skewX(", null , ")") - 2,
            x: d3_interpolateNumber(wa, wb)
        }) : wb && s.push(s.pop() + "skewX(" + wb + ")"),
        ka[0] != kb[0] || ka[1] != kb[1] ? (n = s.push(s.pop() + "scale(", null , ",", null , ")"),
        q.push({
            i: n - 4,
            x: d3_interpolateNumber(ka[0], kb[0])
        }, {
            i: n - 2,
            x: d3_interpolateNumber(ka[1], kb[1])
        })) : (1 != kb[0] || 1 != kb[1]) && s.push(s.pop() + "scale(" + kb + ")"),
        n = q.length,
        function(t) {
            for (var o, i = -1; ++i < n; )
                s[(o = q[i]).i] = o.x(t);
            return s.join("")
        }
    }
    function d3_uninterpolateNumber(a, b) {
        return b = b - (a = +a) ? 1 / (b - a) : 0,
        function(x) {
            return (x - a) * b
        }
    }
    function d3_uninterpolateClamp(a, b) {
        return b = b - (a = +a) ? 1 / (b - a) : 0,
        function(x) {
            return Math.max(0, Math.min(1, (x - a) * b))
        }
    }
    function d3_layout_bundlePath(link) {
        for (var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [start]; start !== lca; )
            start = start.parent,
            points.push(start);
        for (var k = points.length; end !== lca; )
            points.splice(k, 0, end),
            end = end.parent;
        return points
    }
    function d3_layout_bundleAncestors(node) {
        for (var ancestors = [], parent = node.parent; null  != parent; )
            ancestors.push(node),
            node = parent,
            parent = parent.parent;
        return ancestors.push(node),
        ancestors
    }
    function d3_layout_bundleLeastCommonAncestor(a, b) {
        if (a === b)
            return a;
        for (var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null ; aNode === bNode; )
            sharedNode = aNode,
            aNode = aNodes.pop(),
            bNode = bNodes.pop();
        return sharedNode
    }
    function d3_layout_forceDragstart(d) {
        d.fixed |= 2
    }
    function d3_layout_forceDragend(d) {
        d.fixed &= -7
    }
    function d3_layout_forceMouseover(d) {
        d.fixed |= 4,
        d.px = d.x,
        d.py = d.y
    }
    function d3_layout_forceMouseout(d) {
        d.fixed &= -5
    }
    function d3_layout_forceAccumulate(quad, alpha, charges) {
        var cx = 0
          , cy = 0;
        if (quad.charge = 0,
        !quad.leaf)
            for (var c, nodes = quad.nodes, n = nodes.length, i = -1; ++i < n; )
                c = nodes[i],
                null  != c && (d3_layout_forceAccumulate(c, alpha, charges),
                quad.charge += c.charge,
                cx += c.charge * c.cx,
                cy += c.charge * c.cy);
        if (quad.point) {
            quad.leaf || (quad.point.x += Math.random() - .5,
            quad.point.y += Math.random() - .5);
            var k = alpha * charges[quad.point.index];
            quad.charge += quad.pointCharge = k,
            cx += k * quad.point.x,
            cy += k * quad.point.y
        }
        quad.cx = cx / quad.charge,
        quad.cy = cy / quad.charge
    }
    function d3_layout_hierarchyRebind(object, hierarchy) {
        return d3.rebind(object, hierarchy, "sort", "children", "value"),
        object.nodes = object,
        object.links = d3_layout_hierarchyLinks,
        object
    }
    function d3_layout_hierarchyChildren(d) {
        return d.children
    }
    function d3_layout_hierarchyValue(d) {
        return d.value
    }
    function d3_layout_hierarchySort(a, b) {
        return b.value - a.value
    }
    function d3_layout_hierarchyLinks(nodes) {
        return d3.merge(nodes.map(function(parent) {
            return (parent.children || []).map(function(child) {
                return {
                    source: parent,
                    target: child
                }
            }
            )
        }
        ))
    }
    function d3_layout_stackX(d) {
        return d.x
    }
    function d3_layout_stackY(d) {
        return d.y
    }
    function d3_layout_stackOut(d, y0, y) {
        d.y0 = y0,
        d.y = y
    }
    function d3_layout_stackOrderDefault(data) {
        return d3.range(data.length)
    }
    function d3_layout_stackOffsetZero(data) {
        for (var j = -1, m = data[0].length, y0 = []; ++j < m; )
            y0[j] = 0;
        return y0
    }
    function d3_layout_stackMaxIndex(array) {
        for (var k, i = 1, j = 0, v = array[0][1], n = array.length; n > i; ++i)
            (k = array[i][1]) > v && (j = i,
            v = k);
        return j
    }
    function d3_layout_stackReduceSum(d) {
        return d.reduce(d3_layout_stackSum, 0)
    }
    function d3_layout_stackSum(p, d) {
        return p + d[1]
    }
    function d3_layout_histogramBinSturges(range, values) {
        return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1))
    }
    function d3_layout_histogramBinFixed(range, n) {
        for (var x = -1, b = +range[0], m = (range[1] - b) / n, f = []; ++x <= n; )
            f[x] = m * x + b;
        return f
    }
    function d3_layout_histogramRange(values) {
        return [d3.min(values), d3.max(values)]
    }
    function d3_layout_treeSeparation(a, b) {
        return a.parent == b.parent ? 1 : 2
    }
    function d3_layout_treeLeft(node) {
        var children = node.children;
        return children && children.length ? children[0] : node._tree.thread
    }
    function d3_layout_treeRight(node) {
        var n, children = node.children;
        return children && (n = children.length) ? children[n - 1] : node._tree.thread
    }
    function d3_layout_treeSearch(node, compare) {
        var children = node.children;
        if (children && (n = children.length))
            for (var child, n, i = -1; ++i < n; )
                compare(child = d3_layout_treeSearch(children[i], compare), node) > 0 && (node = child);
        return node
    }
    function d3_layout_treeRightmost(a, b) {
        return a.x - b.x
    }
    function d3_layout_treeLeftmost(a, b) {
        return b.x - a.x
    }
    function d3_layout_treeDeepest(a, b) {
        return a.depth - b.depth
    }
    function d3_layout_treeVisitAfter(node, callback) {
        function visit(node, previousSibling) {
            var children = node.children;
            if (children && (n = children.length))
                for (var child, n, previousChild = null , i = -1; ++i < n; )
                    child = children[i],
                    visit(child, previousChild),
                    previousChild = child;
            callback(node, previousSibling)
        }
        visit(node, null )
    }
    function d3_layout_treeShift(node) {
        for (var child, shift = 0, change = 0, children = node.children, i = children.length; --i >= 0; )
            child = children[i]._tree,
            child.prelim += shift,
            child.mod += shift,
            shift += child.shift + (change += child.change)
    }
    function d3_layout_treeMove(ancestor, node, shift) {
        ancestor = ancestor._tree,
        node = node._tree;
        var change = shift / (node.number - ancestor.number);
        ancestor.change += change,
        node.change -= change,
        node.shift += shift,
        node.prelim += shift,
        node.mod += shift
    }
    function d3_layout_treeAncestor(vim, node, ancestor) {
        return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor
    }
    function d3_layout_packSort(a, b) {
        return a.value - b.value
    }
    function d3_layout_packInsert(a, b) {
        var c = a._pack_next;
        a._pack_next = b,
        b._pack_prev = a,
        b._pack_next = c,
        c._pack_prev = b
    }
    function d3_layout_packSplice(a, b) {
        a._pack_next = b,
        b._pack_prev = a
    }
    function d3_layout_packIntersects(a, b) {
        var dx = b.x - a.x
          , dy = b.y - a.y
          , dr = a.r + b.r;
        return .999 * dr * dr > dx * dx + dy * dy
    }
    function d3_layout_packSiblings(node) {
        function bound(node) {
            xMin = Math.min(node.x - node.r, xMin),
            xMax = Math.max(node.x + node.r, xMax),
            yMin = Math.min(node.y - node.r, yMin),
            yMax = Math.max(node.y + node.r, yMax)
        }
        if ((nodes = node.children) && (n = nodes.length)) {
            var nodes, a, b, c, i, j, k, n, xMin = 1 / 0, xMax = -(1 / 0), yMin = 1 / 0, yMax = -(1 / 0);
            if (nodes.forEach(d3_layout_packLink),
            a = nodes[0],
            a.x = -a.r,
            a.y = 0,
            bound(a),
            n > 1 && (b = nodes[1],
            b.x = b.r,
            b.y = 0,
            bound(b),
            n > 2))
                for (c = nodes[2],
                d3_layout_packPlace(a, b, c),
                bound(c),
                d3_layout_packInsert(a, c),
                a._pack_prev = c,
                d3_layout_packInsert(c, b),
                b = a._pack_next,
                i = 3; n > i; i++) {
                    d3_layout_packPlace(a, b, c = nodes[i]);
                    var isect = 0
                      , s1 = 1
                      , s2 = 1;
                    for (j = b._pack_next; j !== b; j = j._pack_next,
                    s1++)
                        if (d3_layout_packIntersects(j, c)) {
                            isect = 1;
                            break
                        }
                    if (1 == isect)
                        for (k = a._pack_prev; k !== j._pack_prev && !d3_layout_packIntersects(k, c); k = k._pack_prev,
                        s2++)
                            ;
                    isect ? (s2 > s1 || s1 == s2 && b.r < a.r ? d3_layout_packSplice(a, b = j) : d3_layout_packSplice(a = k, b),
                    i--) : (d3_layout_packInsert(a, c),
                    b = c,
                    bound(c))
                }
            var cx = (xMin + xMax) / 2
              , cy = (yMin + yMax) / 2
              , cr = 0;
            for (i = 0; n > i; i++)
                c = nodes[i],
                c.x -= cx,
                c.y -= cy,
                cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
            node.r = cr,
            nodes.forEach(d3_layout_packUnlink)
        }
    }
    function d3_layout_packLink(node) {
        node._pack_next = node._pack_prev = node
    }
    function d3_layout_packUnlink(node) {
        delete node._pack_next,
        delete node._pack_prev
    }
    function d3_layout_packTransform(node, x, y, k) {
        var children = node.children;
        if (node.x = x += k * node.x,
        node.y = y += k * node.y,
        node.r *= k,
        children)
            for (var i = -1, n = children.length; ++i < n; )
                d3_layout_packTransform(children[i], x, y, k);
    }
    function d3_layout_packPlace(a, b, c) {
        var db = a.r + c.r
          , dx = b.x - a.x
          , dy = b.y - a.y;
        if (db && (dx || dy)) {
            var da = b.r + c.r
              , dc = dx * dx + dy * dy;
            da *= da,
            db *= db;
            var x = .5 + (db - da) / (2 * dc)
              , y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
            c.x = a.x + x * dx + y * dy,
            c.y = a.y + x * dy - y * dx
        } else
            c.x = a.x + db,
            c.y = a.y
    }
    function d3_layout_clusterY(children) {
        return 1 + d3.max(children, function(child) {
            return child.y
        }
        )
    }
    function d3_layout_clusterX(children) {
        return children.reduce(function(x, child) {
            return x + child.x
        }
        , 0) / children.length
    }
    function d3_layout_clusterLeft(node) {
        var children = node.children;
        return children && children.length ? d3_layout_clusterLeft(children[0]) : node
    }
    function d3_layout_clusterRight(node) {
        var n, children = node.children;
        return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node
    }
    function d3_layout_treemapPadNull(node) {
        return {
            x: node.x,
            y: node.y,
            dx: node.dx,
            dy: node.dy
        }
    }
    function d3_layout_treemapPad(node, padding) {
        var x = node.x + padding[3]
          , y = node.y + padding[0]
          , dx = node.dx - padding[1] - padding[3]
          , dy = node.dy - padding[0] - padding[2];
        return 0 > dx && (x += dx / 2,
        dx = 0),
        0 > dy && (y += dy / 2,
        dy = 0),
        {
            x: x,
            y: y,
            dx: dx,
            dy: dy
        }
    }
    function d3_scaleExtent(domain) {
        var start = domain[0]
          , stop = domain[domain.length - 1];
        return stop > start ? [start, stop] : [stop, start]
    }
    function d3_scaleRange(scale) {
        return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range())
    }
    function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
        var u = uninterpolate(domain[0], domain[1])
          , i = interpolate(range[0], range[1]);
        return function(x) {
            return i(u(x))
        }
    }
    function d3_scale_nice(domain, nice) {
        var dx, i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1];
        return x0 > x1 && (dx = i0,
        i0 = i1,
        i1 = dx,
        dx = x0,
        x0 = x1,
        x1 = dx),
        domain[i0] = nice.floor(x0),
        domain[i1] = nice.ceil(x1),
        domain
    }
    function d3_scale_niceStep(step) {
        return step ? {
            floor: function(x) {
                return Math.floor(x / step) * step
            },
            ceil: function(x) {
                return Math.ceil(x / step) * step
            }
        } : d3_scale_niceIdentity
    }
    function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
        var u = []
          , i = []
          , j = 0
          , k = Math.min(domain.length, range.length) - 1;
        for (domain[k] < domain[0] && (domain = domain.slice().reverse(),
        range = range.slice().reverse()); ++j <= k; )
            u.push(uninterpolate(domain[j - 1], domain[j])),
            i.push(interpolate(range[j - 1], range[j]));
        return function(x) {
            var j = d3.bisect(domain, x, 1, k) - 1;
            return i[j](u[j](x))
        }
    }
    function d3_scale_linear(domain, range, interpolate, clamp) {
        function rescale() {
            var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear
              , uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
            return output = linear(domain, range, uninterpolate, interpolate),
            input = linear(range, domain, uninterpolate, d3_interpolate),
            scale
        }
        function scale(x) {
            return output(x)
        }
        var output, input;
        return scale.invert = function(y) {
            return input(y)
        }
        ,
        scale.domain = function(x) {
            return arguments.length ? (domain = x.map(Number),
            rescale()) : domain
        }
        ,
        scale.range = function(x) {
            return arguments.length ? (range = x,
            rescale()) : range
        }
        ,
        scale.rangeRound = function(x) {
            return scale.range(x).interpolate(d3_interpolateRound)
        }
        ,
        scale.clamp = function(x) {
            return arguments.length ? (clamp = x,
            rescale()) : clamp
        }
        ,
        scale.interpolate = function(x) {
            return arguments.length ? (interpolate = x,
            rescale()) : interpolate
        }
        ,
        scale.ticks = function(m) {
            return d3_scale_linearTicks(domain, m)
        }
        ,
        scale.tickFormat = function(m, format) {
            return d3_scale_linearTickFormat(domain, m, format)
        }
        ,
        scale.nice = function(m) {
            return d3_scale_linearNice(domain, m),
            rescale()
        }
        ,
        scale.copy = function() {
            return d3_scale_linear(domain, range, interpolate, clamp)
        }
        ,
        rescale()
    }
    function d3_scale_linearRebind(scale, linear) {
        return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp")
    }
    function d3_scale_linearNice(domain, m) {
        return d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]))
    }
    function d3_scale_linearTickRange(domain, m) {
        null  == m && (m = 10);
        var extent = d3_scaleExtent(domain)
          , span = extent[1] - extent[0]
          , step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10))
          , err = m / span * step;
        return .15 >= err ? step *= 10 : .35 >= err ? step *= 5 : .75 >= err && (step *= 2),
        extent[0] = Math.ceil(extent[0] / step) * step,
        extent[1] = Math.floor(extent[1] / step) * step + .5 * step,
        extent[2] = step,
        extent
    }
    function d3_scale_linearTicks(domain, m) {
        return d3.range.apply(d3, d3_scale_linearTickRange(domain, m))
    }
    function d3_scale_linearTickFormat(domain, m, format) {
        var range = d3_scale_linearTickRange(domain, m);
        return d3.format(format ? format.replace(d3_format_re, function(a, b, c, d, e, f, g, h, i, j) {
            return [b, c, d, e, f, g, h, i || "." + d3_scale_linearFormatPrecision(j, range), j].join("")
        }
        ) : ",." + d3_scale_linearPrecision(range[2]) + "f")
    }
    function d3_scale_linearPrecision(value) {
        return -Math.floor(Math.log(value) / Math.LN10 + .01)
    }
    function d3_scale_linearFormatPrecision(type, range) {
        var p = d3_scale_linearPrecision(range[2]);
        return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(Math.abs(range[0]), Math.abs(range[1])))) + +("e" !== type) : p - 2 * ("%" === type)
    }
    function d3_scale_log(linear, base, positive, domain) {
        function log(x) {
            return (positive ? Math.log(0 > x ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base)
        }
        function pow(x) {
            return positive ? Math.pow(base, x) : -Math.pow(base, -x)
        }
        function scale(x) {
            return linear(log(x))
        }
        return scale.invert = function(x) {
            return pow(linear.invert(x))
        }
        ,
        scale.domain = function(x) {
            return arguments.length ? (positive = x[0] >= 0,
            linear.domain((domain = x.map(Number)).map(log)),
            scale) : domain
        }
        ,
        scale.base = function(_) {
            return arguments.length ? (base = +_,
            linear.domain(domain.map(log)),
            scale) : base
        }
        ,
        scale.nice = function() {
            var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
            return linear.domain(niced),
            domain = niced.map(pow),
            scale
        }
        ,
        scale.ticks = function() {
            var extent = d3_scaleExtent(domain)
              , ticks = []
              , u = extent[0]
              , v = extent[1]
              , i = Math.floor(log(u))
              , j = Math.ceil(log(v))
              , n = base % 1 ? 2 : base;
            if (isFinite(j - i)) {
                if (positive) {
                    for (; j > i; i++)
                        for (var k = 1; n > k; k++)
                            ticks.push(pow(i) * k);
                    ticks.push(pow(i))
                } else
                    for (ticks.push(pow(i)); i++ < j; )
                        for (var k = n - 1; k > 0; k--)
                            ticks.push(pow(i) * k);
                for (i = 0; ticks[i] < u; i++)
                    ;
                for (j = ticks.length; ticks[j - 1] > v; j--)
                    ;
                ticks = ticks.slice(i, j)
            }
            return ticks
        }
        ,
        scale.tickFormat = function(n, format) {
            if (!arguments.length)
                return d3_scale_logFormat;
            arguments.length < 2 ? format = d3_scale_logFormat : "function" != typeof format && (format = d3.format(format));
            var e, k = Math.max(.1, n / scale.ticks().length), f = positive ? (e = 1e-12,
            Math.ceil) : (e = -1e-12,
            Math.floor);
            return function(d) {
                return d / pow(f(log(d) + e)) <= k ? format(d) : ""
            }
        }
        ,
        scale.copy = function() {
            return d3_scale_log(linear.copy(), base, positive, domain)
        }
        ,
        d3_scale_linearRebind(scale, linear)
    }
    function d3_scale_pow(linear, exponent, domain) {
        function scale(x) {
            return linear(powp(x))
        }
        var powp = d3_scale_powPow(exponent)
          , powb = d3_scale_powPow(1 / exponent);
        return scale.invert = function(x) {
            return powb(linear.invert(x))
        }
        ,
        scale.domain = function(x) {
            return arguments.length ? (linear.domain((domain = x.map(Number)).map(powp)),
            scale) : domain
        }
        ,
        scale.ticks = function(m) {
            return d3_scale_linearTicks(domain, m)
        }
        ,
        scale.tickFormat = function(m, format) {
            return d3_scale_linearTickFormat(domain, m, format)
        }
        ,
        scale.nice = function(m) {
            return scale.domain(d3_scale_linearNice(domain, m))
        }
        ,
        scale.exponent = function(x) {
            return arguments.length ? (powp = d3_scale_powPow(exponent = x),
            powb = d3_scale_powPow(1 / exponent),
            linear.domain(domain.map(powp)),
            scale) : exponent
        }
        ,
        scale.copy = function() {
            return d3_scale_pow(linear.copy(), exponent, domain)
        }
        ,
        d3_scale_linearRebind(scale, linear)
    }
    function d3_scale_powPow(e) {
        return function(x) {
            return 0 > x ? -Math.pow(-x, e) : Math.pow(x, e)
        }
    }
    function d3_scale_ordinal(domain, ranger) {
        function scale(x) {
            return range[((index.get(x) || "range" === ranger.t && index.set(x, domain.push(x))) - 1) % range.length]
        }
        function steps(start, step) {
            return d3.range(domain.length).map(function(i) {
                return start + step * i
            }
            )
        }
        var index, range, rangeBand;
        return scale.domain = function(x) {
            if (!arguments.length)
                return domain;
            domain = [],
            index = new d3_Map;
            for (var xi, i = -1, n = x.length; ++i < n; )
                index.has(xi = x[i]) || index.set(xi, domain.push(xi));
            return scale[ranger.t].apply(scale, ranger.a)
        }
        ,
        scale.range = function(x) {
            return arguments.length ? (range = x,
            rangeBand = 0,
            ranger = {
                t: "range",
                a: arguments
            },
            scale) : range
        }
        ,
        scale.rangePoints = function(x, padding) {
            arguments.length < 2 && (padding = 0);
            var start = x[0]
              , stop = x[1]
              , step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
            return range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step),
            rangeBand = 0,
            ranger = {
                t: "rangePoints",
                a: arguments
            },
            scale
        }
        ,
        scale.rangeBands = function(x, padding, outerPadding) {
            arguments.length < 2 && (padding = 0),
            arguments.length < 3 && (outerPadding = padding);
            var reverse = x[1] < x[0]
              , start = x[reverse - 0]
              , stop = x[1 - reverse]
              , step = (stop - start) / (domain.length - padding + 2 * outerPadding);
            return range = steps(start + step * outerPadding, step),
            reverse && range.reverse(),
            rangeBand = step * (1 - padding),
            ranger = {
                t: "rangeBands",
                a: arguments
            },
            scale
        }
        ,
        scale.rangeRoundBands = function(x, padding, outerPadding) {
            arguments.length < 2 && (padding = 0),
            arguments.length < 3 && (outerPadding = padding);
            var reverse = x[1] < x[0]
              , start = x[reverse - 0]
              , stop = x[1 - reverse]
              , step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding))
              , error = stop - start - (domain.length - padding) * step;
            return range = steps(start + Math.round(error / 2), step),
            reverse && range.reverse(),
            rangeBand = Math.round(step * (1 - padding)),
            ranger = {
                t: "rangeRoundBands",
                a: arguments
            },
            scale
        }
        ,
        scale.rangeBand = function() {
            return rangeBand
        }
        ,
        scale.rangeExtent = function() {
            return d3_scaleExtent(ranger.a[0])
        }
        ,
        scale.copy = function() {
            return d3_scale_ordinal(domain, ranger)
        }
        ,
        scale.domain(domain)
    }
    function d3_scale_quantile(domain, range) {
        function rescale() {
            var k = 0
              , q = range.length;
            for (thresholds = []; ++k < q; )
                thresholds[k - 1] = d3.quantile(domain, k / q);
            return scale
        }
        function scale(x) {
            return isNaN(x = +x) ? void 0 : range[d3.bisect(thresholds, x)]
        }
        var thresholds;
        return scale.domain = function(x) {
            return arguments.length ? (domain = x.filter(function(d) {
                return !isNaN(d)
            }
            ).sort(d3.ascending),
            rescale()) : domain
        }
        ,
        scale.range = function(x) {
            return arguments.length ? (range = x,
            rescale()) : range
        }
        ,
        scale.quantiles = function() {
            return thresholds
        }
        ,
        scale.invertExtent = function(y) {
            return y = range.indexOf(y),
            0 > y ? [NaN, NaN] : [y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1]]
        }
        ,
        scale.copy = function() {
            return d3_scale_quantile(domain, range)
        }
        ,
        rescale()
    }
    function d3_scale_quantize(x0, x1, range) {
        function scale(x) {
            return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))]
        }
        function rescale() {
            return kx = range.length / (x1 - x0),
            i = range.length - 1,
            scale
        }
        var kx, i;
        return scale.domain = function(x) {
            return arguments.length ? (x0 = +x[0],
            x1 = +x[x.length - 1],
            rescale()) : [x0, x1]
        }
        ,
        scale.range = function(x) {
            return arguments.length ? (range = x,
            rescale()) : range
        }
        ,
        scale.invertExtent = function(y) {
            return y = range.indexOf(y),
            y = 0 > y ? NaN : y / kx + x0,
            [y, y + 1 / kx]
        }
        ,
        scale.copy = function() {
            return d3_scale_quantize(x0, x1, range)
        }
        ,
        rescale()
    }
    function d3_scale_threshold(domain, range) {
        function scale(x) {
            return x >= x ? range[d3.bisect(domain, x)] : void 0
        }
        return scale.domain = function(_) {
            return arguments.length ? (domain = _,
            scale) : domain
        }
        ,
        scale.range = function(_) {
            return arguments.length ? (range = _,
            scale) : range
        }
        ,
        scale.invertExtent = function(y) {
            return y = range.indexOf(y),
            [domain[y - 1], domain[y]]
        }
        ,
        scale.copy = function() {
            return d3_scale_threshold(domain, range)
        }
        ,
        scale
    }
    function d3_scale_identity(domain) {
        function identity(x) {
            return +x
        }
        return identity.invert = identity,
        identity.domain = identity.range = function(x) {
            return arguments.length ? (domain = x.map(identity),
            identity) : domain
        }
        ,
        identity.ticks = function(m) {
            return d3_scale_linearTicks(domain, m)
        }
        ,
        identity.tickFormat = function(m, format) {
            return d3_scale_linearTickFormat(domain, m, format)
        }
        ,
        identity.copy = function() {
            return d3_scale_identity(domain)
        }
        ,
        identity
    }
    function d3_svg_arcInnerRadius(d) {
        return d.innerRadius
    }
    function d3_svg_arcOuterRadius(d) {
        return d.outerRadius
    }
    function d3_svg_arcStartAngle(d) {
        return d.startAngle
    }
    function d3_svg_arcEndAngle(d) {
        return d.endAngle
    }
    function d3_svg_line(projection) {
        function line(data) {
            function segment() {
                segments.push("M", interpolate(projection(points), tension))
            }
            for (var d, segments = [], points = [], i = -1, n = data.length, fx = d3_functor(x), fy = d3_functor(y); ++i < n; )
                defined.call(this, d = data[i], i) ? points.push([+fx.call(this, d, i), +fy.call(this, d, i)]) : points.length && (segment(),
                points = []);
            return points.length && segment(),
            segments.length ? segments.join("") : null 
        }
        var x = d3_geom_pointX
          , y = d3_geom_pointY
          , defined = d3_true
          , interpolate = d3_svg_lineLinear
          , interpolateKey = interpolate.key
          , tension = .7;
        return line.x = function(_) {
            return arguments.length ? (x = _,
            line) : x
        }
        ,
        line.y = function(_) {
            return arguments.length ? (y = _,
            line) : y
        }
        ,
        line.defined = function(_) {
            return arguments.length ? (defined = _,
            line) : defined
        }
        ,
        line.interpolate = function(_) {
            return arguments.length ? (interpolateKey = "function" == typeof _ ? interpolate = _ : (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key,
            line) : interpolateKey
        }
        ,
        line.tension = function(_) {
            return arguments.length ? (tension = _,
            line) : tension
        }
        ,
        line
    }
    function d3_svg_lineLinear(points) {
        return points.join("L")
    }
    function d3_svg_lineLinearClosed(points) {
        return d3_svg_lineLinear(points) + "Z"
    }
    function d3_svg_lineStep(points) {
        for (var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]]; ++i < n; )
            path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
        return n > 1 && path.push("H", p[0]),
        path.join("")
    }
    function d3_svg_lineStepBefore(points) {
        for (var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]]; ++i < n; )
            path.push("V", (p = points[i])[1], "H", p[0]);
        return path.join("")
    }
    function d3_svg_lineStepAfter(points) {
        for (var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]]; ++i < n; )
            path.push("H", (p = points[i])[0], "V", p[1]);
        return path.join("")
    }
    function d3_svg_lineCardinalOpen(points, tension) {
        return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension))
    }
    function d3_svg_lineCardinalClosed(points, tension) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]),
        points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension))
    }
    function d3_svg_lineCardinal(points, tension) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension))
    }
    function d3_svg_lineHermite(points, tangents) {
        if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2)
            return d3_svg_lineLinear(points);
        var quad = points.length != tangents.length
          , path = ""
          , p0 = points[0]
          , p = points[1]
          , t0 = tangents[0]
          , t = t0
          , pi = 1;
        if (quad && (path += "Q" + (p[0] - 2 * t0[0] / 3) + "," + (p[1] - 2 * t0[1] / 3) + "," + p[0] + "," + p[1],
        p0 = points[1],
        pi = 2),
        tangents.length > 1) {
            t = tangents[1],
            p = points[pi],
            pi++,
            path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            for (var i = 2; i < tangents.length; i++,
            pi++)
                p = points[pi],
                t = tangents[i],
                path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1]
        }
        if (quad) {
            var lp = points[pi];
            path += "Q" + (p[0] + 2 * t[0] / 3) + "," + (p[1] + 2 * t[1] / 3) + "," + lp[0] + "," + lp[1]
        }
        return path
    }
    function d3_svg_lineCardinalTangents(points, tension) {
        for (var p0, tangents = [], a = (1 - tension) / 2, p1 = points[0], p2 = points[1], i = 1, n = points.length; ++i < n; )
            p0 = p1,
            p1 = p2,
            p2 = points[i],
            tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
        return tangents
    }
    function d3_svg_lineBasis(points) {
        if (points.length < 3)
            return d3_svg_lineLinear(points);
        var i = 1
          , n = points.length
          , pi = points[0]
          , x0 = pi[0]
          , y0 = pi[1]
          , px = [x0, x0, x0, (pi = points[1])[0]]
          , py = [y0, y0, y0, pi[1]]
          , path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
        for (points.push(points[n - 1]); ++i <= n; )
            pi = points[i],
            px.shift(),
            px.push(pi[0]),
            py.shift(),
            py.push(pi[1]),
            d3_svg_lineBasisBezier(path, px, py);
        return points.pop(),
        path.push("L", pi),
        path.join("")
    }
    function d3_svg_lineBasisOpen(points) {
        if (points.length < 4)
            return d3_svg_lineLinear(points);
        for (var pi, path = [], i = -1, n = points.length, px = [0], py = [0]; ++i < 3; )
            pi = points[i],
            px.push(pi[0]),
            py.push(pi[1]);
        for (path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)),
        --i; ++i < n; )
            pi = points[i],
            px.shift(),
            px.push(pi[0]),
            py.shift(),
            py.push(pi[1]),
            d3_svg_lineBasisBezier(path, px, py);
        return path.join("")
    }
    function d3_svg_lineBasisClosed(points) {
        for (var path, pi, i = -1, n = points.length, m = n + 4, px = [], py = []; ++i < 4; )
            pi = points[i % n],
            px.push(pi[0]),
            py.push(pi[1]);
        for (path = [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)],
        --i; ++i < m; )
            pi = points[i % n],
            px.shift(),
            px.push(pi[0]),
            py.shift(),
            py.push(pi[1]),
            d3_svg_lineBasisBezier(path, px, py);
        return path.join("")
    }
    function d3_svg_lineBundle(points, tension) {
        var n = points.length - 1;
        if (n)
            for (var p, t, x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1; ++i <= n; )
                p = points[i],
                t = i / n,
                p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx),
                p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
        return d3_svg_lineBasis(points)
    }
    function d3_svg_lineDot4(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
    }
    function d3_svg_lineBasisBezier(path, x, y) {
        path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y))
    }
    function d3_svg_lineSlope(p0, p1) {
        return (p1[1] - p0[1]) / (p1[0] - p0[0])
    }
    function d3_svg_lineFiniteDifferences(points) {
        for (var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1); ++i < j; )
            m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
        return m[i] = d,
        m
    }
    function d3_svg_lineMonotoneTangents(points) {
        for (var d, a, b, s, tangents = [], m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1; ++i < j; )
            d = d3_svg_lineSlope(points[i], points[i + 1]),
            abs(d) < ε ? m[i] = m[i + 1] = 0 : (a = m[i] / d,
            b = m[i + 1] / d,
            s = a * a + b * b,
            s > 9 && (s = 3 * d / Math.sqrt(s),
            m[i] = s * a,
            m[i + 1] = s * b));
        for (i = -1; ++i <= j; )
            s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i])),
            tangents.push([s || 0, m[i] * s || 0]);
        return tangents
    }
    function d3_svg_lineMonotone(points) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points))
    }
    function d3_svg_lineRadial(points) {
        for (var point, r, a, i = -1, n = points.length; ++i < n; )
            point = points[i],
            r = point[0],
            a = point[1] + d3_svg_arcOffset,
            point[0] = r * Math.cos(a),
            point[1] = r * Math.sin(a);
        return points
    }
    function d3_svg_area(projection) {
        function area(data) {
            function segment() {
                segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z")
            }
            for (var d, x, y, segments = [], points0 = [], points1 = [], i = -1, n = data.length, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
                return x
            }
             : d3_functor(x1), fy1 = y0 === y1 ? function() {
                return y
            }
             : d3_functor(y1); ++i < n; )
                defined.call(this, d = data[i], i) ? (points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]),
                points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)])) : points0.length && (segment(),
                points0 = [],
                points1 = []);
            return points0.length && segment(),
            segments.length ? segments.join("") : null 
        }
        var x0 = d3_geom_pointX
          , x1 = d3_geom_pointX
          , y0 = 0
          , y1 = d3_geom_pointY
          , defined = d3_true
          , interpolate = d3_svg_lineLinear
          , interpolateKey = interpolate.key
          , interpolateReverse = interpolate
          , L = "L"
          , tension = .7;
        return area.x = function(_) {
            return arguments.length ? (x0 = x1 = _,
            area) : x1
        }
        ,
        area.x0 = function(_) {
            return arguments.length ? (x0 = _,
            area) : x0
        }
        ,
        area.x1 = function(_) {
            return arguments.length ? (x1 = _,
            area) : x1
        }
        ,
        area.y = function(_) {
            return arguments.length ? (y0 = y1 = _,
            area) : y1
        }
        ,
        area.y0 = function(_) {
            return arguments.length ? (y0 = _,
            area) : y0
        }
        ,
        area.y1 = function(_) {
            return arguments.length ? (y1 = _,
            area) : y1
        }
        ,
        area.defined = function(_) {
            return arguments.length ? (defined = _,
            area) : defined
        }
        ,
        area.interpolate = function(_) {
            return arguments.length ? (interpolateKey = "function" == typeof _ ? interpolate = _ : (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key,
            interpolateReverse = interpolate.reverse || interpolate,
            L = interpolate.closed ? "M" : "L",
            area) : interpolateKey
        }
        ,
        area.tension = function(_) {
            return arguments.length ? (tension = _,
            area) : tension
        }
        ,
        area
    }
    function d3_svg_chordRadius(d) {
        return d.radius
    }
    function d3_svg_diagonalProjection(d) {
        return [d.x, d.y]
    }
    function d3_svg_diagonalRadialProjection(projection) {
        return function() {
            var d = projection.apply(this, arguments)
              , r = d[0]
              , a = d[1] + d3_svg_arcOffset;
            return [r * Math.cos(a), r * Math.sin(a)]
        }
    }
    function d3_svg_symbolSize() {
        return 64
    }
    function d3_svg_symbolType() {
        return "circle"
    }
    function d3_svg_symbolCircle(size) {
        var r = Math.sqrt(size / π);
        return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z"
    }
    function d3_transition(groups, id) {
        return d3_subclass(groups, d3_transitionPrototype),
        groups.id = id,
        groups
    }
    function d3_transition_tween(groups, name, value, tween) {
        var id = groups.id;
        return d3_selection_each(groups, "function" == typeof value ? function(node, i, j) {
            node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)))
        }
         : (value = tween(value),
        function(node) {
            node.__transition__[id].tween.set(name, value)
        }
        ))
    }
    function d3_transition_text(b) {
        return null  == b && (b = ""),
        function() {
            this.textContent = b
        }
    }
    function d3_transitionNode(node, i, id, inherit) {
        var lock = node.__transition__ || (node.__transition__ = {
            active: 0,
            count: 0
        })
          , transition = lock[id];
        if (!transition) {
            var time = inherit.time;
            transition = lock[id] = {
                tween: new d3_Map,
                time: time,
                ease: inherit.ease,
                delay: inherit.delay,
                duration: inherit.duration
            },
            ++lock.count,
            d3.timer(function(elapsed) {
                function start(elapsed) {
                    return lock.active > id ? stop() : (lock.active = id,
                    transition.event && transition.event.start.call(node, d, i),
                    transition.tween.forEach(function(key, value) {
                        (value = value.call(node, d, i)) && tweened.push(value)
                    }
                    ),
                    void d3.timer(function() {
                        return timer.c = tick(elapsed || 1) ? d3_true : tick,
                        1
                    }
                    , 0, time))
                }
                function tick(elapsed) {
                    if (lock.active !== id)
                        return stop();
                    for (var t = elapsed / duration, e = ease(t), n = tweened.length; n > 0; )
                        tweened[--n].call(node, e);
                    return t >= 1 ? (transition.event && transition.event.end.call(node, d, i),
                    stop()) : void 0
                }
                function stop() {
                    return --lock.count ? delete lock[id] : delete node.__transition__,
                    1
                }
                var d = node.__data__
                  , ease = transition.ease
                  , delay = transition.delay
                  , duration = transition.duration
                  , timer = d3_timer_active
                  , tweened = [];
                return timer.t = delay + time,
                elapsed >= delay ? start(elapsed - delay) : void (timer.c = start)
            }
            , 0, time)
        }
    }
    function d3_svg_axisX(selection, x) {
        selection.attr("transform", function(d) {
            return "translate(" + x(d) + ",0)"
        }
        )
    }
    function d3_svg_axisY(selection, y) {
        selection.attr("transform", function(d) {
            return "translate(0," + y(d) + ")"
        }
        )
    }
    function d3_date_utc() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }
    function d3_time_interval(local, step, number) {
        function round(date) {
            var d0 = local(date)
              , d1 = offset(d0, 1);
            return d1 - date > date - d0 ? d0 : d1
        }
        function ceil(date) {
            return step(date = local(new d3_date(date - 1)), 1),
            date
        }
        function offset(date, k) {
            return step(date = new d3_date(+date), k),
            date
        }
        function range(t0, t1, dt) {
            var time = ceil(t0)
              , times = [];
            if (dt > 1)
                for (; t1 > time; )
                    number(time) % dt || times.push(new Date(+time)),
                    step(time, 1);
            else
                for (; t1 > time; )
                    times.push(new Date(+time)),
                    step(time, 1);
            return times
        }
        function range_utc(t0, t1, dt) {
            try {
                d3_date = d3_date_utc;
                var utc = new d3_date_utc;
                return utc._ = t0,
                range(utc, t1, dt)
            } finally {
                d3_date = Date
            }
        }
        local.floor = local,
        local.round = round,
        local.ceil = ceil,
        local.offset = offset,
        local.range = range;
        var utc = local.utc = d3_time_interval_utc(local);
        return utc.floor = utc,
        utc.round = d3_time_interval_utc(round),
        utc.ceil = d3_time_interval_utc(ceil),
        utc.offset = d3_time_interval_utc(offset),
        utc.range = range_utc,
        local
    }
    function d3_time_interval_utc(method) {
        return function(date, k) {
            try {
                d3_date = d3_date_utc;
                var utc = new d3_date_utc;
                return utc._ = date,
                method(utc, k)._
            } finally {
                d3_date = Date
            }
        }
    }
    function d3_time_format(template) {
        function format(date) {
            for (var c, p, f, string = [], i = -1, j = 0; ++i < n; )
                37 === template.charCodeAt(i) && (string.push(template.substring(j, i)),
                null  != (p = d3_time_formatPads[c = template.charAt(++i)]) && (c = template.charAt(++i)),
                (f = d3_time_formats[c]) && (c = f(date, null  == p ? "e" === c ? " " : "0" : p)),
                string.push(c),
                j = i + 1);
            return string.push(template.substring(j, i)),
            string.join("")
        }
        var n = template.length;
        return format.parse = function(string) {
            var d = {
                y: 1900,
                m: 0,
                d: 1,
                H: 0,
                M: 0,
                S: 0,
                L: 0,
                Z: null 
            }
              , i = d3_time_parse(d, template, string, 0);
            if (i != string.length)
                return null ;
            "p" in d && (d.H = d.H % 12 + 12 * d.p);
            var localZ = null  != d.Z && d3_date !== d3_date_utc
              , date = new (localZ ? d3_date_utc : d3_date);
            return "j" in d ? date.setFullYear(d.y, 0, d.j) : "w" in d && ("W" in d || "U" in d) ? (date.setFullYear(d.y, 0, 1),
            date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + 7 * d.W - (date.getDay() + 5) % 7 : d.w + 7 * d.U - (date.getDay() + 6) % 7)) : date.setFullYear(d.y, d.m, d.d),
            date.setHours(d.H + Math.floor(d.Z / 100), d.M + d.Z % 100, d.S, d.L),
            localZ ? date._ : date
        }
        ,
        format.toString = function() {
            return template
        }
        ,
        format
    }
    function d3_time_parse(date, template, string, j) {
        for (var c, p, t, i = 0, n = template.length, m = string.length; n > i; ) {
            if (j >= m)
                return -1;
            if (c = template.charCodeAt(i++),
            37 === c) {
                if (t = template.charAt(i++),
                p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t],
                !p || (j = p(date, string, j)) < 0)
                    return -1
            } else if (c != string.charCodeAt(j++))
                return -1
        }
        return j
    }
    function d3_time_formatRe(names) {
        return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")","i")
    }
    function d3_time_formatLookup(names) {
        for (var map = new d3_Map, i = -1, n = names.length; ++i < n; )
            map.set(names[i].toLowerCase(), i);
        return map
    }
    function d3_time_formatPad(value, fill, width) {
        var sign = 0 > value ? "-" : ""
          , string = (sign ? -value : value) + ""
          , length = string.length;
        return sign + (width > length ? new Array(width - length + 1).join(fill) + string : string)
    }
    function d3_time_parseWeekdayAbbrev(date, string, i) {
        d3_time_dayAbbrevRe.lastIndex = 0;
        var n = d3_time_dayAbbrevRe.exec(string.substring(i));
        return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()),
        i + n[0].length) : -1
    }
    function d3_time_parseWeekday(date, string, i) {
        d3_time_dayRe.lastIndex = 0;
        var n = d3_time_dayRe.exec(string.substring(i));
        return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()),
        i + n[0].length) : -1
    }
    function d3_time_parseWeekdayNumber(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 1));
        return n ? (date.w = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseWeekNumberSunday(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i));
        return n ? (date.U = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseWeekNumberMonday(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i));
        return n ? (date.W = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseMonthAbbrev(date, string, i) {
        d3_time_monthAbbrevRe.lastIndex = 0;
        var n = d3_time_monthAbbrevRe.exec(string.substring(i));
        return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()),
        i + n[0].length) : -1
    }
    function d3_time_parseMonth(date, string, i) {
        d3_time_monthRe.lastIndex = 0;
        var n = d3_time_monthRe.exec(string.substring(i));
        return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()),
        i + n[0].length) : -1
    }
    function d3_time_parseLocaleFull(date, string, i) {
        return d3_time_parse(date, d3_time_formats.c.toString(), string, i)
    }
    function d3_time_parseLocaleDate(date, string, i) {
        return d3_time_parse(date, d3_time_formats.x.toString(), string, i)
    }
    function d3_time_parseLocaleTime(date, string, i) {
        return d3_time_parse(date, d3_time_formats.X.toString(), string, i)
    }
    function d3_time_parseFullYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 4));
        return n ? (date.y = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.y = d3_time_expandYear(+n[0]),
        i + n[0].length) : -1
    }
    function d3_time_parseZone(date, string, i) {
        return /^[+-]\d{4}$/.test(string = string.substring(i, i + 5)) ? (date.Z = +string,
        i + 5) : -1
    }
    function d3_time_expandYear(d) {
        return d + (d > 68 ? 1900 : 2e3)
    }
    function d3_time_parseMonthNumber(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.m = n[0] - 1,
        i + n[0].length) : -1
    }
    function d3_time_parseDay(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.d = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseDayOfYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 3));
        return n ? (date.j = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseHour24(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.H = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseMinutes(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.M = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseSeconds(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.S = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseMilliseconds(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 3));
        return n ? (date.L = +n[0],
        i + n[0].length) : -1
    }
    function d3_time_parseAmPm(date, string, i) {
        var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
        return null  == n ? -1 : (date.p = n,
        i)
    }
    function d3_time_zone(d) {
        var z = d.getTimezoneOffset()
          , zs = z > 0 ? "-" : "+"
          , zh = ~~(abs(z) / 60)
          , zm = abs(z) % 60;
        return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2)
    }
    function d3_time_parseLiteralPercent(date, string, i) {
        d3_time_percentRe.lastIndex = 0;
        var n = d3_time_percentRe.exec(string.substring(i, i + 1));
        return n ? i + n[0].length : -1
    }
    function d3_time_formatUtc(template) {
        function format(date) {
            try {
                d3_date = d3_date_utc;
                var utc = new d3_date;
                return utc._ = date,
                local(utc)
            } finally {
                d3_date = Date
            }
        }
        var local = d3_time_format(template);
        return format.parse = function(string) {
            try {
                d3_date = d3_date_utc;
                var date = local.parse(string);
                return date && date._
            } finally {
                d3_date = Date
            }
        }
        ,
        format.toString = local.toString,
        format
    }
    function d3_time_formatIsoNative(date) {
        return date.toISOString()
    }
    function d3_time_scale(linear, methods, format) {
        function scale(x) {
            return linear(x)
        }
        function tickMethod(extent, count) {
            var span = extent[1] - extent[0]
              , target = span / count
              , i = d3.bisect(d3_time_scaleSteps, target);
            return i == d3_time_scaleSteps.length ? [methods.year, d3_scale_linearTickRange(extent.map(function(d) {
                return d / 31536e6
            }
            ), count)[2]] : i ? methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i] : [d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2]]
        }
        return scale.invert = function(x) {
            return d3_time_scaleDate(linear.invert(x))
        }
        ,
        scale.domain = function(x) {
            return arguments.length ? (linear.domain(x),
            scale) : linear.domain().map(d3_time_scaleDate)
        }
        ,
        scale.nice = function(interval, skip) {
            function skipped(date) {
                return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length
            }
            var domain = scale.domain()
              , extent = d3_scaleExtent(domain)
              , method = null  == interval ? tickMethod(extent, 10) : "number" == typeof interval && tickMethod(extent, interval);
            return method && (interval = method[0],
            skip = method[1]),
            scale.domain(d3_scale_nice(domain, skip > 1 ? {
                floor: function(date) {
                    for (; skipped(date = interval.floor(date)); )
                        date = d3_time_scaleDate(date - 1);
                    return date
                },
                ceil: function(date) {
                    for (; skipped(date = interval.ceil(date)); )
                        date = d3_time_scaleDate(+date + 1);
                    return date
                }
            } : interval))
        }
        ,
        scale.ticks = function(interval, skip) {
            var extent = d3_scaleExtent(scale.domain())
              , method = null  == interval ? tickMethod(extent, 10) : "number" == typeof interval ? tickMethod(extent, interval) : !interval.range && [{
                range: interval
            }, skip];
            return method && (interval = method[0],
            skip = method[1]),
            interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), 1 > skip ? 1 : skip)
        }
        ,
        scale.tickFormat = function() {
            return format
        }
        ,
        scale.copy = function() {
            return d3_time_scale(linear.copy(), methods, format)
        }
        ,
        d3_scale_linearRebind(scale, linear)
    }
    function d3_time_scaleDate(t) {
        return new Date(t)
    }
    function d3_time_scaleFormat(formats) {
        return function(date) {
            for (var i = formats.length - 1, f = formats[i]; !f[1](date); )
                f = formats[--i];
            return f[0](date)
        }
    }
    function d3_json(request) {
        return JSON.parse(request.responseText)
    }
    function d3_html(request) {
        var range = d3_document.createRange();
        return range.selectNode(d3_document.body),
        range.createContextualFragment(request.responseText)
    }
    var d3 = {
        version: "3.3.13"
    };
    Date.now || (Date.now = function() {
        return +new Date
    }
    );
    var d3_arraySlice = [].slice
      , d3_array = function(list) {
        return d3_arraySlice.call(list)
    }
      , d3_document = document
      , d3_documentElement = d3_document.documentElement
      , d3_window = window;
    try {
        d3_array(d3_documentElement.childNodes)[0].nodeType
    } catch (e) {
        d3_array = function(list) {
            for (var i = list.length, array = new Array(i); i--; )
                array[i] = list[i];
            return array
        }
    }
    try {
        d3_document.createElement("div").style.setProperty("opacity", 0, "")
    } catch (error) {
        var d3_element_prototype = d3_window.Element.prototype
          , d3_element_setAttribute = d3_element_prototype.setAttribute
          , d3_element_setAttributeNS = d3_element_prototype.setAttributeNS
          , d3_style_prototype = d3_window.CSSStyleDeclaration.prototype
          , d3_style_setProperty = d3_style_prototype.setProperty;
        d3_element_prototype.setAttribute = function(name, value) {
            d3_element_setAttribute.call(this, name, value + "")
        }
        ,
        d3_element_prototype.setAttributeNS = function(space, local, value) {
            d3_element_setAttributeNS.call(this, space, local, value + "")
        }
        ,
        d3_style_prototype.setProperty = function(name, value, priority) {
            d3_style_setProperty.call(this, name, value + "", priority)
        }
    }
    d3.ascending = function(a, b) {
        return b > a ? -1 : a > b ? 1 : a >= b ? 0 : NaN
    }
    ,
    d3.descending = function(a, b) {
        return a > b ? -1 : b > a ? 1 : b >= a ? 0 : NaN
    }
    ,
    d3.min = function(array, f) {
        var a, b, i = -1, n = array.length;
        if (1 === arguments.length) {
            for (; ++i < n && !(null  != (a = array[i]) && a >= a); )
                a = void 0;
            for (; ++i < n; )
                null  != (b = array[i]) && a > b && (a = b)
        } else {
            for (; ++i < n && !(null  != (a = f.call(array, array[i], i)) && a >= a); )
                a = void 0;
            for (; ++i < n; )
                null  != (b = f.call(array, array[i], i)) && a > b && (a = b)
        }
        return a
    }
    ,
    d3.max = function(array, f) {
        var a, b, i = -1, n = array.length;
        if (1 === arguments.length) {
            for (; ++i < n && !(null  != (a = array[i]) && a >= a); )
                a = void 0;
            for (; ++i < n; )
                null  != (b = array[i]) && b > a && (a = b)
        } else {
            for (; ++i < n && !(null  != (a = f.call(array, array[i], i)) && a >= a); )
                a = void 0;
            for (; ++i < n; )
                null  != (b = f.call(array, array[i], i)) && b > a && (a = b)
        }
        return a
    }
    ,
    d3.extent = function(array, f) {
        var a, b, c, i = -1, n = array.length;
        if (1 === arguments.length) {
            for (; ++i < n && !(null  != (a = c = array[i]) && a >= a); )
                a = c = void 0;
            for (; ++i < n; )
                null  != (b = array[i]) && (a > b && (a = b),
                b > c && (c = b))
        } else {
            for (; ++i < n && !(null  != (a = c = f.call(array, array[i], i)) && a >= a); )
                a = void 0;
            for (; ++i < n; )
                null  != (b = f.call(array, array[i], i)) && (a > b && (a = b),
                b > c && (c = b))
        }
        return [a, c]
    }
    ,
    d3.sum = function(array, f) {
        var a, s = 0, n = array.length, i = -1;
        if (1 === arguments.length)
            for (; ++i < n; )
                isNaN(a = +array[i]) || (s += a);
        else
            for (; ++i < n; )
                isNaN(a = +f.call(array, array[i], i)) || (s += a);
        return s
    }
    ,
    d3.mean = function(array, f) {
        var a, n = array.length, m = 0, i = -1, j = 0;
        if (1 === arguments.length)
            for (; ++i < n; )
                d3_number(a = array[i]) && (m += (a - m) / ++j);
        else
            for (; ++i < n; )
                d3_number(a = f.call(array, array[i], i)) && (m += (a - m) / ++j);
        return j ? m : void 0
    }
    ,
    d3.quantile = function(values, p) {
        var H = (values.length - 1) * p + 1
          , h = Math.floor(H)
          , v = +values[h - 1]
          , e = H - h;
        return e ? v + e * (values[h] - v) : v
    }
    ,
    d3.median = function(array, f) {
        return arguments.length > 1 && (array = array.map(f)),
        array = array.filter(d3_number),
        array.length ? d3.quantile(array.sort(d3.ascending), .5) : void 0
    }
    ,
    d3.bisector = function(f) {
        return {
            left: function(a, x, lo, hi) {
                for (arguments.length < 3 && (lo = 0),
                arguments.length < 4 && (hi = a.length); hi > lo; ) {
                    var mid = lo + hi >>> 1;
                    f.call(a, a[mid], mid) < x ? lo = mid + 1 : hi = mid
                }
                return lo
            },
            right: function(a, x, lo, hi) {
                for (arguments.length < 3 && (lo = 0),
                arguments.length < 4 && (hi = a.length); hi > lo; ) {
                    var mid = lo + hi >>> 1;
                    x < f.call(a, a[mid], mid) ? hi = mid : lo = mid + 1
                }
                return lo
            }
        }
    }
    ;
    var d3_bisector = d3.bisector(function(d) {
        return d
    }
    );
    d3.bisectLeft = d3_bisector.left,
    d3.bisect = d3.bisectRight = d3_bisector.right,
    d3.shuffle = function(array) {
        for (var t, i, m = array.length; m; )
            i = Math.random() * m-- | 0,
            t = array[m],
            array[m] = array[i],
            array[i] = t;
        return array
    }
    ,
    d3.permute = function(array, indexes) {
        for (var i = indexes.length, permutes = new Array(i); i--; )
            permutes[i] = array[indexes[i]];
        return permutes
    }
    ,
    d3.pairs = function(array) {
        for (var p0, i = 0, n = array.length - 1, p1 = array[0], pairs = new Array(0 > n ? 0 : n); n > i; )
            pairs[i] = [p0 = p1, p1 = array[++i]];
        return pairs
    }
    ,
    d3.zip = function() {
        if (!(n = arguments.length))
            return [];
        for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; )
            for (var n, j = -1, zip = zips[i] = new Array(n); ++j < n; )
                zip[j] = arguments[j][i];
        return zips
    }
    ,
    d3.transpose = function(matrix) {
        return d3.zip.apply(d3, matrix)
    }
    ,
    d3.keys = function(map) {
        var keys = [];
        for (var key in map)
            keys.push(key);
        return keys
    }
    ,
    d3.values = function(map) {
        var values = [];
        for (var key in map)
            values.push(map[key]);
        return values
    }
    ,
    d3.entries = function(map) {
        var entries = [];
        for (var key in map)
            entries.push({
                key: key,
                value: map[key]
            });
        return entries
    }
    ,
    d3.merge = function(arrays) {
        for (var m, merged, array, n = arrays.length, i = -1, j = 0; ++i < n; )
            j += arrays[i].length;
        for (merged = new Array(j); --n >= 0; )
            for (array = arrays[n],
            m = array.length; --m >= 0; )
                merged[--j] = array[m];
        return merged
    }
    ;
    var abs = Math.abs;
    d3.range = function(start, stop, step) {
        if (arguments.length < 3 && (step = 1,
        arguments.length < 2 && (stop = start,
        start = 0)),
        (stop - start) / step === 1 / 0)
            throw new Error("infinite range");
        var j, range = [], k = d3_range_integerScale(abs(step)), i = -1;
        if (start *= k,
        stop *= k,
        step *= k,
        0 > step)
            for (; (j = start + step * ++i) > stop; )
                range.push(j / k);
        else
            for (; (j = start + step * ++i) < stop; )
                range.push(j / k);
        return range
    }
    ,
    d3.map = function(object) {
        var map = new d3_Map;
        if (object instanceof d3_Map)
            object.forEach(function(key, value) {
                map.set(key, value)
            }
            );
        else
            for (var key in object)
                map.set(key, object[key]);
        return map
    }
    ,
    d3_class(d3_Map, {
        has: function(key) {
            return d3_map_prefix + key in this
        },
        get: function(key) {
            return this[d3_map_prefix + key]
        },
        set: function(key, value) {
            return this[d3_map_prefix + key] = value
        },
        remove: function(key) {
            return key = d3_map_prefix + key,
            key in this && delete this[key]
        },
        keys: function() {
            var keys = [];
            return this.forEach(function(key) {
                keys.push(key)
            }
            ),
            keys
        },
        values: function() {
            var values = [];
            return this.forEach(function(key, value) {
                values.push(value)
            }
            ),
            values
        },
        entries: function() {
            var entries = [];
            return this.forEach(function(key, value) {
                entries.push({
                    key: key,
                    value: value
                })
            }
            ),
            entries
        },
        forEach: function(f) {
            for (var key in this)
                key.charCodeAt(0) === d3_map_prefixCode && f.call(this, key.substring(1), this[key])
        }
    });
    var d3_map_prefix = "\x00"
      , d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
    d3.nest = function() {
        function map(mapType, array, depth) {
            if (depth >= keys.length)
                return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
            for (var keyValue, object, setter, values, i = -1, n = array.length, key = keys[depth++], valuesByKey = new d3_Map; ++i < n; )
                (values = valuesByKey.get(keyValue = key(object = array[i]))) ? values.push(object) : valuesByKey.set(keyValue, [object]);
            return mapType ? (object = mapType(),
            setter = function(keyValue, values) {
                object.set(keyValue, map(mapType, values, depth))
            }
            ) : (object = {},
            setter = function(keyValue, values) {
                object[keyValue] = map(mapType, values, depth)
            }
            ),
            valuesByKey.forEach(setter),
            object
        }
        function entries(map, depth) {
            if (depth >= keys.length)
                return map;
            var array = []
              , sortKey = sortKeys[depth++];
            return map.forEach(function(key, keyMap) {
                array.push({
                    key: key,
                    values: entries(keyMap, depth)
                })
            }
            ),
            sortKey ? array.sort(function(a, b) {
                return sortKey(a.key, b.key)
            }
            ) : array
        }
        var sortValues, rollup, nest = {}, keys = [], sortKeys = [];
        return nest.map = function(array, mapType) {
            return map(mapType, array, 0)
        }
        ,
        nest.entries = function(array) {
            return entries(map(d3.map, array, 0), 0)
        }
        ,
        nest.key = function(d) {
            return keys.push(d),
            nest
        }
        ,
        nest.sortKeys = function(order) {
            return sortKeys[keys.length - 1] = order,
            nest
        }
        ,
        nest.sortValues = function(order) {
            return sortValues = order,
            nest
        }
        ,
        nest.rollup = function(f) {
            return rollup = f,
            nest
        }
        ,
        nest
    }
    ,
    d3.set = function(array) {
        var set = new d3_Set;
        if (array)
            for (var i = 0, n = array.length; n > i; ++i)
                set.add(array[i]);
        return set
    }
    ,
    d3_class(d3_Set, {
        has: function(value) {
            return d3_map_prefix + value in this
        },
        add: function(value) {
            return this[d3_map_prefix + value] = !0,
            value
        },
        remove: function(value) {
            return value = d3_map_prefix + value,
            value in this && delete this[value]
        },
        values: function() {
            var values = [];
            return this.forEach(function(value) {
                values.push(value)
            }
            ),
            values
        },
        forEach: function(f) {
            for (var value in this)
                value.charCodeAt(0) === d3_map_prefixCode && f.call(this, value.substring(1))
        }
    }),
    d3.behavior = {},
    d3.rebind = function(target, source) {
        for (var method, i = 1, n = arguments.length; ++i < n; )
            target[method = arguments[i]] = d3_rebind(target, source, source[method]);
        return target
    }
    ;
    var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];
    d3.dispatch = function() {
        for (var dispatch = new d3_dispatch, i = -1, n = arguments.length; ++i < n; )
            dispatch[arguments[i]] = d3_dispatch_event(dispatch);
        return dispatch
    }
    ,
    d3_dispatch.prototype.on = function(type, listener) {
        var i = type.indexOf(".")
          , name = "";
        if (i >= 0 && (name = type.substring(i + 1),
        type = type.substring(0, i)),
        type)
            return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
        if (2 === arguments.length) {
            if (null  == listener)
                for (type in this)
                    this.hasOwnProperty(type) && this[type].on(name, null );
            return this
        }
    }
    ,
    d3.event = null ,
    d3.requote = function(s) {
        return s.replace(d3_requote_re, "\\$&")
    }
    ;
    var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g
      , d3_subclass = {}.__proto__ ? function(object, prototype) {
        object.__proto__ = prototype
    }
     : function(object, prototype) {
        for (var property in prototype)
            object[property] = prototype[property]
    }
      , d3_select = function(s, n) {
        return n.querySelector(s)
    }
      , d3_selectAll = function(s, n) {
        return n.querySelectorAll(s)
    }
      , d3_selectMatcher = d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")]
      , d3_selectMatches = function(n, s) {
        return d3_selectMatcher.call(n, s)
    }
    ;
    "function" == typeof Sizzle && (d3_select = function(s, n) {
        return Sizzle(s, n)[0] || null 
    }
    ,
    d3_selectAll = function(s, n) {
        return Sizzle.uniqueSort(Sizzle(s, n))
    }
    ,
    d3_selectMatches = Sizzle.matchesSelector),
    d3.selection = function() {
        return d3_selectionRoot
    }
    ;
    var d3_selectionPrototype = d3.selection.prototype = [];
    d3_selectionPrototype.select = function(selector) {
        var subgroup, subnode, group, node, subgroups = [];
        selector = d3_selection_selector(selector);
        for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []),
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = -1, n = group.length; ++i < n; )
                (node = group[i]) ? (subgroup.push(subnode = selector.call(node, node.__data__, i, j)),
                subnode && "__data__" in node && (subnode.__data__ = node.__data__)) : subgroup.push(null )
        }
        return d3_selection(subgroups)
    }
    ,
    d3_selectionPrototype.selectAll = function(selector) {
        var subgroup, node, subgroups = [];
        selector = d3_selection_selectorAll(selector);
        for (var j = -1, m = this.length; ++j < m; )
            for (var group = this[j], i = -1, n = group.length; ++i < n; )
                (node = group[i]) && (subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j))),
                subgroup.parentNode = node);
        return d3_selection(subgroups)
    }
    ;
    var d3_nsPrefix = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix: d3_nsPrefix,
        qualify: function(name) {
            var i = name.indexOf(":")
              , prefix = name;
            return i >= 0 && (prefix = name.substring(0, i),
            name = name.substring(i + 1)),
            d3_nsPrefix.hasOwnProperty(prefix) ? {
                space: d3_nsPrefix[prefix],
                local: name
            } : name
        }
    },
    d3_selectionPrototype.attr = function(name, value) {
        if (arguments.length < 2) {
            if ("string" == typeof name) {
                var node = this.node();
                return name = d3.ns.qualify(name),
                name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name)
            }
            for (value in name)
                this.each(d3_selection_attr(value, name[value]));
            return this
        }
        return this.each(d3_selection_attr(name, value))
    }
    ,
    d3_selectionPrototype.classed = function(name, value) {
        if (arguments.length < 2) {
            if ("string" == typeof name) {
                var node = this.node()
                  , n = (name = d3_selection_classes(name)).length
                  , i = -1;
                if (value = node.classList) {
                    for (; ++i < n; )
                        if (!value.contains(name[i]))
                            return !1
                } else
                    for (value = node.getAttribute("class"); ++i < n; )
                        if (!d3_selection_classedRe(name[i]).test(value))
                            return !1;
                return !0
            }
            for (value in name)
                this.each(d3_selection_classed(value, name[value]));
            return this
        }
        return this.each(d3_selection_classed(name, value))
    }
    ,
    d3_selectionPrototype.style = function(name, value, priority) {
        var n = arguments.length;
        if (3 > n) {
            if ("string" != typeof name) {
                2 > n && (value = "");
                for (priority in name)
                    this.each(d3_selection_style(priority, name[priority], value));
                return this
            }
            if (2 > n)
                return d3_window.getComputedStyle(this.node(), null ).getPropertyValue(name);
            priority = ""
        }
        return this.each(d3_selection_style(name, value, priority))
    }
    ,
    d3_selectionPrototype.property = function(name, value) {
        if (arguments.length < 2) {
            if ("string" == typeof name)
                return this.node()[name];
            for (value in name)
                this.each(d3_selection_property(value, name[value]));
            return this
        }
        return this.each(d3_selection_property(name, value))
    }
    ,
    d3_selectionPrototype.text = function(value) {
        return arguments.length ? this.each("function" == typeof value ? function() {
            var v = value.apply(this, arguments);
            this.textContent = null  == v ? "" : v
        }
         : null  == value ? function() {
            this.textContent = ""
        }
         : function() {
            this.textContent = value
        }
        ) : this.node().textContent
    }
    ,
    d3_selectionPrototype.html = function(value) {
        return arguments.length ? this.each("function" == typeof value ? function() {
            var v = value.apply(this, arguments);
            this.innerHTML = null  == v ? "" : v
        }
         : null  == value ? function() {
            this.innerHTML = ""
        }
         : function() {
            this.innerHTML = value
        }
        ) : this.node().innerHTML
    }
    ,
    d3_selectionPrototype.append = function(name) {
        return name = d3_selection_creator(name),
        this.select(function() {
            return this.appendChild(name.apply(this, arguments))
        }
        )
    }
    ,
    d3_selectionPrototype.insert = function(name, before) {
        return name = d3_selection_creator(name),
        before = d3_selection_selector(before),
        this.select(function() {
            return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null )
        }
        )
    }
    ,
    d3_selectionPrototype.remove = function() {
        return this.each(function() {
            var parent = this.parentNode;
            parent && parent.removeChild(this)
        }
        )
    }
    ,
    d3_selectionPrototype.data = function(value, key) {
        function bind(group, groupData) {
            var i, node, nodeData, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n);
            if (key) {
                var keyValue, nodeByKeyValue = new d3_Map, dataByKeyValue = new d3_Map, keyValues = [];
                for (i = -1; ++i < n; )
                    keyValue = key.call(node = group[i], node.__data__, i),
                    nodeByKeyValue.has(keyValue) ? exitNodes[i] = node : nodeByKeyValue.set(keyValue, node),
                    keyValues.push(keyValue);
                for (i = -1; ++i < m; )
                    keyValue = key.call(groupData, nodeData = groupData[i], i),
                    (node = nodeByKeyValue.get(keyValue)) ? (updateNodes[i] = node,
                    node.__data__ = nodeData) : dataByKeyValue.has(keyValue) || (enterNodes[i] = d3_selection_dataNode(nodeData)),
                    dataByKeyValue.set(keyValue, nodeData),
                    nodeByKeyValue.remove(keyValue);
                for (i = -1; ++i < n; )
                    nodeByKeyValue.has(keyValues[i]) && (exitNodes[i] = group[i])
            } else {
                for (i = -1; ++i < n0; )
                    node = group[i],
                    nodeData = groupData[i],
                    node ? (node.__data__ = nodeData,
                    updateNodes[i] = node) : enterNodes[i] = d3_selection_dataNode(nodeData);
                for (; m > i; ++i)
                    enterNodes[i] = d3_selection_dataNode(groupData[i]);
                for (; n > i; ++i)
                    exitNodes[i] = group[i]
            }
            enterNodes.update = updateNodes,
            enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode,
            enter.push(enterNodes),
            update.push(updateNodes),
            exit.push(exitNodes)
        }
        var group, node, i = -1, n = this.length;
        if (!arguments.length) {
            for (value = new Array(n = (group = this[0]).length); ++i < n; )
                (node = group[i]) && (value[i] = node.__data__);
            return value
        }
        var enter = d3_selection_enter([])
          , update = d3_selection([])
          , exit = d3_selection([]);
        if ("function" == typeof value)
            for (; ++i < n; )
                bind(group = this[i], value.call(group, group.parentNode.__data__, i));
        else
            for (; ++i < n; )
                bind(group = this[i], value);
        return update.enter = function() {
            return enter
        }
        ,
        update.exit = function() {
            return exit
        }
        ,
        update
    }
    ,
    d3_selectionPrototype.datum = function(value) {
        return arguments.length ? this.property("__data__", value) : this.property("__data__")
    }
    ,
    d3_selectionPrototype.filter = function(filter) {
        var subgroup, group, node, subgroups = [];
        "function" != typeof filter && (filter = d3_selection_filter(filter));
        for (var j = 0, m = this.length; m > j; j++) {
            subgroups.push(subgroup = []),
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = 0, n = group.length; n > i; i++)
                (node = group[i]) && filter.call(node, node.__data__, i, j) && subgroup.push(node)
        }
        return d3_selection(subgroups)
    }
    ,
    d3_selectionPrototype.order = function() {
        for (var j = -1, m = this.length; ++j < m; )
            for (var node, group = this[j], i = group.length - 1, next = group[i]; --i >= 0; )
                (node = group[i]) && (next && next !== node.nextSibling && next.parentNode.insertBefore(node, next),
                next = node);
        return this
    }
    ,
    d3_selectionPrototype.sort = function(comparator) {
        comparator = d3_selection_sortComparator.apply(this, arguments);
        for (var j = -1, m = this.length; ++j < m; )
            this[j].sort(comparator);
        return this.order()
    }
    ,
    d3_selectionPrototype.each = function(callback) {
        return d3_selection_each(this, function(node, i, j) {
            callback.call(node, node.__data__, i, j)
        }
        )
    }
    ,
    d3_selectionPrototype.call = function(callback) {
        var args = d3_array(arguments);
        return callback.apply(args[0] = this, args),
        this
    }
    ,
    d3_selectionPrototype.empty = function() {
        return !this.node()
    }
    ,
    d3_selectionPrototype.node = function() {
        for (var j = 0, m = this.length; m > j; j++)
            for (var group = this[j], i = 0, n = group.length; n > i; i++) {
                var node = group[i];
                if (node)
                    return node
            }
        return null 
    }
    ,
    d3_selectionPrototype.size = function() {
        var n = 0;
        return this.each(function() {
            ++n
        }
        ),
        n
    }
    ;
    var d3_selection_enterPrototype = [];
    d3.selection.enter = d3_selection_enter,
    d3.selection.enter.prototype = d3_selection_enterPrototype,
    d3_selection_enterPrototype.append = d3_selectionPrototype.append,
    d3_selection_enterPrototype.empty = d3_selectionPrototype.empty,
    d3_selection_enterPrototype.node = d3_selectionPrototype.node,
    d3_selection_enterPrototype.call = d3_selectionPrototype.call,
    d3_selection_enterPrototype.size = d3_selectionPrototype.size,
    d3_selection_enterPrototype.select = function(selector) {
        for (var subgroup, subnode, upgroup, group, node, subgroups = [], j = -1, m = this.length; ++j < m; ) {
            upgroup = (group = this[j]).update,
            subgroups.push(subgroup = []),
            subgroup.parentNode = group.parentNode;
            for (var i = -1, n = group.length; ++i < n; )
                (node = group[i]) ? (subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j)),
                subnode.__data__ = node.__data__) : subgroup.push(null )
        }
        return d3_selection(subgroups)
    }
    ,
    d3_selection_enterPrototype.insert = function(name, before) {
        return arguments.length < 2 && (before = d3_selection_enterInsertBefore(this)),
        d3_selectionPrototype.insert.call(this, name, before)
    }
    ,
    d3_selectionPrototype.transition = function() {
        for (var subgroup, node, id = d3_transitionInheritId || ++d3_transitionId, subgroups = [], transition = d3_transitionInherit || {
            time: Date.now(),
            ease: d3_ease_cubicInOut,
            delay: 0,
            duration: 250
        }, j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n; )
                (node = group[i]) && d3_transitionNode(node, i, id, transition),
                subgroup.push(node)
        }
        return d3_transition(subgroups, id)
    }
    ,
    d3_selectionPrototype.interrupt = function() {
        return this.each(d3_selection_interrupt)
    }
    ,
    d3.select = function(node) {
        var group = ["string" == typeof node ? d3_select(node, d3_document) : node];
        return group.parentNode = d3_documentElement,
        d3_selection([group])
    }
    ,
    d3.selectAll = function(nodes) {
        var group = d3_array("string" == typeof nodes ? d3_selectAll(nodes, d3_document) : nodes);
        return group.parentNode = d3_documentElement,
        d3_selection([group])
    }
    ;
    var d3_selectionRoot = d3.select(d3_documentElement);
    d3_selectionPrototype.on = function(type, listener, capture) {
        var n = arguments.length;
        if (3 > n) {
            if ("string" != typeof type) {
                2 > n && (listener = !1);
                for (capture in type)
                    this.each(d3_selection_on(capture, type[capture], listener));
                return this
            }
            if (2 > n)
                return (n = this.node()["__on" + type]) && n._;
            capture = !1
        }
        return this.each(d3_selection_on(type, listener, capture))
    }
    ;
    var d3_selection_onFilters = d3.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    d3_selection_onFilters.forEach(function(k) {
        "on" + k in d3_document && d3_selection_onFilters.remove(k)
    }
    );
    var d3_event_dragSelect = "onselectstart" in d3_document ? null  : d3_vendorSymbol(d3_documentElement.style, "userSelect")
      , d3_event_dragId = 0;
    d3.mouse = function(container) {
        return d3_mousePoint(container, d3_eventSource())
    }
    ;
    var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
    d3.touches = function(container, touches) {
        return arguments.length < 2 && (touches = d3_eventSource().touches),
        touches ? d3_array(touches).map(function(touch) {
            var point = d3_mousePoint(container, touch);
            return point.identifier = touch.identifier,
            point
        }
        ) : []
    }
    ,
    d3.behavior.drag = function() {
        function drag() {
            this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart)
        }
        function touchid() {
            return d3.event.changedTouches[0].identifier
        }
        function touchposition(parent, id) {
            return d3.touches(parent).filter(function(p) {
                return p.identifier === id
            }
            )[0]
        }
        function dragstart(id, position, move, end) {
            return function() {
                function moved() {
                    var p = position(parent, eventId)
                      , dx = p[0] - origin_[0]
                      , dy = p[1] - origin_[1];
                    dragged |= dx | dy,
                    origin_ = p,
                    event_({
                        type: "drag",
                        x: p[0] + offset[0],
                        y: p[1] + offset[1],
                        dx: dx,
                        dy: dy
                    })
                }
                function ended() {
                    w.on(move + "." + drag, null ).on(end + "." + drag, null ),
                    dragRestore(dragged && d3.event.target === eventTarget),
                    event_({
                        type: "dragend"
                    })
                }
                var offset, target = this, parent = target.parentNode, event_ = event.of(target, arguments), eventTarget = d3.event.target, eventId = id(), drag = null  == eventId ? "drag" : "drag-" + eventId, origin_ = position(parent, eventId), dragged = 0, w = d3.select(d3_window).on(move + "." + drag, moved).on(end + "." + drag, ended), dragRestore = d3_event_dragSuppress();
                origin ? (offset = origin.apply(target, arguments),
                offset = [offset.x - origin_[0], offset.y - origin_[1]]) : offset = [0, 0],
                event_({
                    type: "dragstart"
                })
            }
        }
        var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend")
          , origin = null 
          , mousedown = dragstart(d3_noop, d3.mouse, "mousemove", "mouseup")
          , touchstart = dragstart(touchid, touchposition, "touchmove", "touchend");
        return drag.origin = function(x) {
            return arguments.length ? (origin = x,
            drag) : origin
        }
        ,
        d3.rebind(drag, event, "on")
    }
    ;
    var π = Math.PI
      , τ = 2 * π
      , halfπ = π / 2
      , ε = 1e-6
      , ε2 = ε * ε
      , d3_radians = π / 180
      , d3_degrees = 180 / π
      , ρ = Math.SQRT2
      , ρ2 = 2
      , ρ4 = 4;
    d3.interpolateZoom = function(p0, p1) {
        function interpolate(t) {
            var s = t * S;
            if (dr) {
                var coshr0 = d3_cosh(r0)
                  , u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
                return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0)]
            }
            return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * s)]
        }
        var ux0 = p0[0]
          , uy0 = p0[1]
          , w0 = p0[2]
          , ux1 = p1[0]
          , uy1 = p1[1]
          , w1 = p1[2]
          , dx = ux1 - ux0
          , dy = uy1 - uy0
          , d2 = dx * dx + dy * dy
          , d1 = Math.sqrt(d2)
          , b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1)
          , b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1)
          , r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0)
          , r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1)
          , dr = r1 - r0
          , S = (dr || Math.log(w1 / w0)) / ρ;
        return interpolate.duration = 1e3 * S,
        interpolate
    }
    ,
    d3.behavior.zoom = function() {
        function zoom(g) {
            g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on(mousemove, mousewheelreset).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted)
        }
        function location(p) {
            return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k]
        }
        function point(l) {
            return [l[0] * view.k + view.x, l[1] * view.k + view.y]
        }
        function scaleTo(s) {
            view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s))
        }
        function translateTo(p, l) {
            l = point(l),
            view.x += p[0] - l[0],
            view.y += p[1] - l[1]
        }
        function rescale() {
            x1 && x1.domain(x0.range().map(function(x) {
                return (x - view.x) / view.k
            }
            ).map(x0.invert)),
            y1 && y1.domain(y0.range().map(function(y) {
                return (y - view.y) / view.k
            }
            ).map(y0.invert))
        }
        function zoomstarted(event) {
            event({
                type: "zoomstart"
            })
        }
        function zoomed(event) {
            rescale(),
            event({
                type: "zoom",
                scale: view.k,
                translate: [view.x, view.y]
            })
        }
        function zoomended(event) {
            event({
                type: "zoomend"
            })
        }
        function mousedowned() {
            function moved() {
                dragged = 1,
                translateTo(d3.mouse(target), l),
                zoomed(event_)
            }
            function ended() {
                w.on(mousemove, d3_window === target ? mousewheelreset : null ).on(mouseup, null ),
                dragRestore(dragged && d3.event.target === eventTarget),
                zoomended(event_)
            }
            var target = this
              , event_ = event.of(target, arguments)
              , eventTarget = d3.event.target
              , dragged = 0
              , w = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended)
              , l = location(d3.mouse(target))
              , dragRestore = d3_event_dragSuppress();
            d3_selection_interrupt.call(target),
            zoomstarted(event_)
        }
        function touchstarted() {
            function relocate() {
                var touches = d3.touches(target);
                return scale0 = view.k,
                touches.forEach(function(t) {
                    t.identifier in locations0 && (locations0[t.identifier] = location(t))
                }
                ),
                touches
            }
            function started() {
                for (var changed = d3.event.changedTouches, i = 0, n = changed.length; n > i; ++i)
                    locations0[changed[i].identifier] = null ;
                var touches = relocate()
                  , now = Date.now();
                if (1 === touches.length) {
                    if (500 > now - touchtime) {
                        var p = touches[0]
                          , l = locations0[p.identifier];
                        scaleTo(2 * view.k),
                        translateTo(p, l),
                        d3_eventPreventDefault(),
                        zoomed(event_)
                    }
                    touchtime = now
                } else if (touches.length > 1) {
                    var p = touches[0]
                      , q = touches[1]
                      , dx = p[0] - q[0]
                      , dy = p[1] - q[1];
                    distance0 = dx * dx + dy * dy
                }
            }
            function moved() {
                for (var p0, l0, p1, l1, touches = d3.touches(target), i = 0, n = touches.length; n > i; ++i,
                l1 = null )
                    if (p1 = touches[i],
                    l1 = locations0[p1.identifier]) {
                        if (l0)
                            break;
                        p0 = p1,
                        l0 = l1
                    }
                if (l1) {
                    var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1
                      , scale1 = distance0 && Math.sqrt(distance1 / distance0);
                    p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2],
                    l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2],
                    scaleTo(scale1 * scale0)
                }
                touchtime = null ,
                translateTo(p0, l0),
                zoomed(event_)
            }
            function ended() {
                if (d3.event.touches.length) {
                    for (var changed = d3.event.changedTouches, i = 0, n = changed.length; n > i; ++i)
                        delete locations0[changed[i].identifier];
                    for (var identifier in locations0)
                        return void relocate()
                }
                w.on(touchmove, null ).on(touchend, null ),
                t.on(mousedown, mousedowned).on(touchstart, touchstarted),
                dragRestore(),
                zoomended(event_)
            }
            var scale0, target = this, event_ = event.of(target, arguments), locations0 = {}, distance0 = 0, eventId = d3.event.changedTouches[0].identifier, touchmove = "touchmove.zoom-" + eventId, touchend = "touchend.zoom-" + eventId, w = d3.select(d3_window).on(touchmove, moved).on(touchend, ended), t = d3.select(target).on(mousedown, null ).on(touchstart, started), dragRestore = d3_event_dragSuppress();
            d3_selection_interrupt.call(target),
            started(),
            zoomstarted(event_)
        }
        function mousewheeled() {
            var event_ = event.of(this, arguments);
            mousewheelTimer ? clearTimeout(mousewheelTimer) : (d3_selection_interrupt.call(this),
            zoomstarted(event_)),
            mousewheelTimer = setTimeout(function() {
                mousewheelTimer = null ,
                zoomended(event_)
            }
            , 50),
            d3_eventPreventDefault();
            var point = center || d3.mouse(this);
            translate0 || (translate0 = location(point)),
            scaleTo(Math.pow(2, .002 * d3_behavior_zoomDelta()) * view.k),
            translateTo(point, translate0),
            zoomed(event_)
        }
        function mousewheelreset() {
            translate0 = null 
        }
        function dblclicked() {
            var event_ = event.of(this, arguments)
              , p = d3.mouse(this)
              , l = location(p)
              , k = Math.log(view.k) / Math.LN2;
            zoomstarted(event_),
            scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1)),
            translateTo(p, l),
            zoomed(event_),
            zoomended(event_)
        }
        var translate0, center, mousewheelTimer, touchtime, x0, x1, y0, y1, view = {
            x: 0,
            y: 0,
            k: 1
        }, size = [960, 500], scaleExtent = d3_behavior_zoomInfinity, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", touchstart = "touchstart.zoom", event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend");
        return zoom.event = function(g) {
            g.each(function() {
                var event_ = event.of(this, arguments)
                  , view1 = view;
                d3_transitionInheritId ? d3.select(this).transition().each("start.zoom", function() {
                    view = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    },
                    zoomstarted(event_)
                }
                ).tween("zoom:zoom", function() {
                    var dx = size[0]
                      , dy = size[1]
                      , cx = dx / 2
                      , cy = dy / 2
                      , i = d3.interpolateZoom([(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k], [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]);
                    return function(t) {
                        var l = i(t)
                          , k = dx / l[2];
                        this.__chart__ = view = {
                            x: cx - l[0] * k,
                            y: cy - l[1] * k,
                            k: k
                        },
                        zoomed(event_)
                    }
                }
                ).each("end.zoom", function() {
                    zoomended(event_)
                }
                ) : (this.__chart__ = view,
                zoomstarted(event_),
                zoomed(event_),
                zoomended(event_))
            }
            )
        }
        ,
        zoom.translate = function(_) {
            return arguments.length ? (view = {
                x: +_[0],
                y: +_[1],
                k: view.k
            },
            rescale(),
            zoom) : [view.x, view.y]
        }
        ,
        zoom.scale = function(_) {
            return arguments.length ? (view = {
                x: view.x,
                y: view.y,
                k: +_
            },
            rescale(),
            zoom) : view.k
        }
        ,
        zoom.scaleExtent = function(_) {
            return arguments.length ? (scaleExtent = null  == _ ? d3_behavior_zoomInfinity : [+_[0], +_[1]],
            zoom) : scaleExtent
        }
        ,
        zoom.center = function(_) {
            return arguments.length ? (center = _ && [+_[0], +_[1]],
            zoom) : center
        }
        ,
        zoom.size = function(_) {
            return arguments.length ? (size = _ && [+_[0], +_[1]],
            zoom) : size
        }
        ,
        zoom.x = function(z) {
            return arguments.length ? (x1 = z,
            x0 = z.copy(),
            view = {
                x: 0,
                y: 0,
                k: 1
            },
            zoom) : x1
        }
        ,
        zoom.y = function(z) {
            return arguments.length ? (y1 = z,
            y0 = z.copy(),
            view = {
                x: 0,
                y: 0,
                k: 1
            },
            zoom) : y1
        }
        ,
        d3.rebind(zoom, event, "on")
    }
    ;
    var d3_behavior_zoomDelta, d3_behavior_zoomInfinity = [0, 1 / 0], d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
        return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1)
    }
    ,
    "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
        return d3.event.wheelDelta
    }
    ,
    "mousewheel") : (d3_behavior_zoomDelta = function() {
        return -d3.event.detail
    }
    ,
    "MozMousePixelScroll");
    d3_Color.prototype.toString = function() {
        return this.rgb() + ""
    }
    ,
    d3.hsl = function(h, s, l) {
        return 1 === arguments.length ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l)
    }
    ;
    var d3_hslPrototype = d3_Hsl.prototype = new d3_Color;
    d3_hslPrototype.brighter = function(k) {
        return k = Math.pow(.7, arguments.length ? k : 1),
        d3_hsl(this.h, this.s, this.l / k)
    }
    ,
    d3_hslPrototype.darker = function(k) {
        return k = Math.pow(.7, arguments.length ? k : 1),
        d3_hsl(this.h, this.s, k * this.l)
    }
    ,
    d3_hslPrototype.rgb = function() {
        return d3_hsl_rgb(this.h, this.s, this.l)
    }
    ,
    d3.hcl = function(h, c, l) {
        return 1 === arguments.length ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l)
    }
    ;
    var d3_hclPrototype = d3_Hcl.prototype = new d3_Color;
    d3_hclPrototype.brighter = function(k) {
        return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)))
    }
    ,
    d3_hclPrototype.darker = function(k) {
        return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)))
    }
    ,
    d3_hclPrototype.rgb = function() {
        return d3_hcl_lab(this.h, this.c, this.l).rgb()
    }
    ,
    d3.lab = function(l, a, b) {
        return 1 === arguments.length ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b)
    }
    ;
    var d3_lab_K = 18
      , d3_lab_X = .95047
      , d3_lab_Y = 1
      , d3_lab_Z = 1.08883
      , d3_labPrototype = d3_Lab.prototype = new d3_Color;
    d3_labPrototype.brighter = function(k) {
        return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b)
    }
    ,
    d3_labPrototype.darker = function(k) {
        return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b)
    }
    ,
    d3_labPrototype.rgb = function() {
        return d3_lab_rgb(this.l, this.a, this.b)
    }
    ,
    d3.rgb = function(r, g, b) {
        return 1 === arguments.length ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b)
    }
    ;
    var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color;
    d3_rgbPrototype.brighter = function(k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        var r = this.r
          , g = this.g
          , b = this.b
          , i = 30;
        return r || g || b ? (r && i > r && (r = i),
        g && i > g && (g = i),
        b && i > b && (b = i),
        d3_rgb(Math.min(255, ~~(r / k)), Math.min(255, ~~(g / k)), Math.min(255, ~~(b / k)))) : d3_rgb(i, i, i)
    }
    ,
    d3_rgbPrototype.darker = function(k) {
        return k = Math.pow(.7, arguments.length ? k : 1),
        d3_rgb(~~(k * this.r), ~~(k * this.g), ~~(k * this.b))
    }
    ,
    d3_rgbPrototype.hsl = function() {
        return d3_rgb_hsl(this.r, this.g, this.b)
    }
    ,
    d3_rgbPrototype.toString = function() {
        return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b)
    }
    ;
    var d3_rgb_names = d3.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    d3_rgb_names.forEach(function(key, value) {
        d3_rgb_names.set(key, d3_rgbNumber(value))
    }
    ),
    d3.functor = d3_functor,
    d3.xhr = d3_xhrType(d3_identity),
    d3.dsv = function(delimiter, mimeType) {
        function dsv(url, row, callback) {
            arguments.length < 3 && (callback = row,
            row = null );
            var xhr = d3_xhr(url, mimeType, null  == row ? response : typedResponse(row), callback);
            return xhr.row = function(_) {
                return arguments.length ? xhr.response(null  == (row = _) ? response : typedResponse(_)) : row
            }
            ,
            xhr
        }
        function response(request) {
            return dsv.parse(request.responseText)
        }
        function typedResponse(f) {
            return function(request) {
                return dsv.parse(request.responseText, f)
            }
        }
        function formatRow(row) {
            return row.map(formatValue).join(delimiter)
        }
        function formatValue(text) {
            return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text
        }
        var reFormat = new RegExp('["' + delimiter + "\n]")
          , delimiterCode = delimiter.charCodeAt(0);
        return dsv.parse = function(text, f) {
            var o;
            return dsv.parseRows(text, function(row, i) {
                if (o)
                    return o(row, i - 1);
                var a = new Function("d","return {" + row.map(function(name, i) {
                    return JSON.stringify(name) + ": d[" + i + "]"
                }
                ).join(",") + "}");
                o = f ? function(row, i) {
                    return f(a(row), i)
                }
                 : a
            }
            )
        }
        ,
        dsv.parseRows = function(text, f) {
            function token() {
                if (I >= N)
                    return EOF;
                if (eol)
                    return eol = !1,
                    EOL;
                var j = I;
                if (34 === text.charCodeAt(j)) {
                    for (var i = j; i++ < N; )
                        if (34 === text.charCodeAt(i)) {
                            if (34 !== text.charCodeAt(i + 1))
                                break;
                            ++i
                        }
                    I = i + 2;
                    var c = text.charCodeAt(i + 1);
                    return 13 === c ? (eol = !0,
                    10 === text.charCodeAt(i + 2) && ++I) : 10 === c && (eol = !0),
                    text.substring(j + 1, i).replace(/""/g, '"')
                }
                for (; N > I; ) {
                    var c = text.charCodeAt(I++)
                      , k = 1;
                    if (10 === c)
                        eol = !0;
                    else if (13 === c)
                        eol = !0,
                        10 === text.charCodeAt(I) && (++I,
                        ++k);
                    else if (c !== delimiterCode)
                        continue;return text.substring(j, I - k)
                }
                return text.substring(j)
            }
            for (var t, eol, EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0; (t = token()) !== EOF; ) {
                for (var a = []; t !== EOL && t !== EOF; )
                    a.push(t),
                    t = token();
                (!f || (a = f(a, n++))) && rows.push(a)
            }
            return rows
        }
        ,
        dsv.format = function(rows) {
            if (Array.isArray(rows[0]))
                return dsv.formatRows(rows);
            var fieldSet = new d3_Set
              , fields = [];
            return rows.forEach(function(row) {
                for (var field in row)
                    fieldSet.has(field) || fields.push(fieldSet.add(field))
            }
            ),
            [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
                return fields.map(function(field) {
                    return formatValue(row[field])
                }
                ).join(delimiter)
            }
            )).join("\n")
        }
        ,
        dsv.formatRows = function(rows) {
            return rows.map(formatRow).join("\n")
        }
        ,
        dsv
    }
    ,
    d3.csv = d3.dsv(",", "text/csv"),
    d3.tsv = d3.dsv("	", "text/tab-separated-values");
    var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_active, d3_timer_frame = d3_window[d3_vendorSymbol(d3_window, "requestAnimationFrame")] || function(callback) {
        setTimeout(callback, 17)
    }
    ;
    d3.timer = function(callback, delay, then) {
        var n = arguments.length;
        2 > n && (delay = 0),
        3 > n && (then = Date.now());
        var time = then + delay
          , timer = {
            c: callback,
            t: time,
            f: !1,
            n: null 
        };
        d3_timer_queueTail ? d3_timer_queueTail.n = timer : d3_timer_queueHead = timer,
        d3_timer_queueTail = timer,
        d3_timer_interval || (d3_timer_timeout = clearTimeout(d3_timer_timeout),
        d3_timer_interval = 1,
        d3_timer_frame(d3_timer_step))
    }
    ,
    d3.timer.flush = function() {
        d3_timer_mark(),
        d3_timer_sweep()
    }
    ;
    var d3_format_decimalPoint = "."
      , d3_format_thousandsSeparator = ","
      , d3_format_grouping = [3, 3]
      , d3_format_currencySymbol = "$"
      , d3_formatPrefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(d3_formatPrefix);
    d3.formatPrefix = function(value, precision) {
        var i = 0;
        return value && (0 > value && (value *= -1),
        precision && (value = d3.round(value, d3_format_precision(value, precision))),
        i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10),
        i = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= i ? i + 1 : i - 1) / 3)))),
        d3_formatPrefixes[8 + i / 3]
    }
    ,
    d3.round = function(x, n) {
        return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x)
    }
    ,
    d3.format = function(specifier) {
        var match = d3_format_re.exec(specifier)
          , fill = match[1] || " "
          , align = match[2] || ">"
          , sign = match[3] || ""
          , symbol = match[4] || ""
          , zfill = match[5]
          , width = +match[6]
          , comma = match[7]
          , precision = match[8]
          , type = match[9]
          , scale = 1
          , suffix = ""
          , integer = !1;
        switch (precision && (precision = +precision.substring(1)),
        (zfill || "0" === fill && "=" === align) && (zfill = fill = "0",
        align = "=",
        comma && (width -= Math.floor((width - 1) / 4))),
        type) {
        case "n":
            comma = !0,
            type = "g";
            break;
        case "%":
            scale = 100,
            suffix = "%",
            type = "f";
            break;
        case "p":
            scale = 100,
            suffix = "%",
            type = "r";
            break;
        case "b":
        case "o":
        case "x":
        case "X":
            "#" === symbol && (symbol = "0" + type.toLowerCase());
        case "c":
        case "d":
            integer = !0,
            precision = 0;
            break;
        case "s":
            scale = -1,
            type = "r"
        }
        "#" === symbol ? symbol = "" : "$" === symbol && (symbol = d3_format_currencySymbol),
        "r" != type || precision || (type = "g"),
        null  != precision && ("g" == type ? precision = Math.max(1, Math.min(21, precision)) : ("e" == type || "f" == type) && (precision = Math.max(0, Math.min(20, precision)))),
        type = d3_format_types.get(type) || d3_format_typeDefault;
        var zcomma = zfill && comma;
        return function(value) {
            if (integer && value % 1)
                return "";
            var negative = 0 > value || 0 === value && 0 > 1 / value ? (value = -value,
            "-") : sign;
            if (0 > scale) {
                var prefix = d3.formatPrefix(value, precision);
                value = prefix.scale(value),
                suffix = prefix.symbol
            } else
                value *= scale;
            value = type(value, precision);
            var i = value.lastIndexOf(".")
              , before = 0 > i ? value : value.substring(0, i)
              , after = 0 > i ? "" : d3_format_decimalPoint + value.substring(i + 1);
            !zfill && comma && (before = d3_format_group(before));
            var length = symbol.length + before.length + after.length + (zcomma ? 0 : negative.length)
              , padding = width > length ? new Array(length = width - length + 1).join(fill) : "";
            return zcomma && (before = d3_format_group(padding + before)),
            negative += symbol,
            value = before + after,
            ("<" === align ? negative + value + padding : ">" === align ? padding + negative + value : "^" === align ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + suffix
        }
    }
    ;
    var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i
      , d3_format_types = d3.map({
        b: function(x) {
            return x.toString(2)
        },
        c: function(x) {
            return String.fromCharCode(x)
        },
        o: function(x) {
            return x.toString(8)
        },
        x: function(x) {
            return x.toString(16)
        },
        X: function(x) {
            return x.toString(16).toUpperCase()
        },
        g: function(x, p) {
            return x.toPrecision(p)
        },
        e: function(x, p) {
            return x.toExponential(p)
        },
        f: function(x, p) {
            return x.toFixed(p)
        },
        r: function(x, p) {
            return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))))
        }
    })
      , d3_format_group = d3_identity;
    if (d3_format_grouping) {
        var d3_format_groupingLength = d3_format_grouping.length;
        d3_format_group = function(value) {
            for (var i = value.length, t = [], j = 0, g = d3_format_grouping[0]; i > 0 && g > 0; )
                t.push(value.substring(i -= g, i + g)),
                g = d3_format_grouping[j = (j + 1) % d3_format_groupingLength];
            return t.reverse().join(d3_format_thousandsSeparator)
        }
    }
    d3.geo = {},
    d3_adder.prototype = {
        s: 0,
        t: 0,
        add: function(y) {
            d3_adderSum(y, this.t, d3_adderTemp),
            d3_adderSum(d3_adderTemp.s, this.s, this),
            this.s ? this.t += d3_adderTemp.t : this.s = d3_adderTemp.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var d3_adderTemp = new d3_adder;
    d3.geo.stream = function(object, listener) {
        object && d3_geo_streamObjectType.hasOwnProperty(object.type) ? d3_geo_streamObjectType[object.type](object, listener) : d3_geo_streamGeometry(object, listener)
    }
    ;
    var d3_geo_streamObjectType = {
        Feature: function(feature, listener) {
            d3_geo_streamGeometry(feature.geometry, listener)
        },
        FeatureCollection: function(object, listener) {
            for (var features = object.features, i = -1, n = features.length; ++i < n; )
                d3_geo_streamGeometry(features[i].geometry, listener)
        }
    }
      , d3_geo_streamGeometryType = {
        Sphere: function(object, listener) {
            listener.sphere()
        },
        Point: function(object, listener) {
            object = object.coordinates,
            listener.point(object[0], object[1], object[2])
        },
        MultiPoint: function(object, listener) {
            for (var coordinates = object.coordinates, i = -1, n = coordinates.length; ++i < n; )
                object = coordinates[i],
                listener.point(object[0], object[1], object[2])
        },
        LineString: function(object, listener) {
            d3_geo_streamLine(object.coordinates, listener, 0)
        },
        MultiLineString: function(object, listener) {
            for (var coordinates = object.coordinates, i = -1, n = coordinates.length; ++i < n; )
                d3_geo_streamLine(coordinates[i], listener, 0)
        },
        Polygon: function(object, listener) {
            d3_geo_streamPolygon(object.coordinates, listener)
        },
        MultiPolygon: function(object, listener) {
            for (var coordinates = object.coordinates, i = -1, n = coordinates.length; ++i < n; )
                d3_geo_streamPolygon(coordinates[i], listener)
        },
        GeometryCollection: function(object, listener) {
            for (var geometries = object.geometries, i = -1, n = geometries.length; ++i < n; )
                d3_geo_streamGeometry(geometries[i], listener)
        }
    };
    d3.geo.area = function(object) {
        return d3_geo_areaSum = 0,
        d3.geo.stream(object, d3_geo_area),
        d3_geo_areaSum
    }
    ;
    var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder, d3_geo_area = {
        sphere: function() {
            d3_geo_areaSum += 4 * π
        },
        point: d3_noop,
        lineStart: d3_noop,
        lineEnd: d3_noop,
        polygonStart: function() {
            d3_geo_areaRingSum.reset(),
            d3_geo_area.lineStart = d3_geo_areaRingStart
        },
        polygonEnd: function() {
            var area = 2 * d3_geo_areaRingSum;
            d3_geo_areaSum += 0 > area ? 4 * π + area : area,
            d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop
        }
    };
    d3.geo.bounds = function() {
        function point(λ, φ) {
            ranges.push(range = [λ0 = λ, λ1 = λ]),
            φ0 > φ && (φ0 = φ),
            φ > φ1 && (φ1 = φ)
        }
        function linePoint(λ, φ) {
            var p = d3_geo_cartesian([λ * d3_radians, φ * d3_radians]);
            if (p0) {
                var normal = d3_geo_cartesianCross(p0, p)
                  , equatorial = [normal[1], -normal[0], 0]
                  , inflection = d3_geo_cartesianCross(equatorial, normal);
                d3_geo_cartesianNormalize(inflection),
                inflection = d3_geo_spherical(inflection);
                var dλ = λ - λ_
                  , s = dλ > 0 ? 1 : -1
                  , λi = inflection[0] * d3_degrees * s
                  , antimeridian = abs(dλ) > 180;
                if (antimeridian ^ (λi > s * λ_ && s * λ > λi)) {
                    var φi = inflection[1] * d3_degrees;
                    φi > φ1 && (φ1 = φi)
                } else if (λi = (λi + 360) % 360 - 180,
                antimeridian ^ (λi > s * λ_ && s * λ > λi)) {
                    var φi = -inflection[1] * d3_degrees;
                    φ0 > φi && (φ0 = φi)
                } else
                    φ0 > φ && (φ0 = φ),
                    φ > φ1 && (φ1 = φ);
                antimeridian ? λ_ > λ ? angle(λ0, λ) > angle(λ0, λ1) && (λ1 = λ) : angle(λ, λ1) > angle(λ0, λ1) && (λ0 = λ) : λ1 >= λ0 ? (λ0 > λ && (λ0 = λ),
                λ > λ1 && (λ1 = λ)) : λ > λ_ ? angle(λ0, λ) > angle(λ0, λ1) && (λ1 = λ) : angle(λ, λ1) > angle(λ0, λ1) && (λ0 = λ)
            } else
                point(λ, φ);
            p0 = p,
            λ_ = λ
        }
        function lineStart() {
            bound.point = linePoint
        }
        function lineEnd() {
            range[0] = λ0,
            range[1] = λ1,
            bound.point = point,
            p0 = null 
        }
        function ringPoint(λ, φ) {
            if (p0) {
                var dλ = λ - λ_;
                dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ
            } else
                λ__ = λ,
                φ__ = φ;
            d3_geo_area.point(λ, φ),
            linePoint(λ, φ)
        }
        function ringStart() {
            d3_geo_area.lineStart()
        }
        function ringEnd() {
            ringPoint(λ__, φ__),
            d3_geo_area.lineEnd(),
            abs(dλSum) > ε && (λ0 = -(λ1 = 180)),
            range[0] = λ0,
            range[1] = λ1,
            p0 = null 
        }
        function angle(λ0, λ1) {
            return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1
        }
        function compareRanges(a, b) {
            return a[0] - b[0]
        }
        function withinRange(x, range) {
            return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x
        }
        var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range, bound = {
            point: point,
            lineStart: lineStart,
            lineEnd: lineEnd,
            polygonStart: function() {
                bound.point = ringPoint,
                bound.lineStart = ringStart,
                bound.lineEnd = ringEnd,
                dλSum = 0,
                d3_geo_area.polygonStart()
            },
            polygonEnd: function() {
                d3_geo_area.polygonEnd(),
                bound.point = point,
                bound.lineStart = lineStart,
                bound.lineEnd = lineEnd,
                0 > d3_geo_areaRingSum ? (λ0 = -(λ1 = 180),
                φ0 = -(φ1 = 90)) : dλSum > ε ? φ1 = 90 : -ε > dλSum && (φ0 = -90),
                range[0] = λ0,
                range[1] = λ1
            }
        };
        return function(feature) {
            φ1 = λ1 = -(λ0 = φ0 = 1 / 0),
            ranges = [],
            d3.geo.stream(feature, bound);
            var n = ranges.length;
            if (n) {
                ranges.sort(compareRanges);
                for (var b, i = 1, a = ranges[0], merged = [a]; n > i; ++i)
                    b = ranges[i],
                    withinRange(b[0], a) || withinRange(b[1], a) ? (angle(a[0], b[1]) > angle(a[0], a[1]) && (a[1] = b[1]),
                    angle(b[0], a[1]) > angle(a[0], a[1]) && (a[0] = b[0])) : merged.push(a = b);
                for (var dλ, b, best = -(1 / 0), n = merged.length - 1, i = 0, a = merged[n]; n >= i; a = b,
                ++i)
                    b = merged[i],
                    (dλ = angle(a[1], b[0])) > best && (best = dλ,
                    λ0 = b[0],
                    λ1 = a[1])
            }
            return ranges = range = null ,
            λ0 === 1 / 0 || φ0 === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[λ0, φ0], [λ1, φ1]]
        }
    }
    (),
    d3.geo.centroid = function(object) {
        d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0,
        d3.geo.stream(object, d3_geo_centroid);
        var x = d3_geo_centroidX2
          , y = d3_geo_centroidY2
          , z = d3_geo_centroidZ2
          , m = x * x + y * y + z * z;
        return ε2 > m && (x = d3_geo_centroidX1,
        y = d3_geo_centroidY1,
        z = d3_geo_centroidZ1,
        ε > d3_geo_centroidW1 && (x = d3_geo_centroidX0,
        y = d3_geo_centroidY0,
        z = d3_geo_centroidZ0),
        m = x * x + y * y + z * z,
        ε2 > m) ? [NaN, NaN] : [Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees]
    }
    ;
    var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2, d3_geo_centroid = {
        sphere: d3_noop,
        point: d3_geo_centroidPoint,
        lineStart: d3_geo_centroidLineStart,
        lineEnd: d3_geo_centroidLineEnd,
        polygonStart: function() {
            d3_geo_centroid.lineStart = d3_geo_centroidRingStart
        },
        polygonEnd: function() {
            d3_geo_centroid.lineStart = d3_geo_centroidLineStart
        }
    }, d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [-π, -π / 2]), d3_geo_clipExtentMAX = 1e9;
    d3.geo.clipExtent = function() {
        var x0, y0, x1, y1, stream, clip, clipExtent = {
            stream: function(output) {
                return stream && (stream.valid = !1),
                stream = clip(output),
                stream.valid = !0,
                stream
            },
            extent: function(_) {
                return arguments.length ? (clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]),
                stream && (stream.valid = !1,
                stream = null ),
                clipExtent) : [[x0, y0], [x1, y1]]
            }
        };
        return clipExtent.extent([[0, 0], [960, 500]])
    }
    ,
    (d3.geo.conicEqualArea = function() {
        return d3_geo_conic(d3_geo_conicEqualArea)
    }
    ).raw = d3_geo_conicEqualArea,
    d3.geo.albers = function() {
        return d3.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }
    ,
    d3.geo.albersUsa = function() {
        function albersUsa(coordinates) {
            var x = coordinates[0]
              , y = coordinates[1];
            return point = null ,
            lower48Point(x, y),
            point || (alaskaPoint(x, y),
            point) || hawaiiPoint(x, y),
            point
        }
        var point, lower48Point, alaskaPoint, hawaiiPoint, lower48 = d3.geo.albers(), alaska = d3.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), hawaii = d3.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), pointStream = {
            point: function(x, y) {
                point = [x, y]
            }
        };
        return albersUsa.invert = function(coordinates) {
            var k = lower48.scale()
              , t = lower48.translate()
              , x = (coordinates[0] - t[0]) / k
              , y = (coordinates[1] - t[1]) / k;
            return (y >= .12 && .234 > y && x >= -.425 && -.214 > x ? alaska : y >= .166 && .234 > y && x >= -.214 && -.115 > x ? hawaii : lower48).invert(coordinates)
        }
        ,
        albersUsa.stream = function(stream) {
            var lower48Stream = lower48.stream(stream)
              , alaskaStream = alaska.stream(stream)
              , hawaiiStream = hawaii.stream(stream);
            return {
                point: function(x, y) {
                    lower48Stream.point(x, y),
                    alaskaStream.point(x, y),
                    hawaiiStream.point(x, y)
                },
                sphere: function() {
                    lower48Stream.sphere(),
                    alaskaStream.sphere(),
                    hawaiiStream.sphere()
                },
                lineStart: function() {
                    lower48Stream.lineStart(),
                    alaskaStream.lineStart(),
                    hawaiiStream.lineStart()
                },
                lineEnd: function() {
                    lower48Stream.lineEnd(),
                    alaskaStream.lineEnd(),
                    hawaiiStream.lineEnd()
                },
                polygonStart: function() {
                    lower48Stream.polygonStart(),
                    alaskaStream.polygonStart(),
                    hawaiiStream.polygonStart()
                },
                polygonEnd: function() {
                    lower48Stream.polygonEnd(),
                    alaskaStream.polygonEnd(),
                    hawaiiStream.polygonEnd()
                }
            }
        }
        ,
        albersUsa.precision = function(_) {
            return arguments.length ? (lower48.precision(_),
            alaska.precision(_),
            hawaii.precision(_),
            albersUsa) : lower48.precision()
        }
        ,
        albersUsa.scale = function(_) {
            return arguments.length ? (lower48.scale(_),
            alaska.scale(.35 * _),
            hawaii.scale(_),
            albersUsa.translate(lower48.translate())) : lower48.scale()
        }
        ,
        albersUsa.translate = function(_) {
            if (!arguments.length)
                return lower48.translate();
            var k = lower48.scale()
              , x = +_[0]
              , y = +_[1];
            return lower48Point = lower48.translate(_).clipExtent([[x - .455 * k, y - .238 * k], [x + .455 * k, y + .238 * k]]).stream(pointStream).point,
            alaskaPoint = alaska.translate([x - .307 * k, y + .201 * k]).clipExtent([[x - .425 * k + ε, y + .12 * k + ε], [x - .214 * k - ε, y + .234 * k - ε]]).stream(pointStream).point,
            hawaiiPoint = hawaii.translate([x - .205 * k, y + .212 * k]).clipExtent([[x - .214 * k + ε, y + .166 * k + ε], [x - .115 * k - ε, y + .234 * k - ε]]).stream(pointStream).point,
            albersUsa
        }
        ,
        albersUsa.scale(1070)
    }
    ;
    var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1, d3_geo_pathArea = {
        point: d3_noop,
        lineStart: d3_noop,
        lineEnd: d3_noop,
        polygonStart: function() {
            d3_geo_pathAreaPolygon = 0,
            d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart
        },
        polygonEnd: function() {
            d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop,
            d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2)
        }
    }, d3_geo_pathBounds = {
        point: d3_geo_pathBoundsPoint,
        lineStart: d3_noop,
        lineEnd: d3_noop,
        polygonStart: d3_noop,
        polygonEnd: d3_noop
    }, d3_geo_pathCentroid = {
        point: d3_geo_pathCentroidPoint,
        lineStart: d3_geo_pathCentroidLineStart,
        lineEnd: d3_geo_pathCentroidLineEnd,
        polygonStart: function() {
            d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart
        },
        polygonEnd: function() {
            d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint,
            d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart,
            d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd
        }
    };
    d3.geo.path = function() {
        function path(object) {
            return object && ("function" == typeof pointRadius && contextStream.pointRadius(+pointRadius.apply(this, arguments)),
            cacheStream && cacheStream.valid || (cacheStream = projectStream(contextStream)),
            d3.geo.stream(object, cacheStream)),
            contextStream.result()
        }
        function reset() {
            return cacheStream = null ,
            path
        }
        var projection, context, projectStream, contextStream, cacheStream, pointRadius = 4.5;
        return path.area = function(object) {
            return d3_geo_pathAreaSum = 0,
            d3.geo.stream(object, projectStream(d3_geo_pathArea)),
            d3_geo_pathAreaSum
        }
        ,
        path.centroid = function(object) {
            return d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0,
            d3.geo.stream(object, projectStream(d3_geo_pathCentroid)),
            d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2] : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1] : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0] : [NaN, NaN]
        }
        ,
        path.bounds = function(object) {
            return d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = 1 / 0),
            d3.geo.stream(object, projectStream(d3_geo_pathBounds)),
            [[d3_geo_pathBoundsX0, d3_geo_pathBoundsY0], [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]]
        }
        ,
        path.projection = function(_) {
            return arguments.length ? (projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity,
            reset()) : projection
        }
        ,
        path.context = function(_) {
            return arguments.length ? (contextStream = null  == (context = _) ? new d3_geo_pathBuffer : new d3_geo_pathContext(_),
            "function" != typeof pointRadius && contextStream.pointRadius(pointRadius),
            reset()) : context
        }
        ,
        path.pointRadius = function(_) {
            return arguments.length ? (pointRadius = "function" == typeof _ ? _ : (contextStream.pointRadius(+_),
            +_),
            path) : pointRadius
        }
        ,
        path.projection(d3.geo.albersUsa()).context(null )
    }
    ,
    d3.geo.transform = function(methods) {
        return {
            stream: function(stream) {
                var transform = new d3_geo_transform(stream);
                for (var k in methods)
                    transform[k] = methods[k];
                return transform
            }
        }
    }
    ,
    d3_geo_transform.prototype = {
        point: function(x, y) {
            this.stream.point(x, y)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    },
    d3.geo.projection = d3_geo_projection,
    d3.geo.projectionMutator = d3_geo_projectionMutator,
    (d3.geo.equirectangular = function() {
        return d3_geo_projection(d3_geo_equirectangular)
    }
    ).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular,
    d3.geo.rotation = function(rotate) {
        function forward(coordinates) {
            return coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians),
            coordinates[0] *= d3_degrees,
            coordinates[1] *= d3_degrees,
            coordinates
        }
        return rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0),
        forward.invert = function(coordinates) {
            return coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians),
            coordinates[0] *= d3_degrees,
            coordinates[1] *= d3_degrees,
            coordinates
        }
        ,
        forward
    }
    ,
    d3_geo_identityRotation.invert = d3_geo_equirectangular,
    d3.geo.circle = function() {
        function circle() {
            var center = "function" == typeof origin ? origin.apply(this, arguments) : origin
              , rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert
              , ring = [];
            return interpolate(null , null , 1, {
                point: function(x, y) {
                    ring.push(x = rotate(x, y)),
                    x[0] *= d3_degrees,
                    x[1] *= d3_degrees
                }
            }),
            {
                type: "Polygon",
                coordinates: [ring]
            }
        }
        var angle, interpolate, origin = [0, 0], precision = 6;
        return circle.origin = function(x) {
            return arguments.length ? (origin = x,
            circle) : origin
        }
        ,
        circle.angle = function(x) {
            return arguments.length ? (interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians),
            circle) : angle
        }
        ,
        circle.precision = function(_) {
            return arguments.length ? (interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians),
            circle) : precision
        }
        ,
        circle.angle(90)
    }
    ,
    d3.geo.distance = function(a, b) {
        var t, Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1);
        return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ)
    }
    ,
    d3.geo.graticule = function() {
        function graticule() {
            return {
                type: "MultiLineString",
                coordinates: lines()
            }
        }
        function lines() {
            return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
                return abs(x % DX) > ε
            }
            ).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
                return abs(y % DY) > ε
            }
            ).map(y))
        }
        var x1, x0, X1, X0, y1, y0, Y1, Y0, x, y, X, Y, dx = 10, dy = dx, DX = 90, DY = 360, precision = 2.5;
        return graticule.lines = function() {
            return lines().map(function(coordinates) {
                return {
                    type: "LineString",
                    coordinates: coordinates
                }
            }
            )
        }
        ,
        graticule.outline = function() {
            return {
                type: "Polygon",
                coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
            }
        }
        ,
        graticule.extent = function(_) {
            return arguments.length ? graticule.majorExtent(_).minorExtent(_) : graticule.minorExtent()
        }
        ,
        graticule.majorExtent = function(_) {
            return arguments.length ? (X0 = +_[0][0],
            X1 = +_[1][0],
            Y0 = +_[0][1],
            Y1 = +_[1][1],
            X0 > X1 && (_ = X0,
            X0 = X1,
            X1 = _),
            Y0 > Y1 && (_ = Y0,
            Y0 = Y1,
            Y1 = _),
            graticule.precision(precision)) : [[X0, Y0], [X1, Y1]]
        }
        ,
        graticule.minorExtent = function(_) {
            return arguments.length ? (x0 = +_[0][0],
            x1 = +_[1][0],
            y0 = +_[0][1],
            y1 = +_[1][1],
            x0 > x1 && (_ = x0,
            x0 = x1,
            x1 = _),
            y0 > y1 && (_ = y0,
            y0 = y1,
            y1 = _),
            graticule.precision(precision)) : [[x0, y0], [x1, y1]]
        }
        ,
        graticule.step = function(_) {
            return arguments.length ? graticule.majorStep(_).minorStep(_) : graticule.minorStep()
        }
        ,
        graticule.majorStep = function(_) {
            return arguments.length ? (DX = +_[0],
            DY = +_[1],
            graticule) : [DX, DY]
        }
        ,
        graticule.minorStep = function(_) {
            return arguments.length ? (dx = +_[0],
            dy = +_[1],
            graticule) : [dx, dy]
        }
        ,
        graticule.precision = function(_) {
            return arguments.length ? (precision = +_,
            x = d3_geo_graticuleX(y0, y1, 90),
            y = d3_geo_graticuleY(x0, x1, precision),
            X = d3_geo_graticuleX(Y0, Y1, 90),
            Y = d3_geo_graticuleY(X0, X1, precision),
            graticule) : precision
        }
        ,
        graticule.majorExtent([[-180, -90 + ε], [180, 90 - ε]]).minorExtent([[-180, -80 - ε], [180, 80 + ε]])
    }
    ,
    d3.geo.greatArc = function() {
        function greatArc() {
            return {
                type: "LineString",
                coordinates: [source_ || source.apply(this, arguments), target_ || target.apply(this, arguments)]
            }
        }
        var source_, target_, source = d3_source, target = d3_target;
        return greatArc.distance = function() {
            return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments))
        }
        ,
        greatArc.source = function(_) {
            return arguments.length ? (source = _,
            source_ = "function" == typeof _ ? null  : _,
            greatArc) : source
        }
        ,
        greatArc.target = function(_) {
            return arguments.length ? (target = _,
            target_ = "function" == typeof _ ? null  : _,
            greatArc) : target
        }
        ,
        greatArc.precision = function() {
            return arguments.length ? greatArc : 0
        }
        ,
        greatArc
    }
    ,
    d3.geo.interpolate = function(source, target) {
        return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians)
    }
    ,
    d3.geo.length = function(object) {
        return d3_geo_lengthSum = 0,
        d3.geo.stream(object, d3_geo_length),
        d3_geo_lengthSum
    }
    ;
    var d3_geo_lengthSum, d3_geo_length = {
        sphere: d3_noop,
        point: d3_noop,
        lineStart: d3_geo_lengthLineStart,
        lineEnd: d3_noop,
        polygonStart: d3_noop,
        polygonEnd: d3_noop
    }, d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
        return Math.sqrt(2 / (1 + cosλcosφ))
    }
    , function(ρ) {
        return 2 * Math.asin(ρ / 2)
    }
    );
    (d3.geo.azimuthalEqualArea = function() {
        return d3_geo_projection(d3_geo_azimuthalEqualArea)
    }
    ).raw = d3_geo_azimuthalEqualArea;
    var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
        var c = Math.acos(cosλcosφ);
        return c && c / Math.sin(c)
    }
    , d3_identity);
    (d3.geo.azimuthalEquidistant = function() {
        return d3_geo_projection(d3_geo_azimuthalEquidistant)
    }
    ).raw = d3_geo_azimuthalEquidistant,
    (d3.geo.conicConformal = function() {
        return d3_geo_conic(d3_geo_conicConformal)
    }
    ).raw = d3_geo_conicConformal,
    (d3.geo.conicEquidistant = function() {
        return d3_geo_conic(d3_geo_conicEquidistant)
    }
    ).raw = d3_geo_conicEquidistant;
    var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
        return 1 / cosλcosφ
    }
    , Math.atan);
    (d3.geo.gnomonic = function() {
        return d3_geo_projection(d3_geo_gnomonic)
    }
    ).raw = d3_geo_gnomonic,
    d3_geo_mercator.invert = function(x, y) {
        return [x, 2 * Math.atan(Math.exp(y)) - halfπ]
    }
    ,
    (d3.geo.mercator = function() {
        return d3_geo_mercatorProjection(d3_geo_mercator)
    }
    ).raw = d3_geo_mercator;
    var d3_geo_orthographic = d3_geo_azimuthal(function() {
        return 1
    }
    , Math.asin);
    (d3.geo.orthographic = function() {
        return d3_geo_projection(d3_geo_orthographic)
    }
    ).raw = d3_geo_orthographic;
    var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
        return 1 / (1 + cosλcosφ)
    }
    , function(ρ) {
        return 2 * Math.atan(ρ)
    }
    );
    (d3.geo.stereographic = function() {
        return d3_geo_projection(d3_geo_stereographic)
    }
    ).raw = d3_geo_stereographic,
    d3_geo_transverseMercator.invert = function(x, y) {
        return [-y, 2 * Math.atan(Math.exp(x)) - halfπ]
    }
    ,
    (d3.geo.transverseMercator = function() {
        var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator)
          , center = projection.center
          , rotate = projection.rotate;
        return projection.center = function(_) {
            return _ ? center([-_[1], _[0]]) : (_ = center(),
            [-_[1], _[0]])
        }
        ,
        projection.rotate = function(_) {
            return _ ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(),
            [_[0], _[1], _[2] - 90])
        }
        ,
        projection.rotate([0, 0])
    }
    ).raw = d3_geo_transverseMercator,
    d3.geom = {},
    d3.geom.hull = function(vertices) {
        function hull(data) {
            if (data.length < 3)
                return [];
            var vertices, d, i, j, x1, y1, x2, y2, u, v, a, sp, fx = d3_functor(x), fy = d3_functor(y), n = data.length, plen = n - 1, points = [], stack = [], h = 0;
            if (fx === d3_geom_pointX && y === d3_geom_pointY)
                vertices = data;
            else
                for (i = 0,
                vertices = []; n > i; ++i)
                    vertices.push([+fx.call(this, d = data[i], i), +fy.call(this, d, i)]);
            for (i = 1; n > i; ++i)
                (vertices[i][1] < vertices[h][1] || vertices[i][1] == vertices[h][1] && vertices[i][0] < vertices[h][0]) && (h = i);
            for (i = 0; n > i; ++i)
                i !== h && (y1 = vertices[i][1] - vertices[h][1],
                x1 = vertices[i][0] - vertices[h][0],
                points.push({
                    angle: Math.atan2(y1, x1),
                    index: i
                }));
            for (points.sort(function(a, b) {
                return a.angle - b.angle
            }
            ),
            a = points[0].angle,
            v = points[0].index,
            u = 0,
            i = 1; plen > i; ++i) {
                if (j = points[i].index,
                a == points[i].angle) {
                    if (x1 = vertices[v][0] - vertices[h][0],
                    y1 = vertices[v][1] - vertices[h][1],
                    x2 = vertices[j][0] - vertices[h][0],
                    y2 = vertices[j][1] - vertices[h][1],
                    x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
                        points[i].index = -1;
                        continue
                    }
                    points[u].index = -1
                }
                a = points[i].angle,
                u = i,
                v = j
            }
            for (stack.push(h),
            i = 0,
            j = 0; 2 > i; ++j)
                points[j].index > -1 && (stack.push(points[j].index),
                i++);
            for (sp = stack.length; plen > j; ++j)
                if (!(points[j].index < 0)) {
                    for (; !d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices); )
                        --sp;
                    stack[sp++] = points[j].index
                }
            var poly = [];
            for (i = sp - 1; i >= 0; --i)
                poly.push(data[stack[i]]);
            return poly
        }
        var x = d3_geom_pointX
          , y = d3_geom_pointY;
        return arguments.length ? hull(vertices) : (hull.x = function(_) {
            return arguments.length ? (x = _,
            hull) : x
        }
        ,
        hull.y = function(_) {
            return arguments.length ? (y = _,
            hull) : y
        }
        ,
        hull)
    }
    ,
    d3.geom.polygon = function(coordinates) {
        return d3_subclass(coordinates, d3_geom_polygonPrototype),
        coordinates
    }
    ;
    var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
    d3_geom_polygonPrototype.area = function() {
        for (var a, i = -1, n = this.length, b = this[n - 1], area = 0; ++i < n; )
            a = b,
            b = this[i],
            area += a[1] * b[0] - a[0] * b[1];
        return .5 * area
    }
    ,
    d3_geom_polygonPrototype.centroid = function(k) {
        var a, c, i = -1, n = this.length, x = 0, y = 0, b = this[n - 1];
        for (arguments.length || (k = -1 / (6 * this.area())); ++i < n; )
            a = b,
            b = this[i],
            c = a[0] * b[1] - b[0] * a[1],
            x += (a[0] + b[0]) * c,
            y += (a[1] + b[1]) * c;
        return [x * k, y * k]
    }
    ,
    d3_geom_polygonPrototype.clip = function(subject) {
        for (var input, j, m, b, c, d, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), a = this[n - 1]; ++i < n; ) {
            for (input = subject.slice(),
            subject.length = 0,
            b = this[i],
            c = input[(m = input.length - closed) - 1],
            j = -1; ++j < m; )
                d = input[j],
                d3_geom_polygonInside(d, a, b) ? (d3_geom_polygonInside(c, a, b) || subject.push(d3_geom_polygonIntersect(c, d, a, b)),
                subject.push(d)) : d3_geom_polygonInside(c, a, b) && subject.push(d3_geom_polygonIntersect(c, d, a, b)),
                c = d;
            closed && subject.push(subject[0]),
            a = b
        }
        return subject
    }
    ;
    var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiBeachPool = [], d3_geom_voronoiCirclePool = [];
    d3_geom_voronoiCell.prototype.prepare = function() {
        for (var edge, halfEdges = this.edges, iHalfEdge = halfEdges.length; iHalfEdge--; )
            edge = halfEdges[iHalfEdge].edge,
            edge.b && edge.a || halfEdges.splice(iHalfEdge, 1);
        return halfEdges.sort(d3_geom_voronoiHalfEdgeOrder),
        halfEdges.length
    }
    ,
    d3_geom_voronoiHalfEdge.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    },
    d3_geom_voronoiRedBlackTree.prototype = {
        insert: function(after, node) {
            var parent, grandpa, uncle;
            if (after) {
                if (node.P = after,
                node.N = after.N,
                after.N && (after.N.P = node),
                after.N = node,
                after.R) {
                    for (after = after.R; after.L; )
                        after = after.L;
                    after.L = node
                } else
                    after.R = node;
                parent = after
            } else
                this._ ? (after = d3_geom_voronoiRedBlackFirst(this._),
                node.P = null ,
                node.N = after,
                after.P = after.L = node,
                parent = after) : (node.P = node.N = null ,
                this._ = node,
                parent = null );
            for (node.L = node.R = null ,
            node.U = parent,
            node.C = !0,
            after = node; parent && parent.C; )
                grandpa = parent.U,
                parent === grandpa.L ? (uncle = grandpa.R,
                uncle && uncle.C ? (parent.C = uncle.C = !1,
                grandpa.C = !0,
                after = grandpa) : (after === parent.R && (d3_geom_voronoiRedBlackRotateLeft(this, parent),
                after = parent,
                parent = after.U),
                parent.C = !1,
                grandpa.C = !0,
                d3_geom_voronoiRedBlackRotateRight(this, grandpa))) : (uncle = grandpa.L,
                uncle && uncle.C ? (parent.C = uncle.C = !1,
                grandpa.C = !0,
                after = grandpa) : (after === parent.L && (d3_geom_voronoiRedBlackRotateRight(this, parent),
                after = parent,
                parent = after.U),
                parent.C = !1,
                grandpa.C = !0,
                d3_geom_voronoiRedBlackRotateLeft(this, grandpa))),
                parent = after.U;
            this._.C = !1
        },
        remove: function(node) {
            node.N && (node.N.P = node.P),
            node.P && (node.P.N = node.N),
            node.N = node.P = null ;
            var sibling, next, red, parent = node.U, left = node.L, right = node.R;
            if (next = left ? right ? d3_geom_voronoiRedBlackFirst(right) : left : right,
            parent ? parent.L === node ? parent.L = next : parent.R = next : this._ = next,
            left && right ? (red = next.C,
            next.C = node.C,
            next.L = left,
            left.U = next,
            next !== right ? (parent = next.U,
            next.U = node.U,
            node = next.R,
            parent.L = node,
            next.R = right,
            right.U = next) : (next.U = parent,
            parent = next,
            node = next.R)) : (red = node.C,
            node = next),
            node && (node.U = parent),
            !red) {
                if (node && node.C)
                    return void (node.C = !1);
                do {
                    if (node === this._)
                        break;
                    if (node === parent.L) {
                        if (sibling = parent.R,
                        sibling.C && (sibling.C = !1,
                        parent.C = !0,
                        d3_geom_voronoiRedBlackRotateLeft(this, parent),
                        sibling = parent.R),
                        sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
                            sibling.R && sibling.R.C || (sibling.L.C = !1,
                            sibling.C = !0,
                            d3_geom_voronoiRedBlackRotateRight(this, sibling),
                            sibling = parent.R),
                            sibling.C = parent.C,
                            parent.C = sibling.R.C = !1,
                            d3_geom_voronoiRedBlackRotateLeft(this, parent),
                            node = this._;
                            break
                        }
                    } else if (sibling = parent.L,
                    sibling.C && (sibling.C = !1,
                    parent.C = !0,
                    d3_geom_voronoiRedBlackRotateRight(this, parent),
                    sibling = parent.L),
                    sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
                        sibling.L && sibling.L.C || (sibling.R.C = !1,
                        sibling.C = !0,
                        d3_geom_voronoiRedBlackRotateLeft(this, sibling),
                        sibling = parent.L),
                        sibling.C = parent.C,
                        parent.C = sibling.L.C = !1,
                        d3_geom_voronoiRedBlackRotateRight(this, parent),
                        node = this._;
                        break
                    }
                    sibling.C = !0,
                    node = parent,
                    parent = parent.U
                } while (!node.C);node && (node.C = !1)
            }
        }
    },
    d3.geom.voronoi = function(points) {
        function voronoi(data) {
            var polygons = new Array(data.length)
              , x0 = clipExtent[0][0]
              , y0 = clipExtent[0][1]
              , x1 = clipExtent[1][0]
              , y1 = clipExtent[1][1];
            return d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
                var edges = cell.edges
                  , site = cell.site
                  , polygon = polygons[i] = edges.length ? edges.map(function(e) {
                    var s = e.start();
                    return [s.x, s.y]
                }
                ) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [[x0, y1], [x1, y1], [x1, y0], [x0, y0]] : [];
                polygon.point = data[i]
            }
            ),
            polygons
        }
        function sites(data) {
            return data.map(function(d, i) {
                return {
                    x: Math.round(fx(d, i) / ε) * ε,
                    y: Math.round(fy(d, i) / ε) * ε,
                    i: i
                }
            }
            )
        }
        var x = d3_geom_pointX
          , y = d3_geom_pointY
          , fx = x
          , fy = y
          , clipExtent = d3_geom_voronoiClipExtent;
        return points ? voronoi(points) : (voronoi.links = function(data) {
            return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
                return edge.l && edge.r
            }
            ).map(function(edge) {
                return {
                    source: data[edge.l.i],
                    target: data[edge.r.i]
                }
            }
            )
        }
        ,
        voronoi.triangles = function(data) {
            var triangles = [];
            return d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
                for (var e0, s0, site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l; ++j < m; )
                    e0 = e1,
                    s0 = s1,
                    e1 = edges[j].edge,
                    s1 = e1.l === site ? e1.r : e1.l,
                    i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0 && triangles.push([data[i], data[s0.i], data[s1.i]])
            }
            ),
            triangles
        }
        ,
        voronoi.x = function(_) {
            return arguments.length ? (fx = d3_functor(x = _),
            voronoi) : x
        }
        ,
        voronoi.y = function(_) {
            return arguments.length ? (fy = d3_functor(y = _),
            voronoi) : y
        }
        ,
        voronoi.clipExtent = function(_) {
            return arguments.length ? (clipExtent = null  == _ ? d3_geom_voronoiClipExtent : _,
            voronoi) : clipExtent === d3_geom_voronoiClipExtent ? null  : clipExtent
        }
        ,
        voronoi.size = function(_) {
            return arguments.length ? voronoi.clipExtent(_ && [[0, 0], _]) : clipExtent === d3_geom_voronoiClipExtent ? null  : clipExtent && clipExtent[1]
        }
        ,
        voronoi)
    }
    ;
    var d3_geom_voronoiClipExtent = [[-1e6, -1e6], [1e6, 1e6]];
    d3.geom.delaunay = function(vertices) {
        return d3.geom.voronoi().triangles(vertices)
    }
    ,
    d3.geom.quadtree = function(points, x1, y1, x2, y2) {
        function quadtree(data) {
            function insert(n, d, x, y, x1, y1, x2, y2) {
                if (!isNaN(x) && !isNaN(y))
                    if (n.leaf) {
                        var nx = n.x
                          , ny = n.y;
                        if (null  != nx)
                            if (abs(nx - x) + abs(ny - y) < .01)
                                insertChild(n, d, x, y, x1, y1, x2, y2);
                            else {
                                var nPoint = n.point;
                                n.x = n.y = n.point = null ,
                                insertChild(n, nPoint, nx, ny, x1, y1, x2, y2),
                                insertChild(n, d, x, y, x1, y1, x2, y2)
                            }
                        else
                            n.x = x,
                            n.y = y,
                            n.point = d
                    } else
                        insertChild(n, d, x, y, x1, y1, x2, y2)
            }
            function insertChild(n, d, x, y, x1, y1, x2, y2) {
                var sx = .5 * (x1 + x2)
                  , sy = .5 * (y1 + y2)
                  , right = x >= sx
                  , bottom = y >= sy
                  , i = (bottom << 1) + right;
                n.leaf = !1,
                n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode()),
                right ? x1 = sx : x2 = sx,
                bottom ? y1 = sy : y2 = sy,
                insert(n, d, x, y, x1, y1, x2, y2)
            }
            var d, xs, ys, i, n, x1_, y1_, x2_, y2_, fx = d3_functor(x), fy = d3_functor(y);
            if (null  != x1)
                x1_ = x1,
                y1_ = y1,
                x2_ = x2,
                y2_ = y2;
            else if (x2_ = y2_ = -(x1_ = y1_ = 1 / 0),
            xs = [],
            ys = [],
            n = data.length,
            compat)
                for (i = 0; n > i; ++i)
                    d = data[i],
                    d.x < x1_ && (x1_ = d.x),
                    d.y < y1_ && (y1_ = d.y),
                    d.x > x2_ && (x2_ = d.x),
                    d.y > y2_ && (y2_ = d.y),
                    xs.push(d.x),
                    ys.push(d.y);
            else
                for (i = 0; n > i; ++i) {
                    var x_ = +fx(d = data[i], i)
                      , y_ = +fy(d, i);
                    x1_ > x_ && (x1_ = x_),
                    y1_ > y_ && (y1_ = y_),
                    x_ > x2_ && (x2_ = x_),
                    y_ > y2_ && (y2_ = y_),
                    xs.push(x_),
                    ys.push(y_)
                }
            var dx = x2_ - x1_
              , dy = y2_ - y1_;
            dx > dy ? y2_ = y1_ + dx : x2_ = x1_ + dy;
            var root = d3_geom_quadtreeNode();
            if (root.add = function(d) {
                insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_)
            }
            ,
            root.visit = function(f) {
                d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_)
            }
            ,
            i = -1,
            null  == x1) {
                for (; ++i < n; )
                    insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
                --i
            } else
                data.forEach(root.add);
            return xs = ys = data = d = null ,
            root
        }
        var compat, x = d3_geom_pointX, y = d3_geom_pointY;
        return (compat = arguments.length) ? (x = d3_geom_quadtreeCompatX,
        y = d3_geom_quadtreeCompatY,
        3 === compat && (y2 = y1,
        x2 = x1,
        y1 = x1 = 0),
        quadtree(points)) : (quadtree.x = function(_) {
            return arguments.length ? (x = _,
            quadtree) : x
        }
        ,
        quadtree.y = function(_) {
            return arguments.length ? (y = _,
            quadtree) : y
        }
        ,
        quadtree.extent = function(_) {
            return arguments.length ? (null  == _ ? x1 = y1 = x2 = y2 = null  : (x1 = +_[0][0],
            y1 = +_[0][1],
            x2 = +_[1][0],
            y2 = +_[1][1]),
            quadtree) : null  == x1 ? null  : [[x1, y1], [x2, y2]]
        }
        ,
        quadtree.size = function(_) {
            return arguments.length ? (null  == _ ? x1 = y1 = x2 = y2 = null  : (x1 = y1 = 0,
            x2 = +_[0],
            y2 = +_[1]),
            quadtree) : null  == x1 ? null  : [x2 - x1, y2 - y1]
        }
        ,
        quadtree)
    }
    ,
    d3.interpolateRgb = d3_interpolateRgb,
    d3.interpolateObject = d3_interpolateObject,
    d3.interpolateNumber = d3_interpolateNumber,
    d3.interpolateString = d3_interpolateString;
    var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolate = d3_interpolate,
    d3.interpolators = [function(a, b) {
        var t = typeof b;
        return ("string" === t ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_Color ? d3_interpolateRgb : "object" === t ? Array.isArray(b) ? d3_interpolateArray : d3_interpolateObject : d3_interpolateNumber)(a, b)
    }
    ],
    d3.interpolateArray = d3_interpolateArray;
    var d3_ease_default = function() {
        return d3_identity
    }
      , d3_ease = d3.map({
        linear: d3_ease_default,
        poly: d3_ease_poly,
        quad: function() {
            return d3_ease_quad
        },
        cubic: function() {
            return d3_ease_cubic
        },
        sin: function() {
            return d3_ease_sin
        },
        exp: function() {
            return d3_ease_exp
        },
        circle: function() {
            return d3_ease_circle
        },
        elastic: d3_ease_elastic,
        back: d3_ease_back,
        bounce: function() {
            return d3_ease_bounce
        }
    })
      , d3_ease_mode = d3.map({
        "in": d3_identity,
        out: d3_ease_reverse,
        "in-out": d3_ease_reflect,
        "out-in": function(f) {
            return d3_ease_reflect(d3_ease_reverse(f))
        }
    });
    d3.ease = function(name) {
        var i = name.indexOf("-")
          , t = i >= 0 ? name.substring(0, i) : name
          , m = i >= 0 ? name.substring(i + 1) : "in";
        return t = d3_ease.get(t) || d3_ease_default,
        m = d3_ease_mode.get(m) || d3_identity,
        d3_ease_clamp(m(t.apply(null , d3_arraySlice.call(arguments, 1))))
    }
    ,
    d3.interpolateHcl = d3_interpolateHcl,
    d3.interpolateHsl = d3_interpolateHsl,
    d3.interpolateLab = d3_interpolateLab,
    d3.interpolateRound = d3_interpolateRound,
    d3.transform = function(string) {
        var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
        return (d3.transform = function(string) {
            if (null  != string) {
                g.setAttribute("transform", string);
                var t = g.transform.baseVal.consolidate()
            }
            return new d3_transform(t ? t.matrix : d3_transformIdentity)
        }
        )(string)
    }
    ,
    d3_transform.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    }
    ;
    var d3_transformIdentity = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    d3.interpolateTransform = d3_interpolateTransform,
    d3.layout = {},
    d3.layout.bundle = function() {
        return function(links) {
            for (var paths = [], i = -1, n = links.length; ++i < n; )
                paths.push(d3_layout_bundlePath(links[i]));
            return paths
        }
    }
    ,
    d3.layout.chord = function() {
        function relayout() {
            var k, x, x0, i, j, subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [];
            for (chords = [],
            groups = [],
            k = 0,
            i = -1; ++i < n; ) {
                for (x = 0,
                j = -1; ++j < n; )
                    x += matrix[i][j];
                groupSums.push(x),
                subgroupIndex.push(d3.range(n)),
                k += x
            }
            for (sortGroups && groupIndex.sort(function(a, b) {
                return sortGroups(groupSums[a], groupSums[b])
            }
            ),
            sortSubgroups && subgroupIndex.forEach(function(d, i) {
                d.sort(function(a, b) {
                    return sortSubgroups(matrix[i][a], matrix[i][b])
                }
                )
            }
            ),
            k = (τ - padding * n) / k,
            x = 0,
            i = -1; ++i < n; ) {
                for (x0 = x,
                j = -1; ++j < n; ) {
                    var di = groupIndex[i]
                      , dj = subgroupIndex[di][j]
                      , v = matrix[di][dj]
                      , a0 = x
                      , a1 = x += v * k;
                    subgroups[di + "-" + dj] = {
                        index: di,
                        subindex: dj,
                        startAngle: a0,
                        endAngle: a1,
                        value: v
                    }
                }
                groups[di] = {
                    index: di,
                    startAngle: x0,
                    endAngle: x,
                    value: (x - x0) / k
                },
                x += padding
            }
            for (i = -1; ++i < n; )
                for (j = i - 1; ++j < n; ) {
                    var source = subgroups[i + "-" + j]
                      , target = subgroups[j + "-" + i];
                    (source.value || target.value) && chords.push(source.value < target.value ? {
                        source: target,
                        target: source
                    } : {
                        source: source,
                        target: target
                    })
                }
            sortChords && resort()
        }
        function resort() {
            chords.sort(function(a, b) {
                return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
            }
            )
        }
        var chords, groups, matrix, n, sortGroups, sortSubgroups, sortChords, chord = {}, padding = 0;
        return chord.matrix = function(x) {
            return arguments.length ? (n = (matrix = x) && matrix.length,
            chords = groups = null ,
            chord) : matrix
        }
        ,
        chord.padding = function(x) {
            return arguments.length ? (padding = x,
            chords = groups = null ,
            chord) : padding
        }
        ,
        chord.sortGroups = function(x) {
            return arguments.length ? (sortGroups = x,
            chords = groups = null ,
            chord) : sortGroups
        }
        ,
        chord.sortSubgroups = function(x) {
            return arguments.length ? (sortSubgroups = x,
            chords = null ,
            chord) : sortSubgroups
        }
        ,
        chord.sortChords = function(x) {
            return arguments.length ? (sortChords = x,
            chords && resort(),
            chord) : sortChords
        }
        ,
        chord.chords = function() {
            return chords || relayout(),
            chords
        }
        ,
        chord.groups = function() {
            return groups || relayout(),
            groups
        }
        ,
        chord
    }
    ,
    d3.layout.force = function() {
        function repulse(node) {
            return function(quad, x1, _, x2) {
                if (quad.point !== node) {
                    var dx = quad.cx - node.x
                      , dy = quad.cy - node.y
                      , dn = 1 / Math.sqrt(dx * dx + dy * dy);
                    if (theta > (x2 - x1) * dn) {
                        var k = quad.charge * dn * dn;
                        return node.px -= dx * k,
                        node.py -= dy * k,
                        !0
                    }
                    if (quad.point && isFinite(dn)) {
                        var k = quad.pointCharge * dn * dn;
                        node.px -= dx * k,
                        node.py -= dy * k
                    }
                }
                return !quad.charge
            }
        }
        function dragmove(d) {
            d.px = d3.event.x,
            d.py = d3.event.y,
            force.resume()
        }
        var drag, alpha, distances, strengths, charges, force = {}, event = d3.dispatch("start", "tick", "end"), size = [1, 1], friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, nodes = [], links = [];
        return force.tick = function() {
            if ((alpha *= .99) < .005)
                return event.end({
                    type: "end",
                    alpha: alpha = 0
                }),
                !0;
            var q, i, o, s, t, l, k, x, y, n = nodes.length, m = links.length;
            for (i = 0; m > i; ++i)
                o = links[i],
                s = o.source,
                t = o.target,
                x = t.x - s.x,
                y = t.y - s.y,
                (l = x * x + y * y) && (l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l,
                x *= l,
                y *= l,
                t.x -= x * (k = s.weight / (t.weight + s.weight)),
                t.y -= y * k,
                s.x += x * (k = 1 - k),
                s.y += y * k);
            if ((k = alpha * gravity) && (x = size[0] / 2,
            y = size[1] / 2,
            i = -1,
            k))
                for (; ++i < n; )
                    o = nodes[i],
                    o.x += (x - o.x) * k,
                    o.y += (y - o.y) * k;
            if (charge)
                for (d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges),
                i = -1; ++i < n; )
                    (o = nodes[i]).fixed || q.visit(repulse(o));
            for (i = -1; ++i < n; )
                o = nodes[i],
                o.fixed ? (o.x = o.px,
                o.y = o.py) : (o.x -= (o.px - (o.px = o.x)) * friction,
                o.y -= (o.py - (o.py = o.y)) * friction);
            event.tick({
                type: "tick",
                alpha: alpha
            })
        }
        ,
        force.nodes = function(x) {
            return arguments.length ? (nodes = x,
            force) : nodes
        }
        ,
        force.links = function(x) {
            return arguments.length ? (links = x,
            force) : links
        }
        ,
        force.size = function(x) {
            return arguments.length ? (size = x,
            force) : size
        }
        ,
        force.linkDistance = function(x) {
            return arguments.length ? (linkDistance = "function" == typeof x ? x : +x,
            force) : linkDistance
        }
        ,
        force.distance = force.linkDistance,
        force.linkStrength = function(x) {
            return arguments.length ? (linkStrength = "function" == typeof x ? x : +x,
            force) : linkStrength
        }
        ,
        force.friction = function(x) {
            return arguments.length ? (friction = +x,
            force) : friction
        }
        ,
        force.charge = function(x) {
            return arguments.length ? (charge = "function" == typeof x ? x : +x,
            force) : charge
        }
        ,
        force.gravity = function(x) {
            return arguments.length ? (gravity = +x,
            force) : gravity
        }
        ,
        force.theta = function(x) {
            return arguments.length ? (theta = +x,
            force) : theta
        }
        ,
        force.alpha = function(x) {
            return arguments.length ? (x = +x,
            alpha ? alpha = x > 0 ? x : 0 : x > 0 && (event.start({
                type: "start",
                alpha: alpha = x
            }),
            d3.timer(force.tick)),
            force) : alpha
        }
        ,
        force.start = function() {
            function position(dimension, size) {
                if (!neighbors) {
                    for (neighbors = new Array(n),
                    j = 0; n > j; ++j)
                        neighbors[j] = [];
                    for (j = 0; m > j; ++j) {
                        var o = links[j];
                        neighbors[o.source.index].push(o.target),
                        neighbors[o.target.index].push(o.source)
                    }
                }
                for (var x, candidates = neighbors[i], j = -1, m = candidates.length; ++j < m; )
                    if (!isNaN(x = candidates[j][dimension]))
                        return x;
                return Math.random() * size
            }
            var i, neighbors, o, n = nodes.length, m = links.length, w = size[0], h = size[1];
            for (i = 0; n > i; ++i)
                (o = nodes[i]).index = i,
                o.weight = 0;
            for (i = 0; m > i; ++i)
                o = links[i],
                "number" == typeof o.source && (o.source = nodes[o.source]),
                "number" == typeof o.target && (o.target = nodes[o.target]),
                ++o.source.weight,
                ++o.target.weight;
            for (i = 0; n > i; ++i)
                o = nodes[i],
                isNaN(o.x) && (o.x = position("x", w)),
                isNaN(o.y) && (o.y = position("y", h)),
                isNaN(o.px) && (o.px = o.x),
                isNaN(o.py) && (o.py = o.y);
            if (distances = [],
            "function" == typeof linkDistance)
                for (i = 0; m > i; ++i)
                    distances[i] = +linkDistance.call(this, links[i], i);
            else
                for (i = 0; m > i; ++i)
                    distances[i] = linkDistance;
            if (strengths = [],
            "function" == typeof linkStrength)
                for (i = 0; m > i; ++i)
                    strengths[i] = +linkStrength.call(this, links[i], i);
            else
                for (i = 0; m > i; ++i)
                    strengths[i] = linkStrength;
            if (charges = [],
            "function" == typeof charge)
                for (i = 0; n > i; ++i)
                    charges[i] = +charge.call(this, nodes[i], i);
            else
                for (i = 0; n > i; ++i)
                    charges[i] = charge;
            return force.resume()
        }
        ,
        force.resume = function() {
            return force.alpha(.1)
        }
        ,
        force.stop = function() {
            return force.alpha(0)
        }
        ,
        force.drag = function() {
            return drag || (drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend)),
            arguments.length ? void this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag) : drag
        }
        ,
        d3.rebind(force, event, "on")
    }
    ;
    var d3_layout_forceLinkDistance = 20
      , d3_layout_forceLinkStrength = 1;
    d3.layout.hierarchy = function() {
        function recurse(node, depth, nodes) {
            var childs = children.call(hierarchy, node, depth);
            if (node.depth = depth,
            nodes.push(node),
            childs && (n = childs.length)) {
                for (var n, d, i = -1, c = node.children = new Array(n), v = 0, j = depth + 1; ++i < n; )
                    d = c[i] = recurse(childs[i], j, nodes),
                    d.parent = node,
                    v += d.value;
                sort && c.sort(sort),
                value && (node.value = v)
            } else
                delete node.children,
                value && (node.value = +value.call(hierarchy, node, depth) || 0);
            return node
        }
        function revalue(node, depth) {
            var children = node.children
              , v = 0;
            if (children && (n = children.length))
                for (var n, i = -1, j = depth + 1; ++i < n; )
                    v += revalue(children[i], j);
            else
                value && (v = +value.call(hierarchy, node, depth) || 0);
            return value && (node.value = v),
            v
        }
        function hierarchy(d) {
            var nodes = [];
            return recurse(d, 0, nodes),
            nodes
        }
        var sort = d3_layout_hierarchySort
          , children = d3_layout_hierarchyChildren
          , value = d3_layout_hierarchyValue;
        return hierarchy.sort = function(x) {
            return arguments.length ? (sort = x,
            hierarchy) : sort
        }
        ,
        hierarchy.children = function(x) {
            return arguments.length ? (children = x,
            hierarchy) : children
        }
        ,
        hierarchy.value = function(x) {
            return arguments.length ? (value = x,
            hierarchy) : value
        }
        ,
        hierarchy.revalue = function(root) {
            return revalue(root, 0),
            root
        }
        ,
        hierarchy
    }
    ,
    d3.layout.partition = function() {
        function position(node, x, dx, dy) {
            var children = node.children;
            if (node.x = x,
            node.y = node.depth * dy,
            node.dx = dx,
            node.dy = dy,
            children && (n = children.length)) {
                var n, c, d, i = -1;
                for (dx = node.value ? dx / node.value : 0; ++i < n; )
                    position(c = children[i], x, d = c.value * dx, dy),
                    x += d
            }
        }
        function depth(node) {
            var children = node.children
              , d = 0;
            if (children && (n = children.length))
                for (var n, i = -1; ++i < n; )
                    d = Math.max(d, depth(children[i]));
            return 1 + d
        }
        function partition(d, i) {
            var nodes = hierarchy.call(this, d, i);
            return position(nodes[0], 0, size[0], size[1] / depth(nodes[0])),
            nodes
        }
        var hierarchy = d3.layout.hierarchy()
          , size = [1, 1];
        return partition.size = function(x) {
            return arguments.length ? (size = x,
            partition) : size
        }
        ,
        d3_layout_hierarchyRebind(partition, hierarchy)
    }
    ,
    d3.layout.pie = function() {
        function pie(data) {
            var values = data.map(function(d, i) {
                return +value.call(pie, d, i)
            }
            )
              , a = +("function" == typeof startAngle ? startAngle.apply(this, arguments) : startAngle)
              , k = (("function" == typeof endAngle ? endAngle.apply(this, arguments) : endAngle) - a) / d3.sum(values)
              , index = d3.range(data.length);
            null  != sort && index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
                return values[j] - values[i]
            }
             : function(i, j) {
                return sort(data[i], data[j])
            }
            );
            var arcs = [];
            return index.forEach(function(i) {
                var d;
                arcs[i] = {
                    data: data[i],
                    value: d = values[i],
                    startAngle: a,
                    endAngle: a += d * k
                }
            }
            ),
            arcs
        }
        var value = Number
          , sort = d3_layout_pieSortByValue
          , startAngle = 0
          , endAngle = τ;
        return pie.value = function(x) {
            return arguments.length ? (value = x,
            pie) : value
        }
        ,
        pie.sort = function(x) {
            return arguments.length ? (sort = x,
            pie) : sort
        }
        ,
        pie.startAngle = function(x) {
            return arguments.length ? (startAngle = x,
            pie) : startAngle
        }
        ,
        pie.endAngle = function(x) {
            return arguments.length ? (endAngle = x,
            pie) : endAngle
        }
        ,
        pie
    }
    ;
    var d3_layout_pieSortByValue = {};
    d3.layout.stack = function() {
        function stack(data, index) {
            var series = data.map(function(d, i) {
                return values.call(stack, d, i)
            }
            )
              , points = series.map(function(d) {
                return d.map(function(v, i) {
                    return [x.call(stack, v, i), y.call(stack, v, i)]
                }
                )
            }
            )
              , orders = order.call(stack, points, index);
            series = d3.permute(series, orders),
            points = d3.permute(points, orders);
            var i, j, o, offsets = offset.call(stack, points, index), n = series.length, m = series[0].length;
            for (j = 0; m > j; ++j)
                for (out.call(stack, series[0][j], o = offsets[j], points[0][j][1]),
                i = 1; n > i; ++i)
                    out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
            return data
        }
        var values = d3_identity
          , order = d3_layout_stackOrderDefault
          , offset = d3_layout_stackOffsetZero
          , out = d3_layout_stackOut
          , x = d3_layout_stackX
          , y = d3_layout_stackY;
        return stack.values = function(x) {
            return arguments.length ? (values = x,
            stack) : values
        }
        ,
        stack.order = function(x) {
            return arguments.length ? (order = "function" == typeof x ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault,
            stack) : order
        }
        ,
        stack.offset = function(x) {
            return arguments.length ? (offset = "function" == typeof x ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero,
            stack) : offset
        }
        ,
        stack.x = function(z) {
            return arguments.length ? (x = z,
            stack) : x
        }
        ,
        stack.y = function(z) {
            return arguments.length ? (y = z,
            stack) : y
        }
        ,
        stack.out = function(z) {
            return arguments.length ? (out = z,
            stack) : out
        }
        ,
        stack
    }
    ;
    var d3_layout_stackOrders = d3.map({
        "inside-out": function(data) {
            var i, j, n = data.length, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
                return max[a] - max[b]
            }
            ), top = 0, bottom = 0, tops = [], bottoms = [];
            for (i = 0; n > i; ++i)
                j = index[i],
                bottom > top ? (top += sums[j],
                tops.push(j)) : (bottom += sums[j],
                bottoms.push(j));
            return bottoms.reverse().concat(tops)
        },
        reverse: function(data) {
            return d3.range(data.length).reverse()
        },
        "default": d3_layout_stackOrderDefault
    })
      , d3_layout_stackOffsets = d3.map({
        silhouette: function(data) {
            var i, j, o, n = data.length, m = data[0].length, sums = [], max = 0, y0 = [];
            for (j = 0; m > j; ++j) {
                for (i = 0,
                o = 0; n > i; i++)
                    o += data[i][j][1];
                o > max && (max = o),
                sums.push(o)
            }
            for (j = 0; m > j; ++j)
                y0[j] = (max - sums[j]) / 2;
            return y0
        },
        wiggle: function(data) {
            var i, j, k, s1, s2, s3, dx, o, o0, n = data.length, x = data[0], m = x.length, y0 = [];
            for (y0[0] = o = o0 = 0,
            j = 1; m > j; ++j) {
                for (i = 0,
                s1 = 0; n > i; ++i)
                    s1 += data[i][j][1];
                for (i = 0,
                s2 = 0,
                dx = x[j][0] - x[j - 1][0]; n > i; ++i) {
                    for (k = 0,
                    s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); i > k; ++k)
                        s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
                    s2 += s3 * data[i][j][1]
                }
                y0[j] = o -= s1 ? s2 / s1 * dx : 0,
                o0 > o && (o0 = o)
            }
            for (j = 0; m > j; ++j)
                y0[j] -= o0;
            return y0
        },
        expand: function(data) {
            var i, j, o, n = data.length, m = data[0].length, k = 1 / n, y0 = [];
            for (j = 0; m > j; ++j) {
                for (i = 0,
                o = 0; n > i; i++)
                    o += data[i][j][1];
                if (o)
                    for (i = 0; n > i; i++)
                        data[i][j][1] /= o;
                else
                    for (i = 0; n > i; i++)
                        data[i][j][1] = k
            }
            for (j = 0; m > j; ++j)
                y0[j] = 0;
            return y0
        },
        zero: d3_layout_stackOffsetZero
    });
    d3.layout.histogram = function() {
        function histogram(data, i) {
            for (var bin, x, bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n; ++i < m; )
                bin = bins[i] = [],
                bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]),
                bin.y = 0;
            if (m > 0)
                for (i = -1; ++i < n; )
                    x = values[i],
                    x >= range[0] && x <= range[1] && (bin = bins[d3.bisect(thresholds, x, 1, m) - 1],
                    bin.y += k,
                    bin.push(data[i]));
            return bins
        }
        var frequency = !0
          , valuer = Number
          , ranger = d3_layout_histogramRange
          , binner = d3_layout_histogramBinSturges;
        return histogram.value = function(x) {
            return arguments.length ? (valuer = x,
            histogram) : valuer
        }
        ,
        histogram.range = function(x) {
            return arguments.length ? (ranger = d3_functor(x),
            histogram) : ranger
        }
        ,
        histogram.bins = function(x) {
            return arguments.length ? (binner = "number" == typeof x ? function(range) {
                return d3_layout_histogramBinFixed(range, x)
            }
             : d3_functor(x),
            histogram) : binner
        }
        ,
        histogram.frequency = function(x) {
            return arguments.length ? (frequency = !!x,
            histogram) : frequency
        }
        ,
        histogram
    }
    ,
    d3.layout.tree = function() {
        function tree(d, i) {
            function firstWalk(node, previousSibling) {
                var children = node.children
                  , layout = node._tree;
                if (children && (n = children.length)) {
                    for (var n, previousChild, child, firstChild = children[0], ancestor = firstChild, i = -1; ++i < n; )
                        child = children[i],
                        firstWalk(child, previousChild),
                        ancestor = apportion(child, previousChild, ancestor),
                        previousChild = child;
                    d3_layout_treeShift(node);
                    var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
                    previousSibling ? (layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling),
                    layout.mod = layout.prelim - midpoint) : layout.prelim = midpoint
                } else
                    previousSibling && (layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling))
            }
            function secondWalk(node, x) {
                node.x = node._tree.prelim + x;
                var children = node.children;
                if (children && (n = children.length)) {
                    var n, i = -1;
                    for (x += node._tree.mod; ++i < n; )
                        secondWalk(children[i], x)
                }
            }
            function apportion(node, previousSibling, ancestor) {
                if (previousSibling) {
                    for (var shift, vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod; vim = d3_layout_treeRight(vim),
                    vip = d3_layout_treeLeft(vip),
                    vim && vip; )
                        vom = d3_layout_treeLeft(vom),
                        vop = d3_layout_treeRight(vop),
                        vop._tree.ancestor = node,
                        shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip),
                        shift > 0 && (d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift),
                        sip += shift,
                        sop += shift),
                        sim += vim._tree.mod,
                        sip += vip._tree.mod,
                        som += vom._tree.mod,
                        sop += vop._tree.mod;
                    vim && !d3_layout_treeRight(vop) && (vop._tree.thread = vim,
                    vop._tree.mod += sim - sop),
                    vip && !d3_layout_treeLeft(vom) && (vom._tree.thread = vip,
                    vom._tree.mod += sip - som,
                    ancestor = node)
                }
                return ancestor
            }
            var nodes = hierarchy.call(this, d, i)
              , root = nodes[0];
            d3_layout_treeVisitAfter(root, function(node, previousSibling) {
                node._tree = {
                    ancestor: node,
                    prelim: 0,
                    mod: 0,
                    change: 0,
                    shift: 0,
                    number: previousSibling ? previousSibling._tree.number + 1 : 0
                }
            }
            ),
            firstWalk(root),
            secondWalk(root, -root._tree.prelim);
            var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost)
              , right = d3_layout_treeSearch(root, d3_layout_treeRightmost)
              , deep = d3_layout_treeSearch(root, d3_layout_treeDeepest)
              , x0 = left.x - separation(left, right) / 2
              , x1 = right.x + separation(right, left) / 2
              , y1 = deep.depth || 1;
            return d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
                node.x *= size[0],
                node.y = node.depth * size[1],
                delete node._tree
            }
             : function(node) {
                node.x = (node.x - x0) / (x1 - x0) * size[0],
                node.y = node.depth / y1 * size[1],
                delete node._tree
            }
            ),
            nodes
        }
        var hierarchy = d3.layout.hierarchy().sort(null ).value(null )
          , separation = d3_layout_treeSeparation
          , size = [1, 1]
          , nodeSize = !1;
        return tree.separation = function(x) {
            return arguments.length ? (separation = x,
            tree) : separation
        }
        ,
        tree.size = function(x) {
            return arguments.length ? (nodeSize = null  == (size = x),
            tree) : nodeSize ? null  : size
        }
        ,
        tree.nodeSize = function(x) {
            return arguments.length ? (nodeSize = null  != (size = x),
            tree) : nodeSize ? size : null 
        }
        ,
        d3_layout_hierarchyRebind(tree, hierarchy)
    }
    ,
    d3.layout.pack = function() {
        function pack(d, i) {
            var nodes = hierarchy.call(this, d, i)
              , root = nodes[0]
              , w = size[0]
              , h = size[1]
              , r = null  == radius ? Math.sqrt : "function" == typeof radius ? radius : function() {
                return radius
            }
            ;
            if (root.x = root.y = 0,
            d3_layout_treeVisitAfter(root, function(d) {
                d.r = +r(d.value)
            }
            ),
            d3_layout_treeVisitAfter(root, d3_layout_packSiblings),
            padding) {
                var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
                d3_layout_treeVisitAfter(root, function(d) {
                    d.r += dr
                }
                ),
                d3_layout_treeVisitAfter(root, d3_layout_packSiblings),
                d3_layout_treeVisitAfter(root, function(d) {
                    d.r -= dr
                }
                )
            }
            return d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h)),
            nodes
        }
        var radius, hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [1, 1];
        return pack.size = function(_) {
            return arguments.length ? (size = _,
            pack) : size
        }
        ,
        pack.radius = function(_) {
            return arguments.length ? (radius = null  == _ || "function" == typeof _ ? _ : +_,
            pack) : radius
        }
        ,
        pack.padding = function(_) {
            return arguments.length ? (padding = +_,
            pack) : padding
        }
        ,
        d3_layout_hierarchyRebind(pack, hierarchy)
    }
    ,
    d3.layout.cluster = function() {
        function cluster(d, i) {
            var previousNode, nodes = hierarchy.call(this, d, i), root = nodes[0], x = 0;
            d3_layout_treeVisitAfter(root, function(node) {
                var children = node.children;
                children && children.length ? (node.x = d3_layout_clusterX(children),
                node.y = d3_layout_clusterY(children)) : (node.x = previousNode ? x += separation(node, previousNode) : 0,
                node.y = 0,
                previousNode = node)
            }
            );
            var left = d3_layout_clusterLeft(root)
              , right = d3_layout_clusterRight(root)
              , x0 = left.x - separation(left, right) / 2
              , x1 = right.x + separation(right, left) / 2;
            return d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
                node.x = (node.x - root.x) * size[0],
                node.y = (root.y - node.y) * size[1]
            }
             : function(node) {
                node.x = (node.x - x0) / (x1 - x0) * size[0],
                node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1]
            }
            ),
            nodes
        }
        var hierarchy = d3.layout.hierarchy().sort(null ).value(null )
          , separation = d3_layout_treeSeparation
          , size = [1, 1]
          , nodeSize = !1;
        return cluster.separation = function(x) {
            return arguments.length ? (separation = x,
            cluster) : separation
        }
        ,
        cluster.size = function(x) {
            return arguments.length ? (nodeSize = null  == (size = x),
            cluster) : nodeSize ? null  : size
        }
        ,
        cluster.nodeSize = function(x) {
            return arguments.length ? (nodeSize = null  != (size = x),
            cluster) : nodeSize ? size : null 
        }
        ,
        d3_layout_hierarchyRebind(cluster, hierarchy)
    }
    ,
    d3.layout.treemap = function() {
        function scale(children, k) {
            for (var child, area, i = -1, n = children.length; ++i < n; )
                area = (child = children[i]).value * (0 > k ? 0 : k),
                child.area = isNaN(area) || 0 >= area ? 0 : area
        }
        function squarify(node) {
            var children = node.children;
            if (children && children.length) {
                var child, score, n, rect = pad(node), row = [], remaining = children.slice(), best = 1 / 0, u = "slice" === mode ? rect.dx : "dice" === mode ? rect.dy : "slice-dice" === mode ? 1 & node.depth ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy);
                for (scale(remaining, rect.dx * rect.dy / node.value),
                row.area = 0; (n = remaining.length) > 0; )
                    row.push(child = remaining[n - 1]),
                    row.area += child.area,
                    "squarify" !== mode || (score = worst(row, u)) <= best ? (remaining.pop(),
                    best = score) : (row.area -= row.pop().area,
                    position(row, u, rect, !1),
                    u = Math.min(rect.dx, rect.dy),
                    row.length = row.area = 0,
                    best = 1 / 0);
                row.length && (position(row, u, rect, !0),
                row.length = row.area = 0),
                children.forEach(squarify)
            }
        }
        function stickify(node) {
            var children = node.children;
            if (children && children.length) {
                var child, rect = pad(node), remaining = children.slice(), row = [];
                for (scale(remaining, rect.dx * rect.dy / node.value),
                row.area = 0; child = remaining.pop(); )
                    row.push(child),
                    row.area += child.area,
                    null  != child.z && (position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length),
                    row.length = row.area = 0);
                children.forEach(stickify)
            }
        }
        function worst(row, u) {
            for (var r, s = row.area, rmax = 0, rmin = 1 / 0, i = -1, n = row.length; ++i < n; )
                (r = row[i].area) && (rmin > r && (rmin = r),
                r > rmax && (rmax = r));
            return s *= s,
            u *= u,
            s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : 1 / 0
        }
        function position(row, u, rect, flush) {
            var o, i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0;
            if (u == rect.dx) {
                for ((flush || v > rect.dy) && (v = rect.dy); ++i < n; )
                    o = row[i],
                    o.x = x,
                    o.y = y,
                    o.dy = v,
                    x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
                o.z = !0,
                o.dx += rect.x + rect.dx - x,
                rect.y += v,
                rect.dy -= v
            } else {
                for ((flush || v > rect.dx) && (v = rect.dx); ++i < n; )
                    o = row[i],
                    o.x = x,
                    o.y = y,
                    o.dx = v,
                    y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
                o.z = !1,
                o.dy += rect.y + rect.dy - y,
                rect.x += v,
                rect.dx -= v
            }
        }
        function treemap(d) {
            var nodes = stickies || hierarchy(d)
              , root = nodes[0];
            return root.x = 0,
            root.y = 0,
            root.dx = size[0],
            root.dy = size[1],
            stickies && hierarchy.revalue(root),
            scale([root], root.dx * root.dy / root.value),
            (stickies ? stickify : squarify)(root),
            sticky && (stickies = nodes),
            nodes
        }
        var stickies, hierarchy = d3.layout.hierarchy(), round = Math.round, size = [1, 1], padding = null , pad = d3_layout_treemapPadNull, sticky = !1, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
        return treemap.size = function(x) {
            return arguments.length ? (size = x,
            treemap) : size
        }
        ,
        treemap.padding = function(x) {
            function padFunction(node) {
                var p = x.call(treemap, node, node.depth);
                return null  == p ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, "number" == typeof p ? [p, p, p, p] : p)
            }
            function padConstant(node) {
                return d3_layout_treemapPad(node, x)
            }
            if (!arguments.length)
                return padding;
            var type;
            return pad = null  == (padding = x) ? d3_layout_treemapPadNull : "function" == (type = typeof x) ? padFunction : "number" === type ? (x = [x, x, x, x],
            padConstant) : padConstant,
            treemap
        }
        ,
        treemap.round = function(x) {
            return arguments.length ? (round = x ? Math.round : Number,
            treemap) : round != Number
        }
        ,
        treemap.sticky = function(x) {
            return arguments.length ? (sticky = x,
            stickies = null ,
            treemap) : sticky
        }
        ,
        treemap.ratio = function(x) {
            return arguments.length ? (ratio = x,
            treemap) : ratio
        }
        ,
        treemap.mode = function(x) {
            return arguments.length ? (mode = x + "",
            treemap) : mode
        }
        ,
        d3_layout_hierarchyRebind(treemap, hierarchy)
    }
    ,
    d3.random = {
        normal: function(µ, σ) {
            var n = arguments.length;
            return 2 > n && (σ = 1),
            1 > n && (µ = 0),
            function() {
                var x, y, r;
                do
                    x = 2 * Math.random() - 1,
                    y = 2 * Math.random() - 1,
                    r = x * x + y * y;
                while (!r || r > 1);return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r)
            }
        },
        logNormal: function() {
            var random = d3.random.normal.apply(d3, arguments);
            return function() {
                return Math.exp(random())
            }
        },
        bates: function(m) {
            var random = d3.random.irwinHall(m);
            return function() {
                return random() / m
            }
        },
        irwinHall: function(m) {
            return function() {
                for (var s = 0, j = 0; m > j; j++)
                    s += Math.random();
                return s
            }
        }
    },
    d3.scale = {};
    var d3_scale_niceIdentity = {
        floor: d3_identity,
        ceil: d3_identity
    };
    d3.scale.linear = function() {
        return d3_scale_linear([0, 1], [0, 1], d3_interpolate, !1)
    }
    ;
    var d3_scale_linearFormatSignificant = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    d3.scale.log = function() {
        return d3_scale_log(d3.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    }
    ;
    var d3_scale_logFormat = d3.format(".0e")
      , d3_scale_logNiceNegative = {
        floor: function(x) {
            return -Math.ceil(-x)
        },
        ceil: function(x) {
            return -Math.floor(-x)
        }
    };
    d3.scale.pow = function() {
        return d3_scale_pow(d3.scale.linear(), 1, [0, 1])
    }
    ,
    d3.scale.sqrt = function() {
        return d3.scale.pow().exponent(.5)
    }
    ,
    d3.scale.ordinal = function() {
        return d3_scale_ordinal([], {
            t: "range",
            a: [[]]
        })
    }
    ,
    d3.scale.category10 = function() {
        return d3.scale.ordinal().range(d3_category10)
    }
    ,
    d3.scale.category20 = function() {
        return d3.scale.ordinal().range(d3_category20)
    }
    ,
    d3.scale.category20b = function() {
        return d3.scale.ordinal().range(d3_category20b)
    }
    ,
    d3.scale.category20c = function() {
        return d3.scale.ordinal().range(d3_category20c)
    }
    ;
    var d3_category10 = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(d3_rgbString)
      , d3_category20 = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(d3_rgbString)
      , d3_category20b = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(d3_rgbString)
      , d3_category20c = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(d3_rgbString);
    d3.scale.quantile = function() {
        return d3_scale_quantile([], [])
    }
    ,
    d3.scale.quantize = function() {
        return d3_scale_quantize(0, 1, [0, 1])
    }
    ,
    d3.scale.threshold = function() {
        return d3_scale_threshold([.5], [0, 1])
    }
    ,
    d3.scale.identity = function() {
        return d3_scale_identity([0, 1])
    }
    ,
    d3.svg = {},
    d3.svg.arc = function() {
        function arc() {
            var r0 = innerRadius.apply(this, arguments)
              , r1 = outerRadius.apply(this, arguments)
              , a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset
              , a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset
              , da = (a0 > a1 && (da = a0,
            a0 = a1,
            a1 = da),
            a1 - a0)
              , df = π > da ? "0" : "1"
              , c0 = Math.cos(a0)
              , s0 = Math.sin(a0)
              , c1 = Math.cos(a1)
              , s1 = Math.sin(a1);
            return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0Z"
        }
        var innerRadius = d3_svg_arcInnerRadius
          , outerRadius = d3_svg_arcOuterRadius
          , startAngle = d3_svg_arcStartAngle
          , endAngle = d3_svg_arcEndAngle;
        return arc.innerRadius = function(v) {
            return arguments.length ? (innerRadius = d3_functor(v),
            arc) : innerRadius
        }
        ,
        arc.outerRadius = function(v) {
            return arguments.length ? (outerRadius = d3_functor(v),
            arc) : outerRadius
        }
        ,
        arc.startAngle = function(v) {
            return arguments.length ? (startAngle = d3_functor(v),
            arc) : startAngle
        }
        ,
        arc.endAngle = function(v) {
            return arguments.length ? (endAngle = d3_functor(v),
            arc) : endAngle
        }
        ,
        arc.centroid = function() {
            var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2
              , a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
            return [Math.cos(a) * r, Math.sin(a) * r]
        }
        ,
        arc
    }
    ;
    var d3_svg_arcOffset = -halfπ
      , d3_svg_arcMax = τ - ε;
    d3.svg.line = function() {
        return d3_svg_line(d3_identity)
    }
    ;
    var d3_svg_lineInterpolators = d3.map({
        linear: d3_svg_lineLinear,
        "linear-closed": d3_svg_lineLinearClosed,
        step: d3_svg_lineStep,
        "step-before": d3_svg_lineStepBefore,
        "step-after": d3_svg_lineStepAfter,
        basis: d3_svg_lineBasis,
        "basis-open": d3_svg_lineBasisOpen,
        "basis-closed": d3_svg_lineBasisClosed,
        bundle: d3_svg_lineBundle,
        cardinal: d3_svg_lineCardinal,
        "cardinal-open": d3_svg_lineCardinalOpen,
        "cardinal-closed": d3_svg_lineCardinalClosed,
        monotone: d3_svg_lineMonotone
    });
    d3_svg_lineInterpolators.forEach(function(key, value) {
        value.key = key,
        value.closed = /-closed$/.test(key)
    }
    );
    var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0]
      , d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0]
      , d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];
    d3.svg.line.radial = function() {
        var line = d3_svg_line(d3_svg_lineRadial);
        return line.radius = line.x,
        delete line.x,
        line.angle = line.y,
        delete line.y,
        line
    }
    ,
    d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter,
    d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore,
    d3.svg.area = function() {
        return d3_svg_area(d3_identity)
    }
    ,
    d3.svg.area.radial = function() {
        var area = d3_svg_area(d3_svg_lineRadial);
        return area.radius = area.x,
        delete area.x,
        area.innerRadius = area.x0,
        delete area.x0,
        area.outerRadius = area.x1,
        delete area.x1,
        area.angle = area.y,
        delete area.y,
        area.startAngle = area.y0,
        delete area.y0,
        area.endAngle = area.y1,
        delete area.y1,
        area
    }
    ,
    d3.svg.chord = function() {
        function chord(d, i) {
            var s = subgroup(this, source, d, i)
              , t = subgroup(this, target, d, i);
            return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z"
        }
        function subgroup(self, f, d, i) {
            var subgroup = f.call(self, d, i)
              , r = radius.call(self, subgroup, i)
              , a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset
              , a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
            return {
                r: r,
                a0: a0,
                a1: a1,
                p0: [r * Math.cos(a0), r * Math.sin(a0)],
                p1: [r * Math.cos(a1), r * Math.sin(a1)]
            }
        }
        function equals(a, b) {
            return a.a0 == b.a0 && a.a1 == b.a1
        }
        function arc(r, p, a) {
            return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p
        }
        function curve(r0, p0, r1, p1) {
            return "Q 0,0 " + p1
        }
        var source = d3_source
          , target = d3_target
          , radius = d3_svg_chordRadius
          , startAngle = d3_svg_arcStartAngle
          , endAngle = d3_svg_arcEndAngle;
        return chord.radius = function(v) {
            return arguments.length ? (radius = d3_functor(v),
            chord) : radius
        }
        ,
        chord.source = function(v) {
            return arguments.length ? (source = d3_functor(v),
            chord) : source
        }
        ,
        chord.target = function(v) {
            return arguments.length ? (target = d3_functor(v),
            chord) : target
        }
        ,
        chord.startAngle = function(v) {
            return arguments.length ? (startAngle = d3_functor(v),
            chord) : startAngle
        }
        ,
        chord.endAngle = function(v) {
            return arguments.length ? (endAngle = d3_functor(v),
            chord) : endAngle
        }
        ,
        chord
    }
    ,
    d3.svg.diagonal = function() {
        function diagonal(d, i) {
            var p0 = source.call(this, d, i)
              , p3 = target.call(this, d, i)
              , m = (p0.y + p3.y) / 2
              , p = [p0, {
                x: p0.x,
                y: m
            }, {
                x: p3.x,
                y: m
            }, p3];
            return p = p.map(projection),
            "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3]
        }
        var source = d3_source
          , target = d3_target
          , projection = d3_svg_diagonalProjection;
        return diagonal.source = function(x) {
            return arguments.length ? (source = d3_functor(x),
            diagonal) : source
        }
        ,
        diagonal.target = function(x) {
            return arguments.length ? (target = d3_functor(x),
            diagonal) : target
        }
        ,
        diagonal.projection = function(x) {
            return arguments.length ? (projection = x,
            diagonal) : projection
        }
        ,
        diagonal
    }
    ,
    d3.svg.diagonal.radial = function() {
        var diagonal = d3.svg.diagonal()
          , projection = d3_svg_diagonalProjection
          , projection_ = diagonal.projection;
        return diagonal.projection = function(x) {
            return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection
        }
        ,
        diagonal
    }
    ,
    d3.svg.symbol = function() {
        function symbol(d, i) {
            return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i))
        }
        var type = d3_svg_symbolType
          , size = d3_svg_symbolSize;
        return symbol.type = function(x) {
            return arguments.length ? (type = d3_functor(x),
            symbol) : type
        }
        ,
        symbol.size = function(x) {
            return arguments.length ? (size = d3_functor(x),
            symbol) : size
        }
        ,
        symbol
    }
    ;
    var d3_svg_symbols = d3.map({
        circle: d3_svg_symbolCircle,
        cross: function(size) {
            var r = Math.sqrt(size / 5) / 2;
            return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z"
        },
        diamond: function(size) {
            var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30))
              , rx = ry * d3_svg_symbolTan30;
            return "M0," + -ry + "L" + rx + ",0 0," + ry + " " + -rx + ",0Z"
        },
        square: function(size) {
            var r = Math.sqrt(size) / 2;
            return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z"
        },
        "triangle-down": function(size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3)
              , ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z"
        },
        "triangle-up": function(size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3)
              , ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z"
        }
    });
    d3.svg.symbolTypes = d3_svg_symbols.keys();
    var d3_transitionInheritId, d3_transitionInherit, d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians), d3_transitionPrototype = [], d3_transitionId = 0;
    d3_transitionPrototype.call = d3_selectionPrototype.call,
    d3_transitionPrototype.empty = d3_selectionPrototype.empty,
    d3_transitionPrototype.node = d3_selectionPrototype.node,
    d3_transitionPrototype.size = d3_selectionPrototype.size,
    d3.transition = function(selection) {
        return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition()
    }
    ,
    d3.transition.prototype = d3_transitionPrototype,
    d3_transitionPrototype.select = function(selector) {
        var subgroup, subnode, node, id = this.id, subgroups = [];
        selector = d3_selection_selector(selector);
        for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n; )
                (node = group[i]) && (subnode = selector.call(node, node.__data__, i, j)) ? ("__data__" in node && (subnode.__data__ = node.__data__),
                d3_transitionNode(subnode, i, id, node.__transition__[id]),
                subgroup.push(subnode)) : subgroup.push(null )
        }
        return d3_transition(subgroups, id)
    }
    ,
    d3_transitionPrototype.selectAll = function(selector) {
        var subgroup, subnodes, node, subnode, transition, id = this.id, subgroups = [];
        selector = d3_selection_selectorAll(selector);
        for (var j = -1, m = this.length; ++j < m; )
            for (var group = this[j], i = -1, n = group.length; ++i < n; )
                if (node = group[i]) {
                    transition = node.__transition__[id],
                    subnodes = selector.call(node, node.__data__, i, j),
                    subgroups.push(subgroup = []);
                    for (var k = -1, o = subnodes.length; ++k < o; )
                        (subnode = subnodes[k]) && d3_transitionNode(subnode, k, id, transition),
                        subgroup.push(subnode)
                }
        return d3_transition(subgroups, id)
    }
    ,
    d3_transitionPrototype.filter = function(filter) {
        var subgroup, group, node, subgroups = [];
        "function" != typeof filter && (filter = d3_selection_filter(filter));
        for (var j = 0, m = this.length; m > j; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; n > i; i++)
                (node = group[i]) && filter.call(node, node.__data__, i, j) && subgroup.push(node)
        }
        return d3_transition(subgroups, this.id)
    }
    ,
    d3_transitionPrototype.tween = function(name, tween) {
        var id = this.id;
        return arguments.length < 2 ? this.node().__transition__[id].tween.get(name) : d3_selection_each(this, null  == tween ? function(node) {
            node.__transition__[id].tween.remove(name)
        }
         : function(node) {
            node.__transition__[id].tween.set(name, tween)
        }
        )
    }
    ,
    d3_transitionPrototype.attr = function(nameNS, value) {
        function attrNull() {
            this.removeAttribute(name)
        }
        function attrNullNS() {
            this.removeAttributeNS(name.space, name.local)
        }
        function attrTween(b) {
            return null  == b ? attrNull : (b += "",
            function() {
                var i, a = this.getAttribute(name);
                return a !== b && (i = interpolate(a, b),
                function(t) {
                    this.setAttribute(name, i(t))
                }
                )
            }
            )
        }
        function attrTweenNS(b) {
            return null  == b ? attrNullNS : (b += "",
            function() {
                var i, a = this.getAttributeNS(name.space, name.local);
                return a !== b && (i = interpolate(a, b),
                function(t) {
                    this.setAttributeNS(name.space, name.local, i(t))
                }
                )
            }
            )
        }
        if (arguments.length < 2) {
            for (value in nameNS)
                this.attr(value, nameNS[value]);
            return this
        }
        var interpolate = "transform" == nameNS ? d3_interpolateTransform : d3_interpolate
          , name = d3.ns.qualify(nameNS);
        return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween)
    }
    ,
    d3_transitionPrototype.attrTween = function(nameNS, tween) {
        function attrTween(d, i) {
            var f = tween.call(this, d, i, this.getAttribute(name));
            return f && function(t) {
                this.setAttribute(name, f(t))
            }
        }
        function attrTweenNS(d, i) {
            var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
            return f && function(t) {
                this.setAttributeNS(name.space, name.local, f(t))
            }
        }
        var name = d3.ns.qualify(nameNS);
        return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween)
    }
    ,
    d3_transitionPrototype.style = function(name, value, priority) {
        function styleNull() {
            this.style.removeProperty(name)
        }
        function styleString(b) {
            return null  == b ? styleNull : (b += "",
            function() {
                var i, a = d3_window.getComputedStyle(this, null ).getPropertyValue(name);
                return a !== b && (i = d3_interpolate(a, b),
                function(t) {
                    this.style.setProperty(name, i(t), priority)
                }
                )
            }
            )
        }
        var n = arguments.length;
        if (3 > n) {
            if ("string" != typeof name) {
                2 > n && (value = "");
                for (priority in name)
                    this.style(priority, name[priority], value);
                return this
            }
            priority = ""
        }
        return d3_transition_tween(this, "style." + name, value, styleString)
    }
    ,
    d3_transitionPrototype.styleTween = function(name, tween, priority) {
        function styleTween(d, i) {
            var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null ).getPropertyValue(name));
            return f && function(t) {
                this.style.setProperty(name, f(t), priority)
            }
        }
        return arguments.length < 3 && (priority = ""),
        this.tween("style." + name, styleTween)
    }
    ,
    d3_transitionPrototype.text = function(value) {
        return d3_transition_tween(this, "text", value, d3_transition_text)
    }
    ,
    d3_transitionPrototype.remove = function() {
        return this.each("end.transition", function() {
            var p;
            this.__transition__.count < 2 && (p = this.parentNode) && p.removeChild(this)
        }
        )
    }
    ,
    d3_transitionPrototype.ease = function(value) {
        var id = this.id;
        return arguments.length < 1 ? this.node().__transition__[id].ease : ("function" != typeof value && (value = d3.ease.apply(d3, arguments)),
        d3_selection_each(this, function(node) {
            node.__transition__[id].ease = value
        }
        ))
    }
    ,
    d3_transitionPrototype.delay = function(value) {
        var id = this.id;
        return d3_selection_each(this, "function" == typeof value ? function(node, i, j) {
            node.__transition__[id].delay = +value.call(node, node.__data__, i, j)
        }
         : (value = +value,
        function(node) {
            node.__transition__[id].delay = value
        }
        ))
    }
    ,
    d3_transitionPrototype.duration = function(value) {
        var id = this.id;
        return d3_selection_each(this, "function" == typeof value ? function(node, i, j) {
            node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j))
        }
         : (value = Math.max(1, value),
        function(node) {
            node.__transition__[id].duration = value
        }
        ))
    }
    ,
    d3_transitionPrototype.each = function(type, listener) {
        var id = this.id;
        if (arguments.length < 2) {
            var inherit = d3_transitionInherit
              , inheritId = d3_transitionInheritId;
            d3_transitionInheritId = id,
            d3_selection_each(this, function(node, i, j) {
                d3_transitionInherit = node.__transition__[id],
                type.call(node, node.__data__, i, j)
            }
            ),
            d3_transitionInherit = inherit,
            d3_transitionInheritId = inheritId
        } else
            d3_selection_each(this, function(node) {
                var transition = node.__transition__[id];
                (transition.event || (transition.event = d3.dispatch("start", "end"))).on(type, listener)
            }
            );
        return this
    }
    ,
    d3_transitionPrototype.transition = function() {
        for (var subgroup, group, node, transition, id0 = this.id, id1 = ++d3_transitionId, subgroups = [], j = 0, m = this.length; m > j; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; n > i; i++)
                (node = group[i]) && (transition = Object.create(node.__transition__[id0]),
                transition.delay += transition.duration,
                d3_transitionNode(node, i, id1, transition)),
                subgroup.push(node)
        }
        return d3_transition(subgroups, id1)
    }
    ,
    d3.svg.axis = function() {
        function axis(g) {
            g.each(function() {
                var tickTransform, g = d3.select(this), scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy(), ticks = null  == tickValues ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = null  == tickFormat_ ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g.selectAll(".tick").data(ticks, scale1), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε), tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), range = d3_scaleRange(scale1), path = g.selectAll(".domain").data([0]), pathUpdate = (path.enter().append("path").attr("class", "domain"),
                d3.transition(path));
                tickEnter.append("line"),
                tickEnter.append("text");
                var lineEnter = tickEnter.select("line")
                  , lineUpdate = tickUpdate.select("line")
                  , text = tick.select("text").text(tickFormat)
                  , textEnter = tickEnter.select("text")
                  , textUpdate = tickUpdate.select("text");
                switch (orient) {
                case "bottom":
                    tickTransform = d3_svg_axisX,
                    lineEnter.attr("y2", innerTickSize),
                    textEnter.attr("y", Math.max(innerTickSize, 0) + tickPadding),
                    lineUpdate.attr("x2", 0).attr("y2", innerTickSize),
                    textUpdate.attr("x", 0).attr("y", Math.max(innerTickSize, 0) + tickPadding),
                    text.attr("dy", ".71em").style("text-anchor", "middle"),
                    pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize);
                    break;
                case "top":
                    tickTransform = d3_svg_axisX,
                    lineEnter.attr("y2", -innerTickSize),
                    textEnter.attr("y", -(Math.max(innerTickSize, 0) + tickPadding)),
                    lineUpdate.attr("x2", 0).attr("y2", -innerTickSize),
                    textUpdate.attr("x", 0).attr("y", -(Math.max(innerTickSize, 0) + tickPadding)),
                    text.attr("dy", "0em").style("text-anchor", "middle"),
                    pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize);
                    break;
                case "left":
                    tickTransform = d3_svg_axisY,
                    lineEnter.attr("x2", -innerTickSize),
                    textEnter.attr("x", -(Math.max(innerTickSize, 0) + tickPadding)),
                    lineUpdate.attr("x2", -innerTickSize).attr("y2", 0),
                    textUpdate.attr("x", -(Math.max(innerTickSize, 0) + tickPadding)).attr("y", 0),
                    text.attr("dy", ".32em").style("text-anchor", "end"),
                    pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize);
                    break;
                case "right":
                    tickTransform = d3_svg_axisY,
                    lineEnter.attr("x2", innerTickSize),
                    textEnter.attr("x", Math.max(innerTickSize, 0) + tickPadding),
                    lineUpdate.attr("x2", innerTickSize).attr("y2", 0),
                    textUpdate.attr("x", Math.max(innerTickSize, 0) + tickPadding).attr("y", 0),
                    text.attr("dy", ".32em").style("text-anchor", "start"),
                    pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize)
                }
                if (scale1.rangeBand) {
                    var x = scale1
                      , dx = x.rangeBand() / 2;
                    scale0 = scale1 = function(d) {
                        return x(d) + dx
                    }
                } else
                    scale0.rangeBand ? scale0 = scale1 : tickExit.call(tickTransform, scale1);
                tickEnter.call(tickTransform, scale0),
                tickUpdate.call(tickTransform, scale1)
            }
            )
        }
        var tickFormat_, scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [10], tickValues = null ;
        return axis.scale = function(x) {
            return arguments.length ? (scale = x,
            axis) : scale
        }
        ,
        axis.orient = function(x) {
            return arguments.length ? (orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient,
            axis) : orient
        }
        ,
        axis.ticks = function() {
            return arguments.length ? (tickArguments_ = arguments,
            axis) : tickArguments_
        }
        ,
        axis.tickValues = function(x) {
            return arguments.length ? (tickValues = x,
            axis) : tickValues
        }
        ,
        axis.tickFormat = function(x) {
            return arguments.length ? (tickFormat_ = x,
            axis) : tickFormat_
        }
        ,
        axis.tickSize = function(x) {
            var n = arguments.length;
            return n ? (innerTickSize = +x,
            outerTickSize = +arguments[n - 1],
            axis) : innerTickSize
        }
        ,
        axis.innerTickSize = function(x) {
            return arguments.length ? (innerTickSize = +x,
            axis) : innerTickSize
        }
        ,
        axis.outerTickSize = function(x) {
            return arguments.length ? (outerTickSize = +x,
            axis) : outerTickSize
        }
        ,
        axis.tickPadding = function(x) {
            return arguments.length ? (tickPadding = +x,
            axis) : tickPadding
        }
        ,
        axis.tickSubdivide = function() {
            return arguments.length && axis
        }
        ,
        axis
    }
    ;
    var d3_svg_axisDefaultOrient = "bottom"
      , d3_svg_axisOrients = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    };
    d3.svg.brush = function() {
        function brush(g) {
            g.each(function() {
                var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart)
                  , background = g.selectAll(".background").data([0]);
                background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"),
                g.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var resize = g.selectAll(".resize").data(resizes, d3_identity);
                resize.exit().remove(),
                resize.enter().append("g").attr("class", function(d) {
                    return "resize " + d
                }
                ).style("cursor", function(d) {
                    return d3_svg_brushCursor[d]
                }
                ).append("rect").attr("x", function(d) {
                    return /[ew]$/.test(d) ? -3 : null 
                }
                ).attr("y", function(d) {
                    return /^[ns]/.test(d) ? -3 : null 
                }
                ).attr("width", 6).attr("height", 6).style("visibility", "hidden"),
                resize.style("display", brush.empty() ? "none" : null );
                var range, gUpdate = d3.transition(g), backgroundUpdate = d3.transition(background);
                x && (range = d3_scaleRange(x),
                backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]),
                redrawX(gUpdate)),
                y && (range = d3_scaleRange(y),
                backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]),
                redrawY(gUpdate)),
                redraw(gUpdate)
            }
            )
        }
        function redraw(g) {
            g.selectAll(".resize").attr("transform", function(d) {
                return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")"
            }
            )
        }
        function redrawX(g) {
            g.select(".extent").attr("x", xExtent[0]),
            g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0])
        }
        function redrawY(g) {
            g.select(".extent").attr("y", yExtent[0]),
            g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0])
        }
        function brushstart() {
            function keydown() {
                32 == d3.event.keyCode && (dragging || (center = null ,
                origin[0] -= xExtent[1],
                origin[1] -= yExtent[1],
                dragging = 2),
                d3_eventPreventDefault())
            }
            function keyup() {
                32 == d3.event.keyCode && 2 == dragging && (origin[0] += xExtent[1],
                origin[1] += yExtent[1],
                dragging = 0,
                d3_eventPreventDefault())
            }
            function brushmove() {
                var point = d3.mouse(target)
                  , moved = !1;
                offset && (point[0] += offset[0],
                point[1] += offset[1]),
                dragging || (d3.event.altKey ? (center || (center = [(xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2]),
                origin[0] = xExtent[+(point[0] < center[0])],
                origin[1] = yExtent[+(point[1] < center[1])]) : center = null ),
                resizingX && move1(point, x, 0) && (redrawX(g),
                moved = !0),
                resizingY && move1(point, y, 1) && (redrawY(g),
                moved = !0),
                moved && (redraw(g),
                event_({
                    type: "brush",
                    mode: dragging ? "move" : "resize"
                }))
            }
            function move1(point, scale, i) {
                var min, max, range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0];
                return dragging && (r0 -= position,
                r1 -= size + position),
                min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i],
                dragging ? max = (min += position) + size : (center && (position = Math.max(r0, Math.min(r1, 2 * center[i] - min))),
                min > position ? (max = min,
                min = position) : max = position),
                extent[0] != min || extent[1] != max ? (i ? yExtentDomain = null  : xExtentDomain = null ,
                extent[0] = min,
                extent[1] = max,
                !0) : void 0
            }
            function brushend() {
                brushmove(),
                g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null ),
                d3.select("body").style("cursor", null ),
                w.on("mousemove.brush", null ).on("mouseup.brush", null ).on("touchmove.brush", null ).on("touchend.brush", null ).on("keydown.brush", null ).on("keyup.brush", null ),
                dragRestore(),
                event_({
                    type: "brushend"
                })
            }
            var center, offset, target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(), origin = d3.mouse(target), w = d3.select(d3_window).on("keydown.brush", keydown).on("keyup.brush", keyup);
            if (d3.event.changedTouches ? w.on("touchmove.brush", brushmove).on("touchend.brush", brushend) : w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend),
            g.interrupt().selectAll("*").interrupt(),
            dragging)
                origin[0] = xExtent[0] - origin[0],
                origin[1] = yExtent[0] - origin[1];
            else if (resizing) {
                var ex = +/w$/.test(resizing)
                  , ey = +/^n/.test(resizing);
                offset = [xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1]],
                origin[0] = xExtent[ex],
                origin[1] = yExtent[ey]
            } else
                d3.event.altKey && (center = origin.slice());
            g.style("pointer-events", "none").selectAll(".resize").style("display", null ),
            d3.select("body").style("cursor", eventTarget.style("cursor")),
            event_({
                type: "brushstart"
            }),
            brushmove()
        }
        var xExtentDomain, yExtentDomain, event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null , y = null , xExtent = [0, 0], yExtent = [0, 0], xClamp = !0, yClamp = !0, resizes = d3_svg_brushResizes[0];
        return brush.event = function(g) {
            g.each(function() {
                var event_ = event.of(this, arguments)
                  , extent1 = {
                    x: xExtent,
                    y: yExtent,
                    i: xExtentDomain,
                    j: yExtentDomain
                }
                  , extent0 = this.__chart__ || extent1;
                this.__chart__ = extent1,
                d3_transitionInheritId ? d3.select(this).transition().each("start.brush", function() {
                    xExtentDomain = extent0.i,
                    yExtentDomain = extent0.j,
                    xExtent = extent0.x,
                    yExtent = extent0.y,
                    event_({
                        type: "brushstart"
                    })
                }
                ).tween("brush:brush", function() {
                    var xi = d3_interpolateArray(xExtent, extent1.x)
                      , yi = d3_interpolateArray(yExtent, extent1.y);
                    return xExtentDomain = yExtentDomain = null ,
                    function(t) {
                        xExtent = extent1.x = xi(t),
                        yExtent = extent1.y = yi(t),
                        event_({
                            type: "brush",
                            mode: "resize"
                        })
                    }
                }
                ).each("end.brush", function() {
                    xExtentDomain = extent1.i,
                    yExtentDomain = extent1.j,
                    event_({
                        type: "brush",
                        mode: "resize"
                    }),
                    event_({
                        type: "brushend"
                    })
                }
                ) : (event_({
                    type: "brushstart"
                }),
                event_({
                    type: "brush",
                    mode: "resize"
                }),
                event_({
                    type: "brushend"
                }))
            }
            )
        }
        ,
        brush.x = function(z) {
            return arguments.length ? (x = z,
            resizes = d3_svg_brushResizes[!x << 1 | !y],
            brush) : x
        }
        ,
        brush.y = function(z) {
            return arguments.length ? (y = z,
            resizes = d3_svg_brushResizes[!x << 1 | !y],
            brush) : y
        }
        ,
        brush.clamp = function(z) {
            return arguments.length ? (x && y ? (xClamp = !!z[0],
            yClamp = !!z[1]) : x ? xClamp = !!z : y && (yClamp = !!z),
            brush) : x && y ? [xClamp, yClamp] : x ? xClamp : y ? yClamp : null 
        }
        ,
        brush.extent = function(z) {
            var x0, x1, y0, y1, t;
            return arguments.length ? (x && (x0 = z[0],
            x1 = z[1],
            y && (x0 = x0[0],
            x1 = x1[0]),
            xExtentDomain = [x0, x1],
            x.invert && (x0 = x(x0),
            x1 = x(x1)),
            x0 > x1 && (t = x0,
            x0 = x1,
            x1 = t),
            (x0 != xExtent[0] || x1 != xExtent[1]) && (xExtent = [x0, x1])),
            y && (y0 = z[0],
            y1 = z[1],
            x && (y0 = y0[1],
            y1 = y1[1]),
            yExtentDomain = [y0, y1],
            y.invert && (y0 = y(y0),
            y1 = y(y1)),
            y0 > y1 && (t = y0,
            y0 = y1,
            y1 = t),
            (y0 != yExtent[0] || y1 != yExtent[1]) && (yExtent = [y0, y1])),
            brush) : (x && (xExtentDomain ? (x0 = xExtentDomain[0],
            x1 = xExtentDomain[1]) : (x0 = xExtent[0],
            x1 = xExtent[1],
            x.invert && (x0 = x.invert(x0),
            x1 = x.invert(x1)),
            x0 > x1 && (t = x0,
            x0 = x1,
            x1 = t))),
            y && (yExtentDomain ? (y0 = yExtentDomain[0],
            y1 = yExtentDomain[1]) : (y0 = yExtent[0],
            y1 = yExtent[1],
            y.invert && (y0 = y.invert(y0),
            y1 = y.invert(y1)),
            y0 > y1 && (t = y0,
            y0 = y1,
            y1 = t))),
            x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1])
        }
        ,
        brush.clear = function() {
            return brush.empty() || (xExtent = [0, 0],
            yExtent = [0, 0],
            xExtentDomain = yExtentDomain = null ),
            brush
        }
        ,
        brush.empty = function() {
            return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1]
        }
        ,
        d3.rebind(brush, event, "on")
    }
    ;
    var d3_svg_brushCursor = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }
      , d3_svg_brushResizes = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []]
      , d3_time = d3.time = {}
      , d3_date = Date
      , d3_time_daySymbols = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    d3_date_utc.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            d3_time_prototype.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            d3_time_prototype.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            d3_time_prototype.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            d3_time_prototype.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            d3_time_prototype.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            d3_time_prototype.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            d3_time_prototype.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            d3_time_prototype.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            d3_time_prototype.setTime.apply(this._, arguments)
        }
    };
    var d3_time_prototype = Date.prototype
      , d3_time_formatDateTime = "%a %b %e %X %Y"
      , d3_time_formatDate = "%m/%d/%Y"
      , d3_time_formatTime = "%H:%M:%S"
      , d3_time_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      , d3_time_dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      , d3_time_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      , d3_time_monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    d3_time.year = d3_time_interval(function(date) {
        return date = d3_time.day(date),
        date.setMonth(0, 1),
        date
    }
    , function(date, offset) {
        date.setFullYear(date.getFullYear() + offset)
    }
    , function(date) {
        return date.getFullYear()
    }
    ),
    d3_time.years = d3_time.year.range,
    d3_time.years.utc = d3_time.year.utc.range,
    d3_time.day = d3_time_interval(function(date) {
        var day = new d3_date(2e3,0);
        return day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()),
        day
    }
    , function(date, offset) {
        date.setDate(date.getDate() + offset)
    }
    , function(date) {
        return date.getDate() - 1
    }
    ),
    d3_time.days = d3_time.day.range,
    d3_time.days.utc = d3_time.day.utc.range,
    d3_time.dayOfYear = function(date) {
        var year = d3_time.year(date);
        return Math.floor((date - year - 6e4 * (date.getTimezoneOffset() - year.getTimezoneOffset())) / 864e5)
    }
    ,
    d3_time_daySymbols.forEach(function(day, i) {
        day = day.toLowerCase(),
        i = 7 - i;
        var interval = d3_time[day] = d3_time_interval(function(date) {
            return (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7),
            date
        }
        , function(date, offset) {
            date.setDate(date.getDate() + 7 * Math.floor(offset))
        }
        , function(date) {
            var day = d3_time.year(date).getDay();
            return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i)
        }
        );
        d3_time[day + "s"] = interval.range,
        d3_time[day + "s"].utc = interval.utc.range,
        d3_time[day + "OfYear"] = function(date) {
            var day = d3_time.year(date).getDay();
            return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7)
        }
    }
    ),
    d3_time.week = d3_time.sunday,
    d3_time.weeks = d3_time.sunday.range,
    d3_time.weeks.utc = d3_time.sunday.utc.range,
    d3_time.weekOfYear = d3_time.sundayOfYear,
    d3_time.format = d3_time_format;
    var d3_time_dayRe = d3_time_formatRe(d3_time_days)
      , d3_time_dayLookup = d3_time_formatLookup(d3_time_days)
      , d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations)
      , d3_time_dayAbbrevLookup = d3_time_formatLookup(d3_time_dayAbbreviations)
      , d3_time_monthRe = d3_time_formatRe(d3_time_months)
      , d3_time_monthLookup = d3_time_formatLookup(d3_time_months)
      , d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations)
      , d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations)
      , d3_time_percentRe = /^%/
      , d3_time_formatPads = {
        "-": "",
        _: " ",
        0: "0"
    }
      , d3_time_formats = {
        a: function(d) {
            return d3_time_dayAbbreviations[d.getDay()]
        },
        A: function(d) {
            return d3_time_days[d.getDay()]
        },
        b: function(d) {
            return d3_time_monthAbbreviations[d.getMonth()]
        },
        B: function(d) {
            return d3_time_months[d.getMonth()]
        },
        c: d3_time_format(d3_time_formatDateTime),
        d: function(d, p) {
            return d3_time_formatPad(d.getDate(), p, 2)
        },
        e: function(d, p) {
            return d3_time_formatPad(d.getDate(), p, 2)
        },
        H: function(d, p) {
            return d3_time_formatPad(d.getHours(), p, 2)
        },
        I: function(d, p) {
            return d3_time_formatPad(d.getHours() % 12 || 12, p, 2)
        },
        j: function(d, p) {
            return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3)
        },
        L: function(d, p) {
            return d3_time_formatPad(d.getMilliseconds(), p, 3)
        },
        m: function(d, p) {
            return d3_time_formatPad(d.getMonth() + 1, p, 2)
        },
        M: function(d, p) {
            return d3_time_formatPad(d.getMinutes(), p, 2)
        },
        p: function(d) {
            return d.getHours() >= 12 ? "PM" : "AM"
        },
        S: function(d, p) {
            return d3_time_formatPad(d.getSeconds(), p, 2)
        },
        U: function(d, p) {
            return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2)
        },
        w: function(d) {
            return d.getDay()
        },
        W: function(d, p) {
            return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2)
        },
        x: d3_time_format(d3_time_formatDate),
        X: d3_time_format(d3_time_formatTime),
        y: function(d, p) {
            return d3_time_formatPad(d.getFullYear() % 100, p, 2)
        },
        Y: function(d, p) {
            return d3_time_formatPad(d.getFullYear() % 1e4, p, 4)
        },
        Z: d3_time_zone,
        "%": function() {
            return "%"
        }
    }
      , d3_time_parsers = {
        a: d3_time_parseWeekdayAbbrev,
        A: d3_time_parseWeekday,
        b: d3_time_parseMonthAbbrev,
        B: d3_time_parseMonth,
        c: d3_time_parseLocaleFull,
        d: d3_time_parseDay,
        e: d3_time_parseDay,
        H: d3_time_parseHour24,
        I: d3_time_parseHour24,
        j: d3_time_parseDayOfYear,
        L: d3_time_parseMilliseconds,
        m: d3_time_parseMonthNumber,
        M: d3_time_parseMinutes,
        p: d3_time_parseAmPm,
        S: d3_time_parseSeconds,
        U: d3_time_parseWeekNumberSunday,
        w: d3_time_parseWeekdayNumber,
        W: d3_time_parseWeekNumberMonday,
        x: d3_time_parseLocaleDate,
        X: d3_time_parseLocaleTime,
        y: d3_time_parseYear,
        Y: d3_time_parseFullYear,
        Z: d3_time_parseZone,
        "%": d3_time_parseLiteralPercent
    }
      , d3_time_numberRe = /^\s*\d+/
      , d3_time_amPmLookup = d3.map({
        am: 0,
        pm: 1
    });
    d3_time_format.utc = d3_time_formatUtc;
    var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso,
    d3_time_formatIsoNative.parse = function(string) {
        var date = new Date(string);
        return isNaN(date) ? null  : date
    }
    ,
    d3_time_formatIsoNative.toString = d3_time_formatIso.toString,
    d3_time.second = d3_time_interval(function(date) {
        return new d3_date(1e3 * Math.floor(date / 1e3))
    }
    , function(date, offset) {
        date.setTime(date.getTime() + 1e3 * Math.floor(offset))
    }
    , function(date) {
        return date.getSeconds()
    }
    ),
    d3_time.seconds = d3_time.second.range,
    d3_time.seconds.utc = d3_time.second.utc.range,
    d3_time.minute = d3_time_interval(function(date) {
        return new d3_date(6e4 * Math.floor(date / 6e4))
    }
    , function(date, offset) {
        date.setTime(date.getTime() + 6e4 * Math.floor(offset))
    }
    , function(date) {
        return date.getMinutes()
    }
    ),
    d3_time.minutes = d3_time.minute.range,
    d3_time.minutes.utc = d3_time.minute.utc.range,
    d3_time.hour = d3_time_interval(function(date) {
        var timezone = date.getTimezoneOffset() / 60;
        return new d3_date(36e5 * (Math.floor(date / 36e5 - timezone) + timezone))
    }
    , function(date, offset) {
        date.setTime(date.getTime() + 36e5 * Math.floor(offset))
    }
    , function(date) {
        return date.getHours()
    }
    ),
    d3_time.hours = d3_time.hour.range,
    d3_time.hours.utc = d3_time.hour.utc.range,
    d3_time.month = d3_time_interval(function(date) {
        return date = d3_time.day(date),
        date.setDate(1),
        date
    }
    , function(date, offset) {
        date.setMonth(date.getMonth() + offset)
    }
    , function(date) {
        return date.getMonth()
    }
    ),
    d3_time.months = d3_time.month.range,
    d3_time.months.utc = d3_time.month.utc.range;
    var d3_time_scaleSteps = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6]
      , d3_time_scaleLocalMethods = [[d3_time.second, 1], [d3_time.second, 5], [d3_time.second, 15], [d3_time.second, 30], [d3_time.minute, 1], [d3_time.minute, 5], [d3_time.minute, 15], [d3_time.minute, 30], [d3_time.hour, 1], [d3_time.hour, 3], [d3_time.hour, 6], [d3_time.hour, 12], [d3_time.day, 1], [d3_time.day, 2], [d3_time.week, 1], [d3_time.month, 1], [d3_time.month, 3], [d3_time.year, 1]]
      , d3_time_scaleLocalFormats = [[d3_time_format("%Y"), d3_true], [d3_time_format("%B"), function(d) {
        return d.getMonth()
    }
    ], [d3_time_format("%b %d"), function(d) {
        return 1 != d.getDate()
    }
    ], [d3_time_format("%a %d"), function(d) {
        return d.getDay() && 1 != d.getDate()
    }
    ], [d3_time_format("%I %p"), function(d) {
        return d.getHours()
    }
    ], [d3_time_format("%I:%M"), function(d) {
        return d.getMinutes()
    }
    ], [d3_time_format(":%S"), function(d) {
        return d.getSeconds()
    }
    ], [d3_time_format(".%L"), function(d) {
        return d.getMilliseconds()
    }
    ]]
      , d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
    d3_time_scaleLocalMethods.year = d3_time.year,
    d3_time.scale = function() {
        return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat)
    }
    ;
    var d3_time_scaleMilliseconds = {
        range: function(start, stop, step) {
            return d3.range(+start, +stop, step).map(d3_time_scaleDate)
        },
        floor: d3_identity,
        ceil: d3_identity
    }
      , d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
        return [m[0].utc, m[1]]
    }
    )
      , d3_time_scaleUTCFormats = [[d3_time_formatUtc("%Y"), d3_true], [d3_time_formatUtc("%B"), function(d) {
        return d.getUTCMonth()
    }
    ], [d3_time_formatUtc("%b %d"), function(d) {
        return 1 != d.getUTCDate()
    }
    ], [d3_time_formatUtc("%a %d"), function(d) {
        return d.getUTCDay() && 1 != d.getUTCDate()
    }
    ], [d3_time_formatUtc("%I %p"), function(d) {
        return d.getUTCHours()
    }
    ], [d3_time_formatUtc("%I:%M"), function(d) {
        return d.getUTCMinutes()
    }
    ], [d3_time_formatUtc(":%S"), function(d) {
        return d.getUTCSeconds()
    }
    ], [d3_time_formatUtc(".%L"), function(d) {
        return d.getUTCMilliseconds()
    }
    ]]
      , d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
    return d3_time_scaleUTCMethods.year = d3_time.year.utc,
    d3_time.scale.utc = function() {
        return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat)
    }
    ,
    d3.text = d3_xhrType(function(request) {
        return request.responseText
    }
    ),
    d3.json = function(url, callback) {
        return d3_xhr(url, "application/json", d3_json, callback)
    }
    ,
    d3.html = function(url, callback) {
        return d3_xhr(url, "text/html", d3_html, callback)
    }
    ,
    d3.xml = d3_xhrType(function(request) {
        return request.responseXML
    }
    ),
    d3
}
();
var self = self || {}
  , PNLTRI = {
    REVISION: "2.1.1"
};
PNLTRI.Math = {
    random: Math.random,
    array_shuffle: function(inoutArray) {
        for (var i = inoutArray.length - 1; i > 0; i--) {
            var j = Math.floor(PNLTRI.Math.random() * (i + 1))
              , tmp = inoutArray[i];
            inoutArray[i] = inoutArray[j],
            inoutArray[j] = tmp;
        }
        return inoutArray
    },
    compare_pts_yx: function(inPtA, inPtB) {
        var deltaY = inPtA.y - inPtB.y;
        if (deltaY < PNLTRI.Math.EPSILON_N)
            return -1;
        if (deltaY > PNLTRI.Math.EPSILON_P)
            return 1;
        var deltaX = inPtA.x - inPtB.x;
        return deltaX < PNLTRI.Math.EPSILON_N ? -1 : deltaX > PNLTRI.Math.EPSILON_P ? 1 : 0
    },
    ptsCrossProd: function(inPtVertex, inPtFrom, inPtTo) {
        return (inPtFrom.x - inPtVertex.x) * (inPtTo.y - inPtVertex.y) - (inPtFrom.y - inPtVertex.y) * (inPtTo.x - inPtVertex.x)
    }
},
PNLTRI.Math.EPSILON_P = Math.pow(2, -43),
PNLTRI.Math.EPSILON_N = -PNLTRI.Math.EPSILON_P,
PNLTRI.PolygonData = function(inPolygonChainList) {
    if (this.vertices = [],
    this.segments = [],
    this.diagonals = [],
    this.idNextPolyChain = 0,
    this.PolyLeftArr = [],
    this.monoSubPolyChains = [],
    this.triangles = [],
    inPolygonChainList)
        for (var i = 0, j = inPolygonChainList.length; j > i; i++)
            this.addPolygonChain(inPolygonChainList[i])
}
,
PNLTRI.PolygonData.prototype = {
    constructor: PNLTRI.PolygonData,
    nbVertices: function() {
        return this.vertices.length
    },
    getSegments: function() {
        return this.segments
    },
    getFirstSegment: function() {
        return this.segments[0]
    },
    getMonoSubPolys: function() {
        return this.monoSubPolyChains
    },
    getTriangles: function() {
        return this.triangles.concat()
    },
    nbPolyChains: function() {
        return this.idNextPolyChain
    },
    get_PolyLeftArr: function() {
        return this.PolyLeftArr.concat()
    },
    set_PolyLeft_wrong: function(inChainId) {
        this.PolyLeftArr[inChainId] = !1
    },
    isClockWise: function(inStartSeg) {
        var cursor = inStartSeg
          , doubleArea = 0;
        do
            doubleArea += (cursor.vFrom.x - cursor.vTo.x) * (cursor.vFrom.y + cursor.vTo.y),
            cursor = cursor.snext;
        while (cursor != inStartSeg);return 0 > doubleArea
    },
    appendVertexEntry: function(inVertexX, inVertexY) {
        var vertex = {
            id: this.vertices.length,
            x: inVertexX,
            y: inVertexY
        };
        return this.vertices.push(vertex),
        vertex
    },
    createSegmentEntry: function(inVertexFrom, inVertexTo) {
        return {
            chainId: this.idNextPolyChain,
            vFrom: inVertexFrom,
            vTo: inVertexTo,
            upward: 1 == PNLTRI.Math.compare_pts_yx(inVertexTo, inVertexFrom),
            sprev: null ,
            snext: null ,
            rootFrom: null ,
            rootTo: null ,
            is_inserted: !1,
            trLeft: null ,
            trRight: null ,
            mprev: null ,
            mnext: null ,
            marked: !1
        }
    },
    appendSegmentEntry: function(inSegment) {
        return this.segments.push(inSegment),
        inSegment
    },
    appendDiagonalsEntry: function(inDiagonal) {
        return this.diagonals.push(inDiagonal),
        inDiagonal
    },
    addVertexChain: function(inRawPointList) {
        function verts_equal(inVert1, inVert2) {
            return Math.abs(inVert1.x - inVert2.x) < PNLTRI.Math.EPSILON_P && Math.abs(inVert1.y - inVert2.y) < PNLTRI.Math.EPSILON_P
        }
        function verts_colinear_chain(inVert1, inVert2, inVert3) {
            if (Math.abs(PNLTRI.Math.ptsCrossProd(inVert2, inVert1, inVert3)) > PNLTRI.Math.EPSILON_P)
                return !1;
            var low, middle, high;
            return Math.abs(inVert1.y - inVert2.y) < PNLTRI.Math.EPSILON_P ? (middle = inVert2.x,
            inVert1.x < inVert3.x ? (low = inVert1.x,
            high = inVert3.x) : (low = inVert3.x,
            high = inVert1.x)) : (middle = inVert2.y,
            inVert1.y < inVert3.y ? (low = inVert1.y,
            high = inVert3.y) : (low = inVert3.y,
            high = inVert1.y)),
            low - middle < PNLTRI.Math.EPSILON_P && middle - high < PNLTRI.Math.EPSILON_P
        }
        for (var newVertex, acceptVertex, lastIdx, newVertices = [], i = 0; i < inRawPointList.length; i++)
            newVertex = this.appendVertexEntry(inRawPointList[i].x, inRawPointList[i].y),
            acceptVertex = !0,
            lastIdx = newVertices.length - 1,
            lastIdx >= 0 && (verts_equal(newVertex, newVertices[lastIdx]) ? acceptVertex = !1 : lastIdx > 0 && verts_colinear_chain(newVertices[lastIdx - 1], newVertices[lastIdx], newVertex) && newVertices.pop()),
            acceptVertex && newVertices.push(newVertex);
        return lastIdx = newVertices.length - 1,
        lastIdx > 0 && verts_equal(newVertices[lastIdx], newVertices[0]) && (newVertices.pop(),
        lastIdx--),
        lastIdx > 1 && (verts_colinear_chain(newVertices[lastIdx - 1], newVertices[lastIdx], newVertices[0]) && (newVertices.pop(),
        lastIdx--),
        lastIdx > 1 && verts_colinear_chain(newVertices[lastIdx], newVertices[0], newVertices[1]) && newVertices.shift()),
        newVertices
    },
    addPolygonChain: function(inRawPointList) {
        var newVertices = this.addVertexChain(inRawPointList);
        if (newVertices.length < 3)
            return console.log("Polygon has < 3 vertices!", newVertices),
            0;
        for (var segment, firstSeg, prevSeg, saveSegListLength = this.segments.length, i = 0; i < newVertices.length - 1; i++)
            segment = this.createSegmentEntry(newVertices[i], newVertices[i + 1]),
            prevSeg ? (segment.sprev = prevSeg,
            prevSeg.snext = segment) : firstSeg = segment,
            prevSeg = segment,
            this.appendSegmentEntry(segment);
        return segment = this.createSegmentEntry(newVertices[newVertices.length - 1], newVertices[0]),
        segment.sprev = prevSeg,
        prevSeg.snext = segment,
        this.appendSegmentEntry(segment),
        firstSeg.sprev = segment,
        segment.snext = firstSeg,
        this.PolyLeftArr[this.idNextPolyChain++] = !0,
        this.segments.length - saveSegListLength
    },
    create_mono_chains: function() {
        for (var newMono, newMonoTo, toFirstOutSeg, fromRevSeg, i = 0, j = this.segments.length; j > i; i++)
            newMono = this.segments[i],
            this.PolyLeftArr[newMono.chainId] ? (newMonoTo = newMono.vTo,
            newMono.mprev = newMono.sprev,
            newMono.mnext = newMono.snext) : (newMonoTo = newMono.vFrom,
            newMono = newMono.snext,
            newMono.mprev = newMono.snext,
            newMono.mnext = newMono.sprev),
            (fromRevSeg = newMono.vFrom.lastInDiag) && (fromRevSeg.mnext = newMono,
            newMono.mprev = fromRevSeg,
            newMono.vFrom.lastInDiag = null ),
            (toFirstOutSeg = newMonoTo.firstOutDiag) && (toFirstOutSeg.mprev = newMono,
            newMono.mnext = toFirstOutSeg,
            newMonoTo.firstOutDiag = null )
    },
    unique_monotone_chains_max: function() {
        function find_monotone_chain_max(frontMono) {
            var frontPt, firstPt, ymaxPt, monoPosmax = frontMono;
            for (firstPt = ymaxPt = frontMono.vFrom,
            frontMono.marked = !0,
            frontMono = frontMono.mnext; frontPt = frontMono.vFrom; ) {
                if (frontMono.marked) {
                    if (frontPt == firstPt)
                        break;
                    return console.log("ERR unique_monotone: segment in two chains", firstPt, frontMono),
                    null 
                }
                frontMono.marked = !0,
                1 == PNLTRI.Math.compare_pts_yx(frontPt, ymaxPt) && (ymaxPt = frontPt,
                monoPosmax = frontMono),
                frontMono = frontMono.mnext
            }
            return monoPosmax
        }
        var frontMono, monoPosmax;
        this.monoSubPolyChains = [];
        for (var i = 0, j = this.segments.length; j > i; i++)
            frontMono = this.segments[i],
            frontMono.marked || (monoPosmax = find_monotone_chain_max(frontMono),
            monoPosmax && this.monoSubPolyChains.push(monoPosmax));
        return this.monoSubPolyChains
    },
    clearTriangles: function() {
        this.triangles = []
    },
    addTriangle: function(inVert1, inVert2, inVert3) {
        this.triangles.push([inVert1.id, inVert2.id, inVert3.id])
    }
},
PNLTRI.EarClipTriangulator = function(inPolygonData) {
    this.polyData = inPolygonData
}
,
PNLTRI.EarClipTriangulator.prototype = {
    constructor: PNLTRI.EarClipTriangulator,
    triangulate_polygon_no_holes: function() {
        function isEarAt(vertex) {
            var prevX = vertex.mprev.vFrom.x
              , prevY = vertex.mprev.vFrom.y
              , vertX = vertex.vFrom.x
              , vertY = vertex.vFrom.y
              , nextX = vertex.mnext.vFrom.x
              , nextY = vertex.mnext.vFrom.y
              , vnX = nextX - vertX
              , vnY = nextY - vertY
              , npX = prevX - nextX
              , npY = prevY - nextY
              , pvX = vertX - prevX
              , pvY = vertY - prevY;
            if (PNLTRI.Math.EPSILON_P > pvX * vnY - vnX * pvY)
                return !1;
            for (var vStop = vertex.mprev.mprev, vOther = vertex.mnext; vOther != vStop; ) {
                vOther = vOther.mnext;
                var otherX = vOther.vFrom.x
                  , otherY = vOther.vFrom.y
                  , poX = otherX - prevX
                  , poY = otherY - prevY;
                if (0 !== poX || 0 !== poY) {
                    var voX = otherX - vertX
                      , voY = otherY - vertY;
                    if (0 !== voX || 0 !== voY) {
                        var noX = otherX - nextX
                          , noY = otherY - nextY;
                        if ((0 !== noX || 0 !== noY) && vnX * voY - vnY * voX >= PNLTRI.Math.EPSILON_N && pvX * poY - pvY * poX >= PNLTRI.Math.EPSILON_N && npX * noY - npY * noX >= PNLTRI.Math.EPSILON_N)
                            return !1
                    }
                }
            }
            return !0
        }
        var myPolyData = this.polyData
          , startSeg = myPolyData.getFirstSegment()
          , cursor = startSeg;
        if (myPolyData.isClockWise(startSeg)) {
            do
                cursor.mprev = cursor.snext,
                cursor.mnext = cursor.sprev,
                cursor = cursor.sprev;
            while (cursor != startSeg);myPolyData.set_PolyLeft_wrong(0)
        } else
            do
                cursor.mprev = cursor.sprev,
                cursor.mnext = cursor.snext,
                cursor = cursor.snext;
            while (cursor != startSeg);for (var vertex = startSeg, fullLoop = vertex; vertex.mnext != vertex.mprev; )
            if (isEarAt(vertex))
                this.polyData.addTriangle(vertex.mprev.vFrom, vertex.vFrom, vertex.mnext.vFrom),
                vertex.mprev.mnext = vertex.mnext,
                vertex.mnext.mprev = vertex.mprev,
                vertex = vertex.mnext,
                fullLoop = vertex;
            else if (vertex = vertex.mnext,
            vertex == fullLoop)
                return !1;
        return !0
    }
},
PNLTRI.Trapezoid = function(inHigh, inLow, inLeft, inRight) {
    this.vHigh = inHigh ? inHigh : {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY
    },
    this.vLow = inLow ? inLow : {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY
    },
    this.lseg = inLeft,
    this.rseg = inRight,
    this.depth = -1,
    this.monoDone = !1
}
,
PNLTRI.Trapezoid.prototype = {
    constructor: PNLTRI.Trapezoid,
    clone: function() {
        var newTrap = new PNLTRI.Trapezoid(this.vHigh,this.vLow,this.lseg,this.rseg);
        return newTrap.uL = this.uL,
        newTrap.uR = this.uR,
        newTrap.dL = this.dL,
        newTrap.dR = this.dR,
        newTrap.sink = this.sink,
        newTrap
    },
    splitOffLower: function(inSplitPt) {
        var trLower = this.clone();
        return this.vLow = trLower.vHigh = inSplitPt,
        this.dL = trLower,
        trLower.uL = this,
        this.dR = trLower.uR = null ,
        trLower.dL && (trLower.dL.uL = trLower),
        trLower.dR && (trLower.dR.uR = trLower),
        trLower
    }
},
PNLTRI.QsNode = function(inTrapezoid) {
    this.trap = inTrapezoid,
    inTrapezoid.sink = this
}
,
PNLTRI.QsNode.prototype = {
    constructor: PNLTRI.QsNode
},
PNLTRI.QueryStructure = function(inPolygonData) {
    var initialTrap = new PNLTRI.Trapezoid(null ,null ,null ,null );
    if (this.trapArray = [],
    this.appendTrapEntry(initialTrap),
    this.root = new PNLTRI.QsNode(initialTrap),
    inPolygonData)
        for (var segListArray = inPolygonData.getSegments(), i = 0; i < segListArray.length; i++)
            segListArray[i].rootFrom = segListArray[i].rootTo = this.root,
            segListArray[i].is_inserted = !1
}
,
PNLTRI.QueryStructure.prototype = {
    constructor: PNLTRI.QueryStructure,
    getRoot: function() {
        return this.root
    },
    appendTrapEntry: function(inTrapezoid) {
        inTrapezoid.trapID = this.trapArray.length,
        this.trapArray.push(inTrapezoid)
    },
    cloneTrap: function(inTrapezoid) {
        var trap = inTrapezoid.clone();
        return this.appendTrapEntry(trap),
        trap
    },
    splitNodeAtPoint: function(inNode, inPoint, inReturnUpper) {
        var trUpper = inNode.trap;
        if (trUpper.vHigh == inPoint)
            return inNode;
        if (trUpper.vLow == inPoint)
            return inNode;
        var trLower = trUpper.splitOffLower(inPoint);
        return this.appendTrapEntry(trLower),
        inNode.yval = inPoint,
        inNode.trap = null ,
        inNode.right = new PNLTRI.QsNode(trUpper),
        inNode.left = new PNLTRI.QsNode(trLower),
        inReturnUpper ? trUpper.sink : trLower.sink
    },
    fpEqual: function(inNum0, inNum1) {
        return Math.abs(inNum0 - inNum1) < PNLTRI.Math.EPSILON_P
    },
    is_left_of: function(inSeg, inPt, inBetweenY) {
        var retVal, dXfrom = inSeg.vFrom.x - inPt.x, dXto = inSeg.vTo.x - inPt.x, dYfromZero = this.fpEqual(inSeg.vFrom.y, inPt.y);
        if (this.fpEqual(inSeg.vTo.y, inPt.y)) {
            if (dYfromZero)
                return 0;
            retVal = dXto
        } else {
            if (!dYfromZero)
                return inSeg.upward ? PNLTRI.Math.ptsCrossProd(inSeg.vFrom, inSeg.vTo, inPt) : PNLTRI.Math.ptsCrossProd(inSeg.vTo, inSeg.vFrom, inPt);
            retVal = dXfrom
        }
        return Math.abs(retVal) < PNLTRI.Math.EPSILON_P ? 0 : retVal
    },
    segNodes: function(inSegment) {
        this.ptNode(inSegment, !0),
        this.ptNode(inSegment, !1)
    },
    ptNode: function(inSegment, inUseFrom) {
        var ptMain, ptOther, qsNode;
        inUseFrom ? (ptMain = inSegment.vFrom,
        ptOther = inSegment.vTo,
        qsNode = inSegment.rootFrom) : (ptMain = inSegment.vTo,
        ptOther = inSegment.vFrom,
        qsNode = inSegment.rootTo);
        for (var compRes, isInSegmentShorter; qsNode; )
            if (qsNode.yval)
                qsNode = -1 == PNLTRI.Math.compare_pts_yx(ptMain == qsNode.yval ? ptOther : ptMain, qsNode.yval) ? qsNode.left : qsNode.right;
            else {
                if (!qsNode.seg)
                    return qsNode.trap || console.log("ptNode: unknown type", qsNode),
                    inUseFrom ? inSegment.rootFrom = qsNode : inSegment.rootTo = qsNode,
                    qsNode;
                if (ptMain == qsNode.seg.vFrom || ptMain == qsNode.seg.vTo) {
                    if (this.fpEqual(ptMain.y, ptOther.y)) {
                        this.fpEqual(qsNode.seg.vFrom.y, qsNode.seg.vTo.y) ? ptMain == qsNode.seg.vFrom ? (isInSegmentShorter = inSegment.upward ? ptOther.x >= qsNode.seg.vTo.x : ptOther.x < qsNode.seg.vTo.x,
                        qsNode = (isInSegmentShorter ? inSegment.sprev.upward : qsNode.seg.snext.upward) ? qsNode.right : qsNode.left) : (isInSegmentShorter = inSegment.upward ? ptOther.x < qsNode.seg.vFrom.x : ptOther.x >= qsNode.seg.vFrom.x,
                        qsNode = (isInSegmentShorter ? inSegment.snext.upward : qsNode.seg.sprev.upward) ? qsNode.left : qsNode.right) : qsNode = ptOther.x < ptMain.x ? qsNode.left : qsNode.right;
                        continue
                    }
                    compRes = this.is_left_of(qsNode.seg, ptOther, !1),
                    0 === compRes && (ptMain == qsNode.seg.vFrom ? (isInSegmentShorter = inSegment.upward ? ptOther.y >= qsNode.seg.vTo.y : ptOther.y < qsNode.seg.vTo.y,
                    compRes = isInSegmentShorter ? this.is_left_of(qsNode.seg, inSegment.sprev.vFrom, !1) : -this.is_left_of(qsNode.seg, qsNode.seg.snext.vTo, !1)) : (isInSegmentShorter = inSegment.upward ? ptOther.y < qsNode.seg.vFrom.y : ptOther.y >= qsNode.seg.vFrom.y,
                    compRes = isInSegmentShorter ? this.is_left_of(qsNode.seg, inSegment.snext.vTo, !1) : -this.is_left_of(qsNode.seg, qsNode.seg.sprev.vFrom, !1)))
                } else if (compRes = this.is_left_of(qsNode.seg, ptMain, !0),
                0 === compRes && (compRes = this.is_left_of(qsNode.seg, ptOther, !1),
                0 === compRes)) {
                    var tmpPtOther = inUseFrom ? inSegment.sprev.vFrom : inSegment.snext.vTo;
                    compRes = this.is_left_of(qsNode.seg, tmpPtOther, !1)
                }
                if (compRes > 0)
                    qsNode = qsNode.left;
                else {
                    if (!(0 > compRes))
                        return qsNode;
                    qsNode = qsNode.right
                }
            }
    },
    add_segment: function(inSegment) {
        function fresh_seg_or_upward_cusp() {
            var trUpper = trCurrent.uL || trCurrent.uR;
            trUpper.dL && trUpper.dR ? trCurrent == trUpper.dL ? (trNewRight.uL = null ,
            trUpper.dL = trNewLeft) : (trNewLeft.uR = null ,
            trUpper.dR = trNewRight) : (trNewRight.uL = null ,
            trNewRight.uR = trUpper,
            trUpper.dR = trNewRight)
        }
        function continue_chain_from_above() {
            trCurrent.usave ? (trCurrent.uleft ? (trNewRight.uL = trCurrent.uR,
            trNewRight.uR = trCurrent.usave,
            trNewRight.uL.dL = trNewRight,
            trNewRight.uR.dR = trNewRight) : (trNewLeft.uR = trCurrent.uL,
            trNewLeft.uL = trCurrent.usave,
            trNewLeft.uL.dL = trNewLeft,
            trNewLeft.uR.dR = trNewLeft),
            trNewLeft.usave = trNewRight.usave = null ) : trCurrent.vHigh == trFirst.vHigh ? (trNewRight.uR.dR = trNewRight,
            trNewLeft.uR = trNewRight.uL = null ) : trNewRight == trCurrent ? (trNewRight.uL = trNewRight.uR,
            trNewRight.uR = null ,
            trNewRight.uL.dL = trNewRight) : (trNewLeft.uR = trNewLeft.uL,
            trNewLeft.uL = null )
        }
        function only_one_trap_below(inTrNext) {
            trCurrent.vLow == trLast.vLow ? (meetsLowAdjSeg ? trCurrent.dL ? (inTrNext.uL = trNewLeft,
            trNewLeft.dL = inTrNext,
            trNewRight.dR = null ) : (inTrNext.uR = trNewRight,
            trNewLeft.dL = null ,
            trNewRight.dR = inTrNext) : (inTrNext.uL = trNewLeft,
            inTrNext.uR = trNewRight,
            trNewLeft.dL = trNewRight.dR = inTrNext),
            trNewLeft.dR = trNewRight.dL = null ) : (inTrNext.uL && inTrNext.uR && (inTrNext.uL == trCurrent ? (inTrNext.usave = inTrNext.uR,
            inTrNext.uleft = !0) : (inTrNext.usave = inTrNext.uL,
            inTrNext.uleft = !1)),
            inTrNext.uL = trNewLeft,
            inTrNext.uR = trNewRight,
            trNewLeft.dR = trNewRight.dL = inTrNext,
            trNewLeft.dL = trNewRight.dR = null )
        }
        function two_trap_below() {
            var trNext;
            if (trCurrent.vLow == trLast.vLow && meetsLowAdjSeg)
                trCurrent.dL.uL = trNewLeft,
                trCurrent.dR.uR = trNewRight,
                trNewLeft.dL = trCurrent.dL,
                trNewRight.dR = trCurrent.dR,
                trNewLeft.dR = trNewRight.dL = null ,
                trNext = null ;
            else {
                trCurrent.dL.uL = trNewLeft,
                trCurrent.dR.uR = trNewRight;
                var goDownRight, compRes = scope.is_left_of(inSegment, trCurrent.vLow, !0);
                if (compRes > 0)
                    goDownRight = !0;
                else if (0 > compRes)
                    goDownRight = !1;
                else {
                    var vLowSeg = trCurrent.dL.rseg
                      , directionIsUp = vLowSeg.upward
                      , otherPt = directionIsUp ? vLowSeg.vFrom : vLowSeg.vTo;
                    compRes = scope.is_left_of(inSegment, otherPt, !1),
                    compRes > 0 ? goDownRight = !0 : 0 > compRes ? goDownRight = !1 : (vLowSeg = directionIsUp ? vLowSeg.snext : vLowSeg.sprev,
                    otherPt = directionIsUp ? vLowSeg.vTo : vLowSeg.vFrom,
                    compRes = scope.is_left_of(inSegment, otherPt, !1),
                    goDownRight = compRes > 0 ? !0 : !1)
                }
                goDownRight ? (trNext = trCurrent.dR,
                trCurrent.dR.uL = trNewLeft,
                trNewLeft.dL = trCurrent.dL,
                trNewRight.dR = null ) : (trNext = trCurrent.dL,
                trCurrent.dL.uR = trNewRight,
                trNewRight.dR = trCurrent.dR,
                trNewLeft.dL = null ),
                trNewLeft.dR = trNewRight.dL = trNext
            }
            return trNext
        }
        var scope = this;
        this.segNodes(inSegment);
        var segLowVert, segLowNode, meetsLowAdjSeg, segHighVert, segHighNode, meetsHighAdjSeg;
        if (inSegment.upward ? (segLowVert = inSegment.vFrom,
        segHighVert = inSegment.vTo,
        segLowNode = inSegment.rootFrom,
        segHighNode = inSegment.rootTo,
        meetsLowAdjSeg = inSegment.sprev.is_inserted,
        meetsHighAdjSeg = inSegment.snext.is_inserted) : (segLowVert = inSegment.vTo,
        segHighVert = inSegment.vFrom,
        segLowNode = inSegment.rootTo,
        segHighNode = inSegment.rootFrom,
        meetsLowAdjSeg = inSegment.snext.is_inserted,
        meetsHighAdjSeg = inSegment.sprev.is_inserted),
        !meetsHighAdjSeg) {
            var tmpNode = this.splitNodeAtPoint(segHighNode, segHighVert, !1);
            segHighNode == segLowNode && (segLowNode = tmpNode),
            segHighNode = tmpNode
        }
        var trFirst = segHighNode.trap;
        if (!trFirst.uL && !trFirst.uR)
            return void console.log("ERR add_segment: missing trFirst.uX: ", trFirst);
        if (trFirst.vHigh != segHighVert)
            return void console.log("ERR add_segment: trFirstHigh != segHigh: ", trFirst);
        meetsLowAdjSeg || (segLowNode = this.splitNodeAtPoint(segLowNode, segLowVert, !0));
        for (var trNewLeft, trNewRight, trPrevLeft, trPrevRight, trNext, trLast = segLowNode.trap, trCurrent = trFirst, counter = this.trapArray.length + 2; trCurrent; ) {
            if (--counter < 0)
                return void console.log("ERR add_segment: infinite loop", trCurrent, inSegment, this);
            if (!trCurrent.dL && !trCurrent.dR)
                return void console.log("ERR add_segment: missing successors", trCurrent, inSegment, this);
            var qs_trCurrent = trCurrent.sink;
            qs_trCurrent.seg = inSegment,
            qs_trCurrent.trap = null ,
            trPrevRight && trPrevRight.rseg == trCurrent.rseg ? (trNewLeft = trCurrent,
            trNewRight = trPrevRight,
            trNewRight.vLow = trCurrent.vLow,
            qs_trCurrent.left = new PNLTRI.QsNode(trNewLeft),
            qs_trCurrent.right = trPrevRight.sink) : trPrevLeft && trPrevLeft.lseg == trCurrent.lseg ? (trNewRight = trCurrent,
            trNewLeft = trPrevLeft,
            trNewLeft.vLow = trCurrent.vLow,
            qs_trCurrent.left = trPrevLeft.sink,
            qs_trCurrent.right = new PNLTRI.QsNode(trNewRight)) : (trNewLeft = trCurrent,
            trNewRight = this.cloneTrap(trCurrent),
            qs_trCurrent.left = new PNLTRI.QsNode(trNewLeft),
            qs_trCurrent.right = new PNLTRI.QsNode(trNewRight)),
            trCurrent.uL && trCurrent.uR ? continue_chain_from_above() : fresh_seg_or_upward_cusp(),
            trCurrent.dL && trCurrent.dR ? trNext = two_trap_below() : (trNext = trCurrent.dL ? trCurrent.dL : trCurrent.dR,
            only_one_trap_below(trNext)),
            trNewLeft.rseg && (trNewLeft.rseg.trLeft = trNewRight),
            trNewRight.lseg && (trNewRight.lseg.trRight = trNewLeft),
            trNewLeft.rseg = trNewRight.lseg = inSegment,
            inSegment.trLeft = trNewLeft,
            inSegment.trRight = trNewRight,
            trCurrent.vLow != trLast.vLow ? (trPrevLeft = trNewLeft,
            trPrevRight = trNewRight,
            trCurrent = trNext) : trCurrent = null 
        }
        inSegment.is_inserted = !0
    },
    assignDepths: function(inPolyData) {
        var thisTrap, borderSeg, thisDepth = [this.trapArray[0]], nextDepth = [], curDepth = 0;
        do {
            for (var expectedRsegUpward = curDepth % 2 == 1; thisTrap = thisDepth.pop(); )
                -1 == thisTrap.depth && (thisTrap.depth = curDepth,
                thisTrap.uL && thisDepth.push(thisTrap.uL),
                thisTrap.uR && thisDepth.push(thisTrap.uR),
                thisTrap.dL && thisDepth.push(thisTrap.dL),
                thisTrap.dR && thisDepth.push(thisTrap.dR),
                (borderSeg = thisTrap.lseg) && -1 == borderSeg.trLeft.depth && nextDepth.push(borderSeg.trLeft),
                (borderSeg = thisTrap.rseg) && (-1 == borderSeg.trRight.depth && nextDepth.push(borderSeg.trRight),
                borderSeg.upward != expectedRsegUpward && inPolyData.set_PolyLeft_wrong(borderSeg.chainId)));
            thisDepth = nextDepth,
            nextDepth = [],
            curDepth++
        } while (thisDepth.length > 0)
    },
    create_visibility_map: function(inPolygonData) {
        var i, j, DIAG_UL = 0, DIAG_UM = 1, DIAG_ULR = 2, DIAG_UR = 3, DIAG_DR = 4, DIAG_DM = 5, DIAG_DLR = 6, DIAG_DL = 7, nbVertices = inPolygonData.nbVertices(), myVisibleDiagonals = new Array(nbVertices);
        for (i = 0; nbVertices > i; i++)
            myVisibleDiagonals[i] = new Array(DIAG_DL + 1);
        var myExternalNeighbors = new Array(nbVertices);
        for (i = 0,
        j = this.trapArray.length; j > i; i++) {
            var curTrap = this.trapArray[i]
              , highPos = curTrap.uL ? curTrap.uR ? DIAG_DM : DIAG_DL : curTrap.uR ? DIAG_DR : DIAG_DLR
              , lowPos = curTrap.dL ? curTrap.dR ? DIAG_UM : DIAG_UL : curTrap.dR ? DIAG_UR : DIAG_ULR;
            if (curTrap.depth % 2 == 1) {
                if (highPos == DIAG_DM || lowPos == DIAG_UM || highPos == DIAG_DL && lowPos == DIAG_UR || highPos == DIAG_DR && lowPos == DIAG_UL) {
                    var lhDiag = inPolygonData.appendDiagonalsEntry({
                        vFrom: curTrap.vLow,
                        vTo: curTrap.vHigh,
                        mprev: null ,
                        mnext: null ,
                        marked: !1
                    })
                      , hlDiag = inPolygonData.appendDiagonalsEntry({
                        vFrom: curTrap.vHigh,
                        vTo: curTrap.vLow,
                        revDiag: lhDiag,
                        mprev: null ,
                        mnext: null ,
                        marked: !1
                    });
                    lhDiag.revDiag = hlDiag,
                    myVisibleDiagonals[curTrap.vLow.id][lowPos] = lhDiag,
                    myVisibleDiagonals[curTrap.vHigh.id][highPos] = hlDiag
                }
            } else
                null  !== curTrap.vHigh.id && (myExternalNeighbors[curTrap.vHigh.id] = highPos),
                null  !== curTrap.vLow.id && (myExternalNeighbors[curTrap.vLow.id] = lowPos)
        }
        var curDiag, curDiags, firstElem, fromVertex, lastIncoming;
        for (i = 0; nbVertices > i; i++)
            if (curDiags = myVisibleDiagonals[i],
            firstElem = myExternalNeighbors[i],
            null  != firstElem) {
                j = firstElem,
                lastIncoming = null ;
                do
                    j++ > DIAG_DL && (j = DIAG_UL),
                    (curDiag = curDiags[j]) && (lastIncoming ? (curDiag.mprev = lastIncoming,
                    lastIncoming.mnext = curDiag) : (fromVertex = curDiag.vFrom,
                    fromVertex.firstOutDiag = curDiag),
                    lastIncoming = curDiag.revDiag);
                while (j != firstElem);lastIncoming && (fromVertex.lastInDiag = lastIncoming)
            }
    }
},
PNLTRI.Trapezoider = function(inPolygonData) {
    this.polyData = inPolygonData,
    this.queryStructure = new PNLTRI.QueryStructure(this.polyData)
}
,
PNLTRI.Trapezoider.prototype = {
    constructor: PNLTRI.Trapezoider,
    optimise_randomlist: function(inOutSegListArray) {
        var mainIdx = 0
          , helpIdx = this.polyData.nbPolyChains();
        if (1 != helpIdx)
            for (var chainMarker = new Array(helpIdx), oldSegListArray = inOutSegListArray.concat(), i = 0; i < oldSegListArray.length; i++) {
                var chainId = oldSegListArray[i].chainId;
                chainMarker[chainId] ? inOutSegListArray[helpIdx++] = oldSegListArray[i] : (inOutSegListArray[mainIdx++] = oldSegListArray[i],
                chainMarker[chainId] = !0)
            }
    },
    trapezoide_polygon: function() {
        var randSegListArray = this.polyData.getSegments().concat();
        PNLTRI.Math.array_shuffle(randSegListArray),
        this.optimise_randomlist(randSegListArray);
        for (var i, nbSegs = randSegListArray.length, myQs = this.queryStructure, current = 0, logstar = nbSegs; nbSegs > current; ) {
            logstar = Math.log(logstar) / Math.LN2;
            for (var partEnd = logstar > 1 ? Math.floor(nbSegs / logstar) : nbSegs; partEnd > current; current++)
                myQs.add_segment(randSegListArray[current]);
            for (i = current; nbSegs > i; i++)
                this.queryStructure.segNodes(randSegListArray[i])
        }
        for (myQs.assignDepths(this.polyData),
        i = 0; nbSegs > i; i++)
            randSegListArray[i].trLeft = randSegListArray[i].trRight = null 
    },
    create_visibility_map: function() {
        return this.queryStructure.create_visibility_map(this.polyData)
    }
},
PNLTRI.MonoSplitter = function(inPolygonData) {
    this.polyData = inPolygonData,
    this.trapezoider = null 
}
,
PNLTRI.MonoSplitter.prototype = {
    constructor: PNLTRI.MonoSplitter,
    monotonate_trapezoids: function() {
        this.trapezoider = new PNLTRI.Trapezoider(this.polyData),
        this.trapezoider.trapezoide_polygon(),
        this.trapezoider.create_visibility_map(),
        this.polyData.create_mono_chains(),
        this.polyData.unique_monotone_chains_max()
    }
},
PNLTRI.MonoTriangulator = function(inPolygonData) {
    this.polyData = inPolygonData
}
,
PNLTRI.MonoTriangulator.prototype = {
    constructor: PNLTRI.MonoTriangulator,
    triangulate_all_polygons: function() {
        var normedMonoChains = this.polyData.getMonoSubPolys();
        this.polyData.clearTriangles();
        for (var i = 0; i < normedMonoChains.length; i++) {
            var monoPosmax = normedMonoChains[i]
              , prevMono = monoPosmax.mprev
              , nextMono = monoPosmax.mnext;
            nextMono.mnext == prevMono ? this.polyData.addTriangle(monoPosmax.vFrom, nextMono.vFrom, prevMono.vFrom) : this.triangulate_monotone_polygon(monoPosmax)
        }
    },
    triangulate_monotone_polygon: function(monoPosmax) {
        function error_cleanup() {
            for (console.log("ERR uni-y-monotone: only concave angles left", vertBackLog); vertBackLogIdx > 1; )
                vertBackLogIdx--,
                scope.polyData.addTriangle(vertBackLog[vertBackLogIdx - 1], vertBackLog[vertBackLogIdx], vertBackLog[vertBackLogIdx + 1])
        }
        var scope = this
          , frontMono = monoPosmax.mnext
          , endVert = monoPosmax.vFrom
          , vertBackLog = [frontMono.vFrom]
          , vertBackLogIdx = 0;
        frontMono = frontMono.mnext;
        var frontVert = frontMono.vFrom;
        if (frontVert != endVert) {
            for (; frontVert != endVert || vertBackLogIdx > 1; )
                if (vertBackLogIdx > 0) {
                    var insideAngleCCW = PNLTRI.Math.ptsCrossProd(vertBackLog[vertBackLogIdx], frontVert, vertBackLog[vertBackLogIdx - 1]);
                    Math.abs(insideAngleCCW) <= PNLTRI.Math.EPSILON_P && (frontVert == endVert || PNLTRI.Math.compare_pts_yx(vertBackLog[vertBackLogIdx], frontVert) == PNLTRI.Math.compare_pts_yx(vertBackLog[vertBackLogIdx], vertBackLog[vertBackLogIdx - 1])) && (insideAngleCCW = 1),
                    insideAngleCCW > 0 ? (this.polyData.addTriangle(vertBackLog[vertBackLogIdx - 1], vertBackLog[vertBackLogIdx], frontVert),
                    vertBackLogIdx--) : (vertBackLog[++vertBackLogIdx] = frontVert,
                    frontVert == endVert ? error_cleanup() : (frontMono = frontMono.mnext,
                    frontVert = frontMono.vFrom))
                } else
                    vertBackLog[++vertBackLogIdx] = frontVert,
                    frontMono = frontMono.mnext,
                    frontVert = frontMono.vFrom;
            this.polyData.addTriangle(vertBackLog[vertBackLogIdx - 1], vertBackLog[vertBackLogIdx], frontVert)
        }
    }
},
PNLTRI.Triangulator = function() {
    this.lastPolyData = null 
}
,
PNLTRI.Triangulator.prototype = {
    constructor: PNLTRI.Triangulator,
    clear_lastData: function() {
        this.lastPolyData = null 
    },
    get_PolyLeftArr: function() {
        return this.lastPolyData ? this.lastPolyData.get_PolyLeftArr() : null 
    },
    triangulate_polygon: function(inPolygonChains, inForceTrapezoidation) {
        function is_basic_polygon() {
            return inForceTrapezoidation ? !1 : 1 == myPolygonData.nbPolyChains()
        }
        if (this.clear_lastData(),
        !inPolygonChains || 0 === inPolygonChains.length)
            return [];
        var myTriangulator, myPolygonData = new PNLTRI.PolygonData(inPolygonChains), basicPolygon = is_basic_polygon();
        if (basicPolygon && (myTriangulator = new PNLTRI.EarClipTriangulator(myPolygonData),
        basicPolygon = myTriangulator.triangulate_polygon_no_holes()),
        !basicPolygon) {
            var myMonoSplitter = new PNLTRI.MonoSplitter(myPolygonData);
            myMonoSplitter.monotonate_trapezoids(),
            myTriangulator = new PNLTRI.MonoTriangulator(myPolygonData),
            myTriangulator.triangulate_all_polygons()
        }
        return this.lastPolyData = myPolygonData,
        myPolygonData.getTriangles()
    }
},
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = PNLTRI),
exports.PNLTRI = PNLTRI) : this.PNLTRI = PNLTRI;
