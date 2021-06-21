const UserModel = require('../models/user-model')
const mailService = require('../services/mail-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`User with email ${email} already exists`)
        }
        const hashPassword = bcrypt(password, process.env.HASH_PASSWORD_SALT || 123) // Хэшируем пароль, 123 - соль
        const activationLink = uuid.v4() // Генерация ссылки для активации
        const user = await UserModel.create({email, password: hashPassword, activationLink})

        await mailService.sendActivationLink({email, activationLink})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            user: userDto,
            ...tokens
        }
    }
}

module.exports = new UserService()
