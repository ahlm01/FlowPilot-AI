'use client'

import { useState, forwardRef, type InputHTMLAttributes } from 'react'

function EyeIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    )
}

function EyeOffIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a20.4 20.4 0 0 1-2.68 3.9M14.12 14.12a3 3 0 1 1-4.24-4.24"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    inputStyle?: React.CSSProperties
}

/**
 * Password field with a show/hide toggle. Renders exactly like a normal
 * text input styled via `inputStyle` / `className`, plus an eye icon button
 * on the right that flips between type="password" and type="text".
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
    { inputStyle, style, ...props },
    ref
) {
    const [visible, setVisible] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            <input
                {...props}
                ref={ref}
                type={visible ? 'text' : 'password'}
                style={{ ...inputStyle, ...style, paddingRight: '46px' }}
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
                style={{
                    position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', padding: '2px', cursor: 'pointer',
                    // Kept as a fixed neutral gray (not a theme variable) since this
                    // component is shared with the always-light auth pages — a
                    // dashboard dark-mode toggle must not bleed into login/signup.
                    color: '#8a90ab', display: 'flex', alignItems: 'center', lineHeight: 0
                }}
            >
                {visible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    )
})

export default PasswordInput
