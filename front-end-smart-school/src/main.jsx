
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import store from '../src/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
<CookiesProvider>
<Provider store={store}>
  <App />

</Provider>
</CookiesProvider>
  )