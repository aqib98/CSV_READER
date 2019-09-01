import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';


export const RadioCircle = (props) => {

    const {checkBool} = props;



    return (
        <View 
        style={styles.circle}
        
        >
           {checkBool && <View style={styles.checkedCircle} />}
        </View>
    )


}

const styles = StyleSheet.create({
    circle: {
        height:15,
        width:15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkedCircle: {
        width: 10.5,
        height: 10.5,
        borderRadius: 7,
        backgroundColor: '#794F9B'
    }
})