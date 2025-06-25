import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, Box, Torus, OrbitControls, Text, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Particles = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05 + mouse.y * 0.0005;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08 + mouse.x * 0.0005;
      
      // Dynamic particle movement based on mouse
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const InteractiveGeometry = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3 + mouse.y * 0.002;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2 + mouse.x * 0.002;
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5 + 2;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.x = state.clock.elapsedTime * 0.4 - mouse.y * 0.003;
      boxRef.current.rotation.z = state.clock.elapsedTime * 0.3 - mouse.x * 0.003;
      boxRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2 + 4;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.2 + mouse.x * 0.001;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.5 + mouse.y * 0.001;
      torusRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 2 - 3;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
        <Sphere ref={sphereRef} position={[-4, 2, 0]} args={[0.8, 64, 64]}>
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={2} floatIntensity={2}>
        <Box ref={boxRef} position={[4, -2, -2]} args={[1.2, 1.2, 1.2]}>
          <MeshDistortMaterial
            color="#06B6D4"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
          />
        </Box>
      </Float>
      
      <Float speed={2.2} rotationIntensity={1} floatIntensity={2.5}>
        <Torus ref={torusRef} position={[0, 3, -3]} args={[1, 0.4, 32, 64]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.2}
            speed={3}
            roughness={0.3}
            metalness={0.7}
          />
        </Torus>
      </Float>
    </>
  );
};

const CameraController = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

interface Scene3DProps {
  section?: string;
}

const Scene3D: React.FC<Scene3DProps> = ({ section = 'hero' }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getCameraPosition = () => {
    switch (section) {
      case 'about': return [2, 1, 6];
      case 'skills': return [-2, 2, 7];
      case 'projects': return [1, -1, 8];
      case 'contact': return [0, 0, 5];
      default: return [0, 0, 5];
    }
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: getCameraPosition(), fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#06B6D4" />
        
        <Particles mouse={mouse} />
        <InteractiveGeometry mouse={mouse} />
        <CameraController mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default Scene3D;