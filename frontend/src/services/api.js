const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
export function getToken(){ return sessionStorage.getItem('finance_token') }
export function setToken(token){ if(token) sessionStorage.setItem('finance_token',token); else sessionStorage.removeItem('finance_token') }
export async function api(path, options={}){
 const headers={...(options.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(getToken()?{Authorization:`Bearer ${getToken()}`}:{}) ,...(options.headers||{})}
 const response=await fetch(`${API_BASE}${path}`,{...options,headers});const type=response.headers.get('content-type')||'';const data=type.includes('application/json')?await response.json():await response.text();if(!response.ok)throw new Error(data?.message||data?.detail||`Request failed (${response.status})`);return data
}
export const money=(paise=0)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(paise||0)/100)
export const toPaise=(rupees)=>Math.round(Number(rupees)*100)
