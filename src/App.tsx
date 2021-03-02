import React, { ReactNode } from "react";
import { ColorPicker } from "./components/colorPicker";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <ColorPickerField></ColorPickerField>
      </Sidebar>
    </div>
  );
}

function ColorPickerField() {
  return (
    <li className="m-0 w-full flex flex-row pt-2.5 pr-1.5 pb-0 pl-1.5">
      <label className="w-28">Text Color</label>
      <ColorPicker
        theme="default"
        color="#000000"
        className="w-48"
        width={48}
        zIndex={50}
      />
    </li>
  );
}

interface sideBarProps {
  children: ReactNode;
}

function Sidebar({ children }: sideBarProps) {
  return (
    <div className="flex flex-row flex-grow overflow-x-hidden">
      <div
        style={{ background: "#2f353a" }}
        className="flex flex-col p-0 w-80 text-white lg:fixed lg:z-50 lg:h-screen h-screen block "
      >
        <div className="flex flex-col w-full h-full">
          <form className="overflow-y-auto">
            <div
              id="sideBarTabs"
              className="flex flex-col flex-auto h-full overflow-y-auto pb-6"
            >
              <div className="relative h-full">
                <div className="h-full block">
                  <ul className="flex flex-col pb-6">{children}</ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
