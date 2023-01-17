import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users } from './schema';

export class UsersRepository {
    constructor(@InjectModel(Users.name) private readonly usersModel: Model<Users>) {}
}
