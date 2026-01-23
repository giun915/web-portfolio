document.addEventListener("DOMContentLoaded", function () {

    $('#fullpage').fullpage({
        anchors: ['intro', 'about', 'skills', 'project', 'contact'],
        menu: "#header .gnb_wrap",
        navigation: true,
        normalScrollElements: '.has_scroll:not(.no_slide)',
        recordHistory: true,
        lockAnchors: false,
        autoScrolling: true,
        afterRender: function () {
            const $nav = $('#fp-nav');
            const $p = $('#footer p');

            if ($nav.length && $p.length) {
                $p.after($nav);
            }
        },

        onLeave: function (index) {
            $('#header .gnb_wrap .gnb').removeClass('on');
        },

        afterLoad: function (origin, index, direction) {
        }
    });

});