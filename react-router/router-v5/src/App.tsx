import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
  Header,
  Home,
  NotFound,
  Product,
  ProductId,
  ProductIdComment,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/redirect/home" exact component={Home} />
        <Route path="/product" exact component={Product} />
        <Route path="/product/:id" exact component={ProductId} />
        <Route path="/product/:id/comment" exact component={ProductIdComment} />
        <Redirect from="/redirect" to="/redirect/home" />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
