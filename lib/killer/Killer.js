"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const KillerEvents_1 = __importDefault(require("./KillerEvents"));
const ProcessEvents_1 = __importDefault(require("./ProcessEvents"));
const KillerLogs_1 = __importDefault(require("./KillerLogs"));
class Killer extends events_1.EventEmitter {
    constructor(process, logger) {
        super();
        this._process = process;
        this._logger = logger;
        this._catchCTRLC();
        this._catchKillPid();
        this._catchUncaughtException();
    }
    /**
     * @description Catches CTRL+C event in console
     */
    _catchCTRLC() {
        this._process.on(ProcessEvents_1.default.SIGINT, this._onCatchCTRLC.bind(this));
    }
    /**
     * @description Catches `kill pid`. Example:
     *     'pm2 restart'
     */
    _catchKillPid() {
        this._process.on(ProcessEvents_1.default.SIGUSR1, this._onCatchSignalUserDefinedOne.bind(this));
        this._process.on(ProcessEvents_1.default.SIGUSR2, this._onCatchSignalUserDefinedTwo.bind(this));
    }
    /**
     * @description Catches uncaught exceptions
     */
    _catchUncaughtException() {
        this._process.on(ProcessEvents_1.default.UNCAUGHT_EXCEPTION, this._uncaughtException.bind(this));
    }
    _onCatchCTRLC() {
        this._logger.info(KillerLogs_1.default.INTERRUPTION);
        this._kill();
    }
    _onCatchSignalUserDefinedOne() {
        this._logger.info(KillerLogs_1.default.USER_DEFINED_ONE);
        this._kill();
    }
    _onCatchSignalUserDefinedTwo() {
        this._logger.info(KillerLogs_1.default.USER_DEFINED_TWO);
        this._kill();
    }
    _uncaughtException(error) {
        this._logger.error(KillerLogs_1.default.UNCAUGHT_EXCEPTION, error);
        this._kill();
    }
    _kill() {
        this.emit(KillerEvents_1.default.KILL);
    }
}
exports.default = Killer;
