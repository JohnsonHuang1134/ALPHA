$(".yu_language").on("click", function() {
    $(".yu_language_div").slideToggle();
})


$(function() {
    var bb = 0;
    $(".app_icon_on").on("click", function() {
        bb++;
        if (bb % 2 != 0) {
            $(".app_icon_on").addClass("iconguanbi");
            $(".app_icon_on").removeClass("iconfenlei");
        } else {
            $(".app_icon_on").addClass("iconfenlei");
            $(".app_icon_on").removeClass("iconguanbi");
        }
        $(".app_nav").slideToggle();
    })
});