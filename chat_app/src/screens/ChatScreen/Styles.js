import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chatArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  senderText: {
    backgroundColor: 'lightblue',
    width: '50%',
    margin: 5,
    alignItems: 'center',
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 30,
  },
  recieverText: {
    backgroundColor: '#5ab9d1',
    width: '50%',
    margin: 5,
    alignItems: 'center',
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 30,
  },
  chatInput: {
    flexDirection: 'row',
    elevation: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#5ab9d1',
  },
  textInput: {
    width: '90%',
    backgroundColor: 'white',
    height: 40,
    color: 'black',
  },
});
