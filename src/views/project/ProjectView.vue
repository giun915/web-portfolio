<script setup lang="ts">
import { projectList } from '@/constants/project/projectListData'
import ProjectSlide from './ProjectSlide.vue'

const emit = defineEmits<{
  (e: 'open-project', id: number): void
}>()
</script>

<template>
  <h4 class="blind">프로젝트 섹션</h4>
  <div class="page_inner">
    <div class="section_title_area">
      <div class="section_title_wrap">
        <h4 class="section_title">Project <span>Works</span></h4>
      </div>
      <div class="section_title_wrap section_sub_title_wrap">
        <h4 class="section_title">실제 작업한 프로젝트를 정리했습니다</h4>
      </div>
    </div>
    <div class="slide_area">
      <div class="swiper projectSlide common_trans_attr">
        <ul class="swiper-wrapper">
          <li
            v-for="(project, index) in projectList"
            :key="project.id"
            class="swiper-slide"
            @click="emit('open-project', index)"
          >
            <ProjectSlide :project="project" />
          </li>
        </ul>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page_inner {
  gap: 2rem;
}
.section_title_area {
  margin-bottom: 3rem;
}
.slide_area {
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
}

.slide_inner {
  position: relative;
  display: flex;
  flex-direction: column;
}

.projectSlide {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.swiper-slide {
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  cursor: pointer;
}

.swiper-slide:hover :deep(.slide_main_img img) {
  transform: scale(1.1);
}

.swiper-slide:hover :deep(.view_btn span:after) {
  transform: scaleX(1);
}

.projectSlide .swiper-pagination {
  position: relative;
  margin-top: 3rem;
  width: 23.5rem;
  top: initial;
  bottom: 0;
  left: initial;
  background: #ffffff21;
}

:deep(.swiper-pagination-progressbar .swiper-pagination-progressbar-fill) {
  background: var(--secondary-color);
}

/* projects hover 선 효과 */
.swiper-slide:before,
.swiper-slide:after,
:deep(.slide_inner:before),
:deep(.slide_inner:after) {
  content: '';
  position: absolute;
  background: var(--main-color);
  transition: all 0.4s ease;
}
.swiper-slide:before,
.swiper-slide:after {
  width: 2px;
  height: calc(100% + 2px);
}
.swiper-slide:before {
  top: -2px;
  left: -2px;
  transform: scaleY(0);
  transform-origin: left bottom;
}
.swiper-slide:hover:before {
  transform: scaleY(1);
}
.swiper-slide:after {
  top: 0;
  right: -2px;
  transform: scaleY(0);
  transform-origin: right top;
}
.swiper-slide:hover:after {
  transform: scaleY(1);
}
:deep(.slide_inner:before),
:deep(.slide_inner:after) {
  width: calc(100% + 2px);
  height: 2px;
}
:deep(.slide_inner:before) {
  top: -2px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left top;
}
.swiper-slide:hover :deep(.slide_inner:before) {
  transform: scaleX(1);
}
:deep(.slide_inner:after) {
  bottom: -3px;
  right: 0;
  transform: scaleX(0);
  transform-origin: right bottom;
}
.swiper-slide:hover :deep(.slide_inner:after) {
  transform: scaleX(1);
}
</style>
