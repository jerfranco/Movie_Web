import { mount } from 'svelte'
import '../styles/base.css'
import Header from '../components/Header.svelte'
import Footer from '../components/Footer.svelte'
import Signup from '../components/Signup.svelte'


// const app = 
mount(Signup, {
  target: document.getElementById('signup'),
})

mount(Header, {
  target: document.getElementById('header'),
})

mount(Footer, {
  target: document.getElementById('footer'),
})

// export default app
