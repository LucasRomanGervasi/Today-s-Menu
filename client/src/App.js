import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import CreateRecipe from './Components/CreateRecipe';
import DetailsRecipe from './Components/DetailsRecipe';
import Contact from './Components/Contact';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <Switch>  
        <Route exact path = '/' component= {LandingPage}/>
        <Route exact path = '/home/' component ={Home}/>
        <Route exact path = '/recipe' component={CreateRecipe}/>
        <Route path = '/home/:id' component={DetailsRecipe}/>
        <Route path = '/contact' component={Contact}/>
      </Switch>
    </div>
    </BrowserRouter>
 
  );
}


export default App;
