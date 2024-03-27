import { NextResponse } from "next/server";
import qa from '../../../../q&a.json';

export async function GET(){
   return NextResponse.json(qa,{ status: 200 })
}