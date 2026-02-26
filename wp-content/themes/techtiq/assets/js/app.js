(() => {
    "use strict";
    var e, o = {
            548: () => {
                (new function() {
                    var e = this,
                        o = "#header",
                        t = jQuery(".search-btn"),
                        s = jQuery(".search-form.desktop"),
                        i = jQuery(".search-input"),
                        r = jQuery(".hamburger-menu"),
                        n = jQuery(".close-menu-btn"),
                        l = jQuery(".js-toggle-sub-menu"),
                        a = jQuery(".menu-item-object-services .our-services-menu a");
                    this.init = function() {
                        e.toggleFixedMenuOnScroll(), e.handleSearchFormToggle(), e.toggleMenuMobile(), e.addLogoServiceMenuItem()
                    }, this.toggleFixedMenuOnScroll = function() {
                        jQuery(window).on("scroll", (function(e) {
                            e.preventDefault(), jQuery(window).scrollTop() < 50 ? jQuery("body").removeClass("menu-fixed") : jQuery("body").addClass("menu-fixed")
                        }))
                    }, this.handleSearchFormToggle = function() {
                        jQuery(o).on("click", t, (function(e) {
                            "none" === s.css("display") && (s.show(), i.focus())
                        })), jQuery(o).on("click", ".js-close-search-btn", (function() {
                            s.hide()
                        })), jQuery(document).on("click", (function(e) {
                            t.is(e.target) || i.is(e.target) || s.hide()
                        }))
                    }, this.toggleMenuMobile = function() {
                        r.on("click", (function() {
                            jQuery("body").toggleClass("open-menu")
                        })), n.on("click", (function() {
                            jQuery("body").removeClass("open-menu")
                        })), jQuery(l).on("click", (function() {
                            jQuery(this).parent().toggleClass("active"), jQuery(this).closest("ul").toggleClass("open-sub-menu")
                        }))
                    }, this.addLogoServiceMenuItem = function() {
                        a.each((function() {
                            var e = jQuery(this),
                                o = e.attr("title");
                            o && e.prepend('<img width="26" height="26" class="logo" src="' + o + '" alt="' + e.text() + '" loading="lazy"/>')
                        }))
                    }
                }).init(), (new function() {
                    var e = this,
                        o = ".js-scroll-top",
                        t = jQuery(".contact-message-box"),
                        s = jQuery(".achievements-slider");
                    this.init = function() {
                        e.scroll2Top(), e.toggleContactMessageBox(), e.achievementsSlider(), e.toggleMenuFooter(), e.addRefForExternalLinks()
                    }, this.scroll2Top = function() {
                        jQuery(o).on("click", (function(e) {
                            return e.preventDefault(), jQuery("html, body").animate({
                                scrollTop: 0
                            }, "slow"), !1
                        })), jQuery(window).on("scroll", (function() {
                            jQuery(window).scrollTop() > 100 ? jQuery(o).fadeIn() : jQuery(o).fadeOut()
                        }))
                    }, this.achievementsSlider = function() {
                        s.slick({
                            accessibility: !0,
                            focusOnSelect: !0,
                            dots: !1,
                            infinite: !0,
                            autoplay: !0,
                            autoplaySpeed: 800,
                            speed: 800,
                            slidesToShow: 10,
                            slidesToScroll: 3,
                            arrows: !1,
                            responsive: [{
                                breakpoint: 1440,
                                settings: {
                                    slidesToShow: 6,
                                    slidesToScroll: 2
                                }
                            }, {
                                breakpoint: 576,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            }]
                        })
                    }, this.toggleMenuFooter = function() {
                        jQuery(".footer-menu .menu-item-has-children > a").on("click", (function(e) {
                            e.preventDefault(), jQuery(this).parent().find(".sub-menu").slideToggle(500)
                        }))
                    }, this.toggleContactMessageBox = function() {
                        t.on("click", (function() {
                            jQuery(this).find(".contact-message-list").toggleClass("show")
                        }))
                    }, this.addRefForExternalLinks = function() {
                        jQuery("body a").each((function() {
                            var e = jQuery(this).attr("href"),
                                o = jQuery(this).attr("rel");
                            e && !e.includes(location.hostname) && e.startsWith("http") && (o ? o.includes("dofollow") || jQuery(this).attr("rel", o + " nofollow") : jQuery(this).attr("rel", "nofollow"))
                        }))
                    }
                }).init(), (new function() {
                    var e = this,
                        o = jQuery(".map_retained_clients"),
                        t = jQuery(".case-studies-slider"),
                        s = jQuery(".celebrated-collaborations-slider"),
                        i = jQuery(".banner-section"),
                        r = i.length > 0 ? i.offset().top : 0,
                        n = jQuery("*[scroll-trigger]");
                    this.init = function() {
                        e.addDraw(), e.caseStudiesSlider(), e.celebratedCollaborationsSlider(), e.toggleStickyTableOfContent(), e.tableOfContentTrigger(), e.logoFeaturesSlider()
                    }, this.addDraw = function() {
                        jQuery(document).on("scroll", (function() {
                            var e = jQuery(window).scrollTop();
                            o.length > 0 && (e > o.offset().top - 500 && (jQuery(".box").addClass("draw"), setTimeout((function() {
                                jQuery(".cCanada").css("display", "block")
                            }), 1700), setTimeout((function() {
                                jQuery(".cFrance").css("display", "block")
                            }), 990), setTimeout((function() {
                                jQuery(".cNorway").css("display", "block")
                            }), 1100), setTimeout((function() {
                                jQuery(".cHK").css("display", "block")
                            }), 200), setTimeout((function() {
                                jQuery(".cAu").css("display", "block")
                            }), 500)), document.getElementById("start").beginElement())
                        }))
                    }, this.caseStudiesSlider = function() {
                        t.slick({
                            dots: !1,
                            infinite: !1,
                            autoplay: !0,
                            autoplaySpeed: 2500,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            arrows: !0,
                            prevArrow: '<div class="slick-arrow slick-prev arrow-slide-white"></div>',
                            nextArrow: '<div class="slick-arrow slick-next arrow-slide-white"></div>',
                            responsive: [{
                                breakpoint: 1025,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }]
                        })
                    }, this.toggleStickyTableOfContent = function() {
                        jQuery(window).on("scroll", (function(e) {
                            var o = jQuery(this).scrollTop();
                            o > r ? jQuery(".table-of-section").addClass("sticky") : jQuery(".table-of-section").removeClass("sticky"), r = o
                        }))
                    }, this.tableOfContentTrigger = function() {
                        n.on("click", (function(e) {
                            e.preventDefault();
                            var o = jQuery(this).attr("scroll-trigger"),
                                t = jQuery("*[scroll-target=" + o + "]");
                            return n.removeClass("active"), jQuery(this).addClass("active"), jQuery("html, body").stop().animate({
                                scrollTop: t.offset().top - 0
                            }, 600), !1
                        })), jQuery(window).on("scroll", (function() {
                            var e = jQuery(window).scrollTop();
                            n.each((function() {
                                var o = jQuery(this).attr("scroll-trigger"),
                                    t = jQuery("*[scroll-target=" + o + "]");
                                t.offset().top <= e + jQuery(window).height() / 2 && t.offset().top + t.outerHeight() > e + jQuery(window).height() / 2 && (n.removeClass("active"), jQuery(this).addClass("active"))
                            }))
                        }))
                    }, this.logoFeaturesSlider = function() {
                        jQuery(".logo-features-lists .item").length > 3 && jQuery(".logo-features-lists").slick({
                            accessibility: !0,
                            focusOnSelect: !1,
                            speed: 2500,
                            autoplay: !0,
                            autoplaySpeed: 0,
                            centerMode: !0,
                            cssEase: "linear",
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: !0,
                            infinite: !0,
                            initialSlide: 1,
                            arrows: !1,
                            buttons: !1,
                            responsive: [{
                                breakpoint: 768,
                                settings: {
                                    speed: 1500
                                }
                            }]
                        })
                    }, this.celebratedCollaborationsSlider = function() {
                        s.slick({
                            speed: 3e3,
                            autoplay: !0,
                            autoplaySpeed: 0,
                            centerMode: !0,
                            cssEase: "linear",
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: !0,
                            infinite: !0,
                            initialSlide: 1,
                            arrows: !1,
                            buttons: !1
                        })
                    }
                }).init(), (new function() {
                    var e = jQuery(".open-desc"),
                        o = jQuery(".success-stories-box"),
                        t = jQuery(".partners-gallery-box"),
                        s = jQuery(".our-insight-box"),
                        i = jQuery(".testimonials-slider"),
                        r = jQuery(".expand-arrow"),
                        n = jQuery(".tech-stack-tab-box__item"),
                        l = jQuery(".models-tab-box__item");
                    this.init = function() {
                        a(), c(), u()
                    };
                    var a = function() {
                            e.on("click", (function() {
                                var o = jQuery(this),
                                    t = o.parent(),
                                    s = o.next();
                                e.not(o).parent().removeClass("active"), e.not(o).next().slideUp(), s.slideToggle(), t.toggleClass("active")
                            }))
                        },
                        c = function() {
                            window.matchMedia("(max-width: 768px)").matches && o.length && o.slick({
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                autoplay: !0,
                                autoplaySpeed: 3e3,
                                dots: !1,
                                responsive: [{
                                    breakpoint: 1025,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                }, {
                                    breakpoint: 768,
                                    settings: {
                                        arrows: !0,
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        prevArrow: "<div class='arrow-left'><img src='/wp-content/themes/sts/assets/images/global-icon/carousel-arrow-left.png'/> </div>",
                                        nextArrow: "<div class='arrow-right'><img src='/wp-content/themes/sts/assets/images/global-icon/carousel-arrow-right.png'/> </div>"
                                    }
                                }]
                            }), t.length && t.slick({
                                slidesToShow: 6,
                                slidesToScroll: 6,
                                autoplay: !1,
                                dots: !1,
                                arrows: !1,
                                responsive: [{
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                }]
                            }), s.length && s.slick({
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                autoplay: !1,
                                dots: !1,
                                arrows: !0,
                                variableWidth: !0,
                                prevArrow: "<div class='arrow-left'><img src='/wp-content/themes/sts/assets/images/global-icon/carousel-arrow-left.png'/> </div>",
                                nextArrow: "<div class='arrow-right'><img src='/wp-content/themes/sts/assets/images/global-icon/carousel-arrow-right.png'/> </div>",
                                responsive: [{
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                }]
                            }), i.length && i.slick({
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: !0,
                                fade: !0,
                                fadeSpeed: 1e3,
                                dots: !0,
                                arrows: !1
                            })
                        },
                        u = function() {
                            r.on("click", (function() {
                                var e = jQuery(this).siblings(".cutting_edge-box--item-content");
                                e.toggleClass("expanded"), jQuery(this).css("transform", e.hasClass("expanded") ? "rotate(180deg)" : "rotate(0deg)")
                            })), n.on("click", (function() {
                                n.removeClass("active");
                                var e = jQuery(this).attr("data-id");
                                jQuery(this).addClass("active"), jQuery(".tech-stack-box__item").removeClass("active").filter("[data-id=".concat(e, "]")).addClass("active")
                            })), l.on("click", (function() {
                                l.removeClass("active");
                                var e = jQuery(this).attr("data-id");
                                jQuery(this).addClass("active"), jQuery(".models-box__item").removeClass("active").filter("[data-id=".concat(e, "]")).addClass("active")
                            }))
                        }
                }).init()
            },
            160: () => {},
            408: () => {},
            768: () => {},
            152: () => {},
            848: () => {},
            104: () => {},
            296: () => {},
            820: () => {},
            712: () => {},
            412: () => {},
            204: () => {},
            368: () => {},
            772: () => {},
            390: () => {},
            600: () => {},
            931: () => {},
            544: () => {},
            16: () => {},
            392: () => {}
        },
        t = {};

    function s(e) {
        var i = t[e];
        if (void 0 !== i) return i.exports;
        var r = t[e] = {
            exports: {}
        };
        return o[e](r, r.exports, s), r.exports
    }
    s.m = o, e = [], s.O = (o, t, i, r) => {
        if (!t) {
            var n = 1 / 0;
            for (u = 0; u < e.length; u++) {
                for (var [t, i, r] = e[u], l = !0, a = 0; a < t.length; a++)(!1 & r || n >= r) && Object.keys(s.O).every((e => s.O[e](t[a]))) ? t.splice(a--, 1) : (l = !1, r < n && (n = r));
                if (l) {
                    e.splice(u--, 1);
                    var c = i();
                    void 0 !== c && (o = c)
                }
            }
            return o
        }
        r = r || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > r; u--) e[u] = e[u - 1];
        e[u] = [t, i, r]
    }, s.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o), (() => {
        var e = {
            660: 0,
            272: 0,
            176: 0,
            420: 0,
            312: 0,
            364: 0,
            448: 0,
            200: 0,
            948: 0,
            4: 0,
            40: 0,
            732: 0,
            132: 0,
            512: 0,
            196: 0,
            360: 0,
            180: 0,
            852: 0,
            83: 0,
            792: 0
        };
        s.O.j = o => 0 === e[o];
        var o = (o, t) => {
                var i, r, [n, l, a] = t,
                    c = 0;
                if (n.some((o => 0 !== e[o]))) {
                    for (i in l) s.o(l, i) && (s.m[i] = l[i]);
                    if (a) var u = a(s)
                }
                for (o && o(t); c < n.length; c++) r = n[c], s.o(e, r) && e[r] && e[r][0](), e[r] = 0;
                return s.O(u)
            },
            t = self.webpackChunk = self.webpackChunk || [];
        t.forEach(o.bind(null, 0)), t.push = o.bind(null, t.push.bind(t))
    })(), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(548))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(600))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(931))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(544))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(16))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(392))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(160))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(408))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(768))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(152))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(848))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(104))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(296))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(820))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(712))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(412))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(204))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(368))), s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(772)));
    var i = s.O(void 0, [272, 176, 420, 312, 364, 448, 200, 948, 4, 40, 732, 132, 512, 196, 360, 180, 852, 83, 792], (() => s(390)));
    i = s.O(i)
})();
//# sourceMappingURL=app.js.map