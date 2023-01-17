export enum Order {
    ASC = 1,
    DESC = -1
}

export type OrderType = keyof typeof Order;
