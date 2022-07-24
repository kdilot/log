import React, { Suspense } from "react";
import "./App.css";
import Remote from "./pages/remote";
import { CounterProvider } from "shared/Context";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading remote</div>}>
        <CounterProvider>
          <Remote />
        </CounterProvider>
      </Suspense>
    </div>
  );
}

export default App;
