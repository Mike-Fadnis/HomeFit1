import React ,{ Component } from "react";
import { View ,Text,FlatList,Modal, TouchableOpacity,Alert,Platform, Image } from "react-native";
var ImagePicker = require('react-native-image-picker');
import RNThumbnail from 'react-native-thumbnail';
import Images from "@theme/images/images";
import VideoPlayer from "./VideoPlayer";
import styles from "./styles";
const data = []
class TrainersMedia extends Component{
  constructor(props){
    super(props);
    this.state = {
      avatarSource: "",
      MediaData:[],
      videoavatarSource:"",
      modalVisible:false,
      videoUrl:'',
      isModalVisible:false,
    };
    this.onAddMedia = this.onAddMedia.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onVideoIcon = this.onVideoIcon.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onVideoIcon(item){
    this.setState({
      videoUrl : item.videoUrl
    },()=>{
      this.setState({modalVisible:true})
    })
  }
  onModalOpen(){
    this.setState({
      isModalVisible:true
    })
  }
  onModal_Close(){
    this.setState({
      isModalVisible:false
    })
  }
  renderItem = ({item,index}) => {
    console.log("itemquantity",item)
    return (
      <View>
       {item.type === 'Video' ? (
         <TouchableOpacity onPress={()=>this.onVideoIcon(item)} style={{margin:10,height:80,width:80,borderWidth:1,borderColor:"grey"}}>
           <Image style={{width:80,height:80}} source={item.source}/>
         </TouchableOpacity>
       ):
        <View style={{margin:10,height:80,width:80,borderWidth:1,borderColor:"grey"}}>
          <Image style={{width:80,height:80}} source={item.source}/>
        </View>
       }
        {item.type === "Video" ?
          <View style={{marginTop:80 / 2,position:"absolute",width:30,height:30,alignSelf:"center"}}>
            <Image source={Images.playIcon} style={{tintColor:"white"}}/>
          </View>
         : null}
      </View>
    )
  }
  onAddMedia(){
    Alert.alert("Want to add Images/Videos", "What do you want to upload?", [
      {
        text: "Images",
        onPress: () => {
          this.onImageUpload();
        }
      },
      {
        text: "Videos",
        onPress: () => {
          //this.onVideo();
          this.onModalOpen();
        }
      },
      { text: "Cancel", onPress: () => console.log("cancel Pressed") }
    ])
  }
  onVideo(){
    var options = {
      title: 'Add Video', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Video', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
      mediaType: 'video',
      videoQuality: 'medium', // 'low', 'medium', or 'high'
      aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
      quality: 1, // photos only
      angle: 0, // photos only
      durationLimit:15 ,
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: {
        // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        var vidsource1
        console.log("response video",response)
        if (Platform.OS === 'android') {
          vidsource1 = { uri: response.uri, isStatic: true }
        } else {
          vidsource1 = { uri: response.uri.replace('file://', ''), isStatic: true }
        }
        this.setState({
            videoavatarSource: vidsource1
          },()=>{
            RNThumbnail.get(response.uri).then((result) => {
              console.log("Thumbnail",result.path); // thumbnail path
              let thumbnailpath = { uri: result.path, isStatic: true }
              var record = {type: "Video", videoUrl: vidsource1,source:thumbnailpath}
              data.push(record);
              this.setState({MediaData : data});
            })

          });
      }
    });
  }
  onImageUpload(){
    const options = {
      title: "Upload Picture",
      takePhotoButtonTitle: "Take Photo",
      chooseFromLibraryButtonTitle: "Choose from Library",
      quality: 0.5,
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: true
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
       this.setState({imagepicker:false});
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {

        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        var source;
        if (Platform.OS === "android") {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace("file://", ""), isStatic: true};
        }
        this.setState({
          avatarSource: source,
          imageLoading:true,
        },()=>{
          var record = {type: "Image", source: source}
          data.push(record);
          this.setState({MediaData : data});
        });
      }
      });
  }
  onModalClose(){
    this.setState({modalVisible: false})
  }

  onDone(){
    this.setState({isModalVisible: false},()=>{
      this.props.onPayment()
    })
  }
  render() {
    return (
      <View style={{flex:1,flexDirection:"row"}}>
      <View>
      <FlatList
        horizontal
        inverted
         data={this.state.MediaData}
         extraData={this.state}
         keyExtractor={this._keyExtractor}
         renderItem={this.renderItem}
       />
      </View>
        <TouchableOpacity onPress={this.onAddMedia} style={{justifyContent:"center",margin:10,height:80,width:80,borderWidth:1,borderColor:"grey",borderRadius:80 / 2}}>
           <Text style={{textAlign:"center",color:"grey"}}>+ Add {"\n"} photos/videos</Text>
         </TouchableOpacity>
         <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
            <VideoPlayer
              onClose={this.onModalClose}
              videoUrl = {this.state.videoUrl}
            />
          </Modal>
          <Modal
             animationType="slide"
             transparent={true}
             visible={this.state.isModalVisible}>
             <View style={styles.modalView}>
               <View style={{width: 300, alignSelf:"center", marginTop:window.height/3,height: 120,backgroundColor:"white",borderWidth:1,borderColor:"white",borderRadius:10}}>

                 <View style={{flex:0.5,justifyContent:"center",alignItems:"center",margin:10}}>
                   <Text style={{textAlign:"center",fontSize:16,fontWeight:"700"}}>Do you want to pay  $1.00 to upload this video?</Text>
                 </View>

                 <View style={{flex:0.5,marginBottom:10,flexDirection:"row"}}>
                  <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={this.onDone.bind(this)}>
                       <Text style={{textAlign:"center",fontSize:18,fontWeight:"800", color:'#009FDB'}}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={this.onModal_Close.bind(this)}>
                       <Text style={{textAlign:"center",fontSize:18,fontWeight:"800", color:'#009FDB'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                 </View>

               </View>
            </View>
           </Modal>
      </View>
    )
  }
}
export default TrainersMedia
