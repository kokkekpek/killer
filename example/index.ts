import Killer, {KillerEvents} from '../'
import Logger, {LoggerInterface, ConfigInterface} from 'logger'

const loggerConfig: ConfigInterface = {
    console: {
        enabled: true,
        level: 'info'
    },
    file: {
        enabled: false,
        level: 'info',
        directory: './log',
        maxSize: 10 * 1024 * 1024
    }
}
const logger: LoggerInterface = new Logger(loggerConfig)
const killer: Killer = new Killer(process, logger)
logger.info('PRESS CTRL+C')
killer.on(KillerEvents.KILL, () => {
    logger.finish('EXIT').then(() => {
        process.exit()
    })
})
setInterval(() =>{}, 3600000)
