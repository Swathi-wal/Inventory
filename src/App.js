//import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicRootLayout from './components/publicRootLayout/PublicRootLayout';
import Login from './components/login/Login';
import ErrorPage from './components/ErrorPage';
import Register from './components/register/Register'
//import SellerDashboard from './components/sellerDashboard/SellerDashboard';
import LeftNavbar from './components/leftnavbar/LeftNavbar';
import CreateProduct from './components/seller/CreateProduct';
import UpdateProduct from './components/seller/UpdateProduct';
import GetProducts from './components/seller/GetProducts';
import CreateOrder from './components/customer/CreateOrder';
// import { FaTh, FaShoppingBag } from "react-icons/fa";
import CustomerDashboard from './components/customerDashboard/CustomerDashboard';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import GetSellers from './components/sellerDashboard/GetSellers';
import CreatePayment from './components/customer/CreatePayment';
import OrderDetails from './components/customer/OrderDetails';
import GetCustomers from './components/admin/GetCustomers';
import Statistics from './components/admin/Statistics';
import Cart from './components/customer/Cart';
function App() {
  //create browser router object
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <PublicRootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "/seller",
          element: <LeftNavbar />,
          children: [
            {
              path: "createproduct",
              element: <CreateProduct />

            },
            {
              path: "updateproduct",
              element: <UpdateProduct />

            },
            {
              path: "getproducts",
              element: <GetProducts />
            },
            {
              path: "/seller",
              element: <GetProducts />
            }
          ]
        },
        {
          path: "/customer",
          element: <CustomerDashboard />,
          children: [
            {
              path: "getproducts",
              element: <GetProducts />
            },
            {
              path: "orders",
              element: <CreateOrder />
            },
            {
              path: "/customer",
              element: <GetProducts />
            },
            {
              path: "payment",
              element: <CreatePayment />
            }, {
              path: "orderdetails",
              element: <OrderDetails />
            },{
              path:"cart",
              element:<Cart/>
            }

          ]
        },
        {
          path: "/admin",
          element: <AdminDashboard />,
          children: [
            {
              path: "sellers",
              element: <GetSellers />
            }, {
              path: "dashboard",
              element: <Statistics />
            }, {
              path: "customers",
              element: <GetCustomers />
            }
          ]
        }

      ]
    },

  ])
  return (
    <div>
      {/* provide to app */}
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

export default App;
