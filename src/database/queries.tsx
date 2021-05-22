import { ImageEdit } from "@utils";
import { realm } from "./schemas";

const queriesImageEdit  = (): Promise<ImageEdit[]>  => new Promise((reslove, reject) => {
    try {
        const images: any  = realm.objects("Image").sorted('createdAt', false)
        reslove(images)
    } catch (error) {
        reject(error);
    }
})

export {

    queriesImageEdit
}
