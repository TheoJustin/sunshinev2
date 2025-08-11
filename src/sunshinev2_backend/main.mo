import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Vector "mo:vector/Class";

persistent actor {
  type Result<T, U> = Result.Result<T, U>;
  type Response<T> = Result<T, Text>;

  type User = {
    internet_identity : Principal;
    name : Text;
    email : Text;
    birth_date : Text;
    timestamp : Time.Time;
    money : Nat;
    profileUrl : Text;
  };

  transient let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

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

  
   // get current user's name
   public query func getName(userId: Principal) : async Text {
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.name;
         };
         case (null) {
            return "Stranger";
         };

      };
   };

   // getting user pfp
   public shared query func getPfp(userId: Principal) : async Text {
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.profileUrl;
         };
         case (null) {
            return "Stranger";
         };

      };
   };

   // comparing with insensitive case
   func containsInsensitive(text : Text, pattern : Text) : Bool {
        let lowerText = Text.toLowercase(text);
        let lowerPattern = Text.toLowercase(pattern);
        return Text.contains(lowerText, #text lowerPattern);
    };

    func isSameUser(user1: User, user2: User): Bool {
      return user1.internet_identity == user2.internet_identity;
    };

    public shared func putUsers(user : User) : async (){
      users.put(user.internet_identity, user);
   };

   public query func searchByName (name: Text): async Result.Result<[User], Text> {
      var allUsers = Vector.Vector<User>();
      for (user in users.vals()){
         if(containsInsensitive(user.name, name)){
            allUsers.add(user);
         };
      };
      return #ok(Vector.toArray(allUsers));
   };

   public  func getParticipantsName(participants : [Principal]) : async [Text]{
      var participantsName = Vector.Vector<Text>();
      for (user in participants.vals()){
         participantsName.add(await getName(user));
      };
      return Vector.toArray(participantsName);
   };

   // get username by ID
   public shared query func getUsernameById(userId : Principal) : async Result.Result<Text, Text> {
      let user = users.get(userId);
      switch (user) {
         case (?user) {
            return #ok(user.name);
         };
         case (null) {
            return #err("User not found!");
         };
      };
   };

   // update user
   public func updateUser(userId : Principal, name : Text, email : Text, birth_date : Text, profileUrl : Text) : async Bool {
      let user = users.get(userId);
      switch (user) {
         case (?user) {
            let newUser : User = {
               internet_identity = userId;
               name = name;
               email = email;
               birth_date = birth_date;
               timestamp = user.timestamp;
               money = user.money;
               profileUrl = profileUrl;
            };
            users.put(userId, newUser);
            return true;
         };
         case (null) {
            return false;
         };
      };

   };

   // ambil principal /user ID basically
   public shared query (msg) func whoami() : async Principal {
      msg.caller;
   };

   // inserting data into array
   public shared func register(userId : Principal, name : Text, email : Text, birth_date : Text, profileUrl : Text) : async Bool {

      let user_id = userId;

      if (users.get(user_id) != null) {
         return false;
      };
      let user : User = {
         internet_identity = user_id;
         name = name;
         email = email;
         birth_date = birth_date;
         timestamp = Time.now();
         money = 50000;
         profileUrl = profileUrl;
      };

      users.put(user.internet_identity, user);

      return true;
   };
};
