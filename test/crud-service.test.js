/**
 //  got error is i use jest as name SyntaxError: Identifier 'jest' has already been declared
 // The error occurs because Jest injects a local wrapper variable named jest into your CommonJS module scope
 How to Fix It
 Rename your variable: Change any local declaration or import named jest to something else (e.g., const { jest: myJest } = require('@jest/globals')).
 Disable injected globals: Configure Jest to turn off global injections via injectGlobals: false in your Jest Documentation configuration if you prefer importing explicit globals.
 */
const { beforeEach, describe, expect,  jest: commonJest, test } = require('@jest/globals');

// Replace the logger methods used by CrudService so the test does not create
// Winston transports or write log output while testing service behavior.
// commonJest.mock('../log/logging', () => ({
//     logger: {
//         debug: commonJest.fn(),
//         warn: commonJest.fn(),
//     },
// }));

// Jest unit tests isolate the service from MySQL by mocking the database pool.
commonJest.mock('../connect/database-connect', () => ({
    query: commonJest.fn(),
}));

const pool = require('../connect/database-connect');
const CrudService = require('../services/crud-service');
const SqlStatementService = require('../services/sql-statement-service');
const sqlCrudService = require("../services/sql-statement-service");

describe('CrudService', () => {
    let crudService;

    beforeEach(() => {
        crudService = new CrudService();
        pool.query.mockReset();
    });

    test('reads all books', async () => {
        const books = [
            { id: 1, name: 'Clean Code', price: 1, productiondate: new Date() },
            { id: 2, name: 'Refactoring', price: 1, productiondate: new Date() }
        ];

        // Simulate a successful database query:
        // null means no error, books is the query result, and [] represents fields.
        pool.query.mockImplementation((sql, callback) => callback(null, books)); //  pool.query(sqlCrudService.reads, (error, results) => {})

        // Execute the function with fake request and response objects.
        const results = crudService.reads();

        // expect() verifies that the mock and response were used as expected.
        // await expect() because this results is promise response
        await expect(results).resolves.toEqual({
            status: 202,
            message: 'accepted',
            books,
        });
        expect(pool.query).toHaveBeenCalledWith(SqlStatementService.reads, expect.any(Function));
        /*
            *** expect(pool.query) tells Jest which mock function to inspect.
            *** expect.any(Function) means the second argument can be any function In the controller, this is the database callback
            pool.query(sqlCrudService.reads, (error, results) => {});
        */
    });

    test('reads one book by id', async () => {
        const book = [{ id: 1, name: 'Clean Code', price: 1, productiondate: new Date() }];

        // Simulate a successful database query:
        // null means no error, books is the query result, and [] represents fields.
        pool.query.mockImplementation((sql, values, callback) => callback(null, book)); // pool.query(sqlCrudService.read, [id], (error, result) => {})

        // Execute the function with fake request and response objects.
        const results = crudService.read(1);

        await expect(results).resolves.toEqual({
            status: 202,
            message: 'accepted',
            book,
        });
        expect(pool.query).toHaveBeenCalledWith(SqlStatementService.read, [1], expect.any(Function));
        /*
          *** expect(pool.query) tells Jest which mock function to inspect.
          *** expect.any(Function) means the second argument can be any function In the controller, this is the database callback
          pool.query(sqlCrudService.read, [id], (error, result) => {})
        */
    });

    test('creates a book', async () => {
        const result = { insertId: 1, affectedRows: 1 };

        // Simulate a successful database query:
        // null means no error, books is the query result, and [] represents fields.
        pool.query.mockImplementation((sql, values, callback) => callback(null, result)); //  pool.query(sqlCrudService.create, [name, price, productiondate], (error, result) => {})


        await expect(crudService.create('Book 1', 12.5, '2026-01-01')).resolves.toEqual({
            status: 201,
            message: 'created',
            book: result,
        });
        expect(pool.query).toHaveBeenCalledWith(
            SqlStatementService.create,
            ['Book 1', 12.5, '2026-01-01'],
            expect.any(Function),
        );
        /*
          *** expect(pool.query) tells Jest which mock function to inspect.
          *** expect.any(Function) means the second argument can be any function In the controller, this is the database callback
          pool.query(sqlCrudService.create, [name, price, productiondate], (error, result) => {})
        */
    });


    /// updates test 2 case
    test('updates a book', async () => {
        const result = { affectedRows: 1 };

        pool.query.mockImplementation((sql, values, callback) => callback(null, result));//  pool.query(sqlCrudService.update, [name, price, productiondate, id], (error, result) => {})

        await expect(crudService.update('Book 1', 15, '2026-02-01', 1)).resolves.toEqual({
            status: 202,
            message: 'accepted',
            book: result,
        });

    });

    test('reports when an update did not affect a book', async () => {
        pool.query.mockImplementation((sql, values, callback) => (
            callback(null, { affectedRows: 0 })
        ));

        await expect(crudService.update('Missing book', 15, '2026-02-01', 99)).resolves.toEqual({
            status: 202,
            message: 'accepted',
            book: 'there were no book id 99 for updating',
        });
    });

    /// deletes test 2 case
    test('deletes a book', async () => {
        const result = { affectedRows: 1 };
        pool.query.mockImplementation((sql, values, callback) => callback(null, result));
        await expect(crudService.delete(1)).resolves.toEqual({
            status: 200,
            message: 'ok',
            book: result,
        });
    });

    test('reports when a delete did not affect a book', async () => {
        pool.query.mockImplementation((sql, values, callback) => (
            callback(null, { affectedRows: 0 })
        ));
        await expect(crudService.delete(99)).resolves.toEqual({
            status: 200,
            message: 'ok',
            book: 'there were no book id 99 for deleting',
        });
    });
});
