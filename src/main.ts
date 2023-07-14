import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './common/filters/error.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 1. 全局验证管道，用于验证传入请求的数据
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换请求正文中的数据
      whitelist: true, // 过滤验证对象中不在验证装饰器中定义的属性
      forbidNonWhitelisted: true, // 如果有非白名单字段存在则禁止请求
      validationError: {
        target: false, // 返回详细的验证错误信息
      },
    }),
  );

  /**
   * 2. 拦截器, 响应拦截：添加状态码
   */
  app.useGlobalInterceptors(new TransformInterceptor());

  /**
   * 3. 异常过滤, 报错catch并透出
   */
  app.useGlobalFilters(new AnyExceptionFilter());

  await app.listen(7182);
  console.log(`应用程序运行在: ${await app.getUrl()}`);
}
bootstrap();
