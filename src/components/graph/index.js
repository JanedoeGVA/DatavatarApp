import React from 'react';
import { View } from 'react-native';
import { ClipPath, Defs, Rect } from 'react-native-svg';
import moment from 'moment';
import { LineChart, Path, YAxis, XAxis, Grid } from 'react-native-svg-charts';

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
const Graph = ({ data }) => {
  const items = data.map((item) => item['heart-rate']);
  const start = moment.unix(data[0].date);
  const end = moment.unix(data[data.length - 1].date);
  // const start = moment.unix(data[0].date).format('HH:MM');
  // const end = moment.unix(data[data.length - 1].date).format('HH:MM');
  console.log(start);
  console.log(end);
  const duration = moment.duration(end.diff(start));
  var minmax = duration.asMinutes();
  console.log(minmax);
  var min01 = Math.floor(minmax / 4);
  var min02 = Math.floor(minmax / 4) * 2;
  var min03 = Math.floor(minmax / 4) * 3;
  const time = [0, min01, min02, min03, minmax];
  const contentInset = { top: 20, bottom: 20 };
  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 10;

  return (
    // <View>
    //   <View style={{ height: 350, width: 350, flexDirection: 'row' }}>
    //     <YAxis
    //       data={items}
    //       contentInset={contentInset}
    //       svg={{
    //         fill: 'grey',
    //         fontSize: 10
    //       }}
    //       numberOfTicks={10}
    //       formatLabel={(value) => `${value} bpm`}
    //     />
    //     <LineChart
    //       style={{ flex: 1, marginLeft: 16 }}
    //       data={items}
    //       svg={{ stroke: 'rgb(134, 65, 244)' }}
    //       contentInset={contentInset}
    //       // style={{ height: 200 }}
    //       // data={items}
    //       // contentInset={{ top: 20, bottom: 20 }}
    //       // svg={{
    //       //   stroke: 'rgb(134, 65, 244)',
    //       //   strokeWidth: 2,
    //       //   clipPath: 'url(#clip-path-1)'
    //       // }}
    //     >
    //       <Clips />
    //       <Shadow />
    //       <DashedLine />
    //       <Grid />
    //     </LineChart>
    //   </View>
    //   <XAxis
    //     data={time}
    //     formatLabel={(value) => `${value} :00`}
    //     contentInset={contentInset}
    //     svg={{ fontSize: 10, fill: 'black' }}
    //   />
    // </View>

    <View style={{ height: 500, padding: 5, flexDirection: 'row' }}>
      <YAxis
        data={items}
        style={{ marginBottom: xAxisHeight }}
        formatLabel={(value) => `${value} bpm`}
        contentInset={verticalContentInset}
        numberOfTicks={10}
        svg={axesSvg}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <LineChart
          style={{ flex: 1 }}
          data={items}
          contentInset={verticalContentInset}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          style={{ flex: 1, marginLeft: 5 }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -5, height: xAxisHeight }}
          data={time}
          formatLabel={(index, value) => `${time[index]} min`}
          contentInset={{ left: 15, right: 18 }}
          svg={axesSvg}
        />
      </View>
    </View>
  );
};

export default Graph;
