export class Message {
    from: string;
    fromName: string;
    to: string;
    toName: string;
    title: string;
    content: string;
    createdAt: Date;
    trashByFrom: boolean;
    trashByTo: boolean;
    deletedByFrom: boolean;
    deletedByTo: boolean;
}