import { Injectable } from '@nestjs/common';
import { Logger } from './logger.service'

@Injectable()
export class ErrorHandler {

    constructor(private _logger: Logger) { }

    async handleError(error) {
        await this._handleError(error)
        if (!this.isTrustedError(error)) {
            process.exit(1);
        }
    }

    isTrustedError(error) {
        return error.isOperational;
    }

    private _handleError(error) {
        const errorData = {
            data: error.data,
            stack: error.stack
        };
        const message = error.message.error || error.message;
        return Promise.all([
            this._logger.error(message, errorData),
            this._sendMailToAdminIfCritical(error),
            this._saveInOpsQueueIfCritical(error)
        ]);
    }

    private async _sendMailToAdminIfCritical(error) { }

    private async _saveInOpsQueueIfCritical(error) { }

}