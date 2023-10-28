import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import UserModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { v4 as uuidv4 } from 'uuid';

class AuthService {
  public users = UserModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'UserData is empty');

    const findUser = await this.users.findOne({ where: { username: userData.username } });
    if (findUser) throw new HttpException(409, `This username already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = await this.users.create({ ...userData, id: uuidv4(), password: hashedPassword });

    createUserData.password = undefined;
    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ tokenData: TokenData; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'UserData is empty');

    const findUser = await this.users.findOne({ where: { username: userData.username } });
    if (!findUser) throw new HttpException(404, `This username ${userData.username} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    findUser.password = undefined;
    return { findUser, tokenData };
  }

  public async logout(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'User Id is empty');

    const findUser = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(404, `User not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { userId: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24 * 1000;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
