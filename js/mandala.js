 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
 import {
   getDatabase,
   ref,
   push,
   set,
   update,
   remove,
   onChildAdded,
   onChildChanged,
   onChildRemoved,
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration（キー部分なのでのちほど削除）
 import firebaseConfig from "./ApiKey.js";

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const db = getDatabase(app); //RealtimeDBに接続
 const dbRef = ref(db, "chat/msg"); //RealtimeDB内の"chat"を使う
const dbRef_1 = ref(db,"chat/td1");
const dbRef_2 = ref(db,"chat/td2");
const dbRef_3 = ref(db,"chat/td3");
const dbRef_4 = ref(db,"chat/td4");
const dbRef_5 = ref(db,"chat/td5");
const dbRef_6 = ref(db,"chat/td6");
const dbRef_7 = ref(db,"chat/td7");
const dbRef_8 = ref(db,"chat/td8");
           
 // ２つ目以降のテーブル、ボタンは隠す
 $("#todo1_open").hide();
 $("#todo2_open").hide();
 $("#todo3_open").hide();
 $("#todo4_open").hide();
 $("#todo5_open").hide();
 $("#todo6_open").hide();
 $("#todo7_open").hide();
 $("#todo8_open").hide();

 

 //データ登録(Click)
 $("#save").on("click", function () {
   const msg = {  
     goal: $("#goal").val(),
     todo1: $("#todo1").val(),
     todo2: $("#todo2").val(),
     todo3: $("#todo3").val(),
     todo4: $("#todo4").val(),
     todo5: $("#todo5").val(),
     todo6: $("#todo6").val(),
     todo7: $("#todo7").val(),
     todo8: $("#todo8").val(),
     }

   const newPostRef = push(dbRef); //ユニークKEYを生成
   set(newPostRef, msg);
  //"chat"にユニークKEYをつけてオブジェクトデータを登録
 });
       
 //最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
 // onChildAdded(dbRef, function (data) {
 //   //目標をonChildAddedのデータ表示
 //   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
 //   const key = data.key; //データのユニークキー（削除や更新に使用可能）
 //   //表示用テキスト・HTMLを作成
 //   // let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
 //   h += msg.goal;
 //   h +="ためには..."
 //   h += "</p>";
 //   $("#output").html(h); //#outputに要素を上書き
 //   $("#goal").html(h);
 // });

  // 削除イベント
  $("#clear").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat");
   remove(remove_item); //Firebaseデータ削除関数
 });

  // 削除処理がFirebase側で実行されたらイベント発生
  onChildRemoved(dbRef, (data) => {
   $("#" + data.key).remove(); //let h以下の塊を全部削除する指示
 });


 // frame1をクリックしたら新しい表が現れる＆表の真ん中にはtodo1
 // ほかの表は隠す

$("#frame1").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo2_open").hide();  
$("#todo3_open").hide();
$("#todo4_open").hide();
$("#todo5_open").hide();
$("#todo6_open").hide();
$("#todo7_open").hide();
$("#todo8_open").hide();
$("#todo1_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo1;
   h += "</p>";
   $("#todo1_center").html(h); //表センターに表示
   // $("#todo1").html(h);
 });
});



//   todo1のセーブ

 $("#save_1").on("click", function () {
 const td1 = {
       todo1_1: $("#todo1_1").val(),
       todo1_2: $("#todo1_2").val(),
       todo1_3: $("#todo1_3").val(),
       todo1_4: $("#todo1_4").val(),
       todo1_5: $("#todo1_5").val(),
       todo1_6: $("#todo1_6").val(),
       todo1_7: $("#todo1_7").val(),
       todo1_8: $("#todo1_8").val(),
     };
     const newPostRef_1 = push(dbRef_1); 
   set(newPostRef_1, td1); 
 });

// todo1のクリアー
 $("#clear_1").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td1");
   remove(remove_item); //Firebaseデータ削除関数
 });


 // frame2をクリックしたら新しい表が現れる＆表の真ん中にはtodo1

$("#frame2").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo3_open").hide();
$("#todo4_open").hide();
$("#todo5_open").hide();
$("#todo6_open").hide();
$("#todo7_open").hide();
$("#todo8_open").hide();
$("#todo2_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo2;
   h += "</p>";
   $("#todo2_center").html(h); //表センターに表示
   // $("#todo2").html(h);
 });
});



//   todo2のセーブ

 $("#save_2").on("click", function () {
 const td2 = {
       todo2_1: $("#todo2_1").val(),
       todo2_2: $("#todo2_2").val(),
       todo2_3: $("#todo2_3").val(),
       todo2_4: $("#todo2_4").val(),
       todo2_5: $("#todo2_5").val(),
       todo2_6: $("#todo2_6").val(),
       todo2_7: $("#todo2_7").val(),
       todo2_8: $("#todo2_8").val(),
     };
     const newPostRef_2 = push(dbRef_2); 
   set(newPostRef_2, td2); 
 });

// todo2のクリアー
 $("#clear_2").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td2");
   remove(remove_item); //Firebaseデータ削除関数
 });

  // frame3をクリックしたら新しい表が現れる＆表の真ん中にはtodo1
 // ほかの表は隠す

$("#frame3").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo2_open").hide();
$("#todo4_open").hide();
$("#todo5_open").hide();
$("#todo6_open").hide();
$("#todo7_open").hide();
$("#todo8_open").hide();
$("#todo3_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo3;
   h += "</p>";
   $("#todo3_center").html(h); //表センターに表示
   // $("#todo3").html(h);
 });
});



//   todo3のセーブ

 $("#save_3").on("click", function () {
 const td3 = {
       todo3_1: $("#todo3_1").val(),
       todo3_2: $("#todo3_2").val(),
       todo3_3: $("#todo3_3").val(),
       todo3_4: $("#todo3_4").val(),
       todo3_5: $("#todo3_5").val(),
       todo3_6: $("#todo3_6").val(),
       todo3_7: $("#todo3_7").val(),
       todo3_8: $("#todo3_8").val(),
     };
     const newPostRef_3 = push(dbRef_3); 
   set(newPostRef_3, td3); 
 });

// todo3のクリアー
 $("#clear_3").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td3");
   remove(remove_item); //Firebaseデータ削除関数
 });


  // frame4をクリックしたら新しい表が現れる＆表の真ん中にはtodo1
 // ほかの表は隠す

$("#frame4").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo2_open").hide();
$("#todo3_open").hide();
$("#todo5_open").hide();
$("#todo6_open").hide();
$("#todo7_open").hide();
$("#todo8_open").hide();
$("#todo4_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo4;
   h += "</p>";
   $("#todo4_center").html(h); //表センターに表示
   // $("#todo4").html(h);
 });
});



//   todo4のセーブ

 $("#save_4").on("click", function () {
 const td4 = {
       todo4_1: $("#todo4_1").val(),
       todo4_2: $("#todo4_2").val(),
       todo4_3: $("#todo4_3").val(),
       todo4_4: $("#todo4_4").val(),
       todo4_5: $("#todo4_5").val(),
       todo4_6: $("#todo4_6").val(),
       todo4_7: $("#todo4_7").val(),
       todo4_8: $("#todo4_8").val(),
     };
     const newPostRef_4 = push(dbRef_4); 
   set(newPostRef_4, td4); 
 });

// todo4のクリアー
 $("#clear_4").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td4");
   remove(remove_item); //Firebaseデータ削除関数
 });

// frame5をクリックしたら新しい表が現れる＆表の真ん中にはtodo1

$("#frame5").on("click",function(){
 let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo3_open").hide();
$("#todo4_open").hide();
$("#todo2_open").hide();
$("#todo6_open").hide();
$("#todo7_open").hide();
$("#todo8_open").hide();
$("#todo5_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo5;
   h += "</p>";
   $("#todo5_center").html(h); //表センターに表示
   // $("#todo5").html(h);
 });
});

 
//   todo5のセーブ

 $("#save_5").on("click", function () {
 const td5 = {
       todo5_1: $("#todo5_1").val(),
       todo5_2: $("#todo5_2").val(),
       todo5_3: $("#todo5_3").val(),
       todo5_4: $("#todo5_4").val(),
       todo5_5: $("#todo5_5").val(),
       todo5_6: $("#todo5_6").val(),
       todo5_7: $("#todo5_7").val(),
       todo5_8: $("#todo5_8").val(),
     };
     const newPostRef_5 = push(dbRef_5); 
   set(newPostRef_5, td5); 
 });

// todo5のクリアー
 $("#clear_5").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td5");
   remove(remove_item); //Firebaseデータ削除関数
 });

   // frame6をクリックしたら新しい表が現れる＆表の真ん中にはtodo1

$("#frame6").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo3_open").hide();
$("#todo4_open").hide();
$("#todo5_open").hide();
$("#todo2_open").hide();
$("#todo7_open").hide();
$("#todo8_open").hide();
$("#todo6_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo6;
   h += "</p>";
   $("#todo6_center").html(h); //表センターに表示
   // $("#todo6").html(h);
 });
});

 
//   todo6のセーブ

 $("#save_6").on("click", function () {
 const td6 = {
       todo6_1: $("#todo6_1").val(),
       todo6_2: $("#todo6_2").val(),
       todo6_3: $("#todo6_3").val(),
       todo6_4: $("#todo6_4").val(),
       todo6_5: $("#todo6_5").val(),
       todo6_6: $("#todo6_6").val(),
       todo6_7: $("#todo6_7").val(),
       todo6_8: $("#todo6_8").val(),
     };
     const newPostRef_6 = push(dbRef_6); 
   set(newPostRef_6, td6); 
 });

// todo６のクリアー
 $("#clear_6").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td6");
   remove(remove_item); //Firebaseデータ削除関数
 });

 // frame７をクリックしたら新しい表が現れる＆表の真ん中にはtodo1

$("#frame7").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo3_open").hide();
$("#todo4_open").hide();
$("#todo5_open").hide();
$("#todo6_open").hide();
$("#todo2_open").hide();
$("#todo8_open").hide();
$("#todo7_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo7;
   h += "</p>";
   $("#todo7_center").html(h); //表センターに表示
   // $("#todo7").html(h);
 });
});



//   todo7のセーブ

 $("#save_7").on("click", function () {
 const td7 = {
       todo7_1: $("#todo7_1").val(),
       todo7_2: $("#todo7_2").val(),
       todo7_3: $("#todo7_3").val(),
       todo7_4: $("#todo7_4").val(),
       todo7_5: $("#todo7_5").val(),
       todo7_6: $("#todo7_6").val(),
       todo7_7: $("#todo7_7").val(),
       todo7_8: $("#todo7_8").val(),
     };
     const newPostRef_7 = push(dbRef_7); 
   set(newPostRef_7, td7); 
 });

// todo7のクリアー
 $("#clear_7").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td7");
   remove(remove_item); //Firebaseデータ削除関数
 });

  // frame8をクリックしたら新しい表が現れる＆表の真ん中にはtodo1

$("#frame8").on("click",function(){
let goaltext = $("#goal").val();
$("#output").html(goaltext+"ためには..");
$("#todo1_open").hide();  
$("#todo3_open").hide();
$("#todo4_open").hide();
$("#todo5_open").hide();
$("#todo6_open").hide();
$("#todo7_open").hide();
$("#todo2_open").hide();
$("#todo8_open").show();
onChildAdded(dbRef, function (data) {
   const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
   const key = data.key; //データのユニークキー（削除や更新に使用可能）
   // //表示用テキスト・HTMLを作成
   let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
   h += msg.todo8;
   h += "</p>";
   $("#todo8_center").html(h); //表センターに表示
   // $("#todo8").html(h);
 });
});

 

//   todo8のセーブ

 $("#save_8").on("click", function () {
 const td8 = {
       todo8_1: $("#todo8_1").val(),
       todo8_2: $("#todo8_2").val(),
       todo8_3: $("#todo8_3").val(),
       todo8_4: $("#todo8_4").val(),
       todo8_5: $("#todo8_5").val(),
       todo8_6: $("#todo8_6").val(),
       todo8_7: $("#todo8_7").val(),
       todo8_8: $("#todo8_8").val(),
     };
     const newPostRef_8 = push(dbRef_8); 
   set(newPostRef_8, td8); 
 });

// todo8のクリアー
 $("#clear_8").on("click", function () {
   location.reload();
   const remove_item = ref(db, "chat/td8");
   remove(remove_item); //Firebaseデータ削除関数
 });