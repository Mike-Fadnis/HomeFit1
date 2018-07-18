import React ,{ Component } from "react";
import { View ,Text,FlatList,Modal, TouchableOpacity,Alert,Platform, Image } from "react-native";
var ImagePicker = require('react-native-image-picker');
import RNThumbnail from 'react-native-thumbnail';
import Video from 'react-native-video'
import Images from "@theme/images/images";
import styles from "./styles";
class VideoPlayer extends Component{
  constructor(props){
    super(props);
    this.state = {
        paused:false
    };
    this.onEnd = this.onEnd.bind(this);
    this.onPropsModalDone = this.onPropsModalDone.bind(this);
  }
  onPropsModalDone() {
      this.setState({
        paused:true
      },()=>{
        this.props.onClose()
      })
  
  }
  onEnd(){
    this.setState({
        paused:true
      },()=>{
        this.props.onClose()
      })
  }
  render() {
    return (
        <View style={{ flex: 1,}}>
        <View style={{ height: 20 }}/>
        <View style={{height: 44,backgroundColor: 'white',justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row'}}>
          <Text onPress={this.onPropsModalDone.bind(this)} style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>close x</Text>
        </View>
        <View style={{ flex: 1 }}>
        <Video source={this.props.videoUrl}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref
            }}  
            paused={this.state.paused}                                    // Callback when remote video is buffering
            onEnd={this.onEnd}                      // Callback when playback finishes
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} />
       </View>
        </View>
    )
  }
}
export default VideoPlayer
