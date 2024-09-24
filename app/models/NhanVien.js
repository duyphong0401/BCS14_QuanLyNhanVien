class NhanVien{
    constructor(id,name,email,password,ngaylam,luongCB,chucvu,gioLam){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.ngaylam = ngaylam;
        this.luongCB = luongCB;
        this.chucvu = chucvu;
        this.gioLam = gioLam;
        this.xepLoai = "";
        this.tongLuong = 0;
    }
    tinhTongLuong(){
        let so = 1;
        if(this.chucvu === "Sếp"){
            so = 3;
            
        }else if(this.chucvu === "Trưởng phòng"){
            so = 2;
        }else if(this.chucvu === "Nhân Viên"){
            so = 1;
        }
        this.tongLuong = this.luongCB * so;
    }
    tinhXepLoai(){
        if(this.gioLam >= 192){
            this.xepLoai = "Xuất sắc";
        }else if(this.gioLam >= 176 && this.gioLam < 192){
            this.xepLoai = "Gioi";
        }else if(this.gioLam >= 160 && this.gioLam < 176){
            this.xepLoai = "Khá";
        }else if(this.gioLam < 160){
            this.xepLoai = "Trung bình";
        }
    }
}