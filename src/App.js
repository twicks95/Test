import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Master from "./pages/main/Master/Master";
import Add from "./pages/main/Add/Add";
import Edit from "./pages/main/Edit/Edit";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Master} />
        <Route path="/karyawan/add" exact component={Add} />
        <Route path="/karyawan/edit/:id" exact component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
