const userService = require('../services/user-service')
class UserController {
    async registration(res, req, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 3600 * 1000,
                httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(res, req, next) {
        try {

        } catch (e) {

        }
    }

    async logout(res, req, next) {
        try {

        } catch (e) {

        }
    }

    async activate(res, req, next) {
        try {

        } catch (e) {

        }
    }

    async refresh(res, req, next) {
        try {

        } catch (e) {

        }
    }

    async getUsers(res, req, next) {
        try {
            res.json(['123', '123'])
        } catch (e) {

        }
    }
}

module.exports = new UserController()
