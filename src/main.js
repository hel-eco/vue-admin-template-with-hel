import { LIB_NAME } from './configs/subApp'
import { libReady, isMasterApp } from 'hel-lib-proxy'

async function main() {
  if (isMasterApp()) {
    await import('./loadApp')
  } else {
    const libProperties = await import('./entrance/libProperties')
    libReady(LIB_NAME, libProperties.default)
  }
}

main().catch(console.error)
