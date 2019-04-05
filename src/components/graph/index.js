import React from 'react';
import { ClipPath, Defs, Rect } from 'react-native-svg';
import { LineChart, Path, YAxis } from 'react-native-svg-charts';

const indexToClipFrom = 10;

const Clips = ({ x, width }) => (
  <Defs key="clips">
    <ClipPath id="clip-path-1">
      <Rect x="0" y="0" width={x(indexToClipFrom)} height="100%" />
    </ClipPath>
    <ClipPath id="clip-path-2">
      <Rect
        x={x(indexToClipFrom)}
        y="0"
        width={width - x(indexToClipFrom)}
        height="100%"
      />
    </ClipPath>
  </Defs>
);

// Line extras:
const DashedLine = ({ line }) => (
  <Path
    key="line-1"
    d={line}
    stroke="rgb(134, 65, 244)"
    strokeWidth={2}
    fill="none"
    strokeDasharray={[4, 4]}
    clipPath="url(#clip-path-2)"
  />
);

const Shadow = ({ line }) => (
  <Path
    y={3}
    key="shadow-1"
    d={line}
    stroke="rgba(134, 65, 244, 0.2)"
    strokeWidth={5}
    fill="none"
  />
);
const Graph = ({ data }) => (
  <LineChart
    style={{ height: 200 }}
    data={data.lstHearthRate}
    contentInset={{ top: 20, bottom: 20 }}
    svg={{
      stroke: 'rgb(134, 65, 244)',
      strokeWidth: 2,
      clipPath: 'url(#clip-path-1)'
    }}
  >
    <Clips />
    <Shadow />
    <DashedLine />
  </LineChart>
);

export default Graph;
