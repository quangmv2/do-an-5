import { useNavigation } from "@react-navigation/native";
import { COLOR } from "@style";
import { Button, Text, View } from "native-base";
import React, { FunctionComponent, memo, useCallback, useEffect, useState } from "react";
import { StatusBar, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { Screens } from "@routers"
import { useStore } from "@store";
import { observer } from "mobx-react";
import { checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS } from "react-native-permissions";
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { createImageEdit, queriesImageEdit } from "@database";
import { ImageEdit } from "@utils";
import FastImage from 'react-native-fast-image'

type Props = {
}

const Home: FunctionComponent = observer(props => {

  const navigation = useNavigation();

  const [images, setImages] = useState<ImageEdit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    checkPermission()
    loadImageEdited();
  }, [])

  const loadImageEdited = useCallback(() => {
    setLoading(true)
    queriesImageEdit().then(data => {
      setImages(data)
    }).catch(() => { }).finally(() => setLoading(false))
  }, [])

  const checkPermission = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA
    ]).then(results => {
      if (results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.DENIED ||
        results[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.DENIED ||
        results[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED
      ) requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.CAMERA
      ]).then(result => {

      })
    })
  }

  const loadImages = useCallback(async () => {
    launchImageLibrary({
      mediaType: 'photo'
    }, (res: ImagePickerResponse) => {
      if (!res || res.didCancel) return;
      createImageEdit({
        uri: res.uri,
        typeSource: 'uri'
      }).then((data) => {
        loadImageEdited()
      }).catch(() => { })
      navigation.navigate(Screens.Detail, {
        imgPath: res.uri
      })
    })
  }, [navigation])

  const loadImagesFromCamera = useCallback(async () => {

    launchCamera({
      mediaType: 'photo',
      cameraType: 'back'
    }, (res) => {
      createImageEdit({
        uri: res.uri,
        typeSource: 'uri'
      }).then((data) => {
        loadImageEdited()
      }).catch(() => { })
      if (!res || res.didCancel) return;
      navigation.navigate(Screens.Detail, {
        imgPath: res.uri
      })
    })
  }, [navigation])

  return (
    <SafeAreaView style={{
      flex: 1,
      flexDirection: 'column',
      paddingBottom: 60
    }}>
      <StatusBar backgroundColor={COLOR.COLOR_PRIMARY} />
      <View
        style={{
          marginVertical: 10
        }}
      >
        <Button
          style={{
            alignSelf: "center",
            // marginTop: 20,
            borderRadius: 10,
            backgroundColor: COLOR.COLOR_PRIMARY,
            overflow: "hidden"
          }}
          onPress={loadImages}
        >
          <Text
            style={{
              textAlign: "center"
            }}
          >
            Choose Image from Gallry
                </Text>
        </Button>
        <Button
          style={{
            alignSelf: "center",
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: COLOR.COLOR_PRIMARY,
            overflow: "hidden"
          }}
          onPress={loadImagesFromCamera}
        >
          <Text
            style={{
              textAlign: "center"
            }}
          >
            Take on picture
                </Text>
        </Button>
      </View>
      <FlatList
        data={images}
        renderItem={({ item, index }) => {
          return <TouchableOpacity
            onPress={() => navigation.navigate(Screens.Detail, {
              imgPath: item.uri
            })}
          >
            <FastImage
              source={{
                uri: item.uri
              }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        }}
        numColumns={4}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            onRefresh={loadImageEdited}
            refreshing={loading}
          />
        }
        onEndReachedThreshold={2}
      />
    </SafeAreaView>
  )
})

export default memo(Home)