import { SearchRequest } from '../requests';

export class SearchQuery {
  constructor(public readonly request: SearchRequest) {}
}