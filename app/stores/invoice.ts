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
        updateData(path: string, value: any) {
            const keys = path.split('.')
            let obj = this.data
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
            obj[keys[keys.length - 1]] = value
        }
    }
})