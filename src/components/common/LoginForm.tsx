'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link as MuiLink
} from '@mui/material';
import { useState } from 'react';

type LoginFormProps = {
  signinTypeP: string;
};

export default function LoginForm({ signinTypeP }: LoginFormProps) {
  const [signinType, setSigninType] = useState(signinTypeP);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const formField = [
    { label: 'Email', type: 'email', formType: ['signup'] },
    { label: 'Username', type: 'text', formType: ['login', 'signup'] },
    { label: 'Password', type: 'password', formType: ['login', 'signup'] }
  ];

  const handleChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (signinType === 'signup' && !acceptedPrivacy) {
      alert("Per continuare accetta l'informativa sulla privacy");1
      return;
    }

    console.log('Dati inviati:', { ...formData, acceptedPrivacy, mode: signinType });

};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {/* TITOLO LOGIN/SIGNUP */}
      <Typography sx={{ color: '#535353', fontSize: '1.4em', mb: 3 }}>
        {signinType === 'login' ? 'LOGIN' : 'SIGN UP'}
      </Typography>

      {formField.map((field, index) => {
        return (
          field.formType.includes(signinType) && (
            <TextField
              key={index}
              label={field.label}
              type={field.type}
              variant="outlined"
              value={formData[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
              required
              sx={{ mb: 0.5 }}
            />
          )
        );
      })}

      {/* PRIVACY POLICY */}
      {signinType === 'signup' && (
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              sx={{ width: '40px' }}
            />
          }
          label={
            <Typography>
              Ho letto e accetto{' '}
              <MuiLink href="/privacy" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                l'informativa sulla privacy
              </MuiLink>.
            </Typography>
          }
        />
      )}

      {/* BOTTONE INVIO */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'primary.main',
          color: 'black',
          mt: 2
        }}
      >
        {signinType === 'login' ? 'LOGIN' : 'SIGN UP'}
      </Button>

      {/* SWITCH LOGIN/SIGNUP */}
      {signinType === 'login' ? (
        <Typography sx={{ color: '#535353', display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2 }}>
          Don't have account?
          <Button
            variant="text"
            sx={{ padding: 0, minWidth: 'auto', textTransform: 'none' }}
            onClick={() => setSigninType('signup')}
          >
            Sign up
          </Button>
        </Typography>
      ) : (
        <Typography sx={{ color: '#535353', display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2 }}>
          Already registered?
          <Button
            variant="text"
            sx={{ padding: 0, minWidth: 'auto', textTransform: 'none' }}
            onClick={() => setSigninType('login')}
          >
            Login
          </Button>
        </Typography>
      )}
    </Box>
  );
}
