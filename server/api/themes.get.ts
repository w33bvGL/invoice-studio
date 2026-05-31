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
        {
            id: 'minimal',
            name: 'Minimalist (Monochrome)',
            css: `
                .theme-minimal { font-family: 'Arial', sans-serif; color: #111; }
                .theme-minimal .invoice-title { font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
                .theme-minimal .sheet-rule { background-color: #000; height: 2px; }
                .theme-minimal .items-table { border-top: 1px solid #000; }
                .theme-minimal .item-row td { border-bottom: 1px solid #eee; }
                .theme-minimal .total-amount { font-weight: 400; text-decoration: underline; }
                .theme-minimal .bank-card { border: none; padding: 0; background: transparent; }
            `
        },
        {
            id: 'corporate',
            name: 'Corporate (Dark)',
            css: `
                .theme-corporate { font-family: 'Inter', sans-serif; }
                .theme-corporate .sheet-header { background-color: #1f2937; color: #fff; padding: 32px; margin: -20mm -20mm 32px -20mm; }
                .theme-corporate .invoice-title { color: #fff; }
                .theme-corporate .meta-key, .theme-corporate .contractor-tagline { color: #9ca3af; }
                .theme-corporate .items-table th { background-color: #1f2937; color: #fff; }
                .theme-corporate .total-row { background-color: #f3f4f6; }
            `
        },
        {
            id: 'elegant',
            name: 'Elegant (Warm)',
            css: `
                .theme-elegant { font-family: 'Playfair Display', serif; color: #4a3728; }
                .theme-elegant .invoice-title { color: #854d0e; font-weight: 700; }
                .theme-elegant .sheet-rule { background-color: #d97706; height: 1px; }
                .theme-elegant .items-table th { color: #854d0e; border-bottom: 1px solid #d97706; }
                .theme-elegant .total-row td { border-top: 2px solid #854d0e; }
                .theme-elegant .bank-card { background-color: #fffbeb; border: 1px solid #fcd34d; }
            `
        },
            {
                id: 'neon',
                name: 'Neon (Cyber)',
                css: `
                .theme-neon { font-family: 'Courier New', monospace; color: #00ff41; background-color: #0d0208; }
                .theme-neon .invoice-title { color: #00ff41; text-shadow: 0 0 5px #00ff41; }
                .theme-neon .sheet-rule { background-color: #00ff41; height: 1px; }
                .theme-neon .items-table th { border: 1px solid #00ff41; color: #00ff41; }
                .theme-neon .total-row { border-top: 2px dashed #00ff41; }
                .theme-neon .bank-card { border: 1px solid #00ff41; background-color: #1a0f0f; }
            `
            },
            {
                id: 'eco',
                name: 'Eco (Nature)',
                css: `
                .theme-eco { font-family: 'Helvetica', sans-serif; color: #064e3b; }
                .theme-eco .invoice-title { color: #059669; }
                .theme-eco .sheet-rule { background-color: #10b981; height: 3px; border-radius: 2px; }
                .theme-eco .items-table th { background-color: #ecfdf5; color: #065f46; }
                .theme-eco .total-row td { border-top: 2px solid #059669; }
                .theme-eco .bank-card { background-color: #f0fdf4; border: 1px solid #d1fae5; }
            `
            },
            {
                id: 'royal',
                name: 'Royal (Gold/Navy)',
                css: `
                .theme-royal { font-family: 'Cinzel', serif; color: #1e3a8a; }
                .theme-royal .invoice-title { color: #b45309; text-transform: uppercase; letter-spacing: 4px; }
                .theme-royal .sheet-rule { background-color: #b45309; height: 1px; }
                .theme-royal .items-table th { background-color: #1e3a8a; color: #ffffff; }
                .theme-royal .total-row td { background-color: #fef3c7; border-top: 2px solid #b45309; }
                .theme-royal .bank-card { background-color: #fef3c7; border: 1px solid #d97706; }
            `
            }
    ]
})