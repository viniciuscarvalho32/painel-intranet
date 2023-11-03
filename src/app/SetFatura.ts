export interface SetFatura {
    numFat: string,
    rateio: [{
        codccu: string,
        desccu: string,
        perrat: number,
        vlrrat: number
    }],
    origem: string
}
