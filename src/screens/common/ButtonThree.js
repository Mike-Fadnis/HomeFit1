import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const ButtonThree = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle}
            onPress={ onPress }>
            <Text style={styles.textStyle }>
                { children }
            </Text>
        </TouchableOpacity>
    );
}; 

const styles = StyleSheet.create({
    buttonStyle :{
        flex : 1,
        //flexDirection : 'row',
        alignSelf : 'stretch',
        backgroundColor : '#fff',
        borderRadius : 5,
        borderWidth : 1,
        borderColor : '#009FDB',
        marginLeft : 5,
        marginRight : 5
    },
    textStyle : {
        alignSelf : 'center',
        color : '#009FDB',
        fontSize : 20,
        fontWeight : '600',
        paddingTop : 10,
        paddingBottom  :10
    }
});

export { ButtonThree };