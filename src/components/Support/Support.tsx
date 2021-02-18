import { useHistory } from "react-router";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { EmployeeState, submitSupport } from "../../store/EmployeeData";

export const Support = () => {
  const [employee, setEmployeeState] = useRecoilState(EmployeeState);
  const history = useHistory();
  const onSubmitSupport = async () => {
    await submitSupport(employee.employeeNumber);
    setEmployeeState((e) => ({ ...e, supported: true }));
    history.push("/inicio/gracias");
  };
  return (
    <div className="mx-4 flex justify-center transition-all relative">
      <div className="bg-white w-full sm:w-1/2 md-1/3 lg:w-1/4 rounded-lg pb-4 transition-all duration-1000 overflow-hidden flex flex-col">
        <img
          className="w-full"
          src="https://pbs.twimg.com/profile_images/1349078757181685760/clEYXIy1_400x400.jpg"
          alt=""
        />
        <h1 className="border-l-8 border-uanlYellow text-2xl mt-2 pl-4">
          Nombre Del Candidato{" "}
        </h1>
        <button onClick={onSubmitSupport } className="bg-uanlBlue text-white px-4 py-2 text-lg mt-2">
          Apoyar
        </button>
      </div>
    </div>
  );
};
