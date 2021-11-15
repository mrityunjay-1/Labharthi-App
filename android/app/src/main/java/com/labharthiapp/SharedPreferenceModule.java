package com.labharthiapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.telecom.Call;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class SharedPreferenceModule extends ReactContextBaseJavaModule {
    SharedPreferenceModule(ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName(){
        return "SharedPreferenceModule";
    }




    @ReactMethod
    public void addItem(String key, String value){
        SharedPreferences sharedPreferences = getCurrentActivity().getPreferences(Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putString(key, value);

        editor.apply();
    }


    @ReactMethod
    public void getItem(String key, Callback callback){
        SharedPreferences sharedPreferences = getCurrentActivity().getPreferences(Context.MODE_PRIVATE);
        String value = sharedPreferences.getString(key, "");

        callback.invoke(value);
    }






    @ReactMethod
    public void addPendingLabharthi(String key, String value, Callback callback){

        SharedPreferences sharedPreferences = getCurrentActivity().getPreferences(Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();

        callback.invoke("all good! Labharthi Created and saved as pending!");
    }

    @ReactMethod
    public void getPendingLabharthi(String key, Callback callback){
        SharedPreferences sharedPreferences = getCurrentActivity().getPreferences(Context.MODE_PRIVATE);
        String allLabharthi = sharedPreferences.getString(key, "[]");

        callback.invoke(allLabharthi);
    }


    @ReactMethod
    public void vanishLabharthi(String key, Callback callback){
        SharedPreferences sharedPreferences = getCurrentActivity().getPreferences(Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, "[]");
        editor.apply();

        callback.invoke("Pending Labharthi List Cleared.");
    }

    @ReactMethod
    public void vanish(Callback callback){
        SharedPreferences sharedPreferences = getCurrentActivity().getPreferences(Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.clear();
        editor.apply();

        callback.invoke("All cleared...");

    }
}
