CREATE MIGRATION m1xkh3trkpt55lx3nl4mofa6a6pklga36soptbaerxjygw7mjp677q
    ONTO m1vcgdjen2ryi4tz7qpunt2bmz5i7ypalbyzciy6pysqh2s3zbromq
{
  ALTER TYPE default::Post {
      DROP PROPERTY content;
  };
  ALTER TYPE default::Post {
      DROP PROPERTY title;
  };
  CREATE TYPE default::Player_stats {
      CREATE REQUIRED PROPERTY id_room: std::uuid;
      CREATE REQUIRED PROPERTY id_user: std::uuid;
      CREATE REQUIRED PROPERTY score: std::float32;
  };
  CREATE TYPE default::Room {
      CREATE REQUIRED PROPERTY delay: std::int32;
      CREATE REQUIRED PROPERTY latitude: std::float32;
      CREATE REQUIRED PROPERTY longitude: std::float32;
      CREATE REQUIRED PROPERTY nb_players: std::int16;
      CREATE REQUIRED PROPERTY prompt: std::str;
  };
  CREATE TYPE default::Temp_room {
      CREATE REQUIRED PROPERTY id_room: std::uuid;
      CREATE REQUIRED PROPERTY id_user: std::uuid;
      CREATE REQUIRED PROPERTY latitude: std::float32;
      CREATE REQUIRED PROPERTY longitude: std::float32;
      CREATE REQUIRED PROPERTY time: std::int16;
  };
  CREATE TYPE default::Users {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY avatar: std::str;
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY full_name: std::str;
      CREATE REQUIRED PROPERTY nationality: std::str;
      CREATE REQUIRED PROPERTY pseudo: std::str;
      CREATE REQUIRED PROPERTY score: std::int16;
  };
};
