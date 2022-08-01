import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  shortName?: string;
}
