const express=require("express");   
const app=express();              
const port=8080; 
const path=require("path");
const methodoverride=require("method-override");

app.use(express.urlencoded({extended:true})); 
app.use(methodoverride("_method"));

app.set("view engine","ejs");
app.set("views" ,path.join(__dirname,"views"));    


let datas=[{
    username:"krishnapatil",
    email:"krishnapatil@gmail.com",
    password:"krishna9552",
    dob:34,
    name:"KRISHNA PATIL",
    bio:"i am a good boy"
},]


app.use(express.static(path.join(__dirname,"public")));  

let password="krishna9552";

app.get("/login-signup",(req,res)=>{      
       res.render("ls.ejs",{datas,password});
}); 

app.get("/signup",(req,res)=>{
      res.render("signup.ejs");
} );

app.post("/login-signup",(req,res)=>{
     let{username,email,dob,password,name,bio}=req.body;
    datas.push({username,email,dob,password,name,bio}); 
    res.redirect("login-signup");

});     

app.get("/login" ,(req,res)=>{
    res.render("login.ejs");

});    




app.post("/login-signup/insta",(req,res)=>{
    
    let{username,email,password}=req.body;
    let data=datas.find((d)=>password===d.password&&username===d.username);
    if(data){
    res.render("index.ejs",{data}); 
    }
    else{
        res.render("error.ejs");
    }
    
 
}); 











// app.get("/insta",(req,res)=>{        
//     res.render("index.ejs");              
// }); 

app.listen(port,()=>{
    console.log(`listening port the ${port}`);

});