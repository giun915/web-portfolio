export type ContactField = {
  id: string
  type: 'text' | 'email' | 'textarea'
  name: string
  placeholder: string
  required?: boolean
}

export const contactFields: ContactField[] = [
  {
    id: 'title',
    type: 'text',
    name: 'title',
    placeholder: '제목을 입력해주세요',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    name: 'email',
    placeholder: '이메일 주소를 입력해주세요',
    required: true,
  },
  {
    id: 'message',
    type: 'textarea',
    name: 'message',
    placeholder: '문의 내용을 입력해주세요',
  },
]
