<script setup lang="ts">
import { contactList, socialList } from '@/constants/contact/contactInfoData'
import IconEmail from '@/components/icons/contact/IconEmail.vue'
import IconPhone from '../icons/contact/IconPhone.vue'
import IconLocation from '../icons/contact/IconLocation.vue'
import IconLinkedIn from '../icons/common/IconLinkedIn.vue'
import IconInsta from '../icons/contact/IconInsta.vue'
import IconKakao from '../icons/contact/IconKakao.vue'

const contactIconMap = {
  email: IconEmail,
  phone: IconPhone,
  location: IconLocation,
} as const

const socialIconMap = {
  linkedIn: IconLinkedIn,
  insta: IconInsta,
  kakao: IconKakao,
} as const
</script>
<template>
  <div class="contact_information_wrap common_trans_attr">
    <h5 class="information_title">Contact Information</h5>
    <ul class="infomation_content_list">
      <li v-for="item in contactList" :key="item.id">
        <div class="list_icon">
          <i>
            <component :is="contactIconMap[item.icon]" />
          </i>
        </div>
        <div class="list_content">
          <p class="title">{{ item.title }}</p>
          <p class="content">{{ item.value }}</p>
        </div>
      </li>
    </ul>
    <ul class="contact_icon_list">
      <li v-for="item in socialList" :key="item.id">
        <a :href="item.href" target="_blank" :aria-label="item.label">
          <i>
            <component :is="socialIconMap[item.icon]" />
          </i>
        </a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.contact_information_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--box-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 2rem;
}

.information_title {
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.infomation_content_list {
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin-bottom: 2rem;
}
.infomation_content_list li {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
}
.infomation_content_list .list_icon {
  display: flex;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--main-rgb-color) / 0.1);
  border-radius: 0.5rem;
}
.infomation_content_list .list_icon i {
  display: flex;
  font-size: 1.25rem;
  color: var(--main-color);
}
.infomation_content_list .list_content {
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
}
.infomation_content_list .list_content p {
  font-size: 1rem;
}
.infomation_content_list .list_content .title {
  font-weight: 600;
}
.infomation_content_list .list_content .content {
  color: var(--gray-color);
}

.contact_icon_list {
  display: flex;
  gap: 1rem;
}
.contact_icon_list li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  transition: all 0.4s ease;
  cursor: pointer;
}
.contact_icon_list li:hover {
  border: 1px solid var(--main-color);
}
.contact_icon_list li a {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.contact_icon_list li i {
  display: flex;
  font-size: 1.25rem;
  transition: all 0.4s ease;
}
.contact_icon_list li:hover i {
  color: var(--main-color);
}
</style>
