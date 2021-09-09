import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";
import Videos from "./Videos";
import Nav from "./Nav";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/list-users",
    component: Users,
  },
  {
    path: "/videos",
    component: Videos,
  }
];

function App() {
  return (
    <div id='app' className='col-12'>

      <Router>
        <Nav/>
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
