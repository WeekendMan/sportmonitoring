import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';
import { MostPopularPersonModel } from './most-popular-person.model';

@JsonObject
export class MostPopularPersonsModel {
  @JsonMember({ elements: MostPopularPersonModel })
  public 'period': MostPopularPersonModel[];
  @JsonMember({ elements: MostPopularPersonModel })
  public 'race': MostPopularPersonModel[];
}
