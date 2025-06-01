import React from 'react';
import { TextField } from '@mui/material';

export default function CustomTextField({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    fullWidth = true,
    placeholder = '',
    inputProps = {},
    sx = {},
    ...rest
}) {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={helperText}
            fullWidth={fullWidth}
            placeholder={placeholder}
            inputProps={inputProps}
            sx={{ mb: 2, ...sx }}
            variant="outlined"
            {...rest}
        />
    );
}