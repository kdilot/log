import React, { Suspense } from "react";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Host from "./pages/host";
import HostSub from "./pages/host-sub";
import { CounterProvider } from "shared/Context";
import styled from "styled-components";

const Remote = React.lazy(() => import("remote/Remote"));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary fallback={<div>error</div>}>
                <Suspense fallback={<div>loading</div>}>
                  <CounterProvider>
                    <Host />
                    <Divider />
                    <Remote />
                  </CounterProvider>
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/sub"
            element={
              <ErrorBoundary fallback={<div>error</div>}>
                <Suspense fallback={<div>loading</div>}>
                  <HostSub />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Divider = styled.div`
  width: 100%;
  height: 8px;
  margin: 8px 0;
  background: #f2f2f2;
`;

export default App;
