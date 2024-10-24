import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1', // ej. 'us-east-1'

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_93clGbzRT',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '63vuuge07oc7rce956cjs9udla',
  }
});
