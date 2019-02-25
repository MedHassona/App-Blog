export class Post {

    loveIts: number;
    createdAt: Date;
    title: string;
    content: string;

    constructor(title: string, content: string){
        this.title = title;
        this.content = content;
        this.loveIts = 0;
        this.createdAt = new Date();
    }
}