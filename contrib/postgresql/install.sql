-- admins table

CREATE TABLE admins ("jid" TEXT NOT NULL PRIMARY KEY, 
    "domain" TEXT NOT NULL);

-- accounts table

CREATE TABLE accounts ("jid" TEXT NOT NULL,
       	      "password" TEXT NOT NULL,
              "domain" TEXT NOT NULL PRIMARY KEY,
			  "updated" TIMESTAMP);

-- schema version table

CREATE TABLE schema_version (version INT NOT NULL PRIMARY KEY,
                             "when" TIMESTAMP,
                             description TEXT);

INSERT INTO schema_version (version, "when", description)
       VALUES (1, 'now', 'Initial database deployment');