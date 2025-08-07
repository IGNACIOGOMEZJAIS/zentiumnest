import { Injectable } from '@nestjs/common';
import { CreateZentiumApiUserDto } from '../domain/dto/create_zentium_api_user.dto';
import { UpdateZentiumApiUserDto } from '../domain/dto/update_zentium_api_user.dto';
import { ZentiumApiUserRepository } from '../infrastructure/repositories/zentium_api_user.repository';
import { ZentiumApiUser } from '../domain/entities/zentium_api_user.entity';

@Injectable()
export class ZentiumApiUserService {
  constructor(
    private readonly userRepository: ZentiumApiUserRepository,
  ) {}

  create(createZentiumApiUserDto: CreateZentiumApiUserDto) {
    const newUser = new ZentiumApiUser(createZentiumApiUserDto);
    return this.userRepository.create(newUser);
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: string) {
    return this.userRepository.findOne({ id });
  }

  update(id: string, updateZentiumApiUserDto: UpdateZentiumApiUserDto) {
    return this.userRepository.findOneAndUpdate({ id }, updateZentiumApiUserDto);
  }

  remove(id: string) {
    return this.userRepository.findOneAndDelete({ id });
  }
}

