import { useState } from 'react'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import Page8 from './pages/Page8'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import Loader from './components/Loader'

function App() {
  const [loaderComplete, setLoaderComplete] = useState(false)

  return (
    <div className="w-full min-h-screen overflow-y-hidden overflow-x-hidden">
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}
      <SmoothScroll disabled={!loaderComplete} />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      <Page8 />
      <Footer />
    </div>
  )
}

export default App