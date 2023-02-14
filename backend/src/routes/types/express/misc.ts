import * as e from 'express';

export interface IRequest<T = void> extends e.Request {
  body: T;
}

