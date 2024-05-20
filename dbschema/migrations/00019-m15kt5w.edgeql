CREATE MIGRATION m15kt5w7qbxrrp4h7iwzdnou4e7ceqleb3pejtyqy6u7th7trmvhxa
    ONTO m1dtqnyo3kgwzjmihys6gl4tpbjdfaw5ye3roeovjkpucpz5l5e4pq
{
  ALTER TYPE default::Temp_room {
      ALTER LINK id_room {
          RESET OPTIONALITY;
      };
      ALTER LINK id_user {
          RESET OPTIONALITY;
      };
  };
};
