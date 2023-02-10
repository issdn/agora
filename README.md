# Agora
Functional, mockish, bodged, monolythically built, anonymous publishing platform.

|Main Page|Post Editor|
|---|---|
|![](https://github.com/issdn/agora/blob/master/screens/1.png)|![](https://github.com/issdn/agora/blob/master/screens/4.png)|

|User Profile|Post Viewer|
|---|---|
|![](https://github.com/issdn/agora/blob/master/screens/2.png)|![](https://github.com/issdn/agora/blob/master/screens/3.png)|

|Sql Model|
|---|
|![](https://github.com/issdn/agora/blob/master/screens/5.png)|

---
## Built with:
### Client:
- typescript
- react
- axios
- tailwindcss
- formik, yup
### Server:
- Asp.Net Core 6
### Persistence:
- mysql

---
## Contents:
Users - DSVGO anonymous register, login, editing user info, pubic/private user information, following an user.
Posts - Post editing with drafts and auto-save. Posts likes and comments.
Additional - pre-fetching additional data like amount of comments/posts, caching, mobile-friendly both from design and data usage.

---
## The wrongs:
- unconsistent code (naming, redundance etc.)
- no comments (based on the fact that no one is gonna read them)
- no tests (bodged purposefully)