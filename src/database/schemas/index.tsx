import Realm from 'realm'
import Image from './Image';


const realm = new Realm({
    schema: [Image]
  });

export { realm, Image }

