
// @author Adam G. Freeman, adamgf@gmail.com
import { NativeModules, requireNativeComponent, View, UIManager, Platform, PermissionsAndroid } from 'react-native';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
const { RNOpencv3 } = NativeModules;

import { ColorConv, CvType, Imgproc, Core } from './constants';
import { CvScalar, CvPoint, CvSize, CvRect } from './coretypes';
import { Mat, MatOfInt, MatOfFloat } from './mats';
import { CvImage } from './cvimage';
import { findNodeHandle } from 'react-native';
import downloadAssetSource from './downloadAssetSource'


const CvCameraView = requireNativeComponent('CvCameraView', CvCamera);

var RNFS = require('react-native-fs')

class CvCamera extends Component {
  constructor(props) {
    super(props)
	  this.state = {
      cameraPermissed: Platform.OS === 'ios' ? true : PermissionsAndroid.PERMISSIONS.CAMERA
    }
  }
  componentDidMount = () => {
    if (Platform.OS === 'android') this.requestCameraPermissions()
  }
  async requestCameraPermissions() {
    try {
	  let granted = false
	  if (this.props.useStorage) {
        granted = await PermissionsAndroid.requestMultiple([
	      PermissionsAndroid.PERMISSIONS.CAMERA,
		  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
		  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE 
        ])
      }
	  else {
        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)	
	  }
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		const retJson = await NativeModules.CvCameraModule.initCamera(findNodeHandle(this))
		if (retJson.cameraInitialized) {
          this.setState({cameraPermissed:true})
		}
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }
  setOverlay(overlayMat) {
	if (Platform.OS === 'android') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.getViewManagerConfig('CvCameraView').Commands.setOverlay,
        [overlayMat],
      )
    }
	else {
	  const options = { 'overlayMat' : overlayMat }
	  NativeModules.CvCameraView.setOverlay(options, findNodeHandle(this))
	}
  }
  async takePicture(filename) {
	const outputFilename = RNFS.DocumentDirectoryPath + '/' + filename
	const pictureOptions = { 'filename' : outputFilename }

	if (Platform.OS === 'android') {
	  return await NativeModules.CvCameraModule.takePicture(pictureOptions, findNodeHandle(this))
	}
	else {
      return await NativeModules.CvCameraView.takePicture(pictureOptions, findNodeHandle(this))
	}
  }
  startRecording(filename) {
	var outputFilename = RNFS.DocumentDirectoryPath + '/' + filename
	if (Platform.OS === 'android') {
	  outputFilename = RNFS.ExternalStorageDirectoryPath + '/' + filename
	}
	const pictureOptions = { 'filename' : outputFilename }

	if (Platform.OS === 'android') {
	  NativeModules.CvCameraModule.startRecording(pictureOptions, findNodeHandle(this))
	}
	else {
      NativeModules.CvCameraView.startRecording(pictureOptions, findNodeHandle(this))
	}
  }
  async stopRecording() {
	if (Platform.OS === 'android') {
	  return await NativeModules.CvCameraModule.stopRecording(findNodeHandle(this))
	}
	else {
      return await NativeModules.CvCameraView.stopRecording(findNodeHandle(this))
	}
  }
  render() {
    if (!this.state.cameraPermissed) return (<View/>)
    return (<CvCameraView {...this.props} />);
  }
}

CvCamera.propTypes = {
  ...View.propTypes,
  facing: PropTypes.string,
  useStorage: PropTypes.bool
};

class CvInvokeGroup extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    groupid: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)
  }
  renderChildren() {
    const { children, groupid, cvinvoke } = this.props

    let ins = []
    let functions = []
    let paramsArr = []
    let outs = []
    let callbacks = []
    let groupids = []

    if (cvinvoke && cvinvoke.ins) {
      ins = cvinvoke.ins
    }
    if (cvinvoke && cvinvoke.functions) {
      functions = cvinvoke.functions
    }
    if (cvinvoke && cvinvoke.paramsArr) {
      paramsArr = cvinvoke.paramsArr
    }
    if (cvinvoke && cvinvoke.outs) {
      outs = cvinvoke.outs
    }
    if (cvinvoke && cvinvoke.callbacks) {
      callbacks = cvinvoke.callbacks
    }
    if (cvinvoke && cvinvoke.groupids) {
      groupids = cvinvoke.groupids
    }

    const offspring = React.Children.map(children,
      (child,i) => {
        if (child.type.displayName === 'CvInvoke') {
          const {inobj, func, params, outobj, callback} = child.props
          ins.push(inobj) // can be nil
          functions.push(func)
          paramsArr.push(params)
          outs.push(outobj) // can be nil
          callbacks.push(callback) // can be nil
          groupids.push(groupid)
        }
        else {
          return React.cloneElement(child, {
            // pass info down to the next CvInvokeGroup or to the CvCamera
            ...child.props, "cvinvoke" : { "ins" : ins, "functions" : functions, "paramsArr": paramsArr, "outs" : outs, "callbacks": callbacks, "groupids": groupids }
          })
        }
    })
    return offspring
  }
  render() {
    return (
      <React.Fragment>
        {this.renderChildren()}
      </React.Fragment>
    )
  }
}

class CvInvoke extends Component {
  static propTypes = {
    inobj: PropTypes.string,
    func: PropTypes.string.isRequired,
    params: PropTypes.any,
    outobj: PropTypes.string,
    callback: PropTypes.string
  }
  constructor(props) {
    super(props)
  }
  renderChildren() {
    const { cvinvoke, inobj, func, params, outobj, callback, children } = this.props

    if (children) {
      let newins = []
      let newfunctions = []
      let newparamsarr = []
      let newouts = []
      let newcallbacks = []

      if (cvinvoke && cvinvoke.ins) {
        newins = cvinvoke.ins
      }
      if (cvinvoke && cvinvoke.functions) {
        newfunctions = cvinvoke.functions
      }
      if (cvinvoke && cvinvoke.paramsArr) {
        newparamsarr = cvinvoke.paramsArr
      }
      if (cvinvoke && cvinvoke.outs) {
        newouts = cvinvoke.outs
      }
      if (cvinvoke && cvinvoke.callbacks) {
        newcallbacks = cvinvoke.callbacks
      }
      newins.push(inobj)
      newfunctions.push(func)
      newparamsarr.push(params)
      newouts.push(outobj)
      newcallbacks.push(callback)

      const newKidsOnTheBlock = React.Children.map(children,
        (child,i) => React.cloneElement(child, {
          // pass info down to the CvCamera
          ...child.props, "cvinvoke" : { "ins" : newins, "functions" : newfunctions, "paramsArr": newparamsarr, "outs" : newouts, "callbacks": newcallbacks }
        })
      )
      return newKidsOnTheBlock
    }
    else {
      return (
        <CvInvoke inobj={inobj} func={func} params={params} outobj={outobj} callback={callback}/>
      )
    }
  }
  render() {
    return(
      <React.Fragment>
        {this.renderChildren()}
      </React.Fragment>
    )
  }
}

const RNCv = RNOpencv3

export {
  RNCv,
  CvImage,
  CvCamera,
  CvInvoke,
  CvInvokeGroup,
  ColorConv,
  CvType,
  Imgproc,
  Core,
  Mat,
  MatOfInt,
  MatOfFloat,
  CvScalar,
  CvPoint,
  CvSize,
  CvRect,
  downloadAssetSource
};
