import React from 'react';
import data from './data';
import { View } from 'react-native';
import { LineChart, Path, YAxis, XAxis, Grid } from 'react-native-svg-charts';

const GraphTest = () => {
  return (
    <View>
      <View style={{ height: 200, flexDirection: 'row' }}>
        <YAxis
          data={data}
          formatLabel={(value) => `${value}`}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: 'grey',
            fontSize: 10
          }}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16, marginRight: 10 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
      </View>
      <XAxis
        data={data}
        formatLabel={(value, index) => index}
        contentInset={{ left: 30, right: 10 }}
        svg={{ fontSize: 10, fill: 'black' }}
      />
    </View>
  );
};

export default GraphTest;
