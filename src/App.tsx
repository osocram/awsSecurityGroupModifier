import LanguageSelector from 'components/common/language'
import { Flexbox, IntroSection, Home } from './components'

function App() {
  return (
    <>
      <LanguageSelector />
      <Flexbox fullScreen justifyContent="space-evenly">
        <IntroSection />
        <Home />
      </Flexbox>
    </>
  )
}

export default App
