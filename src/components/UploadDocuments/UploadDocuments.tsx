import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useRecoilState } from "recoil";
import { EmployeeState } from "../../store/EmployeeData";
import { UploadGafette } from "./UploadGafette";
import { UploadProfilePhoto } from "./UploadProfilePhoto";

type TabProps = {
  index: number;
  value: number;
  label: string;
  onTabChange: (newIndex: number) => void;
};
const Tab = ({ onTabChange, index, value, label }: TabProps) => {
  const isSelected = value === index;

  return (
    <button
      className={`${
        isSelected ? "border-uanlBlue" : "border-gray-100"
      } transition-all duration-3000 border-b-2 w-full p-4 focus:outline-none`}
      onClick={() => onTabChange(index)}
    >
      {label}
    </button>
  );
};

type TabPanelProps = {
  index: number;
  value: number;
  children: ReactNode;
  onEnter: () => void;
};
const TabPanel = ({ children, index, value, onEnter }: TabPanelProps) => {
  const isSelected = value === index;
  return <div>{children}</div>;
};

export const UploadDocuments = () => {
  const [tabValue, setTabValue] = useState(0);
  const history = useHistory()
  const cardRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [ employee ] = useRecoilState(EmployeeState)
  useEffect(() => {
    calcHeight();
    setTimeout(() => {
      calcHeight();
    }, 500);
  }, []);
  const calcHeight = () => {
    if (!cardRef.current) return;
    const els = cardRef.current.childNodes as NodeListOf<HTMLDivElement>;
    let totalH = 0;
    els.forEach((el) => {
      console.log(el);
      console.log(el.offsetHeight);

      totalH += el.clientHeight;
    });
    setHeight(totalH);
  };

  const firstSelected = tabValue === 0;
  const secondSelected = tabValue === 1;

  const timeout = 100;
  
  const documentsUploadedToStorage = () => {
    const profileInStorage = employee.photoURL.includes('firebase')
    const gafetteInStorage = employee.gafettePhotoURL.includes('firebase')
    return profileInStorage && gafetteInStorage
  }

  return (
    <div className="mx-4 flex justify-center transition-all relative">
      <div
        style={{ height: height || "auto" }}
        ref={cardRef}
        className="bg-white w-full md-1/3 lg:w-1/2 rounded-lg pb-4 transition-all duration-1000 overflow-hidden"
      >
        <div className="bg-uanlYellow p-4 text-white text-2xl text-center">
          Carga de documentos
        </div>
        <div className="tabs w-full flex ">
          <Tab
            value={tabValue}
            label="Subir fotografía"
            index={0}
            onTabChange={setTabValue}
          />
          <Tab
            value={tabValue}
            label="Subir gafete"
            index={1}
            onTabChange={setTabValue}
          />
        </div>
        <div className="pt-6 flex relative justify-center items-center pb-4">
          <CSSTransition
            in={firstSelected}
            timeout={timeout}
            onEnter={calcHeight}
            classNames="slidehorizontal"
            unmountOnExit
          >
            <UploadProfilePhoto />
          </CSSTransition>
          <CSSTransition
            in={secondSelected}
            timeout={timeout}
            onEnter={calcHeight}
            classNames="slidehorizontal"
            unmountOnExit
          >
            <UploadGafette />
          </CSSTransition>
        </div>
      </div>
      <div className="absolute -bottom-20 flex flex-col justify-items-center items-center">
        <button disabled={!documentsUploadedToStorage()} onClick={ () => history.push('/inicio/apoyar')} className="border-uanlBlue border-2 rounded-md px-2 py-1">Ir a apoyar</button>
        <h1 className="text-sm mt-2">Se necesitan subir ambos documentos </h1>
      </div>
    </div>
  );
};
 