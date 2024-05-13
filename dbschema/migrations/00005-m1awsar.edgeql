CREATE MIGRATION m1awsarhbvrj4k2bo7heijca3kmzifzemulq7hqpmnkkvnq5fc5ida
    ONTO m1xkh3trkpt55lx3nl4mofa6a6pklga36soptbaerxjygw7mjp677q
{
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::Users
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  DROP TYPE default::Post;
};
