/// <reference types="node" />
import { EventEmitter } from 'events';
import { LoggerInterface } from 'logger';
export default class Killer extends EventEmitter {
    private _process;
    private _logger;
    constructor(process: EventEmitter, logger: LoggerInterface);
    /**
     * @description Catches CTRL+C event in console
     */
    private _catchCTRLC;
    /**
     * @description Catches `kill pid`. Example:
     *     'pm2 restart'
     */
    private _catchKillPid;
    /**
     * @description Catches uncaught exceptions
     */
    private _catchUncaughtException;
    private _onCatchCTRLC;
    private _onCatchSignalUserDefinedOne;
    private _onCatchSignalUserDefinedTwo;
    private _uncaughtException;
    private _kill;
}
