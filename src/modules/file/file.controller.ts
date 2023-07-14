import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as fs from 'fs';
import { join } from 'path';
import { FileNotFoundException } from './common/file.exception';
import { Public } from '../auth/decorators/public.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/allFiles')
  async getAllFiles() {
    return await this.fileService.findFilesList();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Req() req) {
    const user = req.user;
    await this.fileService.createFile(file, user);
  }

  @Public()
  @Get('/o/r/:id/:filename')
  async getFile(
    @Param('id') id: number,
    @Param('filename') filename: string,
    @Res() res,
  ) {
    const fileInfo = await this.fileService.findFile(id);
    const filePath = join(fileInfo.destination, fileInfo.destname);
    if (fs.existsSync(filePath)) {
      try {
        const file = fs.createReadStream(filePath);
        const resHeader = {
          'Content-Type': fileInfo.type,
          'Content-Disposition': `attachment; filename="${filename}"`,
        };
        res.set(resHeader);
        file.pipe(res);
      } catch (error) {
        throw new FileNotFoundException('The file has been lost.');
      }
    }
  }
}
