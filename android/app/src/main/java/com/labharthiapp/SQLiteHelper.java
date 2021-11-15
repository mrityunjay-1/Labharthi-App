package com.labharthiapp;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import androidx.annotation.Nullable;

public class SQLiteHelper extends SQLiteOpenHelper {
    public SQLiteHelper(@Nullable Context context) {
        super(context, "labharthidb", null, 1);
    }



    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL("create table labharthi (id text(100), name text(100), parent text(100), aadhaar text(12), contact text(15), recentOTP text(15))");

    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {
    }

//    adding labharthi
    public void addOne(String sqlquery){
        SQLiteDatabase sdb = this.getWritableDatabase();
        sdb.execSQL(sqlquery);
    }


//    just execute the query. query that came from frontend
    public void clean(String query){
        SQLiteDatabase sdb = this.getWritableDatabase();
        sdb.execSQL(query);
    }





//    getting all the labharthis

    public String getAll(){
        SQLiteDatabase sdb = this.getReadableDatabase();

        Cursor cursor = sdb.rawQuery("select * from labharthi", null);

        int x = 0;
        String res = "";

        if(cursor.moveToFirst()) {
            res += "{\"count\": " + cursor.getCount() + ", \"data\": [";

            // loop over cursor
            do{
                res += "{\"id\": " + "\"" + cursor.getString(0) +"\"," +
                        "\"name\": " + "\"" + cursor.getString(1) +"\"," +
                        "\"parent\": " + "\"" + cursor.getString(2) +"\"," +
                        "\"aadhaar\": " + "\"" + cursor.getString(3) +"\"," +
                        "\"contact\": " + "\"" + cursor.getString(4) +"\"," +
                        "\"otp\": " + "\"" + cursor.getString(5) +"\"},";

            }while(cursor.moveToNext());

            res += "]}";

        }else{
            res += "{\"count\": 0, \"data\": []}";
        }

        return res;
    }



//    deleting labharthi

    public void deleteOne(String sqlquery){
        SQLiteDatabase sdb = this.getWritableDatabase();
        sdb.execSQL(sqlquery);
    }



//    updating labharthi

    public void updateOne(String sqlquery){
        SQLiteDatabase sdb = this.getWritableDatabase();
        sdb.execSQL(sqlquery);
    }

}
