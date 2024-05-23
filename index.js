const express= require('express')
const PORT=8000

const app = express()

app.get("/" , (req, res)=>{
    res.send("Intial setup", 200)

})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})