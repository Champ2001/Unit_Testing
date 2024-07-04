import express from "express"
import { z } from "zod"

const sumInput = z.object({
  a: z.number(),
  b: z.number()
})

export const app = express();
app.use(express.json())

app.post('/sum', (req, res) => {
  const parsedInput = sumInput.safeParse(req.body)
  if(!parsedInput.success){
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const answer = parsedInput.data.a + parsedInput.data?.b;
  res.json({
    answer
  })
})

app.get('/sum', (req, res)=> {
  const parsedData = sumInput.safeParse({
    a: Number(req.headers["a"]),
    b: Number(req.headers["b"])
  })

  if(!parsedData.success){
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const answer = parsedData.data.a + parsedData.data.b;
  res.json({
    answer
  })
})