const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);q\
// import{ db }from '../fire/firestore'
const express = require('express')
const app = express()
  
app.get('/rooms/room1', (req, res) => {
  res.send('hello')
})

app.post('/rooms/room1/generalChat', (req, res) => {
  
})




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// exports.sendMessage = functions.firestore
//   .document('rooms/room1/actions/{actionId}')
//   .onCreate(event => {
//     // Get an object representing the document
//     // e.g. {'name': 'Marie', 'age': 66}
//     var newMessage = event.data.data();
//     console.log(newMessage)

//     playersRef = admin.firestore().collection('/rooms/room1/players')

  
//     playersRef.get()
//       .then(querySnapshot => {
//         if (querySnapshot.docs) {
//           let docs = querySnapshot.docs 
//           for (let doc of docs) {
//             return admin.firestore()
//               .collection(doc.ref.path + '/inbox')
//               .add({
//                 handle: newMessage.message,
//                 message: newMessage.message,
//                 type: newMessage.type
//               })
//           }
//         } else {
//           return new Error("Profile doesn't exist")
//         }
//       })
//       .catch(function(error) {
//         console.log(error);
//       })
//     })

exports.api = functions.https.onRequest(app)