Considering you have ionic,cordova,Android SDK, Gradle etc.  all set up 

Creating the Ionic app steps :

ionic start FaceDetector blank

$ ionic cordova plugin add cordova-plugin-camera
$ npm install @ionic-native/camera


ionic cordova run android -lc
ionic  serve -l