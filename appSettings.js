import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL: "https://favs-movie-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
export const database = getDatabase(app)

