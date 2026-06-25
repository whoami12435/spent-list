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




// Firebase config ของคุณ

const firebaseConfig = {

apiKey:"YOUR_KEY",

authDomain:"YOUR_DOMAIN",

projectId:"YOUR_ID",

storageBucket:"YOUR_BUCKET",

messagingSenderId:"YOUR_ID",

appId:"YOUR_APP"

};





const app =
initializeApp(firebaseConfig);



const db =
getFirestore(app);





let data=[];





// โหลด + sync realtime

function loadData(){


onSnapshot(

collection(db,"money"),

(snapshot)=>{


data=[];



snapshot.forEach((item)=>{


data.push({

id:item.id,

...item.data()

});


});



showData();


}

);


}







// เพิ่มรายการ

async function addData(){



let item={


title:
document.getElementById("title").value,


amount:
Number(
document.getElementById("amount").value
),



type:
document.getElementById("type").value,



category:
document.getElementById("category").value,



note:
document.getElementById("note").value,



date:
new Date()
.toISOString()
.split("T")[0]


};





if(!item.title || !item.amount){

alert("กรอกข้อมูลก่อน");

return;

}





// แสดงทันที

data.push(item);

showData();





// บันทึก Firebase

await addDoc(

collection(db,"money"),

item

);





// เคลียร์ช่อง

document.getElementById("title").value="";

document.getElementById("amount").value="";

document.getElementById("category").value="";

document.getElementById("note").value="";



}









// แสดงตาราง

function showData(){



let table =
document.getElementById("table");



table.innerHTML="";



let totalIncome=0;

let totalExpense=0;



let monthIncome=0;

let monthExpense=0;



let now =
new Date()
.toISOString()
.substring(0,7);





let filter =
document.getElementById("filter").value;






data.forEach((x)=>{


let money =
Number(x.amount);





if(x.type=="income"){


totalIncome += money;



if(x.date.startsWith(now)){

monthIncome += money;

}


}



else{


totalExpense += money;



if(x.date.startsWith(now)){

monthExpense += money;

}


}






if(!filter || x.date==filter){



table.innerHTML += `


<tr>


<td>${x.date}</td>


<td>${x.title}</td>


<td>${x.category}</td>



<td class="${x.type}">


${x.type=="income"?"+":"-"}

${money.toFixed(2)}

</td>



<td>

${x.note || "-"}

</td>




<td>


<button onclick="deleteData('${x.id}')">

ลบ

</button>


</td>



</tr>


`;

}


});








document.getElementById("monthIncome")
.innerHTML =
monthIncome.toFixed(2)+" บาท";



document.getElementById("monthExpense")
.innerHTML =
monthExpense.toFixed(2)+" บาท";




document.getElementById("balance")
.innerHTML =
(totalIncome-totalExpense)
.toFixed(2)+" บาท";



}








// ลบ

async function deleteData(id){


if(confirm("ลบรายการนี้ไหม?")){


await deleteDoc(

doc(db,"money",id)

);


}


}






// ให้ HTML เรียกได้

window.addData = addData;

window.deleteData = deleteData;

window.showData = showData;





// เริ่มระบบ

loadData();
