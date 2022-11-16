import 'translations/i18n'
import Button from '../button'
import { LanguageLink, StyledLanguageSelector } from './styles'

import { useTranslation } from 'react-i18next'
import { availableLanguages } from 'translations/i18n'

export type LanguageProps = {
  active: boolean
}

const LanguageSelector = (): JSX.Element => {
  const { i18n } = useTranslation()

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }
  return (
    <StyledLanguageSelector>
      {availableLanguages.map((locale, key) => (
        <LanguageLink key={key}>
          <Button
            aria-describedby={locale}
            size="small"
            variant="text"
            key={locale}
            onClick={() => handleChangeLanguage(locale)}
          >
            {locale}
          </Button>
        </LanguageLink>
      ))}
    </StyledLanguageSelector>
  )
}

export default LanguageSelector
