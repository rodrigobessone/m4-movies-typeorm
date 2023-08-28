import { AppDataSource } from "./data-source";
import app from "./app";

const PORT = 3000

AppDataSource.initialize()
.then( () =>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch( () => {
    console.log("Failed to connecting to the database")
})
