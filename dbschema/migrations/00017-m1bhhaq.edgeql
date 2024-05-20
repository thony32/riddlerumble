CREATE MIGRATION m1bhhaq22ubwrgkn4jlasx7r6jaxcez3woyydnwrd5wglpnfwhnawq
    ONTO m1osepciqff3toocnfauxapp7yphwoasq56to6rfg3inc7fs6mxegq
{
  ALTER TYPE default::Temp_room {
      ALTER PROPERTY time {
          SET TYPE std::int64;
      };
  };
};
