import express from 'express';
import cors from 'cors';

async function evalAndCaptureOutput(code){
    const oldLog = console.log;
    const oldErr = console.error;

    const output   = [];
    const errOutput= [];
    
    console.log   = (...args) => output.push(args.join(' '));
    console.error = (...args) => errOutput.push(args.join(' '));

    try{
        await eval(code);
    } catch (error){
        errOutput.push(error.message);
    }

    console.log   = oldLog;
    console.error = oldErr;
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({origin:"*"}));

app.post('/',async (req,res)=>{
    const {code} = req.body;
    //Run the code:
    const result = await evalAndCaptureOutput(code);
    res.json(result);
});

app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`);
});