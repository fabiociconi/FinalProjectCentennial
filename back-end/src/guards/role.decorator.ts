import { ReflectMetadata } from '@nestjs/common';
import { RoleType } from '@app/entity';

export const Roles = (...roles: RoleType[]) => ReflectMetadata('roles', roles);