import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { RadioCircle } from './../radio';

export const Mediolateral = class SampleTable extends Component {




    render() {
        const state = this.state;
        const { MediolateralState, onSelectMethod, clickedIndex } = this.props;

        const element = (data, checkBool) => {
            return (
                <View>
                    {`${<RadioCircle checkBool={checkBool} />} ${data}`}
                </View>
            )
        }


        return (
            <View style={styles.container}>
                <Text style={styles.headingText}>
                Mediolateral
                </Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#00403C' }}>
                    {
                        MediolateralState.map((rowData, index) => {
                            let rowArr = [rowData[0]]
                            console.log(clickedIndex, index, rowArr)
                            return (
                                <TableWrapper>
                                    <TouchableOpacity key={index} onPress={(e) => onSelectMethod(index, e)}>
                                        <Cell
                                            key={index}
                                            data={[
                                                <Text style={{ alignContent: 'center' }}>
                                                    <RadioCircle key={1} checkBool={index == clickedIndex ? true : false} />
                                                    <Text key={2}>{` `}</Text>
                                                    <Text key={3}>{rowArr}</Text>
                                                </Text>
                                            ]}
                                            textStyle={index == clickedIndex ? styles.clickedText : styles.text}
                                        >

                                        </Cell>
                                    </TouchableOpacity>
                                </TableWrapper>

                            )
                        })
                    }
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#becfba' },
    text: {
        margin: 6, color: '#00403C', textAlign: 'left', backgroundColor: 'black', alignItems: 'center',
        justifyContent: 'center'
    },
    clickedText: {
        margin: 6, color: 'black', textAlign: 'left', backgroundColor: '#becfba', alignItems: 'center',
        justifyContent: 'center'
    },
    headingText: {
        margin: 10, color: '#00403C', textAlign: 'left', fontWeight: 'bold'
    }
});

