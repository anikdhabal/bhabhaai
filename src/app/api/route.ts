import { NextResponse } from "next/server";
import qa from '../../../q&a.json';

export async function POST(req: Request){
   const data = req.json;
   return NextResponse.json(qa,{ status: 200 })
}