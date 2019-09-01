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
const { SampleTable, Header, Colors, PainTable, FlexionContraction,ExtensionLag,Anteroposterior,Mediolateral,FlexionRange,Alignment } = lib


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
    FlexionContractionTable: {
      tableData: {
        "5°-10°": -5,
        "10°-15°": -10,
        "15°-20°": -15,
        ">20°": -15
      },
      clickedIndex: null,
      score: 0,
      csvArr: []
    },
    ExtensionLagTable : {
      tableData:{
        "<10°":-5,
        "10°-20°":-10,
        ">20°":-15
      },
      clickedIndex:null,
      score:0,
      csvArr:[]
    },
    AnteroposteriorTable:{
      tableData:{
        "<5mm":5,
        "5-10mm":0,
        "10+mm":0
      },
      clickedIndex:null,
      score:0,
      csvArr:[]
    },
    MediolateralTable:{
      tableData:{
        "<5°":15,
        "6-9°":10,
        "10-14°":5,
        "15°":0
      },
      clickedIndex : null,
      score:0,
      csvArr : []
    },
    FlexionRangeTable:{
      tableData:{
        "0-5":1,
        "6-10":1,
        "11-15":1,
        "16-20":1,
        "21-25":1,
        "26-30":2,
        "31-35":2,
        "36-40":2,
        "41-45":2,
        "46-50":2,
        "51-55":3,
        "56-60":3,
        "61-65":3,
        "66-70":3,
        "71-75":3,
        "76-80":4,
        "81-85":4,
        "86-90":4,
        "91-95":4,
        "96-100":4,
        "101-105":5,
        "106-110":5,
        "111-115":5,
        "116-120":5,
        "121-125":5
      },
      clickedIndex:null,
      score:0,
      csvArr:[]
    },
    AlignmentTable : {
      tableData:{
        "0":-10,
        "1":-10,
        "2":25,
        "3":25,
        "4":25,
        "5-10":25,
        "11":-10,
        "12":-10,
        "13":-10,
        "14":-10,
        "15":-10,
        "Over 15°":-10
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
    this.setState({ PainTable: newPainTable, totalScore: newTotalScore })
  }

  onFlexionContractionSelect = (index, e) => {
    e.preventDefault();
    const { FlexionContractionTable, totalScore } = this.state;
    let newFlexionContractionTable = FlexionContractionTable;

    newFlexionContractionTable = update(newFlexionContractionTable, {
      clickedIndex: { $set: index },
      score: { $set: Object.values(newFlexionContractionTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['Flexion Contracture (if present)', Object.keys(newFlexionContractionTable.tableData).find((key, i) => i === index), Object.values(newFlexionContractionTable.tableData).find((value, i) => i === index)] }
    });
    let newTotalScore = totalScore + newFlexionContractionTable.score;
    this.setState({ FlexionContractionTable: newFlexionContractionTable, totalScore: newTotalScore });
  }

  onExtensionLagSelect = (index,e) => {
    e.preventDefault();
    const {ExtensionLagTable,totalScore} = this.state;
    let newExtensionLagTable = ExtensionLagTable;

    newExtensionLagTable = update(newExtensionLagTable,{
      clickedIndex: { $set: index },
      score: { $set: Object.values(newExtensionLagTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['Extension lag', Object.keys(newExtensionLagTable.tableData).find((key, i) => i === index), Object.values(newExtensionLagTable.tableData).find((value, i) => i === index)] }
    });

    let newTotalScore = totalScore + newExtensionLagTable.score;
    this.setState({ ExtensionLagTable: newExtensionLagTable, totalScore: newTotalScore });
  }

  onAnteroposteriorSelect = (index,e) => {
    e.preventDefault();
    const {AnteroposteriorTable,totalScore} = this.state;
    let newAnteroposteriorTable = AnteroposteriorTable;

    newAnteroposteriorTable = update(newAnteroposteriorTable,{
      clickedIndex: { $set: index },
      score: { $set: Object.values(newAnteroposteriorTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['ntero-posterior', Object.keys(newAnteroposteriorTable.tableData).find((key, i) => i === index), Object.values(newAnteroposteriorTable.tableData).find((value, i) => i === index)] }
    });

    let newTotalScore = totalScore + newAnteroposteriorTable.score;
    this.setState({ AnteroposteriorTable: newAnteroposteriorTable, totalScore: newTotalScore });
  }

  onMediolateralTableSelect = (index,e) => {
    e.preventDefault();
    const {MediolateralTable,totalScore} = this.state;
    let newMediolateralTable = MediolateralTable;

    newMediolateralTable = update(newMediolateralTable,{
      clickedIndex: { $set: index },
      score: { $set: Object.values(newMediolateralTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['Mediolateral', Object.keys(newMediolateralTable.tableData).find((key, i) => i === index), Object.values(newMediolateralTable.tableData).find((value, i) => i === index)] }
    });

    let newTotalScore = totalScore + newMediolateralTable.score;
    this.setState({ MediolateralTable: newMediolateralTable, totalScore: newTotalScore });
  }

  onFlexionRangeSelect = (index,e) => {
    e.preventDefault();
    const {FlexionRangeTable,totalScore} = this.state;
    let newFlexionRangeTable = FlexionRangeTable;

    newFlexionRangeTable = update(newFlexionRangeTable,{
      clickedIndex: { $set: index },
      score: { $set: Object.values(newFlexionRangeTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['Total Range of Flexion', Object.keys(newFlexionRangeTable.tableData).find((key, i) => i === index), Object.values(newFlexionRangeTable.tableData).find((value, i) => i === index)] }
    });

    let newTotalScore = totalScore + newFlexionRangeTable.score;
    this.setState({ FlexionRangeTable: newFlexionRangeTable, totalScore: newTotalScore });
  }

  onAlignmentSelect = (index,e) => {
    e.preventDefault();
    const {AlignmentTable,totalScore} = this.state;
    let newAlignmentTable = AlignmentTable;

    newAlignmentTable = update(newAlignmentTable,{
      clickedIndex: { $set: index },
      score: { $set: Object.values(newAlignmentTable.tableData).find((value, i) => i === index) },
      csvArr: { $set: ['Alignment (Varus &amp; Valgus)', Object.keys(newAlignmentTable.tableData).find((key, i) => i === index), Object.values(newAlignmentTable.tableData).find((value, i) => i === index)] }
    });

    let newTotalScore = totalScore + newAlignmentTable.score;
    this.setState({ AlignmentTable: newAlignmentTable, totalScore: newTotalScore });
  }

  isElementUndefined = (arr) => {
    arr.some((each)=>{
      return each !== undefined
    })
  }

  saveCsv = () => {
    const { PainTable,FlexionContractionTable,AlignmentTable,AnteroposteriorTable,ExtensionLagTable,FlexionRangeTable,MediolateralTable,totalScore } = this.state;
    const path = RNFS.DocumentDirectoryPath + `/${new Date().getTime().toString()}.csv`;
    const values = []
    this.isElementUndefined(PainTable.csvArr) && values.push(PainTable.csvArr);
    this.isElementUndefined(FlexionContractionTable.csvArr) &&values.push(FlexionContractionTable.csvArr);
    this.isElementUndefined(AlignmentTable.csvArr) &&values.push(AlignmentTable.csvArr);
    this.isElementUndefined(AnteroposteriorTable.csvArr) &&values.push(AnteroposteriorTable.csvArr);
    this.isElementUndefined(ExtensionLagTable.csvArr) &&values.push(ExtensionLagTable.csvArr);
    this.isElementUndefined(FlexionContractionTable.csvArr) &&values.push(FlexionContractionTable.csvArr);
    this.isElementUndefined(FlexionRangeTable.csvArr) &&values.push(FlexionRangeTable.csvArr);
    this.isElementUndefined(MediolateralTable.csvArr) &&values.push(MediolateralTable.csvArr);
    values.push(['TotalSocre',totalScore])

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
    const ExtensionLagArr = Object.keys(state.ExtensionLagTable.tableData).map((key) => [key, state.ExtensionLagTable.tableData[key]]);
    const AnteroposteriorArr = Object.keys(state.AnteroposteriorTable.tableData).map((key) => [key, state.AnteroposteriorTable.tableData[key]]);
    const MediolateralArr = Object.keys(state.MediolateralTable.tableData).map((key) => [key, state.MediolateralTable.tableData[key]]);
    const FlexionRangeArr = Object.keys(state.FlexionRangeTable.tableData).map((key) => [key, state.FlexionRangeTable.tableData[key]]);
    const AlignmentArr = Object.keys(state.AlignmentTable.tableData).map((key) => [key, state.AlignmentTable.tableData[key]]);
    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={styles.scrollView}
          >
            <Header />
            <PainTable PainTableState={PainTableArr} clickedIndex={state.PainTable.clickedIndex} onSelectMethod={this.onPainTableValueSelect} />
            <FlexionContraction FlexionContractionState={FlexionContractionArr} clickedIndex={state.FlexionContractionTable.clickedIndex} onSelectMethod={this.onFlexionContractionSelect} />
            <ExtensionLag ExtensionLagState={ExtensionLagArr} clickedIndex = {state.ExtensionLagTable.clickedIndex} onSelectMethod = {this.onExtensionLagSelect} />
            <Anteroposterior AnteroposteriorState={AnteroposteriorArr} clickedIndex = {state.AnteroposteriorTable.clickedIndex} onSelectMethod = {this.onAnteroposteriorSelect} />
            <Mediolateral MediolateralState={MediolateralArr} clickedIndex ={state.MediolateralTable.clickedIndex} onSelectMethod =  {this.onMediolateralTableSelect} />
            <FlexionRange FlexionRangeState = {FlexionRangeArr} clickedIndex={state.FlexionRangeTable.clickedIndex} onSelectMethod={this.onFlexionRangeSelect} />
            <Alignment AlignmentState = {AlignmentArr} clickedIndex = {state.AlignmentTable.clickedIndex} onSelectMethod={this.onAlignmentSelect} />
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

