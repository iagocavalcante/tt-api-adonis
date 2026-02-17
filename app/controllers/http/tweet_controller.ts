import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'

export default class TweetController {
  async index({ }: HttpContext) {
    const tweets = await Tweet.query().with('user').exec()
    return tweets
  }

  async store({ request, auth }: HttpContext) {
    const data = request.only(['content', 'tweet_id'])
    const tweet = await Tweet.create({ userId: auth.user!.id, ...data })
    return tweet
  }

  async show({ params }: HttpContext) {
    const tweet = await Tweet.findOrFail(params.id)
    return tweet
  }

  async destroy({ params, auth, response }: HttpContext) {
    const tweet = await Tweet.findOrFail(params.id)

    if (tweet.userId !== auth.user!.id) {
      return response.status(401)
    }

    await tweet.delete()
  }
}
