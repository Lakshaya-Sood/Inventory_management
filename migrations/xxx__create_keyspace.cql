CREATE KEYSPACE <your_keyspace_name>
WITH durable_writes = true
AND replication = {
	'class' : 'SimpleStrategy',
	'replication_factor' : 1
};