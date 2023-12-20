import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import store from '../src/store.jsx'
import '/public/dist/css/adminlte.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  
<CookiesProvider>
<Provider store={store}>
  <App />

</Provider>
</CookiesProvider>
  )