
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
