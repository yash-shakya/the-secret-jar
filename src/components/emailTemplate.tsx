import * as React from 'react';

export const EmailTemplate = ({ username, otp }: { username: string; otp: string }) => (
  <div>
    <h1>Welcome, {username}! </h1>
    <div>
      <h4>Your OTP is {otp}</h4>
    </div>
  </div>
);
