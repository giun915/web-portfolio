<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper'
import { Mousewheel, Pagination } from 'swiper/modules'

import { bindHorizontalWheelControl } from '@/utils/swiper/wheelControl'
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

const fullPage = ref<Swiper | null>(null)
const activeSectionIndex = ref(0)

const goToSlide = (id: number) => {
  fullPage.value?.slideTo(id)
}

const sectionEls = ref<HTMLElement[]>([])
const anchors = ref<string[]>([])

let fullPageSwiper: Swiper
let skillSwiper: Swiper
let projectSwiper: Swiper

onMounted(() => {
  fullPageSwiper = new Swiper('.pullPageSlide', {
    direction: 'vertical',
    nested: true,
    resistanceRatio: 0,

    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },

    touchStartPreventDefault: false,

    on: {
      async init(swiper) {
        // DOM 안정화 (Footer ref / pagination 생성 보장)
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

        if (initIndex !== -1) {
          swiper.slideTo(initIndex, 0)
        }

        // ✅ 상태 강제 동기화
        swiper.emit('slideChange')
      },

      slideChange(swiper) {
        // header / 메뉴 activeIndex 동기화
        activeSectionIndex.value = swiper.activeIndex

        const anchor = anchors.value[swiper.activeIndex]
        if (anchor) history.replaceState(null, '', `#${anchor}`)
      },
    },
  })

  fullPage.value = fullPageSwiper

  skillSwiper = new Swiper('.skillSlide', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 32,
    nested: true,
    mousewheel: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  projectSwiper = new Swiper('.projectSlide', {
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

  bindHorizontalWheelControl({
    fullPage: fullPageSwiper,
    swiper: skillSwiper,
    selector: '.skillSlide',
    includeChildren: true,
  })

  bindHorizontalWheelControl({
    fullPage: fullPageSwiper,
    swiper: projectSwiper,
    selector: '.projectSlide',
    includeChildren: true,
  })
})

const activeProjectIndex = ref<number | null>(null)

const openProject = (index: number) => {
  activeProjectIndex.value = index
}

const closeProject = () => {
  activeProjectIndex.value = null
}
</script>

<template>
  <GlobalHeader :activeIndex="activeSectionIndex" :goToSlide="goToSlide" />

  <main id="pullPageSlide" class="swiper pullPageSlide">
    <div class="swiper-wrapper">
      <IntroView :active="activeSectionIndex === 0" />
      <AboutView />
      <SkillsView />
      <ProjectView @open-project="openProject" />
      <ContactView />
    </div>
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
