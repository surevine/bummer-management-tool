XMPP User Management Tool
===========================

A tool for managing users.

__Build status:__ [![Build Status](https://magnum.travis-ci.com/surevine/bummer-management-tool.svg?token=uUdQYWLvQeHYmgvnWqjV&branch=master)](https://magnum.travis-ci.com/surevine/bummer-management-tool)

# Test

We have a set of automated tests will be be invoked as follows:

```
npm test
```

# Requirements

Your XMPP server will need to implement sections 1, 2, 5, 7, 18 of [XEP-0133 Service Administration](http://xmpp.org/extensions/xep-0133.html).

For [Prosody](http://prosody.im) you will need to add the following module [mod_admin_adhoc_get_registered_users_list](https://github.com/surevine/prosody-modules/tree/master/mod_admin_adhoc_get_registered_users_list) and enable both this and the `admin_adhoc` modules.

You will need to install a database schema in Postgresql (found in the `contrib/postgresql` directory).

# Configuration

Copy `config.example.js` to `config.production.js` (or whichever __NODE_ENV__ you are using) and modify settings as required.

# Running 

```bash
npm start
open http://localhost:3000
```

__Note:__ Should only be run over https in production.
