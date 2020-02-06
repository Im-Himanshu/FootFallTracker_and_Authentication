
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