
const MODAL_TEMPLATE =
    `
<div >
<div  class="modal fade modalChange bd-example-modal-md" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content modal-md">
            <div class="modal-header">
                <h4 class="modal-title nameHeadModal">สัดส่วนอาหารตั้งต้น</h4>
                <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close">
                    <i class="fas fa-window-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <!-- Rice Fruits -->
                        <div class="form-group row">
                            <div class="col">
                                <label for="inputRice">ข้าว-แป้ง <small>(ทัพพี)</small></label>
                                <div class="form-group">
                                    <input type="text" inputmode="decimal" class="inputRice form-control  form-control-sm"
                                         maxlength="4">
                                </div>
                            </div>
                            <div class="col">
                                <label for="inputFruits">ผลไม้ <small>(ส่วน)</small></label>
                                <div class="form-group">
                                    <input type="text" inputmode="decimal" class="inputFruits form-control  form-control-sm"
                                            maxlength="4">
                                </div>
                            </div>
                        </div>         
                    <!-- Meat -->       
                        <div class="form-group row">
                            <div class="col">
                                <label for="inputTypeMeat">เนื้อสัตว์ <small>(ส่วน)</small></label>
                                <div class="input-group">
                                    <select class="custom-select custom-select-sm inputTypeMeat" >
                                        <option value="nonfat">ไม่มีไขมัน</option>
                                        <option value="lowfat">ไขมันต่ำ</option>
                                        <option value="medium">ไขมันปานกลาง</option>
                                        <option value="highfat">ไขมันสูง</option>
                                    </select>
                                    <input type="text" inputmode="decimal" class="inputMeat form-control form-control-sm"
                                        maxlength="4">
                                </div>
                            </div>
                        </div>        
                    <!-- Vegetable -->
                        <div class="form-group row">
                            <div class="col">
                                <label for="inputTypeVegetable">ผัก <small>(ทัพพี)</small></label>
                                <div class="input-group">
                                    <select class="inputTypeVegetable custom-select custom-select-sm">
                                        <option value="a">ประเภท ก.</option>
                                        <option value="b">ประเภท ข.</option>
                                    </select>
                                    <input type="text" inputmode="decimal" class="inputVegetable form-control form-control-sm"
                                            maxlength="4">
                                </div>
                            </div>
                        </div>     
                    <!-- Milk -->                  
                        <div class="form-group row">
                            <div class="col">
                                <label for="inputTypMilk">นม <small>(แก้ว)</small></label>
                                <div class="input-group">
                                    <select class="inputTypeMilk custom-select custom-select-sm">
                                        <option value="nonfat">ไม่มีไขมัน</option>
                                        <option value="lowfat">พร่องไขมัน</option>
                                        <option value="fat">ไขมันเต็ม</option>
                                    </select>
                                    <input type="text" inputmode="decimal" class="inputMilk form-control form-control-sm"
                                            maxlength="4">
                                </div>
                            </div>
                        </div>       
                    <!-- Sugar Sodium -->
                        <div class="form-group row">
                            <div class="col">
                                <label for="inputSugar">น้ำตาล <small>(ช้อนชา)</small></label>
                                <div class="input-group">
                                    <input type="text" inputmode="decimal" class="inputSugar form-control  form-control-sm"
                                            maxlength="4">
                                </div>
                            </div>
                            <div class="col">
                                <label for="inputSodium">โซเดียม <small>(ช้อนชา)</small></label>
                                <div class="input-group">
                                    <input type="text" inputmode="decimal" class="inputSodium form-control  form-control-sm"
                                            maxlength="4">
                                </div>
                            </div>
                        </div>    
                    <!-- Fat -->
                        <div class="form-group row">
                            <div class="col">
                                <label for="inputFat">ไขมัน/ถั่ว <small>(ช้อนชา)</small></label>
                                <div class="input-group">
                                    <input type="text" inputmode="decimal" class="inputFat form-control  form-control-sm"
                                            maxlength="4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btnChangeSubmit btn btn-primary">แก้ไข</button>
                </div>
        </div>
    </div>
</div>
</div>
`

const MODAL_IMAGE_TEMPLATE =
    `
<div>
<div class="modal fade test show modalImageFood" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modalNameFood"></h5>
                <button class="close text-danger" data-dismiss="modal">
                    <span class="fas fa-window-close"></span>
                </button>
            </div>
            <div class="modal-body" >
                <img class="img-fluid modalSrcImage" ></img>
            </div>
        </div>
    </div>
</div>
</div>
`