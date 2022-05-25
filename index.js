const express = require("express")
const app  = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const publish_key = "pk_test_51L3BHhKhJ4t0LdH9B6DWtCsBLE386SKoOZ1quN3ST3aH23lDwRdMsxs6Y5UNkSfv6Y60RMdlaP9PsVJSeLZeuCrB00LVVyGun1"
const secret_key = "sk_test_51L3BHhKhJ4t0LdH9MZiSiEGD6uMesX7RlxhBkcUdraWd5DOMCPtFW1lKd2bsivFmDcKzSKWOdaLaKUrgJRBn1oAv00KQao8vF4"
const stripe = require("stripe")(secret_key);
app.get("/",(req,res)=>{
    res.render("home", {
        key:publish_key
    })
})


app.post("/payment", (req,res)=>{
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Kamalov Farrukh",
        address: {
            line1: "ayrikoylak 11uy",
            postalcode: "111102",
            city: "Tashkent",
            state: "Keles",
            country: "Uzbekistan"
        }
    }).then((customer)=>{
        return stripe.charges.create({
            amount: 7000,
            description: "Web3 Course",
            currency:  "USD",
            customer: customer.id
        })
    }).then((charge)=>{
        console.log(charge)
        res.send("success")
    }).catch(err=>{
        console.log(err)
    })
})

app.listen(process.env.PORT || 4000,() =>{
    console.log('stripe')
})