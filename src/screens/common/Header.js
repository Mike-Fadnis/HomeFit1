import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerFont}>
                {props.headerText}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor  :'#009FDB',
        height : 60,
        paddingTop : 15,
        shadowColor : '#000',
        shadowOffset : { width : 0, height : 2 },
        shadowOpacity : 0.8,
        elevation : 2,
        position : 'relative'
    },
    headerFont : {
      fontSize: 24,
      fontWeight: 'bold',
      color : '#fff',
    }
  });

export { Header };