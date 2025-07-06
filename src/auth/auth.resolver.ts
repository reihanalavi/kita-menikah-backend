import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('data') data: CreateUserInput) {
    const user = await this.authService.register(data);
    return `User ${user.email} created`;
  }

  @Mutation(() => String)
  async login(@Args('data') data: LoginInput) {
    const result = await this.authService.login(data);
    return result.access_token;
  }
}