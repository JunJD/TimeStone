import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { exitsFolder } from 'src/utils/dir';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './common/entity/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      storage: diskStorage({
        destination: async function (req, file, cb) {
          cb(null, await exitsFolder('./data/resource/'));
        },
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
