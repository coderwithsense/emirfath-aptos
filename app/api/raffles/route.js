import { NextResponse } from "next/server"

// add authentication middleware here
export async function middleware(req) {
    if (!req.headers.authorization) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
}
export async function GET(request) {
    return NextResponse.json({ message: 'Hello World' })
}