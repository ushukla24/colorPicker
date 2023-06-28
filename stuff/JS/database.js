class Database {

  constructor() {
    this.initialize();
  }

  initialize() {
    firebase.initializeApp({
      apiKey: "AIzaSyAC-vZePqzuKyVybmFzv6lZcdEXWjOq8RM",
      authDomain: "color-picker-576fd.firebaseapp.com",
      databaseURL: "https://color-picker-576fd.firebaseio.com",
      projectId: "color-picker-576fd",
      storageBucket: "color-picker-576fd.appspot.com",
      messagingSenderId: "272598635230",
      appId: "1:272598635230:web:43c868b24c103f61a3284f"
    });
    this.database = firebase.firestore();

    this.networkData = this.database.collection("Network Weights and Biases");
    this.data = this.database.collection("Data");
  }

  addColor(c, textColor) {
    this.data.add({
      "color": c._array.slice(0, 3),
      "text color": textColor,
      "status": "unchecked"
    });
  }

  async getNewColor() {
    var querySnapshot = await this.data.where("status", "==", "unchecked").limit(1).get();
    if (querySnapshot.empty) {
      return false;
    } else {
      return (Object.assign(querySnapshot.docs[0].data(), {
        "id": querySnapshot.docs[0].id
      }));
    }
  }

  delData(id) {
    this.data.doc(id).delete();
  }

  authData(id) {
    this.data.doc(id).update({
      "status": "ready to use"
    });
  }

  setNetwork(biases, weights1, weights2) {
    var biasObj = {};
    var weight1Obj = {};
    var weight2Obj = {};
    biases.forEach((biasLayer, i) => {
      biasObj[`biasLayer${i+1}`] = biasLayer;
    });
    weights1.forEach((weightSet, i) => {
      weight1Obj[`weightSet${i+1}`] = weightSet;
    });
    weights2.forEach((weightSet, i) => {
      weight2Obj[`weightSet${i+1}`] = weightSet;
    });
    this.networkData.doc("Biases").set(biasObj);
    this.networkData.doc("Weights1").set(weight1Obj);
    this.networkData.doc("Weights2").set(weight2Obj);
  }

}