'use client';
import Link from "next/link";
import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { Button, Input, Spacer } from "@nextui-org/react"; // Importing Button, Input, and Spacer from Next UI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; // Importing Card components from Next UI
import { title } from "@/components/primitives";

export const description =
  "A forgot password form with email input and send OTP option.";

export default function ForgotPasswordForm() {
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false); // State to track if OTP is verified
  const [timer, setTimer] = useState(90); // State for timer (1:30 minutes)
  const [email, setEmail] = useState(''); // State for email input
  const [otp, setOtp] = useState(''); // State for OTP input
  const [newPassword, setNewPassword] = useState(''); // State for new password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOTP = (e) => {
    e.preventDefault();
    // Perform send OTP logic here

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(''); // Clear error message if email is valid
    setSuccess('OTP has been sent to your email'); // Set success message
    setOtpSent(true); // Set OTP sent state to true
    setEmail(''); // Clear email input field
    // Proceed with send OTP logic (e.g., API call)
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Perform OTP verification logic here

    // Dummy OTP validation logic
    if (otp !== '123456') {
      setError('Invalid OTP');
      return;
    }

    setError(''); // Clear error message if OTP is valid
    setSuccess('OTP verified successfully'); // Set success message
    setOtp(''); // Clear OTP input field
    setOtpVerified(true); // Set OTP verified state to true
    // Proceed with OTP verification logic (e.g., API call)
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Perform password reset logic here

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Clear error message if passwords match
    setSuccess('Password has been reset successfully'); // Set success message
    setNewPassword(''); // Clear new password input field
    setConfirmPassword(''); // Clear confirm password input field
    // Redirect to login page after successful password reset
    router.push('/login');
    // Proceed with password reset logic (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto w-96 bg-black bg-opacity-0 p-4 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>
            {otpVerified ? 'Reset Password' : otpSent ? 'Enter OTP' : 'Forgot Password'}
          </h2>
        </CardHeader>
        <CardBody>
          {!otpSent ? (
            <form className="grid gap-2" onSubmit={handleSendOTP}>
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
              {success && <p className="text-green-500 text-sm">{success}</p>} {/* Display success message */}
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <Button 
                type="submit" 
                className="mt-2 border border-white-500" 
                color="gradient" 
                auto
              >
                Send OTP
              </Button>
            </form>
          ) : !otpVerified ? (
            <form className="grid gap-2" onSubmit={handleVerifyOTP}>
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
              {success && <p className="text-green-500 text-sm">{success}</p>} {/* Display success message */}
              <Input
                id="otp"
                type="text"
                label="OTP"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)} // Update OTP state
              />
              <p className="text-gray-400 text-sm">Time remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
              <Button 
                type="submit" 
                className="mt-2 border border-white-500" 
                color="gradient" 
                auto
              >
                Verify OTP
              </Button>
            </form>
          ) : (
            <form className="grid gap-2" onSubmit={handleResetPassword}>
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
              {success && <p className="text-green-500 text-sm">{success}</p>} {/* Display success message */}
              <Input
                id="new-password"
                type="password"
                label="New Password"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update new password state
              />
              <Input
                id="confirm-password"
                type="password"
                label="Confirm Password"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
              />
              <Button 
                type="submit" 
                className="mt-2 border border-white-500" 
                color="gradient" 
                auto
              >
                Reset Password
              </Button>
            </form>
          )}
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Remember your password?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}