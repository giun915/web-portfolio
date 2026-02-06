<script setup lang="ts">
import SkillsSimple from '@/components/skills/SkillsSimple.vue'
import SkillsSlider from '@/components/skills/SkillsSlider.vue'
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <section class="swiper-slide section_slide skills_section" data-anchor="skills">
    <h4 class="blind">스킬 섹션</h4>
    <div class="page_inner">
      <div class="section_title_area">
        <div class="section_title_wrap">
          <h4 class="section_title">Technical <span>Skills</span></h4>
        </div>
        <div class="section_title_wrap section_sub_title_wrap">
          <h4 class="section_title">전문적으로 다루는 기술 스택입니다</h4>
        </div>
      </div>
      <SkillsSlider />
      <SkillsSimple />
    </div>
  </section>
</template>

<style scoped>
.page_inner {
  gap: 2rem;
}
.section_title_area {
  margin-top: 2rem;
}
.skills_box_area {
  width: 100%;
}
:deep(.box_area_inner) {
  overflow: hidden;
}
:deep(.skills_box_list) {
  display: flex;
}
:deep(.skill_box) {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: auto;
  padding: 2rem;
  background: var(--box-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  transition: all 0.4s ease;
  box-sizing: border-box;
}
:deep(.skill_box:hover) {
  border: 1px solid var(--main-color);
}
:deep(.skill_box .box_icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}
:deep(.skill_box .box_icon i) {
  font-size: 1.875rem;
  color: var(--basic-color);
  line-height: 0;
}
</style>
