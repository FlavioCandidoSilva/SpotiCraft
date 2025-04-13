import { Module } from '@nestjs/common';
import { createMapper } from './shared/mapper/createMapper';

@Module({
  imports: [],
  providers: [
    {
      provide: 'Mapper',
      useFactory: () => {
        const mapper = createMapper();
        mapper.register([]); 
        return mapper;
      },
    },
  ],
  exports: ['Mapper'],
})
export class ApplicationModule {}
