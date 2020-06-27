import {EventEmitter} from 'events'
import Killer from '../src/killer/Killer'
import {EmptyLogger, LoggerInterface} from 'logger'
import ProcessEvents from '../src/killer/ProcessEvents'
import KillerEvents from '../src/killer/KillerEvents'


it('Killer SIGINT', done => {
    const logger: LoggerInterface = new EmptyLogger()
    const emitter: EventEmitter = new EventEmitter()
    const killer: Killer = new Killer(emitter, logger)
    killer.on(KillerEvents.KILL,() => {
        done()
    })
    emitter.emit(ProcessEvents.SIGINT)
})

it('Killer SIGUSR1', done => {
    const logger: LoggerInterface = new EmptyLogger()
    const emitter: EventEmitter = new EventEmitter()
    const killer: Killer = new Killer(emitter, logger)
    killer.on(KillerEvents.KILL,() => {
        done()
    })
    emitter.emit(ProcessEvents.SIGUSR1)
})

it('Killer SIGUSR2', done => {
    const logger: LoggerInterface = new EmptyLogger()
    const emitter: EventEmitter = new EventEmitter()
    const killer: Killer = new Killer(emitter, logger)
    killer.on(KillerEvents.KILL,() => {
        done()
    })
    emitter.emit(ProcessEvents.SIGUSR2)
})

it('Killer UNCAUGHT_EXCEPTION', done => {
    const logger: LoggerInterface = new EmptyLogger()
    const emitter: EventEmitter = new EventEmitter()
    const killer: Killer = new Killer(emitter, logger)
    killer.on(KillerEvents.KILL,() => {
        done()
    })
    emitter.emit(ProcessEvents.UNCAUGHT_EXCEPTION)
})