
export interface IBill {
    InvNo: String;
    InvDate: Date;
    Cname: String;
    Delivery_Address: String;
    Area: String;
    Mobile: String;
    Alter_Mobile_No: String;
    No_of_Items: String;
    Item_Description: String;
    SubTotal: String;
    TaxTotal: String;
    NetTotal: String;
    Balance:  String
    Balance_Upto: String;
    PaidAmount: String;
    PaidDateTime: Date;
    Paidby: String;
    Gpsloc: String;
    Delivery_Person_Name: String;
    Delivery_Remark: String;
    Payment_Remark: String;
    Delivery_status: String;
    Notes: String;
}

export interface ICheckLogin {
    CheckLoginjs: ILoginTable
}

interface ILoginTable {
    Table: ILogin[];
}

export interface ILogin {
    IsAdmin: number;
    ErrNo: String;
    DhId: number;
    Tripid: number;
    Actiondate:  Date;
    Itemtype:  String ;
    Dpid: number;
    DpName: String ;
    NoOfBills:number;
    Totalvalue: number;
    StartTime:  Date;
    FinishTime: Date | null;
    CashReceipt:number;
    Expense:number;
    VehicleNo: String | null;
    VhId: number | null;
    BalanceBills: number;
    Balance: number;
    TripStatus: String; 
}

export enum NavigationType {
    Customer = 'dashboard/customer',
    Delivery = 'dashboard/delivery',
    Admin = 'dashboard/admin',
}

export interface IFoodType {
    Item_type: String;
}

export interface ICustomerList {
    Vid: number,
    VCode: String;
    Vname: String;
    Address1: String;
    Mobile: String;
    Phone: String;
    Area: String;
    Route1: String;
    Route2: String;
    AreaId: String;
    LunchDC: number;
    BreakfastDC: number;
    TiffinDC: number;
    OthersDC: number;
}

export interface IOrdersList {
    Orid: number;
    Ordate: Date;
    StartDate?: Date;
    Vid: number;
    Vcode: String;
    VName: String;
    Vname?: String;
    vname?: String;
    Address1: String;
    Mobile: String;
    City: String;
    Route1: String;
    Itemid: number;
    FoodType: String;
    Item_Desc: String;
    Qty: number;
    StandardCost: number;
}