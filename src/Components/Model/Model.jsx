import React, { useEffect, useRef, useState, useMemo } from "react";
import { useGLTF, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Model({ color, playerName, playerNumber, ...props }) {
  const { nodes, materials } = useGLTF("/shirt_baked_2.glb");
  const modelRef = useRef();

  const [scale, setScale] = useState([1, 1, 1]);
  const [position, setPosition] = useState([1, 1, 1]);

  useEffect(() => {
    function updateScale() {
      const width = window.innerWidth;
      if (width < 600) {
        setScale([13, 13, 13]);
        setPosition([0, -1, 0]);
      } else if (width >= 600 && width < 1200) {
        setPosition([0, 0, 0]);
      } else {
        setScale([12, 12, 12]);
        setPosition([0, 0, 0]);
      }
    }

    updateScale();

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.color.set(color);
    });
  }, [color, materials]);

  // Create text textures for name and number
  const nameTexture = useMemo(() => {
    if (!playerName) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Clear background (fully transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Text styling - smaller and bolder for better appearance
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create stroke
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(playerName.toUpperCase(), canvas.width / 2, canvas.height / 2);
    
    // Create fill
    ctx.fillStyle = 'white';
    ctx.fillText(playerName.toUpperCase(), canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [playerName]);
  
  // Create number texture
  const numberTexture = useMemo(() => {
    if (!playerNumber) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Clear background (fully transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Text styling - smaller for better fit
    ctx.font = 'bold 140px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create stroke
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.strokeText(playerNumber, canvas.width / 2, canvas.height / 2);
    
    // Create fill
    ctx.fillStyle = 'white';
    ctx.fillText(playerNumber, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [playerNumber]);

  return (
    <group
      ref={modelRef}
      {...props}
      dispose={null}
      position={position}
      scale={scale}
    >
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, -0.2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      
      {/* Player Name on Back - using position relative to the jersey mesh */}
      {nameTexture && (
        <mesh
          position={[0.419, 0.9, -0.11]} /* Positioned to be attached to jersey */
          rotation={[Math.PI / 2, Math.PI, 0]}
          scale={[0.7, 0.18, 1]} /* Adjusted scale to fit better */
        >
          <planeGeometry args={[1.5, 0.4]} />
          <meshBasicMaterial 
            map={nameTexture} 
            transparent={true}
            side={THREE.DoubleSide}
            depthTest={true}
            depthWrite={false} /* Prevents z-fighting */
            alphaTest={0.01} /* Helps with transparency artifacts */
          />
        </mesh>
      )}
      
      {/* Player Number on Back - positioned to appear on the jersey */}
      {numberTexture && (
        <mesh
          position={[0.419, 0.4, -0.11]} /* Positioned to attach to jersey back */
          rotation={[Math.PI / 2, Math.PI, 0]}
          scale={[0.45, 0.45, 1]} /* Adjusted scale */
        >
          <planeGeometry args={[1.0, 1.0]} />
          <meshBasicMaterial 
            map={numberTexture} 
            transparent={true}
            side={THREE.DoubleSide}
            depthTest={true}
            depthWrite={false}
            alphaTest={0.01} /* Helps with transparency artifacts */
          />
        </mesh>
      )}
      
      {/* Player Number on Front (smaller) */}
      {numberTexture && (
        <mesh
          position={[0.419, 0.3, 0.11]} /* Positioned to attach to jersey front */
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.25, 0.25, 1]} /* Smaller on front for realism */
        >
          <planeGeometry args={[1.0, 1.0]} />
          <meshBasicMaterial 
            map={numberTexture} 
            transparent={true}
            side={THREE.DoubleSide}
            depthTest={true}
            depthWrite={false}
            alphaTest={0.01} /* Helps with transparency artifacts */
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/shirt_baked_2.glb");
