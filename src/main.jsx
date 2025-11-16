import { createRoot } from 'react-dom/client'
import './index.css'
import '@/locales/i18n.js'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store.js';
import {ThemeProvider} from "@/utils/ThemeProvider.jsx";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider />
        <App />
    </PersistGate>
  </Provider>,
)
