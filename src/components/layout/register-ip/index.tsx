import axios from 'axios'
import { Button, LoaderSpinner } from 'components/common'
import { FC, useState } from 'react'
import { MessageProps } from '../home'
import { AWSInfoProps } from '../home/constants'
import { useTranslation } from 'react-i18next'

const convertString = (str: string) => {
  return decodeURIComponent(JSON.parse('"' + str.replace(/"/g, '\\"') + '"')).replaceAll(
    '"',
    '',
  )
}

interface RegisterIPProps {
  updateMessage: ({ message, variant }: MessageProps) => void
  awsInfo: AWSInfoProps
}

const RegisterIP: FC<RegisterIPProps> = ({ awsInfo, updateMessage }) => {
  const { t } = useTranslation('button')
  const [loading, setLoading] = useState(false)

  const handleRegisterIPonAWS = async () => {
    setLoading(true)
    const { data } = await axios.put(
      process.env.REACT_APP_URL_API!,
      {
        key1: awsInfo.ip,
        key2: awsInfo.name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const hasError = data.statusCode === 400
    updateMessage({
      message: convertString(data.body),
      variant: hasError ? 'primary' : 'secondary',
    })
    setLoading(false)
  }

  return (
    <Button onClick={() => handleRegisterIPonAWS()}>
      {loading ? (
        <>
          <LoaderSpinner size={16} /> &nbsp; {t('loading')}
        </>
      ) : (
        t('updateSG')
      )}
    </Button>
  )
}

export default RegisterIP
