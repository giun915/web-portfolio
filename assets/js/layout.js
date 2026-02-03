document.addEventListener('DOMContentLoaded', () => {
  let skillInitDone = false

  /* ==============================
   * Swiper 초기화
   * ============================== */
  const swipers = initSwipers()

  /* 수평 휠 제어 바인딩 */
  bindHorizontalWheelControl({
    pullPage: swipers.pullPage,
    swiper: swipers.skill,
    selector: '.skillSlide',
  })

  bindHorizontalWheelControl({
    pullPage: swipers.pullPage,
    swiper: swipers.project,
    selector: '.projectSlide',
    includeChildren: true,
  })

  /* ==============================
   * 최초 진입 상태
   * ============================== */
  const startIndex = swipers.pullPage.activeIndex || 0
  activateSection(startIndex)
  updateMenu(startIndex)
  initIntroSection(startIndex)
  initSkillSection(startIndex)

  /* ==============================
   * 슬라이드 변경 이벤트
   * ============================== */
  swipers.pullPage.on('slideChange', function () {
    updateMenu(this.activeIndex)
    activateSection(this.activeIndex)
    initIntroSection(this.activeIndex)
    initSkillSection(this.activeIndex)
  })

  /* ==============================
   * UI 함수
   * ============================== */

  /* ==============================
   * Project 상세 보기
   * ============================== */

  function openProjectDetail(slide) {
    const detail = document.querySelector('.portfolio_detail_area')
    if (!detail) return

    detail.classList.add('on')
  }

  document.addEventListener('click', (e) => {
    const slide = e.target.closest('.projectSlide .swiper-slide')
    if (!slide) return

    e.preventDefault()
    e.stopPropagation()

    openProjectDetail(slide)
  })
})
