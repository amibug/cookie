
## Write a cookie

A cookie is set with a simple object as the first parameter:

```js
cookies({ token: '42' });
```
```js
var userdata = { email: 'test@test.com', token: '42' };
cookies({ user: userdata });
```

You can set as many cookies as you want at the same time:

```js
cookies({ token: '42', question: 'the Ultimate Question' });
```

It will also store numbers (instead of strings) because it uses json to encode them:

```js
cookies({ token: 42 });
var token = cookies('token');
console.log(token === 42, token === '42');  // true false
```

Lastly, you can concatenate them as many times as you want:

```js
cookies({ token: 42 })({ token: '42' });
```

Note that this library **does not** accept a two-parameter strings to set cookies like many other libraries to avoid confusion with the options:

```js
// NOT VALID
cookies('token', '42');
```



### Options

When using cookies you can pass a second parameter as options (shown here with the defaults):

```js
cookies({ token: '42' }, {
  expires: 100 * 24 * 3600,     // The time to expire in seconds
  domain: false,                // The domain for the cookie
  path: '/',                    // The path for the cookie
  secure: https ? true : false  // Require the use of https
});
```

Or you could set any of the options globally for all the instances after being called:

```js
cookies.expires = 100 * 24 * 3600;      // The time to expire in seconds
cookies.domain = false;                 // The domain for the cookie
cookies.path = '/';                     // The path for the cookie
cookies.secure = https ? true : false;  // Require the use of https
```

An explanation of them all:

- `expires`: when the cookie will expire and be removed. It can be:
  - A positive int to set the number of seconds until expiration
  - A negative int to remove the cookie
  - A `Date()` instance with the date of expiration
  - `0`, `false` or a *falsy* value to set a session cookie
- `domain`: the domain where the cookie is applied.
- `path`: the folder where the cookie will be available. Normally it's better to leave this empty.
- `secure`: force the cookie to be retrieved through https. By default this is set to true when it's set in an https domain to avoid it being stolen if you later visit an http page on a public connection.


### Advanced options

There are some advanced options that we don't recommend to change as you could have problems down the road, but if you know what you are doing go ahead.

```js
cookies({ token: '42' }, {
  nulltoremove: true,       // Set the value of a cookie to null to remove it
  autojson: true,           // Encode and decode data structures with JSON
  autoencode: true,         // Encode to make it safe for url (RFC6265)
  encode: function(str){ return encodeURIComponent(str); },  // Function to encode it
  decode: function(str){ return decodeURIComponent(str); }   // Function to decode it
});
```

Normally you'd want to change these options globally:

```js
cookies.nulltoremove = true;
cookies.autojson = true;
cookies.autoencode = true;
cookies.encode = function(str){ return encodeURIComponent(str); };
cookies.decode = function(str){ return decodeURIComponent(str); };
```


## Read a cookie

To read a cookie you call the main function with a string, that is the key of the cookie that you want to read. Let's say that you want to read the cookie `token`

```js
var token = cookies('token');
```

> *cookies.js* automatically stores and retrieves the cookies with JSON and URI-encoded. You can disable this (but normally you wouldn't want to do this) with the options `autojson` and `autoencode` as seen [in the Advanced Options](#advanced-options).

You can set and read a cookie at the same time taking advantage of the concatenation:

```js
var token = cookies({ token: '42' })('token');
// token === '42'
```



## Remove a cookie

With the options by default, you can remove a cookie in few different ways:

```js
cookies({ token: null });
cookies({ token: 'a' }, { expires: -10 });
```



| key | value | default value |
|:--|:--|:--|
| `expires` | 过期时间(天)。指定cookie的生命期。具体是值是过期日期。如果想让cookie的存在期限超过当前浏览器会话时间，就必须使用这个属性。当过了到期日期时，浏览器就可以删除cookie文件，没有任何影响。| 浏览器关闭过期 |
| `domain` | 域。指定关联的WEB服务器或域。值是域名，比如pc175.com。这是对path路径属性的一个延伸。如果我们想让 catalog.pc175.com 能够访问shoppingcart.pc175.com设置的cookies，该怎么办? 我们可以把domain属性设置成“pc175.com”，并把path属性设置成“/”。tag：不能把cookies域属性设置成与设置它的服务器的所在域不同的值。 | 默认本域 |
| `path` | 路径。指定与cookie关联的WEB页。值可以是一个目录，或者是一个路径。如果http://www.pc175.com/devhead/index.html 建立了一个cookie，那么在http://www.pc175.com/devhead/目录里的所有页面，以及该目录下面任何子目录里的页面都可以访问这个cookie。这就是说，在http://www.pc175.com/devhead/stories/articles 里的任何页面都可以访问http://www.pc175.com/devhead/index.html建立的cookie。但是，如果http://www.pc175.com/zdnn/ 需要访问http://www.pc175.com/devhead/index.html设置的cookes，该怎么办？这时，我们要把cookies 的path属性设置成“/”。在指定路径的时候，凡是来自同一服务器，URL里有相同路径的所有WEB页面都可以共享cookies。现在看另一个例子：如果想让 http://www.pc175.com/devhead/filters/ 和http://www.pc175.com/devhead/stories/共享cookies，就要把path设成“/devhead”。 | 默认 `/` |
| `secure` | 安全。指定cookie的值通过网络如何在用户和WEB服务器之间传递。这个属性的值或者是“secure”，或者为空。缺省情况下，该属性为空，也就是使用不安全的HTTP连接传递数据。如果一个 cookie 标记为secure，那么，它与WEB服务器之间就通过HTTPS或者其它安全协议传递数据。不过，设置了secure属性不代表其他人不能看到你机器本地保存的cookie。换句话说，把cookie设置为secure，只保证cookie与WEB服务器之间的数据传输过程加密，而保存在本地的cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。 | `false` |
