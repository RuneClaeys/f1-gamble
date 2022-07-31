import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class SeasonDto {
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsDateString()
  @IsNotEmpty()
  seasonStartDate: Date;

  @IsDateString()
  @IsNotEmpty()
  seasonEndDate: Date;
}
