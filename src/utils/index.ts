export function reducer(prevState: any, state: any) {
    return {
        ...prevState,
        ...state
    }
}


export interface ImageEdit {
    _id?: string,
    uri?: string,
    values?: any,
    typeSource: "uri" | 'path'
}