import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
const { combine, timestamp, simple, json, colorize } = winston.format;

@Injectable()
export class Logger implements LoggerService {

    private _logger: winston.LoggerInstance;
    private _colors: winston.AbstractConfigSetColors = {
        error: 'red',
        warn: 'yellow',
        info: 'white',
        verbose: 'green',
        debug: 'blue',
        silly: 'grey'
    };

    constructor() {
        this._logger = new winston.createLogger({
            level: 'info',
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log` 
                // - Write all logs error (and below) to `error.log`.
                //
                new winston.transports.File({
                    name: 'ErrorFile',
                    filename: 'logs/error.log',
                    level: 'error',
                    format: combine(timestamp(), json())
                }),
                new winston.transports.File({
                    name: 'CombinedFile',
                    filename: 'logs/combined.log',
                    format: combine(timestamp(), json())
                })
            ]
        });

        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        // 
        if (process.env.NODE_ENV !== 'production') {
            this._logger.add(new winston.transports.Console({
                format: combine(colorize(), timestamp(), simple())
            }));
        }
    }

    async log(message: string) {
        this._logger.info(message);
    }
    async error(message: string, trace: string) {
        this._logger.error(message);
    }
    async warn(message: string) {
        this._logger.warn(message);
    }
}
