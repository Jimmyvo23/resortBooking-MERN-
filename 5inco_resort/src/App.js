import "./App.css";
import Home from "./pages/Home";
import Cabins from "./pages/Cabins";
import Services from "./pages/Services";
import SingleCabin from "./pages/SingleCabin";
import Error from "./pages/Error";
import NavBar from "./components/NavBar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cabins/" component={Cabins} />
        <Route exact path="/services/" component={Services} />
        <Route exact path="/cabins/:slug" component={SingleCabin} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
