import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Container,Header,Title,Content,Text,Button,Picker,Form,Icon,Textarea,Left,Right,Body } from "native-base";

import styles from "./styles";
import { CardSection, Card } from "../common";

class TrainerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
    <ScrollView>
      <Container style={styles.container}>
      <Header style={styles.headerStyle}>
          <Left style={styles.ham}>
            <Button transparent onPress={() => this.props.navigation.goBack(this.props.navigation.state.key)}>
              <Icon style={{color: "white"}} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Home</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Form>
          <Card>
            <CardSection>
              <Text style={styles.speciaity}>
                Select your specialities
              </Text>
              </CardSection>
            <CardSection style={{ flexDirection : "column" }}>
            <View style={styles.rowOne}>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                textStyle={{ color: "#009FDB" }}
                itemStyle={{
                  backgroundColor: "#d3d3d3",
                  marginLeft: 0,
                  paddingLeft: 0
                }}
                itemTextStyle={{ color: "#009FDB" }}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Speciality 1" value="key0" />
                <Picker.Item label="Speciality 2" value="key1" />
                <Picker.Item label="Speciality 3" value="key2" />
                <Picker.Item label="Speciality 4" value="key3" />
                <Picker.Item label="Speciality 5" value="key4" />
              </Picker>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                textStyle={{ color: "#009FDB" }}
                itemStyle={{
                  backgroundColor: "#d3d3d3",
                  marginLeft: 0,
                  paddingLeft: 0
                }}
                itemTextStyle={{ color: "#009FDB" }}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Speciality 1" value="key0" />
                <Picker.Item label="Speciality 2" value="key1" />
                <Picker.Item label="Speciality 3" value="key2" />
                <Picker.Item label="Speciality 4" value="key3" />
                <Picker.Item label="Speciality 5" value="key4" />
              </Picker>
            </View>

          {/*}  Apply 4 pickers here
            <View style={styles.rowOne}>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Select One"
                textStyle={{ color: "#009FDB" }}
                itemStyle={{
                  backgroundColor: "#d3d3d3",
                  marginLeft: 0,
                  paddingLeft: 0
                }}
                itemTextStyle={{ color: '#009FDB' }}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Speciality 1" value="key0" />
                <Picker.Item label="Speciality 2" value="key1" />
                <Picker.Item label="Speciality 3" value="key2" />
                <Picker.Item label="Speciality 4" value="key3" />
                <Picker.Item label="Speciality 5" value="key4" />
              </Picker>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Select One"
                textStyle={{ color: "#009FDB" }}
                itemStyle={{
                  backgroundColor: "#d3d3d3",
                  marginLeft: 0,
                  paddingLeft: 0
                }}
                itemTextStyle={{ color: '#009FDB' }}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Speciality 1" value="key0" />
                <Picker.Item label="Speciality 2" value="key1" />
                <Picker.Item label="Speciality 3" value="key2" />
                <Picker.Item label="Speciality 4" value="key3" />
                <Picker.Item label="Speciality 5" value="key4" />
              </Picker>
              </View> */}
            </CardSection>
          </Card>
            <View style={styles.textareaStyle}>
              <Textarea rowSpan={5} bordered
                placeholder="Write a few lines about yourself." />
            </View>
            <View style={styles.nextButton}>
              <Button block light onPress={() => this.props.navigation.navigate("TrainerFinancialDetails")}>
                <Text>Next</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    </ScrollView>
    );
  }
}

export default TrainerHome;
