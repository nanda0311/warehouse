// Fix the function declaration and structure
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertCircle, AlertDescription } from "@/components/ui/alert"
import { redirect } from "next/navigation"

export default function LoginPage() {
  // This would connect to your Django backend in production
  async function login(formData) {
    "use server"
    // Mock authentication - in real app, this would validate against Django backend
    const email = formData.get("email")
    const password = formData.get("password")

    // Dummy credentials check
    if (email === "admin@example.com" && password === "admin123") {
      redirect("/dashboard")
    }

    // For demo purposes, any email/password will work
    if (email && password) {
      redirect("/dashboard")
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Warehouse Management System</CardTitle>
          <CardDescription>Sign in to access the warehouse management dashboard</CardDescription>
        </CardHeader>
        <form action={login}>
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              {/* <AlertCircle className="h-4 w-4" /> */}
              <AlertDescription>
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@example.com
                <br />
                Password: admin123
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="admin123" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

