export interface IHomeServices {
    serviceRequest: any[],
    bookDate: any[],
    nearByServices: any[]
}

export interface IHomeServiceResponse {
    status: string,
    data: IHomeServices
}


export interface ILocalUser {
    account_type: string,
    active: string|number,
    address: string,
    age: number|string,
    avatar: string,
    country_id: number,
    cover: string,
    date_res?:string,
    email: string,
    fullname: string,
    gender: string,
    id: number,
    last_loged?: string,
    latitude: string| number,
    longitude: string|number,
    level_id: number,
    mobile: number| string,
    nickname: string,
    notes:string,
    parent_id: number,
    service_id: number,
    username: string,
    verifycode?:string
}