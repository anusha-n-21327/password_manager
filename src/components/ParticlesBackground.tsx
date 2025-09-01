import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "react-tsparticles";
import { type Container } from "@tsparticles/engine";
import { loadSlim } from "tsparticles-slim";
import { particlesConfig } from "./particles/particles-config";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container);
  };

  const options = useMemo(() => (particlesConfig), []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};