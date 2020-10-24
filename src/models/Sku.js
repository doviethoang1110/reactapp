export default class Sku {
    constructor(code,stock,importPrice,exportPrice,values) {
        this.code = code;
        this.stock = stock;
        this.importPrice = importPrice;
        this.exportPrice = exportPrice;
        this.values = values;
    }
}