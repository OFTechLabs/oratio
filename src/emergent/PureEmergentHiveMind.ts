import { IHiveMind } from './HiveMind';
import { Locale } from '../language/i18n/BasicLocale';
import { IHiveResponse } from './HiveResponse';

export class PureEmergentHiveMind implements IHiveMind {

    process(input: string, locale: Locale, clientModel: any): Promise<IHiveResponse> {
        throw new Error('Method not implemented.');
    }
}
