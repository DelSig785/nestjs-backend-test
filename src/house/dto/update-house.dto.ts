import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateHouseDto {
    // @IsNotEmpty()
    // readonly id?: number;
    
    @IsNotEmpty()
    // @IsOptional()
    userId: number;

    @IsNotEmpty()
    address: string;
    
    @IsNotEmpty()
    cost: number;
}
