import { Request } from 'express';
export interface RequestWithLocals extends Request {
  locals?: any;
}
