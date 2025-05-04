
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './utils/Router'
import { RouterProvider } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './context/auth.storage.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>,
)

