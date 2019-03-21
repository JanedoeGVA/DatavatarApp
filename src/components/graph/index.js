import React from 'react';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { View } from 'react-native';

const fill = '#23EACD';
const xAxisHeight = 30;
const contentInset = { top: 20, bottom: 20 };

const Graph = ({ data }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    }}
  >
    <View
      style={{
        flex: 0.6,
        flexDirection: 'row',
        marginBottom: 36,
        marginLeft: 10,
        marginRight: 20
      }}
    >
      <YAxis
        data={data.lstHearthRate}
        style={{ marginBottom: xAxisHeight }}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 10
        }}
        umberOfTicks={8}
        formatLabel={(value) => `${value} bpm`}
      />

      <BarChart
        style={{ flex: 1 }}
        data={data.lstHearthRate}
        svg={{ fill }}
        contentInset={contentInset}
      >
        <Grid />
      </BarChart>
    </View>
  </View>
);

export default Graph;
