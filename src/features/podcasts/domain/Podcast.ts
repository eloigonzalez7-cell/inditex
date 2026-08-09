export class Podcast {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly imageUrl: string,
    public readonly description: string = '',
  ) {}
}
