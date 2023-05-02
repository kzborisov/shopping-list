import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

function App() {


    const router = createBrowserRouter([
        {
            path: "shopping-list/",
            element: <HomePage />,
        },
        {
            path: "shopping-list/login",
            element: <LoginPage />,
        },
        {
            path: "shopping-list/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        <div className='flex flex-col items-center'>
            <RouterProvider router={router} />
        </div >
    )
}
;
export default App
