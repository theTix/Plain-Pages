//react
import { useContext } from "react";

//react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//components
import Contact from './components/Contact';
import LogIn from './components/LogIn';
import MainLayout from './components/MainLayout';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';

//context
import userContext, { useAuth } from "./contexts/context";

//style
import './App.css';
import About from './components/About';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import ListOfArticles from './components/ListOfArticles';
import SelectiveListOfArticles from './components/SelectiveListOfArticles';
import Profile from './components/Profile';
import Error from './components/Error';

const routerNotAuthorized = createBrowserRouter([
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
        path: "*",
        element: <Error />
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

const routerAuthorized = createBrowserRouter([
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
        ],
      },
      {
        path: "/blogs/:blogId",
        element: <Blog />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "*",
        element: <Error />
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
  const { username } = useContext(userContext);
  const { authorized } = useAuth();
  
  return (
    <>
      <RouterProvider router={authorized && username !== null ? routerAuthorized : routerNotAuthorized} />
    </>
  )
}

export default App
