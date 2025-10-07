import { useSearchParams, useRouter } from "next/navigation";

export function useUpdateParams() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateParams = (updates: Record<string, string | number | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        router.push(`?${params.toString()}`);
    };

    return updateParams;
}
