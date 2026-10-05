import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// The current shadcn CLI writes `from "cn"` instead of the configured utils alias,
// so every generated component is repaired here after `shadcn add`.
const uiDir = join(process.cwd(), 'src', 'components', 'ui')

for (const file of readdirSync(uiDir)) {
  if (!file.endsWith('.tsx')) continue

  const path = join(uiDir, file)
  const source = readFileSync(path, 'utf8')
  const fixed = source.replace(/from ["']cn["']/g, 'from "@/lib/utils"')

  if (fixed !== source) {
    writeFileSync(path, fixed)
    console.log(`fixed ${file}`)
  }
}
