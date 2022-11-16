import { googleLogout, TokenResponse, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Button, Typography } from 'components/common'
import React, { Dispatch, FC } from 'react'
import { useEffectOnce } from 'utils/use-effect-once'
import { MessageProps } from './'
import { AWSInfoProps } from './constants'
import { useTranslation } from 'react-i18next'

interface GoogleLoginProps {
  updateLoginInfo: (info: Partial<AWSInfoProps>) => void
  updateMessage: ({ message, variant }: MessageProps) => void
  setIsGoogleApiLoading: Dispatch<React.SetStateAction<boolean>>
  awsInfo: AWSInfoProps
}

type TokenResponseProps = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>

type UserDetailsProps = {
  given_name: string
  picture: string
  email: string
  hd?: string
}

const GoogleLogin: FC<GoogleLoginProps> = ({
  updateLoginInfo,
  updateMessage,
  setIsGoogleApiLoading,
  awsInfo,
}) => {
  const { t } = useTranslation('form')
  const token = localStorage.getItem('token')

  const getUserDetails = async (token: string): Promise<UserDetailsProps> => {
    const {
      data: { given_name, picture, email, hd },
    } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setIsGoogleApiLoading(false)
    return { given_name, picture, email, hd }
  }

  const handleSuccess = (data: UserDetailsProps) => {
    const { given_name, picture, email, hd } = data

    // if (!hd || hd.toUpperCase() !== process.env.REACT_APP_FILTER_DOMAIN) {
    //   updateMessage({
    //     message: t('message.useDataparEmail'),
    //     variant: 'primary',
    //   })
    //   localStorage.clear()
    //   updateLoginInfo({ signInRejected: true })
    //   setIsGoogleApiLoading(false)
    //   googleLogout()
    // } else {
    const domainFromEnv = process.env.REACT_APP_FILTER_DOMAIN
    //const isSameDomain = hd!.toUpperCase() === domainFromEnv

    if (domainFromEnv === '' /*|| isSameDomain*/) {
      updateLoginInfo({
        picture,
        email,
        name: given_name,
        loggedIn: true,
        signInRejected: false,
      })
    } else {
      localStorage.clear()
      updateLoginInfo({ signInRejected: true })
      setIsGoogleApiLoading(false)
      googleLogout()
      updateMessage({ message: t('message.invalidDomain', { hd }), variant: 'primary' })
    }
    setIsGoogleApiLoading(false)
    // }
  }

  const onSuccess = async (tokenResponse: TokenResponseProps) => {
    localStorage.setItem('token', tokenResponse.access_token)
    const data = await getUserDetails(tokenResponse.access_token)
    handleSuccess(data)
  }

  const googleLogin = useGoogleLogin({
    onSuccess,
    onError: errorResponse => console.log(errorResponse),
  })

  useEffectOnce(() => {
    if (token && !awsInfo.loggedIn) {
      setIsGoogleApiLoading(true)
      getUserDetails(token).then(data => handleSuccess(data))
    }
  })

  return (
    <>
      <Typography variant="body1" color="white">
        {t('title.notLogged')}
      </Typography>
      <Button onClick={() => googleLogin()}>{t('title.loginButton')}</Button>
    </>
  )
}

export default GoogleLogin
