# Password and Account Recovery

## Policy

Use random temporary passwords by default. Do not use USN/name-derived passwords in production unless the institution consciously accepts the guessing risk.

Temporary passwords are bcrypt-hashed with cost 12 in the database. Plaintext exists only at generation time so it can be handed to the user. `must_change_password` forces replacement at the first login.

## Distribution

The initial seed writes `initial_credentials.csv`. Treat this file as confidential administrative material. Do not commit it to source control. The project `.gitignore` excludes it.

## Reset process

The default reset path is HoD-mediated because email and phone fields are incomplete in the supplied data. A forgot-password request does not disclose account existence. HoD creates a new random temporary password; the system marks prior pending reset requests resolved and records an audit event.

## Future email reset

Once institutional email addresses are verified, add expiring single-use reset-token fields/tables or an external identity provider. Keep HoD reset as the fallback.
