'use strict'

function desamber(date = new Date)
{
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)
  const doty = Math.floor(diff/86400000)-1
  const l = Math.floor(((doty)/364) * 26)
  const y = date.getFullYear().toString().substr(2,2)
  const m = doty == 365 || doty == 366 ? "+" : String.fromCharCode(97 + l).toUpperCase()
  const d = `${(doty == 365 ? 1 : doty == 366 ? 2 : (doty % 14))+1}`.padStart(2,"0")
  return `${y}${m}${d}`
}

function neralie(date = new Date())
{
  const e = new Date(date)
  const ms = e - date.setHours(0,0,0,0)
  const val = (ms/8640/10000).toFixed(6)
  return `${val.substr(2,3)}:${val.substr(5,3)}`
}

console.log(`${neralie()} — ${desamber()}`)