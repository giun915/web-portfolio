<script setup lang="ts">
import { reactive, ref } from 'vue'
import { contactFields } from '@/constants/contact/contactFormData'
import emailjs from 'emailjs-com'
/*import { IconXmark } from '../icons'*/

type FormState = {
  [key: string]: string
}

const form = reactive<FormState>({})

contactFields.forEach((field) => {
  form[field.name] = ''
})

/*
const EMPTY_FILE_TEXT = '선택된 파일이 없습니다.'
const file = ref<File | null>(null)
const fileName = ref(EMPTY_FILE_TEXT)
const fileInputRef = ref<HTMLInputElement | null>(null)
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const selectedFile = target.files[0] as File
  file.value = selectedFile
  fileName.value = selectedFile.name
}

const removeFile = () => {
  file.value = null
  fileName.value = EMPTY_FILE_TEXT

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}
*/
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const isSending = ref(false)
const handleSubmit = async () => {
  if (isSending.value) return

  submitStatus.value = 'idle'
  isSending.value = true

  try {
    await emailjs.send(
      'service_mo5atga',
      'template_kvreqgh',
      {
        title: form.title,
        email: form.email,
        message: form.message,
      },
      'jLaZF77Bm4_tkMT-L',
    )

    submitStatus.value = 'success'
    Object.keys(form).forEach((key) => (form[key] = ''))
  } catch (error) {
    console.error('메일 전송 실패 : ', error)
    submitStatus.value = 'error'
  } finally {
    isSending.value = false
  }
}
</script>
<template>
  <form class="contact_input_wrap common_trans_attr" @submit.prevent="handleSubmit">
    <template v-for="field in contactFields" :key="field.id">
      <div class="input_wrap" :class="{ textarea_wrap: field.type === 'textarea' }">
        <input
          v-if="field.type !== 'textarea'"
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          v-model="form[field.name]"
        />
        <textarea
          v-else
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          v-model="form[field.name]"
        ></textarea>
      </div>
    </template>
    <!--div class="file_wrap">
      <div class="file_input_wrap">
        <input
          class="file_name"
          readonly
          :placeholder="EMPTY_FILE_TEXT"
          :value="file ? fileName : ''"
        />
        <button
          v-if="file"
          type="button"
          class="remove_btn"
          @click="removeFile"
          aria-label="첨부파일 삭제"
        >
          <IconXmark />
        </button>
      </div>
      <label for="file">첨부파일</label>
      <input
        ref="fileInputRef"
        class="file_input"
        type="file"
        id="file"
        @change="handleFileChange"
      />
    </div-->
    <button class="submit_btn" type="submit" :disabled="isSending">
      {{ isSending ? '전송 중...' : '문의하기' }}
    </button>
    <p v-if="submitStatus === 'success'" class="form_msg success">
      메일이 정상적으로 전송되었습니다.
    </p>
    <p v-if="submitStatus === 'error'" class="form_msg error">
      전송에 실패했습니다. 잠시 후 다시 시도해주세요.
    </p>
  </form>
</template>
<style scoped>
.contact_input_wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
}
.input_wrap {
  box-shadow: 0px 0px 1.25rem #000000;
}
.textarea_wrap {
  font-size: 0;
}
.contact_input_wrap input::placeholder,
.contact_input_wrap textarea::placeholder {
  color: var(--gray-color);
}
.contact_input_wrap input[type='text'],
.contact_input_wrap input[type='email'],
.contact_input_wrap textarea,
.contact_input_wrap .file_name {
  width: 100%;
  border: 1px solid var(--border-color);
  background: var(--box-bg-color);
  color: var(--basic-color);
  box-sizing: border-box;
}
.contact_input_wrap input[type='text'],
.contact_input_wrap input[type='email'],
.contact_input_wrap .file_name {
  height: 3.125rem;
  padding: 0 1rem;
}
.contact_input_wrap input[type='email']:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px var(--box-bg-color) inset !important;
  -webkit-text-fill-color: var(--basic-color) !important;
}
.contact_input_wrap textarea {
  padding: 1rem;
  /*height: 9.375rem;*/
  height: 15rem;
}
.file_wrap {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
.file_input_wrap {
  display: flex;
  width: 100%;
  align-items: center;
}
.file_wrap .file_name {
  width: 100%;
}
.file_wrap .file_input {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.file_wrap label {
  display: flex;
  width: 7.5rem;
  height: 100%;
  background: var(--basic-color);
  color: var(--sub-basic-color);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1.25rem #000000;
}
.submit_btn {
  width: 100%;
  height: 3.125rem;
  background: var(--main-color);
  box-shadow: 0px 0px 1.25rem #000000;
  color: var(--sub-basic-color);
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
}
.remove_btn {
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 0.25rem;
}
.form_msg {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -2rem;
}
.form_msg.success {
  color: var(--main-color);
}
.form_msg.error {
  color: var(--tertiary-color);
}
</style>
