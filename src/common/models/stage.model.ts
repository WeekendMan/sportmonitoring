import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class StageModel {
  @JsonMember
  public 'state': number;
  @JsonMember({ name: 'stage_id' })
  public 'id': number;
  @JsonMember({ name: 'stage_index' })
  public 'index': number;
}
