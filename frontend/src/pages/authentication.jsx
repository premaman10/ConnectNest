import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import '../authGlass.css';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#4F8CFF',
        },
        secondary: {
            main: '#2D2D2D',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
    },
});

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let message = (err.response?.data?.message || "An error occurred");
            setError(message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div
                className="auth-bg-fullimg"
                style={{
                    background: "url('/auth-side.jpg') center center/cover no-repeat",
                    minHeight: "100vh",
                    width: "100vw"
                }}
            >
                <CssBaseline />
                <Box className="centered-auth-card-wrapper">
                    <Paper elevation={10} className="glass-card fullimg-auth-card">
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>ConnectNest</h2>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                                <LockOutlinedIcon fontSize="large" />
                            </Avatar>
                            <Box display="flex" gap={2} mb={2}>
                                <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => setFormState(0)} sx={{ borderRadius: 3, px: 4 }}>
                                    Sign In
                                </Button>
                                <Button variant={formState === 1 ? "contained" : "outlined"} onClick={() => setFormState(1)} sx={{ borderRadius: 3, px: 4 }}>
                                    Sign Up
                                </Button>
                            </Box>
                            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                                {formState === 1 && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={username}
                                    autoFocus={formState === 0}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword((show) => !show)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={2}>
                                    <Box display="flex" alignItems="center">
                                        <input type="checkbox" id="rememberMe" style={{ marginRight: 6 }} />
                                        <label htmlFor="rememberMe" style={{ color: '#fff', fontSize: 14 }}>Remember Me</label>
                                    </Box>
                                    <Button variant="text" sx={{ color: '#fff', fontSize: 14, textTransform: 'none' }}>Forgot Password</Button>
                                </Box>
                                <p style={{ color: "#FF5F57", margin: 0, minHeight: 24 }}>{error}</p>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1, mb: 2, borderRadius: 3, fontWeight: 600, fontSize: 18, py: 1.5, boxShadow: '0 4px 20px rgba(79,140,255,0.15)' }}
                                    onClick={handleAuth}
                                >
                                    {formState === 0 ? "Login " : "Register"}
                                </Button>
                                <Divider sx={{ my: 2, color: '#fff' }}>Or Sign In With</Divider>
                                <Box display="flex" gap={2} justifyContent="center">
                                    <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff', borderRadius: 2, px: 4 }}>Facebook</Button>
                                    <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff', borderRadius: 2, px: 4 }}>Twitter</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    message={message}
                    onClose={() => setOpen(false)}
                />
            </div>
        </ThemeProvider>
    );
}