<script setup lang="ts">
import IconArrowType1 from '@/components/icons/common/IconArrowType1.vue'
import type { ProjectItem } from '@/constants/project/projectListData'

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <div class="slide_inner">
    <div class="slide_main_img">
      <img :src="project.image" :alt="project.title" draggable="false" />
    </div>
    <div class="client_name" :class="`${project.clientTheme}_type`">
      <p>Client. {{ project.client }}</p>
    </div>
    <div class="slide_content">
      <div class="content_header">
        <div class="project_type" :project-type="project.type">
          <p>{{ project.type }}</p>
        </div>
        <ul class="skill_icon_list">
          <li v-for="(skill, i) in project.skills" :key="i" :class="skill.className">
            <i>
              <component :is="skill.icon" />
            </i>
          </li>
        </ul>
      </div>
      <h5 class="project_name">{{ project.title }}</h5>
      <p class="project_desc">{{ project.desc }}</p>
      <div class="view_btn_wrap">
        <button class="view_btn" type="button">
          <span>View Project</span>
          <i>
            <IconArrowType1 />
          </i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide_main_img {
  height: 16rem;
  overflow: hidden;
}
.slide_main_img img {
  transition: all 0.4s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.client_name {
  position: absolute;
  top: 1rem;
  right: 0;
  padding: 1rem;
  background: rgba(187, 187, 187, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: (3px);
}
.client_name.dark_type {
  background: rgba(20, 20, 20, 0.5);
}
.client_name P {
  font-size: 1rem;
}
.slide_content {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--box-bg-color);
  height: calc(100% - 16rem);
  justify-content: space-around;
}
.content_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.project_type {
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 9999px;
}
.project_type p {
  font-size: 0.75rem;
}

.project_type[project-type='Web Site'] {
  border-color: var(--tertiary-color);
}

.project_type[project-type='Web Site'] p {
  color: var(--tertiary-color);
}

.skill_icon_list {
  display: flex;
  gap: 0.5rem;
}
.skill_icon_list i {
  display: flex;
}
.skill_icon_list .html_icon {
  color: #fb923c;
}

.skill_icon_list .responsive_icon {
  color: #f472b6;
}
.skill_icon_list svg {
  height: 1.5em;
}

.project_name {
  font-weight: 600;
  font-size: 1.25rem;
}
.project_desc {
  font-size: 0.875rem;
  color: var(--gray-color);
  margin-bottom: 0.5rem;
  word-break: keep-all;
}
.view_btn {
  display: inline-flex;
  color: var(--main-color);
  font-size: 0.875rem;
}
.view_btn span {
  position: relative;
}
.view_btn span:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.view_btn i {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}
.view_btn svg {
  margin-top: 1px;
}
</style>
