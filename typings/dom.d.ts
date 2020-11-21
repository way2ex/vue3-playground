interface ClipboardItem {
    new (data: { [mimeType: string]: Blob });
    getType: (type: string) => Promise<Blob>;
    types: string[];
}
declare const ClipboardItem: {
    prototype: ClipboardItem;
    new(option: { [type: string]: Blob }): ClipboardItem;
}
declare interface Clipboard {
    read(): Promise<ClipboardItem[]>;
    write(item: ClipboardItem[]): Promise<any>;
}

