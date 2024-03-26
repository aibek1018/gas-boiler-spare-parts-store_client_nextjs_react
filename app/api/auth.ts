import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { ISignInFx, ISignUpFx } from '@/types/auth'
import api from '../axiosClient'

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('Регистрация прошла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password })

    toast.success('Вход выполнен!')

    return data
  }
)
