import React from "react";
import { Redirect, RouteComponentProps, useHistory } from "react-router";
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
  const history = useHistory()
  if(employee.supported && !history.location.pathname.includes('gracias'))  history.push('/inicio/gracias')
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
