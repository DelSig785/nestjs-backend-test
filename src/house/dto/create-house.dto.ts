import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHouseDto {
    @IsNotEmpty()
    // @IsOptional()
    userId: number;
    
    @IsNotEmpty()
    address: string;
    
    @IsNotEmpty()
    cost: number;
}
