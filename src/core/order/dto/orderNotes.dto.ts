import { ApiProperty } from '@nestjs/swagger';

import { OrderNotes } from '../types';

export class OrderNotesDto implements OrderNotes {
  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  isProblem: boolean;
}
