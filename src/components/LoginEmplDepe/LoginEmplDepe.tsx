import React, { ReactNode, RefObject } from "react";
import {
  useForm,
  RegisterOptions,
  Validate,
  ValidateResult,
} from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { EmployeeState, loginWithEmployeeCredentials } from "../../store/EmployeeData";

type EmployeeLoginForm = {
  employeeNumber: string;
  dependency: string;
};

// type LoginEmplDepeProps = {
//   handler: Function;
// };

const validateEmployeeNumber: Validate = (v: string): ValidateResult => {
  if (v.length == 0) return "Por favor introduce tu número de empleado";
  return true;
};

const validateDependency: Validate = (v: string): ValidateResult => {
  if (v.length == 0) return "Por favor introduce tu dependencia";
  return true;
};

const InputStyle1 =
  "bg-gray-50 focus:outline-none px-4 py-2 rounded-md transition-all duration-100 focus:ring focus:ring-offset-uanlBlue focus:border-uanlBlue";

export const LoginEmplDepe = () => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
  } = useForm<EmployeeLoginForm>();
  const { isSubmitting, isSubmitSuccessful, isSubmitted } = formState;
  const [{}, setEmployee] = useRecoilState(EmployeeState)
  const history = useHistory()

  const onSubmit = async (data: EmployeeLoginForm) => {
    try {
      const emp = await loginWithEmployeeCredentials(
        data.employeeNumber,
        data.dependency
      );
      setEmployee(emp)
      control.updateFormState({ isSubmitSuccessful: true });
      history.push('/inicio/fotos')
    } catch (error) {
      control.updateFormState({ isSubmitSuccessful: false });
    }
  };

  return (
    <div className="mx-4 flex justify-center">
      <div className="bg-white w-full md-1/3 lg:w-1/2 rounded-lg overflow-hidden pb-4">
        <header className="bg-uanlYellow p-4 text-white text-2xl text-center">
          Ingresar con tu número de dependencia y empleado
        </header>
        <section className="flex flex-col justify-center items-center pt-6">
          <form
            className="flex flex-col"
            name="employee-login-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              inputId="login-employeenumber"
              label="Número de empleado:"
              errorMsg={errors.employeeNumber?.message as string}
              hasError={null}
              inputEl={
                <input
                  name="employeeNumber"
                  className={InputStyle1}
                  id="login-employeenumber"
                  ref={register({ validate: validateEmployeeNumber })}
                  type="text"
                  placeholder="123456"
                ></input>
              }
            />
            <div className="py-4"></div>
            <InputField
              inputId="login-employeenumber"
              label="Dependencia:"
              errorMsg={errors.dependency?.message as string}
              hasError={null}
              inputEl={
                <input
                  name="dependency"
                  className={InputStyle1}
                  id="login-dependency"
                  ref={register({
                    validate: validateDependency,
                  })}
                  type="text"
                  placeholder="Preparatoria #"
                ></input>
              }
            />
            {isSubmitSuccessful === false && isSubmitted === true ? (
              <p className="mt-4">
                {" "}
                - Error al intentar acceder, por favor intentelo de nuevo
              </p>
            ) : null}
            <input
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-opacity-70" : ""
              } bg-uanlBlue self-end text-white px-4 py-2 rounded-md mt-6`}
              type="submit"
              value={isSubmitting ? "Accediendo..." : "Acceder"}
            />
          </form>
        </section>
      </div>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  hasError: boolean | null;
  errorMsg: string;
  inputEl: ReactNode;
  inputId: string;
  extraClasses?: string;
};

const InputField = ({
  label,
  hasError,
  errorMsg,
  inputEl,
  inputId,
  extraClasses,
}: InputFieldProps) => {
  return (
    <div className={`${extraClasses} flex flex-col md:flex-row justify-end`}>
      <label className="mr-4 mt-1" id={inputId} htmlFor="">
        {label}
      </label>
      <div className="flex flex-col">
        {inputEl}
        <div className="text-red-500 text-sm ml-2 h-2">{errorMsg}</div>
      </div>
    </div>
  );
};
