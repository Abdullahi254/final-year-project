import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ActiveConsoles from './activeConsoles/ActiveConsoles'
import ManageConsoles from './manageConsoles/ManageConsoles'
import IdleConsoles from './idleConsoles/IdleConsoles'
import Scanner from './Scanner/Scanner'
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
            <PrivateRoute path="/settings" component={ManageConsoles} />
            <PrivateRoute path="/idleconsoles" component={IdleConsoles} />
            <PrivateRoute path="/payment/console/:id/:time/:price" component={Scanner} />
            <PrivateRoute path="/" component={ActiveConsoles} />
          </Switch>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
