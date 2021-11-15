package com.labharthiapp;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SQLiteDataBaseModule extends ReactContextBaseJavaModule {
    SQLiteHelper sqLiteHelper = new SQLiteHelper(getReactApplicationContext());

    SQLiteDataBaseModule(ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName(){
        return "SQLiteDatabaseModule";
    }


    @ReactMethod
    public void getNetInfo(Callback callback){

        ConnectivityManager connectivityManager = (ConnectivityManager) getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

        if(networkInfo != null){
            callback.invoke("true");
        }else{
            callback.invoke("false");
        }
    }

    //    before populating local database when login i have to wipe it
    //    otherwise might be replicated
    @ReactMethod
    public void cleanDB(String query){
//        sqLiteHelper.clean(query);
        getReactApplicationContext().deleteDatabase("labharthidb");
    }


    @ReactMethod
    public void addLabharthi(String sqlquery){
        sqLiteHelper.addOne(sqlquery);

//        Log.d("Creating Table = ", sqlquery);
    }

    @ReactMethod
    public void getAllLabharthi(Callback cb){
        String data = sqLiteHelper.getAll();
        cb.invoke(data);
    }

    @ReactMethod
    public void deleteLabharthi(String sqlquery){
        sqLiteHelper.deleteOne(sqlquery);
    }

    @ReactMethod
    public void updateLabharthi(String sqlquery){
        sqLiteHelper.updateOne(sqlquery);
    }

}
