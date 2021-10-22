import React from "react";
import themeData from "../theme.json";

const colors = themeData.colors;

const ProgressRing = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="mx-auto">
      <circle
        className="block m-auto"
        stroke={colors.primary.DEFAULT}
        fill={colors.primary.DEFAULT}
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx="50%"
        cy="50%"
      />
    </svg>
  );
};

export default ProgressRing;
