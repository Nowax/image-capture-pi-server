// @flow
const FirebaseService = require('./services/FirebaseService');
const ImageRecorder = require('./ImagesRecorder');

console.log('starting the app');

const service = new FirebaseService();
const recorder = new ImageRecorder(service, 'bogdan');

recorder.start();
