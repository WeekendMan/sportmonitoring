import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class TweetModel {
  @JsonMember({ name: 'author_id' })
  public 'authorId': number;
  @JsonMember
  public 'date': string;
  @JsonMember({ name: 'favorite_count' })
  public 'favoriteCount': number;
  @JsonMember
  public 'id': number;
  @JsonMember
  public 'img': string;
  @JsonMember({ name: 'is_retweet' })
  public 'isRetweet': number;
  @JsonMember
  public 'lang': string;
  @JsonMember
  public 'latitude': any;
  @JsonMember
  public 'longitude': any;
  @JsonMember
  public 'normal': any;
  @JsonMember({ name: 'parent_id' })
  public 'parentId': any;
  @JsonMember({ name: 'profile_image_url' })
  public profileImageUrl: string;
  @JsonMember({ name: 'retweet_count' })
  public 'retweetCount': number;
  @JsonMember({ name: 'screen_name' })
  public 'screenName': string;
  @JsonMember
  public 'tags': any;
  @JsonMember
  public 'text': string;
  @JsonMember
  public 'timestamp': number;
}
