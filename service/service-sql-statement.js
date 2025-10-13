class ServiceSqlStatement {
    static reads = 'select * from books_2 ;'
    static read = 'select * from books_2 where id = ? ;'
    static create = 'insert into books_2 (name,price,productiondate) values(?,?,?) ;'
    static delete = 'delete from books_2 where id = ? ;'
    static update = 'update books_2 set name = ? , price = ? , productiondate = ? where id = ? ;'
}

module.exports = ServiceSqlStatement
