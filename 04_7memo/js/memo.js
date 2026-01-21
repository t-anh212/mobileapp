"use strict";

window.addEventListener("DOMContentLoaded", function () {

    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはlocal storage機能が実装されていません");
        return;
    } else {

        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        allClearStorage();
        selectTable();
    }
}, false);


/* -------------------------------------------------------
   保存処理（LocalStorageへ保存）
------------------------------------------------------- */
function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            window.alert("キーとメモを入力してください。");
            return;
        } else {
            let result = window.confirm(`LocalStorage に ${key} : ${value} 保存しますか？`);
            if (result === true) {
                localStorage.setItem(key, value);

                viewStorage();

                window.alert(`LocalStorageに ${key} : ${value} を保存しました。`);

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }
    }, false
    );
};
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectCheckBox();
            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let result = window.confirm(`LocalStorage に${key} : ${value}削除しますか？`);
                if (result === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorage" + key + " " + value + "を削除(delete)しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};
function allClearStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータを全て削除(all clear)します。\nよろしいですか？");
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータを全て削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};
/* -------------------------------------------------------
   テーブル選択ボタン
------------------------------------------------------- */
function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBox();
    }, false);
}


/* -------------------------------------------------------
   ラジオボタン選択処理
------------------------------------------------------- */
function selectCheckBox() {
    let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (w_cnt === 1) {
        return w_sel = "1";
    } else {
        window.alert("1つ選択(select)してください。");
    }

};





/* -------------------------------------------------------
   LocalStorage 内容を表に表示
------------------------------------------------------- */
function viewStorage() {
    const list = document.getElementById("list");

    // 既存行をクリア
    list.innerHTML = "";

    // LocalStorage → table に追加
    for (let i = 0; i < localStorage.length; i++) {

        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        // ラジオボタン
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.textContent = w_key;
        td3.textContent = localStorage.getItem(w_key);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        list.appendChild(tr);
    }
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");
}