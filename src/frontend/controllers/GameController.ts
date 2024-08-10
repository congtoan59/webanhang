import autobind from "autobind-decorator";
import { GameItem, GameItemStatus } from "../models/GameItem";
import _ from "lodash";

export class GameController{
    private items:GameItem[] = [];

    constructor(items: GameItem[], public element: HTMLElement) {
        // tạp với 2 tham số
        this.initGame(items);
    }

    
    initGame(initData: GameItem[]):void{
        // tham số đầu vào với mảng GameItem
        for(const item of initData){
            this.items.push(item);
            this.items.push(new GameItem(item.id, item.divId, item.image)); // tạo 1 đói tượng và sao ché[] thông tin 
        }

        let id: number = 1;
        this.items.forEach(it => {
            it.status = GameItemStatus.Close; // trạng thái đóng
            it.divId = 'd' + id; // xác định id của phần tử html để render
            id++;
        });
    }
    //khi nguoi dung nhan vao nut reset game
    reinitGame():void{
        this.items.forEach(item =>{
            //thiết lặp lại các thuộc tính
            item.imageElement = null;
            item.status = GameItemStatus.Close;
            item.isMatched = false;
        });
        this.shuffle(); // xáo trộn
    }

    //kiem tra nguoi dung chien thang hay chua, trang thai cua game la m thi chien thang
    // isWinGame():boolean{
    //     return this.items.filter(item=>
    //         item.status === GameItemStatus.Open).length === this.items.length;
        
    // }
    //hien thi giao dien
    renderHTML(rootElement: HTMLElement, item:GameItem){
        // <div class="col-2 gameItem m-2 p1 text-center">
        //             <img src="https://pngimg.com/uploads/pokemon/pokemon_PNG12.png" alt="" class="img-fluid">
        //         </div>
        const divItem: HTMLDivElement = document.createElement('div');
        divItem.className = 'col-2 gameItem m-2 p-1 text-center';
        divItem.id = item.divId; // mõi mục có 1 id duy nhất
        divItem.addEventListener('click', this.processGameItemClicked);

        const imgItem: HTMLImageElement = document.createElement('img');
        imgItem.src = `images/${item.image}`;
        imgItem.className = 'img-fluid invisible';
        
        item.imageElement = imgItem;
        divItem.appendChild(imgItem); // thêm imgItem vào divItem
        rootElement.appendChild(divItem); // thêm divItem vào phần từ gốc
         
    }

    //hien thi thong tin luc reset
    renderResetButton(rootElement: HTMLElement):void{
         let button: HTMLButtonElement = 
            rootElement.querySelector('button#reset') as HTMLButtonElement; // tìm phần từ btn có id là reset

            if(button){
                button.addEventListener('click', this.processResetButtonClicked);
            }
    }

    //hien thi toan bo thong tin o tren game
    renderGameBoard():void{
        this.shuffle();

        let boardDiv : HTMLElement = this.element.querySelector('#board') as HTMLElement;

        if(boardDiv){
            this.items.forEach(it =>{
                this.renderHTML(boardDiv,it);
            });
        }
        this.renderResetButton(this.element);
    }
    
    //kien so khop=> neu trung khop giu nguyen, ko trung khop thi dong lai
    isMatched(id:number, imgElement: HTMLImageElement):boolean{
        let openedItems :GameItem[] = this.items.filter(item => {
            // lọc các mục trong mảng items => gán cho mảng openedItems
            if(item.status === GameItemStatus.Open && !item.isMatched){
                return item;
            }
        });

        if(openedItems.length == 2){
            let checkMatchedFilter = openedItems.filter(item => item.id == id);

            if(checkMatchedFilter.length<2){
                //ít hơn 2 => ko trùng khớp
                openedItems.forEach(item =>{
                    this.changeMatchedBackgroud(item.imageElement, false); // thực hiện thay đổi nền nếu ko trùng khớp
                });

                setTimeout(()=>
                    openedItems.forEach(item=>{
                        if(item.imageElement){
                            item.imageElement.className = 'img- fluid invisible';
                            item.status = GameItemStatus.Close;
                            item.isMatched = false;

                            this.changeMatchedBackgroud(item.imageElement);  // thay đổi nền các mục đã khớp
                        }
                    
                }),600);
            }else{
                openedItems.forEach(item=>{
                    item.isMatched = true;
                    this.changeMatchedBackgroud(item.imageElement);
                });
                return true;
            }
        }
        return false;
    }

    //2tp ko trung => thay doi mau nen
    changeMatchedBackgroud(imgElement:HTMLElement | null, isMatched: boolean = true){
        if(imgElement?.parentElement){
            //imgElement nếu có tồn tại thì lớp của ptu đc cập nhật
            if(isMatched){
                imgElement.parentElement.className = 'col-2 gameItem m-1 p-1 text-center';
            }else{
                imgElement.parentElement.className = 'col-2 gameItem m-1 p-1 text-center unmatched';
            }
        }
    }
    // tự động ràng buộc , trỏ đến GameController
    @autobind
    processGameItemClicked(event:Event){ //khi ngdung kich vao tp cua game
        let element : HTMLElement | null = event.target as HTMLElement;

        if(element.tagName === 'img'){
            element = element.parentElement;
        }

        for(const item of this.items){
            if(item.divId == element?.id && !item.isMatched
                && item.status === GameItemStatus.Close){
                    item.status = GameItemStatus.Open;

                    let imgElement = element.querySelector('img');

                    if(imgElement){
                        imgElement.className = 'img-fluid visible';
                        //t
                        this.isMatched(item.id, imgElement);
                    }
            }
        }
    }

    @autobind
    //bắt đầu trò chơi mới
    processResetButtonClicked(event:Event):void{ //khi ngdung kich vao nut reset
        this.reinitGame(); 
        const boardElement : HTMLElement = document.querySelector('#board')as HTMLElement;
        boardElement.innerHTML = '';
        this.renderGameBoard();
    }

    //xáo trộn nhung tp 
    shuffle(){
        this.items = _.shuffle(this.items);
    }
}