CREATE MIGRATION m1le3hhaw5ucbyeqsqmrp2wih746aajx6qpj45mds3hsp47le6mzoa
    ONTO m1ar7lkiabpwcjauaj7bcvtwmqpsfpaalqlhoye64ckn32d73u6l6a
{
  ALTER TYPE default::Room {
      CREATE PROPERTY joker: std::str;
  };
};
