import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    // @Length(4, 32, {message: 'Name must be at least 4 characters'})
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @Length(6, 16, {message: 'Password must be at least 6 characters'})
    @IsOptional()
    password?: string;

    @IsNumber()
    salary?: number;
}
