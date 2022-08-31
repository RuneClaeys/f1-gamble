import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class grandPrixDto {
  @IsString()
  @IsNotEmpty()
  seasonId: string;

  @IsNumber()
  @IsNotEmpty()
  round: number;

  @IsString()
  @IsOptional()
  circuit: string;

  @IsDateString()
  @IsOptional()
  qualifyingTimestamp?: Date;

  @IsDateString()
  @IsOptional()
  raceTimestamp?: Date;

  @IsDateString()
  @IsOptional()
  sprintTimestamp?: Date;
}
