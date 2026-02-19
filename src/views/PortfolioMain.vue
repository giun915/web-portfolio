<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import Swiper from 'swiper'
import { Mousewheel, Pagination } from 'swiper/modules'

import {
  bindHorizontalWheelControl,
  bindHorizontalWheelControlScroll,
  bindInnerScrollLock,
} from '@/utils/swiper/wheelControl'
import { projectDetailList } from '@/constants/project/projectDetailData'

import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'

import IntroView from './IntroView.vue'
import AboutView from './AboutView.vue'
import SkillsView from './SkillsView.vue'
import ProjectView from './ProjectView.vue'
import ContactView from './ContactView.vue'
import ProjectDetailPopup from '@/components/project/ProjectDetailPopup.vue'

Swiper.use([Mousewheel, Pagination])

/* =========================================================================
 * Core State
 * -------------------------------------------------------------------------
 * - 현재 활성 섹션 및 섹션 DOM 참조
 * - 네비게이션/해시 동기화를 위한 index 관리
 * - 프로젝트 모달 상태 관리
 * ========================================================================= */
const fullPage = ref<Swiper | null>(null)
const activeSectionIndex = ref(0)

const sectionEls = ref<HTMLElement[]>([])
const anchors = ref<string[]>([])

const activeProjectIndex = ref<number | null>(null)
const openProject = (index: number) => (activeProjectIndex.value = index)
const closeProject = () => (activeProjectIndex.value = null)

/* =========================================================================
 * Responsive Policy (Fullpage ↔ Scroll Mode)
 * -------------------------------------------------------------------------
 * - 화면 크기/입력 방식에 따라 레이아웃 모드 전환
 * - PC에서도 높이가 부족하면 scroll mode로 강제 전환
 * ========================================================================= */
const useScrollMode = ref(false)

const mqLandscape = window.matchMedia('(orientation: landscape)')
const mqMax1200 = window.matchMedia('(max-width: 1200px)')
const mqNoHover = window.matchMedia('(any-hover: none)')
const mqCoarse = window.matchMedia('(any-pointer: coarse)')

const PC_MIN_HEIGHT_FOR_FULLPAGE = 850

const isTouchLike = () =>
  (navigator.maxTouchPoints || 0) > 0 || mqNoHover.matches || mqCoarse.matches

const computeScrollMode = () => {
  const touchLike = isTouchLike()

  if (!touchLike && window.innerHeight < PC_MIN_HEIGHT_FOR_FULLPAGE) return true

  if (mqMax1200.matches) return true
  if (!touchLike) return false
  return mqLandscape.matches
}

// resize/matchMedia 연속 호출 방지를 위한 RAF throttle
let syncRaf: number | null = null
const syncUseScrollMode = () => {
  if (syncRaf) cancelAnimationFrame(syncRaf)
  syncRaf = requestAnimationFrame(() => {
    syncRaf = null
    const next = computeScrollMode()
    if (next === useScrollMode.value) return
    useScrollMode.value = next
  })
}

/* =========================================================================
 * Scroll Mode: IntersectionObserver 기반 Active 관리
 * -------------------------------------------------------------------------
 * - 일정 비율 이상 보이는 섹션에 active 클래스 적용
 * - 가장 많이 보이는 섹션 기준으로 네비/해시 동기화
 * ========================================================================= */
let scrollObserver: IntersectionObserver | null = null
const ratioMap = new Map<Element, number>()

const clearActiveClass = (els: HTMLElement[]) => {
  els.forEach((el) => el.classList.remove('swiper-slide-active'))
}

const ACTIVE_RATIO = 0.3

const setScrollActiveByVisibility = (entries: IntersectionObserverEntry[]) => {
  const els = sectionEls.value
  if (!els.length) return

  for (const entry of entries) {
    const el = entry.target as HTMLElement
    const ratio = entry.intersectionRatio

    if (ratio >= ACTIVE_RATIO) el.classList.add('swiper-slide-active')
    else el.classList.remove('swiper-slide-active')

    ratioMap.set(el, ratio)
  }

  // 네비 동기화는 가장 많이 보이는 섹션 기준
  let bestEl: HTMLElement | null = null
  let bestRatio = 0

  for (const [el, ratio] of ratioMap.entries()) {
    if (ratio > bestRatio) {
      bestRatio = ratio
      bestEl = el as HTMLElement
    }
  }

  if (bestEl) {
    const idx = els.indexOf(bestEl)
    if (idx !== -1) activeSectionIndex.value = idx

    const anchor = bestEl.dataset.anchor
    if (anchor) history.replaceState(null, '', `#${anchor}`)
  }
}

// 초기 진입 시 active 보장 (observer 콜백 지연 대비)
const setInitialScrollActive = (target: HTMLElement) => {
  const els = sectionEls.value
  if (!els.length) return

  clearActiveClass(els)
  target.classList.add('swiper-slide-active')

  ratioMap.set(target, 1)

  const idx = els.indexOf(target)
  if (idx !== -1) activeSectionIndex.value = idx

  const anchor = target.dataset.anchor
  if (anchor) history.replaceState(null, '', `#${anchor}`)
}

const destroyScrollObserver = () => {
  scrollObserver?.disconnect()
  scrollObserver = null
  ratioMap.clear()
}

/**
 * Scroll Mode 초기화
 * - 해시 기반 진입 처리
 * - intro(0)는 기본 위치이므로 scrollIntoView 호출하지 않음
 */
const initScrollObserver = async () => {
  const initialHash = window.location.hash
  if (initialHash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  await nextTick()

  const els = Array.from(document.querySelectorAll<HTMLElement>('.scrollPage .section_slide'))

  sectionEls.value = els
  anchors.value = els.map((el) => el.dataset.anchor || '')

  ratioMap.clear()
  clearActiveClass(els)

  scrollObserver?.disconnect()
  scrollObserver = new IntersectionObserver(
    (entries) => {
      setScrollActiveByVisibility(entries)
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
    },
  )

  els.forEach((el) => scrollObserver?.observe(el))

  const jumpTo = (target: HTMLElement, hashToRestore?: string) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        setInitialScrollActive(target)
        if (hashToRestore) history.replaceState(null, '', hashToRestore)
      })
    })
  }

  const hash = initialHash.replace('#', '')
  const idx = anchors.value.indexOf(hash)

  if (idx > 0 && els[idx]) {
    jumpTo(els[idx], initialHash || undefined)
  } else {
    if (els[0]) {
      setInitialScrollActive(els[0])
      if (initialHash) history.replaceState(null, '', initialHash)
    }
  }
}

/* =========================================================================
 * Swiper Instances (Fullpage + Horizontal)
 * -------------------------------------------------------------------------
 * - fullpage: 세로 스와이프 기반 섹션 이동
 * - skill/project: 가로 슬라이드
 * ========================================================================= */
let fullPageSwiper: Swiper | null = null
let skillSwiper: Swiper | null = null
let projectSwiper: Swiper | null = null

// fullpage 초기화
const initFullpageSwiper = async () => {
  if (fullPageSwiper) return

  await nextTick()

  fullPageSwiper = new Swiper('.pullPageSlide', {
    direction: 'vertical',
    nested: true,
    resistanceRatio: 0,
    touchStartPreventDefault: false,
    mousewheel: { forceToAxis: true, releaseOnEdges: true },

    on: {
      async init(swiper) {
        await nextTick()

        const slides = Array.from(
          document.querySelectorAll<HTMLElement>(
            '.pullPageSlide > .swiper-wrapper > .swiper-slide',
          ),
        )

        sectionEls.value = slides
        anchors.value = slides.map((el) => el.dataset.anchor || '')

        const hash = window.location.hash.replace('#', '')
        const initIndex = anchors.value.indexOf(hash)
        if (initIndex !== -1) swiper.slideTo(initIndex, 0)

        swiper.emit('slideChange')
      },

      slideChange(swiper) {
        activeSectionIndex.value = swiper.activeIndex
        const anchor = anchors.value[swiper.activeIndex]
        if (anchor) history.replaceState(null, '', `#${anchor}`)
      },
    },
  })

  fullPage.value = fullPageSwiper

  bindWheelControlsForMode()
}

// horizontal swipers 초기화
const initHorizontalSwipers = async () => {
  await nextTick()

  clearScrollWheelControls()
  clearFullpageWheelControls()

  skillSwiper?.destroy(true, true)
  projectSwiper?.destroy(true, true)

  skillSwiper = null
  projectSwiper = null

  if (document.querySelector('.skillSlide')) {
    skillSwiper = new Swiper('.skillSlide', {
      direction: 'horizontal',
      spaceBetween: 32,
      nested: true,

      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 0.8,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      /* 반응형 설정 */
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        769: {
          slidesPerView: 2,
        },
        1201: {
          slidesPerView: 3,
        },
      },
    })
  }

  if (document.querySelector('.projectSlide')) {
    projectSwiper = new Swiper('.projectSlide', {
      direction: 'horizontal',
      spaceBetween: 32,
      nested: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 0.8,
      },
      /* 반응형 설정 */
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        769: {
          slidesPerView: 2,
        },
        1201: {
          slidesPerView: 3,
        },
      },
      updateOnWindowResize: true,
    })
  }

  skillSwiper?.update()
  projectSwiper?.update()

  bindWheelControlsForMode()
}

/* =========================================================================
 * Wheel Binding (Mode-aware)
 * -------------------------------------------------------------------------
 * - scroll mode: 가로 swiper가 휠 소비
 * - fullpage mode: 내부 스크롤 잠금 + 가로 swiper와 페이지 이동 충돌 방지
 * ========================================================================= */
let cleanupWheelControls: Array<() => void> = []
let cleanupScrollWheelControls: Array<() => void> = []
let cleanupInnerScroll: (() => void) | null = null

const clearScrollWheelControls = () => {
  cleanupScrollWheelControls.forEach((fn) => fn())
  cleanupScrollWheelControls = []
}

const clearFullpageWheelControls = () => {
  cleanupWheelControls.forEach((fn) => fn())
  cleanupWheelControls = []
}

const destroyFullpageSwiper = () => {
  // fullpage 모드용 wheel 바인딩부터 해제
  clearFullpageWheelControls()

  if (!fullPageSwiper) return
  fullPageSwiper.destroy(true, true)
  fullPageSwiper = null
  fullPage.value = null
}

const bindWheelControlsForMode = () => {
  cleanupInnerScroll?.()
  cleanupInnerScroll = null

  clearFullpageWheelControls()
  clearScrollWheelControls()

  if (!useScrollMode.value) {
    cleanupInnerScroll = bindInnerScrollLock()
  }

  if (useScrollMode.value) {
    if (skillSwiper) {
      cleanupScrollWheelControls.push(
        bindHorizontalWheelControlScroll({
          swiper: skillSwiper,
          selector: '.skillSlide',
          includeChildren: true,
        }),
      )
    }

    if (projectSwiper) {
      cleanupScrollWheelControls.push(
        bindHorizontalWheelControlScroll({
          swiper: projectSwiper,
          selector: '.projectSlide',
          includeChildren: true,
        }),
      )
    }

    return
  }

  if (fullPageSwiper && skillSwiper) {
    cleanupWheelControls.push(
      bindHorizontalWheelControl({
        fullPage: fullPageSwiper,
        swiper: skillSwiper,
        selector: '.skillSlide',
        includeChildren: true,
      }),
    )
  }

  if (fullPageSwiper && projectSwiper) {
    cleanupWheelControls.push(
      bindHorizontalWheelControl({
        fullPage: fullPageSwiper,
        swiper: projectSwiper,
        selector: '.projectSlide',
        includeChildren: true,
      }),
    )
  }
}

/* =========================================================================
 * Navigation API
 * -------------------------------------------------------------------------
 * - 외부(GNB/Footer)에서 섹션 이동 시 사용하는 공개 함수
 * - 현재 모드에 따라 fullpage 또는 scroll 방식으로 분기 처리
 * ========================================================================= */
const goToSlide = (id: number) => {
  if (fullPage.value) {
    fullPage.value.slideTo(id)
    return
  }
  sectionEls.value[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* =========================================================================
 * Mode Switching & Lifecycle
 * ========================================================================= */
let switching = false
watch(useScrollMode, async (isScroll) => {
  if (switching) return
  switching = true

  try {
    await nextTick()

    if (isScroll) {
      destroyFullpageSwiper()
      destroyScrollObserver()

      await initHorizontalSwipers()
      bindWheelControlsForMode()

      await initScrollObserver()
      return
    }

    destroyScrollObserver()
    destroyFullpageSwiper()

    await initHorizontalSwipers()
    await initFullpageSwiper()

    bindWheelControlsForMode()
  } finally {
    switching = false
  }
})

onMounted(async () => {
  await nextTick()

  syncUseScrollMode()
  await initHorizontalSwipers()

  if (useScrollMode.value) {
    await initScrollObserver()
    bindWheelControlsForMode()
  } else {
    await initFullpageSwiper()
  }

  mqLandscape.addEventListener('change', syncUseScrollMode)
  mqMax1200.addEventListener('change', syncUseScrollMode)
  window.addEventListener('resize', syncUseScrollMode)
})

onBeforeUnmount(() => {
  mqLandscape.removeEventListener('change', syncUseScrollMode)
  mqMax1200.removeEventListener('change', syncUseScrollMode)
  window.removeEventListener('resize', syncUseScrollMode)

  if (syncRaf) cancelAnimationFrame(syncRaf)
  syncRaf = null

  cleanupInnerScroll?.()
  cleanupInnerScroll = null

  destroyScrollObserver()
  destroyFullpageSwiper()

  clearScrollWheelControls()
  clearFullpageWheelControls()

  skillSwiper?.destroy(true, true)
  projectSwiper?.destroy(true, true)

  skillSwiper = null
  projectSwiper = null
})
</script>

<template>
  <GlobalHeader :activeIndex="activeSectionIndex" :goToSlide="goToSlide" />

  <main v-if="!useScrollMode" id="pullPageSlide" class="swiper pullPageSlide commonPage">
    <div class="swiper-wrapper">
      <IntroView :active="activeSectionIndex === 0" :goToSlide="goToSlide" :anchors="anchors" />
      <AboutView />
      <SkillsView />
      <ProjectView @open-project="openProject" />
      <ContactView />
    </div>
  </main>
  <main v-else class="commonPage scrollPage">
    <IntroView :active="activeSectionIndex === 0" :goToSlide="goToSlide" :anchors="anchors" />
    <AboutView />
    <SkillsView />
    <ProjectView @open-project="openProject" />
    <ContactView />
  </main>

  <GlobalFooter :activeIndex="activeSectionIndex" :goToSlide="goToSlide" />

  <transition name="portfolio-detail">
    <ProjectDetailPopup
      v-if="activeProjectIndex !== null"
      :projects="projectDetailList"
      :current-index="activeProjectIndex"
      @update:index="activeProjectIndex = $event"
      @close="closeProject"
    />
  </transition>
</template>

<style scoped></style>
