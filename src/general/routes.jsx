import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from './../pages/Dashboard';
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Ticketing from "../pages/Ticketing/Index.jsx";
import TicketingCategories from "../pages/TicketingCategories/Index.jsx";
import ViewTicket from "../pages/Ticketing/ViewTicket.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import CreateTicket from "../pages/Ticketing/CreateTicket.jsx";
import UsersIndex from "../pages/Users/Index.jsx";
import RolesIndex from "../pages/Roles/Index.jsx";
import PermissionsIndex from "../pages/Permissions/Index.jsx";
import DepartmentsIndex from "../pages/Departments/Index.jsx";
import PrintTicket from "../pages/Ticketing/PrintTicket.jsx";

export const AppRouter = () => {
    return (
      <Routes>
          <Route index path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<Login />} />

          <Route path=':tenant/admin' element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="ticketing" element={<Ticketing />} />
              <Route path="ticketing/create" element={<CreateTicket />} />
              <Route path="ticketing/categories" element={<TicketingCategories />} />
              <Route path="ticketing/departments" element={<DepartmentsIndex />} />

              <Route path="ticketing/:ticketId" element={<ViewTicket />}/>

              <Route path="users" element={<UsersIndex />}/>
              <Route path="users/roles" element={<RolesIndex />}/>
              <Route path="users/roles/permissions" element={<PermissionsIndex />}/>
          </Route>

          <Route path=":tenant/admin/ticketing/:ticketId/print" element={<PrintTicket />}/>

          <Route path="*" element={<NotFound/>} />
      </Routes>
    );
}