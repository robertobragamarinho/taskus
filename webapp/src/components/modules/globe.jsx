// src/modules/globe.jsx
"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Color, Fog, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// Se preferir alias: "@/data/globe.json" (garanta vite alias @)
import countries from "../modules/dataglobe.json";

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

export function Globe({ globeConfig, data }) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig
    }),
    [globeConfig]
  );

  // Inicializa o ThreeGlobe uma vez
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Ajuste de material quando inicializa ou quando props mudam
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;
    const mat = globeRef.current.globeMaterial();
    mat.color = new Color(defaultProps.globeColor);
    mat.emissive = new Color(defaultProps.emissive);
    mat.emissiveIntensity = defaultProps.emissiveIntensity ?? 0.1;
    mat.shininess = defaultProps.shininess ?? 0.9;
  }, [isInitialized, defaultProps]);

  // Construção dos dados (polígonos, arcos, pontos)
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const points = [];
    for (let i = 0; i < data.length; i++) {
      const arc = data[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng
      });
    }

    // remove duplicados (mesma lat/lng)
    const filteredPoints = points.filter(
      (v, i, a) => a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k] === v[k])) === i
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => d.startLat * 1)
      .arcStartLng((d) => d.startLng * 1)
      .arcEndLat((d) => d.endLat * 1)
      .arcEndLng((d) => d.endLng * 1)
      .arcColor((e) => e.color)
      .arcAltitude((e) => e.arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => e.order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => e.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  }, [isInitialized, data, defaultProps]);

  // Animação dos "rings"
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;
      const newNumbers = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));
      const ringsData = data
        .filter((_, i) => newNumbers.includes(i))
        .map((d) => ({ lat: d.startLat, lng: d.startLng, color: d.color }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

function WebGLRendererConfig() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setClearColor(0xffaaff, 0);
  }, [gl]);
  return null;
}

export function World(props) {
  const { globeConfig } = props;
  return (
    <Canvas
      camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, cameraZ] }}
      onCreated={({ scene }) => {
        scene.fog = new Fog(0xffffff, 400, 2000);
      }}
    >
      <PerspectiveCamera makeDefault fov={50} near={180} far={1800} position={[0, 0, cameraZ]} />
      <WebGLRendererConfig />
      <ambientLight intensity={0.6} color={globeConfig.ambientLight} />
      <directionalLight color={globeConfig.directionalLeftLight} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight} position={new Vector3(-200, 500, 200)} />
      <pointLight color={globeConfig.pointLight} position={new Vector3(-200, 500, 200)} intensity={0.8} />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        minDistance={cameraZ}
        maxDistance={cameraZ}
      />
    </Canvas>
  );
}

export function genRandomNumbers(min, max, count) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}