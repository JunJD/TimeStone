import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    // private readonly multerService: MulterService,
    private readonly fileService: FileService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Req() req) {
    const user = req.user;
    await this.fileService.createFile(file, user);
    // 处理上传的文件
  }
}
