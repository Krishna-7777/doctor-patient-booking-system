let checkbox=document.getElementById("isDoctor");

checkbox.addEventListener('change',()=>{
    if(checkbox.checked){
        document.getElementById("type-place").innerHTML=`<label for="specialties">Select Your Specialty:</label>
        <input list="specialties" id="specialty" name="specialty" required>
        <datalist id="specialties">
          <option value="Surgeon">
          <option value="General practitioner">
          <option value="Neurologist">
          <option value="Dermatologist">
          <option value="Pediatrician">
          <option value="Psychiatrist">
          <option value="Cardiologist">
          <option value="Radiologist">
          <option value="Oncologist">
          <option value="Anesthesiologist">
          <option value="Urologist">
          <option value="Orthopedic surgeon">
          <option value="Pathologist">
          <option value="Ophthalmologist">
          <option value="Endocrinologist">
          <option value="Rheumatologist">
          <option value="Gynecologist">
          <option value="Internal medicine">
          <option value="Ophthalmology">
          <option value="Gastroenterologist">
          <option value="Pulmonologist">
          <option value="Nephrologist">
          <option value="Podiatrist">
          <option value="Family medicine">
          <option value="Other">
        </datalist>`
    }else{
        document.getElementById("type-place").innerHTML=""
    }
})

document.querySelector("form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    let payload={}
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    payload={name,email,password}
    payload.type="user"
    if(checkbox.checked){
        payload.specialty=document.getElementById("specialty").value
    payload.type="doctor"
    }
    let res=await fetch("https://doctor-patient-booking-system.onrender.com/user/register",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(payload)
    })
    if(res.status!=403){
        res=await res.json()
        alert(res.msg)
        window.location="../pages/login.html"
    }

})