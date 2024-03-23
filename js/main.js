$("#kijitsu").hide();
    //*********************************************************
    //jkanban
    //*********************************************************
      
      let data = [
        { id: "board-1", title: "やらなきゃ！" },
        { id: "board-2", title: "やってる！" },
        { id: "board-3", title: "おわった！" },
      ];

      let taskid = 0;
      let kanban;

     

      // ボタンの処理 JQueryでできない。。

    //   $("form[name='wrap'] button[name='new']").on("click", createKanban);
      document.forms.wrap.new.addEventListener("click",createKanban);
      document.forms.wrap.import.addEventListener("change",importFile);
    //   $("form[name='wrap'] input[name='import']").on("change", importFile);
      $("#download").on("click", downloadJSON);
      
// 「あたらしく作る」ボタンを押したときの挙動
      function createKanban(){
        kanban = new jKanban({
        element: "#kanban",
        boards: data,
        responsivePercentage: true,
        dragItems: true,
        dragBoards: true,
        itemAddOptions: {
          enabled: true,
          content: "ついかする",
        },

        
        // 要素をクリックする→タスクが削除されるように
        click: (element) => kanban.removeElement(element.dataset.eid),

        // 追加するボタンを押すと要素を書くところが出てくる
        buttonClick: (element, id) => addTask(id),
      });

// ボードが出たらformを消してダウンロードリンク、期日を出す
$("form").hide();
$("#download").show();
$("#kijitsu").show();
    }


    // // FileReaderでPCのファイルを同期せず読み取る

    function importFile(event){
        console.log(event);
        const reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = () => {
         data = JSON.parse(reader.result);
         createKanban();
        }
    }

// ダウンロードリンクを押したら、JSONファイルでデータを保存する
function downloadJSON(){
    const blobData = new Blob([JSON.stringify(createDATA())],{type:'application/json'});
    $("#download").attr("href", window.URL.createObjectURL(blobData));
}

function createDATA(){
    const jkanbanData = [];

    for (let i=0; i<data.length; i++){
        const boardLists = {
            id: data[i].id,
            title: data[i].title,
            item: []
        }

        kanban.getBoardElements(data[i].id).forEach(item => {
            boardLists.item.push({
                id: item.dataset.eid,
                title: item.textContent
            });
        })
      jkanbanData.push(boardLists);
    }
     return jkanbanData;

}

      
      function addTask(id) {
        const task = document.createElement("input");

        kanban.addForm(id, task);
        task.focus(); //タスクが出てきた時にすぐ書き出せるように


        // カーソルが離れると登録される
        task.addEventListener("blur", (e) => {
          kanban.addElement(id, {
            id: `item-${taskid++}`,
            title: e.target.value,
          });
          task.remove();
        });
      }

//*******************************************************
//countdown.js
//*******************************************************

// 期日のセレクト表示

// 年

let str1 = "";
for (let i = 2024; i < 2035; i++) {
  str1 += `<option>${i + "年"}</option><br>`;
}
$("#year").html(str1);

// 月
let str2 = "";
for (let i = 1; i < 13; i++) {
  str2 += `<option>${i + "月"}</option><br>`;
}
$("#month").html(str2);

// 日
let str3 = "";
for (let i = 1; i < 32; i++) {
  str3 += `<option>${i + "日"}</option><br>`;
}
$("#date").html(str3);



// selectで選んだ期日をとってくる

// 年、月、日の選択肢が変更されたときのイベントリスナーを設定
$("#year, #month, #date").change(function() {
    updateCountdown();
});

// カウントダウンを更新する関数
function updateCountdown() {
    // 年、月、日の値を取得
    let year = parseInt($("#year").val());
    let month = parseInt($("#month").val());
    let date = parseInt($("#date").val());

    // 期日を設定
    let deadline = new Date(year, month - 1, date);

    // 現在の日時を取得
    let now = new Date();

    // 期日までの残り時間を計算
    let timeRemaining = deadline - now;

    // カウントダウンの計算
    let days1 = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours1 = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes1 = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds1 = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // カウントダウンを表示
    
  $("#days") .html(days1);
  $("#hours") .html(hours1);
  $("#minutes").html(minutes1);
  $("#seconds") .html(seconds1);
}
$(document).ready(function() {
    // カウントダウンの初期化
    updateCountdown();
    let countdownInterval;

    // カウントダウンの更新
    function startCountdown() {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);　//1秒ごと更新
    }

    // 期日を設定するボタンのクリックイベント
    $(".set").on("click", function() {
        clearInterval(countdownInterval); // カウントダウンを一度停止しないと
        startCountdown(); // 新しい期日でカウントダウンスタート
    });

    // リセットボタンのクリックイベント
    $(".reset").on("click", function() {
        clearInterval(countdownInterval); // カウントダウンをストップして
        // ０表示にする
        $("#days") .html('0');
        $("#hours") .html('0');
        $("#minutes").html('0');
        $("#seconds") .html('0');
    });
  });

// ☝️ここまで上手くいったけど、カウントダウンが始まらない！countdown.jsはJQuery効かない説あり→できた！
// JavaScriptで書き直し
// 年、月、日の選択肢が変更されたときのイベントリスナーを設定
// document.getElementById("year").addEventListener("change", updateCountdown);
// document.getElementById("month").addEventListener("change", updateCountdown);
// document.getElementById("date").addEventListener("change", updateCountdown);

// // カウントダウンを更新する関数
// function updateCountdown() {
//     // 年、月、日の値を取得
//     let year = parseInt(document.getElementById("year").value);
//     let month = parseInt(document.getElementById("month").value);
//     let date = parseInt(document.getElementById("date").value);

//     // 期日を設定
//     let deadline = new Date(year, month - 1, date);

//     // 現在の日時を取得
//     let now = new Date();

//     // 期日までの残り時間を計算
//     let timeRemaining = deadline - now;

//     // カウントダウンの計算
//     let days1 = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//     let hours1 = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     let minutes1 = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds1 = Math.floor((timeRemaining % (1000 * 60)) / 1000);

//     // カウントダウンを表示
//     document.getElementById("days").innerHTML = days1;
//     document.getElementById("hours").innerHTML = hours1;
//     document.getElementById("minutes").innerHTML = minutes1;
//     document.getElementById("seconds").innerHTML = seconds1;
// }
 
// // 初期化時にカウントダウンを更新
// updateCountdown();
// setInterval(updateCountdown, 1000);

   
const savedYear = localStorage.getItem("selectedYear");  //ローカルストレージ
const savedMonth = localStorage.getItem("selectedMonth");
const savedDay = localStorage.getItem("selectedDay");

//selectされた年月日の値
    if (savedYear && savedMonth && savedDay) {
        $("#year").val(savedYear);
        $("#month").val(savedMonth);
        $("#date").val(savedDay);
    }

    // selectが変更されたときにlocalStorageに保存
    $("#year, #month, #date").change(function() {
        saveToLocalStorage();
    });

    function saveToLocalStorage() {
        const selectedYear = $("#year").val();
        const selectedMonth = $("#month").val();
        const selectedDay = $("#date").val();

        localStorage.setItem("selectedYear", selectedYear);
        localStorage.setItem("selectedMonth", selectedMonth);
        localStorage.setItem("selectedDay", selectedDay);
    }
