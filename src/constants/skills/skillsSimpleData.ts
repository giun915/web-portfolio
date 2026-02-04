import type { Component } from 'vue'
import { IconEcommerce, IconHybrid, IconCommunication, IconGitlab } from '@/components/icons'

export type SkillItem = {
  name: string
  icon: Component
}

export const skillList: SkillItem[] = [
  { name: 'E-commerce Platform', icon: IconEcommerce },
  { name: 'Hybrid App', icon: IconHybrid },
  { name: 'Device Communication', icon: IconCommunication },
  { name: 'GitLab', icon: IconGitlab },
]
