import { atom } from "recoil";
import { firestore, photosRef } from "../firebase";
import { DocumentSnapshot } from "@firebase/firestore-types";
const employeesCollection = firestore.collection("employees");

export interface Employee {
  employeeNumber: string;
  dependency: string;
  photoURL: string;
  gafettePhotoURL: string;
  supported: boolean;
}

export const EmployeeState = atom<Employee>({
  key: "employee",
  default: {
    employeeNumber: "",
    dependency: "",
    photoURL: "",
    gafettePhotoURL: "",
    supported: false,
  },
});

export const getEmployee = async (
  employeeNumber: string,
  dependency: string
) => {
  const doc = await employeesCollection.doc(employeeNumber + dependency).get();
  return doc;
};

export const createNewEmployee = async (employee: Employee) => {
  await employeesCollection
    .doc(employee.employeeNumber + employee.dependency)
    .set(employee);
  return employee;
};

export const updatePhotoURL = async (
  employeeNumber: string,
  dependency: string,
  photoURL: string
) => {
  await employeesCollection
    .doc(employeeNumber + dependency)
    .update({ photoURL: photoURL });
};

export const updateGafettePhotoURL = async (
  employeeNumber: string,
  dependency: string,
  gafettePhotoURL: string
) => {
  await employeesCollection
    .doc(employeeNumber + dependency)
    .update({ gafettePhotoURL });
};

export const loginWithEmployeeCredentials = async (
  employeeNumber: string,
  dependency: string
): Promise<Employee> => {
  let emp;
  const doc = await getEmployee(employeeNumber, dependency);
  if (!doc.exists) {
    emp = await createNewEmployee({
      dependency,
      employeeNumber,
      photoURL: "",
      gafettePhotoURL: "",
      supported: false,
    });
  } else {
    emp = doc.data() as Employee;
  }
  return emp;
};

export const submitSupport = async (employeeNumber: string, dependency: string) => {
  await employeesCollection.doc(employeeNumber+dependency).update({ supported: true });
};
