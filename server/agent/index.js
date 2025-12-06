import express from 'express';
import cors from 'cors';
import { agent } from './agent.js';

const app  = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({origin:'*'}));

app.get('/',(req,res)=>{
    res.send('Hello Dawg!')
})

app.post('/generate',async (req,res)=>{
    const result = await agent.invoke({
        messages:[{
            role:"user",
            content:'Whats the weather in Tokyo'
        }]
    },{
        configurable:{thread_id:42}
    })
    res.json(result.messages.at(-1)?.content)
})

app.listen(PORT,()=>{
    console.log(`Server running and listening to requests at ${PORT}`);
})