export interface UserListApi {
    limit: number
    skip: number
    total: number
    users: Array<UserList>
}

export interface UserList {
    age: number,
    bloodGroup: string,
    domain: string,
    email: string,
    eyeColor: string,
    firstName: string,
    gender: string,
    id: number,
    lastName: string
    maidenName: string,
    phone: string
}