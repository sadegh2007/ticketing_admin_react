import { Routes, Route } from "react-router-dom";
import Dashboard from './../pages/Dashboard';
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Ticketing from "../pages/Ticketing/Index.jsx";
import TicketingCategories from "../pages/TicketingCategories/Index.jsx";
import ViewTicket from "../pages/Ticketing/ViewTicket.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import CreateTicket from "../pages/Ticketing/CreateTicket.jsx";
import UsersIndex from "../pages/Users/Index.jsx";

export const AppRouter = () => {
    return (
      <Routes>
          <Route path="/login" element={<Login />} />

          <Route path='/admin' element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="ticketing" element={<Ticketing />} />
              <Route path="ticketing/create" element={<CreateTicket />} />
              <Route path="ticketing/categories" element={<TicketingCategories />} />

              <Route path="ticketing/:ticketId" element={<ViewTicket />}/>

              <Route path="users" element={<UsersIndex />}/>
          </Route>

          <Route path="*" element={<NotFound/>} />
      </Routes>
    );
}