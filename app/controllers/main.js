let nvSer = new NhanVienService();

function hienThiTable(arrNv) {
  console.log(arrNv);
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
    
                 <td>${nhanVien.chucvu}</td>

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
  let isValid = validateNhanVien(newNv);

  // Nếu có lỗi, dừng thêm nhân viên
  if (!isValid) {
    return;
  }

  newNv.tinhTongLuong();
  newNv.tinhXepLoai();
  nvSer.addNv(newNv);

  setLocalStorage();
  getLocalStorage();

  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "inline-block";

  let tieuDe = document.querySelector("#header-title");
  tieuDe.innerHTML = "Thêm nhân viên";
}

function xoaNhanVien(idDelete) {
  console.log("ID Xóa", idDelete);
  nvSer.deleteNv(idDelete);
  alert("Xóa thành công");
  setLocalStorage();
  getLocalStorage();
}

function validateNhanVien(nv) {
  let validationErrors = [];

  // Kiểm tra tài khoản
  if (!/^\d{4,6}$/.test(nv.id)) {
    validationErrors.push("Tài khoản tối đa 4 - 6 ký số, không để trống");
  }

  // Kiểm tra tên nhân viên
  if (!/^[A-Za-z\s]+$/.test(nv.name) || nv.name.trim() === "") {
    validationErrors.push("Tên nhân viên phải là chữ, không để trống");
  }

  // Kiểm tra email
  if (
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(nv.email) ||
    nv.email.trim() === ""
  ) {
    validationErrors.push("Email phải đúng định dạng, không để trống");
  }

  // Kiểm tra mật khẩu
  if (
    !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).{6,10}$/.test(nv.password) ||
    nv.password.trim() === ""
  ) {
    validationErrors.push(
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống"
    );
  }

  // Kiểm tra ngày làm
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nv.ngaylam) || nv.ngaylam.trim() === "") {
    validationErrors.push("Ngày làm không để trống, định dạng mm/dd/yyyy");
  }

  // Kiểm tra lương cơ bản
  if (nv.luongCB < 1000000 || nv.luongCB > 20000000 || nv.luongCB === "") {
    validationErrors.push(
      "Lương cơ bản 1.000.000 - 20.000.000, không để trống"
    );
  }

  // Kiểm tra chức vụ
  const validPositions = ["Giám đốc", "Trưởng Phòng", "Nhân Viên"];
  if (!validPositions.includes(nv.chucvu)) {
    validationErrors.push(
      "Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)"
    );
  }

  // Kiểm tra số giờ làm
  if (nv.gioLam < 80 || nv.gioLam > 200 || nv.gioLam === "") {
    validationErrors.push(
      "Số giờ làm trong tháng 80 - 200 giờ, không để trống"
    );
  }

  // Nếu có lỗi, hiển thị thông báo
  if (validationErrors.length > 0) {
    alert(validationErrors.join("\n"));
    return false;
  }
  return true;
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

  let tieuDe = document.querySelector("#header-title");
  tieuDe.innerHTML = "Xem chi tiết";
}

function capNhat() {
  debugger;
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
  );

  let isValid = validateNhanVien(objUpdate);

  // Nếu có lỗi, dừng thêm nhân viên
  if (!isValid) {
    return;
  }

  nvSer.updateData(objUpdate);
  objUpdate.tinhTongLuong();
  objUpdate.tinhXepLoai();

  setLocalStorage();
  getLocalStorage();
}

function timNhanVien() {
  let tim = document.getElementById("searchName").value;

  // Gọi hàm để lấy kq tìm kiếm
  let result = nvSer.searchData(tim);
  // Kiểm tra lại
  if (result.length === 0) {
    alert("Không tìm thấy nhân viên");
  } else {
    hienThiTable(result);
  }
}
document.getElementById("btnThemNV").onclick = themNhanVien;
document.getElementById("btnTimNV").onclick = timNhanVien;
window.capNhat = capNhat;
