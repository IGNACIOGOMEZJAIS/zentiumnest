import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZentiumApiUserService } from '../services/zentium-api-user.service';
import { CreateZentiumApiUserDto } from '../domain/dto/create-zentium-api-user.dto';
import { UpdateZentiumApiUserDto } from '../domain/dto/update-zentium-api-user.dto';

@Controller()
export class ZentiumApiUserController {
  constructor(private readonly zentiumApiUserService: ZentiumApiUserService) {}

  @MessagePattern('createZentiumApiUser')
  create(@Payload() createZentiumApiUserDto: CreateZentiumApiUserDto) {
    return this.zentiumApiUserService.create(createZentiumApiUserDto);
  }

  @MessagePattern('findAllZentiumApiUser')
  findAll() {
    return this.zentiumApiUserService.findAll();
  }

  @MessagePattern('findOneZentiumApiUser')
  findOne(@Payload() id: string) {
    return this.zentiumApiUserService.findOne(id);
  }

  @MessagePattern('updateZentiumApiUser')
  update(@Payload() data: { id: string; updateZentiumApiUserDto: UpdateZentiumApiUserDto }) {
    return this.zentiumApiUserService.update(data.id, data.updateZentiumApiUserDto);
  }

  @MessagePattern('removeZentiumApiUser')
  remove(@Payload() id: string) {
    return this.zentiumApiUserService.remove(id);
  }
}
