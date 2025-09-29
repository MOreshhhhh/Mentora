"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        window.location.href = "/dashboard";
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider: "google" | "github" | "linkedin_oidc") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) alert(error.message);
  };

  const signUpWithEmail = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email for confirmation link!");
  };

  const signInWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Mentora Login</h1>

        <button onClick={() => signInWithProvider("google")} className="w-full bg-red-500 text-white py-2 rounded">
          Sign in with Google
        </button>
        <button onClick={() => signInWithProvider("github")} className="w-full bg-gray-800 text-white py-2 rounded">
          Sign in with GitHub
        </button>
        <button onClick={() => signInWithProvider("linkedin_oidc")} className="w-full bg-blue-600 text-white py-2 rounded">
          Sign in with LinkedIn
        </button>

        <div className="text-center text-gray-500">or</div>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signInWithEmail} className="w-full bg-green-500 text-white py-2 rounded">
          Login with Email
        </button>
        <button onClick={signUpWithEmail} className="w-full bg-blue-500 text-white py-2 rounded">
          Sign up with Email
        </button>
      </div>
    </div>
  );
}
