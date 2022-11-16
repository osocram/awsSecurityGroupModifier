import { Typography } from 'components/common'
import { createElement, FC } from 'react'
import { MessageProps } from './'

interface AppMessagesProps {
  message: MessageProps
}

const AppMessages: FC<AppMessagesProps> = ({ message }) => {
  return (
    <Typography variant="body1" color={message.variant}>
      {createElement('span', {
        dangerouslySetInnerHTML: { __html: message.message },
      })}
    </Typography>
  )
}

export default AppMessages
