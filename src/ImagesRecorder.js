// @flow
const NodeWebcam = require( "node-webcam" );
const dayjs = require("dayjs")
const advancedFormat = require ("dayjs/plugin/advancedFormat")
const jimp = require('jimp');

let defaultOptions = {
 
    //Picture related
    width: 320,
    height: 240,
    quality: 100,
 
    //Delay to take shot
    delay: 0,
 
    //Save shots in memory
    saveShots: true,
 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "png",
 
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,
 
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "buffer",
 
    //Logging
    verbose: false
};

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const todayUTC = () => dayjs().format("YYYY-MM-DD")
class ImageRecorder {
    constructor(service, owner) {
        this.webcam = NodeWebcam.create( defaultOptions );
        this.firebase = service
        this.owner = owner
        dayjs.extend(advancedFormat)
    }

    async start() {
        this.captureImage()

        while (true) {
            console.log('Reloop')
            this.captureImage()
            await snooze(15 * 1000)
        }
    };

    captureImage() {
        this.webcam.capture("temporary_image", (err, data) => {
            jimp.read(data)
                .then( image => {
                    return image
                        .grayscale()
                        .resize(640, 480)
                        .quality(60)
                        .write("temporary_image.jpg")
                    })
                .then( () => {
                    this.firebase.upload("temporary_image.jpg", `${this.owner}-${todayUTC()}`,
                        this.generateRandomFileName("image"), this.owner, todayUTC())
                })
                .catch( err => console.log(err))
        })
    }

    generateRandomFileName(name) {
        const todayUTC = dayjs().format("-YYYY-MM-DD--kk-mm-ss")
        return `${name}${todayUTC}.jpg`;
    }
}

module.exports = ImageRecorder;
