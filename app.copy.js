/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';



import * as lib from './lib'
const { SampleTable, Header, Colors, PainTable } = lib

const RNFS = require('react-native-fs');

const App = () => {
  let path = RNFS.DocumentDirectoryPath + '/sample.csv';
  console.log(path)
  const values = [
    ['build', '2017-11-05T05:40:35.515Z'],
    ['deploy', '2017-11-05T05:42:04.810Z']
  ];

  // construct csvString
  const headerString = 'event,timestamp\n';
  const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
  const csvString = `${headerString}${rowString}`;
  RNFS.writeFile(path, csvString, 'utf8')
    .then((success) => {
      console.log(success)
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log()
      console.log(err.message);
    });
  return (
    <Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />

          <PainTable/>
          <SampleTable />
          <SampleTable />
          <SampleTable />
          <SampleTable />
          <SampleTable />
          <SampleTable />



        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
