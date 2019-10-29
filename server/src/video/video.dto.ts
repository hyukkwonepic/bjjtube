export class CreateVideoDto {
  readonly videoUrl: string;
  readonly title: string;
  readonly description?: string;
}

export class FindAllQueryDto {
  readonly page?: number;
}
