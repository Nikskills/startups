'use client'
import { cn } from "../lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormSuccess } from '@/components/auth/form-success'
import { FormError } from '@/components/auth/form-error'
import { registerSchema } from "@/lib/zod"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { register } from "../../actions/register"
import { useRouter } from "next/navigation"

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement>

export function RegisterForm({ className, ...props }: RegisterFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          email: "",
          username: "",
          name: "",
          password: "",
          passwordRepeat: "",
        }
      })

      const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setLoading(true)
        register(data).then((res) => {
            if (res.error) {
                setLoading(false)
                setSuccess("")
                setError(res.error)
            }
            if(res.succes) {
                setLoading(false)
                setError("")
                setSuccess(res.succes)
                setTimeout(() => { router.push('/')}, 2000 )
            }
            setLoading(false)
        })
      }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...form.register("email")}
                  id="email"
                  type="email"
                  placeholder="yourname@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input 
                {...form.register("username")}
                  id="username"
                  type="text"
                  placeholder="JohnSnow"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input 
                {...form.register("name")}
                  id="name"
                  type="text"
                  placeholder="John Snow"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input  {...form.register("password")} id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="passwordRepeat">Repeat Password</Label>
                </div>
                <Input {...form.register("passwordRepeat")} id="passwordRepeat" type="password" required />
              </div>
              <FormSuccess message={success}/>
              <FormError message={error}/>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

