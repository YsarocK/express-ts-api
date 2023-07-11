import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { tokenTypes } from 'config/token';
import moment from 'moment';

dotenv.config();

export class JWToken {
  static jwtSecret = process.env.JWT_PRIVATE_KEY as jwt.Secret;

  static async generateToken(data: string, expires: moment.Moment, type: string) {
    const payload = {
      sub: data,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, this.jwtSecret);
  }

  static async verifyToken(token: string) {
    return new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(token, this.jwtSecret, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded as JwtPayload);
      });
    })
  }

  static async generateAuthTokens(userId: string) {
    const accessTokenExpires = moment().add(process.env.ACCESS_EXPIRATION_HOURS, 'hours');
    const accessToken = await this.generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(process.env.REFRESH_EXPIRATION_DAYS, 'days');
    const refreshToken = await this.generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  static async generateMagicToken(userId: string) {
    const expires = moment().add(process.env.MAGIC_EXPIRATION_MINUTES, 'minutes');
    const verifyEmailToken = this.generateToken(userId, expires, tokenTypes.VERIFY_MAIL);
    return verifyEmailToken;
  }
}