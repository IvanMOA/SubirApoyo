import React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { EmployeeState } from "../../store/EmployeeData";

type PrivateRouteProps = {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
};
export const PrivateRoute = ({ Component, path, exact }: PrivateRouteProps) => {
  const [employee] = useRecoilState(EmployeeState);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        !!employee.employeeNumber ? (
          <Component {...props} />
        ) : (
          <Redirect to="/inicio/credenciales" />
        )
      }
    />
  );
};
