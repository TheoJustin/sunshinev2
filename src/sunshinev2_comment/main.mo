import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Source "mo:uuid/async/SourceV4";
import Array "mo:base/Array";
import UUID "mo:uuid/UUID";

persistent actor {
  type Comment = {
    id        : Text;
    message   : Text;
    timestamp : Time.Time;
  };

  type CoinComment = {
    coin     : Text;
    comments : [Comment];
  };

  transient let comments = TrieMap.TrieMap<Text, CoinComment>(Text.equal, Text.hash);

  public shared func generateUUID() : async Text {
    let g = Source.Source();
    return UUID.toText(await g.new());
  };

  public shared func createComment(commentCoin : Text, commentMessage : Text) : async Result.Result<(), Text> {
    let newId = await generateUUID();
    let newComment : Comment = {
        id        = newId;
        message   = commentMessage;
        timestamp = Time.now();
    };

    switch (comments.get(commentCoin)) {
        case (?coinComment) {
        let updated : CoinComment = {
            coin     = coinComment.coin;
            comments = Array.append<Comment>(coinComment.comments, [newComment]);
        };
        comments.put(commentCoin, updated);
        };
        case null {
        let newEntry : CoinComment = {
            coin     = commentCoin;
            comments = [newComment];
        };
        comments.put(commentCoin, newEntry);
        };
    };

    return #ok();
  };

  public shared query func getCommentByCoin(coinName : Text) : async Result.Result<CoinComment, Text> {
    switch (comments.get(coinName)) {
      case (?coinComment) {
        return #ok(coinComment);
      };
      case null {
        return #err("No comments found for this coin.");
      };
    };
  };

  public shared query func getAllComments() : async [CoinComment] {
    var result : [CoinComment] = [];
    for (cc in comments.vals()) {
        result := Array.append<CoinComment>(result, [cc]);
    };
    result
  }
};
