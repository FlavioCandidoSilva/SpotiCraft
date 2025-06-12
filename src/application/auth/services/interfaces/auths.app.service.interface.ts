import { LoginDto } from "src/data-transfer/auth/requests/login.dto";

export abstract class IAuthAppService {
    abstract login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }>;
    abstract validateRefreshToken(userId: number, token: string): Promise<boolean>;
    abstract logout(userId: number): Promise<void>;
}
