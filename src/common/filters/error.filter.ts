/**
 * HttpException filter.
 * @file 全局异常拦截器
 */

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter<any> {
  // catch是拦截器的核心方法，所有的异常都会被这个方法捕获,
  // 其中exception就是抛出的异常，host是当前请求的上下文
  catch(exception: any, host: ArgumentsHost) {
    // switchToHttp方法可以获取到当前请求的上下文, 上下文中包含了request和response
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 如果异常中没有getStatus方法，说明不是HttpException，我们就手动设置状态码为500
    if (!('getStatus' in exception)) {
      this.handleNoGetStatus(request, response);
      return;
    }
    // 如果是HttpException，我们就调用getStatus方法获取状态码
    response?.status(exception.getStatus()).json({
      success: false,
      error: {
        timestamp: new Date().toLocaleString(),
        path: request.url,
        msg:
          exception.message.message ||
          exception.message.error ||
          exception.message,
      },
    });
  }

  handleNoGetStatus(request, response) {
    response?.status(500).json({
      statusCode: 30001,
      timestamp: new Date().toISOString(),
      path: request.url,
      msg: '系统异常',
    });
  }
}
