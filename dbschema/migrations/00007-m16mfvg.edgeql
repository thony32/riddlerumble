CREATE MIGRATION m16mfvgarrvfndhf4dqdibfbgii7ltipnvwasok44je4ioedowgqrq
    ONTO m1ldzxbzl5iiwvp7qb7j755ske347caobjyjqrr7zx4gjq5qed565q
{
  ALTER TYPE default::Users {
      ALTER PROPERTY email {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY full_name {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY nationality {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY pseudo {
          RESET OPTIONALITY;
      };
  };
};
