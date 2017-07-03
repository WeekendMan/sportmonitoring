import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class SingleEventModel {
  @JsonMember
  public 'finish': string;
  @JsonMember({ name: 'finish_timestamp' })
  public 'finishTimestamp': number;
  @JsonMember
  public 'name': string;
  @JsonMember({ name: 'race_id' })
  public 'raceId': number;
  @JsonMember
  public 'start': string;
  @JsonMember({ name: 'start_timestamp' })
  public 'startTimestamp': number;
  @JsonMember
  public 'tags': string;
  @JsonMember
  public 'type': string;
  @JsonMember({ name: 'stage_id' })
  public 'stageId': any;
  @JsonMember({ name: 'stage_index' })
  public 'stageIndex': number;
}
