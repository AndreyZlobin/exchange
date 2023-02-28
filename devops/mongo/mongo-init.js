const username = "root";
const password = "example";
const dbName = 'exchange_db';

db.dropUser("root@admin")

db = db.getSiblingDB(dbName);
rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] });

// Create the root user in the analytics database
db.createUser({
  user: username,
  pwd: password,
  roles: [
    { role: "dbAdmin", db: dbName },
    { role: "readWrite", db: dbName }
  ]
});
// rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })

