(function main() {
    const database = {
        createTable(query) {
            if (!query.startsWith('create table')) throw new Error('Invalid command');
            const tableName = getTableName(query);
            const columns = getColumns(query);
            const database = {
                tables: {
                    [tableName]: {
                        columns: {},
                        data: []
                    }
                }
            };
            getDatabaseColumns(database.tables[tableName].columns, columns);
            console.log(JSON.stringify(database, null, 2));
        },
        execute(query) {
            return this.createTable(query);
        },
    };
    const query = 'create table author (id number, name string, age number, city string, state string, country string)';
    database.execute(query);
})();

function getTableName(query) {
    return query.match(/table (\w+)/)[1];
}

function getColumns(query) {
    return query.match(/\(.+\)/g)[0].slice(1, -1).split(', ');
}

function getDatabaseColumns(databaseColumns, columns) {
    for(let column of columns) {
        const [key, value] = column.split(' ');
        Object.assign(databaseColumns, { [key]: value });
    }
}
