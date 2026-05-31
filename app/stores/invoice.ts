// stores/invoice.ts
import { defineStore } from 'pinia'

export interface InvoiceItem {
    id: number
    description: string
    qty: number
    rate: number
}

export interface InvoiceData {
    invoiceNo: string
    date: string
    dueDate: string
    docLang: string
    theme: string
    contractor: {
        name: string
        address: string
        email: string
        phone: string
        regNo: string
        tin: string
        website: string
    }
    client: {
        name: string
        address: string
        email: string
        phone: string
    }
    items: InvoiceItem[]
    currency: string
    bankDetails: {
        bankName: string
        accountNo: string
        swift: string
        iban: string
    }
    signatureImage: string
    notes: string
}

const defaultData = (): InvoiceData => ({
    invoiceNo: '2026-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    docLang: 'en',
    theme: 'default',
    contractor: {
        name: 'IE Vahe Sargsyan',
        regNo: '286.1571600',
        tin: '20218056',
        address: '28 I. Hakobyan st., Vosketap, Ararat reg., 0617, Armenia',
        email: 'w33bv.gl@gmail.com',
        phone: '',
        website: '',
    },
    client: {
        name: 'Tech Solutions LLC',
        address: '500 Innovation Way,\nBoston, MA, USA',
        email: 'finance@techsolutions.com',
        phone: '',
    },
    items: [
        { id: Date.now(), description: 'Software Development Services (May 2026)', qty: 1, rate: 3500.00 }
    ],
    currency: 'USD',
    bankDetails: {
        bankName: '',
        accountNo: '',
        swift: '',
        iban: '',
    },
    signatureImage: '',
    notes: 'Payment due within 14 days of invoice date. Thank you for your business!',
})

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        data: defaultData() as InvoiceData,
        showJsonPanel: false,
    }),

    getters: {
        // Вычисляемые поля для Preview — не считаем в компонентах
        subtotal: (state) =>
            state.data.items.reduce((sum, item) => sum + item.qty * item.rate, 0),
    },

    actions: {
        /**
         * Универсальный сеттер по dot-path: updateField('client.name', 'Acme')
         * Используется в формах через v-model + @update:modelValue
         */
        updateField(path: string, value: any) {
            const keys = path.split('.')
            let obj: any = this.data
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
            obj[keys[keys.length - 1]] = value
        },

        toggleJsonPanel() {
            this.showJsonPanel = !this.showJsonPanel
        },

        closeJsonPanel() {
            this.showJsonPanel = false
        },

        /**
         * Импорт: глубокий мердж, не перетираем ключи которых нет в пришедшем json
         */
        importJson(json: Partial<InvoiceData>) {
            if (!json || typeof json !== 'object') return
            this.data = {
                ...this.data,
                ...json,
                contractor: { ...this.data.contractor, ...(json.contractor ?? {}) },
                client: { ...this.data.client, ...(json.client ?? {}) },
                bankDetails: { ...this.data.bankDetails, ...(json.bankDetails ?? {}) },
                items: Array.isArray(json.items) ? json.items : this.data.items,
            }
        },

        /**
         * Экспорт в файл — экшен, не логика в компоненте
         */
        exportJsonFile() {
            const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `invoice-${this.data.invoiceNo}.json`
            a.click()
            URL.revokeObjectURL(url)
        },

        resetToDefault() {
            this.data = defaultData()
        },
    },
})