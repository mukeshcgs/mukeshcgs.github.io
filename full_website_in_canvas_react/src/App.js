import React, { useRef, useEffect } from "react";

// Import all of PixiJS and use like PIXI.Application
import * as PIXI from "pixi.js";

// Import just what you need from PixiJS
// import { Application } form "pixi.js"

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x5BBA6F,
});

function App() {
  const ref = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);

  return <div ref={ref} />;
}
export default App;
