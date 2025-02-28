import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '@/redux/user/userSlice';
import GoogleAuth from '@/components/shared/GoogleAuth';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }), // Fixed validation
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

function SignInForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Fixed header
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success === false) {
        toast({ title: 'sign In failed ! please try again' });
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data)),
          toast({ title: 'sign In successfull ! ' });
        navigate('/');
      }

      navigate('/');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
      dispatch(signInFailure(error.message));

      toast({ title: 'something went wrong' });
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link className="font-bold text-2xl sm:text-4xl flex flex-wrap">
            <span className="text-slate-500">Morning</span>
            <span className="text-slate-900">Dispatch</span>
          </Link>

          <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12">
            Sign in to your account
          </h2>

          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2">
            Welcome back, Please provide your details
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="xyz@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <Button
                type="submit"
                className="bg-blue-500 w-full"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'SignIn'}
              </Button>
              <GoogleAuth></GoogleAuth>
            </form>
          </Form>

          <div className="flex gap-2 text-sm mt-5">
            <span> Dont Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
