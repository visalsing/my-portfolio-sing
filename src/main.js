// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')




// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// import './style.css'
// import './themes.css'

// createApp(App)
//   .use(router)
//   .mount('#app')




import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

import './style.css'
import './themes.css'

const app = createApp(App)

app.use(router)
app.use(createHead())
app.mount('#app')