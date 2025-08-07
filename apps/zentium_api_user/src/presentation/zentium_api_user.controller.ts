import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZentiumApiUserService } from '../services/zentium_api_user.service';
import { CreateZentiumApiUserDto } from '../domain/dto/create_zentium_api_user.dto';
import { UpdateZentiumApiUserDto } from '../domain/dto/update_zentium_api_user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Zentium Users')
@Controller('zentium-users')
export class ZentiumApiUserController {
  constructor(
    private readonly zentiumApiUserService: ZentiumApiUserService,
  ) {}


  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios (HTTP)' })
  findAllHttp() {
    return this.zentiumApiUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un usuario por ID (HTTP)' })
  findOneHttp(@Param('id') id: string) {
    return this.zentiumApiUserService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario (HTTP)' })
  createHttp(@Body() createDto: CreateZentiumApiUserDto) {
    return this.zentiumApiUserService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID (HTTP)' })
  updateHttp(@Param('id') id: string, @Body() updateDto: UpdateZentiumApiUserDto) {
    return this.zentiumApiUserService.update(id, updateDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un usuario (HTTP)' })
  patchHttp(@Param('id') id: string, @Body() updateDto: Partial<UpdateZentiumApiUserDto>) {
    return this.zentiumApiUserService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID (HTTP)' })
  removeHttp(@Param('id') id: string) {
    return this.zentiumApiUserService.remove(id);
  }

  // -------------------- RABBITMQ ROUTES --------------------

  @MessagePattern('createZentiumApiUser')
  @ApiOperation({ summary: 'Crear un usuario (RabbitMQ)' })
  create(@Payload() createDto: CreateZentiumApiUserDto) {
    return this.zentiumApiUserService.create(createDto);
  }

  @MessagePattern('findAllZentiumApiUser')
  @ApiOperation({ summary: 'Obtener todos los usuarios (RabbitMQ)' })
  findAll() {
    return this.zentiumApiUserService.findAll();
  }

  @MessagePattern('findOneZentiumApiUser')
  @ApiOperation({ summary: 'Buscar un usuario por ID (RabbitMQ)' })
  findOne(@Payload() id: string) {
    return this.zentiumApiUserService.findOne(id);
  }

  @MessagePattern('updateZentiumApiUser')
  @ApiOperation({ summary: 'Actualizar un usuario (RabbitMQ)' })
  update(@Payload() data: { id: string; updateZentiumApiUserDto: UpdateZentiumApiUserDto }) {
    return this.zentiumApiUserService.update(data.id, data.updateZentiumApiUserDto);
  }

  @MessagePattern('removeZentiumApiUser')
  @ApiOperation({ summary: 'Eliminar un usuario (RabbitMQ)' })
  remove(@Payload() id: string) {
    return this.zentiumApiUserService.remove(id);
  }
}
