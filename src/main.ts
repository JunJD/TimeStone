import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './common/filters/error.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 拦截器
   */
  /**响应拦截：添加状态码 */
  app.useGlobalInterceptors(new TransformInterceptor());

  /**
   * 异常过滤
   */
  /**异常: 报错catch并透出 */
  app.useGlobalFilters(new AnyExceptionFilter());

  await app.listen(7182);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
