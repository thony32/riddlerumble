CREATE MIGRATION m12vxuhipayjwdfyoxafnnczt5q3xcbt2lrr3znoezou3naukw2w5q
    ONTO m1yq5u22lvwogxhlspdjceox2y4ukghwyfag5edgaeowhoxudrixka
{
  ALTER TYPE default::Player_stats {
      ALTER PROPERTY modified_at {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Room {
      ALTER PROPERTY modified_at {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Temp_room {
      ALTER PROPERTY modified_at {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Users {
      ALTER PROPERTY modified_at {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
};
