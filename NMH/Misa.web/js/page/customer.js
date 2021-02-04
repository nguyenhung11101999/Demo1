$(document).ready(function () {
    new CustomerJS();
})

/**
 * class quan ly su kien cho trang Customer
 * CreatedBy: NMHung (04/02/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        /*this.loadData();*/
        super();
    }
    /**
     * Set đường dẫn API cho customer
     * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
    /**
    * Load Data len web
    * CreatedBy: NMHung (04/02/2020)
    * */
    /*loadData() {
        $.ajax({
            url: "http://api.manhnv.net/api/customers",
            method: "GET",
        }).done(function (res) {
            var data = res;
            debugger;
            $.each(data, function (index, item) {
                var dateOfBirth = item["DateOfBirth"];
                var salary = item["Salary"];
                var checkbox = `<input type="checkbox" />`;
                if (item["WorkStatus"] == null || item["WorkStatus"] == 3 || item["WorkStatus"] == 0) {
                    checkbox = `<input type="checkbox"/>`;
                } else {
                    checkbox = `<input type="checkbox" checked/>`;
                }
                salary = formatMoney(salary);
                dateOfBirth = formatDate(dateOfBirth);
                var tr = $(`<tr>
                            <td><div><span>` + item["EmployeeCode"] + `</span></div></td>
                            <td><div><span>`+ item["FullName"] + `</span></div></td>
                            <td><div><span>`+ item["GenderName"] + `</span></div></td>
                            <td class="text-align-center"><div><span>`+ dateOfBirth + `</span></div></td>
                            <td><div><span>`+ item["PhoneNumber"] + `</span></div></td>
                            <td><div><span>`+ item["Email"] + `</span></div></td>
                            <td><div style="max-width: 250px;" title="`+ item["Address"] + `"><span>` + item["Address"] + `</span></div></td>
                                        </tr >`);
                $('table tbody').append(tr);
            })
        }).fail(function (res) {

        })
    }*/
    /**
    * Them Data 
    * CreatedBy: NMHung (04/02/2020)
    * */
    add() {

    }
    /**
    * Sua Data 
    * CreatedBy: NMHung (04/02/2020)
    * */
    edit() {

    }
    /**
    * Xoa Data 
    * CreatedBy: NMHung (04/02/2020)
    * */
    delete() {

    }
}
