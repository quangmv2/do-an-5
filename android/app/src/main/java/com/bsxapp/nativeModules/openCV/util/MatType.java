package com.bsxapp.nativeModules.openCV.util;

import org.opencv.core.Mat;
public class MatType {
    private EnumMatType type;
    private Mat matrix;

    public MatType() {

    }

    public MatType(EnumMatType type, Mat matrix) {
        this.type = type;
        this.matrix = matrix;
    }

    public EnumMatType getType() {
        return type;
    }

    public void setType(EnumMatType type) {
        this.type = type;
    }

    public Mat getMatrix() {
        return matrix;
    }

    public void setMatrix(Mat matrix) {
        this.matrix = matrix;
    }
}
