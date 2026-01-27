document.addEventListener('DOMContentLoaded', () => {

    let skillInitDone = false;  

    /* ==============================
    * Swiper 초기화
    * ============================== */
    const swipers = initSwipers();

    /* 수평 휠 제어 바인딩 */
    bindHorizontalWheelControl({
        pullPage: swipers.pullPage,
        swiper: swipers.skill,
        selector: '.skillSlide',
    });

    bindHorizontalWheelControl({
        pullPage: swipers.pullPage,
        swiper: swipers.project,
        selector: '.projectSlide',
        includeChildren: true,
    });

    /* ==============================
    * 최초 진입 상태
    * ============================== */
    const startIndex = swipers.pullPage.activeIndex || 0;
    activateSection(startIndex);
    updateMenu(startIndex);
    initIntroSection(startIndex);
    initSkillSection(startIndex);

    /* ==============================
    * pagination footer 이동
    * ============================== */
    movePaginationToFooter(swipers.pullPage);

    /* ==============================
    * 메뉴 클릭 이동
    * ============================== */
    document.querySelectorAll('#header .gnb_wrap a')
        .forEach((a, index) => {
        a.addEventListener('click', e => {
            e.preventDefault();
            swipers.pullPage.slideTo(index);
        });
    });

    /* ==============================
    * 슬라이드 변경 이벤트
    * ============================== */
    swipers.pullPage.on('slideChange', function () {
        updateMenu(this.activeIndex);
        activateSection(this.activeIndex);
        initIntroSection(this.activeIndex);
        initSkillSection(this.activeIndex);
    });

    /* ==============================
    * UI 함수
    * ============================== */
    function movePaginationToFooter(swiper) {
        const pagination = swiper.pagination.el;
        const target = document.querySelector('#footer .page_inner > p');
        if (pagination && target) {
        target.insertAdjacentElement('afterend', pagination);
        }
    }

    function updateMenu(index) {
        document.querySelectorAll('#header .gnb_wrap .gnb')
        .forEach((li, i) => li.classList.toggle('on', i === index));
    }

    function activateSection(index) {
        document.querySelectorAll('.section_slide')
        .forEach((sec, i) => sec.classList.toggle('on', i === index));
    }

    function initIntroSection(index) {
        const el = document.querySelector(".section_slide_1 .intro_txt_kr");
        if (!el) return;

        if (index !== 0) {
        el.classList.remove('on');
        return;
        }

        const text = el.textContent.trim();
        el.dataset.text = text;
        el.style.setProperty("--steps", text.length);

        setTimeout(() => el.classList.add("on"), 1000);
    }

    function initSkillSection(index) {
        if (index !== 2) return;

        document.querySelectorAll('.skill_level_list').forEach(el => {
            const hasScroll = el.scrollHeight > el.clientHeight;
            el.classList.toggle('has_scroll', hasScroll);
        });

        bindInnerScrollLock();

        animateSkillBars();
    }

    function animateSkillBars() {
        document.querySelectorAll('.skill_level').forEach(item => {
            const percent = item.dataset.skill;
            const bar = item.querySelector('.skill_bar');
            const text = item.querySelector('.per');

            if (!percent || !bar || !text) return;

            bar.style.transition = 'none';
            bar.style.width = '0%';
            text.textContent = '0%';

            bar.offsetHeight;

            requestAnimationFrame(() => {
                bar.style.width = percent + '%';
                text.textContent = percent + '%';
            });
        });
    }

    /* ==============================
    * Project 상세 보기
    * ============================== */

    function openProjectDetail(slide) {
        const detail = document.querySelector('.portfolio_detail_area');
        if (!detail) return;

        detail.classList.add('on');
    }

    document.addEventListener('click', e => {
        const slide = e.target.closest('.projectSlide .swiper-slide');
        if (!slide) return;

        e.preventDefault();
        e.stopPropagation();

        openProjectDetail(slide);
    });

});
