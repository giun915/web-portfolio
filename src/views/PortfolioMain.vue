<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper'
import { Mousewheel, Pagination } from 'swiper/modules'

import { bindHorizontalWheelControl } from '@/utils/swiper/wheelControl'

import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'

import IntroView from './intro/IntroView.vue'
import AboutView from './about/AboutView.vue'
import SkillsView from './skills/SkillsView.vue'
import ProjectView from './project/ProjectView.vue'
import ContactView from './ContactView.vue'

Swiper.use([Mousewheel, Pagination])

const fullPage = ref<Swiper | null>(null)
const activeIndex = ref(0)

const goToSlide = (id: number) => {
  fullPage.value?.slideTo(id)
}

const footerRef = ref<InstanceType<typeof GlobalFooter> | null>(null)
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

    pagination: {
      el: '.pullPageSlide > .swiper-pagination',
      clickable: true,
    },

    on: {
      async init(swiper) {
        // DOM 안정화 (Footer ref / pagination 생성 보장)
        await nextTick()

        const target = footerRef.value?.footerPagination
        const paginationEl = swiper.pagination?.el
        if (target && paginationEl) target.appendChild(paginationEl)

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
        activeIndex.value = swiper.activeIndex

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
</script>

<template>
  <GlobalHeader :activeIndex="activeIndex" :goToSlide="goToSlide" />

  <main id="pullPageSlide" class="swiper pullPageSlide">
    <div class="swiper-wrapper">
      <section class="swiper-slide section_slide intro_section" data-anchor="intro">
        <IntroView :active="activeIndex === 0" />
      </section>
      <section class="swiper-slide section_slide about_section" data-anchor="about">
        <AboutView :active="activeIndex === 1" />
      </section>
      <section class="swiper-slide section_slide skills_section" data-anchor="skills">
        <SkillsView :active="activeIndex === 2" />
      </section>
      <section class="swiper-slide section_slide project_section" data-anchor="project">
        <ProjectView :active="activeIndex === 3" />
      </section>
    </div>
    <div class="swiper-pagination"></div>
  </main>

  <GlobalFooter ref="footerRef" />
</template>

<style scoped></style>
