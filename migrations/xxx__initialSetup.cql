CREATE TABLE IF NOT EXISTS sessions (
	sid text,
	expires timestamp,
	session text,
	PRIMARY KEY (sid)
);
---
CREATE TABLE IF NOT EXISTS schema_version (
	zero int,
	version int,
	migration_timestamp timestamp,
	PRIMARY KEY (zero, version)
)