import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { exitsFolder } from 'src/utils/dir';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './common/entity/file.entity';
import * as path from 'path';
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
          const originalName = path.parse(file.originalname).name;
          const extension = path.parse(file.originalname).ext;
          cb(null, `${originalName}-${uniqueSuffix}${extension}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf-8',
        );
        cb(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024,
        fieldNameSize: 50,
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
