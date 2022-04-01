// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverAuthUrl: "http://localhost:8080/v1/auth/login",
  serverSignUpUrl: "http://localhost:8080/v1/auth/signup",
  serverListItemsUrl: "http://localhost:8080/v1/listItems/",
  serverListsUrl: "http://localhost:8080/v1/lists/",
  serverProfileUrl : "http://localhost:8080/v1/users/" 
};

/* para probar localhost para pegarle a un api aunque este dockerizada 
 * utilizar ip del API
 * 
 * 
 * 
 * 
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
