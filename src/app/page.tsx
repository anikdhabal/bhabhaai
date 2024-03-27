'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

type Inputs = {
  example: string,
}

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api', {
        data: data.example
      });
      router.push('/display');
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="text-center">
        <div className="flex flex-col items-center">
          <textarea
            {...register('example')}
            rows={8}
            cols={50}
            placeholder="Enter your text here..."
            className="focus:outline-none bg-zinc-800 border rounded p-2"
          />
          <button type="submit" className="bg-zinc-800 p-2 rounded-md mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
}
