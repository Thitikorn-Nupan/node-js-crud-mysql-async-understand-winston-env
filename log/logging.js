const {createLogger, format, transports} = require('winston')
const path = require('path')
class Logging {
    get logger() { // this function return Logger class
        return createLogger({
            level: 'silly',
            format: format.combine(
                format.label({label: path.basename(process.mainModule.filename)}),
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf(info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`)
            ),
            transports: [
                new transports.Console,
                new transports.File({filename: path.join(__filename, '../../info/info.log'), level: 'debug'})
            ]
            // this is order logger { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
        })
    }

}

module.exports = new Logging().logger




