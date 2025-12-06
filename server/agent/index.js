import express from 'express';
import cors from 'cors';

const app  = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({origin:'*'}));

app.get('/',(req,res)=>{

})

app.listen(PORT,()=>{
    console.log(`Server running and listening to requests at ${PORT}`);
})