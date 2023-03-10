export class PostForUpdate {
    title: string = '';
    summary: string = '';
    content: string = '';
    tags: string[] = [];
    isDraft: boolean = false;
    thumbnail: File | undefined;
}
