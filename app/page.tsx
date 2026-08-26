import { auth, signIn, signOut } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center gap-8 p-10">
      {/* If the user is logged in, show their details */}
      {session?.user ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-slate-50 p-8">
          <h1 className="text-2xl font-bold">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-gray-600">{session.user.email}</p>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        /* If the user is NOT logged in, show the login buttons */
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-slate-50 p-8">
          <h1 className="text-2xl font-bold">You are not logged in.</h1>

          <form
            action={async () => {
              "use server";
              await signIn("credentials", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white transition hover:bg-gray-800"
            >
              Sign in as Developer
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
