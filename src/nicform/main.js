import "./assets/main.css";

import { createApp } from "vue";
import text from "./App.vue";
import router from './router/index'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBJz4MJYplNl-vff1e6aETMKRlvuyVw3GU",
    authDomain: "login-60f7c.firebaseapp.com",
    projectId: "login-60f7c",
    storageBucket: "login-60f7c.appspot.com",
    messagingSenderId: "76505786643",
    appId: "1:76505786643:web:f9770bebb9a080b47792e6",
    measurementId: "G-L1TCPS17Z7"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const app = createApp(text);

app.use(router)
app.mount("#ajay");
