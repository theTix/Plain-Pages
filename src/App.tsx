//react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//components
import Contact from './components/Contact';
import LogIn from './components/LogIn';
import MainLayout from './components/MainLayout';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';

//style
import './App.css';
import About from './components/About';
import Blogs from './components/Blogs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Welcome />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/blogs",
        element: <Blogs />
      }
    ]
  },
  {
    path: "/login",
    element: <LogIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
