class RestModulesService {
    #express
    #bodyParser
    constructor() {
        this.#express = require('express')
        this.#bodyParser = require('body-parser')
    }
    get express() {
        return this.#express
    }
    get bodyParser() {
        return this.#bodyParser
    }
}

module.exports = RestModulesService

