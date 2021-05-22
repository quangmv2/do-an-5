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
import com.bsxapp.nativeModules.openCV.util.EnumMatType;
import com.bsxapp.nativeModules.openCV.util.History;
import com.bsxapp.nativeModules.openCV.util.MatType;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private Integer blur = 0;
    private Integer light = 0;
    private boolean autoHist = false;
//    private List<History> historiesMat;
//    private Map<EnumMatType, Mat> matrixs;

    public CVViewer(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
//        historiesMat = new ArrayList<>();
//        this.imageMat = new Mat();
        imageView = new ImageView(this.reactContext);
//        matrixs = new HashMap<>();
//        matrixs.put(EnumMatType.AUTO_HISTORY, new Mat());
//        matrixs.put(EnumMatType.BLUR, new Mat());
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
                Imgproc.cvtColor(matrix, matrix, Imgproc.COLOR_BGR2RGB);
                setImageFromMath(matrix);
            } catch (Exception e) {
                Log.e(TAG, "err path");
            }
        };
        Thread thread = new Thread(loadImage);
        thread.start();
        System.out.println(3);
    }

    @ReactProp(name = "nomral", defaultBoolean = false)
    public void showNomral(ImageView view, boolean value) {
        Thread task = new Thread(() -> {
            if (value) this.setImageFromMath(this.imageMat);
            else this.processImage();
        });
        task.start();
    }

    @ReactProp(name = "light", defaultInt = 0)
    public void setLight(ImageView view, Integer value) {
        Thread task = new Thread(() -> {
            this.light = value;
            this.processImage();
        });
        task.start();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactProp(name = "blur", defaultInt = 0)
    public void setBlur(ImageView view, Integer value) {
        if (imageMat == null) return;
        Thread task = new Thread(() -> {
            this.blur = value;
            this.processImage();
        });
        task.start();
    }

    @ReactProp(name = "autoHistogram", defaultBoolean = false)
    public void setHitogram(ImageView view, boolean value) {
        System.out.println(value);
        if (imageMat == null) return;
        Thread task = new Thread(() -> {
           this.autoHist = value;
           this.processImage();
        });
        task.start();
    }

    private void processImage() {
        Mat dst = this.imageMat.clone();
        System.out.println(this.blur);
        if (this.blur != 0) Imgproc.GaussianBlur(dst, dst, new Size(15, 15), this.blur);
        if (this.autoHist) {
            Imgproc.cvtColor(dst, dst, Imgproc.COLOR_RGB2HSV);
            ArrayList<Mat> chanelsColor = new ArrayList<>(3);
            Core.split(dst, chanelsColor);
            Imgproc.equalizeHist(chanelsColor.get(2), chanelsColor.get(2));
            Core.merge(chanelsColor, dst);
            Imgproc.cvtColor(dst, dst, Imgproc.COLOR_HSV2RGB);
        }
        System.out.println(this.light);
        dst.convertTo(dst, -1, 1, this.light);
        this.setImageFromMath(dst);
    }

    private void setImageFromMath(Mat matrix) {
        Bitmap bitmap = Bitmap.createBitmap(matrix.cols(), matrix.rows(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(matrix, bitmap);
        this.imageView.setImageBitmap(bitmap);
    }
}
