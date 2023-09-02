# Notes to self


### Page guards

Alternative to PrivateZone function:

```ts
  const isAuthenticated = () => {
    const token = localStorage.getItem("token-shoppinglist")
    if (token) {
      return true
    } else {
      return false
    }
  }
...
  <Route 
    path="/list" 
    element={isAuthenticated() ? <MyList title={"My List"} /> : <Navigate to="/login" /> } />

```
Though PrivateZone function is cleaner.


### Typescript (e) event

```ts
e: React.FormEvent<HTMLFormElement> 
e: React.MouseEvent<HTMLButtonElement>


```