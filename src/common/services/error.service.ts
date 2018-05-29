import { Injectable } from '@nestjs/common';
import { Logger } from './logger.service'

@Injectable()
export class ErrorHandler {

    constructor(private _logger: Logger) { }

    async handleError(error) {
        await this._logger.error(error.message, {
            stack: error.stack,
            data: error.data
        });

        await this._sendMailToAdminIfCritical(error);
        await this._saveInOpsQueueIfCritical(error);
    }

    isTrustedError(error) {
        return error.isOperational;
    }

    private async _sendMailToAdminIfCritical(error) { }

    private async _saveInOpsQueueIfCritical(error) { }

}