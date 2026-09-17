const pool = require('../connect/database-connect')
const sqlCrudService = require('./sql-statement-service')
const path = require('path')
const filename = path.basename(__filename);
const {createLogger} = require('../log/logging-v2')

const logger = createLogger(filename);

class CrudService {

    reads = () => {
        return new Promise((resolve, reject) => {
            pool.query(sqlCrudService.reads, (error, results) => {
                if (error) {
                    logger.debug('found some error from reads async maybe the results are returned null : ' + reject(`${error.message}`))
                    throw error
                } else {
                    return resolve({
                        status: 202,
                        message: 'accepted',
                        books: results
                    })
                }
            }) // ended query
        }) // ended returns
    }

    read = (id) => {
        return new Promise((resolve, reject) => {
            pool.query(sqlCrudService.read, [id], (error, result) => {
                if (error) {
                    logger.debug('found some error from read async maybe id of book is not alive : ' + reject(`${error.message}`))
                    throw error
                } else {
                    // logger.info('result return : '+result) // result return : [object Object]
                    // console.log(result) // using console.log can see the object
                    return resolve({
                        status: 202,
                        message: 'accepted',
                        book: result
                    })
                }
            }) // ended query
        }) // ended returns
    }

    update = (name, price, productiondate, id) => {
        return new Promise((resolve, reject) => {
            pool.query(sqlCrudService.update, [name, price, productiondate, id], (error, result) => {
                if (error) {
                    logger.debug('found some error from update async maybe id of book is not alive : ' + reject(`${error.message}`))
                    throw error
                } else {
                    // logger.info('result return : '+result) // result return : [object Object]
                    // console.log(result) // using console.log can see the object
                    if (result.affectedRows === 0) {
                        return resolve({
                            status: 202,
                            message: 'accepted',
                            book: `there were no book id ${id} for updating`
                        })
                    } else {
                        return resolve({
                            status: 202,
                            message: 'accepted',
                            book: result
                        })
                    }
                }
            }) // ended query
        }) // ended returns
    }

    create = (name, price, productiondate) => {
        return new Promise((resolve, reject) => {
            pool.query(sqlCrudService.create, [name, price, productiondate], (error, result) => {
                if (error) {
                    logger.debug('found some error from create async maybe id of book is not alive : ' + reject(`${error.message}`))
                    throw error
                } else {
                    // logger.info('result return : '+result) // result return : [object Object]
                    // console.log(result) // using console.log can see the object
                    return resolve({
                        status: 201,
                        message: 'created',
                        book: result
                    })
                }
            }) // ended query
        }) // ended returns
    }

    delete = (id) => {
        return new Promise((resolve, reject) => {
            pool.query(sqlCrudService.delete, [id], (error, result) => {
                if (error) {
                    logger.debug('found some error from delete async maybe id of book is not alive : ' + reject(`${error.message}`))
                    throw error
                } else {
                    // logger.info('result return : '+result) // result return : [object Object]
                    // console.log(result) // using console.log can see the object
                    if (result.affectedRows === 0) {
                        return resolve({
                            status: 200,
                            message: 'ok',
                            book: `there were no book id ${id} for deleting`
                        })
                    } else {
                        return resolve({
                            status: 200,
                            message: 'ok',
                            book: result
                        })
                    }
                }
            }) // ended query
        }) // ended returns
    }
}

module.exports = CrudService

