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
import Blog from './components/Blog';
import ListOfArticles from './components/ListOfArticles';
import SelectiveListOfArticles from './components/SelectiveListOfArticles';

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
        element: <Blogs />,
        children: [
          {
            path: "/blogs/category/:categoryId",
            element: <SelectiveListOfArticles />
          },
          {
            path: "/blogs/",
            element: <ListOfArticles />
          }
        ]
      },
      {
        path: "/blogs/:blogId",
        element: <Blog />
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
