CREATE MIGRATION m1ta5nmy64uopeumbnuhwle5bsaqvf6kdnw5gaxgjxznkh4iptx3cq
    ONTO initial
{
  CREATE TYPE default::Post {
      CREATE REQUIRED PROPERTY content: std::str {
          SET default := '';
      };
      CREATE REQUIRED PROPERTY title: std::str;
  };
};
