import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class MostPopularPersonModel {
  @JsonMember
  public 'racer': string;
  @JsonMember
  public 'sentiment': number;
  @JsonMember
  public 'traffic': number;
  @JsonMember({ name: 'team_shortcut' })
  public 'teamShortcut': string;
  @JsonMember
  public 'country': string;
}
