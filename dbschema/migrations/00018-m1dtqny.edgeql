CREATE MIGRATION m1dtqnyo3kgwzjmihys6gl4tpbjdfaw5ye3roeovjkpucpz5l5e4pq
    ONTO m1bhhaq22ubwrgkn4jlasx7r6jaxcez3woyydnwrd5wglpnfwhnawq
{
  ALTER TYPE default::Temp_room {
      ALTER PROPERTY time {
          SET TYPE std::str USING (<std::str>.time);
      };
  };
};
