/* eslint-disable unicorn/no-empty-file */
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import type { TokenType, UserRole } from '../../constants';
// import { ErrorCode, Token } from '../../constants';
// import { ApiConfigService } from '../../shared/services/api-config.service';
// import type { User } from '../users/entities';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private configService: ApiConfigService, private usersService: UsersService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: configService.authConfig.publicKey
//         });
//     }

//     async validate(args: { userId: Uuid; role: UserRole; type: TokenType }): Promise<User> {
//         if (args.type !== Token.ACCESS_TOKEN) {
//             throw new UnauthorizedException(ErrorCode.UNAUTHORIZED);
//         }

//         const user = await this.usersService.findOne({
//             // FIXME: issue with type casts
//             id: args.userId as never,
//             role: args.role
//         });

//         if (!user) {
//             throw new UnauthorizedException(ErrorCode.UNAUTHORIZED);
//         }

//         return user;
//     }
// }
