import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZentiumApiUserService } from '../services/zentium-api-user.service';
import { CreateZentiumApiUserDto } from '../domain/dto/create-zentium-api-user.dto';
import { UpdateZentiumApiUserDto } from '../domain/dto/update-zentium-api-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Zentium Users')
@Controller('zentium-users')
export class ZentiumApiUserController {
  constructor(private readonly zentiumApiUserService: ZentiumApiUserService) {}

  // HTTP routes
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  findAllHttp() {
    return this.zentiumApiUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un usuario por ID' })
  findOneHttp(@Param('id') id: string) {
    return this.zentiumApiUserService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario (debug)' })
  createHttp(@Body() createDto: CreateZentiumApiUserDto) {
    return this.zentiumApiUserService.create(createDto);
  }

  // Microservice routes
  @MessagePattern('createZentiumApiUser')
  create(@Payload() createDto: CreateZentiumApiUserDto) {
    return this.zentiumApiUserService.create(createDto);
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
