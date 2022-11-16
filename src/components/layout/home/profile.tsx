import { Flexbox, Typography } from 'components/common'
import { FC } from 'react'
import { AWSInfoProps } from './constants'
import { useTranslation } from 'react-i18next'

interface UserProfileProps {
  awsInfo: AWSInfoProps
}

const UserProfile: FC<UserProfileProps> = ({ awsInfo }) => {
  const { t } = useTranslation('profile')
  return (
    <Flexbox direction="row" alignItems="center" gap="1rem" noWrap>
      <img
        src={awsInfo.picture}
        alt="profile"
        onError={(e: any) => {
          e.target.onerror = null
          e.target.src = 'https://www.gravatar.com/avatar/?d=mp'
        }}
      />
      <Typography variant="h5" color="white">
        {t('welcome', { name: awsInfo.name })}

        <br />
        <Typography variant="body2" as="span" color="white">
          <strong>{awsInfo.email}</strong>
        </Typography>
      </Typography>
    </Flexbox>
  )
}

export default UserProfile
