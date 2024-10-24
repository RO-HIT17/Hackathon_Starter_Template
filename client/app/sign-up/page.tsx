'use client';
import Link from "next/link";
import { useState } from 'react'; // Import useState from React
import { Button, Input, Spacer, Select, SelectItem } from "@nextui-org/react"; // Importing Button, Input, Spacer, Select, and SelectItem from Next UI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; // Importing Card components from Next UI
import { FaGoogle } from "react-icons/fa"; // Importing Google icon from react-icons
import { title } from "@/components/primitives";

export const description =
  "A sign-up form with first name, last name, email, password, and confirm password. There's an option to sign up with Google and GitHub.";

export default function SignUpForm() {
  const [error, setError] = useState(''); // State for error messages
  const [role, setRole] = useState('user'); // State for role

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Clear error message if successful
    // Proceed with sign-up logic (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-104 bg-black bg-opacity-0 p-4 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>Web App</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-2" onSubmit={handleSignUp}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="first-name"
                type="text"
                label="First Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
              />
              <Input
                id="last-name"
                type="text"
                label="Last Name"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="username"
                type="text"
                label="Username"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
              />
              <Select
                id="role"
                label="Role"
                variant="bordered"
                fullWidth
                required
                className="bg-transparent"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <SelectItem key="user" value="user">User</SelectItem>
                <SelectItem key="admin" value="admin">Admin</SelectItem>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
              />
              <Input
                id="phone-number"
                type="tel"
                label="Phone Number"
                variant="bordered"
                fullWidth
                clearable
                required
                className="bg-transparent"
              />
            </div>
            <Input
              id="password"
              type="password"
              label="Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
            />
            <Input
              id="confirm-password"
              type="password"
              label="Confirm Password"
              variant="bordered"
              fullWidth
              clearable
              required
              className="bg-transparent"
            />
            <Button 
              type="submit" 
              className="mt-2 border border-white-500" 
              color="gradient" 
              auto
            >
              Sign Up
            </Button>
            <div className="flex items-center my-2">
              <hr className="flex-grow border-t border-gray-500" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-500" />
            </div>
            <Button
              type="button"
              className="mt-2 border border-white-500 flex items-center justify-center"
              color="gradient"
              auto
            >
              <FaGoogle className="mr-2" />
              Sign Up with Google
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}