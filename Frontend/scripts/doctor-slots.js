;(async()=>{
let slots=await fetch("https://doctor-patient-booking-system.onrender.com/doctor/slot",{
        headers:{
            "Content-Type":"Application/json",
            "Authorization":localStorage.getItem("token")
        }
    })
    slots=await slots.json()
    console.log(slots)
    let myslots=document.getElementById("my-slots")
    if(slots.length==0){
        myslots.innerHTML=`<h3>No Slots Found. You can create your slots on create avaialbilty slots page.</h3>`
    }else{
        var tableHTML = `
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
            </tr>
        </thead>
        <tbody>
            ${slots.map(slot => `
                <tr>
                    <td>${(slot.date.split("T"))[0]}</td>
                    <td>${slot.start}</td>
                    <td>${slot.end}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
`;
myslots.innerHTML=tableHTML
    }
//     let bookedSlots=await fetch("https://doctor-patient-booking-system.onrender.com/doctor/bookedSlots",{
//         headers:{
//             "Content-Type":"Application/json",
//             "Authorization":localStorage.getItem("token")
//         }
//     })
//     bookedSlots=await bookedSlots.json()
//     console.log(bookedSlots)
})()

