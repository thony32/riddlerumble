CREATE MIGRATION m1vcgdjen2ryi4tz7qpunt2bmz5i7ypalbyzciy6pysqh2s3zbromq
    ONTO m1gcghkvyfbf2au2jbe26bkfuovff7tkro4nqdn2iazgzvxvl2zbpq
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  DROP EXTENSION edgeql_http;
};
