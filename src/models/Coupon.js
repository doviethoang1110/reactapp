export default class Coupon {
    constructor(name,code,startDate,endDate,type,detail) {
        this.name = name;
        this.code = code;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
        this.detail = detail;
    }
}