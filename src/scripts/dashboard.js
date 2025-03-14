import { mount } from 'svelte'
import '../styles/base.css'
import Header from '../components/Header.svelte'
import Footer from '../components/Footer.svelte'
import Dashboard from '../components/Dashboard.svelte'


// const app = 
mount(Dashboard, {
  target: document.getElementById('dashboard'),
})

mount(Header, {
  target: document.getElementById('header'),
})

mount(Footer, {
  target: document.getElementById('footer'),
})

// export default app
