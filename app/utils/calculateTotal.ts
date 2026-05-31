export const calculateTotal = (items: any[]) => {
    return items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0)
}