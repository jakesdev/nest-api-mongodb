import { Controller } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        @InjectConnection() private readonly mongoConnection: Connection,
        private usersService: UsersService
    ) {}
}
