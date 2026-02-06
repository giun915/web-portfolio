<script setup lang="ts">
import AboutDescription from '@/components/about/AboutDescription.vue'
import AboutCard from '@/components/about/AboutCard.vue'
import { aboutList } from '@/constants/about/aboutCardData'
</script>

<template>
  <section class="swiper-slide section_slide about_section" data-anchor="about">
    <h4 class="blind">어바웃 섹션</h4>
    <div class="page_inner">
      <AboutDescription />
      <div class="about_card_area">
        <div class="about_card_wrap">
          <div class="about_card_bg"></div>
          <div class="card_item_wrap">
            <AboutCard
              v-for="(item, index) in aboutList"
              :key="index"
              :title="item.title"
              :content="item.content"
            >
              <component :is="item.icon" />
            </AboutCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page_inner {
  flex-direction: row;
  gap: 4rem;
}
.page_inner > div {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
}
.about_card_area {
  overflow: hidden;
  padding: 0 1rem;
}
.about_card_wrap {
  width: 100%;
  transform: translateX(105%);
  transition: all 1s ease;
}
.swiper-slide-active .about_card_wrap {
  transform: translateX(0);
}
.about_card_bg {
  position: absolute;
  inset: 0px;
  transform: rotate(6deg) scaleX(1) scaleY(1);
  border-radius: 1rem;
  background: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
}
.card_item_wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: var(--box-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
}
</style>
