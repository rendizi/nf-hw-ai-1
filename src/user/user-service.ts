import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from './types/response';

class UserService {
  usersInDatabase: User[] = [
    {
      id: 1,
      email: 'albkfil@gmail.com',
      username: 'alibackend',
    },
    {
      id: 2,
      email: 'bazarjackson@gmail.com',
      username: 'bazarjackson',
    },
    {
      id: 3,
      email: 'samaltman@gmail.com',
      username: 'openaiceo',
    },
  ];

  getUserById(id: number): User | null {
    return this.usersInDatabase.find((user) => user.id === id) || null;
  }
  getUsers(): User[] {
    return this.usersInDatabase;
  }

  createUser(userDto: CreateUserDto): User {
    const newUser: User = {
      id: 4,
      email: userDto.email,
      username: userDto.username || 'user',
    };
    this.usersInDatabase.push(newUser);
    return newUser;
  }
}

export default UserService;
