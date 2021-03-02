//import { useEffect } from "react";
import { createPortal } from "react-dom";

interface portalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: portalProps) => {
  //let el = document.createElement("div") as HTMLDivElement;

  return createPortal(children, document.body);
};

export default Portal;
