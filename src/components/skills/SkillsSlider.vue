<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import { skillList } from '@/constants/skills/skillsSliderData'
import { bindInnerScrollLock } from '@/utils/swiper/wheelControl'

Swiper.use([Navigation])
onMounted(() => {
  initSkillSection()
})

onUpdated(() => {
  initSkillSection()
})

function initSkillSection() {
  document.querySelectorAll('.skill_level_list').forEach((el) => {
    const hasScroll = el.scrollHeight > el.clientHeight
    el.classList.toggle('has_scroll', hasScroll)
  })

  bindInnerScrollLock()
  animateSkillBars()
}

function animateSkillBars(container: HTMLElement | Document = document) {
  const skillItems = container.querySelectorAll<HTMLElement>('.skill_level')
  skillItems.forEach((item) => {
    const percent = Number(item.dataset.skill)
    const bar = item.querySelector<HTMLElement>('.skill_bar')
    const text = item.querySelector<HTMLElement>('.per')

    if (!percent || !bar || !text) return

    // 초기화
    bar.style.width = '0%'
    text.textContent = '0%'

    bar.style.width = percent + '%'
    text.textContent = percent + '%'
  })
}
</script>

<template>
  <div class="skills_box_area">
    <div class="box_area_inner">
      <div class="swiper skillSlide common_trans_attr">
        <ul class="swiper-wrapper skills_box_list">
          <li
            class="swiper-slide skill_box"
            :class="skill.customClass"
            v-for="skill in skillList"
            :key="skill.id"
          >
            <div class="box_icon">
              <i>
                <component :is="skill.icon" />
              </i>
            </div>
            <h5 class="box_title">{{ skill.title }}</h5>
            <p class="box_content">
              {{ skill.content }}
            </p>
            <ul class="skill_level_list">
              <li
                class="skill_level"
                v-for="level in skill.levels"
                :key="level.name"
                :data-skill="level.percent"
              >
                <div class="skill_header">
                  <p class="name">{{ level.name }}</p>
                  <p class="per"></p>
                </div>
                <div class="skill_bar_wrap">
                  <div class="skill_bar"></div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
<style scoped>
.skill_box {
  width: calc((100% - 4rem) / 3);
  margin-right: 2rem;
}
.skill_box:last-child {
  margin-right: 0 !important;
}

.box_title {
  font-size: 1.5rem;
  font-weight: 600;
}
.box_content {
  display: box;
  line-clamp: 2;
  box-orient: vertical;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 1rem;
  color: var(--gray-color);
  word-break: keep-all;
}
.skill_level_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 9.125rem;
  overflow-y: auto;
}
.skill_level_list.has_scroll {
  padding-right: 1rem;
  overscroll-behavior: contain;
}
.skill_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.skill_header > * {
  font-size: 0.875rem;
}
.skill_header .per {
  transition: all 1s ease 0.5s;
  opacity: 0;
  visibility: hidden;
}
.swiper-slide-active .skill_header .per {
  opacity: 1;
  visibility: visible;
}
.skill_bar_wrap {
  height: 0.5rem;
  background-color: #2b2b2b;
  border-radius: 9999px;
}
.skills_section:not(.swiper-slide-active) .skill_bar {
  width: 0 !important;
}

.skill_bar {
  height: 100%;
  background-color: #ffffff;
  border-radius: 9999px;
  transition: width 1s ease 0.5s;
}

.publishing_box .box_icon {
  background: linear-gradient(to bottom right, var(--main-color), #0891b2);
}
.publishing_box .per {
  color: var(--main-color);
}
.publishing_box .skill_bar {
  background: linear-gradient(to right, var(--main-color), #0891b2);
}

.front_box .box_icon {
  background: linear-gradient(to bottom right, #c084fc, #9333ea);
}
.front_box .per {
  color: var(--secondary-color);
}
.front_box .skill_bar {
  background: linear-gradient(to right, #c084fc, #9333ea);
}

.back_box .box_icon {
  background: linear-gradient(to bottom right, var(--tertiary-color), #db2777);
}
.back_box .per {
  color: var(--tertiary-color);
}
.back_box .skill_bar {
  background: linear-gradient(to right, var(--tertiary-color), #db2777);
}

.database_box .box_icon {
  background: linear-gradient(to bottom right, var(--quaternary-color), #ca8a04);
}
.skill_box.database_box .box_icon i {
  font-size: 1.5rem;
}
.database_box .per {
  color: var(--quaternary-color);
}
.database_box .skill_bar {
  background: linear-gradient(to right, var(--quaternary-color), #ca8a04);
}

.swiper-button-prev,
.swiper-button-next {
  opacity: 0;
  visibility: hidden;
  transition: all 2s ease;
  color: var(--main-color);
}
.swiper-slide-active .swiper-button-prev,
.swiper-slide-active .swiper-button-next {
  opacity: 1;
  visibility: visible;
  top: 50%;
  bottom: initial;
  transform: translateY(-50%);
  margin-left: initial;
}
.swiper-slide-active .swiper-button-next.swiper-button-disabled,
.swiper-slide-active .swiper-button-prev.swiper-button-disabled {
  opacity: 0.35;
}
.skills_section .swiper-button-prev {
  left: -3.5rem;
}
.skills_section .swiper-button-next {
  left: initial;
  right: -3.5rem;
}
:deep(.swiper-button-prev svg.swiper-navigation-icon) {
  transform: rotate(180deg);
}
:deep(.swiper-button-next svg.swiper-navigation-icon) {
  transform: rotate(0);
}
</style>
