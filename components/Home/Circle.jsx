import React, { useState, useEffect } from "react";

const CircleLoader = ({ time, tick, isPaused }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let segments = time;

    const animate = () => {
      setProgress(segments / time);

      if (segments > 0 && !isPaused) {
        animationFrameId = requestAnimationFrame(animate);
        segments--;
      }
    };

    if (!isPaused) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [time, isPaused]);

  // Calculate strokeDasharray and strokeDashoffset based on progress
  const circleLength = 2 * Math.PI * 46;
  const segmentLength = circleLength / time;
  const strokeDasharray = circleLength;
  const strokeDashoffset = circleLength - segmentLength * (time - tick);

  return (
    <div style={{ position: "relative" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="46"
          style={{
            stroke: "aqua",
            strokeWidth: "5",
            fill: "transparent",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            strokeDasharray: strokeDasharray,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <h3
        className={isPaused ? "modal__color1" : "modal__color2"}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {tick}
      </h3>
    </div>
  );
};

export default CircleLoader;
