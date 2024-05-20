// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _extauth from "./ext/auth";
export type $Player_statsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "score": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "id_room": $.LinkDesc<$Room, $.Cardinality.One, {}, false, false,  false, false>;
  "id_user": $.LinkDesc<$Users, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $Player_stats = $.ObjectType<"default::Player_stats", $Player_statsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Player_stats = $.makeType<$Player_stats>(_.spec, "1896bd07-1055-11ef-85d1-c5dd5d769a1c", _.syntax.literal);

const Player_stats: $.$expr_PathNode<$.TypeSet<$Player_stats, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Player_stats, $.Cardinality.Many), null);

export type $RoomλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "latitude": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "longitude": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "prompt": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "user_pseudo": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "delay": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "level": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "nb_players": $.PropertyDesc<_std.$int32, $.Cardinality.One, false, false, false, false>;
  "<id_room[is Temp_room]": $.LinkDesc<$Temp_room, $.Cardinality.Many, {}, false, false,  false, false>;
  "<id_room[is Player_stats]": $.LinkDesc<$Player_stats, $.Cardinality.Many, {}, false, false,  false, false>;
  "<id_room": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Room = $.ObjectType<"default::Room", $RoomλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Room = $.makeType<$Room>(_.spec, "189890a6-1055-11ef-a8f7-014270460101", _.syntax.literal);

const Room: $.$expr_PathNode<$.TypeSet<$Room, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Room, $.Cardinality.Many), null);

export type $Temp_roomλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "latitude": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "longitude": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "time": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "id_room": $.LinkDesc<$Room, $.Cardinality.One, {}, false, false,  false, false>;
  "id_user": $.LinkDesc<$Users, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $Temp_room = $.ObjectType<"default::Temp_room", $Temp_roomλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Temp_room = $.makeType<$Temp_room>(_.spec, "189a8abe-1055-11ef-a0d3-d99f7576a425", _.syntax.literal);

const Temp_room: $.$expr_PathNode<$.TypeSet<$Temp_room, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Temp_room, $.Cardinality.Many), null);

export type $UsersλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "identity": $.LinkDesc<_extauth.$Identity, $.Cardinality.One, {}, true, false,  false, false>;
  "avatar": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "score": $.PropertyDesc<_std.$int16, $.Cardinality.AtMostOne, false, false, false, false>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "full_name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "nationality": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "pseudo": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<id_user[is Temp_room]": $.LinkDesc<$Temp_room, $.Cardinality.Many, {}, false, false,  false, false>;
  "<id_user[is Player_stats]": $.LinkDesc<$Player_stats, $.Cardinality.Many, {}, false, false,  false, false>;
  "<id_user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Users = $.ObjectType<"default::Users", $UsersλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {identity: {__element__: _extauth.$Identity, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Users = $.makeType<$Users>(_.spec, "189caca1-1055-11ef-a2e3-99074cf5d65b", _.syntax.literal);

const Users: $.$expr_PathNode<$.TypeSet<$Users, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Users, $.Cardinality.Many), null);

export type $current_userλShape = $.typeutil.flatten<$UsersλShape & {
}>;
type $current_user = $.ObjectType<"default::current_user", $current_userλShape, null, [
  ...$Users['__exclusives__'],
]>;
const $current_user = $.makeType<$current_user>(_.spec, "a18ab335-1101-11ef-812b-7f5048f2374e", _.syntax.literal);

const current_user: $.$expr_PathNode<$.TypeSet<$current_user, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($current_user, $.Cardinality.Many), null);

const $default__globals: {  current_user: _.syntax.$expr_Global<
              // "default::current_user",
              $current_user,
              $.Cardinality.AtMostOne
              >} = {  current_user: _.syntax.makeGlobal(
              "default::current_user",
              $.makeType(_.spec, "a18ab335-1101-11ef-812b-7f5048f2374e", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { $Player_stats, Player_stats, $Room, Room, $Temp_room, Temp_room, $Users, Users, $current_user, current_user };

type __defaultExports = {
  "Player_stats": typeof Player_stats;
  "Room": typeof Room;
  "Temp_room": typeof Temp_room;
  "Users": typeof Users;
  "current_user": typeof current_user;
  "global": typeof $default__globals
};
const __defaultExports: __defaultExports = {
  "Player_stats": Player_stats,
  "Room": Room,
  "Temp_room": Temp_room,
  "Users": Users,
  "current_user": current_user,
  "global": $default__globals
};
export default __defaultExports;
