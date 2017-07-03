import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { StageModel } from './stage.model';

@JsonObject
export class StagesModel {
  @JsonMember({ type: Array, elements: StageModel })
  public 'all': StageModel[];
  @JsonMember({ type: Array, elements: StageModel })
  public 'past': StageModel[];
  @JsonMember({ type: Array, elements: StageModel })
  public 'current': StageModel[];
  @JsonMember({ type: Array, elements: StageModel })
  public 'announcement': StageModel[];
}
