(function main() {
    const query = 'create table author (id number, name string, age number, city string, state string, country string)';
    const tableName = getTableName(query);
    const columns = getColumns(query);
    let database = createDatabase(tableName);
    getDatabaseColumns(database.tables[tableName].columns, columns);
    console.log(JSON.stringify(database, null, 2));
})();

function getTableName(query) {
    return query.match(/table (\w+)/)[1];
}

function getColumns(query) {
    return query.match(/\(.+\)/g)[0].slice(1, -1).split(', ');
}

function createDatabase(tableName) {
    return {
        tables: {
            [tableName]: {
                columns: {},
                data: []
            }
        }
    }
}

function getDatabaseColumns(databaseColumns, columns) {
    for(let column of columns) {
        const [key, value] = column.split(' ');
        Object.assign(databaseColumns, { [key]: value });
    }
}