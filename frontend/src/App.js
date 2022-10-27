
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import img from "./assets/background.jpg"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserDetails from "./components/UserDetails";

function App() {
  return (
 
      <Router>
        <div className="flex w-full h-screen">
          <div className=" w-full flex items-center justify-center lg:w-1/2">
            <Routes>
            <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
            </Routes>
        
          </div>
         <div className=" hidden relative lg:flex w-1/2 h-full items-center justify-center bg-gray-200">
          <img src={img} className=" absolute animate-pulse " alt="" />

         </div>
        </div>
      </Router>

     
  );
}

export default App;
