https://undraw.co/
1. updating the default angular cli to latest 8.3.1 --- to support the typescreipt 3.5.X
npm install --save-dev @angular/cli@latest
https://stackoverflow.com/questions/44525746/global-angular-cli-version-greater-than-local-version/44526528
    for angular and type script data 
    https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3

2. it was still not supporting hard coding to remove the warning -- it may cause problem in later steps, keep an eye for it 
    but this is necessary for new tensorFlow.js to work on :-
    possibly have to update to unstable 9.0.0 for stable control for typescript -
    See how : https://www.angularjswiki.com/angular/update-angular-cli-version-ng-update-to-latest-6-7-versions/

    use this official step guide for that : https://update.angular.io/#8.1:9.0
    or typescript 3.6.4|3.7.2 both should work  -- try updating them here only
    how to supress the warning :
    https://stackoverflow.com/questions/57216110/the-angular-compiler-requires-typescript-3-4-0-and-3-5-0-but-3-5-3-was-found


3. Running npm i @tensorflow/tfjs


4. for browser case this tutorial worked 
        https://medium.com/angular-in-depth/create-your-own-image-classifier-with-angular-and-tensorflow-js-5b1bc2391424
    something is happening in its given library so don't know what is the difference
     but here able to access the camera from the app and stream it to the user, appropriate access need to be asked for before using mediaStreaming
5. for using actual tensor flow this one worked for recognizing the type of number : USED THE MODEL GIVEN IN github repo
    https://rubikscode.net/2019/09/09/integration-of-tensorflow-model-into-angular-application/
6.  running ionic camera integration : 
ionic cordova plugin add cordova-plugin-camera
npm install @ionic-native/camera

this one open the camera app seprately and report only when the image is taken --> not useful
7. trying this :
ionic cordova plugin add cordova-plugin-camera-preview
npm install @ionic-native/camera-preview

8. ionic cordova platform add android
9. ionic cordova run android -lc

chrome://inspect/#extensions : you can change the url directly in there.

10. element was not coming so adding the css variable to this other wise white screen was coming :- 
    --background: #ffff0000 !important;
11. the above camera-preview was obsolete and supported only <6.3.0 it was showing 
Installing "cordova-plugin-compat" for android
        Plugin doesn't support this project's cordova-android version. cordova-android: 8.1.0, failed version requirement:
            <6.3.0
        Skipping 'cordova-plugin-compat' for android


12. now following this tutorial by simon : https://ionicacademy.com/capture-audio-video-local/
    REMOVING THE plugin ionic cordova plugin remove cordova-plugin-media
        adding it again : 
            # Install Cordova Plugins
        ionic cordova plugin add cordova-plugin-media-capture
        ionic cordova plugin add cordova-plugin-media
        ionic cordova plugin add cordova-plugin-file
        
        # Install NPM Packages
        npm install @ionic-native/media-capture @ionic-native/media @ionic-native/file
    replace the import like this : 
        import { MediaCapture} from '@ionic-native/media-capture/ngx';
        import { Media } from '@ionic-native/media/ngx';
        import { File } from '@ionic-native/file/ngx';


13. Just discovered : https://emojiscavengerhunt.withgoogle.com/ 
    THIS Site is working in the browser only so can work on their solution as well for making thing works
related problem discussed here : https://blog.tensorflow.org/2018/10/how-we-built-emoji-scavenger-hunt-using-tensorflow-js.html


14 facing error in androidManifest.xml failing to build andorid so 
 ionic corova platform remove andorid
 ionic corova platform add andorid
 



 Overall Conclusion, everything that work in browser should work here also just that the permission need to aksed explicitly from the app via 
 No it was problem related to the media-capture plugin it is discussed in detail here : 
 https://stackoverflow.com/questions/24848301/cordova-audio-recording-issues-in-some-devices-phonegap-media-plugin