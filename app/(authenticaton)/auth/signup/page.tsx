'use client'

import Link from "next/link"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/contexts/auth-context'
import { authRoutes } from "@/config/routes"
import { GoogleButtonWithDivider } from "@/components/auth/google-button"
import { useToast } from "@/components/hooks/use-toast"
import type { AxiosError } from "axios"
import { useSearchParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useAnalytics } from '@/hooks/use-analytics'
import { cf } from "@/lib/cf"

const SignupSchema = Yup.object().shape({
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

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

declare global {
  interface Window {
    tolt?: {
      signup: (identifier: string) => Promise<any>;
    };
    tolt_data?: {
      customer_id?: string;
    };
    tolt_referral?: string;
  }
}

export default function SignupPage() {
  const { register } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const analytics = useAnalytics()
  const [signupStartTracked, setSignupStartTracked] = useState(false)
  
  // Track page view on mount
  useEffect(() => {
    analytics.events.signupPageViewed({
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
      utm_term: searchParams.get('utm_term') || undefined,
      utm_content: searchParams.get('utm_content') || undefined,
      referrer: document.referrer,
    });
  }, [analytics, searchParams]);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
      utm_term: searchParams.get('utm_term') || undefined,
      utm_content: searchParams.get('utm_content') || undefined,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      // Track signup attempt
      analytics.events.signupAttempted('email', {
        utm_source: values.utm_source,
        utm_medium: values.utm_medium,
        utm_campaign: values.utm_campaign,
      });
      
      try {
        await register(values)
        
        // Track successful signup
        analytics.events.signupCompleted('email', {
          utm_source: values.utm_source,
          utm_medium: values.utm_medium,
          utm_campaign: values.utm_campaign,
          utm_term: values.utm_term,
          utm_content: values.utm_content,
        });
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>
        
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
              title: "Registration Error",
              description: data.non_field_errors[0],
            })
          } else if (data?.detail) {
            errorType = 'api_error';
            errorMessage = data.detail;
            toast({
              variant: "destructive",
              title: "Registration Error",
              description: data.detail,
            })
          } else if (data?.email?.length) {
            errorType = 'email_error';
            errorMessage = data.email[0];
            setFieldError('email', data.email[0])
            toast({
              variant: "destructive",
              title: "Email Error",
              description: data.email[0],
            })
          } else if (data?.password?.length) {
            errorType = 'password_error';
            errorMessage = data.password[0];
            setFieldError('password', data.password[0])
            toast({
              variant: "destructive",
              title: "Password Error",
              description: data.password[0],
            })
          } else if (error.response?.status === 400) {
            errorType = 'invalid_data';
            errorMessage = 'Invalid registration data';
            toast({
              variant: "destructive",
              title: "Invalid Data",
              description: "Invalid registration data. Please check your input.",
            })
          } else if (error.response?.status === 429) {
            errorType = 'rate_limit';
            errorMessage = 'Too many attempts';
            toast({
              variant: "destructive",
              title: "Too Many Attempts",
              description: "Too many registration attempts. Please try again later.",
            })
          } else if (!error.response || error.response.status >= 500) {
            errorType = 'server_error';
            errorMessage = 'Server error';
            toast({
              variant: "destructive",
              title: "Server Error",
              description: "Unable to connect to the server. Please try again later.",
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
        
        // Track signup failure
        analytics.events.signupFailed('email', errorType, {
          error_message: errorMessage,
          status_code: error?.response?.status,
        });
        
        console.error('Registration failed:', error)
      } finally {
        setSubmitting(false)
      }
    },
  })
  
  useEffect(() => {
    try {
      const signUpVisitor = async (identifier: string) => {
        if (!window.tolt_data) {
          console.log("Not an affiliate click");
          return;
        }
        
        if (window.tolt_data.customer_id) {
          console.log("Visitor already signed up");
          return;
        }
        
        try {
          if (window.tolt && window.tolt.signup) {
            const result = await window.tolt.signup(identifier);
            console.log("Signup successful:", result);
            return result;
          } else {
            console.log("Tolt signup function not available");
          }
        } catch (error) {
          console.error("Signup failed:", error);
        }
      };
      
      if (formik.values.email) {
        signUpVisitor(formik.values.email);
      }
    } catch (error) {
      console.error("Error in Tolt signup tracking:", error);
    }
  }, [formik.values.email]);

  return (
    <div className="flex min-h-screen w-screen">
      <div className="flex w-full flex-col lg:flex-row">
        {/* Left column - existing signup form */}
        <div className="flex flex-1 flex-col justify-center lg:w-3/5">
          <div className="mx-auto w-full max-w-[520px] space-y-6 px-8 py-8">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="relative h-2 flex-1 rounded-full bg-gray-200">
              <div className="h-full w-1/2 rounded-full bg-blue-600"></div>
            </div>
            {/* <span className="text-xs font-medium">Step 1 of 2</span> */}
          </div>

          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Sign up - Try LocalRank for <span className="text-green-500">free</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Cancel anytime
            </p>
            <p className="text-sm font-bold text-muted-foreground">
              Special offer expires on <span className="font-bold text-green-500">{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
            </p>
          </div>

          <div className="grid gap-4">
            <GoogleButtonWithDivider />

            <form onSubmit={formik.handleSubmit} className="space-y-4" data-rewardful="true">
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
                  autoFocus
                  {...formik.getFieldProps('email')}
                  onChange={(e) => {
                    formik.handleChange(e);
                    // Track signup started when user actually types
                    if (!signupStartTracked && e.target.value.length > 0) {
                      setSignupStartTracked(true);
                      analytics.events.signupStarted({
                        field: 'email',
                        utm_source: formik.values.utm_source,
                        utm_medium: formik.values.utm_medium,
                        utm_campaign: formik.values.utm_campaign,
                      });
                    }
                  }}
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
                  autoComplete="new-password"
                  {...formik.getFieldProps('password')}
                  onChange={(e) => {
                    formik.handleChange(e);
                    // Track signup started when user actually types (if not already tracked)
                    if (!signupStartTracked && e.target.value.length > 0) {
                      setSignupStartTracked(true);
                      analytics.events.signupStarted({
                        field: 'password',
                        utm_source: formik.values.utm_source,
                        utm_medium: formik.values.utm_medium,
                        utm_campaign: formik.values.utm_campaign,
                      });
                    }
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
              <Button
                type="submit"
                className="h-12 w-full bg-blue-600 text-base hover:bg-blue-700"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Creating account...' : 'Create Free Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href={authRoutes.login.path} className="text-blue-600 hover:underline">
                Log in
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
