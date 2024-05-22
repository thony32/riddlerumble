CREATE MIGRATION m1ar7lkiabpwcjauaj7bcvtwmqpsfpaalqlhoye64ckn32d73u6l6a
    ONTO m15kt5w7qbxrrp4h7iwzdnou4e7ceqleb3pejtyqy6u7th7trmvhxa
{
  ALTER TYPE default::Player_stats {
      ALTER LINK id_room {
          RENAME TO Room;
      };
  };
  ALTER TYPE default::Player_stats {
      ALTER LINK id_user {
          RENAME TO User;
      };
  };
  ALTER TYPE default::Temp_room {
      ALTER LINK id_room {
          RENAME TO Room;
      };
  };
  ALTER TYPE default::Temp_room {
      ALTER LINK id_user {
          RENAME TO User;
      };
  };
};
