import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  raceNumber: number;
}
