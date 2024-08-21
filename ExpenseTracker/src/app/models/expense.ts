export interface Expense {
    id: number;
    account: number;
    date: string; // Consider using Date if you parse it later
    description: string;
    amount: number;
    causal: number;
    quotas: number;
}
