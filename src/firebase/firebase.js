import app from 'firebase/app'
import 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyAZZpOKmwiWcyMK9GjpODM4TwuSTQDDB9w",
  authDomain: "arm-bsuir-2.firebaseapp.com",
  databaseURL: "https://arm-bsuir-2.firebaseio.com",
  projectId: "arm-bsuir-2",
  storageBucket: "arm-bsuir-2.appspot.com",
  messagingSenderId: "2294988295",
  appId: "1:2294988295:web:1e3007c3fa7da77bfff4a2",
  measurementId: "G-QBCYQHTX6Z"
};

class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig)
  }
}
export default Firebase