import Principal "mo:base/Principal";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";
import sunshinev2_backend "canister:sunshinev2_backend";

actor {
    type Comment = {
        id : Text;
        user : Principal;
        coin : Text;
        message : Text;
        timestamp : Time.Time;
    };

    let comments = TrieMap.TrieMap<Text, Comment>(Text.equal, Text.hash);

    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    public shared func createComment(commentCoin : Text, commentMessage : Text, userCreator : Principal) : async Result.Result<(), Text> {
        let newId = await generateUUID();
        let user = await sunshinev2_backend.getUserById(userCreator);
        if (Principal.isAnonymous(userCreator)) {
            return #err("Unauthorized");
        };
        switch (user) {
            case (#ok(user)) {
                let newComment : Comment = {
                    id = newId;
                    user = userCreator;
                    coin = commentCoin;
                    message = commentMessage;
                    timestamp = Time.now();
                };
                comments.put(newId, newComment);
                return #ok();
            };
            case (#err(errorMsg)) {
                return #err(errorMsg);
            };
        };
    };

    public shared query func getCommentByCoin(coinName : Text) : async Result.Result<Comment, Text> {
        let comment = comments.get(coinName);
        switch (comment) {
            case (?comment) {
                return #ok(comment);
            };
            case (null) {
                return #err("Failed to get comment");
            };
        };
    };
};
