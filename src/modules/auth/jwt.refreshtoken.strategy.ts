/* eslint-disable unicorn/no-empty-file */
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import { ApiConfigService } from '../../shared/services/api-config.service';
// import { UsersService } from '../users/users.service';
// import type ITokenPayload from './token-payload.interface';

// interface IRequestHeaders extends Request {
//     refreshtoken: string;
// }
// interface IRequest {
//     headers: IRequestHeaders;
// }

// @Injectable()
// export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
//     constructor(private userService: UsersService, private configService: ApiConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromHeader('refreshtoken'),
//             ignoreExpiration: false,
//             secretOrKey: configService.authConfig.publicKey,
//             passReqToCallback: true
//         });
//     }

//     validate(req: IRequest, payload: ITokenPayload) {
//         console.log(req);
//         console.log(payload);

//         // if (payload.type !== Token.REFRESH_TOKEN) {
//         //     throw new UnauthorizedException(ErrorCode.UNAUTHORIZED);
//         // }

//         // const user = await this.userService.findByIdOrEmail({ userId: payload.userId });

//         // if (!user) {
//         //     throw new UnauthorizedException(ErrorCode.UNAUTHORIZED);
//         // }

//         return true;
//         // return { id: user.id, email: user.email, role: user.role };
//     }
// }
