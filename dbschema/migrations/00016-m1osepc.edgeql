CREATE MIGRATION m1osepciqff3toocnfauxapp7yphwoasq56to6rfg3inc7fs6mxegq
    ONTO m12vxuhipayjwdfyoxafnnczt5q3xcbt2lrr3znoezou3naukw2w5q
{
  ALTER TYPE default::Room {
      CREATE REQUIRED PROPERTY isActive: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
