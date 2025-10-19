

const currencyFormatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
    return currencyFormatter.format(value);
}
