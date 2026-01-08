import { useControls } from "leva";
import * as THREE from "three";

const options = {
  metalness: 0.2,
  roughness: 0.4,
};

const colors = {
  white: "#ffffff",
  red: "#f52222",
  blue: "#4077f7",
};

const white = new THREE.MeshStandardMaterial({
  ...options,
  color: colors.white,
});

const red = new THREE.MeshStandardMaterial({
  ...options,
  color: colors.red,
});

const blue = new THREE.MeshStandardMaterial({
  ...options,
  color: colors.blue,
});

const BrickMaterial = {
  white,
  red,
  blue,
};

const MaterialDebugConfig: React.FC = () => {
  useControls("Brick", {
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
    colorWhite: {
      value: colors.white,
      onChange: (colorWhite) => {
        BrickMaterial.white.color.set(colorWhite);
      },
    },
    colorRed: {
      value: colors.red,
      onChange: (colorRed) => {
        BrickMaterial.red.color.set(colorRed);
      },
    },
    colorBlue: {
      value: colors.blue,
      onChange: (colorBlue) => {
        BrickMaterial.blue.color.set(colorBlue);
      },
    },
  });

  return null;
};

export { BrickMaterial as materials, MaterialDebugConfig };
