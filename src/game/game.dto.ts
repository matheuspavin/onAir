import { IsArray, ArrayMinSize, Validate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const AllowedValues = ['X', 'O', ''];

@ValidatorConstraint({ name: 'isValidGrid', async: false })
export class IsValidGrid implements ValidatorConstraintInterface {
  validate(grid: string[][], args: ValidationArguments) {
    if (!Array.isArray(grid)) return false;
    const size = grid.length;
    return (
      size > 0 &&
      grid.every(
        (row) =>
          Array.isArray(row) &&
          row.length === size &&
          row.every((cell) => AllowedValues.includes(cell)),
      )
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Grid must be a square (NxN) array of "X", "O", or ""';
  }
}

export class GameInputDto {
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsValidGrid)
  grid: string[][];

  @IsInt()
  @Type(() => Number)
  gridSize: number;
}
