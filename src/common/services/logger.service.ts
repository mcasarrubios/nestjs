import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class Logger implements LoggerService {

    private _logger: winston.LoggerInstance;

    constructor() {
        this._logger = new winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log` 
                // - Write all logs error (and below) to `error.log`.
                //
                new winston.transports.File({ name: 'ErrorFile', filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ name: 'CombinedFile', filename: 'logs/combined.log' })
            ]
        });

        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        // 
        if (process.env.NODE_ENV !== 'production') {
            this._logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        }
    }

    log(message: string) {
        this._logger.info(message);
    }
    error(message: string, trace: string) {
        this._logger.error(message);
    }
    warn(message: string) {
        this._logger.warn(message);
    }
}
