import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
            <div className="text-center">
                <div className="space-y-4">
                    <h1 className="text-9xl font-bold text-slate-300">404</h1>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Page not found
                        </h2>
                        <p className="text-slate-600">
                            Sorry, we couldn't find the page you're looking for.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
}
