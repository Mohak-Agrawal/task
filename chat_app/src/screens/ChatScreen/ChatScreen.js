import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Styles from './Styles';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sentMessage: '',
      platform: 'App',
    };
  }

  componentDidMount = () => {
    this.subscriber = firestore()
      .collection('Chats')
      .onSnapshot((res) => {
        let docs = res.size ? res.docs : [];
        docs.sort(function (obj1, obj2) {
          return (
            obj1.data().timeStamp.toMillis() - obj2.data().timeStamp.toMillis()
          );
        });
        this.setState({chats: docs, loaded: true});
      }).then;
  };

  componentWillUnmount() {
    if (this.subscriber) this.subscriber();
  }

  onMessageUpdate = (val) => {
    this.setState({
      sentMessage: val,
    });
  };

  onSendMessage = () => {
    firestore().collection('Chats').add({
      message: this.state.sentMessage,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      platform: this.state.platform,
    });
    this.setState({
      sentMessage: '',
    });
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.chatArea}>
          <FlatList
            style={{flex: 1}}
            data={this.state.chats}
            renderItem={({item}) => this.renderItem(item.data(), item.id)}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={Styles.chatInput}>
          <TextInput
            style={Styles.textInput}
            value={this.state.sentMessage}
            placeholder="Type here..."
            onChangeText={(val) => this.onMessageUpdate(val)}
          />
          <TouchableOpacity onPress={() => this.onSendMessage()}>
            <Icon name="send" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderItem(item, id) {
    if (item.platform === 'App' && item.timeStamp != null) {
      return (
        <View style={Styles.recieverText}>
          <Text>{item.message}</Text>
        </View>
      );
    } else if (item.platform === 'Web') {
      return (
        <View style={Styles.senderText}>
          <Text>{item.message}</Text>
        </View>
      );
    }
  }
}
