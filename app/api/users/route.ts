import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, email, phone } = body

    const filePath = path.join(process.cwd(), 'data', 'users.json')
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileData)

    const userIndex = data.users.findIndex((u: any) => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user details
    data.users[userIndex] = {
      ...data.users[userIndex],
      email,
      phone
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, user: data.users[userIndex] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
