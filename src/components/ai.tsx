"use client"
import { useEffect, useState } from 'react';
import { main } from '@/actions/ai';
interface Timing {
  date: string;
  time: string;
}

interface Medication {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  timing: Timing[];
  doctor:string;
  disease:string;
}
export const Ai = () => {
    const [data,setData] = useState<any[]>([])
  useEffect(()=>{
    main().then((res)=>setData(JSON.parse(res)))
  },[])
  return (
    <div className="p-auto flex text-white">
      {data.length? data.map((med :Medication, index)=>(
        <div key={index} className='p-4 m-2 bg-white/10'>
            <h3>Medication Name: {med.name} </h3>
            <h3>Doctor Name: {med.doctor} </h3>
            <h3>Disease Name: {med.disease} </h3>
  <p>Dosage: {med.dose}</p>
  <p>Frequency: {med.frequency}</p>
            {med.timing.map((time , index)=>(
              <div key={index}>
                {time.date + " " + time.time}
              </div>
            ))}
        </div>
      )) : <div className='bg-white/10 p-20'>Loading...</div>}
    </div>
  );
};
