import { useControls } from "leva";
import * as THREE from "three";

const options = {
  metalness: 0.1,
  roughness: 0.7,
};

const colors = {
  white: "#ffffff",
  red: "#f52222",
  blueLight: "#31c3eb",
  blueDark: "#0032fc",
  orange: "#cb8700",
  purple: "#500097",
  pink: "#d082ef",
  yellow: "#e8c700",
  grey: "#a7a7a7",
  turquoiseLight: "#94f2f8",
  turquoiseDark: "#02aaa3",
  gold: "#e79a0e",
};

const BrickMaterial = Object.entries(colors).reduce(
  (materials, [name, color]) => {
    materials[name as keyof typeof colors] = new THREE.MeshStandardMaterial({
      ...options,
      color,
    });

    return materials;
  },
  {} as Record<keyof typeof colors, THREE.MeshStandardMaterial>,
);

const MaterialDebugConfig: React.FC = () => {
  useControls(
    "Materials",
    {
      metalness: {
        value: options.metalness,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (metalness) => {
          Object.values(BrickMaterial).forEach((material) => {
            material.metalness = metalness;
          });
        },
      },
      roughness: {
        value: options.roughness,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (roughness) => {
          Object.values(BrickMaterial).forEach((material) => {
            material.roughness = roughness;
          });
        },
      },

      ...Object.entries(colors).reduce(
        (acc, [name, color]) => {
          acc[`color${name.charAt(0).toUpperCase() + name.slice(1)}`] = {
            value: color,
            onChange: (newColor) => {
              BrickMaterial[name as keyof typeof colors].color.set(newColor);
            },
          };

          return acc;
        },
        {} as Record<
          `color${string}`,
          {
            value: string;
            onChange: (color: string) => void;
          }
        >,
      ),
    },
    {
      collapsed: true,
    },
  );

  return null;
};

export { BrickMaterial, MaterialDebugConfig };
