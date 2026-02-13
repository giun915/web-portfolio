<script setup lang="ts">
import { skillList } from '@/constants/skills/skillsSimpleData'
</script>

<template>
  <div class="skills_box_area skills_simple_area">
    <div class="box_area_inner">
      <ul class="skills_box_list common_trans_attr">
        <li v-for="(skill, index) in skillList" :key="index" class="skill_box">
          <div class="box_icon">
            <i>
              <component :is="skill.icon" />
            </i>
          </div>
          <p class="box_name">{{ skill.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.skills_simple_area .skills_box_list {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.skills_simple_area .skill_box {
  padding: 1.5rem;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
.skills_section .skills_simple_area .box_icon {
  width: auto;
  height: auto;
}
.skills_section .skills_simple_area .box_icon i {
  font-size: 2.25rem;
}
.box_name {
  font-size: 1rem;
  text-align: center;
}

/* 반응형 */
@media (max-width: 768px) {
  .page_inner {
    width: 100%;
  }

  .skills_simple_area .skills_box_list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}
</style>
