
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './utils/Router'
import { RouterProvider } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './context/index.js';
import { SocketProvider } from './sockets/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketProvider>
      <RouterProvider router={Router} />
    </SocketProvider>
  </Provider>,
)

