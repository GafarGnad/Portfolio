import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Text,PresentationControls, ContactShadows, useGLTF,Html,Float } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { styles } from "../../styles";
import { DirectionalLightHelper } from "three";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/model.gltf");

  return <>
 <Suspense  position ={ isMobile ? [0.5,-1.2,0] :[0,-1.2,0]} fallback = {<CanvasLoader/>} >
        <ambientLight/>
        <directionalLight position={[1, 0, 1]} intensity={5}/>

        <PresentationControls 
        global
        rotation={[0.13,0.1,0]}
        polar={[-0.4,0.2]}
        azimuth={[-1,0.75]}
        config={{mass:2,tension:400}}
        snap={{mass:2,tension:400}}
        >
        <Float rotationIntensity={0.9} >
        
        <primitive 
        object={ computer.scene }
        position ={ isMobile ? [0.5,-1.2,-0.4] :[0,-2.2,0]}
        scale = {isMobile? 0.6 :1.2}
        >
            <Html
            transform
            wrapperClass='htmlscreen'
            distanceFactor={3.8}
            position={[-0.07,1.56,-1.4]}
            rotation-x={-0.29}
            rotation-y={0.01}
            >
                {/* <iframe src=''  /> */}
                {/* <img src=""/> */}
            </Html>
        </primitive>
        <Text
        fontSize={1}
        scale={0.5}
        position={ isMobile? [2,0.75,-0.75] : [2,1.2,0.75]}
        rotation-y={-1.25}
        maxWidth={2}
        textAlign='center'
        color={'#915eff'}
        >GAFAR GNAD</Text>
        </Float>
        </PresentationControls>
        </Suspense>
    </>
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
      <Canvas
        camera={ {
            fov: isMobile? 40: 30,
            near: 0.1,
            far: 2000,
            position: [ -5, 1.5, 9 ]
        } }
        style={{touchAction:"none"}}
      >
        <Computers isMobile={isMobile} />
      </Canvas>
      )}

export default ComputersCanvas; 