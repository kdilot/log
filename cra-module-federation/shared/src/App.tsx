import "./App.css";
import Sample from "./Sample";
import { CounterProvider } from "./utils/context";
// import { CounterProvider, CounterContext } from "shared/Context";

function App() {
  return (
    <div className="App">
      <h1>Shared Page</h1>
      <CounterProvider>
        <Sample />
      </CounterProvider>
    </div>
  );
}

export default App;
