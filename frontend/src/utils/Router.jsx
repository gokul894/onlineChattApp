
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Contact from "../components/Contact.jsx";
import About from "../components/About.jsx";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import Ragister from "../components/Ragister.jsx";
import Dashboard from "../components/Dashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Logout from "../components/Logout.jsx";


export const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={ <Layout/> }>
            <Route path="" element={ <Home/> } />
            <Route path="contact" element={ <Contact/> } />
            <Route path="about" element={ <About /> } />
            <Route path="login" element={ <Login/> } />
            <Route path="ragister" element={ <Ragister/> } />
            <Route path="logout" element={ <Logout/> } />
        </Route>

        <Route 
        path="/dashboard" 
        element={
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
        }
        />

        </>
    )
);

