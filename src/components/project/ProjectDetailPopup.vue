<script setup lang="ts">
import { computed } from 'vue'
import { IconXmark } from '@/components/icons'
import IconArrowType2 from '@/components/icons/common/IconArrowType2.vue'
import type { ProjectDetail } from '@/constants/project/projectDetailData'
import IconEyes from '@/components/icons/project/IconEyes.vue'
import IconGithub from '@/components/icons/common/IconGithub.vue'

const props = defineProps<{
  projects: ProjectDetail[]
  currentIndex: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:index', value: number): void
}>()

const project = computed(() => props.projects[props.currentIndex])
const isFirst = computed(() => props.currentIndex === 0)
const isLast = computed(() => props.currentIndex === props.projects.length - 1)

const goPrev = () => {
  if (!isFirst.value) {
    emit('update:index', props.currentIndex - 1)
  }
}

const goNext = () => {
  if (!isLast.value) {
    emit('update:index', props.currentIndex + 1)
  }
}
</script>

<template>
  <section v-if="project" class="portfolio_detail_area">
    <div class="portfolio_detail_bg" @click="emit('close')"></div>
    <div class="portfolio_detail_box">
      <div class="box_header">
        <div class="project_title_area">
          <button
            class="arrow_btn prev_btn"
            type="button"
            :class="{ disabled: isFirst }"
            :disabled="isFirst"
            @click="goPrev"
          >
            <i>
              <IconArrowType2 />
            </i>
          </button>
          <div class="project_title">
            <h4>{{ project.title }}</h4>
            <p>Client. {{ project.client }}</p>
          </div>
          <button
            class="arrow_btn next_btn"
            type="button"
            :class="{ disabled: isLast }"
            :disabled="isLast"
            @click="goNext"
          >
            <i>
              <IconArrowType2 />
            </i>
          </button>
        </div>
        <button class="close_btn" type="button" @click="emit('close')">
          <i>
            <IconXmark />
          </i>
        </button>
      </div>
      <div class="box_content_area">
        <div class="box_content_wrap">
          <div class="box_main_img_wrap">
            <img :src="project.mainImage" :alt="project.title" />
            <ul class="main_skill_list">
              <li v-for="(skill, i) in project.mainSkills" :key="i" :class="skill.className">
                {{ skill.label }}
              </li>
            </ul>
          </div>
          <ul class="project_summary_list">
            <li
              v-for="(item, i) in project.summary"
              :key="i"
              :class="['box_common_attr', item.className]"
            >
              <div class="summary_header">
                <div class="summary_icon">
                  <i>
                    <component :is="item.icon" />
                  </i>
                </div>
                <p class="summary_title">
                  {{ item.title }}
                </p>
              </div>
              <p class="summary_content">{{ item.content }}</p>
            </li>
          </ul>
          <div class="project_overview_wrap">
            <h4>Project Overview</h4>
            <div class="project_overview_box box_common_attr">
              <p v-for="(text, i) in project.overview" :key="i">
                {{ text }}
              </p>
            </div>
          </div>
          <div class="project_key_wrap">
            <h4>Key Features</h4>
            <ul class="project_key_list">
              <li
                v-for="(item, i) in project.keyFeatures"
                :key="i"
                class="project_key_item box_common_attr"
              >
                <div class="icon_wrap">
                  <component :is="item.icon" />
                </div>
                <div class="key_content">
                  <p class="title">{{ item.title }}</p>
                  <p class="content">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- gallery -->
          <div class="project_gallery_wrap">
            <div class="gallery_title">
              <h4>Project Gellery</h4>
              <div class="common_mouse_icon_wrap">
                <div class="mouse_icon common_trans_attr">
                  <i class="mouse_circle"></i>
                </div>
              </div>
            </div>
            <div class="img_wrap box_common_attr">
              <div class="img_box_inner">
                <img v-for="(img, i) in project.gallery" :key="i" :src="img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="project.links?.demo || project.links?.github" class="box_footer">
        <div class="footer_inner">
          <a
            v-if="project.links?.demo"
            class="demo_btn"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <IconEyes />
            </i>
            <span>View Preview</span>
          </a>
          <a
            v-if="project.links?.github"
            class="code_btn"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <IconGithub />
            </i>
            <span>View Code</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-detail-enter-from,
.portfolio-detail-leave-to {
  opacity: 0;
  visibility: hidden;
}

.portfolio-detail-enter-to,
.portfolio-detail-leave-from {
  opacity: 1;
  visibility: visible;
}

.portfolio-detail-enter-active,
.portfolio-detail-leave-active {
  transition: all 0.4s ease;
}

.portfolio_detail_area {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  transition: all 0.4s ease;
  background: transparent;
}
.portfolio_detail_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background: rgba(20, 20, 20, 0.6);
}

.portfolio_detail_box {
  width: 70rem;
  max-height: 90vh;
  box-shadow: 0px 0px 1.25rem #000000;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  background: var(--box-bg-color);
  overflow: hidden;
}
.box_header,
.box_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.project_title_area {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.project_title h4 {
  font-size: 1.5rem;
  font-weight: 700;
}
.project_title p {
  color: var(--gray-color);
  font-size: 1rem;
  margin-top: 0.25rem;
}

.box_header button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #1d2229;
  transition: all 0.4s ease;
  border: 1px solid #374151;
}

.prev_btn {
  transform: rotate(180deg);
}

.close_btn:hover {
  background-color: rgb(239 68 68 / 0.2);
  border-color: rgb(239 68 68 / 0.5);
}

.box_header button i {
  color: #d1d5db;
  line-height: 0;
}

.arrow_btn.disabled {
  background-color: #353535;
}

.arrow_btn.disabled i {
  color: #595959;
}

.close_btn i {
  font-size: 1.125rem;
}

.box_content_area {
  box-sizing: border-box;
  padding: 1.5rem 1rem 1.5rem 2rem;
}
.box_content_wrap {
  height: calc(80vh - 9.5rem - 10px);
  padding-right: 1rem;
  overflow-y: auto;
  box-sizing: border-box;
}
.box_content_wrap > * {
  margin-bottom: 2rem;
}
.box_content_wrap > *:last-child {
  margin-bottom: 0;
}
.box_main_img_wrap {
  position: relative;
  height: 25rem;
  overflow: hidden;
  border: 1px solid rgb(31 41 55 / 1);
  border-radius: 0.75rem;
  box-sizing: border-box;
}
.box_main_img_wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main_skill_list {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.box_main_img_wrap li {
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
}
.html_badge {
  background: rgb(168 85 247 / 0.9);
}
.javascript_badge {
  background: rgb(59 130 246 / 0.9);
}
.responsive_badge {
  background: rgb(34 197 94 / 0.9);
}

.box_common_attr {
  padding: 1.5rem;
  background-image: linear-gradient(to bottom right, rgba(31, 41, 55, 0.4), rgba(17, 24, 39, 0.4));
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
}

.project_summary_list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.project_summary_list li {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
}
.summary_header {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}
.summary_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
}
.summary_title {
  color: var(--gray-color);
  font-weight: 500;
}
.project_summary_list i {
  font-size: 1rem;
  line-height: 0;
}
.summary_content {
  font-weight: 600;
  font-size: 1.25rem;
}
.project_duration_item .summary_icon {
  background: rgb(168 85 247 / 0.2);
}
.project_duration_item .summary_icon i {
  color: #c084fc;
}
.project_technologies_item .summary_icon {
  background: rgb(59 130 246 / 0.2);
}
.project_technologies_item .summary_icon i {
  color: #60a5fa;
}
.project_role_item .summary_icon {
  background: rgb(34 197 94 / 0.2);
}
.project_role_item .summary_icon i {
  color: #4ade80;
}

.project_overview_box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  word-break: keep-all;
}
.project_overview_wrap h4 {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.project_overview_wrap p {
  font-size: 1rem;
  color: #d1d5db;
  line-height: 1.625rem;
}

.project_key_wrap h4 {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project_key_list {
  display: flex;
  gap: 1rem;
}
.project_key_item {
  display: flex;
  gap: 1rem;
  width: 50%;
  align-items: center;
}
.icon_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
}
.icon_wrap i {
  line-height: 0;
}
.key_content .title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}
.key_content .content {
  color: var(--gray-color);
}
.project_key_item:nth-child(1) .icon_wrap {
  background-color: rgb(168 85 247 / 0.2);
}
.project_key_item:nth-child(1) .icon_wrap i {
  color: var(--secondary-color);
  font-size: 1rem;
}
.project_key_item:nth-child(2) .icon_wrap {
  background-color: rgb(59 130 246 / 0.2);
}
.project_key_item:nth-child(2) .icon_wrap i {
  color: #60a5fa;
  font-size: 1rem;
}
.project_key_item:nth-child(3) .icon_wrap {
  background-color: rgb(34 197 94 / 0.2);
}
.project_key_item:nth-child(3) .icon_wrap i {
  color: #4ade80;
  font-size: 1rem;
}
.project_key_item:nth-child(4) .icon_wrap {
  background-color: rgb(234 179 8 / 0.2);
}
.project_key_item:nth-child(4) .icon_wrap i {
  color: #facc15;
  font-size: 1rem;
}

.gallery_title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 1rem;
}
.project_gallery_wrap h4 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 0;
}
.project_gallery_wrap .img_wrap {
  height: 30rem;
  overflow: hidden;
}
.img_box_inner {
  height: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: hidden;
  overflow-y: auto;
}
.img_box_inner::-webkit-scrollbar {
  display: none;
}
.project_gallery_wrap .img_wrap img {
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
}
.project_gallery_wrap .img_wrap img:last-child {
  margin-bottom: 0;
}
.common_mouse_icon_wrap .mouse_icon {
  width: 1rem;
  height: 1.875rem;
  transform: translateY(0);
}
.common_mouse_icon_wrap .mouse_circle {
  width: 0.25rem;
  height: 0.25rem;
  animation: bounce_small_icon 3s ease-in-out infinite;
}

.box_footer {
  border-bottom: none;
  padding: 0 2rem;
}
.footer_inner {
  display: flex;
  width: 100%;
  gap: 1rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--border-color);
}
.box_footer a {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.4s ease;
}
.demo_btn {
  background: linear-gradient(to right, #9333ea, #2563eb);
}
.demo_btn:hover {
  background: linear-gradient(to right, #7e22ce, #1d4ed8);
}
.code_btn {
  background: #1f2937;
  border: 1px solid #374151;
}
.code_btn:hover {
  background: #374151;
}
.box_footer a i {
  display: flex;
  align-items: center;
}
</style>
