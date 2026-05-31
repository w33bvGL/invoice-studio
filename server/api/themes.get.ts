export default defineEventHandler(() => {
    return [
        {
            id: 'default',
            name: 'Standard (Clean)',
            css: ''
        },
        {
            id: 'modern',
            name: 'Modern (Bold)',
            css: `
                .theme-modern { font-family: var(--font-sans); }
                .theme-modern .invoice-title { color: var(--color-primary); font-size: 48px; text-transform: uppercase; letter-spacing: -2px; }
                .theme-modern .sheet-rule { height: 4px; background-color: var(--color-primary); }
                .theme-modern .items-table th { background-color: var(--color-primary); color: var(--color-primary-fg); border: none; }
                .theme-modern .total-row td { background-color: var(--color-surface-raised); border-top: 2px solid var(--color-primary); border-bottom: none; }
                .theme-modern .total-amount { color: var(--color-primary); }
                .theme-modern .bank-card { background-color: var(--color-surface-raised); border: none; border-left: 4px solid var(--color-primary); }
            `
        },
        {
            id: 'classic',
            name: 'Classic (Serif)',
            css: `
                .theme-classic { font-family: var(--font-serif); }
                .theme-classic .invoice-title { font-weight: var(--weight-normal); font-style: italic; letter-spacing: 0; border-bottom: 1px solid var(--base-300); padding-bottom: var(--space-sm); }
                .theme-classic .sheet-header { flex-direction: column; align-items: center; text-align: center; }
                .theme-classic .sheet-header__right { align-items: center; margin-top: var(--space-md); flex-direction: row; gap: var(--space-xl); }
                .theme-classic .sheet-rule { display: none; }
                .theme-classic .items-table th { background-color: transparent; border-top: 2px solid var(--base-950); border-bottom: 2px solid var(--base-950); }
                .theme-classic .total-row td { background-color: transparent; border-bottom: 2px double var(--base-950); }
            `
        },
    ]
})