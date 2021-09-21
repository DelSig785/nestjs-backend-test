import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
    // @IsNotEmpty()
    fullName: string;

    password?: string;

    // @IsEmail()
    email?: string;

    // @IsNumber()
    salary?: number;

    // @IsNotEmpty()
    address?: string;
    
    // @IsNotEmpty()
    readonly cost?: number;
}
