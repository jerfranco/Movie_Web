import { mount } from 'svelte'
import '../styles/base.css'
import Header from '../components/Header.svelte'
import Footer from '../components/Footer.svelte'
import Login from '../components/Login.svelte'


// const app = 
mount(Login, {
  target: document.getElementById('login'),
})

mount(Header, {
  target: document.getElementById('header'),
})

mount(Footer, {
  target: document.getElementById('footer'),
})

// export default app
