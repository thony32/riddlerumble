CREATE MIGRATION m1ozlmqr7zhij3sjbj2dpfa4lwtlwcd2k272e6knwhjb5cvbzvmwqq
    ONTO m1h6jfnqqw575d53fxwz3usoazmz5wr2nb5vokdj6byam327ldzj4a
{
  ALTER TYPE default::Room {
      ALTER PROPERTY delay {
          SET TYPE std::int64;
      };
  };
};
