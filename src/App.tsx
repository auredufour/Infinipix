import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components/layout/layout.component'
import { HomePage } from './features/photos/pages/home.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
