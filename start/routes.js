'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group('version1', function () {
  Route.post("/register", "AuthenticateController.register");
  Route.post("/authenticate", "AuthenticateController.authenticate");
  
  Route.resource("tweets", "TweetController")
    .apiOnly()
    .except("update")
    .middleware(["auth"]);

}).prefix('api/v1')