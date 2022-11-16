import { googleLogout } from '@react-oauth/google'
import { Button } from 'components/common'
import { FC } from 'react'
import { MessageProps } from './'
import { AWSInfoProps, initialConfig } from './constants'

interface GoogleLogoutProps {
  updateLoginInfo: (info: Partial<AWSInfoProps>, reset?: boolean) => void
  updateMessage: ({ message, variant }: MessageProps) => void
}

const GoogleLogout: FC<GoogleLogoutProps> = ({ updateLoginInfo, updateMessage }) => {
  const handleLogout = () => {
    updateMessage({ message: 'You have been logged out.', variant: 'primary' })
    googleLogout()
    localStorage.clear()
    updateLoginInfo(initialConfig, true)
  }

  return (
    <Button variant="outlined" onClick={() => handleLogout()}>
      Logout
    </Button>
  )
}

export default GoogleLogout
