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
            Swal.fire({
                title: "Memo app"
                , html: "Key, Memoはいずれも必須です。"
                , type: "error"
                , allowOutsideClick: false
            });
            return;
        } else {
            let w_msg = " LocalStorageに\n 「" + key + " " + value + "」\nを保存 ( save )しますか？";
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }

    );
};
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");
            if (w_cnt >= 1) {
                // let w_confirm = window.confirm("LocalStorage から選択されている"+ w_cnt + "件を削除しますか？");
                let w_msg = "LocalStorage から選択されている" + w_cnt + "件を削除しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }

                        viewStorage();
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。";
                        // window.alert(w_msg);
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });


            }
        }, false
    );
};
function allClearStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータを全て削除(all clear)します。\nよろしいですか？";
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのデータを全て削除しました。";
                    // window.alert(w_msg);
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
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
        selectCheckBox("select");
    }, false);
}


/* -------------------------------------------------------
   ラジオボタン選択処理
------------------------------------------------------- */
function selectCheckBox(mode) {
    // let w_sel = "0";
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
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            // window.alert("1つ選択(select)してください。");
            Swal.fire({
                title: "Memo app"
                , html: "1つ選択(select)してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            // window.alert("1つ以上選択(select)してください。");
            Swal.fire({
                title: "Memo app"
                , html: "1つ以上選択(select)してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
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