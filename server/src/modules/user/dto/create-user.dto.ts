import { Role } from 'src/constant/enums';

export class CreateUserDto {
  fullName!: string;
  email!: string;
  confirmPassword!: string;
  password!: string;
  role!: Role;
}
