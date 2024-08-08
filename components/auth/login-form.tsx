'use client'

import { z } from 'zod'

import { use, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { LoginSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { login } from '@/actions/login'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email is already in use.' : ''

  const [ error, setError ] = useState<string | undefined>('')
  const [ success, setSuccess ] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm < z.infer < typeof LoginSchema >> ({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer < typeof LoginSchema > ) => {
    setError('')
    setSuccess('')
    
    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error)
          //setSuccess(data?.success)
        })
    })
  }

  return (
    <div>
      <CardWrapper
        headerLabel='Welcome back'
        backButtonLabel='Don’t have an account?'
        backButtonHref='/register'
        showSocial
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='email'
                        placeholder='betis@example.com'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='password'
                        placeholder='********'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full' disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
