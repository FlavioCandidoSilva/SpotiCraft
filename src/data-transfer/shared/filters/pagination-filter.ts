import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderTypeEnum } from './enums/order-type.enum';

export class PaginationFilter {
  @Expose()
  @Transform(({ value }) => {
      const parsedValue = parseInt(value, 10);
      return Math.min(Math.max(parsedValue, 1), 100);
  }, { toClassOnly: true })
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Quantity per page', default: 10, minimum: 1, maximum: 100 })
  public quantity: number = 10;

  @Expose()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Page number', default: 1, minimum: 1 })
  public page: number = 1;

  @Exclude({ toPlainOnly: true })
  public orderType: OrderTypeEnum;

  @Exclude({ toPlainOnly: true })
  public orderField: string;

  constructor(orderField: string = 'id', orderType: OrderTypeEnum = OrderTypeEnum.ASC) {
    this.orderField = orderField;
    this.orderType = orderType;
  }
}