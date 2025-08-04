import { PartialType } from '@nestjs/mapped-types';
import { CreateZentiumApiUserDto } from './create-zentium-api-user.dto';

export class UpdateZentiumApiUserDto extends PartialType(CreateZentiumApiUserDto) {}
