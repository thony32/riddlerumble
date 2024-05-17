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
    property avatar -> str;
    property email -> str;
    property full_name -> str;
    property nationality -> str;
    property pseudo -> str;
    property score -> int16;
  };

  type Room {
    required property delay -> int64;
    required property latitude -> float32;
    required property longitude -> float32;
    required property nb_players -> int16;
    required property prompt -> str;
    required property user_pseudo -> str;
  };

  type Player_stats {
    required property id_room -> uuid;
    required property id_user -> uuid;
    required property score -> float32;
  };
}
