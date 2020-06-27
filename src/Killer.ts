import {EventEmitter} from 'events'
import KillerEvents from './KillerEvents'
import ProcessEvents from './ProcessEvents'
import KillerLogs from './KillerLogs'
import {LoggerInterface} from 'logger'

export default class Killer extends EventEmitter {
    private _process: EventEmitter
    private _logger: LoggerInterface

    public constructor(process: EventEmitter, logger: LoggerInterface) {
        super()
        this._process = process
        this._logger = logger
        this._catchCTRLC()
        this._catchKillPid()
        this._catchUncaughtException()
    }

    /**
     * @description Catches CTRL+C event in console
     */
    private _catchCTRLC(): void {
        this._process.on(ProcessEvents.SIGINT, this._onCatchCTRLC.bind(this))
    }

    /**
     * @description Catches `kill pid`. Example:
     *     'pm2 restart'
     */
    private _catchKillPid(): void {
        this._process.on(ProcessEvents.SIGUSR1, this._onCatchSignalUserDefinedOne.bind(this))
        this._process.on(ProcessEvents.SIGUSR2, this._onCatchSignalUserDefinedTwo.bind(this))
    }

    /**
     * @description Catches uncaught exceptions
     */
    private _catchUncaughtException(): void {
        this._process.on(ProcessEvents.UNCAUGHT_EXCEPTION, this._uncaughtException.bind(this))
    }

    private _onCatchCTRLC(): void {
        this._logger.info(KillerLogs.INTERRUPTION)
        this._kill()
    }

    private _onCatchSignalUserDefinedOne(): void {
        this._logger.info(KillerLogs.USER_DEFINED_ONE)
        this._kill()
    }

    private _onCatchSignalUserDefinedTwo(): void {
        this._logger.info(KillerLogs.USER_DEFINED_TWO)
        this._kill()
    }

    private _uncaughtException(error: Error): void {
        this._logger.error(KillerLogs.UNCAUGHT_EXCEPTION, error)
        this._kill()
    }

    private _kill(): void {
        this.emit(KillerEvents.KILL)
    }
}