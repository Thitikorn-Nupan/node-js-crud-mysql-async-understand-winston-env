const serviceRestModules = require('../service/service-rest-modules'), ServiceRestModules = new serviceRestModules()
const logger = require('../log/logging')
const routerBookStore = require('../router/router-book')

class Runner {
    #bodyParser
    #application

    constructor() {
        this.#bodyParser = ServiceRestModules.bodyParser
        this.#application = ServiceRestModules.express()
    }

    get main() {
        this.#application.use('/api',routerBookStore).listen( 3000 , error => {
            if (error) {
                logger.debug('the problem has had in port 3000 : '+error.message)
            }
            else {
                logger.silly('you are in port 3000')
            }
        })
    }
}

new Runner().main