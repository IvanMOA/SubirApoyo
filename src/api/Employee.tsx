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

interface EmployeeAPI {
  getEmployee(empNum: string, dependency: string): Promise<DocumentSnapshot>;
  createNewEmployee(emp: Employee): Promise<Employee>;
  updatePhotoURL(
    empNum: string,
    dependency: string,
    photoURL: string
  ): Promise<void>;
  updateGafetteURL(
    empNum: string,
    dependency: string,
    photoURL: string
  ): Promise<void>;
  loginWithEmployeeCredentials(
    empNum: string,
    dependency: string
  ): Promise<Employee>;
  submitSupport(empNum: string, dependency: string): Promise<void>;
}

class FirebaseEmployeeAPI implements EmployeeAPI {
  async getEmployee(
    empNum: string,
    dependency: string
  ): Promise<DocumentSnapshot> {
    const doc = await employeesCollection.doc(empNum + dependency).get();
    return doc;
  }
  async createNewEmployee(emp: Employee): Promise<Employee> {
    await employeesCollection.doc(emp.employeeNumber + emp.dependency).set(emp);
    return emp;
  }
  async updatePhotoURL(
    empNum: string,
    dependency: string,
    photoURL: string
  ): Promise<void> {
    await employeesCollection
      .doc(empNum + dependency)
      .update({ photoURL: photoURL });
  }
  async updateGafetteURL(
    empNum: string,
    dependency: string,
    gafettePhotoURL: string
  ): Promise<void> {
    await employeesCollection
      .doc(empNum + dependency)
      .update({ gafettePhotoURL });
  }
  async loginWithEmployeeCredentials(
    empNum: string,
    dependency: string
  ): Promise<Employee> {
    let employee;
    const doc = await this.getEmployee(empNum, dependency);
    if (!doc.exists) {
      employee = await this.createNewEmployee({
        dependency,
        employeeNumber: empNum,
        photoURL: "",
        gafettePhotoURL: "",
        supported: false,
      });
    } else {
      employee = doc.data() as Employee;
    }
    return employee;
  }
  async submitSupport(empNum: string, dependency: string): Promise<void> {
    await employeesCollection
      .doc(empNum + dependency)
      .update({ supported: true });
  }
}

export const EmployeeAPI =  new FirebaseEmployeeAPI()