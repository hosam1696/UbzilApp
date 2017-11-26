export interface IHomeServices {
    serviceRequest: any[],
    bookDate: any[],
    nearByServices: any[]
}

export interface IHomeServiceResponse {
    status: string,
    data: IHomeServices
}

export interface IlocalUser{
    level_id: number,    
    username: string,
    email: string,    
    fullname: string,
    id: number,
    active: number,
    address: string,
    gender: string,
    mobile: string,
    avatar: string,
    latitude: string,
    longitude: string,
    cover ?: string
    //owner_name?: string,
    //cr_num?: number,
    //map: string,
    //followers?: number,
    //followings?: number,
    //follow?: boolean | any,
    //device_token_id?:string
  }