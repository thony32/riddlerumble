CREATE MIGRATION m1h6jfnqqw575d53fxwz3usoazmz5wr2nb5vokdj6byam327ldzj4a
    ONTO m16mfvgarrvfndhf4dqdibfbgii7ltipnvwasok44je4ioedowgqrq
{
  ALTER TYPE default::Room {
      CREATE REQUIRED PROPERTY user_pseudo: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
