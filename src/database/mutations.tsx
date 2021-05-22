import { ImageEdit } from "@utils";
import { realm } from "./schemas";
import uuid from 'react-native-uuid'

const createImageEdit = (image?: ImageEdit) => new Promise((reslove, reject) => {
    try {
        if (!image?._id) image._id = uuid.v4().toString()
        console.log(image);
        image.values = ''
        image.createdAt = Date.now()
        realm.write(() => {
            const tt: ImageEdit = realm.create('Image', image);
            console.log(tt);

            reslove('')
        })
    } catch (error) {
        console.log(error);

        reject(error)
    }
})



export {
    createImageEdit
}