'use client';
import { SessionProvider } from "next-auth/react";
import React from 'react';
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">NextAuth Demo</h1>
      <p className="text-gray-600 max-w-md">
        Register with email and password or sign in with Google. Session data is
        enriched through the jwt and session callbacks.
      </p>

      {session ? (
        <div className="space-y-3">
          <p>Signed in as {session.user.email}</p>
          <Link href="/dashboard" className="bg-black text-white rounded px-4 py-2 inline-block">
            Go to dashboard
          </Link>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link href="/login" className="bg-black text-white rounded px-4 py-2">
            Login
          </Link>
          <Link href="/register" className="border rounded px-4 py-2">
            Register
          </Link>
        </div>
      )}
    </main>
  );
}