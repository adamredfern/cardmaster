import { Provider } from 'react-redux'
import { store } from 'redux/store'
import type { AppProps } from 'next/app'
import { Dashboard } from 'components/layouts/Dashboard'

import 'styles/reset.scss'
import 'styles/global.scss'
import 'styles/typography.scss'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </Provider>
  )
}
