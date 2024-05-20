CREATE MIGRATION m1yeqnzukonwnbvkhpgypgsxnun5zwqwfqrwfjbygn3yibe2deebgq
    ONTO m1ftl3nplqnyu4turqohouo3a6qzubj4yo67ngfayn5qd2mdz5jqrq
{
  ALTER TYPE default::Player_stats {
      DROP PROPERTY id_room;
  };
  ALTER TYPE default::Player_stats {
      CREATE REQUIRED LINK id_room: default::Room {
          SET REQUIRED USING (<default::Room>{});
      };
  };
  ALTER TYPE default::Player_stats {
      DROP PROPERTY id_user;
  };
  ALTER TYPE default::Player_stats {
      CREATE REQUIRED LINK id_user: default::Users {
          SET REQUIRED USING (<default::Users>{});
      };
  };
};
