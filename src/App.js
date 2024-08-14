import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Income from "./components/Income";
import UpdateCategories from "./components/UpdateCategories";
import Total from "./components/Total";
import Expenses from "./components/Expenses";
import Error from "./components/Error";
import { ResponseProvider } from "./context/ResponseContext";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Expenses />,
      },
      {
        path: "/income",
        element: <Income />,
      },
      {
        path: "/total",
        element: <Total />,
      },
      {
        path: "/update-categories",
        element: <UpdateCategories />,
      },
    ],
  },
]);

function App() {
  return (
    <ResponseProvider>
      <RouterProvider router={appRoutes} />
    </ResponseProvider>
  );
}

export default App;
