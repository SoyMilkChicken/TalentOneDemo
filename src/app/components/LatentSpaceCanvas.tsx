"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const CENTER_COLOR = "#FFFFFF";
const ORBIT_COLOR = "#888888";
const CONNECTOR_COLOR = "#FFFFFF";
const SECONDARY = "#F5F5F5";
const VOID = "#0A0A0A";
const POINTS_PER_NODE = 3072;
const STAR_COUNT = 2000;

type DiagramNode = {
  id: string;
  eyebrow: string;
  title: string;
  detail: string;
  cosine: string;
  slice: number[];
  position: [number, number, number];
  labelOffset?: [number, number, number];
  radius: number;
  color: string;
};
const NODES: DiagramNode[] = [
  {
    id: "job",
    eyebrow: "Anchor Vector",
    title: "The Job Description",
    detail:
      "The role brief is embedded first and becomes the semantic anchor. Every downstream signal is compared against this point rather than matched through brittle keyword logic.",
    cosine: "anchor",
    slice: [0.91, -0.44, 0.68, 0.15, -0.22, 0.73, 0.09, -0.51],
    position: [0, 0, 0],
    radius: 0.58,
    color: CENTER_COLOR,
  },
  {
    id: "resume",
    eyebrow: "Reading Beyond Keywords",
    title: "Experience Extraction",
    detail:
      "We look beyond simple lists of skills. The engine analyzes past projects to understand exactly how those skills were applied in the real world, identifying true engineering expertise that is relevant to the specific role.",
    cosine: "0.042 from JD",
    slice: [0.88, -0.41, 0.64, 0.12, -0.18, 0.7, 0.08, -0.47],
    position: [2.35, -0.42, 0],
    labelOffset: [0.18, 0.46, 0],
    radius: 0.16,
    color: ORBIT_COLOR,
  },
  {
    id: "skills",
    eyebrow: "Catching Keyword Stuffers",
    title: "Context Verification",
    detail:
      "If a candidate lists 'Python', we need to know if they mean the programming language or a pet snake. The system measures the surrounding words to understand the true context, preventing unqualified applicants from gaming the system by stuffing their resume with buzzwords.",
    cosine: "0.118 from JD",
    slice: [0.72, -0.2, 0.59, 0.26, -0.04, 0.61, 0.21, -0.32],
    position: [1.1, -1.28, 1.1],
    labelOffset: [0.38, 0.28, 0],
    radius: 0.14,
    color: ORBIT_COLOR,
  },
  {
    id: "portfolio",
    eyebrow: "Finding Discarded Talent",
    title: "Hidden Gems",
    detail:
      "We don't just look for exact keyword matches. The system models a candidate's actual career trajectory and skill adjacencies. This helps us rescue highly qualified people who are often discarded by traditional ATS systems simply because they used different terminology.",
    cosine: "0.089 from JD",
    slice: [0.76, -0.31, 0.62, 0.11, -0.14, 0.66, 0.18, -0.28],
    position: [-2.35, 0.68, 0],
    labelOffset: [0, 0.46, 0],
    radius: 0.13,
    color: ORBIT_COLOR,
  },
  {
    id: "trajectory",
    eyebrow: "Measuring Real Impact",
    title: "Career Growth",
    detail:
      "Static years of experience don't tell the whole story. We value momentum. The system looks for patterns of rapid promotions, increasing scope of responsibility, and the velocity of a candidate's progression to identify high-potential talent.",
    cosine: "0.164 from JD",
    slice: [0.61, -0.15, 0.48, 0.41, 0.08, 0.52, 0.34, -0.18],
    position: [0, 1.72, -0.75],
    labelOffset: [0, 0.44, 0],
    radius: 0.12,
    color: ORBIT_COLOR,
  },
];

function createPointClusterPositions(seed: number, radius: number) {
  const positions = new Float32Array(POINTS_PER_NODE * 3);

  for (let index = 0; index < POINTS_PER_NODE; index += 1) {
    const radialSeed = Math.sin((seed * 13 + index * 5 + 1) * 91.17) * 43758.5453;
    const xSeed = Math.sin((seed * 17 + index * 5 + 2) * 91.17) * 43758.5453;
    const ySeed = Math.sin((seed * 19 + index * 5 + 3) * 91.17) * 43758.5453;
    const zSeed = Math.sin((seed * 23 + index * 5 + 4) * 91.17) * 43758.5453;
    const radial = Math.cbrt(radialSeed - Math.floor(radialSeed));
    const direction = new THREE.Vector3(
      (xSeed - Math.floor(xSeed)) * 2 - 1,
      (ySeed - Math.floor(ySeed)) * 2 - 1,
      (zSeed - Math.floor(zSeed)) * 2 - 1
    ).normalize();
    const clusterRadius = radial * radius * 1.18;
    const stride = index * 3;

    positions[stride] = direction.x * clusterRadius;
    positions[stride + 1] = direction.y * clusterRadius;
    positions[stride + 2] = direction.z * clusterRadius;
  }

  return positions;
}

function createStarfieldPositions() {
  const positions = new Float32Array(STAR_COUNT * 3);

  for (let index = 0; index < STAR_COUNT; index += 1) {
    const direction = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    const distance = 14 + Math.cbrt(Math.random()) * 36;
    const stride = index * 3;

    positions[stride] = direction.x * distance;
    positions[stride + 1] = direction.y * distance;
    positions[stride + 2] = direction.z * distance;
  }

  return positions;
}

function SignalLabels({
  nodes,
  selectedId,
  hidden,
}: {
  nodes: DiagramNode[];
  selectedId: string | null;
  hidden: boolean;
}) {
  if (hidden) {
    return null;
  }

  return (
    <>
      <Html
        position={[0, -0.98, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div className="pointer-events-none whitespace-nowrap text-[18px] font-medium uppercase tracking-[0.14em] text-[#D4D4D4] md:text-[22px]">
          <span className={selectedId === "job" ? "text-[#FFFFFF]" : undefined}>
            THE JOB DESCRIPTION
          </span>
        </div>
      </Html>
      <Html
        position={[0, -1.28, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div className="pointer-events-none whitespace-nowrap text-[8px] uppercase tracking-[0.34em] text-[#888888] md:text-[10px] md:tracking-[0.42em]">
          THE BENCHMARK FOR EVERY CANDIDATE
        </div>
      </Html>

      {nodes
        .filter((node) => node.id !== "job")
        .map((node) => {
          const labelPosition: [number, number, number] = [
            node.position[0] + (node.labelOffset?.[0] ?? 0),
            node.position[1] + (node.labelOffset?.[1] ?? 0.72),
            node.position[2] + (node.labelOffset?.[2] ?? 0),
          ];

          return (
            <Html
              key={node.id}
              position={labelPosition}
              center
              style={{ pointerEvents: "none" }}
            >
              <div
                className={`pointer-events-none max-w-[10rem] px-2 text-center uppercase leading-[0.96] tracking-[0.12em] transition-opacity duration-200 md:max-w-none md:whitespace-nowrap ${
                  selectedId === node.id
                    ? "text-[13px] text-[#FFFFFF] opacity-0 md:text-[16px]"
                    : "text-[13px] text-[#B3B3B3] opacity-100 md:text-[16px]"
                }`}
              >
                {node.title.toUpperCase()}
              </div>
            </Html>
          );
        })}
    </>
  );
}

function Starfield() {
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => createStarfieldPositions(), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity =
        0.28 + ((Math.sin(state.clock.elapsedTime * 0.45) + 1) * 0.5) * 0.12;
    }
  });

  return (
    <group>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          color={CENTER_COLOR}
          size={0.015}
          sizeAttenuation
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Node({
  node,
  isPaused,
  isSelected,
  isFocusMode,
  onSelect,
}: {
  node: DiagramNode;
  isPaused: boolean;
  isSelected: boolean;
  isFocusMode: boolean;
  onSelect: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lineOpacity = isFocusMode ? (isSelected ? 0.12 : 0.035) : 0.2;
  const pointOpacity = isFocusMode ? (isSelected ? 0.24 : 0.05) : 0.95;
  const centerOpacity = isFocusMode ? 0.12 : 1;
  const phaseRef = useRef(0);
  const pointSeed = useMemo(
    () =>
      Array.from(node.id).reduce(
        (acc, char, index) => acc + char.charCodeAt(0) * (index + 1),
        0
      ),
    [node.id]
  );
  const pointPositions = useMemo(
    () => createPointClusterPositions(pointSeed, node.radius),
    [node.radius, pointSeed]
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (isPaused) return;

    phaseRef.current += delta;

    if (node.id === "job") {
      groupRef.current.rotation.y += delta * 0.16;
      return;
    }

    groupRef.current.rotation.y += delta * 0.38;
    groupRef.current.rotation.x =
      Math.sin(phaseRef.current * 0.45 + node.position[0]) * 0.06;
  });

  return (
    <>
      {node.id !== "job" && (
        <Line
          points={[[0, 0, 0], node.position]}
          color={CONNECTOR_COLOR}
          lineWidth={1}
          transparent
          opacity={lineOpacity}
        />
      )}

      <group ref={groupRef} position={node.position}>
        {node.id === "job" ? (
          <mesh>
            <sphereGeometry args={[node.radius, 30, 30]} />
            <meshStandardMaterial
              color={CENTER_COLOR}
              emissive={CENTER_COLOR}
              emissiveIntensity={1.3}
              roughness={0.18}
              metalness={0.06}
              transparent
              opacity={centerOpacity}
            />
          </mesh>
        ) : (
          <>
            <points
              frustumCulled={false}
              onClick={(event) => {
                event.stopPropagation();
                onSelect();
              }}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[pointPositions, 3]}
                />
              </bufferGeometry>
              <pointsMaterial
                color={ORBIT_COLOR}
                size={0.015}
                sizeAttenuation
                transparent
                opacity={pointOpacity}
                depthWrite={false}
              />
            </points>

            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelect();
              }}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <sphereGeometry args={[node.radius * 1.4, 20, 20]} />
              <meshBasicMaterial
                color={CENTER_COLOR}
                transparent
                opacity={0}
                depthWrite={false}
              />
            </mesh>

          </>
        )}
      </group>
    </>
  );
}

function Scene({
  nodes,
  selectedNode,
  onSelect,
}: {
  nodes: DiagramNode[];
  selectedNode: DiagramNode | null;
  onSelect: (node: DiagramNode) => void;
}) {
  const isPaused = selectedNode !== null;
  const isFocusMode = selectedNode !== null;

  return (
    <>
      <Starfield />

      <ambientLight intensity={0.42} />
      <directionalLight position={[5, 6, 5]} intensity={0.78} color={SECONDARY} />
      <pointLight position={[0, 0, 2.5]} intensity={12} distance={8} color={CENTER_COLOR} />

      <SignalLabels
        nodes={nodes}
        selectedId={selectedNode?.id ?? null}
        hidden={isFocusMode}
      />

      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          isPaused={isPaused}
          isSelected={selectedNode?.id === node.id}
          isFocusMode={isFocusMode}
          onSelect={() => onSelect(node)}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
        rotateSpeed={0.55}
        autoRotate={selectedNode === null}
        autoRotateSpeed={0.56}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.01}
        maxPolarAngle={Math.PI - 0.01}
      />
    </>
  );
}

export default function LatentSpaceCanvas() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodes = useMemo(() => NODES, []);
  const orbitNodes = useMemo(
    () => nodes.filter((node) => node.id !== "job"),
    [nodes]
  );

  const selectedNode = useMemo(
    () => (activeNode === null ? null : orbitNodes[activeNode] ?? null),
    [activeNode, orbitNodes]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-full w-full touch-none select-none">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 37 }}
        className="h-full w-full"
        onPointerMissed={() => setActiveNode(null)}
      >
        <color attach="background" args={[VOID]} />
        <Scene
          nodes={nodes}
          selectedNode={selectedNode}
          onSelect={(node) => {
            if (node.id === "job") return;
            const nextIndex = orbitNodes.findIndex(
              (orbitNode) => orbitNode.id === node.id
            );
            setActiveNode((current) =>
              current === nextIndex ? null : nextIndex
            );
          }}
        />
      </Canvas>

      {selectedNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm pointer-events-auto"
          onClick={() => setActiveNode(null)}
        >
          <div
            className="max-w-md w-[calc(100%-2rem)] max-h-[calc(100vh-3rem)] overflow-y-auto p-8 border border-white/20 bg-[#0A0A0A] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
              {selectedNode.eyebrow}
            </p>
            <p className="text-2xl font-bold text-white mb-4">
              {selectedNode.title}
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              {selectedNode.detail}
            </p>
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-x-6 bottom-8 z-40 flex justify-end transition-opacity duration-300 md:inset-x-12 md:bottom-12 ${
          activeNode === null ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-full max-w-[24rem] flex-col items-end md:max-w-[28rem]">
          <p className="w-full text-right text-[clamp(1rem,2.45vw,2rem)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-[#F5F5F5]">
            <span className="block">Beyond Boolean.</span>
            <span className="block">Measuring Semantic</span>
            <span className="block">Proximity.</span>
          </p>
          <p className="mt-2 w-full text-right text-[8px] font-medium uppercase leading-[1.4] tracking-[0.18em] text-[#F5F5F5]/28 md:text-[9px]">
            <span className="block">
              Click nodes to inspect an 8-value slice from the full
              3072-dimensional embedding.
            </span>
            <span className="block">
              Semantic distance is measured against the job-description anchor.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
