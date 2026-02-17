import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthenticateController {
  async register({ request }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async authenticate({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }
}
