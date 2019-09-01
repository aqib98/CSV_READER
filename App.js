/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import update from 'immutability-helper'



import * as lib from './lib'
import RNFS from 'react-native-fs';
const { SampleTable, Header, Colors, PainTable,FlexionContraction } = lib


export default class App extends Component {
  state = {
    PainTable: {
      tableData: {
        "None": 50,
        "Mild / Occasional": 45,
        "Mild (Stairs only)": 40,
        "Mild (Walking and Stairs)": 30,
        "Moderate - Occasional": 20,
        "Moderate - Continual": 10,
        "Severe": 0
      },
      clickedIndex: null,
      score: 0,
      csvArr: []
    },
    FlexionContractionTable : {
      tableData:{
        "5°-10°":-5,
        "10°-15°":-10,
        "15°-20°":-15,
        ">20°":-15
      },
      clickedIndex:null,
      score:0,
      csvArr:[]
    }
  }




  onPainTableValueSelect = (index, e) => {
    e.preventDefault();
    const { PainTable, totalScore } = this.state
    let newPainTable = PainTable;

    newPainTable = update(newPainTable, {
      clickedIndex: { $set: index },
      score: { $set: Object.values(newPainTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['Pain', Object.keys(newPainTable.tableData).find((key, i) => i === index), Object.values(newPainTable.tableData).find((value, i) => i === index)] }
    });
    let newTotalScore = totalScore + newPainTable.score
    this.setState({ PainTable: newPainTable })
  }

  saveCsv = () => {
    const { PainTable } = this.state;
    const path = RNFS.DocumentDirectoryPath + '/samplePain.csv';
    const values = []
    values.push(PainTable.csvArr);
    const headerString = 'Question,Answer,Score\n';
    const rowString = values.map(d => `${d[0]},${d[1]},${d[2]}\n`).join('');
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
  }

  render() {
    const state = this.state;
    console.log(state)

    const PainTableArr = Object.keys(state.PainTable.tableData).map((key) => [key, state.PainTable.tableData[key]]);
    const FlexionContractionArr = Object.keys(state.FlexionContractionTable.tableData).map((key) => [key, state.FlexionContractionTable.tableData[key]])

    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={styles.scrollView}
          >
            <Header />
            <PainTable PainTableState={PainTableArr} clickedIndex={state.PainTable.clickedIndex} onSelectMethod={this.onPainTableValueSelect} />
            <FlexionContraction FlexionContractionState={FlexionContractionArr} clickedIndex={} onSelectMethod={}/>
            <Button
              onPress={this.saveCsv}
              title="Save CSV"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    )
  }
}



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

