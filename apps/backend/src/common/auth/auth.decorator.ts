import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// TODO: later can add a decorator that would make sure the user exists and load the user into the context
export const UserId = createParamDecorator((_: any, ctx: GqlExecutionContext) => {
  const contextType = ctx.getType();
  if (contextType === 'graphql') {
    const { req: request } = ctx.getArgByIndex(2);
    const { userId } = request;
    return userId || null;
  }

  const http = ctx.switchToHttp();
  const { userId } = http.getRequest();
  return userId || null;
});
