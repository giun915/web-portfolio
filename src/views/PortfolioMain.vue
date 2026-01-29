<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper'
import { Mousewheel, Pagination } from 'swiper/modules'

import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

import IntroView from './IntroView.vue'
import AboutView from './AboutView.vue'
import SkillView from './SkillView.vue'
import ProjectView from './ProjectView.vue'
import ContactView from './ContactView.vue'

Swiper.use([Mousewheel, Pagination])

const pullPage = ref<Swiper | null>(null)
const activeIndex = ref(1)

const goToSlide = (id: number) => {
  pullPage.value?.slideTo(id - 1)
}

const footerRef = ref<InstanceType<typeof GlobalFooter> | null>(null)

const sectionEls = ref<HTMLElement[]>([])

onMounted(() => {
  pullPage.value = new Swiper('.pullPageSlide', {
    direction: 'vertical',
    nested: true,
    resistanceRatio: 0,

    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },

    touchStartPreventDefault: false,

    pagination: {
      el: '.pullPageSlide .swiper-pagination',
      clickable: true,
    },

    on: {
      async init(swiper) {
        // 🔹 DOM 안정화 (Footer ref / pagination 생성 보장)
        await nextTick()

        const target = footerRef.value?.footerPagination
        const paginationEl = swiper.pagination?.el

        if (target && paginationEl) {
          target.appendChild(paginationEl)
        }

        sectionEls.value = Array.from(
          document.querySelectorAll('.pullPageSlide .swiper-slide'),
        ) as HTMLElement[]

        // 2️⃣ 최초 섹션 on 처리
        updateSection(swiper.activeIndex)
      },

      slideChange(swiper) {
        // 3️⃣ header / 메뉴 activeIndex 동기화
        activeIndex.value = swiper.activeIndex + 1

        // 4️⃣ 섹션 on 토글
        updateSection(swiper.activeIndex)
      },
    },
  })
})

const updateSection = (index: number) => {
  sectionEls.value.forEach((el, i) => {
    el.classList.toggle('on', i === index)
  })
}
</script>

<template>
  <GlobalHeader :activeIndex="activeIndex" :goToSlide="goToSlide" />

  <main id="pullPageSlide" class="swiper pullPageSlide">
    <div class="swiper-wrapper">
      <section class="swiper-slide section_slide section_slide_1 intro_section" data-anchor="intro">
        <IntroView :active="activeIndex === 1" />
      </section>
    </div>
    <div class="swiper-pagination"></div>
  </main>

  <GlobalFooter ref="footerRef" />
</template>

<style scoped></style>
