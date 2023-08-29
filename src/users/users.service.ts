import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model, isValidObjectId } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFields = { ...createUserDto };
    try {
      for (const key in userFields) {
        if (
          userFields.hasOwnProperty(key) &&
          typeof userFields[key] === 'string'
        ) {
          userFields[key] = userFields[key].toLowerCase();
        }
      }
      const findUser = await this.findOne(createUserDto.email);
      if (!findUser) {
        const user = await new this.userModel({
          email: createUserDto.email,
        }).save();

        return user;
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findAll(): Promise<User[]> {
    const user = this.userModel.find().exec();
    if (!user) {
      throw new NotFoundException('No existen usuarios');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    let user: User;

    if (isValidObjectId(id)) {
      user = await this.userModel.findById(id);
    }

    if (!user) {
      throw new NotFoundException('No existe con ese id de busqueda no existe');
    }
    return user;
  }
  async findOne(email: string): Promise<User | boolean> {
    const findUser = await this.userModel.findOne({
      email,
    });
    if (findUser[0]) {
      if (findUser[0].images.length > 0) {
        return true;
      }
      return findUser[0];
    }
    return false;
  }
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('usuario ya existe');
    }
    throw new InternalServerErrorException('usuario no se creo,chequiar');
  }
}
