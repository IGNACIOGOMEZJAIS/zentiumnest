import { PartialType } from '@nestjs/mapped-types';
import { CreateZentiumApiUserDto } from './create_zentium_api_user.dto';

export class UpdateZentiumApiUserDto extends PartialType(CreateZentiumApiUserDto) {}
