CREATE MIGRATION m1ftl3nplqnyu4turqohouo3a6qzubj4yo67ngfayn5qd2mdz5jqrq
    ONTO m1hp6t23kxs5y6z3nzux764zzhiiuvixowevfqp2nitizwro6muz4a
{
  ALTER TYPE default::Temp_room {
      DROP PROPERTY id_room;
  };
  ALTER TYPE default::Temp_room {
      CREATE REQUIRED LINK id_room: default::Room {
          SET REQUIRED USING (<default::Room>{});
      };
  };
  ALTER TYPE default::Temp_room {
      DROP PROPERTY id_user;
  };
  ALTER TYPE default::Temp_room {
      CREATE REQUIRED LINK id_user: default::Users {
          SET REQUIRED USING (<default::Users>{});
      };
  };
};
