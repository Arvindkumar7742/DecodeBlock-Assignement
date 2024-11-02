import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import { BlogPage } from './Blog/BlogPage';
import NotFoundPage from './pages/NotFoundPage';
import { ROLE_TYPE } from './utils/RoleType';
import MyProfile from './dashboard/MyProfile';
import { Settings } from "./dashboard/Settings/Settings";
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from "./pages/PrivateRoute"
import { UserDashboard } from './dashboard/user/UserDashboard';

function App() {

  const user = JSON.parse(localStorage.getItem("blog-user"));

  return (
    <div className="text-center">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blogs' element={<BlogPage />} />

          <Route
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
            <Route path="/dashboard/settings" element={<Settings />}></Route>
            {
              user?.role == ROLE_TYPE.user &&
              <>
                <Route path="/dashboard/user"
                element={<UserDashboard />}
              ></Route>
             
              </>
            }

            {
              user?.role == ROLE_TYPE.admin &&
              <>
                {/* <Route path="/dashboard/my-courses"
                element={<MyCourses />}
              ></Route> */}
              </>
            }
          </Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
