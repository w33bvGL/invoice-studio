import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        data: {
            invoiceNo: '001',
            date: new Date().toISOString().split('T')[0],
            dueDate: '',
            theme: 'default',
            contractor: { name: '', address: '', email: '', phone: '', regNo: '', tin: '', website: '' },
            client: { name: '', address: '', email: '', phone: '' },
            items: [{ id: 1, description: '', qty: 0, rate: 0 }],
            currency: 'USD',
            bankDetails: { bankName: '', accountNo: '', swift: '', iban: '' },
            notes: ''
        } as any
    }),
    actions: {
        updateInvoice(newData: any) {
            this.data = { ...this.data, ...newData }
        },
        updateTheme(themeId: string) {
            this.data.theme = themeId
        }
    }
})