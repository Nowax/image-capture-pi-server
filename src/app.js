// @flow
const FirebaseService = require('./services/FirebaseService');
const ImageRecorder = require('./ImagesRecorder')

const service = new FirebaseService();
const recorder = new ImageRecorder(service, "bogdan")

recorder.start()
