const restModulesService = require('../services/rest-modules-service'), restModulesServiceObj = new restModulesService()
const crudService = require('../services/crud-service'), crudServiceObj = new crudService()
const bodyParser = restModulesServiceObj.bodyParser, routerBookStore = restModulesServiceObj.express.Router()
const path = require('path')
const filename = path.basename(__filename);
const {createLogger} = require('../log/logging-v2')

const logger = createLogger(filename);

// set middleware for post,update,put method
routerBookStore.use(bodyParser.json())
routerBookStore.use(bodyParser.urlencoded({extended: true}))

routerBookStore.get('/reads', async (req, res) => {
    try {
        const books = await crudServiceObj.reads();
        return res.status(202).json(books);
    } catch (errors) {
        logger.debug(`api /reads had the problem , please check : ${errors.message}`  )
        throw errors
    }
})

routerBookStore.get('/read/(:id)', async (req, res) => {
    try {
        const book = await crudServiceObj.read(req.params["id"]);
        return res.status(202).json(book);
    } catch (errors) {
        logger.debug(`api /read had the problem , please check : ${errors.message}` )
        throw errors
    }
})

routerBookStore.post('/create', async (req, res) => {
    try {
        const {name , price, productiondate} = req.body
        const book = await crudServiceObj.create(name , price, productiondate);
        return res.status(201).json(book);
    } catch (errors) {
        logger.debug(`api /create had the problem , please check : ${errors.message}` )
        throw errors
    }
})

routerBookStore.put('/(:id)/update', async (req, res) => {
    try {
        const id = req.params["id"]
        const {name , price, productiondate} = req.body
        const book = await crudServiceObj.update(name , price, productiondate,id);
        return res.status(202).json(book);
    } catch (errors) {
        logger.debug(`api /(id)/update had the problem , please check : ${errors.message}`)
        throw errors

    }
})

routerBookStore.delete('/(:id)/delete', async (req, res) => {
    try {
        const id = req.params["id"]
        const book = await crudServiceObj.delete(id);
        return res.status(200).json(book);
    } catch (errors) {
        logger.debug(`api /(id)/delete had the problem , please check : ${errors.message}` )
        throw errors
    }
})

module.exports = routerBookStore