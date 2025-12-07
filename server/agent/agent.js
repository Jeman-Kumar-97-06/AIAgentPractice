// const {createReactAgent} = require('@langchain/langgraph/prebuilt');
// const {ChatCerebras}     = require('@langchain/cerebras')

import {createReactAgent} from '@langchain/langgraph/prebuilt';
import {ChatCerebras} from '@langchain/cerebras';
import {tool} from '@langchain/core/tools';
import {z} from 'zod';
import { MemorySaver } from '@langchain/langgraph';



const weatherTool = tool(async ({query}) => {
    console.log(query)
    return {output:"The Weather is Tokyo is sunny"};
},{
    name:"weather",
    description:'Get the weather in a given location',
    schema: z.object({
        query:z.string().describe("The Location to use in search")
    })
})

const jsExecutor = tool(
    async ({code}) => {
        const result = await evalAndCaptureOutput(code);
        return {output:result}
    },
    {
        name:'run_javascript_code_tool',
        description:`
            Run general purpose javascript code.
            This can be used to access Internet or do any computation that you need.
            The output will be composed of the stdout and stderr.
            The code should be written in a way that is executed with javascript eval in node
        `,
        schema:z.object({
            code:z.string().describe("The code to run")
        })
    }
)

const model = new ChatCerebras({
    model:'llama-3.3-70b',
    temperature:0,
})

const checkpointSaver = new MemorySaver();

export const agent = createReactAgent({
    llm  : model,
    tools: [weatherTool, jsExecutor],
    checkpointSaver
});

// const result = await agent.invoke({
//     messages:[{
//         role:'user',
//         content:'What\'s the weather in Tokyo?'
//     }],
// },{
//     configurable:{thread_id: 42}
// })

// The dumbass bitch ai won't say 'Tokyo' when you see the 'result2'. It actually forgot the context.
// const result2 = await agent.invoke({
//     message:[
//         {
//             role:'user',
//             content:'What city is that for?'
//         }
//     ]
// })

// const result2 = await agent.invoke({
//     messages:[
//         {
//             role:'user',
//             content:'What city did i ask you in the previous question?'
//         }
//     ]
// },{
//     configurable:{thread_id:42}
// })



// console.log(result.messages.at(-1)?.content)
// console.log(result2.messages.at(-1)?.content)