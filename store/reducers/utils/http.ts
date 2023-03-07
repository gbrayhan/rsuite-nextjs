import { type ObjectFormType } from '@/store/reducers/types/http'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getFormData = (object: ObjectFormType): FormData => Object.keys(object).reduce((formData: FormData, key: string) => {
  formData.append(key, object[key])
  return formData
}, new FormData())
