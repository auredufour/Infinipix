#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const [, , rawName] = process.argv
if (!rawName) {
  console.error('Usage: npm run gen -- <name>')
  process.exit(1)
}
const base = rawName.toLowerCase()
const Pascal = rawName.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())
const DSName = `DS${Pascal}`
const dir = join('src/components/shared', Pascal)
if (existsSync(dir)) {
  console.error(`❌  ${Pascal} already exists.`)
  process.exit(1)
}
mkdirSync(dir, { recursive: true })

const componentFile = `${base}.component.tsx`
const typesFile = `${base}.types.ts`
const utilsFile = `${base}.utils.ts`
const testFile = `${base}.test.tsx`

writeFileSync(
  join(dir, componentFile),
  `import type { PropsWithChildren } from 'react';\nimport { forwardRef } from 'react';\nimport styled from 'styled-components';\nimport type { ${DSName}Props } from './${typesFile}';\nimport { noop } from './${utilsFile}';\n\nconst Root = styled.div\`\`;\n\nexport const ${DSName} = forwardRef<HTMLDivElement, PropsWithChildren<${DSName}Props>>((\n  { children, ...rest }, ref\n) => {\n  noop();\n  return <Root ref={ref} {...rest}>{children}</Root>;\n});\n${DSName}.displayName = '${DSName}';\n`,
)

writeFileSync(
  join(dir, typesFile),
  `export interface ${DSName}Props {\n  /** Add props here */\n}\n`,
)

writeFileSync(join(dir, utilsFile), `export const noop = () => {};\n`)

writeFileSync(
  join(dir, testFile),
  `import { render, screen } from '@testing-library/react';\nimport { ${DSName} } from './${componentFile}';\n\ndescribe('${DSName}', () => {\n  it('renders children', () => {\n    render(<${DSName}>Hello</${DSName}>);\n    expect(screen.getByText('Hello')).toBeInTheDocument();\n  });\n});\n`,
)

console.log(`✅  Scaffolded ${DSName} in ${dir}`)
