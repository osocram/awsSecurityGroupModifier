export interface AWSInfoProps {
  ip?: string
  email?: string
  name?: string
  picture?: string
  loggedIn?: boolean
  signInRejected?: boolean
}

export const initialConfig: AWSInfoProps = {
  loggedIn: false,
  signInRejected: true,
}
