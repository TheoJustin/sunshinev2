import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";

actor {
  type Result<T, U> = Result.Result<T, U>;
  type Response<T> = Result<T, Text>;

  type User = {
    id : Principal;
    name : ?Text;
    age : ?Nat;
    country : ?Text;
    city : ?Text;
  };

  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  public query func getUser(p : Principal) : async ?User {
    let user = users.get(p);
    if (user == null) {
      return null;
    };
    return user;
  };

  public query (message) func greet() : async Text {
    return "Hello, " # Principal.toText(message.caller) # "!";
  };


  public query func getUserById(userId : Principal) : async Result.Result<User, Text> {
    let user = users.get(userId);
    switch (user) {
        case (?user) {
          return #ok(user);
        };
        case (null) {
          return #err("User not found!");
        };
    };
  };
};
