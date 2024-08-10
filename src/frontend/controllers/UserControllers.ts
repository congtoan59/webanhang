import autobind from "autobind-decorator"; // đảm bảo rằng this luôn trỏ đúng
import { validate } from "class-validator"; // kiểm tra các ràng buộc dữ liệu
import { User } from '../models/User'; //import lớp User từ tệp User.ts trong thư mục models.
import { error } from "shelljs";

export class UserController{
    constructor(public element:HTMLElement) {// tạo 1 hàm tạo có đối số là element
        const button = element.querySelector('#play'); // lấy dữ liệu thông qua id rồi lưu vào biến button

        console.log('UserController constructor');

        button?.addEventListener('click', this.ptocessPlayButtonClick); //nếu button tồn tại, thì gắn skien click vào nút 
    }

 
    @autobind //đảm bảo rằng ngữ cảnh this trong ptocessPlayButtonClick sẽ luôn trỏ đúng vào đối tượng UserController
    ptocessPlayButtonClick(event:Event){ //khi người dùng nhấp vào nút "play".
        event.preventDefault(); //găn chặn hành vi mặc định của sự kiện.
        console.log('event ...');
        
        const form = this.element.querySelector('form') as HTMLFormElement; //Lấy ra phần tử form trong phần tử gốc.
        const usernameElement = this.element.querySelector('#username') as HTMLInputElement; // Lấy ra phần tử input có id là "username" trong phần tử gốc.
        const helpId = this.element.querySelector('#UsernameHelpId'); //Lấy ra phần tử có id là "UsernameHelpId" trong phần tử gốc.

        if(usernameElement){
            let user: User = new User(usernameElement.value); //Tạo một đối tượng mới của lớp User

            validate(user).then(errors =>{  //Sử dụng hàm validate để kiểm tra các ràng buộc dữ liệu
                if(errors.length >0){ // Nếu có lỗi, hiển thị thông báo, ngược lại, submit form.
                    if(helpId){
                        helpId.className = 'form-text text-muted visible';
                    }
                }else{
                        form.submit();
                }
            })
        }
    }
}