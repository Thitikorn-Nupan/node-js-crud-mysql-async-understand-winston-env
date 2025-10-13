const serviceRestModules = require('../service/service-rest-modules'), ServiceRestModules = new serviceRestModules()
const crud = require('../crud/crud'), Crud = new crud()
const logger = require('../log/logging')
const bodyParser = ServiceRestModules.bodyParser,
    routerBookStore = ServiceRestModules.express.Router()

// set middleware for post,update,put method
routerBookStore.use(bodyParser.json())
routerBookStore.use(bodyParser.urlencoded({extended: true}))

routerBookStore.get('/reads', async (req, res) => {
    try {

        const books = await Crud.reads();
        return res.status(202).json(books);

    } catch (errors) {

        logger.debug('api /reads had the problem , please check : ' + errors.message)
        throw errors

    }
})

routerBookStore.get('/read/(:id)', async (req, res) => {
    try {

        const book = await Crud.read(req.params["id"]);
        return res.status(202).json(book);

    } catch (errors) {

        logger.debug('api /read had the problem , please check : ' + errors.message)
        throw errors

    }
})

routerBookStore.post('/create', async (req, res) => {
    try {
        let {name , price, productiondate} = req.body
        const book = await Crud.create(name , price, productiondate);
        return res.status(201).json(book);

    } catch (errors) {

        logger.debug('api /create had the problem , please check : ' + errors.message)
        throw errors

    }
})

routerBookStore.put('/(:id)/update', async (req, res) => {
    try {
        let id = req.params["id"]
        let {name , price, productiondate} = req.body
        const book = await Crud.update(name , price, productiondate,id);
        return res.status(202).json(book);

    } catch (errors) {

        logger.debug('api /(id)/update had the problem , please check : ' + errors.message)
        throw errors

    }
})

routerBookStore.delete('/(:id)/delete', async (req, res) => {
    try {
        let id = req.params["id"]
        const book = await Crud.delete(id);
        return res.status(200).json(book);

    } catch (errors) {

        logger.debug('api /(id)/delete had the problem , please check : ' + errors.message)
        throw errors

    }
})

module.exports = routerBookStore