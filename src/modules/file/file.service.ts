import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { awaitWrap } from 'src/utils/async';
import { checkFileHash } from 'src/utils/dir';

@Injectable()
export class FileService {
  async createFile(rawFile): Promise<string> {
    // 保存文件到数据库或者其他存储介质
    // const filePath = join(rawFile.destination, rawFile.filename);
    // const [err, md5] = await awaitWrap(checkFileHash(filePath));
    // if (err) throw err;
    // const existFile = this.fileRepo.create({
    //   type: rawFile.mimetype,
    //   size: rawFile.size,
    //   destname: rawFile.filename,
    //   destination: rawFile?.destination,
    // });
    // Object.assign(existFile, {
    //   ...existFile,
    //   //   creatorId: user,
    //   filename: rawFile.originalname,
    //   hash: md5,
    // });
    // const file = await this.fileRepo.save(existFile);
    // const { ...result } = file;
    return 'result';
  }
}
