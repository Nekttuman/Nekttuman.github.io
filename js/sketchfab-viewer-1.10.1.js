!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Sketchfab = e() : t.Sketchfab = e()
}(self, (function () {
    return (() => {
        var t = {
            281: t => {
                function e(i) {
                    return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? t.exports = e = function (t) {
                        return typeof t
                    } : t.exports = e = function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }, e(i)
                }

                t.exports = e
            }
        }, e = {};

        function i(n) {
            var s = e[n];
            if (void 0 !== s) return s.exports;
            var r = e[n] = {exports: {}};
            return t[n](r, r.exports, i), r.exports
        }

        i.n = t => {
            var e = t && t.__esModule ? () => t.default : () => t;
            return i.d(e, {a: e}), e
        }, i.d = (t, e) => {
            for (var n in e) i.o(e, n) && !i.o(t, n) && Object.defineProperty(t, n, {enumerable: !0, get: e[n]})
        }, i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
        var n = {};
        return (() => {
            "use strict";
            i.d(n, {default: () => c});
            var t = i(281), e = i.n(t), s = function (t, e) {
                t.forEach((function (t) {
                    this[t] = function () {
                        var i, n = e._requestIdCounter++, s = Array.prototype.slice.call(arguments);
                        if (s.length > 0) {
                            var r = s[s.length - 1];
                            "function" == typeof r && (i = s.pop())
                        }
                        i && (e._pendingRequests[n] = i.bind(this)), e._target.postMessage({
                            type: "api.request",
                            instanceId: e.getIdentifier(),
                            requestId: n,
                            member: t,
                            arguments: s
                        }, e.getDomain())
                    }
                }), this), this.addEventListener = function (t, i, n) {
                    "viewerready" === t && e.isViewerReady && i(), e._eventListeners[t] || (e._eventListeners[t] = []), e._eventListeners[t].push(i), n && this.setListenerOptions && (n.name = t, this.setListenerOptions(n))
                }, this.removeEventListener = function (t, i) {
                    if (e._eventListeners[t]) {
                        var n = e._eventListeners[t].indexOf(i);
                        -1 !== n && e._eventListeners[t].splice(n, 1)
                    }
                }
            }, r = function (t, e, i) {
                this._target = t, this._requestIdCounter = 0, this._pendingRequests = {}, this._eventListeners = {}, this._ready = !1, this._domain = i, this._instanceId = e, this.listenServer()
            };
            r.prototype = {
                getIdentifier: function () {
                    return this._instanceId
                }, getDomain: function () {
                    return this._domain
                }, setIdentifier: function (t) {
                    this._instanceId = t
                }, use: function (t, e) {
                    this._version = t, this._ready = !0;
                    var i = this._requestIdCounter++;
                    this._pendingRequests[i] = function (t, i, n) {
                        t ? e.call(this, t) : e.call(this, null, new s(n, this))
                    }.bind(this), this._target.postMessage({
                        type: "api.initialize",
                        requestId: i,
                        name: t,
                        instanceId: this._instanceId
                    }, this._domain)
                }, listenServer: function () {
                    if (!this._serverReceiveMessageBinded) {
                        var t = ["api.initialize.result", "api.request.result", "api.event"];
                        this._serverReceiveMessageBinded = function (e) {
                            if (e.origin === this._domain && e.data && e.data.type && e.data.instanceId && e.data.instanceId === this.getIdentifier()) {
                                var i = e.data.type;
                                if (-1 !== t.indexOf(i)) if ("api.event" === i) {
                                    var n = e.data.results, s = n[0];
                                    if (this._eventListeners["*"] || this._eventListeners.all) return void ["*", "all"].forEach((function (t) {
                                        var e = this._eventListeners[t];
                                        e && e.forEach((function (t) {
                                            t.apply(t, n)
                                        }))
                                    }), this);
                                    var r = n.slice(1), o = this._eventListeners[s];
                                    o ? o.forEach((function (t) {
                                        t.apply(t, r)
                                    })) : "viewerready" === s && (this.isViewerReady = !0)
                                } else {
                                    var a = e.data.requestId, d = this._pendingRequests[a];
                                    if (!d) return;
                                    d.apply(null, e.data.results), this._pendingRequests[a] = void 0
                                }
                            }
                        }.bind(this), window.addEventListener("message", this._serverReceiveMessageBinded)
                    }
                }
            };
            const o = r;
            var a = /[&|;]+/g;

            function d(t) {
                return "object" === e()(t) ? (i = t, n = {}, Object.keys(i).forEach((function (t) {
                    n[t] = Array.isArray(i[t]) ? i[t] : [i[t]]
                })), n) : ("?" === t[0] && (t = t.substr(1)), t.split(a).reduce((function (t, e) {
                    if (0 === e.length) return t;
                    var i = e.indexOf("=");
                    -1 === i && (i = e.length);
                    var n = decodeURIComponent(e.substr(0, i).replace(/\+/g, "%20")),
                        s = decodeURIComponent(e.substr(i + 1).replace(/\+/g, "%20"));
                    return void 0 === t[n] && (t[n] = []), t[n].push(s), t
                }), {}));
                var i, n
            }

            window.SketchfabAPIClient = o;
            var h = function (t, i) {
                var n = t, s = i;
                "object" === e()(t) && (s = t, n = null), this._version = n, this._target = s, window.sketchfabAPIinstances || (window.sketchfabAPIinstances = []), window.sketchfabAPIinstances.push(this), this._apiId = window.sketchfabAPIinstances.length.toString(), this._target.id && (this._apiId += "_" + this._target.id), this._target.allow || (this._target.allow = "vr; autoplay; fullscreen"), this._client = void 0, this._options = void 0, this._domain = "sketchfab.com", this._domain = "same-as-current" === this._domain ? window.location.hostname : this._domain, this._urlTemplate = "https://YYYY/models/XXXX/embed", this._url = this._urlTemplate.replace("YYYY", this._domain), this._transmitOptions = {}, this._getURLOptions()
            };
            h.prototype = {
                _urlOptionsDict: {skfb_api_version: {default: "1.10.1", type: "string"}}, _optionsLoaded: function (t) {
                    this._urlOptions = t, this._version = this._getURLOption("skfb_api_version", this._version)
                }, _getURLOption: function (t, e) {
                    var i = this._urlOptionsDict[t];
                    if (!i) return e;
                    null == e && (e = i.default);
                    var n = this._urlOptions[t];
                    return n && n.length ? n[0] : e
                }, _getURLOptions: function () {
                    if (!window || !window.location.search) return this._optionsLoaded({});
                    var t = d(window.location.search);
                    for (var e in t) e.startsWith("skfb_") && (this._transmitOptions[e.substr(5)] = t[e]);
                    return this._optionsLoaded(t)
                }, getEmbedURL: function (t, e) {
                    var i = this._url + "?api_version=" + this._version + "&api_id=" + this._apiId;
                    e && Object.keys(e).forEach((function (t) {
                        null != e[t] && "function" != typeof e[t] && (i += "&" + t.toString() + "=" + e[t].toString())
                    }));
                    var n = this._transmitOptions;
                    return Object.keys(this._transmitOptions).forEach((function (t) {
                        i += "&" + t.toString() + "=" + n[t].toString()
                    })), i.replace("XXXX", t)
                }, init: function (t, e) {
                    this._options = e, this._uid = t, this._realInit()
                }, reload: function (t) {
                    var e = document.createElement("script");
                    e.setAttribute("src", "https://static." + t + "/api/sketchfab-viewer-" + this._version + ".js"), e.addEventListener("load", function () {
                        this._url = this._urlTemplate.replace("YYYY", t), -1 !== this._domain.indexOf("sketchfab.com") && (this._transmitOptions.hook_prod = 1, this._transmitOptions.model = this._uid), this._realInit()
                    }.bind(this)), document.body.appendChild(e)
                }, _initializeAPIEmbed: function (t) {
                    if (t.data && t.data.instanceId && this._apiId === t.data.instanceId && "api.ready" === t.data.type && this._target.src) {
                        var e = t.data.options;
                        if (e && e.domain) this.reload(e.domain); else {
                            if (void 0 !== t.data.error) return this.error(t.data.error), void window.removeEventListener("message", this._initializeAPIEmbedBinded);
                            var i = this._target.src.split("/");
                            i = "https://" + i[2], this._client && (console.log("reusing a Sketchfab instance for multiple client is not supported, please create a new sketchfab instance"), window.removeEventListener("message", this._client._serverReceiveMessageBinded)), this._client = new window.SketchfabAPIClient(this._target.contentWindow, this._apiId, i), this._client.use(this._version, function (t, e) {
                                if (t) throw t;
                                this.success.call(this, e)
                            }.bind(this)), window.removeEventListener("message", this._initializeAPIEmbedBinded)
                        }
                    }
                }, _realInit: function () {
                    this._initializeAPIEmbedBinded || (this._initializeAPIEmbedBinded = this._initializeAPIEmbed.bind(this)), window.addEventListener("message", this._initializeAPIEmbedBinded), this._target.src = this.getEmbedURL(this._uid, this._options)
                }, success: function (t) {
                    this._options.success && "function" == typeof this._options.success && this._options.success(t)
                }, error: function (t) {
                    this._options.error && "function" == typeof this._options.error && this._options.error(t)
                }, show: function () {
                    var t = this._target.style.top;
                    this._target.style.top = "-1000vh", Promise.resolve().then(function () {
                        this._target.style.top = t
                    }.bind(this))
                }
            };
            const c = h
        })(), n.default
    })()
}));
//# sourceMappingURL=sketchfab-viewer-1.10.1.js.map