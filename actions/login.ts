
import { signIn } from "next-auth/react"
import { AuthError } from "next-auth"

export async function loginAction(formData: FormData){
  try {
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email, password)
    if (!email || !password) {
      throw new Error('Missing credentials')
    }

    await signIn('credentials', {
      email: email.toString(),
      password: password.toString(),
      redirect: true,
      callbackUrl: '/'
    })
    return {success: "User created successfully"}
  } catch (error) {
    if (error instanceof AuthError) {
      return {error: 'Invalid credentials'}
    }
    return {error: "An error occurred"}
  }
}