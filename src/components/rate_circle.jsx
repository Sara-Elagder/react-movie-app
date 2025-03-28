import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RateCircle = ({ rate, className = "" }) => {
  const textSize = 35;

  //get the color of the rating ring based on the rate
  const getRingColor = () => {
    if (rate >= 75) return "#00e27a";
    if (rate >= 40) return "#cae02d";
    if (rate > 0) return "#f9005f";
    return "#f9f9f9";
  };

  return (
    // className is used to add custom classes to the component
    // i added it to make the component resizable
    <div className={className}>
      <CircularProgressbar
        value={rate}
        text={
          <tspan style={{ fontWeight: "bold" }}>
            {rate}
            <tspan
              style={{
                fontWeight: "bold",
                fontSize: `${textSize / 2.3}px`
              }}
              dy="-7">
              %
            </tspan>
          </tspan>
        }

        background
        backgroundPadding={4}
        // the width of the rating ring
        strokeWidth={6}
        styles={buildStyles({
          backgroundColor: "#001d22",
          pathColor: getRingColor(),
          pathTransition: "stroke-dashoffset 0.5s ease 0s",

          // trailColor is the background color of the ring
          // i added 4D to the end of the color to add some opacity
          trailColor: getRingColor().concat("4D"),
          textColor: "white",
          textSize: `${textSize}px`
        })}
      />
    </div>
  );
};

export default RateCircle;