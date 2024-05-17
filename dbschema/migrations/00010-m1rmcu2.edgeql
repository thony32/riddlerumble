CREATE MIGRATION m1rmcu2csjbxxfcq2bmb3kyuizuhttup26wmtrkrxqab5a7b3dv6la
    ONTO m1ozlmqr7zhij3sjbj2dpfa4lwtlwcd2k272e6knwhjb5cvbzvmwqq
{
  ALTER TYPE default::Room {
      CREATE REQUIRED PROPERTY level: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
