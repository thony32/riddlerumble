CREATE MIGRATION m1ldzxbzl5iiwvp7qb7j755ske347caobjyjqrr7zx4gjq5qed565q
    ONTO m1awsarhbvrj4k2bo7heijca3kmzifzemulq7hqpmnkkvnq5fc5ida
{
  ALTER TYPE default::Users {
      ALTER PROPERTY avatar {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY score {
          RESET OPTIONALITY;
      };
  };
};
