CREATE MIGRATION m1hp6t23kxs5y6z3nzux764zzhiiuvixowevfqp2nitizwro6muz4a
    ONTO m1rmcu2csjbxxfcq2bmb3kyuizuhttup26wmtrkrxqab5a7b3dv6la
{
  ALTER TYPE default::Room {
      ALTER PROPERTY nb_players {
          SET TYPE std::int32;
      };
  };
};
