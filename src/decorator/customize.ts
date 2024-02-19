import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const RESPONSE_KEY = 'response_message';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); //key:value
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_KEY, message);
