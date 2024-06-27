import { CardWrapper } from '@/components/auth/card-wrapper'

export const LoginForm = () => {
  return (
    <div>
      <CardWrapper
        headerLabel='Welcome back'
        backButtonLabel='Don’t have an account?'
        backButtonHref='/register'
        showSocial
      >
        Login Form!
      </CardWrapper>
    </div>
  )
}
