import { IsNotEmpty, IsString } from 'class-validator';

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  permanentNumber: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  url: string;

  @IsString()
  @IsNotEmpty()
  givenName: string;

  @IsString()
  @IsNotEmpty()
  familyName: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  nationality: string;
}
