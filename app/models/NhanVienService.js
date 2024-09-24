class NhanVienService {
    constructor(){
        this.arrNv = [];
    }

    addNv(newNv){
        this.arrNv.push(newNv);
    }
    deleteNv(idDelete){
        let inDexDel = this.arrNv.findIndex(function (nhanVien) {
            return nhanVien.id == idDelete;
        })
        this.arrNv.splice(inDexDel, 1);
    }
    getDetail(idDetail){
        let nvObj = this.arrNv.find(function (nhanVien) {
            return nhanVien.id == idDetail;
        })
        return nvObj;
    }
    updateData(objUpdate){
        let indexUpdate = this.arrNv.findIndex(function (nhanVien) {
            return nhanVien.id == objUpdate.id;
        })
        this.arrNv[indexUpdate] = objUpdate;
    }
}