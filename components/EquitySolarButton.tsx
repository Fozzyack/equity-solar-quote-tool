import Link from "next/link";

const EquitySolarButton = () => {
    return (
        <div className="flex items-center justify-center">
            <Link href="https://equitysolar.com.au">
                <div className="px-4 py-2 rounded-full hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500 border border-slate-300 group transition-all duration-150 ease-in-out">
                    <p className="font-bold">
                        Go Back to{" "}
                        <span className="text-yellow-500">Equity Solar</span>
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default EquitySolarButton;
