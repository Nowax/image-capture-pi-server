// @flow
const admin = require('firebase-admin');
const serviceAccount = require('../../monitor-garage-firebase-adminsdk-ty1oy-bcb7316676.json');
const upath = require('upath');

class FirebaseService {
    constructor() {
        this.remoteDir = 'garage';

        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://monitor-garage.firebaseio.com',
            storageBucket: 'monitor-garage.appspot.com'
        });

        this.firestore = admin.firestore();
        this.firestore.settings({
            timestampsInSnapshots: true
        });
        this.storage = admin.storage().bucket();
    }

    upload(path, groupName, fileName) {
        const normalizedPath = upath.normalize(path);
        console.log('Uploading file: ', normalizedPath);
        return this.storage
            .upload(normalizedPath, {
                destination: `${this.remoteDir}/${groupName}/${fileName}`,
                metadata: {
                    metadata: {
                        fileName: fileName
                    }
                }
            })
            .then(file => {
                console.log('Upload suceeded: ', normalizedPath);
                return file[0].getSignedUrl({
                    action: 'read',
                    expires: '01-01-2500'
                });
            })
            .then(url => {
                console.log('Signed URL retrieved');
                console.log(fileName);
                console.log(url[0]);
                return this.firestore.collection(groupName).add({
                    fileName: fileName,
                    imageUrl: url[0]
                });
            })
            .then(doc => {
                return console.log('Firestore updated suceeded');
            })
            .catch(e => {
                console.log('Upload error: ', e);
                process.exit(1);
            });
    }
}

module.exports = FirebaseService;
