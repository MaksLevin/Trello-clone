export const Errors = [
  {
    code: 'auth/invalid-action-code',
    title: 'This action code is invalid',
    message:
      'Your authentiction code is invalid. Please check your email and try again.'
  },
  {
    code: 'auth/user-not-found',
    title: `Looks like we couldn't find you`,
    message: 'We could not find an account associated with that email address.'
  },
  {
    code: 'auth/wrong-password',
    title: 'Incorrect login credentials',
    message:
      'We could not log you in. Please check your email and password and try again.'
  },
  {
    code: 'auth/account-exists-with-different-credential',
    title: 'This account already exists',
    message: `Your email address is already associated with an account. Please login using your account's password`
  },
  {
    code: 'auth/unauthorized-domain',
    title: 'This domain is not allowed',
    message:
      'Unauthorized domain. We could not sign you in at this time. Please contact support and try again.'
  },
  {
    code: 'auth/email-already-in-use',
    title: 'This account already exists',
    message: `Your email address is already associated with an account. Please login using your account's password`
  },
  {
    code: 'auth/invalid-continue-uri',
    title: null,
    message: 'Oops something went wrong! Please try again later'
  }
];
