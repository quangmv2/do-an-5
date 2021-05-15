package com.bsxapp.nativeModules.openCV.util;

public class History {

    private EnumHistory type;
    private Integer value;

    public History() {

    }

    public History(EnumHistory type, Integer value) {
        this.type = type;
        this.value = value;
    }

    public EnumHistory getType() {
        return type;
    }

    public void setType(EnumHistory type) {
        this.type = type;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
