function initSwipers() {
  const skill = new Swiper('.skillSlide', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 32,
    nested: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    /* ⚠️ wheel 직접 제어 */
    mousewheel: false,
    touchStartPreventDefault: false,
  })

  const project = new Swiper('.projectSlide', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 32,
    nested: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    mousewheel: false,
    touchStartPreventDefault: false,
  })

  /* ==============================
   * 슬라이드 index 저장
   * ============================== */
  pullPage.on('slideChange', () => {
    saveSlideIndex(pullPage)
  })

  /* ==============================
   * 새로고침 시 index 복구
   * ============================== */
  restoreSlideIndex(pullPage)

  return {
    pullPage,
    skill,
    project,
  }
}

/* ==============================
 * 현재 슬라이드 index 저장
 * ============================== */
function saveSlideIndex(pullPage) {
  if (!pullPage) return
  localStorage.setItem('pullPageIndex', String(pullPage.activeIndex))
}

/* ==============================
 * 새로고침 후 index 복구
 * ============================== */
function restoreSlideIndex(pullPage) {
  const savedIndex = localStorage.getItem('pullPageIndex')
  if (savedIndex !== null) {
    pullPage.slideTo(Number(savedIndex), 0)
  }
}
