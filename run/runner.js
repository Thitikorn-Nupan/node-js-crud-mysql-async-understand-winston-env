const serviceRestModules = require('../services/rest-modules-service'), ServiceRestModules = new serviceRestModules()
const logger = require('../log/logging')
const routerBookStore = require('../router/book-router')

class Runner {
    constructor() {
        const application = ServiceRestModules.express()
        application.use('/api', routerBookStore).listen(3000, error => {
            if (error) {
                logger.debug('the problem has had in port 3000 : ' + error.message)
            } else {
                logger.silly('you are in port 3000')
            }
        })
    }
}

new Runner()