import { Flexbox, Typography } from '../../common'
import { DataparBrandLight } from 'assets'
import { useTranslation } from 'react-i18next'

const IntroSection = () => {
  const { t } = useTranslation('home')
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
        {t('title')}
      </Typography>
      <Typography variant="h4" as="h4">
        {t('title.two')}
      </Typography>
      <Typography variant="h5" as="h5">
        {t('title.three')}
      </Typography>
    </Flexbox>
  )
}

export default IntroSection
