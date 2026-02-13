<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()
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
.card_item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.card_icon {
  width: 1.875rem;
}
.card_icon i {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: var(--main-color);
}
.card_content .title {
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.card_content .content {
  color: var(--gray-color);
  font-size: 1rem;
}

/* 반응형 */
@media (max-width: 768px) {
  .card_content .title {
    font-size: 0.875rem;
  }

  .card_content .content {
    font-size: 0.875rem;
  }
}
</style>
