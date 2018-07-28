import React from 'react';
import { View, StyleSheet, Text ,TextInput} from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry,ref,onSubmitEditing, keyboardType }) => {
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
            keyboardType={keyboardType}
          />
        </View>
    );
};

const styles=StyleSheet.create({
    containerStyle : {
      height : 40,
      flex : 1,
      flexDirection : 'row',
      alignItems : 'center',
    },
    labelStyle:{
      fontSize : 18,
      flex:0.4,
      paddingLeft : 10,
      // flex : 1,
      //width : '100%'
    },
    inputStyle : {
      color : '#000000',
      paddingRight : 5,
      paddingLeft : 5,
      fontSize : 16,
      //lineHeight : 23,
      flex  : 0.6,

    }
});

export { Input };
