CREATE MIGRATION m1yq5u22lvwogxhlspdjceox2y4ukghwyfag5edgaeowhoxudrixka
    ONTO m1yeqnzukonwnbvkhpgypgsxnun5zwqwfqrwfjbygn3yibe2deebgq
{
  ALTER TYPE default::Player_stats {
      CREATE PROPERTY created_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY modified_at: std::datetime {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Room {
      CREATE PROPERTY created_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY modified_at: std::datetime {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Temp_room {
      CREATE PROPERTY created_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY modified_at: std::datetime {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Users {
      CREATE PROPERTY created_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY modified_at: std::datetime {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
