'use client';

/**
 * Login Page
 * User authentication and session management
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Github, Send, Phone, Mail, Lock } from 'lucide-react';
import { ToggleTheme } from '@/components/ui/toggle-theme';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || 'Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background/95 to-background p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="absolute top-6 right-6 z-10">
        <ToggleTheme />
      </div>
      
      <Card className="w-full max-w-md border-border bg-card/60 backdrop-blur-2xl animate-in zoom-in-95 duration-500 shadow-2xl hover:shadow-3xl transition-all relative z-10">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/logo.png"
                alt="Zxtni Logo"
                width={160}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight text-foreground">
            Welcome to Zxtni
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Please enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground h-11 transition-all duration-300 focus:shadow-lg"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-foreground font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground h-11 transition-all duration-300 focus:shadow-lg"
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive" className="border-destructive bg-destructive/10 animate-in fade-in slide-in-from-top duration-300">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground font-medium">Get help</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4 pb-2">
            <a
              href="https://github.com/zxtni"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 rounded-full bg-background/60 border border-border hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://t.me/zxtni"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 rounded-full bg-background/60 border border-border hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Send className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://wa.me/919088906626"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 rounded-full bg-background/60 border border-border hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
