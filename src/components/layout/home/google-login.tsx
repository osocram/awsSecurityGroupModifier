import { googleLogout, TokenResponse, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Button, Typography } from 'components/common'
import React, { Dispatch, FC } from 'react'
import { useEffectOnce } from 'utils/use-effect-once'
import { MessageProps } from './'
import { AWSInfoProps } from './constants'

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
  const token = localStorage.getItem('token')

  const getUserDetails = async (token: string): Promise<UserDetailsProps> => {
    const {
      data: { given_name, picture, email, hd },
    } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Set-Cookie': 'SameSite=None; Secure',
      },
    })
    setIsGoogleApiLoading(false)
    return { given_name, picture, email, hd }
  }

  const handleSuccess = (data: UserDetailsProps) => {
    const { given_name, picture, email, hd } = data

    if (!hd || hd.toUpperCase() !== process.env.REACT_APP_FILTER_DOMAIN) {
      updateMessage({
        message: 'Please use your Datapar Gmail account.',
        variant: 'primary',
      })
      localStorage.clear()
      updateLoginInfo({ signInRejected: true })
      setIsGoogleApiLoading(false)
      googleLogout()
    } else {
      const domainFromEnv = process.env.REACT_APP_FILTER_DOMAIN
      const isSameDomain = hd!.toUpperCase() === domainFromEnv

      if (domainFromEnv === '' || isSameDomain) {
        updateLoginInfo({
          picture,
          email,
          name: given_name,
          loggedIn: true,
          signInRejected: false,
        })
      } else {
        updateMessage({ message: `The domain ${hd} is not allowed.`, variant: 'primary' })
      }
      setIsGoogleApiLoading(false)
    }
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
        Let&apos;s start by logging in with your Datapar Gmail credentials. You&apos;ll be
        redirected to Google&apos;s authentication page.
      </Typography>
      <Button onClick={() => googleLogin()}>Login with Google</Button>
    </>
  )
}

export default GoogleLogin
