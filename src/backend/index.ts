import express from "express"
import cors from "cors"

const app = express()

function generateRandomStringOfLength(len: number) {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArray = Array.from(
      { length: len },
      (_v, _k) => {
        return chars[Math.floor(Math.random() * chars.length)]
      }
  );

  return randomArray.join('');
}

var whitelist = [ 'http://localhost:3000', 'http://example2.com' ]

app.use(cors(
    {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          console.log('Not allowed by CORS')
          callback()
        }
      }
    }
))

app.get(`/`, (req, res) => {
  res.redirect("https://opencade.vercel.app")
})

let USER_CACHE: { [key: string]: string } = {}

app.get(`/auth/username`, (req, res) => {
  let token = req.headers.sessiontoken

  if (!token) return

  let ind = Object.values(USER_CACHE).findIndex(val => val === token)

  if (ind !== -1)
    return res.json({ username: Object.keys(USER_CACHE)[ind], sessiontoken: Object.values(USER_CACHE)[ind] })
})

app.get(`/auth/guest`, (req, res) => {
  console.log("received request")

  function generateSessionToken() {
    let token = generateRandomStringOfLength(64)

    if (Object.values(USER_CACHE).findIndex(val => val === token) === -1)
      return token

    return generateSessionToken()
  }

  return res.json({ sessiontoken: generateSessionToken() })
})

app.listen("3561", () => {
  console.log("backend server listening on port 3561")
})
