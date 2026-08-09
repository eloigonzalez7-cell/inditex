export class Episode {
  constructor(
    public readonly id: string,
    public readonly podcastId: string,
    public readonly title: string,
    public readonly descriptionHtml: string,
    public readonly releaseDate: Date,
    public readonly durationMs: number,
    public readonly audioUrl: string,
  ) {}
}
