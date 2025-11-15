import { createRoot } from 'react-dom/client'
import './index.css'
import '@/locales/i18n.js'
import App from './App.jsx'
import {ThemeProvider} from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
