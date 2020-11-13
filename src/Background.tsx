import React, { useState, useEffect, useContext } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface IProps {
  mousePosition: number;
}

function Background(props: IProps) {
  return (
    // tslint:disable-next-line: max-line-length
    <svg
      width="100%"
      height="100%"
      viewBox={"0 0 " + window.screen.width + " " + window.screen.height}
      fill={"black"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#9c2f2f"
        transform={"translate(" + (props.mousePosition / 50 - 100) + ",0)"}
        d={
          "M 500 0" +
          " L " +
          window.screen.width +
          " " +
          window.screen.height +
          " L 0 " +
          window.screen.height +
          " L 0 0 Z"
        }
      ></path>
      <path
        fill="#363636"
        d={
          "M 0 " +
          window.screen.height +
          " L 0 "+(1300/1600)*window.screen.height+
          " S +"+(300/2560)*window.screen.width+" "+(1000/1600)*window.screen.height+", "+(1000/2560)*window.screen.width+" "+(1200/1600)*window.screen.height+" S "+(1800/2560)*window.screen.width+" "+(800/1600)*window.screen.height+", " +
          window.screen.width +
          " " +
          window.screen.height * 0.6 +
          " L " +
          window.screen.width +
          " " +
          window.screen.height +
          " Z"
        }
      ></path>
    </svg>
  );
}

export default function BackgroundComponent({background} : { background: string }) {

  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
      x: 0,
      y: 0,
    });

    const updateMousePosition = (ev: any) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    useEffect(() => {
      window.addEventListener("mousemove", updateMousePosition);

      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition || { x: 0, y: 0 };
  };

  function renderSVG(pos: number) {
    return encodeURIComponent(
      renderToStaticMarkup(<Background mousePosition={pos} />)
    );
  }

  let mousePosition = useMousePosition();

  return (
    <>
      <div
        style={{
          background:
            background ? "" : "#393975",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: -101,
        }}
      ></div>
      <div
        style={{
          backgroundImage: background ? "" : `url("data:image/svg+xml,${renderSVG(
            mousePosition.x
          )}")`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: -100,
        }}
      >
      </div>
    </>
  );
}
