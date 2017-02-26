export interface ICustomer {
    id: number;
    address: string ;
    cell: string;
    cityId: number;
    deleted: boolean;
    email: string;
    home: string;
    lat: number;
    lon: number;
    name: string;
    noAddress: boolean;
    notes: string;
    otherPhone: string;
    postalCode: string;
    restaurantId: number;
    work: string;
    addressFound: boolean;
}

export class Customer {
    public id: number;
    public address: string ;
    public cell: string;
    public cityId: number;
    public deleted: boolean;
    public email: string;
    public home: string;
    public lat: number;
    public lon: number;
    public name: string;
    public noAddress: boolean;
    public notes: string;
    public otherPhone: string;
    public postalCode: string;
    public restaurantId: number;
    public work: string;
    public addressFound: boolean;

    constructor(){
        this.email = "";
    }
}