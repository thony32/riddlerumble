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
    required id_room: Room;
    required id_user: Users;
    required property latitude -> float32;
    required property longitude -> float32;
    required property time -> str;
    created_at: datetime {
      rewrite insert using (datetime_of_statement())
    }
    modified_at: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement())
    }
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
    created_at: datetime {
      rewrite insert using (datetime_of_statement())
    }
    modified_at: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement())
    }
  };

  type Room {
    required property delay -> int64;
    required property latitude -> float32;
    required property longitude -> float32;
    required property nb_players -> int32;
    required property prompt -> str;
    required property user_pseudo -> str;
    required property level -> str;
    required property isActive -> bool;
    created_at: datetime {
      rewrite insert using (datetime_of_statement())
    }
    modified_at: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement())
    }
  };

  type Player_stats {
    required id_room: Room;
    required id_user: Users;
    required property score -> float32;
    created_at: datetime {
      rewrite insert using (datetime_of_statement())
    }
    modified_at: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement())
    }
  };
}
