export type GnbItem = {
  id: number
  label: string
  anchor: string
  className: string
}

export const gnbList: GnbItem[] = [
  { id: 1, label: 'INTRO', anchor: '#intro', className: 'gnb_1' },
  { id: 2, label: 'ABOUT', anchor: '#about', className: 'gnb_2' },
  { id: 3, label: 'SKILLS', anchor: '#skills', className: 'gnb_3' },
  { id: 4, label: 'PROJECT', anchor: '#project', className: 'gnb_4' },
  { id: 5, label: 'CONTACT', anchor: '#contact', className: 'gnb_5' },
]
