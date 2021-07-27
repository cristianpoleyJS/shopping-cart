export default interface Discount {
    id: string,
    productCode: string,
    minElements: number,
    discountPercent: number,
    typeDiscount: 'two_for_one' | 'bulk' | 'promotion_code',
    title: string,
    code: string,
    accum?: number
}
