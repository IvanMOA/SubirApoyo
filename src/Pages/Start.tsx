import React, { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import uanlImg from "../assets/uanl.jpg";
import '../style/animations.css'
import { CSSTransition } from 'react-transition-group'


export const Start = () => {
  return (
    <div
      className="h-screen bg-cover overflow-hidden flex justify-center items-center"
      style={{
        backgroundImage: `url(${uanlImg})`,
        backgroundColor: "#3e7cb6",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="flex flex-col items-center text-white">
        <h1 className="text-6xl xl:text-7xl mb-8 text-center">
          Ingresa para apoyar 
        </h1>
        <Link
          to="/inicio"
          className="bg-uanlYellow text-2xl xl:text-3xl text-center rounded-2xl px-16 py-4"
        >
          Ingresar
        </Link>
      </div>
    </div>
  );
};
