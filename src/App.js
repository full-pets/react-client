import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/list-users",
    component: Users,
  }
];

function App() {
  return (
    <div id='app' className='col-12'>
      <Router>
        <div>
          <Switch>
            {routes.map((route, i) => (
              <Route exact key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
