import { Logger } from './logger.service';
import { ErrorHandler } from './error.service';

export const COMMON_PROVIDERS = [
    Logger,
    ErrorHandler
];

export * from './error.service';
export * from './logger.service';
