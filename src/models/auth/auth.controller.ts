import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignInCredentialsDto } from './dto/auth-sign-in-credentials.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user account with username, email, and password',
  })
  @ApiBody({
    type: AuthCredentialsDto,
    description: 'User registration data',
    examples: {
      example1: {
        summary: 'Valid registration data',
        value: {
          full_name: 'John Doe Smith',
          username: 'johndoe',
          email: 'john.doe@example.com',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User account created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User registered successfully',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Password is too weak.', 'Email must be a valid email'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Username or email already exists',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Username already exists' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  @Post('/sign-up')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate user and receive access token',
  })
  @ApiBody({
    type: AuthSignInCredentialsDto,
    description: 'User login credentials',
    examples: {
      example1: {
        summary: 'Valid login credentials',
        value: {
          username: 'johndoe',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'JWT access token for authenticated requests',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' },
            username: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            full_name: { type: 'string', example: 'John Doe Smith' },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials format',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Password is too weak.', 'username must be a string'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid username or password',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @Post('/sign-in')
  async signIn(@Body() authCredentialsDto: AuthSignInCredentialsDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
