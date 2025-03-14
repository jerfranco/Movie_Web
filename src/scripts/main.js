import { mount } from 'svelte'
import '../styles/base.css'
import App from '../App.svelte'
import Header from '../components/Header.svelte'
import Footer from '../components/Footer.svelte'


// const app = 
mount(App, {
  target: document.getElementById('app'),
})

mount(Header, {
  target: document.getElementById('header'),
})

mount(Footer, {
  target: document.getElementById('footer'),
})

// export default app
