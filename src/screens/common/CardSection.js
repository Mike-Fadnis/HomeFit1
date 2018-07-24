import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = (props) => {
    return(
        <View style={styles.containerStyle}>
           { props.children }
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle : {
        borderBottomWidth : 1,
        padding : 5,
        backgroundColor : '#fff',
        justifyContent : 'flex-start',
        shadowColor : '#000',
        flexDirection : 'row',
        borderBottomColor : "#009FDB",
        position : 'relative',
        shadowColor : '#009FDB',
        shadowOffset : { width : 0, height : 2 },
        shadowOpacity : 0.8,
        elevation : 2,
        position : 'relative'
    }
});

export { CardSection };
