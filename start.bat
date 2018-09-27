Echo off
SET DRP_CF_HTTP_PORT=30001
SET DRP_PF_CASSANDRA_1=cassandra://localhost:9042/eac_master
SET DRP_CF_STAGE=local
npm start
