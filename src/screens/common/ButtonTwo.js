import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const ButtonTwo = ({ onPress, children }) => {
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
        backgroundColor : '#009FDB',
        borderColor : '#009FDB',
        marginLeft : 10,
        marginRight : 10
    },
    textStyle : {
        alignSelf : 'center',
        color : '#fff',
        textAlign : 'center',
        fontSize : 16,
        fontWeight : '600',
        paddingTop : 10,
        paddingBottom  : 10
    }
});

export { ButtonTwo };