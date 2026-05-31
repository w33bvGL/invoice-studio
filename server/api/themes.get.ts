export default defineEventHandler(() => {
    return [
        {
            id: 'default',
            name: 'Standard (Clean)',
            css: `
                .theme-default { font-family: 'Inter', 'Helvetica Neue', sans-serif; }
                .theme-default .items-table th { background-color: #f9fafb; color: #4b5563; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
                .theme-default .total-row td { border-top: 2px solid #111827; }
                .theme-default .bank-card { border: 1px solid #e5e7eb; border-radius: 6px; background-color: #f9fafb; }
            `
        },
        {
            id: 'modern',
            name: 'Modern (Blue)',
            css: `
                .theme-modern { font-family: 'Inter', 'Helvetica Neue', sans-serif; color: #1e293b; }
                .theme-modern .invoice-title { color: #2563eb; font-size: 44px; letter-spacing: -1px; text-transform: uppercase; }
                .theme-modern .sheet-rule { height: 4px; background-color: #2563eb; border: none; }
                .theme-modern .items-table th { background-color: #2563eb; color: #ffffff; padding: 12px; border: none; }
                .theme-modern .item-row td { border-bottom: 1px solid #e2e8f0; }
                .theme-modern .total-row td { background-color: #f8fafc; border-top: 2px solid #2563eb; }
                .theme-modern .total-amount { color: #2563eb; }
                .theme-modern .bank-card { background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 0; }
            `
        },
        {
            id: 'classic',
            name: 'Classic (Serif)',
            css: `
                .theme-classic { font-family: 'Georgia', 'Times New Roman', serif; color: #000000; }
                .theme-classic .invoice-title { font-weight: normal; font-style: italic; text-align: center; border-bottom: 1px solid #000; padding-bottom: 16px; margin-bottom: 24px; }
                .theme-classic .sheet-header { flex-direction: column; align-items: center; text-align: center; }
                .theme-classic .sheet-header__right { flex-direction: row; gap: 24px; margin-top: 16px; align-items: center; }
                .theme-classic .sheet-rule { display: none; }
                .theme-classic .items-table th { background-color: transparent; border-top: 2px solid #000; border-bottom: 2px solid #000; color: #000; }
                .theme-classic .item-row td { border-bottom: 1px dashed #cccccc; }
                .theme-classic .total-row td { border-top: 2px solid #000; border-bottom: 4px double #000; background: transparent; }
                .theme-classic .party-label, .theme-classic .bank-card__title, .theme-classic .notes-label { color: #000; }
                .theme-classic .bank-card { border: 1px solid #000; background: transparent; }
            `
        },
    ]
})