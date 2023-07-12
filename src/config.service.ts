import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigEnvService {
  set(key: string, value: string): void {
    process.env[key] = value
  }

  get(key: string): string {
    return process.env[key]
  }
}
