export function reducer(prevState: any, state: any) {
    return {
        ...prevState,
        ...state
    }
}


export interface ImageEdit {
    _id?: string
    uri?: string
    values?: any
    typeSource: "uri" | 'path'
    createdAt: number
}

export const dens = (func: Function) => {
    let count = 0;
    return () => {
        if (++count === 1) {
            setTimeout(() => {
                if (count === 2) func && func();
                count = 0;
            }, 300)
        }
    }
}