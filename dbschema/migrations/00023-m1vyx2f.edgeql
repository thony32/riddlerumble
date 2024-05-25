CREATE MIGRATION m1vyx2famjugwnwwm7a4mpdz3dfljavegmdd3ciajrfubq3potlxqq
    ONTO m1a7kw4cxlrfyqwvld6rz3zxclof3n6hncd27nfwasvdcwuomaiebq
{
  ALTER TYPE default::Room {
      CREATE PROPERTY bombCoordinates: std::str;
  };
};
