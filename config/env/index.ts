'use strict';

import { config as configAll } from './all.environment';
import { config as configDevelopment } from './development.environment';
import { config as configStaging } from './staging.environment';
import { config as configProduction } from './production.environment';
import { IEnvironment } from './environment.interface';

declare var process;
var env = process.env.NODE_ENV;
var configuration;

switch (env) {
    case 'production':
        configuration = configProduction;
        break;
    case 'staging':
        configuration = configStaging;
        break;
    case 'test':
        configuration = configDevelopment;
        break;
    default:
        configuration = configDevelopment;
}

export var config = <IEnvironment> Object.assign({}, configAll, configuration);
export * from './environment.interface';