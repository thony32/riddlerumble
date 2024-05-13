using extension pgcrypto;
using extension auth;

module default {
  global current_user := (
    assert_single((
      select Users
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );
  
  type Temp_room {
    required property id_room -> uuid;
    required property id_user -> uuid;
    required property latitude -> float32;
    required property longitude -> float32;
    required property time -> int16;
  };

  type Users {
    required identity: ext::auth::Identity {
      constraint exclusive;
    };
    required property avatar -> str;
    required property email -> str;
    required property full_name -> str;
    required property nationality -> str;
    required property pseudo -> str;
    required property score -> int16;
  };

  type Room {
    required property delay -> int32;
    required property latitude -> float32;
    required property longitude -> float32;
    required property nb_players -> int16;
    required property prompt -> str;
  };

  type Player_stats {
    required property id_room -> uuid;
    required property id_user -> uuid;
    required property score -> float32;
  };
}
