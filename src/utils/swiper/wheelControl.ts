// src/utils/swiper/wheelControl.ts
import type Swiper from 'swiper'

type HorizontalWheelControlOptions = {
  fullPage?: Swiper
  swiper: Swiper
  selector: string
  includeChildren?: boolean
}

export function bindHorizontalWheelControl({
  fullPage,
  swiper,
  selector,
  includeChildren = false,
}: HorizontalWheelControlOptions) {
  if (!fullPage || !swiper) return

  let elements: HTMLElement[] = []

  if (includeChildren) {
    elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        `${selector},
         ${selector} .swiper-wrapper,
         ${selector} .swiper-slide`,
      ),
    )
  } else {
    const el = document.querySelector<HTMLElement>(selector)
    if (el) elements = [el]
  }

  if (!elements.length) return

  elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      fullPage.mousewheel.disable()
    })

    el.addEventListener('mouseleave', () => {
      fullPage.mousewheel.enable()
    })

    el.addEventListener(
      'wheel',
      (e) => {
        if (!(e instanceof WheelEvent)) return

        e.preventDefault()
        e.stopPropagation()

        if (e.deltaY > 0) {
          if (!swiper.isEnd) swiper.slideNext()
          else fullPage.mousewheel.enable()
        } else {
          if (!swiper.isBeginning) swiper.slidePrev()
          else fullPage.mousewheel.enable()
        }
      },
      { passive: false },
    )
  })
}

/* ==============================
 * 내부 스크롤 보호
 * ============================== */
export function bindInnerScrollLock() {
  document.querySelectorAll<HTMLElement>('.has_scroll').forEach((el) => {
    el.addEventListener(
      'wheel',
      (e) => {
        if (!(e instanceof WheelEvent)) return

        // 무조건 상위 전파 차단 (수평/수직 swiper 차단)
        e.stopPropagation()
      },
      { passive: false },
    )
  })
}
