(() => {
    "use strict";
    var e = {};
    e.d = (i, t) => {
        for (var o in t) e.o(t, o) && !e.o(i, o) && Object.defineProperty(i, o, {
            enumerable: !0,
            get: t[o]
        })
    }, e.o = (e, i) => Object.prototype.hasOwnProperty.call(e, i), (new function() {
        var e = this,
            i = jQuery(".hero-slider");

        function t(e) {
            e.slick({
                slidesToShow: 1,
                centerMode: !0,
                centerPadding: "15%",
                infinite: !0,
                slidesToScroll: 1,
                autoplay: !0,
                autoplaySpeed: 2500,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        centerMode: !1,
                        arrows: !0,
                        dots: !0
                    }
                }]
            })
        }

        function o(e) {
            e.slick("unslick"), e.html("")
        }
        this.init = function() {
            jQuery(document).ready((function() {
                e.heroBannerSlider(), e.loadVideo(), e.loadVideoFrontpage(), e.ourOfficesHandle()
            }))
        }, this.heroBannerSlider = function() {
            i.slick({
                accessibility: !0,
                focusOnSelect: !0,
                dots: !1,
                infinite: !1,
                autoplay: !0,
                autoplaySpeed: 2500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !0,
                prevArrow: '<div class="slick-arrow slick-prev arrow-slide-white"></div>',
                nextArrow: '<div class="slick-arrow slick-next arrow-slide-white"></div>'
            })
        }, this.loadVideo = function() {
            jQuery("#videoContainer").on("click", (function() {
                var e = jQuery(this),
                    i = e.data("video-url").split("/").pop();
                jQuery("#youtubeVideo").attr("src", "https://www.youtube.com/embed/" + i + "?autoplay=1").show(), e.find("img").hide(), e.find(".play-button").hide()
            }))
        }, this.loadVideoFrontpage = function() {
            jQuery("#videoContainerFrontpage").on("click", (function() {
                var e = jQuery(this),
                    i = e.data("video-id");
                jQuery("#youtubeVideo").attr("src", "https://www.youtube.com/embed/" + i + "?autoplay=1").show(), e.find("img").hide(), e.find(".play-button").hide()
            }))
        }, this.ourOfficesHandle = function() {
            var e = jQuery(".our-office-modal"),
                i = jQuery(".branch-box"),
                a = jQuery(".image-office-slider"),
                r = jQuery(".our-office .item"),
                n = jQuery(".close-modal"),
                c = jQuery(".name-country"),
                d = jQuery(".flag-country"),
                s = jQuery(".offices-gallery");
            r.on("click", (function() {
                var o, r = jQuery(this).data("name"),
                    n = jQuery(this).attr("id");
                c.text(r), d.find(".".concat(n)).show(), i.find('[data-country="'.concat(n, '"]')).show(), i.find('[data-country="'.concat(n, '"]')).first().addClass("active"), o = "vietnam" === n ? s.find('.gallery[data-office="vietnam-0"]').html() : s.find('.gallery[data-office="'.concat(n, '"]')).html(), a.html(o), t(a), e.fadeIn(300)
            })), i.on("click", ".branch-box__item", (function() {
                var e, i = jQuery(this).data("office");
                jQuery(this).hasClass("active") || (jQuery(this).addClass("active").siblings().removeClass("active"), o(a), e = s.find('.gallery[data-office="'.concat(i, '"]')).html(), a.html(e), t(a))
            })), n.on("click", (function() {
                e.fadeOut(300), jQuery("html").css("overflow-y", "auto"), c.text(""), d.find("img").hide(), i.find("[data-country]").hide().removeClass("active"), a.html(""), o(a)
            }))
        }
    }).init()
})();
//# sourceMappingURL=frontpage.js.map