'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Loader2,
  Terminal,
  UserCheck,
  KeyRound,
  AlertCircle,
  BookOpen,
  LayoutDashboard,
} from 'lucide-react';
import { toast } from 'sonner';
import { setAuthCookie, getAuthCookie, removeAuthCookie } from '@/utils/cookie';

interface AuthUser {
  name: string;
  email: string;
  photo?: string;
  role?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    try {
      const stored = getAuthCookie();
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        'http://localhost:5000/api/v1';

      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrative credentials');
      }

      const authenticatedUser: AuthUser = data.data;
      setAuthCookie(JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      toast.success(
        `Authentication successful! Welcome back, ${authenticatedUser.name || 'Admin'}.`
      );
    } catch (err: any) {
      const errorMsg =
        err.message || 'Authentication node unreachable. Check connection.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogout = () => {
    removeAuthCookie();
    setUser(null);
    setEmail('');
    setPassword('');
    setError(null);
    toast.info('Session terminated successfully.');
  };

  const handleGoogleLogin = () => {
    setError(null);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      const msg =
        'NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured in your .env file. Please add your Google OAuth Client ID to enable Google login.';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (
      typeof window === 'undefined' ||
      !(window as any).google?.accounts?.oauth2
    ) {
      toast.error(
        'Google Identity Service is loading, please try again in a moment.'
      );
      return;
    }

    setGoogleLoading(true);

    try {
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: 'email profile openid',
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            setGoogleLoading(false);
            if (tokenResponse.error !== 'popup_closed_by_user') {
              toast.error('Google sign-in was cancelled or failed.');
            }
            return;
          }

          try {
            const userInfoRes = await fetch(
              'https://www.googleapis.com/oauth2/v3/userinfo',
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              }
            );

            const profile = await userInfoRes.json();

            if (!profile.email) {
              throw new Error('Could not retrieve email from Google profile.');
            }

            const apiUrl =
              process.env.NEXT_PUBLIC_BACKEND_URL ||
              process.env.NEXT_PUBLIC_API_URL ||
              'http://localhost:5000/api/v1';

            const res = await fetch(`${apiUrl}/auth/google`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: profile.name || profile.given_name || 'Google User',
                email: profile.email,
                photo:
                  profile.picture ||
                  'https://i.ibb.co.com/fV500sDk/download-2.jpg',
              }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
              throw new Error(
                data.message || 'Google authentication rejected by server.'
              );
            }

            const authenticatedUser: AuthUser = data.data;
            setAuthCookie(JSON.stringify(authenticatedUser));
            setUser(authenticatedUser);
            toast.success(
              `Google login successful! Welcome, ${authenticatedUser.name}.`
            );
          } catch (err: any) {
            const msg = err.message || 'Google authentication failed.';
            setError(msg);
            toast.error(msg);
          } finally {
            setGoogleLoading(false);
          }
        },
      });

      client.requestAccessToken();
    } catch (err: any) {
      setGoogleLoading(false);
      const msg = err.message || 'Failed to initialize Google login.';
      setError(msg);
      toast.error(msg);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-24 bg-black text-white overflow-hidden">
      {/* Google Identity Services SDK */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      {/* Ambient Tech Grid Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Top Return Breadcrumb */}
        <div className="flex items-center justify-between font-mono text-xs text-gray-500">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span>RETURN_TO_PORTFOLIO</span>
          </Link>

          <span className="text-cyan-500/60 flex items-center gap-1">
            <ShieldCheck size={13} />
            <span>SYS.AUTH_NODE</span>
          </span>
        </div>

        {/* Dynamic Card: Logged In vs Login Form */}
        {user ? (
          /* LOGGED IN STATE (LOGOUT PAGE) */
          <Card className="relative border-cyan-500/40 bg-gray-950/90 shadow-[0_0_40px_rgba(6,182,212,0.15)] rounded-2xl overflow-hidden backdrop-blur-xl">
            {/* Cyber Corner Markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            <CardHeader className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-green-500/40 text-green-400 bg-green-500/10 font-mono text-[10px] flex items-center gap-1.5 px-2.5 py-0.5 uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  AUTHENTICATED_SESSION
                </Badge>
                <span className="font-mono text-[10px] text-gray-500">
                  SYS_ID: 0xADMIN
                </span>
              </div>
              <CardTitle
                className="text-xl font-black text-white mt-2"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                ADMIN // CONSOLE
              </CardTitle>
              <CardDescription className="font-mono text-xs text-gray-400">
                Authorized administrative session currently active.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-5 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-gray-400">
                  <span>NAME:</span>
                  <span className="text-white font-bold">{user.name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>EMAIL:</span>
                  <span className="text-cyan-300 truncate max-w-[200px]">
                    {user.email}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>ACCESS_LEVEL:</span>
                  <span className="text-green-400 font-bold">
                    SUPER_ADMINISTRATOR
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link href="/admin/dashboard" className="block w-full">
                  <Button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider h-10 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98">
                    <LayoutDashboard size={14} />
                    <span>LAUNCH_DASHBOARD ➔</span>
                  </Button>
                </Link>

                <Link href="/" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full bg-white/5 hover:bg-white/10 text-gray-200 border-white/15 font-mono font-bold text-xs uppercase tracking-wider h-10 shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck size={14} />
                    <span>VISIT_PORTFOLIO ➔</span>
                  </Button>
                </Link>

                <Link href="/blogs" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 font-mono font-bold text-xs uppercase tracking-wider h-10 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <BookOpen size={14} />
                    <span>MANAGE_BLOGS ➔</span>
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full bg-red-600/80 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider h-10 border border-red-500/40 shadow-lg cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  <span>[ TERMINATE_SESSION // LOGOUT ]</span>
                </Button>
              </div>
            </CardContent>

            <CardFooter className="border-t border-white/10 pt-3 text-[10px] font-mono text-gray-500 flex justify-between">
              <span>SECURITY_LAYER // ZERO_TRUST</span>
              <span>AES_256_ACTIVE</span>
            </CardFooter>
          </Card>
        ) : (
          /* LOGIN FORM STATE */
          <Card className="relative border-cyan-500/30 bg-gray-950/85 shadow-[0_0_35px_rgba(6,182,212,0.12)] rounded-2xl overflow-hidden backdrop-blur-xl">
            {/* Cyber Corner Markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            <CardHeader className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-cyan-500/40 text-cyan-300 bg-cyan-500/10 font-mono text-[10px] flex items-center gap-1.5 px-2 py-0.5 uppercase tracking-wider"
                >
                  <KeyRound size={11} />
                  <span>RESTRICTED_ACCESS</span>
                </Badge>
                <span className="font-mono text-[10px] text-gray-500">
                  PORT_0xAUTH
                </span>
              </div>
              <CardTitle
                className="text-xl font-black text-white mt-2 tracking-tight"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                ADMIN // LOGIN
              </CardTitle>
              <CardDescription className="font-mono text-xs text-gray-400">
                Enter authorized credentials to verify identity and manage
                posts.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-5">
                {/* Error Banner */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2 animate-shake">
                    <AlertCircle
                      size={15}
                      className="shrink-0 mt-0.5 text-red-400"
                    />
                    <span>{error}</span>
                  </div>
                )}

                {/* Google Sign-in Button */}
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading || googleLoading}
                  onClick={handleGoogleLogin}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-cyan-400/60 font-mono font-bold text-xs uppercase tracking-wider h-10 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2.5 shadow-sm"
                >
                  {googleLoading ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin text-cyan-400"
                      />
                      <span>CONNECTING_GOOGLE...</span>
                    </>
                  ) : (
                    <>
                      <FcGoogle size={18} />
                      <span>CONTINUE_WITH_GOOGLE</span>
                    </>
                  )}
                </Button>

                {/* Futuristic Divider */}
                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-white/10 w-full" />
                  <span className="bg-gray-950 px-2.5 text-[9.5px] font-mono text-gray-500 uppercase tracking-widest shrink-0">
                    OR // CREDENTIALS
                  </span>
                  <div className="border-t border-white/10 w-full" />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5 font-mono text-xs">
                  <Label htmlFor="email" className="text-gray-300">
                    ADMINISTRATOR_EMAIL
                  </Label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="admin@princemahmud.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 bg-black/60 border-white/15 focus:border-cyan-400 text-white font-mono text-xs h-10 rounded-xl"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-300">
                      SECURE_KEY_HASH
                    </Label>
                    <span className="text-[10px] text-gray-500">
                      MIN_6_CHARS
                    </span>
                  </div>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-9 bg-black/60 border-white/15 focus:border-cyan-400 text-white font-mono text-xs h-10 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider h-10 rounded-xl shadow-lg mt-2 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>AUTHENTICATING...</span>
                    </>
                  ) : (
                    <>
                      <Terminal size={14} />
                      <span>[ INITIALIZE_SESSION ➔ ]</span>
                    </>
                  )}
                </Button>
              </CardContent>

              <CardFooter className="border-t border-white/10 pt-3 text-[10px] font-mono text-gray-500 flex justify-between">
                <span>IDENTITY_NODE: 200_OK</span>
                <span>SECURE_SOCKET_SSL</span>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
