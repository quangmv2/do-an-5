import Realm from 'realm'
import Huyen from './Huyen';
import TinhThanh from './TinhThanh';


const realm = new Realm({
    schema: [Huyen, TinhThanh]
  });

export { realm, Huyen, TinhThanh }

