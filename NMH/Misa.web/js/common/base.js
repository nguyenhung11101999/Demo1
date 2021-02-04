



class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }

    setDataUrl() {

    }
    /**
    * Load Data len web
    * CreatedBy: NMHung (04/02/2020)
    * */
    loadData() {
        try {
            //Lấy thông tin các cột dữ liệu:
            var colums = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $.ajax({
                url: getDataUrl,
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
                        debugger;
                        $(tr).append(td);
                    })
                    debugger;
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