import { IconEducation, IconExperience, IconProject } from '@/components/icons'
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
