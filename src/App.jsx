import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./lib/theme-context";
import Routes from "./Routes";
import "./styles/tailwind.css";
import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <Routes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;