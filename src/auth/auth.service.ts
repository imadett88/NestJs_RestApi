import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticate, Role } from './interface/Role';
import {faker} from '@faker-js/faker'
import { AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {


    users = [
        {
            id: faker.datatype.uuid(),
            userName:"Imad Ettamen",
            password:"12345",
            role:Role.Admin,
        },
        {
            id: faker.datatype.uuid(),
            userName:"Ahmed Jko",
            password:"11111",
            role:Role.User,
        }
        
    ]


    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        const user = this.users.find(
          (u) =>
            u.userName === authenticateDto.userName &&
            u.password === authenticateDto.password,
        );
    
        if (!user) throw new NotFoundException('Invalid credentials');
    
        const token = sign({ ...user }, 'secrete');
    
        return { token, user };
      }


}
