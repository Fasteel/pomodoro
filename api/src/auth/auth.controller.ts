import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export default class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login (@Request() req) {
    return req.user
  }
}
