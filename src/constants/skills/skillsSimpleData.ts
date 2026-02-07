import IconCommunication from '@/components/icons/skills/IconCommunication.vue'
import IconEcommerce from '@/components/icons/skills/IconEcommerce.vue'
import IconGitlab from '@/components/icons/skills/IconGitlab.vue'
import IconHybrid from '@/components/icons/skills/IconHybrid.vue'
import type { Component } from 'vue'
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
