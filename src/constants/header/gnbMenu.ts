export type GnbItem = {
  index: number
  label: string
  anchor: string
  className: string
}

export const gnbList: GnbItem[] = [
  { index: 0, label: 'INTRO', anchor: '#intro', className: 'gnb_1' },
  { index: 1, label: 'ABOUT', anchor: '#about', className: 'gnb_2' },
  { index: 2, label: 'SKILLS', anchor: '#skills', className: 'gnb_3' },
  { index: 3, label: 'PROJECT', anchor: '#project', className: 'gnb_4' },
  { index: 4, label: 'CONTACT', anchor: '#contact', className: 'gnb_5' },
]
