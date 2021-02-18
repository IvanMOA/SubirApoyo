import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginEmplDepe } from "../components/LoginEmplDepe/LoginEmplDepe";
import { UploadDocuments } from "../components/UploadDocuments/UploadDocuments";
import { PrivateRoute } from "../components/CustomRoutes/PrivateRoute";
import { Support } from "../components/Support/Support";
import { Thanks } from "../components/Thanks/Thanks";

export const Home: React.FC = () => {
  return (
    <div className="h-full">
      <div className="bg-gray-50 h-screen flex flex-col justify-between align-center">
        <Navbar />
        <div className="home-router-container flex flex-col align-center justify-center h-full w-full">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={`/inicio/credenciales`}
                render={() => <LoginEmplDepe />}
              />
              <PrivateRoute
                path="/inicio/fotos"
                Component={UploadDocuments}
                exact={true}
              />
              <PrivateRoute
                path="/inicio/apoyar"
                Component={Support}
                exact={true}
              />
              <PrivateRoute
                path="/inicio/gracias"
                Component={Thanks}
                exact={true}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};
