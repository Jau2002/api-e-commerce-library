import type { Response } from 'express';

type SignToken = Response<any, Record<string, any>> | undefined;
