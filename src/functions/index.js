const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express')
const app = express()
 
exports.api = functions.https.onRequest(app)