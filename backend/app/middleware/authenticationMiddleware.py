from ..exceptions import UnauthorizedException
from ..core.security import verify_access_token
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):    
        if request.url.path.startswith('/auth'): 
            token = request.headers.get('coreAccessToken')
            if not token:
                raise UnauthorizedException("Unauthorized")
            token = request.headers.get('coreAccessToken')
            verify_access_token(token)
        response = await call_next(request)
        return response 


       