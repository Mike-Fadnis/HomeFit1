import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Card = (props) => {
    return(
        <TouchableOpacity onPress={ props.onPress }>
            <View style={styles.containerStyle}>
            { props.children }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerStyle : {
        borderWidth : 1,
        borderRadius : 2,
        borderColor : '#ddd',
        borderBottomWidth : 0,
        shadowColor : '#000',
        shadowOffset : { width : 0, height :2 },
        shadowOpacity : 0.1,
        shadowRadius : 2,
        elevation : 1,
        marginLeft : 5,
        marginRight : 5,
        marginTop : 10
    }
});

export { Card };