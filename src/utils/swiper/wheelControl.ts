import type Swiper from 'swiper'

type HorizontalWheelControlOptions = {
  fullPage?: Swiper
  swiper: Swiper
  selector: string
  includeChildren?: boolean
}

/* ------------------------------ DOM Target Helpers ------------------------------ */
/**
 * wheel/mouseenter/mouseleave를 바인딩할 타겟 엘리먼트 수집.
 * includeChildren=true면 wrapper/slide까지 같이 잡아서
 * "휠 이벤트가 자식에서 잡혀버리는" 케이스를 완화한다.
 */
function getBindTargets(selector: string, includeChildren: boolean): HTMLElement[] {
  if (includeChildren) {
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        `${selector},
         ${selector} .swiper-wrapper,
         ${selector} .swiper-slide`,
      ),
    )
  }

  const root = document.querySelector<HTMLElement>(selector)
  return root ? [root] : []
}

/* --------------------------- Horizontal Wheel Controller -------------------------- */
/**
 * 내부(가로) 스와이퍼 영역에서 휠을 가로 이동으로 사용하고,
 * 내부가 끝/처음일 때는 "두 번 연속 입력"일 경우에만 바깥(fullPage)으로 넘긴다.
 *
 * 포인트
 * - 내부 hover 중에는 fullPage.mousewheel을 disable해서 중복 스크롤을 막는다.
 * - edge lock(두 번 입력)으로 "끝에서 살짝 스크롤했을 때 바깥으로 튀는" UX를 방지한다.
 *
 * 반환값은 cleanup 함수(언마운트/뷰 전환 시 반드시 호출).
 */
export function bindHorizontalWheelControl({
  fullPage,
  swiper,
  selector,
  includeChildren = false,
}: HorizontalWheelControlOptions) {
  if (!fullPage || !swiper) return () => {}

  const targets = getBindTargets(selector, includeChildren)
  if (!targets.length) return () => {}

  const handleEnter: EventListener = () => fullPage.mousewheel.disable()
  const handleLeave: EventListener = () => fullPage.mousewheel.enable()

  const handleWheel = (() => {
    // "끝/처음에서 바깥으로 넘길지" 방향 잠금 (연속 입력 확인용)
    let lockedDir: 1 | -1 | 0 = 0

    return (e: Event) => {
      if (!(e instanceof WheelEvent)) return

      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1
      const canMoveInner = (dir === 1 && !swiper.isEnd) || (dir === -1 && !swiper.isBeginning)

      // 내부에서 이동 가능하면 내부만 컨트롤
      if (canMoveInner) {
        lockedDir = 0
        e.preventDefault()
        e.stopPropagation()

        if (dir === 1) swiper.slideNext()
        else swiper.slidePrev()
        return
      }

      // 내부가 끝/처음이면 첫 입력은 잠금만 걸고 소비
      if (lockedDir !== dir) {
        lockedDir = dir
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // 같은 방향이 연속으로 들어왔을 때만 바깥으로 넘김
      lockedDir = 0
      e.preventDefault()
      e.stopPropagation()

      if (dir === 1) fullPage.slideNext()
      else fullPage.slidePrev()
    }
  })()

  targets.forEach((el) => {
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    el.addEventListener('wheel', handleWheel, { passive: false })
  })

  return () => {
    targets.forEach((el) => {
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
      el.removeEventListener('wheel', handleWheel)
    })
  }
}

/* ------------------------ Horizontal Wheel (Scroll Mode) ------------------------- */
/**
 * "바깥 fullPage와 분리된" 단순 가로 휠 제어 버전.
 * - 내부가 이동 가능한 경우에만 preventDefault/stopPropagation 처리
 * - destroyed 상태는 조용히 무시
 */
export function bindHorizontalWheelControlScroll({
  swiper,
  selector,
  includeChildren = false,
}: {
  swiper: Swiper
  selector: string
  includeChildren?: boolean
}) {
  const targets = getBindTargets(selector, includeChildren)
  if (!targets.length) return () => {}

  const handleWheel = (e: WheelEvent): void => {
    if (swiper.destroyed) return

    // 상태 갱신(특히 isEnd/isBeginning이 DOM 변경에 민감한 케이스 보정)
    swiper.update()

    const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1
    const canMoveInner = (dir === 1 && !swiper.isEnd) || (dir === -1 && !swiper.isBeginning)

    if (!canMoveInner) return

    e.preventDefault()
    e.stopPropagation()

    if (dir === 1) swiper.slideNext()
    else swiper.slidePrev()
  }

  targets.forEach((el) => {
    el.addEventListener('wheel', handleWheel, { passive: false })
  })

  return () => {
    targets.forEach((el) => el.removeEventListener('wheel', handleWheel))
  }
}

/* ------------------------------ Inner Scroll Lock ------------------------------ */
/**
 * 스크롤 가능한 내부 컨테이너(.has_scroll)에서
 * 스크롤이 "아직 내부에서 남아있으면" 이벤트 전파를 막아 바깥 스크롤/스와이프를 방지한다.
 *
 * - 내부가 최상단/최하단에 도달했을 때는 전파를 허용해서 바깥 이동이 가능해진다.
 * - EPS는 경계 판정 튐 방지용(모바일/서브픽셀 환경에서 유용)
 */
export function bindInnerScrollLock() {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('.has_scroll'))
  if (!targets.length) return () => {}

  const EPS = 2

  const handleWheel = (e: WheelEvent): void => {
    const el = e.currentTarget as HTMLElement

    const maxScrollTop = el.scrollHeight - el.clientHeight
    if (maxScrollTop <= 0) return

    const scrollTop = el.scrollTop
    const atTop = scrollTop <= EPS
    const atBottom = scrollTop >= maxScrollTop - EPS

    const goingDown = e.deltaY > 0
    const goingUp = e.deltaY < 0

    // 내부에서 더 스크롤 가능한 경우엔 바깥으로 이벤트가 새지 않게 차단
    if ((goingDown && !atBottom) || (goingUp && !atTop)) {
      e.stopPropagation()
    }
  }

  targets.forEach((el) => {
    el.addEventListener('wheel', handleWheel, { passive: false })
  })

  return () => {
    targets.forEach((el) => el.removeEventListener('wheel', handleWheel))
  }
}
