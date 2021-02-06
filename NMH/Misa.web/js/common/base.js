



class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvents();
        this.loadData();
    }

    setApiRouter() {

    }

    /**
     * Set sự kiện cho nút Thêm để hiện dialog và nút đóng của dialog
     * CreatedBy: NMHung (05/02/2020)
     * */
    /*setEvenForDialog() {
        $("#btnAdd").click(function () {
            $(".m-dialog").attr("style", "display: flex");
        });
        $("#m-close-dialog").click(function () {
            $(".m-dialog").attr("style", "display: none");
        });
    }*/
    /**
     * Set sự kiện cho nút Thêm để hiện dialog và nút đóng của dialog
     * CreatedBy: NMHung (05/02/2020)
     * */
    initEvents() {
        var me = this;
        //Sự kiện click khi nhấn vào thêm mới
        $('#btnAdd').click(function () {
            try {
                //Hiển thị dialog thông tin chi tiết:
                $('.m-dialog').show();
                //load dữ liệu cho các combobox
                var select = $('select#cbxCustomerGroup');
                select.empty();
                //lấy dữ liệu nhóm khách hàng
                $.ajax({
                    url: me.host + "/api/customergroups",
                    method: "GET",
                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                            select.append(option);
                        })
                    }
                }).fail(function (res) {

                })
            } catch (e) {
                console.log(e);
            }
        });
        //Sự kiện click khi nhấn vào nút X trong dialog
        $('.m-close-dialog').click(function () {
            //ĐÓng dialog thông tin chi tiết:
            $('.m-dialog').hide();
        });
        //ĐÓng form chi tiết khi nhấn hủy
        $('.m-close-dialog').click(function () {
            //ĐÓng dialog thông tin chi tiết:
            $('.m-dialog').hide();
        });
        //Thực hiện lưu dữ liệu khi nhấn button Lưu trên form chi tiết:
        $('#btnSave').click(function () {
            //validate dữ liệu
            var inputValidate = $('input[required], input[type="email"]');
            $.each(inputValidate, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại ");
                inputNotValids[0].focus();
                return;
            }
            //thu thập thông tin dữ liệu nhập -> buld thành object
            /*var customer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#dtDateOfBirth').val(),
                "Email": $('#txtEmail').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
                "MemberCardCode": $('#txtMemberCardCode').val()
            }*/
            //thu thập thông tin dữ liệu nhập -> buld thành object
            //lấy tất cả các control nhập liệu
            var inputs = $('input[fieldName], select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(this).val();
                //check với trường hợp input là radio thì chỉ lấy value của input có attribute là checked.
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        entity[propertyName] = value;
                    }
                } else {
                    entity[propertyName] = value;
                }
            })
            //Gọi service tương ứng thực hiện lưu dữ liệu
            $.ajax({
                url: me.host + me.apiRouter,
                method: 'POST',
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                //Sau khi lưu thành công thì đưa ra thông báo thành công, ẩn form chi tiết rồi load lại dữ liệu
                alert("Thêm thành công");
                me.loadData();
                $('.m-dialog').hide();
                debugger;
            }).fail(function (res) {
                debugger;
            })

        });
        //Thực hiện nạp lại dữ liệu khi nhấn button refresh trên thanh công cụ
        $('#btnRefresh').click(function () {
            me.loadData();
        });

        //Hiển thị thông tin chi tiết khi nhấn đúp chuột vảo một bản ghi trên cơ sở dữ liệu
        $('table tbody').on('dblclick', 'tr', function () {
            $('.m-dialog').show();
        })

        /*
         * validate bắt buộc nhập 
         * Created by: NMHung (06/02/2021)
         */
        $('input[required]').blur(function () {
            //Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo:
            var value = $(this).val();
            if (!value) {
                //thuần
                /*this.classList.add("txtCustomerCode");*/
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })


        /*
         * validate email
         * Created by: NMHung (06/02/2021)
         */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })
    }



    /**
    * Load Data len web
    * CreatedBy: NMHung (04/02/2020)
    * */
    loadData() {
        var me = this;
        try {
            //khiến cho bảng trẳng để hàm loadData đổ dữ liệu vào
            $('table tbody').empty();
            //Lấy thông tin các cột dữ liệu:
            var colums = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(colums, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }

                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) {

            })
        } catch (e) {
            //ghi log lỗi
            console.log(e);
        }

    }
}