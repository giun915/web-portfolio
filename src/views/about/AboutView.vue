<script setup lang="ts">
import AboutDescription from './AboutDescription.vue'
import AboutCard from './AboutCard.vue'
import { IconEducation, IconExperience, IconProject } from '@/components/icons'
</script>

<template>
  <section class="swiper-slide section_slide section_slide_2 about_section" data-anchor="about">
    <h4 class="blind">어바웃 섹션</h4>
    <div class="page_inner">
      <AboutDescription />
      <div class="about_card_area">
        <div class="about_card_wrap">
          <div class="about_card_bg"></div>
          <div class="card_item_wrap">
            <AboutCard title="Education" content="컴퓨터공학 학사">
              <IconEducation />
            </AboutCard>
            <AboutCard title="Experience" content="7+ Years">
              <IconExperience />
            </AboutCard>
            <AboutCard title="Projects" content="30+ Completed">
              <IconProject />
            </AboutCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about_section .about_card_area {
  overflow: hidden;
  padding: 0 1rem;
}
.about_section .about_card_wrap {
  width: 100%;
  transform: translateX(105%);
  transition: all 1s ease;
}
.about_section.on .about_card_wrap {
  transform: translateX(0);
}
.about_section .about_card_bg {
  position: absolute;
  inset: 0px;
  transform: rotate(6deg) scaleX(1) scaleY(1);
  border-radius: 1rem;
  background: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
}
.about_section .card_item_wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: var(--box-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
}
</style>
