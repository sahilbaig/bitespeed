const express= require('express')
const PORT=8000

const app = express()

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.get("/" , (req, res)=>{
    console.log(req.body)
    //req format = {email?: sting , phoneNumber?: number }

    // Sample Output
    const mockdata={
		"contact":{
			"primaryContatctId": 1,
			"emails": ["sa","sb"], // first element being email of primary contact 
			"phoneNumbers": [1,2,3], // first element being phoneNumber of primary contact
			"secondaryContactIds": [2,3] // Array of all Contact IDs that are "secondary" to the primary contact
		}
	}
  
    res.json(mockdata);

})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})