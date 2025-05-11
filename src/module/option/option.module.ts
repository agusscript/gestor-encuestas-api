import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Option } from "./entity/option.entity";
import { OptionService } from "./service/option.service";
import { OptionRepository } from "./repository/option.repository";
import { OptionMapper } from "./mapper/option.mapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Option])
  ],
  controllers: [],
  providers: [
    OptionService,
    OptionRepository,
    OptionMapper
  ],
  exports: [OptionService]
})
export class OptionModule { }
