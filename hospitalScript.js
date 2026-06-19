const express=require("express");
const fs=require("fs");
const path=require("path");

const app=express();
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("hospital");
});
// for counting the no. of patients
let count=0;
app.post("/registerPatient", (req, res)=>{
    count++;
    const patientData = `Patient ${count} details : \n Patient Name : ${req.body.name} \nAdmission Date : ${req.body.date} \nIllness / Diagnosis : ${req.body.illness} \n\n`;
    fs.appendFileSync("hospital_registry.txt",patientData);
    res.render("success", {
    count: count
    });
});
app.get("/patientDetails", (req, res)=>{
        if(fs.existsSync("hospital_registry.txt")){
            const patient=fs.readFileSync("hospital_registry.txt", "utf-8");
            // res.send(`<h2>Registered Patients :</h2><pre>${patient}</pre>`);
            res.render("patientDetails", {
            patient: patient
            });
        } else {
            res.send("<h2>No patient has been registered yet!!</h2>");
        }
});
// app.listen(3000, ()=>{
//     console.log("Server is listening on port 3000");
// });
const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
