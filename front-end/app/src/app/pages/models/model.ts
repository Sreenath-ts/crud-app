export interface apiResponse {
        message: string,
        status: string | number,
        data: record[],
}

export interface record {
    id : string,
    name : string,
    email : string,
    phone : string,
    city : string
}