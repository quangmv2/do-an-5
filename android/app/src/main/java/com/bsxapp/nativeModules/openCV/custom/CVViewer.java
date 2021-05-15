package com.bsxapp.nativeModules.openCV.custom;

import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import android.widget.ImageView;

import androidx.annotation.RequiresApi;

import com.bsxapp.R;
import com.bsxapp.nativeModules.openCV.util.EnumHistory;
import com.bsxapp.nativeModules.openCV.util.History;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import org.opencv.android.OpenCVLoader;
import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.io.File;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CVViewer extends SimpleViewManager<ImageView> {

    private static final String RNName = "RNCVViewer";
    private ReactApplicationContext reactContext;
    private static final String TAG = "RNCVViewer";
    private static final short MAX_HITAGRAM = 255;

    static {
//        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        if (OpenCVLoader.initDebug()){
            Log.i(TAG, "Load opencv success");
     } else Log.e(TAG, "Load opencv faild");
    }

    private ImageView imageView;
    private Mat imageMat;
    ate Mat currentMat;
    private List<History> historiesMat;

    public CVViewer(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        historiesMat = new ArrayList<>();
//        this.imageMat = new Mat();
        this.currentMat = new Mat();
        imageView = new ImageView(this.reactContext);
    }

    @Override
    public String getName() {
        return RNName;
    }

    @Override
    protected ImageView createViewInstance(ThemedReactContext reactContext) {
//        imageView.setImageResource(R.drawable.test);
        return imageView;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactProp(name = "source")
    public void sourceImage(ImageView view, String path) {
        System.out.println(path);
        if (path == null) return;
        Runnable loadImage = () -> {
            try {
                Uri uri = Uri.parse(path);
                System.out.println(uri.getPath());
                Imgcodecs imageCodecs = new Imgcodecs();
                Mat matrix = imageCodecs.imread(uri.getPath(), Imgcodecs.IMREAD_COLOR);
                this.imageMat = matrix;
                this.historiesMat.clear();
                Imgproc.cvtColor(matrix, matrix, Imgproc.COLOR_BGR2RGB);
                setImageFromMath(matrix);
                System.out.println(2);
            } catch (Exception e) {
                Log.e(TAG, "err path");
            }
        };
        Thread thread = new Thread(loadImage);
        thread.start();
        System.out.println(3);
    }


    @ReactProp(name = "blur", defaultInt = 0)
    public void setBlur(ImageView view, Integer value) {
        if (imageMat == null) return;
        Thread task = new Thread(() -> {
            Mat dst = new Mat();
            Imgproc.GaussianBlur(this.imageMat, dst, new Size(20, 20), value);
            setImageFromMath(dst);
           System.out.println(value);
        });
        task.start();
    }

    @ReactProp(name = "autoHistogram", defaultBoolean = false)
    public void setHitogram(ImageView view, boolean value) {
        System.out.println(value);
        if (imageMat == null) return;
//        try {
            if (value != true) {
                this.historiesMat.add(new History(EnumHistory.AUTO_HISTORY, -1));
                setImageFromMath(this.imageMat);
                return;
            };
            Mat cvtHist = this.imageMat.clone();
            Imgproc.cvtColor(cvtHist, cvtHist, Imgproc.COLOR_RGB2HSV);
            ArrayList<Mat> chanelsColor = new ArrayList<>(3);
            Core.split(cvtHist, chanelsColor);
            Imgproc.equalizeHist(chanelsColor.get(2), chanelsColor.get(2));
            Core.merge(chanelsColor, cvtHist);
            Imgproc.cvtColor(cvtHist, cvtHist, Imgproc.COLOR_HSV2RGB);
//            this.historiesMat.add(new History(EnumHistory.AUTO_HISTORY, 1));
//            this.currentMat = cvtHist;
            setImageFromMath(cvtHist);
//        }catch (Exception e) {
//            Log.e(TAG, "err autoHistogram");
//        }

    }

    private void setImageFromMath(Mat matrix) {
        Bitmap bitmap = Bitmap.createBitmap(matrix.cols(), matrix.rows(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(matrix, bitmap);
        this.imageView.setImageBitmap(bitmap);
    }

//    Mat convertBitMap2Mat (Bitmap rgbaImage){
//        Mat rgbaMat = new Mat(rgbaImage.getHeight(), rgbaImage.getWidth(),CvType.CV_8UC4);
//        Bitmap bmp32 = rgbaImage.copy(Bitmap.Config.ARGB_8888, true);
//        Utils.bitmapToMat(bmp32, rgbaMat);
//
//        Mat rgbMat = new Mat(rgbaImage.getHeight(), rgbaImage.getWidth(), CvType.CV_8UC3);
//        cvtColor(rgbaMat,rgbMat,Imgproc.COLOR_RGBA2BGR, 3);
//        return rgbMat;
//    }

}
