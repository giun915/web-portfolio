/* ==============================
 * 수평 Swiper 휠 제어
 * ============================== */
function bindHorizontalWheelControl({
  pullPage,
  swiper,
  selector,
  includeChildren = false,
}) {
  if (!swiper) return;

  let els = [];

  if (includeChildren) {
    els = document.querySelectorAll(
      `${selector},
       ${selector} .swiper-wrapper,
       ${selector} .swiper-slide`
    );
  } else {
    const el = document.querySelector(selector);
    if (el) els = [el];
  }

  if (!els.length) return;

  els.forEach(el => {
    el.addEventListener('mouseenter', () => {
      pullPage.mousewheel.disable();
    });

    el.addEventListener('mouseleave', () => {
      pullPage.mousewheel.enable();
    });

    el.addEventListener(
      'wheel',
      e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.deltaY > 0) {
          if (!swiper.isEnd) swiper.slideNext();
          else pullPage.mousewheel.enable();
        } else {
          if (!swiper.isBeginning) swiper.slidePrev();
          else pullPage.mousewheel.enable();
        }
      },
      { passive: false }
    );
  });
}

/* ==============================
 * 내부 스크롤 보호
 * ============================== */
function bindInnerScrollLock() {
  document.querySelectorAll('.has_scroll').forEach(el => {
    el.addEventListener('wheel', e => {
      const atTop = el.scrollTop === 0;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight;

      if (
        (e.deltaY < 0 && !atTop) ||
        (e.deltaY > 0 && !atBottom)
      ) {
        e.stopPropagation();
      }
    }, { passive: false });
  });
}
