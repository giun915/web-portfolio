document.addEventListener("DOMContentLoaded", function () {

    $('#fullpage').fullpage({
        anchors: ['intro', 'about', 'skills', 'project', 'contact'],
        menu: "#header .gnb_wrap",
        navigation: true,
        normalScrollElements: '.has_scroll:not(.no_slide), .skill_level_list',
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
            $('.section').removeClass('on');

            if (index === 1) {
                $(".section_1 .intro_txt_kr").removeClass("on");
            }
        },

        afterLoad: function (origin, index, direction) {

            // 1. 공통
            activateSection(index);

            // 2. intro 전용
            initIntroSection(index);
        }
    });
});

// 섹션 별 공통 함수
function activateSection(index) {
    $('#header .gnb_wrap .gnb_' + index).addClass('on');
    $('.section_' + index).addClass('on');
}

// intro 초기화
function initIntroSection(index) {
    if (index !== 1) return;

    setSubIntroText();

    setTimeout(function () {
        $(".section_1 .intro_txt_kr").addClass("on");
    }, 1000);
}


// intro 한글 텍스트 글자 계산
function setSubIntroText(){
    const el = document.querySelector(".section_1 .intro_txt_kr");
    if (!el) return;

    // data-text 속성 자동 설정 (HTML 안 문구 그대로)
    const textContent = el.textContent.trim();
    el.setAttribute("data-text", textContent);

    // 글자 수 계산 후 steps() 값 자동 지정
    const textLength = textContent.length;
    el.style.setProperty("--steps", textLength);
}