(function main() {
    const query = 'create table author (id number, name string, age number, city string, state string, country string)';
    const tableName = getTableName(query);
    const columns = getColumns(query);
    console.log(`tableName = "${tableName}"`);
    console.log(`columns = "${columns}"`);
})();

function getTableName(query) {
    return query.match(/table (\w+)/)[1];
}

function getColumns(query) {
    return query.match(/\(.+\)/g)[0].slice(1, -1).split(',');
}