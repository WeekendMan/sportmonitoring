import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { TweetModel } from './tweet.model';

@JsonObject
export class TweetsModel {
  @JsonMember
  public '15min': TweetModel;
  @JsonMember
  public 'hour': TweetModel;
  @JsonMember
  public 'stage': TweetModel;
  @JsonMember
  public 'top': TweetModel;
}
