import { googleLogout } from '@react-oauth/google'
import { Button } from 'components/common'
import { FC } from 'react'
import { MessageProps } from './'
import { AWSInfoProps, initialConfig } from './constants'
import { useTranslation } from 'react-i18next'

interface GoogleLogoutProps {
  updateLoginInfo: (info: Partial<AWSInfoProps>, reset?: boolean) => void
  updateMessage: ({ message, variant }: MessageProps) => void
}

const GoogleLogout: FC<GoogleLogoutProps> = ({ updateLoginInfo, updateMessage }) => {
  const { t } = useTranslation(['form', 'button'])
  const handleLogout = () => {
    updateMessage({ message: t('message.loggedOut', { ns: 'form' }), variant: 'primary' })
    googleLogout()
    localStorage.clear()
    updateLoginInfo(initialConfig, true)
  }

  return (
    <Button variant="outlined" onClick={() => handleLogout()}>
      {t('loggedOut', { ns: 'button' })}
    </Button>
  )
}

export default GoogleLogout
