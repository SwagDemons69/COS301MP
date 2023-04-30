import {SearchRequest } from '../requests';

export class SearchEvent {
  constructor(public readonly search: SearchRequest) {}
}
