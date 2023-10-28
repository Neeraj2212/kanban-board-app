import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUserId } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { tokenData, findUser } = await this.authService.login(userData);

      res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn, path: '/' });
      res.status(200).json({ data: findUser, message: 'login', token: tokenData.token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;
      const logOutUserData: User = await this.authService.logout(userId);

      res.cookie('Authorization', [''], { maxAge: 0 });
      logOutUserData.password = undefined;
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
