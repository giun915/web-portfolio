<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()

const cards = [
  {
    title: 'Education',
    content: '컴퓨터공학 학사',
    icon: ``,
  },
  {
    title: 'Experience',
    content: '7+ Years',
    icon: ``,
  },
  {
    title: 'Projects',
    content: '30+ Completed',
    icon: ``,
  },
]
</script>
<template>
  <div class="card_item">
    <div class="card_icon">
      <i>
        <slot></slot>
      </i>
    </div>
    <div class="card_content">
      <p class="title">{{ title }}</p>
      <p class="content">{{ content }}</p>
    </div>
  </div>
</template>

<style scpoed>
.about_section .card_item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.about_section .card_icon {
  width: 1.875rem;
}
.about_section .card_icon i {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: var(--main-color);
}
.about_section .card_content .title {
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.about_section .card_content .content {
  color: var(--gray-color);
  font-size: 1rem;
}
</style>
