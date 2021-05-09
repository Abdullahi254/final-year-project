import SignUp from './signUp/SignUp'
import Login from './login/Login'
import ActiveConsoles from './activeConsoles/ActiveConsoles'
import ManageConsoles from './manageConsoles/ManageConsoles'
import IdleConsoles from './idleConsoles/IdleConsoles'
import Scanner from './Scanner/Scanner'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute/PrivateRoute'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../store/reducer'

function App() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/scanner" component={Scanner}/>
            <PrivateRoute path="/settings" component={ManageConsoles} />
            <PrivateRoute path="/idleconsoles" component={IdleConsoles} />
            <PrivateRoute path="/" component={ActiveConsoles} />
          </Switch>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
