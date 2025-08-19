import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Text "mo:base/Text";
import IC "ic:aaaaa-aa";
import ENV "env";

persistent actor {
  public query func testing() : async Text {
    return "Test";
  };

  public query func transform({
    context : Blob;
    response : IC.http_request_result;
  }) : async IC.http_request_result {
    {
      response with headers = [];
    };
  };

  public func getPredictions(coin : ?Text) : async Text {
    let host : Text = ENV.API_URL;

    let coinParam : Text = switch (coin) {
      case (?c) "?coin=" # c;
      case null "";
    };
    let url = "https://" # host # "/predict" # coinParam;

    let request_headers = [
      { name = "User-Agent"; value = "price-feed" },
    ];

    let http_request : IC.http_request_args = {
      url = url;
      max_response_bytes = null;
      headers = request_headers;
      body = null;
      is_replicated = null;
      method = #get;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    Cycles.add<system>(230_949_972_000);

    let http_response : IC.http_request_result = await IC.http_request(http_request);

    let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
      case (null) { "No value returned" };
      case (?y) { y };
    };
    decoded_text;
  };
};
