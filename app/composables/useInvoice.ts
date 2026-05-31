// composables/useInvoice.ts
import { ref, reactive } from 'vue'

// Глобальное состояние (вынесено за пределы функции, чтобы шарилось между всеми компонентами)
const showJsonPanel = ref(false)

const invoiceData = reactive({
    invoiceNo: '2026-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
    notes: 'Payment due within 14 days of invoice date. Thank you for your business!',
    bankDetails: {
        bankName: '',
        accountNo: '',
        swift: '',
        iban: '',
    }
})

export const useInvoice = () => {
    function handleImportJson(json: any) {
        if (json && typeof json === 'object') {
            Object.assign(invoiceData, json)
        }
    }

    const toggleJson = () => {
        showJsonPanel.value = !showJsonPanel.value
    }

    return {
        invoiceData,
        showJsonPanel,
        handleImportJson,
        toggleJson
    }
}