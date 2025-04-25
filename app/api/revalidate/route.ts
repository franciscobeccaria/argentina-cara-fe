import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { secret } = body

    console.log('[Revalidate] Body received:', body)

    if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      console.warn('[Revalidate] Unauthorized attempt with secret:', secret)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    console.log('[Revalidate] Valid secret. Revalidating path: /')

    revalidatePath('/')

    console.log('[Revalidate] Successfully revalidated path /')

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    console.error('[Revalidate] Error occurred:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
