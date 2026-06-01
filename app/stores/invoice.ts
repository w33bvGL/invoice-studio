
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

const getSampleData = (type: 'magic' | 'space'): InvoiceData => {
    const common = {
        invoiceNo: `INV-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        docLang: 'en',
        theme: 'default',
        currency: 'USD',
        signatureImage: '',
        notes: 'Please pay promptly, or the invoice gnomes will come for your socks.',
    }

    if (type === 'magic') {
        return {
            ...common,
            contractor: {
                name: 'Hogwarts Freelance Services',
                regNo: '999-WITCH',
                tin: '123456789',
                address: 'Room of Requirement, Castle Grounds, Scotland',
                email: 'albus.d@magic.net',
                phone: '+44 20 7946 0000',
                website: 'magic-billing.wiz',
            },
            client: {
                name: 'Dragon Taming Agency',
                address: '12 Fire Pit Ln, Volcano City',
                email: 'fire@dragons.com',
                phone: '+1 555 0101',
            },
            items: [{ id: Date.now(), description: 'Removing dark curses from spreadsheet', qty: 1, rate: 5000.00 }],
            bankDetails: { bankName: 'Gringotts Bank', accountNo: '777-GOLD', swift: 'GRINGOTTS', iban: 'GB1234' }
        }
    }

    return {
        ...common,
        contractor: {
            name: 'Intergalactic Pizza Delivery',
            regNo: 'SPACE-007',
            tin: '00000001',
            address: 'Asteroid Belt, Sector 7G',
            email: 'pepperoni@space.orbit',
            phone: '+00 000 000 000',
            website: 'pizza.space',
        },
        client: {
            name: 'Martian Colony One',
            address: 'Red Planet, Crater Surface',
            email: 'manager@mars.planet',
            phone: '+99 999 999 999',
        },
        items: [{ id: Date.now(), description: 'Interstellar delivery fee (gravity-free)', qty: 10, rate: 150.00 }],
        bankDetails: { bankName: 'Nebula Credit Union', accountNo: 'STAR-SHIP', swift: 'NEBULA', iban: 'MA0000' }
    }
}

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        data: getSampleData('magic') as InvoiceData, // По умолчанию стоит "Магия"
        showJsonPanel: false,
    }),

    getters: {
        subtotal: (state) =>
            state.data.items.reduce((sum, item) => sum + item.qty * item.rate, 0),
    },

    actions: {
        updateField(path: string, value: any) {
            const keys = path.split('.')
            let obj: any = this.data
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
            obj[keys[keys.length - 1]] = value
        },

        loadSample(type: 'magic' | 'space') {
            this.data = getSampleData(type)
        },

        toggleJsonPanel() {
            this.showJsonPanel = !this.showJsonPanel
        },

        closeJsonPanel() {
            this.showJsonPanel = false
        },

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
            this.data = getSampleData('magic')
        },
    },
})