import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  MinLength,
} from 'class-validator';

export class LocationDto {
  @IsNumber()
  latitude?: number;

  @IsNumber()
  longitude?: number;
}

export class EditUserDto {
  @IsNotEmpty()
  uuid?: string;

  @IsOptional()
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @MinLength(4)
  @IsEmail()
  email?: string;

  @IsOptional()
  birthday?: Date;

  @IsOptional()
  genre?: string;

  @IsOptional()
  searchGenre?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber({}, { each: true }) // Validate each item in the array
  @IsArray()
  @IsOptional()
  ageRange?: number[];

  @IsOptional()
  location?: LocationDto;

  @IsOptional()
  city?: string;

  @IsOptional()
  isAdmin?: boolean;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  images?: string[];

  @IsOptional()
  postedBy?: string;

  @IsNumber()
  @IsOptional()
  distance?: number;

  @IsNumber()
  @IsOptional()
  artistPreference?: number;

  @IsNumber()
  @IsOptional()
  moviePreference?: number;
}
