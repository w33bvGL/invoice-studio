<script setup lang="ts">
defineProps<{
  data: any
}>()
</script>

<template>
  <div class="panel">
    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">📄</span>
        <h3 class="section-title">Document</h3>
      </div>

      <div class="row-2">
        <div class="field">
          <label class="field-label">Invoice No</label>
          <input v-model="data.invoiceNo" class="field-input" placeholder="2026-001" />
        </div>
        <div class="field">
          <label class="field-label">Currency</label>
          <select v-model="data.currency" class="field-input field-select">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>AMD</option>
            <option>RUB</option>
          </select>
        </div>
      </div>

      <div class="row-2">
        <div class="field">
          <label class="field-label">Issue Date</label>
          <input v-model="data.date" type="date" class="field-input" />
        </div>
        <div class="field">
          <label class="field-label">Due Date</label>
          <input v-model="data.dueDate" type="date" class="field-input" />
        </div>
      </div>
    </section>

    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">🏢</span>
        <h3 class="section-title">From (Contractor)</h3>
        <span class="section-badge">You</span>
      </div>

      <div class="field">
        <label class="field-label">Company / Name</label>
        <input v-model="data.contractor.name" class="field-input" placeholder="IE Vahe Sargsyan" />
      </div>

      <div class="row-2">
        <div class="field">
          <label class="field-label">Reg No</label>
          <input v-model="data.contractor.regNo" class="field-input field-mono" placeholder="286.1571600" />
        </div>
        <div class="field">
          <label class="field-label">TIN</label>
          <input v-model="data.contractor.tin" class="field-input field-mono" placeholder="20218056" />
        </div>
      </div>

      <div class="field">
        <label class="field-label">Legal Address</label>
        <textarea v-model="data.contractor.address" class="field-input field-textarea" rows="2" placeholder="Street, City, Country"></textarea>
      </div>

      <div class="field">
        <label class="field-label">Email</label>
        <input v-model="data.contractor.email" type="email" class="field-input" placeholder="you@example.com" />
      </div>

      <div class="row-2">
        <div class="field">
          <label class="field-label">Phone</label>
          <input v-model="data.contractor.phone" class="field-input" placeholder="+374 ..." />
        </div>
        <div class="field">
          <label class="field-label">Website</label>
          <input v-model="data.contractor.website" class="field-input" placeholder="yoursite.com" />
        </div>
      </div>
    </section>

    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">👤</span>
        <h3 class="section-title">To (Client)</h3>
      </div>

      <div class="field">
        <label class="field-label">Company / Name</label>
        <input v-model="data.client.name" class="field-input" placeholder="Tech Solutions LLC" />
      </div>

      <div class="field">
        <label class="field-label">Legal Address</label>
        <textarea v-model="data.client.address" class="field-input field-textarea" rows="2" placeholder="500 Innovation Way, Boston, MA"></textarea>
      </div>

      <div class="row-2">
        <div class="field">
          <label class="field-label">Email</label>
          <input v-model="data.client.email" type="email" class="field-input" placeholder="finance@company.com" />
        </div>
        <div class="field">
          <label class="field-label">Phone</label>
          <input v-model="data.client.phone" class="field-input" placeholder="+1 ..." />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.panel-section {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.section-icon {
  font-size: 14px;
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.7);
  margin: 0;
  flex: 1;
}

.section-badge {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(99,102,241,0.2);
  color: #818cf8;
  padding: 2px 7px;
  border-radius: 20px;
  border: 1px solid rgba(99,102,241,0.3);
}

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255,255,255,0.35);
}

.field-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
  outline: none;
}

.field-input:focus {
  border-color: rgba(99,102,241,0.6);
  background: rgba(99,102,241,0.06);
}

.field-input::placeholder {
  color: rgba(255,255,255,0.2);
}

.field-textarea {
  resize: vertical;
  min-height: 60px;
  line-height: 1.5;
}

.field-select {
  cursor: pointer;
}

.field-mono {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
}
</style>