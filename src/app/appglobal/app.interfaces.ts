export interface IHomeServices {
    serviceRequest: any[],
    bookDate: any[],
    nearByServices: any[]
}

export interface IHomeServiceResponse {
    status: string,
    data: IHomeServices
}