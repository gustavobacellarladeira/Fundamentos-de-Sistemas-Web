import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/app/Dashboard/Dashboard";
import { Login } from "./screens/auth/Login/Login";
import { Signup } from "./screens/auth/Signup/Signup";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { darkTheme } from "./theme/dark";
import { lightTheme } from "./theme/light";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Layout } from "./layout/layout";
import { ProductsScreen } from "./screens/app/ProductsScreen/ProductsScreen ";
import { ServicesScreen } from "./screens/app/ServicesScreen/ServicesScreen";
import { BathBookingScreen } from "./screens/app/BathBookingScreen/BathBookingScreen";
import { PetRegistrationScreen } from "./screens/app/PetRegistrationScreen/PetRegistrationScreen";
import { VaccineBookingScreen } from "./screens/app/VaccineBookingScreen/VaccineBookingScreen";
import { TosaBookingScreen } from "./screens/app/TosaBookingScreen/TosaBookingScreen";
import { AvaliationBookingScreen } from "./screens/app/AvaliationBookingScreen/AvaliationBookingScreen";
import { Home } from "./screens/auth/Home/Dashboard";

interface ThemeContextProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

export const ThemeContext = React.createContext<ThemeContextProps | null>(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <Router>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />

                <Route
                  path="/"
                  element={
                    <PrivateRoutes>
                      <Dashboard />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/meus-produtos"
                  element={
                    <PrivateRoutes>
                      <ProductsScreen />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <PrivateRoutes>
                      <ServicesScreen />
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/pets"
                  element={
                    <PrivateRoutes>
                      <PetRegistrationScreen />
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/services/vacinas"
                  element={
                    <PrivateRoutes>
                      <VaccineBookingScreen />
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/services/tosas"
                  element={
                    <PrivateRoutes>
                      <TosaBookingScreen />
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/services/avaliacao"
                  element={
                    <PrivateRoutes>
                      <AvaliationBookingScreen />
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/services/banho"
                  element={
                    <PrivateRoutes>
                      <BathBookingScreen />
                    </PrivateRoutes>
                  }
                />
              </Routes>
            </Layout>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
