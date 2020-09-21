import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBEVmc4WW4L78iexf79pRTrZE-_r0XKklg",
  authDomain: "chatapp-6ec22.firebaseapp.com",
  databaseURL: "https://chatapp-6ec22.firebaseio.com",
  projectId: "chatapp-6ec22",
  storageBucket: "chatapp-6ec22.appspot.com",
  messagingSenderId: "594183946070",
  appId: "1:594183946070:web:80ea2f755d2559c8eee0f7",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
