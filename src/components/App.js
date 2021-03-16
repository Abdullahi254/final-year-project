import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ActiveConsoles from './activeConsoles/ActiveConsoles'
import ManageConsoles from './manageConsoles/ManageConsoles'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute/PrivateRoute'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/settings" component={ManageConsoles}/>
            <PrivateRoute path="/" component={ActiveConsoles} />
          </Switch>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
