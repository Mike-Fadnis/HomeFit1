import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    return(
        <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}>{label}</Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            autoCorrect={false}
            placeholder={placeholder}
            style={styles.inputStyle}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
    );
};

const styles=StyleSheet.create({
    inputStyle : {
        color : '#000000',
        paddingRight : 5,
        paddingLeft : 5,
        fontSize : 18,
        lineHeight : 23,
        flex  : 3
    },
    labelStyle:{
        fontSize : 18,
        paddingLeft : 20,
        flex : 1,
        width : '100%'
    },
    containerStyle : {
       height : 40,
       flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
    }
});

export { Input };
