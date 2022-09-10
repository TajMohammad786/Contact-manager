import Home from "./components/pages/Home"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import View from "./components/Contacts/View"
import Edit from "./components/Contacts/Edit"
function App() {
  return (
    <>
       <BrowserRouter>
           <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/view/:id" component={View}></Route>
              <Route exact path="/edit/:id" component={Edit}></Route>
           </Switch>

       </BrowserRouter>
    </>
  );
}

export default App;
