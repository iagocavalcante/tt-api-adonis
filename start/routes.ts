/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthMiddleware from '#middleware/auth_middleware'

router.group(() => {
  router.post('/register', '#app/controllers/http/authenticate_controller.register')
  router.post('/authenticate', '#app/controllers/http/authenticate_controller.authenticate')

  router.get('/tweets', '#app/controllers/http/tweet_controller.index')
  router.post('/tweets', '#app/controllers/http/tweet_controller.store').use([AuthMiddleware])
  router.get('/tweets/:id', '#app/controllers/http/tweet_controller.show')
  router.delete('/tweets/:id', '#app/controllers/http/tweet_controller.destroy').use([AuthMiddleware])
}).prefix('/api/v1')
