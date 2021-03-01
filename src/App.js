import "./App.css";
import Home from "./Containers/Home";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignUpConatiner from "./Containers/SignUpConatiner";
import SignInContainer from "./Containers/SignInContainer";
import { AuthProvider, PrivateRoute } from "./Components/Auth/useAuth";
import LinkContainer from "./Containers/LinkContainer";
import Covid19 from "./Containers/Covid19";
import LinkContainerPublic from "./Containers/LinkContainerPublic";
import AdminContainer from "./Containers/AdminContainer";
import AddAdminContainer from "./Containers/AddAdminContainer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUpConatiner />
            </Route>
            <Route path="/signin">
              <SignInContainer />
            </Route>
            <Route path="/covid">
              <Covid19 />
            </Route>
            <Route path="/admin">
              <AdminContainer />
            </Route>
            <Route path="/addadmin">
              <AddAdminContainer />
            </Route>
            <Route path="/link">
              <LinkContainerPublic />
            </Route>
            <PrivateRoute path="/links">
              <LinkContainer />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
