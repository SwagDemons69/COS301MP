export class CreateRecommendedPostEvent {
  constructor(public readonly users: string[]) {}
}
