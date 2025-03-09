from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from fastapi import Request
from ..exceptions import UnauthorizedException, NotFoundException, BadRequestException

class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    """Middleware to handle global exceptions and return structured responses."""
    
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except UnauthorizedException as exc:
            return JSONResponse(
                status_code=exc.status_code,
                content={"error": "Unauthorized", "message": exc.detail},
            )
        except NotFoundException as exc:
            return JSONResponse(
                status_code=exc.status_code,
                content={"error": "Not Found", "message": exc.detail},
            )
        except BadRequestException as exc:
            return JSONResponse(
                status_code=exc.status_code,
                content={"error": "Bad Request", "message": exc.detail},
            )
        except Exception as exc:
            # Log the error if needed
            return JSONResponse(
                status_code=500,
                content={"error": "Internal Server Error", "message": str(exc)},
            )
