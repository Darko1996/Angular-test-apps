// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'api/posts',
  emailUrl: 'https://localhost/api/contact.php',

  firebase : {
    apiKey: "AIzaSyDeoG7XquEPaCdjKFeKbNW5Dj7aSjkuoIw",
    authDomain: "darpet-3cc33.firebaseapp.com",
    databaseURL: "https://darpet-3cc33.firebaseio.com",
    projectId: "darpet-3cc33",
    storageBucket: "darpet-3cc33.appspot.com",
    messagingSenderId: "34805576298",
    appId: "1:34805576298:web:fbf43493cb7743e0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
