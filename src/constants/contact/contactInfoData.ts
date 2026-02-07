export type ContactItem = {
  id: string
  title: string
  value: string
  icon: 'email' | 'phone' | 'location'
}

export type SocialItem = {
  id: string
  href: string
  label: string
  icon: 'linkedIn' | 'insta' | 'kakao'
}

export const contactList: ContactItem[] = [
  {
    id: 'email',
    title: 'Email',
    value: 'giun915@gmail.com',
    icon: 'email',
  },
  {
    id: 'phone',
    title: 'Phone',
    value: '010-8984-2401',
    icon: 'phone',
  },
  {
    id: 'location',
    title: 'Location',
    value: '인천광역시 부평구 갈산동',
    icon: 'location',
  },
]

export const socialList: SocialItem[] = [
  {
    id: 'linkedIn',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/%EC%96%84%EB%A3%A8-%EC%9D%B4-6a20313a2/',
    icon: 'linkedIn',
  },
  {
    id: 'insta',
    label: 'Instagram',
    href: 'https://www.instagram.com/yigiun?igsh=MTVqb3ppeGFxcGRoMA==',
    icon: 'insta',
  },
  {
    id: 'kakao',
    label: 'Kakao',
    href: 'https://open.kakao.com/o/sJl2Bn4e',
    icon: 'kakao',
  },
]
