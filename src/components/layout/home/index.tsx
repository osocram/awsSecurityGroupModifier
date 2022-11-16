import axios from 'axios'
import { Flexbox, LoaderSpinner, Typography } from 'components/common'

import { TypographyProps } from 'components/common/typography'
import { useEffect, useState } from 'react'
import RegisterIP from '../register-ip'
import { AWSInfoProps, initialConfig } from './constants'
import GoogleLogin from './google-login'
import GoogleLogout from './google-logout'
import AppMessages from './message'
import UserProfile from './profile'

export type MessageProps = {
  message: string
  variant?: TypographyProps['color']
}

const LoginSection = () => {
  const [awsInfo, setAwsInfo] = useState<AWSInfoProps>(initialConfig)
  const [message, setMessageState] = useState<MessageProps>({
    message: '',
    variant: 'default',
  })
  const [isGoogleApiLoading, setIsGoogleApiLoading] = useState<boolean>(false)

  const updateLoginInfo = (info: Partial<AWSInfoProps>, reset?: boolean) => {
    setAwsInfo(!reset ? prevState => ({ ...prevState, ...info }) : initialConfig)
  }

  const updateMessage = ({ message, variant }: MessageProps) => {
    setMessageState({
      message,
      variant,
    })
  }

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    updateLoginInfo({ ip: res.data.IPv4 })
    updateMessage({
      message: `Your IP address <strong>(${res.data.IPv4})</strong> from <strong>${res.data.city}, ${res.data.state}</strong> has been retrieved. `,
      variant: 'secondary',
    })
  }

  useEffect(() => {
    if (awsInfo.loggedIn && !awsInfo.ip && !awsInfo.signInRejected) {
      updateMessage({
        message: 'Please wait while we set everything for you...',
        variant: 'secondary',
      })
      getData()
    }
  }, [awsInfo])

  const showMessage = Boolean(awsInfo.loggedIn || awsInfo.signInRejected)

  return (
    <Flexbox
      fullHeight
      justifyContent="center"
      width="30vw"
      direction="column"
      gap="1rem"
    >
      {isGoogleApiLoading && <LoaderSpinner />}
      {!isGoogleApiLoading && !awsInfo.loggedIn ? (
        <GoogleLogin
          {...{
            updateLoginInfo,
            updateMessage,
            setIsGoogleApiLoading,
            awsInfo,
          }}
        />
      ) : (
        <>{awsInfo.loggedIn && <UserProfile {...{ awsInfo }} />}</>
      )}
      {showMessage && <AppMessages {...{ message }} />}
      {awsInfo.loggedIn && awsInfo.ip && (
        <>
          <Typography variant="body1">
            Now you can update the AWS Security Group to allow your IP to access
            Datapar&apos;s features. <br />
            <br /> What do you want to do?
          </Typography>
          <Flexbox direction="row" alignItems="center" gap="1rem" noWrap>
            <RegisterIP {...{ awsInfo, updateMessage }} />
            <GoogleLogout {...{ updateLoginInfo, updateMessage }} />
          </Flexbox>
        </>
      )}
    </Flexbox>
  )
}

export default LoginSection
