#TOKEN
env file

ACCESS_TOKEN_TYPE = 'Bearer'          # Token type

ACCESS_TOKEN_ALGORITHM = 'HS256'      # Algorithm used to create the JWT signature

ACCESS_TOKEN_SECRET = ''              # Secret used to create the JWT signature

ACCESS_TOKEN_EXPIRES_IN = 3600000     # Access token expiration in millisecond

REFRESH_TOKEN_EXPIRES_IN = 2592000000 # Refresh token expiration in millisecond

ACCESS_TOKEN_AUDIENCE = ''            # Audience claim of the JWT

ACCESS_TOKEN_ISSUER = ''              # Issuer claim of the JWT