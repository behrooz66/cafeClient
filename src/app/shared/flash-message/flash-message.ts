export class FlashMessage {
    id: number;
    style: string = "success"; // can be success, warning, danger
    size: number = 1; //can be 1, 2, 3
    title: string;
    body: string;
    showTime: number = 2500;
    autoClose: boolean = true;

    constructor(title: string, body: string, autoClose:boolean, style?: string, showTime?: number, size?: number){
        this.id = new Date().getTime();
        this.title = title;
        this.body = body;
        this.showTime = showTime;
        this.style = style;
        this.size = size;
        this.autoClose = autoClose;
    }
}