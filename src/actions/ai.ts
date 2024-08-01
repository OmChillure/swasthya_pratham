"use server"
import fs from "node:fs/promises";
import {
  Document,
  GeminiEmbedding,
  VectorStoreIndex,
} from "llamaindex";
import { Groq, Settings } from "llamaindex";

Settings.llm = new Groq({
    apiKey:"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",
    model:"llama-3.1-70b-versatile"
  });
  Settings.embedModel =  new GeminiEmbedding()
  
export async function main() {
  const path = "src/demo.txt";
  const essay = await fs.readFile(path,"utf-8");
  const document = new Document({ text: essay, id_: path });
  const index = await VectorStoreIndex.fromDocuments([document]);
  console.log(index)

  const queryEngine = index.asQueryEngine();
 const res= await queryEngine.query({
    query:'Extract data in json format to create calender event for the medication. Consider frequency , timing of the dosage and generate json data accordingly. Output only json , nothing else. format of json : """{ "name": "Chloroquine Phosphate Tablets 250 mg","disease": "malaria", "doctor":"NAme", "dose": "2 tablets", "frequency": "once daily", "duration": "3 days", "timing": [ {"date": "2024-07-26", "time": "08:00"}, {"date": "2024-07-27", "time": "08:00"}, {"date": "2024-07-28", "time": "08:00"} ] }""" follow this strictly . If some data is missing from document replace its value with some message. for example if doctor name is not found :- "doctor" : "not found" . Return only pure json , nothing else',
  });
  return res.message.content.toString()
  }


