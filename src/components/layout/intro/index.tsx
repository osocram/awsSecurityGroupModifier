import { Flexbox, Typography } from '../../common'
import { DataparBrandLight } from 'assets'

const IntroSection = () => {
  return (
    <Flexbox
      fullHeight
      alignItems="flex-start"
      justifyContent="center"
      width="40vw"
      direction="column"
      gap="3rem"
    >
      <img src={DataparBrandLight} alt="Datapar" height="70px" />
      <Typography variant="h1" as="h1" color="white">
        AWS Security Group Modifier
      </Typography>
      <Typography variant="h4" as="h4">
        A simple tool to help you manage our AWS Security Groups.
      </Typography>
      <Typography variant="h5" as="h5">
        Here you can add or update your IP address to the Datapar security group.
      </Typography>
    </Flexbox>
  )
}

export default IntroSection
