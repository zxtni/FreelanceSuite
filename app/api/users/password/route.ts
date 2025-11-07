import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, currentPassword, newPassword } = body

    const filePath = path.join(process.cwd(), 'data', 'users.json')
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileData)

    const userIndex = data.users.findIndex((u: any) => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify current password
    if (data.users[userIndex].password !== currentPassword) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    // Update password
    data.users[userIndex].password = newPassword

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
  }
}
