import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './MainLayout/Root.jsx';
import UserDetail from './components/UserDetail.jsx';
import UpdateUser from './components/UpdateUser.jsx';
let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index: true, Component: App},
      {
        path: 'detail/:id',
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
        Component: UserDetail
      },
      {
        path: 'update/:id',
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
        Component: UpdateUser
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
