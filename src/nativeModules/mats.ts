// author Adam G. Freeman, adamgf@gmail.com 01/26/2019
// Of course this is just a tiny subset of all the mat stuff ...
import { NativeModules } from 'react-native';

const  { RNOpencv3 } = NativeModules;
import { CvType, ColorConv  } from './constants';

export class Mat {

  rows: number | undefined
  cols: number | undefined
  CvType:  number | undefined
  CvScalar: any
  matIndex: any

  constructor(numRows?: number, numCols?: number, cvtype?:  number, scalarval?: any) {
    if (numRows && numCols && cvtype) {
      this.rows = numRows
      this.cols = numCols
      this.CvType = cvtype
    }
    if (scalarval) {
      this.CvScalar = scalarval
    }
  }

  init = async(): Promise<Mat> => {
    let res
    if (this.rows && this.cols && this.CvType && this.CvScalar) {
      res = await RNOpencv3.MatWithScalar(this.rows, this.cols, this.CvType, this.CvScalar)
    }
    else if (this.rows && this.cols && this.CvType) {
      res = await RNOpencv3.MatWithParams(this.rows, this.cols, this.CvType)
    }
    else {
      res = await RNOpencv3.Mat()
    }
    res.setTo = this.setTo.bind(res)
    res.get = this.get.bind(res)
    res.put = this.put.bind(res)
    res.t = this.t.bind(res)
    this.matIndex = res.matIndex
    return res
  }

  setTo = (color: keyof typeof ColorConv) => {
    // of course this could be implemented as a CvInvoke but
    // since it is probably such a common op ...
    RNOpencv3.setTo(this, color)
  }

  get = async(rownum: number, colnum: number, data: any) => {
    // not sure if data needs to be returned here ...
    // this has not been tested yet ...
    data = await RNOpencv3.getMatData(this, rownum, colnum)
  }

  put = (rownum: number, colnum: number, v0: number, v1: number, v2: number, v3: number) => {
    RNOpencv3.put(this, rownum, colnum, [v0, v1, v2, v3])
  }

  t = () => {
    RNOpencv3.transpose(this)
  }
}

export class MatOfInt {

  lowintvalue: any
  highintvalue: any

  constructor(lowintvalue: any, highintvalue: any) {
    this.lowintvalue = lowintvalue
    this.highintvalue = highintvalue
  }

  init = async() => {
	if (this.highintvalue && this.highintvalue != this.lowintvalue) {
      return await RNOpencv3.MatOfInt(this.lowintvalue, this.highintvalue)
	}
	else {
	  return await RNOpencv3.MatOfInt(this.lowintvalue, this.lowintvalue)
	}
  }
}

export class MatOfFloat {

  lowfloatvalue: any
  highfloatvalue: any

  constructor(lowfloatvalue: any, highfloatvalue: any) {
    this.lowfloatvalue = lowfloatvalue
    this.highfloatvalue = highfloatvalue
  }

  init = async() => {
  	if (this.highfloatvalue && this.highfloatvalue != this.lowfloatvalue) {
      return await RNOpencv3.MatOfFloat(this.lowfloatvalue, this.highfloatvalue)
  	}
  	else {
  	  return await RNOpencv3.MatOfFloat(this.lowfloatvalue, this.lowfloatvalue)
  	}
  }
}
