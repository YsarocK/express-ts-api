# API

# Routes

## - Get all sessions

### Request

`GET /get_all_session`

```ts
{

}
```

### Response
```ts
{
    success : boolean
    data : Session[]
}
```

## - Get all user sessions from session Id

### Request

`GET /:session_id/users_sessions`

```ts
{

}
```

### Response
```ts
{
    success : boolean
    data : UserSession[]
}
```

## - Create session

### Request

`POST /create_session`

```ts
{
    name : string
}
```

### Response
```ts
{
    success : boolean
    data : Session
}
```

## - Update session

### Request

`POST /update_session`

```ts
{
    id : string,
    isActive : boolean
}
```

### Response
```ts
{
    success : boolean
    data : Session
}
```

## - Login admin

### Request

`POST /login`

```ts
{
    email : string,
    password : string,
}
```

### Response
```ts
{
    success : boolean
    data : {
        admin : Admin,
        tokens : {
             access: {
                token: jwtToken,
                expires: jwtToken,
            },
            refresh: {
                token: jwtToken,
                expires: jwtToken,
            },
        }
    }
}
```


## - Verify exercise

### Request

`POST /verify`

```ts
{
    host : string,
    username : string,
}
```

### Response
```ts
{
    success : boolean
    data : {
        score : number,
        tests: Exercice[]
    }
}
```

## - User login

### Request

`GET /login`

```ts
{

}
```

### Response
```ts
{
    success : boolean
    data : {
        user: User,
        user_session: UserSession,
        session: Session,
        redirect_url: string,
        tokens: JwtToken,
    }
}
```

## - Refresh user token

### Request

`GET /refresh`

```ts
{

}
```

### Response
```ts
{
    success : boolean
    data : {
        tokens : {
             access: {
                token: jwtToken,
                expires: jwtToken,
            },
            refresh: {
                token: jwtToken,
                expires: jwtToken,
            },
        }
    }
}
```

## - Check user access

### Request

`GET /refresh`

```ts
{

}
```

### Response
```ts
{
    success : boolean
    data : {
        userId : string
    }
}
```


## - Register user to a session

### Request

`GET /:session_id/register`

```ts
{
    eleve : {
        email : string,
        name : string
    }
}
```

### Response
```ts
{
    success : boolean
    data : {
        token : JwtToken,
        link : string
    }
}
```



# Logger Winston

```ts
Logger.error('This is an error log');
Logger.warn('This is a warn log');
Logger.info('This is a info log');
Logger.http('This is a http log');
Logger.debug('This is a debug log');
```
