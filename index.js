const express= require('express')
const PORT=8000
const db = require('./db');

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

app.get('/check-connection', async (req, res) => {
  try {
      const isConnected = await db.testConnection();
      res.json({ connected: isConnected });
  } catch (error) {
      console.error('Error checking database connection:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/create-table', async (req, res) => {
  try {
      await db.createUsersTable();
      res.json({ message: 'Table "users" created successfully' });
  } catch (error) {
      console.error('Error creating table:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/test-table' , async (req,res)=>{
  try{
      // const { username, email } = req.body;
      const username = "user2";
      const email ="email2";
      // const result = await db.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
      const result = await db.query('SELECT * FROM users');
      res.json(result);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT} 111`)
})