"use client"

import { useActionState, useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"

import { login } from "@/app/login/actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameEdited, setUsernameEdited] = useState(false)
  const [passwordEdited, setPasswordEdited] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, pending] = useActionState(login, {})

  useEffect(() => {
    setUsernameEdited(false)
    setPasswordEdited(false)
  }, [state])

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent>
        {!usernameEdited && !passwordEdited && state.message && (
          <p role="alert" className="text-center text-sm text-destructive">
            {state.message}
          </p>
        )}

        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                disabled={pending}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setUsernameEdited(true)
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                disabled={pending}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordEdited(true)
                }}
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={setShowPassword}
                />
                <Label htmlFor="show-password">Show password</Label>
              </div>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={pending} aria-busy={pending}>
                  {pending && <LoaderCircle className="size-4 animate-spin" />}
                  Log in
                </Button>

                <FieldDescription className="px-6 text-center">
                  Don't have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
