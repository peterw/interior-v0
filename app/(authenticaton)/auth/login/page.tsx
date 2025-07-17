'use client'

import Link from "next/link"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/contexts/auth-context'
import { authRoutes } from "@/config/routes"
import { GoogleButtonWithDivider } from "@/components/auth/google-button"
import { useToast } from "@/components/hooks/use-toast"
import type { AxiosError } from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useAnalytics } from '@/hooks/use-analytics'
import { cf } from "@/lib/cf"
import { useSearchParams } from 'next/navigation'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

interface ErrorResponse {
  detail?: string
  non_field_errors?: string[]
  email?: string[]
  password?: string[]
}

export default function LoginPage() {
  const { login } = useAuth()
  const { toast } = useToast()
  const analytics = useAnalytics()
  const searchParams = useSearchParams()
  
  // Track page view on mount
  useEffect(() => {
    analytics.events.loginPageViewed({
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
      referrer: document.referrer,
    });
  }, [analytics, searchParams]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      // Track login attempt
      analytics.events.loginAttempted('email', {
        utm_source: searchParams.get('utm_source') || undefined,
        utm_medium: searchParams.get('utm_medium') || undefined,
        utm_campaign: searchParams.get('utm_campaign') || undefined,
      });
      
      try {
        await login({ email: values.email, password: values.password })
        
        // Track successful login
        analytics.events.loginCompleted('email', {
          utm_source: searchParams.get('utm_source') || undefined,
          utm_medium: searchParams.get('utm_medium') || undefined,
          utm_campaign: searchParams.get('utm_campaign') || undefined,
        });
        
        // No need to handle navigation here as it's handled in the context
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>

        // Clear password field on authentication failure
        if (error.response?.status === 401) {
          resetForm({
            values: {
              email: values.email,
              password: ''
            }
          })
        }

        // Determine error type for tracking
        let errorType = 'unknown_error';
        let errorMessage = 'An unexpected error occurred';

        if (error?.isAxiosError) {
          const data = error.response?.data

          if (data?.non_field_errors?.length) {
            errorType = 'validation_error';
            errorMessage = data.non_field_errors[0];
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: data.non_field_errors[0],
            })
          } else if (data?.detail) {
            errorType = 'api_error';
            errorMessage = data.detail;
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: data.detail,
            })
          } else if (data?.email?.length) {
            errorType = 'email_error';
            errorMessage = data.email[0];
            setFieldError('email', data.email[0])
          } else if (data?.password?.length) {
            errorType = 'password_error';
            errorMessage = data.password[0];
            setFieldError('password', data.password[0])
          } else if (error.response?.status === 401) {
            errorType = 'invalid_credentials';
            errorMessage = 'Invalid email or password';
            toast({
              variant: "destructive",
              title: "Authentication Failed",
              description: "Invalid email or password. Please try again.",
            })
            setFieldError('password', 'Incorrect password')
          } else if (error.response?.status === 429) {
            errorType = 'rate_limit';
            errorMessage = 'Too many attempts';
            toast({
              variant: "destructive",
              title: "Too Many Attempts",
              description: "Too many login attempts. Please try again later.",
            })
          } else if (!error.response || error.response.status >= 500) {
            errorType = 'server_error';
            errorMessage = 'Server error';
            toast({
              variant: "destructive",
              title: "There was an server issue.",
              description: "Take a picture of the error message and send it to support (bottom left). ",
            })
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "An unexpected error occurred. Please try again.",
            })
          }
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
          })
        }
        
        // Track login failure
        analytics.events.loginFailed('email', errorType, {
          error_message: errorMessage,
          status_code: error?.response?.status,
        });
        
        console.error('Login failed:', error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="flex min-h-screen w-screen">
      <div className="flex w-full flex-col lg:flex-row">
        {/* Left column - login form */}
        <div className="flex flex-1 flex-col justify-center lg:w-3/5">
          <div className="mx-auto w-full max-w-[520px] space-y-6 px-8 py-8">
            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="relative h-2 flex-1 rounded-full bg-gray-200">
                <div className="h-full w-full rounded-full bg-blue-600"></div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-green-500">Log in</span> to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back!
              </p>
            </div>

            <div className="grid gap-4">
              <GoogleButtonWithDivider />

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    placeholder="Email address"
                    type="email"
                    className="mt-1 h-12"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={formik.isSubmitting}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    className="mt-1 h-12"
                    autoComplete="current-password"
                    disabled={formik.isSubmitting}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
                  ) : null}
                  <div className="mt-1 text-right">
                    <a 
                      href="https://api.localrank.so/accounts/password/reset/" 
                      className="text-sm text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full bg-blue-600 text-base hover:bg-blue-700"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href={authRoutes.signup.path} className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right column - testimonial */}
        <div className="hidden lg:flex lg:h-screen lg:w-2/5 lg:flex-col lg:justify-center lg:bg-gray-900 lg:p-12">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20 border-2 border-gray-600">
              <AvatarImage src={cf("/images/jacky.jpg")} alt="Jacky Chou" />
              <AvatarFallback className="bg-gray-800 text-white text-xl font-semibold">JC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold text-white">Jacky Chou</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Local SEO Expert • Founder of LocalRank
              </p>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-white">5.0</span>
              </div>
              <blockquote className="text-lg leading-relaxed text-gray-100">
                "LocalRank has helped over <span className="font-semibold text-green-400">500+ businesses</span> improve their local search rankings. Our proven system makes local SEO simple and effective for any business size."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
