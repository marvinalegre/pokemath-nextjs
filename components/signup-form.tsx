"use client"

import { useState } from "react"

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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
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
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
