;(async()=>{
    let res=await fetch("https://doctor-patient-booking-system.onrender.com/user/bookedSlots",{
        headers:{
            "Content-Type":"Application/json",
            "Authorization":localStorage.getItem("token")
        }
    })
    res=await res.json()
    if(res.length){
    let table = ``;

for (let i = 0; i < res.length; i++) {
    const row = res[i];
    table += `
      <tr>
        <td>${(row.date.split("T"))[0]}</td>
        <td>${row.start}</td>
        <td>${row.end}</td>
        <td>${row.doctor.name}</td>
        <td>${row.doctor.speciality}</td>
      </tr>
    `;
}
document.querySelector("tbody").innerHTML=table
}})()