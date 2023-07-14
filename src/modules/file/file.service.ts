import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { awaitWrap } from 'src/utils/async';
import { checkFileHash } from 'src/utils/dir';
import { Repository } from 'typeorm';
import { File } from './common/entity/file.entity';
import { FileNotFoundException } from './common/file.exception';
@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private fileRepo: Repository<File>) {}

  // 上传文件到本地/存数据库
  async createFile(rawFile, user) {
    // 保存文件到数据库或者其他存储介质
    const filePath = join(rawFile?.destination, rawFile?.filename);
    const [err, md5] = await awaitWrap(checkFileHash(filePath));
    if (err) throw err;
    const existFile = this.fileRepo.create({
      type: rawFile.mimetype,
      size: rawFile.size,
      destname: rawFile.filename,
      destination: rawFile?.destination,
    });
    Object.assign(existFile, {
      ...existFile,
      filename: rawFile.originalname,
      hash: md5,
    });
    existFile.user = user;
    const file = await this.fileRepo.save(existFile);
    const { ...result } = file;
    return result;
  }

  // 查询所有的文件
  async findFilesList() {
    return await this.fileRepo.find();
  }

  // 根据id查询文件
  async findFile(id: number) {
    const file = await this.fileRepo.findOne({
      where: { id: id },
      select: { destination: true, destname: true, type: true },
    });
    if (file) return file;
    throw new FileNotFoundException('Can not find the file.');
  }
}
