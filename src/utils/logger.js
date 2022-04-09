const winston = require('winston');
const colors = require('colors');
const path = require('path');

class Logger {
    constructor(LoggingFile) {
        process.env.NODE_ENV === 'production' ? 
        this.logger = winston.createLogger(
            {
                transports: [
                    new winston.transports.File({ filename: LoggingFile })
                ],
            } 
        ) : null;
    }

    info(text) {
        let d = new Date();
        process.env.NODE_ENV === 'production' ? 
            this.logger.log({
                level: "info",
                message:
                    `${d.getHours()}:${d.getMinutes()} - ${d.getDate()}:${d.getMonth() + 1}:${d.getFullYear()} | Info: ` + text,
            }) 
            : null;
        console.log(
            colors.green(
                `${d.getDate()}:${d.getMonth() + 1}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
            ) + colors.yellow(" | Info: " + text)
        );
    }

    error(text) {
        let d = new Date();
        process.env.NODE_ENV === 'production' ? 
            this.logger.error({
                level: "error",
                message:
                    `${d.getHours()}:${d.getMinutes()} - ${d.getDate()}:${d.getMonth() + 1}:${d.getFullYear()} | Error: ` + text,
            }) 
            : null;
        console.log(
            colors.red(
                `${d.getDate()}:${d.getMonth() + 1}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
            ) + colors.red(" | Error: " + text)
        );
    }
}

const logger = new Logger(path.join(__dirname, '..', 'logs', 'Logs.log'));

module.exports = {
    logger
}