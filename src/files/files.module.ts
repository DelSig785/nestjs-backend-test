import { Module } from "@nestjs/common";
import { FileService } from "./files.service";


@Module({
    providers: [FileService],
    // exports: []
})

export class FileModule {}