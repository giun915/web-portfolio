import type { Component } from 'vue'
import IconEcommerce from '@/components/icons/skills/IconEcommerce.vue'
import IconHybrid from '@/components/icons/skills/IconHybrid.vue'
import IconCommunication from '@/components/icons/skills/IconCommunication.vue'
import IconGitlab from '@/components/icons/skills/IconGitlab.vue'

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
