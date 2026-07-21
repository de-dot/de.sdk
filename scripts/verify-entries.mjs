/**
 * Verify that the package's entry points stay isolated.
 *
 * The web/server entry must never reach react-native or webview.io: those
 * cannot resolve in a browser or Node bundle, so a stray import would break
 * every non-native consumer at build time. The React Native entry must
 * likewise not drag in iframe.io.
 *
 * Walks the emitted CommonJS require graph from each entry and reports the
 * external packages it can actually reach, rather than trusting the source.
 *
 * Run after `yarn compile`.
 */

import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const
DIST = resolve( dirname( fileURLToPath( import.meta.url ) ), '../dist'),

ENTRIES = [
  {
    file: 'index.js',
    label: 'web/server  (@de./sdk)',
    forbidden: [ 'react-native', 'react-native-webview', 'webview.io', 'react' ]
  },
  {
    file: 'react-native.js',
    label: 'react-native (@de./sdk/react-native)',
    forbidden: [ 'iframe.io' ]
  }
]

const REQUIRE = /require\(\s*["']([^"']+)["']\s*\)/g

/**
 * Resolve a relative require to a file inside dist.
 */
function resolveLocal( fromFile, spec ){
  const base = resolve( dirname( fromFile ), spec )

  for( const candidate of [ base, `${base}.js`, join( base, 'index.js') ] )
    if( existsSync( candidate ) && candidate.endsWith('.js') ) return candidate

  return null
}

/**
 * Collect every external package reachable from an entry.
 */
function externals( entryFile ){
  const
  seen = new Set(),
  found = new Set(),
  queue = [ entryFile ]

  while( queue.length ){
    const file = queue.pop()
    if( seen.has( file ) ) continue
    seen.add( file )

    let source
    try { source = readFileSync( file, 'utf8') }
    catch { continue }

    for( const [ , spec ] of source.matchAll( REQUIRE ) ){
      if( spec.startsWith('.') ){
        const local = resolveLocal( file, spec )
        local && queue.push( local )
        continue
      }

      // Record the package name, not the subpath
      found.add( spec.startsWith('@') ? spec.split('/').slice( 0, 2 ).join('/') : spec.split('/')[0] )
    }
  }

  return found
}

let failed = false

for( const { file, label, forbidden } of ENTRIES ){
  const path = join( DIST, file )

  if( !existsSync( path ) ){
    console.error(`✗ ${label}: ${file} is missing — run \`yarn compile\` first`)
    failed = true
    continue
  }

  const
  reachable = externals( path ),
  leaked = forbidden.filter( pkg => reachable.has( pkg ) )

  if( leaked.length ){
    console.error(`✗ ${label} reaches forbidden packages: ${leaked.join(', ')}`)
    failed = true
    continue
  }

  console.log(`✓ ${label}`)
  console.log(`    externals: ${[ ...reachable ].sort().join(', ') || '(none)'}`)
}

process.exit( failed ? 1 : 0 )
