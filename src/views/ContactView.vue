<script setup lang="ts">
import ContactForm from '@/components/contact/ContactForm.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
</script>
<template>
  <section class="swiper-slide section_slide section_slide_5 contact_section" data-anchor="contact">
    <h4 class="blind">컨택트 섹션</h4>
    <div class="page_inner">
      <div class="section_title_area">
        <div class="section_title_wrap">
          <h4 class="section_title">Project <span>Inquiry</span></h4>
        </div>
        <div class="section_title_wrap section_sub_title_wrap">
          <h4 class="section_title">프로젝트 문의는 언제든지 환영합니다</h4>
        </div>
      </div>
      <div class="section_content_area">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  </section>
</template>
<style scoped>
.page_inner {
  gap: 2rem;
}
.section_title_area {
  margin-top: 3rem;
}

.section_content_area {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2.5rem 15rem;
  box-sizing: border-box;
  overflow: hidden;
}
.section_content_area > * {
  width: 50%;
}
</style>
