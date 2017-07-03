import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { SingleEventModel } from './single-event.model';

@JsonObject
export class ConfigModel {
  @JsonMember
  public 'now': string;
  @JsonMember({ name: 'current_race', elements: SingleEventModel })
  public 'current': SingleEventModel[];
  @JsonMember({ name: 'upcoming_race' })
  public 'upcoming': SingleEventModel;
  @JsonMember({ name: 'previous_race' })
  public 'previous': SingleEventModel;
}
