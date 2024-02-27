import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import House from "./pages/House";
import Business from "./pages/Business";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/house",
        element: <House />,
      },
      { path: "/business", element: <Business /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
