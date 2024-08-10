export enum GameItemStatus{
    Open, Close
}
// enum liệt kê , định nghĩa trạng thái 

export class GameItem{
    constructor(public id: number, public divId: string,
         public image:string, public status: GameItemStatus= GameItemStatus.Close, // xác định trạng thái đóng 
         public isMatched: boolean = false,
         public imageElement : HTMLImageElement | null = null){ //đại diện cho phần tử hình ảnh html
            
         }
         // sử dungh khóa public , khai báo và gán giá trị tự động cho các thuộc tính
}