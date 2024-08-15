import { CanActivate, ExecutionContext, Global, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import jwks from 'jwks-rsa';
import { AppConfig } from '~/app/config/types';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { VerifyOptions, Algorithm, verify as jwtVerify } from 'jsonwebtoken';
import { CacheService } from '~/common/cache.service';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  private jwksClient: jwks.JwksClient;
  private jwksKeyCacheKey = 'jwksKeyCacheKey';

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService<AppConfig, true>,
    private readonly cacheService: CacheService,
  ) {
    const authDomain = this.configService.get('KINDE_DOMAIN');
    this.jwksClient = jwks({
      jwksUri: `${authDomain}/.well-known/jwks.json`,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    let req;
    if ((context.getType() as string) === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      req = ctx.getContext().req;
    } else {
      req = context.switchToHttp().getRequest();
    }

    const token = this.extractTokenFromHeaders(req.headers);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.verifyToken(token);

      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token format');
      }

      req.userId = payload.sub;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeaders(headers: any): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async verifyToken(token: string): Promise<any> {
    const getKey = (header, callback) => {
      // TODO: add key cache (?)
      const cachedKey = this.cacheService.get(this.jwksKeyCacheKey);

      if (cachedKey) {
        callback(null, cachedKey);
        return;
      }

      this.jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err || !key) {
          return callback(err, '');
        }

        const signingKey = key.getPublicKey();
        this.cacheService.set(signingKey, this.jwksKeyCacheKey);
        callback(null, signingKey);
      });
    };

    const options: VerifyOptions = {
      // issuer: verifyOpts.issuer,
      // audience: verifyOpts.audience,
      algorithms: ['RS256' as Algorithm],
    };

    return new Promise((resolve, reject) => {
      jwtVerify(token, getKey, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
