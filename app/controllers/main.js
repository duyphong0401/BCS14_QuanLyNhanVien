let nvSer = new NhanVienService();

function hienThiTable(arrNv) {
  let contentTable = "";
  arrNv.map(function (nhanVien, index) {
    console.log(nhanVien, index);
    let trNv = `
            <tr>
                <td>${nhanVien.id}</td>
    
                <td>
                 ${nhanVien.name}
                </td>
    
                 <td>${nhanVien.email}</td>
    
                 <td>${nhanVien.ngaylam}</td>
    
                 <td>${nhanVien.chucvu }</td>

                 <td>${nhanVien.tongLuong}</td>

                 <td>${nhanVien.xepLoai}</td>
    
                 <td>
                    <button onclick="xemChiTiet('${nhanVien.id}')" data-toggle="modal" data-target="#myModal" class="btn btn-warning">Xem</button>
    
                   
                    
                     <button onclick="xoaNhanVien('${nhanVien.id}')" class="btn btn-danger">Xóa</button>
    
                 </td>
                
                
    
            </tr>`;
    contentTable += trNv;
  });
  document.getElementById("tableDanhSach").innerHTML = contentTable;
}

function setLocalStorage(arrNv) {
  localStorage.setItem("nVlist", JSON.stringify(nvSer.arrNv));
}

function getLocalStorage() {
  let result = localStorage.getItem("nVlist");
  if (result) {
    nvSer.arrNv = JSON.parse(result);
    hienThiTable(nvSer.arrNv);
  }
}
getLocalStorage();

function themNhanVien() {

  
  let id = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let ngaylam = document.getElementById("datepicker").value;
  let luongCB = document.getElementById("luongCB").value * 1;
  let chucvu = document.getElementById("chucvu").value;
  let gioLam = document.getElementById("gioLam").value * 1;

  let newNv = new NhanVien(
    id,
    name,
    email,
    password,
    ngaylam,
    luongCB,
    chucvu,
    gioLam
  );
  newNv.tinhTongLuong();
  newNv.tinhXepLoai();
  console.log(newNv);
  nvSer.addNv(newNv);
  
  console.log(nvSer.arrNv);
  setLocalStorage();
  getLocalStorage();

  
}


function xoaNhanVien(idDelete) {
  console.log("ID Xóa", idDelete);
  nvSer.deleteNv(idDelete);
  alert("Xóa thành công");
  setLocalStorage();
  getLocalStorage();
}

function xemChiTiet(idDetail) {

  let nvObj = nvSer.getDetail(idDetail);
  console.log(nvObj);
  document.getElementById("tknv").value = nvObj.id;
  document.getElementById("name").value = nvObj.name;
  document.getElementById("email").value = nvObj.email;
  document.getElementById("password").value = nvObj.password;
  document.getElementById("datepicker").value = nvObj.ngaylam;
  document.getElementById("luongCB").value = nvObj.luongCB;
  document.getElementById("chucvu").value = nvObj.chucvu;
  document.getElementById("gioLam").value = nvObj.gioLam;

  document.getElementById("btnCapNhat").style.display = "inline-block"; 
  document.getElementById("btnThemNV").style.display = "none"; 
}

function capNhat() {
  let id = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let ngaylam = document.getElementById("datepicker").value;
  let luongCB = document.getElementById("luongCB").value * 1;
  let chucvu = document.getElementById("chucvu").value;
  let gioLam = document.getElementById("gioLam").value * 1;

  let objUpdate = new NhanVien(
    id,
    name,
    email,
    password,
    ngaylam,
    luongCB,
    chucvu,
    gioLam
  )
  console.log(objUpdate);
  nvSer.updateData(objUpdate);
  objUpdate.tinhTongLuong();
  objUpdate.tinhXepLoai();

  setLocalStorage();
  getLocalStorage();
  
  
}

document.getElementById("btnThem").onclick = function () {
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("btnThemNV").style.display = "inline-block";
  }
