google.maps.__gjsload__('overlay', function(_) {
    var ID = function(a) {
            this.Fg = a
        },
        Vma = function() {},
        JD = function(a) {
            a.Ux = a.Ux || new Vma;
            return a.Ux
        },
        Wma = function(a) {
            this.Eh = new _.Vm(() => {
                const b = a.Ux;
                if (a.getPanes()) {
                    if (a.getProjection()) {
                        if (!b.qw && a.onAdd) a.onAdd();
                        b.qw = !0;
                        a.draw()
                    }
                } else {
                    if (b.qw)
                        if (a.onRemove) a.onRemove();
                        else a.remove();
                    b.qw = !1
                }
            }, 0)
        },
        Xma = function(a, b) {
            const c = JD(a);
            let d = c.Av;
            d || (d = c.Av = new Wma(a));
            _.Qb(c.Rh || [], _.rk);
            var e = c.li = c.li || new _.zia;
            const f = b.__gm;
            e.bindTo("zoom", f);
            e.bindTo("offset", f);
            e.bindTo("center", f, "projectionCenterQ");
            e.bindTo("projection", b);
            e.bindTo("projectionTopLeft", f);
            e = c.IB = c.IB || new ID(e);
            e.bindTo("zoom", f);
            e.bindTo("offset", f);
            e.bindTo("projection", b);
            e.bindTo("projectionTopLeft", f);
            a.bindTo("projection", e, "outProjection");
            a.bindTo("panes", f);
            e = () => _.Wm(d.Eh);
            c.Rh = [_.pk(a, "panes_changed", e), _.pk(f, "zoom_changed", e), _.pk(f, "offset_changed", e), _.pk(b, "projection_changed", e), _.pk(f, "projectioncenterq_changed", e)];
            _.Wm(d.Eh);
            b instanceof _.Mk ? (_.wl(b, "Ox"), _.ul(b, 148440)) : b instanceof _.Rl && (_.wl(b, "Oxs"),
                _.ul(b, 181451))
        },
        bna = function(a) {
            if (a) {
                var b = a.getMap();
                if (Yma(a) !== b && b && b instanceof _.Mk) {
                    const c = b.__gm;
                    c.overlayLayer ? a.__gmop = new Zma(b, a, c.overlayLayer) : c.Gg.then(({
                        lh: d
                    }) => {
                        const e = new $ma(b, d);
                        d.Bi(e);
                        c.overlayLayer = e;
                        ana(a);
                        bna(a)
                    })
                }
            }
        },
        ana = function(a) {
            if (a) {
                var b = a.__gmop;
                b && (a.__gmop = null, b.Fg.unbindAll(), b.Fg.set("panes", null), b.Fg.set("projection", null), b.Hg.rl(b), b.Gg && (b.Gg = !1, b.Fg.onRemove ? b.Fg.onRemove() : b.Fg.remove()))
            }
        },
        Yma = function(a) {
            return (a = a.__gmop) ? a.map : null
        },
        cna = function(a,
            b) {
            a.Fg.get("projection") != b && (a.Fg.bindTo("panes", a.map.__gm), a.Fg.set("projection", b))
        };
    _.Ia(ID, _.Gk);
    ID.prototype.changed = function(a) {
        "outProjection" != a && (a = !!(this.get("offset") && this.get("projectionTopLeft") && this.get("projection") && _.$i(this.get("zoom"))), a == !this.get("outProjection") && this.set("outProjection", a ? this.Fg : null))
    };
    var KD = {};
    _.Ia(Wma, _.Gk);
    KD.Wk = function(a) {
        if (a) {
            var b = a.getMap();
            (JD(a).rB || null) !== b && (b && Xma(a, b), JD(a).rB = b)
        }
    };
    KD.rl = function(a) {
        const b = JD(a);
        var c = b.li;
        c && c.unbindAll();
        (c = b.IB) && c.unbindAll();
        a.unbindAll();
        a.set("panes", null);
        a.set("projection", null);
        b.Rh && _.Qb(b.Rh, _.rk);
        b.Rh = null;
        b.Av && (b.Av.Eh.Dj(), b.Av = null);
        delete JD(a).rB
    };
    var LD = {},
        Zma = class {
            constructor(a, b, c) {
                this.map = a;
                this.Fg = b;
                this.Hg = c;
                this.Gg = !1;
                _.wl(this.map, "Ox");
                _.ul(this.map, 148440);
                c.Wk(this)
            }
            draw() {
                this.Gg || (this.Gg = !0, this.Fg.onAdd && this.Fg.onAdd());
                this.Fg.draw && this.Fg.draw()
            }
        },
        $ma = class {
            constructor(a, b) {
                this.Jg = a;
                this.Hg = b;
                this.Fg = null;
                this.Gg = []
            }
            dispose() {}
            Ti(a, b, c, d, e, f, g, h) {
                const l = this.Fg = this.Fg || new _.xB(this.Jg, this.Hg, () => {});
                l.Ti(a, b, c, d, e, f, g, h);
                for (const n of this.Gg) cna(n, l), n.draw()
            }
            Wk(a) {
                this.Gg.push(a);
                this.Fg && cna(a, this.Fg);
                this.Hg.refresh()
            }
            rl(a) {
                _.Ub(this.Gg,
                    a)
            }
        };
    LD.Wk = bna;
    LD.rl = ana;
    _.hk("overlay", {
        Lz: function(a) {
            if (a) {
                (0, KD.rl)(a);
                (0, LD.rl)(a);
                var b = a.getMap();
                b && (b instanceof _.Mk ? (0, LD.Wk)(a) : (0, KD.Wk)(a))
            }
        },
        preventMapHitsFrom: a => {
            _.bw(a, {
                Ok: ({
                    event: b
                }) => {
                    _.Jt(b.Kh)
                },
                Yj: b => _.Lv(b),
                Gp: b => _.Mv(b),
                Pk: b => _.Mv(b),
                kk: b => _.Nv(b)
            }).ir(!0)
        },
        preventMapHitsAndGesturesFrom: a => {
            a.addEventListener("click", _.nk);
            a.addEventListener("contextmenu", _.nk);
            a.addEventListener("dblclick", _.nk);
            a.addEventListener("mousedown", _.nk);
            a.addEventListener("mousemove", _.nk);
            a.addEventListener("MSPointerDown",
                _.nk);
            a.addEventListener("pointerdown", _.nk);
            a.addEventListener("touchstart", _.nk);
            a.addEventListener("wheel", _.nk)
        }
    });
});