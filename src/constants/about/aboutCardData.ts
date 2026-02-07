import IconEducation from '@/components/icons/about/IconEducation.vue'
import IconExperience from '@/components/icons/about/IconExperience.vue'
import IconProject from '@/components/icons/about/IconProject.vue'
import type { Component } from 'vue'

export interface AboutItem {
  title: string
  content: string
  icon: Component
}

export const aboutList: AboutItem[] = [
  {
    title: 'Education',
    content: '컴퓨터공학 학사',
    icon: IconEducation,
  },
  {
    title: 'Experience',
    content: '7+ Years',
    icon: IconExperience,
  },
  {
    title: 'Projects',
    content: '30+ Completed',
    icon: IconProject,
  },
]
