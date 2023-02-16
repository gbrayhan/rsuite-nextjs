import {ObjectFormType} from "@/store/reducers/types/http";

export const getFormData = (object: ObjectFormType) => Object.keys(object).reduce((formData: FormData, key: string) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());