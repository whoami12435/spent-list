import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ==============================
// Firebase Config
// ==============================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "list-money.firebaseapp.com",
    projectId: "list-money",
    storageBucket: "list-money.firebasestorage.app",
    messagingSenderId: "722706752955",
    appId: "1:722706752955:web:c0fe99f809a4dbc98b909e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let data = [];
let notes = [];

// ==============================
// โหลดข้อมูลแบบ Realtime
// ==============================

function loadData() {

    onSnapshot(
        collection(db, "money"),

        (snapshot) => {

            data = [];

            snapshot.forEach((item) => {

                data.push({
                    id: item.id,
                    ...item.data()
                });

            });

            showData();

        },

        (error) => {

            console.error(error);
            alert(error.message);

        }

    );

}



// ==============================
// เพิ่มรายการ
// ==============================

async function addData() {

    const type = document.getElementById("type").value;

    let item = {

        title: document.getElementById("title").value.trim(),

        amount: type === "note"
            ? 0
            : Number(document.getElementById("amount").value),

        type: type,

        category: document.getElementById("category").value.trim(),

        note: document.getElementById("note").value.trim(),

        date: new Date().toISOString().split("T")[0]

    };

    if (item.title == "") {

        alert("กรุณากรอกรายการ");
        return;

    }

    if (
        type !== "note" &&
        (isNaN(item.amount) || item.amount <= 0)
    ) {

        alert("กรุณากรอกจำนวนเงิน");
        return;

    }

    try {

        await addDoc(collection(db, "money"), item);

        document.getElementById("title").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("category").value = "";
        document.getElementById("note").value = "";

    }
    catch(error){

        console.error(error);
        alert(error.message);

    }

}
function loadNotes() {

    onSnapshot(
        collection(db, "notes"),

        (snapshot) => {

            notes = [];

            snapshot.forEach((item) => {

                notes.push({
                    id: item.id,
                    ...item.data()
                });

            });

            showNotes();

        }

    );

}
async function addNote() {

    const title =
        document.getElementById("noteTitle").value.trim();

    const content =
        document.getElementById("noteContent").value.trim();

    const date =
        document.getElementById("noteDate").value ||
        new Date().toISOString().split("T")[0];

    if (title === "") {

        alert("กรุณากรอกหัวข้อ");
        return;

    }

    await addDoc(
        collection(db, "notes"),
        {
            title,
            content,
            date
        }
    );

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
}
function showNotes() {

    const table =
        document.getElementById("noteTable");

    table.innerHTML = "";

    notes.forEach((x) => {

        table.innerHTML += `

<tr>

<td>${x.date}</td>

<td>${x.title}</td>

<td>${x.content}</td>

<td>

<button onclick="deleteNote('${x.id}')">

ลบ

</button>

</td>

</tr>

`;

    });

}
async function deleteNote(id) {

    if (!confirm("ลบ Note ?"))
        return;

    await deleteDoc(
        doc(db, "notes", id)
    );

}
// ==============================
// แสดงข้อมูล
// ==============================

function showData() {

    const table =
        document.getElementById("table");

    table.innerHTML = "";

    let monthIncome = 0;
    let monthExpense = 0;

    let totalIncome = 0;
    let totalExpense = 0;

    const now =
        new Date().toISOString().substring(0, 7);

    const filter =
        document.getElementById("filter").value;



    data.forEach((x) => {

        const money = Number(x.amount);

        if (x.type == "income") {

            totalIncome += money;

            if (x.date.startsWith(now))
                monthIncome += money;

        }

        else {

            totalExpense += money;

            if (x.date.startsWith(now))
                monthExpense += money;

        }



        if (!filter || x.date == filter) {

            table.innerHTML += `

<tr>

<td>${x.date}</td>

<td>${x.title}</td>

<td>${x.category}</td>

<td class="${x.type}">
${
    x.type === "income"
        ? "+" + money.toFixed(2)
        : x.type === "expense"
        ? "-" + money.toFixed(2)
        : "📝 Note"
}
</td>
<td>${x.note || "-"}</td>

<td>

<button onclick="deleteData('${x.id}')">

ลบ

</button>

</td>

</tr>

`;

        }

    });



    document.getElementById("monthIncome").innerHTML =
        monthIncome.toFixed(2) + " บาท";

    document.getElementById("monthExpense").innerHTML =
        monthExpense.toFixed(2) + " บาท";

    document.getElementById("balance").innerHTML =
        (totalIncome - totalExpense).toFixed(2) + " บาท";

}



// ==============================
// ลบข้อมูล
// ==============================

async function deleteData(id) {

    if (!confirm("ลบรายการนี้ไหม?"))
        return;

    try {

        await deleteDoc(
            doc(db, "money", id)
        );

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

window.changeType = function () {

    const type = document.getElementById("type").value;

    const amount = document.getElementById("amount");
    const category = document.getElementById("category");

    if (type === "note") {

        amount.disabled = true;
        amount.value = "";
        amount.placeholder = "ไม่ต้องกรอก";

        category.placeholder = "หัวข้อ (ไม่บังคับ)";

    } else {

        amount.disabled = false;
        amount.placeholder = "จำนวนเงิน";
        category.placeholder = "หมวด เช่น อาหาร";

    }

}

// ==============================
// Export ให้ HTML เรียกได้
// ==============================

window.addData = addData;
window.deleteData = deleteData;
window.showData = showData;
window.addNote = addNote;
window.deleteNote = deleteNote;



// ==============================
// เริ่มระบบ
// ==============================
changeType();
loadData();
loadNotes();

document.getElementById("noteDate").value =
    new Date().toISOString().split("T")[0];
