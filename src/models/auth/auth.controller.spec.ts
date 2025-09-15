import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignInCredentialsDto } from './dto/auth-sign-in-credentials.dto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp with the correct DTO', async () => {
      const dto: AuthCredentialsDto = {
        full_name: 'testuser',
        username: 'username',
        email: 'email@email.com',
        password: 'password123',
      };

      await authController.signUp(dto);

      expect(mockAuthService.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('signIn', () => {
    it('should call AuthService.signIn and return an access token', async () => {
      const dto: AuthSignInCredentialsDto = {
        username: 'testuser',
        password: 'password123',
      };
      const mockToken = { accessToken: 'mock-token' };
      mockAuthService.signIn.mockResolvedValue(mockToken);

      const result = await authController.signIn(dto);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockToken);
    });
  });
});
