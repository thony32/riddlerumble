CREATE MIGRATION m1a7kw4cxlrfyqwvld6rz3zxclof3n6hncd27nfwasvdcwuomaiebq
    ONTO m1le3hhaw5ucbyeqsqmrp2wih746aajx6qpj45mds3hsp47le6mzoa
{
  ALTER TYPE default::Room {
      DROP PROPERTY nb_players;
  };
};
