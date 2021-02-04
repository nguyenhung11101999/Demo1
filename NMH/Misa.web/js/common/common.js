﻿/**
 * format ngfay thang  sang ngay/thang/nam
 * @param {any} date tham so co kieu du lieu bat ky
 * CreadtedBy: NMHung (04/02/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }
}

/**
 * Ham dinh dang hien thi tien te
 * @param {Number} money SO tien
 * CreadtedBy: NMHung (04/02/2020)
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1 ');
    }
    return "";
}