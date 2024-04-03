google.maps.__gjsload__('search_impl', function(_) {
    var mkb = function(a, b) {
            _.H(a.Ig, 3, b)
        },
        qkb = function(a, b, c) {
            const d = _.pL(new nkb);
            c.yq = (0, _.Ca)(d.load, d);
            c.clickable = 0 != a.get("clickable");
            _.LMa(c, _.FR(b));
            const e = [];
            e.push(_.pk(c, "click", (0, _.Ca)(okb, null, a)));
            _.Qb(["mouseover", "mouseout", "mousemove"], function(f) {
                e.push(_.pk(c, f, (0, _.Ca)(pkb, null, a, f)))
            });
            e.push(_.pk(a, "clickable_changed", function() {
                a.Fg.clickable = 0 != a.get("clickable")
            }));
            a.Gg = e
        },
        okb = function(a, b, c, d, e) {
            let f = null;
            if (e && (f = {
                    status: e.getStatus()
                }, 0 == e.getStatus())) {
                f.location = _.X(e.Ig,
                    2) ? new _.Dj(_.zu(_.J(e.Ig, 2, _.Fu).Ig, 1), _.zu(_.J(e.Ig, 2, _.Fu).Ig, 2)) : null;
                f.fields = {};
                const g = _.pi(e.Ig, 3);
                for (let h = 0; h < g; ++h) {
                    const l = _.$r(e.Ig, 3, _.OR, h);
                    f.fields[l.getKey()] = l.getValue()
                }
            }
            _.Ck(a, "click", b, c, d, f)
        },
        pkb = function(a, b, c, d, e, f, g) {
            let h = null;
            f && (h = {
                title: f[1].title,
                snippet: f[1].snippet
            });
            _.Ck(a, b, c, d, e, h, g)
        },
        rkb = function() {},
        skb = class extends _.R {
            constructor() {
                super()
            }
            bj() {
                return _.Ni(this.Ig, 2)
            }
        },
        tkb = [_.K, , , _.Yp, _.TNa];
    var ukb = class extends _.R {
        constructor(a) {
            super(a)
        }
        getStatus() {
            return _.I(this.Ig, 1, -1)
        }
    };
    var nkb = class {
        constructor() {
            var a = _.No,
                b = _.Ko;
            this.Gg = _.Pi;
            this.Fg = _.Ur(_.Mz, a, _.pB + "/maps/api/js/LayersService.GetFeature", b)
        }
        load(a, b) {
            function c(g) {
                g = new ukb(g);
                b(g)
            }
            var d = new skb;
            _.H(d.Ig, 1, a.layerId.split("|")[0]);
            _.H(d.Ig, 2, a.featureId);
            mkb(d, this.Gg.Fg().Fg());
            for (var e in a.parameters) {
                var f = _.Ji(d.Ig, 4, _.OR);
                _.H(f.Ig, 1, e);
                _.H(f.Ig, 2, a.parameters[e])
            }
            a = _.wi(d.Ai(), tkb, 1);
            this.Fg(a, c, c);
            return a
        }
        cancel() {
            throw Error("Not implemented");
        }
    };
    rkb.prototype.zD = function(a) {
        if (_.ln[15]) {
            var b = a.Jg;
            const c = a.Jg = a.getMap();
            b && a.Fg && (a.Hg ? (b = b.__gm.Vj, b.set(b.get().rn(a.Fg))) : a.Fg && _.hNa(a.Fg, b) && (_.Qb(a.Gg || [], _.rk), a.Gg = null));
            if (c) {
                b = new _.Cy;
                const d = a.get("layerId").split("|");
                b.layerId = d[0];
                for (let e = 1; e < d.length; ++e) {
                    const [f, ...g] = d[e].split(":");
                    b.parameters[f] = g.join(":")
                }
                a.get("spotlightDescription") && (b.spotlightDescription = new _.az(a.get("spotlightDescription")));
                a.get("paintExperimentIds") && (b.paintExperimentIds = a.get("paintExperimentIds").slice(0));
                a.get("styler") && (b.styler = new _.Qy(a.get("styler")));
                a.get("roadmapStyler") && (b.roadmapStyler = new _.Qy(a.get("roadmapStyler")));
                a.get("travelMapRequest") && (b.travelMapRequest = new _.bia(a.get("travelMapRequest")));
                a.get("mapsApiLayer") && (b.mapsApiLayer = new _.Iy(a.get("mapsApiLayer")));
                a.get("mapFeatures") && (b.mapFeatures = a.get("mapFeatures"));
                a.get("clickableCities") && (b.clickableCities = a.get("clickableCities"));
                a.get("searchPipeMetadata") && (b.searchPipeMetadata = new _.aB(a.get("searchPipeMetadata")));
                a.get("overlayLayer") && (b.overlayLayer = new _.bz(a.get("overlayLayer")));
                a.get("caseExperimentIds") && (b.caseExperimentIds = a.get("caseExperimentIds").slice(0));
                a.get("boostMapExperimentIds") && (b.boostMapExperimentIds = a.get("boostMapExperimentIds").slice(0));
                a.get("airQualityPipeMetadata") && (b.airQualityPipeMetadata = new _.Hha(a.get("airQualityPipeMetadata")));
                a.get("directionsPipeParameters") && (b.directionsPipeParameters = new _.Fha(a.get("directionsPipeParameters")));
                a.get("clientSignalPipeMetadata") &&
                    (b.clientSignalPipeMetadata = new _.cga(a.get("clientSignalPipeMetadata")));
                b.darkLaunch = !!a.get("darkLaunch");
                a.Fg = b;
                a.Hg = a.get("renderOnBaseMap");
                a.Hg ? (a = c.__gm.Vj, a.set(a.get().Bl(b))) : qkb(a, c, b);
                _.wl(c, "Lg");
                _.ul(c, 148282)
            }
        }
    };
    _.hk("search_impl", new rkb);
});