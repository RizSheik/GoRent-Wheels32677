"use client";

import { signIn } from "next-auth/react";
import Container from "@/components/Container";
import { SignInForm } from "@/components/SignInForm";
import googleImage from "@/assets/googleImage.png";
import githubImage from "@/assets/githubImage.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Container className="py-20 flex flex-col items-center justify-center">
      <div className="w-[500px] bg-bgLight p-10 rounded-lg shadow-sm shadow-darkOr/50">
        <div className="mb-5">
          <h2 className="text-xl font-bold">oauth Sign In</h2>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-1 border border-blue-500 font-semibold bg-blue-50 px-2 py-1.5 rounded-md hover:bg-blue-800 hover:text-white duration-300 ease-in-out"
            >
              <Image src={googleImage} alt="Google Sign In" className="w-8" />
              <span>Sign in with Google</span>
            </button>
            <button
              onClick={() => signIn("github")}
              className="flex items-center gap-1 border border-slate-500 font-semibold bg-slate-50 px-2 py-1.5 rounded-md hover:bg-slate-200 duration-300 ease-in-out"
            >
              <Image src={githubImage} alt="GitHub Sign In" className="w-8" />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>
        <SignInForm />
      </div>
    </Container>
  );
};

export default SignInPage;